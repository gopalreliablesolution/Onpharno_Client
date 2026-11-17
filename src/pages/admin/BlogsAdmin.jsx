import React, { useState } from 'react';
import { BookOpen, Plus, Edit2, Trash2 } from 'lucide-react';

const BlogsAdmin = () => {
  const [blogs] = useState([
    { title: 'Emerging Nutraceutical Trends', date: 'Nov 2026', views: 342, status: 'Published' },
    { title: 'Choosing the Right Dosage Form', date: 'Nov 2026', views: 512, status: 'Published' },
    { title: 'Private Label vs Custom Formulation', date: 'Oct 2026', views: 289, status: 'Published' },
    { title: 'The Future of Effervescent Supplements', date: 'Oct 2026', views: 405, status: 'Published' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Insights & Blog Posts</h1>
          <p className="text-xs text-gray-500 mt-1">Publish scientific articles, formulation trends, and company news.</p>
        </div>
        <button className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark">
          + Write New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-warm border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
            <tr>
              <th className="p-4">Article Title</th>
              <th className="p-4">Publish Date</th>
              <th className="p-4">Views</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {blogs.map((b, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-4 font-semibold text-charcoal">{b.title}</td>
                <td className="p-4 text-gray-500 text-xs">{b.date}</td>
                <td className="p-4 text-gray-500 text-xs">{b.views} reads</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    {b.status}
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

export default BlogsAdmin;
