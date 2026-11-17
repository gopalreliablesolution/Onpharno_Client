import React from 'react';
import { Award, Plus } from 'lucide-react';

const CertificationsAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Certifications & Accreditations</h1>
          <p className="text-xs text-gray-500 mt-1">Manage cGMP, ISO, FSSAI certificates & PDF downloads.</p>
        </div>
        <button className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark">
          + Upload Certificate
        </button>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <p className="text-sm text-gray-600">Active certificates: WHO-GMP, ISO 22000, ISO 9001, FSSAI, HACCP.</p>
      </div>
    </div>
  );
};

export default CertificationsAdmin;
