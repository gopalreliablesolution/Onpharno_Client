import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { Award, ShieldCheck, FileCheck, CheckCircle } from 'lucide-react';

const Certifications = () => {
  const certs = [
    { title: 'cGMP Compliance', authority: 'Current Good Manufacturing Practices compliant facilities and processes.', code: 'WHO-GMP' },
    { title: 'ISO 22000:2018', authority: 'Food Safety Management Systems certification for nutraceutical facilities.', code: 'ISO-CERT' },
    { title: 'ISO 9001:2015', authority: 'Quality Management Systems certifying consistent quality assurance systems.', code: 'ISO-QMS' },
    { title: 'FSSAI License', authority: 'Food Safety and Standards Authority certified manufacturing operations.', code: 'FSSAI' },
    { title: 'HACCP Certified', authority: 'Hazard Analysis Critical Control Point system for rigorous food safety controls.', code: 'HACCP' },
    { title: 'Halal & Kosher Ready', authority: 'Formulation compliance and certification capability for target markets.', code: 'COMPLIANT' }
  ];

  return (
    <>
      <SEO title="Certifications & Compliance - ONPHARNO" description="View ONPHARNO's international quality certifications including cGMP, ISO, FSSAI, and export readiness." />
      <div className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Quality Standards</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Certifications & Accreditations</h1>
          <p className="text-gray-300 mt-3 max-w-2xl font-light">
            Verified compliance with national and international regulatory standards.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((c, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{c.code}</span>
                <h3 className="font-serif font-bold text-xl text-charcoal mt-1">{c.title}</h3>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{c.authority}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-green-700 font-semibold">
                <CheckCircle className="w-4 h-4" /> Active Audit Status Verified
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Certifications;
