'use client';

import { Tabs } from '@/components/ui/tabs';
import { useSwipeableTab } from '@/hooks/useSwipeableTab';

interface TabsContainerProps {
  defaultTab: string;
  children: React.ReactNode;
}

export function TabsContainer({ defaultTab, children }: TabsContainerProps) {
  const { activeTab, handleTabChange, swipeHandlers } =
    useSwipeableTab(defaultTab);

  return (
    <div {...swipeHandlers} className='w-full min-h-screen touch-pan-y'>
      <Tabs
        defaultValue={defaultTab}
        value={activeTab}
        onValueChange={handleTabChange}
        className='mt-4'
      >
        {children}
      </Tabs>
    </div>
  );
}
