'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SpotlightCard from '@/components/spotlight-card';
import { toast } from 'sonner';
import { submitContactForm } from '@/app/actions';
import { SocialDock } from './social-dock';
import { WavingHandIcon } from './icons/WavingHandIcon';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await submitContactForm(values);

      if (response.success) {
        form.reset();
        toast.success(`Thanks for reaching out. I'll get back to you soon! 🙂`);
        // if (response.remaining) {
        //   toast.info(
        //     `You have ${response.remaining} messages remaining in this hour.`
        //   );
        // }
      } else if (response.error) {
        switch (response.error.type) {
          case 'RATE_LIMIT':
            toast.error(response.error.message);
            break;
          case 'VALIDATION':
            toast.error('Please check your input and try again.');
            break;
          case 'SERVER':
            toast.error(response.error.message);
            break;
          default:
            toast.error('Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(
        'There was a problem sending your message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
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
          <p className='text-gray-400 text-sm'>
            Have something in mind? <br /> I&rsquo;d love to hear from you!
          </p>
        </div>
        <SpotlightCard className='w-[90vw] sm:w-full bg-zinc-950/80 border-zinc-800/50'>
          <div className='w-full'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 text-left'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-zinc-200'>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Your name'
                            className='bg-zinc-900 border-zinc-800'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-zinc-200'>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='your.email@gmail.com'
                            className='bg-zinc-900 border-zinc-800'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-zinc-200'>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='What would you like to say?'
                          className='resize-none bg-zinc-900 border-zinc-800 h-24'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 font-semibold'
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </div>
        </SpotlightCard>
        <SocialDock collapsible={false} position='bottom' responsive='bottom' />
      </div>
    </>
  );
}
