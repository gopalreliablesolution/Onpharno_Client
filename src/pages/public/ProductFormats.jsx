import React from 'react';
import CapabilityPage, { ImageCard, CtaBanner } from '../../components/common/CapabilityPage';

const defaults = {
  eyebrow: '4D — Product Formats',
  heroTitle: 'The Right Format\nCan Shape the Product.',
  heroSubtitle: 'Different formulations and product requirements call for different dosage forms.',
  heroImage: '/images/format-capsules.jpg',
  heroCtaText: 'Explore All Formats',
  heroCtaLink: '#formats',
  featuredTitle: 'LIQUID-FILLED HARD CAPSULES',
  featuredDesc: 'A hard-capsule format designed for compatible liquid and semi-liquid formulations.',
  featuredImage: '/images/transparent-capsule-step-4.png',
  featuredCtaText: 'EXPLORE →',
  featuredCtaLink: '/products/liquid-filled-hard-capsules',
  advancedTitle: 'CAPSULE-IN-CAPSULE',
  advancedDesc: 'A specialized dosage-form concept for selected product configurations.',
  advancedImage: '/images/capsule-step-3.png',
  advancedCtaText: 'EXPLORE →',
  advancedCtaLink: '/products/capsule-in-capsule',
  formatsTitle: 'OTHER FORMATS',
  formats: [
    { title: 'CAPSULES', desc: 'A familiar hard-capsule dosage form for suitable dry formulations.', image: '/images/format-capsules.jpg' },
    { title: 'TABLETS', desc: 'A widely used solid dosage form across healthcare categories.', image: '/images/format-tablets.jpg' },
    { title: 'SOFTGELS', desc: 'A soft-shell format commonly used for suitable liquid or semi-liquid formulations.', image: '/images/format-softgels.jpg' },
    { title: 'EFFERVESCENT', desc: 'Designed for products intended to dissolve or disperse in liquid before consumption.', image: '/images/format-effervescent.jpg' },
    { title: 'SACHETS', desc: 'Flexible format for powders and other suitable formulations.', image: '/images/format-sachets.jpg' },
    { title: 'POWDERS', desc: 'A versatile format across nutrition and wellness applications.', image: '/images/format-powders.jpg' },
    { title: 'GUMMIES', desc: 'A consumer-oriented format for selected formulations.', image: '/images/format-gummies.jpg' },
    { title: 'LIQUIDS & SYRUPS', desc: 'Liquid delivery formats for suitable product applications.', image: '/images/format-syrups.jpg' },
    { title: 'ORAL SHOTS', desc: 'Compact liquid-format products for selected applications.', image: '/images/format-shots.jpg' },
  ],
  bannerImage: '/images/format-capsules.jpg',
  bannerTitle: 'Not Sure Which Format Fits?',
  bannerDesc: "Let's start with the product requirement.",
  ctaText: 'DISCUSS YOUR PRODUCT →',
  ctaLink: '/contact',
};

const ProductFormats = () => (
  <CapabilityPage
    sectionKey="cap_product_formats"
    defaults={defaults}
    seoTitle="Product Formats - ONPHARNO"
    seoDescription="Explore the formats available across the ONPHARNO product-development and manufacturing ecosystem."
    renderBody={({ d, txt, arr }) => (
      <>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageCard
            dark
            txt={txt}
            item={{ title: d.featuredTitle, subtitle: 'Featured Format', image: d.featuredImage, desc: d.featuredDesc, link: d.featuredCtaLink, cta: d.featuredCtaText }}
          />
          <ImageCard
            dark
            txt={txt}
            item={{ title: d.advancedTitle, subtitle: 'Advanced Format', image: d.advancedImage, desc: d.advancedDesc, link: d.advancedCtaLink, cta: d.advancedCtaText }}
          />
        </section>
        <section id="formats">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-8 text-center">{txt(d.formatsTitle)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {arr(d.formats).map((f, i) => <ImageCard key={i} item={f} txt={txt} compact />)}
          </div>
        </section>
        <CtaBanner d={d} txt={txt} />
      </>
    )}
  />
);

export default ProductFormats;
