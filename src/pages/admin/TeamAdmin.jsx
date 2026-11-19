import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { getImageUrl, handleImageError } from '../../utils/imageUrl';
import {
  Plus,
  Trash2,
  Edit2,
  Users,
  Upload,
  X,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';

const DEPARTMENTS = [
  'Management',
  'R&D',
  'Formulation',
  'Quality',
  'Manufacturing',
  'Operations',
  'Business Development',
  'International Business'
];

const initialTeamState = {
  name: '',
  role: '',
  department: 'Formulation',
  bio: '',
  photo: '/uploads/logo.png',
  order: 1,
  active: true
};

const TeamAdmin = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialTeamState);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/team');
      if (res.success && res.data) {
        setTeam(res.data.sort((a, b) => (a.order || 0) - (b.order || 0)));
      }
    } catch {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      ...initialTeamState,
      order: team.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m) => {
    setEditingId(m._id);
    setFormData({
      name: m.name || '',
      role: m.role || '',
      department: m.department || 'Formulation',
      bio: m.bio || '',
      photo: m.photo || '/uploads/logo.png',
      order: m.order || 1,
      active: m.active !== false
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
        setFormData(prev => ({ ...prev, photo: res.data.url }));
        toast.success('Profile photo uploaded!');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) {
      toast.error('Name and role are required');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await apiClient.put(`/admin/team/${editingId}`, formData);
        toast.success('Team member updated!');
      } else {
        await apiClient.post('/admin/team', formData);
        toast.success('Team member added!');
      }
      setIsModalOpen(false);
      fetchTeam();
    } catch (err) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/admin/team/${id}`);
      toast.success('Team member deleted');
      setTeam(prev => prev.filter(t => t._id !== id));
      setDeleteConfirmId(null);
    } catch {
      toast.error('Failed to delete');
    }
  };

  const toggleActive = async (m) => {
    const newActive = !m.active;
    try {
      await apiClient.put(`/admin/team/${m._id}`, { active: newActive });
      setTeam(prev => prev.map(item => item._id === m._id ? { ...item, active: newActive } : item));
      toast.success(`Profile ${newActive ? 'activated' : 'hidden'}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Scientific & Executive Leadership</h1>
          <p className="text-xs text-gray-500 mt-1">Manage executive leadership, chief formulation scientists, QA heads, and regulatory officers.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md hover:bg-primary-dark transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Team Member
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">Loading team...</div>
        ) : team.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Users className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <p className="text-sm font-semibold">No team members found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-warm/60 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
                <tr>
                  <th className="p-4 w-16 text-center">Order</th>
                  <th className="p-4">Photo</th>
                  <th className="p-4">Name & Title</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {team.map((m) => (
                  <tr key={m._id} className="hover:bg-warm/30 transition-colors">
                    <td className="p-4 text-center font-bold text-gray-400 text-xs">#{m.order || 1}</td>
                    <td className="p-4">
                      <img
                        src={getImageUrl(m.photo)}
                        alt={m.name}
                        className="w-10 h-10 object-cover rounded-full border border-gray-200 bg-white"
                        onError={(e) => handleImageError(e, '/logo.png')}
                      />
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-charcoal block">{m.name}</span>
                      <span className="text-xs text-primary block">{m.role}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-700">
                        {m.department}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleActive(m)}
                        className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                          m.active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {m.active ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-gray-400" />}
                        {m.active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(m)}
                        className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(m._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        title="Delete"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <h3 className="font-bold text-base text-charcoal">
                {editingId ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma, Ph.D."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Role / Designation *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Head of Formulation Science & Novel Delivery Systems"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Department *</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-white"
                >
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Short Bio</label>
                <textarea
                  rows="2"
                  placeholder="20+ years in pharmaceutical dosage form development and sterile liquid fill technologies..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-charcoal">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                    />
                    <span>Active on site</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Profile Photo</label>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={getImageUrl(formData.photo)}
                    alt="Photo"
                    className="w-12 h-12 object-cover rounded-full border border-gray-200 bg-white"
                    onError={(e) => handleImageError(e, '/logo.png')}
                  />
                  <label className="cursor-pointer bg-warm border border-gray-200 text-xs font-semibold px-3 py-2 rounded-xl hover:border-primary transition-colors flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-primary" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.photo || ''}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="/uploads/... or https://..."
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-mono"
                />
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
                  {submitting ? 'Saving...' : editingId ? 'Update' : 'Add'}
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
            <h4 className="text-base font-bold text-charcoal mb-1">Delete Team Member?</h4>
            <p className="text-xs text-gray-500 mb-6">Are you sure you want to remove this profile?</p>
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

export default TeamAdmin;
