import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import {
  Shield,
  Sparkles,
  Factory,
  Users,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Cpu,
  Layers,
  MessageCircle,
  Building2,
  Globe2
} from 'lucide-react';

const AboutStory = () => {
  const steps = [
    { num: '01', title: 'Discover', desc: 'Identify target therapeutic indications, consumer market demands, and active ingredient opportunities.' },
    { num: '02', title: 'Develop', desc: 'Precision lab formulation, excipient selection, bioavailability optimization, and taste/stability profiling.' },
    { num: '03', title: 'Select', desc: 'Choose the optimal dosage delivery format—liquid-filled hard capsules, effervescent, gummies, or tablets.' },
    { num: '04', title: 'Finalize', desc: 'Regulatory compliance review, raw material sourcing, specification approvals, and pilot trial batching.' },
    { num: '05', title: 'Manufacture', desc: 'Commercial cGMP cleanroom manufacturing, automated encapsulation, and continuous in-process analytical checks.' },
    { num: '06', title: 'Package', desc: 'Primary blister/bottle packaging, induction sealing, custom cartons, and barcode serialization.' },
    { num: '07', title: 'Deliver', desc: 'COA release, international export documentation, and on-time global supply chain logistics.' }
  ];

  const buildOptions = [
    {
      title: 'Ready-to-Launch Formulations',
      subtitle: 'Market-Tested Stability & Compliance',
      desc: 'Access over 500+ pre-validated, shelf-stable healthcare and nutraceutical formulations across 12 health categories for swift commercial rollout.',
      badge: 'Speed to Market',
      link: '/products'
    },
    {
      title: 'Tailored Custom Development',
      subtitle: 'Bespoke Dosage Innovations',
      desc: 'Collaborate with our R&D formulation scientists to engineer proprietary multi-active combinations, novel release profiles, or signature aesthetics.',
      badge: 'R&D Innovation',
      link: '/capabilities/product-development'
    },
    {
      title: 'Contract & Private Label Scale',
      subtitle: 'High-Volume Precision Manufacturing',
      desc: 'State-of-the-art cGMP automated manufacturing infrastructure capable of handling commercial batch scale with uncompromising quality compliance.',
      badge: 'Commercial Scale',
      link: '/capabilities/manufacturing'
    }
  ];

  const partnershipNeeds = [
    { title: 'Quality Focus', desc: 'Zero-compromise pharmaceutical grade standards and multi-point analytical release testing.' },
    { title: 'Scientific Approach', desc: 'Bioavailability-first formulation engineering grounded in clinical pharmacology.' },
    { title: 'Reliable Supply', desc: 'Robust procurement channels, predictable lead times, and guaranteed batch-to-batch consistency.' },
    { title: 'Diverse Capability', desc: 'Specialized mastery in liquid-filled capsules, capsule-in-capsule, gummies, and effervescent.' },
    { title: 'Responsive Partnership', desc: 'Dedicated project managers and regulatory specialists who communicate with transparency.' },
    { title: 'Commercial Thinking', desc: 'Target cost-of-goods alignment, shelf differentiation, and market-ready packaging design.' }
  ];

  return (
    <>
      <SEO
        title="Our Story - More Than Manufacturing | ONPHARNO"
        description="More Than Manufacturing. A Partner in Building Better Healthcare Businesses. Discover ONPHARNO's science-led approach and 7-step idea-to-market pathway."
      />

      {/* Hero Header */}
      <div className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-gradient opacity-90 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
              Our Heritage & Vision
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              More Than Manufacturing. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">
                A Partner in Building Better Healthcare Businesses.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">
              We bridge the gap between scientific formulation innovation and commercial pharmaceutical execution. From initial molecular feasibility through automated cGMP encapsulation, ONPHARNO stands as your strategic B2B development ally.
            </p>
          </div>
        </div>
      </div>

      {/* Narrative Section with Real Photo */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">The ONPHARNO Philosophy</span>
              <h2 className="text-3xl font-bold text-charcoal leading-snug">
                We Don't Just Manufacture Products. We Help Businesses Build Them.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Modern healthcare brands face rising consumer expectations: cleaner labels, superior bio-absorption, faster onset of action, and distinctive packaging presentation. Generic contract manufacturers treat formulations as commodity powder pressing.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                At ONPHARNO, we engineer each dosage form around therapeutic viability and market success. Whether filling delicate oils alongside beadlets in a transparent liquid capsule or stabilizing sensitive botanicals, our team brings scientific discipline to every batch.
              </p>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-primary-dark transition-all"
                >
                  <span>Start Your Product Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="/images/about-us-image.webp"
                  alt="ONPHARNO Formulation Laboratories"
                  className="w-full h-[450px] object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/images/manufacturing-facility.jpg'; }}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-navy text-white p-6 rounded-2xl shadow-xl max-w-xs border border-gray-800 hidden sm:block">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-xs text-gray-300 mt-1">Validated formulations successfully scaled for global brand partners.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="py-16 bg-warm/50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-charcoal">The 4 Foundational Pillars</h2>
            <p className="text-xs text-gray-500 mt-2">Every formulation we manufacture is built upon these four core disciplines.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-charcoal">Science-Led Development</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Formulations built on pharmacokinetic bioavailability, active ingredient stability, and therapeutic synergy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-charcoal">Quality-Driven Manufacturing</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Zero-tolerance cGMP compliance across HEPA cleanrooms, raw material quarantine, and validated batch testing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-charcoal">End-to-End Capability</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Turnkey services spanning formulation R&D, pilot batching, automated blister bottling, and export dossiers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-charcoal">Built for Partnership</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Transparent communication, intellectual property protection, and scalable minimum order quantities (MOQs).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* From Idea to Market: 7 Steps */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Our Proven Methodology</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">From Idea to Market in 7 Seamless Steps</h2>
            <p className="text-xs text-gray-500 mt-2">A structured, de-risked pathway designed to bring breakthrough healthcare products to life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-warm/40 p-6 rounded-2xl border border-gray-200 relative group hover:border-primary/50 transition-all">
                <span className="text-3xl font-bold text-primary/30 block mb-2 font-mono">{s.num}</span>
                <h3 className="font-bold text-base text-charcoal">{s.title}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}

            <div className="bg-navy text-white p-6 rounded-2xl flex flex-col justify-between border border-gray-800">
              <div>
                <span className="text-primary-light font-bold text-xs uppercase tracking-wider block mb-2">Ready to Start?</span>
                <h3 className="font-bold text-lg leading-snug">Let's discuss your formulation idea.</h3>
                <p className="text-xs text-gray-400 mt-2">Our technical formulation team will review your requirements under NDA.</p>
              </div>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-primary-light hover:text-white"
              >
                <span>Initiate Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Build With ONPHARNO: 3 Cards */}
      <div className="py-20 bg-warm/30 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Flexible Engagement Models</span>
            <h2 className="text-3xl font-bold text-charcoal mt-1">Build With ONPHARNO</h2>
            <p className="text-xs text-gray-500 mt-2">Select the commercial development model that fits your brand roadmap.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {buildOptions.map((opt, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-primary/10 text-primary mb-4">
                    {opt.badge}
                  </span>
                  <h3 className="text-xl font-bold text-charcoal">{opt.title}</h3>
                  <p className="text-xs font-medium text-primary mt-1">{opt.subtitle}</p>
                  <p className="text-xs text-gray-600 mt-4 leading-relaxed">{opt.desc}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-100">
                  <Link
                    to={opt.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Not Sure Where to Start? Banner */}
          <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h4 className="text-lg font-bold text-charcoal">Not sure where to start?</h4>
              <p className="text-xs text-gray-500 mt-1">Speak directly with our Chief Formulation Officer and B2B Partnership leads.</p>
            </div>
            <a
              href="https://wa.me/919876543210?text=Hi%20ONPHARNO%20Team%2C%20I%20would%20like%20to%20discuss%20a%20new%20product%20development%20concept."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>START A CONVERSATION &rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* Built Around What Better Partnerships Need (6 items) */}
      <div className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-charcoal">Built Around What Better Partnerships Need</h2>
            <p className="text-xs text-gray-500 mt-2">Six commitments that define our long-term client collaborations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipNeeds.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-warm/40 border border-gray-200 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-sm text-charcoal">{item.title}</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutStory;
