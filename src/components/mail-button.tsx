import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function MailButton() {
  return (
    <Link href={`/?tab=contact`}>
      <Mail
        size={36}
        className='border border-white rounded-full p-2 w-[36px] h-[36px] cursor-pointer hover:bg-white/10 transition-colors'
      />
    </Link>
  );
}
