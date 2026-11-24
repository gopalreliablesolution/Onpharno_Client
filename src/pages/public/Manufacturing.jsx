import React from 'react';
import CapabilityPage, { Timeline, ImageCard, CtaBanner } from '../../components/common/CapabilityPage';

const defaults = {
  eyebrow: '4C — Manufacturing Capabilities',
  heroTitle: 'Built to Manufacture.\nFocused on Consistency.',
  heroSubtitle: 'ONPHARNO supports the manufacturing journey across selected healthcare and nutraceutical dosage forms, with processes designed around defined product, quality and commercial requirements.',
  heroImage: '/images/manufacturing-facility.jpg',
  heroCtaText: 'Explore Our Capabilities',
  heroCtaLink: '/contact',
  features: [
    { title: 'LIQUID-FILLED HARD CAPSULES', subtitle: 'ONPHARNO SIGNATURE CAPABILITY', desc: 'Liquid and semi-liquid fill applications for compatible formulations.', link: '/products/liquid-filled-hard-capsules', cta: 'EXPLORE →', image: '/images/transparent-capsule-step-4.png' },
    { title: 'CAPSULE-IN-CAPSULE', subtitle: 'ADVANCED DOSAGE-FORM CAPABILITY', desc: 'Specialized capsule configurations subject to product and technical feasibility.', link: '/products/capsule-in-capsule', cta: 'EXPLORE →', image: '/images/capsule-step-3.png' },
  ],
  stepsTitle: 'MANUFACTURING JOURNEY',
  steps: [
    { num: '01', title: 'RAW MATERIAL EVALUATION', desc: 'Relevant material requirements and specifications.', icon: 'fa-solid fa-flask' },
    { num: '02', title: 'CONTROLLED DEVELOPMENT', desc: 'Structured formulation and product-development processes.', icon: 'fa-solid fa-microscope' },
    { num: '03', title: 'MANUFACTURING CONTROLS', desc: 'Defined production processes.', icon: 'fa-solid fa-gears' },
    { num: '04', title: 'IN-PROCESS CHECKS', desc: 'Appropriate checks during manufacturing.', icon: 'fa-solid fa-clipboard-check' },
    { num: '05', title: 'FINISHED PRODUCT EVALUATION', desc: 'Assessment against defined product requirements.', icon: 'fa-solid fa-check-double' },
    { num: '06', title: 'DOCUMENTATION & TRACEABILITY', desc: 'Relevant product and batch documentation.', icon: 'fa-solid fa-file-lines' },
  ],
  bannerImage: '/images/manufacturing-facility.jpg',
  bannerTitle: 'Discuss Your Manufacturing Requirements',
  ctaText: 'DISCUSS YOUR MANUFACTURING REQUIREMENTS →',
  ctaLink: '/contact',
};

const Manufacturing = () => (
  <CapabilityPage
    sectionKey="cap_manufacturing"
    defaults={defaults}
    seoTitle="Manufacturing Capabilities | ONPHARNO"
    seoDescription="ONPHARNO supports the manufacturing journey across selected healthcare and nutraceutical dosage forms."
    renderBody={({ d, txt, arr }) => (
      <>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {arr(d.features).map((f, i) => <ImageCard key={i} item={f} txt={txt} dark />)}
        </section>
        <Timeline items={arr(d.steps)} title={txt(d.stepsTitle)} txt={txt} cols={6} />
        <CtaBanner d={d} txt={txt} />
      </>
    )}
  />
);

export default Manufacturing;
