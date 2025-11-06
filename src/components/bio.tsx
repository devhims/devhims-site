import Image from 'next/image';
import { MapPin, LinkIcon, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { ProfileImage } from './profile-image';
import { Button } from '@/components/ui/button';
import MailButton from './mail-button';
import { blueTwitterVerifiedSign } from '@/constants';
import { Suspense } from 'react';
import { MailButtonSkeleton } from './skeletons/mail-button-skeleton';

export default function Bio({ className }: { className?: string }) {
  return (
    <main className={className}>
      <section>
        <ProfileImage />
        <div className='flex justify-end'>
          <div className='flex items-center gap-2'>
            <Suspense fallback={<MailButtonSkeleton />}>
              <MailButton />
            </Suspense>
            <Button
              asChild
              variant='outline'
              className='rounded-full bg-white text-black font-bold text-md px-4 py-2 hover:bg-white/80 hover:text-black'
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
              src={blueTwitterVerifiedSign}
              alt='verified'
              width={20}
              height={20}
              className='inline-block'
            />
          </h1>
          <p className='text-gray-400'>@devhims</p>
        </div>
        <p>
          Senior Full-Stack Engineer | Building scalable systems with clean
          architecture & intuitive UX
        </p>
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
