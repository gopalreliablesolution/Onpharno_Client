import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Activity,
  Layers,
  Package,
  Globe2,
  Factory,
  Beaker,
  Clock,
  Phone,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import { useSettings } from '../../context/SettingsContext';

const Home = () => {
  const { settings } = useSettings();
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersRes, productsRes, blogsRes] = await Promise.allSettled([
          apiClient.get('/banners'),
          apiClient.get('/products?limit=8'),
          apiClient.get('/blogs'),
        ]);

        if (bannersRes.status === 'fulfilled' && bannersRes.value.success) {
          setBanners(bannersRes.value.data);
        }
        if (productsRes.status === 'fulfilled' && productsRes.value.success) {
          setProducts(productsRes.value.data.products || productsRes.value.data || []);
        }
        if (blogsRes.status === 'fulfilled' && blogsRes.value.success) {
          setBlogs(blogsRes.value.data || []);
        }
      } catch (err) {
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto slide hero banners
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [banners.length]);

  const fallbackBanners = [
    {
      eyebrow: 'ADVANCED DOSAGE-FORM TECHNOLOGY',
      title: 'Liquid-Filled Hard Capsules. A Distinctive Format for Modern Healthcare Products.',
      subtitle: 'Formulation • R&D • Manufacturing • Quality • Private Label • Global Partnerships',
      cta1Text: 'Explore Liquid-Filled Capsules →',
      cta1Link: '/products/liquid-filled-hard-capsules',
      cta2Text: 'Start a Project →',
      cta2Link: '/contact',
    },
    {
      eyebrow: 'YOUR PRIVATE LABEL PARTNER',
      title: 'From Formulation to Packaging, Complete B2B Manufacturing Solutions.',
      subtitle: 'FSSAI, WHO-GMP & ISO certified state-of-the-art facility delivering custom and ready formulations.',
      cta1Text: 'Explore Products →',
      cta1Link: '/products',
      cta2Text: 'Get in Touch →',
      cta2Link: '/contact',
    },
    {
      eyebrow: 'CERTIFIED QUALITY YOU CAN TRUST',
      title: 'End-to-End Turnkey Nutraceutical & Pharmaceutical Capabilities.',
      subtitle: 'High-speed automated encapsulation, tableting, gummy molding, effervescent compression & bottling.',
      cta1Text: 'View Facilities →',
      cta1Link: '/about/facilities',
      cta2Text: 'Quality Policy →',
      cta2Link: '/about/quality',
    },
    {
      eyebrow: 'GLOBAL EXPORT EXCELLENCE',
      title: 'Serving Healthcare Brands Across 15+ Countries Worldwide.',
      subtitle: 'Complete export documentation, CTD dossier support, certificates of analysis, and regulatory registration.',
      cta1Text: 'Explore Global Alliances →',
      cta1Link: '/partner/global-partnerships',
      cta2Text: 'Start Your Journey →',
      cta2Link: '/contact',
    },
    {
      eyebrow: 'CUSTOM PRODUCT DEVELOPMENT',
      title: "Have an Idea? Let's Build the Right Product Around It.",
      subtitle: 'Pilot lab trials, lipid bioenhancement, stability testing, and turnkey packaging development.',
      cta1Text: 'Consult Formulation Team →',
      cta1Link: '/contact',
      cta2Text: 'Explore Dosage Forms →',
      cta2Link: '/products/by-dosage-form',
    },
  ];

  const activeBanners = banners.length > 0 ? banners : fallbackBanners;
  const current = activeBanners[currentBanner] || activeBanners[0];

  // 11 Dosage Forms (SevenQ structure + ONPHARNO signatures)
  const dosageForms = [
    { name: 'Liquid-Filled Hard Capsules', count: 'Featured', path: '/products/liquid-filled-hard-capsules', desc: 'Hermetically banded vegetarian HPMC or gelatin capsules with liquid actives.' },
    { name: 'Gummies', count: '30+ Formulations', path: '/products?dosage=Gummies', desc: 'Delicious pectin-based vegan gummies across immunity, sleep, and beauty.' },
    { name: 'Effervescent Tablets', count: '15+ Formulations', path: '/products?dosage=Effervescent+Tablets', desc: 'Rapid dissolution, instant bio-absorption, and zero stomach acidity.' },
    { name: 'Soft Gel Capsules', count: '15+ Formulations', path: '/products?dosage=Soft+Gel+Capsules', desc: 'Standardized lipid solubilization for omega fatty acids and vitamins.' },
    { name: 'Tablets', count: '33+ Formulations', path: '/products?dosage=Tablets', desc: 'Coated, chewable, sustained-release, and precision bilayer compressed tablets.' },
    { name: 'Capsules', count: '14+ Formulations', path: '/products?dosage=Capsules', desc: 'Plant HPMC & gelatin capsules with micro-pellets and powder blends.' },
    { name: 'Capsule-in-Capsule', count: 'Signature', path: '/products/capsule-in-capsule', desc: 'Dual-phase release combining inner enteric actives with outer liquid matrix.' },
    { name: 'Pellets-in-Capsule', count: 'Signature', path: '/products/pellets-in-capsule', desc: 'Multi-particulate micro-pellets with modified dissolution coatings.' },
    { name: 'Syrups & Liquids', count: '15+ Formulations', path: '/products?dosage=Syrups+%26+Liquids', desc: 'Pleasant, highly palatable oral tonics and liquid botanical extracts.' },
    { name: 'Oral Shots', count: 'Ready to Drink', path: '/products?dosage=Oral+Shots', desc: '25ml - 60ml concentrated single-serve beauty and energy liquid shots.' },
    { name: 'Sachets & Powders', count: '12+ Formulations', path: '/products?dosage=Sachets+%26+Powders', desc: 'Single-serve electrolyte mixes, protein blends, and dissolvable drink sticks.' },
  ];

  // 12 Therapeutic Classes (SevenQ structure)
  const therapeuticClasses = [
    { title: 'Multivitamins Supplement', count: '50+ Items', desc: 'Daily micronutrient insurance for vitality and stamina.' },
    { title: 'Women Supplement', count: '72+ Items', desc: 'Hormonal balance, gentle iron, prenatal & beauty nutrition.' },
    { title: 'Kids Supplement', count: '42+ Items', desc: 'Immunity, DHA brain development, and delicious gummies.' },
    { title: 'Ortho Supplement', count: '19+ Items', desc: 'Joint mobility, glucosamine, chondroitin & collagen peptides.' },
    { title: 'Brain Memory & Neuro', count: '15+ Items', desc: 'Cognitive nootropics, memory, phosphatidylserine & focus.' },
    { title: 'Stress Relief & Sleep', count: '20+ Items', desc: 'Melatonin, magnesium glycinate, and KSM-66 ashwagandha.' },
    { title: 'Digestive & Probiotic', count: '18+ Items', desc: 'Spore-forming probiotics, prebiotic fibers & enzymes.' },
    { title: 'Hair Skin & Nail', count: '25+ Items', desc: 'High-potency biotin, reduced glutathione & marine collagen.' },
    { title: 'Weight Loss Supplement', count: '12+ Items', desc: 'Raw apple cider vinegar, green tea extract & metabolism.' },
    { title: 'Heart Supplement', count: '16+ Items', desc: 'CoQ10, omega-3 EPA/DHA fatty acids & lipid balance.' },
    { title: 'Eye Liver Kidney', count: '14+ Items', desc: 'Lutein, zeaxanthin, milk thistle & detox support.' },
    { title: 'Energy & Gym Supplement', count: '17+ Items', desc: 'Micronized creatine, shilajit, BCAAs & electrolyte blends.' },
  ];

  // 6 How It Works Steps (from SevenQ Nutrition)
  const howItWorksSteps = [
    { num: '01', title: 'Share Requirements', desc: 'Share your business goals, target dosage forms, and product specs with our technical formulation team.' },
    { num: '02', title: 'Formulation Selection', desc: 'Choose from our 500+ validated market-ready formulations or develop a custom proprietary formula.' },
    { num: '03', title: 'Approval & Terms', desc: 'Evaluate pilot batch samples, confirm packaging configurations, batch quantities, and commercial terms.' },
    { num: '04', title: 'cGMP Manufacturing', desc: 'High-speed automated production in cleanrooms adhering strictly to WHO-GMP, ISO, and FSSAI guidelines.' },
    { num: '05', title: 'Quality & Lab Testing', desc: 'Rigorous in-process assay checks, dissolution profiles, stability audits, and batch release COA.' },
    { num: '06', title: 'Packaging & Delivery', desc: 'Finished primary and secondary packaging with prompt domestic delivery and global export logistics.' },
  ];

  return (
    <>
      <SEO
        title="Nutraceutical & Pharmaceutical Contract Manufacturer"
        description="ONPHARNO - Leading B2B manufacturer in India for advanced liquid-filled hard capsules, gummies, tablets, effervescents, and turnkey private label healthcare products."
      />

      {/* 1A. Hero Slider */}
      <section className="relative bg-navy text-white min-h-[600px] sm:min-h-[680px] flex items-center overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-primary/20 via-primary-dark/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-primary-light text-xs font-semibold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> {current.eyebrow}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.18] min-h-[140px] sm:min-h-[160px] flex items-center justify-center">
              {current.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
              {current.subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={current.cta1Link || '/products'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-600 hover:to-primary-dark text-white font-semibold px-8 py-4 rounded-full text-sm sm:text-base shadow-xl shadow-primary/25 transition-all transform hover:-translate-y-0.5"
              >
                {current.cta1Text || 'Explore Products →'}
              </Link>
              <Link
                to={current.cta2Link || '/contact'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm sm:text-base backdrop-blur-sm border border-white/20 transition-all"
              >
                {current.cta2Text || 'Get in Touch →'}
              </Link>
            </div>

            {/* Slider Dots */}
            <div className="mt-12 flex items-center justify-center gap-2.5">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBanner(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentBanner === idx ? 'w-8 bg-primary' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 1B. About Section */}
      <section className="py-20 bg-warm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">About ONPHARNO</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
                We Don't Just Manufacture Products. We Help Businesses Build Them.
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                ONPHARNO is a leading FSSAI-approved and cGMP certified pharmaceutical & nutraceutical manufacturer in India. With 17+ years of expertise in private label and third-party contract manufacturing, we deliver safe, stable, and highly marketable formulations tailored for modern consumer lifestyles.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Along with high-quality formulations, we focus on distinctive packaging development, regulatory dossier preparation, and reliable supply chain execution. We are your dedicated technical allies in scaling successful healthcare brands worldwide.
              </p>
              <div className="pt-2">
                <Link
                  to="/about/our-story"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-dark"
                >
                  Discover ONPHARNO's Story &rarr;
                </Link>
              </div>
            </div>

            {/* Quick Feature Pillars */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Beaker className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-charcoal text-sm">Custom Formulations</h4>
                <p className="text-xs text-gray-500 mt-1">Tailor-made active formulas engineered by our scientific R&D team.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-charcoal text-sm">Certified Quality</h4>
                <p className="text-xs text-gray-500 mt-1">Full compliance with WHO-GMP, ISO 22000 & FSSAI standards.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Package className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-charcoal text-sm">End-to-End Packaging</h4>
                <p className="text-xs text-gray-500 mt-1">Custom bottles, blister packs, jars, tubes, and export boxing.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-charcoal text-sm">Global Reach</h4>
                <p className="text-xs text-gray-500 mt-1">Serving healthcare partners across 15+ countries worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1C. Signature Capability: Liquid-Filled Hard Capsules */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden">
            <div className="max-w-2xl relative z-10 space-y-4">
              <span className="text-primary-light uppercase text-xs font-bold tracking-wider">Signature Technology</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Liquid-Filled Hard Capsules
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Elevate your product portfolio above standard powders and generic softgels. Our hermetically banded vegetarian HPMC or gelatin liquid-filled capsules provide superior oxygen barrier protection, crystal-clear aesthetic differentiation, and enhanced active bioavailability.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/products/liquid-filled-hard-capsules"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-6 py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Explore the Technology &rarr;
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full text-sm border border-white/20 transition-all"
                >
                  Request Technical Samples
                </Link>
              </div>
            </div>

            {/* 4-Phase Capsule Process Visualization */}
            <div className="mt-12 pt-8 border-t border-navy-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-navy-800/60 p-4 rounded-xl border border-navy-800">
                <span className="text-primary text-xs font-bold uppercase block">Phase 01</span>
                <span className="font-semibold text-white text-sm mt-1 block">Capsule Shell</span>
                <span className="text-xs text-gray-400 mt-0.5 block">100% Plant HPMC / Gelatin</span>
              </div>
              <div className="bg-navy-800/60 p-4 rounded-xl border border-navy-800">
                <span className="text-primary text-xs font-bold uppercase block">Phase 02</span>
                <span className="font-semibold text-white text-sm mt-1 block">Liquid / Lipid Fill</span>
                <span className="text-xs text-gray-400 mt-0.5 block">Non-aqueous active matrix</span>
              </div>
              <div className="bg-navy-800/60 p-4 rounded-xl border border-navy-800">
                <span className="text-primary text-xs font-bold uppercase block">Phase 03</span>
                <span className="font-semibold text-white text-sm mt-1 block">Hermetic Banding</span>
                <span className="text-xs text-gray-400 mt-0.5 block">Tamper-evident sealing</span>
              </div>
              <div className="bg-navy-800/60 p-4 rounded-xl border border-navy-800">
                <span className="text-primary text-xs font-bold uppercase block">Phase 04</span>
                <span className="font-semibold text-white text-sm mt-1 block">Finished Capsule</span>
                <span className="text-xs text-gray-400 mt-0.5 block">Premium market appeal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1D. How It Works (6 Real Steps from SevenQ) */}
      <section className="py-20 bg-warm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Simple & Transparent Flow</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-2">
              How It Works: From Concept to Market
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Our streamlined 6-step manufacturing process ensures seamless execution, on-time delivery, and full compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {howItWorksSteps.map((step) => (
              <div
                key={step.num}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative group hover:border-primary/50 transition-all duration-300"
              >
                <span className="text-4xl font-bold text-primary/20 block mb-3">{step.num}</span>
                <h3 className="font-bold text-lg text-charcoal group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full text-sm shadow-md"
            >
              Start Your Product Journey &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 1E-2. Nutraceutical Products by Dosage Forms (SevenQ structure) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Manufacturing Capabilities</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-1">
                Nutraceutical Products By Dosage Forms
              </h2>
              <p className="text-gray-600 text-sm mt-2 max-w-xl">
                Expertise across 11 advanced dosage formats manufactured in state-of-the-art cleanrooms with automated precision lines.
              </p>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-dark"
            >
              View Full Formulations Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dosageForms.map((df) => (
              <Link
                key={df.name}
                to={df.path}
                className="bg-warm/60 p-6 rounded-2xl border border-gray-200 hover:border-primary/50 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white text-primary border border-primary/20">
                      {df.count}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-bold text-lg text-charcoal group-hover:text-primary transition-colors">
                    {df.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {df.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 1E. Products by Therapeutic Class (12 Real Categories from SevenQ) */}
      <section className="py-20 bg-warm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Comprehensive Coverage</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-2">
              Products by Therapeutic Class
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Formulations engineered for specific physiological needs, clinical deficiencies, and health categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {therapeuticClasses.map((tc) => (
              <Link
                key={tc.title}
                to={`/products?category=${encodeURIComponent(tc.title)}`}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[11px] font-semibold text-primary block mb-1">{tc.count}</span>
                  <h3 className="font-bold text-base text-charcoal group-hover:text-primary transition-colors">
                    {tc.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {tc.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-primary font-semibold">
                  <span>Explore Segment</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 1G. Why Partner With Us (SevenQ Pillars) */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-light uppercase text-xs font-bold tracking-wider">The ONPHARNO Advantage</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Why Partner With Us?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-2">
              Combining world-class manufacturing infrastructure with scientific agility and dependable commercial partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-navy-800/80 p-8 rounded-2xl border border-navy-800">
              <h3 className="font-bold text-xl text-white mb-2">Customized Private Label</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Tailor-made supplement formulas designed to match your brand's unique specifications, market positioning, and label aesthetics.
              </p>
            </div>
            <div className="bg-navy-800/80 p-8 rounded-2xl border border-navy-800">
              <h3 className="font-bold text-xl text-white mb-2">Certified Quality You Can Trust</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                FSSAI, WHO-GMP, and ISO certified quality systems with complete batch testing, traceability, and Certificates of Analysis (COA).
              </p>
            </div>
            <div className="bg-navy-800/80 p-8 rounded-2xl border border-navy-800">
              <h3 className="font-bold text-xl text-white mb-2">Global Standards, Export Focus</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Serving partners across 15+ countries with full regulatory documentation, CTD dossier support, and reliable international logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1H. Animated Counters */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="border-r border-gray-100 last:border-none">
              <p className="text-4xl sm:text-5xl font-bold text-primary">500+</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Validated Formulations</p>
            </div>
            <div className="border-r border-gray-100 last:border-none">
              <p className="text-4xl sm:text-5xl font-bold text-primary">15+</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Countries Served</p>
            </div>
            <div className="border-r border-gray-100 last:border-none">
              <p className="text-4xl sm:text-5xl font-bold text-primary">11+</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Dosage Formats</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-primary">17+</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* 1I. Featured Formulations Showcase */}
      {products.length > 0 && (
        <section className="py-20 bg-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Validated Ready Formulas</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-1">
                  Featured Products & Formulations
                </h2>
                <p className="text-gray-600 text-sm mt-2 max-w-xl">
                  Explore our high-demand market-ready formulations available for rapid private label contract manufacturing.
                </p>
              </div>
              <Link
                to="/products"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-dark"
              >
                View All Formulations &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((p) => (
                <div
                  key={p._id || p.slug}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="h-44 bg-warm/50 flex items-center justify-center p-4 relative border-b border-gray-100">
                    <img
                      src={p.images?.[0] || '/logo.png'}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      onError={(e) => { e.target.src = '/logo.png'; }}
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white text-primary border border-primary/20">
                      {p.dosageForm}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] text-gray-500 font-semibold block mb-1">
                        {p.healthCategory}
                      </span>
                      <h4 className="font-bold text-charcoal text-sm group-hover:text-primary transition-colors line-clamp-2">
                        {p.name}
                      </h4>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary">
                      <span>MOQ: {p.moq || '50,000'}</span>
                      <Link to={`/products/${p.slug}`} className="hover:underline flex items-center gap-1">
                        Details &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 1J. Articles & Insights Teaser */}
      {blogs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Scientific Perspective</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-1">
                  Insights From the Future of Healthcare
                </h2>
                <p className="text-gray-600 text-sm mt-2 max-w-xl">
                  Articles, formulation guides, and industry analyses from our R&D scientists.
                </p>
              </div>
              <Link
                to="/resources/blogs"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-dark"
              >
                Browse All Articles &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.slice(0, 3).map((b) => (
                <article key={b._id || b.slug} className="bg-warm/40 rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:border-primary/40 transition-colors">
                  <div>
                    <span className="text-xs text-primary font-semibold block mb-2">{b.readTime || '5 min read'}</span>
                    <h3 className="font-bold text-lg text-charcoal hover:text-primary transition-colors">
                      <Link to={`/resources/blogs/${b.slug}`}>{b.title}</Link>
                    </h3>
                    <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                      {b.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link to={`/resources/blogs/${b.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark">
                      Read Article &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
