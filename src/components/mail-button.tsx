'use client';

import { Mail } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export function MailButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === '/') {
      window.location.hash = 'contact';
    } else {
      router.push('/#contact');
    }
  };

  return (
    <Mail
      size={36}
      className='border border-white rounded-full p-2 w-[36px] h-[36px] cursor-pointer hover:bg-white/10 transition-colors'
      onClick={handleClick}
    />
  );
}
