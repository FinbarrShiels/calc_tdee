import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <header className="bg-gradient-to-r from-green-600 to-green-400 py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white text-center">About TDEE Calculator</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-[800px]">
          {/* About the Site Section */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                The TDEE Calculator was created to provide a reliable, science-based tool for anyone looking to understand their body's energy needs. 
                We believe that accurate information is the foundation of successful health and fitness journeys.
              </p>
              <p>
                Whether you're looking to lose weight, gain muscle, or simply maintain a balanced lifestyle, knowing your Total Daily Energy Expenditure 
                is essential. Our goal is to make this information accessible, understandable, and actionable for everyone.
              </p>
              <p>
                We've designed this calculator to be comprehensive yet user-friendly, providing not just your basic caloric needs but also insights 
                into macronutrient distribution, ideal weight ranges, and other valuable metrics to support your health goals.
              </p>
              <div className="my-6 text-center">
                <Link href="/">
                  <Button className="bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 active:shadow-inner">
                    Calculate Your TDEE Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Formulas Section */}
          <h2 className="text-2xl font-bold text-green-600 mb-6">The Science Behind Our Calculator</h2>
          
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-green-700">BMR Calculation Formulas</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3 className="text-lg font-medium text-green-600">Mifflin-St Jeor Equation</h3>
              <p>
                Our default formula for calculating Basal Metabolic Rate (BMR) when body fat percentage is not provided. 
                This equation is widely regarded as the most accurate for estimating BMR in most populations.
              </p>
              <div className="bg-gray-50 p-4 rounded-md my-4">
                <p className="font-medium">For men:</p>
                <p className="font-mono">BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5</p>
                <p className="font-medium mt-3">For women:</p>
                <p className="font-mono">BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161</p>
              </div>
              
              <h3 className="text-lg font-medium text-green-600 mt-6">Katch-McArdle Formula</h3>
              <p>
                When you provide your body fat percentage, we use this more precise formula that takes into account your lean body mass (LBM).
                This can provide a more accurate estimate for athletic individuals or those with body compositions that differ from the average.
              </p>
              <div className="bg-gray-50 p-4 rounded-md my-4">
                <p className="font-medium">Step 1: Calculate Lean Body Mass</p>
                <p className="font-mono">LBM = Weight in kg × (1 - (Body Fat % / 100))</p>
                <p className="font-medium mt-3">Step 2: Calculate BMR</p>
                <p className="font-mono">BMR = 370 + (21.6 × LBM)</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-green-700">TDEE Calculation</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Your Total Daily Energy Expenditure (TDEE) is calculated by multiplying your BMR by an activity factor:
              </p>
              <div className="bg-gray-50 p-4 rounded-md my-4">
                <p className="font-mono">TDEE = BMR × Activity Multiplier</p>
              </div>
              
              <h3 className="text-lg font-medium text-green-600">Activity Multipliers:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-medium">Sedentary (little or no exercise):</span> 1.2</li>
                <li><span className="font-medium">Light Exercise (1-3 days/week):</span> 1.375</li>
                <li><span className="font-medium">Moderate Exercise (3-5 days/week):</span> 1.55</li>
                <li><span className="font-medium">Heavy Exercise (6-7 days/week):</span> 1.725</li>
                <li><span className="font-medium">Athlete (2x per day):</span> 1.9</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-green-700">Other Calculations</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3 className="text-lg font-medium text-green-600">BMI Calculation</h3>
              <p>
                Body Mass Index (BMI) is calculated using your weight and height:
              </p>
              <div className="bg-gray-50 p-4 rounded-md my-4">
                <p className="font-mono">BMI = Weight (kg) / (Height (m))²</p>
              </div>
              
              <h3 className="text-lg font-medium text-green-600 mt-6">Ideal Weight Range</h3>
              <p>
                We calculate ideal weight ranges using multiple formulas to provide a comprehensive range:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Hamwi Formula:</span>
                  <div className="ml-4 mt-1">
                    <p>Men: 48.0 kg + 2.7 kg per inch over 5 feet</p>
                    <p>Women: 45.5 kg + 2.2 kg per inch over 5 feet</p>
                  </div>
                </li>
                <li>
                  <span className="font-medium">Devine Formula:</span>
                  <div className="ml-4 mt-1">
                    <p>Men: 50.0 kg + 2.3 kg per inch over 5 feet</p>
                    <p>Women: 45.5 kg + 2.3 kg per inch over 5 feet</p>
                  </div>
                </li>
                <li>
                  <span className="font-medium">Robinson Formula:</span>
                  <div className="ml-4 mt-1">
                    <p>Men: 52.0 kg + 1.9 kg per inch over 5 feet</p>
                    <p>Women: 49.0 kg + 1.7 kg per inch over 5 feet</p>
                  </div>
                </li>
                <li>
                  <span className="font-medium">Miller Formula:</span>
                  <div className="ml-4 mt-1">
                    <p>Men: 56.2 kg + 1.41 kg per inch over 5 feet</p>
                    <p>Women: 53.1 kg + 1.36 kg per inch over 5 feet</p>
                  </div>
                </li>
              </ul>
              
              <h3 className="text-lg font-medium text-green-600 mt-6">Maximum Muscular Potential</h3>
              <p>
                Based on Martin Berkhan's formula using the Fat-Free Mass Index (FFMI):
              </p>
              <div className="bg-gray-50 p-4 rounded-md my-4">
                <p className="font-medium">Step 1: Calculate maximum lean mass</p>
                <p className="font-mono">Men: FFMI of 25 × (height in meters)²</p>
                <p className="font-mono">Women: FFMI of 22 × (height in meters)²</p>
                <p className="font-medium mt-3">Step 2: Add reasonable body fat</p>
                <p className="font-mono">Maximum muscular bodyweight = Maximum lean mass × 1.10-1.12 (for 10-12% body fat for men)</p>
                <p className="font-mono">Maximum muscular bodyweight = Maximum lean mass × 1.18-1.20 (for 18-20% body fat for women)</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-green-700">Macronutrient Calculations</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We provide macronutrient recommendations based on your TDEE and different dietary approaches:
              </p>
              
              <h3 className="text-lg font-medium text-green-600">Moderate Carb (40/30/30)</h3>
              <ul className="list-disc pl-5">
                <li>Protein: 30% of calories (1g of protein = 4 calories)</li>
                <li>Carbohydrates: 40% of calories (1g of carbs = 4 calories)</li>
                <li>Fat: 30% of calories (1g of fat = 9 calories)</li>
              </ul>
              
              <h3 className="text-lg font-medium text-green-600 mt-4">Lower Carb (25/35/40)</h3>
              <ul className="list-disc pl-5">
                <li>Protein: 35% of calories</li>
                <li>Carbohydrates: 25% of calories</li>
                <li>Fat: 40% of calories</li>
              </ul>
              
              <h3 className="text-lg font-medium text-green-600 mt-4">Higher Carb (55/25/20)</h3>
              <ul className="list-disc pl-5">
                <li>Protein: 25% of calories</li>
                <li>Carbohydrates: 55% of calories</li>
                <li>Fat: 20% of calories</li>
              </ul>
              
              <p className="mt-4">
                We also provide adjusted macronutrient calculations for cutting (-500 calories) and bulking (+500 calories) 
                to help you reach your specific fitness goals.
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </main>
    </>
  );
} 