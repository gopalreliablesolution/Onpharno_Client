import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';

const NotFound = () => {
  return (
    <>
      <SEO title="404 - Page Not Found | ONPHARNO" />
      <div className="py-32 bg-warm text-center px-4">
        <span className="text-primary font-bold font-serif text-6xl block">404</span>
        <h1 className="text-3xl font-serif font-bold text-charcoal mt-2">Page Not Found</h1>
        <p className="text-gray-600 mt-2 text-sm max-w-md mx-auto">
          The requested page or formulation resource could not be found or has been relocated.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-2.5 rounded-full text-sm shadow hover:bg-primary-dark transition-colors"
        >
          Return to Homepage &rarr;
        </Link>
      </div>
    </>
  );
};

export default NotFound;
