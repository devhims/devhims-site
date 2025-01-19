'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectCard } from '@/components/project-card';
import { Timeline } from '@/components/timeline';
import { posts, experienceData, tabItems } from '@/constants';
import { PostCard } from '@/components/post-card';
import ContactForm from './ContactForm';
import { useSearchParams } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import { routes } from '@/constants';

export default function ProfileTabs() {
  const searchParams = useSearchParams();
  const tabFromParams = searchParams.get('tab');
  const validTabs = routes.map((route) => route.tab);
  const activeTab =
    tabFromParams && validTabs.includes(tabFromParams)
      ? tabFromParams
      : routes[0].tab;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  // Add swipe handlers
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
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      className='mt-4'
      onValueChange={handleTabChange}
    >
      <TabsList className='w-full flex justify-around bg-transparent h-auto relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gray-500/50'>
        {tabItems.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className='group font-semibold text-sm sm:text-sm md:text-base h-[42px] sm:h-[52px] flex items-center justify-center relative rounded-none text-gray-400 hover:text-white transition-all duration-300 data-[state=active]:text-white data-[state=active]:bg-transparent after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[4px] after:rounded-full after:transition-all after:duration-300 after:scale-x-0 after:bg-blue-500/40 data-[state=active]:after:scale-x-50 data-[state=active]:after:bg-blue-500'
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div {...handlers} className='transition-all duration-300'>
        <TabsContent
          value='posts'
          className='mt-4 space-y-4 transition-opacity duration-300'
        >
          {posts.map((post, index) => (
            <PostCard key={index} {...post} index={index} />
          ))}
        </TabsContent>
        <TabsContent value='projects' className='m-6'>
          <div className='space-y-6'>
            <ProjectCard
              title='RAG-based Document Chat'
              description='A knowledge retrieval system enabling secure document storage, chat, and Q&A functionality. Built with Next.js, Vector Databases, OpenAI APIs, and Langchain. Achieved 40% faster data retrieval and 70% reduction in manual processing time.'
              image='/sample.jpeg'
              link='#'
              isActiveTab={activeTab === 'projects'}
            />
            <ProjectCard
              title='3D Editor & AR Viewer'
              description='A web-based 3D model editor and AR viewer supporting both Android and iOS. Built with Next.js, React Three Fiber, WebXR, and 8th Wall. Features an intuitive interface and cross-platform compatibility.'
              image='/sample.jpeg'
              link='https://3d-web-editor.vercel.app/'
              isActiveTab={activeTab === 'projects'}
            />
          </div>
        </TabsContent>
        <TabsContent value='experience' className='m-6'>
          <Timeline
            items={experienceData}
            isActiveTab={activeTab === 'experience'}
          />
        </TabsContent>
        <TabsContent value='contact' className='m-6'>
          <ContactForm />
        </TabsContent>
      </div>
    </Tabs>
  );
}
