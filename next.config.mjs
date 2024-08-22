/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    env: {
      NEXT_PUBLIC_API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN,
    },
  }
  
export default nextConfig;
