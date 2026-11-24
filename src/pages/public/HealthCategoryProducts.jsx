import React from 'react';
import ProductPage from '../../components/common/ProductPage';
import DEFAULTS from '../../data/productPageDefaults.json';

const HealthCategoryProducts = () => (
  <ProductPage
    sectionKey="prod_by_health_category"
    defaults={DEFAULTS.by_health_category}
    seoTitle="Products by Health Category - ONPHARNO"
    seoDescription="Explore healthcare and nutraceutical product opportunities by health category across the ONPHARNO portfolio."
  />
);

export default HealthCategoryProducts;
