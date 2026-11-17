import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { getImageUrl, handleImageError } from '../../utils/imageUrl';
import {
  Upload,
  Copy,
  Check,
  Trash2,
  Image as ImageIcon,
  FileText,
  Search,
  ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

const MediaAdmin = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [search, setSearch] = useState('');

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/media');
      if (res.success && res.data) {
        setMediaList(res.data);
      }
    } catch {
      // Fallback local known assets
      setMediaList([
        { _id: '1', filename: 'hero-bottles.png', url: '/uploads/hero-bottles.png', originalName: 'hero-bottles.png', size: 245000 },
        { _id: '2', filename: 'manufacturing-facility.jpg', url: '/uploads/facilities/manufacturing-facility.jpg', originalName: 'manufacturing-facility.jpg', size: 512000 },
        { _id: '3', filename: 'packaging-line.jpg', url: '/uploads/facilities/packaging-line.jpg', originalName: 'packaging-line.jpg', size: 480000 },
        { _id: '4', filename: 'multivitamin-gummies.jpg', url: '/uploads/products/multivitamin-gummies.jpg', originalName: 'multivitamin-gummies.jpg', size: 198000 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);
      try {
        await apiClient.post('/admin/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        successCount++;
      } catch {
        toast.error(`Failed to upload ${files[i].name}`);
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} file(s) uploaded successfully!`);
      fetchMedia();
    }
    setUploading(false);
  };

  const copyUrl = (item) => {
    const fullUrl = item.url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(item._id);
    toast.success('File URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/admin/media/${id}`);
      toast.success('Media record removed');
      setMediaList(prev => prev.filter(m => m._id !== id));
    } catch {
      toast.error('Failed to delete media');
    }
  };

  const filteredMedia = mediaList.filter(m =>
    (m.originalName || m.filename || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Media & Asset Library</h1>
          <p className="text-xs text-gray-500 mt-1">Upload and manage local images, product packshots, cleanroom photography, and technical PDFs.</p>
        </div>
        <label className="cursor-pointer inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md hover:bg-primary-dark transition-all self-start sm:self-auto">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Media Files'}</span>
          <input
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* Drag & Drop Hero Box */}
      <div className="border-2 border-dashed border-gray-200 hover:border-primary/50 transition-colors rounded-2xl p-8 bg-warm/30 text-center">
        <ImageIcon className="w-10 h-10 text-primary/60 mx-auto mb-2" />
        <h4 className="text-sm font-bold text-charcoal">Upload New Files to Local Storage</h4>
        <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
          All images are stored directly on the local server in <code className="text-primary font-mono text-[11px]">/uploads/</code> with permanent relative paths.
        </p>
      </div>

      {/* Search & Grid */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets by file name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">Loading media library...</div>
        ) : filteredMedia.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-sm font-semibold">No assets found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredMedia.map((m) => {
              const isPdf = m.mimeType === 'application/pdf' || m.filename?.endsWith('.pdf');
              return (
                <div key={m._id} className="group relative bg-warm/40 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square flex items-center justify-center p-3 bg-white">
                    {isPdf ? (
                      <FileText className="w-12 h-12 text-primary" />
                    ) : (
                      <img
                        src={getImageUrl(m.url)}
                        alt={m.originalName || m.filename}
                        className="w-full h-full object-contain"
                        onError={(e) => handleImageError(e, '/logo.png')}
                      />
                    )}
                  </div>
                  <div className="p-2.5 bg-white border-t border-gray-100">
                    <p className="text-[11px] font-semibold text-charcoal truncate" title={m.originalName || m.filename}>
                      {m.originalName || m.filename}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => copyUrl(m)}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-500 hover:text-primary transition-colors"
                        title="Copy file path"
                      >
                        {copiedId === m._id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === m._id ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => handleDelete(m._id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        title="Delete asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaAdmin;
