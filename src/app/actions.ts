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
  ephemeralCache: false, // remove ephemeral cache to ensure redis always used
});

function parseUserAgent(userAgent: string): string {
  // Extract the basic browser and OS information
  const patterns = {
    // Match common browsers
    browser: /(Chrome|Safari|Firefox|Edge|Opera)\/[\d.]+/,
    // Match common operating systems
    os: /(Windows NT|Android|iOS|Mac OS X|Linux) ?[\d._]*/,
    // Match device type (mobile/desktop)
    mobile: /Mobile|Android|iPhone|iPad/,
  };

  try {
    const browser = (userAgent.match(patterns.browser)?.[0] || '').split(
      '/'
    )[0];
    const os = userAgent.match(patterns.os)?.[0] || '';
    const isMobile = patterns.mobile.test(userAgent);

    // Create a simplified identifier string
    return `${browser}-${os}-${isMobile ? 'mobile' : 'desktop'}`.toLowerCase();
  } catch (error) {
    console.error('Error parsing user agent:', error);
    return 'unknown';
  }
}

// Helper function to create a unique identifier for each client
function createIdentifier(headersList: Headers, ip: string): string {
  const userAgent = headersList.get('user-agent') || 'unknown';
  const simplifiedUA = parseUserAgent(userAgent);

  // Combine IP with simplified user agent
  const identifier = `${ip}:${simplifiedUA}`;

  // Log the original and simplified values for debugging
  console.log('Identifier creation:', {
    originalUA: userAgent,
    simplifiedUA,
    identifier,
  });

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
    const xForwardedFor = headersList.get('x-forwarded-for') || '';
    const ip = xForwardedFor.split(',')[0].trim() || 'unknown';

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

    // 3. Send email and save to database in parallel
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

    const [emailResult, dbResult] = await Promise.allSettled([
      sendEmail(validationResult.data!),
      saveMessage({
        name: validationResult.data!.name,
        email: validationResult.data!.email,
        message: validationResult.data!.message,
        systemInfo,
      }),
    ]);

    // Check if sending email failed
    if (emailResult.status === 'rejected') {
      console.error('Email sending failed:', emailResult.reason);
      return {
        success: false,
        error: {
          type: 'SERVER',
          message: 'Failed to send email. Please try again later.',
        },
      };
    }

    // Check if saving message in database failed
    if (dbResult.status === 'rejected') {
      console.error('Database operation failed:', dbResult.reason);
      // return {
      //   success: false,
      //   error: {
      //     type: 'SERVER',
      //     message: 'Failed to save your message. Please try again later.',
      //   },
      // };
    }

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
