import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import { Search, Filter, ArrowRight, Layers, Package } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedDosage, setSelectedDosage] = useState(searchParams.get('dosage') || '');

  const dosageForms = [
    'Liquid-Filled Hard Capsules',
    'Capsule-in-Capsule',
    'Pellets-in-Capsule',
    'Tablets',
    'Capsules',
    'Softgels',
    'Effervescent',
    'Sachets & Powders',
    'Gummies',
    'Liquids & Syrups',
    'Oral Shots'
  ];

  const healthCategories = [
    'Daily Wellness',
    "Men's Health",
    "Women's Health",
    'Beauty Nutrition',
    'Sports Nutrition',
    'Healthy Ageing',
    'Gut Health',
    'Immunity',
    'Bone & Joint',
    'Brain Health',
    'Sleep & Stress',
    'Specialized Nutrition'
  ];

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get('/products', {
          params: {
            search,
            category: selectedCategory,
            dosage: selectedDosage,
          }
        });
        if (res.success && res.data) {
          setProducts(res.data.products || res.data || []);
        }
      } catch (err) {
        // Fallback default sample formulations if API not yet populated
        setProducts([
          {
            _id: '1',
            name: 'CoQ10 100mg + Omega-3 Liquid-Filled Hard Capsule',
            slug: 'coq10-omega3-liquid-filled-hard-capsule',
            dosageForm: 'Liquid-Filled Hard Capsules',
            healthCategory: 'Healthy Ageing',
            description: 'Advanced dual antioxidant lipid matrix in band-sealed HPMC vegetarian capsule for superior absorption.',
            moq: '50,000 Capsules',
            image: '/logo.png'
          },
          {
            _id: '2',
            name: 'Probiotic + Prebiotic Dual Phase Capsule-in-Capsule',
            slug: 'probiotic-prebiotic-capsule-in-capsule',
            dosageForm: 'Capsule-in-Capsule',
            healthCategory: 'Gut Health',
            description: 'Live probiotic strains protected in targeted inner enteric capsule surrounded by liquid botanical prebiotic carrier.',
            moq: '50,000 Capsules',
            image: '/logo.png'
          },
          {
            _id: '3',
            name: 'Liposomal Vitamin C + Zinc Effervescent Tablets',
            slug: 'liposomal-vitamin-c-zinc-effervescent',
            dosageForm: 'Effervescent',
            healthCategory: 'Immunity',
            description: 'Fast-dissolving effervescent immunity formulation with high bioavailability and refreshing citrus taste.',
            moq: '10,000 Tubes',
            image: '/logo.png'
          },
          {
            _id: '4',
            name: 'Hydrolyzed Marine Collagen + Hyaluronic Acid Oral Shot',
            slug: 'marine-collagen-hyaluronic-acid-oral-shot',
            dosageForm: 'Oral Shots',
            healthCategory: 'Beauty Nutrition',
            description: 'High concentration ready-to-drink 25ml beauty formulation for skin hydration and dermal elasticity.',
            moq: '25,000 Vials',
            image: '/logo.png'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, [search, selectedCategory, selectedDosage]);

  return (
    <>
      <SEO title="Products & Formulations Catalog - ONPHARNO" description="Explore ONPHARNO's comprehensive catalog of pharmaceutical and nutraceutical formulations across advanced dosage forms and health categories." />
      <div className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Catalog & Formulations</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Healthcare Product Portfolio</h1>
          <p className="text-gray-300 mt-3 max-w-2xl font-light">
            Filter our validated formulations by Health Category or Dosage Form for private label and contract manufacturing.
          </p>
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
                placeholder="Search products or ingredients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>
            {/* Health Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
              >
                <option value="">All Health Categories</option>
                {healthCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            {/* Dosage Form Filter */}
            <div>
              <select
                value={selectedDosage}
                onChange={(e) => setSelectedDosage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
              >
                <option value="">All Dosage Forms</option>
                {dosageForms.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  onError={(e) => { e.target.src = '/logo.png'; }}
                />
                <span className="absolute top-4 left-4 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-white/90 text-primary border border-primary/20">
                  {p.dosageForm}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-medium block mb-1">
                    {p.healthCategory || 'Formulation'}
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
                    MOQ: {p.moq || 'Contact for MOQ'}
                  </span>
                  <Link
                    to={`/products/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
                  >
                    View Details
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
