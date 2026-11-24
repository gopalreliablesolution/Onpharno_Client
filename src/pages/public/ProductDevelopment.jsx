import React from 'react';
import CapabilityPage, { Timeline, IconGrid, ImageCard, CtaBanner } from '../../components/common/CapabilityPage';

const defaults = {
  eyebrow: '4A — Product Development',
  heroTitle: 'From Opportunity to Market-Ready Product.',
  heroSubtitle: 'ONPHARNO works with businesses to translate product ideas, market opportunities and formulation requirements into defined healthcare products.',
  heroImage: '/images/formulation-scientists.png',
  heroCtaText: 'Explore Our Approach',
  heroCtaLink: '#approach',
  approachTitle: 'OUR DEVELOPMENT APPROACH',
  steps: [
    { num: '01', title: 'DISCOVER', desc: 'Understand your opportunity, category, Consumer and product requirements.', icon: 'fa-solid fa-magnifying-glass' },
    { num: '02', title: 'DEVELOP', desc: 'Select a relevant formulation or work towards a customized solution.', icon: 'fa-solid fa-flask' },
    { num: '03', title: 'SELECT', desc: 'Evaluate the appropriate dosage form and product configuration.', icon: 'fa-solid fa-capsules' },
    { num: '04', title: 'FINALIZE', desc: 'Align formulation, specifications, packaging and commercial requirements.', icon: 'fa-solid fa-file-check' },
    { num: '05', title: 'MANUFACTURE', desc: 'Execute production through structured, quality-focused processes.', icon: 'fa-solid fa-industry' },
    { num: '06', title: 'PACKAGE', desc: 'Create practical, compliant and market-ready packaging solutions.', icon: 'fa-solid fa-box' },
    { num: '07', title: 'DELIVER', desc: 'Support reliable supply aligned with your market requirements.', icon: 'fa-solid fa-truck' },
  ],
  helpTitle: 'WHAT WE CAN HELP WITH',
  helpItems: [
    { title: 'Product Concept', desc: '', icon: 'fa-solid fa-lightbulb' },
    { title: 'Formulation', desc: '', icon: 'fa-solid fa-flask' },
    { title: 'Dosage-Form Selection', desc: '', icon: 'fa-solid fa-capsules' },
    { title: 'Product Specifications', desc: '', icon: 'fa-solid fa-file-lines' },
    { title: 'Packaging Considerations', desc: '', icon: 'fa-solid fa-box' },
    { title: 'Manufacturing Feasibility', desc: '', icon: 'fa-solid fa-gears' },
    { title: 'Market Requirements', desc: '', icon: 'fa-solid fa-chart-line' },
  ],
  featuredTitle: 'EXPLORE LIQUID-FILLED HARD CAPSULES.',
  featuredSubtitle: 'Featured Capability',
  featuredDesc: 'A distinctive dosage-form opportunity for compatible liquid and semi-liquid formulations.',
  featuredImage: '/images/format-capsules.jpg',
  featuredCtaText: 'EXPLORE →',
  featuredCtaLink: '/products/liquid-filled-hard-capsules',
  bannerImage: '/images/formulation-scientists.png',
  bannerTitle: 'Have a Product Idea?',
  bannerDesc: 'Let us help you define the next step.',
  ctaText: 'START PRODUCT DEVELOPMENT →',
  ctaLink: '/contact',
};

const ProductDevelopment = () => (
  <CapabilityPage
    sectionKey="cap_product_development"
    defaults={defaults}
    seoTitle="Product Development (Idea to Market) - ONPHARNO"
    seoDescription="Explore ONPHARNO's 7-step turnkey approach to developing pharmaceutical and nutraceutical products from concept to commercialization."
    renderBody={({ d, txt, arr }) => (
      <>
        <div id="approach">
          <Timeline items={arr(d.steps)} title={txt(d.approachTitle)} txt={txt} cols={7} />
        </div>
        <IconGrid items={arr(d.helpItems)} title={txt(d.helpTitle)} txt={txt} cols={7} />
        <section>
          <ImageCard
            dark
            txt={txt}
            item={{
              image: d.featuredImage,
              title: d.featuredTitle,
              subtitle: d.featuredSubtitle,
              desc: d.featuredDesc,
              link: d.featuredCtaLink,
              cta: d.featuredCtaText,
            }}
          />
        </section>
        <CtaBanner d={d} txt={txt} />
      </>
    )}
  />
);

export default ProductDevelopment;
