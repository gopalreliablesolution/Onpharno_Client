import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import {
  Plus,
  Trash2,
  Edit2,
  HelpCircle,
  X,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';

const FAQ_CATEGORIES = ['general', 'liquid-filled', 'manufacturing', 'partnership'];

const initialFaqState = {
  question: '',
  answer: '',
  category: 'general',
  order: 1,
  active: true
};

const FaqsAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFaqState);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/faqs');
      if (res.success && res.data) {
        setFaqs(res.data.sort((a, b) => (a.order || 0) - (b.order || 0)));
      }
    } catch {
      toast.error('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      ...initialFaqState,
      order: faqs.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setEditingId(faq._id);
    setFormData({
      question: faq.question || '',
      answer: faq.answer || '',
      category: faq.category || 'general',
      order: faq.order || 1,
      active: faq.active !== false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error('Question and answer are required');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await apiClient.put(`/admin/faqs/${editingId}`, formData);
        toast.success('FAQ updated!');
      } else {
        await apiClient.post('/admin/faqs', formData);
        toast.success('FAQ added!');
      }
      setIsModalOpen(false);
      fetchFaqs();
    } catch (err) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/admin/faqs/${id}`);
      toast.success('FAQ deleted');
      setFaqs(prev => prev.filter(f => f._id !== id));
      setDeleteConfirmId(null);
    } catch {
      toast.error('Failed to delete');
    }
  };

  const toggleActive = async (faq) => {
    const newActive = !faq.active;
    try {
      await apiClient.put(`/admin/faqs/${faq._id}`, { active: newActive });
      setFaqs(prev => prev.map(f => f._id === faq._id ? { ...f, active: newActive } : f));
      toast.success(`FAQ ${newActive ? 'activated' : 'hidden'}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Frequently Asked Questions (FAQs)</h1>
          <p className="text-xs text-gray-500 mt-1">Manage technical dosage questions, MOQs, private label terms, and regulatory queries.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md hover:bg-primary-dark transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Question
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <HelpCircle className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <p className="text-sm font-semibold">No questions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-warm/60 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
                <tr>
                  <th className="p-4 w-16 text-center">Order</th>
                  <th className="p-4">Question & Answer</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {faqs.map((f) => (
                  <tr key={f._id} className="hover:bg-warm/30 transition-colors">
                    <td className="p-4 text-center font-bold text-gray-400 text-xs">#{f.order || 1}</td>
                    <td className="p-4 max-w-lg">
                      <span className="font-semibold text-charcoal block">{f.question}</span>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{f.answer}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-700 capitalize">
                        {f.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleActive(f)}
                        className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                          f.active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {f.active ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-gray-400" />}
                        {f.active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(f)}
                        className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(f._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        title="Delete"
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

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <h3 className="font-bold text-base text-charcoal">
                {editingId ? 'Edit FAQ' : 'Add Question'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Question *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Can any liquid ingredient be filled in hard capsules?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Topic / Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-white capitalize"
                >
                  {FAQ_CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Answer *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Comprehensive technical answer..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Order</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-charcoal">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                    />
                    <span>Active on site</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-white text-xs font-semibold px-5 py-2 rounded-xl shadow hover:bg-primary-dark transition-all disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
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
            <h4 className="text-base font-bold text-charcoal mb-1">Delete Question?</h4>
            <p className="text-xs text-gray-500 mb-6">Are you sure you want to remove this FAQ?</p>
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

export default FaqsAdmin;
