import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <header className="bg-gradient-to-r from-green-600 to-green-400 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white text-center">Frequently Asked Questions</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-[800px]">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-green-700 mb-2">What is TDEE?</h3>
              <p>
                TDEE stands for Total Daily Energy Expenditure. It's the total number of calories you burn in a day, including your basal metabolic rate (BMR) and all activities from light movements to intense exercise.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-green-700 mb-2">How accurate is this calculator?</h3>
              <p>
                Our calculator uses the Mifflin-St Jeor equation, which is considered the most accurate formula for estimating BMR. However, all TDEE calculators provide estimates, and individual metabolism can vary. For best results, track your actual calorie intake and weight changes over time to fine-tune your personal TDEE.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-green-700 mb-2">How should I use this information for weight loss?</h3>
              <p>
                To lose weight, create a calorie deficit by consuming fewer calories than your TDEE. A moderate approach is to eat 500 calories less than your TDEE per day, which should result in about 1 pound of weight loss per week. Combine this with regular exercise for best results.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-green-700 mb-2">What if I want to gain muscle?</h3>
              <p>
                For muscle growth, consume slightly more calories than your TDEE (about 250-500 calories extra per day), ensure adequate protein intake (typically 1.6-2.2g per kg of bodyweight), and follow a progressive resistance training program. Our calculator provides macronutrient recommendations to help with this goal.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-green-700 mb-2">How often should I recalculate my TDEE?</h3>
              <p>
                As your weight changes, so will your TDEE. It's a good idea to recalculate every 10-15 pounds of weight change. Additionally, factors like age, activity level changes, or significant muscle gain can affect your TDEE and warrant a recalculation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-green-700 mb-2">What do the different activity levels mean?</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Sedentary:</strong> Little or no exercise, desk job</li>
                <li><strong>Light Exercise:</strong> Light exercise 1-3 days per week</li>
                <li><strong>Moderate Exercise:</strong> Moderate exercise 3-5 days per week</li>
                <li><strong>Heavy Exercise:</strong> Hard exercise 6-7 days per week</li>
                <li><strong>Athlete:</strong> Very intense exercise, physical job, or training twice per day</li>
              </ul>
            </div>

            <div className="my-8 text-center">
              <Link href="/">
                <Button className="bg-green-600 hover:bg-green-700">
                  Calculate Your TDEE Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
} 