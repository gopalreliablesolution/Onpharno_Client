import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';

const PelletsInCapsule = () => {
  return (
    <>
      <SEO title="Pellets-in-Capsule & Pellets-in-Liquid Technology - ONPHARNO" description="Multiple Pellets. One Precisely Designed Capsule. Explore customized release profile formulations." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Multi-Particulate Technology</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Multiple Pellets.</h1>
          <p className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200 mt-2 font-serif">
            One Precisely Designed Capsule.
          </p>
          <p className="text-gray-300 mt-4 max-w-2xl font-light">
            Engineered micro-pellets with distinct polymer functional coatings to deliver multi-phase release profiles or protect sensitive actives.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-lg">
              DISCUSS YOUR PROJECT &rarr;
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 max-w-3xl mx-auto text-center">
          <h3 className="font-serif font-bold text-2xl text-charcoal">Exploring a Pellets-in-Capsule Product?</h3>
          <p className="text-gray-600 mt-3 text-sm">
            Let our R&D formulation team evaluate your drug or nutraceutical actives for pelletization, functional film coating, and capsule compatibility.
          </p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark">
            Schedule a Technical Discovery Call &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default PelletsInCapsule;
