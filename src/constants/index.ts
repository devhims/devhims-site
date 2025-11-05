import { TimelineItemProps } from '@/components/timeline';
import { Home, BookOpen, Briefcase, Code2, Mail } from 'lucide-react';

export const cvUrl = 'https://cv.devhims.com';

export const blueTwitterVerifiedSign = '/blue-twitter-verified-sign.svg';
export const noise = '/noise.png';

export const routes = [
  { label: 'Home', icon: Home, tab: 'posts' },
  { label: 'Resume', icon: BookOpen, tab: 'cv' },
  {
    label: 'Experience',
    icon: Briefcase,
    tab: 'experience',
  },
  { label: 'Projects', icon: Code2, tab: 'projects' },
  { label: 'Contact', icon: Mail, tab: 'contact' },
];

export const tabItems = [
  { value: 'posts', label: 'Posts' },
  { value: 'experience', label: 'Experience' },
  { value: 'projects', label: 'Projects' },
  { value: 'contact', label: 'Contact' },
];

export const posts = [
  {
    profileImage: '/profile.png',
    name: 'Himanshu Gupta',
    handle: 'devhims',
    isVerified: true,
    date: 'Dec 20, 2024',
    content:
      'Building my personal website with Next.js 16, Tailwind CSS 4, and TypeScript! 🚀 Loving the developer experience so far.',
    likes: 42,
    retweets: 12,
    replies: 5,
    views: 1.2,
  },
  {
    profileImage: '/profile.png',
    name: 'Himanshu Gupta',
    handle: 'devhims',
    isVerified: true,
    date: 'Oct 5, 2019',
    content: `October 5th and 6th at #gdg #devfest19 #nagpur turned out to be the most eventful days of 2019 so far.
  
𝐃𝐚𝐲 𝟏: Lightning talk on "the recipe of great AR."
𝐃𝐚𝐲 𝟐: Hands-on session on the implementation of light estimation API (ARCore).
𝐓𝐨𝐭𝐚𝐥 𝐬𝐥𝐞𝐞𝐩 𝐭𝐢𝐦𝐞: 10 hours combined. 🙈`,
    mediaUrls: [
      '/posts/gdg/4.webp',
      '/posts/gdg/2.webp',
      '/posts/gdg/3.webp',
      '/posts/gdg/1.webp',
    ],
    likes: 89,
    retweets: 24,
    replies: 15,
    views: 2.5,
  },
  {
    profileImage: '/profile.png',
    name: 'Himanshu Gupta',
    handle: 'devhims',
    isVerified: true,
    date: 'July 11, 2019',
    content: `July 11th is my birthday, and also the day I do an annual review of my augmented reality projects and share the work done since last year with friends and close contacts. 
  
Here are some glimpses from this year's event. 

#augmentedreality #wework #meetup`,
    mediaUrls: [
      '/posts/unity/1.webp',
      '/posts/unity/2.webp',
      '/posts/unity/3.webp',
      '/posts/unity/4.webp',
    ],
    likes: 89,
    retweets: 24,
    replies: 15,
    views: 2.5,
  },
];

export const experienceData: Array<Omit<TimelineItemProps, 'isLast'>> = [
  {
    date: '2025 - Present',
    title: 'Platform Engineer',
    company: 'WebLinq',
    logo: '/experience/weblinq_logo.png',
    description: `
  • Created WebLinq, a Cloudflare workers based web scraping and browser automation platform for real-time data access by developers and AI systems.
  
  • Implemented intelligent browser session reuse via Durable Objects for efficient session reuse and performance optimization.
  
  • Built a secure API key system with endpoints for search, screenshots, HTML/Markdown/PDF extraction, and MCP integration.
  
  • Developed a Next.js dashboard and docs site for visual API interaction and quick onboarding.
  
  • Oversaw the full product lifecycle from architecture to launch on Product Hunt.`,
    skills: [
      'Cloudflare Workers',
      'Durable Objects',
      'Browser Automation',
      'Web Scraping',
      'AI Integration',
      'MCP',
      'Next.js',
      'TypeScript',
    ],
  },
  {
    date: '2021 - 2024',
    title: 'Senior Software Engineer',
    company: 'Immersive Realities',
    logo: '/experience/ir.webp',
    description: `
  • Designed and implemented a RAG based Chat with Documents AI web application, enabling secure and efficient document storage, retrieval, and Q&A functionality.
  
  • Developed WebAR projects for brand promotion and educational purposes using 8thWall and WebXR.
  
  • Created and launched "Gizmo," a unique 3D model viewing and editing platform that enables developers to quickly evaluate model performance and rendering on mobile devices.
  
  • Involved in the development of the Appearition Web SDK and created samples to demonstrate the platform's capabilities.
  
  • Conducted thorough code reviews and enhanced software architecture to ensure scalable and maintainable solutions.`,
    skills: [
      'React',
      'TypeScript',
      'Next.js',
      'AI',
      'WebAR',
      'RAG',
      '8thWall',
      '3D',
    ],
  },
  {
    date: '2020 - 2021',
    title: 'Founder and Lead Developer',
    company: 'Cosmoreal',
    logo: '/experience/cosmoreal.webp',
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
    logo: '/experience/unity.webp',
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
    logo: '/experience/udacity.webp',
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

export const projects = [
  {
    title: 'WebLinq',
    description:
      'High-performance web scraping and automation platform built on Cloudflare Workers, featuring session reuse and a full API for search, screenshots, markdown extraction, YouTube captions, and AI-powered data extraction.',
    image: '/projects/weblinq.png',
    link: 'https://github.com/devhims/weblinq',
  },
  {
    title: 'YouTube Caption Extractor',
    description:
      'A lightweight package to scrape and parse captions (subtitles) from YouTube videos, supporting both user-submitted and auto-generated captions with language options.',
    image: '/projects/captions.png',
    link: 'https://github.com/devhims/youtube-caption-extractor',
  },
  {
    title: 'Model Viewer React',
    description:
      'Tailor-made components and layouts to speed up your AR workflow on the web with React. Based on the model-viewer component.',
    image: '/projects/model-viewer.png',
    link: 'https://github.com/devhims/model-viewer-react',
  },
  {
    title: 'Easy Object Pooling',
    description:
      'Provides an easy implementation of object pooling in a Unity project. Useful for any 3D/2D/AR/VR project.',
    image: '/projects/object-pooling.png',
    link: 'https://github.com/devhims/Easy-Object-Pooling',
  },
  {
    title: 'React 8thWall AFrame',
    description:
      '8thwall integration with AFrame for React-based web augmented reality applications.',
    image: '/projects/8th-wall.png',
    link: 'https://github.com/devhims/react-8thwall-aframe',
  },
];
