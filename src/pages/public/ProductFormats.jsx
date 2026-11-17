import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import getImageUrl from '../../utils/imageUrl';
import { ArrowRight, Sparkles, Package } from 'lucide-react';

const ProductFormats = () => {
  const formats = [
    {
      title: 'Liquid-Filled Hard Capsules',
      badge: 'Signature Format',
      image: '/images/hero-bottles.png',
      desc: 'Two-piece hermetically banded vegetarian (HPMC) or gelatin capsules containing clear liquid, lipid solution, or oil suspension.',
      link: '/products/liquid-filled-hard-capsules'
    },
    {
      title: 'Capsule-in-Capsule & Pellets',
      badge: 'Dual Phase',
      image: '/images/format-capsules.jpg',
      desc: 'Multi-compartment delivery system isolating chemically incompatible actives or providing programmed immediate + delayed release.',
      link: '/products/capsule-in-capsule'
    },
    {
      title: 'Functional Fruit Gummies',
      badge: 'Chewable Delivery',
      image: '/images/format-gummies.jpg',
      desc: '100% Pectin vegetarian gummies free from gelatin, available in natural strawberry, orange, and berry fruit profiles.',
      link: '/products?dosage=Gummies'
    },
    {
      title: 'Effervescent Tablets',
      badge: 'Rapid Hydration',
      image: '/images/format-effervescent.jpg',
      desc: 'Instant sparkling effervescent tablets manufactured in low-humidity cleanrooms, packaged in moisture-tight aluminum tubes.',
      link: '/products?dosage=Effervescent+Tablets'
    },
    {
      title: 'Pharmaceutical Coated Tablets',
      badge: 'Solid Oral',
      image: '/images/format-tablets.jpg',
      desc: 'Film-coated, enteric-coated, chewable, and modified-release tablets with high active assay precision and rapid dissolution.',
      link: '/products?dosage=Tablets'
    },
    {
      title: 'Soft Gelatin Capsules',
      badge: 'Lipid Encapsulation',
      image: '/images/format-softgels.jpg',
      desc: 'Hermetic rotary die softgels formulated for fat-soluble vitamins (D3, E, K2), Omega-3 fish oils, and botanical extracts.',
      link: '/products?dosage=Soft+Gel+Capsules'
    },
    {
      title: 'Ready-to-Drink Oral Shots',
      badge: 'Instant Liquid Dose',
      image: '/images/format-shots.jpg',
      desc: '25ml - 60ml single-serve concentrated liquid shots for pre-workout energy, joint collagen, and rapid vitamin replenishment.',
      link: '/products?dosage=Oral+Shots'
    },
    {
      title: 'Therapeutic Syrups & Liquids',
      badge: 'Oral Liquid',
      image: '/images/format-syrups.jpg',
      desc: 'Taste-masked oral solutions, herbal suspensions, and pediatric vitamin syrups formulated for high microbiological stability.',
      link: '/products?dosage=Syrups+%26+Liquids'
    },
    {
      title: 'Nutritional Powders & Sachets',
      badge: 'Single-Serve Sachets',
      image: '/images/format-sachets.jpg',
      desc: 'Pre-measured stick packs and multi-serve tubs for instant electrolyte hydration, protein matrix, and botanical greens.',
      link: '/products?dosage=Sachets+%26+Powders'
    }
  ];

  return (
    <>
      <SEO
        title="Comprehensive Product Formats & Dosage Options | ONPHARNO"
        description="Explore the full spectrum of pharmaceutical and nutraceutical dosage formats available for contract manufacturing at ONPHARNO."
      />

      <div className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
              Manufacturing Capabilities
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Comprehensive Product Formats
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">
              From our signature liquid-filled hard capsules to high-speed tablets, effervescents, gummies, and oral shots—manufactured across dedicated cGMP automated lines.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formats.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-primary/40 transition-all group"
            >
              <div>
                <div className="h-52 bg-warm/50 overflow-hidden relative p-4 flex items-center justify-center">
                  <img
                    src={getImageUrl(f.image)}
                    alt={f.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
                  />
                  <span className="absolute top-3 left-3 bg-navy/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {f.badge}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-charcoal group-hover:text-primary transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{f.desc}</p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-100 mt-4">
                <Link
                  to={f.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark pt-3"
                >
                  <span>Explore Formulations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-warm rounded-3xl p-8 sm:p-12 text-center border border-primary/20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-charcoal">Not Sure Which Format Fits Your Active Compound?</h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-xl mx-auto">
            Our formulation scientists analyze solubility, molecular weight, hygroscopicity, and target consumer convenience to recommend the ideal dosage format.
          </p>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-dark transition-all"
            >
              <span>Consult With Our Formulation Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFormats;
