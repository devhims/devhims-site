'use client';

import { Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function MailButtonSkeleton() {
  return (
    <Mail
      size={36}
      className='border border-white rounded-full p-2 w-[36px] h-[36px] cursor-pointer hover:bg-white/10 transition-colors animate-pulse'
    />
  );
}

function MailButtonClient() {
  const searchParams = useSearchParams();
  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', 'contact');
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return (
    <Mail
      size={36}
      className='border border-white rounded-full p-2 w-[36px] h-[36px] cursor-pointer hover:bg-white/10 transition-colors'
      onClick={handleClick}
    />
  );
}

export function MailButton() {
  return (
    <Suspense fallback={<MailButtonSkeleton />}>
      <MailButtonClient />
    </Suspense>
  );
}
