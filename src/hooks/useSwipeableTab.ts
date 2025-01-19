'use client';

import { useSearchParams } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import { routes, tabItems } from '@/constants';

export function useSwipeableTab(defaultTab: string) {
  const searchParams = useSearchParams();

  // Get current tab from URL or default
  const tabFromParams = searchParams.get('tab');
  const validTabs = routes.map((route) => route.tab);
  const activeTab =
    tabFromParams && validTabs.includes(tabFromParams)
      ? tabFromParams
      : defaultTab;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  const swipeHandlers = useSwipeable({
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

  return {
    activeTab,
    handleTabChange,
    swipeHandlers,
  };
}
