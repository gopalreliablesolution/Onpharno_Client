import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { Globe2, Shield, ArrowRight, CheckCircle2, FileText, Anchor, Award } from 'lucide-react';

const GlobalPartnerships = () => {
  const regions = [
    { name: 'Southeast Asia (ASEAN)', desc: 'Full compliance with ASEAN Food & Supplement Harmonization guidelines and Halal documentation.' },
    { name: 'Middle East & GCC', desc: 'MoH compliant registrations, Certificate of Free Sale (CFS), and heat-stable Zone IVb packaging.' },
    { name: 'Africa & SADC', desc: 'Affordable, high-potency preventative healthcare and therapeutic vitamin combinations.' },
    { name: 'Europe & CIS', desc: 'Clean-label vegetarian formulations adhering to EFSA allowable botanical levels.' }
  ];

  const services = [
    {
      title: 'Market-Exclusive Distribution',
      desc: 'Secure territory-exclusive commercial rights to distribute ONPHARNO signature Liquid-Filled Hard Capsules and specialty formulas under your brand or our registered labels.'
    },
    {
      title: 'Export Contract Manufacturing',
      desc: 'Formulations customized to match country-specific dietary intake limits, permitted excipients, and language packaging mandates.'
    },
    {
      title: 'Turnkey Dossiers & Registration Support',
      desc: 'We prepare complete Common Technical Documents (CTD), 24-month Zone IVb stability data, GMP certificates, and analytical validation reports for swift Ministry of Health (MoH) clearances.'
    }
  ];

  return (
    <>
      <SEO
        title="Global Healthcare Partnerships & Export Alliances | ONPHARNO"
        description="Building Healthcare Partnerships Beyond Borders. Partner with ONPHARNO for international pharmaceutical and nutraceutical export, contract manufacturing, and market-exclusive distribution."
      />

      {/* Hero */}
      <div className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
              International Healthcare Alliances
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Building Healthcare Partnerships <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">
                Beyond Borders.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">
              Supplying world-class formulations, certified cGMP documentation, and scalable production to healthcare leaders in 10+ countries across four continents.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all"
              >
                Inquire for International Distribution &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* World Map Section with Downloaded Asset */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">Global Footprint</span>
              <h2 className="text-3xl font-bold text-charcoal leading-snug">
                Export-Ready Formulations Engineered for Global Regulatory Clearances
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Navigating international health ministry approvals requires meticulous documentation. ONPHARNO provides brand partners with ready CTD dossier modules, accelerated stability data under climatic Zone IVb, and legalized Certificates of Analysis.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-warm border border-gray-200">
                  <p className="text-2xl font-bold text-primary">10+</p>
                  <p className="text-xs text-gray-600 font-medium mt-0.5">Export Destinations</p>
                </div>
                <div className="p-4 rounded-2xl bg-warm border border-gray-200">
                  <p className="text-2xl font-bold text-primary">100%</p>
                  <p className="text-xs text-gray-600 font-medium mt-0.5">WHO-GMP & ISO Compliance</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-warm/20 p-4">
              <img
                src="/uploads/world-map.png"
                alt="ONPHARNO Global Export Network"
                className="w-full h-auto object-contain rounded-2xl"
                onError={(e) => { e.target.src = '/logo.png'; }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Partnership Models */}
      <div className="py-20 bg-warm/30 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal">Global Partnership Models</h2>
            <p className="text-xs text-gray-500 mt-2">Tailored structures for importers, brand owners, and regional distributors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-primary uppercase">Model 0{idx + 1}</span>
                  <h3 className="text-lg font-bold text-charcoal mt-1">{s.title}</h3>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">{s.desc}</p>
                </div>
                <div className="pt-6 mt-4 border-t border-gray-100">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark"
                  >
                    <span>Discuss Requirements</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Focus */}
      <div className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl font-bold text-charcoal">Key Regional Markets Served</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((reg, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-warm/40 border border-gray-200 space-y-2">
                <Globe2 className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-sm text-charcoal">{reg.name}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{reg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalPartnerships;
