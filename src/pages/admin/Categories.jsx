import React, { useState } from 'react';
import { Plus, Layers, Edit2, Trash2 } from 'lucide-react';

const Categories = () => {
  const [categories] = useState([
    { name: 'Daily Wellness', type: 'Health Category', count: 8 },
    { name: "Men's Health", type: 'Health Category', count: 6 },
    { name: "Women's Health", type: 'Health Category', count: 7 },
    { name: 'Beauty Nutrition', type: 'Health Category', count: 5 },
    { name: 'Sports Nutrition', type: 'Health Category', count: 4 },
    { name: 'Gut Health', type: 'Health Category', count: 6 },
    { name: 'Liquid-Filled Hard Capsules', type: 'Dosage Form', count: 12 },
    { name: 'Capsule-in-Capsule', type: 'Dosage Form', count: 4 },
    { name: 'Effervescent Tablets', type: 'Dosage Form', count: 5 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Categories & Dosage Formats</h1>
          <p className="text-xs text-gray-500 mt-1">Manage 12 Health Categories & 9 Dosage Forms for catalog filtering.</p>
        </div>
        <button className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark">
          + Add Category / Format
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-warm border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
            <tr>
              <th className="p-4">Category Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Formulations</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((c, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-4 font-semibold text-charcoal">{c.name}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    {c.type}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{c.count} items</td>
                <td className="p-4 text-right space-x-2">
                  <button className="p-1.5 text-gray-400 hover:text-primary"><Edit2 className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
