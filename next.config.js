/** @type {import('next').NextConfig} */
const nextConfig = {
  //  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wheedletechnologies.ai',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
