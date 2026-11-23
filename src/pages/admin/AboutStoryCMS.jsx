import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import apiClient from '../../api/client';
import { getImageUrl } from '../../utils/imageUrl';
import { Upload, Plus, Trash2, RotateCcw, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const asText = (value) => (value ?? '').toString().trim();

const toFaClass = (value) => {
  if (typeof value !== 'string') return '';
  const raw = value.trim();
  if (!raw) return '';
  if (/\b(fa-solid|fa-regular|fa-brands|fas|far|fab)\b/.test(raw)) return raw;
  return `fa-solid fa-${raw.replace(/^fa-/, '')}`;
};

const SECTION_TEMPLATES = [
  {
    key: 'about_hero',
    name: 'Hero: Heritage & Vision',
    type: 'Hero',
    fields: [
      { key: 'eyebrow', label: 'Badge / Eyebrow', type: 'text' },
      { key: 'title1', label: 'Heading Line 1', type: 'text' },
      { key: 'title2', label: 'Heading Line 2 (highlighted)', type: 'text' },
      { key: 'subtitle', label: 'Paragraph', type: 'textarea' },
    ],
    image: true,
    defaults: {
      eyebrow: 'Our Heritage & Vision',
      title1: 'More Than Manufacturing.',
      title2: 'A Partner in Building Better Healthcare Businesses.',
      subtitle:
        'We bring together scientific thinking, product expertise and scalable manufacturing to help businesses turn healthcare opportunities into market-ready solutions.',
      imageAlt: 'ONPHARNO',
    },
  },
  {
    key: 'about_philosophy',
    name: 'Philosophy Narrative + Stat',
    type: 'Text + Image + CTA',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Headline', type: 'text' },
      { key: 'paragraph1', label: 'Paragraph 1', type: 'textarea' },
      { key: 'paragraph2', label: 'Paragraph 2', type: 'textarea' },
      { key: 'ctaText', label: 'Button Text', type: 'text' },
      { key: 'ctaLink', label: 'Button Link', type: 'text' },
      { key: 'statValue', label: 'Stat Value (e.g. 500+)', type: 'text' },
      { key: 'statLabel', label: 'Stat Label', type: 'textarea' },
      { key: 'imageAlt', label: 'Image Alt Text', type: 'text' },
    ],
    image: true,
    defaults: {
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
      imageAlt: 'ONPHARNO Formulation Laboratories',
    },
  },
  {
    key: 'about_pillars',
    name: 'The 4 Foundational Pillars',
    type: 'Icon Grid',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    ],
    items: {
      key: 'items',
      label: 'Pillars',
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'icon', label: 'Icon (Font Awesome)', type: 'icon' },
      ],
      blank: { title: '', desc: '', icon: '' },
      defaults: [
        {
          title: 'Science-Led Development',
          desc: 'Thoughtful formulations developed around evolving healthcare and consumer needs.',
          icon: 'fa-solid fa-wand-magic-sparkles',
        },
        {
          title: 'Quality-Driven Manufacturing',
          desc: 'Structured processes focused on consistency, reliability and product quality.',
          icon: 'fa-solid fa-shield-halved',
        },
        {
          title: 'End-to-End Capability',
          desc: 'From product concept and formulation through manufacturing, packaging and delivery.',
          icon: 'fa-solid fa-gears',
        },
        {
          title: 'Built for Partnership',
          desc: 'Flexible support for growing brands, established businesses and global partners.',
          icon: 'fa-solid fa-handshake',
        },
      ],
    },
    defaults: {
      title: 'The 4 Foundational Pillars',
      subtitle: 'Every formulation we manufacture is built upon these four core disciplines.',
    },
  },
  {
    key: 'about_steps',
    name: 'From Idea to Market (7 Steps)',
    type: 'Number Grid + CTA Banner',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow Badge', type: 'text' },
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      {
        key: 'bannerTheme',
        label: 'CTA Banner: Preset Color Theme',
        type: 'select',
        options: [
          { value: 'ocean', label: 'Oceanic Medical Teal/Blue (Mockup Matched)' },
          { value: 'navy', label: 'Deep Tech Navy' },
          { value: 'terracotta', label: 'ONPHARNO Signature Warm Terracotta' },
          { value: 'custom', label: 'Custom (Uses Custom Background below)' },
        ],
      },
      { key: 'bannerBg', label: 'CTA Banner: Custom Color Code / Gradient (e.g. #00385E or linear-gradient(...))', type: 'text' },
      { key: 'ctaEyebrow', label: 'CTA Banner: Badge', type: 'text' },
      { key: 'ctaTitle', label: 'CTA Banner: Heading', type: 'text' },
      { key: 'ctaDesc', label: 'CTA Banner: Description', type: 'textarea' },
      { key: 'ctaText', label: 'CTA Banner: Button Text', type: 'text' },
      { key: 'ctaLink', label: 'CTA Banner: Button Link', type: 'text' },
      { key: 'bannerImage', label: 'CTA Banner: Right Visual Image', type: 'image' },
      { key: 'trustPoint1', label: 'Trust Badge 1', type: 'text' },
      { key: 'trustPoint2', label: 'Trust Badge 2', type: 'text' },
      { key: 'trustPoint3', label: 'Trust Badge 3', type: 'text' },
    ],
    items: {
      key: 'items',
      label: 'Steps',
      fields: [
        { key: 'num', label: 'Number (e.g. 01)', type: 'text' },
        { key: 'title', label: 'Title (e.g. DISCOVER)', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'icon', label: 'Icon (FontAwesome, e.g. magnifying-glass, flask, capsules)', type: 'icon' },
      ],
      blank: { num: '', title: '', desc: '', icon: '' },
      defaults: [
        { num: '01', title: 'DISCOVER', desc: 'Understand your opportunity, category, Consumer and product requirements.', icon: 'fa-solid fa-magnifying-glass' },
        { num: '02', title: 'DEVELOP', desc: 'Select a relevant formulation or work towards a customized solution.', icon: 'fa-solid fa-flask-vial' },
        { num: '03', title: 'SELECT', desc: 'Evaluate the appropriate dosage form and product configuration.', icon: 'fa-solid fa-capsules' },
        { num: '04', title: 'FINALIZE', desc: 'Align formulation, specifications, packaging and commercial requirements.', icon: 'fa-solid fa-shield-halved' },
        { num: '05', title: 'MANUFACTURE', desc: 'Execute production through structured, quality-focused processes.', icon: 'fa-solid fa-industry' },
        { num: '06', title: 'PACKAGE', desc: 'Create practical, complaint and market-ready packaging solutions.', icon: 'fa-solid fa-box-open' },
        { num: '07', title: 'DELIVER', desc: 'Support reliable supply aligned with your market requirements.', icon: 'fa-solid fa-truck-fast' },
      ],
    },
    defaults: {
      eyebrow: '2A2. FROM IDEA TO MARKET',
      title: 'From Idea to Market in 7 Seamless Steps',
      subtitle: 'A structured, de-risked pathway designed to bring breakthrough healthcare products to life.',
      bannerTheme: 'terracotta',
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
    },
  },
  {
    key: 'about_build',
    name: 'Build With ONPHARNO (3 Cards)',
    type: 'Card Grid + Banner',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title1', label: 'Heading — first part', type: 'text' },
      { key: 'title2', label: 'Heading — highlighted part', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'bannerIcon', label: 'Bottom Banner: Icon (Font Awesome)', type: 'icon' },
      { key: 'bannerTitle', label: 'Bottom Banner: Heading', type: 'text' },
      { key: 'bannerDesc', label: 'Bottom Banner: Text', type: 'textarea' },
      { key: 'bannerCtaText', label: 'Bottom Banner: Button Text', type: 'text' },
      { key: 'bannerCtaLink', label: 'Bottom Banner: Button Link', type: 'text' },
      { key: 'bannerImage', label: 'Bottom Banner: Right Image', type: 'image' },
    ],
    items: {
      key: 'items',
      label: 'Cards',
      fields: [
        { key: 'icon', label: 'Icon (Font Awesome)', type: 'icon' },
        { key: 'badge', label: 'Badge', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'subtitle', label: 'Sub-title', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'link', label: 'Link', type: 'text' },
        { key: 'image', label: 'Card Background Image', type: 'image' },
      ],
      blank: { icon: '', badge: '', title: '', subtitle: '', desc: '', link: '', image: '' },
      defaults: [
        {
          icon: 'fa-solid fa-gauge-high',
          badge: 'Speed to Market',
          title: 'Ready-to-Launch Formulations',
          subtitle: 'Market-Tested Stability & Compliance',
          desc: 'Access over 500+ pre-validated, shelf-stable healthcare and nutraceutical formulations across 12 health categories for swift commercial rollout.',
          link: '/products',
          image: '',
        },
        {
          icon: 'fa-solid fa-flask',
          badge: 'R&D Innovation',
          title: 'Tailored Custom Development',
          subtitle: 'Bespoke Dosage Innovations',
          desc: 'Collaborate with our R&D formulation scientists to engineer proprietary multi-active combinations, novel release profiles, or signature aesthetics.',
          link: '/capabilities/product-development',
          image: '',
        },
        {
          icon: 'fa-solid fa-handshake',
          badge: 'Commercial Scale',
          title: 'Contract & Private Label Scale',
          subtitle: 'High-Volume Precision Manufacturing',
          desc: 'State-of-the-art cGMP automated manufacturing infrastructure capable of handling commercial batch scale with uncompromising quality compliance.',
          link: '/capabilities/manufacturing',
          image: '',
        },
      ],
    },
    defaults: {
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
    },
  },
  {
    key: 'about_partnership',
    name: 'Partnership Commitments (6)',
    type: 'Checklist Grid',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    ],
    items: {
      key: 'items',
      label: 'Commitments',
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
      ],
      blank: { title: '', desc: '' },
      defaults: [
        { title: 'Quality Focus', desc: 'Zero-compromise pharmaceutical grade standards and multi-point analytical release testing.' },
        { title: 'Scientific Approach', desc: 'Bioavailability-first formulation engineering grounded in clinical pharmacology.' },
        { title: 'Reliable Supply', desc: 'Robust procurement channels, predictable lead times, and guaranteed batch-to-batch consistency.' },
        { title: 'Diverse Capability', desc: 'Specialized mastery in liquid-filled capsules, capsule-in-capsule, gummies, and effervescent.' },
        { title: 'Responsive Partnership', desc: 'Dedicated project managers and regulatory specialists who communicate with transparency.' },
        { title: 'Commercial Thinking', desc: 'Target cost-of-goods alignment, shelf differentiation, and market-ready packaging design.' },
      ],
    },
    defaults: {
      title: 'Built Around What Better Partnerships Need',
      subtitle: 'Six commitments that define our long-term client collaborations.',
    },
  },
  {
    pageKey: 'quality',
    key: 'quality_hero',
    name: 'Quality: Hero',
    type: 'Hero',
    fields: [
      { key: 'eyebrow', label: 'Badge / Eyebrow', type: 'text' },
      { key: 'title1', label: 'Heading Line 1', type: 'text' },
      { key: 'title2', label: 'Heading Line 2 (highlighted)', type: 'text' },
      { key: 'subtitle', label: 'Paragraph', type: 'textarea' },
      { key: 'imageAlt', label: 'Image Alt Text', type: 'text' },
    ],
    image: true,
    defaults: {
      eyebrow: 'Quality Assurance & Control',
      title1: 'Quality Is Built Into Every Stage.',
      title2: 'Which Builds Trust.',
      subtitle:
        'Quality is not an afterthought or an inspection badge at the end of a line. At ONPHARNO, quality is our operating system—embedded into raw material selection, machine engineering, and finished product release.',
      imageAlt: 'ONPHARNO Quality Assurance',
    },
  },
  {
    pageKey: 'quality',
    key: 'quality_steps',
    name: 'Quality: 6-Step Protocol + Callout',
    type: 'Steps + Callout',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'calloutTitle', label: 'Callout: Heading', type: 'text' },
      { key: 'calloutDesc', label: 'Callout: Text', type: 'textarea' },
      { key: 'ctaText', label: 'Callout: Button Text', type: 'text' },
      { key: 'ctaLink', label: 'Callout: Button Link', type: 'text' },
    ],
    items: {
      key: 'items',
      label: 'Steps',
      fields: [
        { key: 'num', label: 'Number', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'subtitle', label: 'Sub-title', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
      ],
      blank: { num: '', title: '', subtitle: '', desc: '' },
      defaults: [
        { num: '01', title: 'RAW MATERIAL EVALUATION', subtitle: '', desc: 'Relevant material requirements and specifications.' },
        { num: '02', title: 'CONTROLLED DEVELOPMENT', subtitle: '', desc: 'Structured formulation and product-development processes.' },
        { num: '03', title: 'MANUFACTURING CONTROLS', subtitle: '', desc: 'Defined production processes.' },
        { num: '04', title: 'IN-PROCESS CHECKS', subtitle: '', desc: 'Appropriate checks during manufacturing.' },
        { num: '05', title: 'FINISHED PRODUCT EVALUATION', subtitle: '', desc: 'Assessment against defined product requirements.' },
        { num: '06', title: 'DOCUMENTATION & TRACEABILITY', subtitle: '', desc: 'Relevant product and batch documentation.' },
      ],
    },
    defaults: {
      eyebrow: 'Our 6-Step Assurance Protocol',
      title: 'End-to-End Quality Validation',
      subtitle: 'How we guarantee batch-to-batch consistency and regulatory compliance.',
      calloutTitle: '"Quality Is Not a Badge. It Is a Process."',
      calloutDesc:
        'We provide partners with complete audit transparency, allowing full technical visits, document inspections, and third-party lab cross-validations.',
      ctaText: 'View All Certifications & Accreditations',
      ctaLink: '/resources/certifications',
    },
  },
  {
    pageKey: 'facilities',
    key: 'facilities_hero',
    name: 'Facilities: Hero',
    type: 'Hero',
    fields: [
      { key: 'eyebrow', label: 'Badge / Eyebrow', type: 'text' },
      { key: 'title1', label: 'Heading Line 1', type: 'text' },
      { key: 'title2', label: 'Heading Line 2 (highlighted)', type: 'text' },
      { key: 'subtitle', label: 'Paragraph', type: 'textarea' },
      { key: 'imageAlt', label: 'Image Alt Text', type: 'text' },
    ],
    image: true,
    defaults: {
      eyebrow: '2C. FACILITIES',
      title1: 'See Where Products',
      title2: 'Become Real.',
      subtitle: 'Get complete visibility into the manufacturing environment behind the product.',
      imageAlt: 'ONPHARNO manufacturing facility',
    },
  },
  {
    pageKey: 'facilities',
    key: 'facilities_infrastructure',
    name: 'Facilities: Infrastructure Grid',
    type: 'Image Card Grid',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    ],
    items: {
      key: 'items',
      label: 'Cards',
      fields: [
        { key: 'image', label: 'Card Image', type: 'image' },
        { key: 'category', label: 'Category Label', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'link', label: 'Learn More Link', type: 'text' },
      ],
      blank: { image: '', category: '', title: '', desc: '', link: '' },
      defaults: [
        { image: '/images/manufacturing-facility.jpg', category: 'SHOW / MANUFACTURING', title: 'Production Environment', desc: 'Technology and environments supporting dosage-form requirements.', link: '/capabilities/manufacturing' },
        { image: '/images/formulation-scientists.png', category: 'R&D', title: 'Development Labs', desc: 'Product and formulation development, supported by our scientific team.', link: '/capabilities/product-development' },
        { image: '/images/scientist-pharmacist.png', category: 'QUALITY CONTROL', title: 'Quality Testing', desc: 'Testing and evaluation environments for every stage of production.', link: '/about/quality' },
        { image: '/images/packaging-line.jpg', category: 'PRODUCTION EQUIPMENT', title: 'Production Lines', desc: 'Technology and equipment supporting manufacturing operations.', link: '/capabilities/manufacturing' },
        { image: '/images/format-capsules.jpg', category: 'PACKAGING', title: 'Packaging Lines', desc: 'Finished-product configuration and market-ready presentation.', link: '/capabilities/packaging-documentation' },
        { image: '/images/facility-highlights.jpg', category: 'WAREHOUSE', title: 'Controlled Storage', desc: 'Materials and finished-product infrastructure under controlled conditions.', link: '/contact' },
      ],
    },
    defaults: {
      eyebrow: 'OUR INFRASTRUCTURE',
      title: 'Engineered for Pharmaceutical Precision',
      subtitle: 'State-of-art facilities to support every stage of your product journey.',
    },
  },
  {
    pageKey: 'facilities',
    key: 'facilities_feature',
    name: 'Facilities: Feature + Audit CTA',
    type: 'Feature + CTA',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Feature Title', type: 'text' },
      { key: 'desc', label: 'Feature Description', type: 'textarea' },
      { key: 'badge1Icon', label: 'Badge 1 Icon (Font Awesome)', type: 'icon' },
      { key: 'badge1Label', label: 'Badge 1 Label', type: 'text' },
      { key: 'badge2Icon', label: 'Badge 2 Icon (Font Awesome)', type: 'icon' },
      { key: 'badge2Label', label: 'Badge 2 Label', type: 'text' },
      { key: 'badge3Icon', label: 'Badge 3 Icon (Font Awesome)', type: 'icon' },
      { key: 'badge3Label', label: 'Badge 3 Label', type: 'text' },
      { key: 'ctaText', label: 'Feature Button Text', type: 'text' },
      { key: 'ctaLink', label: 'Feature Button Link', type: 'text' },
      { key: 'image1', label: 'Feature Image 1', type: 'image' },
      { key: 'image2', label: 'Feature Image 2', type: 'image' },
      { key: 'image3', label: 'Feature Image 3', type: 'image' },
      { key: 'auditTitle', label: 'Audit CTA: Heading', type: 'text' },
      { key: 'auditDesc', label: 'Audit CTA: Text', type: 'textarea' },
      { key: 'auditBtn1Text', label: 'Audit Button 1 Text', type: 'text' },
      { key: 'auditBtn1Link', label: 'Audit Button 1 Link', type: 'text' },
      { key: 'auditBtn2Text', label: 'Audit Button 2 Text', type: 'text' },
      { key: 'auditBtn2Link', label: 'Audit Button 2 Link', type: 'text' },
    ],
    defaults: {
      eyebrow: 'SPECIAL FEATURE',
      title: 'Dedicated Liquid-Filled Hard Capsule Suites',
      desc: 'From formulation development to production and quality, we own the processes behind the products we build with our partners.',
      badge1Icon: 'fa-solid fa-gear',
      badge1Label: 'Actual Equipment',
      badge2Icon: 'fa-solid fa-flask',
      badge2Label: 'Actual Process',
      badge3Icon: 'fa-solid fa-bolt',
      badge3Label: 'Actual Cleanroom',
      ctaText: 'Explore Liquid-Filled Capability →',
      ctaLink: '/products/liquid-filled-hard-capsules',
      image1: '/images/liquid-capsule-process.jpg',
      image2: '/images/format-capsules.jpg',
      image3: '/images/facility-highlights.jpg',
      auditTitle: 'Schedule a Technical or Regulatory Facility Audit',
      auditDesc: 'We welcome technical audits for our manufacturing operations, regulatory inspection, and quality assurance.',
      auditBtn1Text: 'Request Audit Appointment →',
      auditBtn1Link: '/contact',
      auditBtn2Text: 'Email Quality Assurance',
      auditBtn2Link: 'mailto:quality@onpharno.com',
    },
  },
  {
    pageKey: 'team',
    key: 'team_hero',
    name: 'Team: Hero',
    type: 'Hero',
    fields: [
      { key: 'eyebrow', label: 'Badge / Eyebrow', type: 'text' },
      { key: 'title1', label: 'Heading Line 1', type: 'text' },
      { key: 'title2', label: 'Heading Line 2 (highlighted)', type: 'text' },
      { key: 'subtitle', label: 'Paragraph', type: 'textarea' },
      { key: 'imageAlt', label: 'Image Alt Text', type: 'text' },
    ],
    image: true,
    defaults: {
      eyebrow: 'SCIENTIFIC & EXECUTIVE TEAM',
      title1: 'Expertise Matters.',
      title2: 'Products Are Built by People Who Understand the Details.',
      subtitle:
        'From dedicated scientists, quality assurance auditors, and multidisciplinary leaders who bring deep expertise in every stage of development and manufacturing.',
      imageAlt: 'ONPHARNO scientific team',
    },
  },
  {
    pageKey: 'team',
    key: 'team_grid',
    name: 'Team: Grid + CTA',
    type: 'Team Grid + CTA',
    fields: [
      { key: 'ctaTitle', label: 'Bottom CTA: Heading', type: 'text' },
      { key: 'ctaDesc', label: 'Bottom CTA: Text', type: 'textarea' },
      { key: 'ctaText', label: 'Bottom CTA: Button Text', type: 'text' },
      { key: 'ctaLink', label: 'Bottom CTA: Button Link', type: 'text' },
      { key: 'ctaImage1', label: 'Bottom CTA: Left Image', type: 'image' },
      { key: 'ctaImage2', label: 'Bottom CTA: Right Image', type: 'image' },
    ],
    items: {
      key: 'items',
      label: 'Team Members',
      fields: [
        { key: 'photo', label: 'Photo', type: 'image' },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'department', label: 'Department (select or create)', type: 'department' },
        { key: 'bio', label: 'Short Bio', type: 'textarea' },
        { key: 'label', label: 'Team Label (bottom of card)', type: 'text' },
      ],
      blank: { photo: '', name: '', role: '', department: '', bio: '', label: '' },
      defaults: [
        { photo: '/images/scientist-pharmacist.png', name: 'Dr. Priya Sharma, Ph.D.', role: 'Head of R&D', department: 'R&D', bio: '20+ years in pharmaceutical formulation sciences, with expertise in nutraceuticals and drug manufacturing.', label: 'R&D Leadership Team' },
        { photo: '/images/formulation-scientists.png', name: 'Anurag Mehta, M.Pharm', role: 'Head of Quality Assurance', department: 'Quality', bio: 'Ensuring regulatory compliance, validated processes, and consistent product quality.', label: 'Quality Team' },
        { photo: '/images/scientist-pharmacist.png', name: 'Vikram Mehta', role: 'Head of Quality Control', department: 'Quality', bio: 'Overseeing analytical testing and maintaining stringent quality benchmarks.', label: 'Quality Team' },
        { photo: '/images/manufacturing-facility.jpg', name: 'Rithish Kumar', role: 'Head of Operations', department: 'Manufacturing', bio: 'Driving efficient and compliant manufacturing operations.', label: 'Manufacturing Team' },
        { photo: '/images/formulation-scientists.png', name: 'Pooja Desai', role: 'Head of Formulation', department: 'Formulation', bio: 'Leading formulation development for prototypes and custom products.', label: 'Formulation Team' },
        { photo: '/images/scientist-pharmacist.png', name: 'Karan Singh', role: 'Head of Business Development', department: 'Business Development', bio: 'Building strategic partnerships for global growth.', label: 'Business Development Team' },
      ],
    },
    defaults: {
      departments: 'All Departments, Management, R&D, Formulation, Quality, Manufacturing, Operations, Business Development, International Business',
      ctaTitle: 'Collaborate With Our Scientific Experts',
      ctaDesc: 'From idea to innovation — work with our experienced team to develop high-quality, compliant, and effective healthcare solutions.',
      ctaText: 'Schedule a Technical Consultation →',
      ctaLink: '/contact',
      ctaImage1: '/images/format-capsules.jpg',
      ctaImage2: '/images/scientist-pharmacist.png',
    },
  },
  {
    pageKey: 'team',
    key: 'team_departments',
    name: 'Team: Departments (Filter Tabs)',
    type: 'Filter List',
    fields: [],
    items: {
      key: 'items',
      label: 'Departments',
      fields: [{ key: 'name', label: 'Department Name', type: 'text' }],
      blank: { name: '' },
      defaults: [
        { name: 'All Departments' },
        { name: 'Management' },
        { name: 'R&D' },
        { name: 'Formulation' },
        { name: 'Quality' },
        { name: 'Manufacturing' },
        { name: 'Operations' },
        { name: 'Business Development' },
        { name: 'International Business' },
      ],
    },
    defaults: {},
  },
  {
    pageKey: 'resources',
    key: 'resources_blogs',
    name: 'Resources: Blogs Page Text',
    type: 'Page Text',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Heading', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    ],
    defaults: {
      eyebrow: 'Knowledge Hub & Publications',
      title: 'Scientific Insights & Articles',
      subtitle: 'Insights From the Future of Healthcare and Advanced Contract Formulation.',
    },
  },
  {
    pageKey: 'resources',
    key: 'resources_faqs',
    name: 'Resources: FAQs Page Text',
    type: 'Page Text + CTA',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Heading', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'ctaTitle', label: 'Bottom Box: Heading', type: 'text' },
      { key: 'ctaDesc', label: 'Bottom Box: Text', type: 'textarea' },
      { key: 'ctaText', label: 'Bottom Box: Link Text', type: 'text' },
      { key: 'ctaLink', label: 'Bottom Box: Link', type: 'text' },
    ],
    defaults: {
      eyebrow: 'Resources',
      title: 'Knowledge & FAQs',
      subtitle: 'Answers to common questions regarding formulation, contract manufacturing, MOQs, and quality assurance.',
      ctaTitle: 'Have a question not listed here?',
      ctaDesc: 'Our technical product advisors are ready to assist you.',
      ctaText: 'Ask Our Product Specialists →',
      ctaLink: '/contact',
    },
  },
  {
    pageKey: 'resources',
    key: 'resources_certifications',
    name: 'Resources: Certifications Page Text',
    type: 'Page Text',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Heading', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    ],
    defaults: {
      eyebrow: 'Quality Standards',
      title: 'Certifications & Accreditations',
      subtitle: 'Verified compliance with national and international regulatory standards.',
    },
  },
  {
    pageKey: 'resources',
    key: 'resources_videos',
    name: 'Resources: Videos Page Text',
    type: 'Page Text',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Heading', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    ],
    defaults: {
      eyebrow: 'Media & Tours',
      title: 'Video Library',
      subtitle: 'Take a virtual tour of our high-speed manufacturing lines and R&D cleanrooms.',
    },
  },
];

