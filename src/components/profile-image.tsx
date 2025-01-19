import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { X } from 'lucide-react';

export const ProfileImage = () => {
  return (
    <div className='absolute -top-16 left-4'>
      <Dialog>
        <DialogTrigger asChild>
          {/* Small screens */}
          <Image
            src='/profile2.webp'
            alt='Profile picture'
            className='rounded-full border-4 border-black object-cover aspect-square object-[50%_25%] cursor-pointer hover:opacity-90 transition-opacity'
            width={150}
            height={150}
            priority={true}
            quality={80}
            loading='eager'
          />
        </DialogTrigger>

        {/* Modal Image */}
        <DialogContent className='max-w-[600px] !p-0 !gap-0 bg-transparent border-none overflow-hidden flex items-center justify-center min-h-screen'>
          <DialogTitle className='sr-only'>Profile Picture</DialogTitle>

          <Image
            src='/profile.webp'
            alt='Profile picture'
            className='rounded-full object-cover aspect-square object-[55%_25%]'
            width={400}
            height={400}
            priority={false}
            quality={100}
            loading='lazy'
          />

          <DialogClose className='fixed top-10 left-5 text-white rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none'>
            <X className='h-8 w-8' />
            <span className='sr-only'>Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};
