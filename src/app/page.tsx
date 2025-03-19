import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from 'next/script';

// Dynamically import non-critical components
const TdeeCalculatorForm = dynamic(() => import('@/components/TdeeCalculatorForm'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] flex items-center justify-center">Loading calculator...</div>
});

const TdeeExplanation = dynamic(() => import('@/components/TdeeExplanation'), {
  ssr: false // Load this component only on client-side after initial render
});

export default function Home() {
  return (
    <>
      <Script
        id="schema-jsonld"
        type="application/ld+json"
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
      <Navbar />
      <main className="min-h-screen pt-16">
        <header className="bg-gradient-to-r from-green-700 to-green-600 py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white text-center">TDEE Calculator</h1>
            <p className="text-white text-center mt-2">Calculate your Total Daily Energy Expenditure</p>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-[800px]">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">Calculate Your TDEE</CardTitle>
              <CardDescription className="text-gray-700">
                Enter your details below to calculate your Total Daily Energy Expenditure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TdeeCalculatorForm />
            </CardContent>
          </Card>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6">What is TDEE?</h2>
            <div className="prose max-w-none text-gray-800">
              <p className="mb-4">
                Total Daily Energy Expenditure (TDEE) is the number of calories you burn per day. 
                Understanding your TDEE is essential for managing your weight, as it helps you 
                determine how many calories you need to consume to maintain, lose, or gain weight.
              </p>
              <p className="mb-4">
                Your TDEE is calculated based on several factors:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Basal Metabolic Rate (BMR): The calories your body needs at complete rest</li>
                <li>Physical Activity: How active you are in your daily life</li>
                <li>Thermic Effect of Food: Calories burned during digestion</li>
                <li>Non-Exercise Activity Thermogenesis: Calories burned through fidgeting, standing, etc.</li>
              </ul>
              <p>
                By knowing your TDEE, you can make informed decisions about your nutrition and 
                fitness goals. For weight loss, eat fewer calories than your TDEE; for weight gain, 
                eat more; and for maintenance, eat roughly the same amount.
              </p>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
