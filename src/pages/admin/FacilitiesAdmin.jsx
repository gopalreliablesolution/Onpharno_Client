import React from 'react';
import { Building2, Plus } from 'lucide-react';

const FacilitiesAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Facilities & Plant Gallery</h1>
          <p className="text-xs text-gray-500 mt-1">Manage cleanroom photos, equipment specs, and plant capabilities.</p>
        </div>
        <button className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark">
          + Add Facility Block
        </button>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <p className="text-sm text-gray-600">Manufacturing, R&D Labs, Quality Control, and Packaging blocks.</p>
      </div>
    </div>
  );
};

export default FacilitiesAdmin;
