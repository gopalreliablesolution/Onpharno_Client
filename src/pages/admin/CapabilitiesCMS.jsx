import React, { useState } from 'react';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { Save, Plus, Trash2, ChevronDown, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

// Each capability page is a list of "blocks". This generic editor handles them all.
const PAGES = {
  product_development: {
    label: '4A Product Development',
    description: 'From Opportunity to Market-Ready Product — 7-step approach, help list, featured capability and CTA.',
    defaults: {
      eyebrow: '4A — Product Development',
      heroTitle: 'From Opportunity to Market-Ready Product.',
      heroImage: '/images/formulation-scientists.png',
      heroCtaText: 'Explore Our Approach', heroCtaLink: '#approach',
      heroSubtitle: 'ONPHARNO works with businesses to translate product ideas, market opportunities and formulation requirements into defined healthcare products.',
      approachTitle: 'OUR DEVELOPMENT APPROACH',
      steps: [
        { num: '01', title: 'DISCOVER', desc: 'Understand your opportunity, category, Consumer and product requirements.', icon: 'fa-solid fa-magnifying-glass' },
        { num: '02', title: 'DEVELOP', desc: 'Select a relevant formulation or work towards a customized solution.', icon: 'fa-solid fa-flask' },
        { num: '03', title: 'SELECT', desc: 'Evaluate the appropriate dosage form and product configuration.', icon: 'fa-solid fa-capsules' },
        { num: '04', title: 'FINALIZE', desc: 'Align formulation, specifications, packaging and commercial requirements.', icon: 'fa-solid fa-file-check' },
        { num: '05', title: 'MANUFACTURE', desc: 'Execute production through structured, quality-focused processes.', icon: 'fa-solid fa-industry' },
        { num: '06', title: 'PACKAGE', desc: 'Create practical, compliant and market-ready packaging solutions.', icon: 'fa-solid fa-box' },
        { num: '07', title: 'DELIVER', desc: 'Support reliable supply aligned with your market requirements.', icon: 'fa-solid fa-truck' },
      ],
      helpTitle: 'WHAT WE CAN HELP WITH',
      helpItems: [
        { title: 'Product Concept', desc: '', icon: 'fa-solid fa-lightbulb' },
        { title: 'Formulation', desc: '', icon: 'fa-solid fa-flask' },
        { title: 'Dosage-Form Selection', desc: '', icon: 'fa-solid fa-capsules' },
        { title: 'Product Specifications', desc: '', icon: 'fa-solid fa-file-lines' },
        { title: 'Packaging Considerations', desc: '', icon: 'fa-solid fa-box' },
        { title: 'Manufacturing Feasibility', desc: '', icon: 'fa-solid fa-gears' },
        { title: 'Market Requirements', desc: '', icon: 'fa-solid fa-chart-line' },
      ],
      featuredTitle: 'EXPLORE LIQUID-FILLED HARD CAPSULES.',
      featuredSubtitle: 'Featured Capability',
      featuredDesc: 'A distinctive dosage-form opportunity for compatible liquid and semi-liquid formulations.',
      featuredImage: '/images/format-capsules.jpg',
      bannerImage: '/images/formulation-scientists.png',
      bannerTitle: 'Have a Product Idea?', bannerDesc: 'Let us help you define the next step.',
      featuredCtaText: 'EXPLORE →',
      featuredCtaLink: '/products/liquid-filled-hard-capsules',
      ctaText: 'START PRODUCT DEVELOPMENT →',
      ctaLink: '/contact',
    },
  },
  research_innovation: {
    label: '4B Research & Innovation',
    description: 'Where Product Thinking Meets Scientific Possibility — focus areas, featured technologies and closing CTA.',
    defaults: {
      eyebrow: '4B — Research & Innovation',
      heroTitle: 'Where Product Thinking Meets Scientific Possibility.',
      heroSubtitle: 'Healthcare products continue to evolve through new ingredients, formulations, delivery formats and consumer needs.',
      heroImage: '/images/customized-formulation.jpg',
      heroCtaText: 'Explore Our Capabilities', heroCtaLink: '#focus',
      focusTitle: 'AREAS OF FOCUS',
      focusItems: [
        { title: 'FORMULATION', desc: 'Explore formulation approaches around defined product requirements.', icon: 'fa-solid fa-flask' },
        { title: 'DOSAGE-FORM INNOVATION', desc: 'Evaluate alternative ways of delivering a product.', icon: 'fa-solid fa-capsules' },
        { title: 'PRODUCT DIFFERENTIATION', desc: 'Consider format and formulation as part of the product proposition.', icon: 'fa-solid fa-gem' },
        { title: 'MARKET RELEVANCE', desc: 'Connect product development with category and consumer requirements.', icon: 'fa-solid fa-chart-line' },
      ],
      featuredTitle: 'FEATURED TECHNOLOGIES',
      features: [
        { title: 'LIQUID-FILLED HARD CAPSULES', subtitle: 'Advanced Format', link: '/products/liquid-filled-hard-capsules', cta: 'EXPLORE →', image: '/images/transparent-capsule-step-4.png' },
        { title: 'CAPSULE-IN-CAPSULE', subtitle: 'Specialized Format', link: '/products/capsule-in-capsule', cta: 'EXPLORE →', image: '/images/capsule-step-3.png' },
      ],
      bannerTitle: 'Innovation Starts With the Right Product Question.',
      bannerImage: '/images/customized-formulation.jpg',
      ctaText: 'DISCUSS A PRODUCT CONCEPT →',
      ctaLink: '/contact',
    },
  },
  manufacturing: {
    label: '4C Manufacturing Capabilities',
    description: 'Built to Manufacture. Focused on Consistency — featured technologies, 6-step journey and CTA.',
    defaults: {
      eyebrow: '4C — Manufacturing Capabilities',
      heroTitle: 'Built to Manufacture.\nFocused on Consistency.',
      heroSubtitle: 'ONPHARNO supports the manufacturing journey across selected healthcare and nutraceutical dosage forms, with processes designed around defined product, quality and commercial requirements.',
      heroImage: '/images/manufacturing-facility.jpg',
      heroCtaText: 'Explore Our Capabilities', heroCtaLink: '/contact',
      features: [
        { title: 'LIQUID-FILLED HARD CAPSULES', subtitle: 'ONPHARNO SIGNATURE CAPABILITY', desc: 'Liquid and semi-liquid fill applications for compatible formulations.', link: '/products/liquid-filled-hard-capsules', cta: 'EXPLORE →', image: '/images/transparent-capsule-step-4.png' },
        { title: 'CAPSULE-IN-CAPSULE', subtitle: 'ADVANCED DOSAGE-FORM CAPABILITY', desc: 'Specialized capsule configurations subject to product and technical feasibility.', link: '/products/capsule-in-capsule', cta: 'EXPLORE →', image: '/images/capsule-step-3.png' },
      ],
      stepsTitle: 'MANUFACTURING JOURNEY',
      steps: [
        { num: '01', title: 'RAW MATERIAL EVALUATION', desc: 'Relevant material requirements and specifications.', icon: 'fa-solid fa-flask' },
        { num: '02', title: 'CONTROLLED DEVELOPMENT', desc: 'Structured formulation and product-development processes.', icon: 'fa-solid fa-microscope' },
        { num: '03', title: 'MANUFACTURING CONTROLS', desc: 'Defined production processes.', icon: 'fa-solid fa-gears' },
        { num: '04', title: 'IN-PROCESS CHECKS', desc: 'Appropriate checks during manufacturing.', icon: 'fa-solid fa-clipboard-check' },
        { num: '05', title: 'FINISHED PRODUCT EVALUATION', desc: 'Assessment against defined product requirements.', icon: 'fa-solid fa-check-double' },
        { num: '06', title: 'DOCUMENTATION & TRACEABILITY', desc: 'Relevant product and batch documentation.', icon: 'fa-solid fa-file-lines' },
      ],
      bannerImage: '/images/manufacturing-facility.jpg',
      bannerTitle: 'Discuss Your Manufacturing Requirements',
      ctaText: 'DISCUSS YOUR MANUFACTURING REQUIREMENTS →',
      ctaLink: '/contact',
    },
  },
  product_formats: {
    label: '4D Product Formats',
    description: 'The Right Format Can Shape the Product — featured, advanced and other formats with CTA.',
    defaults: {
      eyebrow: '4D — Product Formats',
      heroTitle: 'The Right Format\nCan Shape the Product.',
      heroSubtitle: 'Different formulations and product requirements call for different dosage forms.',
      heroImage: '/images/format-capsules.jpg',
      heroCtaText: 'Explore All Formats', heroCtaLink: '#formats',
      featuredTitle: 'LIQUID-FILLED HARD CAPSULES',
      featuredSubtitle: 'Featured Format',
      featuredDesc: 'A hard-capsule format designed for compatible liquid and semi-liquid formulations.',
      featuredImage: '/images/transparent-capsule-step-4.png',
      featuredCtaText: 'EXPLORE →',
      featuredCtaLink: '/products/liquid-filled-hard-capsules',
      advancedTitle: 'CAPSULE-IN-CAPSULE',
      advancedSubtitle: 'Advanced Format',
      advancedDesc: 'A specialized dosage-form concept for selected product configurations.',
      advancedImage: '/images/capsule-step-3.png',
      advancedCtaText: 'EXPLORE →',
      advancedCtaLink: '/products/capsule-in-capsule',
      formatsTitle: 'OTHER FORMATS',
      formats: [
        { title: 'CAPSULES', desc: 'A familiar hard-capsule dosage form for suitable dry formulations.', image: '/images/format-capsules.jpg' },
        { title: 'TABLETS', desc: 'A widely used solid dosage form across healthcare categories.', image: '/images/format-tablets.jpg' },
        { title: 'SOFTGELS', desc: 'A soft-shell format commonly used for suitable liquid or semi-liquid formulations.', image: '/images/format-softgels.jpg' },
        { title: 'EFFERVESCENT', desc: 'Designed for products intended to dissolve or disperse in liquid before consumption.', image: '/images/format-effervescent.jpg' },
        { title: 'SACHETS', desc: 'Flexible format for powders and other suitable formulations.', image: '/images/format-sachets.jpg' },
        { title: 'POWDERS', desc: 'A versatile format across nutrition and wellness applications.', image: '/images/format-powders.jpg' },
        { title: 'GUMMIES', desc: 'A consumer-oriented format for selected formulations.', image: '/images/format-gummies.jpg' },
        { title: 'LIQUIDS & SYRUPS', desc: 'Liquid delivery formats for suitable product applications.', image: '/images/format-syrups.jpg' },
        { title: 'ORAL SHOTS', desc: 'Compact liquid-format products for selected applications.', image: '/images/format-shots.jpg' },
      ],
      bannerTitle: 'Not Sure Which Format Fits?',
      bannerImage: '/images/format-capsules.jpg',
      bannerDesc: "Let's start with the product requirement.",
      ctaText: 'DISCUSS YOUR PRODUCT →',
      ctaLink: '/contact',
    },
  },
  packaging_documentation: {
    label: '4E Packaging & Documentation',
    description: 'From Finished Product to Market-Ready Product — packaging and documentation lists with CTA.',
    defaults: {
      eyebrow: '4E — Packaging & Documentation',
      heroTitle: 'From Finished Product\nto Market-Ready Product.',
      heroSubtitle: 'Packaging and documentation are part of the product journey—not an afterthought. ONPHARNO works with partners to align the finished product with defined packaging, documentation and commercial requirements.',
      heroImage: '/images/hero-bottles.png',
      heroCtaText: 'Explore Our Solutions', heroCtaLink: '#packaging',
      packagingTitle: 'PACKAGING',
      packagingItems: [
        { title: 'PRIMARY PACKAGING', desc: 'Product-contact packaging appropriate to the defined product configuration.', icon: 'fa-solid fa-box' },
        { title: 'SECONDARY PACKAGING', desc: 'Cartons, labels and other external packaging requirements.', icon: 'fa-solid fa-boxes-stacked' },
        { title: 'PRODUCT CONFIGURATION', desc: 'Pack size, count, presentation and commercial format.', icon: 'fa-solid fa-cubes' },
        { title: 'MARKET REQUIREMENTS', desc: 'Packaging and labelling considerations for the intended market.', icon: 'fa-solid fa-globe' },
      ],
      docsTitle: 'DOCUMENTATION',
      docsItems: [
        { title: 'PRODUCT DOCUMENTATION', desc: 'Defined product specifications and relevant information.', icon: 'fa-solid fa-file-lines' },
        { title: 'QUALITY DOCUMENTATION', desc: 'Applicable quality records and documentation.', icon: 'fa-solid fa-file-shield' },
        { title: 'BATCH DOCUMENTATION', desc: 'Relevant manufacturing and batch records.', icon: 'fa-solid fa-file-invoice' },
        { title: 'PACKAGING DOCUMENTATION', desc: 'Defined packaging specifications and requirements.', icon: 'fa-solid fa-file-import' },
        { title: 'MARKET DOCUMENTATION', desc: 'Documentation requirements based on the intended market.', icon: 'fa-solid fa-file-export' },
      ],
      bannerImage: '/images/packaging-development.jpg',
      bannerTitle: "Let's Build the Complete Product.",
      bannerDesc: 'Packaging, documentation and supply aligned with your requirements.',
      ctaText: 'DISCUSS YOUR REQUIREMENTS →',
      ctaLink: '/contact',
    },
  },
};

const CapabilitiesCMS = () => {
  const [data, setData] = useState(() => Object.fromEntries(Object.entries(PAGES).map(([k, v]) => [k, v.defaults])));
  const [ids, setIds] = useState({});
  const [open, setOpen] = useState(null);
  const [saved, setSaved] = useState({});
  const [uploadingKey, setUploadingKey] = useState('');

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get('/admin/sections');
        const all = res.data || [];
        const next = { ...data };
        const nextIds = {};
        for (const k of Object.keys(PAGES)) {
          const rec = all.find((s) => s.key === `cap_${k}`);
          if (rec) {
            nextIds[k] = rec._id;
            next[k] = { ...PAGES[k].defaults, ...(rec.content || {}) };
          }
        }
        setData(next);
        setIds(nextIds);
      } catch { /* keep defaults */ }
    };
    load();
  }, []);

  const setField = (page, key, value) => setData((p) => ({ ...p, [page]: { ...p[page], [key]: value } }));
  const setListItem = (page, key, idx, prop, value) => setData((p) => {
    const arr = [...(p[page][key] || [])];
    arr[idx] = { ...arr[idx], [prop]: value };
    return { ...p, [page]: { ...p[page], [key]: arr } };
  });
  const addListItem = (page, key, blank) => setData((p) => ({ ...p, [page]: { ...p[page], [key]: [...(p[page][key] || []), blank] } }));
  const removeListItem = (page, key, idx) => setData((p) => ({ ...p, [page]: { ...p[page], [key]: p[page][key].filter((_, i) => i !== idx) } }));

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append('file', file);
    const res = await apiClient.post('/admin/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res?.data?.url || res?.url || '';
  };
  const handleTopUpload = async (e, page, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const k = `${page}:${field}`;
    setUploadingKey(k);
    try {
      const url = await uploadFile(file);
      if (url) { setField(page, field, url); toast.success('Image uploaded'); }
      else toast.error('No URL returned');
    } catch (err) { toast.error(err?.message || 'Upload failed'); }
    finally { setUploadingKey(''); e.target.value = ''; }
  };
  const handleItemUpload = async (e, page, key, idx, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const k = `${page}:${key}:${idx}:${field}`;
    setUploadingKey(k);
    try {
      const url = await uploadFile(file);
      if (url) { setListItem(page, key, idx, field, url); toast.success('Image uploaded'); }
      else toast.error('No URL returned');
    } catch (err) { toast.error(err?.message || 'Upload failed'); }
    finally { setUploadingKey(''); e.target.value = ''; }
  };

  const save = async (page) => {
    setSaved((s) => ({ ...s, [page]: 'saving' }));
    try {
      const payload = {
        pageKey: 'capabilities', key: `cap_${page}`, name: `Capabilities: ${PAGES[page].label}`,
        type: 'Page Content', title: '', subtitle: '', image: '', content: data[page], visible: true,
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

  const TextField = ({ page, field, label, area }) => (
    <div className={area ? 'sm:col-span-2' : ''}>
      <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">{label}</label>
      {area ? (
        <textarea rows={2} value={data[page][field] ?? ''} onChange={(e) => setField(page, field, e.target.value)} className="w-full p-2 border rounded-lg text-xs resize-y" />
      ) : (
        <input type="text" value={data[page][field] ?? ''} onChange={(e) => setField(page, field, e.target.value)} className="w-full p-2 border rounded-lg text-xs" />
      )}
    </div>
  );

  const ImageField = ({ page, field, label }) => {
    const val = data[page][field] ?? '';
    const k = `${page}:${field}`;
    return (
      <div className="sm:col-span-2">
        <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">{label}</label>
        <div className="flex items-center gap-2">
          {val && <img src={getImageUrl(val)} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-200 bg-warm/40 shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />}
          <input type="text" value={val} onChange={(e) => setField(page, field, e.target.value)} placeholder="/images/... or https://..." className="flex-1 min-w-0 p-2 border rounded-lg text-xs" />
          <label className={`inline-flex items-center gap-1 px-2.5 py-2 rounded-lg border border-gray-200 text-[11px] font-semibold text-primary cursor-pointer shrink-0 ${uploadingKey === k ? 'opacity-50' : 'hover:border-primary'}`}>
            <Upload className="w-3.5 h-3.5" /> {uploadingKey === k ? '...' : 'Upload'}
            <input type="file" accept="image/*" onChange={(e) => handleTopUpload(e, page, field)} className="hidden" disabled={uploadingKey === k} />
          </label>
        </div>
      </div>
    );
  };

  const ListEditor = ({ page, key, label, fields, blank }) => (
    <div className="space-y-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-charcoal uppercase">{label}</span>
        <button type="button" onClick={() => addListItem(page, key, blank)} className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold"><Plus className="w-3 h-3" /> Add</button>
      </div>
      {(data[page][key] || []).map((item, idx) => (
        <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 space-y-2">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">{f.label}</label>
              {f.type === 'image' ? (
                <div className="flex items-center gap-2">
                  {item[f.key] && <img src={getImageUrl(item[f.key])} alt="" className="w-10 h-10 rounded object-cover border border-gray-200 bg-warm/40 shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />}
                  <input type="text" value={item[f.key] ?? ''} onChange={(e) => setListItem(page, key, idx, f.key, e.target.value)} placeholder="/images/... or https://..." className="flex-1 min-w-0 p-1.5 border rounded-lg text-xs" />
                  <label className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-lg border border-gray-200 text-[11px] font-semibold text-primary cursor-pointer shrink-0 ${uploadingKey === `${page}:${key}:${idx}:${f.key}` ? 'opacity-50' : 'hover:border-primary'}`}>
                    <Upload className="w-3.5 h-3.5" />
                    <input type="file" accept="image/*" onChange={(e) => handleItemUpload(e, page, key, idx, f.key)} className="hidden" disabled={uploadingKey === `${page}:${key}:${idx}:${f.key}`} />
                  </label>
                </div>
              ) : f.type === 'icon' ? (
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0 text-sm">
                    <i className={item[f.key] || 'fa-solid fa-circle'} />
                  </span>
                  <input type="text" value={item[f.key] ?? ''} onChange={(e) => setListItem(page, key, idx, f.key, e.target.value)} placeholder="fa-solid fa-flask" className="flex-1 min-w-0 p-1.5 border rounded-lg text-xs font-mono" />
                </div>
              ) : f.area ? (
                <textarea rows={2} value={item[f.key] ?? ''} onChange={(e) => setListItem(page, key, idx, f.key, e.target.value)} className="w-full p-1.5 border rounded-lg text-xs resize-y" />
              ) : (
                <input type="text" value={item[f.key] ?? ''} onChange={(e) => setListItem(page, key, idx, f.key, e.target.value)} className="w-full p-1.5 border rounded-lg text-xs" />
              )}
            </div>
          ))}
          <button type="button" onClick={() => removeListItem(page, key, idx)} className="text-gray-400 hover:text-red-500" title="Remove"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Capabilities Pages (CMS)</h1>
        <p className="text-xs text-gray-500 mt-1">4A–4E. Manage all text, steps and lists. Empty fields are hidden on site.</p>
      </div>
      {Object.entries(PAGES).map(([page, cfg]) => (
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
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextField page={page} field="eyebrow" label="Eyebrow" />
                <TextField page={page} field="heroTitle" label="Hero Heading" />
                <TextField page={page} field="heroSubtitle" label="Hero Subtitle" area />
                <ImageField page={page} field="heroImage" label="Hero Image" />
                <TextField page={page} field="heroCtaText" label="Hero Button Text" />
                <TextField page={page} field="heroCtaLink" label="Hero Button Link" />
              </div>

              {page === 'product_development' && (
                <>
                  <TextField page={page} field="approachTitle" label="Approach Heading" />
                  <ListEditor page={page} key="steps" label="7 Steps" fields={[{key:'num',label:'No.'},{key:'title',label:'Title'},{key:'desc',label:'Description',area:true},{key:'icon',label:'Font Awesome Icon',type:'icon'}]} blank={{num:'',title:'',desc:'',icon:''}} />
                  <TextField page={page} field="helpTitle" label="Help List Heading" />
                  <ListEditor page={page} key="helpItems" label="What We Can Help With" fields={[{key:'title',label:'Title'},{key:'desc',label:'Description',area:true},{key:'icon',label:'Font Awesome Icon',type:'icon'}]} blank={{title:'',desc:'',icon:''}} />
                  <TextField page={page} field="featuredTitle" label="Featured Capability Title" />
                  <TextField page={page} field="featuredSubtitle" label="Featured Subtitle" />
                  <TextField page={page} field="featuredDesc" label="Featured Description" area />
                  <ImageField page={page} field="featuredImage" label="Featured Image" />
                  <TextField page={page} field="featuredCtaText" label="Featured Button Text" />
                  <TextField page={page} field="featuredCtaLink" label="Featured Button Link" />
                  <TextField page={page} field="ctaText" label="Bottom CTA Button Text" />
                  <TextField page={page} field="ctaLink" label="Bottom CTA Button Link" />
                </>
              )}

              {page === 'research_innovation' && (
                <>
                  <TextField page={page} field="focusTitle" label="Focus Heading" />
                  <ListEditor page={page} key="focusItems" label="Areas of Focus" fields={[{key:'title',label:'Title'},{key:'desc',label:'Description',area:true},{key:'icon',label:'Font Awesome Icon',type:'icon'}]} blank={{title:'',desc:'',icon:''}} />
                  <TextField page={page} field="featuredTitle" label="Featured Technologies Heading" />
                  <ListEditor page={page} key="features" label="Featured Technologies" fields={[{key:'title',label:'Title'},{key:'subtitle',label:'Subtitle'},{key:'desc',label:'Description',area:true},{key:'image',label:'Image',type:'image'},{key:'link',label:'Link'},{key:'cta',label:'Button Text'}]} blank={{title:'',subtitle:'',desc:'',image:'',link:'',cta:''}} />
                  <TextField page={page} field="ctaText" label="CTA Button Text" />
                  <TextField page={page} field="ctaLink" label="CTA Button Link" />
                </>
              )}

              {page === 'manufacturing' && (
                <>
                  <ListEditor page={page} key="features" label="Featured Technologies" fields={[{key:'title',label:'Title'},{key:'subtitle',label:'Subtitle'},{key:'desc',label:'Description',area:true},{key:'image',label:'Image',type:'image'},{key:'link',label:'Link'},{key:'cta',label:'Button Text'}]} blank={{title:'',subtitle:'',desc:'',image:'',link:'',cta:''}} />
                  <TextField page={page} field="stepsTitle" label="Journey Heading" />
                  <ListEditor page={page} key="steps" label="Manufacturing Journey" fields={[{key:'num',label:'No.'},{key:'title',label:'Title'},{key:'desc',label:'Description',area:true},{key:'icon',label:'Font Awesome Icon',type:'icon'}]} blank={{num:'',title:'',desc:'',icon:''}} />
                  <TextField page={page} field="ctaText" label="CTA Button Text" />
                  <TextField page={page} field="ctaLink" label="CTA Button Link" />
                </>
              )}

              {page === 'product_formats' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl border">
                    <span className="text-[10px] font-bold text-charcoal uppercase sm:col-span-2">Featured & Advanced</span>
                    <TextField page={page} field="featuredTitle" label="Featured Title" />
                    <TextField page={page} field="featuredSubtitle" label="Featured Subtitle" />
                    <TextField page={page} field="featuredDesc" label="Featured Description" area />
                    <ImageField page={page} field="featuredImage" label="Featured Image" />
                    <TextField page={page} field="featuredCtaText" label="Featured Button Text" />
                    <TextField page={page} field="featuredCtaLink" label="Featured Button Link" />
                    <TextField page={page} field="advancedTitle" label="Advanced Title" />
                    <TextField page={page} field="advancedSubtitle" label="Advanced Subtitle" />
                    <TextField page={page} field="advancedDesc" label="Advanced Description" area />
                    <ImageField page={page} field="advancedImage" label="Advanced Image" />
                    <TextField page={page} field="advancedCtaText" label="Advanced Button Text" />
                    <TextField page={page} field="advancedCtaLink" label="Advanced Button Link" />
                  </div>
                  <TextField page={page} field="formatsTitle" label="Formats Heading" />
                  <ListEditor page={page} key="formats" label="Other Formats" fields={[{key:'title',label:'Title'},{key:'desc',label:'Description',area:true},{key:'image',label:'Image',type:'image'}]} blank={{title:'',desc:'',image:''}} />
                  <TextField page={page} field="ctaText" label="CTA Button Text" />
                  <TextField page={page} field="ctaLink" label="CTA Button Link" />
                </>
              )}

              {page === 'packaging_documentation' && (
                <>
                  <TextField page={page} field="packagingTitle" label="Packaging Heading" />
                  <ListEditor page={page} key="packagingItems" label="Packaging Items" fields={[{key:'title',label:'Title'},{key:'desc',label:'Description',area:true},{key:'icon',label:'Font Awesome Icon',type:'icon'}]} blank={{title:'',desc:'',icon:''}} />
                  <TextField page={page} field="docsTitle" label="Documentation Heading" />
                  <ListEditor page={page} key="docsItems" label="Documentation Items" fields={[{key:'title',label:'Title'},{key:'desc',label:'Description',area:true},{key:'icon',label:'Font Awesome Icon',type:'icon'}]} blank={{title:'',desc:'',icon:''}} />
                  <TextField page={page} field="ctaText" label="CTA Button Text" />
                  <TextField page={page} field="ctaLink" label="CTA Button Link" />
                </>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-navy/5 rounded-xl border">
                <span className="text-[10px] font-bold text-charcoal uppercase sm:col-span-2">Bottom Banner (optional)</span>
                <TextField page={page} field="bannerTitle" label="Banner Heading" />
                <TextField page={page} field="bannerDesc" label="Banner Text" area />
                <ImageField page={page} field="bannerImage" label="Banner Side Image" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CapabilitiesCMS;
