import React from 'react';
import { Layers, Edit3 } from 'lucide-react';

const SectionsCMS = () => {
  const sections = [
    { key: 'home_about', name: 'Home 1B: About Us Section', type: 'Text + CTA', status: 'Live' },
    { key: 'home_liquid_capsule', name: 'Home 1C: Signature Liquid-Filled Capsule', type: 'Interactive Graphic', status: 'Live' },
    { key: 'home_7_steps', name: 'Home 1D: From Idea to Market (7 Steps)', type: 'Steps Timeline', status: 'Live' },
    { key: 'home_categories', name: 'Home 1E: 12 Health Categories Grid', type: 'Category Grid', status: 'Live' },
    { key: 'home_dosage_forms', name: 'Home 1E-2: Dosage Forms Showcase', type: 'Format Cards', status: 'Live' },
    { key: 'home_why_partner', name: 'Home 1G: Why Partner With ONPHARNO', type: 'Feature Grid', status: 'Live' },
    { key: 'home_counters', name: 'Home 1H: Animated Stats & Counters', type: 'Numbers', status: 'Live' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-charcoal">Page Sections CMS</h1>
        <p className="text-xs text-gray-500 mt-1">Directly edit headlines, subtext, lists, and images for every section.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((s) => (
          <div key={s.key} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-primary uppercase">{s.type}</span>
              <h3 className="font-serif font-bold text-base text-charcoal mt-1">{s.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">Section Key: {s.key}</p>
            </div>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-warm hover:bg-primary/10 text-primary text-xs font-semibold transition-colors">
              <Edit3 className="w-3.5 h-3.5" /> Edit Section
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionsCMS;
