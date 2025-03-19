/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output static export for deployment
  output: 'export',
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  
  // Image optimization - important for Lighthouse performance
  images: {
    unoptimized: true, // Need to be unoptimized for static export
    formats: ['image/avif', 'image/webp'],
  },
  
  // Improve performance
  compress: true, // Enable gzip compression
  swcMinify: true, // Use SWC minifier instead of Terser
  
  experimental: {
    // Disable optimizeCss as it's causing build issues with critters
    optimizeCss: false,
    optimizePackageImports: ['@/components/ui'],
    
    // Additional performance optimizations
    optimizeFonts: true,
    scrollRestoration: true,
  },
  
  // Ignore ESLint errors during build for Vercel deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configure headers for better caching and security
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 