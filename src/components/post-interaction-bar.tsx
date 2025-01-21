interface PostInteractionBarProps {
  likes: number;
  retweets: number;
  replies: number;
  views: number;
}

export function PostInteractionBar({
  likes,
  retweets,
  replies,
  views,
}: PostInteractionBarProps) {
  return (
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
  );
}
