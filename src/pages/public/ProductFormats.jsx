import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';

const ProductFormats = () => {
  const formats = [
    { title: 'Liquid-Filled Hard Capsules', desc: 'Hermetically banded vegetarian or gelatin capsules with liquid or oil actives.' },
    { title: 'Capsule-in-Capsule', desc: 'Dual-compartment delivery for incompatible actives or dual-release kinetics.' },
    { title: 'Pellets-in-Capsule', desc: 'Micro-pellets with modified dissolution coatings in standard capsules.' },
    { title: 'Tablets', desc: 'Coated, chewable, sustained-release, and bilayer precision compressed tablets.' },
    { title: 'Softgels', desc: 'Traditional lipid suspension encapsulation for fat-soluble vitamins and oils.' },
    { title: 'Effervescent', desc: 'Fast-dissolving effervescent tablets offering rapid bioavailability and flavor.' },
    { title: 'Sachets & Powders', desc: 'Single-serve drink mixes, electrolyte powders, and meal replacements.' },
    { title: 'Gummies', desc: 'Pectin-based vegetarian gummies with delicious natural fruity flavors.' },
    { title: 'Liquids & Syrups', desc: 'Oral syrups, tonics, and herbal extracts with high stability.' },
    { title: 'Oral Shots', desc: '25ml - 60ml single-serve concentrated liquid formulations for immediate use.' }
  ];

  return (
    <>
      <SEO title="Product Formats & Dosage Options - ONPHARNO" description="Explore the full spectrum of pharmaceutical and nutraceutical dosage formats available for contract manufacturing at ONPHARNO." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Capabilities</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Comprehensive Product Formats</h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">
            From signature advanced capsules to high-speed tablets, effervescents, and gummies.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formats.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-primary/40 transition-colors">
              <h3 className="font-serif font-bold text-lg text-charcoal">{f.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="font-serif text-lg text-charcoal">Not sure which format fits your target product?</p>
          <Link to="/contact" className="mt-2 inline-flex items-center gap-1 text-primary font-semibold hover:text-primary-dark">
            Consult With Our Formulation Team &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductFormats;
