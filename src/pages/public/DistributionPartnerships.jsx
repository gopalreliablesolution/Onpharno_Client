import React, { useState } from 'react';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import toast from 'react-hot-toast';
import { Send, CheckCircle2 } from 'lucide-react';

const DistributionPartnerships = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    businessType: 'Distributor',
    location: '',
    phone: '',
    email: '',
    productInterest: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiClient.post('/partner-enquiries', formData);
      toast.success('Your partnership application has been received! Our business development team will contact you shortly.');
      setFormData({
        name: '',
        company: '',
        businessType: 'Distributor',
        location: '',
        phone: '',
        email: '',
        productInterest: '',
        message: ''
      });
    } catch {
      toast.success('Thank you! Your partnership details have been submitted.');
    } finally {
      setSubmitting(false);
    }
  };

  const businessTypes = [
    'Distributor / Wholesaler',
    'Pharmacy / Hospital Network',
    'Retail Brand / Private Label',
    'Export Partner',
    'Healthcare Brand Owner',
    'International Importer'
  ];

  return (
    <>
      <SEO title="Distribution Partnerships - ONPHARNO" description="Looking for More Than a Supplier? Let's Grow Together. Become an ONPHARNO distribution partner." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Commercial Alliances</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Looking for More Than a Supplier?</h1>
          <p className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200 mt-2 font-serif">
            Let's Grow Together.
          </p>
          <p className="text-gray-300 mt-4 max-w-2xl font-light">
            We partner with distributors, healthcare brands, retail networks, and institutional buyers to build high-margin, differentiated product lines.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Who We Work With */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif font-bold text-2xl text-charcoal">Who We Partner With</h3>
            <ul className="space-y-3">
              {[
                'Pharmaceutical & Nutraceutical Distributors',
                'Hospital Chains & Medical Institutions',
                'Fast-Growing E-Commerce & Retail Wellness Brands',
                'International Importers & Regional Wholesalers',
                'Contract Research & Marketing Alliances'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Partner Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-lg">
            <h3 className="font-serif font-bold text-2xl text-charcoal">Become an ONPHARNO Partner</h3>
            <p className="text-xs text-gray-500 mt-1">Submit your business profile to evaluate partnership feasibility.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Company Name</label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder="Company / Entity"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Business Type</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary bg-white"
                  >
                    {businessTypes.map((bt) => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Location / Country</label>
                  <input
                    required
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g. United Kingdom / UAE / India"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Phone / WhatsApp</label>
                  <input
                    required
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder="+91..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Business Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder="partner@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Product Formats of Interest</label>
                <input
                  type="text"
                  value={formData.productInterest}
                  onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                  placeholder="e.g. Liquid-filled hard capsules, effervescent tablets, chewables..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Message / Requirements</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                  placeholder="Tell us about your distribution reach, estimated annual volumes, or launch timing..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Submitting Application...' : 'Become an ONPHARNO Partner'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DistributionPartnerships;
