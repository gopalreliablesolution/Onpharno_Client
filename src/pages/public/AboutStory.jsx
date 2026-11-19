import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import { getImageUrl } from '../../utils/imageUrl';
import {
  ArrowRight, MessageCircle, Sparkles, ShieldCheck, Lock, Globe,
  Search, FlaskConical, Layers, Factory, Package, Truck
} from 'lucide-react';

const toFaClass = (value) => {
  if (typeof value !== 'string') return '';
  const raw = value.trim();
  if (!raw) return '';
  if (/\b(fa-solid|fa-regular|fa-brands|fas|far|fab)\b/.test(raw)) return raw;
  return `fa-solid fa-${raw.replace(/^fa-/, '')}`;
};

const getStepFallbackIcon = (idx) => {
  switch (idx) {
    case 0: return Search;
    case 1: return FlaskConical;
    case 2: return Layers;
    case 3: return ShieldCheck;
    case 4: return Factory;
    case 5: return Package;
    case 6: return Truck;
    default: return Sparkles;
  }
};

// Used only when a section has never been saved in the admin.
const DEFAULTS = {
  about_hero: {
    eyebrow: 'Our Heritage & Vision',
    title1: 'More Than Manufacturing.',
    title2: 'A Partner in Building Better Healthcare Businesses.',
    subtitle:
      'We bring together scientific thinking, product expertise and scalable manufacturing to help businesses turn healthcare opportunities into market-ready solutions.',
    image: '',
  },
  about_philosophy: {
    eyebrow: 'The ONPHARNO Philosophy',
    title: "We Don't Just Manufacture Products. We Help Businesses Build Them.",
    paragraph1:
      'Modern healthcare brands face rising consumer expectations: cleaner labels, superior bio-absorption, faster onset of action, and distinctive packaging presentation. Generic contract manufacturers treat formulations as commodity powder pressing.',
    paragraph2:
      'At ONPHARNO, we engineer each dosage form around therapeutic viability and market success. Whether filling delicate oils alongside beadlets in a transparent liquid capsule or stabilizing sensitive botanicals, our team brings scientific discipline to every batch.',
    ctaText: 'Start Your Product Journey',
    ctaLink: '/contact',
    statValue: '500+',
    statLabel: 'Validated formulations successfully scaled for global brand partners.',
    image: '/images/about-us-image.webp',
    imageAlt: 'ONPHARNO Formulation Laboratories',
  },
  about_pillars: {
    title: 'The 4 Foundational Pillars',
    subtitle: 'Every formulation we manufacture is built upon these four core disciplines.',
    items: [
      { title: 'Science-Led Development', desc: 'Thoughtful formulations developed around evolving healthcare and consumer needs.', icon: 'fa-solid fa-wand-magic-sparkles' },
      { title: 'Quality-Driven Manufacturing', desc: 'Structured processes focused on consistency, reliability and product quality.', icon: 'fa-solid fa-shield-halved' },
      { title: 'End-to-End Capability', desc: 'From product concept and formulation through manufacturing, packaging and delivery.', icon: 'fa-solid fa-gears' },
      { title: 'Built for Partnership', desc: 'Flexible support for growing brands, established businesses and global partners.', icon: 'fa-solid fa-handshake' },
    ],
  },
  about_steps: {
    eyebrow: '2A2. FROM IDEA TO MARKET',
    title: 'From Idea to Market in 7 Seamless Steps',
    subtitle: 'A structured, de-risked pathway designed to bring breakthrough healthcare products to life.',
    bannerTheme: 'ocean',
    bannerBg: '',
    ctaEyebrow: 'READY TO START?',
    ctaTitle: "Let's discuss your formulation idea.",
    ctaDesc: 'Our technical formulation team will review your requirements under NDA.',
    ctaText: 'Start Your Product Journey',
    ctaLink: '/products',
    bannerImage: '/images/formulation-scientists-clean.png',
    trustPoint1: 'Your Ideas, Our Expertise',
    trustPoint2: 'Confidential & Secure',
    trustPoint3: 'End-to-End Support',
    items: [
      { num: '01', title: 'DISCOVER', desc: 'Understand your opportunity, category, Consumer and product requirements.', icon: 'fa-solid fa-magnifying-glass' },
      { num: '02', title: 'DEVELOP', desc: 'Select a relevant formulation or work towards a customized solution.', icon: 'fa-solid fa-flask-vial' },
      { num: '03', title: 'SELECT', desc: 'Evaluate the appropriate dosage form and product configuration.', icon: 'fa-solid fa-capsules' },
      { num: '04', title: 'FINALIZE', desc: 'Align formulation, specifications, packaging and commercial requirements.', icon: 'fa-solid fa-shield-halved' },
      { num: '05', title: 'MANUFACTURE', desc: 'Execute production through structured, quality-focused processes.', icon: 'fa-solid fa-industry' },
      { num: '06', title: 'PACKAGE', desc: 'Create practical, complaint and market-ready packaging solutions.', icon: 'fa-solid fa-box-open' },
      { num: '07', title: 'DELIVER', desc: 'Support reliable supply aligned with your market requirements.', icon: 'fa-solid fa-truck-fast' },
    ],
  },
  about_build: {
    eyebrow: 'Flexible Engagement Models',
    title1: 'Build With',
    title2: 'ONPHARNO',
    subtitle: 'Select the commercial development model that fits your brand roadmap.',
    bannerIcon: 'fa-solid fa-comments',
    bannerTitle: 'Not sure where to start?',
    bannerDesc: 'Speak directly with our Chief Formulation Officer and B2B Partnership leads.',
    bannerCtaText: 'START A CONVERSATION →',
    bannerCtaLink: 'https://wa.me/919876543210',
    bannerImage: '',
    items: [
      { icon: 'fa-solid fa-gauge-high', badge: 'Speed to Market', title: 'Ready-to-Launch Formulations', subtitle: 'Market-Tested Stability & Compliance', desc: 'Access over 500+ pre-validated, shelf-stable healthcare and nutraceutical formulations across 12 health categories for swift commercial rollout.', link: '/products', image: '' },
      { icon: 'fa-solid fa-flask', badge: 'R&D Innovation', title: 'Tailored Custom Development', subtitle: 'Bespoke Dosage Innovations', desc: 'Collaborate with our R&D formulation scientists to engineer proprietary multi-active combinations, novel release profiles, or signature aesthetics.', link: '/capabilities/product-development', image: '' },
      { icon: 'fa-solid fa-handshake', badge: 'Commercial Scale', title: 'Contract & Private Label Scale', subtitle: 'High-Volume Precision Manufacturing', desc: 'State-of-the-art cGMP automated manufacturing infrastructure capable of handling commercial batch scale with uncompromising quality compliance.', link: '/capabilities/manufacturing', image: '' },
    ],
  },
  about_partnership: {
    title: 'Built Around What Better Partnerships Need',
    subtitle: 'Six commitments that define our long-term client collaborations.',
    items: [
      { title: 'Quality Focus', desc: 'Zero-compromise pharmaceutical grade standards and multi-point analytical release testing.' },
      { title: 'Scientific Approach', desc: 'Bioavailability-first formulation engineering grounded in clinical pharmacology.' },
      { title: 'Reliable Supply', desc: 'Robust procurement channels, predictable lead times, and guaranteed batch-to-batch consistency.' },
      { title: 'Diverse Capability', desc: 'Specialized mastery in liquid-filled capsules, capsule-in-capsule, gummies, and effervescent.' },
      { title: 'Responsive Partnership', desc: 'Dedicated project managers and regulatory specialists who communicate with transparency.' },
      { title: 'Commercial Thinking', desc: 'Target cost-of-goods alignment, shelf differentiation, and market-ready packaging design.' },
    ],
  },
};

