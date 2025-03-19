import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// Optimize font loading with display:swap and subset to improve LCP
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"], // Only preload essential weights
  variable: "--font-roboto",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
});

// Later load additional weights if needed
const robotoFull = Roboto({
  subsets: ["latin"],
  weight: ["300", "700"],
  variable: "--font-roboto-full",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "TDEE Calculator - Calculate Your Daily Calorie Needs",
    template: "%s | TDEE Calculator"
  },
  description: "Calculate your Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR) with our accurate calculator. Get personalized macronutrient recommendations.",
  keywords: ["TDEE calculator", "total daily energy expenditure", "BMR calculator", "calorie calculator", "macronutrient calculator", "weight loss calculator", "fitness calculator"],
  authors: [{ name: "TDEE Calculator" }],
  creator: "TDEE Calculator",
  publisher: "TDEE Calculator",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.tdeecalculator.health'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TDEE Calculator - Calculate Your Daily Calorie Needs",
    description: "Calculate your Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR) with our accurate calculator. Get personalized macronutrient recommendations.",
    url: 'https://www.tdeecalculator.health',
    siteName: 'TDEE Calculator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'TDEE Calculator',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TDEE Calculator - Calculate Your Daily Calorie Needs',
    description: 'Calculate your Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR) with our accurate calculator.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your actual verification code
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.svg' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/icon-192.svg',
        type: 'image/svg+xml',
        sizes: '192x192'
      },
      {
        rel: 'icon',
        url: '/icon-512.svg',
        type: 'image/svg+xml',
        sizes: '512x512'
      }
    ],
  },
  manifest: '/manifest.json',
  applicationName: 'TDEE Calculator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Critical meta tags first for faster parsing */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1" 
        />
        
        {/* Preloading critical resources */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Non-critical resource hints */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        
        {/* Add preload hints for critical CSS and JavaScript */}
        <link rel="preload" href="/globals.css" as="style" />
      </head>
      <body
        className={`${roboto.variable} ${robotoFull.variable} font-sans antialiased bg-zinc-50`}
        suppressHydrationWarning
      >
        {children}
        
        {/* Load non-critical scripts with afterInteractive strategy */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-3BJFR4W8KJ`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3BJFR4W8KJ', {
              send_page_view: false,
              transport_type: 'beacon'
            });
            window.addEventListener('load', function() {
              gtag('event', 'page_view');
            });
          `}
        </Script>
        
        {/* Defer AdSense until after page is interactive */}
        <Script
          id="adsbygoogle-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Only initialize ads if they haven't been initialized yet
                if (!window.adsbygoogle) {
                  window.adsbygoogle = [];
                } else if (!Array.isArray(window.adsbygoogle)) {
                  window.adsbygoogle = [window.adsbygoogle];
                }
                // Wait until the script is fully loaded before pushing
                setTimeout(() => {
                  window.adsbygoogle.push({});
                }, 100);
              } catch (e) {
                console.error('AdSense error:', e);
              }
            `
          }}
        />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1990518122312332"
          crossOrigin="anonymous"
          strategy="lazyOnload"
          onLoad={() => {
            console.log('AdSense script loaded');
          }}
        />
        
        {/* Load analytics last */}
        <Script strategy="afterInteractive" id="performance-mark-script">
          {`
            // Mark end of critical rendering
            window.addEventListener('load', function() {
              if (window.performance) {
                window.performance.mark('app-loaded');
              }
            });
          `}
        </Script>
        <SpeedInsights 
          debug={process.env.NODE_ENV === 'development'} 
          sampleRate={100}
        />
        <Analytics />
      </body>
    </html>
  );
}
