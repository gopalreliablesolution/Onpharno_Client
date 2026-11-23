import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { Save, Plus, Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const DEFAULTS = {
  global: {
    eyebrow: 'International Healthcare Alliances',
    title1: 'Building Healthcare Partnerships',
    title2: 'Beyond Borders.',
    subtitle: 'Supplying world-class formulations, certified cGMP documentation, and scalable production to healthcare leaders in 10+ countries across four continents.',
    ctaText: 'Inquire for International Distribution →',
    ctaLink: '/contact',
    image: '/images/world-map.png',
    footprintEyebrow: 'Global Footprint',
    footprintTitle: 'Export-Ready Formulations Engineered for Global Regulatory Clearances',
    footprintDesc: 'Navigating international health ministry approvals requires meticulous documentation. ONPHARNO provides brand partners with ready CTD dossier modules, accelerated stability data under climatic Zone IVb, and legalized Certificates of Analysis.',
    stat1Value: '10+', stat1Label: 'Export Destinations',
    stat2Value: '100%', stat2Label: 'WHO-GMP & ISO Compliance',
    modelsEyebrow: '',
    modelsTitle: 'Global Partnership Models',
    modelsSubtitle: 'Tailored structures for importers, brand owners, and regional distributors.',
    regionsTitle: 'Key Regional Markets Served',
    models: [
      { title: 'Market-Exclusive Distribution', desc: 'Secure territory-exclusive commercial rights to distribute ONPHARNO signature Liquid-Filled Hard Capsules and specialty formulas under your brand or our registered labels.' },
      { title: 'Export Contract Manufacturing', desc: 'Formulations customized to match country-specific dietary intake limits, permitted excipients, and language packaging mandates.' },
      { title: 'Turnkey Dossiers & Registration Support', desc: 'We prepare complete Common Technical Documents (CTD), 24-month Zone IVb stability data, GMP certificates, and analytical validation reports for swift Ministry of Health (MoH) clearances.' },
    ],
    regions: [
      { title: 'Southeast Asia (ASEAN)', desc: 'Full compliance with ASEAN Food & Supplement Harmonization guidelines and Halal documentation.' },
      { title: 'Middle East & GCC', desc: 'MoH compliant registrations, Certificate of Free Sale (CFS), and heat-stable Zone IVb packaging.' },
      { title: 'Africa & SADC', desc: 'Affordable, high-potency preventative healthcare and therapeutic vitamin combinations.' },
      { title: 'Europe & CIS', desc: 'Clean-label vegetarian formulations adhering to EFSA allowable botanical levels.' },
    ],
  },
  distribution: {
    eyebrow: 'Commercial Alliances',
    title1: 'Looking for More Than a Supplier?',
    title2: "Let's Grow Together.",
    subtitle: 'We partner with distributors, healthcare brands, retail networks, and institutional buyers to build high-margin, differentiated product lines.',
    leftTitle: 'Who We Partner With',
    leftItems: [
      'Pharmaceutical & Nutraceutical Distributors',
      'Hospital Chains & Medical Institutions',
      'Fast-Growing E-Commerce & Retail Wellness Brands',
      'International Importers & Regional Wholesalers',
      'Contract Research & Marketing Alliances',
    ],
    formTitle: 'Become an ONPHARNO Partner',
    formDesc: 'Submit your business profile to evaluate partnership feasibility.',
    businessTypes: 'Distributor / Wholesaler, Pharmacy / Hospital Network, Retail Brand / Private Label, Export Partner, Healthcare Brand Owner, International Importer',
    buttonText: 'Become an ONPHARNO Partner',
  },
};

const PartnersCMS = () => {
  const [form, setForm] = useState({ global: DEFAULTS.global, distribution: DEFAULTS.distribution });
  const [records, setRecords] = useState({ global: null, distribution: null });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState('');
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState('global');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get('/admin/sections');
        const all = res.data || [];
        const recs = { global: all.find((s) => s.key === 'partner_global'), distribution: all.find((s) => s.key === 'partner_distribution') };
        setRecords(recs);
        setForm({
          global: { ...DEFAULTS.global, ...(recs.global?.content || {}) },
          distribution: { ...DEFAULTS.distribution, ...(recs.distribution?.content || {}) },
        });
      } catch { toast.error('Failed to load partner content'); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const set = (group, key, value) => setForm((p) => ({ ...p, [group]: { ...p[group], [key]: value } }));
  const setArr = (group, key, arr) => setForm((p) => ({ ...p, [group]: { ...p[group], [key]: arr } }));
  const setArrItem = (group, key, idx, prop, value) => setForm((p) => {
    const next = [...p[group][key]];
    next[idx] = { ...next[idx], [prop]: value };
    return setArr(group, key, next);
  });

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    setUploading(true);
    try {
      const res = await apiClient.post('/admin/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      const url = res?.data?.url || res?.url;
      if (url) { set('global', 'image', url); toast.success('Image uploaded'); }
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); e.target.value = ''; }
  };

  const save = async (group) => {
    setSaving(group);
    try {
      const payload = {
        pageKey: 'partners',
        key: group === 'global' ? 'partner_global' : 'partner_distribution',
        name: group === 'global' ? 'Global Partnerships Page' : 'Distribution Partnerships Page',
        type: 'Page Content',
        title: '', subtitle: '', image: group === 'global' ? form.global.image : '',
        content: form[group], visible: true,
      };
      const rec = records[group];
      if (rec) await apiClient.put(`/admin/sections/${rec._id}`, payload);
      else await apiClient.post('/admin/sections', payload);
      toast.success('Saved');
    } catch { toast.error('Failed to save'); }
    finally { setSaving(''); }
  };

  if (loading) return <div className="text-sm text-gray-500">Loading partner content...</div>;

  const g = form[group];
  const field = (key, label, type = 'text') => (
    <div key={key} className={type === 'textarea' ? 'sm:col-span-2' : ''}>
      <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">{label}</label>
      {type === 'textarea' ? (
        <textarea rows={3} value={g[key] ?? ''} onChange={(e) => set(group, key, e.target.value)} className="w-full p-2 border rounded-lg text-xs resize-y" />
      ) : (
        <input type="text" value={g[key] ?? ''} onChange={(e) => set(group, key, e.target.value)} className="w-full p-2 border rounded-lg text-xs" />
      )}
    </div>
  );
  const itemEditor = (key, label, fields) => (
    <div className="space-y-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-charcoal uppercase">{label}</span>
        <button type="button" onClick={() => setArr(group, key, [...g[key], fields.reduce((o, f) => ({ ...o, [f.key]: '' }), {})])} className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold"><Plus className="w-3 h-3" /> Add</button>
      </div>
      {(g[key] || []).map((item, idx) => (
        <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 space-y-2">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea rows={2} value={item[f.key] ?? ''} onChange={(e) => setArrItem(group, key, idx, f.key, e.target.value)} className="w-full p-1.5 border rounded-lg text-xs resize-y" />
              ) : (
                <input type="text" value={item[f.key] ?? ''} onChange={(e) => setArrItem(group, key, idx, f.key, e.target.value)} className="w-full p-1.5 border rounded-lg text-xs" />
              )}
            </div>
          ))}
          <button type="button" onClick={() => setArr(group, key, g[key].filter((_, i) => i !== idx))} className="text-gray-400 hover:text-red-500" title="Remove"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Partner Pages (CMS)</h1>
          <p className="text-xs text-gray-500 mt-1">Manage Global Partnerships and Distribution Partnerships. Empty fields are hidden on the site.</p>
        </div>
        <button onClick={() => save(group)} disabled={saving === group} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark disabled:opacity-60 self-start">
          <Save className="w-3.5 h-3.5" /> {saving === group ? 'Saving...' : 'Save Page'}
        </button>
      </div>

      <div className="flex gap-2 border-b pb-2">
        {[['global', 'Global Partnerships'], ['distribution', 'Distribution Partnerships']].map(([k, label]) => (
          <button key={k} type="button" onClick={() => setTab(k)} className={`px-4 py-2 text-xs font-semibold rounded-lg ${tab === k ? 'bg-primary text-white' : 'bg-warm text-gray-600'}`}>{label}</button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <h2 className="font-bold text-sm text-charcoal">Hero</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {field('eyebrow', 'Eyebrow')}
          {field('title1', 'Heading Line 1')}
          {field('title2', 'Heading Line 2')}
          {field('subtitle', 'Paragraph', 'textarea')}
        </div>
        {group === 'global' && (
          <div className="space-y-2 p-3 bg-warm/40 rounded-xl border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">World Map Image</span>
              <label className={`inline-flex items-center gap-1 text-xs font-semibold text-primary cursor-pointer ${uploading ? 'opacity-50' : ''}`}><Upload className="w-3.5 h-3.5" /> Upload<input type="file" accept="image/*" onChange={uploadImage} className="hidden" disabled={uploading} /></label>
            </div>
            <input type="text" value={g.image || ''} onChange={(e) => set(group, 'image', e.target.value)} className="w-full p-2 border rounded-lg text-xs font-mono" />
            {g.image && <img src={getImageUrl(g.image)} alt="Preview" className="h-20 w-32 object-contain rounded border" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />}
          </div>
        )}
        {group === 'global' && field('ctaText', 'Hero Button Text')}
        {group === 'global' && field('ctaLink', 'Hero Button Link')}
      </div>

      {group === 'global' ? (
        <>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <h2 className="font-bold text-sm text-charcoal">Global Footprint</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {field('footprintEyebrow', 'Eyebrow')}{field('footprintTitle', 'Heading')}
              {field('footprintDesc', 'Text', 'textarea')}
              {field('stat1Value', 'Stat 1 Value')}{field('stat1Label', 'Stat 1 Label')}
              {field('stat2Value', 'Stat 2 Value')}{field('stat2Label', 'Stat 2 Label')}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <h2 className="font-bold text-sm text-charcoal">Partnership Models</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{field('modelsTitle', 'Heading')}{field('modelsSubtitle', 'Subtitle', 'textarea')}</div>
            {itemEditor('models', 'Models', [{ key: 'title', label: 'Title' }, { key: 'desc', label: 'Description', type: 'textarea' }])}
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <h2 className="font-bold text-sm text-charcoal">Regions</h2>
            {field('regionsTitle', 'Heading')}
            {itemEditor('regions', 'Regions', [{ key: 'title', label: 'Region' }, { key: 'desc', label: 'Description', type: 'textarea' }])}
          </div>
        </>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <h2 className="font-bold text-sm text-charcoal">Who We Partner With</h2>
            {field('leftTitle', 'Heading')}
            <div>
              <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">List items (one per line)</label>
              <textarea rows={6} value={(g.leftItems || []).join('\n')} onChange={(e) => set(group, 'leftItems', e.target.value.split('\n').map((x) => x.trim()).filter(Boolean))} className="w-full p-2 border rounded-lg text-xs resize-y" />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <h2 className="font-bold text-sm text-charcoal">Partner Form</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {field('formTitle', 'Heading')}{field('formDesc', 'Description', 'textarea')}
              {field('businessTypes', 'Business Types (comma separated)', 'textarea')}
              {field('buttonText', 'Button Text')}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PartnersCMS;
