import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    inlineCss: true,
  },
  images: {
    minimumCacheTTL: 31536000,
  },
  redirects: async () => {
    return [
      {
        source: '/cv',
        destination: 'https://cv.devhims.com',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
