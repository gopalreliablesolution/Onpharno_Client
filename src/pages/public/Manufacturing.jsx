import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import getImageUrl from '../../utils/imageUrl';
import { Factory, ShieldCheck, Cpu, ArrowRight, CheckCircle2, Zap, BarChart3, Layers } from 'lucide-react';

const Manufacturing = () => {
  const capabilities = [
    {
      title: 'Automated Liquid & Hard Encapsulation',
      metric: '500,000+ Caps / Day',
      desc: 'High-speed automated encapsulation lines with positive nitrogen displacement, micro-pumping, and hermetic band sealing.'
    },
    {
      title: 'High-Speed Rotary Tablet Pressing',
      metric: '1,500,000+ Tabs / Day',
      desc: 'Multi-station rotary compression presses with automated weight monitoring, force feeders, and automated film coating pans.'
    },
    {
      title: 'Pectin Gummy Depositing Lines',
      metric: '250,000+ Jars / Month',
      desc: 'Starchless depositor kitchens with continuous temperature-controlled cooking, precision active blending, and automated cooling tunnels.'
    },
    {
      title: 'Effervescent & Sachet Packaging',
      metric: '100,000+ Tubes / Month',
      desc: 'Specialized low-humidity suites (<20% RH) ensuring zero moisture uptake during pressing and desiccant tube packaging.'
    }
  ];

  return (
    <>
      <SEO
        title="Manufacturing Excellence & Production Capacity | ONPHARNO"
        description="High-throughput cGMP pharmaceutical and nutraceutical contract manufacturing facility with automated encapsulation, tableting, gummy depositing, and blister packaging."
      />

      <div className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
              cGMP Automated Production
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Manufacturing Excellence
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">
              Engineered for high throughput, micro-gram active dosing precision, and international regulatory audit readiness.
            </p>
          </div>
        </div>
      </div>

      {/* Production Facilities Image & Overview */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">Cleanroom Precision</span>
              <h2 className="text-3xl font-bold text-charcoal leading-snug">
                State-of-the-Art Pharmaceutical & Nutraceutical Processing Suites
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our plant is divided into independent, pressure-differenced cleanroom suites to prevent cross-contamination between APIs, herbal botanicals, and oily active ingredients. Controlled HVAC systems monitor temperature, humidity, and airborne particle counts around the clock.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>ISO Class 8 / Class 100,000 cleanrooms with validated CIP systems</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>100% optical camera sorting and automatic weight rejectors on all lines</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Continuous batch manufacturing records (BMR) with electronic audit trails</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-2xl">
              <img
                src="/uploads/facilities/manufacturing-facility.jpg"
                alt="ONPHARNO Manufacturing Suites"
                className="w-full h-[400px] object-cover"
                onError={(e) => { e.target.src = '/logo.png'; }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Capacity Metrics */}
      <div className="py-20 bg-warm/40 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Commercial Volume</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">Production Throughput & Capacities</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
                <span className="text-2xl font-bold text-primary font-mono block">{cap.metric}</span>
                <h3 className="font-bold text-base text-charcoal">{cap.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-8 py-3.5 rounded-xl shadow hover:bg-primary-dark transition-all"
            >
              <span>DISCUSS YOUR MANUFACTURING REQUIREMENTS &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manufacturing;
