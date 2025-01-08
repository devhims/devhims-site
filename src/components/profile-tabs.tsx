'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectCard } from '@/components/project-card';
import { Timeline } from '@/components/timeline';
import { PostCard } from '@/components/post-card';
import ContactForm from './ContactForm';
import { useEffect, useState } from 'react';
import type { TimelineItemProps } from '@/components/timeline';

const tabItems = [
  { value: 'posts', label: 'Posts' },
  { value: 'experience', label: 'Experience' },
  { value: 'projects', label: 'Projects' },
  { value: 'contact', label: 'Contact' },
] as const;

const posts = [
  {
    profileImage: '/profile.webp',
    name: 'Himanshu Gupta',
    handle: 'devhims',
    isVerified: true,
    date: 'Dec 20, 2024',
    content:
      'Building my personal website with Next.js 15, Tailwind CSS, and TypeScript! 🚀 Loving the developer experience so far.',
    likes: 42,
    retweets: 12,
    replies: 5,
    views: 1.2,
  },
  {
    profileImage: '/profile.webp',
    name: 'Himanshu Gupta',
    handle: 'devhims',
    isVerified: true,
    date: 'Oct 5, 2019',
    content: `October 5th and 6th at #gdg #devfest19 #nagpur turned out to be the most eventful days of 2019 so far.

𝐃𝐚𝐲 𝟏: Lightning talk on "the recipe of great AR."
𝐃𝐚𝐲 𝟐: Hands-on session on the implementation of light estimation API (ARCore).
𝐓𝐨𝐭𝐚𝐥 𝐬𝐥𝐞𝐞𝐩 𝐭𝐢𝐦𝐞: 10 hours combined. 🙈`,
    mediaUrls: [
      '/post-images/gdg/4.jpeg',
      '/post-images/gdg/2.jpeg',
      '/post-images/gdg/3.jpeg',
      '/post-images/gdg/1.jpeg',
    ],
    likes: 89,
    retweets: 24,
    replies: 15,
    views: 2.5,
  },
  {
    profileImage: '/profile.webp',
    name: 'Himanshu Gupta',
    handle: 'devhims',
    isVerified: true,
    date: 'July 11, 2019',
    content: `July 11th is my birthday, and also the day I do an annual review of my augmented reality projects and share the work done since last year with friends and close contacts. 

Here are some glimpses from this year's event. 

#augmentedreality #wework #meetup`,
    mediaUrls: [
      '/post-images/unity/1.jpeg',
      '/post-images/unity/2.jpeg',
      '/post-images/unity/3.jpeg',
      '/post-images/unity/4.jpeg',
    ],
    likes: 89,
    retweets: 24,
    replies: 15,
    views: 2.5,
  },
];

const experienceData: Array<Omit<TimelineItemProps, 'isLast'>> = [
  {
    date: '2021 - 2024',
    title: 'Senior Software Engineer',
    company: 'Appearition',
    description: `
• Designed and implemented a RAG based Chat with Documents AI web application, enabling secure and efficient document storage, retrieval, and Q&A functionality.

• Developed WebAR projects for brand promotion and educational purposes using 8thWall and WebXR.

• Created and launched "Gizmo," a unique 3D model viewing and editing platform that enables developers to quickly evaluate model performance and rendering on mobile devices.

• Involved in the development of the Appearition Web SDK and created samples to demonstrate the platform's capabilities.

• Conducted thorough code reviews and enhanced software architecture to ensure scalable and maintainable solutions.`,
    skills: [
      'WebAR',
      'WebXR',
      '8thWall',
      'React',
      'TypeScript',
      'Next.js',
      'AI',
      '3D',
    ],
  },
  {
    date: '2020 - 2021',
    title: 'Founder and Lead Developer',
    company: 'Cosmoreal',
    description: `
• Developed an AR-based mobile app that understands space, offering a true-to-life experience for furniture visualization and interior design.

• Consulted office spaces and top-tier builders in Bangalore in running XR-based marketing campaigns.

• Led the development of the company site and other projects, focusing on AR/VR solutions.`,
    skills: [
      'AR/VR',
      'Unity',
      'Mobile Development',
      'XR Marketing',
      'Entrepreneurship',
    ],
  },
  {
    date: '2019 - 2021',
    title: 'Co-organizer Unity Bangalore Community',
    company: 'Unity',
    description: `
• Provided a platform for indie Unity developers and artists to up-skill and get help from others in the field.

• Hosted 8 events and maintained an active WhatsApp group.

• Built and managed the community through Meetup platform.`,
    skills: [
      'Unity',
      'Community Management',
      'Event Organization',
      'Public Speaking',
    ],
  },
  {
    date: '2016 - 2019',
    title: 'Mentor and Project Reviewer',
    company: 'Udacity',
    description: `
• Reviewed student projects for the Virtual Reality, Digital Marketing, and Android Basics programs.

• Completed over 1500 reviews with an average student rating of 4.95/5.

• Created coding standards and best practices, ensuring students wrote clean, efficient, and maintainable code, aligning with industry trends.

• Trained and guided new mentors, facilitating knowledge-sharing and professional development to maintain high review standards and team effectiveness.`,
    skills: [
      'Virtual Reality',
      'Android',
      'Digital Marketing',
      'Mentoring',
      'Code Review',
    ],
  },
];

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState<string>('posts');

  useEffect(() => {
    // Function to handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && tabItems.some((tab) => tab.value === hash)) {
        setActiveTab(hash);
      }
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.location.hash = value;
  };

  return (
    <Tabs
      defaultValue='posts'
      value={activeTab}
      onValueChange={handleTabChange}
      className='mt-4'
    >
      <TabsList className='w-full flex justify-around bg-transparent h-auto relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gray-500/50'>
        {tabItems.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className='group font-semibold text-sm sm:text-sm md:text-base h-[42px] sm:h-[52px] flex items-center justify-center relative rounded-none text-gray-500 hover:bg-gray-800/50 hover:text-white transition-colors data-[state=active]:text-white data-[state=active]:bg-transparent after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[4px] after:rounded-full after:transition-colors after:scale-x-0 after:bg-blue-500/40 data-[state=active]:after:scale-x-50 data-[state=active]:after:bg-blue-500'
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value='posts' className='mt-4 space-y-4'>
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </TabsContent>
      <TabsContent value='projects' className='mt-4'>
        <div className='space-y-4 px-4'>
          <ProjectCard
            title='RAG-based Document Chat'
            description='A knowledge retrieval system enabling secure document storage, chat, and Q&A functionality. Built with Next.js, Vector Databases, OpenAI APIs, and Langchain. Achieved 40% faster data retrieval and 70% reduction in manual processing time.'
            image='/sample.jpeg'
            link='#'
          />
          <ProjectCard
            title='3D Editor & AR Viewer'
            description='A web-based 3D model editor and AR viewer supporting both Android and iOS. Built with Next.js, React Three Fiber, WebXR, and 8th Wall. Features an intuitive interface and cross-platform compatibility.'
            image='/sample.jpeg'
            link='https://3d-web-editor.vercel.app/'
          />
        </div>
      </TabsContent>
      <TabsContent value='experience' className='m-6'>
        <Timeline items={experienceData} />
      </TabsContent>
      <TabsContent value='contact' className='m-6'>
        <ContactForm />
      </TabsContent>
    </Tabs>
  );
}
