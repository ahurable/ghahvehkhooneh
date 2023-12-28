/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


module.exports = {
    async rewrites() {
        return [
            {
                source: '/sliders',
                destination: 'http://127.0.0.1:8000/api/sliders?format=json'
            }
        ]
    },
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '8000',
          pathname: '/media/**',
        },
      ],
    },
  }