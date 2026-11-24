import React from 'react';
import CapabilityPage, { ListCard, CtaBanner } from '../../components/common/CapabilityPage';

const defaults = {
  eyebrow: '4E — Packaging & Documentation',
  heroTitle: 'From Finished Product\nto Market-Ready Product.',
  heroSubtitle: 'Packaging and documentation are part of the product journey—not an afterthought. ONPHARNO works with partners to align the finished product with defined packaging, documentation and commercial requirements.',
  heroImage: '/images/hero-bottles.png',
  heroCtaText: 'Explore Our Solutions',
  heroCtaLink: '#packaging',
  packagingTitle: 'PACKAGING',
  packagingItems: [
    { title: 'PRIMARY PACKAGING', desc: 'Product-contact packaging appropriate to the defined product configuration.', icon: 'fa-solid fa-box' },
    { title: 'SECONDARY PACKAGING', desc: 'Cartons, labels and other external packaging requirements.', icon: 'fa-solid fa-boxes-stacked' },
    { title: 'PRODUCT CONFIGURATION', desc: 'Pack size, count, presentation and commercial format.', icon: 'fa-solid fa-cubes' },
    { title: 'MARKET REQUIREMENTS', desc: 'Packaging and labelling considerations for the intended market.', icon: 'fa-solid fa-globe' },
  ],
  docsTitle: 'DOCUMENTATION',
  docsItems: [
    { title: 'PRODUCT DOCUMENTATION', desc: 'Defined product specifications and relevant information.', icon: 'fa-solid fa-file-lines' },
    { title: 'QUALITY DOCUMENTATION', desc: 'Applicable quality records and documentation.', icon: 'fa-solid fa-file-shield' },
    { title: 'BATCH DOCUMENTATION', desc: 'Relevant manufacturing and batch records.', icon: 'fa-solid fa-file-invoice' },
    { title: 'PACKAGING DOCUMENTATION', desc: 'Defined packaging specifications and requirements.', icon: 'fa-solid fa-file-import' },
    { title: 'MARKET DOCUMENTATION', desc: 'Documentation requirements based on the intended market.', icon: 'fa-solid fa-file-export' },
  ],
  bannerImage: '/images/packaging-development.jpg',
  bannerTitle: "Let's Build the Complete Product.",
  bannerDesc: 'Packaging, documentation and supply aligned with your requirements.',
  ctaText: 'DISCUSS YOUR REQUIREMENTS →',
  ctaLink: '/contact',
};

const PackagingDoc = () => (
  <CapabilityPage
    sectionKey="cap_packaging_documentation"
    defaults={defaults}
    seoTitle="Packaging & Documentation - ONPHARNO"
    seoDescription="Packaging and documentation are part of the product journey. ONPHARNO aligns the finished product with defined requirements."
    renderBody={({ d, txt, arr }) => (
      <>
        <div id="packaging" className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-6">{txt(d.packagingTitle)}</h2>
            <div className="space-y-3">
              {arr(d.packagingItems).map((p, i) => <ListCard key={i} item={p} txt={txt} />)}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-6">{txt(d.docsTitle)}</h2>
            <div className="space-y-3">
              {arr(d.docsItems).map((x, i) => <ListCard key={i} item={x} txt={txt} />)}
            </div>
          </section>
        </div>
        <CtaBanner d={d} txt={txt} />
      </>
    )}
  />
);

export default PackagingDoc;
