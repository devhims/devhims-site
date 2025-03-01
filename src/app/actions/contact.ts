'use server';

/**
 * Server-side implementation for handling contact form submissions.
 * This module provides functionality for rate limiting, form validation,
 * email sending, and database storage of contact form messages.
 */

import { z } from 'zod';
import { saveMessage } from '@/_data/messages';
import { after } from 'next/server';
import type { ContactFormResponse, ContactFormData } from '@/lib/types';
import { checkAndUpdateRateLimit } from './rate-limit';
import { Resend } from 'resend';

// Initialize Resend email service with API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Zod schema for contact form validation
 * Ensures that submitted data meets the following criteria:
 * - name: 2-50 characters
 * - email: valid email format
 * - message: 10-5000 characters
 */
const contactFormSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().email().toLowerCase().trim(),
  message: z.string().min(10).max(5000).trim(),
});

/**
 * Sends an email using the Resend service
 *
 * @param data - Validated contact form data
 * @returns Promise containing the email sending result
 *
 * @example
 * await sendEmail({
 *   name: "John Doe",
 *   email: "john@example.com",
 *   message: "Hello, I'd like to connect!"
 * });
 */

async function sendEmail(data: ContactFormData) {
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

/**
 * Processes a contact form submission with the following steps:
 * 1. Rate limiting check
 * 2. Input validation
 * 3. Email sending
 * 4. Database storage
 *
 * @param prevState - Previous form state (for react useActionState hook)
 * @param formData - Raw form data from the submission
 * @returns - promise that resolves to ContactFormResponse with updated state
 *
 * @example
 * const [state, action, isPending] = useActionState(submitContactForm, initialState);
 */
export async function submitContactForm(
  prevState: ContactFormResponse | null,
  formData: FormData
): Promise<ContactFormResponse> {
  try {
    // Step 1: Rate Limiting
    // Prevents abuse by limiting the number of submissions from a single source
    const rateLimitResult = await checkAndUpdateRateLimit();
    if (!rateLimitResult.success) {
      return {
        success: false,
        message: rateLimitResult.message,
      };
    }

    // Step 2: Input Validation
    // Extract and validate raw form data against the schema
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

    // Step 3: Email Sending
    try {
      await sendEmail(validatedData.data);
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        message: 'Failed to send email. Please try again later.',
      };
    }

    // Step 4: Database Storage
    // Save message to database after the response is sent (non-blocking)
    const systemInfo = JSON.stringify({
      timestamp: new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'Asia/Kolkata',
      }),
      environment:
        process.env.NODE_ENV === 'development' ? 'Development' : 'Production',
    });

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

    // Return success response
    return {
      success: true,
      message: `Thanks for reaching out. I'll get back to you soon! 🙂`,
    };
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error processing form submission:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}
