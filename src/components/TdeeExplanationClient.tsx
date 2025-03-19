"use client";

import dynamic from 'next/dynamic';

const TdeeExplanation = dynamic(() => import('@/components/TdeeExplanation'), {
  loading: () => <div className="min-h-[250px] flex items-center justify-center">Loading explanation...</div>
});

export default function TdeeExplanationClient() {
  return <TdeeExplanation />;
} 