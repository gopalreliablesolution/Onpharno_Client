import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '../../context/SettingsContext';

const SEO = ({ title, description, keywords, ogImage, canonicalUrl, type = 'website' }) => {
  const { settings } = useSettings();
  const siteName = settings?.companyName || 'ONPHARNO';
  const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://onpharno.netlify.app').replace(/\/$/, '');
  const defaultDesc = 'ONPHARNO is a science-driven pharmaceutical and nutraceutical contract manufacturing partner specializing in advanced liquid-filled hard capsules, custom formulation, and global export.';
  const defaultTitle = 'ONPHARNO - Advanced Dosage Form & Healthcare Manufacturing';

  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDesc = description || defaultDesc;
  const metaImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`) : `${siteUrl}/logo.png`;
  const canonical = canonicalUrl || (typeof window !== 'undefined' ? `${siteUrl}${window.location.pathname}` : siteUrl);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
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
