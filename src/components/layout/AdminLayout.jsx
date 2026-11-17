import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Image as ImageIcon,
  FileText,
  Menu as MenuNavIcon,
  Layers,
  Package,
  TrendingUp,
  Users,
  Building2,
  Award,
  Video,
  BookOpen,
  HelpCircle,
  Mail,
  Search,
  Settings,
  FolderOpen,
  UserCheck,
  LogOut,
  ChevronRight,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { settings } = useSettings();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Hero Banners', path: '/admin/banners', icon: ImageIcon },
    { name: 'Page Sections (CMS)', path: '/admin/sections', icon: FileText },
    { name: 'Navigation & Menus', path: '/admin/menus', icon: MenuNavIcon },
    { name: 'Categories & Formats', path: '/admin/categories', icon: Layers },
    { name: 'Products & Formulations', path: '/admin/products', icon: Package },
    { name: 'Stats & Counters', path: '/admin/stats', icon: TrendingUp },
    { name: 'Team Members', path: '/admin/team', icon: Users },
    { name: 'Facilities & Labs', path: '/admin/facilities', icon: Building2 },
    { name: 'Certifications', path: '/admin/certifications', icon: Award },
    { name: 'Video Library', path: '/admin/videos', icon: Video },
    { name: 'Insights & Blogs', path: '/admin/blogs', icon: BookOpen },
    { name: 'Knowledge & FAQs', path: '/admin/faqs', icon: HelpCircle },
    { name: 'Enquiries & Leads', path: '/admin/enquiries', icon: Mail },
    { name: 'SEO Management', path: '/admin/seo', icon: Search },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
    { name: 'Media Library', path: '/admin/media', icon: FolderOpen },
    { name: 'Admin Users', path: '/admin/users', icon: UserCheck },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-navy text-white transition-all duration-300 flex flex-col shrink-0 border-r border-navy-800 z-30`}
      >
        {/* Brand header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-navy-800">
          <Link to="/admin" className="flex items-center gap-2 overflow-hidden">
            <img
              src="/logo.png"
              alt="ONPHARNO"
              className="h-8 w-auto bg-white p-1 rounded"
              onError={(e) => { e.target.src = '/logo.png'; }}
            />
            {sidebarOpen && (
              <span className="font-serif font-bold text-lg tracking-tight text-white">
                Admin Panel
              </span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded text-gray-400 hover:text-white"
            title="Toggle Sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-primary text-white font-medium shadow-sm'
                    : 'text-gray-300 hover:bg-navy-800 hover:text-white'
                }`}
                title={!sidebarOpen ? item.name : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* User bar & Website preview link */}
        <div className="p-3 border-t border-navy-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-gray-300 hover:text-primary transition-colors px-2 py-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {sidebarOpen && <span>View Live Site</span>}
          </Link>
          <div className="flex items-center justify-between px-2 pt-2 border-t border-navy-800/60">
            {sidebarOpen && (
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[11px] text-gray-400 truncate">{user?.email || 'admin@onpharno.com'}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>ONPHARNO Control Center</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium text-charcoal capitalize">
              {location.pathname.replace('/admin', '').replace('/', '') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ● API Online
            </span>
          </div>
        </header>

        {/* Page Viewport */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
