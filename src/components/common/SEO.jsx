import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { useSettings } from '../../context/SettingsContext';
import apiClient from '../../api/client';

const SEO = ({ title, description, keywords, ogImage, canonicalUrl, type = 'website', schema = null }) => {
  const { settings } = useSettings();
  const siteName = settings?.companyName || 'ONPHARNO';
  const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://onpharno.netlify.app').replace(/\/$/, '');
  const defaultDesc = 'ONPHARNO is a science-driven pharmaceutical and nutraceutical contract manufacturing partner specializing in advanced liquid-filled hard capsules, custom formulation, and global export.';
  const defaultTitle = 'ONPHARNO - Advanced Dosage Form & Healthcare Manufacturing';

  // SEO admin records (managed at /admin/seo) override the page-level props.
  // Empty saved fields fall back to the page defaults so meta tags stay valid.
  const { data: pages } = useQuery({
    queryKey: ['public-pages-seo'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/pages');
        return res.data || [];
      } catch { return []; }
    },
    staleTime: 5 * 60 * 1000,
  });
  const path = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/' : '';
  const match = (pages || []).find((p) => p.active !== false && (p.slug || '').replace(/\/$/, '') === path);
  const seo = match?.seo || {};
  const clean = (v) => (v ?? '').toString().trim();

  const finalTitle = clean(seo.metaTitle) || clean(title);
  const finalDesc = clean(seo.metaDescription) || clean(description) || defaultDesc;
  const finalKeywords = clean(seo.keywords) || clean(keywords);
  const finalOgImage = clean(seo.ogImage) || clean(ogImage);

  const fullTitle = finalTitle ? `${finalTitle} | ${siteName}` : defaultTitle;
  const metaDesc = finalDesc;
  const metaImage = finalOgImage
    ? (finalOgImage.startsWith('http') ? finalOgImage : `${siteUrl}${finalOgImage.startsWith('/') ? '' : '/'}${finalOgImage}`)
    : `${siteUrl}/logo.png`;
  const canonical = canonicalUrl || (typeof window !== 'undefined' ? `${siteUrl}${window.location.pathname}` : siteUrl);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
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

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
