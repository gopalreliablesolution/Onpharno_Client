import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { Package, ShieldCheck, FileText, CheckCircle2, ArrowRight, Layers, Box, Barcode } from 'lucide-react';

const PackagingDoc = () => {
  const packagingOptions = [
    {
      title: 'Blister Packaging (Alu-Alu & PVDC)',
      desc: 'Cold-form aluminum (Alu-Alu) offering 100% moisture and oxygen impermeability, ideal for hygroscopic formulations and tropical export zones.'
    },
    {
      title: 'Bottling & Induction Sealing',
      desc: 'Automated HDPE, PET, and amber glass bottling lines featuring cotton/desiccant insertion, induction foil sealing, child-resistant (CRC) caps, and tamper-evident shrink bands.'
    },
    {
      title: 'Single-Serve Stick Packs & Sachets',
      desc: 'Nitrogen-flushed multi-layer barrier foil sachets for effervescent drink powders, botanical mixes, and oral shots.'
    },
    {
      title: 'Custom Outer Cartons & Serialization',
      desc: 'Full-color CMYK carton printing, spot UV, gold foil stamping, braille embossing, and 2D GS1 DataMatrix serialization.'
    }
  ];

  const dossiers = [
    {
      title: 'Common Technical Document (CTD / ACTD)',
      desc: 'Module 1 through Module 3 technical dossiers ready for Ministry of Health drug or food supplement registration filings.'
    },
    {
      title: 'Accelerated & Real-Time Stability Studies',
      desc: 'ICH Zone IVb stability testing (40°C / 75% RH) documenting active assay retention, degradation products, and physical parameters.'
    },
    {
      title: 'Comprehensive Batch Records & COA',
      desc: 'Complete Batch Manufacturing Records (BMR), validated analytical test methods, and Certificate of Analysis (COA) for every batch release.'
    },
    {
      title: 'Certificates of Free Sale (CFS) & GMP',
      desc: 'Apostilled or embassy-legalized regulatory documentation for seamless customs clearance across export destinations.'
    }
  ];

  return (
    <>
      <SEO
        title="Packaging Options & Regulatory Dossiers | ONPHARNO"
        description="Turnkey primary & secondary pharmaceutical packaging solutions alongside global regulatory CTD dossier support and batch traceability."
      />

      <div className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
              Turnkey Commercial Readiness
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Packaging & Documentation
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">
              From shelf-differentiating barrier packaging to fully compiled international CTD regulatory registration dossiers.
            </p>
          </div>
        </div>
      </div>

      {/* Packaging Showcase Image */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">Primary & Secondary Packaging</span>
              <h2 className="text-3xl font-bold text-charcoal leading-snug">
                Advanced Barrier Protection That Preserves Active Potency
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Even the most potent formulation fails if packaging allows oxygen or moisture intrusion. Our packaging cleanrooms feature high-speed rotary blister machinery with pinhole leak detection and computerized vision inspection.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {packagingOptions.map((opt, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-warm border border-gray-200 space-y-1">
                    <h4 className="font-bold text-xs text-charcoal">{opt.title}</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-2xl">
              <img
                src="/images/packaging-line.jpg"
                alt="Automated Packaging Lines"
                className="w-full h-[450px] object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Regulatory Dossiers Section */}
      <div className="py-20 bg-warm/30 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Regulatory Dossiers</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">Global Compliance & Audit Documentation</h2>
            <p className="text-xs text-gray-500 mt-2">Comprehensive documentation designed for international health ministry submissions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dossiers.map((d, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
                <FileText className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-bold text-sm text-charcoal">{d.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-8 py-3.5 rounded-xl shadow hover:bg-primary-dark transition-all"
            >
              <span>Let's Build the Complete Product &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackagingDoc;
