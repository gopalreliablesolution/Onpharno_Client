import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

const AboutQuality = () => {
  const steps = [
    { title: 'Raw Material Evaluation', desc: 'Rigorous vendor qualification, chemical assay testing, and microbiological screening.' },
    { title: 'Controlled Development', desc: 'Formulation stability studies, active compatibility testing, and pilot scale validation.' },
    { title: 'Manufacturing Controls', desc: 'HEPA filtered cleanrooms, automated environmental monitoring, and calibrated precision machinery.' },
    { title: 'In-Process Checks', desc: 'Continuous weight uniformity, sealing integrity, moisture testing, and disintegration monitoring.' },
    { title: 'Finished Product Evaluation', desc: 'Comprehensive batch release testing against pharmacopeial and international standards.' },
    { title: 'Documentation & Traceability', desc: 'Full batch manufacturing records (BMR), certificates of analysis (COA), and audit trails.' }
  ];

  return (
    <>
      <SEO title="Quality & Compliance - ONPHARNO" description="Quality Is Built Into Every Stage. Which Builds Trust. Explore ONPHARNO's 6-step cGMP quality process." />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Quality Assurance</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Quality Is Built Into Every Stage.</h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl font-light">
            Which Builds Trust. Quality is not a badge—it is our foundational process.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative group hover:border-primary/40 transition-colors">
              <span className="text-3xl font-serif font-bold text-primary/30 block mb-3">0{idx + 1}</span>
              <h3 className="font-serif font-bold text-lg text-charcoal">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-warm p-8 rounded-2xl border border-primary/20 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-serif font-bold text-charcoal">"Quality Is Not a Badge. It Is a Process."</h3>
          <p className="text-sm text-gray-600 mt-2">Partner with a manufacturer where compliance is second nature.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-4 text-primary font-semibold hover:text-primary-dark">
            Discuss Quality Standards With Our Team &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default AboutQuality;
