import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, ChevronDown, ArrowRight, Phone, Mail, ShieldCheck, Sparkles, Layers, Award } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'About Us',
      dropdown: [
        { name: 'Our Story', path: '/about/our-story', desc: 'More than manufacturing: building better healthcare businesses' },
        { name: 'Quality & Compliance', path: '/about/quality', desc: 'Quality built into every stage to earn trust' },
        { name: 'Facilities & Labs', path: '/about/facilities', desc: 'State-of-the-art R&D and manufacturing plants' },
        { name: 'Our Team', path: '/about/our-team', desc: 'Formulation, quality, and leadership expertise' },
      ],
    },
    {
      name: 'Products',
      featured: {
        title: 'Featured Technology',
        name: 'Liquid-Filled Hard Capsules',
        path: '/products/liquid-filled-hard-capsules',
        desc: 'Advanced dosage-form technology for sensitive and premium actives.'
      },
      dropdown: [
        { name: 'Liquid-Filled Hard Capsules', path: '/products/liquid-filled-hard-capsules', desc: 'Our signature dosage form capability' },
        { name: 'Capsule-in-Capsule', path: '/products/capsule-in-capsule', desc: 'Dual-release & incompatible actives in one unit' },
        { name: 'Pellets-in-Capsule', path: '/products/pellets-in-capsule', desc: 'Multiple pellets with customized dissolution' },
        { name: 'By Health Category', path: '/products/by-health-category', desc: 'Wellness, Gut, Joint, Sleep, Beauty & more' },
        { name: 'By Dosage Form', path: '/products/by-dosage-form', desc: 'Tablets, Softgels, Effervescent, Sachets' },
        { name: 'All Products Catalog', path: '/products', desc: 'Browse our full formulations & product range' },
      ],
    },
    {
      name: 'Capabilities',
      dropdown: [
        { name: 'Product Development', path: '/capabilities/product-development', desc: '7-step idea to commercial product approach' },
        { name: 'Research & Innovation', path: '/capabilities/research-innovation', desc: 'Dosage-form innovation & stability focus' },
        { name: 'Manufacturing Capabilities', path: '/capabilities/manufacturing', desc: 'High-speed cGMP manufacturing lines' },
        { name: 'Product Formats', path: '/capabilities/product-formats', desc: 'Tablets, Capsules, Gummies, Syrups & more' },
        { name: 'Packaging & Documentation', path: '/capabilities/packaging-documentation', desc: 'Export dossiers, blister, HDPE bottles' },
      ],
    },
    {
      name: 'Resources',
      dropdown: [
        { name: 'Insights & Blogs', path: '/resources/blogs', desc: 'Nutraceutical and formulation industry insights' },
        { name: 'Knowledge & FAQs', path: '/resources/faqs', desc: 'Technical & contract manufacturing answers' },
        { name: 'Certifications', path: '/resources/certifications', desc: 'GMP, ISO, FSSAI, USFDA compliance docs' },
        { name: 'Video Library', path: '/resources/videos', desc: 'Factory tours and manufacturing showcases' },
      ],
    },
    { name: 'Innovations', path: '/innovations' },
    {
      name: 'Partner With Us',
      dropdown: [
        { name: 'Global Partnerships', path: '/partner/global-partnerships', desc: 'Export & international commercial alliances' },
        { name: 'Distribution Partnerships', path: '/partner/distribution-partnerships', desc: 'Wholesalers, distributors & retail brands' },
      ],
    },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top micro bar for B2B Trust */}
      <div className="bg-navy text-gray-300 text-xs py-1.5 px-4 sm:px-8 border-b border-navy-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" /> cGMP Certified Facility & Formulation R&D
            </span>
            <span className="text-gray-400">|</span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Global Export & Private Label Partner
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="mailto:info@onpharno.com" className="hover:text-primary transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3 text-primary" /> info@onpharno.com
            </a>
            <span className="text-gray-400">|</span>
            <Link to="/about/quality" className="hover:text-white transition-colors">
              Quality Assurance
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100'
            : 'bg-white py-4 border-b border-warm/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={settings?.logo || '/logo.png'}
              alt="ONPHARNO"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/logo.png';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                      activeDropdown === link.name
                        ? 'text-primary'
                        : 'text-charcoal hover:text-primary'
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === link.name ? 'rotate-180 text-primary' : 'text-gray-400'
                    }`} />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                      location.pathname === link.path
                        ? 'text-primary font-semibold'
                        : 'text-charcoal hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 transform transition-all duration-200 animate-in fade-in slide-in-from-top-2">
                    {link.featured && (
                      <div className="p-3 mb-2 bg-warm rounded-lg border border-primary/10">
                        <span className="text-[10px] font-semibold tracking-wider text-primary uppercase block">
                          {link.featured.title}
                        </span>
                        <Link
                          to={link.featured.path}
                          className="font-medium text-charcoal hover:text-primary text-sm flex items-center justify-between mt-1"
                        >
                          {link.featured.name}
                          <ArrowRight className="w-3.5 h-3.5 text-primary" />
                        </Link>
                        <p className="text-xs text-gray-500 mt-1 leading-snug">
                          {link.featured.desc}
                        </p>
                      </div>
                    )}
                    <div className="space-y-0.5">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block p-2.5 rounded-lg hover:bg-warm transition-colors group"
                        >
                          <div className="text-sm font-medium text-charcoal group-hover:text-primary flex items-center justify-between">
                            {subItem.name}
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                          </div>
                          {subItem.desc && (
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{subItem.desc}</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:from-primary-600 hover:to-primary-dark transition-all transform hover:-translate-y-0.5"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-charcoal hover:text-primary hover:bg-warm"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-white z-40 overflow-y-auto border-t border-gray-100 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-gray-100 pb-2">
                  {link.dropdown ? (
                    <div>
                      <div className="font-semibold text-charcoal text-base mb-2">{link.name}</div>
                      <div className="pl-3 space-y-2 border-l-2 border-primary/20">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block text-sm text-gray-600 hover:text-primary py-1"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className="block font-semibold text-charcoal text-base hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-100">
              <Link
                to="/contact"
                className="w-full block text-center bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-xl font-semibold shadow-md"
              >
                Start a Project &rarr;
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
