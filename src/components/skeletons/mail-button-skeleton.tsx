import { Mail } from 'lucide-react';

export function MailButtonSkeleton() {
  return (
    <Mail
      size={36}
      className='border border-white rounded-full p-2 w-[36px] h-[36px] cursor-pointer hover:bg-white/10 transition-colors animate-pulse'
    />
  );
}
