import { Button } from '@/components/ui/button';
import { routes, blogUrl } from '@/constants';
import Link from 'next/link';

export default function MainNav() {
  return (
    <nav className='flex flex-col items-end gap-2 p-4'>
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Button
            key={route.tab}
            variant='ghost'
            className='flex items-center xl:w-full w-fit xl:justify-start justify-end gap-4 hover:bg-white/15 hover:rounded-3xl hover:text-inherit'
            aria-label={route.label}
            asChild
          >
            <Link
              href={
                route.tab === 'blog'
                  ? blogUrl
                  : { pathname: '/', query: { tab: route.tab } }
              }
              {...(route.tab === 'blog' ? { target: '_blank' } : {})}
            >
              <Icon
                size={24}
                strokeWidth={1.5}
                style={{ width: '24px', height: '24px' }}
                aria-hidden='true'
              />
              <span className='hidden xl:inline text-lg font-semibold'>
                {route.label}
              </span>
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
