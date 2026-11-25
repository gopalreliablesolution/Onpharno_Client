import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import useProductLabels from '../../hooks/useProductLabels';
import { ArrowLeft, CheckCircle2, ShieldCheck, Mail, Send, Package, Layers } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { slug } = useParams();
  const L = useProductLabels();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/products/${slug}`);
        if (res.success && res.data) {
          setProduct(res.data);
        }
      } catch (err) {
        // Fallback mockup with real packaging image
        const imgSlug = slug ? slug.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'multivitamin-gummies';
        const possibleImg = `/uploads/products/${imgSlug}.jpg`;
        setProduct({
          name: slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Premium Healthcare Formulation',
          dosageForm: 'Gummies',
          healthCategory: 'Nutraceutical Formulations',
          description: 'A scientifically validated formulation designed for high cellular bioavailability, stability, and premium shelf presentation. Manufactured in cGMP compliant state-of-the-art automated cleanrooms.',
          composition: [
            { ingredient: 'Active Bio-Complex', strength: '500 mg', purpose: 'Primary Functional Active' },
            { ingredient: 'Bio-Enhancer Matrix', strength: '25 mg', purpose: 'Absorption Maximizer' },
            { ingredient: 'Natural Fruit Pectin Base', strength: 'q.s.', purpose: 'Vegetarian Gummy Matrix' },
          ],
          benefits: [
            'Enhanced bioavailability and superior patient compliance',
            '100% Pectin-based vegetarian formulation with natural fruit flavors',
            'Clean label: No synthetic titanium dioxide or harsh chemical preservatives',
            'Manufactured in certified FSSAI & WHO-GMP cleanrooms'
          ],
          packaging: 'PET Jars with Induction Seal, Child-Resistant Caps, Export Master Cartons',
          moq: '15,000 Jars',
          image: possibleImg,
          images: [possibleImg]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiClient.post('/product-enquiries', {
        ...enquiryForm,
        productName: product?.name,
        productSlug: slug
      });
      toast.success(L.successText);
      setShowEnquiry(false);
    } catch {
      toast.error(err?.response?.data?.message || L.errorText);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${product?.name} - Formulations`}
        description={product?.description}
        schema={
          product
            ? {
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: product.name,
                description: product.description,
                image: product.images?.[0] || '/logo.png',
                category: product.healthCategory || product.dosageForm,
                brand: {
                  '@type': 'Brand',
                  name: 'ONPHARNO',
                },
                offers: {
                  '@type': 'AggregateOffer',
                  priceCurrency: 'USD',
                  price: 'B2B Wholesale / Contract Pricing',
                  availability: 'https://schema.org/InStock',
                },
              }
            : null
        }
      />
      <div className="bg-warm border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary">
            <ArrowLeft className="w-4 h-4" /> {L.backText}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image & Badges */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm text-center">
            <div className="h-80 flex items-center justify-center">
              <img
                src={product?.images?.[0] || product?.image || '/logo.png'}
                alt={product?.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
              />
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                {product?.dosageForm}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                {product?.healthCategory}
              </span>
              {L.detailBadge && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                  {L.detailBadge}
                </span>
              )}
            </div>
          </div>

          {/* Product Info & Action */}
          <div className="space-y-6">
            <div>
              {L.detailEyebrow && (
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {L.detailEyebrow}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mt-1">
                {product?.name}
              </h1>
              <p className="text-gray-600 mt-4 leading-relaxed">
                {product?.description}
              </p>
            </div>

            {/* Quick Specs */}
            {(L.moqLabel || L.regulatoryLabel || L.regulatoryValue) && (
              <div className="bg-warm/60 rounded-2xl p-5 border border-primary/10 grid grid-cols-2 gap-4">
                <div>
                  {L.moqLabel && <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">{L.moqLabel}</span>}
                  {(product?.moq || L.moqFallback) && <span className="font-semibold text-charcoal text-sm mt-0.5 block">{product?.moq || L.moqFallback}</span>}
                </div>
                <div>
                  {L.regulatoryLabel && <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">{L.regulatoryLabel}</span>}
                  {L.regulatoryValue && <span className="font-semibold text-charcoal text-sm mt-0.5 block">{L.regulatoryValue}</span>}
                </div>
              </div>
            )}

            {/* Action CTA */}
            {L.quoteButton && (
              <div className="pt-2">
                <button
                  onClick={() => setShowEnquiry(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Mail className="w-4 h-4" />
                  {L.quoteButton}
                </button>
              </div>
            )}

            {/* Key Benefits */}
            {(L.benefitsTitle || product?.benefits?.length > 0) && (
              <div className="pt-4 border-t border-gray-100">
              {L.benefitsTitle && <h3 className="font-serif font-bold text-lg text-charcoal mb-3">{L.benefitsTitle}</h3>}
              <ul className="space-y-2">
                {product?.benefits?.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              </div>
            )}
          </div>
        </div>

        {/* Composition Table */}
        {product?.composition && product.composition.length > 0 && (
          <div className="mt-16 bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            {L.compositionTitle && <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">{L.compositionTitle}</h3>}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm font-serif text-charcoal border-b border-gray-200">
                  <tr>
                    {L.compositionCol1 && <th className="p-4">{L.compositionCol1}</th>}
                    {L.compositionCol2 && <th className="p-4">{L.compositionCol2}</th>}
                    {L.compositionCol3 && <th className="p-4">{L.compositionCol3}</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {product.composition.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-4 font-medium text-charcoal">{item.ingredient}</td>
                      <td className="p-4 text-primary font-semibold">{item.strength}</td>
                      <td className="p-4 text-gray-600">{item.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Enquiry Modal */}
      {showEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
            {L.enquiryTitle && <h3 className="font-serif font-bold text-2xl text-charcoal">{L.enquiryTitle}</h3>}
            <p className="text-xs text-gray-500 mt-1">{L.enquiryProductLabel} <span className="font-semibold text-primary">{product?.name}</span></p>

            <form onSubmit={handleEnquirySubmit} className="space-y-4 mt-6">
              <div>
                {L.nameLabel && <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">{L.nameLabel}</label>}
                <input
                  required
                  type="text"
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                  placeholder={L.namePlaceholder}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {L.emailLabel && <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">{L.emailLabel}</label>}
                  <input
                    required
                    type="email"
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder={L.emailPlaceholder}
                  />
                </div>
                <div>
                  {L.phoneLabel && <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">{L.phoneLabel}</label>}
                  <input
                    type="text"
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder={L.phonePlaceholder}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {L.companyLabel && <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">{L.companyLabel}</label>}
                  <input
                    type="text"
                    value={enquiryForm.company}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, company: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder={L.companyPlaceholder}
                  />
                </div>
                <div>
                  {L.quantityLabel && <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">{L.quantityLabel}</label>}
                  <input
                    type="text"
                    value={enquiryForm.quantity}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, quantity: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder={L.quantityPlaceholder}
                  />
                </div>
              </div>
              <div>
                {L.messageLabel && <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">{L.messageLabel}</label>}
                <textarea
                  rows={3}
                  required
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                  placeholder={L.messagePlaceholder}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEnquiry(false)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100"
                >
                  {L.cancelText}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? L.sendingText : L.submitText}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
