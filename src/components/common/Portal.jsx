import React from 'react';
import { createPortal } from 'react-dom';

// Renders children at the document body so fixed overlays are never clipped
// by a scrollable/stacking parent (e.g. the admin page viewport).
const Portal = ({ children }) => {
  if (typeof document === 'undefined') return null;
  return createPortal(children, document.body);
};

export default Portal;
