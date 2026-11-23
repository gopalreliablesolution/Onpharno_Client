import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { ArrowRight } from 'lucide-react';

const DEFAULTS = {
  hero: {
    eyebrow: "WHAT'S NEW",
    title: 'Healthcare Innovations',
    subtitle: 'Pushing the boundaries of bioavailability, clean formulation, and consumer experience.',
  },
  intro: {
    title: 'Innovation Starts With the Right Product Question.',
    subtitle: 'Explore the formulation thinking, dosage-form development and practical manufacturing considerations behind our work.',
  },
  cta: {
    title: 'Have a Product Idea?',
    desc: "Let's explore how innovation can shape your next product.",
    text: 'Partner With Our Innovation Team →',
    link: '/contact',
  },
  items: [
    { badge: 'NEW FORMAT', title: 'Plant-Based Lipophilic Encapsulation', desc: 'Breakthrough HPMC shells compatible with highly sensitive herbal oils, preventing cross-linking and preserving natural phytonutrients without preservatives.', image: '' },
    { badge: 'NEXT GEN', title: 'Targeted Micro-Pellet Chronotherapy', desc: 'Multi-phasic pellets providing distinct release timings across a 12-hour circadian window inside a single capsule format.', image: '' },
  ],
};

const Innovations = () => {
  const { data } = useQuery({
    queryKey: ['innovations-page-section'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/pages/innovations/sections?includeHidden=true');
        return res.data || [];
      } catch { return []; }
    },
  });
  const record = (data || []).find((s) => s && s.key === 'innovations_page' && s.visible !== false);
  const c = record?.content || {};
  const txt = (v, d) => (record ? (v ?? '').toString().trim() : d);
  const hero = {
    eyebrow: txt(c.hero?.eyebrow, DEFAULTS.hero.eyebrow),
    title: txt(c.hero?.title, DEFAULTS.hero.title),
    subtitle: txt(c.hero?.subtitle, DEFAULTS.hero.subtitle),
  };
  const intro = {
    title: txt(record?.title, DEFAULTS.intro.title),
    subtitle: txt(record?.subtitle, DEFAULTS.intro.subtitle),
  };
  const cta = {
    title: txt(c.cta?.title, DEFAULTS.cta.title),
    desc: txt(c.cta?.desc, DEFAULTS.cta.desc),
    text: txt(c.cta?.text, DEFAULTS.cta.text),
    link: txt(c.cta?.link, DEFAULTS.cta.link),
  };
  const items = record
    ? Array.isArray(c.items) ? c.items.filter((i) => i && (i.title || i.desc || i.badge)) : []
    : DEFAULTS.items;

  return (
    <>
      <SEO title="Innovations & What's New - ONPHARNO" description="What's New at ONPHARNO. Discover our latest breakthroughs in dosage delivery, lipid bioavailability, and sustainable packaging." />
      <div className="bg-navy text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {hero.eyebrow && <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">{hero.eyebrow}</span>}
          {hero.title && <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">{hero.title}</h1>}
          {hero.subtitle && <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">{hero.subtitle}</p>}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {(intro.title || intro.subtitle) && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            {intro.title && <h2 className="text-2xl sm:text-3xl font-bold text-charcoal">{intro.title}</h2>}
            {intro.subtitle && <p className="text-sm text-gray-600 mt-3">{intro.subtitle}</p>}
          </div>
        )}
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((it, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                {it.image && (
                  <img src={getImageUrl(it.image)} alt={it.title || 'Innovation'} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                )}
                <div className="p-8">
                  {it.badge && <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">{it.badge}</span>}
                  {it.title && <h3 className="font-serif font-bold text-2xl text-charcoal mt-4">{it.title}</h3>}
                  {it.desc && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{it.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        {(cta.title || cta.text) && (
          <div className="mt-12 text-center rounded-2xl bg-warm border border-primary/20 p-8">
            {cta.title && <h3 className="text-xl font-bold text-charcoal">{cta.title}</h3>}
            {cta.desc && <p className="text-sm text-gray-600 mt-1">{cta.desc}</p>}
            {cta.text && cta.link && (
              <Link to={cta.link} className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg">
                {cta.text} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Innovations;
