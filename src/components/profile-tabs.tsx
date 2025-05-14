// profile-tabs.tsx
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { posts, experienceData, tabItems, routes } from '@/constants';
import { PostCard } from '@/components/post-card';
import { Timeline } from '@/components/timeline';
import ContactForm from '@/components/contact-form';
import { TabsContainer } from '@/components/tabs-container';
import { Projects } from '@/components/projects';

export default function ProfileTabs() {
  const defaultTab = routes[0].tab;

  // Server-rendered content independent of active tab
  return (
    <TabsContainer defaultTab={defaultTab}>
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

      <div className='transition-all duration-300'>
        <TabsContent
          value='posts'
          className='mt-4 space-y-4 transition-opacity duration-300'
        >
          {posts.map((post, index) => (
            <PostCard key={index} {...post} index={index} />
          ))}
        </TabsContent>

        <TabsContent value='projects' className='m-6'>
          <Projects />
        </TabsContent>

        <TabsContent value='experience' className='m-6'>
          <Timeline items={experienceData} />
        </TabsContent>

        <TabsContent value='contact' className='m-6'>
          <ContactForm />
        </TabsContent>
      </div>
    </TabsContainer>
  );
}
