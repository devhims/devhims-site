import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Himanshu Gupta | Devhims',
  description:
    'Full-stack web developer and design engineer specializing in React, Next.js, and modern web technologies. Creating performant and beautiful web experiences from India.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL! || 'http://localhost:3000'
  ),
  openGraph: {
    images: '/opengraph-image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
        <Toaster richColors />
      </body>
    </html>
  );
}
