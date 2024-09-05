/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image-store.public.blob.vercel-storage.com',
        port: '',
      },
    ],
    minimumCacheTTL: 5
  },
};
export default nextConfig;
