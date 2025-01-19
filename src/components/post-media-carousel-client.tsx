'use client';

import NextImage from 'next/image';
import {
  Carousel,
  CarouselMainContainer,
  SliderMainItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/MultiCarousel';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface PostMediaCarouselProps {
  mediaUrls: string[];
  index: number;
  children: React.ReactNode;
}

export function PostMediaCarouselDialog({
  mediaUrls,
}: {
  mediaUrls: string[];
}) {
  return (
    <DialogContent className='max-w-[90vw] h-[90vh] !p-0 !gap-0 bg-transparent border-none overflow-hidden'>
      <DialogTitle className='sr-only'>View post media</DialogTitle>
      <Carousel className='relative h-full'>
        <CarouselMainContainer className='h-full group'>
          {mediaUrls.map((url, index) => (
            <SliderMainItem
              key={index}
              className='bg-transparent h-full flex items-center justify-center'
            >
              <div className='relative w-full h-full'>
                <NextImage
                  src={url}
                  alt={`Post media ${index + 1}`}
                  fill
                  className='object-contain'
                  sizes='90vw'
                />
              </div>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        {mediaUrls.length > 1 && (
          <>
            <CarouselNext className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition-colors border-0' />
            <CarouselPrevious className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition-colors border-0' />
          </>
        )}
      </Carousel>
      <DialogClose className='absolute top-2 right-2 sm:top-4 sm:right-4 rounded-full bg-black/60 p-1.5 sm:p-2 opacity-70 hover:opacity-100 transition-opacity focus:outline-none disabled:pointer-events-none z-50'>
        <X className='h-4 w-4 sm:h-5 sm:w-5 text-white' strokeWidth={2.5} />
        <span className='sr-only'>Close</span>
      </DialogClose>
    </DialogContent>
  );
}

export function PostMediaCarouselClient({
  mediaUrls,
  children,
}: PostMediaCarouselProps) {
  if (!mediaUrls || mediaUrls.length === 0) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <PostMediaCarouselDialog mediaUrls={mediaUrls} />
    </Dialog>
  );
}
