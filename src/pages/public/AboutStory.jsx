import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { Shield, Sparkles, Factory, Users, ArrowRight } from 'lucide-react';

const AboutStory = () => {
  return (
    <>
      <SEO title="Our Story - More Than Manufacturing" description="Learn about ONPHARNO's vision, scientific formulation approach, and our commitment to building better healthcare businesses." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">About Us</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">More Than Manufacturing.</h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">
            A Partner in Building Better Healthcare Businesses.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-semibold text-lg text-charcoal">1. Science-Led Development</h3>
            <p className="text-sm text-gray-600 mt-2">Formulations built on bioavailability, stability, and therapeutic integrity.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-semibold text-lg text-charcoal">2. Quality-Driven Manufacturing</h3>
            <p className="text-sm text-gray-600 mt-2">Rigorous cGMP controls from raw materials through finished batch release.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-semibold text-lg text-charcoal">3. End-to-End Capability</h3>
            <p className="text-sm text-gray-600 mt-2">Turnkey services from laboratory prototyping to commercial packaging.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-semibold text-lg text-charcoal">4. Built for Partnership</h3>
            <p className="text-sm text-gray-600 mt-2">Collaborative, transparent, and aligned with your brand's growth goals.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutStory;
