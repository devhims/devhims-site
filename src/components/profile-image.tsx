import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { X } from 'lucide-react';
import { profileImageLarge, profileImageSmall } from '@/constants';

export const ProfileImage = () => {
  return (
    <div className='absolute -top-[60px] sm:-top-[75px] left-2 sm:left-4'>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className='w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]'
            role='button'
            aria-label='Open profile picture'
            aria-haspopup='dialog'
          >
            <Image
              src={profileImageSmall}
              alt='Profile'
              className='rounded-full border-4 border-black object-cover aspect-square object-[50%_25%] cursor-pointer hover:opacity-90 transition-opacity'
              width={150}
              height={150}
              sizes='(max-width: 640px) 120px, 150px'
              priority={true}
              quality={80}
              loading='eager'
            />
          </div>
        </DialogTrigger>

        {/* Modal Image */}
        <DialogContent className='max-w-[600px] !p-0 !gap-0 bg-transparent border-none overflow-hidden flex items-center justify-center min-h-screen'>
          <DialogTitle className='sr-only'>Profile Picture</DialogTitle>

          <Image
            src={profileImageLarge}
            alt='Profile'
            className='rounded-full object-cover aspect-square object-[55%_25%]'
            width={400}
            height={400}
            sizes='(max-width: 640px) 300px, 400px'
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
