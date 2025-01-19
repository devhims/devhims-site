import { Button } from '@/components/ui/button';
import { CalendarDays, LinkIcon, MapPin, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { RightSidebar } from '@/components/right-sidebar';
import AuroraEffect from '@/components/AuroraEffect';

import { Suspense } from 'react';
import { SocialDock } from '@/components/social-dock';
import MainNav from '@/components/main-nav';
import MailButton from '@/components/mail-button';
// import { ProfileTabsSkeleton } from '@/components/skeletons/profile-tabs-skeleton';
import ProfileTabs from '@/components/profile-tabs';
import { MailButtonSkeleton } from '@/components/skeletons/mail-button-skeleton';
import MainNavSkeleton from '@/components/skeletons/main-nav-skeleton';
import { ProfileImage } from '@/components/profile-image';

export default function ProfilePage() {
  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='container mx-auto flex flex-col md:flex-row justify-center gap-2 px-2'>
        <div className='hidden md:flex flex-col shrink-0 md:sticky md:top-0 md:h-screen'>
          <Suspense fallback={<MainNavSkeleton />}>
            <MainNav />
          </Suspense>
          <div className='px-4 mt-auto pb-4'>
            <SocialDock />
          </div>
        </div>

        <main className='w-full max-w-2xl border-x border-gray-500/50'>
          {/* Banner */}
          <div className='relative h-48 w-full overflow-hidden'>
            <AuroraEffect />
          </div>

          {/* Profile Info */}
          <div className='px-4 py-3 relative'>
            <ProfileImage />

            <div className='absolute top-5 right-4'>
              <div className='flex items-center gap-2'>
                <Suspense fallback={<MailButtonSkeleton />}>
                  <MailButton />
                </Suspense>

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
            <div className='space-y-1 mt-24'>
              <h1 className='text-xl font-black flex items-center gap-1'>
                Himanshu Gupta
                <Image
                  src='/blue-twitter-verified-sign.svg'
                  alt='Verified'
                  width={20}
                  height={20}
                  className='inline-block'
                />
              </h1>
              <p className='text-gray-400'>@devhims</p>
              <p className='text-gray-200'>
                Full-stack developer passionate about building great user
                experiences
              </p>
              <div className='flex flex-wrap gap-y-2 gap-x-4 text-gray-400 text-sm'>
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
              {/* <div className='flex gap-4 text-sm pt-2'>
                <Link href='#' className='hover:underline'>
                  <span className='font-bold text-white'>256</span>{' '}
                  <span className='text-gray-500'>Following</span>
                </Link>
                <Link href='#' className='hover:underline'>
                  <span className='font-bold text-white'>1,234</span>{' '}
                  <span className='text-gray-500'>Followers</span>
                </Link>
              </div> */}
            </div>
          </div>

          {/* Tabs */}

          <ProfileTabs />
        </main>
        <RightSidebar className='hidden lg:block shrink-0 lg:sticky lg:top-0 lg:h-screen' />
      </div>
    </div>
  );
}
