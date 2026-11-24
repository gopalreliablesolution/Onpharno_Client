import React, { useState } from 'react';
import apiClient from '../../api/client';
import DEFAULTS from '../../data/productLabelsDefaults.json';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

const GROUPS = [
  { title: 'Product Detail — Introduction', fields: [
    ['backText', 'Back link text'], ['detailBadge', 'Certification badge'], ['detailEyebrow', 'Eyebrow above product name'],
  ] },
  { title: 'Product Detail — Specs & Benefits', fields: [
    ['moqLabel', 'MOQ label'], ['moqFallback', 'MOQ fallback value'], ['regulatoryLabel', 'Regulatory label'], ['regulatoryValue', 'Regulatory value'],
    ['quoteButton', 'Quote button text'], ['benefitsTitle', 'Benefits heading'],
  ] },
  { title: 'Product Detail — Composition Table', fields: [
    ['compositionTitle', 'Table heading'], ['compositionCol1', 'Column 1 header'], ['compositionCol2', 'Column 2 header'], ['compositionCol3', 'Column 3 header'],
  ] },
  { title: 'Enquiry Form', fields: [
    ['enquiryTitle', 'Form heading'], ['enquiryProductLabel', 'Product label'], ['nameLabel', 'Name label'], ['namePlaceholder', 'Name placeholder'],
    ['emailLabel', 'Email label'], ['emailPlaceholder', 'Email placeholder'], ['phoneLabel', 'Phone label'], ['phonePlaceholder', 'Phone placeholder'],
    ['companyLabel', 'Company label'], ['companyPlaceholder', 'Company placeholder'], ['quantityLabel', 'Quantity label'], ['quantityPlaceholder', 'Quantity placeholder'],
    ['messageLabel', 'Message label'], ['messagePlaceholder', 'Message placeholder'], ['cancelText', 'Cancel button'], ['submitText', 'Submit button'],
    ['sendingText', 'Sending state'], ['successText', 'Success message'], ['successFallback', 'Fallback success message'],
  ] },
  { title: 'Catalog Page', fields: [
    ['catalogEyebrow', 'Eyebrow'], ['catalogTitle', 'Page heading'], ['catalogSubtitle', 'Subtitle'], ['searchPlaceholder', 'Search placeholder'],
    ['allCategories', 'All categories option'], ['allDosages', 'All dosages option'], ['showingFor', 'Active filters label'], ['clearFilters', 'Clear filters link'],
    ['emptyTitle', 'Empty state heading'], ['emptyText', 'Empty state text'], ['categoryFallback', 'Category fallback'], ['moqPrefix', 'MOQ prefix'],
    ['moqUnknown', 'Unknown MOQ text'], ['viewDetails', 'View details link'],
  ] },
];

const ProductLabelsCMS = () => {
  const [data, setData] = useState({ ...DEFAULTS });
  const [id, setId] = useState(null);
  const [status, setStatus] = useState('');

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get('/admin/sections');
        const rec = (res.data || []).find((s) => s.key === 'prod_detail_labels');
        if (rec) {
          setId(rec._id);
          setData({ ...DEFAULTS, ...(rec.content || {}) });
        }
      } catch { /* keep defaults */ }
    };
    load();
  }, []);

  const save = async () => {
    setStatus('saving');
    try {
      const payload = {
        pageKey: 'products', key: 'prod_detail_labels', name: 'Products: Catalog & Detail Labels',
        type: 'Page Content', title: '', subtitle: '', image: '', content: data, visible: true,
      };
      if (id) await apiClient.put(`/admin/sections/${id}`, payload);
      else {
        const res = await apiClient.post('/admin/sections', payload);
        if (res?.data?._id) setId(res.data._id);
      }
      toast.success('Saved');
      setStatus('saved');
    } catch { toast.error('Failed to save'); setStatus('error'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Product Labels (CMS)</h1>
          <p className="text-xs text-gray-500 mt-1">Text used on the catalog and product detail pages. Empty fields are hidden on site.</p>
        </div>
        <button onClick={save} disabled={status === 'saving'} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark disabled:opacity-60 shrink-0">
          <Save className="w-3.5 h-3.5" /> {status === 'saving' ? 'Saving...' : 'Save'}
        </button>
      </div>
      {GROUPS.map((g) => (
        <div key={g.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-3">
          <h2 className="text-[11px] font-bold text-charcoal uppercase tracking-wide">{g.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {g.fields.map(([key, label]) => (
              <div key={key}>
                <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">{label}</label>
                <input
                  type="text"
                  value={data[key] ?? ''}
                  onChange={(e) => setData((p) => ({ ...p, [key]: e.target.value }))}
                  className="w-full p-2 border rounded-lg text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductLabelsCMS;
