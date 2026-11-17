import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import CapsuleAnimation from '../../components/home/CapsuleAnimation';
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Layers,
  Sparkles,
  Shield,
  Factory,
  Beaker,
  Eye,
  TrendingUp,
  MessageCircle
} from 'lucide-react';

const LiquidFilledCapsules = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const pillars = [
    { title: 'Formulation', desc: 'Superior bioavailability for lipid-soluble actives, carotenoids, botanicals, and oily vitamins.' },
    { title: 'Format', desc: 'Distinctive two-piece hard capsule sealed with a hermetic colored band that prevents oxygen ingress.' },
    { title: 'Differentiation', desc: 'Instant visual shelf appeal that commands premium price points over generic chalky tablets.' },
    { title: 'Development', desc: 'Seamless technical transfer from laboratory micro-scale batches to automated commercial scale.' }
  ];

  const devFlow = [
    { step: '01', title: 'Product Brief', desc: 'Establish active molecule targets, dosage strength, label claims, and packaging vision.' },
    { step: '02', title: 'Formulation', desc: 'Lipid carrier selection, excipient compatibility testing, and solubility optimization.' },
    { step: '03', title: 'Compatibility', desc: 'Evaluating chemical stability between the liquid matrix and gelatin or vegetarian HPMC shells.' },
    { step: '04', title: 'Development', desc: 'Pilot filling trials, band sealing parameter validation, and leak rate stress testing.' },
    { step: '05', title: 'Manufacturing', desc: 'Automated cGMP nitrogen-purged encapsulation with continuous weight control.' },
    { step: '06', title: 'Quality Release', desc: 'Dissolution profiling, active assay release by HPLC, and stability verification.' }
  ];

  const possibilities = [
    {
      title: 'Liquid Fill Solutions',
      desc: 'Crystal-clear oily active solutions such as Omega-3 DHA/EPA, Vitamin D3, CoQ10, Krill oil, and Astaxanthin in lipid carriers.'
    },
    {
      title: 'Semi-Liquid & Viscous Pastes',
      desc: 'Thixotropic formulations and herbal botanical pastes that remain liquid under pump shear and set inside the capsule.'
    },
    {
      title: 'Liquid Suspensions',
      desc: 'Uniform micronized active particles suspended stably in a non-aqueous liquid matrix without phase separation.'
    },
    {
      title: 'Specialized Combinations',
      desc: 'Multi-phase innovations such as Pellets suspended in Liquid, or an inner micro-capsule floating inside an outer liquid capsule.'
    }
  ];

  const opportunities = [
    { title: 'Faster Onset & Bioavailability', desc: 'Actives are already solubilized, eliminating tablet disintegration lag and enhancing uptake.' },
    { title: 'Protection Against Oxidation', desc: 'Nitrogen purging and hermetic banding seal out atmospheric oxygen and moisture.' },
    { title: 'Odor & Taste Masking', desc: 'Completely seals pungent fish oils, garlic extracts, or bitter botanicals without burp-back.' },
    { title: 'Clean Label Vegetarian Options', desc: 'Manufactured with 100% plant-derived HPMC shells, free from porcine or bovine collagen.' },
    { title: 'Reduced Excipient Load', desc: 'Eliminates the binders, lubricants, and high compression forces required for tablets.' },
    { title: 'High Consumer Perceived Value', desc: 'Transparent liquid packshots create immediate consumer trust and perceived clinical sophistication.' }
  ];

  const whyOnpharno = [
    { title: 'Formulation R&D', desc: 'Specialized in lipid excipients (MCT, sunflower lecithin, specialized oils) that protect active stability.' },
    { title: 'Banding Technology', desc: 'State-of-the-art ultrasonic and liquid polymer banding that eliminates micro-leakage.' },
    { title: 'Nitrogen Flushing', desc: 'Automated headspace displacement with ultra-pure nitrogen preventing lipid rancidity.' },
    { title: 'Flexible MOQs', desc: 'Pilot runs from 50,000 capsules up to commercial multi-million capsule production batches.' },
    { title: 'Turnkey Packaging', desc: 'High-barrier blister packs, amber glass, and induction-sealed HDPE bottles.' },
    { title: 'Regulatory Dossiers', desc: 'Full Certificate of Analysis, stability data, and technical support for domestic and export filings.' }
  ];

  const applicationCategories = [
    'Daily Wellness & Multivitamins',
    'Men\'s Vitality & Prostate Care',
    'Women\'s Hormonal & Prenatal Health',
    'Beauty & Dermal Radiance',
    'Healthy Ageing & Longevity (CoQ10/NMN)',
    'Sports Nutrition & Muscle Recovery',
    'Specialized Cardio & Neuro Formulations'
  ];

  const faqs = [
    {
      q: 'What are Liquid-Filled Hard Capsules?',
      a: 'They are two-piece hard gelatin or vegetarian (HPMC) capsules filled with non-aqueous liquids, semi-solids, or suspensions, hermetically sealed with a protective band to prevent leaks, oxygen intrusion, and tampering.'
    },
    {
      q: 'Are they the same as traditional softgels?',
      a: 'No. Liquid-filled hard capsules use thinner, cleaner shell walls with significantly less plasticizer (such as glycerin), superior moisture and oxygen resistance, and true 100% vegetarian plant-based shell options without animal collagen.'
    },
    {
      q: 'Can any liquid ingredient be filled?',
      a: 'Non-aqueous liquids, plant oils, medium-chain triglycerides (MCT), lipid-based self-emulsifying drug delivery systems (SEDDS), and non-polar suspensions are ideal. Formulations with high free water content are evaluated individually to prevent shell dissolution.'
    },
    {
      q: 'Can we bring our own formulation concept?',
      a: 'Yes. Our formulation laboratory can execute a seamless technical transfer of your existing recipe, or optimize its solubility, bioavailability, and viscosity for automated liquid filling.'
    },
    {
      q: 'Can ONPHARNO develop a bespoke formulation from scratch?',
      a: 'Absolutely. We formulate custom active combinations based on your target health indication, target cost of goods, and desired label claims under a mutual Non-Disclosure Agreement (NDA).'
    },
    {
      q: 'Do you offer ready-to-launch private label products in this format?',
      a: 'Yes. We maintain pre-formulated, stability-tested formulations such as CoQ10 + Omega-3, Astaxanthin + Vitamin E, and Curcumin + Piperine in liquid capsules ready for your brand labelling.'
    },
    {
      q: 'What customization options are available for branding?',
      a: 'You can customize capsule shell transparency (clear, translucent, or opaque), shell color combinations (body and cap can be different colors), and the color of the hermetic sealing band.'
    }
  ];

  return (
    <>
      <SEO
        title="Liquid-Filled Hard Capsules Technology | ONPHARNO"
        description="Beyond the Conventional Capsule. Explore ONPHARNO's signature liquid-filled hard capsule technology for superior bioavailability, product differentiation, and private label manufacturing."
      />

      {/* Hero */}
      <div className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
                Signature Dosage Format
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                Beyond the Conventional Capsule. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-amber-200">
                  Explore a More Distinctive Product Format.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">
                Formulation &bull; Format &bull; Product Differentiation &bull; Development. Deliver lipid-soluble actives with enhanced bioavailability, hermetic band sealing, and undeniable shelf elegance.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all"
                >
                  Discuss Your Product Concept &rarr;
                </Link>
                <a
                  href="#comparison"
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-colors border border-white/10"
                >
                  Compare vs Softgels
                </a>
              </div>
            </div>

            {/* Interactive SVG Animation */}
            <div className="bg-navy-950/80 p-6 rounded-3xl border border-white/10 shadow-2xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary-light block mb-2 text-center">
                Interactive Dosage-Form Anatomy
              </span>
              <CapsuleAnimation />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="py-16 bg-warm/50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                <span className="text-primary font-bold text-xs uppercase tracking-wider block">Pillar 0{idx + 1}</span>
                <h3 className="text-base font-bold text-charcoal">{p.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Development Flow: 6 Steps */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Technical Pathway</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">From Product Concept to Sealed Capsule</h2>
            <p className="text-xs text-gray-500 mt-2">A rigorous six-stage development process ensuring zero leakage and validated chemical stability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devFlow.map((f, idx) => (
              <div key={idx} className="bg-warm/30 p-6 rounded-2xl border border-gray-200 relative group hover:border-primary transition-colors">
                <span className="text-2xl font-bold text-primary/30 font-mono block mb-2">{f.step}</span>
                <h3 className="font-bold text-base text-charcoal">{f.title}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* One Capsule. Multiple Possibilities. */}
      <div className="py-20 bg-navy text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-light font-bold text-xs uppercase tracking-widest">Formulation Flexibility</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-1">One Capsule. Multiple Possibilities.</h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 font-light">
              Engineered to carry diverse rheological matrices that cannot be compressed into dry tablets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {possibilities.map((pos, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary-light flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white">{pos.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">{pos.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-gray-400 mt-8 italic">
            * Feasibility note: Formulation compatibility with shell polymer and carrier viscosity is verified in our pilot laboratory prior to commercial scaling.
          </p>
        </div>
      </div>

      {/* A Different Format Creates a Different Opportunity (6 items) */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Commercial Advantage</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">A Different Format Creates a Different Opportunity</h2>
            <p className="text-xs text-gray-500 mt-2">Why forward-thinking healthcare brands are replacing old softgels with liquid-filled hard capsules.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((opp, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-warm/40 border border-gray-200 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <h3 className="font-bold text-sm text-charcoal">{opp.title}</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-7">{opp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table: Liquid-Filled Hard Capsules vs Softgels */}
      <div id="comparison" className="py-20 bg-warm/30 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Head-to-Head Comparison</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">Liquid-Filled Hard Capsules vs. Softgels</h2>
            <p className="text-xs text-gray-500 mt-2">An objective technical comparison of formulation characteristics and consumer perception.</p>
          </div>

          <div className="overflow-x-auto bg-white rounded-3xl border border-gray-200 shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-warm/80 border-b border-gray-200 text-charcoal uppercase tracking-wider text-[11px] font-bold">
                <tr>
                  <th className="p-4 sm:p-5">Parameter</th>
                  <th className="p-4 sm:p-5 text-primary bg-primary/5">Liquid-Filled Hard Capsule</th>
                  <th className="p-4 sm:p-5 text-gray-500">Traditional Softgel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-charcoal">Shell Polymer System</td>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal bg-primary/5">Gelatin or 100% Plant HPMC (Vegetarian)</td>
                  <td className="p-4 sm:p-5 text-gray-600">Primarily animal collagen gelatin + high plasticizers</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-charcoal">Plasticizer Content</td>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal bg-primary/5">Very Low / None (Rigid shell, non-sticky)</td>
                  <td className="p-4 sm:p-5 text-gray-600">High (20–30% Glycerol/Sorbitol), prone to sticking in heat</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-charcoal">Oxygen & Moisture Barrier</td>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal bg-primary/5">Superior barrier; hermetic band locks out oxygen</td>
                  <td className="p-4 sm:p-5 text-gray-600">Moderate; higher water migration into active lipid core</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-charcoal">Visual Presentation</td>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal bg-primary/5">Luxury clear transparency with signature color band</td>
                  <td className="p-4 sm:p-5 text-gray-600">Generic oval or oblong shape, common commodity look</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-charcoal">Combination Formats</td>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal bg-primary/5">Highly versatile: Pellets in Liquid, Capsule-in-Capsule</td>
                  <td className="p-4 sm:p-5 text-gray-600">Limited combination capability</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-charcoal">Manufacturing Approach</td>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal bg-primary/5">Two-piece precision filling + ultrasonic sealing band</td>
                  <td className="p-4 sm:p-5 text-gray-600">Rotary die encapsulation with high drying tumbler cycle</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-charcoal">Market Positioning</td>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal bg-primary/5">Premium prestige B2B & clean-label retail</td>
                  <td className="p-4 sm:p-5 text-gray-600">Standard mass retail dietary supplements</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center max-w-xl mx-auto">
            <h4 className="font-bold text-base text-charcoal">"So Which Is Better? Neither."</h4>
            <p className="text-xs text-gray-600 mt-1">
              The right format depends entirely on the active formulation, stability requirements, consumer demographic, and your brand's price positioning.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mt-3 hover:text-primary-dark"
            >
              <span>Talk to ONPHARNO's Product Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Why ONPHARNO (6 items) */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Why Partner With Us</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">Why ONPHARNO for Liquid Capsules?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyOnpharno.map((w, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-warm/30 border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-primary uppercase">0{idx + 1}</span>
                <h3 className="font-bold text-base text-charcoal">{w.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target Applications Grid */}
      <div className="py-16 bg-warm/50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-charcoal">Proven Therapeutic Applications</h2>
            <p className="text-xs text-gray-500 mt-1">Formats ready for formulation in liquid-filled hard capsules.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {applicationCategories.map((cat, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-white border border-gray-200 text-charcoal shadow-sm"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-dark transition-all"
            >
              <span>DISCUSS YOUR PRODUCT &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Accordion (7 Q&As) */}
      <div className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Common Questions</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-warm/20"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-charcoal hover:bg-warm/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-primary transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LiquidFilledCapsules;
