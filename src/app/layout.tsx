import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
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
  metadataBase: new URL('https://tdee-calc.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TDEE Calculator - Calculate Your Daily Calorie Needs",
    description: "Calculate your Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR) with our accurate calculator. Get personalized macronutrient recommendations.",
    url: 'https://tdee-calc.vercel.app',
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1" 
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} // Replace with your actual Google Analytics ID
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX'); // Replace with your actual Google Analytics ID
          `}
        </Script>
      </head>
      <body
        className={`${roboto.variable} font-sans antialiased bg-zinc-50`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
