import React from 'react';
import { Menu, Plus } from 'lucide-react';

const Menus = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Navigation & Menus</h1>
          <p className="text-xs text-gray-500 mt-1">Configure header mega menus, dropdowns, and footer link hierarchies.</p>
        </div>
        <button className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark">
          Add Nav Item
        </button>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <p className="text-sm text-gray-600">Header & Footer Navigation hierarchy is synced with system routes.</p>
      </div>
    </div>
  );
};

export default Menus;
