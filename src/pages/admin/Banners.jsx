import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { Plus, Trash2, Edit2, Image, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await apiClient.get('/banners');
        if (res.success) setBanners(res.data);
      } catch {
        setBanners([
          { _id: '1', eyebrow: 'ADVANCED DOSAGE-FORM TECHNOLOGY', title: 'Liquid-Filled Hard Capsules. A Distinctive Format for Modern Healthcare Products.', active: true, order: 1 },
          { _id: '2', eyebrow: 'SCIENCE-LED HEALTHCARE SOLUTIONS', title: 'Your Partner for Healthcare Product Innovation.', active: true, order: 2 },
          { _id: '3', eyebrow: 'PRIVATE LABEL SOLUTIONS', title: 'Your Brand. Our Product & Manufacturing Expertise.', active: true, order: 3 },
          { _id: '4', eyebrow: 'CUSTOM PRODUCT DEVELOPMENT', title: "Have an Idea? Let's Build the Right Product Around It.", active: true, order: 4 },
          { _id: '5', eyebrow: 'GLOBAL PARTNERSHIPS', title: 'Building Healthcare Partnerships Beyond Borders.', active: true, order: 5 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Hero Slider Banners</h1>
          <p className="text-xs text-gray-500 mt-1">Manage the 5 homepage banners, copy, and CTA buttons.</p>
        </div>
        <button className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark transition-colors">
          <Plus className="w-4 h-4" /> Add New Banner
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-warm border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
            <tr>
              <th className="p-4">Order</th>
              <th className="p-4">Eyebrow & Title</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {banners.map((b, idx) => (
              <tr key={b._id || idx} className="hover:bg-gray-50">
                <td className="p-4 font-bold text-primary">{b.order || idx + 1}</td>
                <td className="p-4">
                  <span className="text-[11px] font-semibold tracking-wider text-primary uppercase block">{b.eyebrow}</span>
                  <span className="font-serif font-bold text-charcoal text-sm">{b.title}</span>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    Active
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="p-1.5 text-gray-500 hover:text-primary"><Edit2 className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Banners;
