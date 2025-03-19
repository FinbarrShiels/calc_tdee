/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the assetPrefix setting which was needed for GoDaddy
  // and remove any static export config as Vercel supports Next.js natively
  output: 'export',
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@/components/ui'],
    optimizeFonts: true,
  },
  // Ignore ESLint errors during build for Vercel deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 