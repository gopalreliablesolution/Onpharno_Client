import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';

const LiquidFilledCapsules = () => {
  const faqs = [
    { q: 'What are Liquid-Filled Hard Capsules?', a: 'They are two-piece hard gelatin or HPMC vegetarian capsules filled with liquid, semi-solid, or lipid-based active formulations, sealed hermetically with a tamper-evident band.' },
    { q: 'Are they the same as softgels?', a: 'No. Liquid-filled hard capsules use less plasticizer, offer better moisture and oxygen barriers, and enable vegetarian (HPMC) shell options without animal collagen.' },
    { q: 'Can any liquid be filled?', a: 'Non-aqueous liquids, oils, suspensions, and paste-like matrices are ideal. Water-containing formulations are evaluated individually.' },
    { q: 'Can we bring our own formulation?', a: 'Yes, we can tech-transfer your existing formulation or optimize it for liquid filling and stability.' },
    { q: 'Does ONPHARNO offer private label options?', a: 'Yes, we provide ready-to-launch validated formulations in this format with turnkey packaging.' }
  ];

  return (
    <>
      <SEO title="Liquid-Filled Hard Capsules Technology - ONPHARNO" description="Beyond the Conventional Capsule. Explore ONPHARNO's signature liquid-filled hard capsule technology for superior bioavailability and product differentiation." />
      <div className="bg-navy text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Signature Dosage Form</span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold mt-2 max-w-4xl">
            Beyond the Conventional Capsule.
          </h1>
          <p className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-amber-200 mt-2 font-serif">
            Explore a More Distinctive Product Format.
          </p>
          <p className="text-gray-300 mt-6 max-w-2xl text-lg font-light leading-relaxed">
            Formulation &bull; Format &bull; Product Differentiation &bull; Development. Elevate your brand with superior bioavailability and luxury aesthetic appeal.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/contact" className="bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-lg">
              Discuss Your Product &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Comparison table */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Liquid-Filled Hard Capsules vs Softgels</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">So which is better? Neither. The right format depends on the active molecule, stability requirements, and brand market positioning.</p>
          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-warm border-b border-gray-200 font-serif text-charcoal">
                <tr>
                  <th className="p-4">Feature</th>
                  <th className="p-4 text-primary font-bold">Liquid-Filled Hard Capsule</th>
                  <th className="p-4 text-gray-500">Traditional Softgel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-4 font-medium text-charcoal">Shell System</td>
                  <td className="p-4 text-gray-700">Gelatin or 100% Plant HPMC (Vegetarian)</td>
                  <td className="p-4 text-gray-500">Predominantly animal gelatin + high plasticizers</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-charcoal">Oxygen & Moisture Barrier</td>
                  <td className="p-4 text-gray-700">Superior barrier properties, lower shell moisture</td>
                  <td className="p-4 text-gray-500">Moderate barrier; sensitive to high heat/humidity</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-charcoal">Visual Differentiation</td>
                  <td className="p-4 text-gray-700">Distinctive banding line, luxury dual-color shells</td>
                  <td className="p-4 text-gray-500">Conventional oval/oblong appearance</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-charcoal">Combination Formats</td>
                  <td className="p-4 text-gray-700">Pellets in liquid, capsule-in-capsule capable</td>
                  <td className="p-4 text-gray-500">Limited combination versatility</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-charcoal flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-sm text-gray-600 mt-2 pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LiquidFilledCapsules;
