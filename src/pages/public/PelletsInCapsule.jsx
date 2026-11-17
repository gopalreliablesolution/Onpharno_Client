import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import {
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Activity,
  Workflow
} from 'lucide-react';

const PelletsInCapsule = () => {
  const flow = [
    {
      num: '01',
      title: 'Pellet Development',
      subtitle: 'Extrusion & Spheronization',
      desc: 'Active pharmaceutical ingredients (APIs) and nutraceuticals are transformed into uniform, highly spherical micro-pellets (500–1200 µm) with smooth surface morphology.'
    },
    {
      num: '02',
      title: 'Evaluation & Coating',
      subtitle: 'Functional Polymeric Film Coating',
      desc: 'Fluid-bed Wurster coating applies enteric, sustained-release, or moisture-barrier polymers to achieve targeted dissolution release rates.'
    },
    {
      num: '03',
      title: 'Capsule Filling',
      subtitle: 'Multi-Station Precision Dosing',
      desc: 'Specialized capsule filling machines dose one, two, or three distinct pellet populations—or pellets suspended in oil—into transparent hard capsules without crushing.'
    },
    {
      num: '04',
      title: 'Finished Capsule',
      subtitle: 'Hermetic Sealing & Optical Inspection',
      desc: 'The capsule is sealed with a leak-proof band, checked by 100% vision cameras for fill accuracy, and released with comprehensive dissolution profiles.'
    }
  ];

  const benefits = [
    {
      title: 'Minimized Gastric Irritation',
      desc: 'Instead of dumping a high concentration of active compound in one spot (like a single large tablet), multi-particulate pellets disperse widely across the stomach and intestine, minimizing mucosa irritation.'
    },
    {
      title: 'Predictable Pharmacokinetics',
      desc: 'Micro-pellets empty from the stomach into the duodenum gradually and consistently, independent of fed or fasted states, ensuring reproducible therapeutic blood plasma concentrations.'
    },
    {
      title: 'Programmed Multi-Stage Release',
      desc: 'Blend immediate-release pellets for fast onset with enteric-coated and extended-release pellets in the same capsule for 12-hour or 24-hour therapeutic coverage.'
    },
    {
      title: 'Multi-Active Chemical Incompatibility Shield',
      desc: 'Incompatible actives can be layered into separate micro-pellets with distinct barrier films and co-filled into one convenient daily dose without cross-reaction.'
    }
  ];

  return (
    <>
      <SEO
        title="Pellets-in-Capsule Technology | ONPHARNO"
        description="Multiple Pellets. One Precisely Designed Capsule. Explore customized release profile formulations, enteric coatings, and multi-particulate contract manufacturing."
      />

      {/* Hero */}
      <div className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
              Multi-Particulate Precision
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Multiple Pellets. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-amber-200">
                One Precisely Designed Capsule.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">
              Engineer complex release kinetics, combine chemically incompatible actives, and eliminate gastric irritation with uniform spherical micro-pellets packaged in crystal-clear hard capsules.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all"
              >
                Discuss Pelletization Feasibility &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Development Flow: 4 Stages */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Engineering Workflow</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">From Powder to Multi-Particulate Capsule</h2>
            <p className="text-xs text-gray-500 mt-2">A four-stage manufacturing protocol engineered for particle uniformity and targeted release.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flow.map((s, idx) => (
              <div key={idx} className="bg-warm/30 p-6 rounded-3xl border border-gray-200 space-y-3 relative group hover:border-primary transition-colors">
                <span className="text-3xl font-bold text-primary/30 font-mono block">{s.num}</span>
                <span className="text-[11px] font-semibold text-primary block">{s.subtitle}</span>
                <h3 className="text-base font-bold text-charcoal">{s.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Core Benefits */}
      <div className="py-20 bg-warm/30 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Clinical & Formulation Value</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">4 Distinct Advantages of Pellets-in-Capsule</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-charcoal">{b.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison: Pellets vs Conventional Capsule */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-charcoal">Pellets-in-Capsule vs. Conventional Powder Capsule</h2>
            <p className="text-xs text-gray-500 mt-2">Why modern pharmaceutical brands are shifting towards multi-particulate delivery.</p>
          </div>

          <div className="overflow-x-auto bg-white rounded-3xl border border-gray-200 shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-warm/80 border-b border-gray-200 uppercase tracking-wider text-[11px] font-bold text-charcoal">
                <tr>
                  <th className="p-4 sm:p-5">Feature</th>
                  <th className="p-4 sm:p-5 text-primary bg-primary/5">Pellets-in-Capsule</th>
                  <th className="p-4 sm:p-5 text-gray-500">Conventional Powder Capsule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-charcoal">GI Tract Distribution</td>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal bg-primary/5">Disperses evenly across GI tract surface</td>
                  <td className="p-4 sm:p-5 text-gray-600">Disintegrates into a single dense powder plug</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-charcoal">Release Rate Control</td>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal bg-primary/5">Customizable: Immediate, Sustained, Enteric, Pulsatile</td>
                  <td className="p-4 sm:p-5 text-gray-600">Primarily immediate release (uncontrolled dissolution)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-charcoal">Risk of Dose Dumping</td>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal bg-primary/5">Virtually eliminated across thousands of micro-pellets</td>
                  <td className="p-4 sm:p-5 text-gray-600">Higher risk if modified-release tablet matrix fails</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-charcoal">Food Effect Variability</td>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal bg-primary/5">Minimal variation between fed and fasted states</td>
                  <td className="p-4 sm:p-5 text-gray-600">Significantly delayed gastric transit with meals</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-charcoal">Visual Presentation</td>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal bg-primary/5">Colorful, spherical multi-particulates inside clear shell</td>
                  <td className="p-4 sm:p-5 text-gray-600">Standard opaque powder filling</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="py-20 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Sparkles className="w-10 h-10 text-primary-light mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-bold">
            Exploring a Pellets-in-Capsule or Capsule-in-Capsule Product?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-3 max-w-xl mx-auto leading-relaxed font-light">
            Let's evaluate the feasibility together. Our pilot formulation facility can manufacture trial batches for dissolution characterization and stability profiling.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-primary text-white text-xs font-bold px-8 py-3.5 rounded-xl shadow-lg hover:bg-primary-dark transition-all"
            >
              Start Formulation Evaluation &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PelletsInCapsule;
