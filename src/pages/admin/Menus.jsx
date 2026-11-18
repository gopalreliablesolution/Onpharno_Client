import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { Menu as MenuIcon, Plus, Trash2, Edit2, CheckCircle, X, ExternalLink, Layers } from 'lucide-react';
import toast from 'react-hot-toast';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [formData, setFormData] = useState({
    location: 'header',
    title: '',
    url: '',
    order: 0,
    active: true,
    subItemTitle: '',
    subItemUrl: '',
    subItemDesc: '',
  });
  const [itemsList, setItemsList] = useState([]);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/menus');
      if (res.success && res.data) {
        setMenus(res.data);
      }
    } catch {
      toast.error('Failed to load navigation menus');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const openModal = (menu = null) => {
    if (menu) {
      setEditingMenu(menu);
      setFormData({
        location: menu.location || 'header',
        title: menu.title || '',
        url: menu.url || '',
        order: menu.order || 0,
        active: menu.active !== false,
        subItemTitle: '',
        subItemUrl: '',
        subItemDesc: '',
      });
      setItemsList(menu.items || []);
    } else {
      setEditingMenu(null);
      setFormData({
        location: 'header',
        title: '',
        url: '',
        order: menus.length,
        active: true,
        subItemTitle: '',
        subItemUrl: '',
        subItemDesc: '',
      });
      setItemsList([]);
    }
    setIsModalOpen(true);
  };

  const handleAddSubItem = () => {
    if (!formData.subItemTitle || !formData.subItemUrl) {
      toast.error('Sub-item title and URL are required');
      return;
    }
    setItemsList([
      ...itemsList,
      {
        title: formData.subItemTitle,
        url: formData.subItemUrl,
        description: formData.subItemDesc || '',
        order: itemsList.length,
      },
    ]);
    setFormData({ ...formData, subItemTitle: '', subItemUrl: '', subItemDesc: '' });
  };

  const handleRemoveSubItem = (idx) => {
    setItemsList(itemsList.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error('Menu title is required');
      return;
    }

    const payload = {
      location: formData.location,
      title: formData.title,
      url: formData.url,
      order: Number(formData.order) || 0,
      active: formData.active,
      items: itemsList,
    };

    try {
      if (editingMenu) {
        await apiClient.put(`/admin/menus/${editingMenu._id}`, payload);
        toast.success('Menu updated successfully');
      } else {
        await apiClient.post('/admin/menus', payload);
        toast.success('Menu item created');
      }
      setIsModalOpen(false);
      fetchMenus();
    } catch {
      toast.error('Failed to save menu configuration');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this navigation menu entry?')) return;
    try {
      await apiClient.delete(`/admin/menus/${id}`);
      toast.success('Menu deleted');
      setMenus(menus.filter((m) => m._id !== id));
    } catch {
      toast.error('Failed to delete menu');
    }
  };

  const headerMenus = menus.filter((m) => m.location === 'header');
  const footerMenus = menus.filter((m) => m.location === 'footer');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Navigation & Menus</h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure header mega-menus, dropdown links, and footer links. (Falls back to default hierarchy when empty)
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-primary-dark transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Menu Item
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-500 text-sm">Loading navigation structures...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Header Navigation */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <MenuIcon className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-base text-charcoal">Header Navigation ({headerMenus.length})</h2>
              </div>
              <span className="text-[11px] text-gray-400">Top Mega Menu</span>
            </div>

            {headerMenus.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-4 text-center">
                No custom header menus configured. System is currently serving default SevenQ-style navigation links.
              </p>
            ) : (
              <div className="divide-y divide-gray-100">
                {headerMenus.map((m) => (
                  <div key={m._id} className="py-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-charcoal">{m.title}</span>
                        <span className="text-[11px] text-gray-400 font-mono">{m.url || '#'}</span>
                        <span className="text-[10px] bg-warm px-2 py-0.5 rounded text-gray-600 font-bold">
                          Order: {m.order}
                        </span>
                      </div>
                      {m.items?.length > 0 && (
                        <p className="text-xs text-primary mt-1 font-medium">
                          Dropdown: {m.items.length} sub-item(s) ({m.items.map((i) => i.title).join(', ')})
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openModal(m)}
                        className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-50"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(m._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-navy" />
                <h2 className="font-bold text-base text-charcoal">Footer Navigation ({footerMenus.length})</h2>
              </div>
              <span className="text-[11px] text-gray-400">Footer Columns</span>
            </div>

            {footerMenus.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-4 text-center">
                No custom footer menus configured. System is currently serving default footer columns and links.
              </p>
            ) : (
              <div className="divide-y divide-gray-100">
                {footerMenus.map((m) => (
                  <div key={m._id} className="py-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-charcoal">{m.title}</span>
                        <span className="text-[11px] text-gray-400 font-mono">{m.url || '#'}</span>
                      </div>
                      {m.items?.length > 0 && (
                        <p className="text-xs text-navy mt-1">
                          Sub-links: {m.items.map((i) => i.title).join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openModal(m)}
                        className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-50"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(m._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-charcoal">{editingMenu ? 'Edit Navigation Item' : 'New Navigation Item'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Menu Location</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full text-xs p-2.5 border rounded-xl bg-white"
                  >
                    <option value="header">Header Mega Menu</option>
                    <option value="footer">Footer Column</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="w-full text-xs p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Menu Title / Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Products, Capabilities, About Us"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">URL / Route Path (Optional if dropdown)</label>
                <input
                  type="text"
                  placeholder="e.g. /products or /contact"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-mono"
                />
              </div>

              {/* Sub-items (Dropdown Links) */}
              <div className="border border-gray-200 rounded-xl p-3 bg-gray-50/50 space-y-3">
                <span className="text-[11px] font-bold text-charcoal uppercase block">Dropdown Sub-Items ({itemsList.length})</span>
                {itemsList.length > 0 && (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {itemsList.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border">
                        <div>
                          <span className="font-semibold">{item.title}</span>
                          <span className="text-gray-400 font-mono ml-2">{item.url}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubItem(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Sub-item title"
                    value={formData.subItemTitle}
                    onChange={(e) => setFormData({ ...formData, subItemTitle: e.target.value })}
                    className="text-xs p-2 border rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Sub-item URL (/about/...)"
                    value={formData.subItemUrl}
                    onChange={(e) => setFormData({ ...formData, subItemUrl: e.target.value })}
                    className="text-xs p-2 border rounded-lg bg-white font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddSubItem}
                  className="text-xs font-semibold text-primary hover:underline block"
                >
                  + Add Dropdown Link
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl shadow"
                >
                  Save Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menus;
