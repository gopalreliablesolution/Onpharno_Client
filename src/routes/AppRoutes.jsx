import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout';
import { useAuth } from '../context/AuthContext';

// Core Landing Page loaded synchronously for instant FCP/LCP
import Home from '../pages/public/Home';

// Public Sub-pages Code-split (Lazy Loaded)
const AboutStory = lazy(() => import('../pages/public/AboutStory'));
const AboutQuality = lazy(() => import('../pages/public/AboutQuality'));
const AboutFacilities = lazy(() => import('../pages/public/AboutFacilities'));
const AboutTeam = lazy(() => import('../pages/public/AboutTeam'));
const LiquidFilledCapsules = lazy(() => import('../pages/public/LiquidFilledCapsules'));
const CapsuleInCapsule = lazy(() => import('../pages/public/CapsuleInCapsule'));
const PelletsInCapsule = lazy(() => import('../pages/public/PelletsInCapsule'));
const Products = lazy(() => import('../pages/public/Products'));
const ProductDetail = lazy(() => import('../pages/public/ProductDetail'));
const CategoryProducts = lazy(() => import('../pages/public/CategoryProducts'));
const DosageFormProducts = lazy(() => import('../pages/public/DosageFormProducts'));
const HealthCategoryProducts = lazy(() => import('../pages/public/HealthCategoryProducts'));
const ProductDevelopment = lazy(() => import('../pages/public/ProductDevelopment'));
const ResearchInnovation = lazy(() => import('../pages/public/ResearchInnovation'));
const Manufacturing = lazy(() => import('../pages/public/Manufacturing'));
const ProductFormats = lazy(() => import('../pages/public/ProductFormats'));
const PackagingDoc = lazy(() => import('../pages/public/PackagingDoc'));
const Blogs = lazy(() => import('../pages/public/Blogs'));
const BlogDetail = lazy(() => import('../pages/public/BlogDetail'));
const Faqs = lazy(() => import('../pages/public/Faqs'));
const Certifications = lazy(() => import('../pages/public/Certifications'));
const Videos = lazy(() => import('../pages/public/Videos'));
const Innovations = lazy(() => import('../pages/public/Innovations'));
const GlobalPartnerships = lazy(() => import('../pages/public/GlobalPartnerships'));
const DistributionPartnerships = lazy(() => import('../pages/public/DistributionPartnerships'));
const Contact = lazy(() => import('../pages/public/Contact'));
const ThankYou = lazy(() => import('../pages/public/ThankYou'));
const PrivacyPolicy = lazy(() => import('../pages/public/PrivacyPolicy'));
const Terms = lazy(() => import('../pages/public/Terms'));
const NotFound = lazy(() => import('../pages/public/NotFound'));

// Admin Pages Code-split (Zero impact on public visitor bundle)
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Banners = lazy(() => import('../pages/admin/Banners'));
const SectionsCMS = lazy(() => import('../pages/admin/SectionsCMS'));
const AboutStoryCMS = lazy(() => import('../pages/admin/AboutStoryCMS'));
const ContactCMS = lazy(() => import('../pages/admin/ContactCMS'));
const Menus = lazy(() => import('../pages/admin/Menus'));
const Categories = lazy(() => import('../pages/admin/Categories'));
const ProductsAdmin = lazy(() => import('../pages/admin/ProductsAdmin'));
const StatsAdmin = lazy(() => import('../pages/admin/StatsAdmin'));
const TeamAdmin = lazy(() => import('../pages/admin/TeamAdmin'));
const FacilitiesAdmin = lazy(() => import('../pages/admin/FacilitiesAdmin'));
const CertificationsAdmin = lazy(() => import('../pages/admin/CertificationsAdmin'));
const VideosAdmin = lazy(() => import('../pages/admin/VideosAdmin'));
const BlogsAdmin = lazy(() => import('../pages/admin/BlogsAdmin'));
const FaqsAdmin = lazy(() => import('../pages/admin/FaqsAdmin'));
const EnquiriesAdmin = lazy(() => import('../pages/admin/EnquiriesAdmin'));
const SeoAdmin = lazy(() => import('../pages/admin/SeoAdmin'));
const SettingsAdmin = lazy(() => import('../pages/admin/SettingsAdmin'));
const MediaAdmin = lazy(() => import('../pages/admin/MediaAdmin'));
const UsersAdmin = lazy(() => import('../pages/admin/UsersAdmin'));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
  </div>
);

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
    <Suspense fallback={<PageLoader />}>
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
          <Route path="research-innovation" element={<Navigate to="/capabilities/research-innovation" replace />} />
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
          <Route path="privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="terms" element={<Terms />} />
          <Route path="terms-conditions" element={<Navigate to="/terms" replace />} />

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
          <Route path="about-story" element={<AboutStoryCMS />} />
          <Route path="contact" element={<ContactCMS />} />
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
    </Suspense>
  );
};

export default AppRoutes;
