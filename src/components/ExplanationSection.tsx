'use client';

import dynamic from 'next/dynamic';

// Dynamically import non-critical components
const TdeeExplanation = dynamic(() => import('@/components/TdeeExplanation'), {
  ssr: false // Load this component only on client-side after initial render
});

export default function ExplanationSection() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-green-800 mb-6">What is TDEE?</h2>
      <div className="prose max-w-none text-gray-800">
        <TdeeExplanation />
      </div>
    </section>
  );
} 