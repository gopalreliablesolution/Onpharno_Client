import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';

const ProductDevelopment = () => {
  const steps = [
    { num: '01', title: 'Discover', desc: 'Understanding product opportunity, therapeutic intent, and target market positioning.' },
    { num: '02', title: 'Develop', desc: 'Formulation chemistry, ingredient synergy, active assay, and preliminary stability tests.' },
    { num: '03', title: 'Select', desc: 'Selecting optimal dosage format: liquid-filled capsule, tablet, effervescent, or sachet.' },
    { num: '04', title: 'Finalize', desc: 'Pilot batch execution, sensory evaluation, organoleptic tests, and packaging specs.' },
    { num: '05', title: 'Manufacture', desc: 'Commercial scale-up in cGMP cleanrooms under automated climate-controlled conditions.' },
    { num: '06', title: 'Package', desc: 'Primary and secondary packaging with full brand customization and tamper evidence.' },
    { num: '07', title: 'Deliver', desc: 'Final QC release, COA issuance, export compliance dossiers, and domestic/global dispatch.' }
  ];

  return (
    <>
      <SEO title="Product Development (Idea to Market) - ONPHARNO" description="Explore ONPHARNO's 7-step turnkey approach to developing pharmaceutical and nutraceutical products from concept to commercialization." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Capabilities</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">7-Step Product Development</h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">
            Have an Idea? Let's Build the Right Product Around It.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6 max-w-4xl mx-auto">
          {steps.map((s) => (
            <div key={s.num} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-6 shadow-sm">
              <span className="font-serif font-bold text-3xl text-primary">{s.num}</span>
              <div>
                <h3 className="font-serif font-bold text-xl text-charcoal">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3.5 rounded-full font-semibold shadow-md">
            START PRODUCT DEVELOPMENT &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductDevelopment;
