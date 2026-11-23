import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import { ChevronDown } from 'lucide-react';

const DEFAULTS = {
  eyebrow: 'Resources',
  title: 'Knowledge & FAQs',
  subtitle: 'Answers to common questions regarding formulation, contract manufacturing, MOQs, and quality assurance.',
  ctaTitle: 'Have a question not listed here?',
  ctaDesc: 'Our technical product advisors are ready to assist you.',
  ctaText: 'Ask Our Product Specialists →',
  ctaLink: '/contact',
};
const FALLBACK_FAQS = [
  { question: 'What services does ONPHARNO offer?', answer: 'ONPHARNO provides end-to-end turnkey B2B services: formulation R&D, clinical trial batch manufacturing, commercial cGMP production, primary and secondary packaging, and export regulatory dossier preparation.' },
  { question: 'What is your specialty in dosage forms?', answer: 'We specialize in advanced liquid-filled hard capsules (gelatin & vegetarian HPMC), dual-release capsule-in-capsule, pellets-in-capsule, effervescent tablets, chewables, and functional oral shots.' },
  { question: 'What are typical Minimum Order Quantities (MOQs)?', answer: 'MOQs vary by dosage form. For liquid-filled hard capsules, standard batches start at 50,000 units. For tablets and softgels, MOQs typically range from 50,000 to 100,000 units.' },
  { question: 'Do you offer private label market-ready formulations?', answer: 'Yes! We maintain an extensive library of pre-validated formulations across daily wellness, joint health, gut health, sleep, and beauty nutrition that can be rapidly branded and launched.' },
  { question: 'Can you manufacture products for international export?', answer: 'Absolutely. We formulate and document according to WHO-GMP, ISO 22000, and target country food/drug authority regulations, supplying complete CTD dossiers and certificates of free sale.' },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { data: sectionsData } = useQuery({
    queryKey: ['resources-page-sections'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/pages/resources/sections?includeHidden=true');
        return res.data || [];
      } catch { return []; }
    },
  });
  const { data: faqsData } = useQuery({
    queryKey: ['public-faqs'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/faqs');
        return res.data || [];
      } catch { return []; }
    },
  });

  const sections = sectionsData || [];
  const record = sections.find((s) => s && s.key === 'resources_faqs' && s.visible !== false);
  const saved = record?.content || {};
  const txt = (v, d) => (record ? (v ?? '').toString().trim() : d);
  const cms = {
    eyebrow: txt(saved.eyebrow, DEFAULTS.eyebrow),
    title: txt(record?.title, DEFAULTS.title),
    subtitle: txt(record?.subtitle, DEFAULTS.subtitle),
    ctaTitle: txt(saved.ctaTitle, DEFAULTS.ctaTitle),
    ctaDesc: txt(saved.ctaDesc, DEFAULTS.ctaDesc),
    ctaText: txt(saved.ctaText, DEFAULTS.ctaText),
    ctaLink: txt(saved.ctaLink, DEFAULTS.ctaLink),
  };
  const faqs = Array.isArray(faqsData) && faqsData.length > 0 ? faqsData : FALLBACK_FAQS;

  return (
    <>
      <SEO
        title="Frequently Asked Questions - ONPHARNO"
        description="Everything you need to know about partnering with ONPHARNO for pharmaceutical and nutraceutical contract manufacturing."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />
      <div className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cms.eyebrow && <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">{cms.eyebrow}</span>}
          {cms.title && <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">{cms.title}</h1>}
          {cms.subtitle && <p className="text-gray-300 mt-3 max-w-2xl font-light whitespace-pre-line">{cms.subtitle}</p>}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={f._id || i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 font-semibold text-charcoal flex justify-between items-center gap-4 hover:bg-warm/50 transition-colors"
              >
                <span className="font-serif text-base sm:text-lg">{f.question}</span>
                <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-200 shrink-0 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-warm/20">
                  {f.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        {(cms.ctaTitle || cms.ctaText) && (
          <div className="mt-12 p-8 rounded-2xl bg-warm border border-primary/20 text-center">
            {cms.ctaTitle && <h3 className="font-serif font-bold text-xl text-charcoal">{cms.ctaTitle}</h3>}
            {cms.ctaDesc && <p className="text-sm text-gray-600 mt-1">{cms.ctaDesc}</p>}
            {cms.ctaText && cms.ctaLink && (
              <Link to={cms.ctaLink} className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark">
                {cms.ctaText}
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Faqs;
