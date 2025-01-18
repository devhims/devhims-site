import { tabItems } from '@/constants';

export function ProfileTabsSkeleton() {
  return (
    <div className='animate-pulse mt-4'>
      {/* Tabs List Skeleton */}
      <div className='w-full flex justify-around bg-transparent h-auto relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gray-500/50'>
        {tabItems.map((tab) => (
          <div
            key={tab.value}
            className='h-[42px] sm:h-[52px] w-24 bg-white/15 rounded-lg'
          />
        ))}
      </div>

      {/* Content Skeleton */}
      <div className='mt-4 space-y-4 px-4'>
        {/* Posts-like skeleton items */}
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className='border-b border-gray-800 p-4 space-y-4'>
            <div className='flex gap-4'>
              <div className='w-12 h-12 bg-white/15 rounded-full' />
              <div className='flex-1 space-y-2'>
                <div className='h-4 bg-white/15 rounded w-3/4' />
                <div className='h-4 bg-white/15 rounded w-1/2' />
              </div>
            </div>
            <div className='h-24 bg-white/15 rounded' />
          </div>
        ))}
      </div>
    </div>
  );
}
