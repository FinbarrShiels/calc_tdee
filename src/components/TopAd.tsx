"use client";

import Script from 'next/script';

export default function TopAd() {
  return (
    <>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1990518122312332"
        crossOrigin="anonymous" />
      {/* TDEE - Test Top */}
      <ins className="adsbygoogle"
        style={{ display: 'inline-block', width: '728px', height: '90px' }}
        data-ad-client="ca-pub-1990518122312332"
        data-ad-slot="4907789275"></ins>
      <Script>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
} 