import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import Portal from '../../components/common/Portal';
import ResourcePageText from './ResourcePageText';
import { Video, Image as ImageIcon, Plus, Trash2, Edit2, Upload, X, Eye, EyeOff, Link2, FileVideo } from 'lucide-react';
import toast from 'react-hot-toast';

const initialState = {
  title: '',
  description: '',
  mediaType: 'video',
  videoSource: 'link',
  videoUrl: '',
  videoFile: '',
  thumbnail: '',
  order: 1,
  active: true,
};

const youtubeThumb = (url) => {
  try {
    const u = new URL(url);
    let id = '';
    if (u.hostname.includes('youtube.com')) id = u.searchParams.get('v') || '';
    else if (u.hostname.includes('youtu.be')) id = u.pathname.slice(1);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
  } catch { return ''; }
};

const VideosAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [uploading, setUploading] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/videos');
      if (res.success && res.data) setVideos([...res.data].sort((a, b) => (a.order || 0) - (b.order || 0)));
    } catch { toast.error('Failed to load videos'); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchVideos(); }, []);

  const set = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const openCreate = () => {
    setEditingId(null);
    setFormData({ ...initialState, order: videos.length + 1 });
    setIsModalOpen(true);
  };
  const openEdit = (v) => {
    setEditingId(v._id);
    setFormData({
      title: v.title || '',
      description: v.description || '',
      mediaType: v.mediaType || (v.videoFile ? 'video' : 'video'),
      videoSource: v.videoFile && !v.videoUrl ? 'upload' : 'link',
      videoUrl: v.videoUrl || '',
      videoFile: v.videoFile || '',
      thumbnail: v.thumbnail || '',
      order: v.order || 1,
      active: v.active !== false,
    });
    setIsModalOpen(true);
  };

  const uploadFile = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    setUploading(field);
    try {
      const res = await apiClient.post('/admin/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      const url = res?.data?.url || res?.url;
      if (url) { set(field, url); toast.success('Uploaded'); }
      else toast.error('No URL returned');
    } catch (err) { toast.error(err?.message || 'Upload failed'); }
    finally { setUploading(''); e.target.value = ''; }
  };

  const autoThumb = () => {
    const t = youtubeThumb(formData.videoUrl);
    if (t) { set('thumbnail', t); toast.success('Thumbnail captured from YouTube'); }
    else toast.error('Auto-capture works with YouTube links. Upload a thumbnail instead.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) { toast.error('Title is required'); return; }
    if (formData.mediaType === 'video' && !formData.videoUrl && !formData.videoFile) {
      toast.error('Add a video link or upload a video file'); return;
    }
    if (formData.mediaType === 'image' && !formData.thumbnail) {
      toast.error('Add an image'); return;
    }
    setSaving(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        mediaType: formData.mediaType,
        videoUrl: formData.mediaType === 'video' && formData.videoSource === 'link' ? formData.videoUrl : '',
        videoFile: formData.mediaType === 'video' && formData.videoSource === 'upload' ? formData.videoFile : '',
        thumbnail: formData.thumbnail,
        order: Number(formData.order) || 0,
        active: !!formData.active,
      };
      if (editingId) await apiClient.put(`/admin/videos/${editingId}`, payload);
      else await apiClient.post('/admin/videos', payload);
      toast.success(editingId ? 'Updated' : 'Added');
      setIsModalOpen(false);
      fetchVideos();
    } catch (err) { toast.error(err?.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try { await apiClient.delete(`/admin/videos/${id}`); toast.success('Deleted'); fetchVideos(); }
    catch { toast.error('Failed to delete'); }
  };
  const toggleActive = async (v) => {
    try { await apiClient.put(`/admin/videos/${v._id}`, { active: v.active === false }); fetchVideos(); }
    catch { toast.error('Failed to update visibility'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Video Library CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Add an image OR a video. Videos can be a pasted link (YouTube/social) or an uploaded MP4, with auto or uploaded thumbnail.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-primary-dark self-start">
          <Plus className="w-4 h-4" /> Add Media
        </button>
      </div>

      <ResourcePageText
        sectionKey="resources_videos"
        title="Videos Page"
        defaults={{ eyebrow: 'Media & Tours', title: 'Video Library', subtitle: 'Take a virtual tour of our high-speed manufacturing lines and R&D cleanrooms.' }}
      />

      {loading ? <div className="text-sm text-gray-500">Loading...</div> : videos.length === 0 ? (
        <div className="bg-white p-10 text-center rounded-2xl border border-gray-200 text-sm text-gray-500">No media yet. Click "Add Media".</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {videos.map((v) => {
            const isImage = (v.mediaType || 'video') === 'image';
            const thumb = v.thumbnail || youtubeThumb(v.videoUrl || '');
            return (
              <div key={v._id} className="bg-white rounded-2xl border border-gray-200 p-4 flex gap-4">
                <div className="w-28 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                  {thumb ? (
                    <img src={getImageUrl(thumb)} alt={v.title} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                  ) : isImage ? <ImageIcon className="w-6 h-6 text-gray-400" /> : <Video className="w-6 h-6 text-gray-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-charcoal truncate">{v.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-warm text-gray-600 uppercase">{v.mediaType || 'video'}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.active !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{v.active !== false ? 'Visible' : 'Hidden'}</span>
                  </div>
                  {v.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{v.description}</p>}
                  {(v.videoUrl || v.videoFile) && <p className="text-[10px] text-primary font-mono truncate mt-1">{v.videoUrl || v.videoFile}</p>}
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => openEdit(v)} className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-50" title="Edit"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => toggleActive(v)} className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-50" title="Toggle visibility">{v.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}</button>
                    <button onClick={() => handleDelete(v._id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isModalOpen && (
        <Portal>
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2">
              <h3 className="font-bold text-lg text-charcoal">{editingId ? 'Edit Media' : 'Add Media'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-charcoal"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Title *</label>
                <input type="text" value={formData.title} onChange={(e) => set('title', e.target.value)} className="w-full p-2.5 border rounded-xl text-xs" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Description</label>
                <textarea rows={3} value={formData.description} onChange={(e) => set('description', e.target.value)} className="w-full p-2.5 border rounded-xl text-xs resize-y" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => set('mediaType', 'image')} className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold ${formData.mediaType === 'image' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 text-gray-500'}`}>
                  <ImageIcon className="w-4 h-4" /> Image only
                </button>
                <button type="button" onClick={() => set('mediaType', 'video')} className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold ${formData.mediaType === 'video' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 text-gray-500'}`}>
                  <Video className="w-4 h-4" /> Video
                </button>
              </div>

              {formData.mediaType === 'image' ? (
                <div className="space-y-2 p-3 bg-warm/40 rounded-xl border border-gray-200">
                  <span className="text-xs font-semibold text-gray-700">Image</span>
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-primary cursor-pointer">
                    <Upload className="w-3.5 h-3.5" /> {uploading === 'thumbnail' ? 'Uploading...' : 'Upload image'}
                    <input type="file" accept="image/*" onChange={(e) => uploadFile(e, 'thumbnail')} className="hidden" disabled={!!uploading} />
                  </label>
                  <input type="text" value={formData.thumbnail} onChange={(e) => set('thumbnail', e.target.value)} placeholder="/uploads/... or https://..." className="w-full p-2 border rounded-lg text-xs font-mono" />
                  {formData.thumbnail && <img src={getImageUrl(formData.thumbnail)} alt="Preview" className="h-28 w-full object-contain rounded border" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => set('videoSource', 'link')} className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold ${formData.videoSource === 'link' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 text-gray-500'}`}><Link2 className="w-4 h-4" /> Paste link</button>
                    <button type="button" onClick={() => set('videoSource', 'upload')} className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold ${formData.videoSource === 'upload' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 text-gray-500'}`}><FileVideo className="w-4 h-4" /> Upload MP4</button>
                  </div>
                  {formData.videoSource === 'link' ? (
                    <div className="space-y-2">
                      <input type="text" value={formData.videoUrl} onChange={(e) => set('videoUrl', e.target.value)} placeholder="https://youtube.com/watch?v=... or any video link" className="w-full p-2 border rounded-lg text-xs font-mono" />
                      <button type="button" onClick={autoThumb} className="text-xs font-semibold text-primary hover:underline">Auto-capture thumbnail from YouTube link</button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-primary cursor-pointer">
                        <Upload className="w-3.5 h-3.5" /> {uploading === 'videoFile' ? 'Uploading...' : 'Upload MP4 (max 50MB)'}
                        <input type="file" accept="video/mp4,.mp4" onChange={(e) => uploadFile(e, 'videoFile')} className="hidden" disabled={!!uploading} />
                      </label>
                      <input type="text" value={formData.videoFile} readOnly placeholder="Uploaded video URL appears here" className="w-full p-2 border rounded-lg text-xs font-mono" />
                    </div>
                  )}
                  <div className="space-y-2 p-3 bg-warm/40 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700">Thumbnail (auto or upload)</span>
                      <label className="inline-flex items-center gap-1 text-xs font-semibold text-primary cursor-pointer">
                        <Upload className="w-3.5 h-3.5" /> Upload
                        <input type="file" accept="image/*" onChange={(e) => uploadFile(e, 'thumbnail')} className="hidden" disabled={!!uploading} />
                      </label>
                    </div>
                    <input type="text" value={formData.thumbnail} onChange={(e) => set('thumbnail', e.target.value)} placeholder="Thumbnail URL (optional)" className="w-full p-2 border rounded-lg text-xs font-mono" />
                    {formData.thumbnail && <img src={getImageUrl(formData.thumbnail)} alt="Thumbnail" className="h-24 w-full object-cover rounded border" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />}
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Order</label>
                  <input type="number" value={formData.order} onChange={(e) => set('order', e.target.value)} className="w-full p-2.5 border rounded-xl text-xs" />
                </div>
                <div className="flex items-end">
                  <label className="text-xs text-gray-600 flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!formData.active} onChange={(e) => set('active', e.target.checked)} className="w-4 h-4 text-primary rounded" />
                    Visible on website
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" disabled={saving} className="px-5 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl shadow disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
        </Portal>
      )}
    </div>
  );
};

export default VideosAdmin;
