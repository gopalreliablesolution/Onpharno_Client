import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEO from './SEO';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { ArrowRight } from 'lucide-react';

// Generic renderer for the Capabilities CMS pages. Every visible piece is
// controlled from the admin; components below just lay out the saved content.
const CapabilityPage = ({ sectionKey, defaults, seoTitle, seoDescription, renderBody }) => {
  const { data } = useQuery({
    queryKey: ['cap-page', sectionKey],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/pages/capabilities/sections?includeHidden=true');
        return res.data || [];
      } catch { return []; }
    },
  });
  const rec = (data || []).find((s) => s && s.key === sectionKey && s.visible !== false);
  const d = rec ? { ...defaults, ...(rec.content || {}) } : defaults;
  const txt = (v) => (v ?? '').toString().trim();
  const arr = (v) => (Array.isArray(v) ? v.filter((x) => x && (x.title || x.num || x.name)) : []);
  return (
    <>
      <SEO title={seoTitle} description={seoDescription} />
      <Hero d={d} txt={txt} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16">
        {renderBody({ d, txt, arr })}
      </div>
    </>
  );
};

const Hero = ({ d, txt }) => {
  const img = txt(d.heroImage);
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      {img && (
        <div className="absolute inset-0 hidden lg:block">
          <img src={getImageUrl(img)} alt="" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-90" onError={(e) => { e.target.style.display = 'none'; }} />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent" />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-3xl">
          {txt(d.eyebrow) && <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">{txt(d.eyebrow)}</span>}
          {txt(d.heroTitle) && <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mt-2 text-white whitespace-pre-line">{txt(d.heroTitle)}</h1>}
          {txt(d.heroSubtitle) && <p className="text-base sm:text-lg text-gray-300 mt-4 max-w-2xl font-light leading-relaxed whitespace-pre-line">{txt(d.heroSubtitle)}</p>}
          {txt(d.heroCtaText) && txt(d.heroCtaLink) && (
            <Link to={txt(d.heroCtaLink)} className="mt-6 inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3.5 rounded-full shadow hover:bg-primary-dark">
              {txt(d.heroCtaText)} <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export const SectionTitle = ({ children }) =>
  children ? <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-8 text-center">{children}</h2> : null;

export const CtaButton = ({ text, link }) =>
  text && link ? (
    <div className="text-center pt-2">
      <Link to={link} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all">
        {text} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  ) : null;

export const ImageCard = ({ item, txt, dark, compact }) => {
  if (!item || (!txt(item.title) && !txt(item.image))) return null;
  const img = txt(item.image);
  return (
    <div className={`rounded-2xl border overflow-hidden flex flex-col ${dark ? 'bg-navy text-white border-navy-800' : 'bg-white border-gray-200'} ${compact ? '' : 'shadow-sm'}`}>
      {img && (
        <div className={`w-full overflow-hidden bg-warm/40 ${compact ? 'h-20' : 'h-44'}`}>
          <img src={getImageUrl(img)} alt={txt(item.title)} className="w-full h-full object-contain p-2" onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
      )}
      <div className={`${compact ? 'p-3 text-center' : 'p-6'} flex-1 flex flex-col`}>
        {txt(item.subtitle || item.badge) && <span className={`text-xs font-bold uppercase tracking-wider ${dark ? 'text-primary-light' : 'text-primary'}`}>{txt(item.subtitle || item.badge)}</span>}
        {txt(item.title) && <h3 className={`font-bold ${compact ? 'text-xs mt-1' : 'text-lg mt-2'} ${dark ? 'text-white' : 'text-charcoal'}`}>{txt(item.title)}</h3>}
        {txt(item.desc) && <p className={`text-xs mt-2 leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{txt(item.desc)}</p>}
        {txt(item.cta) && txt(item.link) && (
          <Link to={txt(item.link)} className={`inline-flex items-center gap-1 text-xs font-bold mt-auto pt-3 ${dark ? 'text-primary-light' : 'text-primary'}`}>
            {txt(item.cta)} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};

const GRID_COLS = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6', 7: 'lg:grid-cols-7' };

// Horizontal numbered timeline with optional icons (matches the mockups).
export const Timeline = ({ items, title, txt, cols = 7 }) => (
  <section>
    <SectionTitle>{title && txt(title)}</SectionTitle>
    <div className={`grid grid-cols-2 sm:grid-cols-3 ${GRID_COLS[cols] || 'lg:grid-cols-7'} gap-4`}>
      {items.map((it, i) => (
        <div key={i} className="flex flex-col items-center text-center gap-2">
          <span className="w-10 h-10 rounded-full bg-primary/10 text-primary border-2 border-primary/30 flex items-center justify-center text-sm font-bold">
            {it.icon ? <i className={txt(it.icon)} /> : txt(it.num) || String(i + 1).padStart(2, '0')}
          </span>
          {txt(it.title) && <h4 className="text-xs font-bold text-charcoal leading-snug">{txt(it.title)}</h4>}
          {txt(it.desc) && <p className="text-[11px] text-gray-500 leading-snug">{txt(it.desc)}</p>}
        </div>
      ))}
    </div>
  </section>
);

// Icon + label tiles (matches "What We Can Help With").
export const IconGrid = ({ items, title, txt, cols = 7 }) => (
  <section>
    <SectionTitle>{title && txt(title)}</SectionTitle>
    <div className={`grid grid-cols-2 sm:grid-cols-3 ${GRID_COLS[cols] || 'lg:grid-cols-7'} gap-3`}>
      {items.map((it, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 text-center flex flex-col items-center gap-2">
          {it.icon ? <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><i className={txt(it.icon)} /></span> : null}
          {txt(it.title) && <h4 className="text-xs font-bold text-charcoal leading-snug">{txt(it.title)}</h4>}
          {txt(it.desc) && <p className="text-[11px] text-gray-500 leading-snug">{txt(it.desc)}</p>}
        </div>
      ))}
    </div>
  </section>
);

export const ListCard = ({ item, txt, icon }) =>
  item && txt(item.title) ? (
    <div className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4">
      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
        {item.icon ? <i className={txt(item.icon)} /> : icon ? <i className={icon} /> : null}
      </span>
      <div>
        <h4 className="text-sm font-bold text-charcoal">{txt(item.title)}</h4>
        {txt(item.desc) && <p className="text-xs text-gray-600 mt-1 leading-relaxed">{txt(item.desc)}</p>}
      </div>
    </div>
  ) : null;

// Dark CTA banner with an optional side image.
export const CtaBanner = ({ d, txt }) => {
  if (!txt(d.bannerTitle) && !txt(d.ctaText)) return null;
  const img = txt(d.bannerImage);
  return (
    <section className="relative rounded-3xl overflow-hidden bg-navy text-white">
      {img && <img src={getImageUrl(img)} alt="" className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-60 hidden lg:block" onError={(e) => { e.target.style.display = 'none'; }} />}
      <div className="relative z-10 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          {txt(d.bannerTitle) && <h3 className="text-xl sm:text-2xl font-bold">{txt(d.bannerTitle)}</h3>}
          {txt(d.bannerDesc) && <p className="text-sm text-gray-300 mt-2">{txt(d.bannerDesc)}</p>}
        </div>
        <CtaButton text={txt(d.ctaText)} link={txt(d.ctaLink)} />
      </div>
    </section>
  );
};

export default CapabilityPage;
