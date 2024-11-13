/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "image.tmdb.org",
      "nextflix-azure.vercel.app",
      "cdn-icons-png.freepik.com",
    ],
  },
};

export default nextConfig;
