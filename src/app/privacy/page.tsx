import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <header className="bg-gradient-to-r from-green-600 to-green-400 py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white text-center">Privacy Policy</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-[800px]">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 prose max-w-none">
            <h2>Introduction</h2>
            <p>
              This Privacy Policy explains how TDEE Calculator ("we", "us", or "our") collects, uses, and shares information about you when you use our website at <Link href="https://tdeecalculator.health" className="text-green-600 hover:underline">tdeecalculator.health</Link>.
            </p>
            
            <h2>Information We Collect</h2>
            <p>We collect the following information:</p>
            <ul>
              <li>
                <strong>Usage Data:</strong> We use Google Analytics to collect information about how you interact with our website, such as the pages you visit and the time you spend on the website.
              </li>
              <li>
                <strong>Calculator Inputs:</strong> When you use our TDEE calculator, we temporarily process the information you enter (age, gender, height, weight, activity level) to calculate your results. This information is not stored on our servers.
              </li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our website</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Calculate your TDEE and provide personalized results</li>
            </ul>
            
            <h2>Cookies</h2>
            <p>
              We use cookies to improve your experience on our website. Cookies are small text files that are stored on your device when you visit our website. We use the following cookies:
            </p>
            <ul>
              <li>
                <strong>Analytics Cookies:</strong> We use Google Analytics to collect information about how you use our website. This helps us improve our service.
              </li>
              <li>
                <strong>Preference Cookies:</strong> These cookies remember your preferences, such as your consent choices.
              </li>
            </ul>
            <p>
              You can manage your cookie preferences through our cookie consent banner or by adjusting your browser settings. Please note that blocking some cookies may impact your experience on our website.
            </p>
            
            <h2>Data Sharing</h2>
            <p>
              We share information with:
            </p>
            <ul>
              <li>
                <strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our website. Google Analytics may collect information about your online activity across different websites. You can learn more about how Google Analytics uses your data at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Google's Privacy Policy</a>.
              </li>
            </ul>
            
            <h2>Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul>
              <li>The right to access information we have about you</li>
              <li>The right to request deletion of your data</li>
              <li>The right to opt-out of analytics tracking</li>
            </ul>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We encourage you to review this Privacy Policy periodically.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@tdeecalculator.health" className="text-green-600 hover:underline">contact@tdeecalculator.health</a>.
            </p>
            
            <p className="text-sm text-gray-500 mt-8">
              Last updated: May 1, 2024
            </p>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
} 