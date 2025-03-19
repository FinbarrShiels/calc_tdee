import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-3xl font-bold text-center mb-8">Terms of Use</h1>
          
          <div className="prose prose-green max-w-none">
            <p className="mb-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the TDEE Calculator website ("Service"), you agree to be bound by these Terms of Use. If you disagree with any part of the terms, you may not access the Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Use of Service</h2>
            <p>
              The TDEE Calculator is provided for informational and educational purposes only. The calculations and recommendations offered are estimates based on established formulas and should not be considered as medical advice.
            </p>
            <p className="mt-4">
              We reserve the right to modify or terminate the Service for any reason, without notice at any time. We reserve the right to refuse service to anyone for any reason at any time.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Medical Disclaimer</h2>
            <p>
              The content of this Service is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or before beginning any diet or exercise program.
            </p>
            <p className="mt-4">
              Never disregard professional medical advice or delay in seeking it because of something you have read on this Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of TDEE Calculator. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Links To Other Web Sites</h2>
            <p>
              Our Service may contain links to third-party websites or services that are not owned or controlled by TDEE Calculator.
            </p>
            <p className="mt-4">
              TDEE Calculator has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that TDEE Calculator shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              In no event shall TDEE Calculator, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Accuracy of Information</h2>
            <p>
              We make reasonable efforts to provide accurate information, but we make no guarantees regarding the accuracy or completeness of the information provided. The TDEE Calculator uses established formulas to estimate your Total Daily Energy Expenditure based on the information you provide, but individual results may vary.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us through our <Link href="/contact" className="text-green-600 hover:underline">Contact page</Link>.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
} 