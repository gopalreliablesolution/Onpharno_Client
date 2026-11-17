const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const getImageUrl = (imgPath) => {
  if (!imgPath) return '/logo.png';
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) return imgPath;
  if (imgPath.startsWith('/uploads')) {
    return `${BACKEND_URL}${imgPath}`;
  }
  return imgPath;
};

export default getImageUrl;