const AboutStory = () => {
  const { data: sectionsData } = useQuery({
    queryKey: ['about-story-sections'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/pages/about/sections?includeHidden=true');
        return res.data || [];
      } catch {
        return [];
      }
    },
  });
  const sections = sectionsData || [];

  const getRecord = (key) => sections.find((s) => s && s.key === key) || null;
  const isVisible = (key) => {
    const record = getRecord(key);
    return !record || record.visible !== false;
  };
  const data = (key) => {
    const record = getRecord(key);
    if (!record) return DEFAULTS[key];
    const saved = record.content && typeof record.content === 'object' ? record.content : {};
    return { ...DEFAULTS[key], ...saved, image: (record.image || '').toString().trim() };
  };
  const txt = (value) => (value ?? '').toString().trim();
  const itemsOf = (obj) => (Array.isArray(obj?.items) ? obj.items.filter((i) => i && (txt(i.title) || txt(i.num) || txt(i.desc) || txt(i.value))) : []);
  const has = (obj, fields) => fields.some((f) => txt(obj?.[f]));

  const hero = data('about_hero');
  const heroImage = txt(hero.image);
  const philosophy = data('about_philosophy');
  const pillars = data('about_pillars');
  const steps = data('about_steps');
  const build = data('about_build');
  const buildHeading1 = txt(build.title1) || txt(build.title).replace(/\s*ONPHARNO\s*$/i, '').trim();
  const buildHeading2 = txt(build.title2) || (/ONPHARNO/i.test(txt(build.title)) ? 'ONPHARNO' : '');
  const buildBannerIcon = toFaClass(build.bannerIcon);
  const partnership = data('about_partnership');

  const philosophyImage = txt(philosophy.image) || DEFAULTS.about_philosophy.image;

  const renderBannerLink = (link, text) => {
    if (!link || !text) return null;
    if (/^https?:\/\//i.test(link)) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 bg-emerald-600 text-white text-xs font-bold px-5 sm:px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 text-center whitespace-normal sm:whitespace-nowrap w-full sm:w-auto">
          <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" /> <span>{text}</span>
        </a>
      );
    }
    return (
      <Link to={link} className="group inline-flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold px-5 sm:px-6 py-3 rounded-xl shadow-md hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 text-center whitespace-normal sm:whitespace-nowrap w-full sm:w-auto">
        <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" /> <span>{text}</span>
      </Link>
    );
  };

  return (
    <>
      <SEO
        title="Our Story - More Than Manufacturing | ONPHARNO"
        description="More Than Manufacturing. A Partner in Building Better Healthcare Businesses. Discover ONPHARNO's science-led approach and 7-step idea-to-market pathway."
      />

      {/* HERO */}
      {isVisible('about_hero') && (has(hero, ['eyebrow', 'title1', 'title2', 'subtitle']) || heroImage) && (
        <div className="bg-navy text-white py-14 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-dark-gradient opacity-90 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className={`grid grid-cols-1 ${heroImage ? 'lg:grid-cols-2 gap-12 items-center' : ''}`}>
              <div className={heroImage ? '' : 'max-w-3xl'}>
                {txt(hero.eyebrow) && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
                    {txt(hero.eyebrow)}
                  </span>
                )}
                {txt(hero.title1) && (
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">{txt(hero.title1)}</h1>
                )}
                {txt(hero.title2) && (
                  <p className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight mt-1 text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">
                    {txt(hero.title2)}
                  </p>
                )}
                {txt(hero.subtitle) && (
                  <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">{txt(hero.subtitle)}</p>
                )}
              </div>
              {heroImage && (
                <img
                  src={getImageUrl(heroImage)}
                  alt={txt(hero.imageAlt) || 'ONPHARNO'}
                  className="w-full h-auto max-h-[280px] sm:max-h-[380px] lg:max-h-[440px] object-contain rounded-2xl shadow-xl"
                  onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* PHILOSOPHY */}
      {isVisible('about_philosophy') && (has(philosophy, ['eyebrow', 'title', 'paragraph1', 'paragraph2', 'ctaText', 'statValue']) || philosophyImage) && (
        <div className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {txt(philosophy.eyebrow) && (
                  <span className="text-xs font-bold text-primary uppercase tracking-widest block">{txt(philosophy.eyebrow)}</span>
                )}
                {txt(philosophy.title) && (
                  <h2 className="text-3xl font-bold text-charcoal leading-snug">{txt(philosophy.title)}</h2>
                )}
                {[philosophy.paragraph1, philosophy.paragraph2].filter((p) => txt(p)).map((p, i) => (
                  <p key={i} className="text-sm sm:text-base text-gray-600 leading-relaxed">{txt(p)}</p>
                ))}
                {txt(philosophy.ctaText) && txt(philosophy.ctaLink) && (
                  <div className="pt-2">
                    <Link to={txt(philosophy.ctaLink)} className="group inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300">
                      <span>{txt(philosophy.ctaText)}</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                )}
              </div>

              {philosophyImage && (
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <img
                      src={getImageUrl(philosophyImage)}
                      alt={txt(philosophy.imageAlt) || 'ONPHARNO'}
                      className="w-full h-[450px] object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/manufacturing-facility.jpg'; }}
                    />
                  </div>
                  {(txt(philosophy.statValue) || txt(philosophy.statLabel)) && (
                    <div className="absolute -bottom-6 -left-6 bg-navy text-white p-6 rounded-2xl shadow-xl max-w-xs border border-gray-800 hidden sm:block">
                      {txt(philosophy.statValue) && <p className="text-2xl font-bold text-primary">{txt(philosophy.statValue)}</p>}
                      {txt(philosophy.statLabel) && <p className="text-xs text-gray-300 mt-1">{txt(philosophy.statLabel)}</p>}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PILLARS */}
      {isVisible('about_pillars') && (has(pillars, ['title', 'subtitle']) || itemsOf(pillars).length > 0) && (
        <div className="py-12 sm:py-16 bg-warm/50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(txt(pillars.title) || txt(pillars.subtitle)) && (
              <div className="text-center max-w-2xl mx-auto mb-12">
                {txt(pillars.title) && <h2 className="text-2xl font-bold text-charcoal">{txt(pillars.title)}</h2>}
                {txt(pillars.subtitle) && <p className="text-xs text-gray-500 mt-2">{txt(pillars.subtitle)}</p>}
              </div>
            )}
            {itemsOf(pillars).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {itemsOf(pillars).map((item, idx) => {
                  const iconClass = toFaClass(item.icon);
                  return (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      {iconClass && (
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                          <i className={iconClass} aria-hidden="true" />
                        </div>
                      )}
                      {txt(item.title) && <h3 className="font-bold text-base text-charcoal">{txt(item.title)}</h3>}
                      {txt(item.desc) && <p className="text-xs text-gray-600 mt-2 leading-relaxed">{txt(item.desc)}</p>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEPS — Redesigned 7-Step Idea to Market Showcase (Mockup Matched & CMS-Managed) */}
      {isVisible('about_steps') && (has(steps, ['eyebrow', 'title', 'subtitle', 'ctaTitle', 'ctaText', 'bannerImage']) || itemsOf(steps).length > 0) && (() => {
        const bannerTheme = txt(steps.bannerTheme) || 'terracotta';
        const customBg = txt(steps.bannerBg);
        const bannerStyle = customBg ? { background: customBg } : undefined;
        const bannerClass = customBg
          ? 'border-white/15 shadow-2xl'
          : bannerTheme === 'navy'
          ? 'bg-gradient-to-r from-[#0B1528] via-[#0F1E36] to-[#0B1528] border-white/10 shadow-2xl'
          : bannerTheme === 'ocean'
          ? 'bg-gradient-to-r from-[#002b4d] via-[#004269] to-[#00608a] border-[#00d2b4]/30 shadow-2xl'
          : 'bg-gradient-to-r from-[#D85430] via-[#C44624] to-[#9E3518] border-[#FED7AA]/30 shadow-2xl';

        return (
          <div className="py-12 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Header */}
              {(txt(steps.eyebrow) || txt(steps.title) || txt(steps.subtitle)) && (
                <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                  {txt(steps.eyebrow) && (
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF4EC] border border-[#FED7AA] mb-3">
                      <span className="text-[11px] sm:text-xs font-bold text-primary tracking-wider uppercase">
                        {txt(steps.eyebrow)}
                      </span>
                    </div>
                  )}
                  {txt(steps.title) && (
                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-charcoal tracking-tight leading-tight">
                      {txt(steps.title).includes('7 Seamless Steps') ? (
                        <>
                          {txt(steps.title).split('7 Seamless Steps')[0]}
                          <span className="text-primary">7 Seamless Steps</span>
                          {txt(steps.title).split('7 Seamless Steps')[1]}
                        </>
                      ) : (
                        txt(steps.title)
                      )}
                    </h2>
                  )}
                  {txt(steps.subtitle) && (
                    <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed max-w-2xl mx-auto">
                      {txt(steps.subtitle)}
                    </p>
                  )}
                </div>
              )}

              {/* 7 Step Cards: 4 on Row 1, 3 Centered on Row 2 (Balanced 4-Column Responsive Layout) */}
              {itemsOf(steps).length > 0 && (
                <div className="flex flex-wrap justify-center gap-5 sm:gap-6 pt-4">
                  {itemsOf(steps).map((s, idx) => {
                    const iconClass = toFaClass(s.icon);
                    const FallbackIcon = getStepFallbackIcon(idx);
                    const rawTitle = txt(s.title) || '';
                    const cleanTitle = rawTitle.replace(/^\d+[\s\.\—\–\-]+/, '').trim() || rawTitle;

                    return (
                      <div
                        key={idx}
                        className="relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-primary/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                      >
                        {/* Floating Top Number Badge - Upper Side Box Number */}
                        <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shadow-md mx-auto -mt-10 mb-2 border-2 border-white shrink-0">
                          {txt(s.num) || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`)}
                        </div>

                        {/* Ambient Center Icon Bubble - No Color Inversion/Blending on Hover */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-[#FFF8F3] to-[#FFF0E6] border border-[#FED7AA] flex items-center justify-center mx-auto text-primary group-hover:scale-105 group-hover:shadow-md group-hover:border-primary/40 group-hover:ring-4 group-hover:ring-primary/10 transition-all duration-300 shadow-xs mt-1">
                          {iconClass ? (
                            <i className={`${iconClass} text-2xl sm:text-3xl text-primary`} aria-hidden="true" />
                          ) : (
                            <FallbackIcon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                          )}
                        </div>

                        {/* Step Title - Clean Name (Number is on Top Badge) */}
                        {cleanTitle && (
                          <h3 className="font-bold text-sm sm:text-base text-charcoal tracking-wide uppercase text-center mt-5 group-hover:text-primary transition-colors">
                            {cleanTitle}
                          </h3>
                        )}

                        {/* Step Description */}
                        {txt(s.desc) && (
                          <p className="text-xs sm:text-[13px] text-gray-500 text-center mt-2.5 leading-relaxed flex-1">
                            {txt(s.desc)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bottom Panoramic Formulation Banner (Mockup Matched Seamless Layout) */}
              {(txt(steps.ctaTitle) || txt(steps.ctaDesc) || txt(steps.ctaText) || steps.bannerImage) && (
                <div
                  style={bannerStyle}
                  className={`mt-14 lg:mt-18 relative rounded-3xl overflow-hidden text-white ${bannerClass}`}
                >
                  {/* Ambient Glow Circles */}
                  <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none bg-white/10" />
                  <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none bg-black/20" />

                  {/* Right-Side Full-Bleed Scientist Laboratory Photo (Integrated with Silky Alpha Mask) */}
                  {steps.bannerImage ? (
                    <div
                      className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 lg:w-7/12 pointer-events-none overflow-hidden"
                      style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.85) 55%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.85) 55%, black 100%)',
                      }}
                    >
                      <img
                        src={getImageUrl(steps.bannerImage)}
                        alt={txt(steps.ctaTitle) || 'ONPHARNO Formulation Laboratories'}
                        className="w-full h-full object-cover object-center lg:object-right"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/formulation-scientists-clean.png';
                        }}
                      />
                      {/* Gentle warm tint overlay to harmonize photo colors with terracotta */}
                      <div className="absolute inset-0 bg-[#D85430]/15 mix-blend-multiply pointer-events-none" />
                    </div>
                  ) : null}

                  {/* Left-Side Content Container */}
                  <div className="relative z-10 p-8 sm:p-10 lg:p-12 max-w-xl lg:max-w-2xl space-y-4">
                    {/* Eyebrow Badge */}
                    {txt(steps.ctaEyebrow) && (
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white border border-white/40 backdrop-blur-sm shadow-xs">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        <span>{txt(steps.ctaEyebrow)}</span>
                      </div>
                    )}

                    {/* Heading */}
                    {txt(steps.ctaTitle) && (
                      <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white leading-tight tracking-tight">
                        {txt(steps.ctaTitle).includes('formulation idea') ? (
                          <>
                            {txt(steps.ctaTitle).split('formulation idea')[0]}
                            <span className="underline decoration-white/60 decoration-2 underline-offset-4">
                              formulation idea
                            </span>
                            {txt(steps.ctaTitle).split('formulation idea')[1]}
                          </>
                        ) : (
                          txt(steps.ctaTitle)
                        )}
                      </h3>
                    )}

                    {/* Description */}
                    {txt(steps.ctaDesc) && (
                      <p className="text-white/95 text-xs sm:text-sm leading-relaxed max-w-lg font-normal">
                        {txt(steps.ctaDesc)}
                      </p>
                    )}

                    {/* Trust Badges - Clean Spacious Row */}
                    {(txt(steps.trustPoint1) || txt(steps.trustPoint2) || txt(steps.trustPoint3)) && (
                      <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-[13px] text-white">
                        {txt(steps.trustPoint1) && (
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-white shrink-0 drop-shadow-xs" />
                            <span className="font-semibold text-white/95">{txt(steps.trustPoint1)}</span>
                          </div>
                        )}
                        {txt(steps.trustPoint2) && (
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-white shrink-0 drop-shadow-xs" />
                            <span className="font-semibold text-white/95">{txt(steps.trustPoint2)}</span>
                          </div>
                        )}
                        {txt(steps.trustPoint3) && (
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-white shrink-0 drop-shadow-xs" />
                            <span className="font-semibold text-white/95">{txt(steps.trustPoint3)}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* CTA Button - Crisp White High-Contrast Button */}
                    {txt(steps.ctaText) && txt(steps.ctaLink) && (
                      <div className="pt-3">
                        <Link
                          to={txt(steps.ctaLink)}
                          className="inline-flex items-center gap-2.5 bg-white hover:bg-[#FFF4EC] text-[#B83E1F] hover:text-[#942C14] font-black px-8 py-3.5 rounded-full text-xs sm:text-sm shadow-xl shadow-black/15 hover:shadow-black/25 hover:scale-105 transition-all"
                        >
                          <span>{txt(steps.ctaText)}</span>
                          <ArrowRight className="w-4 h-4 text-[#B83E1F]" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* BUILD WITH ONPHARNO */}
      {isVisible('about_build') && (has(build, ['eyebrow', 'title1', 'title2', 'title', 'subtitle', 'bannerTitle', 'bannerCtaText']) || itemsOf(build).length > 0) && (
        <div className="relative py-12 sm:py-20 bg-gradient-to-b from-[#FFF6F0] to-white overflow-hidden">
          <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-primary/5 pointer-events-none" />
          <div className="absolute -top-12 right-0 w-80 h-80 rounded-full bg-primary/5 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(txt(build.eyebrow) || buildHeading1 || buildHeading2 || txt(build.subtitle)) && (
              <div className="text-center max-w-3xl mx-auto mb-14">
                {txt(build.eyebrow) && (
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="h-px w-16 bg-primary/40" />
                    <span className="px-4 py-1 rounded-full border border-primary/40 bg-white/70 text-[11px] font-bold uppercase tracking-wider text-primary">
                      {txt(build.eyebrow)}
                    </span>
                    <span className="h-px w-16 bg-primary/40" />
                  </div>
                )}
                {(buildHeading1 || buildHeading2) && (
                  <h2 className="text-3xl sm:text-4xl font-bold text-charcoal">
                    {buildHeading1} {buildHeading2 && <span className="text-primary">{buildHeading2}</span>}
                  </h2>
                )}
                {txt(build.subtitle) && <p className="text-sm text-gray-500 mt-3">{txt(build.subtitle)}</p>}
              </div>
            )}
            {itemsOf(build).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {itemsOf(build).map((opt, idx) => {
                  const iconClass = toFaClass(opt.icon);
                  const cardImage = txt(opt.image);
                  return (
                    <div key={idx} className="group relative bg-white p-6 sm:p-8 rounded-3xl border border-orange-100 shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      {cardImage && (
                        <div
                          className="absolute inset-0 opacity-20 bg-cover bg-right pointer-events-none"
                          style={{ backgroundImage: `url("${getImageUrl(cardImage)}")` }}
                        />
                      )}
                      <div className="relative">
                        {(iconClass || txt(opt.badge)) && (
                          <div className="flex items-center gap-3 mb-4">
                            {iconClass && (
                              <span className="w-11 h-11 rounded-full bg-orange-50 text-primary flex items-center justify-center shrink-0">
                                <i className={iconClass} aria-hidden="true" />
                              </span>
                            )}
                            {txt(opt.badge) && (
                              <span className="px-3 py-1 rounded-full bg-orange-50 text-primary text-[11px] font-semibold">{txt(opt.badge)}</span>
                            )}
                          </div>
                        )}
                        {txt(opt.title) && <h3 className="text-lg sm:text-xl font-bold text-charcoal">{txt(opt.title)}</h3>}
                        {txt(opt.subtitle) && <p className="text-xs font-medium text-primary mt-1">{txt(opt.subtitle)}</p>}
                        {txt(opt.desc) && <p className="text-xs text-gray-600 mt-4 leading-relaxed">{txt(opt.desc)}</p>}
                      </div>
                      {txt(opt.link) && (
                        <div className="relative pt-6 mt-6 border-t border-orange-100 flex items-center">
                          <Link to={txt(opt.link)} className="group/link inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark whitespace-nowrap">
                            <span>Learn More</span> <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {(txt(build.bannerTitle) || txt(build.bannerDesc) || txt(build.bannerCtaText) || txt(build.bannerImage)) && (
              <div className="relative mt-10 rounded-3xl border border-orange-200 bg-white/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden shadow-sm">
                <div className="flex items-center gap-4 relative">
                  {buildBannerIcon && (
                    <span className="w-12 h-12 rounded-full bg-orange-50 text-primary flex items-center justify-center shrink-0">
                      <i className={buildBannerIcon} aria-hidden="true" />
                    </span>
                  )}
                  <div>
                    {txt(build.bannerTitle) && <h4 className="text-lg font-bold text-charcoal">{txt(build.bannerTitle)}</h4>}
                    {txt(build.bannerDesc) && <p className="text-xs text-gray-500 mt-1">{txt(build.bannerDesc)}</p>}
                  </div>
                </div>
                <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  {renderBannerLink(txt(build.bannerCtaLink), txt(build.bannerCtaText))}
                  {txt(build.bannerImage) && (
                    <img
                      src={getImageUrl(txt(build.bannerImage))}
                      alt=""
                      className="h-16 sm:h-20 w-auto max-w-full sm:max-w-[220px] object-contain"
                      onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PARTNERSHIP COMMITMENTS */}
      {isVisible('about_partnership') && (has(partnership, ['title', 'subtitle']) || itemsOf(partnership).length > 0) && (
        <div className="py-12 sm:py-20 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(txt(partnership.title) || txt(partnership.subtitle)) && (
              <div className="text-center max-w-2xl mx-auto mb-14">
                {txt(partnership.title) && <h2 className="text-3xl font-bold text-charcoal">{txt(partnership.title)}</h2>}
                {txt(partnership.subtitle) && <p className="text-xs text-gray-500 mt-2">{txt(partnership.subtitle)}</p>}
              </div>
            )}
            {itemsOf(partnership).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itemsOf(partnership).map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-warm/40 border border-gray-200 space-y-2">
                    {txt(item.title) && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        <h3 className="font-bold text-sm text-charcoal">{txt(item.title)}</h3>
                      </div>
                    )}
                    {txt(item.desc) && <p className="text-xs text-gray-600 leading-relaxed pl-6">{txt(item.desc)}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AboutStory;
