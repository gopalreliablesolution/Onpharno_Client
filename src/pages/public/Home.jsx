import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Sparkles, CheckCircle2, ChevronRight, Activity, Beaker, Factory } from 'lucide-react';
import SEO from '../../components/common/SEO';

const Home = () => {
  return (
    <>
      <SEO
        title="Advanced Dosage-Form Technology & Healthcare Manufacturing"
        description="ONPHARNO - Leading B2B pharmaceutical and nutraceutical contract manufacturer specializing in liquid-filled hard capsules, custom formulation, and global export."
      />

      {/* Hero Section Placeholder (Wired to dynamic slider in P4) */}
      <section className="relative bg-gradient-to-br from-navy via-navy to-charcoal text-white pt-24 pb-32 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/20 to-primary-dark/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-primary-light text-xs font-semibold tracking-wider uppercase mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Advanced Dosage-Form Technology
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
            Liquid-Filled Hard Capsules.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-amber-200 mt-2">
              A Distinctive Format for Modern Healthcare.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Formulation &bull; R&D &bull; Manufacturing &bull; Quality &bull; Private Label &bull; Global Partnerships
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products/liquid-filled-hard-capsules"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-600 hover:to-primary-dark text-white font-semibold px-8 py-4 rounded-full text-base shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5"
            >
              Explore Liquid-Filled Capsules
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-base backdrop-blur-sm border border-white/20 transition-all"
            >
              Start a Project &rarr;
            </Link>
          </div>

          {/* Quick trust highlights */}
          <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="border-l-2 border-primary pl-4">
              <p className="text-2xl font-serif font-bold text-white">500+</p>
              <p className="text-xs text-gray-400 mt-0.5">Formulations Developed</p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <p className="text-2xl font-serif font-bold text-white">20+</p>
              <p className="text-xs text-gray-400 mt-0.5">Global Business Partners</p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <p className="text-2xl font-serif font-bold text-white">100%</p>
              <p className="text-xs text-gray-400 mt-0.5">cGMP & ISO Quality</p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <p className="text-2xl font-serif font-bold text-white">12+ Yrs</p>
              <p className="text-xs text-gray-400 mt-0.5">Pharmaceutical Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview intro */}
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">About ONPHARNO</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mt-2">
              We Don't Just Manufacture Products. We Help Businesses Build Them.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              From identifying the market opportunity, formulation chemistry, and advanced dosage selection to cGMP commercial manufacturing and export regulatory documentation—we offer comprehensive turnkey execution for pharmaceutical, nutraceutical, and wellness brands.
            </p>
            <div className="mt-6">
              <Link to="/about/our-story" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark">
                Discover ONPHARNO's Story &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
