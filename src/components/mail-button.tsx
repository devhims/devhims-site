import { Mail } from 'lucide-react';

export default function MailButton() {
  return (
    <Mail
      size={36}
      className='border border-white rounded-full p-2 w-[36px] h-[36px] cursor-pointer hover:bg-white/10 transition-colors'
      aria-label='Mail'
    />
  );
}
