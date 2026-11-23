import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { Save, Plus, Trash2, RotateCcw, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const DEFAULTS = {
  hero: {
    eyebrow: "WHAT'S NEW",
    title: 'Healthcare Innovations',
    subtitle: 'Pushing the boundaries of bioavailability, clean formulation, and consumer experience.',
  },
  intro: {
    title: 'Innovation Starts With the Right Product Question.',
    subtitle: 'Explore the formulation thinking, dosage-form development and practical manufacturing considerations behind our work.',
  },
  cta: {
    title: 'Have a Product Idea?',
    desc: "Let's explore how innovation can shape your next product.",
    text: 'Partner With Our Innovation Team →',
    link: '/contact',
  },
  items: [
    {
      badge: 'NEW FORMAT',
      title: 'Plant-Based Lipophilic Encapsulation',
      desc: 'Breakthrough HPMC shells compatible with highly sensitive herbal oils, preventing cross-linking and preserving natural phytonutrients without preservatives.',
      image: '',
    },
    {
      badge: 'NEXT GEN',
      title: 'Targeted Micro-Pellet Chronotherapy',
      desc: 'Multi-phasic pellets providing distinct release timings across a 12-hour circadian window inside a single capsule format.',
      image: '',
    },
  ],
};

const InnovationsCMS = () => {
  const [form, setForm] = useState({
    hero: DEFAULTS.hero,
    intro: DEFAULTS.intro,
    cta: DEFAULTS.cta,
    items: DEFAULTS.items,
  });
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get('/admin/sections');
        const rec = (res.data || []).find((s) => s.key === 'innovations_page');
        if (rec) {
          setRecordId(rec._id);
          const c = rec.content || {};
          setForm({
            hero: { ...DEFAULTS.hero, ...(c.hero || {}) },
            intro: { ...DEFAULTS.intro, ...(c.intro || {}), title: rec.title || DEFAULTS.intro.title, subtitle: rec.subtitle || DEFAULTS.intro.subtitle },
            cta: { ...DEFAULTS.cta, ...(c.cta || {}) },
            items: Array.isArray(c.items) && c.items.length ? c.items : DEFAULTS.items,
          });
        }
      } catch { toast.error('Failed to load Innovations content'); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const setGroup = (group, key, value) => setForm((p) => ({ ...p, [group]: { ...p[group], [key]: value } }));
  const setItem = (idx, key, value) => setForm((p) => {
    const items = [...p.items];
    items[idx] = { ...items[idx], [key]: value };
    return { ...p, items };
  });
  const handleItemUpload = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    setUploading(true);
    try {
      const res = await apiClient.post('/admin/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      const url = res?.data?.url || res?.url;
      if (url) { setItem(idx, 'image', url); toast.success('Image uploaded'); }
      else toast.error('No URL returned');
    } catch (err) { toast.error(err?.message || 'Upload failed'); }
    finally { setUploading(false); e.target.value = ''; }
  };

  const addItem = () => setForm((p) => ({ ...p, items: [...p.items, { badge: '', title: '', desc: '', image: '' }] }));
  const removeItem = (idx) => setForm((p) => ({ ...p, items: p.items.filter((_, i) => i !== idx) }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        pageKey: 'innovations',
        key: 'innovations_page',
        name: 'Innovations Page',
        type: 'Page Content',
        title: form.intro.title,
        subtitle: form.intro.subtitle,
        image: '',
        content: { hero: form.hero, cta: form.cta, items: form.items },
        visible: true,
      };
      if (recordId) await apiClient.put(`/admin/sections/${recordId}`, payload);
      else await apiClient.post('/admin/sections', payload);
      toast.success('Innovations page saved');
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="text-sm text-gray-500">Loading Innovations content...</div>;

  const fields = (group, list) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {list.map((f) => (
        <div key={f.key} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
          <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">{f.label}</label>
          {f.type === 'textarea' ? (
            <textarea rows={3} value={form[group][f.key] ?? ''} onChange={(e) => setGroup(group, f.key, e.target.value)} className="w-full p-2 border rounded-lg text-xs resize-y" />
          ) : (
            <input type="text" value={form[group][f.key] ?? ''} onChange={(e) => setGroup(group, f.key, e.target.value)} className="w-full p-2 border rounded-lg text-xs" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Innovations Page (CMS)</h1>
          <p className="text-xs text-gray-500 mt-1">Manage the What&apos;s New page content. Empty fields are hidden on the website.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark disabled:opacity-60 self-start">
          <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save Page'}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <h2 className="font-bold text-sm text-charcoal">Hero</h2>
        {fields('hero', [
          { key: 'eyebrow', label: 'Eyebrow' },
          { key: 'title', label: 'Heading' },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
        ])}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <h2 className="font-bold text-sm text-charcoal">Introduction</h2>
        {fields('intro', [
          { key: 'title', label: 'Heading' },
          { key: 'subtitle', label: 'Text', type: 'textarea' },
        ])}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-charcoal">Innovation Cards</h2>
          <button type="button" onClick={() => setForm((p) => ({ ...p, items: DEFAULTS.items }))} className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
        {form.items.map((it, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Badge</label>
                <input type="text" value={it.badge || ''} onChange={(e) => setItem(idx, 'badge', e.target.value)} className="w-full p-1.5 border rounded-lg text-xs" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Title</label>
                <input type="text" value={it.title || ''} onChange={(e) => setItem(idx, 'title', e.target.value)} className="w-full p-1.5 border rounded-lg text-xs" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Description</label>
              <textarea rows={2} value={it.desc || ''} onChange={(e) => setItem(idx, 'desc', e.target.value)} className="w-full p-1.5 border rounded-lg text-xs resize-y" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-gray-500 font-semibold block">Image (optional)</label>
                <label className={`inline-flex items-center gap-1 text-[10px] font-semibold text-primary cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
                  <Upload className="w-3 h-3" /> {uploading ? 'Uploading...' : 'Upload'}
                  <input type="file" accept="image/*" onChange={(e) => handleItemUpload(e, idx)} className="hidden" disabled={uploading} />
                </label>
              </div>
              <input type="text" value={it.image || ''} onChange={(e) => setItem(idx, 'image', e.target.value)} placeholder="/uploads/... or https://..." className="w-full p-1.5 border rounded-lg text-xs font-mono" />
              {it.image && (
                <img src={getImageUrl(it.image)} alt="Preview" className="h-16 w-24 object-cover rounded border" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
              )}
            </div>
            <button type="button" onClick={() => removeItem(idx)} className="text-gray-400 hover:text-red-500" title="Remove"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
        <button type="button" onClick={addItem} className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"><Plus className="w-3.5 h-3.5" /> Add Card</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <h2 className="font-bold text-sm text-charcoal">Bottom CTA</h2>
        {fields('cta', [
          { key: 'title', label: 'Heading' },
          { key: 'desc', label: 'Text', type: 'textarea' },
          { key: 'text', label: 'Button Text' },
          { key: 'link', label: 'Button Link' },
        ])}
      </div>
    </div>
  );
};

export default InnovationsCMS;
