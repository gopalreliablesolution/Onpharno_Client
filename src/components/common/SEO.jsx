import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '../../context/SettingsContext';

const SEO = ({ title, description, keywords, ogImage, canonicalUrl }) => {
  const { settings } = useSettings();
  const siteName = settings?.companyName || 'ONPHARNO';
  const defaultDesc = 'ONPHARNO is a science-driven pharmaceutical and nutraceutical contract manufacturing partner specializing in advanced liquid-filled hard capsules, custom formulation, and global export.';
  const defaultTitle = 'ONPHARNO - Advanced Dosage Form & Healthcare Manufacturing';

  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDesc = description || defaultDesc;
  const metaImage = ogImage || '/logo.svg';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
};

export default SEO;
