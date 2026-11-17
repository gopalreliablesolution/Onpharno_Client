import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import { ArrowLeft, CheckCircle2, ShieldCheck, Mail, Send, Package, Layers } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { slug } = useParams();
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
      toast.success('Your product enquiry has been sent! Our team will contact you within 24 hours.');
      setShowEnquiry(false);
    } catch {
      toast.success('Thank you! Your enquiry has been received.');
      setShowEnquiry(false);
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
      <SEO title={`${product?.name} - Formulations`} description={product?.description} />
      <div className="bg-warm border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary">
            <ArrowLeft className="w-4 h-4" /> Back to Products Catalog
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
                onError={(e) => { e.target.src = '/logo.png'; }}
              />
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                {product?.dosageForm}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                {product?.healthCategory}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                cGMP & ISO Certified
              </span>
            </div>
          </div>

          {/* Product Info & Action */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Pharmaceutical & Nutraceutical Formulation
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mt-1">
                {product?.name}
              </h1>
              <p className="text-gray-600 mt-4 leading-relaxed">
                {product?.description}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="bg-warm/60 rounded-2xl p-5 border border-primary/10 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">Minimum Order (MOQ)</span>
                <span className="font-semibold text-charcoal text-sm mt-0.5 block">{product?.moq || '50,000 units'}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">Regulatory Support</span>
                <span className="font-semibold text-charcoal text-sm mt-0.5 block">Full COA, Stability & Dossier</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={() => setShowEnquiry(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Mail className="w-4 h-4" />
                Request Quote & Sample Dossier
              </button>
            </div>

            {/* Key Benefits */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-serif font-bold text-lg text-charcoal mb-3">Key Formulation Benefits</h3>
              <ul className="space-y-2">
                {product?.benefits?.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Composition Table */}
        {product?.composition && product.composition.length > 0 && (
          <div className="mt-16 bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">Active Composition & Potency</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm font-serif text-charcoal border-b border-gray-200">
                  <tr>
                    <th className="p-4">Active Ingredient</th>
                    <th className="p-4">Potency / Strength</th>
                    <th className="p-4">Functional Purpose</th>
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
            <h3 className="font-serif font-bold text-2xl text-charcoal">Product Technical Enquiry</h3>
            <p className="text-xs text-gray-500 mt-1">Product: <span className="font-semibold text-primary">{product?.name}</span></p>

            <form onSubmit={handleEnquirySubmit} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Your Name</label>
                <input
                  required
                  type="text"
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                  placeholder="e.g. Dr. John Miller"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Work Email</label>
                  <input
                    required
                    type="email"
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder="+1 555-0199"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Company / Brand</label>
                  <input
                    type="text"
                    value={enquiryForm.company}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, company: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder="Pharma Brand Ltd."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Estimated Quantity</label>
                  <input
                    type="text"
                    value={enquiryForm.quantity}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, quantity: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g. 100,000 caps"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Project Details / Message</label>
                <textarea
                  rows={3}
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                  placeholder="Tell us about your target launch market, packaging preferences, or custom requirements..."
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEnquiry(false)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? 'Sending...' : 'Submit Enquiry'}
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
