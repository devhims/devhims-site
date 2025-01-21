import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { routes } from '@/constants';

export function MainNavSkeleton({ className }: { className?: string }) {
  return (
    <nav className={cn('flex flex-col gap-2 p-4', className)}>
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Button
            key={route.tab}
            variant='ghost'
            className='w-full xl:justify-start justify-end gap-4 hover:bg-white/15 hover:rounded-3xl hover:text-inherit'
          >
            <Icon size={26} />
            <span className='hidden xl:inline text-lg font-semibold animate-pulse'>
              {route.label}
            </span>
          </Button>
        );
      })}
    </nav>
  );
}
