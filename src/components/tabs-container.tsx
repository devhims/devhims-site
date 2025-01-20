'use client';

import { Tabs } from '@/components/ui/tabs';
import { useSwipeableTab } from '@/hooks/use-swipeable-tab';
import { Suspense } from 'react';

interface TabsContainerProps {
  defaultTab: string;
  children: React.ReactNode;
}

// Inner component that uses the hook
function TabsContent({ defaultTab, children }: TabsContainerProps) {
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

// Outer component that provides Suspense boundary
export function TabsContainer(props: TabsContainerProps) {
  return (
    <Suspense
      fallback={
        <TabsFallback defaultTab={props.defaultTab}>
          {props.children}
        </TabsFallback>
      }
    >
      <TabsContent {...props} />
    </Suspense>
  );
}

// Fallback component that shows initial state while loading
function TabsFallback({ defaultTab, children }: TabsContainerProps) {
  return (
    <div className='w-full min-h-screen'>
      <Tabs defaultValue={defaultTab} className='mt-4'>
        {children}
      </Tabs>
    </div>
  );
}
