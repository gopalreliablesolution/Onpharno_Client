import React from 'react';
import CapabilityPage, { IconGrid, ImageCard, CtaBanner } from '../../components/common/CapabilityPage';

const defaults = {
  eyebrow: '4B — Research & Innovation',
  heroTitle: 'Where Product Thinking Meets Scientific Possibility.',
  heroSubtitle: 'Healthcare products continue to evolve through new ingredients, formulations, delivery formats and consumer needs.',
  heroImage: '/images/customized-formulation.jpg',
  heroCtaText: 'Explore Our Capabilities',
  heroCtaLink: '#focus',
  focusTitle: 'AREAS OF FOCUS',
  focusItems: [
    { title: 'FORMULATION', desc: 'Explore formulation approaches around defined product requirements.', icon: 'fa-solid fa-flask' },
    { title: 'DOSAGE-FORM INNOVATION', desc: 'Evaluate alternative ways of delivering a product.', icon: 'fa-solid fa-capsules' },
    { title: 'PRODUCT DIFFERENTIATION', desc: 'Consider format and formulation as part of the product proposition.', icon: 'fa-solid fa-gem' },
    { title: 'MARKET RELEVANCE', desc: 'Connect product development with category and consumer requirements.', icon: 'fa-solid fa-chart-line' },
  ],
  featuredTitle: 'FEATURED TECHNOLOGIES',
  features: [
    { title: 'LIQUID-FILLED HARD CAPSULES', subtitle: 'Advanced Format', link: '/products/liquid-filled-hard-capsules', cta: 'EXPLORE →', image: '/images/transparent-capsule-step-4.png' },
    { title: 'CAPSULE-IN-CAPSULE', subtitle: 'Specialized Format', link: '/products/capsule-in-capsule', cta: 'EXPLORE →', image: '/images/capsule-step-3.png' },
  ],
  bannerImage: '/images/customized-formulation.jpg',
  bannerTitle: 'Innovation Starts With the Right Product Question.',
  ctaText: 'DISCUSS A PRODUCT CONCEPT →',
  ctaLink: '/contact',
};

const ResearchInnovation = () => (
  <CapabilityPage
    sectionKey="cap_research_innovation"
    defaults={defaults}
    seoTitle="Research & Innovation - ONPHARNO"
    seoDescription="Explore formulation thinking, dosage-form development and practical manufacturing considerations behind ONPHARNO's work."
    renderBody={({ d, txt, arr }) => (
      <>
        <div id="focus">
          <IconGrid items={arr(d.focusItems)} title={txt(d.focusTitle)} txt={txt} cols={4} />
        </div>
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-8 text-center">{txt(d.featuredTitle)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {arr(d.features).map((f, i) => <ImageCard key={i} item={f} txt={txt} />)}
          </div>
        </section>
        <CtaBanner d={d} txt={txt} />
      </>
    )}
  />
);

export default ResearchInnovation;
