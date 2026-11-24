import React from 'react';
import ProductPage from '../../components/common/ProductPage';
import DEFAULTS from '../../data/productPageDefaults.json';

const CapsuleInCapsule = () => (
  <ProductPage
    sectionKey="prod_capsule_in_capsule"
    defaults={DEFAULTS.capsule_in_capsule}
    seoTitle="Capsule-in-Capsule Manufacturing - ONPHARNO"
    seoDescription="A distinctive two-component capsule format. Explore how capsule-in-capsule works and where it may fit your product concept."
  />
);

export default CapsuleInCapsule;
