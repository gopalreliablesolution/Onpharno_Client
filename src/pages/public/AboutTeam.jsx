import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { Users, Mail, ArrowRight, Shield, Award } from 'lucide-react';

const DEPARTMENTS = [
  'All Departments',
  'Management',
  'R&D',
  'Formulation',
  'Quality',
  'Manufacturing',
  'Operations',
  'Business Development',
  'International Business'
];

const fallbackTeam = [
  {
    name: 'Dr. Rajesh Sharma, Ph.D.',
    role: 'Chief Scientific Officer & Head of R&D',
    department: 'R&D',
    photo: '/images/scientist-pharmacist.png',
    bio: '25+ years in novel pharmaceutical drug delivery systems, lipid-based encapsulation, and bioavailability optimization.'
  },
  {
    name: 'Ananya Patel, M.Pharm',
    role: 'Lead Formulation Scientist',
    department: 'Formulation',
    photo: '/images/scientist-pharmacist.png',
    bio: 'Specialist in non-aqueous liquid hard capsule fills, semi-solid emulsions, and suspension stability.'
  },
  {
    name: 'Vikram Mehta',
    role: 'Director of Quality Assurance & Regulatory',
    department: 'Quality',
    photo: '/images/scientist-pharmacist.png',
    bio: 'Former regulatory auditor with 20 years leading WHO-GMP, ISO 22000, and US-FDA compliance programs.'
  },
  {
    name: 'Suresh Kumar',
    role: 'Head of Manufacturing Operations',
    department: 'Manufacturing',
    photo: '/images/manufacturing-facility.jpg',
    bio: 'Oversees 24/7 cGMP cleanrooms, automated encapsulation lines, and high-speed packaging machinery.'
  },
  {
    name: 'Pooja Desai',
    role: 'VP of International Business & B2B Partnerships',
    department: 'International Business',
    photo: '/images/scientist-pharmacist.png',
    bio: 'Leads global distribution alliances across 20+ countries, private label contracts, and dossier registrations.'
  },
  {
    name: 'Karan Singhania',
    role: 'Operations & Supply Chain Director',
    department: 'Operations',
    photo: '/images/packaging-line.jpg',
    bio: 'Manages API procurement, cold-chain logistics, and end-to-end commercial supply chain reliability.'
  }
];

const AboutTeam = () => {
  const [team, setTeam] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await apiClient.get('/team');
        if (res.success && res.data && res.data.length > 0) {
          setTeam(res.data);
        } else {
          setTeam(fallbackTeam);
        }
      } catch {
        setTeam(fallbackTeam);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const filteredTeam = selectedDept === 'All Departments'
    ? team
    : team.filter(m => m.department === selectedDept);

  return (
    <>
      <SEO
        title="Our Team - Scientific Leadership | ONPHARNO"
        description="Expertise Matters. Products Are Built by People Who Understand the Details. Meet ONPHARNO's R&D scientists, quality heads, and manufacturing directors."
      />

      {/* Hero */}
      <div className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
              Scientific & Executive Team
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Expertise Matters. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">
                Products Are Built by People Who Understand the Details.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">
              From doctorate-level formulation scientists to veteran quality assurance auditors, our multi-disciplinary leadership ensures that every pharmaceutical and nutraceutical project is executed with technical rigor.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Department Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedDept === dept
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-warm text-gray-600 hover:text-charcoal hover:bg-gray-100'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeam.map((member, idx) => (
              <div
                key={idx}
                className="bg-warm/30 rounded-3xl border border-gray-200 p-6 flex flex-col justify-between hover:shadow-xl hover:border-primary/40 transition-all group"
              >
                <div>
                  <div className="relative mb-6">
                    <img
                      src={getImageUrl(member.photo)}
                      alt={member.name}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-md bg-white"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
                    />
                    <span className="absolute top-0 right-0 bg-navy/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {member.department}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-charcoal">{member.name}</h3>
                  <p className="text-xs font-semibold text-primary mt-0.5">{member.role}</p>
                  {member.bio && (
                    <p className="text-xs text-gray-600 mt-3 leading-relaxed font-light">{member.bio}</p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-gray-400">ONPHARNO Core Leader</span>
                  <Link
                    to="/contact"
                    className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Connect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join the Team / Partner CTA */}
      <div className="py-16 bg-warm/50 border-t border-gray-200 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-charcoal">Collaborate With Our Scientific Experts</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Have a technical formulation challenge or seeking contract development? Speak directly with our R&D heads.
          </p>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-dark transition-colors"
            >
              <span>Schedule a Technical Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutTeam;
