import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import getImageUrl from '../../utils/imageUrl';
import {
  Building2,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Factory,
  Sparkles,
  Thermometer,
  Wind,
  FlaskConical
} from 'lucide-react';

const AboutFacilities = () => {
  const facilityBlocks = [
    {
      title: 'Class 100,000 cGMP Cleanrooms',
      department: 'Manufacturing Plant',
      subtitle: 'ISO 8 Environment with HEPA Filtration',
      desc: 'Controlled air pressure cascades, 20+ air changes per hour, and positive pressure airlocks preventing cross-contamination across active formulation suites.',
      image: '/uploads/facilities/manufacturing-facility.jpg',
      specs: ['Positive Pressure Airlocks', 'HEPA 99.97% Air Filtration', 'Automated Environmental Loggers']
    },
    {
      title: 'Precision Liquid Capsule Sealing Lines',
      department: 'Specialized Technology',
      subtitle: 'Hermetic Banding & Ultrasonic Sealing',
      desc: 'Fully automated liquid encapsulation and gelatin/HPMC sealing machinery designed specifically for non-aqueous oils, suspensions, and dual-phase beadlets.',
      image: '/uploads/facilities/facility-highlights.jpg',
      specs: ['Nitrogen Purging Station', 'Micro-Dosing Liquid Pumps', 'Hermetic Band Sealing Ring']
    },
    {
      title: 'Automated High-Speed Packaging',
      department: 'Packaging & Serialization',
      subtitle: 'Alu-Alu, Blister & HDPE Induction Bottling',
      desc: 'High-speed rotary blister machinery with 100% optical camera inspection, pinhole detection, desiccant insertion, and 2D GS1 serialization for export traceability.',
      image: '/uploads/facilities/packaging-line.jpg',
      specs: ['100% Vision Camera Sorting', 'Induction Cap Sealing', 'GS1 Traceability Serialization']
    },
    {
      title: 'Analytical R&D & Formulation Labs',
      department: 'Formulation & Science',
      subtitle: 'HPLC, Dissolution & Stability Testing',
      desc: 'Equipped with High-Performance Liquid Chromatography (HPLC), FTIR spectroscopy, multi-station dissolution apparatus, and ICH-compliant stability chambers.',
      image: '/uploads/facilities/manufacturing-facility.jpg',
      specs: ['Waters HPLC & GC Systems', 'ICH Stability Chambers (Zone IVb)', 'Rheological Viscosity Testing']
    },
    {
      title: 'Effervescent & Gummy Manufacturing',
      department: 'Specialized Formats',
      subtitle: 'Ultra-Low Humidity (<20% RH) Suites',
      desc: 'Dedicated climate-controlled suites engineered specifically for effervescent tablets and fruit pectin gummies requiring strict moisture exclusion during pressing.',
      image: '/uploads/facilities/facility-highlights.jpg',
      specs: ['Dehumidified Air (<20% RH)', 'Starchless Gummy Depositing', 'Aluminum Moisture-Tight Tubes']
    },
    {
      title: 'GDP Climate-Controlled Warehousing',
      department: 'Supply Chain & Storage',
      subtitle: 'Pharmaceutical Cold & Ambient Zones',
      desc: 'Good Distribution Practice (GDP) compliant warehouse featuring 24/7 temperature mapping, computerized inventory tracking, and dedicated raw material quarantine.',
      image: '/uploads/facilities/packaging-line.jpg',
      specs: ['24/7 Digital Temperature Mapping', 'Raw Material Quarantine Zones', 'Secure Export Staging Area']
    }
  ];

  return (
    <>
      <SEO
        title="Manufacturing Facilities & Labs | ONPHARNO"
        description="See Where Products Become Real. Explore ONPHARNO's cGMP cleanrooms, automated liquid capsule filling lines, and advanced analytical testing laboratories."
      />

      {/* Hero */}
      <div className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
              Infrastructure & Automation
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              See Where Products <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">
                Become Real.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">
              Engineered from the ground up for strict regulatory compliance, high-volume batch consistency, and novel dosage form manufacturing—including state-of-the-art liquid-filled hard capsule containment.
            </p>
          </div>
        </div>
      </div>

      {/* Facilities Overview Cards */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">cGMP Infrastructure</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">Engineered for Pharmaceutical Precision</h2>
            <p className="text-xs text-gray-500 mt-2">Every square meter of our manufacturing campus is monitored for temperature, humidity, and particle count.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilityBlocks.map((block, idx) => (
              <div key={idx} className="bg-warm/30 rounded-3xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group">
                <div>
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    <img
                      src={getImageUrl(block.image)}
                      alt={block.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = '/uploads/facilities/manufacturing-facility.jpg'; }}
                    />
                    <span className="absolute top-3 left-3 bg-navy/90 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      {block.department}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-semibold text-primary block mb-1">{block.subtitle}</span>
                    <h3 className="text-lg font-bold text-charcoal">{block.title}</h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{block.desc}</p>

                    <div className="mt-4 pt-4 border-t border-gray-200/60 space-y-1.5">
                      {block.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-[11px] text-gray-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark"
                  >
                    <span>Inquire About Facility Capacity</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Feature: Liquid-Filled Hard Capsules Cleanroom Suite */}
      <div className="py-20 bg-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-light font-bold text-xs uppercase tracking-widest block mb-2">
                Specialized Cleanroom Highlight
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                Dedicated Liquid-Filled Hard Capsule Suites
              </h2>
              <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed font-light">
                Manufacturing liquid capsules requires extraordinary environmental and technological discipline. Our dedicated cleanroom suites feature closed-loop micro-pumping, oxygen displacement through ultra-pure nitrogen purging, and high-precision gelatin/HPMC sealing rings that ensure zero leakage and superior oxidation resistance.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <Wind className="w-5 h-5 text-primary-light mb-2" />
                  <p className="text-xl font-bold text-white">99.99%</p>
                  <p className="text-xs text-gray-400 mt-0.5">Nitrogen headspace purity</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <Thermometer className="w-5 h-5 text-primary-light mb-2" />
                  <p className="text-xl font-bold text-white">±0.5°C</p>
                  <p className="text-xs text-gray-400 mt-0.5">Sealing temperature accuracy</p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/products/liquid-filled-hard-capsules"
                  className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-dark transition-colors"
                >
                  <span>Explore Liquid-Filled Technology</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/uploads/facilities/facility-highlights.jpg"
                alt="Liquid Capsule Sealing Line"
                className="w-full h-[400px] object-cover"
                onError={(e) => { e.target.src = '/uploads/hero-bottles.png'; }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Audit Tour CTA */}
      <div className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-charcoal">Schedule a Technical or Regulatory Facility Audit</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            We welcome technical audits from pharmaceutical brand partners, international regulatory inspectors, and quality assurance delegations.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-dark transition-all"
            >
              Request Audit Appointment &rarr;
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%20ONPHARNO%2C%20we%20would%20like%20to%20schedule%20a%20facility%20inspection."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-warm text-charcoal border border-gray-200 text-xs font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Direct WhatsApp Inquiries
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutFacilities;
