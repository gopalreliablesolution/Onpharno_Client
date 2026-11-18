import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from '../common/WhatsAppFloat';

const PublicLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-warm text-charcoal">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white font-medium text-sm transition-all"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex="-1" className="flex-grow outline-none">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default PublicLayout;
