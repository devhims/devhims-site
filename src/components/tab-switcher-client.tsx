// tab-switcher-client.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import { routes, tabItems } from '@/constants';
import { useEffect, useState } from 'react';

export function TabSwitcher({
  children,
  defaultTab,
}: {
  children: React.ReactNode;
  defaultTab: string;
}) {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  // Get current tab from URL or default
  const tabFromParams = searchParams.get('tab');
  const validTabs = routes.map((route) => route.tab);
  const activeTab =
    tabFromParams && validTabs.includes(tabFromParams)
      ? tabFromParams
      : defaultTab;

  // Handle initial mount
  useEffect(() => {
    setMounted(true);
    // Set initial URL if no tab param exists
    if (!tabFromParams) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', defaultTab);
      window.history.replaceState(null, '', `?${params.toString()}`);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update Radix UI Tabs state via custom event
    const event = new CustomEvent('tabChange', { detail: activeTab });
    document.dispatchEvent(event);

    // Force a tab value change
    const tabsElement = document.querySelector('[role="tablist"]');
    if (tabsElement) {
      const tabButton = tabsElement.querySelector(
        `[value="${activeTab}"]`
      ) as HTMLButtonElement;
      if (tabButton) {
        tabButton.click();
      }
    }
  }, [activeTab, mounted]);

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

  return (
    <div {...handlers} className='w-full min-h-screen touch-pan-y'>
      {children}
    </div>
  );
}
