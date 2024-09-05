/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
      {
        // This works, and returns appropriate Response headers:
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value:
              value: 'no-store, max-age=0',,
          },
        
      {
        // This doesn't work for 'Cache-Control' key (works for others though):
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // Instead of this value:
             value: 'no-store, max-age=0',
            // Cache-Control response header is `public, max-age=60` in production
            // and `public, max-age=0, must-revalidate` in development
          },
        ],
      },
      {
        source: '/api/images',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
      {
        source: '/images',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image-store.public.blob.vercel-storage.com',
        port: '',
      },
    ],
    disableStaticImages: true,
    minimumCacheTTL: 5,
  },
};
export default nextConfig;