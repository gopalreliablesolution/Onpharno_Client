import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { Sparkles, ArrowRight } from 'lucide-react';

const Innovations = () => {
  return (
    <>
      <SEO title="Innovations & What's New - ONPHARNO" description="What's New at ONPHARNO. Discover our latest breakthroughs in dosage delivery, lipid bioavailability, and sustainable packaging." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">What's New</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Healthcare Innovations</h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">
            Pushing the boundaries of bioavailability, clean formulation, and consumer experience.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">NEW FORMAT</span>
            <h3 className="font-serif font-bold text-2xl text-charcoal mt-4">Plant-Based Lipophilic Encapsulation</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Breakthrough HPMC shells compatible with highly sensitive herbal oils, preventing cross-linking and preserving natural phytonutrients without preservatives.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">NEXT GEN</span>
            <h3 className="font-serif font-bold text-2xl text-charcoal mt-4">Targeted Micro-Pellet Chronotherapy</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Multi-phasic pellets providing distinct release timings across a 12-hour circadian window inside a single capsule format.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3.5 rounded-full font-semibold shadow-md">
            Partner With Our Innovation Team &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default Innovations;
