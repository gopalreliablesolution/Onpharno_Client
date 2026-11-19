import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Globe2, Building2, Clock, MessageSquare } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Contact = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [cmsData, setCmsData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
    website: '' // honeypot spam protection
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCmsContent = async () => {
      try {
        const res = await apiClient.get('/pages/contact/sections');
        if (res.success && res.data && res.data.length > 0) {
          const contactSec = res.data.find((s) => s.key === 'contact_page');
          if (contactSec && contactSec.content) {
            setCmsData(contactSec.content);
          }
        }
      } catch (err) {
        // Fallback to settings and defaults smoothly
      }
    };
    fetchCmsContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (formData.website) {
      // Honeypot triggered: silently redirect without submitting
      navigate('/thank-you');
      return;
    }
    setSubmitting(true);
    try {
      await apiClient.post('/enquiries', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        company: formData.city ? `City: ${formData.city}` : undefined,
        type: 'contact',
        notes: formData.city ? `City: ${formData.city}` : undefined
      });
      navigate('/thank-you');
    } catch (err) {
      toast.error(err?.message || 'Unable to submit your enquiry right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Dynamic Contact Information Cards with graceful fallbacks
  const cards = (cmsData?.cards && Array.isArray(cmsData.cards) && cmsData.cards.length > 0)
    ? cmsData.cards
    : [
        {
          id: 'card-1',
          icon: 'mail',
          title: cmsData?.emailCardTitle || 'Email Us',
          line1: cmsData?.primaryEmail || settings?.email || 'sales@onpharno.com',
          line2: cmsData?.secondaryEmail || 'info@onpharno.com',
          type: 'email'
        },
        {
          id: 'card-2',
          icon: 'phone',
          title: cmsData?.phoneCardTitle || 'Phone No',
          line1: cmsData?.primaryPhone || settings?.phone || '+91 89809 40940',
          line2: cmsData?.phoneHours || settings?.workingHours || 'Monday - Saturday: 9:00 AM - 6:30 PM (IST)',
          type: 'phone'
        },
        {
          id: 'card-3',
          icon: 'globe',
          title: cmsData?.exportCardTitle || 'Global Export Desk',
          line1: cmsData?.exportCardText || 'Serving B2B partners across 15+ countries with full CTD documentation & COA dossiers',
          line2: '',
          type: 'text'
        },
        {
          id: 'card-4',
          icon: 'map-pin',
          title: cmsData?.facilityCardTitle || 'Manufacturing Facility',
          line1: cmsData?.facilityAddress || settings?.address || 'Pharmaceutical Technology Park, Innovation Drive, Ahmedabad, Gujarat, India',
          line2: '',
          type: 'text'
        }
      ];

  return (
    <>
      <SEO
        title={`${cmsData?.heroTitle || 'Contact Us'} | ONPHARNO Advanced Contract Manufacturing`}
        description="Get in touch with ONPHARNO. Discuss formulation development, private label contract manufacturing, and international export partnerships."
      />

      {/* 1. HERO BANNER (ONPHARNO Navy + Centered Title) */}
      <section className="relative bg-navy text-white py-16 sm:py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy-800 to-navy opacity-95" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans">
            {cmsData?.heroTitle || 'Contact Us'}
          </h1>
        </div>
      </section>

      {/* 2. GET IN TOUCH WITH US (Dynamic Cards Managed From Admin CMS) */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal">
              {cmsData?.getInTouchTitle || 'Get In Touch With Us'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 font-normal">
              {cmsData?.getInTouchSubtitle || "We're here to answer your queries and explore partnership opportunities."}
            </p>
          </div>

          {/* Dynamic Cards Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${cards.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
            {cards.map((card, idx) => {
              const renderIcon = () => {
                switch (card.icon) {
                  case 'phone': return <Phone className="w-5 h-5" />;
                  case 'globe': return <Globe2 className="w-5 h-5" />;
                  case 'building': return <Building2 className="w-5 h-5" />;
                  case 'clock': return <Clock className="w-5 h-5" />;
                  case 'message': return <MessageSquare className="w-5 h-5" />;
                  case 'mail': return <Mail className="w-5 h-5" />;
                  case 'map-pin':
                  default:
                    return <MapPin className="w-5 h-5" />;
                }
              };

              return (
                <div
                  key={card.id || idx}
                  className="bg-white p-6 rounded-2xl border-2 border-primary/25 hover:border-primary shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-between min-h-[190px]"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                    {renderIcon()}
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-base text-charcoal mb-2">
                      {card.title}
                    </h3>
                    <div className="text-xs text-gray-600 space-y-1 font-medium">
                      {card.line1 && (
                        card.type === 'email' ? (
                          <a href={`mailto:${card.line1}`} className="block hover:text-primary hover:underline truncate">
                            {card.line1}
                          </a>
                        ) : card.type === 'phone' ? (
                          <a href={`tel:${card.line1.replace(/\s+/g, '')}`} className="block hover:text-primary">
                            {card.line1}
                          </a>
                        ) : (
                          <p className="leading-relaxed">{card.line1}</p>
                        )
                      )}
                      {card.line2 && (
                        card.type === 'email' ? (
                          <a href={`mailto:${card.line2}`} className="block hover:text-primary hover:underline truncate">
                            {card.line2}
                          </a>
                        ) : (
                          <p className="text-gray-400 text-[11px] leading-relaxed">{card.line2}</p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SIDE-BY-SIDE: MAP ON LEFT & ONPHARNO NAVY FORM ON RIGHT */}
      <section className="pb-16 sm:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* LEFT: Google Map Embed for ONPHARNO Facility in Ahmedabad */}
            <div className="w-full min-h-[380px] lg:min-h-[440px] rounded-2xl overflow-hidden border border-gray-200 shadow-md">
              <iframe
                title="ONPHARNO Manufacturing Plant Location"
                src={cmsData?.mapEmbedUrl || 'https://maps.google.com/maps?q=Ahmedabad%20Gujarat%20India&t=m&z=12&output=embed&iwloc=near'}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* RIGHT: Send Us Your Enquiry Card (ONPHARNO Navy Container + Primary Button) */}
            <div className="bg-navy text-white p-7 sm:p-9 rounded-2xl shadow-xl flex flex-col justify-between border border-navy-800">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {cmsData?.enquiryCardTitle || 'Send Us Your Enquiry'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mb-6 font-normal">
                  {cmsData?.enquiryCardSubtitle || 'Please fill in the form and let us know how we can help.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      required
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white text-charcoal px-3.5 py-2.5 rounded-lg text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white text-charcoal px-3.5 py-2.5 rounded-lg text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  {/* Row 2: Phone No & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      required
                      type="tel"
                      placeholder="Phone No"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white text-charcoal px-3.5 py-2.5 rounded-lg text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white text-charcoal px-3.5 py-2.5 rounded-lg text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <textarea
                      required
                      rows={4}
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white text-charcoal px-3.5 py-2.5 rounded-lg text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>

                  {/* Submit Button in ONPHARNO Brand Gradient (#D85430 -> #A83030) */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-600 hover:to-primary-dark text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-primary/20 disabled:opacity-50 active:scale-[0.99]"
                    >
                      {submitting ? 'Sending...' : (cmsData?.submitButtonText || 'Send Message')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
