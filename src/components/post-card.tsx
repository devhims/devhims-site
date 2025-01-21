// post-card.tsx
import NextImage from 'next/image';
import { PostMediaCarousel } from './post-media-carousel';
import { PostInteractionBar } from './post-interaction-bar-client';
import { blueTwitterVerifiedSign } from '@/constants';

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
  index: number;
}

// Component for clickable hashtag
function Hashtag({ tag }: { tag: string }) {
  return (
    <span className='text-blue-400 font-bold hover:underline cursor-pointer'>
      {tag}
    </span>
  );
}

// Format content into React nodes
function formatContentWithHashtags(content: string) {
  const parts = content.split(/(#\w+)/g);
  return parts.map((part, index) => {
    if (part.startsWith('#')) {
      return <Hashtag key={index} tag={part} />;
    }
    return part;
  });
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
  index,
}: PostCardProps) {
  const formattedContent = formatContentWithHashtags(content);

  return (
    <article className='border-b border-gray-800 px-4 py-3 hover:bg-gray-900/30 transition-colors cursor-pointer'>
      <div className='flex gap-3'>
        <div className='flex-shrink-0'>
          <NextImage
            src={profileImage}
            alt={name}
            width={48}
            height={48}
            className='rounded-full object-cover w-12 h-12'
          />
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex flex-wrap items-center gap-x-1 text-[15px]'>
            <div className='flex items-center gap-1 min-w-0 flex-shrink'>
              <span className='font-bold hover:underline truncate'>{name}</span>
              {isVerified && (
                <NextImage
                  src={blueTwitterVerifiedSign}
                  alt='Verified'
                  width={14}
                  height={14}
                  className='inline-block flex-shrink-0'
                />
              )}
            </div>
            <div className='sm:ml-1 flex items-center gap-1 text-gray-400 text-md'>
              <span className='truncate'>@{handle}</span>
              <span>·</span>
              <span>{date}</span>
            </div>
          </div>

          {/* Content section - Now using React nodes directly */}
          <p className='mt-1 text-[15px] whitespace-pre-wrap break-words text-gray-200'>
            {formattedContent}
          </p>

          {mediaUrls && mediaUrls.length > 0 && (
            <div className='mt-3'>
              <PostMediaCarousel mediaUrls={mediaUrls} index={index} />
            </div>
          )}

          <PostInteractionBar
            likes={likes}
            retweets={retweets}
            replies={replies}
            views={views}
          />
        </div>
      </div>
    </article>
  );
}
