import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { ArrowRight } from 'lucide-react';

const toFaClass = (value) => {
  if (typeof value !== 'string') return '';
  const raw = value.trim();
  if (!raw) return '';
  if (/\b(fa-solid|fa-regular|fa-brands|fas|far|fab)\b/.test(raw)) return raw;
  return `fa-solid fa-${raw.replace(/^fa-/, '')}`;
};

const DEFAULTS = {
  facilities_hero: {
    eyebrow: '2C. FACILITIES',
    title1: 'See Where Products',
    title2: 'Become Real.',
    subtitle: 'Get complete visibility into the manufacturing environment behind the product.',
    imageAlt: 'ONPHARNO manufacturing facility',
  },
  facilities_infrastructure: {
    eyebrow: 'OUR INFRASTRUCTURE',
    title: 'Engineered for Pharmaceutical Precision',
    subtitle: 'State-of-art facilities to support every stage of your product journey.',
    items: [
      { image: '/images/manufacturing-facility.jpg', category: 'SHOW / MANUFACTURING', title: 'Production Environment', desc: 'Technology and environments supporting dosage-form requirements.', link: '/capabilities/manufacturing' },
      { image: '/images/formulation-scientists.png', category: 'R&D', title: 'Development Labs', desc: 'Product and formulation development, supported by our scientific team.', link: '/capabilities/product-development' },
      { image: '/images/scientist-pharmacist.png', category: 'QUALITY CONTROL', title: 'Quality Testing', desc: 'Testing and evaluation environments for every stage of production.', link: '/about/quality' },
      { image: '/images/packaging-line.jpg', category: 'PRODUCTION EQUIPMENT', title: 'Production Lines', desc: 'Technology and equipment supporting manufacturing operations.', link: '/capabilities/manufacturing' },
      { image: '/images/format-capsules.jpg', category: 'PACKAGING', title: 'Packaging Lines', desc: 'Finished-product configuration and market-ready presentation.', link: '/capabilities/packaging-documentation' },
      { image: '/images/facility-highlights.jpg', category: 'WAREHOUSE', title: 'Controlled Storage', desc: 'Materials and finished-product infrastructure under controlled conditions.', link: '/contact' },
    ],
  },
  facilities_feature: {
    eyebrow: 'SPECIAL FEATURE',
    title: 'Dedicated Liquid-Filled Hard Capsule Suites',
    desc: 'From formulation development to production and quality, we own the processes behind the products we build with our partners.',
    badge1Icon: 'fa-solid fa-gear',
    badge1Label: 'Actual Equipment',
    badge2Icon: 'fa-solid fa-flask',
    badge2Label: 'Actual Process',
    badge3Icon: 'fa-solid fa-bolt',
    badge3Label: 'Actual Cleanroom',
    ctaText: 'Explore Liquid-Filled Capability →',
    ctaLink: '/products/liquid-filled-hard-capsules',
    image1: '/images/liquid-capsule-process.jpg',
    image2: '/images/format-capsules.jpg',
    image3: '/images/facility-highlights.jpg',
    auditTitle: 'Schedule a Technical or Regulatory Facility Audit',
    auditDesc: 'We welcome technical audits for our manufacturing operations, regulatory inspection, and quality assurance.',
    auditBtn1Text: 'Request Audit Appointment →',
    auditBtn1Link: '/contact',
    auditBtn2Text: 'Email Quality Assurance',
    auditBtn2Link: 'mailto:quality@onpharno.com',
  },
};

