import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { CheckCircle, ArrowRight } from 'lucide-react';

const ThankYou = () => {
  return (
    <>
      <SEO title="Thank You - Project Started | ONPHARNO" description="Your project enquiry has been received. Here is what happens next." />
      <div className="py-24 bg-warm min-h-[70vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal">
            Your Project Has Started.
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Thank you for reaching out to ONPHARNO. Our formulation and technical project leads are reviewing your specifications.
          </p>

          <div className="mt-12 bg-white rounded-3xl p-8 border border-gray-200 text-left shadow-sm">
            <h3 className="font-serif font-bold text-lg text-charcoal mb-4">What Happens Next?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-xl bg-warm">
                <span className="font-bold text-primary block text-sm">Step 01</span>
                <span className="text-xs text-charcoal font-semibold mt-1 block">Review</span>
                <span className="text-[11px] text-gray-500 mt-0.5 block">Formula & feasibility check</span>
              </div>
              <div className="p-3 rounded-xl bg-warm">
                <span className="font-bold text-primary block text-sm">Step 02</span>
                <span className="text-xs text-charcoal font-semibold mt-1 block">Clarify</span>
                <span className="text-[11px] text-gray-500 mt-0.5 block">Technical discovery call</span>
              </div>
              <div className="p-3 rounded-xl bg-warm">
                <span className="font-bold text-primary block text-sm">Step 03</span>
                <span className="text-xs text-charcoal font-semibold mt-1 block">Develop</span>
                <span className="text-[11px] text-gray-500 mt-0.5 block">Pilot trial & samples</span>
              </div>
              <div className="p-3 rounded-xl bg-warm">
                <span className="font-bold text-primary block text-sm">Step 04</span>
                <span className="text-xs text-charcoal font-semibold mt-1 block">Manufacture</span>
                <span className="text-[11px] text-gray-500 mt-0.5 block">Commercial delivery</span>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-md"
            >
              Explore What We Build &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYou;
