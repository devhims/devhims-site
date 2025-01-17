'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SocialDock } from './social-dock';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/constants';

const blogUrl = 'https://blog.devhims.com';

export function MainNav({ className }: { className?: string }) {
  const router = useRouter();
  // const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavigation = (tab: string) => {
    // if (pathname === '/' && href.startsWith('/#')) {
    //   const hash = href.split('#')[1];
    //   window.location.hash = hash;
    // } else {
    //   router.push(href);
    // }

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

      <div className='mt-auto pt-4'>
        <SocialDock />
      </div>
    </nav>
  );
}
