import React, { useState } from 'react';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import DEFAULTS from '../../data/productPageDefaults.json';
import { Save, Plus, Trash2, ChevronDown, Upload, ArrowUp, ArrowDown, Layers } from 'lucide-react';
import toast from 'react-hot-toast';

const PAGES = {
  liquid_filled: { label: '3A Liquid-Filled Capsule Manufacturing', description: 'Featured section, development flow, fill possibilities, comparison, why ONPHARNO, applications and FAQ.' },
  beverages: { label: '3B Beverages Manufacturing', description: 'Empty framework — add blocks and fill everything from admin. Nothing shows on site until you do.' },
  capsule_in_capsule: { label: '3B Capsule-in-Capsule Manufacturing', description: 'Two-component format, how-it-works flow, why consider and shared project CTA.' },
  pellets_in_capsule: { label: '3B Pellets-in-Capsule Manufacturing', description: 'Format flow, why consider, comparison table and shared project CTA.' },
  by_health_category: { label: '3C By Health Category', description: 'Category landing with the 12 doc categories, images and catalog links.' },
  by_dosage_form: { label: '3D By Dosage Form', description: 'Dosage-form landing with the 9 doc formats, images and catalog links.' },
};

const COMMON = [
  { key: 'eyebrow', label: 'Eyebrow' },
  { key: 'title', label: 'Heading' },
  { key: 'subtitle', label: 'Subtitle', area: true },
  { key: 'anchor', label: 'Section ID (for #links)' },
];

const BLOCK_TYPES = {
  hero: {
    label: 'Hero',
    fields: [...COMMON, { key: 'image', label: 'Hero Image', type: 'image' }, { key: 'ctaText', label: 'Button Text' }, { key: 'ctaLink', label: 'Button Link' }],
  },
  text: {
    label: 'Text Block',
    fields: [...COMMON, { key: 'body', label: 'Body', area: true }],
  },
  iconGrid: {
    label: 'Icon Cards',
    fields: [...COMMON, { key: 'cols', label: 'Columns (2–5)', type: 'number' }],
    items: { key: 'items', label: 'Cards', blank: { num: '', icon: '', title: '', desc: '' }, fields: [
      { key: 'num', label: 'Number' }, { key: 'icon', label: 'Font Awesome Icon', type: 'icon' }, { key: 'title', label: 'Title' }, { key: 'desc', label: 'Description', area: true },
    ] },
  },
  steps: {
    label: 'Steps / Flow',
    fields: [...COMMON,
      { key: 'variant', label: 'Style', type: 'select', options: [{ value: 'grid', label: 'Grid' }, { value: 'flow', label: 'Flow with images' }] },
      { key: 'cols', label: 'Columns (2–5)', type: 'number' },
    ],
    items: { key: 'items', label: 'Steps', blank: { num: '', icon: '', image: '', title: '', desc: '' }, fields: [
      { key: 'num', label: 'Number' }, { key: 'icon', label: 'Font Awesome Icon', type: 'icon' }, { key: 'image', label: 'Image', type: 'image' }, { key: 'title', label: 'Title' }, { key: 'desc', label: 'Description', area: true },
    ] },
  },
  imageCards: {
    label: 'Image Cards',
    fields: [...COMMON, { key: 'cols', label: 'Columns (2–5)', type: 'number' }, { key: 'dark', label: 'Dark cards', type: 'checkbox' }],
    items: { key: 'items', label: 'Cards', blank: { image: '', icon: '', subtitle: '', title: '', desc: '', cta: '', link: '' }, fields: [
      { key: 'image', label: 'Image', type: 'image' }, { key: 'icon', label: 'Font Awesome Icon', type: 'icon' }, { key: 'subtitle', label: 'Small label' }, { key: 'title', label: 'Title' }, { key: 'desc', label: 'Description', area: true }, { key: 'cta', label: 'Button Text' }, { key: 'link', label: 'Button Link' },
    ] },
  },
  comparison: {
    label: 'Comparison Table',
    fields: [...COMMON,
      { key: 'labelHeader', label: 'Column 1 Header' }, { key: 'leftLabel', label: 'Column 2 Header' }, { key: 'rightLabel', label: 'Column 3 Header' },
    ],
    items: { key: 'rows', label: 'Rows', blank: { label: '', left: '', right: '' }, fields: [
      { key: 'label', label: 'Column 1' }, { key: 'left', label: 'Column 2', area: true }, { key: 'right', label: 'Column 3', area: true },
    ] },
  },
  faq: {
    label: 'FAQ',
    fields: COMMON,
    items: { key: 'items', label: 'Questions', blank: { q: '', a: '' }, fields: [
      { key: 'q', label: 'Question' }, { key: 'a', label: 'Answer', area: true },
    ] },
  },
  ctaBanner: {
    label: 'CTA Banner',
    fields: [
      { key: 'title', label: 'Heading' }, { key: 'subtitle', label: 'Text', area: true }, { key: 'image', label: 'Side Image', type: 'image' }, { key: 'ctaText', label: 'Button Text' }, { key: 'ctaLink', label: 'Button Link' },
    ],
  },
};

