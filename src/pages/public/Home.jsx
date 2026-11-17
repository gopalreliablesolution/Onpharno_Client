import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Activity,
  Layers,
  Package,
  Globe2,
  Factory,
  Beaker,
  Clock,
  Phone,
  MessageCircle,
  FileText,
  Check
} from 'lucide-react';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { useSettings } from '../../context/SettingsContext';
import CapsuleAnimation from '../../components/common/CapsuleAnimation';

const Home = () => {
  const { settings } = useSettings();
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
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

  // 5 Hero Banners (Aligned with SevenQ Reference Site)
  const fallbackBanners = [
    {
      eyebrow: 'FSSAI Approved & WHO-GMP Certified',
      title: 'Trusted Nutraceutical Partner',
      subtitle: 'Delivering innovative, safe, and effective health solutions with modern formulation capabilities.',
      cta1Text: 'Explore Products',
      cta1Link: '/products',
      cta2Text: 'Start a Project',
      cta2Link: '/contact',
      imageDesktop: '/images/hero-banner-1.jpg',
      imageMobile: '/images/mobile-banner-1.jpg',
      badge: '17+ Years Leadership'
    },
    {
      eyebrow: 'Private Label & Custom Formulation',
      title: 'Your Private Label Partner for Health Supplements',
      subtitle: 'From formulation to packaging, we provide end-to-end nutraceutical manufacturing solutions.',
      cta1Text: 'Get in Touch',
      cta1Link: '/contact',
      cta2Text: 'Private Label Solutions',
      cta2Link: '/capabilities/product-development',
      imageDesktop: '/images/hero-banner-2.jpg',
      imageMobile: '/images/mobile-banner-2.jpg',
      badge: '500+ Formulations'
    },
    {
      eyebrow: 'cGMP-Certified Infrastructure',
      title: 'Your Reliable 3rd Party Manufacturing Partner',
      subtitle: 'GMP-certified processes, customized formulations, and on-time delivery you can count on.',
      cta1Text: 'Our Services',
      cta1Link: '/capabilities/product-development',
      cta2Text: 'Explore Facilities',
      cta2Link: '/about/facilities',
      imageDesktop: '/images/hero-banner-3.jpg',
      imageMobile: '/images/mobile-banner-3.jpg',
      badge: 'State-of-the-Art Facility'
    },
    {
      eyebrow: 'Advanced Dosage-Form Technology',
      title: 'Liquid-Filled Hard Capsules & Novel Delivery Formats',
      subtitle: 'Engineered for superior bioavailability, active stability, and distinctive brand differentiation.',
      cta1Text: 'Explore Liquid-Filled Capsules',
      cta1Link: '/products/liquid-filled-hard-capsules',
      cta2Text: 'Formulation R&D',
      cta2Link: '/capabilities/research-innovation',
      imageDesktop: '/images/facility-highlights.jpg',
      imageMobile: '/images/format-capsules.jpg',
      badge: 'Signature Format'
    },
    {
      eyebrow: 'Global Regulatory & Export Readiness',
      title: 'Building Healthcare Partnerships Beyond Borders',
      subtitle: 'Complete CTD dossier documentation, certificates of analysis, and trusted cross-border compliance.',
      cta1Text: 'Explore Global Partnerships',
      cta1Link: '/partner/global-partnerships',
      cta2Text: 'Contact Export Team',
      cta2Link: '/contact',
      imageDesktop: '/images/export-cargo.jpg',
      imageMobile: '/images/world-map.png',
      badge: '15+ Export Markets'
    },
  ];

  const activeBanners = banners.length > 0 ? banners : fallbackBanners;
  const current = activeBanners[currentBanner] || activeBanners[0];

  const getBannerImage = (b, isMobile = false) => {
    const raw = isMobile ? (b?.imageMobile || b?.imageDesktop) : b?.imageDesktop;
    if (raw && !raw.includes('logo.png')) {
      return getImageUrl(raw);
    }
    const desktopDefaults = [
      '/images/hero-banner-1.jpg',
      '/images/hero-banner-2.jpg',
      '/images/hero-banner-3.jpg',
      '/images/facility-highlights.jpg',
      '/images/export-cargo.jpg'
    ];
    const mobileDefaults = [
      '/images/mobile-banner-1.jpg',
      '/images/mobile-banner-2.jpg',
      '/images/mobile-banner-3.jpg',
      '/images/format-capsules.jpg',
      '/images/world-map.png'
    ];
    const list = isMobile ? mobileDefaults : desktopDefaults;
    return list[currentBanner % list.length];
  };

  // Auto slide hero banners (5000ms pause on hover like SevenQ)
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
  };

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % activeBanners.length);
  };

  // Real Dosage Forms with actual packaging photos
  const dosageForms = [
    { name: 'Gummies', count: '30+ Formulations', image: '/images/format-gummies.jpg', path: '/products?dosage=Gummies', desc: 'Delicious pectin-based 100% vegan chewable gummies for multivitamins, sleep, and beauty.' },
    { name: 'Effervescent Tablets', count: '15+ Formulations', image: '/images/format-effervescent.jpg', path: '/products?dosage=Effervescent+Tablets', desc: 'Rapid dissolution, instant bio-absorption, gentle on the stomach, and crisp refreshing flavors.' },
    { name: 'Tablets', count: '33+ Formulations', image: '/images/format-tablets.jpg', path: '/products?dosage=Tablets', desc: 'Coated, chewable, sustained-release, and precision bilayer compressed orthopedic tablets.' },
    { name: 'Soft Gel Capsules', count: '15+ Formulations', image: '/images/format-softgels.jpg', path: '/products?dosage=Soft+Gel+Capsules', desc: 'Standardized lipid encapsulation for omega-3 fish oil, evening primrose, and fat-soluble vitamins.' },
    { name: 'Capsules', count: '14+ Formulations', image: '/images/format-capsules.jpg', path: '/products?dosage=Capsules', desc: 'Plant-derived HPMC vegetarian capsules and pharmaceutical-grade gelatin encapsulation.' },
    { name: 'Liquid-Filled Hard Capsules', count: 'Signature', image: '/images/format-capsules.jpg', path: '/products/liquid-filled-hard-capsules', desc: 'Hermetically banded two-piece hard capsules with liquid, oil, or suspension matrices.' },
    { name: 'Oral Shots', count: 'Ready to Drink', image: '/images/format-shots.jpg', path: '/products?dosage=Oral+Shots', desc: '25ml - 60ml concentrated single-serve beauty collagen and athletic energy shots.' },
    { name: 'Syrups & Liquids', count: '15+ Formulations', image: '/images/format-syrups.jpg', path: '/products?dosage=Syrups+%26+Liquids', desc: 'Highly palatable oral tonics, herbal extracts, and liquid vitamin suspensions.' },
    { name: 'Sachets & Powders', count: '12+ Formulations', image: '/images/format-sachets.jpg', path: '/products?dosage=Sachets+%26+Powders', desc: 'Single-serve electrolyte drink mixes, workout powders, and dissolvable stick packs.' },
  ];

  // Real Therapeutic Categories with actual category photos
  const therapeuticClasses = [
    { title: 'Multivitamins Supplement', count: '50+ Items', image: '/images/cat-multivitamins.jpg', desc: 'Daily micronutrient insurance for vitality and stamina.' },
    { title: 'Women Supplement', count: '72+ Items', image: '/images/cat-women.jpg', desc: 'Hormonal balance, gentle iron, prenatal & beauty nutrition.' },
    { title: 'Kids Supplement', count: '42+ Items', image: '/images/cat-kids.jpg', desc: 'Immunity, DHA brain development, and delicious gummies.' },
    { title: 'Ortho Supplement', count: '19+ Items', image: '/images/cat-ortho.jpg', desc: 'Joint mobility, glucosamine, chondroitin & collagen peptides.' },
    { title: 'Energy & Gym Supplement', count: '17+ Items', image: '/images/cat-sports.jpg', desc: 'Micronized creatine, shilajit, BCAAs & electrolyte blends.' },
    { title: 'Digestive & Probiotic', count: '18+ Items', image: '/images/cat-digestive.jpg', desc: 'Spore-forming probiotics, prebiotic fibers & enzymes.' },
    { title: 'Hair Skin & Nail', count: '25+ Items', image: '/images/cat-hair-skin-nail.jpg', desc: 'High-potency biotin, reduced glutathione & marine collagen.' },
    { title: 'Heart Supplement', count: '16+ Items', image: '/images/cat-heart.jpg', desc: 'CoQ10, omega-3 EPA/DHA fatty acids & lipid balance.' },
    { title: 'Weight Loss Supplement', count: '12+ Items', image: '/images/cat-weight-loss.jpg', desc: 'Raw apple cider vinegar, green tea extract & metabolism.' },
    { title: 'Stress Relief & Sleep', count: '20+ Items', image: '/images/cat-stress-sleep.jpg', desc: 'Melatonin, magnesium glycinate, and KSM-66 ashwagandha.' },
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

      {/* ========================================================= */}
      {/* 1A. MOBILE-FIRST BESPOKE HERO SECTION (Screens < lg)        */}
      {/* ========================================================= */}
      <section className="lg:hidden w-full bg-gradient-to-b from-navy via-navy to-charcoal text-white pt-6 pb-10 px-4 relative overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-24 -left-20 w-72 h-72 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top interactive ticker: Live format chips + counter */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-primary-light font-bold uppercase tracking-wider text-[11px]">
            <Sparkles className="w-3 h-3 text-primary animate-pulse" />
            <span>{current.badge || 'B2B Healthcare Ally'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-gray-400">
              <span className="text-white font-bold">0{currentBanner + 1}</span> / 0{activeBanners.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={prevBanner}
                className="w-7 h-7 rounded-full bg-white/10 active:bg-primary flex items-center justify-center text-white"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextBanner}
                className="w-7 h-7 rounded-full bg-white/10 active:bg-primary flex items-center justify-center text-white"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Mobile Headline */}
        <div className="relative z-10 mb-4 text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            {current.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
            {current.subtitle}
          </p>
        </div>

        {/* Futuristic Glassmorphic Product Showcase Card */}
        <div className="relative z-10 my-4 bg-gradient-to-br from-white/12 via-white/6 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl overflow-hidden">
          {/* Subtle inside gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-amber-500/10 pointer-events-none" />

          {/* Micro badges header inside card */}
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-white shadow-sm">
              WHO-GMP & FSSAI
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-gray-200 border border-white/20">
              17+ Years Expertise
            </span>
          </div>

          {/* Center Product Visual */}
          <div className="relative h-44 sm:h-52 flex items-center justify-center py-2">
            <img
              src={getBannerImage(current, true)}
              alt={current.title}
              className="max-h-full max-w-full object-contain mx-auto drop-shadow-[0_18px_25px_rgba(0,0,0,0.7)] transition-all duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/hero-banner-1.jpg';
              }}
            />
          </div>

          {/* 3-Pillar Micro Metric Strip */}
          <div className="mt-2 pt-2.5 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[10px] text-gray-300 relative z-10">
            <div className="bg-black/25 rounded-xl py-1 px-1">
              <span className="block font-bold text-white text-xs">500+</span>
              <span className="text-gray-400">Formulations</span>
            </div>
            <div className="bg-black/25 rounded-xl py-1 px-1">
              <span className="block font-bold text-primary-light text-xs">Turnkey</span>
              <span className="text-gray-400">Private Label</span>
            </div>
            <div className="bg-black/25 rounded-xl py-1 px-1">
              <span className="block font-bold text-emerald-400 text-xs">Global</span>
              <span className="text-gray-400">Export Ready</span>
            </div>
          </div>
        </div>

        {/* Quick Format Chips Carousel */}
        <div className="relative z-10 mb-4">
          <div className="flex items-center justify-between text-[11px] text-gray-300 uppercase tracking-wider font-semibold mb-2">
            <span>Explore Formats:</span>
            <Link to="/products/by-dosage-form" className="text-primary hover:underline">All Dosage Forms →</Link>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              { label: 'Gummies', path: '/products?dosage=Gummies', icon: '🍬' },
              { label: 'Liquid Capsules', path: '/products/liquid-filled-hard-capsules', icon: '💊' },
              { label: 'Effervescents', path: '/products?dosage=Effervescent+Tablets', icon: '⚡' },
              { label: 'Tablets', path: '/products?dosage=Tablets', icon: '🌿' },
              { label: 'Softgels', path: '/products?dosage=Soft+Gel+Capsules', icon: '✨' },
              { label: 'Oral Shots', path: '/products?dosage=Oral+Shots', icon: '🧪' },
            ].map((chip, i) => (
              <Link
                key={i}
                to={chip.path}
                className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-primary border border-white/15 text-xs text-white transition-colors"
              >
                <span>{chip.icon}</span>
                <span className="font-medium">{chip.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* High-Converting Mobile Action Buttons */}
        <div className="relative z-10 space-y-2">
          <Link
            to={current.cta1Link || '/products'}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-600 hover:to-primary-dark text-white font-bold py-3.5 px-6 rounded-2xl shadow-xl shadow-primary/30 active:scale-[0.98] transition-transform text-sm tracking-wide"
          >
            <span>{current.cta1Text || 'Explore Products Catalog'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={current.cta2Link || '/contact'}
              className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 text-white font-semibold py-2.5 px-3 rounded-2xl text-xs backdrop-blur-md transition-colors"
            >
              <span>Start Project</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
            <a
              href={`https://wa.me/${(settings?.whatsappNumber || '918980940940').replace(/[^0-9]/g, '')}?text=Hello%20ONPHARNO%2C%20I%20would%20like%20to%20enquire%20about%20manufacturing.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-3 rounded-2xl text-xs shadow-md transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom slide indicator dots */}
        <div className="mt-4 flex items-center justify-center gap-1.5 relative z-10">
          {activeBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentBanner === idx ? 'w-7 bg-primary shadow-sm' : 'w-1.5 bg-white/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 1B. DESKTOP FULL-BLEED PANORAMIC SLIDER (SevenQ Style)   */}
      {/* ========================================================= */}
      <section className="hidden lg:flex relative w-full overflow-hidden bg-navy min-h-[620px] h-[660px] items-center">
        {/* Background Slides with Smooth Opacity Transition */}
        {activeBanners.map((b, idx) => {
          const isActive = idx === currentBanner;
          const bgImg = getBannerImage(b, false);
          return (
            <div
              key={b._id || idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Desktop Panoramic Background (1920x700 with product bottles on right) */}
              <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-[center_right] transform scale-100 transition-transform duration-10000"
                style={{ backgroundImage: `url(${bgImg})` }}
              />

              {/* Gradient Overlays for Readability on Desktop */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30 lg:from-navy/90 lg:via-navy/65 lg:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-black/20" />
            </div>
          );
        })}

        {/* Slide Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20 lg:py-24">
          <div className="max-w-xl lg:max-w-2xl text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>{current.eyebrow || 'Trusted Nutraceutical Partner'}</span>
            </div>

            {/* Main Heading (Inter Bold typography aligned with SevenQ) */}
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.12] mb-5 font-sans drop-shadow-sm">
              {current.title}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-lg md:text-xl text-gray-200 font-normal leading-relaxed mb-8 max-w-lg lg:max-w-xl drop-shadow-sm">
              {current.subtitle}
            </p>

            {/* Trust Highlights Line */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 text-sm text-gray-200">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WHO-GMP & FSSAI Approved</span>
              </div>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Custom & Ready Formulations</span>
              </div>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>On-Time Global Delivery</span>
              </div>
            </div>

            {/* Action Buttons (Pill-Styled like SevenQ) */}
            <div className="flex items-center gap-4">
              <Link
                to={current.cta1Link || '/products'}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-full text-base shadow-xl shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{current.cta1Text || 'Explore Products'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={current.cta2Link || '/contact'}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/80 hover:bg-white hover:text-navy text-white font-semibold px-8 py-3.5 rounded-full text-base backdrop-blur-sm transition-all duration-300"
              >
                <span>{current.cta2Text || 'Get in Touch'}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Circular Navigation Chevrons on Far Left & Right */}
        <button
          onClick={prevBanner}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-13 h-13 rounded-full bg-black/40 hover:bg-primary text-white flex items-center justify-center border border-white/20 transition-all duration-300 backdrop-blur-md shadow-xl"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-13 h-13 rounded-full bg-black/40 hover:bg-primary text-white flex items-center justify-center border border-white/20 transition-all duration-300 backdrop-blur-md shadow-xl"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {activeBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentBanner === idx ? 'w-10 bg-primary shadow-md' : 'w-2.5 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 1B. About Us & Manufacturing Infrastructure */}
      <section className="py-20 bg-warm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: About Text */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">About ONPHARNO</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
                Welcome to ONPHARNO: Your Dedicated Healthcare Manufacturing Ally
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                ONPHARNO is a leading FSSAI-approved and cGMP certified pharmaceutical and nutraceutical manufacturer in India. With 17+ years of expertise in private label and third-party contract manufacturing, we deliver safe, stable, and highly marketable formulations tailored for modern consumer lifestyles.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Along with high-quality formulations, we focus on distinctive packaging development, regulatory dossier preparation, and reliable supply chain execution. We are not just your manufacturing supplier, but your business allies in scaling successful brands worldwide.
              </p>

              {/* 4 Feature Pillars (from SevenQ) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-charcoal text-sm">Customized Formulations</h4>
                  <p className="text-xs text-gray-500 mt-1">Tailor-made supplement formulas designed to match your brand's unique market requirements.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-charcoal text-sm">Ready Formulations</h4>
                  <p className="text-xs text-gray-500 mt-1">500+ proven, clinically supported market-ready products for rapid commercial launch.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-charcoal text-sm">Packaging Development</h4>
                  <p className="text-xs text-gray-500 mt-1">Bottles, jars, blister packs, sachets, tubes, and custom master cartons.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-charcoal text-sm">Global Exports</h4>
                  <p className="text-xs text-gray-500 mt-1">End-to-end international logistics, regulatory documentation, and CTD dossiers.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about/our-story"
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-dark"
                >
                  Discover ONPHARNO's Full Story &rarr;
                </Link>
              </div>
            </div>

            {/* Right: Real Facility Photo */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-white relative">
                <img
                  src="/images/about-us-image.webp"
                  alt="ONPHARNO Manufacturing Plant & R&D Laboratory"
                  className="w-full h-80 sm:h-96 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/manufacturing-facility.jpg';
                  }}
                />
                <div className="p-6 bg-white border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-charcoal text-base">cGMP Certified Cleanrooms</h4>
                    <p className="text-xs text-gray-500 mt-0.5">HEPA-filtered climate controlled manufacturing plant in Ahmedabad, India</p>
                  </div>
                  <Link
                    to="/about/facilities"
                    className="px-4 py-2 rounded-lg bg-warm hover:bg-primary text-primary hover:text-white text-xs font-semibold transition-colors shrink-0"
                  >
                    View Plant &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1C. Signature Capability: Interactive Liquid-Filled Capsule Anatomy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Advanced Dosage-Form Innovation</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-2">
              Liquid-Filled Hard Capsules Technology
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Beyond conventional dry powders and softgels: explore our distinctive hermetically banded liquid delivery system.
            </p>
          </div>

          <CapsuleAnimation />

          {/* Quick Comparison Highlights */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-warm/60 p-6 rounded-2xl border border-gray-200">
              <h4 className="font-bold text-charcoal text-base">100% Plant HPMC Options</h4>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Vegetarian consumers can enjoy liquid and oil actives without relying on animal bovine/porcine gelatin softgels.
              </p>
            </div>
            <div className="bg-warm/60 p-6 rounded-2xl border border-gray-200">
              <h4 className="font-bold text-charcoal text-base">Superior Oxygen Barrier</h4>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Thinner shell walls with lower moisture migration protect sensitive oils like CoQ10, omega-3, and astaxanthin from oxidation.
              </p>
            </div>
            <div className="bg-warm/60 p-6 rounded-2xl border border-gray-200">
              <h4 className="font-bold text-charcoal text-base">Visual Differentiation</h4>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Tamper-evident sealing bands and clear two-tone capsules create unmatched perceived consumer quality on retail shelves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1D. How It Works (6 Steps from SevenQ) */}
      <section className="py-20 bg-warm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Simple & Transparent Flow</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-2">
              How It Works: From Concept to Market
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Our 6-step manufacturing framework ensures seamless technical execution, on-time delivery, and full compliance.
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

      {/* 1E-2. Nutraceutical Products by Dosage Forms with REAL PHOTOS */}
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
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Real dosage form image */}
                <div className="h-44 bg-warm/60 overflow-hidden relative border-b border-gray-100 flex items-center justify-center p-3">
                  <img
                    src={df.image}
                    alt={df.name}
                    className="max-h-full max-w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/logo.png';
                    }}
                  />
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-white/90 text-primary border border-primary/20 backdrop-blur-sm">
                    {df.count}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-charcoal group-hover:text-primary transition-colors flex items-center justify-between">
                      {df.name}
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      {df.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 1E. Products by Therapeutic Class with REAL CATEGORY PHOTOS */}
      <section className="py-20 bg-warm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Comprehensive Coverage</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-2">
              Products by Therapeutic Class
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Formulations engineered for specific clinical indications, nutritional deficiencies, and health categories.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {therapeuticClasses.map((tc) => (
              <Link
                key={tc.title}
                to={`/products?category=${encodeURIComponent(tc.title)}`}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                <div className="h-32 bg-gray-50 overflow-hidden relative">
                  <img
                    src={tc.image}
                    alt={tc.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/logo.png';
                    }}
                  />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-navy/80 text-white backdrop-blur-sm">
                    {tc.count}
                  </span>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-xs sm:text-sm text-charcoal group-hover:text-primary transition-colors line-clamp-2">
                    {tc.title}
                  </h3>
                  <span className="mt-2 text-[11px] text-primary font-semibold flex items-center gap-1">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 1F. Manufacturing Facility Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Plant & Cleanrooms</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
                See Where Products Become Real
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Our plant in Ahmedabad, Gujarat features automated HVAC-controlled Class 100,000 cleanrooms, high-speed rotary tableting machines, semi-solid encapsulation lines, and automated packaging equipment compliant with global GDP guidelines.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Class 100,000 HEPA Filtered Cleanrooms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Automated Encapsulation & Band Sealing Lines</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>In-House QC Chemistry & Microbiology Testing Labs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Blister, Bottle, Gummy Pouch & Tube Packaging</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/about/facilities"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-6 py-3 rounded-full text-sm shadow-md"
                >
                  Explore Facility & Machinery &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/images/manufacturing-facility.jpg"
                  alt="Manufacturing Cleanroom"
                  className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-3 bg-warm">
                  <p className="font-bold text-charcoal text-xs">High-Speed Encapsulation</p>
                  <p className="text-[11px] text-gray-500">Automated precision capsule filling</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/images/packaging-line.jpg"
                  alt="Automated Packaging Line"
                  className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-3 bg-warm">
                  <p className="font-bold text-charcoal text-xs">Packaging & Bottling Line</p>
                  <p className="text-[11px] text-gray-500">Induction sealing & tamper labeling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1G. Why Partner With ONPHARNO (SevenQ Pillars + Scientist Visual) */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-primary-light uppercase text-xs font-bold tracking-wider">The ONPHARNO Advantage</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Why Partner With Us?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                We combine the technical rigor of a pharmaceutical contract manufacturer with the speed, innovation, and commercial responsiveness demanded by modern consumer health brands.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="bg-navy-800/80 p-5 rounded-2xl border border-navy-800">
                  <h4 className="font-bold text-white text-sm">Customized Private Label</h4>
                  <p className="text-xs text-gray-400 mt-1">Tailor-made supplement formulas designed to match your brand's exact specifications and market positioning.</p>
                </div>
                <div className="bg-navy-800/80 p-5 rounded-2xl border border-navy-800">
                  <h4 className="font-bold text-white text-sm">Certified Quality Standards</h4>
                  <p className="text-xs text-gray-400 mt-1">FSSAI, WHO-GMP, and ISO certified quality systems with complete batch testing and COA verification.</p>
                </div>
                <div className="bg-navy-800/80 p-5 rounded-2xl border border-navy-800">
                  <h4 className="font-bold text-white text-sm">End-to-End Capabilities</h4>
                  <p className="text-xs text-gray-400 mt-1">Formulation chemistry, dosage selection, stability trials, automated packaging, and regulatory dossiers.</p>
                </div>
                <div className="bg-navy-800/80 p-5 rounded-2xl border border-navy-800">
                  <h4 className="font-bold text-white text-sm">Global Export Focus</h4>
                  <p className="text-xs text-gray-400 mt-1">Serving clients in 15+ countries with full documentation, CTD dossier filing, and dependable shipping.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl transform scale-90" />
                <img
                  src="/images/scientist-pharmacist.png"
                  alt="ONPHARNO Quality Scientist"
                  className="relative z-10 max-h-[460px] w-auto object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/facility-highlights.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1H. Global Presence Across 15+ Countries & Counters */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Global Footprint</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-1">
              Global Presence Across 15+ Countries
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Our products are trusted by leading pharmaceutical distributors, healthcare brands, and wellness companies across North America, Europe, the Middle East, and Asia.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto my-8">
            <img
              src="/images/world-map.png"
              alt="Global Export Map"
              className="w-full h-auto object-contain opacity-90"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Animated Counters */}
          <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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

      {/* 1I. Featured Products with REAL PACKAGING PHOTOS */}
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Validated Ready Formulas</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-1">
                Featured Products & Formulations
              </h2>
              <p className="text-gray-600 text-sm mt-2 max-w-xl">
                Real product packaging examples available for contract manufacturing and immediate private label branding.
              </p>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-dark"
            >
              View All 70+ Formulations &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(products.length > 0 ? products.slice(0, 8) : [
              { name: 'MULTIVITAMIN GUMMIES', dosageForm: 'Gummies', healthCategory: 'Multivitamins Supplement', image: '/uploads/products/multivitamin-gummies.jpg', slug: 'multivitamin-gummies', moq: '15,000 Jars', desc: 'Complete daily nutritional support with Vitamin A, C, D3, E, and Zinc in pectin-based strawberry chewable gummies.' },
              { name: 'MELATONIN GUMMIES', dosageForm: 'Gummies', healthCategory: 'Stress Relief & Sleep Supplement', image: '/uploads/products/melatonin-gummies.jpg', slug: 'melatonin-gummies', moq: '15,000 Jars', desc: 'Non-habit forming natural sleep aid gummy with 5mg Melatonin, chamomile, and L-theanine.' },
              { name: 'SKIN GUMMIES', dosageForm: 'Gummies', healthCategory: 'Hair Skin and Nail Supplement', image: '/uploads/products/skin-gummies.jpg', slug: 'skin-gummies', moq: '15,000 Jars', desc: 'Dermal radiance gummy with L-Glutathione, Hyaluronic Acid, and Vitamin C for skin glow.' },
              { name: 'HAIR GUMMIES', dosageForm: 'Gummies', healthCategory: 'Hair Skin and Nail Supplement', image: '/uploads/products/hair-gummies.jpg', slug: 'hair-gummies', moq: '15,000 Jars', desc: 'Targeted hair and nail gummy packed with high-potency Biotin 10,000 mcg and Zinc.' },
              { name: 'CREATINE GUMMIES', dosageForm: 'Gummies', healthCategory: 'Energy & Gym Supplement', image: '/uploads/products/creatine-gummies.jpg', slug: 'creatine-gummies', moq: '15,000 Jars', desc: 'Ultra-convenient athletic workout gummies delivering 3000mg micronized Creatine Monohydrate.' },
              { name: 'APPLE CIDER VINEGAR EFFERVESCENT TABLET', dosageForm: 'Effervescent Tablets', healthCategory: 'Weight Loss Supplement', image: '/uploads/products/apple-cider-vinegar-effervescent-tablet.jpg', slug: 'apple-cider-vinegar-effervescent-tablet', moq: '10,000 Tubes', desc: 'Sparkling effervescent tablet with 500mg raw ACV with the Mother and Vitamin B12.' },
              { name: 'L CARNITINE SHOTS', dosageForm: 'Oral Shots', healthCategory: 'Energy & Gym Supplement', image: '/uploads/products/l-carnitine-shots.jpg', slug: 'l-carnitine-shots', moq: '25,000 Vials', desc: 'Ready-to-drink concentrated 25ml liquid shot delivering 3000mg pure L-Carnitine.' },
              { name: 'OMEGA 3 CAPSULES', dosageForm: 'Soft Gel Capsules', healthCategory: 'Heart Supplement', image: '/uploads/products/omega-3-capsules.webp', slug: 'omega-3-capsules', moq: '50,000 Softgels', desc: 'Triple strength molecularly distilled fish oil softgels delivering 1000mg with 360mg EPA / 240mg DHA.' },
            ]).map((p) => (
              <div
                key={p._id || p.slug}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="h-52 bg-white flex items-center justify-center p-4 relative border-b border-gray-100 overflow-hidden">
                  <img
                    src={p.images?.[0] || p.image || '/uploads/products/multivitamin-gummies.jpg'}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/logo.png';
                    }}
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/90 text-primary border border-primary/20 backdrop-blur-sm shadow-sm">
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
                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {p.description || p.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-gray-500">MOQ: {p.moq || '15,000'}</span>
                    <Link
                      to={`/products/${p.slug}`}
                      className="text-primary hover:underline flex items-center gap-1 font-bold"
                    >
                      Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1J. Scientific Articles & Insights */}
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
