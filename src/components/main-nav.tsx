import { Button } from '@/components/ui/button';
import { routes, blogUrl } from '@/constants';
import Link from 'next/link';

export default function MainNav() {
  return (
    <nav className='flex flex-col items-end gap-3 p-4'>
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Button
            key={route.tab}
            variant='ghost'
            className='xl:w-full w-fit xl:justify-start justify-end hover:bg-white/15 hover:rounded-3xl hover:text-inherit'
            aria-label={route.label}
          >
            {route.tab === 'blog' ? (
              <a
                href={blogUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-4 p-2'
              >
                <Icon
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden='true'
                  style={{ width: '24px', height: '24px' }}
                />
                <span className='hidden xl:inline text-lg font-semibold'>
                  {route.label}
                </span>
              </a>
            ) : (
              <Link
                href={{
                  pathname: '/',
                  query: { tab: route.tab },
                }}
                className='flex items-center gap-4 p-2'
              >
                <Icon
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden='true'
                  style={{ width: '24px', height: '24px' }}
                />
                <span className='hidden xl:inline text-lg font-semibold'>
                  {route.label}
                </span>
              </Link>
            )}
          </Button>
        );
      })}
    </nav>
  );
}
