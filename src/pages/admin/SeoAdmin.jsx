import React from 'react';
import { Search, Save } from 'lucide-react';

const SeoAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">SEO & Metadata Management</h1>
          <p className="text-xs text-gray-500 mt-1">Configure meta tags, OpenGraph imagery, sitemap.xml & robots.txt.</p>
        </div>
        <button className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark">
          Regenerate Sitemap
        </button>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <p className="text-sm text-gray-600">Dynamic OpenGraph, JSON-LD Schema (Organization, Product, Article), and meta tags are loaded across all routes.</p>
      </div>
    </div>
  );
};

export default SeoAdmin;
