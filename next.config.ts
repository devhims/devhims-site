import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '4xwzqx0mrsurcmt8.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
