import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { getImageUrl } from '../../utils/imageUrl';
import { Search, Globe, Save, Edit3, CheckCircle, ExternalLink, RefreshCw, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import Portal from '../../components/common/Portal';

const SeoAdmin = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState(null);
  const [uploadingOgImage, setUploadingOgImage] = useState(false);
  const [formData, setFormData] = useState({
    key: '',
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogImage: '',
    active: true,
  });

  const defaultPageTemplates = [
    { key: 'home', title: 'Home Page', slug: '/' },
    { key: 'about', title: 'About Us / Company Story', slug: '/about/our-story' },
    { key: 'products', title: 'Formulations & Products Catalog', slug: '/products' },
    { key: 'liquid_capsules', title: 'Liquid-Filled Hard Capsules', slug: '/products/liquid-filled-hard-capsules' },
    { key: 'capabilities', title: 'Capabilities & Contract Manufacturing', slug: '/capabilities/manufacturing' },
    { key: 'blogs', title: 'Nutraceutical Insights & Blogs', slug: '/resources/blogs' },
    { key: 'faqs', title: 'Technical FAQs & Knowledge', slug: '/resources/faqs' },
    { key: 'certifications', title: 'Compliance & Certifications', slug: '/resources/certifications' },
    { key: 'contact', title: 'Commercial Inquiry & Contact', slug: '/contact' },
  ];

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/pages');
      if (res.success && res.data) {
        setPages(res.data);
      }
    } catch {
      toast.error('Failed to load SEO pages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const openEditor = (template) => {
    const existing = pages.find((p) => p.key === template.key);
    if (existing) {
      setEditingPage(existing);
      setFormData({
        key: existing.key,
        title: existing.title || template.title,
        slug: existing.slug || template.slug,
        metaTitle: existing.seo?.metaTitle || '',
        metaDescription: existing.seo?.metaDescription || '',
        keywords: existing.seo?.keywords || '',
        ogImage: existing.seo?.ogImage || '',
        active: existing.active !== false,
      });
    } else {
      setEditingPage(null);
      setFormData({
        key: template.key,
        title: template.title,
        slug: template.slug,
        metaTitle: `${template.title} | ONPHARNO B2B`,
        metaDescription: `Discover ONPHARNO's science-led manufacturing for ${template.title.toLowerCase()}.`,
        keywords: 'pharmaceutical, nutraceutical, contract manufacturing, liquid capsules, GMP',
        ogImage: '/logo.png',
        active: true,
      });
    }
  };

  const handleOgImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    setUploadingOgImage(true);
    try {
      const res = await apiClient.post('/admin/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = res?.data?.url || res?.url;
      if (url) {
        setFormData((prev) => ({ ...prev, ogImage: url }));
        toast.success('Image uploaded');
      } else {
        toast.error('Upload succeeded but no URL returned');
      }
    } catch (err) {
      toast.error(err?.message || 'Image upload failed');
    } finally {
      setUploadingOgImage(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      key: formData.key,
      title: formData.title,
      slug: formData.slug,
      seo: {
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        keywords: formData.keywords,
        ogImage: formData.ogImage,
      },
      active: formData.active,
    };

    try {
      if (editingPage?._id) {
        await apiClient.put(`/admin/pages/${editingPage._id}`, payload);
        toast.success(`SEO updated for ${formData.title}`);
      } else {
        await apiClient.post('/admin/pages', payload);
        toast.success(`SEO profile created for ${formData.title}`);
      }
      setEditingPage(null);
      fetchPages();
    } catch {
      toast.error('Failed to save SEO metadata');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">SEO & OpenGraph Metadata</h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure titles, meta descriptions, search keywords, and social preview images per route.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-warm/50 border-b flex items-center justify-between">
          <span className="text-xs font-bold text-charcoal uppercase tracking-wider">Public Website Routes</span>
          <span className="text-xs text-gray-500">Live Crawl Configurations</span>
        </div>

        <div className="divide-y divide-gray-100">
          {defaultPageTemplates.map((tpl) => {
            const configured = pages.find((p) => p.key === tpl.key);
            return (
              <div key={tpl.key} className="p-4 hover:bg-warm/20 transition-colors flex items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold text-sm text-charcoal">{tpl.title}</span>
                    <span className="text-xs text-gray-400 font-mono">{tpl.slug}</span>
                    {configured ? (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                        Custom SEO Active
                      </span>
                    ) : (
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        Using Default SEO
                      </span>
                    )}
                  </div>
                  {configured?.seo?.metaDescription ? (
                    <p className="text-xs text-gray-600 line-clamp-1">{configured.seo.metaDescription}</p>
                  ) : (
                    <p className="text-xs text-gray-400 italic">No custom meta description set. Crawlers inherit global meta tags.</p>
                  )}
                </div>

                <button
                  onClick={() => openEditor(tpl)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-charcoal text-xs font-semibold rounded-xl hover:border-primary hover:text-primary transition-colors shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit SEO
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEO EDIT MODAL */}
      {formData.key && (
        <Portal><div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2">
              <div>
                <span className="text-[10px] font-bold uppercase text-primary tracking-wider">SEO Profile</span>
                <h3 className="font-bold text-lg text-charcoal">{formData.title}</h3>
              </div>
              <button onClick={() => setFormData({ ...formData, key: '' })} className="text-gray-400 hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Target Page Title (SERP Display)</label>
                <input
                  type="text"
                  required
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="e.g. Contract Manufacturing Services | ONPHARNO"
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Meta Description ({formData.metaDescription.length}/160 chars recommended)
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Brief compelling description for Google search snippets..."
                  className="w-full p-2.5 border rounded-xl resize-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Target Keywords (Comma Separated)</label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="e.g. nutraceutical contract manufacturing, liquid filled capsules, cGMP"
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-gray-700 block">Social Preview Image (OpenGraph og:image)</label>
                  <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-[11px] font-semibold text-charcoal hover:border-primary transition-colors ${uploadingOgImage ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
                    <Upload className="w-3.5 h-3.5 text-primary" />
                    <span>{uploadingOgImage ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleOgImageUpload} className="hidden" disabled={uploadingOgImage} />
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  placeholder="/logo.png or /uploads/..."
                  className="w-full p-2.5 border rounded-xl font-mono"
                />
                <p className="text-[10px] text-gray-400 mt-1">Paste a URL/path or upload an image file.</p>
                {formData.ogImage?.trim() ? (
                  <div className="mt-2">
                    <img
                      src={getImageUrl(formData.ogImage.trim())}
                      alt="OG preview"
                      className="h-20 w-auto max-w-full object-contain rounded-lg border border-gray-200 bg-gray-50 p-1"
                      onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                    />
                  </div>
                ) : null}
              </div>

              {/* SERP Search Snippet Preview */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Google Search Preview</span>
                <p className="text-blue-700 font-semibold text-sm truncate">{formData.metaTitle || 'Page Title'}</p>
                <p className="text-emerald-700 text-[11px] truncate">https://onpharno.com{formData.slug}</p>
                <p className="text-gray-600 text-xs line-clamp-2">{formData.metaDescription || 'Meta description will render here...'}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, key: '' })}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl shadow"
                >
                  Save SEO Meta
                </button>
              </div>
            </form>
          </div>
        </div></Portal>
      )}
    </div>
  );
};

export default SeoAdmin;
