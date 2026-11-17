import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import {
  Mail,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Phone,
  Building2,
  Package,
  Calendar,
  X,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const EnquiriesAdmin = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/enquiries');
      if (res.success && res.data) {
        setEnquiries(res.data);
      }
    } catch {
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiClient.put(`/admin/enquiries/${id}`, { status: newStatus });
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus } : e));
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry(prev => ({ ...prev, status: newStatus }));
      }
      toast.success(`Inquiry marked as ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/admin/enquiries/${id}`);
      toast.success('Inquiry record deleted');
      setEnquiries(prev => prev.filter(e => e._id !== id));
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
      setDeleteConfirmId(null);
    } catch {
      toast.error('Failed to delete inquiry');
    }
  };

  const exportCSV = () => {
    if (filteredEnquiries.length === 0) {
      toast.error('No enquiries to export');
      return;
    }

    const headers = ['Date', 'Type', 'Status', 'Name', 'Email', 'Phone', 'Company', 'Product', 'Quantity', 'Message'];
    const rows = filteredEnquiries.map(e => [
      new Date(e.createdAt).toLocaleDateString(),
      e.type,
      e.status,
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.phone || '').replace(/"/g, '""')}"`,
      `"${(e.company || '').replace(/"/g, '""')}"`,
      `"${(e.productName || '').replace(/"/g, '""')}"`,
      `"${(e.quantity || '').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `onpharno-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV Export downloaded!');
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesType = typeFilter === 'all' || e.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    const matchesSearch =
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.company?.toLowerCase().includes(search.toLowerCase()) ||
      e.message?.toLowerCase().includes(search.toLowerCase()) ||
      e.productName?.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Business Inquiries & Leads</h1>
          <p className="text-xs text-gray-500 mt-1">Review, track, and follow up on commercial partner & product inquiries ({enquiries.length} total).</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 bg-charcoal text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md hover:bg-black transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Controls & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, company, or formulation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-primary flex-1 md:flex-none"
          >
            <option value="all">All Inquiry Types</option>
            <option value="product">Product Specific</option>
            <option value="partner">Partner / B2B</option>
            <option value="contact">General Contact</option>
            <option value="project">Custom Project</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-primary flex-1 md:flex-none"
          >
            <option value="all">All Statuses</option>
            <option value="new">New (Unreviewed)</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed / Won</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">Loading inquiry records...</div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Mail className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <p className="text-sm font-semibold">No inquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-warm/60 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
                <tr>
                  <th className="p-4">Contact & Company</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Subject / Product</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEnquiries.map((e) => (
                  <tr key={e._id} className="hover:bg-warm/30 transition-colors">
                    <td className="p-4">
                      <div>
                        <span className="font-semibold text-charcoal block">{e.name}</span>
                        <span className="text-xs text-gray-500">{e.email}</span>
                        {e.company && (
                          <span className="text-[11px] text-primary block font-medium">{e.company}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-gray-100 text-gray-700">
                        {e.type}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs">
                      {e.productName ? (
                        <div>
                          <span className="text-xs font-semibold text-charcoal block line-clamp-1">{e.productName}</span>
                          {e.quantity && <span className="text-[11px] text-gray-400">Qty: {e.quantity}</span>}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-600 line-clamp-1">{e.subject || e.message}</p>
                      )}
                    </td>
                    <td className="p-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(e.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <select
                        value={e.status || 'new'}
                        onChange={(evt) => handleStatusChange(e._id, evt.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border focus:outline-none ${
                          e.status === 'new'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : e.status === 'contacted'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : e.status === 'qualified'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedEnquiry(e)}
                        className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(e._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                  {selectedEnquiry.type} Inquiry
                </span>
                <h3 className="font-bold text-lg text-charcoal">{selectedEnquiry.name}</h3>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="text-gray-400 hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-warm/60 p-3 rounded-xl border border-gray-100 space-y-1">
                <span className="text-gray-400 block font-semibold uppercase text-[10px]">Email Address</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="font-semibold text-primary hover:underline block break-all">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div className="bg-warm/60 p-3 rounded-xl border border-gray-100 space-y-1">
                <span className="text-gray-400 block font-semibold uppercase text-[10px]">Phone Number</span>
                <span className="font-semibold text-charcoal block">{selectedEnquiry.phone || 'Not provided'}</span>
              </div>
              <div className="bg-warm/60 p-3 rounded-xl border border-gray-100 space-y-1">
                <span className="text-gray-400 block font-semibold uppercase text-[10px]">Company Name</span>
                <span className="font-semibold text-charcoal block">{selectedEnquiry.company || 'Not provided'}</span>
              </div>
              <div className="bg-warm/60 p-3 rounded-xl border border-gray-100 space-y-1">
                <span className="text-gray-400 block font-semibold uppercase text-[10px]">Date Received</span>
                <span className="font-semibold text-charcoal block">
                  {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            {selectedEnquiry.productName && (
              <div className="bg-primary/5 p-3 rounded-xl border border-primary/20 text-xs">
                <span className="text-primary font-bold block uppercase text-[10px]">Requested Formulation</span>
                <p className="font-semibold text-charcoal mt-0.5">{selectedEnquiry.productName}</p>
                {selectedEnquiry.quantity && (
                  <p className="text-gray-500 mt-1">Requested Volume: {selectedEnquiry.quantity}</p>
                )}
              </div>
            )}

            <div>
              <span className="text-gray-400 block font-semibold uppercase text-[10px] mb-1">Message Body</span>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-charcoal leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                {selectedEnquiry.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Status:</span>
                <select
                  value={selectedEnquiry.status || 'new'}
                  onChange={(e) => handleStatusChange(selectedEnquiry._id, e.target.value)}
                  className="text-xs font-semibold px-3 py-1 rounded-xl border border-gray-200"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <a
                href={`mailto:${selectedEnquiry.email}?subject=Regarding your ONPHARNO inquiry`}
                className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl shadow hover:bg-primary-dark transition-colors"
              >
                <Mail className="w-3.5 h-3.5" /> Reply by Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-charcoal mb-1">Delete Inquiry Record?</h4>
            <p className="text-xs text-gray-500 mb-6">Are you sure you want to delete this lead from the database?</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiriesAdmin;
