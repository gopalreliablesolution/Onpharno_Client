import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import useProductLabels from '../../hooks/useProductLabels';
import { Search, Filter, ArrowRight, Layers, Package } from 'lucide-react';

// Section 3C uses longer labels than the catalog data. Map the doc labels
// to the exact health-category names used by the product database.
const HEALTH_CATEGORY_ALIASES = {
  'Gut & Digestive Health': 'Gut Health',
  'Bone & Joint Health': 'Bone & Joint',
  'Brain & Cognitive Health': 'Brain Health',
  'Sleep & Stress Support': 'Sleep & Stress',
  'Sports & Active Nutrition': 'Sports Nutrition',
  'Specialized Healthcare': 'Specialized Nutrition',
};

// Legacy dosage labels -> current database names.
const DOSAGE_FORM_ALIASES = {
  'Liquid filled capsules': 'Liquid-Filled Hard Capsules',
  'Soft Gel Capsules': 'Softgels',
  'Effervescent Tablets': 'Effervescent',
  'Sachets & Powders': 'Sachets',
  'Syrups & Liquids': 'Liquids & Syrups',
  'Oral Shots': 'Oral Shots',
};

const Products = () => {
  const L = useProductLabels();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [dosageOptions, setDosageOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // The URL is the single source of truth, so filters always match the link clicked.
  const search = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedDosage = searchParams.get('dosage') || searchParams.get('format') || '';
  const apiCategory = HEALTH_CATEGORY_ALIASES[selectedCategory] || selectedCategory;
  const apiDosage = DOSAGE_FORM_ALIASES[selectedDosage] || selectedDosage;

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (key === 'dosage') next.delete('format');
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await apiClient.get('/categories');
        const list = Array.isArray(res?.data) ? res.data : [];
        // Only the current catalog taxonomy (the ones with real category tiles).
        const current = list.filter((c) => (c.image || '').includes('/uploads/categories/'));
        setCategoryOptions(current.filter((c) => c.type === 'health_category').map((c) => c.name).filter(Boolean));
        setDosageOptions(current.filter((c) => c.type === 'dosage_form').map((c) => c.name).filter(Boolean));
      } catch { /* filters stay empty until the API is available */ }
    };
    fetchOptions();
  }, []);

  const categoryChoices = Array.from(
    new Set([...categoryOptions, ...(selectedCategory ? [selectedCategory] : [])])
  ).filter(Boolean);
  const dosageChoices = Array.from(
    new Set([...dosageOptions, ...(selectedDosage ? [selectedDosage] : [])])
  ).filter(Boolean);

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get('/products', {
          params: {
            search,
            category: apiCategory,
            dosage: apiDosage,
          }
        });
        if (res.success && res.data) {
          setProducts(res.data.products || res.data || []);
        }
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, [search, apiCategory, apiDosage]);

  return (
    <>
      <SEO title="Products & Formulations Catalog - ONPHARNO" description="Explore ONPHARNO's comprehensive catalog of pharmaceutical and nutraceutical formulations across advanced dosage forms and health categories." />
      <div className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {L.catalogEyebrow && <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">{L.catalogEyebrow}</span>}
          {L.catalogTitle && <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">{L.catalogTitle}</h1>}
          {L.catalogSubtitle && <p className="text-gray-300 mt-3 max-w-2xl font-light">{L.catalogSubtitle}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Header */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder={L.searchPlaceholder}
                value={search}
                onChange={(e) => updateParam('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>
            {/* Health Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => updateParam('category', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
              >
                <option value="">{L.allCategories}</option>
                {categoryChoices.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            {/* Dosage Form Filter */}
            <div>
              <select
                value={selectedDosage}
                onChange={(e) => updateParam('dosage', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
              >
                <option value="">{L.allDosages}</option>
                {dosageChoices.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {(selectedCategory || selectedDosage || search) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
            {L.showingFor && <span className="text-gray-500">{L.showingFor}</span>}
            {selectedCategory && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                {selectedCategory}
              </span>
            )}
            {selectedDosage && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                {selectedDosage}
              </span>
            )}
            {search && (
              <span className="px-3 py-1 rounded-full bg-warm text-charcoal font-semibold">“{search}”</span>
            )}
            <button
              type="button"
              onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}
              className="text-xs text-gray-500 hover:text-primary underline ml-1"
            >
              {L.clearFilters}
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading && products.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-gray-200">
              {L.emptyTitle && <p className="text-lg font-semibold text-charcoal">{L.emptyTitle}</p>}
              {L.emptyText && <p className="text-sm text-gray-500 mt-2">{L.emptyText}</p>}
            </div>
          )}
          {products.map((p) => (
            <div
              key={p._id || p.slug}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="h-48 bg-warm/50 flex items-center justify-center p-6 border-b border-gray-100 relative">
                <img
                  src={p.images?.[0] || p.image || '/logo.png'}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
                />
                <span className="absolute top-4 left-4 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-white/90 text-primary border border-primary/20">
                  {p.dosageForm}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-medium block mb-1">
                    {p.healthCategory || L.categoryFallback}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-charcoal group-hover:text-primary transition-colors line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {p.description}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    {L.moqPrefix} {p.moq || L.moqUnknown}
                  </span>
                  <Link
                    to={`/products/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
                  >
                    {L.viewDetails}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
