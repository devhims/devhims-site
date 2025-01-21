import NextImage from 'next/image';
import { PostMediaCarouselClient } from './post-media-carousel-client';
import { PostMediaPrefetcher } from './post-media-prefetcher';

interface PostMediaCarouselProps {
  mediaUrls: string[];
  index: number;
}

export function PostMediaCarousel({
  mediaUrls,
  index,
}: PostMediaCarouselProps) {
  if (!mediaUrls || mediaUrls.length === 0) return null;

  // For single image posts
  if (mediaUrls.length === 1) {
    return (
      <section className='mt-3' role='region' aria-label='Single post media'>
        <PostMediaPrefetcher mediaUrls={mediaUrls} />
        <figure className='relative aspect-[16/9]'>
          <NextImage
            src={mediaUrls[0]}
            alt='Post media'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover rounded-xl'
            priority={index < 2}
            loading={index < 2 ? 'eager' : 'lazy'}
            quality={index < 2 ? 85 : 75}
            placeholder='blur'
            blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENDPzE2O0FBNi5QWUE5SDQ7UmBGV1pfdnxmdGtnamBja2b/2wBDARUXFyAeIBogHB4gICBmQzYrK2tmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmb/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
          />
        </figure>
      </section>
    );
  }

  // For multiple images
  const gridClass =
    mediaUrls.length === 2
      ? 'grid-cols-2'
      : mediaUrls.length === 3
      ? 'grid-cols-2'
      : 'grid-cols-2';

  const serverContent = (
    <section className='mt-3' role='region' aria-label='Post media gallery'>
      <PostMediaPrefetcher mediaUrls={mediaUrls} />
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
              priority={index < 2 && imgIndex === 0}
              loading={index < 2 && imgIndex === 0 ? 'eager' : 'lazy'}
              quality={index < 2 && imgIndex === 0 ? 85 : 75}
              placeholder='blur'
              blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVigAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENDPzE2O0FBNi5QWUE5SDQ7UmBGV1pfdnxmdGtnamBja2b/2wBDARUXFyAeIBogHB4gICBmQzYrK2tmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmb/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
            />
          </figure>
        ))}
      </div>
    </section>
  );

  return (
    <PostMediaCarouselClient mediaUrls={mediaUrls} index={index}>
      {serverContent}
    </PostMediaCarouselClient>
  );
}
