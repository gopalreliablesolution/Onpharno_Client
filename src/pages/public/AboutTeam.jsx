import React from 'react';
import SEO from '../../components/common/SEO';

const AboutTeam = () => {
  const departments = [
    { title: 'Executive Management', desc: 'Strategic leadership with decades of global pharma and B2B contract manufacturing experience.' },
    { title: 'R&D & Formulation Science', desc: 'Specialists in novel drug delivery systems, lipid formulations, and bioenhancement.' },
    { title: 'Quality Assurance & Regulatory', desc: 'Ensuring continuous compliance with cGMP, WHO, ISO, and export dossier standards.' },
    { title: 'Manufacturing Operations', desc: 'Experienced plant managers and engineers ensuring flawless production runs and zero downtime.' },
    { title: 'Business Development & Partnerships', desc: 'Commercial advisors helping B2B clients scale products across international markets.' }
  ];

  return (
    <>
      <SEO title="Our Team & Leadership - ONPHARNO" description="Expertise Matters. Products Are Built by People Who Understand the Details." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Leadership & Scientific Team</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Expertise Matters.</h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">
            Products Are Built by People Who Understand the Details.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-charcoal">{dept.title}</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{dept.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutTeam;
