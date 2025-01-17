import { Home, BookOpen, Briefcase, Code2, Mail } from 'lucide-react';

export const routes = [
  { label: 'Home', icon: Home, tab: 'posts' },
  { label: 'Blog', icon: BookOpen, tab: 'blog' },
  {
    label: 'Experience',
    icon: Briefcase,
    tab: 'experience',
  },
  { label: 'Projects', icon: Code2, tab: 'projects' },
  { label: 'Contact', icon: Mail, tab: 'contact' },
];
