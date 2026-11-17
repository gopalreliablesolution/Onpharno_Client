import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { Mail, Download, Filter, Eye } from 'lucide-react';

const EnquiriesAdmin = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await apiClient.get('/admin/enquiries');
        if (res.success) setEnquiries(res.data);
      } catch {
        setEnquiries([
          { _id: '1', name: 'Dr. Michael Chen', company: 'Apex BioLabs UK', email: 'm.chen@apexbio.co.uk', phone: '+44 7911 123456', type: 'Product Enquiry', status: 'New', date: 'Today' },
          { _id: '2', name: 'Sarah Al-Mansoor', company: 'Gulf Pharma Distribution', email: 'sarah@gulfpharma.ae', phone: '+971 50 123 4567', type: 'Partner Application', status: 'Contacted', date: 'Yesterday' },
          { _id: '3', name: 'Rajesh Varma', company: 'Zenith Wellness India', email: 'rajesh@zenithwell.in', phone: '+91 98200 11223', type: 'Project Start', status: 'Qualified', date: '2 days ago' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Business Enquiries & Leads</h1>
          <p className="text-xs text-gray-500 mt-1">Review, qualify, and follow up with B2B project leads.</p>
        </div>
        <button className="inline-flex items-center gap-1.5 bg-navy text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-navy-800 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-warm border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
            <tr>
              <th className="p-4">Contact & Company</th>
              <th className="p-4">Channel / Type</th>
              <th className="p-4">Email / Phone</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {enquiries.map((e) => (
              <tr key={e._id} className="hover:bg-gray-50">
                <td className="p-4">
                  <span className="font-semibold text-charcoal block">{e.name}</span>
                  <span className="text-xs text-gray-500">{e.company}</span>
                </td>
                <td className="p-4">
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary">
                    {e.type}
                  </span>
                </td>
                <td className="p-4 text-xs text-gray-600">
                  <div>{e.email}</div>
                  <div className="text-gray-400">{e.phone}</div>
                </td>
                <td className="p-4 text-xs text-gray-500">{e.date}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    e.status === 'New' ? 'bg-amber-100 text-amber-800' :
                    e.status === 'Qualified' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {e.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-1.5 text-gray-400 hover:text-primary"><Eye className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiriesAdmin;
