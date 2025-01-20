import { routes } from '@/constants';
import MainNavWrapper from './main-nav-wrapper';

export default function MainNav() {
  return (
    <nav className='flex flex-col items-end gap-2 p-4'>
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <MainNavWrapper key={route.tab} label={route.label} tab={route.tab}>
            <Icon size={26} aria-hidden='true' />
            <span className='hidden xl:inline text-lg font-semibold'>
              {route.label}
            </span>
          </MainNavWrapper>
        );
      })}
    </nav>
  );
}
