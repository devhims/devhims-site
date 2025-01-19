// tab-switcher-client.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import { routes, tabItems } from '@/constants';
import { useEffect, useState, cloneElement } from 'react';
import { TabsProps } from '@radix-ui/react-tabs';

// Define the props type for our TabSwitcher
interface TabSwitcherProps {
  children: React.ReactElement<TabsProps>;
  defaultTab: string;
}

export function TabSwitcher({ children, defaultTab }: TabSwitcherProps) {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  // Get current tab from URL or default
  const tabFromParams = searchParams.get('tab');
  const validTabs = routes.map((route) => route.tab);
  const activeTab =
    tabFromParams && validTabs.includes(tabFromParams)
      ? tabFromParams
      : defaultTab;

  useEffect(() => {
    setMounted(true);
    // Set initial URL if no tab param exists
    if (!tabFromParams) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', defaultTab);
      window.history.replaceState(null, '', `?${params.toString()}`);
    }
  }, []);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      const currentIndex = tabItems.findIndex((tab) => tab.value === activeTab);
      if (currentIndex < tabItems.length - 1 && eventData.velocity > 0.3) {
        handleTabChange(tabItems[currentIndex + 1].value);
      }
    },
    onSwipedRight: (eventData) => {
      const currentIndex = tabItems.findIndex((tab) => tab.value === activeTab);
      if (currentIndex > 0 && eventData.velocity > 0.3) {
        handleTabChange(tabItems[currentIndex - 1].value);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
    swipeDuration: 500,
    delta: 50,
    trackTouch: true,
  });

  // Clone the Tabs component and inject the active tab value and change handler
  const enhancedChildren = cloneElement(children, {
    value: activeTab,
    onValueChange: handleTabChange,
  } as Partial<TabsProps>);

  return (
    <div {...handlers} className='w-full min-h-screen touch-pan-y'>
      {mounted ? enhancedChildren : children}
    </div>
  );
}
