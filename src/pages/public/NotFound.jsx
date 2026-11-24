import React from 'react';
import ProductPage from '../../components/common/ProductPage';
import DEFAULTS from '../../data/utilityPageDefaults.json';

const NotFound = () => (
  <ProductPage
    sectionKey="util_not_found"
    pageKey="utility"
    defaults={DEFAULTS.not_found}
    seoTitle="404 - Page Not Found | ONPHARNO"
    seoDescription="The requested page could not be found."
  />
);

export default NotFound;
