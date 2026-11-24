import React from 'react';
import ProductPage from '../../components/common/ProductPage';
import DEFAULTS from '../../data/utilityPageDefaults.json';

const Terms = () => (
  <ProductPage
    sectionKey="util_terms"
    pageKey="utility"
    defaults={DEFAULTS.terms}
    seoTitle="Terms of Service - ONPHARNO"
    seoDescription="Terms governing access to and use of the ONPHARNO B2B website and services."
  />
);

export default Terms;
