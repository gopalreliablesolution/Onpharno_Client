export const getImageUrl = (imgPath) => {
  if (!imgPath) return '/logo.png';
  if (imgPath.startsWith('http')) return imgPath;
  // If image is a local upload path, both Vite public and Express /uploads serve it
  return imgPath;
};

export default getImageUrl;