const clone = (o) => JSON.parse(JSON.stringify(o));

const ProductsCMS = ({ pages = PAGES, defaults = DEFAULTS, pageKey = 'products', heading = 'Products Pages (CMS)', subheading = '3A–3D plus capsule technology pages. Add/reorder blocks; empty fields are hidden on site.' }) => {
  const [data, setData] = useState(() => Object.fromEntries(Object.entries(pages).map(([k]) => [k, clone(defaults[k])])));
  const [ids, setIds] = useState({});
  const [open, setOpen] = useState(null);
  const [saved, setSaved] = useState({});
  const [uploadingKey, setUploadingKey] = useState('');
  const [newType, setNewType] = useState({});

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get('/admin/sections');
        const all = res.data || [];
        const next = { ...data };
        const nextIds = {};
        for (const k of Object.keys(pages)) {
          const rec = all.find((s) => s.key === `${pageKey}_${k}`);
          if (rec) {
            nextIds[k] = rec._id;
            next[k] = { blocks: rec.content?.blocks || clone(defaults[k].blocks) };
          }
        }
        setData(next);
        setIds(nextIds);
      } catch { /* keep defaults */ }
    };
    load();
  }, []);

  const setBlocks = (page, blocks) => setData((p) => ({ ...p, [page]: { ...p[page], blocks } }));
  const setBlockField = (page, bi, key, value) => setData((p) => {
    const blocks = [...(p[page].blocks || [])];
    blocks[bi] = { ...blocks[bi], [key]: value };
    return { ...p, [page]: { ...p[page], blocks } };
  });
  const setItemField = (page, bi, arrKey, ii, key, value) => setData((p) => {
    const blocks = [...(p[page].blocks || [])];
    const list = [...(blocks[bi][arrKey] || [])];
    list[ii] = { ...list[ii], [key]: value };
    blocks[bi] = { ...blocks[bi], [arrKey]: list };
    return { ...p, [page]: { ...p[page], blocks } };
  });
  const addBlock = (page) => {
    const type = newType[page] || 'text';
    setBlocks(page, [...(data[page].blocks || []), { type, ...clone(BLOCK_TYPES[type].fields.reduce((o, f) => ({ ...o, [f.key]: f.type === 'checkbox' ? false : '' }), {})) }]);
    setNewType((n) => ({ ...n, [page]: '' }));
  };
  const removeBlock = (page, bi) => setBlocks(page, data[page].blocks.filter((_, i) => i !== bi));
  const moveBlock = (page, bi, dir) => setData((p) => {
    const blocks = [...(p[page].blocks || [])];
    const j = bi + dir;
    if (j < 0 || j >= blocks.length) return p;
    [blocks[bi], blocks[j]] = [blocks[j], blocks[bi]];
    return { ...p, [page]: { ...p[page], blocks } };
  });

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await apiClient.post('/admin/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res?.data?.url || res?.url || '';
  };
  const handleUpload = async (e, page, bi, arrKey, ii, f, k) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingKey(k);
    try {
      const url = await uploadFile(file);
      if (url) {
        if (arrKey) setItemField(page, bi, arrKey, ii, f.key, url);
        else setBlockField(page, bi, f.key, url);
        toast.success('Image uploaded');
      } else toast.error('No URL returned');
    } catch (err) { toast.error(err?.message || 'Upload failed'); }
    finally { setUploadingKey(''); e.target.value = ''; }
  };

  const save = async (page) => {
    setSaved((s) => ({ ...s, [page]: 'saving' }));
    try {
      const blocks = data[page].blocks || [];
      const payload = {
        pageKey, key: `${pageKey}_${page}`, name: `${heading.replace(' (CMS)', '')}: ${pages[page].label}`,
        type: 'Page Content', title: '', subtitle: '', image: '', content: { blocks }, visible: true,
      };
      if (ids[page]) await apiClient.put(`/admin/sections/${ids[page]}`, payload);
      else {
        const res = await apiClient.post('/admin/sections', payload);
        if (res?.data?._id) setIds((i) => ({ ...i, [page]: res.data._id }));
      }
      toast.success('Saved');
      setSaved((s) => ({ ...s, [page]: 'saved' }));
    } catch { toast.error('Failed to save'); setSaved((s) => ({ ...s, [page]: 'error' })); }
  };

  const Field = ({ f, value, onChange, uploadProps }) => {
    const uploading = uploadProps && uploadingKey === uploadProps.k;
    if (f.type === 'checkbox') {
      return (
        <label className="flex items-center gap-2 text-[11px] text-gray-600 cursor-pointer pt-1">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="rounded border-gray-300 text-primary" /> {f.label}
        </label>
      );
    }
    return (
      <div className={f.area ? 'sm:col-span-2' : ''}>
        <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">{f.label}</label>
        {f.type === 'select' ? (
          <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="w-full p-2 border rounded-lg text-xs">
            {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        ) : f.type === 'number' ? (
          <input type="number" min="1" max="5" value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="w-full p-2 border rounded-lg text-xs" />
        ) : f.type === 'image' ? (
          <div className="flex items-center gap-2">
            {value && <img src={getImageUrl(value)} alt="" className="w-11 h-11 rounded-lg object-cover border border-gray-200 bg-warm/40 shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />}
            <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="/images/... or https://..." className="flex-1 min-w-0 p-2 border rounded-lg text-xs" />
            <label className={`inline-flex items-center gap-1 px-2.5 py-2 rounded-lg border border-gray-200 text-[11px] font-semibold text-primary cursor-pointer shrink-0 ${uploading ? 'opacity-50' : 'hover:border-primary'}`}>
              <Upload className="w-3.5 h-3.5" /> {uploading ? '...' : 'Upload'}
              <input type="file" accept="image/*" onChange={(e) => handleUpload(e, uploadProps.page, uploadProps.bi, uploadProps.arrKey, uploadProps.ii, f, uploadProps.k)} className="hidden" disabled={uploading} />
            </label>
          </div>
        ) : f.type === 'icon' ? (
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0"><i className={value || 'fa-solid fa-circle'} /></span>
            <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="fa-solid fa-flask" className="flex-1 min-w-0 p-2 border rounded-lg text-xs font-mono" />
          </div>
        ) : f.area ? (
          <textarea rows={2} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="w-full p-2 border rounded-lg text-xs resize-y" />
        ) : (
          <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="w-full p-2 border rounded-lg text-xs" />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">{heading}</h1>
        <p className="text-xs text-gray-500 mt-1">{subheading}</p>
      </div>

      {Object.entries(pages).map(([page, cfg]) => {
        const blocks = data[page].blocks || [];
        return (
          <div key={page} className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between gap-3 p-5 border-b">
              <button type="button" onClick={() => setOpen(open === page ? null : page)} className="flex items-center gap-2 text-left flex-1">
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open === page ? 'rotate-180' : ''}`} />
                <div>
                  <h2 className="font-bold text-sm text-charcoal">{cfg.label}</h2>
                  <p className="text-[11px] text-gray-400">{cfg.description}</p>
                </div>
              </button>
              <button onClick={() => save(page)} disabled={saved[page] === 'saving'} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark disabled:opacity-60 shrink-0">
                <Save className="w-3.5 h-3.5" /> {saved[page] === 'saving' ? 'Saving...' : 'Save'}
              </button>
            </div>

            {open === page && (
              <div className="p-5 space-y-3">
                {blocks.length === 0 && (
                  <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-xs text-gray-500">
                    No blocks yet — this page is empty on the site. Add a block below to start.
                  </div>
                )}

                {blocks.map((block, bi) => {
                  const def = BLOCK_TYPES[block.type] || { label: block.type, fields: [] };
                  return (
                    <div key={bi} className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-charcoal uppercase bg-white border border-gray-200 rounded-lg px-2 py-1">
                          <Layers className="w-3 h-3 text-primary" /> {bi + 1}. {def.label}
                        </span>
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={() => moveBlock(page, bi, -1)} title="Move up" className="p-1.5 text-gray-400 hover:text-primary"><ArrowUp className="w-3.5 h-3.5" /></button>
                          <button type="button" onClick={() => moveBlock(page, bi, 1)} title="Move down" className="p-1.5 text-gray-400 hover:text-primary"><ArrowDown className="w-3.5 h-3.5" /></button>
                          <button type="button" onClick={() => removeBlock(page, bi)} title="Remove block" className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {def.fields.map((f) => (
                          <Field key={f.key} f={f} value={block[f.key]} onChange={(v) => setBlockField(page, bi, f.key, v)} uploadProps={{ page, bi, arrKey: null, ii: null, k: `${page}:${bi}:${f.key}` }} />
                        ))}
                      </div>

                      {def.items && (
                        <div className="space-y-2 p-3 bg-white rounded-xl border border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-charcoal uppercase">{def.items.label} ({block[def.items.key]?.length || 0})</span>
                            <button type="button" onClick={() => setBlocks(page, blocks.map((b, i) => i === bi ? { ...b, [def.items.key]: [...(b[def.items.key] || []), { ...clone(def.items.blank) }] } : b))} className="inline-flex items-center gap-1 text-[11px] text-primary font-semibold hover:underline">
                              <Plus className="w-3 h-3" /> Add
                            </button>
                          </div>
                          {(block[def.items.key] || []).map((it, ii) => (
                            <div key={ii} className="p-3 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-semibold text-gray-400">#{ii + 1}</span>
                                <button type="button" onClick={() => setBlocks(page, blocks.map((b, i) => i === bi ? { ...b, [def.items.key]: b[def.items.key].filter((_, j) => j !== ii) } : b))} className="text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {def.items.fields.map((f) => (
                                  <Field key={f.key} f={f} value={it[f.key]} onChange={(v) => setItemField(page, bi, def.items.key, ii, f.key, v)} uploadProps={{ page, bi, arrKey: def.items.key, ii, k: `${page}:${bi}:${def.items.key}:${ii}:${f.key}` }} />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="flex items-center gap-2 pt-2">
                  <select value={newType[page] || ''} onChange={(e) => setNewType((n) => ({ ...n, [page]: e.target.value }))} className="p-2 border rounded-lg text-xs bg-white">
                    <option value="">Choose block type…</option>
                    {Object.entries(BLOCK_TYPES).map(([t, def]) => <option key={t} value={t}>{def.label}</option>)}
                  </select>
                  <button type="button" onClick={() => addBlock(page)} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark">
                    <Plus className="w-3.5 h-3.5" /> Add Block
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductsCMS;
