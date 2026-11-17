import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import {
  Plus,
  Trash2,
  Edit2,
  BookOpen,
  Upload,
  X,
  AlertCircle,
  Eye,
  EyeOff,
  Search,
  Calendar,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

const initialBlogState = {
  title: '',
  category: 'Formulation & Science',
  author: 'ONPHARNO Scientific Team',
  readTime: '5 min read',
  coverImage: '/uploads/facilities/facility-highlights.jpg',
  excerpt: '',
  content: '',
  tags: 'Nutraceuticals, Bioavailability, Formulations',
  status: 'published'
};

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialBlogState);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/blogs');
      if (res.success && res.data) {
        setBlogs(res.data);
      }
    } catch {
      toast.error('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialBlogState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title || '',
      category: blog.category || 'Formulation & Science',
      author: blog.author || 'ONPHARNO Scientific Team',
      readTime: blog.readTime || '5 min read',
      coverImage: blog.coverImage || '/uploads/facilities/facility-highlights.jpg',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
      status: blog.status || 'published'
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    setUploadingImage(true);

    try {
      const res = await apiClient.post('/admin/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.success && res.data?.url) {
        setFormData(prev => ({ ...prev, coverImage: res.data.url }));
        toast.success('Cover image uploaded!');
      }
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    const payload = {
      ...formData,
      tags: typeof formData.tags === 'string'
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : formData.tags
    };

    setSubmitting(true);
    try {
      if (editingId) {
        await apiClient.put(`/admin/blogs/${editingId}`, payload);
        toast.success('Article updated!');
      } else {
        await apiClient.post('/admin/blogs', payload);
        toast.success('Article published!');
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (err) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/admin/blogs/${id}`);
      toast.success('Article deleted');
      setBlogs(prev => prev.filter(b => b._id !== id));
      setDeleteConfirmId(null);
    } catch {
      toast.error('Failed to delete');
    }
  };

  const toggleStatus = async (blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    try {
      await apiClient.put(`/admin/blogs/${blog._id}`, { status: newStatus });
      setBlogs(prev => prev.map(b => b._id === blog._id ? { ...b, status: newStatus } : b));
      toast.success(`Article ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filteredBlogs = blogs.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.category?.toLowerCase().includes(search.toLowerCase()) ||
    b.excerpt?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Scientific Insights & Blogs</h1>
          <p className="text-xs text-gray-500 mt-1">Publish R&D breakthroughs, formulation science, and industry research articles ({blogs.length} articles).</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md hover:bg-primary-dark transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Publish New Article
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles by title, topic or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">Loading articles...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <BookOpen className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <p className="text-sm font-semibold">No articles found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-warm/60 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
                <tr>
                  <th className="p-4">Cover & Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBlogs.map((b) => (
                  <tr key={b._id} className="hover:bg-warm/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={getImageUrl(b.coverImage)}
                          alt={b.title}
                          className="w-14 h-10 object-cover rounded-lg border border-gray-200 bg-gray-50 shrink-0"
                          onError={(e) => { e.target.src = '/uploads/facilities/facility-highlights.jpg'; }}
                        />
                        <div>
                          <span className="font-semibold text-charcoal block line-clamp-1">{b.title}</span>
                          <span className="text-[11px] text-gray-400 block line-clamp-1">{b.excerpt}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-medium">
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {b.category}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-gray-500">{b.author}</td>
                    <td className="p-4 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(b.publishedAt || b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(b)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                          b.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {b.status === 'published' ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                        title="Edit Article"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(b._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-lg font-bold text-charcoal">
                  {editingId ? 'Edit Article' : 'Write Scientific Insight'}
                </h3>
                <p className="text-xs text-gray-500">Create research-driven publications for the ONPHARNO Knowledge Hub.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advancing Bioavailability with Liquid-Filled Hard Capsules"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Author Byline</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Executive Excerpt *</label>
                <textarea
                  rows="2"
                  required
                  placeholder="Brief 1-2 sentence preview summary..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Article Body *</label>
                <textarea
                  rows="8"
                  required
                  placeholder="Full scientific article content, key findings, formulation discussion..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-sans leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Nutraceuticals, Bioavailability, Formulations"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Publication Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-white"
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Private)</option>
                  </select>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="bg-warm/50 p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={getImageUrl(formData.coverImage)}
                    alt="Cover"
                    className="w-16 h-12 object-cover rounded-lg border border-gray-200 bg-white"
                    onError={(e) => { e.target.src = '/uploads/facilities/facility-highlights.jpg'; }}
                  />
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase">Cover Image</label>
                    <span className="text-[11px] text-gray-400">High-resolution scientific or facility photo</span>
                  </div>
                </div>

                <label className="cursor-pointer bg-white border border-gray-200 text-xs font-semibold px-3 py-1.5 rounded-lg hover:border-primary transition-colors flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-primary" />
                  <span>{uploadingImage ? 'Uploading...' : 'Change Cover'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-white text-xs font-semibold px-5 py-2 rounded-xl shadow hover:bg-primary-dark transition-all disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-charcoal mb-1">Delete Article?</h4>
            <p className="text-xs text-gray-500 mb-6">Are you sure you want to remove this publication?</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsAdmin;
