'use server';

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

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

export async function checkAndUpdateRateLimit(): Promise<{
  success: boolean;
  message: string;
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get('rate_limit')?.value;

  if (!token) {
    return {
      success: false,
      message: 'Rate limit token missing. Please enable cookies to continue.',
    };
  }

  try {
    const { payload } = (await jwtVerify(token, key, {
      algorithms: ['HS256'],
    })) as { payload: RateLimitPayload };

    const now = Date.now();
    if (now - payload.firstAttempt > 60 * 60 * 1000) {
      // Instead of returning generateInitialToken result, create a new session
      const newPayload: RateLimitPayload = {
        deviceId: crypto.randomUUID(),
        attempts: 1, // Start with 1 since this is a new attempt
        firstAttempt: now,
      };

      const newToken = await new SignJWT(newPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(key);

      cookieStore.set('rate_limit', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(now + 60 * 60 * 1000),
        sameSite: 'strict',
        path: '/',
      });

      return { success: true, message: 'New rate limit session started' };
    }

    if (payload.attempts >= 3) {
      const resetIn = Math.ceil(
        (60 * 60 * 1000 - (now - payload.firstAttempt)) / 1000 / 60
      );
      return {
        success: false,
        message: `Rate limit exceeded. Please try again in ${
          resetIn > 60
            ? `${Math.ceil(resetIn / 60)} hour(s)`
            : `${resetIn} minute(s)`
        }.`,
      };
    }

    // Update attempt count
    const updatedPayload: RateLimitPayload = {
      ...payload,
      attempts: payload.attempts + 1,
    };

    const newToken = await new SignJWT(updatedPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(key);

    cookieStore.set('rate_limit', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(payload.firstAttempt + 60 * 60 * 1000),
      sameSite: 'strict',
      path: '/',
    });

    return { success: true, message: 'Rate limit updated' };
  } catch (error) {
    console.error(`Error checking and updating rate limit: ${error}`);
    return {
      success: false,
      message: 'Invalid rate limit token. Please enable cookies to continue.',
    };
  }
}
