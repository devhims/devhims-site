import Image from 'next/image';
import { MapPin, LinkIcon, CalendarDays } from 'lucide-react';
import Link from 'next/link';
// import { cn } from '@/lib/utils';
import { ProfileImage } from './profile-image';
import MailButtonWrapper from './mail-button-wrapper';
// import { MailButtonSkeleton } from '@/components/skeletons/mail-button-skeleton';
import { Button } from '@/components/ui/button';
// import { Suspense } from 'react';
import MailButton from './mail-button';

export default function Bio({ className }: { className?: string }) {
  return (
    <main className={className}>
      <section>
        <ProfileImage />
        <div className='flex justify-end'>
          <div className='flex items-center gap-2'>
            {/* <Suspense fallback={<MailButtonSkeleton />}>
              <MailButton />
            </Suspense> */}

            <MailButtonWrapper>
              <MailButton />
            </MailButtonWrapper>

            <Button
              asChild
              variant='outline'
              className='rounded-full text-black font-bold text-md px-4 py-2'
            >
              <Link href='https://x.com/devhims' target='_blank'>
                Follow
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-1/2 mt-6 sm:mt-10'>
        <div className='flex flex-col mb-2'>
          <h1 className='text-xl font-black flex items-center gap-1'>
            Himanshu Gupta
            <Image
              src='/blue-twitter-verified-sign.svg'
              alt='verified'
              width={20}
              height={20}
              className='inline-block'
            />
          </h1>
          <p className='text-gray-400'>@devhims</p>
        </div>
        <p>DX Engineer | Building modern web apps with React & Next.js</p>
        <div className='flex flex-wrap gap-x-4 text-gray-400 mt-2'>
          <span className='flex items-center gap-1'>
            <MapPin size={16} />
            Bengaluru, India
          </span>
          <span className='flex items-center gap-1'>
            <LinkIcon size={16} />
            <Link
              href='https://github.com/devhims'
              className='text-blue-400 hover:underline'
              target='_blank'
            >
              github.com/devhims
            </Link>
          </span>
          <span className='flex items-center gap-1'>
            <CalendarDays size={16} />
            Joined July 2012
          </span>
        </div>
      </section>
    </main>
  );
}
