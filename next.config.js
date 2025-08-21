/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com', 'cdn.jsdelivr.net', 'img.shields.io'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
