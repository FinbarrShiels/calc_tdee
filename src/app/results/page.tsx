"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopAd from "@/components/TopAd";

// Type for user data
type UserData = {
  unitSystem: "metric" | "imperial";
  age: number;
  gender: "male" | "female";
  heightCm: number;
  weightKg: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
  // Imperial units stored for display
  heightFeet?: number;
  heightInches?: number;
  weightLbs?: number;
  // Body fat percentage (optional)
  bodyFatPercentage?: number;
};

// Activity multipliers
const activityMultipliers = {
  sedentary: 1.2,       // Little or no exercise
  light: 1.375,         // Light exercise 1-3 days/week
  moderate: 1.55,       // Moderate exercise 3-5 days/week
  active: 1.725,        // Heavy exercise 6-7 days/week
  very_active: 1.9,     // Very intense exercise daily
};

// Activity level labels
const activityLabels = {
  sedentary: "Sedentary",
  light: "Light Exercise",
  moderate: "Moderate Exercise",
  active: "Heavy Exercise",
  very_active: "Athlete",
};

// Macronutrient ratios (protein/carbs/fat)
const macroRatios = {
  moderate_carb: { protein: 0.3, carbs: 0.4, fat: 0.3 },   // Moderate carb
  lower_carb: { protein: 0.35, carbs: 0.25, fat: 0.4 },    // Lower carb
  higher_carb: { protein: 0.25, carbs: 0.55, fat: 0.2 },   // Higher carb
};

// BMI classifications
const bmiClassifications = [
  { range: [0, 18.5], label: "Underweight", description: "BMI less than 18.5" },
  { range: [18.5, 25], label: "Normal Weight", description: "BMI between 18.5 and 24.9" },
  { range: [25, 30], label: "Overweight", description: "BMI between 25 and 29.9" },
  { range: [30, 100], label: "Obese", description: "BMI of 30 or greater" },
];

