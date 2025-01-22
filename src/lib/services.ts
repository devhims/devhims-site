import { createHash } from 'crypto';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { Resend } from 'resend';
import type { ContactFormData, ContactFormResponse } from './types';

// User Agent Parsing
export function parseUserAgent(userAgent: string): string {
  const patterns = {
    browser: /(Chrome|Safari|Firefox|Edge|Opera)\/[\d.]+/,
    os: /(Windows NT|Android|iOS|Mac OS X|Linux) ?[\d._]*/,
    mobile: /Mobile|Android|iPhone|iPad/,
  };

  try {
    const browser = (userAgent.match(patterns.browser)?.[0] || '').split(
      '/'
    )[0];
    const os = userAgent.match(patterns.os)?.[0] || '';
    const isMobile = patterns.mobile.test(userAgent);

    return `${browser}-${os}-${isMobile ? 'mobile' : 'desktop'}`.toLowerCase();
  } catch (error) {
    console.error('Error parsing user agent:', error);
    return 'unknown';
  }
}

// Identifier Creation
export function createIdentifier(headersList: Headers, ip: string): string {
  const userAgent = headersList.get('user-agent') || 'unknown';
  const simplifiedUA = parseUserAgent(userAgent);
  const identifier = `${ip}:${simplifiedUA}`;

  console.log('Identifier creation:', {
    originalUA: userAgent,
    simplifiedUA,
    identifier,
  });

  return createHash('md5').update(identifier).digest('hex');
}

// Rate Limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
  prefix: 'ratelimit:contact',
  ephemeralCache: false,
});

export async function checkRateLimit(
  headersList: Headers,
  ip: string
): Promise<ContactFormResponse> {
  const identifier = createIdentifier(headersList, ip);
  const result = await ratelimit.limit(identifier);

  console.log(`Rate limit check for ${ip}:`, {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: new Date(result.reset).toLocaleString(),
  });

  if (!result.success) {
    const resetIn = Math.ceil((result.reset - Date.now()) / 1000 / 60);

    return {
      success: false,
      message: `Rate limit exceeded. Please try again in ${
        resetIn > 60
          ? `${Math.ceil(resetIn / 60)} hour(s)`
          : `${resetIn} minute(s)`
      }.`,
    };
  }

  return { success: true, message: 'Limit not exceeded.' };
}

// Email Service
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: ContactFormData) {
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
