import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import {
  Mail,
  Phone,
  MapPin,
  Globe2,
  Save,
  ExternalLink,
  MessageSquare,
  Building2,
  Clock,
  Layers,
  Sparkles,
  Map,
  Plus,
  Trash2,
  HelpCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const defaultCards = [
  {
    id: 'card-1',
    icon: 'mail',
    title: 'Email Us',
    line1: 'sales@onpharno.com',
    line2: 'info@onpharno.com',
    type: 'email'
  },
  {
    id: 'card-2',
    icon: 'phone',
    title: 'Phone No',
    line1: '+91 89809 40940',
    line2: 'Monday - Saturday: 9:00 AM - 6:30 PM (IST)',
    type: 'phone'
  },
  {
    id: 'card-3',
    icon: 'globe',
    title: 'Global Export Desk',
    line1: 'Serving B2B partners across 15+ countries with full CTD documentation & COA dossiers',
    line2: '',
    type: 'text'
  },
  {
    id: 'card-4',
    icon: 'map-pin',
    title: 'Manufacturing Facility',
    line1: 'Pharmaceutical Technology Park, Innovation Drive, Ahmedabad, Gujarat, India',
    line2: '',
    type: 'text'
  }
];

const defaultContactData = {
  heroTitle: 'Contact Us',
  getInTouchTitle: 'Get In Touch With Us',
  getInTouchSubtitle: "We're here to answer your queries and explore partnership opportunities.",

  // Dynamic Contact Cards List
  cards: defaultCards,

  // Right Form Box
  enquiryCardTitle: 'Send Us Your Enquiry',
  enquiryCardSubtitle: 'Please fill in the form and let us know how we can help.',
  submitButtonText: 'Send Message',

  // Map Embed URL
  mapEmbedUrl: 'https://maps.google.com/maps?q=Ahmedabad%20Gujarat%20India&t=m&z=12&output=embed&iwloc=near'
};

const ContactCMS = () => {
  const [formData, setFormData] = useState(defaultContactData);
  const [sectionId, setSectionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContactSection = async () => {
      try {
        const res = await apiClient.get('/admin/sections');
        if (res.success && res.data) {
          const contactSec = res.data.find((s) => s.key === 'contact_page');
          if (contactSec) {
            setSectionId(contactSec._id);
            if (contactSec.content) {
              const loadedContent = contactSec.content;
              // If legacy flat cards exist, convert them to cards array if cards not yet set
              let loadedCards = loadedContent.cards;
              if (!loadedCards || !Array.isArray(loadedCards) || loadedCards.length === 0) {
                loadedCards = defaultCards;
              }

              setFormData({
                ...defaultContactData,
                ...loadedContent,
                cards: loadedCards
              });
            }
          }
        }
      } catch (err) {
        toast.error('Unable to load Contact CMS content');
      } finally {
        setLoading(false);
      }
    };
    fetchContactSection();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Card list handlers
  const handleCardChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedCards = [...prev.cards];
      updatedCards[index] = { ...updatedCards[index], [field]: value };
      return { ...prev, cards: updatedCards };
    });
  };

  const handleAddCard = () => {
    const newCard = {
      id: `card-${Date.now()}`,
      icon: 'map-pin',
      title: 'New Location / Office',
      line1: 'Enter address, phone, or email',
      line2: '',
      type: 'text'
    };
    setFormData((prev) => ({
      ...prev,
      cards: [...prev.cards, newCard]
    }));
    toast.success('New contact card added!');
  };

  const handleRemoveCard = (index) => {
    if (formData.cards.length <= 1) {
      toast.error('You must keep at least 1 contact information card.');
      return;
    }
    setFormData((prev) => {
      const updatedCards = prev.cards.filter((_, i) => i !== index);
      return { ...prev, cards: updatedCards };
    });
    toast.success('Card removed');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      pageKey: 'contact',
      key: 'contact_page',
      name: 'Contact Page CMS',
      type: 'contact_cms',
      title: formData.heroTitle,
      subtitle: formData.getInTouchTitle,
      content: formData,
      visible: true
    };

    try {
      if (sectionId) {
        await apiClient.put(`/admin/sections/${sectionId}`, payload);
      } else {
        const res = await apiClient.post('/admin/sections', payload);
        if (res.success && res.data) {
          setSectionId(res.data._id);
        }
      }
      toast.success('Contact page content saved successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to save Contact page content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500 text-sm">
        Loading Contact CMS configuration...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Contact Page CMS</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage banner titles, dynamic contact cards (add/remove/edit cards), Google Map embed, and inquiry form controls.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-gray-300 text-charcoal hover:bg-gray-100 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-primary" />
            <span>View Live Page</span>
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: HERO BANNER */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-sm text-charcoal">1. Hero Banner</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Hero Banner Title
            </label>
            <input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => handleChange('heroTitle', e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              placeholder="Contact Us"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">
              Main headline centered on the dark banner.
            </span>
          </div>
        </div>

        {/* SECTION 2: GET IN TOUCH WITH US HEADER */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Layers className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-sm text-charcoal">2. "Get In Touch With Us" Section Intro</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={formData.getInTouchTitle}
                onChange={(e) => handleChange('getInTouchTitle', e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                placeholder="Get In Touch With Us"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Section Subtitle
              </label>
              <input
                type="text"
                value={formData.getInTouchSubtitle}
                onChange={(e) => handleChange('getInTouchSubtitle', e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                placeholder="We're here to answer your queries..."
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: DYNAMIC CONTACT CARDS (ADD / EDIT / DELETE) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-bold text-sm text-charcoal">3. Contact Information Cards</h3>
                <p className="text-[11px] text-gray-400">
                  Add, edit, or remove contact cards. Supports Email, Phone, Address, Export desk, or custom offices.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddCard}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Card</span>
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {formData.cards.map((card, idx) => (
              <div
                key={card.id || idx}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 hover:border-primary/40 transition-colors space-y-3 relative group"
              >
                {/* Header of each card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-charcoal uppercase tracking-wider">
                      Card #{idx + 1}
                    </span>
                  </div>
                  {formData.cards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCard(idx)}
                      className="p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove this card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Icon & Type Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Icon
                    </label>
                    <select
                      value={card.icon}
                      onChange={(e) => handleCardChange(idx, 'icon', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-primary"
                    >
                      <option value="mail">Mail / Email</option>
                      <option value="phone">Phone / Mobile</option>
                      <option value="map-pin">Map Pin / Location</option>
                      <option value="globe">Globe / International</option>
                      <option value="building">Building / Factory</option>
                      <option value="clock">Clock / Hours</option>
                      <option value="message">Message / Chat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Action Type
                    </label>
                    <select
                      value={card.type || 'text'}
                      onChange={(e) => handleCardChange(idx, 'type', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-primary"
                    >
                      <option value="email">Clickable Email (mailto:)</option>
                      <option value="phone">Clickable Phone (tel:)</option>
                      <option value="text">Plain Text / Address</option>
                    </select>
                  </div>
                </div>

                {/* Card Title */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Card Title
                  </label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardChange(idx, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-primary font-medium"
                    placeholder="e.g. Email Us / Phone No / UK Office"
                  />
                </div>

                {/* Line 1 */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Primary Line / Value 1
                  </label>
                  <textarea
                    rows="2"
                    value={card.line1}
                    onChange={(e) => handleCardChange(idx, 'line1', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-primary"
                    placeholder="e.g. sales@onpharno.com or +91 89809 40940 or Facility Address"
                  />
                </div>

                {/* Line 2 (Optional) */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Secondary Line / Value 2 <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={card.line2 || ''}
                    onChange={(e) => handleCardChange(idx, 'line2', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-primary"
                    placeholder="e.g. info@onpharno.com or Operating hours"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: INQUIRY FORM BOX & GOOGLE MAPS */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-sm text-charcoal">4. Inquiry Form Card & Google Maps Embed</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Box Controls */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">Form Box Controls</h4>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Form Heading</label>
                <input
                  type="text"
                  value={formData.enquiryCardTitle}
                  onChange={(e) => handleChange('enquiryCardTitle', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  placeholder="Send Us Your Enquiry"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Form Subtitle</label>
                <input
                  type="text"
                  value={formData.enquiryCardSubtitle}
                  onChange={(e) => handleChange('enquiryCardSubtitle', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  placeholder="Please fill in the form and let us know how we can help."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Submit Button Text</label>
                <input
                  type="text"
                  value={formData.submitButtonText}
                  onChange={(e) => handleChange('submitButtonText', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  placeholder="Send Message"
                />
              </div>
            </div>

            {/* Google Map Embed Controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal">
                <Map className="w-4 h-4 text-primary" />
                <span>Google Map Embed URL</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Google Maps Iframe URL
                </label>
                <textarea
                  rows="4"
                  value={formData.mapEmbedUrl}
                  onChange={(e) => handleChange('mapEmbedUrl', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-mono"
                  placeholder="https://maps.google.com/maps?q=...&output=embed"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Paste the Google Maps embed URL (e.g. from Google Maps &rarr; Share &rarr; Embed a map &rarr; src link).
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SAVE BUTTON */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Contact Page Content'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactCMS;
