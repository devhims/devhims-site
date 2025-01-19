import NextImage, { getImageProps } from 'next/image';
import {
  Carousel,
  CarouselMainContainer,
  SliderMainItem,
  CarouselPrevious,
  CarouselNext,
  CarouselThumbsContainer,
  SliderThumbItem,
} from '@/components/MultiCarousel';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface PostCardProps {
  profileImage: string;
  name: string;
  handle: string;
  isVerified?: boolean;
  date: string;
  content: string;
  likes?: number;
  retweets?: number;
  replies?: number;
  views?: number;
  mediaUrls?: string[];
  isActiveTab?: boolean;
}

function formatContentWithHashtags(content: string) {
  // Split content by hashtags but keep the hashtags
  const parts = content.split(/(#\w+)/g);
  return parts.map((part, index) => {
    if (part.startsWith('#')) {
      return (
        <span
          key={index}
          className='text-blue-400 font-bold hover:underline cursor-pointer'
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

function getPostImageProps(imageUrl: string, alt: string) {
  return getImageProps({
    width: 48,
    height: 48,
    quality: 65,
    src: imageUrl,
    alt: alt,
  });
}

function usePrefetchPostImage(imageUrl: string | undefined, name: string) {
  useEffect(() => {
    if (!imageUrl) return;

    const prefetchProps = getImageProps({
      height: 256,
      quality: 80,
      width: 256,
      src: imageUrl,
      alt: `Post image of ${name}`,
    });

    try {
      const iprops = prefetchProps.props;
      const img = new Image();
      img.fetchPriority = 'low';
      img.decoding = 'async';
      if (iprops.sizes) img.sizes = iprops.sizes;
      if (iprops.srcSet) img.srcset = iprops.srcSet;
      if (iprops.src) img.src = iprops.src;
    } catch (e) {
      console.error('Failed to preload image:', prefetchProps.props.src, e);
    }
  }, [imageUrl, name]);
}

function PostMediaCarousel({
  mediaUrls,
  isActiveTab = false,
}: {
  mediaUrls: string[];
  isActiveTab?: boolean;
}) {
  if (!mediaUrls || mediaUrls.length === 0) return null;

  const orderedUrls = [...mediaUrls];

  return (
    <Dialog>
      <Carousel className='relative'>
        <CarouselMainContainer className='aspect-[16/9] group'>
          {orderedUrls.map((url, index) => (
            <SliderMainItem key={index} className='bg-transparent'>
              <DialogTrigger asChild>
                <div
                  className='relative size-full overflow-hidden rounded-xl border border-gray-800 cursor-pointer'
                  role='button'
                  aria-label={`View enlarged post media ${index + 1}`}
                >
                  <NextImage
                    src={url}
                    alt={`Post media ${index + 1}`}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover'
                    loading={isActiveTab && index === 0 ? 'eager' : 'lazy'}
                    decoding={isActiveTab && index === 0 ? 'sync' : 'async'}
                    quality={65}
                    fetchPriority={isActiveTab && index === 0 ? 'high' : 'low'}
                  />
                </div>
              </DialogTrigger>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        {orderedUrls.length > 1 && (
          <CarouselThumbsContainer className='mt-2'>
            {orderedUrls.map((url, index) => (
              <SliderThumbItem
                key={index}
                index={index}
                className='bg-transparent'
              >
                <div className='relative aspect-square rounded-md border border-gray-800 overflow-hidden'>
                  <NextImage
                    src={url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes='100px'
                    className='object-cover'
                  />
                </div>
              </SliderThumbItem>
            ))}
          </CarouselThumbsContainer>
        )}
      </Carousel>

      <DialogContent className='max-w-[90vw] h-[90vh] !p-0 !gap-0 bg-transparent border-none overflow-hidden'>
        <DialogTitle className='sr-only'>View post media</DialogTitle>
        <Carousel className='relative h-full'>
          <CarouselMainContainer className='h-full group'>
            {orderedUrls.map((url, index) => (
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
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                </div>
              </SliderMainItem>
            ))}
          </CarouselMainContainer>
          {orderedUrls.length > 1 && (
            <>
              <div className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50'>
                <CarouselNext className='h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition-colors border-0'>
                  <svg
                    className='h-4 w-4 sm:h-6 sm:w-6 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </CarouselNext>
              </div>
              <div className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50'>
                <CarouselPrevious className='h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition-colors border-0'>
                  <svg
                    className='h-4 w-4 sm:h-6 sm:w-6 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                </CarouselPrevious>
              </div>
            </>
          )}
        </Carousel>
        <DialogClose className='absolute top-2 right-2 sm:top-4 sm:right-4 rounded-full bg-black/60 p-1.5 sm:p-2 opacity-70 hover:opacity-100 transition-opacity focus:outline-none disabled:pointer-events-none z-50'>
          <X className='h-4 w-4 sm:h-5 sm:w-5 text-white' strokeWidth={2.5} />
          <span className='sr-only'>Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export function PostCard({
  profileImage,
  name,
  handle,
  isVerified = false,
  date,
  content,
  likes = 0,
  retweets = 0,
  replies = 0,
  views = 0,
  mediaUrls,
  isActiveTab = false,
}: PostCardProps) {
  const profileImageProps = getPostImageProps(profileImage, name);

  // Prefetch the first media image if available and tab is active
  usePrefetchPostImage(isActiveTab ? mediaUrls?.[0] : undefined, name);

  return (
    <article className='border-b border-gray-800 px-4 py-3 hover:bg-gray-900/30 transition-colors cursor-pointer'>
      <div className='flex gap-3'>
        <div className='flex-shrink-0'>
          <NextImage
            {...profileImageProps.props}
            className='rounded-full object-cover w-12 h-12'
            src={profileImage}
            loading={isActiveTab ? 'eager' : 'lazy'}
            decoding={isActiveTab ? 'sync' : 'async'}
          />
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex flex-wrap items-center gap-x-1 text-[15px]'>
            <div className='flex items-center gap-1 min-w-0 flex-shrink'>
              <span className='font-bold hover:underline truncate'>{name}</span>
              {isVerified && (
                <NextImage
                  src='/blue-twitter-verified-sign.svg'
                  alt='Verified'
                  width={14}
                  height={14}
                  className='inline-block flex-shrink-0'
                  loading='lazy'
                  decoding='async'
                />
              )}
            </div>
            <div className='sm:ml-1 flex items-center gap-1 text-gray-400 text-md'>
              <span className='truncate'>@{handle}</span>
              <span>·</span>
              <span>{date}</span>
            </div>
          </div>

          <p className='mt-1 text-[15px] whitespace-pre-wrap break-words text-gray-200'>
            {formatContentWithHashtags(content)}
          </p>

          {mediaUrls && mediaUrls.length > 0 && (
            <div className='mt-3'>
              <PostMediaCarousel
                mediaUrls={mediaUrls}
                isActiveTab={isActiveTab}
              />
            </div>
          )}

          <div className='flex justify-between mt-4 text-gray-400 text-sm max-w-md'>
            <div className='flex items-center gap-1 hover:text-blue-500 group transition-colors'>
              <svg
                className='w-[18px] h-[18px] group-hover:bg-blue-500/10 rounded-full p-[2px] transition-colors'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              <span>{replies}</span>
            </div>
            <div className='flex items-center gap-1 hover:text-green-500 group transition-colors'>
              <svg
                className='w-[18px] h-[18px] group-hover:bg-green-500/10 rounded-full p-[2px] transition-colors'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
              <span>{retweets}</span>
            </div>
            <div className='flex items-center gap-1 hover:text-pink-500 group transition-colors'>
              <svg
                className='w-[18px] h-[18px] group-hover:bg-pink-500/10 rounded-full p-[2px] transition-colors'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
              <span>{likes}</span>
            </div>
            <div className='flex items-center gap-1 hover:text-blue-500 group transition-colors'>
              <svg
                className='w-[18px] h-[18px] group-hover:bg-blue-500/10 rounded-full p-[2px] transition-colors'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
              <span>{views}K</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
