import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    inlineCss: true,
    reactCompiler: true,
  },
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '4xwzqx0mrsurcmt8.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
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
