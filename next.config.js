/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output static export for deployment
  output: 'export',
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  
  // Image optimization - critical for LCP improvements
  images: {
    unoptimized: true, // Need to be unoptimized for static export
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Optimize for common mobile sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Include small sizes for icons
  },
  
  // Improve performance
  compress: true, // Enable gzip compression
  swcMinify: true, // Use SWC minifier instead of Terser
  poweredByHeader: false, // Remove unnecessary headers
  
  experimental: {
    // Disable optimizeCss as it's causing build issues with critters
    optimizeCss: false,
    optimizePackageImports: ['@/components/ui'],
    
    // Additional performance optimizations
    optimizeFonts: true,
    scrollRestoration: true,
    
    // New optimizations for better FCP and LCP
    craCompat: false, // Reduce bundle size
    gzipSize: true, // Show gzip sizes in build output
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
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Special caching for static assets
        source: '/(.*).(jpg|jpeg|png|gif|webp|svg|ico|woff2|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 