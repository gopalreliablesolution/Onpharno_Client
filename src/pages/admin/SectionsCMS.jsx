import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { Layers, Edit3, CheckCircle, Eye, EyeOff, Save, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const defaultSeedSections = [
  { pageKey: 'home', key: 'home_about', name: 'Home 1B: About Us Section', type: 'Text + CTA', title: "We Don't Just Manufacture Products. We Help Businesses Build Them.", subtitle: 'ONPHARNO brings the product journey together under one B2B partnership.' },
  { pageKey: 'home', key: 'home_signature', name: 'Home 1C: Signature Capability', type: 'Dosage Form Showcase', title: 'Liquid-Filled Hard Capsules.', subtitle: 'Where Formulation Meets Advanced Dosage-Form Thinking.' },
  { pageKey: 'home', key: 'home_7_steps', name: 'Home 1D: From Idea to Market', type: '7-Step Timeline', title: '01 Discover to 07 Deliver', subtitle: 'Support reliable supply aligned with your market requirements.' },
  { pageKey: 'home', key: 'home_why_partner', name: 'Home 1G: Why Partner With Us', type: 'Feature Grid', title: 'More Than Manufacturing. A Partner in Building Better Healthcare Businesses.', subtitle: 'Science-led development, advanced format capability, and flexible B2B models.' },
  { pageKey: 'about', key: 'about_story', name: 'About: Our Story Intro', type: 'Hero Narrative', title: 'Engineering Tomorrow’s Health Formulations Today', subtitle: 'Built on deep formulation sciences and reliable cGMP execution.' },
  { pageKey: 'capabilities', key: 'cap_manufacturing', name: 'Capabilities: Manufacturing Lines', type: 'Plant Overview', title: 'Automated High-Speed Production Lines', subtitle: 'Class 100,000 cleanrooms and multi-format contract capabilities.' },
];

const SectionsCMS = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    visible: true,
  });

  const fetchSections = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/sections');
      if (res.success && res.data) {
        setSections(res.data);
      }
    } catch {
      toast.error('Failed to load page sections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const openEditModal = (template) => {
    const existing = sections.find((s) => s.key === template.key);
    setSelectedSection(existing || template);
    setFormData({
      title: existing?.title || template.title || '',
      subtitle: existing?.subtitle || template.subtitle || '',
      image: existing?.image || template.image || '',
      visible: existing ? existing.visible !== false : true,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedSection) return;

    const payload = {
      pageKey: selectedSection.pageKey || 'home',
      key: selectedSection.key,
      name: selectedSection.name,
      type: selectedSection.type || 'content',
      title: formData.title,
      subtitle: formData.subtitle,
      image: formData.image,
      visible: formData.visible,
    };

    try {
      if (selectedSection._id) {
        await apiClient.put(`/admin/sections/${selectedSection._id}`, payload);
        toast.success(`Section "${selectedSection.name}" updated`);
      } else {
        await apiClient.post('/admin/sections', payload);
        toast.success(`Section "${selectedSection.name}" created in database`);
      }
      setSelectedSection(null);
      fetchSections();
    } catch {
      toast.error('Failed to save section content');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Page Sections CMS</h1>
          <p className="text-xs text-gray-500 mt-1">
            Edit headlines, lead paragraphs, and media assets for homepage and inner page sections.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {defaultSeedSections.map((tpl) => {
          const dbRecord = sections.find((s) => s.key === tpl.key);
          const isLive = dbRecord ? dbRecord.visible !== false : true;
          return (
            <div
              key={tpl.key}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-primary uppercase bg-warm px-2 py-0.5 rounded">
                    {tpl.pageKey} &bull; {tpl.type}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isLive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {isLive ? '● Visible' : '○ Hidden'}
                  </span>
                </div>
                <h3 className="font-bold text-base text-charcoal">{tpl.name}</h3>
                <p className="text-xs text-gray-600 mt-1 font-medium line-clamp-2">
                  {dbRecord?.title || tpl.title}
                </p>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                  {dbRecord?.subtitle || tpl.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-mono">key: {tpl.key}</span>
                <button
                  onClick={() => openEditModal(tpl)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-warm hover:bg-primary/10 text-primary text-xs font-semibold transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Section
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT MODAL */}
      {selectedSection && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-primary tracking-wider">Content Section</span>
                <h3 className="font-bold text-lg text-charcoal">{selectedSection.name}</h3>
              </div>
              <button onClick={() => setSelectedSection(null)} className="text-gray-400 hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Section Headline / Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Primary headline..."
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Subtext / Paragraph Body</label>
                <textarea
                  rows={4}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Supporting narrative or copy..."
                  className="w-full p-2.5 border rounded-xl resize-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Feature Image URL (/uploads/...)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/uploads/... or /hero-bg.jpg"
                  className="w-full p-2.5 border rounded-xl font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="sectionVisible"
                  checked={formData.visible}
                  onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                  className="w-4 h-4 text-primary rounded"
                />
                <label htmlFor="sectionVisible" className="font-semibold text-gray-700 cursor-pointer">
                  Section is visible on live website
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setSelectedSection(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl shadow"
                >
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionsCMS;
