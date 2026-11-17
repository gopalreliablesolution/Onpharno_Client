import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  FlaskConical,
  Activity,
  Layers,
  ArrowRight,
  ClipboardList
} from 'lucide-react';

const AboutQuality = () => {
  const steps = [
    {
      num: '01',
      title: 'Raw Material Evaluation',
      subtitle: 'Vendor Qualification & Pre-Batch Testing',
      desc: 'Every active pharmaceutical ingredient (API), botanical extract, and excipient undergoes complete quarantine testing, heavy metal screening, pesticide analysis, and chemical assay before entering production.'
    },
    {
      num: '02',
      title: 'Controlled Development',
      subtitle: 'Compatibility & Accelerated Stress Studies',
      desc: 'Formulation prototypes are subjected to accelerated degradation and compatibility testing under ICH Zone IVb conditions (40°C / 75% RH) to verify active ingredient potency and physical stability.'
    },
    {
      num: '03',
      title: 'Manufacturing Controls',
      subtitle: 'cGMP Cleanrooms & Environmental Mapping',
      desc: 'Automated HEPA filtration, differential pressure cascades, real-time particle monitoring, and validated clean-in-place (CIP) protocols guarantee strict containment across every manufacturing batch.'
    },
    {
      num: '04',
      title: 'In-Process Checks (IPC)',
      subtitle: 'Continuous Batch Verification',
      desc: 'Ongoing sampling at defined intervals: capsule fill weight variation, hermetic band sealing integrity, dissolution onset, disintegration speed, and moisture content verification.'
    },
    {
      num: '05',
      title: 'Finished Product Evaluation',
      subtitle: 'Multi-Point Assay & Microbiological Clearance',
      desc: 'Finished units are tested for active assay quantification (HPLC), uniformity of dosage units, heavy metals (ICP-MS), total microbial count, yeast/mold, and absence of pathogens.'
    },
    {
      num: '06',
      title: 'Documentation & Traceability',
      subtitle: 'Complete Batch Manufacturing Records (BMR)',
      desc: 'Each release includes an audited Certificate of Analysis (COA), full BMR batch genealogies, raw material lot cross-referencing, and export documentation ready for global regulatory filing.'
    }
  ];

  const standards = [
    { name: 'WHO-GMP Compliant', desc: 'World Health Organization Good Manufacturing Practices audited facilities.' },
    { name: 'ISO 22000 & 9001:2015', desc: 'Certified Food Safety Management and Quality Management Systems.' },
    { name: 'FSSAI Licensed', desc: 'Compliant with apex Indian food safety regulations and testing criteria.' },
    { name: 'HACCP Audited', desc: 'Hazard Analysis Critical Control Point preventive controls across all lines.' }
  ];

  return (
    <>
      <SEO
        title="Quality & Compliance Standards | ONPHARNO"
        description="Quality Is Built Into Every Stage. Which Builds Trust. Explore ONPHARNO's 6-step cGMP quality process and analytical testing standards."
      />

      {/* Hero */}
      <div className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
              Quality Assurance & Control
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Quality Is Built Into Every Stage. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">
                Which Builds Trust.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">
              Quality is not an afterthought or an inspection badge at the end of a line. At ONPHARNO, quality is our operating system—embedded into raw material selection, machine engineering, and finished product release.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Steps Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Our 6-Step Assurance Protocol</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">End-to-End Quality Validation</h2>
            <p className="text-xs text-gray-500 mt-2">How we guarantee batch-to-batch consistency and regulatory compliance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-warm/30 p-8 rounded-3xl border border-gray-200 relative group hover:border-primary/50 transition-all flex flex-col justify-between">
                <div>
                  <span className="text-3xl font-bold text-primary/30 font-mono block mb-3">{step.num}</span>
                  <span className="text-xs font-semibold text-primary block mb-1">{step.subtitle}</span>
                  <h3 className="text-lg font-bold text-charcoal">{step.title}</h3>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Audited Standard</span>
                </div>
              </div>
            ))}
          </div>

          {/* Closing Statement Callout */}
          <div className="mt-16 bg-navy text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto border border-gray-800 shadow-xl">
            <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-bold">"Quality Is Not a Badge. It Is a Process."</h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-3 max-w-xl mx-auto leading-relaxed font-light">
              We provide partners with complete audit transparency, allowing full technical visits, document inspections, and third-party lab cross-validations.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                to="/resources/certifications"
                className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-dark transition-all"
              >
                <span>View All Certifications & Accreditations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Standards Teaser */}
      <div className="py-16 bg-warm/40 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standards.map((std, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                <FileCheck className="w-6 h-6 text-primary" />
                <h4 className="font-bold text-sm text-charcoal">{std.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutQuality;
