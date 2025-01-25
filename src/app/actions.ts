'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { saveMessage } from '@/_data/messages';
import { after } from 'next/server';
import { sendEmail, checkRateLimit, parseUserAgent } from '@/lib/services';
import type { ContactFormResponse, ContactFormData } from '@/lib/types';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const contactFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  message: z.string().min(10).max(5000).trim(),
});

export async function submitContactForm(
  prevState: ContactFormResponse | null,
  formData: FormData
): Promise<ContactFormResponse> {
  try {
    const headersList = await headers();
    const xForwardedFor = headersList.get('x-forwarded-for') || '';
    const ip = xForwardedFor.split(',')[0].trim() || 'unknown';

    // 1. Check rate limit
    const rateLimitResult = await checkRateLimit(headersList, ip);
    if (!rateLimitResult.success) {
      console.log('Rate limit exceeded:', rateLimitResult.message);
      return {
        success: false,
        message: rateLimitResult.message,
      };
    }

    // 2. Validate input
    const rawData: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    const validatedData = contactFormSchema.safeParse(rawData);
    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please check your input and try again.',
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    // 3. Send email with system info
    const systemInfo = JSON.stringify({
      timestamp: new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'Asia/Kolkata',
      }),
      environment:
        process.env.NODE_ENV === 'development' ? 'Development' : 'Production',
      ip: ip,
      userAgent: parseUserAgent(headersList.get('user-agent') || 'unknown'),
    });
    try {
      await sendEmail(validatedData.data);
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        message: 'Failed to send email. Please try again later.',
      };
    }

    // 4. Save message to database after this action is complete
    after(async () => {
      try {
        await saveMessage({
          name: validatedData.data.name,
          email: validatedData.data.email,
          message: validatedData.data.message,
          systemInfo,
        });
      } catch (error) {
        console.error('Database operation failed:', error);
      }
    });

    return {
      success: true,
      message: `Thanks for reaching out. I'll get back to you soon! 🙂`,
    };
  } catch (error) {
    console.error('Error processing form submission:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}

interface RateLimitPayload {
  deviceId: string;
  attempts: number;
  firstAttempt: number;
  [key: string]: string | number;
}

const secretKey = process.env.RATE_LIMIT_SECRET!;
const key = new TextEncoder().encode(secretKey);

// Token management functions
export async function generateInitialToken(): Promise<{
  success: boolean;
  message: string;
  payload?: RateLimitPayload;
}> {
  const cookieStore = await cookies();

  // Check if a token already exists
  const existingToken = cookieStore.get('rate_limit')?.value;
  if (existingToken) {
    try {
      // Verify the existing token
      const { payload } = await jwtVerify(existingToken, key, {
        algorithms: ['HS256'],
      });

      // Check if the token payload has valid data
      if (
        typeof payload.deviceId === 'string' &&
        typeof payload.attempts === 'number' &&
        typeof payload.firstAttempt === 'number'
      ) {
        return {
          success: true,
          message: 'Token exists',
          payload: payload as RateLimitPayload,
        };
      }
    } catch (error) {
      // Token is invalid, we'll create a new one
      console.error(`Token is invalid, we'll create a new one: ${error}`);
    }
  }

  // Create new token
  const payload: RateLimitPayload = {
    deviceId: crypto.randomUUID(),
    attempts: 0,
    firstAttempt: Date.now(),
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);

  cookieStore.set('rate_limit', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 60 * 60 * 1000),
    sameSite: 'strict',
    path: '/',
  });

  return { success: true, message: 'Token generated', payload };
}
