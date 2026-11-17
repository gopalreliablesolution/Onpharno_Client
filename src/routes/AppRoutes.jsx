import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout';
import { useAuth } from '../context/AuthContext';

// Public Pages
import Home from '../pages/public/Home';
import AboutStory from '../pages/public/AboutStory';
import AboutQuality from '../pages/public/AboutQuality';
import AboutFacilities from '../pages/public/AboutFacilities';
import AboutTeam from '../pages/public/AboutTeam';
import LiquidFilledCapsules from '../pages/public/LiquidFilledCapsules';
import CapsuleInCapsule from '../pages/public/CapsuleInCapsule';
import PelletsInCapsule from '../pages/public/PelletsInCapsule';
import Products from '../pages/public/Products';
import ProductDetail from '../pages/public/ProductDetail';
import CategoryProducts from '../pages/public/CategoryProducts';
import DosageFormProducts from '../pages/public/DosageFormProducts';
import HealthCategoryProducts from '../pages/public/HealthCategoryProducts';
import ProductDevelopment from '../pages/public/ProductDevelopment';
import ResearchInnovation from '../pages/public/ResearchInnovation';
import Manufacturing from '../pages/public/Manufacturing';
import ProductFormats from '../pages/public/ProductFormats';
import PackagingDoc from '../pages/public/PackagingDoc';
import Blogs from '../pages/public/Blogs';
import BlogDetail from '../pages/public/BlogDetail';
import Faqs from '../pages/public/Faqs';
import Certifications from '../pages/public/Certifications';
import Videos from '../pages/public/Videos';
import Innovations from '../pages/public/Innovations';
import GlobalPartnerships from '../pages/public/GlobalPartnerships';
import DistributionPartnerships from '../pages/public/DistributionPartnerships';
import Contact from '../pages/public/Contact';
import ThankYou from '../pages/public/ThankYou';
import PrivacyPolicy from '../pages/public/PrivacyPolicy';
import Terms from '../pages/public/Terms';
import NotFound from '../pages/public/NotFound';

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/admin/Dashboard';
import Banners from '../pages/admin/Banners';
import SectionsCMS from '../pages/admin/SectionsCMS';
import Menus from '../pages/admin/Menus';
import Categories from '../pages/admin/Categories';
import ProductsAdmin from '../pages/admin/ProductsAdmin';
import StatsAdmin from '../pages/admin/StatsAdmin';
import TeamAdmin from '../pages/admin/TeamAdmin';
import FacilitiesAdmin from '../pages/admin/FacilitiesAdmin';
import CertificationsAdmin from '../pages/admin/CertificationsAdmin';
import VideosAdmin from '../pages/admin/VideosAdmin';
import BlogsAdmin from '../pages/admin/BlogsAdmin';
import FaqsAdmin from '../pages/admin/FaqsAdmin';
import EnquiriesAdmin from '../pages/admin/EnquiriesAdmin';
import SeoAdmin from '../pages/admin/SeoAdmin';
import SettingsAdmin from '../pages/admin/SettingsAdmin';
import MediaAdmin from '../pages/admin/MediaAdmin';
import UsersAdmin from '../pages/admin/UsersAdmin';

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

const RequireRole = ({ roles, children }) => {
  const { user } = useAuth();
  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about/our-story" element={<AboutStory />} />
        <Route path="about/quality" element={<AboutQuality />} />
        <Route path="about/facilities" element={<AboutFacilities />} />
        <Route path="about/our-team" element={<AboutTeam />} />

        {/* Dosage-Form Signature Tech */}
        <Route path="products/liquid-filled-hard-capsules" element={<LiquidFilledCapsules />} />
        <Route path="products/capsule-in-capsule" element={<CapsuleInCapsule />} />
        <Route path="products/pellets-in-capsule" element={<PelletsInCapsule />} />
        <Route path="products/by-health-category" element={<HealthCategoryProducts />} />
        <Route path="products/by-dosage-form" element={<DosageFormProducts />} />

        {/* Catalog */}
        <Route path="products" element={<Products />} />
        <Route path="products/category/:slug" element={<CategoryProducts />} />
        <Route path="products/:slug" element={<ProductDetail />} />

        {/* Capabilities */}
        <Route path="capabilities/product-development" element={<ProductDevelopment />} />
        <Route path="capabilities/research-innovation" element={<ResearchInnovation />} />
        <Route path="research-innovation" element={<ResearchInnovation />} />
        <Route path="capabilities/manufacturing" element={<Manufacturing />} />
        <Route path="capabilities/product-formats" element={<ProductFormats />} />
        <Route path="capabilities/packaging-documentation" element={<PackagingDoc />} />

        {/* Resources & Innovations */}
        <Route path="resources/blogs" element={<Blogs />} />
        <Route path="resources/blogs/:slug" element={<BlogDetail />} />
        <Route path="resources/faqs" element={<Faqs />} />
        <Route path="resources/certifications" element={<Certifications />} />
        <Route path="resources/videos" element={<Videos />} />
        <Route path="innovations" element={<Innovations />} />

        {/* Commercial & Partnership */}
        <Route path="partner/global-partnerships" element={<GlobalPartnerships />} />
        <Route path="partner/distribution-partnerships" element={<DistributionPartnerships />} />
        <Route path="contact" element={<Contact />} />
        <Route path="thank-you" element={<ThankYou />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />

        {/* Fallback 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Login (Unprotected) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Portal (Protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="banners" element={<Banners />} />
        <Route path="sections" element={<SectionsCMS />} />
        <Route path="menus" element={<Menus />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<ProductsAdmin />} />
        <Route path="stats" element={<StatsAdmin />} />
        <Route path="team" element={<TeamAdmin />} />
        <Route path="facilities" element={<FacilitiesAdmin />} />
        <Route path="certifications" element={<CertificationsAdmin />} />
        <Route path="videos" element={<VideosAdmin />} />
        <Route path="blogs" element={<BlogsAdmin />} />
        <Route path="faqs" element={<FaqsAdmin />} />
        <Route path="enquiries" element={<RequireRole roles={['superadmin', 'admin']}><EnquiriesAdmin /></RequireRole>} />
        <Route path="seo" element={<SeoAdmin />} />
        <Route path="settings" element={<RequireRole roles={['superadmin']}><SettingsAdmin /></RequireRole>} />
        <Route path="media" element={<RequireRole roles={['superadmin', 'admin']}><MediaAdmin /></RequireRole>} />
        <Route path="users" element={<RequireRole roles={['superadmin']}><UsersAdmin /></RequireRole>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
