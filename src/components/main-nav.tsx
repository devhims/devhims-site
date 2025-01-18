'use client';

import { Button } from '@/components/ui/button';
import { routes, blogUrl } from '@/constants';
import { useSearchParams } from 'next/navigation';

export default function MainNav() {
  const searchParams = useSearchParams();

  const handleClick = (tab: string) => {
    if (tab === 'blog') {
      window.open(blogUrl, '_blank', 'noreferrer,noopener');
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return (
    <nav className='flex flex-col items-end gap-2 p-4'>
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Button
            key={route.tab}
            variant='ghost'
            className='xl:w-full w-fit xl:justify-start justify-end gap-4 hover:bg-white/15 hover:rounded-3xl hover:text-inherit'
            onClick={() => handleClick(route.tab)}
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
