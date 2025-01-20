'use client';

import { Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function MailButton() {
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
      aria-label='Mail'
      onClick={handleClick}
    />
  );
}
