/**
 * Image URL Resolution Utility for ONPHARNO B2B Platform
 * Seamlessly resolves local server uploads against API_PUBLIC_URL / VITE_API_URL
 * while preserving static frontend public assets and absolute external URLs.
 */

const getApiBase = () => {
  const envUrl =
    (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_API_PUBLIC_URL || import.meta.env.VITE_API_URL)) ||
    '';
  return envUrl.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');
};

export const getImageUrl = (imgPath) => {
  if (!imgPath || typeof imgPath !== 'string') return '/logo.png';
  const trimmed = imgPath.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;

  // Ensure clean leading slash
  const clean = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;

  // If path is a local server upload (/uploads/...), prepend backend origin
  if (clean.startsWith('/uploads/')) {
    const apiBase = getApiBase();
    return apiBase ? `${apiBase}${clean}` : clean;
  }

  // Static site assets in /public (e.g. /logo.png, /certifications/...) remain client-relative
  return clean;
};

export const getThumbnailUrl = (imgPath) => {
  if (!imgPath || typeof imgPath !== 'string') return '/logo.png';
  if (imgPath.includes('_thumb.')) return getImageUrl(imgPath);
  if (imgPath.endsWith('.webp')) {
    return getImageUrl(imgPath.replace(/\.webp$/, '_thumb.webp'));
  }
  return getImageUrl(imgPath);
};

export const handleImageError = (e, fallback = '/logo.png') => {
  if (!e || !e.target) return;
  if (e.target.dataset.fallbackTried === 'true') {
    e.target.onerror = null;
    return;
  }
  e.target.dataset.fallbackTried = 'true';
  e.target.onerror = null;
  e.target.src = fallback;
};

export default getImageUrl;
