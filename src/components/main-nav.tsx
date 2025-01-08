'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, Briefcase, Code2, BookOpen, Mail } from 'lucide-react';
import { SocialDock } from './social-dock';
import { useRouter, usePathname } from 'next/navigation';

const routes = [
  { href: '/#posts', label: 'Home', icon: Home },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/#experience', label: 'Experience', icon: Briefcase },
  { href: '/#projects', label: 'Projects', icon: Code2 },
  { href: '/#contact', label: 'Contact', icon: Mail },
];

export function MainNav({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    if (pathname === '/' && href.startsWith('/#')) {
      const hash = href.split('#')[1];
      window.location.hash = hash;
    } else {
      router.push(href);
    }
  };

  return (
    <nav className={cn('flex flex-col gap-2 p-4', className)}>
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Button
            key={route.href}
            variant='ghost'
            className='w-full xl:justify-start justify-end gap-4 hover:bg-white/15 hover:rounded-3xl hover:text-inherit'
            onClick={() => handleNavigation(route.href)}
          >
            <Icon size={26} />
            <span className='hidden xl:inline text-lg font-semibold'>
              {route.label}
            </span>
          </Button>
        );
      })}

      <div className='mt-auto pt-4'>
        <SocialDock />
      </div>
    </nav>
  );
}
