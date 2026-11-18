import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/client';
import { getImageUrl } from '../../utils/imageUrl';
import { Edit3, X, Layers, Upload, Plus, Trash2, RotateCcw, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

// Accepts a full Font Awesome class ("fa-solid fa-flask") or just a name ("flask").
const toFaClass = (value) => {
  if (typeof value !== 'string') return '';
  const raw = value.trim();
  if (!raw) return '';
  if (/\b(fa-solid|fa-regular|fa-brands|fas|far|fab)\b/.test(raw)) return raw;
  return `fa-solid fa-${raw.replace(/^fa-/, '')}`;
};

const toFontAwesomeClass = (value) => {
  if (typeof value !== 'string') return '';
  const raw = value.trim();
  if (!raw) return '';
  if (/\b(fa-solid|fa-regular|fa-brands|fas|far|fab)\b/.test(raw)) return raw;
  return `fa-solid fa-${raw.replace(/^fa-/, '')}`;
};

const defaultFlowSteps = [
  { stepNumber: 'Step 1', title: 'Hard Capsule Shell', desc: 'Two-piece hard shell structure' },
  { stepNumber: 'Step 2', title: 'Liquid / Semi-Liquid Fill', desc: 'Compatible formulation inside' },
  { stepNumber: 'Step 3', title: 'Sealing', desc: 'Secure closure and integrity' },
  { stepNumber: 'Step 4', title: 'Finished Capsule', desc: 'Market-ready dosage form' },
];

const defaultAnatomyStages = [
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

const defaultIdeaSteps = [
  { num: '01', title: 'DISCOVER', desc: 'Understand your opportunity, category, consumer and product requirements.', icon: 'fa-solid fa-magnifying-glass' },
  { num: '02', title: 'DEVELOP', desc: 'Select a relevant formulation or work towards a customized solution.', icon: 'fa-solid fa-lightbulb' },
  { num: '03', title: 'SELECT', desc: 'Evaluate the appropriate dosage form and product configuration.', icon: 'fa-solid fa-sliders' },
  { num: '04', title: 'FINALIZE', desc: 'Align formulation, specifications, packaging and commercial requirements.', icon: 'fa-solid fa-file-check' },
  { num: '05', title: 'MANUFACTURE', desc: 'Execute production through structured, quality-focused processes.', icon: 'fa-solid fa-industry' },
  { num: '06', title: 'PACKAGE', desc: 'Create practical, compliant and market-ready packaging solutions.', icon: 'fa-solid fa-box' },
  { num: '07', title: 'DELIVER', desc: 'Support reliable supply aligned with your market requirements.', icon: 'fa-solid fa-truck' },
];

const defaultHealthCategories = [
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
].map((title) => ({
  title,
  char: title.charAt(0),
  link: `/products/by-health-category?category=${encodeURIComponent(title)}`,
  image: '',
  imageAlt: '',
}));

const defaultDosageForms = [
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
].map((name) => ({
  name,
  link: `/products/by-dosage-form?format=${encodeURIComponent(name)}`,
  image: '',
}));

const defaultCertificationStats = [
  { value: '500+', label: 'Products & Formulations' },
  { value: '20+', label: 'Business Partners' },
  { value: '10+', label: 'Countries' },
  { value: '10+', label: 'Product Categories' },
  { value: '12+', label: 'Years of Experience' },
];

const defaultFeaturedSteps = [
  { title: 'Hard Capsule Shell' },
  { title: 'Liquid / Semi-Liquid Fill' },
  { title: 'Finished Capsule' },
];

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

const defaultSeedSections = [
  {
    pageKey: 'home',
    key: 'home_about',
    name: 'Home 1B: About Us Section',
    type: 'Text + Image + CTA',
    title: "We Don't Just Manufacture Products.\nWe Help Businesses Build Them.",
    subtitle:
      'From product opportunity and formulation to dosage-form selection, manufacturing, quality and commercial delivery, ONPHARNO brings the product journey together under one B2B partnership.\n\nONPHARNO works with businesses across pharmaceutical, nutraceutical and wellness categories, supporting market-ready formulations, custom product development, private label and manufacturing opportunities.\n\nOur approach combines product development, advanced dosage-form capability, quality-focused manufacturing and practical B2B execution to help turn an opportunity into a market-ready product.',
    content: {
      eyebrow: 'About Us',
      ctaText: 'Discover ONPHARNO',
      ctaLink: '/about/our-story',
      imageAlt: 'ONPHARNO company',
    },
  },
  {
    pageKey: 'home',
    key: 'home_signature',
    name: 'Home 1C: Signature Capability',
    type: 'Dosage Form Showcase',
    title: 'Liquid-Filled Hard Capsules.',
    subtitle: 'Where Formulation Meets Advanced Dosage-Form Thinking.',
    content: {
      eyebrow: '1C. SIGNATURE CAPABILITY',
      desc1:
        'Liquid-filled hard capsules create a distinctive alternative to conventional dry-filled capsules and offer product developers another route for compatible liquid and semi-liquid formulations.',
      desc2:
        'For ONPHARNO, the format is more than a manufacturing option. It is a product-development opportunity.',
      ctaText: 'EXPLORE THE TECHNOLOGY',
      ctaLink: '/products/liquid-filled-hard-capsules',
      flowSteps: defaultFlowSteps,
      anatomyBadge: 'Interactive Anatomy',
      anatomyTag: 'Dosage Engineering',
      anatomyTitle: 'How Liquid-Filled Hard Capsules Are Built',
      anatomyDesc: 'Click each phase to inspect the containment and formulation process.',
      anatomyStages: defaultAnatomyStages,
    },
  },
  {
    pageKey: 'home',
    key: 'home_7_steps',
    name: 'Home 1D: How It Works (From Idea to Market)',
    type: '7-Step Timeline',
    title: 'FROM IDEA TO MARKET',
    subtitle: 'A structured journey from product opportunity to reliable market delivery.',
    content: {
      eyebrow: 'How It Works',
      ctaText: 'Start Your Product Journey',
      ctaLink: '/contact',
      steps: defaultIdeaSteps,
    },
  },
  {
    pageKey: 'home',
    key: 'home_health_categories',
    name: 'Home 1E: Healthcare Solutions (3×4 Grid)',
    type: 'Category Grid',
    title: 'Healthcare Solutions across Growing Categories.',
    subtitle: 'Explore product opportunities designed around evolving healthcare, wellness and nutrition needs.',
    content: {
      eyebrow: 'Healthcare Solutions',
      ctaText: 'Explore All Categories',
      ctaLink: '/products/by-health-category',
      categories: defaultHealthCategories,
    },
  },
  {
    pageKey: 'home',
    key: 'home_dosage_forms',
    name: 'Home 1E: Dosage Forms + Featured Format',
    type: 'Dosage Form Showcase',
    title: 'Nutraceutical Products By Dosage Forms',
    subtitle:
      'Different healthcare opportunities require different ways of delivering value. ONPHARNO supports a range of nutraceutical product formats, helping businesses choose the right format for their category, consumer and market requirements.',
    content: {
      eyebrow: 'Dosage Forms',
      tagline: 'The Right Format Can Define the Product Experience.',
      featuredBadge: 'Featured Format',
      featuredTitle: 'LIQUID-FILLED HARD CAPSULES',
      featuredSubtitle: 'ONPHARNO SIGNATURE CAPABILITY',
      featuredDesc:
        'A distinctive dosage-form opportunity for compatible liquid and semi-liquid formulations, designed around product differentiation and development thinking.',
      featuredCtaText: 'EXPLORE',
      featuredCtaLink: '/products/liquid-filled-hard-capsules',
      featuredSteps: defaultFeaturedSteps,
      forms: defaultDosageForms,
      ctaText: 'Explore Product Formats',
      ctaLink: '/capabilities/product-formats',
    },
  },
  {
    pageKey: 'home',
    key: 'home_certifications',
    name: 'Home 1H: Certifications & Stats',
    type: 'Stats Grid',
    title: 'Built on Capability. Measured by Evidence.',
    content: {
      eyebrow: 'Certifications',
      ctaText: 'View Certifications',
      ctaLink: '/resources/certifications',
      stats: defaultCertificationStats,
    },
  },
  {
    pageKey: 'home',
    key: 'home_insights',
    name: 'Home 1I: Thinking Beyond (Blogs)',
    type: 'Blog Grid',
    title: 'Insights From the Future of Healthcare.',
    content: {
      eyebrow: 'Thinking Beyond',
      ctaText: 'View Blogs & Insights',
      ctaLink: '/resources/blogs',
      limit: 6,
    },
  },
  {
    pageKey: 'home',
    key: 'home_why_partner',
    name: 'Home 1F/1G: Quality & Why Partner With ONPHARNO',
    type: 'Quality & Partnership Showcase',
    title: 'More Than Manufacturing.',
    subtitle: 'A Partner in Building Better Healthcare Businesses.',
    image: '/images/quality-partner-hero.png',
    content: {
      eyebrow1: '1F. QUALITY & COMPLIANCE',
      headline1: 'Quality Is Built Into Every Stage.',
      link1: '/about/quality',
      eyebrow2: '1G. WHY PARTNER WITH ONPHARNO?',
      ctaText: 'Partner With Us',
      ctaLink: '/partner/global-partnerships',
      pillars: defaultWhyPartnerPillars,
    },
  },
];

const knownHomeKeys = new Set(defaultSeedSections.map((s) => s.key));

const emptyForm = {
  name: '',
  key: '',
  type: 'Custom Section',
  title: '',
  subtitle: '',
  image: '',
  visible: true,
  eyebrow: '',
  ctaText: '',
  ctaLink: '',
  imageAlt: '',
  desc1: '',
  desc2: '',
  body: '',
  eyebrow1: '1F. QUALITY & COMPLIANCE',
  headline1: 'Quality Is Built Into Every Stage.',
  link1: '/about/quality',
  eyebrow2: '1G. WHY PARTNER WITH ONPHARNO?',
  pillars: defaultWhyPartnerPillars,
  flowSteps: defaultFlowSteps,
  anatomyBadge: 'Interactive Anatomy',
  anatomyTag: 'Dosage Engineering',
  anatomyTitle: 'How Liquid-Filled Hard Capsules Are Built',
  anatomyDesc: 'Click each phase to inspect the containment and formulation process.',
  anatomyStages: defaultAnatomyStages,
  steps: defaultIdeaSteps,
  categories: defaultHealthCategories,
  tagline: 'The Right Format Can Define the Product Experience.',
  featuredBadge: 'Featured Format',
  featuredTitle: 'LIQUID-FILLED HARD CAPSULES',
  featuredSubtitle: 'ONPHARNO SIGNATURE CAPABILITY',
  featuredDesc:
    'A distinctive dosage-form opportunity for compatible liquid and semi-liquid formulations, designed around product differentiation and development thinking.',
  featuredCtaText: 'EXPLORE',
  featuredCtaLink: '/products/liquid-filled-hard-capsules',
  featuredSteps: defaultFeaturedSteps,
  forms: defaultDosageForms,
  stats: defaultCertificationStats,
  limit: 6,
};

const SectionsCMS = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [stepUploadingIndex, setStepUploadingIndex] = useState(null);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/sections');
      if (res.success && res.data) {
        setSections(res.data);
      }
    } catch {
      toast.error('Failed to load page sections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const homeDbSections = useMemo(
    () => sections.filter((s) => (s.pageKey || 'home') === 'home'),
    [sections]
  );

  const customHomeSections = useMemo(
    () => homeDbSections.filter((s) => !knownHomeKeys.has(s.key)),
    [homeDbSections]
  );

  const displaySections = useMemo(() => {
    const templates = defaultSeedSections.map((tpl) => {
      const dbRecord = homeDbSections.find((s) => s.key === tpl.key);
      return { template: tpl, record: dbRecord || null, isCustom: false };
    });
    const customs = customHomeSections.map((rec) => ({ template: null, record: rec, isCustom: true }));
    return [...templates, ...customs];
  }, [homeDbSections, customHomeSections]);

  const buildFormData = (source, existingRecord) => {
    const content = source?.content || {};
    return {
      name: source?.name ?? '',
      key: source?.key ?? '',
      type: source?.type ?? 'Custom Section',
      title: source?.title ?? '',
      subtitle: source?.subtitle ?? '',
      image: source?.image ?? '',
      visible: existingRecord ? existingRecord.visible !== false : (source?.visible !== false),
      eyebrow: content?.eyebrow ?? '',
      ctaText: content?.ctaText ?? '',
      ctaLink: content?.ctaLink ?? '',
      imageAlt: content?.imageAlt ?? '',
      desc1: content?.desc1 ?? '',
      desc2: content?.desc2 ?? '',
      body: content?.body ?? '',
      flowSteps:
        Array.isArray(content?.flowSteps) && content.flowSteps.length > 0
          ? content.flowSteps
          : defaultFlowSteps,
      anatomyBadge: content?.anatomyBadge ?? 'Interactive Anatomy',
      anatomyTag: content?.anatomyTag ?? 'Dosage Engineering',
      anatomyTitle: content?.anatomyTitle ?? 'How Liquid-Filled Hard Capsules Are Built',
      anatomyDesc: content?.anatomyDesc ?? 'Click each phase to inspect the containment and formulation process.',
      anatomyStages:
        Array.isArray(content?.anatomyStages) && content.anatomyStages.length > 0
          ? content.anatomyStages
          : defaultAnatomyStages,
      steps:
        Array.isArray(content?.steps) && content.steps.length > 0
          ? content.steps
          : defaultIdeaSteps,
      categories:
        Array.isArray(content?.categories) && content.categories.length > 0
          ? content.categories
          : defaultHealthCategories,
      tagline: content?.tagline ?? 'The Right Format Can Define the Product Experience.',
      featuredBadge: content?.featuredBadge ?? 'Featured Format',
      featuredTitle: content?.featuredTitle ?? 'LIQUID-FILLED HARD CAPSULES',
      featuredSubtitle: content?.featuredSubtitle ?? 'ONPHARNO SIGNATURE CAPABILITY',
      featuredDesc:
        content?.featuredDesc ??
        'A distinctive dosage-form opportunity for compatible liquid and semi-liquid formulations, designed around product differentiation and development thinking.',
      featuredCtaText: content?.featuredCtaText ?? 'EXPLORE',
      featuredCtaLink: content?.featuredCtaLink ?? '/products/liquid-filled-hard-capsules',
      featuredSteps:
        Array.isArray(content?.featuredSteps) && content.featuredSteps.length > 0
          ? content.featuredSteps
          : defaultFeaturedSteps,
      forms:
        Array.isArray(content?.forms) && content.forms.length > 0
          ? content.forms
          : defaultDosageForms,
      stats:
        Array.isArray(content?.stats) && content.stats.length > 0
          ? content.stats
          : defaultCertificationStats,
      limit: content?.limit ?? 6,
      eyebrow1: content?.eyebrow1 ?? '1F. QUALITY & COMPLIANCE',
      headline1: content?.headline1 ?? 'Quality Is Built Into Every Stage.',
      link1: content?.link1 ?? '/about/quality',
      eyebrow2: content?.eyebrow2 ?? '1G. WHY PARTNER WITH ONPHARNO?',
      pillars:
        Array.isArray(content?.pillars) && content.pillars.length > 0
          ? content.pillars
          : defaultWhyPartnerPillars,
    };
  };

  const openEditModal = (tplOrRecord, isCustom = false) => {
    if (isCustom) {
      setSelectedSection({ ...tplOrRecord, _isCustom: true });
      setFormData(buildFormData(tplOrRecord, tplOrRecord));
      return;
    }
    const template = tplOrRecord;
    const existing = homeDbSections.find((s) => s.key === template.key);
    const source = existing || template;
    setSelectedSection({ ...(existing || template), _template: template, _isCustom: false });
    setFormData(buildFormData(source, existing));
  };

  const openNewSectionModal = () => {
    const key = `home_custom_${Date.now()}`;
    const fresh = {
      pageKey: 'home',
      key,
      name: 'New Homepage Section',
      type: 'Custom Section',
      title: '',
      subtitle: '',
      image: '',
      visible: true,
      content: { eyebrow: '', ctaText: '', ctaLink: '', imageAlt: '' },
      _isCustom: true,
      _isNew: true,
    };
    setSelectedSection(fresh);
    setFormData({
      ...emptyForm,
      name: fresh.name,
      key: fresh.key,
      type: fresh.type,
      flowSteps: defaultFlowSteps,
      anatomyStages: defaultAnatomyStages,
      steps: defaultIdeaSteps,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    setUploading(true);
    try {
      const res = await apiClient.post('/admin/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = res?.data?.url || res?.url;
      if (url) {
        setFormData((prev) => ({ ...prev, image: url }));
        toast.success('Image uploaded');
      } else {
        toast.error('Upload succeeded but no URL returned');
      }
    } catch (err) {
      toast.error(err?.message || 'Image upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleStepImageUpload = async (index, file) => {
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    setStepUploadingIndex(index);
    try {
      const res = await apiClient.post('/admin/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = res?.data?.url || res?.url;
      if (url) {
        updateFlowStep(index, 'image', url);
        toast.success(`Step ${index + 1} capsule image uploaded!`);
      } else {
        toast.error('Upload succeeded but no URL returned');
      }
    } catch (err) {
      toast.error(err?.message || 'Step image upload failed');
    } finally {
      setStepUploadingIndex(null);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedSection) return;

    const baseContent =
      selectedSection.content && typeof selectedSection.content === 'object'
        ? { ...selectedSection.content }
        : {};

    const key = selectedSection.key;

    // Common fields for all sections (golden rule: store as-is, frontend hides empty)
    baseContent.eyebrow = formData.eyebrow ?? '';
    baseContent.ctaText = formData.ctaText ?? '';
    baseContent.ctaLink = formData.ctaLink ?? '';
    baseContent.imageAlt = formData.imageAlt ?? '';

    if (key === 'home_about') {
      // uses common fields above
    }

    if (key === 'home_signature') {
      baseContent.desc1 = formData.desc1 ?? '';
      baseContent.desc2 = formData.desc2 ?? '';
      baseContent.flowSteps = formData.flowSteps || [];
      baseContent.anatomyBadge = formData.anatomyBadge ?? '';
      baseContent.anatomyTag = formData.anatomyTag ?? '';
      baseContent.anatomyTitle = formData.anatomyTitle ?? '';
      baseContent.anatomyDesc = formData.anatomyDesc ?? '';
      baseContent.anatomyStages = formData.anatomyStages || [];
    }

    if (key === 'home_7_steps') {
      baseContent.steps = Array.isArray(formData.steps) ? formData.steps : [];
    }

    if (key === 'home_health_categories') {
      baseContent.categories = Array.isArray(formData.categories) ? formData.categories : [];
    }

    if (key === 'home_dosage_forms') {
      baseContent.tagline = formData.tagline ?? '';
      baseContent.featuredBadge = formData.featuredBadge ?? '';
      baseContent.featuredTitle = formData.featuredTitle ?? '';
      baseContent.featuredSubtitle = formData.featuredSubtitle ?? '';
      baseContent.featuredDesc = formData.featuredDesc ?? '';
      baseContent.featuredCtaText = formData.featuredCtaText ?? '';
      baseContent.featuredCtaLink = formData.featuredCtaLink ?? '';
      baseContent.featuredSteps = Array.isArray(formData.featuredSteps) ? formData.featuredSteps : [];
      baseContent.forms = Array.isArray(formData.forms) ? formData.forms : [];
    }

    if (key === 'home_certifications') {
      baseContent.stats = Array.isArray(formData.stats) ? formData.stats : [];
    }

    if (key === 'home_insights') {
      baseContent.limit = Math.min(Math.max(parseInt(formData.limit, 10) || 0, 0), 6);
    }

    if (key === 'home_why_partner') {
      baseContent.eyebrow1 = formData.eyebrow1 ?? '';
      baseContent.headline1 = formData.headline1 ?? '';
      baseContent.link1 = formData.link1 ?? '';
      baseContent.eyebrow2 = formData.eyebrow2 ?? '';
      baseContent.pillars = Array.isArray(formData.pillars) ? formData.pillars : [];
    }

    if (selectedSection._isCustom || selectedSection._isNew || !knownHomeKeys.has(key)) {
      baseContent.body = formData.body ?? '';
    }

    const payload = {
      pageKey: selectedSection.pageKey || 'home',
      key,
      name: formData.name || selectedSection.name || 'Homepage Section',
      type: formData.type || selectedSection.type || 'Custom Section',
      title: formData.title ?? '',
      subtitle: formData.subtitle ?? '',
      image: formData.image ?? '',
      content: baseContent,
      visible: !!formData.visible,
    };

    try {
      if (selectedSection._id) {
        await apiClient.put(`/admin/sections/${selectedSection._id}`, payload);
        toast.success(`Section "${payload.name}" updated`);
      } else {
        await apiClient.post('/admin/sections', payload);
        toast.success(`Section "${payload.name}" created`);
      }
      setSelectedSection(null);
      fetchSections();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to save section');
    }
  };

  const handleDeleteSection = async (section) => {
    if (!section?._id) return;
    if (!window.confirm(`Delete section "${section.name || section.key}"?`)) return;
    try {
      await apiClient.delete(`/admin/sections/${section._id}`);
      toast.success('Section deleted');
      setSelectedSection(null);
      fetchSections();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to delete section');
    }
  };

  const isHomeAbout = selectedSection?.key === 'home_about';
  const isHomeSignature = selectedSection?.key === 'home_signature';
  const isHome7Steps = selectedSection?.key === 'home_7_steps';
  const isHealthCategories = selectedSection?.key === 'home_health_categories';
  const isDosageForms = selectedSection?.key === 'home_dosage_forms';
  const isCertifications = selectedSection?.key === 'home_certifications';
  const isInsights = selectedSection?.key === 'home_insights';
  const isWhyPartner = selectedSection?.key === 'home_why_partner';
  const isCustomOrGeneric =
    !!selectedSection &&
    !isHomeAbout &&
    !isHomeSignature &&
    !isHome7Steps &&
    !isHealthCategories &&
    !isDosageForms &&
    !isCertifications &&
    !isInsights &&
    !isWhyPartner;

  // Helper methods for pillars in home_why_partner
  const updatePillar = (index, field, value) => {
    setFormData((prev) => {
      const nextPillars = [...(prev.pillars || [])];
      nextPillars[index] = { ...nextPillars[index], [field]: value };
      return { ...prev, pillars: nextPillars };
    });
  };

  const addPillar = () => {
    setFormData((prev) => ({
      ...prev,
      pillars: [
        ...(prev.pillars || []),
        { title: '', desc: '', icon: 'shield' },
      ],
    }));
  };

  const removePillar = (index) => {
    setFormData((prev) => {
      const nextPillars = [...(prev.pillars || [])];
      nextPillars.splice(index, 1);
      return { ...prev, pillars: nextPillars };
    });
  };

  const resetPillars = () => {
    setFormData((prev) => ({ ...prev, pillars: defaultWhyPartnerPillars }));
  };

  // Helper methods for flow steps in home_signature
  const updateFlowStep = (index, field, value) => {
    setFormData((prev) => {
      const nextSteps = [...(prev.flowSteps || [])];
      nextSteps[index] = { ...nextSteps[index], [field]: value };
      return { ...prev, flowSteps: nextSteps };
    });
  };

  const addFlowStep = () => {
    setFormData((prev) => ({
      ...prev,
      flowSteps: [
        ...(prev.flowSteps || []),
        {
          stepNumber: `Step ${(prev.flowSteps || []).length + 1}`,
          title: 'New Production Step',
          desc: 'Description of formulation or packaging step',
        },
      ],
    }));
  };

  const removeFlowStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      flowSteps: (prev.flowSteps || []).filter((_, i) => i !== index),
    }));
  };

  const resetFlowSteps = () => {
    setFormData((prev) => ({ ...prev, flowSteps: defaultFlowSteps }));
  };

  // Helper methods for anatomy stages in home_signature
  const updateAnatomyStage = (index, field, value) => {
    setFormData((prev) => {
      const nextStages = [...(prev.anatomyStages || [])];
      nextStages[index] = { ...nextStages[index], [field]: value };
      return { ...prev, anatomyStages: nextStages };
    });
  };

  const addAnatomyStage = () => {
    setFormData((prev) => {
      const current = prev.anatomyStages || [];
      const num = String(current.length + 1).padStart(2, '0');
      return {
        ...prev,
        anatomyStages: [
          ...current,
          {
            title: `${num}. New Engineering Phase`,
            desc: 'Formulation, containment or testing specification details.',
            color: '#D85430',
          },
        ],
      };
    });
  };

  const removeAnatomyStage = (index) => {
    setFormData((prev) => ({
      ...prev,
      anatomyStages: (prev.anatomyStages || []).filter((_, i) => i !== index),
    }));
  };

  const resetAnatomyStages = () => {
    setFormData((prev) => ({ ...prev, anatomyStages: defaultAnatomyStages }));
  };

  // Helper methods for 1D idea-to-market steps
  const updateIdeaStep = (index, field, value) => {
    setFormData((prev) => {
      const nextSteps = [...(prev.steps || [])];
      nextSteps[index] = { ...nextSteps[index], [field]: value };
      return { ...prev, steps: nextSteps };
    });
  };

  const addIdeaStep = () => {
    setFormData((prev) => {
      const next = [...(prev.steps || [])];
      const nums = next
        .map((s) => parseInt((s?.num ?? '').toString().trim(), 10))
        .filter((n) => Number.isFinite(n));
      const n = String(Math.max(0, ...nums) + 1).padStart(2, '0');
      next.push({ num: n, title: 'NEW STEP', desc: 'Step description...', icon: 'fa-solid fa-circle-check' });
      return { ...prev, steps: next };
    });
  };

  const removeIdeaStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      steps: (prev.steps || []).filter((_, i) => i !== index),
    }));
  };

  const resetIdeaSteps = () => {
    setFormData((prev) => ({ ...prev, steps: defaultIdeaSteps }));
  };

  // Generic repeatable-item helpers (categories, dosage forms, featured steps)
  const updateCollectionItem = (field, index, prop, value) => {
    setFormData((prev) => {
      const next = [...(prev[field] || [])];
      next[index] = { ...next[index], [prop]: value };
      return { ...prev, [field]: next };
    });
  };

  const addCollectionItem = (field, item) => {
    setFormData((prev) => ({ ...prev, [field]: [...(prev[field] || []), item] }));
  };

  const removeCollectionItem = (field, index) => {
    setFormData((prev) => ({ ...prev, [field]: (prev[field] || []).filter((_, i) => i !== index) }));
  };

  const resetCollection = (field, defaults) => {
    setFormData((prev) => ({ ...prev, [field]: defaults }));
  };

  const handleCollectionImageUpload = async (e, field, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    setUploading(true);
    try {
      const res = await apiClient.post('/admin/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = res?.data?.url || res?.url;
      if (url) {
        updateCollectionItem(field, index, 'image', url);
        toast.success('Image uploaded');
      } else {
        toast.error('Upload succeeded but no URL returned');
      }
    } catch (err) {
      toast.error(err?.message || 'Image upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Home Page Sections</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage homepage sections only. Golden rule: leave a field empty and it will not be shown on the website.
          </p>
        </div>
        <button
          type="button"
          onClick={openNewSectionModal}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Section
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading sections...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displaySections.map(({ template, record, isCustom }) => {
            const source = record || template || {};
            const isLive = record ? record.visible !== false : (template ? true : source.visible !== false);
            const displayTitle = (record?.title ?? template?.title ?? source?.title ?? '').toString();
            const displaySubtitle = (record?.subtitle ?? template?.subtitle ?? source?.subtitle ?? '').toString();
            const displayName = (
              isCustom
                ? record?.name ?? source?.name ?? 'Homepage Section'
                : template?.name ?? record?.name ?? source?.name ?? 'Homepage Section'
            ).toString();
            const displayType = (record?.type ?? template?.type ?? source?.type ?? 'Custom Section').toString();
            const displayKey = (record?.key ?? template?.key ?? source?.key ?? '').toString();
            return (
              <div
                key={displayKey || source._id}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-primary uppercase bg-warm px-2 py-0.5 rounded">
                      home &bull; {displayType}
                    </span>
                    <div className="flex items-center gap-2">
                      {isCustom && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                          Custom
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isLive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {isLive ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-base text-charcoal flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary/70" />
                    {displayName}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 font-medium line-clamp-2 whitespace-pre-line">
                    {displayTitle || '(No headline set)'}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 whitespace-pre-line">
                    {displaySubtitle || '(No body text set)'}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-gray-400 font-mono truncate">key: {displayKey}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    {isCustom && record?._id && (
                      <button
                        type="button"
                        onClick={() => handleDeleteSection(record)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors"
                        title="Delete custom section"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => (isCustom ? openEditModal(record, true) : openEditModal(template, false))}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-warm hover:bg-primary/10 text-primary text-xs font-semibold transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {displaySections.length === 0 && (
            <div className="text-sm text-gray-500">No homepage sections found. Add a new section to get started.</div>
          )}
        </div>
      )}

      {/* EDIT / ADD MODAL */}
      {selectedSection && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-primary tracking-wider">
                  {selectedSection._isNew ? 'New Homepage Section' : 'Content Section'}
                </span>
                <h3 className="font-bold text-lg text-charcoal">{formData.name || selectedSection.name || 'Homepage Section'}</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Empty fields will not be displayed on the website (golden rule).
                </p>
              </div>
              <button type="button" onClick={() => setSelectedSection(null)} className="text-gray-400 hover:text-charcoal p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              {isCustomOrGeneric && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-warm/30 rounded-2xl border border-gray-200">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Section Name (Admin Label)</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Home: Our Partners" className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Section Type (Label)</label>
                    <input type="text" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} placeholder="Custom Section" className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-gray-700 block mb-1">Unique Key</label>
                    <input type="text" value={selectedSection.key} readOnly className="w-full p-2.5 border rounded-xl font-mono bg-gray-50 text-gray-600" />
                  </div>
                </div>
              )}

              {!isWhyPartner && (
                <>
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Eyebrow / Tag {isHomeSignature ? '(e.g. 1C. SIGNATURE CAPABILITY)' : isHome7Steps ? '(e.g. How It Works)' : isHomeAbout ? '(e.g. About Us)' : ''}</label>
                    <input type="text" value={formData.eyebrow} onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })} placeholder={isHome7Steps ? 'How It Works' : 'Eyebrow / small label'} className="w-full p-2.5 border rounded-xl" />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">{isHomeAbout ? 'Headline / Title (use line breaks for 2 lines)' : 'Section Headline / Title'}</label>
                    {isHomeAbout ? (
                      <textarea rows={3} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder={"We Don't Just Manufacture Products.\nWe Help Businesses Build Them."} className="w-full p-2.5 border rounded-xl resize-y" />
                    ) : (
                      <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder={isHome7Steps ? 'FROM IDEA TO MARKET' : 'Primary headline...'} className="w-full p-2.5 border rounded-xl font-medium" />
                    )}
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">{isHomeAbout ? 'Body Text / Paragraphs (separate paragraphs with a blank line)' : isHomeSignature ? 'Section Subtitle / Tagline' : 'Subtitle / Body Text (blank line for paragraphs)'}</label>
                    {isHomeSignature ? (
                      <input type="text" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} placeholder="Where Formulation Meets Advanced Dosage-Form Thinking." className="w-full p-2.5 border rounded-xl font-medium" />
                    ) : (
                      <textarea rows={isHomeAbout ? 8 : 4} value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} placeholder={isHomeAbout ? 'Paragraph 1...\n\nParagraph 2...' : 'Supporting narrative or copy...'} className="w-full p-2.5 border rounded-xl resize-y" />
                    )}
                  </div>
                </>
              )}

              {isWhyPartner && (
                <div className="space-y-4 p-4 bg-warm/30 rounded-2xl border border-gray-200">
                  <span className="font-bold text-charcoal text-xs uppercase tracking-wider block">
                    Part 1F: Quality & Compliance Header
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">1F Badge / Eyebrow</label>
                      <input
                        type="text"
                        value={formData.eyebrow1}
                        onChange={(e) => setFormData({ ...formData, eyebrow1: e.target.value })}
                        placeholder="1F. QUALITY & COMPLIANCE"
                        className="w-full p-2.5 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Target Quality Page Link (= 2B)</label>
                      <input
                        type="text"
                        value={formData.link1}
                        onChange={(e) => setFormData({ ...formData, link1: e.target.value })}
                        placeholder="/about/quality"
                        className="w-full p-2.5 border rounded-xl font-mono"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-semibold text-gray-700 block mb-1">1F Headline 1</label>
                      <input
                        type="text"
                        value={formData.headline1}
                        onChange={(e) => setFormData({ ...formData, headline1: e.target.value })}
                        placeholder="Quality Is Built Into Every Stage."
                        className="w-full p-2.5 border rounded-xl font-semibold"
                      />
                    </div>
                  </div>

                  <span className="font-bold text-charcoal text-xs uppercase tracking-wider block pt-2 border-t border-gray-200">
                    Part 1G: Why Partner With ONPHARNO Header
                  </span>
                  <div className="space-y-3">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">1G Eyebrow / Tag</label>
                      <input
                        type="text"
                        value={formData.eyebrow2}
                        onChange={(e) => setFormData({ ...formData, eyebrow2: e.target.value })}
                        placeholder="1G. WHY PARTNER WITH ONPHARNO?"
                        className="w-full p-2.5 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">1G Headline 2 (Title)</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="More Than Manufacturing."
                        className="w-full p-2.5 border rounded-xl font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">1G Subtitle 2</label>
                      <textarea
                        rows={2}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="A Partner in Building Better Healthcare Businesses."
                        className="w-full p-2.5 border rounded-xl resize-y"
                      />
                    </div>
                  </div>
                </div>
              )}

              {isWhyPartner && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-charcoal text-xs uppercase tracking-wider block">
                        Partnership Pillars (Add / Remove / Edit Any Options)
                      </span>
                      <p className="text-[10px] text-gray-500">
                        Add new cards, edit copy, and choose any FontAwesome icon (e.g. flask, capsules, shield-halved, gears, handshake, users, award, heart-pulse).
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={resetPillars}
                      className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Defaults
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(formData.pillars || []).map((pillar, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                            Pillar #{idx + 1}
                          </span>
                          {(formData.pillars || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => removePillar(idx)}
                              className="text-gray-400 hover:text-red-500 p-1 flex items-center gap-1 text-[10px]"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                          <div className="sm:col-span-3">
                            <label className="text-[10px] text-gray-500 font-semibold flex items-center justify-between mb-0.5">
                              <span>FontAwesome Icon</span>
                              {toFontAwesomeClass(pillar.icon) && (
                                <span className="text-primary font-bold inline-flex items-center gap-1">
                                  <i className={toFontAwesomeClass(pillar.icon)} />
                                </span>
                              )}
                            </label>
                            <input
                              type="text"
                              value={pillar.icon || ''}
                              onChange={(e) => updatePillar(idx, 'icon', e.target.value)}
                              placeholder="flask / capsules / shield-halved"
                              className="w-full p-1.5 border rounded-lg text-xs font-mono"
                            />
                          </div>
                          <div className="sm:col-span-4">
                            <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Title</label>
                            <input
                              type="text"
                              value={pillar.title || ''}
                              onChange={(e) => updatePillar(idx, 'title', e.target.value)}
                              placeholder="SCIENCE-LED DEVELOPMENT"
                              className="w-full p-1.5 border rounded-lg text-xs font-bold"
                            />
                          </div>
                          <div className="sm:col-span-5">
                            <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Description</label>
                            <textarea
                              rows={2}
                              value={pillar.desc || ''}
                              onChange={(e) => updatePillar(idx, 'desc', e.target.value)}
                              placeholder="Product thinking guided by formulation expertise..."
                              className="w-full p-1.5 border rounded-lg text-xs resize-y"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addPillar}
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline pt-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New Pillar
                  </button>
                </div>
              )}

              {isDosageForms && (
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Bold Tagline (below the heading)</label>
                  <input type="text" value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} placeholder="The Right Format Can Define the Product Experience." className="w-full p-2.5 border rounded-xl font-medium" />
                </div>
              )}

              {isHomeSignature && (
                <div className="space-y-3 p-4 bg-warm/40 rounded-2xl border border-gray-200">
                  <span className="font-bold text-charcoal text-[11px] uppercase tracking-wider block">Narrative Descriptions</span>
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Paragraph 1</label>
                    <textarea rows={2} value={formData.desc1} onChange={(e) => setFormData({ ...formData, desc1: e.target.value })} className="w-full p-2.5 border rounded-xl resize-y" />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Paragraph 2</label>
                    <textarea rows={2} value={formData.desc2} onChange={(e) => setFormData({ ...formData, desc2: e.target.value })} className="w-full p-2.5 border rounded-xl resize-y" />
                  </div>
                </div>
              )}

              {isHomeSignature && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-charcoal text-[11px] uppercase tracking-wider block">Technical Visual Flow Steps</span>
                      <p className="text-[10px] text-gray-500">Each step can have custom capsule images, badges, titles, and descriptions. Leave fields blank to hide.</p>
                    </div>
                    <button type="button" onClick={resetFlowSteps} className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold"><RotateCcw className="w-3 h-3" /> Reset Defaults</button>
                  </div>
                  <div className="space-y-3">
                    {(formData.flowSteps || []).map((step, idx) => (
                      <div key={idx} className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                            Step #{idx + 1}
                          </span>
                          {(formData.flowSteps || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFlowStep(idx)}
                              className="text-gray-400 hover:text-red-500 p-1 flex items-center gap-1 text-[10px]"
                              title="Remove Step"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" /> Remove
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                          <div className="sm:col-span-3">
                            <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Badge (e.g. Step 1)</label>
                            <input type="text" value={step.stepNumber || ''} onChange={(e) => updateFlowStep(idx, 'stepNumber', e.target.value)} placeholder={`Step ${idx + 1}`} className="w-full p-1.5 border rounded-lg text-xs" />
                          </div>
                          <div className="sm:col-span-4">
                            <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Title</label>
                            <input type="text" value={step.title || ''} onChange={(e) => updateFlowStep(idx, 'title', e.target.value)} placeholder="Hard Capsule Shell" className="w-full p-1.5 border rounded-lg text-xs font-semibold" />
                          </div>
                          <div className="sm:col-span-5">
                            <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Description</label>
                            <input type="text" value={step.desc || ''} onChange={(e) => updateFlowStep(idx, 'desc', e.target.value)} placeholder="Two-piece hard shell structure" className="w-full p-1.5 border rounded-lg text-xs" />
                          </div>
                        </div>

                        {/* Capsule Image Upload Row */}
                        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                          <div className="w-12 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                            {step.image ? (
                              <img src={getImageUrl(step.image)} alt={`Step ${idx + 1}`} className="w-full h-full object-contain p-1" onError={(e) => { e.target.style.display = 'none'; }} />
                            ) : (
                              <img src={`/images/capsule-step-${idx + 1}.png`} alt={`Default ${idx + 1}`} className="w-full h-full object-contain p-1 opacity-70" onError={(e) => { e.target.style.display = 'none'; }} />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <label className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-200 bg-white text-[11px] font-semibold text-charcoal hover:border-primary transition-colors cursor-pointer ${stepUploadingIndex === idx ? 'opacity-60 cursor-not-allowed' : ''}`}>
                                <Upload className="w-3 h-3 text-primary" />
                                <span>{stepUploadingIndex === idx ? 'Uploading...' : 'Upload Image'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  disabled={stepUploadingIndex === idx}
                                  onChange={(e) => handleStepImageUpload(idx, e.target.files?.[0])}
                                  className="hidden"
                                />
                              </label>
                              {step.image && (
                                <button
                                  type="button"
                                  onClick={() => updateFlowStep(idx, 'image', '')}
                                  className="text-[10px] text-gray-400 hover:text-red-500 underline"
                                >
                                  Clear (Use Default)
                                </button>
                              )}
                            </div>
                            <input
                              type="text"
                              value={step.image || ''}
                              onChange={(e) => updateFlowStep(idx, 'image', e.target.value)}
                              placeholder={`/images/capsule-step-${idx + 1}.png`}
                              className="w-full p-1.5 border rounded-lg text-[11px] font-mono mt-1 text-gray-600"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addFlowStep} className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline pt-1"><Plus className="w-3.5 h-3.5" /> Add Process Step</button>
                </div>
              )}

              {isHomeSignature && (
                <div className="space-y-3 p-4 bg-navy-950 text-white rounded-2xl border border-navy-800">
                  <div className="flex items-center justify-between border-b border-navy-800 pb-2">
                    <span className="font-bold text-primary-light text-[11px] uppercase tracking-wider flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Interactive Anatomy Inspector</span>
                    <button type="button" onClick={resetAnatomyStages} className="inline-flex items-center gap-1 text-[11px] text-primary-light hover:underline font-semibold"><RotateCcw className="w-3 h-3" /> Reset 4 Phases</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div><label className="text-[10px] text-gray-400 font-semibold block mb-0.5">Top Eyebrow/Tag</label><input type="text" value={formData.anatomyTag} onChange={(e) => setFormData({ ...formData, anatomyTag: e.target.value })} className="w-full p-2 bg-navy-900 border border-navy-700 rounded-lg text-white" /></div>
                    <div><label className="text-[10px] text-gray-400 font-semibold block mb-0.5">Visual Badge</label><input type="text" value={formData.anatomyBadge} onChange={(e) => setFormData({ ...formData, anatomyBadge: e.target.value })} className="w-full p-2 bg-navy-900 border border-navy-700 rounded-lg text-white" /></div>
                    <div className="sm:col-span-2"><label className="text-[10px] text-gray-400 font-semibold block mb-0.5">Inspector Title</label><input type="text" value={formData.anatomyTitle} onChange={(e) => setFormData({ ...formData, anatomyTitle: e.target.value })} className="w-full p-2 bg-navy-900 border border-navy-700 rounded-lg text-white font-semibold" /></div>
                    <div className="sm:col-span-2"><label className="text-[10px] text-gray-400 font-semibold block mb-0.5">Helper Caption</label><input type="text" value={formData.anatomyDesc} onChange={(e) => setFormData({ ...formData, anatomyDesc: e.target.value })} className="w-full p-2 bg-navy-900 border border-navy-700 rounded-lg text-white" /></div>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-navy-800">
                    {(formData.anatomyStages || []).map((stage, idx) => (
                      <div key={idx} className="p-3 bg-navy-900/90 rounded-xl border border-navy-800 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-primary-light bg-primary/20 px-2 py-0.5 rounded">Phase {idx + 1}</span>
                          <input type="text" value={stage.title || ''} onChange={(e) => updateAnatomyStage(idx, 'title', e.target.value)} placeholder={`Phase ${idx + 1} Title`} className="flex-1 p-1.5 bg-navy-950 border border-navy-700 rounded text-xs font-semibold text-white" />
                          {(formData.anatomyStages || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeAnatomyStage(idx)}
                              className="text-gray-400 hover:text-red-400 p-1 text-xs"
                              title="Remove Phase"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <textarea rows={2} value={stage.desc || ''} onChange={(e) => updateAnatomyStage(idx, 'desc', e.target.value)} placeholder={`Phase ${idx + 1} Description...`} className="w-full p-1.5 bg-navy-950 border border-navy-700 rounded text-xs text-gray-300 resize-y" />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addAnatomyStage} className="inline-flex items-center gap-1.5 text-xs text-primary-light font-semibold hover:underline pt-1"><Plus className="w-3.5 h-3.5" /> Add Engineering Phase</button>
                </div>
              )}

              {isHome7Steps && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-charcoal text-[11px] uppercase tracking-wider block">How It Works — Process Steps</span>
                      <p className="text-[10px] text-gray-500">Add steps 01, 02 ... 10+. Use a Font Awesome icon name like <code>fa-solid fa-industry</code> or just <code>industry</code>.</p>
                    </div>
                    <button type="button" onClick={resetIdeaSteps} className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold"><RotateCcw className="w-3 h-3" /> Reset Defaults</button>
                  </div>
                  <div className="space-y-2.5">
                    {(formData.steps || []).map((step, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm flex items-start gap-2.5">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded shrink-0 mt-1">#{idx + 1}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 flex-1">
                          <div className="sm:col-span-2"><label className="text-[10px] text-gray-500 font-semibold block mb-0.5">No.</label><input type="text" value={step.num || ''} onChange={(e) => updateIdeaStep(idx, 'num', e.target.value)} placeholder="01" className="w-full p-1.5 border rounded-lg text-xs" /></div>
                          <div className="sm:col-span-3"><label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Title</label><input type="text" value={step.title || ''} onChange={(e) => updateIdeaStep(idx, 'title', e.target.value)} placeholder="DISCOVER" className="w-full p-1.5 border rounded-lg text-xs font-semibold" /></div>
                          <div className="sm:col-span-4"><label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Description</label><input type="text" value={step.desc || ''} onChange={(e) => updateIdeaStep(idx, 'desc', e.target.value)} placeholder="Step description..." className="w-full p-1.5 border rounded-lg text-xs" /></div>
                          <div className="sm:col-span-3">
                            <div className="flex items-center justify-between gap-1">
                              <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Icon (Font Awesome)</label>
                              {toFaClass(step.icon) ? <i className={`${toFaClass(step.icon)} text-primary text-xs`} aria-hidden="true" /> : null}
                            </div>
                            <input type="text" value={step.icon || ''} onChange={(e) => updateIdeaStep(idx, 'icon', e.target.value)} placeholder="fa-solid fa-industry" className="w-full p-1.5 border rounded-lg text-xs font-mono" />
                          </div>
                        </div>
                        {(formData.steps || []).length > 1 && (
                          <button type="button" onClick={() => removeIdeaStep(idx)} className="text-gray-400 hover:text-red-500 p-1 mt-1" title="Remove Step"><Trash2 className="w-3.5 h-3.5" /></button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <button type="button" onClick={addIdeaStep} className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"><Plus className="w-3.5 h-3.5" /> Add Step</button>
                    <a href="https://fontawesome.com/icons" target="_blank" rel="noreferrer" className="text-[10px] text-primary hover:underline font-semibold">Browse icons on Font Awesome &nearr;</a>
                  </div>
                </div>
              )}

              {/* 1E: Healthcare Solutions — 3x4 category grid editor */}
              {isHealthCategories && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-charcoal text-[11px] uppercase tracking-wider block">Healthcare Categories (3 × 4 Grid)</span>
                      <p className="text-[10px] text-gray-500">Each box has a title, link and optional background image. Leave the image empty for the normal look.</p>
                    </div>
                    <button type="button" onClick={() => resetCollection('categories', defaultHealthCategories)} className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold shrink-0"><RotateCcw className="w-3 h-3" /> Reset Defaults</button>
                  </div>
                  <div className="space-y-2.5">
                    {(formData.categories || []).map((cat, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm flex items-start gap-2.5">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded shrink-0 mt-1">#{idx + 1}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 flex-1">
                          <div className="sm:col-span-2">
                            <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Box Title</label>
                            <input type="text" value={cat.title || ''} onChange={(e) => updateCollectionItem('categories', idx, 'title', e.target.value)} placeholder="Daily Wellness" className="w-full p-1.5 border rounded-lg text-xs" />
                          </div>
                          <div className="sm:col-span-1">
                            <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Letter</label>
                            <input type="text" value={cat.char || ''} onChange={(e) => updateCollectionItem('categories', idx, 'char', e.target.value)} placeholder="D" maxLength={2} className="w-full p-1.5 border rounded-lg text-xs font-bold text-center" />
                          </div>
                          <div className="sm:col-span-4">
                            <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Link (URL or route)</label>
                            <input type="text" value={cat.link || ''} onChange={(e) => updateCollectionItem('categories', idx, 'link', e.target.value)} placeholder="/products/by-health-category?category=..." className="w-full p-1.5 border rounded-lg text-xs font-mono" />
                          </div>
                          <div className="sm:col-span-5">
                            <div className="flex items-center justify-between gap-1">
                              <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Background Image (optional)</label>
                              <label className={`inline-flex items-center gap-1 text-[10px] font-semibold text-primary cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
                                <Upload className="w-3 h-3" /> Upload
                                <input type="file" accept="image/*" onChange={(e) => handleCollectionImageUpload(e, 'categories', idx)} className="hidden" disabled={uploading} />
                              </label>
                            </div>
                            <input type="text" value={cat.image || ''} onChange={(e) => updateCollectionItem('categories', idx, 'image', e.target.value)} placeholder="/uploads/... or https://..." className="w-full p-1.5 border rounded-lg text-xs font-mono" />
                            {cat.image?.trim() ? (
                              <img src={getImageUrl(cat.image.trim())} alt="Preview" className="mt-1 h-12 w-20 object-cover rounded border border-gray-200" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                            ) : null}
                            <input type="text" value={cat.imageAlt || ''} onChange={(e) => updateCollectionItem('categories', idx, 'imageAlt', e.target.value)} placeholder="Alt text (optional)" className="w-full p-1.5 border rounded-lg text-xs mt-1" />
                          </div>
                        </div>
                        <button type="button" onClick={() => removeCollectionItem('categories', idx)} className="text-gray-400 hover:text-red-500 p-1 mt-1" title="Remove Box"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => addCollectionItem('categories', { title: 'New Category', char: 'N', link: '', image: '', imageAlt: '' })} className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"><Plus className="w-3.5 h-3.5" /> Add Category Box</button>
                </div>
              )}

              {/* 1E: Dosage Forms — featured block editor */}
              {isDosageForms && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-charcoal text-[11px] uppercase tracking-wider block">Featured Format Block</span>
                      <p className="text-[10px] text-gray-500">Controls the dark panel above the dosage form pills.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Badge</label>
                      <input type="text" value={formData.featuredBadge} onChange={(e) => setFormData({ ...formData, featuredBadge: e.target.value })} placeholder="Featured Format" className="w-full p-1.5 border rounded-lg text-xs" />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Capability Subtitle</label>
                      <input type="text" value={formData.featuredSubtitle} onChange={(e) => setFormData({ ...formData, featuredSubtitle: e.target.value })} placeholder="ONPHARNO SIGNATURE CAPABILITY" className="w-full p-1.5 border rounded-lg text-xs" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Featured Title</label>
                      <input type="text" value={formData.featuredTitle} onChange={(e) => setFormData({ ...formData, featuredTitle: e.target.value })} placeholder="LIQUID-FILLED HARD CAPSULES" className="w-full p-1.5 border rounded-lg text-xs font-semibold" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Description</label>
                      <textarea rows={2} value={formData.featuredDesc} onChange={(e) => setFormData({ ...formData, featuredDesc: e.target.value })} className="w-full p-1.5 border rounded-lg text-xs resize-y" />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Button Text</label>
                      <input type="text" value={formData.featuredCtaText} onChange={(e) => setFormData({ ...formData, featuredCtaText: e.target.value })} placeholder="EXPLORE" className="w-full p-1.5 border rounded-lg text-xs" />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Button Link</label>
                      <input type="text" value={formData.featuredCtaLink} onChange={(e) => setFormData({ ...formData, featuredCtaLink: e.target.value })} placeholder="/products/liquid-filled-hard-capsules" className="w-full p-1.5 border rounded-lg text-xs font-mono" />
                    </div>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-charcoal uppercase tracking-wider block">3 Feature Steps</span>
                      <button type="button" onClick={() => resetCollection('featuredSteps', defaultFeaturedSteps)} className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold"><RotateCcw className="w-3 h-3" /> Reset</button>
                    </div>
                    {(formData.featuredSteps || []).map((st, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded shrink-0">0{idx + 1}</span>
                        <input type="text" value={st.title || ''} onChange={(e) => updateCollectionItem('featuredSteps', idx, 'title', e.target.value)} placeholder="Hard Capsule Shell" className="flex-1 p-1.5 border rounded-lg text-xs" />
                        <button type="button" onClick={() => removeCollectionItem('featuredSteps', idx)} className="text-gray-400 hover:text-red-500 p-1" title="Remove Step"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addCollectionItem('featuredSteps', { title: 'New Step' })} className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"><Plus className="w-3.5 h-3.5" /> Add Step</button>
                  </div>
                </div>
              )}

              {/* 1E: Dosage Forms — pill list editor */}
              {isDosageForms && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-charcoal text-[11px] uppercase tracking-wider block">Dosage Form Pills</span>
                      <p className="text-[10px] text-gray-500">Edit each pill's name, link and optional background image.</p>
                    </div>
                    <button type="button" onClick={() => resetCollection('forms', defaultDosageForms)} className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold shrink-0"><RotateCcw className="w-3 h-3" /> Reset Defaults</button>
                  </div>
                  <div className="space-y-2.5">
                    {(formData.forms || []).map((form, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm flex items-start gap-2.5">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded shrink-0 mt-1">#{idx + 1}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 flex-1">
                          <div className="sm:col-span-3">
                            <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Name</label>
                            <input type="text" value={form.name || ''} onChange={(e) => updateCollectionItem('forms', idx, 'name', e.target.value)} placeholder="Tablets" className="w-full p-1.5 border rounded-lg text-xs" />
                          </div>
                          <div className="sm:col-span-5">
                            <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Link</label>
                            <input type="text" value={form.link || ''} onChange={(e) => updateCollectionItem('forms', idx, 'link', e.target.value)} placeholder="/products/by-dosage-form?format=..." className="w-full p-1.5 border rounded-lg text-xs font-mono" />
                          </div>
                          <div className="sm:col-span-4">
                            <div className="flex items-center justify-between gap-1">
                              <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Image (optional)</label>
                              <label className={`inline-flex items-center gap-1 text-[10px] font-semibold text-primary cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
                                <Upload className="w-3 h-3" /> Upload
                                <input type="file" accept="image/*" onChange={(e) => handleCollectionImageUpload(e, 'forms', idx)} className="hidden" disabled={uploading} />
                              </label>
                            </div>
                            <input type="text" value={form.image || ''} onChange={(e) => updateCollectionItem('forms', idx, 'image', e.target.value)} placeholder="/uploads/... or https://..." className="w-full p-1.5 border rounded-lg text-xs font-mono" />
                            {form.image?.trim() ? (
                              <img src={getImageUrl(form.image.trim())} alt="Preview" className="mt-1 h-10 w-20 object-cover rounded border border-gray-200" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                            ) : null}
                          </div>
                        </div>
                        <button type="button" onClick={() => removeCollectionItem('forms', idx)} className="text-gray-400 hover:text-red-500 p-1 mt-1" title="Remove Pill"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => addCollectionItem('forms', { name: 'New Format', link: '', image: '' })} className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"><Plus className="w-3.5 h-3.5" /> Add Format</button>
                </div>
              )}

              {/* 1H: Certifications — stats editor */}
              {isCertifications && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-charcoal text-[11px] uppercase tracking-wider block">Certification Stats</span>
                      <p className="text-[10px] text-gray-500">Each stat has a big value (e.g. 500+) and a label. Leave empty to hide it.</p>
                    </div>
                    <button type="button" onClick={() => resetCollection('stats', defaultCertificationStats)} className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold shrink-0"><RotateCcw className="w-3 h-3" /> Reset Defaults</button>
                  </div>
                  <div className="space-y-2.5">
                    {(formData.stats || []).map((stat, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm flex items-start gap-2.5">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded shrink-0 mt-1">#{idx + 1}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                          <div>
                            <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Value</label>
                            <input type="text" value={stat.value || ''} onChange={(e) => updateCollectionItem('stats', idx, 'value', e.target.value)} placeholder="500+" className="w-full p-1.5 border rounded-lg text-xs font-bold" />
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Label</label>
                            <input type="text" value={stat.label || ''} onChange={(e) => updateCollectionItem('stats', idx, 'label', e.target.value)} placeholder="Products & Formulations" className="w-full p-1.5 border rounded-lg text-xs" />
                          </div>
                        </div>
                        <button type="button" onClick={() => removeCollectionItem('stats', idx)} className="text-gray-400 hover:text-red-500 p-1 mt-1" title="Remove Stat"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => addCollectionItem('stats', { value: '', label: '' })} className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"><Plus className="w-3.5 h-3.5" /> Add Stat</button>
                </div>
              )}

              {/* 1I: Thinking Beyond — blog grid settings */}
              {isInsights && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="font-bold text-charcoal text-[11px] uppercase tracking-wider block">Blog Grid Settings</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Blogs shown on home (max 6)</label>
                      <input
                        type="number"
                        min="0"
                        max="6"
                        value={formData.limit ?? ''}
                        onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                        className="w-full p-2 border rounded-lg text-xs"
                      />
                      <p className="text-[10px] text-gray-500 mt-1">Latest blogs appear first. The rest are available through the View All button.</p>
                    </div>
                    <div className="flex items-end">
                      <Link to="/admin/blogs" className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">
                        <Plus className="w-3.5 h-3.5" /> Add / manage blogs here
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">CTA Button Text</label>
                  <input type="text" value={formData.ctaText} onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })} placeholder={isHome7Steps ? 'Start Your Product Journey' : 'Button text'} className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">CTA Button Link</label>
                  <input type="text" value={formData.ctaLink} onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })} placeholder={isHome7Steps ? '/contact' : '/link'} className="w-full p-2.5 border rounded-xl font-mono" />
                </div>
              </div>

              {!isHealthCategories && !isDosageForms && !isCertifications && !isInsights && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={isHomeAbout ? '' : 'sm:col-span-2'}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-gray-700 block">
                      {isHomeAbout
                        ? 'Right Side Image / Banner'
                        : isHomeSignature
                        ? 'Optional Technical Schematic / Diagram Image'
                        : isWhyPartner
                        ? 'Hero Lab Scientist Image'
                        : 'Section Image (optional)'}
                    </label>
                    <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-[11px] font-semibold text-charcoal hover:border-primary transition-colors ${uploading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
                      <Upload className="w-3.5 h-3.5 text-primary" />
                      <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                    </label>
                  </div>
                  <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="/uploads/... or /images/..." className="w-full p-2.5 border rounded-xl font-mono" />
                  <p className="text-[10px] text-gray-400 mt-1">Paste a URL/path or upload an image file. Leave empty to hide (golden rule).</p>
                  {formData.image?.trim() ? (
                    <div className="mt-2">
                      <img src={getImageUrl(formData.image.trim())} alt="Preview" className="h-24 w-auto max-w-full object-contain rounded-lg border border-gray-200 bg-warm/30 p-1" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                    </div>
                  ) : null}
                </div>
                {(isHomeAbout || isCustomOrGeneric || isHome7Steps) && (
                  <div className={isHomeAbout ? '' : 'sm:col-span-2'}>
                    <label className="font-semibold text-gray-700 block mb-1">Image Alt Text</label>
                    <input type="text" value={formData.imageAlt} onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })} placeholder="Image description" className="w-full p-2.5 border rounded-xl" />
                  </div>
                )}
              </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="sectionVisible" checked={!!formData.visible} onChange={(e) => setFormData({ ...formData, visible: e.target.checked })} className="w-4 h-4 text-primary rounded" />
                <label htmlFor="sectionVisible" className="font-semibold text-gray-700 cursor-pointer">Section is visible on live website</label>
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t">
                <div>
                  {selectedSection?._id && (selectedSection._isCustom || !knownHomeKeys.has(selectedSection.key)) && (
                    <button type="button" onClick={() => handleDeleteSection(selectedSection)} className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl">
                      <Trash2 className="w-3.5 h-3.5" /> Delete Section
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setSelectedSection(null)} className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="px-5 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl shadow">Save Section</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionsCMS;
