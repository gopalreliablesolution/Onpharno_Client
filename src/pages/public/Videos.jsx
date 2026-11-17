import React from 'react';
import SEO from '../../components/common/SEO';
import { PlayCircle } from 'lucide-react';

const Videos = () => {
  return (
    <>
      <SEO title="Video Library & Facility Tours - ONPHARNO" description="Watch facility tours, automated encapsulation machinery in action, and formulation science explanations." />
      <div className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Media & Tours</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Video Library</h1>
          <p className="text-gray-300 mt-3 max-w-2xl font-light">
            Take a virtual tour of our high-speed manufacturing lines and R&D cleanrooms.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="h-64 bg-charcoal flex items-center justify-center relative group">
              <PlayCircle className="w-16 h-16 text-primary group-hover:scale-110 transition-transform cursor-pointer" />
            </div>
            <div className="p-6">
              <h3 className="font-serif font-bold text-lg text-charcoal">Liquid-Filled Hard Capsule Encapsulation & Banding</h3>
              <p className="text-sm text-gray-600 mt-2">A high-speed look at hermetic banding and automated inspection.</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="h-64 bg-charcoal flex items-center justify-center relative group">
              <PlayCircle className="w-16 h-16 text-primary group-hover:scale-110 transition-transform cursor-pointer" />
            </div>
            <div className="p-6">
              <h3 className="font-serif font-bold text-lg text-charcoal">State-of-the-Art Formulation R&D Lab Walkthrough</h3>
              <p className="text-sm text-gray-600 mt-2">Inside our analytical testing, stability chambers, and pilot facility.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Videos;
