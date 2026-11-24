import React from 'react';
import ProductPage from '../../components/common/ProductPage';
import DEFAULTS from '../../data/utilityPageDefaults.json';

const ThankYou = () => (
  <ProductPage
    sectionKey="util_thank_you"
    pageKey="utility"
    defaults={DEFAULTS.thank_you}
    seoTitle="Thank You - Project Started | ONPHARNO"
    seoDescription="Your project enquiry has been received. Here is what happens next."
  />
);

export default ThankYou;