const buildInitialForm = (tpl, record) => ({
  _id: record?._id || null,
  visible: record ? record.visible !== false : true,
  image: record?.image || '',
  content: { ...tpl.defaults, ...(record?.content || {}) },
});

const AboutStoryCMS = () => {
  const [forms, setForms] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState('');
  const [savingKey, setSavingKey] = useState('');
  const [newDeptFor, setNewDeptFor] = useState('');
  const [searchParams] = useSearchParams();
  const focusSection = searchParams.get('section') || '';
  const pageFilter = searchParams.get('page') || '';
  const visibleTemplates = pageFilter
    ? SECTION_TEMPLATES.filter((t) => (t.pageKey || 'about') === pageFilter)
    : SECTION_TEMPLATES;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get('/admin/sections');
        const all = Array.isArray(res?.data) ? res.data : [];
        const next = {};
        SECTION_TEMPLATES.forEach((tpl) => {
          const record = all.find((s) => s.key === tpl.key);
          next[tpl.key] = buildInitialForm(tpl, record);
        });
        setForms(next);
      } catch {
        toast.error('Failed to load About Story sections');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateField = (key, field, value) => {
    setForms((prev) => ({
      ...prev,
      [key]: { ...prev[key], content: { ...prev[key].content, [field]: value } },
    }));
  };

  const updateItem = (key, itemKey, idx, prop, value) => {
    setForms((prev) => {
      const content = { ...prev[key].content };
      const items = [...(content[itemKey] || [])];
      items[idx] = { ...items[idx], [prop]: value };
      content[itemKey] = items;
      return { ...prev, [key]: { ...prev[key], content } };
    });
  };

  const addItem = (key, tpl) => {
    setForms((prev) => {
      const content = { ...prev[key].content };
      content[tpl.items.key] = [...(content[tpl.items.key] || []), { ...tpl.items.blank }];
      return { ...prev, [key]: { ...prev[key], content } };
    });
  };

  const removeItem = (key, itemKey, idx) => {
    setForms((prev) => {
      const content = { ...prev[key].content };
      content[itemKey] = (content[itemKey] || []).filter((_, i) => i !== idx);
      return { ...prev, [key]: { ...prev[key], content } };
    });
  };

  const resetItems = (key, tpl) => {
    setForms((prev) => {
      const content = { ...prev[key].content };
      content[tpl.items.key] = tpl.items.defaults.map((item) => ({ ...item }));
      return { ...prev, [key]: { ...prev[key], content } };
    });
  };

  const handleUpload = async (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    setUploadingKey(key);
    try {
      const res = await apiClient.post('/admin/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = res?.data?.url || res?.url;
      if (url) {
        setForms((prev) => ({ ...prev, [key]: { ...prev[key], image: url } }));
        toast.success('Image uploaded');
      } else {
        toast.error('No URL returned');
      }
    } catch (err) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setUploadingKey('');
      e.target.value = '';
    }
  };

  const handleContentUpload = async (e, key, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    setUploadingKey(`${key}:${field}`);
    try {
      const res = await apiClient.post('/admin/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = res?.data?.url || res?.url;
      if (url) {
        updateField(key, field, url);
        toast.success('Image uploaded');
      } else {
        toast.error('No URL returned');
      }
    } catch (err) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setUploadingKey('');
      e.target.value = '';
    }
  };

  const handleItemImageUpload = async (e, key, itemKey, idx, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    setUploadingKey(`${key}:${itemKey}:${idx}:${field}`);
    try {
      const res = await apiClient.post('/admin/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = res?.data?.url || res?.url;
      if (url) {
        updateItem(key, itemKey, idx, field, url);
        toast.success('Image uploaded');
      } else {
        toast.error('No URL returned');
      }
    } catch (err) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setUploadingKey('');
      e.target.value = '';
    }
  };

  const departmentNames = (forms.team_departments?.content?.items || [])
    .map((d) => asText(d.name))
    .filter(Boolean);

  const addDepartment = (name) => {
    const clean = asText(name);
    if (!clean || departmentNames.includes(clean)) return;
    setForms((prev) => {
      const dept = prev.team_departments;
      if (!dept) return prev;
      const content = { ...dept.content, items: [...(dept.content?.items || []), { name: clean }] };
      return { ...prev, team_departments: { ...dept, content } };
    });
  };

  const handleSave = async (tpl) => {
    const form = forms[tpl.key];
    if (!form) return;
    setSavingKey(tpl.key);
    const payload = {
      pageKey: tpl.pageKey || 'about',
      key: tpl.key,
      name: tpl.name,
      type: tpl.type,
      title: '',
      subtitle: '',
      image: form.image || '',
      content: form.content,
      visible: !!form.visible,
    };
    try {
      if (form._id) {
        await apiClient.put(`/admin/sections/${form._id}`, payload);
      } else {
        await apiClient.post('/admin/sections', payload);
      }
      toast.success(`${tpl.name} saved`);
    } catch (err) {
      toast.error(err?.message || 'Failed to save section');
    } finally {
      setSavingKey('');
    }
  };

  useEffect(() => {
    if (!loading && focusSection) {
      const el = document.getElementById(`section-${focusSection}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [loading, focusSection]);

  if (loading) return <div className="text-sm text-gray-500">Loading About Story sections...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">
            {pageFilter === 'quality'
              ? 'Quality Page (CMS)'
              : pageFilter === 'facilities'
              ? 'Facilities Page (CMS)'
              : pageFilter === 'team'
              ? 'Our Team Page (CMS)'
              : 'Our Story Page (CMS)'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {pageFilter
              ? `Editing only the ${pageFilter} page sections. Empty fields are hidden on the website.`
              : 'Manage all page sections. Empty fields are hidden on the website — no fallback once saved.'}
          </p>
        </div>
        <Link to="/about/our-story" target="_blank" className="text-xs font-semibold text-primary hover:underline">
          View live page ↗
        </Link>
      </div>

      {visibleTemplates.map((tpl, i) => {
        const form = forms[tpl.key];
        const pageKey = tpl.pageKey || 'about';
        const prevKey = i > 0 ? visibleTemplates[i - 1].pageKey || 'about' : null;
        return (
          <React.Fragment key={tpl.key}>
          {prevKey !== pageKey && (
            <div className="pt-3">
              <h2 className="text-lg font-bold text-charcoal border-b pb-2">
                {pageKey === 'quality'
                  ? 'Quality Page Sections'
                  : pageKey === 'facilities'
                  ? 'Facilities Page Sections'
                  : pageKey === 'team'
                  ? 'Our Team Page Sections'
                  : pageKey === 'resources'
                  ? 'Resources Pages Sections'
                  : 'Our Story Page Sections'}
              </h2>
            </div>
          )}
          {form && (
          <div
            id={`section-${tpl.key}`}
            className={`bg-white rounded-2xl border shadow-sm p-6 space-y-4 ${
              focusSection === tpl.key ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between gap-3 border-b pb-3">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase bg-warm px-2 py-0.5 rounded">{tpl.type}</span>
                <h2 className="font-bold text-lg text-charcoal mt-1">{tpl.name}</h2>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[11px] text-gray-600 flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!form.visible}
                    onChange={(e) => setForms((prev) => ({ ...prev, [tpl.key]: { ...prev[tpl.key], visible: e.target.checked } }))}
                    className="w-4 h-4 text-primary rounded"
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() => handleSave(tpl)}
                  disabled={savingKey === tpl.key}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark disabled:opacity-60"
                >
                  <Save className="w-3.5 h-3.5" /> {savingKey === tpl.key ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tpl.fields.map((field) => (
                <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={form.content[field.key] ?? ''}
                      onChange={(e) => updateField(tpl.key, field.key, e.target.value)}
                      className="w-full p-2 border rounded-lg text-xs resize-y"
                    />
                  ) : field.type === 'icon' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={form.content[field.key] ?? ''}
                        onChange={(e) => updateField(tpl.key, field.key, e.target.value)}
                        placeholder="fa-solid fa-flask"
                        className="flex-1 p-2 border rounded-lg text-xs font-mono"
                      />
                      {toFaClass(form.content[field.key]) ? <i className={`${toFaClass(form.content[field.key])} text-primary`} aria-hidden="true" /> : null}
                    </div>
                  ) : field.type === 'image' ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={form.content[field.key] ?? ''}
                          onChange={(e) => updateField(tpl.key, field.key, e.target.value)}
                          placeholder="/uploads/... or https://..."
                          className="flex-1 p-2 border rounded-lg text-xs font-mono"
                        />
                        <label className={`inline-flex items-center gap-1 px-2.5 py-2 rounded-lg border border-gray-200 text-[11px] font-semibold text-primary cursor-pointer shrink-0 ${uploadingKey === `${tpl.key}:${field.key}` ? 'opacity-50' : 'hover:border-primary'}`}>
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingKey === `${tpl.key}:${field.key}` ? 'Uploading...' : 'Upload'}</span>
                          <input type="file" accept="image/*" onChange={(e) => handleContentUpload(e, tpl.key, field.key)} className="hidden" disabled={uploadingKey === `${tpl.key}:${field.key}`} />
                        </label>
                      </div>
                      {form.content[field.key]?.trim() ? (
                        <div className="mt-1 flex items-center gap-2">
                          <img
                            src={getImageUrl(form.content[field.key].trim())}
                            alt="Preview"
                            className="h-14 w-auto max-w-xs object-contain rounded border border-gray-200 bg-gray-50 p-1"
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                          />
                          <button
                            type="button"
                            onClick={() => updateField(tpl.key, field.key, '')}
                            className="text-[11px] text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : field.type === 'select' ? (
                    <select
                      value={form.content[field.key] ?? field.options?.[0]?.value ?? ''}
                      onChange={(e) => updateField(tpl.key, field.key, e.target.value)}
                      className="w-full p-2 border rounded-lg text-xs bg-white text-charcoal font-medium"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={form.content[field.key] ?? ''}
                      onChange={(e) => updateField(tpl.key, field.key, e.target.value)}
                      className="w-full p-2 border rounded-lg text-xs"
                    />
                  )}
                </div>
              ))}
            </div>

            {tpl.image && (
              <div className="space-y-2 p-3 bg-warm/40 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-charcoal uppercase tracking-wider">Image</span>
                  <label className={`inline-flex items-center gap-1 text-[11px] font-semibold text-primary cursor-pointer ${uploadingKey === tpl.key ? 'opacity-50' : ''}`}>
                    <Upload className="w-3.5 h-3.5" /> {uploadingKey === tpl.key ? 'Uploading...' : 'Upload'}
                    <input type="file" accept="image/*" onChange={(e) => handleUpload(e, tpl.key)} className="hidden" disabled={uploadingKey === tpl.key} />
                  </label>
                </div>
                <input
                  type="text"
                  value={form.image || ''}
                  onChange={(e) => setForms((prev) => ({ ...prev, [tpl.key]: { ...prev[tpl.key], image: e.target.value } }))}
                  placeholder="/uploads/... or https://..."
                  className="w-full p-2 border rounded-lg text-xs font-mono"
                />
                <p className="text-[10px] text-gray-500">Leave empty to keep the current look. Recommended 1600×900 (16:9).</p>
                {form.image?.trim() ? (
                  <img
                    src={getImageUrl(form.image.trim())}
                    alt="Preview"
                    className="h-20 w-32 object-contain rounded border border-gray-200 bg-white"
                    onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                  />
                ) : null}
              </div>
            )}

            {tpl.items && (
              <div className="space-y-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-charcoal uppercase tracking-wider">{tpl.items.label}</span>
                  <button
                    type="button"
                    onClick={() => resetItems(tpl.key, tpl)}
                    className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Defaults
                  </button>
                </div>
                {(form.content[tpl.items.key] || []).map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 flex items-start gap-2">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded shrink-0 mt-1">#{idx + 1}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                      {tpl.items.fields.map((f) => (
                        <div key={f.key} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                          <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">{f.label}</label>
                          {f.type === 'textarea' ? (
                            <textarea
                              rows={2}
                              value={item[f.key] ?? ''}
                              onChange={(e) => updateItem(tpl.key, tpl.items.key, idx, f.key, e.target.value)}
                              className="w-full p-1.5 border rounded-lg text-xs resize-y"
                            />
                          ) : f.type === 'icon' ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={item[f.key] ?? ''}
                                onChange={(e) => updateItem(tpl.key, tpl.items.key, idx, f.key, e.target.value)}
                                placeholder="fa-solid fa-flask"
                                className="flex-1 p-1.5 border rounded-lg text-xs font-mono"
                              />
                              {toFaClass(item[f.key]) ? <i className={`${toFaClass(item[f.key])} text-primary`} aria-hidden="true" /> : null}
                            </div>
                          ) : f.type === 'department' ? (
                            <div className="space-y-1.5">
                              <select
                                value={departmentNames.includes(asText(item[f.key])) ? asText(item[f.key]) : '__custom__'}
                                onChange={(e) => {
                                  if (e.target.value === '__new__') {
                                    setNewDeptFor(`${tpl.key}:${idx}`);
                                    updateItem(tpl.key, tpl.items.key, idx, f.key, '');
                                  } else {
                                    setNewDeptFor('');
                                    updateItem(tpl.key, tpl.items.key, idx, f.key, e.target.value === '__custom__' ? '' : e.target.value);
                                  }
                                }}
                                className="w-full p-1.5 border rounded-lg text-xs bg-white"
                              >
                                <option value="">Select department</option>
                                {departmentNames.map((name, nIdx) => (
                                  <option key={`${name}-${nIdx}`} value={name}>{name}</option>
                                ))}
                                {!departmentNames.includes(asText(item[f.key])) && asText(item[f.key]) && (
                                  <option value="__custom__">{asText(item[f.key])} (custom)</option>
                                )}
                                <option value="__new__">+ Create new department</option>
                              </select>
                              {(newDeptFor === `${tpl.key}:${idx}` || (!departmentNames.includes(asText(item[f.key])) && asText(item[f.key]))) && (
                                <input
                                  type="text"
                                  value={asText(item[f.key])}
                                  onChange={(e) => {
                                    updateItem(tpl.key, tpl.items.key, idx, f.key, e.target.value);
                                    addDepartment(e.target.value);
                                  }}
                                  placeholder="New department name"
                                  className="w-full p-1.5 border rounded-lg text-xs"
                                />
                              )}
                            </div>
                          ) : f.type === 'image' ? (
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={item[f.key] ?? ''}
                                  onChange={(e) => updateItem(tpl.key, tpl.items.key, idx, f.key, e.target.value)}
                                  placeholder="/uploads/... or https://..."
                                  className="flex-1 p-1.5 border rounded-lg text-xs font-mono"
                                />
                                <label className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-lg border border-gray-200 text-[11px] font-semibold text-primary cursor-pointer shrink-0 ${uploadingKey === `${tpl.key}:${tpl.items.key}:${idx}:${f.key}` ? 'opacity-50' : ''}`}>
                                  <Upload className="w-3.5 h-3.5" /> Upload
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleItemImageUpload(e, tpl.key, tpl.items.key, idx, f.key)}
                                    className="hidden"
                                    disabled={uploadingKey === `${tpl.key}:${tpl.items.key}:${idx}:${f.key}`}
                                  />
                                </label>
                              </div>
                              {asText(item[f.key]) ? (
                                <img
                                  src={getImageUrl(asText(item[f.key]))}
                                  alt="Preview"
                                  className="h-12 w-20 object-cover rounded border border-gray-200"
                                  onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                                />
                              ) : null}
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={item[f.key] ?? ''}
                              onChange={(e) => updateItem(tpl.key, tpl.items.key, idx, f.key, e.target.value)}
                              className="w-full p-1.5 border rounded-lg text-xs"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(tpl.key, tpl.items.key, idx)}
                      className="text-gray-400 hover:text-red-500 p-1 mt-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem(tpl.key, tpl)}
                  className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> Add {tpl.items.label.replace(/s$/, '')}
                </button>
              </div>
            )}
          </div>
          )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default AboutStoryCMS;
