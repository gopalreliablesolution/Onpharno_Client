import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';

const PackagingDoc = () => {
  return (
    <>
      <SEO title="Packaging & Regulatory Documentation - ONPHARNO" description="Complete primary & secondary pharmaceutical packaging solutions alongside global regulatory dossier support." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Capabilities</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Packaging & Documentation</h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">
            Turnkey primary, secondary packaging and export registration dossiers.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-charcoal">Packaging Capabilities</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>&bull; Alu-Alu and PVC/PVDC Blister Packing</li>
              <li>&bull; HDPE, PET, and Glass Bottling with Induction Heat Seals</li>
              <li>&bull; Multi-layer Foil Sachets and Stick Packs</li>
              <li>&bull; Secondary Carton Printing, Embossing & Tamper-Evident Labeling</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-charcoal">Regulatory & Documentation</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>&bull; Comprehensive Certificate of Analysis (COA) per batch</li>
              <li>&bull; Accelerated & Real-time Stability Data (ICH Guidelines)</li>
              <li>&bull; CTD/ACTD Format Dossiers for Country Registration</li>
              <li>&bull; Free Sale Certificates & GMP Certificates</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3.5 rounded-full font-semibold shadow-md">
            Let's Build the Complete Product &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default PackagingDoc;
