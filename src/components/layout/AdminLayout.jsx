import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Image as ImageIcon,
  FileText,
  Menu as MenuNavIcon,
  Layers,
  MessageSquare,
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
import apiClient from '../../api/client';
import { ChevronDown, Sparkles, Handshake, Cpu } from 'lucide-react';

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

  const [expandedGroups, setExpandedGroups] = useState({});

  const { data: menusData } = useQuery({
    queryKey: ['site-menus'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/menus');
        return res.data || [];
      } catch { return []; }
    },
  });

  // Maps a public URL to the admin screen that manages its content.
  const ADMIN_PATH_BY_URL = {
    '/': '/admin/sections',
    '/about/our-story': '/admin/about-story',
    '/about/quality': '/admin/about-story',
    '/about/facilities': '/admin/about-story',
    '/about/our-team': '/admin/about-story',
    '/resources/blogs': '/admin/blogs',
    '/resources/faqs': '/admin/faqs',
    '/resources/certifications': '/admin/certifications',
    '/resources/videos': '/admin/videos',
    '/contact': '/admin/contact',
  };
  const SECTION_BY_URL = {
    '/about/our-story': 'about_hero',
    '/about/quality': 'quality_hero',
    '/about/facilities': 'facilities_hero',
    '/about/our-team': 'team_hero',
  };
  const PAGE_BY_URL = {
    '/about/our-story': 'about',
    '/about/quality': 'quality',
    '/about/facilities': 'facilities',
    '/about/our-team': 'team',
  };

  // Admin sidebar groups are built from the Navigation & Menus entries.
  const headerMenus = Array.isArray(menusData)
    ? menusData.filter((m) => m.location === 'header' && m.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];
  const menuGroups = headerMenus.map((m) => ({
    name: m.title,
    items: (m.items || [])
      .slice()
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((i) => ({
        name: i.title,
        url: i.url,
        adminPath: ADMIN_PATH_BY_URL[i.url] || '/admin/about-story',
        section: SECTION_BY_URL[i.url] || '',
        page: PAGE_BY_URL[i.url] || '',
      })),
    directPath: m.url ? ADMIN_PATH_BY_URL[m.url] || null : null,
    directSection: SECTION_BY_URL[m.url] || '',
    directPage: PAGE_BY_URL[m.url] || '',
  })).filter((g) => g.items.length > 0 || g.directPath);

  const subLink = (item) => {
    const params = new URLSearchParams();
    if (item.url) params.set('sub', item.url);
    if (item.page) params.set('page', item.page);
    if (item.section) params.set('section', item.section);
    const qs = params.toString();
    return { pathname: item.adminPath, search: qs ? `?${qs}` : '' };
  };

  const systemItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Hero Banners', path: '/admin/banners', icon: ImageIcon, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Home Page (CMS)', path: '/admin/sections', icon: FileText, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Contact Page (CMS)', path: '/admin/contact', icon: MessageSquare, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Innovations (CMS)', path: '/admin/innovations', icon: Sparkles, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Partners (CMS)', path: '/admin/partners', icon: Handshake, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Capabilities (CMS)', path: '/admin/capabilities', icon: Cpu, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Navigation & Menus', path: '/admin/menus', icon: MenuNavIcon, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Categories & Formats', path: '/admin/categories', icon: Layers, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Products & Formulations', path: '/admin/products', icon: Package, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Stats & Counters', path: '/admin/stats', icon: TrendingUp, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Team Members', path: '/admin/team', icon: Users, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Facilities & Labs', path: '/admin/facilities', icon: Building2, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Certifications', path: '/admin/certifications', icon: Award, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Video Library', path: '/admin/videos', icon: Video, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Insights & Blogs', path: '/admin/blogs', icon: BookOpen, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Knowledge & FAQs', path: '/admin/faqs', icon: HelpCircle, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Enquiries & Leads', path: '/admin/enquiries', icon: Mail, roles: ['superadmin', 'admin'] },
    { name: 'SEO Management', path: '/admin/seo', icon: Search, roles: ['superadmin', 'admin', 'editor'] },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings, roles: ['superadmin'] },
    { name: 'Media Library', path: '/admin/media', icon: FolderOpen, roles: ['superadmin', 'admin'] },
    { name: 'Admin Users', path: '/admin/users', icon: UserCheck, roles: ['superadmin'] },
  ];
  const visibleSystemItems = systemItems.filter((item) => !item.roles || item.roles.includes(user?.role));
  const canManage = ['superadmin', 'admin', 'editor'].includes(user?.role);

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
              onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
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
          {canManage && menuGroups.length > 0 && sidebarOpen && (
            <>
              <p className="px-3 pt-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Site Pages
              </p>
              {menuGroups.map((group) => {
                const expanded = !!expandedGroups[group.name];
                if (group.items.length === 0 && group.directPath) {
                  return (
                    <Link
                      key={group.name}
                      to={{ pathname: group.directPath, search: group.directPage ? `?page=${group.directPage}` : '' }}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        location.pathname === group.directPath
                          ? 'bg-primary/20 text-primary-light font-semibold'
                          : 'text-gray-300 hover:bg-navy-800 hover:text-white'
                      }`}
                    >
                      <MenuNavIcon className="w-4 h-4 shrink-0" />
                      <span className="truncate flex-1">{group.name}</span>
                    </Link>
                  );
                }
                return (
                  <div key={group.name}>
                    <button
                      type="button"
                      onClick={() => setExpandedGroups((prev) => ({ ...prev, [group.name]: !prev[group.name] }))}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-navy-800 hover:text-white transition-colors"
                    >
                      <MenuNavIcon className="w-4 h-4 shrink-0" />
                      <span className="truncate flex-1 text-left">{group.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </button>
                    {expanded && (
                      <div className="ml-4 border-l border-navy-700 pl-2 space-y-0.5">
                        {group.items.map((item, idx) => {
                          const link = subLink(item);
                          const isSubActive =
                            location.pathname === link.pathname &&
                            (!item.url || location.search === link.search);
                          return (
                            <Link
                              key={`${item.name}-${idx}`}
                              to={link}
                              className={`block px-3 py-2 rounded-lg text-xs transition-colors ${
                                isSubActive
                                  ? 'bg-primary/20 text-primary-light font-semibold'
                                  : 'text-gray-400 hover:bg-navy-800 hover:text-white'
                              }`}
                              title={item.url}
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="pt-2 pb-1 border-t border-navy-800 mt-2" />
            </>
          )}

          <p className="px-3 pt-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            {sidebarOpen ? 'Administration' : ''}
          </p>
          {visibleSystemItems.map((item) => {
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
                <p className="text-[11px] text-gray-400 truncate">{user?.email || 'admin@onpharno.com'}{user?.role ? ` (${user.role})` : ''}</p>
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
