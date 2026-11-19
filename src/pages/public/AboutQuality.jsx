import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import { getImageUrl } from '../../utils/imageUrl';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const DEFAULTS = {
  quality_hero: {
    eyebrow: 'Quality Assurance & Control',
    title1: 'Quality Is Built Into Every Stage.',
    title2: 'Which Builds Trust.',
    subtitle:
      'Quality is not an afterthought or an inspection badge at the end of a line. At ONPHARNO, quality is our operating system—embedded into raw material selection, machine engineering, and finished product release.',
    imageAlt: 'ONPHARNO Quality Assurance',
  },
  quality_steps: {
    eyebrow: 'Our 6-Step Assurance Protocol',
    title: 'End-to-End Quality Validation',
    subtitle: 'How we guarantee batch-to-batch consistency and regulatory compliance.',
    calloutTitle: '"Quality Is Not a Badge. It Is a Process."',
    calloutDesc:
      'We provide partners with complete audit transparency, allowing full technical visits, document inspections, and third-party lab cross-validations.',
    ctaText: 'View All Certifications & Accreditations',
    ctaLink: '/resources/certifications',
    items: [
      { num: '01', title: 'RAW MATERIAL EVALUATION', subtitle: '', desc: 'Relevant material requirements and specifications.' },
      { num: '02', title: 'CONTROLLED DEVELOPMENT', subtitle: '', desc: 'Structured formulation and product-development processes.' },
      { num: '03', title: 'MANUFACTURING CONTROLS', subtitle: '', desc: 'Defined production processes.' },
      { num: '04', title: 'IN-PROCESS CHECKS', subtitle: '', desc: 'Appropriate checks during manufacturing.' },
      { num: '05', title: 'FINISHED PRODUCT EVALUATION', subtitle: '', desc: 'Assessment against defined product requirements.' },
      { num: '06', title: 'DOCUMENTATION & TRACEABILITY', subtitle: '', desc: 'Relevant product and batch documentation.' },
    ],
  },
};

const AboutQuality = () => {
  const { data: sectionsData } = useQuery({
    queryKey: ['quality-page-sections'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/pages/quality/sections?includeHidden=true');
        return res.data || [];
      } catch {
        return [];
      }
    },
  });
  const sections = sectionsData || [];

  const getRecord = (key) => sections.find((s) => s && s.key === key) || null;
  const isVisible = (key) => {
    const record = getRecord(key);
    return !record || record.visible !== false;
  };
  const data = (key) => {
    const record = getRecord(key);
    if (!record) return { ...DEFAULTS[key], image: '' };
    const saved = record.content && typeof record.content === 'object' ? record.content : {};
    return { ...DEFAULTS[key], ...saved, image: (record.image || '').toString().trim() };
  };
  const txt = (value) => (value ?? '').toString().trim();
  const has = (obj, fields) => fields.some((f) => txt(obj?.[f]));
  const itemsOf = (obj) =>
    Array.isArray(obj?.items)
      ? obj.items.filter((i) => i && (txt(i.title) || txt(i.num) || txt(i.desc) || txt(i.subtitle)))
      : [];

  const hero = data('quality_hero');
  const steps = data('quality_steps');
  const heroImage = txt(hero.image);

  return (
    <>
      <SEO
        title="Quality & Compliance Standards | ONPHARNO"
        description="Quality Is Built Into Every Stage. Which Builds Trust. Explore ONPHARNO's 6-step cGMP quality process and analytical testing standards."
      />

      {/* HERO */}
      {isVisible('quality_hero') && (has(hero, ['eyebrow', 'title1', 'title2', 'subtitle']) || heroImage) && (
        <div className="bg-navy text-white py-14 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className={`grid grid-cols-1 ${heroImage ? 'lg:grid-cols-2 gap-12 items-center' : ''}`}>
              <div className={heroImage ? '' : 'max-w-3xl'}>
                {txt(hero.eyebrow) && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
                    {txt(hero.eyebrow)}
                  </span>
                )}
                {txt(hero.title1) && (
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">{txt(hero.title1)}</h1>
                )}
                {txt(hero.title2) && (
                  <p className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight mt-1 text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">
                    {txt(hero.title2)}
                  </p>
                )}
                {txt(hero.subtitle) && (
                  <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">{txt(hero.subtitle)}</p>
                )}
              </div>
              {heroImage && (
                <img
                  src={getImageUrl(heroImage)}
                  alt={txt(hero.imageAlt) || 'ONPHARNO Quality'}
                  className="w-full h-auto max-h-[280px] sm:max-h-[380px] lg:max-h-[440px] object-contain rounded-2xl shadow-xl"
                  onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEPS + CALLOUT */}
      {isVisible('quality_steps') && (has(steps, ['eyebrow', 'title', 'subtitle', 'calloutTitle', 'ctaText']) || itemsOf(steps).length > 0) && (
        <div className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(txt(steps.eyebrow) || txt(steps.title) || txt(steps.subtitle)) && (
              <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                {txt(steps.eyebrow) && <span className="text-xs font-bold text-primary uppercase tracking-widest">{txt(steps.eyebrow)}</span>}
                {txt(steps.title) && <h2 className="text-3xl font-bold text-charcoal mt-1">{txt(steps.title)}</h2>}
                {txt(steps.subtitle) && <p className="text-xs text-gray-500 mt-2">{txt(steps.subtitle)}</p>}
              </div>
            )}
            {itemsOf(steps).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {itemsOf(steps).map((step, idx) => (
                  <div key={idx} className="bg-warm/30 p-6 sm:p-8 rounded-3xl border border-gray-200 group hover:border-primary/50 transition-all flex flex-col justify-between">
                    <div>
                      {txt(step.num) && <span className="text-3xl font-bold text-primary/30 font-mono block mb-3">{txt(step.num)}</span>}
                      {txt(step.subtitle) && <span className="text-xs font-semibold text-primary block mb-1">{txt(step.subtitle)}</span>}
                      {txt(step.title) && <h3 className="text-lg font-bold text-charcoal">{txt(step.title)}</h3>}
                      {txt(step.desc) && <p className="text-xs text-gray-600 mt-3 leading-relaxed">{txt(step.desc)}</p>}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Audited Standard</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {(txt(steps.calloutTitle) || txt(steps.calloutDesc) || txt(steps.ctaText)) && (
              <div className="mt-12 sm:mt-16 bg-navy text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto border border-gray-800 shadow-xl">
                {txt(steps.calloutTitle) && (
                  <h3 className="text-2xl sm:text-3xl font-bold">{txt(steps.calloutTitle)}</h3>
                )}
                {txt(steps.calloutDesc) && (
                  <p className="text-xs sm:text-sm text-gray-300 mt-3 max-w-xl mx-auto leading-relaxed font-light">{txt(steps.calloutDesc)}</p>
                )}
                {txt(steps.ctaText) && txt(steps.ctaLink) && (
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <Link
                      to={txt(steps.ctaLink)}
                      className="group inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95 transition-all duration-300"
                    >
                      <span>{txt(steps.ctaText)}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AboutQuality;
