import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function MailButton() {
  return (
    <Link
      href={{
        pathname: '/',
        query: { tab: 'contact' },
      }}
    >
      <Mail
        size={36}
        className='border border-white rounded-full p-2 w-[36px] h-[36px] cursor-pointer hover:bg-white/10 transition-colors'
        aria-label='Mail'
      />
    </Link>
  );
}
