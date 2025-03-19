import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: "TDEE Calculator - Calculate Your Total Daily Energy Expenditure",
    template: "%s | TDEE Calculator",
  },
  description: "Free TDEE calculator to find your Total Daily Energy Expenditure and BMR. Plan your weight loss, maintenance or muscle gain with personalized macronutrients. The most accurate calorie calculator online.",
  keywords: "TDEE calculator, total daily energy expenditure, calorie calculator, BMR calculator, basal metabolic rate, maintenance calories, daily calorie needs, energy expenditure, activity multiplier, BMI calculator, body mass index, fitness calculator, metabolism calculator, Mifflin-St Jeor formula, Harris-Benedict formula, Katch-McArdle formula, lean body mass, body composition, weight loss calculator, macro calculator",
  authors: [{ name: "TDEE Calculator" }],
  creator: "TDEE Calculator",
  publisher: "TDEE Calculator",
  metadataBase: new URL("https://tdeecalculator.health"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TDEE Calculator - Calculate Your Daily Calorie Needs",
    description: "Free TDEE calculator to find your Total Daily Energy Expenditure and BMR. Plan your weight loss, maintenance or muscle gain with personalized macronutrients. The most accurate calorie calculator online.",
    url: "https://tdeecalculator.health/",
    siteName: "TDEE Calculator",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://tdeecalculator.health/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TDEE Calculator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TDEE Calculator - Calculate Your Daily Calorie Needs",
    description: "Free TDEE calculator to find your Total Daily Energy Expenditure and BMR. Plan your weight loss, maintenance or muscle gain with personalized macronutrients. The most accurate calorie calculator online.",
    images: ["https://tdeecalculator.health/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" }
    ],
    apple: { url: "/favicon.svg" },
    other: [
      { url: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icon-512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics (GA4) - With no consent management */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `
          }}
        />
      </head>
      <body className={`${roboto.variable} font-sans antialiased bg-zinc-50`}>
        {children}
      </body>
    </html>
  );
}
