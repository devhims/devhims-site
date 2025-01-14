'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { headers } from 'next/headers';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { createHash } from 'crypto';
import { saveMessage } from '@/lib/messages';

const resend = new Resend(process.env.RESEND_API_KEY);
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create sliding window rate limiter
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 requests per hour
  analytics: true,
  prefix: 'ratelimit:contact',
  ephemeralCache: new Map(),
});

// Helper function to create a unique identifier for each client
function createIdentifier(headersList: Headers, ip: string): string {
  const userAgent = headersList.get('user-agent') || 'unknown';
  const accept = headersList.get('accept') || '';
  const acceptLanguage = headersList.get('accept-language') || '';

  // Create a unique identifier based on multiple factors
  const identifier = `${ip}:${userAgent}:${accept}:${acceptLanguage}`;
  return createHash('md5').update(identifier).digest('hex');
}

const formSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  message: z.string().min(10).max(5000).trim(),
});

type FormData = z.infer<typeof formSchema>;

type FormResponse = {
  success: boolean;
  data?: FormData;
  remaining?: number;
  error?: {
    type: 'RATE_LIMIT' | 'VALIDATION' | 'SERVER';
    message: string;
  };
};

async function checkRateLimit(
  headersList: Headers,
  ip: string
): Promise<FormResponse> {
  const identifier = createIdentifier(headersList, ip);
  const result = await ratelimit.limit(identifier);

  // Log attempt
  console.log(`Rate limit check for ${ip}:`, {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: new Date(result.reset).toLocaleString(),
  });

  if (!result.success) {
    const resetIn = Math.ceil((result.reset - Date.now()) / 1000 / 60); // minutes
    return {
      success: false,
      error: {
        type: 'RATE_LIMIT',
        message: `Rate limit exceeded. Please try again in ${
          resetIn > 60
            ? `${Math.ceil(resetIn / 60)} hour(s)`
            : `${resetIn} minute(s)`
        }.`,
      },
    };
  }

  return { success: true, remaining: result.remaining };
}

function validateFormData(formData: FormData): FormResponse {
  const result = formSchema.safeParse(formData);
  if (!result.success) {
    return {
      success: false,
      error: {
        type: 'VALIDATION',
        message: 'Please check your input and try again.',
      },
    };
  }
  return { success: true, data: result.data };
}

async function sendEmail(data: FormData) {
  const { name, email, message } = data;

  return resend.emails.send({
    from: `${name} <contact@devhims.com>`,
    to: 'contact@devhims.com',
    replyTo: email,
    subject: `Inquiry: ${name}`,
    text: `${message}

---
Sent via devhims.com contact form
Name: ${name}
Email: ${email}

`,
  });
}

export async function submitContactForm(
  formData: FormData
): Promise<FormResponse> {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    // 1. Check rate limit
    const rateLimitResult = await checkRateLimit(headersList, ip);
    if (!rateLimitResult.success) {
      return rateLimitResult;
    }

    // 2. Validate input
    const validationResult = validateFormData(formData);
    if (!validationResult.success) {
      return validationResult;
    }

    // 3. Send email
    await sendEmail(validationResult.data!);

    // 4. Prepare system info for database
    const systemInfo = JSON.stringify({
      timestamp: new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'Asia/Kolkata',
      }),
      environment:
        process.env.NODE_ENV === 'development' ? 'Development' : 'Production',
      ip: ip,
      userAgent: headersList.get('user-agent') || 'unknown',
    });

    // 5. Fire and forget the database operation
    saveMessage({
      email: validationResult.data!.email,
      message: validationResult.data!.message,
      systemInfo,
    }).catch((error) => {
      console.error('Database operation failed:', error);
    });

    return { success: true, remaining: rateLimitResult.remaining };
  } catch (error) {
    console.error('Error processing form submission:', error);
    return {
      success: false,
      error: {
        type: 'SERVER',
        message: 'Failed to send message. Please try again later.',
      },
    };
  }
}
