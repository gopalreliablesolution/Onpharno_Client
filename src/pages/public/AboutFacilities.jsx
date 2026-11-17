import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { Building2, ArrowRight } from 'lucide-react';

const AboutFacilities = () => {
  const blocks = [
    { title: 'Manufacturing Plant', desc: 'State-of-the-art cGMP facility designed with ISO cleanrooms and automated containment.' },
    { title: 'Formulation R&D', desc: 'Dedicated pilot formulation laboratories with advanced rheology and analytical equipment.' },
    { title: 'Quality Control (QC/QA)', desc: 'Full testing labs for HPLC, GC, dissolution testing, stability chambers, and microbiology.' },
    { title: 'Production Equipment', desc: 'High-speed automated capsule filling, liquid sealing, blister packing, and bottling lines.' },
    { title: 'Packaging Lines', desc: 'Alu-Alu blister, PVC/PVDC, induction sealed HDPE bottles, and custom export packing.' },
    { title: 'Warehouse & Storage', desc: 'Temperature-controlled and humidity-monitored storage compliant with global GDP guidelines.' }
  ];

  return (
    <>
      <SEO title="Manufacturing Facilities & Labs - ONPHARNO" description="See Where Products Become Real. Explore ONPHARNO's cGMP manufacturing facilities and advanced laboratory infrastructure." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Infrastructure</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">See Where Products Become Real.</h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">
            Engineered for precision, high throughput, and international regulatory compliance.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blocks.map((block, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-charcoal">{block.title}</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{block.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3.5 rounded-full font-semibold shadow-md">
            Schedule a Facility Visit &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default AboutFacilities;
