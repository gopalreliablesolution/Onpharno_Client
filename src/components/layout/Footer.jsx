import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Footer = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-gray-300 pt-16 pb-12 border-t border-navy-800">
      {/* Upper CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl">
            <span className="text-white/80 uppercase text-xs tracking-wider font-semibold">
              Ready to Innovate Your Product Portfolio?
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-1 text-white">
              Let's Build What's Next in Healthcare.
            </h3>
            <p className="text-white/90 text-sm mt-2">
              From formulation development to commercial cGMP manufacturing and export packaging.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary-dark hover:bg-warm font-semibold px-8 py-3.5 rounded-full text-sm shadow-md transition-all transform hover:scale-105 whitespace-nowrap"
          >
            START A PROJECT &rarr;
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block bg-white p-2 rounded-lg">
              <img
                src={settings?.logo || '/logo.png'}
                alt="ONPHARNO"
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  e.target.src = '/logo.png';
                }}
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              ONPHARNO is a science-driven pharmaceutical and nutraceutical manufacturing partner specializing in advanced dosage-form technologies, custom formulations, and global B2B delivery.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={settings?.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-navy-800 hover:bg-primary text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings?.socialLinks?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-navy-800 hover:bg-primary text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${settings?.email || 'info@onpharno.com'}`}
                className="w-9 h-9 rounded-full bg-navy-800 hover:bg-primary text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Company */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about/our-story" className="hover:text-primary transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/about/quality" className="hover:text-primary transition-colors">Quality & Compliance</Link>
              </li>
              <li>
                <Link to="/about/facilities" className="hover:text-primary transition-colors">Facilities & Labs</Link>
              </li>
              <li>
                <Link to="/about/our-team" className="hover:text-primary transition-colors">Our Team</Link>
              </li>
              <li>
                <Link to="/resources/certifications" className="hover:text-primary transition-colors">Certifications</Link>
              </li>
              <li>
                <Link to="/resources/blogs" className="hover:text-primary transition-colors">Insights & News</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products/liquid-filled-hard-capsules" className="hover:text-primary transition-colors">
                  Liquid-Filled Capsules
                </Link>
              </li>
              <li>
                <Link to="/products/capsule-in-capsule" className="hover:text-primary transition-colors">
                  Capsule-in-Capsule
                </Link>
              </li>
              <li>
                <Link to="/products/pellets-in-capsule" className="hover:text-primary transition-colors">
                  Pellets-in-Capsule
                </Link>
              </li>
              <li>
                <Link to="/products/by-health-category" className="hover:text-primary transition-colors">
                  By Health Category
                </Link>
              </li>
              <li>
                <Link to="/products/by-dosage-form" className="hover:text-primary transition-colors">
                  By Dosage Form
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary transition-colors">
                  All Formulations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Partner & Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Contact & Partner
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/partner/global-partnerships" className="hover:text-primary transition-colors">
                  Global Partnerships
                </Link>
              </li>
              <li>
                <Link to="/partner/distribution-partnerships" className="hover:text-primary transition-colors">
                  Distribution Alliances
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-800 space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{settings?.email || 'info@onpharno.com'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{settings?.phone || '+91 98765 43210'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>&copy; {currentYear} ONPHARNO. All rights reserved. B2B Healthcare & Formulations.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/admin" className="hover:text-primary transition-colors text-gray-400">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