const AboutFacilities = () => {
  const { data: sectionsData } = useQuery({
    queryKey: ['facilities-page-sections'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/pages/facilities/sections?includeHidden=true');
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
      ? obj.items.filter((i) => i && (txt(i.title) || txt(i.desc) || txt(i.image) || txt(i.category)))
      : [];
  const renderLink = (link, text, className) => {
    if (!link || !text) return null;
    if (/^(https?:\/\/|mailto:)/i.test(link)) {
      return <a href={link} target="_blank" rel="noopener noreferrer" className={className}>{text}</a>;
    }
    return <Link to={link} className={className}>{text}</Link>;
  };

  const hero = data('facilities_hero');
  const infrastructure = data('facilities_infrastructure');
  const feature = data('facilities_feature');
  const heroImage = txt(hero.image);

  const featureImages = [txt(feature.image1), txt(feature.image2), txt(feature.image3)].filter(Boolean);
  const badges = [
    { icon: toFaClass(feature.badge1Icon), label: txt(feature.badge1Label) },
    { icon: toFaClass(feature.badge2Icon), label: txt(feature.badge2Label) },
    { icon: toFaClass(feature.badge3Icon), label: txt(feature.badge3Label) },
  ].filter((b) => b.icon || b.label);

  return (
    <>
      <SEO
        title="Manufacturing Facilities & Labs | ONPHARNO"
        description="See Where Products Become Real. Explore ONPHARNO's cGMP cleanrooms, automated liquid capsule filling lines, and advanced analytical testing laboratories."
      />

      {/* HERO */}
      {isVisible('facilities_hero') && (has(hero, ['eyebrow', 'title1', 'title2', 'subtitle']) || heroImage) && (
        <div className="bg-navy text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className={`grid grid-cols-1 ${heroImage ? 'lg:grid-cols-2 gap-10 items-center' : ''} py-14 sm:py-20 lg:py-24`}>
              <div className={heroImage ? '' : 'max-w-3xl'}>
                {txt(hero.eyebrow) && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 px-3 py-1 rounded-full mb-4">
                    {txt(hero.eyebrow)}
                  </span>
                )}
                {txt(hero.title1) && <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">{txt(hero.title1)}</h1>}
                {txt(hero.title2) && (
                  <p className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-primary-light">{txt(hero.title2)}</p>
                )}
                {txt(hero.subtitle) && <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">{txt(hero.subtitle)}</p>}
              </div>
              {heroImage && (
                <img
                  src={getImageUrl(heroImage)}
                  alt={txt(hero.imageAlt) || 'ONPHARNO'}
                  className="w-full h-auto max-h-[280px] sm:max-h-[380px] lg:max-h-[440px] object-contain rounded-2xl shadow-xl"
                  onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* INFRASTRUCTURE */}
      {isVisible('facilities_infrastructure') && (has(infrastructure, ['eyebrow', 'title', 'subtitle']) || itemsOf(infrastructure).length > 0) && (
        <div className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(txt(infrastructure.eyebrow) || txt(infrastructure.title) || txt(infrastructure.subtitle)) && (
              <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                {txt(infrastructure.eyebrow) && (
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <span className="h-px w-14 sm:w-16 bg-primary/40" />
                    <span className="px-3 py-1 rounded-full border border-primary/40 text-[11px] font-bold uppercase tracking-wider text-primary">
                      {txt(infrastructure.eyebrow)}
                    </span>
                    <span className="h-px w-14 sm:w-16 bg-primary/40" />
                  </div>
                )}
                {txt(infrastructure.title) && <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mt-1">{txt(infrastructure.title)}</h2>}
                {txt(infrastructure.subtitle) && <p className="text-xs text-gray-500 mt-2">{txt(infrastructure.subtitle)}</p>}
              </div>
            )}
            {itemsOf(infrastructure).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
                {itemsOf(infrastructure).map((item, idx) => {
                  const img = txt(item.image);
                  return (
                    <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      {img && (
                        <div className="h-40 sm:h-48 w-full overflow-hidden bg-gray-100">
                          <img
                            src={getImageUrl(img)}
                            alt={txt(item.title) || 'Facility'}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                          />
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        {txt(item.category) && <span className="text-[10px] font-bold uppercase tracking-wide text-primary block mb-1">{txt(item.category)}</span>}
                        {txt(item.title) && <h3 className="font-bold text-sm sm:text-base text-charcoal">{txt(item.title)}</h3>}
                        {txt(item.desc) && <p className="text-xs text-gray-600 mt-2 leading-relaxed">{txt(item.desc)}</p>}
                        {txt(item.link) && (
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <Link to={txt(item.link)} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark group">
                              <span>Learn More</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SPECIAL FEATURE */}
      {(isVisible('facilities_feature') &&
        (has(feature, ['eyebrow', 'title', 'desc', 'ctaText', 'auditTitle']) || badges.length > 0 || featureImages.length > 0)) && (
        <>
          <div className="py-12 sm:py-20 bg-navy text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className={`grid grid-cols-1 ${featureImages.length > 0 ? 'lg:grid-cols-2 gap-10 items-center' : ''}`}>
                <div>
                  {txt(feature.eyebrow) && (
                    <span className="text-primary-light font-bold text-xs uppercase tracking-widest block mb-2">{txt(feature.eyebrow)}</span>
                  )}
                  {txt(feature.title) && <h2 className="text-2xl sm:text-4xl font-bold leading-tight">{txt(feature.title)}</h2>}
                  {txt(feature.desc) && <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed font-light">{txt(feature.desc)}</p>}
                  {badges.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-7">
                      {badges.map((b, idx) => (
                        <span key={idx} className="inline-flex items-center gap-2 bg-white/5 border border-white/15 rounded-full px-4 py-2 text-xs text-gray-200">
                          {b.icon && <i className={b.icon} aria-hidden="true" />} {b.label}
                        </span>
                      ))}
                    </div>
                  )}
                  {txt(feature.ctaText) && txt(feature.ctaLink) && (
                    <div className="mt-8">
                      {renderLink(
                        txt(feature.ctaLink),
                        txt(feature.ctaText),
                        'group inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300'
                      )}
                    </div>
                  )}
                </div>
                {featureImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {featureImages.map((img, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-48 sm:h-64">
                        <img
                          src={getImageUrl(img)}
                          alt={txt(feature.title) || 'Facility'}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AUDIT CTA */}
          {(txt(feature.auditTitle) || txt(feature.auditDesc) || txt(feature.auditBtn1Text) || txt(feature.auditBtn2Text)) && (
            <div className="py-12 sm:py-16 bg-white text-center">
              <div className="max-w-3xl mx-auto px-4">
                {txt(feature.auditTitle) && <h3 className="text-xl sm:text-2xl font-bold text-charcoal">{txt(feature.auditTitle)}</h3>}
                {txt(feature.auditDesc) && <p className="text-xs sm:text-sm text-gray-500 mt-2">{txt(feature.auditDesc)}</p>}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  {renderLink(
                    txt(feature.auditBtn1Link),
                    txt(feature.auditBtn1Text),
                    'inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-dark hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300'
                  )}
                  {renderLink(
                    txt(feature.auditBtn2Link),
                    txt(feature.auditBtn2Text),
                    'inline-flex items-center gap-2 bg-warm text-charcoal border border-gray-200 text-xs font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors'
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AboutFacilities;
