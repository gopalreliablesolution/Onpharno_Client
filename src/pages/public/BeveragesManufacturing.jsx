import React from 'react';
import ProductPage from '../../components/common/ProductPage';
import DEFAULTS from '../../data/productPageDefaults.json';

// Framework page: no copy in the source doc. All content is added from admin.
const BeveragesManufacturing = () => (
  <ProductPage
    sectionKey="prod_beverages"
    defaults={DEFAULTS.beverages}
    seoTitle="Beverages Manufacturing - ONPHARNO"
    seoDescription="Beverage manufacturing capabilities at ONPHARNO."
  />
);

export default BeveragesManufacturing;
