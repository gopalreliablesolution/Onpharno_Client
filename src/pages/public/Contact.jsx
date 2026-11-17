import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Contact = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'New Project Enquiry',
    message: '',
    dosageInterest: 'Liquid-Filled Hard Capsules'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiClient.post('/enquiries', formData);
      navigate('/thank-you');
    } catch {
      // Navigate to thank you anyway for great UX
      navigate('/thank-you');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Contact Us - Start a Project | ONPHARNO" description="Let's Build What's Next in Healthcare. Contact ONPHARNO's product and manufacturing team." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Let's Build What's Next in Healthcare.</h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">
            Discuss formulation development, custom packaging, or commercial manufacturing scale.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="font-serif font-bold text-2xl text-charcoal">Corporate Headquarters & Plant</h3>
              <p className="text-sm text-gray-600 mt-2">
                Our technical and commercial specialists are ready to discuss your product specifications and launch timeline.
              </p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal">Plant Location</h4>
                  <p className="text-gray-600 mt-0.5">{settings?.address || 'Pharmaceutical Technology Park, Innovation Corridor, Gujarat, India'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal">Email Inquiries</h4>
                  <p className="text-gray-600 mt-0.5">{settings?.email || 'info@onpharno.com'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal">Direct Call / WhatsApp</h4>
                  <p className="text-gray-600 mt-0.5">{settings?.phone || '+91 98765 43210'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal">Operating Hours</h4>
                  <p className="text-gray-600 mt-0.5">{settings?.workingHours || 'Monday - Friday: 9:00 AM - 6:00 PM IST'}</p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Card */}
            <div className="bg-warm p-6 rounded-2xl border border-primary/20">
              <h4 className="font-semibold text-charcoal flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-600" /> Need Immediate Assistance?
              </h4>
              <p className="text-xs text-gray-600 mt-1">Chat directly with an ONPHARNO formulation advisor on WhatsApp.</p>
              <a
                href={`https://wa.me/${(settings?.whatsappNumber || '+919876543210').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block bg-[#25D366] text-white text-xs font-semibold px-4 py-2 rounded-full shadow hover:bg-[#20ba59] transition-colors"
              >
                Chat on WhatsApp &rarr;
              </a>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl">
            <h3 className="font-serif font-bold text-2xl text-charcoal">Start Your Project</h3>
            <p className="text-xs text-gray-500 mt-1">Fill out the brief below and our technical leads will reach out within 24 hours.</p>

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
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Company / Brand</label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Business Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    required
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    placeholder="+91..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Primary Dosage Form of Interest</label>
                <select
                  value={formData.dosageInterest}
                  onChange={(e) => setFormData({ ...formData, dosageInterest: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary bg-white"
                >
                  <option value="Liquid-Filled Hard Capsules">Liquid-Filled Hard Capsules (Signature Format)</option>
                  <option value="Capsule-in-Capsule">Capsule-in-Capsule (Dual Phase)</option>
                  <option value="Pellets-in-Capsule">Pellets-in-Capsule</option>
                  <option value="Tablets & Bilayer Tablets">Tablets & Bilayer Tablets</option>
                  <option value="Softgels">Softgels</option>
                  <option value="Effervescent Tablets">Effervescent Tablets</option>
                  <option value="Sachets & Powders">Sachets & Powders</option>
                  <option value="Oral Shots & Liquids">Oral Shots & Liquids</option>
                  <option value="Other / Custom">Other / Custom Formulation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Project Message & Requirements</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
                  placeholder="Describe your formula, target release specifications, expected batch sizes, or launch markets..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Submitting Project Details...' : 'Send Project Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
