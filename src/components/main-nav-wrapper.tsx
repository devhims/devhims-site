'use client';

import { Button } from '@/components/ui/button';
import { blogUrl } from '@/constants';
import { useSearchParams } from 'next/navigation';

export default function MainNavWrapper({
  children,
  label,
  tab,
}: {
  children: React.ReactNode;
  label: string;
  tab: string;
}) {
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
    <Button
      variant='ghost'
      className='xl:w-full w-fit xl:justify-start justify-end gap-4 hover:bg-white/15 hover:rounded-3xl hover:text-inherit'
      onClick={() => handleClick(tab)}
      aria-label={label}
    >
      {children}
    </Button>
  );
}
