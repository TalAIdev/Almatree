/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    // Enable SWC minification
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize images
  images: {
    domains: ['localhost'],
  },
  // Enable webpack 5
  webpack: (config, { dev, isServer }) => {
    // Optimize for development
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
