import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../api/client';
import SEO from '../../components/common/SEO';
import { getImageUrl, handleImageError } from '../../utils/imageUrl';
import {
  ArrowRight, ChevronRight, ChevronLeft, Check,
  FlaskConical, Layers, ShieldCheck, Workflow, Settings, Handshake, Users,
  Search, Lightbulb, SlidersHorizontal, FileCheck, Factory, Package, Truck
} from 'lucide-react';
import CapsuleAnimation from '../../components/common/CapsuleAnimation';
import { useSettings } from '../../context/SettingsContext';

// TEMPORARY: set to true to bring back the "Nutraceutical Products By Dosage Forms" section.
// All of its code and CMS data stay intact while it is hidden.
const SHOW_DOSAGE_FORMS_SECTION = false;

// Accepts either a full Font Awesome class ("fa-solid fa-flask") or just an icon
// name ("flask") and always returns a usable class string.
const toFontAwesomeClass = (value) => {
  if (typeof value !== 'string') return '';
  const raw = value.trim();
  if (!raw) return '';
  if (/\b(fa-solid|fa-regular|fa-brands|fas|far|fab)\b/.test(raw)) return raw;
  return `fa-solid fa-${raw.replace(/^fa-/, '')}`;
};

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeSignaturePhase, setActiveSignaturePhase] = useState(0);
  const { settings } = useSettings();

  // Fetch Active Banners from CMS
  const { data: bannersData } = useQuery({
    queryKey: ['active-banners'],
    queryFn: async () => {
      const res = await apiClient.get('/banners/active');
      return res.data || [];
    },
  });

  // Featured products (kept for potential future/compat use)
  const { data: productsData } = useQuery({
    queryKey: ['featured-products-home'],
    queryFn: async () => {
      const res = await apiClient.get('/products/featured');
      return res.data || [];
    },
  });

  // Blogs (for 1I)
  const { data: blogsData } = useQuery({
    queryKey: ['home-blogs'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/blogs');
        return res.data || [];
      } catch {
        return [];
      }
    },
  });

  // Home page CMS sections (e.g. 1B About)
  const { data: homeSectionsData } = useQuery({
    queryKey: ['home-sections'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/pages/home/sections?includeHidden=true');
        return res.data || [];
      } catch {
        return [];
      }
    },
  });

  const banners = bannersData || [];
  const products = productsData || [];
  const blogs = blogsData || [];
  const homeSections = homeSectionsData || [];

  // 1A. Hero 4-5 Banners (as per doc)
  const fallbackBanners = [
    {
      eyebrow: 'SCIENCE-DRIVEN HEALTHCARE SOLUTIONS',
      title: 'Your Trusted Partner for Healthcare Innovation & Manufacturing.',
      subtitle:
        'From market-ready formulations to custom product development, ONPHARNO partners with businesses to build high-quality pharmaceutical and nutraceutical solutions for modern markets.',
      cta1Text: 'Explore Our Products',
      cta1Link: '/products',
      cta2Text: 'Partner With Us',
      cta2Link: '/partner/global-partnerships',
      imageDesktop: '/images/hero-banner-1.jpg',
      imageMobile: '/images/hero-banner-1.jpg',
      badge: 'Science-Driven Healthcare Solutions',
    },
    {
      eyebrow: 'PRIVATE LABEL SOLUTIONS',
      title: 'Your Brand. Our Healthcare Expertise.',
      subtitle:
        'Build your pharmaceutical or nutraceutical portfolio with the support of ONPHARNO—from product selection and formulation to manufacturing and packaging.',
      cta1Text: 'Explore Private Label',
      cta1Link: '/partner/distribution-partnerships',
      cta2Text: '',
      cta2Link: '',
      imageDesktop: '/images/hero-banner-2.jpg',
      imageMobile: '/images/hero-banner-2.jpg',
      badge: 'Private Label Solutions',
    },
    {
      eyebrow: 'CONTRACT MANUFACTURING',
      title: 'From Product Requirement to Commercial Reality.',
      subtitle:
        'Structured manufacturing solutions designed to support healthcare businesses with quality-focused processes and flexible product opportunities.',
      cta1Text: 'Discuss Manufacturing',
      cta1Link: '/capabilities/manufacturing',
      cta2Text: '',
      cta2Link: '',
      imageDesktop: '/images/hero-banner-3.jpg',
      imageMobile: '/images/hero-banner-3.jpg',
      badge: 'Contract Manufacturing',
    },
    {
      eyebrow: 'CUSTOM PRODUCT DEVELOPMENT',
      title: "Have an Idea? Let's Build the Right Product.",
      subtitle:
        'Turn a market opportunity into a defined healthcare solution through formulation development, format selection and commercial product planning.',
      cta1Text: 'Start Your Product Journey',
      cta1Link: '/contact',
      cta2Text: '',
      cta2Link: '',
      imageDesktop: '/images/facility-highlights.jpg',
      imageMobile: '/images/facility-highlights.jpg',
      badge: 'Product Development',
    },
    {
      eyebrow: 'GLOBAL BUSINESS',
      title: 'Building Healthcare Partnerships Beyond Borders.',
      subtitle:
        'Explore product, private-label, manufacturing and distribution opportunities designed around your market.',
      cta1Text: 'Explore Global Partnerships',
      cta1Link: '/partner/global-partnerships',
      cta2Text: '',
      cta2Link: '',
      imageDesktop: '/images/export-cargo.jpg',
      imageMobile: '/images/world-map.png',
      badge: 'Global Partnerships',
    },
  ];

  const activeBanners = banners.length > 0 ? banners : fallbackBanners;
  const current = activeBanners[currentBanner] || activeBanners[0];

  const getBannerImage = (b, isMobile = false) => {
    if (!b) return '';
    const raw = isMobile ? b.imageMobile || b.imageDesktop : b.imageDesktop;
    if (typeof raw === 'string' && raw.trim() !== '' && !raw.includes('logo.png')) {
      return getImageUrl(raw.trim());
    }
    return '';
  };

  const trustPointsList = (current?.trustPoints || '')
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  useEffect(() => {
    if (currentBanner >= activeBanners.length) setCurrentBanner(0);
  }, [activeBanners.length, currentBanner]);

  const prevBanner = () => setCurrentBanner((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % activeBanners.length);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 45;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextBanner();
    else if (distance < -minSwipeDistance) prevBanner();
  };

  // 1D. From Idea to Market (CMS-managed, golden rule: empty => not shown)
  const defaultIdeaToMarketSteps = [
    { num: '01', title: 'DISCOVER', desc: 'Understand your opportunity, category, consumer and product requirements.', icon: Search },
    { num: '02', title: 'DEVELOP', desc: 'Select a relevant formulation or work towards a customized solution.', icon: Lightbulb },
    { num: '03', title: 'SELECT', desc: 'Evaluate the appropriate dosage form and product configuration.', icon: SlidersHorizontal },
    { num: '04', title: 'FINALIZE', desc: 'Align formulation, specifications, packaging and commercial requirements.', icon: FileCheck },
    { num: '05', title: 'MANUFACTURE', desc: 'Execute production through structured, quality-focused processes.', icon: Factory },
    { num: '06', title: 'PACKAGE', desc: 'Create practical, compliant and market-ready packaging solutions.', icon: Package },
    { num: '07', title: 'DELIVER', desc: 'Support reliable supply aligned with your market requirements.', icon: Truck },
  ];
  const home7StepsSection = homeSections.find((s) => s.key === 'home_7_steps');
  const ideaEyebrow = ((home7StepsSection?.content?.eyebrow ?? (home7StepsSection ? '' : 'How It Works')) || '').toString().trim();
  const ideaTitle = ((home7StepsSection?.title ?? (home7StepsSection ? '' : 'FROM IDEA TO MARKET')) || '').toString().trim();
  const ideaSubtitle = ((home7StepsSection?.subtitle ?? (home7StepsSection ? '' : 'A structured journey from product opportunity to reliable market delivery.')) || '').toString().trim();
  const ideaCtaText = ((home7StepsSection?.content?.ctaText ?? (home7StepsSection ? '' : 'Start Your Product Journey')) || '').toString().trim();
  const ideaCtaLink = ((home7StepsSection?.content?.ctaLink ?? (home7StepsSection ? '' : '/contact')) || '').toString().trim();
  const ideaImage = (home7StepsSection?.image ?? '').toString().trim();
  const cmsIdeaSteps = Array.isArray(home7StepsSection?.content?.steps) ? home7StepsSection.content.steps : null;
  const ideaToMarketSteps = cmsIdeaSteps
    ? cmsIdeaSteps
        .map((st) => ({
          num: (st?.num ?? '').toString().trim(),
          title: (st?.title ?? '').toString().trim(),
          desc: (st?.desc ?? '').toString().trim(),
          icon: toFontAwesomeClass(st?.icon ?? ''),
        }))
        .filter((st) => st.title || st.desc || st.num)
    : home7StepsSection
    ? []
    : defaultIdeaToMarketSteps.map((st) => ({ ...st, icon: st.icon }));
  const showIdeaToMarketSection =
    !home7StepsSection || home7StepsSection.visible !== false
      ? (home7StepsSection
          ? (ideaEyebrow || ideaTitle || ideaSubtitle || ideaToMarketSteps.length > 0 || (ideaCtaText && ideaCtaLink))
          : true)
      : false;

  const cmsText = (section, value, fallback) => (section ? (value ?? '').toString().trim() : fallback);
  const sectionContent = (section) =>
    section && typeof section.content === 'object' && section.content !== null ? section.content : {};

  // 1E. Healthcare Solutions — CMS-managed 3x4 category grid
  const healthSection = homeSections.find((s) => s.key === 'home_health_categories');
  const healthContent = sectionContent(healthSection);
  const healthEyebrow = cmsText(healthSection, healthContent.eyebrow, 'Healthcare Solutions');
  const healthTitle = cmsText(healthSection, healthSection?.title, 'Healthcare Solutions across Growing Categories.');
  const healthSubtitle = cmsText(
    healthSection,
    healthSection?.subtitle,
    'Explore product opportunities designed around evolving healthcare, wellness and nutrition needs.'
  );
  const healthCtaText = cmsText(healthSection, healthContent.ctaText, 'Explore All Categories');
  const healthCtaLink = cmsText(healthSection, healthContent.ctaLink, '/products/by-health-category');
  const defaultHealthCategoryTitles = [
    'Daily Wellness',
    "Men's Health",
    "Women's Health",
    'Beauty Nutrition',
    'Sports Nutrition',
    'Healthy Ageing',
    'Gut Health',
    'Immunity',
    'Bone & Joint',
    'Brain Health',
    'Sleep & Stress',
    'Specialized Nutrition',
  ];
  const defaultHealthCategoryCards = defaultHealthCategoryTitles.map((title) => ({
    title,
    link: `/products/by-health-category?category=${encodeURIComponent(title)}`,
    image: '',
    imageAlt: '',
  }));
  const cmsHealthCards = Array.isArray(healthContent.categories) ? healthContent.categories : null;
  const healthCategoryCards = (cmsHealthCards ?? defaultHealthCategoryCards)
    .map((cat) => {
      const title = (cat?.title ?? '').toString().trim();
      return {
        title,
        link: (cat?.link ?? '').toString().trim(),
        image: (cat?.image ?? '').toString().trim(),
        char: (cat?.char ?? '').toString().trim(),
        imageAlt: (cat?.imageAlt ?? '').toString().trim(),
      };
    })
    .filter((cat) => cat.title);
  const showHealthSection =
    !healthSection || healthSection.visible !== false
      ? healthSection
        ? healthEyebrow ||
          healthTitle ||
          healthSubtitle ||
          healthCategoryCards.length > 0 ||
          (healthCtaText && healthCtaLink)
        : true
      : false;

  // 1E (continued). Dosage Forms — CMS-managed
  const dosageSection = homeSections.find((s) => s.key === 'home_dosage_forms');
  const dosageContent = sectionContent(dosageSection);
  const dosageEyebrow = cmsText(dosageSection, dosageContent.eyebrow, 'Dosage Forms');
  const dosageTitle = cmsText(dosageSection, dosageSection?.title, 'Nutraceutical Products By Dosage Forms');
  const dosageTagline = cmsText(
    dosageSection,
    dosageContent.tagline,
    'The Right Format Can Define the Product Experience.'
  );
  const dosageSubtitle = cmsText(
    dosageSection,
    dosageSection?.subtitle,
    'Different healthcare opportunities require different ways of delivering value. ONPHARNO supports a range of nutraceutical product formats, helping businesses choose the right format for their category, consumer and market requirements.'
  );
  const featuredBadge = cmsText(dosageSection, dosageContent.featuredBadge, 'Featured Format');
  const featuredTitle = cmsText(dosageSection, dosageContent.featuredTitle, 'LIQUID-FILLED HARD CAPSULES');
  const featuredSubtitle = cmsText(
    dosageSection,
    dosageContent.featuredSubtitle,
    'ONPHARNO SIGNATURE CAPABILITY'
  );
  const featuredDesc = cmsText(
    dosageSection,
    dosageContent.featuredDesc,
    'A distinctive dosage-form opportunity for compatible liquid and semi-liquid formulations, designed around product differentiation and development thinking.'
  );
  const featuredCtaText = cmsText(dosageSection, dosageContent.featuredCtaText, 'EXPLORE');
  const featuredCtaLink = cmsText(
    dosageSection,
    dosageContent.featuredCtaLink,
    '/products/liquid-filled-hard-capsules'
  );
  const cmsFeaturedSteps = Array.isArray(dosageContent.featuredSteps) ? dosageContent.featuredSteps : null;
  const featuredSteps = (cmsFeaturedSteps ?? [
    { title: 'Hard Capsule Shell' },
    { title: 'Liquid / Semi-Liquid Fill' },
    { title: 'Finished Capsule' },
  ])
    .map((s) => (s?.title ?? '').toString().trim())
    .filter(Boolean);
  const defaultDosageFormTitles = [
    'Liquid filled capsules',
    'Tablets',
    'Capsules',
    'Softgels',
    'Effervescent',
    'Sachets',
    'Powders',
    'Gummies',
    'Liquids & Syrups',
    'Oral Shots',
  ];
  const defaultDosageForms = defaultDosageFormTitles.map((name) => ({
    name,
    link: `/products/by-dosage-form?format=${encodeURIComponent(name)}`,
    image: '',
  }));
  const cmsForms = Array.isArray(dosageContent.forms) ? dosageContent.forms : null;
  const dosageForms = (cmsForms ?? defaultDosageForms)
    .map((f) => {
      const name = (f?.name ?? '').toString().trim();
      return {
        name,
        link: (f?.link ?? '').toString().trim(),
        image: (f?.image ?? '').toString().trim(),
      };
    })
    .filter((f) => f.name);
  const dosageCtaText = cmsText(dosageSection, dosageContent.ctaText, 'Explore Product Formats');
  const dosageCtaLink = cmsText(dosageSection, dosageContent.ctaLink, '/capabilities/product-formats');
  const showDosageSection =
    SHOW_DOSAGE_FORMS_SECTION &&
    (!dosageSection || dosageSection.visible !== false)
      ? dosageSection
        ? dosageEyebrow ||
          dosageTitle ||
          dosageTagline ||
          dosageSubtitle ||
          dosageForms.length > 0
        : true
      : false;

  // 1H. Certifications & Evidence — CMS-managed stats
  const certificationsSection = homeSections.find((s) => s.key === 'home_certifications');
  const certificationsContent = sectionContent(certificationsSection);
  const certEyebrow = cmsText(certificationsSection, certificationsContent.eyebrow, 'Certifications');
  const certTitle = cmsText(
    certificationsSection,
    certificationsSection?.title,
    'Built on Capability. Measured by Evidence.'
  );
  const certSubtitle = cmsText(certificationsSection, certificationsSection?.subtitle, '');
  const certParagraphs = certSubtitle
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const certCtaText = cmsText(certificationsSection, certificationsContent.ctaText, 'View Certifications');
  const certCtaLink = cmsText(certificationsSection, certificationsContent.ctaLink, '/resources/certifications');
  const defaultCertificationStats = [
    { value: '500+', label: 'Products & Formulations' },
    { value: '20+', label: 'Business Partners' },
    { value: '10+', label: 'Countries' },
    { value: '10+', label: 'Product Categories' },
    { value: '12+', label: 'Years of Experience' },
  ];
  const cmsStats = Array.isArray(certificationsContent.stats) ? certificationsContent.stats : null;
  const certStats = (cmsStats ?? defaultCertificationStats)
    .map((s) => ({
      value: (s?.value ?? '').toString().trim(),
      label: (s?.label ?? '').toString().trim(),
    }))
    .filter((s) => s.value || s.label);
  const showCertificationsSection =
    !certificationsSection || certificationsSection.visible !== false
      ? certificationsSection
        ? certEyebrow ||
          certTitle ||
          certParagraphs.length > 0 ||
          certStats.length > 0 ||
          (certCtaText && certCtaLink)
        : true
      : false;

  // 1I. Thinking Beyond / Insights — CMS-managed blog grid
  const insightsSection = homeSections.find((s) => s.key === 'home_insights');
  const insightsContent = sectionContent(insightsSection);
  const insightsEyebrow = cmsText(insightsSection, insightsContent.eyebrow, 'Thinking Beyond');
  const insightsTitle = cmsText(insightsSection, insightsSection?.title, 'Insights From the Future of Healthcare.');
  const insightsCtaText = cmsText(insightsSection, insightsContent.ctaText, 'View Blogs & Insights');
  const insightsCtaLink = cmsText(insightsSection, insightsContent.ctaLink, '/resources/blogs');
  const insightsViewAllText = cmsText(insightsSection, insightsContent.viewAllText, 'View All Blogs');
  const insightsViewAllLink = cmsText(insightsSection, insightsContent.viewAllLink, '/resources/blogs');
  const parsedInsightLimit = parseInt(insightsContent.limit, 10);
  const insightsLimit = Number.isFinite(parsedInsightLimit)
    ? Math.min(Math.max(parsedInsightLimit, 0), 6)
    : 6;
  const showInsightsSection =
    !insightsSection || insightsSection.visible !== false
      ? insightsSection
        ? insightsEyebrow ||
          insightsTitle ||
          (insightsCtaText && insightsCtaLink) ||
          (insightsViewAllText && insightsViewAllLink) ||
          insightsLimit > 0
        : true
      : false;

  // 1F. Quality strip — CMS-managed
  const qualityStripSection = homeSections.find((s) => s.key === 'home_quality_strip');
  const qualityStripContent = sectionContent(qualityStripSection);
  const qualityStripEyebrow = cmsText(qualityStripSection, qualityStripContent.eyebrow, 'Quality & Compliance');
  const qualityStripTitle = cmsText(
    qualityStripSection,
    qualityStripSection?.title,
    'Quality Is Built Into Every Stage.'
  );
  const qualityStripSubtitle = cmsText(
    qualityStripSection,
    qualityStripSection?.subtitle,
    'Quality is considered across the product journey—from material selection and development through manufacturing, testing, documentation and final release.'
  );
  const qualityStripCtaText = cmsText(qualityStripSection, qualityStripContent.ctaText, 'Learn About Quality');
  const qualityStripCtaLink = cmsText(qualityStripSection, qualityStripContent.ctaLink, '/about/quality');
  const showQualityStrip =
    !qualityStripSection || qualityStripSection.visible !== false
      ? qualityStripSection
        ? qualityStripEyebrow ||
          qualityStripTitle ||
          qualityStripSubtitle ||
          (qualityStripCtaText && qualityStripCtaLink)
        : true
      : false;

  // Custom / additional homepage sections (CMS), excluding ones rendered in fixed positions
  const knownRenderedHomeKeys = new Set([
    'home_about',
    'home_signature',
    'home_7_steps',
    'home_health_categories',
    'home_dosage_forms',
    'home_why_partner',
    'home_certifications',
    'home_insights',
    'home_quality_strip',
  ]);
  const customHomeSections = homeSections.filter(
    (s) => s && s.visible !== false && !knownRenderedHomeKeys.has(s.key)
  );

  // 1F & 1G. Quality & Compliance + Why Partner With ONPHARNO (CMS-Managed)
  const defaultWhyPartnerPillars = [
    {
      title: 'SCIENCE-LED DEVELOPMENT',
      desc: 'Product thinking guided by formulation expertise and evolving healthcare needs.',
      icon: 'flask',
    },
    {
      title: 'ADVANCED FORMAT CAPABILITY',
      desc: 'Liquid-filled hard capsules alongside a broader portfolio of dosage forms.',
      icon: 'layers',
    },
    {
      title: 'QUALITY-FOCUSED MANUFACTURING',
      desc: 'Structured processes designed around consistency and product quality.',
      icon: 'shield',
    },
    {
      title: 'END-TO-END THINKING',
      desc: 'From product concept and formulation through manufacturing, packaging and delivery.',
      icon: 'workflow',
    },
    {
      title: 'FLEXIBLE B2B MODELS',
      desc: 'Ready products, private label, custom development and contract manufacturing.',
      icon: 'handshake',
    },
    {
      title: 'PARTNERSHIP MINDSET',
      desc: 'Built to support growing brands, established businesses and international partners.',
      icon: 'users',
    },
  ];

  const whyPartnerSection = homeSections.find((s) => s.key === 'home_why_partner');
  const whyPartner = whyPartnerSection
    ? {
        visible: whyPartnerSection.visible !== false,
        eyebrow1: (whyPartnerSection.content?.eyebrow1 ?? '').toString().trim(),
        headline1: (whyPartnerSection.content?.headline1 ?? '').toString().trim(),
        link1: (whyPartnerSection.content?.link1 ?? '').toString().trim(),
        eyebrow2: (whyPartnerSection.content?.eyebrow2 ?? '').toString().trim(),
        title: (whyPartnerSection.title ?? '').toString().trim(),
        subtitle: (whyPartnerSection.subtitle ?? '').toString().trim(),
        ctaText: (whyPartnerSection.content?.ctaText ?? '').toString().trim(),
        ctaLink: (whyPartnerSection.content?.ctaLink ?? '').toString().trim(),
        image: (whyPartnerSection.image ?? '').toString().trim(),
        pillars: Array.isArray(whyPartnerSection.content?.pillars)
          ? whyPartnerSection.content.pillars
          : [],
      }
    : {
        visible: true,
        eyebrow1: '1F. QUALITY & COMPLIANCE',
        headline1: 'Quality Is Built Into Every Stage.',
        link1: '/about/quality',
        eyebrow2: '1G. WHY PARTNER WITH ONPHARNO?',
        title: 'More Than Manufacturing.',
        subtitle: 'A Partner in Building Better Healthcare Businesses.',
        ctaText: 'Partner With Us',
        ctaLink: '/partner/global-partnerships',
        image: '/images/quality-partner-hero.png',
        pillars: defaultWhyPartnerPillars,
      };

  const getPillarIcon = (iconName, idx) => {
    const key = (iconName || '').toLowerCase();
    if (key.includes('flask') || key.includes('science') || idx === 0) return FlaskConical;
    if (key.includes('layer') || key.includes('capsule') || key.includes('format') || idx === 1) return Layers;
    if (key.includes('shield') || key.includes('quality') || idx === 2) return ShieldCheck;
    if (key.includes('work') || key.includes('cog') || key.includes('setting') || key.includes('end') || idx === 3) return Workflow;
    if (key.includes('hand') || key.includes('partner') || key.includes('b2b') || idx === 4) return Handshake;
    if (key.includes('user') || key.includes('team') || key.includes('mindset') || idx === 5) return Users;
    return ShieldCheck;
  };

  const showWhyPartnerSection =
    whyPartner.visible &&
    (whyPartner.headline1 ||
      whyPartner.title ||
      whyPartner.subtitle ||
      whyPartner.image ||
      (whyPartner.pillars && whyPartner.pillars.length > 0));

  // Legacy preserved per rule
  const partnerPillars = [
    { title: 'SCIENCE-LED DEVELOPMENT', desc: 'Product thinking guided by formulation expertise and evolving healthcare needs.', icon: FlaskConical },
    { title: 'ADVANCED FORMAT CAPABILITY', desc: 'Liquid-filled hard capsules alongside a broader portfolio of dosage forms.', icon: Layers },
    { title: 'QUALITY-FOCUSED MANUFACTURING', desc: 'Structured processes designed around consistency and product quality.', icon: ShieldCheck },
    { title: 'END-TO-END THINKING', desc: 'From product concept and formulation through manufacturing, packaging and delivery.', icon: Workflow },
    { title: 'FLEXIBLE B2B MODELS', desc: 'Ready products, private label, custom development and contract manufacturing.', icon: Settings },
    { title: 'PARTNERSHIP MINDSET', desc: 'Built to support growing brands, established businesses and international partners.', icon: Handshake },
  ];

  // 1I. Blog titles from doc (fallback/examples)
  const docBlogTitles = [
    'Emerging Nutraceutical Trends',
    'Choosing the Right Dosage Form',
    'Private Label vs Custom Formulation',
    'How to Launch a Supplement Brand',
    "Trends in Men's & Women's Health",
    'The Future of Effervescent Supplements',
    'Bioavailability and Modern Formulation',
    'Building an Export-Ready Healthcare Product',
  ];

  /* Preserved per rule
  const signatureFlowSteps = [
    { title: 'Hard Capsule Shell', desc: 'Two-piece hard shell structure' },
    { title: 'Liquid / Semi-Liquid Fill', desc: 'Compatible formulation inside' },
    { title: 'Sealing', desc: 'Secure closure and integrity' },
    { title: 'Finished Capsule', desc: 'Market-ready dosage form' },
  ];
  */

  // 1B. About Us (CMS-managed with golden rule: empty => not shown)
  const homeAboutSection = homeSections.find((s) => s.key === 'home_about' && s.visible !== false);
  const homeAboutDefaults = {
    eyebrow: 'About Us',
    title: "We Don't Just Manufacture Products.\nWe Help Businesses Build Them.",
    subtitle:
      'From product opportunity and formulation to dosage-form selection, manufacturing, quality and commercial delivery, ONPHARNO brings the product journey together under one B2B partnership.\n\nONPHARNO works with businesses across pharmaceutical, nutraceutical and wellness categories, supporting market-ready formulations, custom product development, private label and manufacturing opportunities.\n\nOur approach combines product development, advanced dosage-form capability, quality-focused manufacturing and practical B2B execution to help turn an opportunity into a market-ready product.',
    ctaText: 'Discover ONPHARNO',
    ctaLink: '/about/our-story',
    image: '',
    imageAlt: 'ONPHARNO company',
  };
  const homeAbout = homeAboutSection
    ? {
        eyebrow: (homeAboutSection.content?.eyebrow ?? '').toString(),
        title: (homeAboutSection.title ?? '').toString(),
        subtitle: (homeAboutSection.subtitle ?? '').toString(),
        ctaText: (homeAboutSection.content?.ctaText ?? '').toString(),
        ctaLink: (homeAboutSection.content?.ctaLink ?? '').toString(),
        image: (homeAboutSection.image ?? '').toString(),
        imageAlt: (homeAboutSection.content?.imageAlt ?? '').toString(),
      }
    : homeAboutDefaults;

  const aboutEyebrow = homeAbout.eyebrow.trim();
  const aboutTitle = homeAbout.title.trim();
  const aboutParagraphs = homeAbout.subtitle
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const aboutCtaText = homeAbout.ctaText.trim();
  const aboutCtaLink = homeAbout.ctaLink.trim();
  const aboutImage = homeAbout.image.trim();
  const aboutImageAlt = (homeAbout.imageAlt || 'About ONPHARNO').trim();
  const showAboutSection =
    aboutEyebrow || aboutTitle || aboutParagraphs.length > 0 || (aboutCtaText && aboutCtaLink) || aboutImage;

  // 1C. Signature Capability (CMS-managed with golden rule: empty => not shown)
  const defaultSignatureFlowSteps = [
    { stepNumber: 'Step 1', title: 'Hard Capsule Shell', desc: 'Two-piece hard shell structure' },
    { stepNumber: 'Step 2', title: 'Liquid / Semi-Liquid Fill', desc: 'Compatible formulation inside' },
    { stepNumber: 'Step 3', title: 'Sealing', desc: 'Secure closure and integrity' },
    { stepNumber: 'Step 4', title: 'Finished Capsule', desc: 'Market-ready dosage form' },
  ];
  const defaultSignatureAnatomyStages = [
    {
      title: '01. Pure HPMC / Gelatin Shell',
      desc: '100% vegetarian plant cellulose (HPMC) or pharmaceutical-grade gelatin with moisture barrier.',
      color: '#D85430',
    },
    {
      title: '02. Liquid / Lipid Fill',
      desc: 'Hydrophobic active ingredients, cold-pressed botanical oils, and bio-enhanced suspensions.',
      color: '#F59E0B',
    },
    {
      title: '03. Hermetic Band Sealing',
      desc: 'Precision polymer banding line fused around the joint creating tamper-evident hermetic containment.',
      color: '#A83030',
    },
    {
      title: '04. Finished Dosage Form',
      desc: 'Crystal-clear luxury aesthetics, zero leakage, no oxidation, and superior cellular bioavailability.',
      color: '#10B981',
    },
  ];

  const homeSignatureSection = homeSections.find((s) => s.key === 'home_signature');
  const homeSignature = homeSignatureSection
    ? {
        visible: homeSignatureSection.visible !== false,
        eyebrow: (homeSignatureSection.content?.eyebrow ?? '').toString().trim(),
        title: (homeSignatureSection.title ?? '').toString().trim(),
        subtitle: (homeSignatureSection.subtitle ?? '').toString().trim(),
        desc1: (homeSignatureSection.content?.desc1 ?? '').toString().trim(),
        desc2: (homeSignatureSection.content?.desc2 ?? '').toString().trim(),
        ctaText: (homeSignatureSection.content?.ctaText ?? '').toString().trim(),
        ctaLink: (homeSignatureSection.content?.ctaLink ?? '').toString().trim(),
        flowSteps: Array.isArray(homeSignatureSection.content?.flowSteps)
          ? homeSignatureSection.content.flowSteps
          : [],
        anatomyBadge: (homeSignatureSection.content?.anatomyBadge ?? '').toString().trim(),
        anatomyTag: (homeSignatureSection.content?.anatomyTag ?? '').toString().trim(),
        anatomyTitle: (homeSignatureSection.content?.anatomyTitle ?? '').toString().trim(),
        anatomyDesc: (homeSignatureSection.content?.anatomyDesc ?? '').toString().trim(),
        anatomyStages: Array.isArray(homeSignatureSection.content?.anatomyStages)
          ? homeSignatureSection.content.anatomyStages
          : [],
        image: (homeSignatureSection.image ?? '').toString().trim(),
      }
    : {
        visible: true,
        eyebrow: '1C. SIGNATURE CAPABILITY',
        title: 'Liquid-Filled Hard Capsules.',
        subtitle: 'Where Formulation Meets Advanced Dosage-Form Thinking.',
        desc1:
          'Liquid-filled hard capsules create a distinctive alternative to conventional dry-filled capsules and offer product developers another route for compatible liquid and semi-liquid formulations.',
        desc2:
          'For ONPHARNO, the format is more than a manufacturing option. It is a product-development opportunity.',
        ctaText: 'EXPLORE THE TECHNOLOGY',
        ctaLink: '/products/liquid-filled-hard-capsules',
        flowSteps: defaultSignatureFlowSteps,
        anatomyBadge: 'Interactive Anatomy',
        anatomyTag: 'Dosage Engineering',
        anatomyTitle: 'How Liquid-Filled Hard Capsules Are Built',
        anatomyDesc: 'Click each phase to inspect the containment and formulation process.',
        anatomyStages: defaultSignatureAnatomyStages,
        image: '',
      };

  const showSignatureSection =
    homeSignature.visible &&
    (homeSignature.title ||
      homeSignature.subtitle ||
      homeSignature.desc1 ||
      homeSignature.desc2 ||
      (homeSignature.flowSteps && homeSignature.flowSteps.length > 0));

  return (
    <>
      <SEO
        title="Nutraceutical & Pharmaceutical Contract Manufacturer"
        description="ONPHARNO partners with businesses to build healthcare products—from formulation and dosage-form selection to manufacturing, quality and commercial delivery."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: settings?.companyName || 'ONPHARNO',
          url: 'https://onpharno.com',
          logo: 'https://onpharno.com/logo.png',
          description: 'Science-driven healthcare solutions, product development and manufacturing partner.',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: settings?.phone || '',
            contactType: 'sales',
            email: settings?.email || '',
          },
        }}
      />

      {/* 1A. HERO - 4-5 Banners */}
      {current && (
        <section
          className="relative w-full overflow-hidden bg-navy min-h-[580px] sm:min-h-[620px] lg:h-[660px] flex items-center select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {activeBanners.map((b, idx) => {
            const isActive = idx === currentBanner;
            const bgDesktop = getBannerImage(b, false);
            return (
              <div
                key={b._id || idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {bgDesktop ? (
                  <div
                    className="absolute inset-0 bg-cover bg-no-repeat bg-[center_right] transform scale-100 transition-transform duration-10000"
                    style={{ backgroundImage: `url(${bgDesktop})` }}
                  />
                ) : null}
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/20" />
                <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy/95" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-black/20" />
              </div>
            );
          })}

          <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-12 sm:py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
                {(current.eyebrow?.trim() || current.badge?.trim()) ? (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>{current.eyebrow?.trim() || current.badge?.trim()}</span>
                  </div>
                ) : null}

                {current.title?.trim() ? (
                  <h1 className="text-2xl sm:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-[1.18] sm:leading-[1.14] mb-3 sm:mb-4 font-sans drop-shadow-sm max-w-2xl whitespace-pre-line">
                    {current.title.trim()}
                  </h1>
                ) : null}

                {current.subtitle?.trim() ? (
                  <p className="text-xs sm:text-base lg:text-lg text-gray-200 font-normal leading-relaxed mb-4 sm:mb-6 max-w-xl drop-shadow-sm">
                    {current.subtitle.trim()}
                  </p>
                ) : null}

                {getBannerImage(current, true) ? (
                  <div className="lg:hidden w-full my-3 sm:my-4 flex items-center justify-center">
                    <img
                      src={getBannerImage(current, true)}
                      alt={current.title || 'ONPHARNO'}
                      className="max-h-48 sm:max-h-56 max-w-[85%] object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)] transition-all duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ) : null}

                {trustPointsList.length > 0 ? (
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 mb-5 sm:mb-7 text-xs sm:text-sm text-gray-200">
                    {trustPointsList.map((pt, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <span className="text-white/40 hidden sm:inline">•</span>}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-0 sm:py-0 rounded-full sm:rounded-none bg-white/10 sm:bg-transparent">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                ) : null}

                {(current.cta1Text?.trim() || current.cta2Text?.trim()) ? (
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
                    {current.cta1Text?.trim() ? (
                      <Link
                        to={current.cta1Link?.trim() || '#'}
                        className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm lg:text-base shadow-xl shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                      >
                        <span>{current.cta1Text.trim()}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : null}
                    {current.cta2Text?.trim() ? (
                      <Link
                        to={current.cta2Link?.trim() || '#'}
                        className="inline-flex items-center justify-center gap-2 border-2 border-white/80 hover:bg-white hover:text-navy text-white font-semibold px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm lg:text-base backdrop-blur-sm transition-all duration-300 active:scale-95"
                      >
                        <span>{current.cta2Text.trim()}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="hidden lg:block lg:col-span-5 pointer-events-none" />
            </div>
          </div>

          {activeBanners.length > 1 && (
            <>
              <button
                onClick={prevBanner}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-primary text-white flex items-center justify-center border border-white/20 transition-all duration-300 backdrop-blur-md shadow-xl"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextBanner}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-primary text-white flex items-center justify-center border border-white/20 transition-all duration-300 backdrop-blur-md shadow-xl"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                {activeBanners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentBanner(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentBanner === idx ? 'w-8 bg-primary shadow-md' : 'w-2 bg-white/40 hover:bg-white/80'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* 1B. About Us (2-part, CMS-managed) */}
      {showAboutSection && (
        <section id="about-us" className="py-20 bg-warm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 ${aboutImage ? 'lg:grid-cols-12 gap-10 lg:gap-12 items-center' : ''}`}>
              <div className={aboutImage ? 'lg:col-span-6' : 'max-w-4xl mx-auto text-center'}>
                {aboutEyebrow && (
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{aboutEyebrow}</span>
                )}
                {aboutTitle && (
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight ${aboutEyebrow ? 'mt-3' : ''} whitespace-pre-line`}>
                    {aboutTitle}
                  </h2>
                )}
                {aboutParagraphs.length > 0 && (
                  <div className={`mt-6 space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed ${aboutImage ? '' : 'max-w-3xl mx-auto'}`}>
                    {aboutParagraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                )}
                {aboutCtaText && aboutCtaLink && (
                  <div className="mt-8">
                    <Link
                      to={aboutCtaLink}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all"
                    >
                      {aboutCtaText} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>

              {aboutImage && (
                <div className="lg:col-span-6">
                  <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                    <img
                      src={getImageUrl(aboutImage)}
                      alt={aboutImageAlt || 'About ONPHARNO'}
                      className="w-full h-auto max-h-[520px] object-contain mx-auto"
                      onError={(e) => {
                        handleImageError(e, '/images/about-us-image.webp');
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 1C. Signature Capability (Mockup Matched & CMS Dynamic) */}
      {showSignatureSection && (
        <section className="relative py-20 lg:py-24 bg-gradient-to-b from-[#F8FAFC] via-[#FDFBF9] to-white overflow-hidden border-t border-gray-100">
          {/* Subtle decorative molecular structures in background */}
          <div className="absolute -top-12 -left-12 w-64 h-64 opacity-20 pointer-events-none text-primary">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
              <circle cx="60" cy="80" r="28" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.08" />
              <circle cx="140" cy="50" r="18" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.06" />
              <circle cx="130" cy="140" r="24" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.08" />
              <line x1="84" y1="70" x2="124" y2="56" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="80" y1="100" x2="114" y2="126" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          </div>

          <div className="absolute top-10 -right-12 w-72 h-72 opacity-20 pointer-events-none text-navy">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
              <circle cx="140" cy="90" r="32" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.06" />
              <circle cx="60" cy="50" r="16" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
              <circle cx="70" cy="140" r="20" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
              <line x1="75" y1="58" x2="112" y2="78" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="88" y1="130" x2="116" y2="104" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          </div>

          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
            {/* Header: Eyebrow with horizontal accent lines, Title, Subtitle & Copy */}
            <div className="text-center max-w-4xl mx-auto">
              {homeSignature.eyebrow ? (
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="h-0.5 w-10 sm:w-14 bg-primary/40 inline-block rounded-full" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
                    {homeSignature.eyebrow}
                  </span>
                  <span className="h-0.5 w-10 sm:w-14 bg-primary/40 inline-block rounded-full" />
                </div>
              ) : null}

              {homeSignature.title ? (
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
                  {homeSignature.title}
                </h2>
              ) : null}

              {homeSignature.subtitle ? (
                <p className="text-lg sm:text-2xl font-semibold text-charcoal/90 mt-2 tracking-tight">
                  {homeSignature.subtitle}
                </p>
              ) : null}

              {homeSignature.desc1 ? (
                <p className="text-gray-600 text-sm sm:text-base mt-4 max-w-3xl mx-auto leading-relaxed">
                  {homeSignature.desc1}
                </p>
              ) : null}

              {homeSignature.desc2 ? (
                <div className="mt-3 text-sm sm:text-base leading-relaxed">
                  <p className="font-semibold text-charcoal whitespace-pre-line">
                    {homeSignature.desc2.includes('product-development opportunity.') ? (
                      <>
                        {homeSignature.desc2.split('product-development opportunity.')[0]}
                        <span className="text-primary font-bold">product-development opportunity.</span>
                        {homeSignature.desc2.split('product-development opportunity.')[1]}
                      </>
                    ) : (
                      homeSignature.desc2
                    )}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Core Side-by-Side Unified Showcase Layout */}
            <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-stretch">
              {/* LEFT: 4 Capsule Steps with 3D Transparent Renders */}
              <div className="lg:col-span-8 xl:col-span-8 2xl:col-span-8 flex flex-col justify-between">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-4 lg:gap-5 relative">
                  {homeSignature.flowSteps.map((step, idx) => {
                    const isActive = activeSignaturePhase === idx;
                    const capsuleImg = step.image || `/images/capsule-step-${idx + 1}.png`;

                    return (
                      <div key={idx} className="relative flex flex-col items-center justify-between h-full">
                        {/* Top Step Header Button with consistent height */}
                        <div className="w-full flex flex-col items-center">
                          <button
                            type="button"
                            onClick={() => setActiveSignaturePhase(idx)}
                            className={`w-full text-center p-3 sm:p-3.5 rounded-2xl transition-all duration-300 cursor-pointer min-h-[96px] sm:min-h-[108px] flex flex-col justify-start items-center ${
                              isActive
                                ? 'bg-white shadow-md ring-2 ring-primary/40 -translate-y-1'
                                : 'hover:bg-white/60'
                            }`}
                          >
                            {step.stepNumber ? (
                              <div className="inline-block text-[10px] sm:text-[11px] font-bold text-primary bg-[#FFF4EC] border border-[#FED7AA]/70 px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
                                {step.stepNumber}
                              </div>
                            ) : null}
                            {step.title ? (
                              <div
                                className={`font-bold text-xs sm:text-sm md:text-base leading-snug transition-colors ${
                                  isActive ? 'text-primary' : 'text-charcoal'
                                }`}
                              >
                                {step.title}
                              </div>
                            ) : null}
                            {step.desc ? (
                              <div className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-snug line-clamp-2">
                                {step.desc}
                              </div>
                            ) : null}
                          </button>

                          {/* Downward indicator line & dot */}
                          <div className="flex flex-col items-center my-2 sm:my-3">
                            <div
                              className={`w-0.5 h-6 transition-colors duration-300 ${
                                isActive ? 'bg-primary' : 'bg-primary/40'
                              }`}
                            />
                            <div
                              className={`w-2 h-2 rounded-full -mt-0.5 transition-colors duration-300 ${
                                isActive ? 'bg-primary shadow-[0_0_8px_rgba(216,84,48,0.7)]' : 'bg-primary/60'
                              }`}
                            />
                          </div>
                        </div>

                        {/* 3D Capsule Visual Render with Centered Arrow */}
                        <div className="relative w-full flex-1 flex flex-col items-center justify-center">
                          <div
                            onClick={() => setActiveSignaturePhase(idx)}
                            className={`relative w-full h-48 sm:h-56 md:h-60 lg:h-64 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                              isActive
                                ? 'scale-105 drop-shadow-[0_16px_28px_rgba(216,84,48,0.3)]'
                                : 'hover:scale-102 drop-shadow-sm opacity-90 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={getImageUrl(capsuleImg)}
                              alt={step.title || `Step ${idx + 1}`}
                              className="max-h-full max-w-[130px] sm:max-w-[145px] object-contain drop-shadow"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `/images/capsule-step-${idx + 1}.png`;
                              }}
                            />
                          </div>

                          {/* Circular Orange Arrow (>) centered on the capsule visual */}
                          {idx < homeSignature.flowSteps.length - 1 && (
                            <div className="hidden sm:flex absolute -right-3.5 sm:-right-4 lg:-right-4.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-primary text-primary items-center justify-center shadow-md pointer-events-none">
                              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                            </div>
                          )}
                        </div>

                        {/* Bottom Format Label */}
                        {step.title ? (
                          <div
                            className={`mt-2.5 font-bold text-xs sm:text-sm text-center tracking-tight transition-colors ${
                              isActive ? 'text-primary' : 'text-charcoal/90'
                            }`}
                          >
                            {step.title}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT: Dark Navy "Dosage Engineering" Card */}
              <div className="lg:col-span-4 xl:col-span-4 2xl:col-span-4 bg-[#0B1528] rounded-3xl p-6 sm:p-7 text-white shadow-2xl border border-navy-800 relative overflow-hidden flex flex-col justify-between">
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  {(homeSignature.anatomyTag || homeSignature.anatomyTitle || homeSignature.anatomyDesc) ? (
                    <div className="pb-4 mb-4 border-b border-white/10">
                      {homeSignature.anatomyTag ? (
                        <span className="text-primary text-xs font-bold uppercase tracking-wider block mb-1">
                          {homeSignature.anatomyTag}
                        </span>
                      ) : null}
                      {homeSignature.anatomyTitle ? (
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {homeSignature.anatomyTitle}
                        </h3>
                      ) : null}
                      {homeSignature.anatomyDesc ? (
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                          {homeSignature.anatomyDesc}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {/* Interactive Phases */}
                  <div className="space-y-3">
                    {homeSignature.anatomyStages.map((stg, idx) => {
                      if (!stg.title && !stg.desc) return null;
                      const isActive = activeSignaturePhase === idx;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveSignaturePhase(idx)}
                          className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-start gap-3.5 cursor-pointer ${
                            isActive
                              ? 'bg-white/10 ring-1 ring-primary/60 shadow-lg text-white'
                              : 'bg-white/[0.02] hover:bg-white/[0.06] text-gray-300'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-all ${
                              isActive
                                ? 'bg-primary text-white shadow-[0_0_12px_rgba(216,84,48,0.8)] scale-110'
                                : 'bg-primary/80 text-white'
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <div>
                            {stg.title ? (
                              <h4
                                className={`text-xs sm:text-sm font-bold transition-colors ${
                                  isActive ? 'text-white' : 'text-gray-200'
                                }`}
                              >
                                {stg.title}
                              </h4>
                            ) : null}
                            {stg.desc ? (
                              <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 leading-relaxed">
                                {stg.desc}
                              </p>
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Centered CTA Button */}
            {homeSignature.ctaText && homeSignature.ctaLink ? (
              <div className="text-center mt-12 sm:mt-14">
                <Link
                  to={homeSignature.ctaLink}
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white font-bold px-9 py-4 rounded-full text-sm shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  {homeSignature.ctaText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : null}
          </div>

          {/* Soft Bottom Curved Wave Transition */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
            <svg
              className="relative block w-full h-8 text-warm/40"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,40 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </section>
      )}

      {/* 1D. From Idea to Market (CMS-managed) */}
      {showIdeaToMarketSection && (
        <section className="py-20 bg-warm border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(ideaEyebrow || ideaTitle || ideaSubtitle) && (
              <div className="text-center max-w-3xl mx-auto mb-14">
                {ideaEyebrow && <span className="text-xs font-bold uppercase tracking-wider text-primary">{ideaEyebrow}</span>}
                {ideaTitle && <h2 className={`text-3xl sm:text-4xl font-bold text-charcoal ${ideaEyebrow ? 'mt-2' : ''}`}>{ideaTitle}</h2>}
                {ideaSubtitle && <p className="text-gray-600 text-sm sm:text-base mt-2">{ideaSubtitle}</p>}
              </div>
            )}

            {ideaImage && (
              <div className="max-w-4xl mx-auto mb-12">
                <img
                  src={getImageUrl(ideaImage)}
                  alt={(home7StepsSection?.content?.imageAlt || 'From idea to market').toString()}
                  className="w-full h-auto max-h-[520px] object-contain rounded-2xl border border-gray-200 bg-white shadow-sm mx-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {ideaToMarketSteps.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {ideaToMarketSteps.map((step, idx) => {
                  const iconClass = typeof step.icon === 'string' ? step.icon : '';
                  const Icon = typeof step.icon === 'function' ? step.icon : null;
                  return (
                    <div key={`${step.num}-${idx}`} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary/40 transition-colors">
                      {(step.num || iconClass || Icon) && (
                        <div className="flex items-start justify-between gap-3 mb-3">
                          {step.num ? <span className="text-3xl font-bold text-primary/20 leading-none">{step.num}</span> : <span />}
                          {(iconClass || Icon) && (
                            <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              {iconClass ? <i className={iconClass} aria-hidden="true" /> : <Icon className="w-4 h-4" />}
                            </span>
                          )}
                        </div>
                      )}
                      {step.title && <h3 className="font-bold text-charcoal text-base tracking-wide">{step.title}</h3>}
                      {step.desc && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{step.desc}</p>}
                    </div>
                  );
                })}
              </div>
            )}

            {ideaCtaText && ideaCtaLink && (
              <div className="text-center mt-12">
                <Link
                  to={ideaCtaLink}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all"
                >
                  {ideaCtaText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 1E. Healthcare Solutions — CMS-managed 3x4 grid */}
      {showHealthSection && (
        <section className="py-10 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(healthEyebrow || healthTitle || healthSubtitle) && (
              <div className="text-center max-w-3xl mx-auto mb-8">
                {healthEyebrow && (
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{healthEyebrow}</span>
                )}
                {healthTitle && <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-2">{healthTitle}</h2>}
                {healthSubtitle && <p className="text-gray-600 text-sm sm:text-base mt-2">{healthSubtitle}</p>}
              </div>
            )}

            {healthCategoryCards.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {healthCategoryCards.map((cat, idx) => {
                  const CardTag = cat.link ? Link : 'div';
                  return (
                  <CardTag
                    key={`${cat.title}-${idx}`}
                    {...(cat.link ? { to: cat.link } : {})}
                    className={`group relative overflow-hidden rounded-2xl min-h-[140px] flex flex-col items-center justify-center text-center p-4 sm:p-5 shadow-sm hover:shadow-md transition-all ${
                      cat.image
                        ? 'border border-white/10 text-white bg-cover bg-center'
                        : 'bg-warm/40 hover:bg-white border border-gray-200 hover:border-primary/40'
                    }`}
                    style={
                      cat.image
                        ? {
                            backgroundImage: `linear-gradient(to top, rgba(15,23,42,0.75), rgba(15,23,42,0.1)), url("${getImageUrl(cat.image)}")`,
                          }
                        : undefined
                    }
                  >
                    {cat.image && cat.imageAlt ? <span className="sr-only">{cat.imageAlt}</span> : null}
                    {cat.char && (
                      <div
                        className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center transition-colors ${
                          cat.image ? 'bg-white/20 text-white mb-2' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white mb-2'
                        }`}
                      >
                        <span className="text-sm font-bold">{cat.char}</span>
                      </div>
                    )}
                    <h3
                      className={`font-semibold text-sm sm:text-base leading-snug ${
                        cat.image ? 'text-white' : 'text-charcoal group-hover:text-primary'
                      }`}
                    >
                      {cat.title}
                    </h3>
                  </CardTag>
                  );
                })}
              </div>
            )}

            {healthCtaText && healthCtaLink && (
              <div className="text-center mt-6">
                <Link
                  to={healthCtaLink}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-dark"
                >
                  {healthCtaText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 1F & 1G. Quality & Compliance + Why Partner With ONPHARNO (Mockup Matched & CMS-Managed) */}
      {showWhyPartnerSection && (
        <section className="relative py-20 lg:py-24 bg-white overflow-hidden border-t border-b border-gray-200">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
            {/* Top Row: Left Content + Right Hero Lab Image */}
            <div className={`grid grid-cols-1 ${whyPartner.image ? 'lg:grid-cols-12 gap-8 lg:gap-12 items-center' : ''}`}>
              <div className={whyPartner.image ? 'lg:col-span-7 xl:col-span-6' : 'max-w-4xl mx-auto text-center'}>
                {/* 1F Badge / Eyebrow 1 */}
                {whyPartner.eyebrow1 ? (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF4EC] border border-[#FED7AA] mb-3.5">
                    <span className="text-[11px] sm:text-xs font-bold text-primary tracking-wider uppercase">
                      {whyPartner.eyebrow1}
                    </span>
                  </div>
                ) : null}

                {/* 1F Headline 1: Quality Is Built Into Every Stage. (= 2B) */}
                {whyPartner.headline1 ? (
                  <Link to={whyPartner.link1 || '/about/quality'} className="group block mb-6 sm:mb-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0B1528] tracking-tight leading-[1.15] group-hover:opacity-95 transition-opacity">
                      {whyPartner.headline1.includes('Into Every Stage.') ? (
                        <>
                          {whyPartner.headline1.split('Into Every Stage.')[0]}
                          <span className="text-primary block sm:inline">Into Every Stage.</span>
                          {whyPartner.headline1.split('Into Every Stage.')[1]}
                        </>
                      ) : (
                        whyPartner.headline1
                      )}
                    </h2>
                  </Link>
                ) : null}

                {/* 1G Eyebrow 2 (without horizontal line per user request) */}
                {whyPartner.eyebrow2 ? (
                  <div className="mb-2">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
                      {whyPartner.eyebrow2}
                    </span>
                  </div>
                ) : null}

                {/* 1G Headline 2 */}
                {whyPartner.title ? (
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1528] tracking-tight">
                    {whyPartner.title}
                  </h3>
                ) : null}

                {/* 1G Subtitle 2 */}
                {whyPartner.subtitle ? (
                  <p className="text-base sm:text-lg lg:text-xl font-medium text-charcoal/80 mt-1 leading-snug">
                    {whyPartner.subtitle}
                  </p>
                ) : null}
              </div>

              {/* Right Hero Lab Image (clean border, subtle shadow-sm, no heavy shadow) */}
              {whyPartner.image ? (
                <div className="lg:col-span-5 xl:col-span-6 mt-6 lg:mt-0">
                  <div className="relative rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 bg-white group transition-shadow">
                    <img
                      src={getImageUrl(whyPartner.image)}
                      alt={whyPartner.headline1 || whyPartner.title || 'Quality & Compliance'}
                      className="w-full h-auto object-cover max-h-[460px] transform group-hover:scale-[1.02] transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/quality-partner-hero.png';
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Bottom Row: 6 Pillar Cards */}
            {whyPartner.pillars && whyPartner.pillars.length > 0 && (
              <div className="mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {whyPartner.pillars.map((pillar, idx) => {
                  if (!pillar.title && !pillar.desc) return null;
                  const IconComp = getPillarIcon(pillar.icon, idx);
                  const faClass = toFontAwesomeClass(pillar.icon);

                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-primary/40 transition-all flex items-center gap-4 group"
                    >
                      {/* Circular Icon Container with FontAwesome or Lucide */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FFF4EC] border border-[#FED7AA]/80 flex items-center justify-center shrink-0 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        {faClass ? (
                          <i className={`${faClass} text-lg sm:text-xl`} aria-hidden="true" />
                        ) : (
                          <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                      </div>

                      {/* Vertical Orange Separator */}
                      <div className="w-[1.5px] h-9 sm:h-10 bg-[#FED7AA] shrink-0" />

                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        {pillar.title ? (
                          <h4 className="font-bold text-xs sm:text-sm text-charcoal tracking-wide uppercase leading-snug">
                            {pillar.title}
                          </h4>
                        ) : null}
                        {pillar.desc ? (
                          <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">
                            {pillar.desc}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Centered CTA Button After all the Pillars per user request */}
            {whyPartner.ctaText && whyPartner.ctaLink ? (
              <div className="text-center mt-10 lg:mt-12">
                <Link
                  to={whyPartner.ctaLink}
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:scale-105 transition-all"
                >
                  {whyPartner.ctaText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* 1E (continued). Dosage Forms — CMS-managed */}
      {showDosageSection && (
        <section className="py-20 bg-warm border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(dosageEyebrow || dosageTitle || dosageTagline || dosageSubtitle) && (
              <div className="max-w-3xl mx-auto text-center mb-12">
                {dosageEyebrow && (
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{dosageEyebrow}</span>
                )}
                {dosageTitle && (
                  <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-2">{dosageTitle}</h2>
                )}
                {dosageTagline && (
                  <p className="text-xl font-semibold text-charcoal/90 mt-2">{dosageTagline}</p>
                )}
                {dosageSubtitle && (
                  <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">{dosageSubtitle}</p>
                )}
              </div>
            )}

            {(featuredBadge || featuredTitle || featuredSubtitle || featuredDesc || (featuredCtaText && featuredCtaLink) || featuredSteps.length > 0) && (
              <div className="bg-navy text-white rounded-3xl p-8 sm:p-10 mb-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    {featuredBadge && (
                      <span className="text-[11px] font-bold uppercase tracking-widest text-primary-light">
                        {featuredBadge}
                      </span>
                    )}
                    {featuredTitle && <h3 className="text-2xl sm:text-3xl font-bold mt-2">{featuredTitle}</h3>}
                    {featuredSubtitle && (
                      <p className="text-primary-light/90 font-semibold mt-1 tracking-wide">{featuredSubtitle}</p>
                    )}
                    {featuredDesc && <p className="text-gray-300 text-sm sm:text-base mt-4 max-w-xl">{featuredDesc}</p>}
                    {featuredCtaText && featuredCtaLink && (
                      <Link
                        to={featuredCtaLink}
                        className="mt-6 inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                      >
                        {featuredCtaText} <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                  {featuredSteps.length > 0 && (
                    <div className="lg:col-span-5">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {featuredSteps.map((item, i) => (
                          <div key={`${item}-${i}`} className="bg-white/10 border border-white/15 rounded-xl p-3">
                            <div className="text-xs text-primary-light font-bold mb-1">0{i + 1}</div>
                            <div className="text-xs sm:text-sm text-white font-medium leading-snug">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {dosageForms.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {dosageForms.map((form, idx) => {
                  const PillTag = form.link ? Link : 'span';
                  return (
                  <PillTag
                    key={`${form.name}-${idx}`}
                    {...(form.link ? { to: form.link } : {})}
                    className={`inline-block px-4 sm:px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                      form.image
                        ? 'bg-cover bg-center border-white/20 text-white shadow-sm'
                        : 'bg-white border-gray-200 text-charcoal hover:border-primary hover:text-primary hover:shadow-sm'
                    }`}
                    style={
                      form.image
                        ? {
                            backgroundImage: `linear-gradient(rgba(15,23,42,0.65), rgba(15,23,42,0.65)), url("${getImageUrl(form.image)}")`,
                          }
                        : undefined
                    }
                  >
                    {form.name}
                  </PillTag>
                  );
                })}
              </div>
            )}

            {dosageCtaText && dosageCtaLink && (
              <div className="text-center mt-10">
                <Link
                  to={dosageCtaLink}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all"
                >
                  {dosageCtaText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 1F. Quality & Compliance — CMS-managed */}
      {showQualityStrip && (
        <section className="py-10 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-warm border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                {qualityStripEyebrow && (
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {qualityStripEyebrow}
                  </span>
                )}
                {qualityStripTitle && (
                  <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-2">{qualityStripTitle}</h2>
                )}
                {qualityStripSubtitle && (
                  <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
                    {qualityStripSubtitle}
                  </p>
                )}
              </div>
              {qualityStripCtaText && qualityStripCtaLink && (
                <div className="shrink-0">
                  <Link
                    to={qualityStripCtaLink}
                    className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                  >
                    {qualityStripCtaText} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 1G. Why Partner With ONPHARNO (Replaced by modern unified 1F/1G section above; preserved per rule) */}
      {/*
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-primary-light uppercase text-xs font-bold tracking-wider">Why Partner With ONPHARNO?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">More Than Manufacturing.</h2>
            <p className="text-xl sm:text-2xl font-semibold text-white/90 mt-1">
              A Partner in Building Better Healthcare Businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="bg-navy-800/70 border border-navy-800 rounded-2xl p-6 hover:border-primary/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary-light flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base tracking-wide">{pillar.title}</h3>
                  <p className="text-gray-300 text-sm mt-2 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      */}

      {/* 1H. Certifications & Evidence — CMS-managed */}
      {showCertificationsSection && (
        <section className="py-20 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(certEyebrow || certTitle || certParagraphs.length > 0) && (
              <div className="text-center max-w-3xl mx-auto mb-12">
                {certEyebrow && (
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{certEyebrow}</span>
                )}
                {certTitle && (
                  <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-2">{certTitle}</h2>
                )}
                {certParagraphs.length > 0 && (
                  <div className="mt-4 space-y-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                    {certParagraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {certStats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                {certStats.map((stat, idx) => (
                  <div key={`${stat.value}-${stat.label}-${idx}`} className="bg-warm/50 border border-gray-200 rounded-2xl p-6">
                    {stat.value && <p className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</p>}
                    {stat.label && (
                      <p className="text-xs sm:text-sm text-gray-700 mt-2 font-medium leading-snug">{stat.label}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {certCtaText && certCtaLink && (
              <div className="text-center mt-10">
                <Link
                  to={certCtaLink}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-6 py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all"
                >
                  {certCtaText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 1I. Thinking Beyond / Insights — CMS-managed */}
      {showInsightsSection && (
        <section className="py-20 bg-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(insightsEyebrow || insightsTitle || (insightsCtaText && insightsCtaLink)) && (
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  {insightsEyebrow && (
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{insightsEyebrow}</span>
                  )}
                  {insightsTitle && (
                    <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mt-1">{insightsTitle}</h2>
                  )}
                </div>
                {insightsCtaText && insightsCtaLink && (
                  <Link
                    to={insightsCtaLink}
                    className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-dark"
                  >
                    {insightsCtaText} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}

            {insightsLimit > 0 &&
              (blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.slice(0, insightsLimit).map((b) => {
                    const cover = (b.coverImage || b.image || '').toString().trim();
                    return (
                    <article
                      key={b._id || b.slug}
                      className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:border-primary/40 transition-colors"
                    >
                      {cover && (
                        <div className="w-full aspect-video overflow-hidden bg-warm/50">
                          <img
                            src={getImageUrl(cover)}
                            alt={b.title || 'Blog'}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <span className="text-xs text-primary font-semibold block mb-2">{b.readTime || 'Blog'}</span>
                          <h3 className="font-bold text-lg text-charcoal hover:text-primary transition-colors">
                            <Link to={`/resources/blogs/${b.slug}`}>{b.title}</Link>
                          </h3>
                          {b.excerpt ? <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">{b.excerpt}</p> : null}
                        </div>
                        <div className="mt-5 pt-4 border-t border-gray-100">
                          <Link to={`/resources/blogs/${b.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark">
                            Read More <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {docBlogTitles.slice(0, insightsLimit).map((title) => (
                    <Link
                      key={title}
                      to="/resources/blogs"
                      className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-primary/40 hover:shadow-sm transition-all group"
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/80">Blog</span>
                      <h3 className="font-semibold text-charcoal mt-2 text-sm sm:text-base leading-snug group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              ))}

            {insightsViewAllText && insightsViewAllLink && (
              <div className="text-center mt-10">
                <Link
                  to={insightsViewAllLink}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all"
                >
                  {insightsViewAllText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Custom / Added Homepage Sections (CMS) */}
      {customHomeSections.map((section, idx) => {
        const eyebrow = (section?.content?.eyebrow ?? '').toString().trim();
        const title = (section?.title ?? '').toString().trim();
        const subtitleRaw = (section?.subtitle ?? '').toString();
        const paragraphs = subtitleRaw.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
        const image = (section?.image ?? '').toString().trim();
        const imageAlt = (section?.content?.imageAlt ?? title ?? 'Homepage section image').toString().trim();
        const ctaText = (section?.content?.ctaText ?? '').toString().trim();
        const ctaLink = (section?.content?.ctaLink ?? '').toString().trim();
        const hasContent = eyebrow || title || paragraphs.length > 0 || image || (ctaText && ctaLink);
        if (!hasContent) return null;

        const isAlt = idx % 2 === 1;
        return (
          <section key={section._id || section.key || idx} className={`py-20 ${isAlt ? 'bg-white border-t border-gray-200' : 'bg-warm border-t border-gray-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 ${image ? 'lg:grid-cols-12 gap-10 lg:gap-12 items-center' : ''}`}>
                <div className={image ? `lg:col-span-6 ${isAlt ? 'lg:order-2' : ''}` : 'max-w-4xl mx-auto text-center'}>
                  {eyebrow && <span className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</span>}
                  {title && (
                    <h2 className={`text-3xl sm:text-4xl font-bold text-charcoal leading-tight ${eyebrow ? 'mt-3' : ''} whitespace-pre-line`}>
                      {title}
                    </h2>
                  )}
                  {paragraphs.length > 0 && (
                    <div className={`mt-5 space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed ${image ? '' : 'max-w-3xl mx-auto'}`}>
                      {paragraphs.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  )}
                  {ctaText && ctaLink && (
                    <div className="mt-8">
                      <Link
                        to={ctaLink}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all"
                      >
                        {ctaText} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>

                {image && (
                  <div className={`lg:col-span-6 ${isAlt ? 'lg:order-1' : ''}`}>
                    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                      <img
                        src={getImageUrl(image)}
                        alt={imageAlt || 'Section image'}
                        className="w-full h-auto max-h-[520px] object-contain mx-auto"
                        onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Home;
