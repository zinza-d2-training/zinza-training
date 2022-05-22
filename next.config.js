/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true
  },
  ignoreDuringBuilds: true
};

module.exports = nextConfig;
