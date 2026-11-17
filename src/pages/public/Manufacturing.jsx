import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';

const Manufacturing = () => {
  return (
    <>
      <SEO title="Manufacturing Capabilities - ONPHARNO" description="High-throughput cGMP pharmaceutical and nutraceutical contract manufacturing facility with automated encapsulation, tableting, and packaging." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Capabilities</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Manufacturing Excellence</h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">
            Engineered for high throughput, repeatability, and international compliance.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-charcoal">Flexible B2B Manufacturing Models</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Whether you require ready-to-launch private label batches, custom formula scale-up, or full-scale international contract manufacturing, our facility is equipped with automated lines to meet tight delivery schedules.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3.5 rounded-full font-semibold shadow-md">
              DISCUSS YOUR MANUFACTURING REQUIREMENTS &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manufacturing;
