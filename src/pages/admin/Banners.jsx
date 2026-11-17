import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import {
  Plus,
  Trash2,
  Edit2,
  Image,
  Check,
  Upload,
  X,
  AlertCircle,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';

const initialBannerState = {
  eyebrow: '',
  title: '',
  subtitle: '',
  cta1Text: 'Explore Technology',
  cta1Link: '/products/liquid-filled-hard-capsules',
  cta2Text: 'Start a Project',
  cta2Link: '/contact',
  imageDesktop: '/uploads/hero-bottles.png',
  imageMobile: '/uploads/hero-bottles.png',
  order: 1,
  active: true
};

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialBannerState);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/banners');
      if (res.success && res.data) {
        setBanners(res.data.sort((a, b) => (a.order || 0) - (b.order || 0)));
      }
    } catch (err) {
      toast.error('Failed to load hero banners from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      ...initialBannerState,
      order: banners.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (banner) => {
    setEditingId(banner._id);
    setFormData({
      eyebrow: banner.eyebrow || '',
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      cta1Text: banner.cta1Text || 'Explore Technology',
      cta1Link: banner.cta1Link || '/products',
      cta2Text: banner.cta2Text || 'Start a Project',
      cta2Link: banner.cta2Link || '/contact',
      imageDesktop: banner.imageDesktop || '/uploads/hero-bottles.png',
      imageMobile: banner.imageMobile || '/uploads/hero-bottles.png',
      order: banner.order || 1,
      active: banner.active !== false
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    setUploadingImage(true);

    try {
      const res = await apiClient.post('/admin/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.success && res.data?.url) {
        setFormData(prev => ({
          ...prev,
          imageDesktop: res.data.url,
          imageMobile: res.data.url
        }));
        toast.success('Hero image uploaded!');
      }
    } catch (err) {
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.eyebrow.trim() || !formData.title.trim()) {
      toast.error('Eyebrow and Title are required');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await apiClient.put(`/admin/banners/${editingId}`, formData);
        toast.success('Banner slide updated!');
      } else {
        await apiClient.post('/admin/banners', formData);
        toast.success('New banner created!');
      }
      setIsModalOpen(false);
      fetchBanners();
    } catch (err) {
      toast.error(err.message || 'Failed to save banner');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/admin/banners/${id}`);
      toast.success('Banner deleted');
      setBanners(prev => prev.filter(b => b._id !== id));
      setDeleteConfirmId(null);
    } catch (err) {
      toast.error('Failed to delete banner');
    }
  };

  const toggleActive = async (banner) => {
    const newActive = !banner.active;
    try {
      await apiClient.put(`/admin/banners/${banner._id}`, { active: newActive });
      setBanners(prev => prev.map(b => b._id === banner._id ? { ...b, active: newActive } : b));
      toast.success(`Banner slide ${newActive ? 'activated' : 'deactivated'}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Homepage Hero Banners</h1>
          <p className="text-xs text-gray-500 mt-1">Manage the hero slides, scientific headlines, CTA action links, and hero packshots.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md hover:bg-primary-dark transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Hero Slide
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">Loading hero banner slides...</div>
        ) : banners.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Image className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <p className="text-sm font-semibold">No banners configured</p>
            <p className="text-xs text-gray-400 mt-1">Click "Add Hero Slide" to create your first homepage banner.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-warm/60 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
                <tr>
                  <th className="p-4 w-16 text-center">Order</th>
                  <th className="p-4">Visual</th>
                  <th className="p-4">Eyebrow & Headline</th>
                  <th className="p-4">CTAs</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {banners.map((b) => (
                  <tr key={b._id} className="hover:bg-warm/30 transition-colors">
                    <td className="p-4 text-center font-bold text-gray-400 text-xs">
                      #{b.order || 1}
                    </td>
                    <td className="p-4">
                      <img
                        src={getImageUrl(b.imageDesktop)}
                        alt={b.title}
                        className="w-16 h-12 object-contain bg-gray-50 rounded border border-gray-200 p-1"
                        onError={(e) => { e.target.src = '/uploads/hero-bottles.png'; }}
                      />
                    </td>
                    <td className="p-4 max-w-md">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                        {b.eyebrow}
                      </span>
                      <p className="font-semibold text-charcoal text-sm line-clamp-1">{b.title}</p>
                      {b.subtitle && <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{b.subtitle}</p>}
                    </td>
                    <td className="p-4 text-xs text-gray-600 space-y-1">
                      <div>
                        <span className="font-medium text-charcoal">{b.cta1Text}</span>
                        <span className="text-gray-400 text-[10px] block">→ {b.cta1Link}</span>
                      </div>
                      {b.cta2Text && (
                        <div>
                          <span className="font-medium text-charcoal">{b.cta2Text}</span>
                          <span className="text-gray-400 text-[10px] block">→ {b.cta2Link}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleActive(b)}
                        className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                          b.active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {b.active ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-gray-400" />}
                        {b.active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                        title="Edit Banner"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(b._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        title="Delete Banner"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-lg font-bold text-charcoal">
                  {editingId ? 'Edit Hero Slide' : 'Add New Hero Slide'}
                </h3>
                <p className="text-xs text-gray-500">Configure slide copy, packshot imagery, and CTA redirection links.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-charcoal rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Eyebrow (Category Badge) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ADVANCED DOSAGE-FORM TECHNOLOGY"
                    value={formData.eyebrow}
                    onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Hero Title / Headline *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liquid-Filled Hard Capsules. A Distinctive Format for Modern Healthcare."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Subtitle / Subtext</label>
                  <textarea
                    rows="2"
                    placeholder="Formulation • R&D • Manufacturing • Quality • Private Label • Global Partnerships"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Primary CTA Button Label</label>
                  <input
                    type="text"
                    placeholder="Explore Technology"
                    value={formData.cta1Text}
                    onChange={(e) => setFormData({ ...formData, cta1Text: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Primary CTA Link URL</label>
                  <input
                    type="text"
                    placeholder="/products/liquid-filled-hard-capsules"
                    value={formData.cta1Link}
                    onChange={(e) => setFormData({ ...formData, cta1Link: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Secondary CTA Button Label</label>
                  <input
                    type="text"
                    placeholder="Start a Project"
                    value={formData.cta2Text}
                    onChange={(e) => setFormData({ ...formData, cta2Text: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Secondary CTA Link URL</label>
                  <input
                    type="text"
                    placeholder="/contact"
                    value={formData.cta2Link}
                    onChange={(e) => setFormData({ ...formData, cta2Link: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
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
                    <span>Active on Homepage</span>
                  </label>
                </div>
              </div>

              {/* Image Upload */}
              <div className="bg-warm/50 p-4 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase">Banner Image Visual</label>
                    <p className="text-xs text-gray-500">Upload high-res product packshot or packaging bottle visual.</p>
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-white border border-gray-200 text-xs font-semibold px-3 py-1.5 rounded-lg hover:border-primary transition-colors text-charcoal">
                    <Upload className="w-3.5 h-3.5 text-primary" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={getImageUrl(formData.imageDesktop)}
                    alt="Banner Visual"
                    className="w-32 h-20 object-contain bg-white rounded-lg border border-gray-200 p-2"
                    onError={(e) => { e.target.src = '/uploads/hero-bottles.png'; }}
                  />
                  <input
                    type="text"
                    value={formData.imageDesktop}
                    onChange={(e) => setFormData({ ...formData, imageDesktop: e.target.value, imageMobile: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    placeholder="/uploads/hero-bottles.png"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
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
                  className="bg-primary text-white text-xs font-semibold px-6 py-2 rounded-xl shadow-md hover:bg-primary-dark transition-all disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Banner' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-charcoal mb-1">Delete Banner Slide?</h4>
            <p className="text-xs text-gray-500 mb-6">Are you sure you want to remove this hero slide from the homepage slider?</p>
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

export default Banners;
