'use client';

import { XLogo } from '@/components/icons/XLogo';
import { LinkedinLogo } from '@/components/icons/LinkedinLogo';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';
import Dock from '@/components/Dock';
import { type DockProps } from '@/components/Dock';

const socialLinks = [
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    icon: LinkedinLogo,
    size: 18,
  },
  { href: 'https://github.com', label: 'GitHub', icon: GithubIcon, size: 20 },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: InstagramIcon,
    size: 18,
  },
  {
    href: 'https://youtube.com',
    label: 'Youtube',
    icon: YoutubeIcon,
    size: 22,
  },
  { href: 'https://x.com', label: 'X.com', icon: XLogo, size: 16 },
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
    <Dock
      collapsible={collapsible}
      position={position}
      responsive={responsive}
      items={socialLinks}
      size={size}
      {...rest}
    />
  );
}
