import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { CheckCircle } from 'lucide-react';

const DEFAULTS = {
  eyebrow: 'Quality Standards',
  title: 'Certifications & Accreditations',
  subtitle: 'Verified compliance with national and international regulatory standards.',
};
const FALLBACK_CERTS = [
  { title: 'cGMP Compliance', authority: 'Current Good Manufacturing Practices compliant facilities and processes.', code: 'WHO-GMP' },
  { title: 'ISO 22000:2018', authority: 'Food Safety Management Systems certification for nutraceutical facilities.', code: 'ISO-CERT' },
  { title: 'ISO 9001:2015', authority: 'Quality Management Systems certifying consistent quality assurance systems.', code: 'ISO-QMS' },
  { title: 'FSSAI License', authority: 'Food Safety and Standards Authority certified manufacturing operations.', code: 'FSSAI' },
  { title: 'HACCP Certified', authority: 'Hazard Analysis Critical Control Point system for rigorous food safety controls.', code: 'HACCP' },
  { title: 'Halal & Kosher Ready', authority: 'Formulation compliance and certification capability for target markets.', code: 'COMPLIANT' },
];

const Certifications = () => {
  const [preview, setPreview] = useState(null);
  const { data: sectionsData } = useQuery({
    queryKey: ['resources-page-sections'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/pages/resources/sections?includeHidden=true');
        return res.data || [];
      } catch { return []; }
    },
  });
  const { data: certsData } = useQuery({
    queryKey: ['public-certifications'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/certifications');
        return res.data || [];
      } catch { return []; }
    },
  });

  const sections = sectionsData || [];
  const record = sections.find((s) => s && s.key === 'resources_certifications' && s.visible !== false);
  const saved = record?.content || {};
  const txt = (v, d) => (record ? (v ?? '').toString().trim() : d);
  const cms = {
    eyebrow: txt(saved.eyebrow, DEFAULTS.eyebrow),
    title: txt(record?.title, DEFAULTS.title),
    subtitle: txt(record?.subtitle, DEFAULTS.subtitle),
  };
  const certs = Array.isArray(certsData) && certsData.length > 0 ? certsData : FALLBACK_CERTS;

  return (
    <>
      <SEO title="Certifications & Compliance - ONPHARNO" description="View ONPHARNO's international quality certifications including cGMP, ISO, FSSAI, and export readiness." />
      <div className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cms.eyebrow && <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">{cms.eyebrow}</span>}
          {cms.title && <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">{cms.title}</h1>}
          {cms.subtitle && <p className="text-gray-300 mt-3 max-w-2xl font-light">{cms.subtitle}</p>}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((c, i) => {
            const image = (c.image || '').toString().trim();
            const validImage = image && !/logo\.png$/i.test(image);
            return (
              <div key={c._id || i} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  {validImage && (
                    <button
                      type="button"
                      onClick={() => setPreview({ url: getImageUrl(image), title: c.title || 'Certification' })}
                      className="mb-4 w-full h-44 bg-warm/40 rounded-xl overflow-hidden group/img cursor-zoom-in"
                      title="Click to view full image"
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={c.title || 'Certification'}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                      />
                    </button>
                  )}
                  {c.code && <span className="text-xs font-bold uppercase tracking-wider text-primary">{c.code}</span>}
                  {c.title && <h3 className="font-serif font-bold text-xl text-charcoal mt-1">{c.title}</h3>}
                  {(c.authority || c.description) && (
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{c.authority || c.description}</p>
                  )}
                  {c.documentPdf && (
                    <a href={getImageUrl(c.documentPdf)} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-colors">
                      View PDF Document ↗
                    </a>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-green-700 font-semibold">
                  <CheckCircle className="w-4 h-4" /> Active Audit Status Verified
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-full flex items-center justify-between mb-3">
              <p className="text-white font-semibold text-sm truncate">{preview.title}</p>
              <button type="button" onClick={() => setPreview(null)} className="text-white text-2xl leading-none hover:text-primary-light px-2">×</button>
            </div>
            <img src={preview.url} alt={preview.title} className="max-w-full max-h-[80vh] object-contain rounded-xl bg-white p-2" />
          </div>
        </div>
      )}
    </>
  );
};

export default Certifications;
