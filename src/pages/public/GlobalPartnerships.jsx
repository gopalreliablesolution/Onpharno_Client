import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { Globe2, ArrowRight } from 'lucide-react';

const D = {
  eyebrow: 'International Healthcare Alliances',
  title1: 'Building Healthcare Partnerships',
  title2: 'Beyond Borders.',
  subtitle: 'Supplying world-class formulations, certified cGMP documentation, and scalable production to healthcare leaders in 10+ countries across four continents.',
  ctaText: 'Inquire for International Distribution →', ctaLink: '/contact',
  image: '/images/world-map.png',
  footprintEyebrow: 'Global Footprint',
  footprintTitle: 'Export-Ready Formulations Engineered for Global Regulatory Clearances',
  footprintDesc: 'Navigating international health ministry approvals requires meticulous documentation. ONPHARNO provides brand partners with ready CTD dossier modules, accelerated stability data under climatic Zone IVb, and legalized Certificates of Analysis.',
  stat1Value: '10+', stat1Label: 'Export Destinations', stat2Value: '100%', stat2Label: 'WHO-GMP & ISO Compliance',
  modelsTitle: 'Global Partnership Models', modelsSubtitle: 'Tailored structures for importers, brand owners, and regional distributors.',
  regionsTitle: 'Key Regional Markets Served',
  models: [
    { title: 'Market-Exclusive Distribution', desc: 'Secure territory-exclusive commercial rights to distribute ONPHARNO signature Liquid-Filled Hard Capsules and specialty formulas under your brand or our registered labels.' },
    { title: 'Export Contract Manufacturing', desc: 'Formulations customized to match country-specific dietary intake limits, permitted excipients, and language packaging mandates.' },
    { title: 'Turnkey Dossiers & Registration Support', desc: 'We prepare complete Common Technical Documents (CTD), 24-month Zone IVb stability data, GMP certificates, and analytical validation reports for swift Ministry of Health (MoH) clearances.' },
  ],
  regions: [
    { title: 'Southeast Asia (ASEAN)', desc: 'Full compliance with ASEAN Food & Supplement Harmonization guidelines and Halal documentation.' },
    { title: 'Middle East & GCC', desc: 'MoH compliant registrations, Certificate of Free Sale (CFS), and heat-stable Zone IVb packaging.' },
    { title: 'Africa & SADC', desc: 'Affordable, high-potency preventative healthcare and therapeutic vitamin combinations.' },
    { title: 'Europe & CIS', desc: 'Clean-label vegetarian formulations adhering to EFSA allowable botanical levels.' },
  ],
};

