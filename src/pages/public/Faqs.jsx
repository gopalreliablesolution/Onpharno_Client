import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { ChevronDown, HelpCircle } from 'lucide-react';

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: 'What services does ONPHARNO offer?', a: 'ONPHARNO provides end-to-end turnkey B2B services: formulation R&D, clinical trial batch manufacturing, commercial cGMP production, primary and secondary packaging, and export regulatory dossier preparation.' },
    { q: 'What is your specialty in dosage forms?', a: 'We specialize in advanced liquid-filled hard capsules (gelatin & vegetarian HPMC), dual-release capsule-in-capsule, pellets-in-capsule, effervescent tablets, chewables, and functional oral shots.' },
    { q: 'What are typical Minimum Order Quantities (MOQs)?', a: 'MOQs vary by dosage form. For liquid-filled hard capsules, standard batches start at 50,000 units. For tablets and softgels, MOQs typically range from 50,000 to 100,000 units.' },
    { q: 'Do you offer private label market-ready formulations?', a: 'Yes! We maintain an extensive library of pre-validated formulations across daily wellness, joint health, gut health, sleep, and beauty nutrition that can be rapidly branded and launched.' },
    { q: 'Can you manufacture products for international export?', a: 'Absolutely. We formulate and document according to WHO-GMP, ISO 22000, and target country food/drug authority regulations, supplying complete CTD dossiers and certificates of free sale.' }
  ];

  return (
    <>
      <SEO title="Frequently Asked Questions - ONPHARNO" description="Everything you need to know about partnering with ONPHARNO for pharmaceutical and nutraceutical contract manufacturing." />
      <div className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Resources</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Knowledge & FAQs</h1>
          <p className="text-gray-300 mt-3 max-w-2xl font-light">
            Answers to common questions regarding formulation, contract manufacturing, MOQs, and quality assurance.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 font-semibold text-charcoal flex justify-between items-center gap-4 hover:bg-warm/50 transition-colors"
              >
                <span className="font-serif text-base sm:text-lg">{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-200 shrink-0 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-warm/20">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 p-8 rounded-2xl bg-warm border border-primary/20 text-center">
          <h3 className="font-serif font-bold text-xl text-charcoal">Have a question not listed here?</h3>
          <p className="text-sm text-gray-600 mt-1">Our technical product advisors are ready to assist you.</p>
          <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark">
            Ask Our Product Specialists &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default Faqs;
