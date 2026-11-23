import React, { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

const ResourcePageText = ({ sectionKey, defaults, title }) => {
  const [form, setForm] = useState({ eyebrow: '', title: '', subtitle: '' });
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get('/admin/sections');
        const rec = (res.data || []).find((s) => s.key === sectionKey);
        if (rec) {
          setRecordId(rec._id);
          setForm({
            eyebrow: (rec.content?.eyebrow ?? '').toString(),
            title: (rec.title ?? '').toString(),
            subtitle: (rec.subtitle ?? '').toString(),
          });
        } else {
          setForm(defaults);
        }
      } catch {
        setForm(defaults);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sectionKey]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        pageKey: 'resources',
        key: sectionKey,
        name: title,
        type: 'Page Text',
        title: form.title,
        subtitle: form.subtitle,
        image: '',
        content: { ...(form.content || {}), eyebrow: form.eyebrow },
        visible: true,
      };
      if (recordId) await apiClient.put(`/admin/sections/${recordId}`, payload);
      else await apiClient.post('/admin/sections', payload);
      toast.success('Page heading saved');
    } catch {
      toast.error('Failed to save page heading');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-sm text-charcoal">{title} — Page Heading</h2>
          <p className="text-[11px] text-gray-500 mt-0.5">Shown at the top of the public page.</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark disabled:opacity-60"
        >
          <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save Heading'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Eyebrow</label>
          <input type="text" value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} className="w-full p-2 border rounded-lg text-xs" />
        </div>
        <div>
          <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Heading</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2 border rounded-lg text-xs" />
        </div>
        <div>
          <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Subtitle</label>
          <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full p-2 border rounded-lg text-xs" />
        </div>
      </div>
    </div>
  );
};

export default ResourcePageText;
