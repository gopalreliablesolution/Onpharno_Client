import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import {
  Plus,
  Package,
  Edit2,
  Trash2,
  Search,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Star,
  Layers,
  FileText,
  Eye,
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';

const DOSAGE_OPTIONS = [
  'Liquid-Filled Hard Capsules',
  'Capsule-in-Capsule',
  'Pellets-in-Capsule',
  'Gummies',
  'Effervescent Tablets',
  'Soft Gel Capsules',
  'Tablets',
  'Capsules',
  'Syrups & Liquids',
  'Oral Shots',
  'Sachets & Powders'
];

const CATEGORY_OPTIONS = [
  'Multivitamins Supplement',
  'Women Supplement',
  'Kids Supplement',
  'Ortho Supplement',
  'Brain Memory and Neuro Supplement',
  'Stress Relief & Sleep Supplement',
  'Digestive & Probiotic Supplement',
  'Hair Skin and Nail Supplement',
  'Weight Loss Supplement',
  'Heart Supplement',
  'Eye Liver Kidney Supplement',
  'Energy & Gym Supplement'
];

const initialProductState = {
  name: '',
  dosageForm: 'Liquid-Filled Hard Capsules',
  healthCategory: 'Multivitamins Supplement',
  description: '',
  packaging: 'Alu-Alu Blister, HDPE Bottles with Induction Seal',
  moq: '50,000 Units',
  featured: false,
  status: 'published',
  images: ['/uploads/products/multivitamin-gummies.jpg'],
  composition: [
    { ingredient: '', strength: '', purpose: '' }
  ],
  benefits: ['']
};

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dosageFilter, setDosageFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialProductState);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/products');
      if (res.success && res.data) {
        setProducts(res.data);
      }
    } catch (err) {
      toast.error('Failed to load products from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialProductState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || '',
      dosageForm: product.dosageForm || 'Liquid-Filled Hard Capsules',
      healthCategory: product.healthCategory || 'Multivitamins Supplement',
      description: product.description || '',
      packaging: product.packaging || '',
      moq: product.moq || '50,000 Units',
      featured: Boolean(product.featured),
      status: product.status || 'published',
      images: product.images && product.images.length > 0 ? product.images : ['/uploads/products/multivitamin-gummies.jpg'],
      composition: product.composition && product.composition.length > 0
        ? product.composition
        : [{ ingredient: '', strength: '', purpose: '' }],
      benefits: product.benefits && product.benefits.length > 0
        ? product.benefits
        : ['']
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
          images: [res.data.url, ...prev.images.filter(img => img !== '/uploads/products/multivitamin-gummies.jpg')]
        }));
        toast.success('Image uploaded successfully!');
      }
    } catch (err) {
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return;
    }

    // Filter empty composition rows and benefits
    const cleanComposition = formData.composition.filter(c => c.ingredient.trim() !== '');
    const cleanBenefits = formData.benefits.filter(b => b.trim() !== '');

    const payload = {
      ...formData,
      composition: cleanComposition.length > 0 ? cleanComposition : [{ ingredient: 'Active Herbal/Nutrient Complex', strength: '500mg', purpose: 'Primary Active' }],
      benefits: cleanBenefits.length > 0 ? cleanBenefits : ['Manufactured in cGMP cleanrooms']
    };

    setSubmitting(true);
    try {
      if (editingId) {
        await apiClient.put(`/admin/products/${editingId}`, payload);
        toast.success('Product updated successfully!');
      } else {
        await apiClient.post('/admin/products', payload);
        toast.success('Product created successfully!');
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.message || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/admin/products/${id}`);
      toast.success('Product removed');
      setProducts(prev => prev.filter(p => p._id !== id));
      setDeleteConfirmId(null);
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const toggleStatus = async (product) => {
    const newStatus = product.status === 'published' ? 'draft' : 'published';
    try {
      await apiClient.put(`/admin/products/${product._id}`, { status: newStatus });
      setProducts(prev => prev.map(p => p._id === product._id ? { ...p, status: newStatus } : p));
      toast.success(`Product status updated to ${newStatus}`);
    } catch {
      toast.error('Status update failed');
    }
  };

  // Add / remove composition rows
  const addCompositionRow = () => {
    setFormData(prev => ({
      ...prev,
      composition: [...prev.composition, { ingredient: '', strength: '', purpose: '' }]
    }));
  };

  const removeCompositionRow = (index) => {
    setFormData(prev => ({
      ...prev,
      composition: prev.composition.filter((_, i) => i !== index)
    }));
  };

  const updateCompositionRow = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.composition];
      updated[index][field] = value;
      return { ...prev, composition: updated };
    });
  };

  // Add / remove benefits
  const addBenefitRow = () => {
    setFormData(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const removeBenefitRow = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const updateBenefitRow = (index, value) => {
    setFormData(prev => {
      const updated = [...prev.benefits];
      updated[index] = value;
      return { ...prev, benefits: updated };
    });
  };

  // Filtered list
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesDosage = !dosageFilter || p.dosageForm === dosageFilter;
    const matchesCategory = !categoryFilter || p.healthCategory === categoryFilter;
    return matchesSearch && matchesDosage && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Products & Formulations</h1>
          <p className="text-xs text-gray-500 mt-1">Manage all pharmaceutical & nutraceutical formulations in the catalog ({products.length} total).</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md hover:bg-primary-dark transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Formulation
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search formulations by name, active ingredient or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={dosageFilter}
            onChange={(e) => setDosageFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-primary flex-1 md:flex-none"
          >
            <option value="">All Dosage Forms</option>
            {DOSAGE_OPTIONS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-primary flex-1 md:flex-none"
          >
            <option value="">All Health Categories</option>
            {CATEGORY_OPTIONS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">Loading formulations catalog...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Package className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <p className="text-sm font-semibold">No formulations found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search criteria or add a new formulation.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-warm/60 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Dosage Form</th>
                  <th className="p-4">Health Category</th>
                  <th className="p-4">MOQ</th>
                  <th className="p-4 text-center">Featured</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((p) => {
                  const mainImg = p.images?.[0] || '/uploads/products/multivitamin-gummies.jpg';
                  return (
                    <tr key={p._id} className="hover:bg-warm/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={getImageUrl(mainImg)}
                            alt={p.name}
                            className="w-12 h-12 object-contain rounded-lg border border-gray-200 bg-white p-1 shrink-0"
                            onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
                          />
                          <div>
                            <span className="font-semibold text-charcoal block line-clamp-1">{p.name}</span>
                            <span className="text-[11px] text-gray-400 block line-clamp-1">{p.packaging || 'Custom packaging'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 text-xs font-medium">
                        <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                          {p.dosageForm}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 text-xs font-medium">
                        {p.healthCategory}
                      </td>
                      <td className="p-4 text-gray-500 text-xs">{p.moq || '50,000 Units'}</td>
                      <td className="p-4 text-center">
                        {p.featured ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleStatus(p)}
                          className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                            p.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          {p.status === 'published' ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p._id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-lg font-bold text-charcoal">
                  {editingId ? 'Edit Product Formulation' : 'Create New Formulation'}
                </h3>
                <p className="text-xs text-gray-500">Provide formulation specifications, ingredients, dosage format and packaging details.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-charcoal rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. COENZYME Q10 + OMEGA-3 LIQUID-FILLED CAPSULES"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Dosage Form *</label>
                  <select
                    value={formData.dosageForm}
                    onChange={(e) => setFormData({ ...formData, dosageForm: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-white"
                  >
                    {DOSAGE_OPTIONS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Health / Therapeutic Category *</label>
                  <select
                    value={formData.healthCategory}
                    onChange={(e) => setFormData({ ...formData, healthCategory: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-white"
                  >
                    {CATEGORY_OPTIONS.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Minimum Order Quantity (MOQ)</label>
                  <input
                    type="text"
                    placeholder="e.g. 50,000 Capsules or 10,000 Tubes"
                    value={formData.moq}
                    onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Packaging Options</label>
                  <input
                    type="text"
                    placeholder="e.g. Alu-Alu Blister Pack, HDPE Bottles, Strip Packs"
                    value={formData.packaging}
                    onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Clinical Description & Rationale *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Detail the scientific formulation, delivery mechanism, bioavailability advantage, and stability parameters..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              {/* Product Image Upload */}
              <div className="bg-warm/50 p-4 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase">Product Imagery</label>
                    <p className="text-xs text-gray-500">Upload packshot photo or use local server asset.</p>
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

                <div className="flex flex-wrap gap-3 items-center">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group w-20 h-20 rounded-lg border border-gray-200 bg-white p-1">
                      <img
                        src={getImageUrl(img)}
                        alt="Product Preview"
                        className="w-full h-full object-contain"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
                      />
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Composition Repeater */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">Active Ingredients / Composition</label>
                  <button
                    type="button"
                    onClick={addCompositionRow}
                    className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Ingredient
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.composition.map((comp, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <input
                        type="text"
                        placeholder="Ingredient Name (e.g. CoQ10)"
                        value={comp.ingredient}
                        onChange={(e) => updateCompositionRow(idx, 'ingredient', e.target.value)}
                        className="sm:col-span-5 px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-primary"
                      />
                      <input
                        type="text"
                        placeholder="Strength (e.g. 100 mg)"
                        value={comp.strength}
                        onChange={(e) => updateCompositionRow(idx, 'strength', e.target.value)}
                        className="sm:col-span-3 px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-primary"
                      />
                      <input
                        type="text"
                        placeholder="Purpose / Functional Class"
                        value={comp.purpose}
                        onChange={(e) => updateCompositionRow(idx, 'purpose', e.target.value)}
                        className="sm:col-span-3 px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => removeCompositionRow(idx)}
                        disabled={formData.composition.length <= 1}
                        className="sm:col-span-1 p-1 text-gray-400 hover:text-red-500 text-center disabled:opacity-30"
                      >
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits Repeater */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">Key Product Benefits & Features</label>
                  <button
                    type="button"
                    onClick={addBenefitRow}
                    className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Benefit
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. High cellular absorption with superior gastric tolerance"
                        value={b}
                        onChange={(e) => updateBenefitRow(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => removeBenefitRow(idx)}
                        disabled={formData.benefits.length <= 1}
                        className="p-1 text-gray-400 hover:text-red-500 disabled:opacity-30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flags & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-charcoal">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                    />
                    <span>Mark as Featured Product</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600">Publication Status:</span>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="text-xs border border-gray-200 rounded-lg px-2.5 py-1 bg-white font-semibold text-charcoal"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft (Hidden)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary text-white text-xs font-semibold px-6 py-2 rounded-xl shadow-md hover:bg-primary-dark transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : editingId ? 'Update Formulation' : 'Create Formulation'}
                  </button>
                </div>
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
            <h4 className="text-base font-bold text-charcoal mb-1">Delete Product Formulation?</h4>
            <p className="text-xs text-gray-500 mb-6">This action cannot be undone. The product will be removed from the public catalog and database.</p>
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

export default ProductsAdmin;
