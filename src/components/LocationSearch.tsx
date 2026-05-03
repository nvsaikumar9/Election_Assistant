'use client';

import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

export const LocationSearch = ({ lang }: { lang: 'en' | 'hi' }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    
    // Simulating Google Maps Geocoding & Places API call
    // In a real app, this would call a server action that uses @googlemaps/google-maps-services-js
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResults: Record<string, string> = {
      'en': `Found polling stations near "${query}". The nearest one is at the Govt. High School, 1.2km away.`,
      'hi': `"${query}" के पास मतदान केंद्र मिले। निकटतम मतदान केंद्र राजकीय उच्च विद्यालय में 1.2 किमी दूर है।`
    };
    
    setResult(mockResults[lang]);
    setIsSearching(false);
  };

  return (
    <div className="ds-card p-6 mt-8 border-t-4 border-t-secondary-container">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={20} className="text-secondary-container" />
        <h3 className="text-[18px] font-medium text-on-surface">
          {lang === 'en' ? 'Find Your Polling Station' : 'अपना मतदान केंद्र खोजें'}
        </h3>
      </div>
      <p className="text-[14px] text-on-surface-variant mb-4">
        {lang === 'en' 
          ? 'Enter your locality or area to find the nearest election polling station using Google Maps.' 
          : 'गूगल मैप्स का उपयोग करके निकटतम चुनाव मतदान केंद्र खोजने के लिए अपना इलाका या क्षेत्र दर्ज करें।'}
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={lang === 'en' ? "e.g. Indiranagar, Bengaluru" : "उदा. इंदिरा नगर, बेंगलुरु"}
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2.5 pl-4 pr-4 text-[14px] focus:outline-none focus:border-primary-container"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="bg-primary-container text-white px-6 py-2 rounded-lg font-medium hover:bg-primary transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
          {lang === 'en' ? 'Search' : 'खोजें'}
        </button>
      </div>
      
      {result && (
        <div className="mt-4 p-3 bg-secondary-fixed text-secondary-container rounded-lg text-[14px] font-medium animate-in fade-in slide-in-from-top-2">
          {result}
        </div>
      )}
    </div>
  );
};
