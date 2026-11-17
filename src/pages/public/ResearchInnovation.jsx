import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';

const ResearchInnovation = () => {
  return (
    <>
      <SEO title="Research & Innovation - ONPHARNO" description="Innovation Starts With the Right Product Question. Explore ONPHARNO's R&D capabilities in dosage-form science and bioavailability enhancement." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Capabilities</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Research & Innovation</h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">
            Formulation science, advanced delivery matrices, and sustained therapeutic impact.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-charcoal">Formulation & Compatibility</h3>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Studying excipient-active interactions, lipid solubilization systems, and anti-sedimentation suspension rheology to maximize stability across shelf life.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-charcoal">Dosage-Form Innovation</h3>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Pioneering liquid-filled hard capsules, multi-phase systems (capsule-in-capsule), and functional pellet coatings that set brands apart.
            </p>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-xl font-serif italic text-charcoal">"Innovation Starts With the Right Product Question."</p>
          <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark">
            Collaborate on R&D With Us &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default ResearchInnovation;
