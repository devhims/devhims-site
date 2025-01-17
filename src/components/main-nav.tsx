'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/constants';
import { Suspense } from 'react';

const blogUrl = 'https://blog.devhims.com';

function MainNavSkeleton({ className }: { className?: string }) {
  return (
    <nav className={cn('flex flex-col gap-2 p-4', className)}>
      {/* Create 5 skeleton buttons to match routes length */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className='w-full h-[44px] flex xl:justify-start justify-end gap-4 px-4 py-2 animate-pulse'
        >
          <div className='w-[26px] h-[26px] rounded-md bg-white/15' />
          <div className='hidden xl:block w-24 h-[26px] rounded-md bg-white/15' />
        </div>
      ))}
    </nav>
  );
}

function MainNavClient({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (tab: string) => {
    if (tab === 'blog') {
      window.open(blogUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    window.history.pushState(null, '', `?${params.toString()}`);

    router.push(`/?tab=${tab}`);
  };

  return (
    <nav className={cn('flex flex-col gap-2 p-4', className)}>
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Button
            key={route.tab}
            variant='ghost'
            className='w-full xl:justify-start justify-end gap-4 hover:bg-white/15 hover:rounded-3xl hover:text-inherit'
            onClick={() => handleNavigation(route.tab)}
          >
            <Icon size={26} />
            <span className='hidden xl:inline text-lg font-semibold'>
              {route.label}
            </span>
          </Button>
        );
      })}
    </nav>
  );
}

export function MainNav({ className }: { className?: string }) {
  return (
    <Suspense fallback={<MainNavSkeleton className={className} />}>
      <MainNavClient className={className} />
    </Suspense>
  );
}
