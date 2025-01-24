'use client';

import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SpotlightCard from '@/components/spotlight-card';
import { submitContactForm } from '@/app/actions';
import { SocialDock } from './social-dock';
import { WavingHandIcon } from './icons/WavingHandIcon';
import type { ContactFormResponse } from '@/lib/types';
import { toast } from 'sonner';

const initialState: ContactFormResponse = {
  success: false,
  message: '',
};

export default function ContactForm() {
  const [state, action, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  useEffect(() => {
    if (state.message.length > 0) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <div className='w-full px-2 sm:px-4 md:max-w-2xl mx-auto space-y-4 text-center flex flex-col items-center justify-center'>
      <div className='space-y-1 mt-5'>
        <div className='flex items-center justify-center space-x-1'>
          <div
            style={{
              animation: 'waveSpring 1.5s ease-out both',
              transformOrigin: '70% 70%',
            }}
          >
            <WavingHandIcon size={32} />
          </div>
          <h2 className='text-2xl font-bold'>Let&rsquo;s Connect</h2>
        </div>
        <p className='text-zinc-400 text-sm p-3'>
          Have something in mind? <br /> I&rsquo;d love to hear from you!
        </p>
      </div>
      <SpotlightCard className='w-[90vw] sm:w-full bg-zinc-950/80 border-zinc-800/50'>
        <div className='w-full'>
          <form
            action={action}
            className='space-y-4 text-left'
            autoComplete='on'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='name' className='text-zinc-200'>
                  Name
                </Label>
                <Input
                  id='name'
                  name='name'
                  placeholder='Your name'
                  required
                  minLength={2}
                  className={`bg-zinc-900 border-zinc-800 ${
                    state?.errors?.name ? 'border-red-500' : ''
                  }`}
                  aria-describedby='name-error'
                />
                {state?.errors?.name && (
                  <p id='name-error' className='text-sm text-red-500'>
                    {state.errors.name[0]}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-zinc-200'>
                  Email
                </Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='your.email@gmail.com'
                  required
                  className={`bg-zinc-900 border-zinc-800 ${
                    state?.errors?.email ? 'border-red-500' : ''
                  }`}
                  aria-describedby='email-error'
                />
                {state?.errors?.email && (
                  <p id='email-error' className='text-sm text-red-500'>
                    {state.errors.email[0]}
                  </p>
                )}
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='message' className='text-zinc-200'>
                Message
              </Label>
              <Textarea
                id='message'
                name='message'
                placeholder='What would you like to say?'
                required
                minLength={10}
                className={`resize-none bg-zinc-900 border-zinc-800 h-24 ${
                  state?.errors?.message ? 'border-red-500' : ''
                }`}
                aria-describedby='message-error'
              />
              {state?.errors?.message && (
                <p id='message-error' className='text-sm text-red-500'>
                  {state.errors.message[0]}
                </p>
              )}
            </div>
            <Button
              type='submit'
              disabled={isPending}
              className='w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 font-semibold'
            >
              {isPending ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </SpotlightCard>
      <SocialDock collapsible={false} position='bottom' responsive='bottom' />
    </div>
  );
}
