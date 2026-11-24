import React from 'react';
import ProductPage from '../../components/common/ProductPage';
import DEFAULTS from '../../data/productPageDefaults.json';

const DosageFormProducts = () => (
  <ProductPage
    sectionKey="prod_by_dosage_form"
    defaults={DEFAULTS.by_dosage_form}
    seoTitle="Products by Dosage Form - ONPHARNO"
    seoDescription="Explore healthcare and nutraceutical product opportunities by dosage form across the ONPHARNO portfolio."
  />
);

export default DosageFormProducts;
