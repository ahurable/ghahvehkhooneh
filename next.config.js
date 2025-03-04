const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  async rewrites() {
    return [
      {
        source: '/sliders',
        destination: 'https://backend.gappy.ir/api/sliders?format=json',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.195.81',
        port: '8000',
        pathname: '/media/**',
      },

      {
        protocol: 'http',
        hostname: '94.101.184.56',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'backend.gappy.ir',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.gappy.ir',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.gappy.ir',
        port: '',
        pathname: '//media/**',
      },
    ],
  },
});

module.exports = nextConfig;
