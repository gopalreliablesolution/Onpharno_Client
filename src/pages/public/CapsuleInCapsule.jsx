import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { Layers, ArrowRight } from 'lucide-react';

const CapsuleInCapsule = () => {
  return (
    <>
      <SEO title="Capsule-in-Capsule Technology - ONPHARNO" description="Two Capsule Components. One Product Concept. Explore ONPHARNO's dual-release and multi-phase capsule technology." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Dual Phase Innovation</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Two Capsule Components.</h1>
          <p className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200 mt-2 font-serif">
            One Single Intelligent Product Concept.
          </p>
          <p className="text-gray-300 mt-4 max-w-2xl font-light">
            Deliver incompatible ingredients, dual-release pharmacokinetics (immediate + sustained), or liquid + dry active combinations in an eye-catching single dosage unit.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-lg">
              Evaluate Feasibility &rarr;
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100">
            <span className="text-primary font-bold text-xs uppercase tracking-wider">Step 01</span>
            <h3 className="font-serif font-bold text-lg text-charcoal mt-1">Inner Capsule</h3>
            <p className="text-sm text-gray-600 mt-2">Contains targeted active ingredients formulated for delayed or sustained intestinal release.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100">
            <span className="text-primary font-bold text-xs uppercase tracking-wider">Step 02</span>
            <h3 className="font-serif font-bold text-lg text-charcoal mt-1">Outer Capsule & Liquid Matrix</h3>
            <p className="text-sm text-gray-600 mt-2">Houses lipid carrier or immediate-release actives suspended around the inner capsule.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100">
            <span className="text-primary font-bold text-xs uppercase tracking-wider">Step 03</span>
            <h3 className="font-serif font-bold text-lg text-charcoal mt-1">Finished Dosage Form</h3>
            <p className="text-sm text-gray-600 mt-2">Hermetically banded, visually stunning product creating immense consumer perceived value.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CapsuleInCapsule;
