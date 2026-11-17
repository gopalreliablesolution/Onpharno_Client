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
    'Gummies',
    'Effervescent Tablets',
    'Soft Gel Capsules',
    'Tablets',
    'Capsules',
    'Syrups & Liquids',
    'Oral Shots',
    'Sachets & Powders',
  ];

  const healthCategories = [
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
    'Energy & Gym Supplement',
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
        // Fallback default real SevenQ formulations with real packaging photos
        setProducts([
          {
            _id: '1',
            name: 'MULTIVITAMIN GUMMIES',
            slug: 'multivitamin-gummies',
            dosageForm: 'Gummies',
            healthCategory: 'Multivitamins Supplement',
            description: 'Complete daily nutritional support for vitality and immunity. Formulated with Vitamins A, C, D3, E, B6, B12, and Zinc in pectin-based strawberry chewable gummies.',
            moq: '15,000 Jars',
            images: ['/uploads/products/multivitamin-gummies.jpg'],
            image: '/uploads/products/multivitamin-gummies.jpg'
          },
          {
            _id: '2',
            name: 'MELATONIN GUMMIES',
            slug: 'melatonin-gummies',
            dosageForm: 'Gummies',
            healthCategory: 'Stress Relief & Sleep Supplement',
            description: 'Non-habit forming natural sleep support gummy combining 5mg Melatonin with chamomile and L-theanine for effortless sleep onset.',
            moq: '15,000 Jars',
            images: ['/uploads/products/melatonin-gummies.jpg'],
            image: '/uploads/products/melatonin-gummies.jpg'
          },
          {
            _id: '3',
            name: 'SKIN GUMMIES',
            slug: 'skin-gummies',
            dosageForm: 'Gummies',
            healthCategory: 'Hair Skin and Nail Supplement',
            description: 'Advanced dermal radiance gummy featuring reduced L-Glutathione, low molecular weight Hyaluronic Acid, and Vitamin C.',
            moq: '15,000 Jars',
            images: ['/uploads/products/skin-gummies.jpg'],
            image: '/uploads/products/skin-gummies.jpg'
          },
          {
            _id: '4',
            name: 'HAIR GUMMIES',
            slug: 'hair-gummies',
            dosageForm: 'Gummies',
            healthCategory: 'Hair Skin and Nail Supplement',
            description: 'Targeted follicular hair nutrition gummy packed with high-potency Biotin 10,000 mcg, Zinc, and Folic Acid.',
            moq: '15,000 Jars',
            images: ['/uploads/products/hair-gummies.jpg'],
            image: '/uploads/products/hair-gummies.jpg'
          },
          {
            _id: '5',
            name: 'CREATINE GUMMIES',
            slug: 'creatine-gummies',
            dosageForm: 'Gummies',
            healthCategory: 'Energy & Gym Supplement',
            description: 'Ultra-convenient athletic workout gummies delivering 3000mg micronized Creatine Monohydrate for muscle ATP energy and power.',
            moq: '15,000 Jars',
            images: ['/uploads/products/creatine-gummies.jpg'],
            image: '/uploads/products/creatine-gummies.jpg'
          },
          {
            _id: '6',
            name: 'APPLE CIDER VINEGAR EFFERVESCENT TABLET',
            slug: 'apple-cider-vinegar-effervescent-tablet',
            dosageForm: 'Effervescent Tablets',
            healthCategory: 'Weight Loss Supplement',
            description: 'Sparkling instant effervescent tablet with 500mg raw Apple Cider Vinegar, pomegranate extract, and Vitamin B12 for crisp weight control.',
            moq: '10,000 Tubes',
            images: ['/uploads/products/apple-cider-vinegar-effervescent-tablet.jpg'],
            image: '/uploads/products/apple-cider-vinegar-effervescent-tablet.jpg'
          },
          {
            _id: '7',
            name: 'L CARNITINE SHOTS',
            slug: 'l-carnitine-shots',
            dosageForm: 'Oral Shots',
            healthCategory: 'Energy & Gym Supplement',
            description: 'Ready-to-drink concentrated 25ml liquid shot delivering 3000mg pure L-Carnitine with Vitamin B5 for cellular fat burning.',
            moq: '25,000 Vials',
            images: ['/uploads/products/l-carnitine-shots.jpg'],
            image: '/uploads/products/l-carnitine-shots.jpg'
          },
          {
            _id: '8',
            name: 'OMEGA 3 CAPSULES',
            slug: 'omega-3-capsules',
            dosageForm: 'Soft Gel Capsules',
            healthCategory: 'Heart Supplement',
            description: 'Triple strength molecularly distilled Omega-3 fish oil softgels delivering 1000mg with 360mg EPA and 240mg DHA.',
            moq: '50,000 Softgels',
            images: ['/uploads/products/omega-3-capsules.webp'],
            image: '/uploads/products/omega-3-capsules.webp'
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
                  onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
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
