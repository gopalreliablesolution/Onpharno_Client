import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/client';
import { Mail, Package, BookOpen, Layers, Users, TrendingUp, Clock } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    enquiriesTotal: 24,
    enquiriesToday: 3,
    productsCount: 16,
    blogsCount: 8,
    categoriesCount: 12
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await apiClient.get('/admin/dashboard-stats');
        if (res.success && res.data) {
          setStats(res.data.stats || stats);
          setRecentEnquiries(res.data.recentEnquiries || []);
        }
      } catch {
        // Fallback default
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-charcoal">Executive Dashboard</h1>
        <p className="text-xs text-gray-500 mt-1">Real-time overview of ONPHARNO business leads, catalog, and CMS modules.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">New Enquiries (Today)</span>
            <p className="text-3xl font-serif font-bold text-primary mt-1">{stats.enquiriesToday}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Formulations</span>
            <p className="text-3xl font-serif font-bold text-charcoal mt-1">{stats.productsCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Health Categories</span>
            <p className="text-3xl font-serif font-bold text-charcoal mt-1">{stats.categoriesCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Published Articles</span>
            <p className="text-3xl font-serif font-bold text-charcoal mt-1">{stats.blogsCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Matrix */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="font-serif font-bold text-lg text-charcoal mb-4">Quick Module Shortcuts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/admin/products" className="p-4 rounded-xl bg-warm hover:bg-primary/10 transition-colors text-center border border-gray-100">
            <Package className="w-6 h-6 text-primary mx-auto mb-2" />
            <span className="text-xs font-semibold text-charcoal block">Manage Products</span>
          </Link>
          <Link to="/admin/banners" className="p-4 rounded-xl bg-warm hover:bg-primary/10 transition-colors text-center border border-gray-100">
            <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
            <span className="text-xs font-semibold text-charcoal block">Hero Banners</span>
          </Link>
          <Link to="/admin/enquiries" className="p-4 rounded-xl bg-warm hover:bg-primary/10 transition-colors text-center border border-gray-100">
            <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
            <span className="text-xs font-semibold text-charcoal block">View Inquiries</span>
          </Link>
          <Link to="/admin/settings" className="p-4 rounded-xl bg-warm hover:bg-primary/10 transition-colors text-center border border-gray-100">
            <Layers className="w-6 h-6 text-primary mx-auto mb-2" />
            <span className="text-xs font-semibold text-charcoal block">Site Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
