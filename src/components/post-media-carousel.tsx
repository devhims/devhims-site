import NextImage from 'next/image';
import { PostMediaCarouselClient } from './post-media-carousel-client';

interface PostMediaCarouselProps {
  mediaUrls: string[];
  index: number;
}

export function PostMediaCarousel({
  mediaUrls,
  index,
}: PostMediaCarouselProps) {
  if (!mediaUrls || mediaUrls.length === 0) return null;

  // For server-side rendering, we'll show a simple grid of images
  if (mediaUrls.length === 1) {
    return (
      <section className='mt-3' role='region' aria-label='Single post media'>
        {' '}
        {/* Changed from div to section */}
        <figure className='relative aspect-[16/9]'>
          {' '}
          {/* Changed from div to figure */}
          <NextImage
            src={mediaUrls[0]}
            alt='Post media'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover rounded-xl'
          />
        </figure>
      </section>
    );
  }

  // For multiple images, render them in a grid on server
  const gridClass =
    mediaUrls.length === 2
      ? 'grid-cols-2'
      : mediaUrls.length === 3
      ? 'grid-cols-2'
      : 'grid-cols-2';

  const serverContent = (
    <section className='mt-3' role='region' aria-label='Post media gallery'>
      <div className={`grid ${gridClass} gap-1 aspect-[16/9]`}>
        {mediaUrls.slice(0, 4).map((url, imgIndex) => (
          <figure
            key={imgIndex}
            className={`relative ${
              mediaUrls.length === 3 && imgIndex === 0 ? 'row-span-2' : ''
            }`}
          >
            <NextImage
              src={url}
              alt={`Post media ${imgIndex + 1} of ${mediaUrls.length}`}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-cover rounded-xl'
            />
          </figure>
        ))}
      </div>
    </section>
  );

  // Wrap with client component for interactivity
  return (
    <PostMediaCarouselClient mediaUrls={mediaUrls} index={index}>
      {serverContent}
    </PostMediaCarouselClient>
  );
}
