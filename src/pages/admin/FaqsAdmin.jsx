import React from 'react';
import { HelpCircle, Plus } from 'lucide-react';

const FaqsAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">FAQs Management</h1>
          <p className="text-xs text-gray-500 mt-1">Organize questions by page or technical category.</p>
        </div>
        <button className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark">
          + Add FAQ
        </button>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <p className="text-sm text-gray-600">Dynamic FAQs populated for Liquid-filled capsules page, General info, and Contract manufacturing.</p>
      </div>
    </div>
  );
};

export default FaqsAdmin;
