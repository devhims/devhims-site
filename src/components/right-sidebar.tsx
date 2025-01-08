import { cn } from '@/lib/utils';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import SpotlightCard from './SpotlightCard';

export function RightSidebar({ className }: { className?: string }) {
  return (
    <div className={cn('w-80 p-4 space-y-4', className)}>
      <SpotlightCard>
        <div className='mb-4'>
          <h3 className='text-xl font-bold'>Skills Spotlight</h3>
        </div>
        <div className='flex flex-wrap gap-2'>
          <HoverEffect items={skills} />
        </div>
      </SpotlightCard>

      <SpotlightCard>
        <div className='mb-4'>
          <h3 className='text-xl font-bold'>Featured Blog Posts</h3>
        </div>
        <div className='space-y-4'>
          {blogPosts.map((post) => (
            <div key={post.title} className='group cursor-pointer space-y-1'>
              <h3 className='font-medium group-hover:text-blue-400 transition-colors'>
                {post.title}
              </h3>
              <p className='text-xs font-mono text-gray-400'>{post.date}</p>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </div>
  );
}

const skills = [
  {
    id: 1,
    name: 'React',
  },
  {
    id: 2,
    name: 'Next.js',
  },
  {
    id: 3,
    name: 'TypeScript',
  },
  {
    id: 4,
    name: 'Node.js',
  },
  {
    id: 5,
    name: 'TailwindCSS',
  },
  {
    id: 6,
    name: 'WebAR',
  },
  {
    id: 7,
    name: 'PostgreSQL',
  },
  {
    id: 8,
    name: 'Azure',
  },
];

const blogPosts = [
  {
    title: 'Building a Modern Web Application with Next.js',
    date: 'January 1, 2024',
  },
  {
    title: 'Understanding TypeScript Generics',
    date: 'December 25, 2023',
  },
  {
    title: 'The Power of Server Components',
    date: 'December 20, 2023',
  },
];