function ResultsContent() {
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    bmi: number;
    bmiClassification: { label: string; description: string };
    idealWeightRange: { min: number; max: number };
    idealWeightFormulas: { name: string; value: number }[];
    activityLevelCalories: { level: string; calories: number }[];
    muscularPotential: number;
    macros: {
      moderate: { protein: number; carbs: number; fat: number };
      lower: { protein: number; carbs: number; fat: number };
      higher: { protein: number; carbs: number; fat: number };
    };
  } | null>(null);

  useEffect(() => {
    // Get data from URL
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const data = JSON.parse(decodeURIComponent(dataParam)) as UserData;
        setUserData(data);
        calculateResults(data);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }
  }, [searchParams]);

  const calculateResults = (data: UserData) => {
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0;
    
    // If body fat percentage is provided, use Katch-McArdle formula
    if (data.bodyFatPercentage !== undefined) {
      // Calculate lean body mass
      const bodyFatDecimal = data.bodyFatPercentage / 100;
      const leanBodyMass = data.weightKg * (1 - bodyFatDecimal);
      
      // Katch-McArdle Formula: BMR = 370 + (21.6 * LBM)
      bmr = 370 + (21.6 * leanBodyMass);
    } else {
      // Otherwise use Mifflin-St Jeor Equation
      if (data.gender === "male") {
        bmr = 10 * data.weightKg + 6.25 * data.heightCm - 5 * data.age + 5;
      } else {
        bmr = 10 * data.weightKg + 6.25 * data.heightCm - 5 * data.age - 161;
      }
    }

    // Calculate TDEE based on selected activity level
    const tdee = Math.round(bmr * activityMultipliers[data.activityLevel]);

    // Calculate BMI
    const heightM = data.heightCm / 100;
    const bmi = parseFloat((data.weightKg / (heightM * heightM)).toFixed(1));

    // Determine BMI classification
    const bmiClassification = bmiClassifications.find(
      classification => bmi >= classification.range[0] && bmi < classification.range[1]
    ) || bmiClassifications[1]; // Default to normal weight if not found

    // Calculate TDEE for all activity levels
    const activityLevelCalories = Object.entries(activityMultipliers).map(([level, multiplier]) => ({
      level: activityLabels[level as keyof typeof activityLabels],
      calories: Math.round(bmr * multiplier)
    }));

    // Calculate ideal weight ranges using different formulas
    // All formulas return weight in kg
    // Convert height to inches for the formulas
    const heightInches = data.heightCm / 2.54;
    
    // Modified standard implementation of these formulas with frames
    // Hamwi Formula
    const hamwiIdealWeight = data.gender === "male" 
      ? 48.0 + 2.7 * (heightInches - 60) 
      : 45.5 + 2.2 * (heightInches - 60);
    
    // Devine Formula
    const devineIdealWeight = data.gender === "male" 
      ? 50.0 + 2.3 * (heightInches - 60) 
      : 45.5 + 2.3 * (heightInches - 60);
    
    // Robinson Formula
    const robinsonIdealWeight = data.gender === "male" 
      ? 52.0 + 1.9 * (heightInches - 60) 
      : 49.0 + 1.7 * (heightInches - 60);
    
    // Miller Formula
    const millerIdealWeight = data.gender === "male" 
      ? 56.2 + 1.41 * (heightInches - 60) 
      : 53.1 + 1.36 * (heightInches - 60);

    const idealWeightFormulas = [
      { name: "G.J. Hamwi Formula (1964)", value: Math.round(hamwiIdealWeight) },
      { name: "B.J. Devine Formula (1974)", value: Math.round(devineIdealWeight) },
      { name: "J.D. Robinson Formula (1983)", value: Math.round(robinsonIdealWeight) },
      { name: "D.R. Miller Formula (1983)", value: Math.round(millerIdealWeight) }
    ];

    // Calculate ideal weight range from min and max of the formulas
    const idealWeightRange = {
      min: Math.min(...idealWeightFormulas.map(f => f.value)),
      max: Math.max(...idealWeightFormulas.map(f => f.value))
    };

    // Maximum Muscular Potential (using the formula based on height)
    const ffmi = data.gender === "male" ? 25 : 22;
    const maxLeanMass = ffmi * (heightM * heightM);
    const muscularPotential = Math.round(maxLeanMass * 1.1); // Adding ~10% for reasonable body fat

    // Calculate macronutrient needs for different diets
    const calculateMacros = (tdee: number, ratio: { protein: number; carbs: number; fat: number }) => {
      const proteinGrams = Math.round((tdee * ratio.protein) / 4); // 4 calories per gram of protein
      const carbGrams = Math.round((tdee * ratio.carbs) / 4);      // 4 calories per gram of carbs
      const fatGrams = Math.round((tdee * ratio.fat) / 9);         // 9 calories per gram of fat
      return { protein: proteinGrams, carbs: carbGrams, fat: fatGrams };
    };

    const macros = {
      moderate: calculateMacros(tdee, macroRatios.moderate_carb),
      lower: calculateMacros(tdee, macroRatios.lower_carb),
      higher: calculateMacros(tdee, macroRatios.higher_carb),
    };

    setResults({
      bmr: Math.round(bmr),
      tdee,
      bmi,
      bmiClassification,
      idealWeightRange,
      idealWeightFormulas,
      activityLevelCalories,
      muscularPotential,
      macros,
    });
  };

  // Display weight in the appropriate unit system
  const formatWeight = (kg: number): string => {
    if (userData?.unitSystem === "imperial") {
      const lbs = Math.round(kg * 2.20462);
      return `${lbs} lbs`;
    }
    return `${kg} kg`;
  };

  // Check if userData exists, if not show redirect message
  if (!userData) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="mt-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">No Data Found</h1>
              <p className="mb-6">Please calculate your TDEE first.</p>
              <Link href="/">
                <Button>Calculate TDEE</Button>
              </Link>
            </div>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  // Check if results exist
  if (!results) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="mt-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Calculating Results...</h1>
              <p className="mb-6">Please wait while we calculate your results.</p>
            </div>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  // If we have results, render them
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <header className="bg-gradient-to-r from-green-600 to-green-400 py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white text-center">Your Results</h1>
            <p className="text-white text-center mt-2">TDEE Calculation Summary</p>
          </div>
        </header>

        {/* Top Ad */}
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <TopAd />
        </div>

        <div className="container mx-auto px-4 py-8">
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-2 bg-gray-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-bold text-lg">{userData.age} years</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-bold text-lg capitalize">{userData.gender}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-500">Height</p>
                  <p className="font-bold text-lg">
                    {userData.unitSystem === "imperial" 
                      ? `${userData.heightFeet}' ${userData.heightInches}"` 
                      : `${userData.heightCm} cm`}
                  </p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-bold text-lg">
                    {userData.unitSystem === "imperial" 
                      ? `${userData.weightLbs} lbs` 
                      : `${userData.weightKg} kg`}
                  </p>
                </div>
              </div>
              
              {userData.bodyFatPercentage !== undefined && (
                <div className="text-center p-2 bg-gray-50 rounded-lg border border-green-200 mb-6 w-full">
                  <p className="text-sm text-gray-500">Body Fat</p>
                  <p className="font-bold text-lg">{userData.bodyFatPercentage}%</p>
                </div>
              )}

              {/* Body fat percentage alert - only show when not provided */}
              {!userData.bodyFatPercentage && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    You left the body fat percentage field blank. We can estimate TDEE more accurately with this data.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-green-50 border border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Basal Metabolic Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold text-3xl text-green-600">{results.bmr}</p>
                    <p className="text-xs text-gray-500">calories/day</p>
                    <p className="mt-2 text-sm">The calories your body needs at complete rest</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-100 border border-green-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Daily Energy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold text-3xl text-green-700">{results.tdee}</p>
                    <p className="text-xs text-gray-500">calories/day</p>
                    <p className="mt-2 text-sm">Your maintenance calories with your activity level</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 border border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">BMI Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold text-3xl text-green-600">{results.bmi}</p>
                    <p className="text-xs text-gray-500">kg/m²</p>
                    <p className="mt-2 text-sm">
                      Classification: <span className="font-semibold">{results.bmiClassification.label}</span>
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-green-800 text-lg font-semibold">Your Maintenance Calories</h3>
                  <p className="text-green-700 mt-2">
                    Based on your stats, the best estimate for your maintenance calories is <span className="font-bold text-xl">{results.tdee} calories per day</span> based on the{" "}
                    <span className="font-medium text-blue-600">
                      {userData.bodyFatPercentage !== undefined ? 
                        "Katch-McArdle Formula" : 
                        "Mifflin-St Jeor Formula"}
                    </span>
                    {userData.bodyFatPercentage !== undefined ? 
                      ", which uses your body fat percentage for higher accuracy" : 
                      ", which is widely known to be the most accurate general formula"}.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Activity Level Comparison</h3>
                <p className="mb-4">The table below shows how your calorie needs would change with different activity levels:</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Activity Level</th>
                        <th className="text-right p-3">Daily Calories</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.activityLevelCalories.map((level) => (
                        <tr 
                          key={level.level} 
                          className={`border-b ${level.level === activityLabels[userData.activityLevel] ? "bg-green-50" : ""}`}
                        >
                          <td className="p-3 font-medium">
                            {level.level}
                            {level.level === activityLabels[userData.activityLevel] && 
                              <span className="ml-2 text-xs text-green-600 font-bold">(Your Level)</span>
                            }
                          </td>
                          <td className="p-3 text-right font-semibold">{level.calories} cal/day</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Ideal Weight Range</h3>
                <p className="mb-4">
                  Your ideal body weight is estimated to be between <span className="font-bold">{formatWeight(results.idealWeightRange.min)}-{formatWeight(results.idealWeightRange.max)}</span> based on the various formulas listed below. These formulas are based on your height and represent averages, so don't take them too seriously, especially if you lift weights.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Formula</th>
                        <th className="text-right p-3">Estimated Ideal Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.idealWeightFormulas.map((formula) => (
                        <tr key={formula.name} className="border-b">
                          <td className="p-3">{formula.name}</td>
                          <td className="p-3 text-right font-semibold">{formatWeight(formula.value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">BMI Classification</h3>
                <p className="mb-4">
                  Your BMI is <span className="font-semibold">{results.bmi}</span>, which means you are classified as <span className="font-bold">{results.bmiClassification.label}</span>.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">BMI Range</th>
                        <th className="text-left p-3">Classification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bmiClassifications.map((classification) => (
                        <tr 
                          key={classification.label} 
                          className={`border-b ${classification.label === results.bmiClassification.label ? "bg-green-50" : ""}`}
                        >
                          <td className="p-3 font-medium">{classification.description}</td>
                          <td className="p-3">
                            {classification.label}
                            {classification.label === results.bmiClassification.label && 
                              <span className="ml-2 text-xs text-green-600 font-bold">(Your Classification)</span>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Maximum Muscular Potential</h3>
                <div className="flex justify-center">
                  <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4 w-full md:w-64">
                    <p className="font-bold text-2xl text-blue-600">{formatWeight(results.muscularPotential)}</p>
                    <p className="text-xs text-gray-500">at 10-12% body fat for men, 18-20% for women</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-blue-800 mb-2">About this calculation:</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    This estimate uses Martin Berkhan's formula for calculating genetic muscular potential, based on the Fat-Free Mass Index (FFMI).
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    For men, we use an FFMI of 25, which is considered to be near the natural limit without performance-enhancing substances.
                    For women, an FFMI of 22 is used to account for physiological differences.
                  </p>
                  <p className="text-sm text-gray-700">
                    The formula: <span className="font-mono bg-blue-100 px-1 rounded">Maximum lean mass = FFMI × (height in meters)²</span>, 
                    with an additional 10% added for reasonable body fat levels.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Recommended Macronutrients</h3>
                
                <div className="border rounded-lg overflow-hidden">
                  {/* Tabs */}
                  <div className="flex border-b">
                    <button 
                      onClick={() => {
                        const tabs = document.querySelectorAll('.macro-tab');
                        const contents = document.querySelectorAll('.macro-content');
                        
                        tabs.forEach(tab => tab.classList.remove('bg-green-100', 'border-b-2', 'border-green-500'));
                        contents.forEach(content => content.classList.add('hidden'));
                        
                        document.getElementById('maintenance-tab')?.classList.add('bg-green-100', 'border-b-2', 'border-green-500');
                        document.getElementById('maintenance-content')?.classList.remove('hidden');
                      }}
                      id="maintenance-tab"
                      className="macro-tab flex-1 py-3 px-4 font-medium text-center focus:outline-none bg-green-100 border-b-2 border-green-500"
                    >
                      Maintenance
                    </button>
                    <button 
                      onClick={() => {
                        const tabs = document.querySelectorAll('.macro-tab');
                        const contents = document.querySelectorAll('.macro-content');
                        
                        tabs.forEach(tab => tab.classList.remove('bg-green-100', 'border-b-2', 'border-green-500'));
                        contents.forEach(content => content.classList.add('hidden'));
                        
                        document.getElementById('cutting-tab')?.classList.add('bg-green-100', 'border-b-2', 'border-green-500');
                        document.getElementById('cutting-content')?.classList.remove('hidden');
                      }}
                      id="cutting-tab"
                      className="macro-tab flex-1 py-3 px-4 font-medium text-center focus:outline-none"
                    >
                      Cutting
                    </button>
                    <button 
                      onClick={() => {
                        const tabs = document.querySelectorAll('.macro-tab');
                        const contents = document.querySelectorAll('.macro-content');
                        
                        tabs.forEach(tab => tab.classList.remove('bg-green-100', 'border-b-2', 'border-green-500'));
                        contents.forEach(content => content.classList.add('hidden'));
                        
                        document.getElementById('bulking-tab')?.classList.add('bg-green-100', 'border-b-2', 'border-green-500');
                        document.getElementById('bulking-content')?.classList.remove('hidden');
                      }}
                      id="bulking-tab"
                      className="macro-tab flex-1 py-3 px-4 font-medium text-center focus:outline-none"
                    >
                      Bulking
                    </button>
                  </div>
                  
                  {/* Maintenance Content */}
                  <div id="maintenance-content" className="macro-content p-4">
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Recommended daily intake based on your maintenance calories: <span className="font-bold">{results.tdee} calories</span></p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Moderate Carb</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>Protein:</span>
                              <span className="font-semibold">{results.macros.moderate.protein}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Carbs:</span>
                              <span className="font-semibold">{results.macros.moderate.carbs}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Fat:</span>
                              <span className="font-semibold">{results.macros.moderate.fat}g</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Lower Carb</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>Protein:</span>
                              <span className="font-semibold">{results.macros.lower.protein}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Carbs:</span>
                              <span className="font-semibold">{results.macros.lower.carbs}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Fat:</span>
                              <span className="font-semibold">{results.macros.lower.fat}g</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Higher Carb</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>Protein:</span>
                              <span className="font-semibold">{results.macros.higher.protein}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Carbs:</span>
                              <span className="font-semibold">{results.macros.higher.carbs}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Fat:</span>
                              <span className="font-semibold">{results.macros.higher.fat}g</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  {/* Cutting Content */}
                  <div id="cutting-content" className="macro-content p-4 hidden">
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Recommended daily intake for cutting: <span className="font-bold">{results.tdee - 500} calories</span> (-500 calories for steady weight loss)</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Moderate Carb</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>Protein:</span>
                              <span className="font-semibold">{Math.round((results.tdee - 500) * 0.3 / 4)}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Carbs:</span>
                              <span className="font-semibold">{Math.round((results.tdee - 500) * 0.4 / 4)}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Fat:</span>
                              <span className="font-semibold">{Math.round((results.tdee - 500) * 0.3 / 9)}g</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Lower Carb</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>Protein:</span>
                              <span className="font-semibold">{Math.round((results.tdee - 500) * 0.35 / 4)}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Carbs:</span>
                              <span className="font-semibold">{Math.round((results.tdee - 500) * 0.25 / 4)}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Fat:</span>
                              <span className="font-semibold">{Math.round((results.tdee - 500) * 0.4 / 9)}g</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Higher Carb</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>Protein:</span>
                              <span className="font-semibold">{Math.round((results.tdee - 500) * 0.25 / 4)}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Carbs:</span>
                              <span className="font-semibold">{Math.round((results.tdee - 500) * 0.55 / 4)}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Fat:</span>
                              <span className="font-semibold">{Math.round((results.tdee - 500) * 0.2 / 9)}g</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  {/* Bulking Content */}
                  <div id="bulking-content" className="macro-content p-4 hidden">
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Recommended daily intake for bulking: <span className="font-bold">{results.tdee + 500} calories</span> (+500 calories for steady muscle gain)</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Moderate Carb</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>Protein:</span>
                              <span className="font-semibold">{Math.round((results.tdee + 500) * 0.3 / 4)}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Carbs:</span>
                              <span className="font-semibold">{Math.round((results.tdee + 500) * 0.4 / 4)}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Fat:</span>
                              <span className="font-semibold">{Math.round((results.tdee + 500) * 0.3 / 9)}g</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Lower Carb</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>Protein:</span>
                              <span className="font-semibold">{Math.round((results.tdee + 500) * 0.35 / 4)}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Carbs:</span>
                              <span className="font-semibold">{Math.round((results.tdee + 500) * 0.25 / 4)}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Fat:</span>
                              <span className="font-semibold">{Math.round((results.tdee + 500) * 0.4 / 9)}g</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Higher Carb</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>Protein:</span>
                              <span className="font-semibold">{Math.round((results.tdee + 500) * 0.25 / 4)}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Carbs:</span>
                              <span className="font-semibold">{Math.round((results.tdee + 500) * 0.55 / 4)}g</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Fat:</span>
                              <span className="font-semibold">{Math.round((results.tdee + 500) * 0.2 / 9)}g</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 active:shadow-inner">
                Recalculate
              </Button>
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <main className="min-h-screen pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="mt-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading Results...</h1>
              <p>Please wait while we calculate your results.</p>
            </div>
          </div>
          <Footer />
        </main>
      </>
    }>
      <ResultsContent />
    </Suspense>
  );
} 