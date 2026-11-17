import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import {
  Settings as SettingsIcon,
  Save,
  Building2,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Share2,
  Globe,
  Upload
} from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsAdmin = () => {
  const [settings, setSettings] = useState({
    companyName: 'ONPHARNO',
    tagline: 'Advanced Dosage-Form Technology & Healthcare Manufacturing',
    phone: '+91 98765 43210',
    email: 'info@onpharno.com',
    address: 'Pharmaceutical Technology Park, Innovation Drive, Gujarat, India',
    workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM IST',
    whatsappNumber: '+919876543210',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      email: 'mailto:info@onpharno.com'
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get('/settings');
        if (res.success && res.data) {
          setSettings(prev => ({
            ...prev,
            ...res.data,
            socialLinks: {
              ...prev.socialLinks,
              ...(res.data.socialLinks || {})
            }
          }));
        }
      } catch {
        // Fallback default
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await apiClient.put('/admin/settings', settings);
      if (res.success) {
        toast.success('Site settings updated successfully!');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-gray-500 text-sm">Loading site settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Global System Settings</h1>
        <p className="text-xs text-gray-500 mt-1">Configure company identity, contact coordinates, WhatsApp direct connect, and social links.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand & Identity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-sm text-charcoal">Corporate Identity</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Tagline / Mission</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Phone className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-sm text-charcoal">Contact Coordinates & Support</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Official Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Official Telephone</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">WhatsApp Hotline (with Country Code)</label>
              <div className="relative">
                <MessageCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                <input
                  type="text"
                  placeholder="+919876543210"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-mono"
                />
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">Used by floating WhatsApp button & header direct quick chat.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Operating Hours</label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={settings.workingHours}
                  onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Registered Manufacturing & Facility Address</label>
              <textarea
                rows="2"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Share2 className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-sm text-charcoal">Social Profiles & Presence</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">LinkedIn Company URL</label>
              <input
                type="url"
                value={settings.socialLinks?.linkedin || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                })}
                placeholder="https://linkedin.com/company/onpharno"
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Instagram Profile URL</label>
              <input
                type="url"
                value={settings.socialLinks?.instagram || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                })}
                placeholder="https://instagram.com/onpharno"
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-primary-dark transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save System Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsAdmin;
