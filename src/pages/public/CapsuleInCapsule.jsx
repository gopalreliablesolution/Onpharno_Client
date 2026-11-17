import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import {
  Layers,
  ArrowRight,
  Sparkles,
  Shield,
  CheckCircle2,
  Clock,
  Split,
  Box,
  Eye
} from 'lucide-react';

const CapsuleInCapsule = () => {
  const whyConsider = [
    {
      title: 'Incompatible Actives in One Unit',
      desc: 'Separate moisture-sensitive probiotics from liquid Omega-3 oils, or vitamins that chemically degrade when premixed in powder form.'
    },
    {
      title: 'Dual-Release Pharmacokinetics',
      desc: 'Deliver immediate-release actives in the outer liquid phase (e.g. quick-acting melatonin) followed by targeted delayed release of the inner core.'
    },
    {
      title: 'Dramatic Consumer Visual Impact',
      desc: 'A floating micro-capsule suspended inside a crystal-clear liquid capsule communicates advanced scientific engineering instantly on shelf.'
    },
    {
      title: 'Patent & Formulation Differentiation',
      desc: 'Establish exclusive proprietary barrier combinations that competitors cannot replicate with standard tablet compression machinery.'
    }
  ];

  const applications = [
    { name: 'Probiotics + Omega-3', detail: 'Live probiotic strains protected inside the dry inner capsule, submerged in pristine fish or algae oil in the outer shell.' },
    { name: 'Day / Night Biphasic Energy', detail: 'Immediate-release caffeine in the outer layer, sustained slow-release B-complex and botanical adaptogens inside.' },
    { name: 'Iron + Vitamin C Synergy', detail: 'Ascorbic acid in outer liquid phase enhances bioavailability while the chelated iron is released deep in the duodenum.' },
    { name: 'Prebiotic + Probiotic Dual Phase', detail: 'Liquid soluble prebiotic fiber surrounding spore-forming probiotic bacteria.' }
  ];

  return (
    <>
      <SEO
        title="Capsule-in-Capsule Technology | ONPHARNO"
        description="Two Capsule Components. One Product Concept. Explore ONPHARNO's dual-phase capsule-in-capsule technology for separating incompatible actives and dual-release pharmacokinetics."
      />

      {/* Hero */}
      <div className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
              Dual-Phase Bio-Engineering
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Two Capsule Components. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-amber-200">
                One Single Intelligent Product Concept.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">
              Deliver physically or chemically incompatible ingredients, dual-stage release kinetics (immediate + enteric), or liquid + dry active combinations in an unmistakable luxury dosage form.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all"
              >
                Evaluate Concept Feasibility &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Exploded Concept Graphic */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Dosage Architecture</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">Anatomy of Capsule-in-Capsule</h2>
            <p className="text-xs text-gray-500 mt-2">Physical separation of phases within a single ingestible oral delivery system.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-warm/40 p-8 rounded-3xl border border-gray-200 space-y-3 relative">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">Component 01</span>
              <h3 className="text-xl font-bold text-charcoal">Inner Capsule</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                A smaller miniature hard capsule (Size 3 or 4) housing moisture-sensitive powders, live cultures, or enteric-coated pellets.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 text-[11px] text-gray-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Targeted delayed or enteric dissolution</span>
              </div>
            </div>

            <div className="bg-warm/40 p-8 rounded-3xl border border-gray-200 space-y-3 relative">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">Component 02</span>
              <h3 className="text-xl font-bold text-charcoal">Outer Liquid Matrix</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                A larger outer capsule (Size 00 or 0) carrying solubilized lipid actives, oils, or fast-acting botanical extracts surrounding the inner core.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 text-[11px] text-gray-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Immediate gastric release phase</span>
              </div>
            </div>

            <div className="bg-navy text-white p-8 rounded-3xl border border-gray-800 space-y-3 relative shadow-xl">
              <span className="text-xs font-bold text-primary-light uppercase tracking-wider block">Finished Delivery</span>
              <h3 className="text-xl font-bold text-white">Banded Finished Product</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Precision-sealed with a hermetic polymer band. The visual juxtaposition of floating inner components creates unmatched retail presence.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-primary-light flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>High-margin retail differentiation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Why Consider Items */}
      <div className="py-20 bg-warm/30 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Why Consider This Format</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">Formulation & Commercial Benefits</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyConsider.map((w, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-3">
                <span className="text-xs font-bold text-primary uppercase">Advantage 0{idx + 1}</span>
                <h3 className="text-lg font-bold text-charcoal">{w.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clinical Application Candidates */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal">Ideal Product Concepts</h2>
            <p className="text-xs text-gray-500 mt-2">Combinations engineered specifically for Capsule-in-Capsule delivery.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {applications.map((app, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-warm/40 border border-gray-200 space-y-2">
                <h4 className="font-bold text-sm text-charcoal">{app.name}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{app.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-navy text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold">Have a Dual-Phase Concept in Mind?</h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-lg mx-auto">
              Our formulation scientists will conduct a complimentary molecular compatibility review under mutual NDA.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-dark transition-all"
              >
                <span>Request Feasibility Study &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CapsuleInCapsule;