const GlobalPartnerships = () => {
  const { data } = useQuery({
    queryKey: ['partners-page-section'],
    queryFn: async () => {
      try { const res = await apiClient.get('/pages/partners/sections?includeHidden=true'); return res.data || []; }
      catch { return []; }
    },
  });
  const rec = (data || []).find((s) => s && s.key === 'partner_global' && s.visible !== false);
  const c = rec?.content || {};
  const t = (v, d) => (rec ? (v ?? '').toString().trim() : d);
  const cms = {
    eyebrow: t(c.eyebrow, D.eyebrow), title1: t(c.title1, D.title1), title2: t(c.title2, D.title2),
    subtitle: t(c.subtitle, D.subtitle), ctaText: t(c.ctaText, D.ctaText), ctaLink: t(c.ctaLink, D.ctaLink),
    image: t(c.image, D.image),
    footprintEyebrow: t(c.footprintEyebrow, D.footprintEyebrow), footprintTitle: t(c.footprintTitle, D.footprintTitle),
    footprintDesc: t(c.footprintDesc, D.footprintDesc),
    stat1Value: t(c.stat1Value, D.stat1Value), stat1Label: t(c.stat1Label, D.stat1Label),
    stat2Value: t(c.stat2Value, D.stat2Value), stat2Label: t(c.stat2Label, D.stat2Label),
    modelsTitle: t(c.modelsTitle, D.modelsTitle), modelsSubtitle: t(c.modelsSubtitle, D.modelsSubtitle),
    regionsTitle: t(c.regionsTitle, D.regionsTitle),
  };
  const models = rec ? (Array.isArray(c.models) ? c.models.filter((x) => x && (x.title || x.desc)) : []) : D.models;
  const regions = rec ? (Array.isArray(c.regions) ? c.regions.filter((x) => x && (x.title || x.desc)) : []) : D.regions;

  return (
    <>
      <SEO title="Global Healthcare Partnerships & Export Alliances | ONPHARNO" description="Building Healthcare Partnerships Beyond Borders. Partner with ONPHARNO for international pharmaceutical and nutraceutical export, contract manufacturing, and market-exclusive distribution." />
      <div className="bg-navy text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {cms.eyebrow && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">{cms.eyebrow}</span>}
            {cms.title1 && <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">{cms.title1}</h1>}
            {cms.title2 && <p className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-primary-light mt-1">{cms.title2}</p>}
            {cms.subtitle && <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">{cms.subtitle}</p>}
            {cms.ctaText && cms.ctaLink && <div className="mt-8"><Link to={cms.ctaLink} className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-lg">{cms.ctaText}</Link></div>}
          </div>
        </div>
      </div>

      <div className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {cms.footprintEyebrow && <span className="text-xs font-bold text-primary uppercase tracking-widest block">{cms.footprintEyebrow}</span>}
              {cms.footprintTitle && <h2 className="text-3xl font-bold text-charcoal leading-snug">{cms.footprintTitle}</h2>}
              {cms.footprintDesc && <p className="text-sm text-gray-600 leading-relaxed">{cms.footprintDesc}</p>}
              {(cms.stat1Value || cms.stat2Value) && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {cms.stat1Value && <div className="p-4 rounded-2xl bg-warm border border-gray-200"><p className="text-2xl font-bold text-primary">{cms.stat1Value}</p><p className="text-xs text-gray-600 mt-0.5">{cms.stat1Label}</p></div>}
                  {cms.stat2Value && <div className="p-4 rounded-2xl bg-warm border border-gray-200"><p className="text-2xl font-bold text-primary">{cms.stat2Value}</p><p className="text-xs text-gray-600 mt-0.5">{cms.stat2Label}</p></div>}
                </div>
              )}
            </div>
            {cms.image && (
              <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-warm/20 p-4">
                <img src={getImageUrl(cms.image)} alt="Global Export Network" className="w-full h-auto object-contain rounded-2xl" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {models.length > 0 && (
        <div className="py-14 sm:py-20 bg-warm/30 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(cms.modelsTitle || cms.modelsSubtitle) && <div className="text-center max-w-2xl mx-auto mb-12"><h2 className="text-3xl font-bold text-charcoal">{cms.modelsTitle}</h2><p className="text-xs text-gray-500 mt-2">{cms.modelsSubtitle}</p></div>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {models.map((s, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div><span className="text-xs font-bold text-primary uppercase">Model 0{idx + 1}</span><h3 className="text-lg font-bold text-charcoal mt-1">{s.title}</h3><p className="text-xs text-gray-600 mt-3 leading-relaxed">{s.desc}</p></div>
                  <div className="pt-6 mt-4 border-t border-gray-100"><Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark">Discuss Requirements <ArrowRight className="w-3.5 h-3.5" /></Link></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {regions.length > 0 && (
        <div className="py-14 sm:py-20 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {cms.regionsTitle && <div className="text-center max-w-2xl mx-auto mb-12"><h2 className="text-2xl font-bold text-charcoal">{cms.regionsTitle}</h2></div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {regions.map((r, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-warm/40 border border-gray-200 space-y-2"><Globe2 className="w-5 h-5 text-primary" /><h4 className="font-bold text-sm text-charcoal">{r.title}</h4><p className="text-xs text-gray-600 leading-relaxed">{r.desc}</p></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalPartnerships;
