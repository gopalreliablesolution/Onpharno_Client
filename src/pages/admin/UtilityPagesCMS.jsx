import React from 'react';
import ProductsCMS from './ProductsCMS';
import DEFAULTS from '../../data/utilityPageDefaults.json';

const PAGES = {
  not_found: { label: '404 Page Not Found', description: 'Shown for unknown URLs.' },
  thank_you: { label: 'Thank You', description: 'Confirmation page shown after an enquiry is submitted.' },
  privacy_policy: { label: 'Privacy Policy', description: 'All policy sections editable — add, remove or reorder text blocks.' },
  terms: { label: 'Terms of Service', description: 'All terms sections editable — add, remove or reorder text blocks.' },
};

const UtilityPagesCMS = () => (
  <ProductsCMS
    pages={PAGES}
    defaults={DEFAULTS}
    pageKey="utility"
    heading="Utility Pages (CMS)"
    subheading="Thank You, Privacy Policy and Terms. Add/reorder blocks; empty fields are hidden on site."
  />
);

export default UtilityPagesCMS;
