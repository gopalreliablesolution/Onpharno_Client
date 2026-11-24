import React from 'react';
import ProductPage from '../../components/common/ProductPage';
import DEFAULTS from '../../data/utilityPageDefaults.json';

const PrivacyPolicy = () => (
  <ProductPage
    sectionKey="util_privacy_policy"
    pageKey="utility"
    defaults={DEFAULTS.privacy_policy}
    seoTitle="Privacy Policy - ONPHARNO"
    seoDescription="How ONPHARNO protects the privacy and confidential data of its B2B partners and website visitors."
  />
);

export default PrivacyPolicy;
