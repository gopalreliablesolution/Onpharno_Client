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
  badge: '',
  trustPoints: '',
  cta1Text: '',
  cta1Link: '',
  cta2Text: '',
  cta2Link: '',
  imageDesktop: '',
  imageMobile: '',
  order: 1,
  active: true
};

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialBannerState);
  const [uploadingTarget, setUploadingTarget] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/banners');
      if (res.success && res.data) {
        setBanners(res.data.sort((a, b) => (a.order || 0) - (b.order || 0)));
      }
    } catch {
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
      badge: banner.badge || '',
      trustPoints: banner.trustPoints || '',
      cta1Text: banner.cta1Text || '',
      cta1Link: banner.cta1Link || '',
      cta2Text: banner.cta2Text || '',
      cta2Link: banner.cta2Link || '',
      imageDesktop: banner.imageDesktop || '',
      imageMobile: banner.imageMobile || '',
      order: banner.order || 1,
      active: banner.active !== false
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e, targetField = 'imageDesktop') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    setUploadingTarget(targetField);

    try {
      const res = await apiClient.post('/admin/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.success && res.data?.url) {
        setFormData(prev => ({
          ...prev,
          [targetField]: res.data.url
        }));
        toast.success(`${targetField === 'imageDesktop' ? 'Desktop' : 'Mobile'} visual uploaded!`);
      }
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploadingTarget(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Hero Title is required');
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
                      <div className="flex items-center gap-2">
                        {b.imageDesktop ? (
                          <img
                            src={getImageUrl(b.imageDesktop)}
                            alt="Desktop visual"
                            title="Desktop Panoramic Image"
                            className="w-14 h-10 object-cover bg-gray-50 rounded border border-gray-200"
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-14 h-10 bg-gray-100 rounded border border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400">
                            No desk
                          </div>
                        )}
                        {b.imageMobile ? (
                          <img
                            src={getImageUrl(b.imageMobile)}
                            alt="Mobile visual"
                            title="Mobile Bottle Visual"
                            className="w-10 h-10 object-contain bg-gray-50 rounded border border-gray-200"
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                          />
                        ) : null}
                      </div>
                    </td>
                    <td className="p-4 max-w-md">
                      {b.eyebrow ? (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                          {b.eyebrow}
                        </span>
                      ) : null}
                      <p className="font-semibold text-charcoal text-sm line-clamp-1">{b.title}</p>
                      {b.subtitle ? <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{b.subtitle}</p> : null}
                      {b.badge ? (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary">
                          {b.badge}
                        </span>
                      ) : null}
                    </td>
                    <td className="p-4 text-xs text-gray-600 space-y-1">
                      {b.cta1Text ? (
                        <div>
                          <span className="font-medium text-charcoal">{b.cta1Text}</span>
                          <span className="text-gray-400 text-[10px] block">→ {b.cta1Link || '#'}</span>
                        </div>
                      ) : null}
                      {b.cta2Text ? (
                        <div>
                          <span className="font-medium text-charcoal">{b.cta2Text}</span>
                          <span className="text-gray-400 text-[10px] block">→ {b.cta2Link || '#'}</span>
                        </div>
                      ) : null}
                      {!b.cta1Text && !b.cta2Text && (
                        <span className="text-gray-400 italic text-[11px]">No Buttons (Hidden)</span>
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
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Hero Title / Headline *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Trusted Nutraceutical Partner"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Eyebrow (Top Pill Tag)</label>
                  <input
                    type="text"
                    placeholder="e.g. FSSAI Approved & WHO-GMP Certified (Leave blank to hide)"
                    value={formData.eyebrow}
                    onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                  <span className="text-[10px] text-gray-400">Empty = hides pill tag completely</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. 17+ Years Leadership (Leave blank to hide)"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                  <span className="text-[10px] text-gray-400">Empty = hides badge tag completely</span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Subtitle / Subtext</label>
                  <textarea
                    rows="2"
                    placeholder="Enter descriptive copy or leave blank to hide"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                  <span className="text-[10px] text-gray-400">Empty = hides description paragraph</span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Trust Checkmark Points (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. WHO-GMP & FSSAI Approved, Custom & Ready Formulations, On-Time Global Delivery"
                    value={formData.trustPoints}
                    onChange={(e) => setFormData({ ...formData, trustPoints: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                  <span className="text-[10px] text-gray-400">Empty = hides trust checkmarks row</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Primary CTA Button Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Explore Products (Leave empty to hide button)"
                    value={formData.cta1Text}
                    onChange={(e) => setFormData({ ...formData, cta1Text: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Primary CTA Link URL</label>
                  <input
                    type="text"
                    placeholder="/products"
                    value={formData.cta1Link}
                    onChange={(e) => setFormData({ ...formData, cta1Link: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Secondary CTA Button Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Start a Project (Leave empty to hide button)"
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

              {/* Desktop Panoramic Image Upload */}
              <div className="bg-warm/50 p-4 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase">Desktop Panoramic Banner (1920x700)</label>
                    <p className="text-[11px] text-gray-500">Wide hero background for desktop screens. Leave empty to use clean brand gradient.</p>
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-white border border-gray-200 text-xs font-semibold px-3 py-1.5 rounded-lg hover:border-primary transition-colors text-charcoal">
                    <Upload className="w-3.5 h-3.5 text-primary" />
                    <span>{uploadingTarget === 'imageDesktop' ? 'Uploading...' : 'Upload Desktop'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'imageDesktop')}
                      className="hidden"
                      disabled={!!uploadingTarget}
                    />
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  {formData.imageDesktop ? (
                    <img
                      src={getImageUrl(formData.imageDesktop)}
                      alt="Desktop Banner"
                      className="w-28 h-16 object-cover bg-white rounded-lg border border-gray-200"
                      onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-28 h-16 bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400">
                      No Image
                    </div>
                  )}
                  <input
                    type="text"
                    value={formData.imageDesktop}
                    onChange={(e) => setFormData({ ...formData, imageDesktop: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    placeholder="/images/hero-banner-1.jpg or upload"
                  />
                </div>
              </div>

              {/* Mobile Visual Upload */}
              <div className="bg-warm/50 p-4 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase">Mobile Product Showcase Visual</label>
                    <p className="text-[11px] text-gray-500">Square or portrait packshot displayed on phone screens. Leave empty to hide card.</p>
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-white border border-gray-200 text-xs font-semibold px-3 py-1.5 rounded-lg hover:border-primary transition-colors text-charcoal">
                    <Upload className="w-3.5 h-3.5 text-primary" />
                    <span>{uploadingTarget === 'imageMobile' ? 'Uploading...' : 'Upload Mobile'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'imageMobile')}
                      className="hidden"
                      disabled={!!uploadingTarget}
                    />
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  {formData.imageMobile ? (
                    <img
                      src={getImageUrl(formData.imageMobile)}
                      alt="Mobile Visual"
                      className="w-16 h-16 object-contain bg-white rounded-lg border border-gray-200 p-1"
                      onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400">
                      No Image
                    </div>
                  )}
                  <input
                    type="text"
                    value={formData.imageMobile}
                    onChange={(e) => setFormData({ ...formData, imageMobile: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    placeholder="/images/mobile-banner-1.jpg or upload"
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
