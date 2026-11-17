import React from 'react';
import { TrendingUp, Plus } from 'lucide-react';

const StatsAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Stats & Impact Counters</h1>
          <p className="text-xs text-gray-500 mt-1">Configure animated metrics (500+ Formulations, 20+ Partners, etc.).</p>
        </div>
        <button className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark">
          + Add Counter
        </button>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-warm rounded-xl text-center">
            <span className="text-2xl font-bold font-serif text-primary">500+</span>
            <p className="text-xs text-gray-600 mt-1">Products & Formulations</p>
          </div>
          <div className="p-4 bg-warm rounded-xl text-center">
            <span className="text-2xl font-bold font-serif text-primary">20+</span>
            <p className="text-xs text-gray-600 mt-1">Business Partners</p>
          </div>
          <div className="p-4 bg-warm rounded-xl text-center">
            <span className="text-2xl font-bold font-serif text-primary">10+</span>
            <p className="text-xs text-gray-600 mt-1">Countries Served</p>
          </div>
          <div className="p-4 bg-warm rounded-xl text-center">
            <span className="text-2xl font-bold font-serif text-primary">12+ Yrs</span>
            <p className="text-xs text-gray-600 mt-1">Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsAdmin;
