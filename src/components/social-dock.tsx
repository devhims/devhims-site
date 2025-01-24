'use client';

import { XLogo } from '@/components/icons/XLogo';
import { LinkedinLogo } from '@/components/icons/LinkedinLogo';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';
import dynamic from 'next/dynamic';
import { type DockProps } from '@/components/Dock';

const DockDynamic = dynamic(() => import('@/components/Dock'), {
  ssr: false,
});

const socialLinks = [
  {
    href: 'https://linkedin.com/in/creativehims/',
    label: 'LinkedIn',
    icon: LinkedinLogo,
    size: 18,
  },
  { href: 'https://github.com', label: 'GitHub', icon: GithubIcon, size: 20 },
  {
    href: 'https://instagram.com/oh.thathimanshu',
    label: 'Instagram',
    icon: InstagramIcon,
    size: 18,
  },
  {
    href: 'https://www.youtube.com/@devhims',
    label: 'Youtube',
    icon: YoutubeIcon,
    size: 22,
  },
  { href: 'https://x.com/devhims', label: 'X.com', icon: XLogo, size: 16 },
];

type SocialDockProps = Partial<Omit<DockProps, 'items'>>;

export function SocialDock({
  collapsible = false,
  position = 'right',
  responsive = 'bottom',
  size,
  ...rest
}: SocialDockProps = {}) {
  return (
    <DockDynamic
      collapsible={collapsible}
      position={position}
      responsive={responsive}
      items={socialLinks}
      size={size}
      {...rest}
    />
  );
}
