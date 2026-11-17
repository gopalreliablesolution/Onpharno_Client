export const getImageUrl = (imgPath) => {
  if (!imgPath || typeof imgPath !== 'string') return '/logo.png';
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) return imgPath;

  // Clean and ensure leading slash
  let clean = imgPath.trim();
  if (!clean.startsWith('/')) {
    clean = `/${clean}`;
  }

  return clean;
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
