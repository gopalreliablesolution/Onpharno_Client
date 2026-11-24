import React from 'react';
import ProductPage from '../../components/common/ProductPage';
import DEFAULTS from '../../data/productPageDefaults.json';

const PelletsInCapsule = () => (
  <ProductPage
    sectionKey="prod_pellets_in_capsule"
    defaults={DEFAULTS.pellets_in_capsule}
    seoTitle="Pellets-in-Capsule Manufacturing - ONPHARNO"
    seoDescription="Multiple pellets in one precisely designed capsule. Explore the pellet-in-capsule format and its product design possibilities."
  />
);

export default PelletsInCapsule;
