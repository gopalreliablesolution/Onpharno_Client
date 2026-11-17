import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { Globe2, Shield, ArrowRight } from 'lucide-react';

const GlobalPartnerships = () => {
  return (
    <>
      <SEO title="Global Partnerships & Export Collaborations - ONPHARNO" description="Healthcare Solutions Beyond Borders. Partner with ONPHARNO for international export, contract manufacturing, and formulation alliances." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Global Reach</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Healthcare Solutions Beyond Borders.</h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">
            Building Healthcare Partnerships Across 10+ Countries Worldwide.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-charcoal">International Distribution</h3>
            <p className="text-sm text-gray-600 mt-2">Market exclusive distribution rights for our innovative validated formulations.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-charcoal">Export Contract Manufacturing</h3>
            <p className="text-sm text-gray-600 mt-2">Custom formula manufacturing tailored to country-specific regulatory limits.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-charcoal">Dossier & Registration</h3>
            <p className="text-sm text-gray-600 mt-2">Turnkey CTD dossiers, stability documentation, and MOH regulatory support.</p>
          </div>
        </div>
        <div className="mt-16 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3.5 rounded-full font-semibold shadow-md">
            Explore Global Alliances &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default GlobalPartnerships;
