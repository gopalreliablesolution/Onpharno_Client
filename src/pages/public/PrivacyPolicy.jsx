import React from 'react';
import SEO from '../../components/common/SEO';

const PrivacyPolicy = () => {
  return (
    <>
      <SEO title="Privacy Policy - ONPHARNO" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>At ONPHARNO, we are committed to protecting the privacy and confidential proprietary data of our commercial B2B partners, clients, and website visitors.</p>
          <h3 className="font-serif font-bold text-lg text-charcoal mt-4">Information We Collect</h3>
          <p>We collect business contact information (name, company name, corporate email address, telephone number, and formulation specifications) provided directly through our project inquiry and partnership forms.</p>
          <h3 className="font-serif font-bold text-lg text-charcoal mt-4">Confidentiality & Non-Disclosure</h3>
          <p>All formulation briefs, active ingredient queries, and batch requirements submitted through onpharno.com are treated under strict proprietary confidentiality standards. Non-disclosure agreements (NDAs) are routinely executed prior to formulation prototyping.</p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
