/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the assetPrefix setting which was needed for GoDaddy
  // and remove any static export config as Vercel supports Next.js natively
  output: 'standalone',
  images: {
    unoptimized: false, // Allow Vercel to optimize images
  },
  // Ignore ESLint errors during build for Vercel deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 