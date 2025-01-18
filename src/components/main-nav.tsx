import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { routes, blogUrl } from '@/constants';

export default function MainNav() {
  return (
    <nav className='flex flex-col gap-2 p-4'>
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Button
            key={route.tab}
            variant='ghost'
            className='w-full xl:justify-start justify-end gap-4 hover:bg-white/15 hover:rounded-3xl hover:text-inherit'
            asChild
          >
            {route.tab === 'blog' ? (
              <a href={blogUrl} target='_blank' rel='noopener noreferrer'>
                <Icon size={26} />
                <span className='hidden xl:inline text-lg font-semibold'>
                  {route.label}
                </span>
              </a>
            ) : (
              <Link href={`/?tab=${route.tab}`}>
                <Icon size={26} />
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
