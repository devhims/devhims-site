'use client';

import { Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function MailButton() {
  // const router = useRouter();
  // const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleClick = () => {
    // if (pathname === '/') {
    //   window.location.hash = 'contact';
    // } else {
    //   router.push('/#contact');
    // }

    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', 'contact');
    window.history.pushState(null, '', `?${params.toString()}`);

    // router.push(`/?tab=${tab}`);
  };

  return (
    <Mail
      size={36}
      className='border border-white rounded-full p-2 w-[36px] h-[36px] cursor-pointer hover:bg-white/10 transition-colors'
      onClick={handleClick}
    />
  );
}
