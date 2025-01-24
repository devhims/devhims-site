import { Suspense } from 'react';
import { NavLinksSkeleton } from './skeletons/nav-links-skeleton';
import { SocialDock } from './social-dock';
import NavLinks from './nav-links';

export default function MainNav() {
  return (
    <div className='hidden md:flex flex-col shrink-0 md:sticky md:top-0 md:h-screen'>
      <Suspense fallback={<NavLinksSkeleton />}>
        <NavLinks />
      </Suspense>
      <div className='px-4 mt-auto pb-4'>
        <SocialDock />
      </div>
    </div>
  );
}
