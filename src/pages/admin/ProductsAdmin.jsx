import React, { useState } from 'react';
import { Plus, Package, Edit2, Trash2, Search } from 'lucide-react';

const ProductsAdmin = () => {
  const [products] = useState([
    { name: 'CoQ10 100mg + Omega-3 Liquid-Filled Hard Capsule', dosage: 'Liquid-Filled Hard Capsules', category: 'Healthy Ageing', moq: '50,000 Caps', status: 'Published' },
    { name: 'Probiotic + Prebiotic Dual Phase Capsule-in-Capsule', dosage: 'Capsule-in-Capsule', category: 'Gut Health', moq: '50,000 Caps', status: 'Published' },
    { name: 'Liposomal Vitamin C + Zinc Effervescent Tablets', dosage: 'Effervescent', category: 'Immunity', moq: '10,000 Tubes', status: 'Published' },
    { name: 'Hydrolyzed Marine Collagen + Hyaluronic Acid Oral Shot', dosage: 'Oral Shots', category: 'Beauty Nutrition', moq: '25,000 Vials', status: 'Published' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Products & Formulations</h1>
          <p className="text-xs text-gray-500 mt-1">Manage all pharmaceutical & nutraceutical formulations in the catalog.</p>
        </div>
        <button className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark">
          + Add New Formulation
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-warm border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
            <tr>
              <th className="p-4">Product Name</th>
              <th className="p-4">Dosage Form</th>
              <th className="p-4">Category</th>
              <th className="p-4">MOQ</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-4 font-semibold text-charcoal">{p.name}</td>
                <td className="p-4 text-gray-600">{p.dosage}</td>
                <td className="p-4 text-gray-600">{p.category}</td>
                <td className="p-4 text-gray-500 text-xs">{p.moq}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    {p.status}
                  </span>
                </td>
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

export default ProductsAdmin;
