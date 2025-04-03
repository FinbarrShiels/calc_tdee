import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { default as nextDynamic } from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from 'next/script';
import TdeeExplanationClient from '@/components/TdeeExplanationClient';
import TopAd from '@/components/TopAd';

// Dynamically import non-critical components with higher priority
const TdeeCalculatorForm = nextDynamic(() => import('@/components/TdeeCalculatorForm'), {
  ssr: true,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse bg-gray-200 rounded-md w-full max-w-md h-80"></div>
    </div>
  )
});

// Mark this component as generating static HTML
export const generateStaticParams = () => {
  return [];
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* High-priority visible content first for better LCP */}
        <header className="bg-gradient-to-r from-green-600 to-green-400 py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white text-center">TDEE Calculator</h1>
            <p className="text-white text-center mt-2">Calculate your Total Daily Energy Expenditure</p>
          </div>
        </header>

        {/* Top Ad */}
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <TopAd />
        </div>

        <div className="container mx-auto px-4 py-8 max-w-[800px]">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">Calculate Your TDEE</CardTitle>
              <CardDescription>
                Enter your details below to calculate your Total Daily Energy Expenditure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TdeeCalculatorForm />
            </CardContent>
          </Card>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-green-600 mb-6">What is TDEE?</h2>
            <TdeeExplanationClient />
          </section>
        </div>

        <Footer />
      </main>
      
      {/* Move structured data scripts to end of body for better initial rendering */}
      <Script
        id="schema-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'TDEE Calculator',
            description: 'Calculate your Total Daily Energy Expenditure (TDEE) to help with weight management and fitness goals.',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '125'
            },
            author: {
              '@type': 'Organization',
              name: 'TDEE Calculator'
            },
            potentialAction: {
              '@type': 'UseAction',
              target: 'https://tdeecalculator.health/'
            }
          })
        }}
      />
      <Script
        id="howto-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your TDEE (Total Daily Energy Expenditure)',
            description: 'Follow these steps to calculate your Total Daily Energy Expenditure (TDEE) and find your daily calorie needs.',
            totalTime: 'PT2M',
            estimatedCost: {
              '@type': 'MonetaryAmount',
              currency: 'USD',
              value: '0'
            },
            tool: {
              '@type': 'HowToTool',
              name: 'TDEE Calculator'
            },
            step: [
              {
                '@type': 'HowToStep',
                name: 'Select Your Unit System',
                text: 'Choose between metric (kg/cm) or imperial (lbs/ft) measurement units.',
                image: 'https://tdeecalculator.health/step-units.jpg',
                url: 'https://tdeecalculator.health/'
              },
              {
                '@type': 'HowToStep',
                name: 'Enter Your Personal Information',
                text: 'Input your age, gender, height, and weight accurately.',
                image: 'https://tdeecalculator.health/step-info.jpg',
                url: 'https://tdeecalculator.health/'
              },
              {
                '@type': 'HowToStep',
                name: 'Select Your Activity Level',
                text: 'Choose your typical activity level from sedentary to very active.',
                image: 'https://tdeecalculator.health/step-activity.jpg',
                url: 'https://tdeecalculator.health/'
              },
              {
                '@type': 'HowToStep',
                name: 'Optional: Enter Body Fat Percentage',
                text: 'For more accurate results, enter your body fat percentage if known.',
                image: 'https://tdeecalculator.health/step-bodyfat.jpg',
                url: 'https://tdeecalculator.health/'
              },
              {
                '@type': 'HowToStep',
                name: 'Calculate and View Results',
                text: 'Get your TDEE, BMR, and personalized macronutrient recommendations.',
                image: 'https://tdeecalculator.health/step-results.jpg',
                url: 'https://tdeecalculator.health/results'
              }
            ]
          })
        }}
      />
    </>
  );
}
