import React from 'react';
import SEO from '../../components/common/SEO';

const Terms = () => {
  return (
    <>
      <SEO title="Terms of Service - ONPHARNO" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-6">Terms of Service</h1>
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>Welcome to onpharno.com. These Terms of Service govern your access to and use of the ONPHARNO B2B website and services.</p>
          <h3 className="font-serif font-bold text-lg text-charcoal mt-4">B2B Informational Purpose</h3>
          <p>The information on this website is intended solely for business-to-business (B2B) evaluation by healthcare, pharmaceutical, and nutraceutical companies. It is not intended for direct consumer diagnosis, medical treatment, or retail sale.</p>
          <h3 className="font-serif font-bold text-lg text-charcoal mt-4">Intellectual Property</h3>
          <p>All brand names, proprietary dosage designs, formulations, and graphic assets are the exclusive property of ONPHARNO and protected under relevant copyright and trademark laws.</p>
        </div>
      </div>
    </>
  );
};

export default Terms;
