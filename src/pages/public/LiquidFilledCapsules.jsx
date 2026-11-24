import React from 'react';
import ProductPage from '../../components/common/ProductPage';
import DEFAULTS from '../../data/productPageDefaults.json';

const LiquidFilledCapsules = () => (
  <ProductPage
    sectionKey="prod_liquid_filled"
    defaults={DEFAULTS.liquid_filled}
    seoTitle="Liquid-Filled Hard Capsules Manufacturing - ONPHARNO"
    seoDescription="Explore liquid-filled hard capsule formats, development pathways, fill configurations and product opportunities with ONPHARNO."
  />
);

export default LiquidFilledCapsules;
