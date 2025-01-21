import { SocialDock } from '@/components/social-dock';
import { RightSidebar } from '@/components/right-sidebar';
import AuroraEffect from '@/components/aurora-effect';
import MainNav from '@/components/main-nav';
import ProfileTabs from '@/components/profile-tabs';
import { Suspense } from 'react';
import { MainNavSkeleton } from '@/components/skeletons/main-nav-skeleton';

import Bio from '@/components/bio';

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
            <AuroraEffect className='absolute inset-0' />
          </div>

          {/* Profile Info */}
          <Bio className='px-4 py-3 relative' />

          {/* Tabs */}
          <ProfileTabs />
        </main>
        <RightSidebar className='hidden lg:block shrink-0 lg:sticky lg:top-0 lg:h-screen' />
      </div>
    </div>
  );
}
