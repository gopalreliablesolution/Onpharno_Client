import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { ArrowRight } from 'lucide-react';

const DEFAULTS = {
  team_hero: {
    eyebrow: 'SCIENTIFIC & EXECUTIVE TEAM',
    title1: 'Expertise Matters.',
    title2: 'Products Are Built by People Who Understand the Details.',
    subtitle:
      'From dedicated scientists, quality assurance auditors, and multidisciplinary leaders who bring deep expertise in every stage of development and manufacturing.',
    imageAlt: 'ONPHARNO scientific team',
  },
  team_departments: {
    items: [
      { name: 'All Departments' },
      { name: 'Management' },
      { name: 'R&D' },
      { name: 'Formulation' },
      { name: 'Quality' },
      { name: 'Manufacturing' },
      { name: 'Operations' },
      { name: 'Business Development' },
      { name: 'International Business' },
    ],
  },
  team_grid: {
    departments: 'All Departments, Management, R&D, Formulation, Quality, Manufacturing, Operations, Business Development, International Business',
    ctaTitle: 'Collaborate With Our Scientific Experts',
    ctaDesc: 'From idea to innovation — work with our experienced team to develop high-quality, compliant, and effective healthcare solutions.',
    ctaText: 'Schedule a Technical Consultation →',
    ctaLink: '/contact',
    ctaImage1: '/images/format-capsules.jpg',
    ctaImage2: '/images/scientist-pharmacist.png',
    items: [
      { photo: '/images/scientist-pharmacist.png', name: 'Dr. Priya Sharma, Ph.D.', role: 'Head of R&D', department: 'R&D', bio: '20+ years in pharmaceutical formulation sciences, with expertise in nutraceuticals and drug manufacturing.', label: 'R&D Leadership Team' },
      { photo: '/images/formulation-scientists.png', name: 'Anurag Mehta, M.Pharm', role: 'Head of Quality Assurance', department: 'Quality', bio: 'Ensuring regulatory compliance, validated processes, and consistent product quality.', label: 'Quality Team' },
      { photo: '/images/scientist-pharmacist.png', name: 'Vikram Mehta', role: 'Head of Quality Control', department: 'Quality', bio: 'Overseeing analytical testing and maintaining stringent quality benchmarks.', label: 'Quality Team' },
      { photo: '/images/manufacturing-facility.jpg', name: 'Rithish Kumar', role: 'Head of Operations', department: 'Manufacturing', bio: 'Driving efficient and compliant manufacturing operations.', label: 'Manufacturing Team' },
      { photo: '/images/formulation-scientists.png', name: 'Pooja Desai', role: 'Head of Formulation', department: 'Formulation', bio: 'Leading formulation development for prototypes and custom products.', label: 'Formulation Team' },
      { photo: '/images/scientist-pharmacist.png', name: 'Karan Singh', role: 'Head of Business Development', department: 'Business Development', bio: 'Building strategic partnerships for global growth.', label: 'Business Development Team' },
    ],
  },
};

const AboutTeam = () => {
  const [selectedDept, setSelectedDept] = useState('');

  const { data: sectionsData } = useQuery({
    queryKey: ['team-page-sections'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/pages/team/sections?includeHidden=true');
        return res.data || [];
      } catch {
        return [];
      }
    },
  });
  const sections = sectionsData || [];

  const getRecord = (key) => sections.find((s) => s && s.key === key) || null;
  const isVisible = (key) => {
    const record = getRecord(key);
    return !record || record.visible !== false;
  };
  const data = (key) => {
    const record = getRecord(key);
    if (!record) return { ...DEFAULTS[key], image: '' };
    const saved = record.content && typeof record.content === 'object' ? record.content : {};
    return { ...DEFAULTS[key], ...saved, image: (record.image || '').toString().trim() };
  };
  const txt = (value) => (value ?? '').toString().trim();
  const has = (obj, fields) => fields.some((f) => txt(obj?.[f]));
  const itemsOf = (obj) =>
    Array.isArray(obj?.items)
      ? obj.items.filter((i) => i && (txt(i.name) || txt(i.role) || txt(i.photo) || txt(i.desc)))
      : [];

  const hero = data('team_hero');
  const grid = data('team_grid');
  const heroImage = txt(hero.image);
  const departmentsSection = data('team_departments');
  const allMembers = itemsOf(grid);
  // Tabs come strictly from the admin Departments list.
  const departments = itemsOf(departmentsSection)
    .map((d) => txt(d.name))
    .filter(Boolean);
  const activeDept = selectedDept && departments.includes(selectedDept) ? selectedDept : departments[0] || '';
  const filteredMembers =
    !activeDept || activeDept === 'All Departments'
      ? allMembers
      : allMembers.filter((m) => txt(m.department) === activeDept);

  const renderCtaLink = (link, text, className) => {
    if (!link || !text) return null;
    if (/^(https?:\/\/|mailto:)/i.test(link)) {
      return <a href={link} target="_blank" rel="noopener noreferrer" className={className}>{text}</a>;
    }
    return <Link to={link} className={className}>{text}</Link>;
  };

  return (
    <>
      <SEO
        title="Our Team - Scientific Leadership | ONPHARNO"
        description="Expertise Matters. Products Are Built by People Who Understand the Details. Meet ONPHARNO's R&D scientists, quality heads, and manufacturing directors."
      />

      {/* HERO */}
      {isVisible('team_hero') && (has(hero, ['eyebrow', 'title1', 'title2', 'subtitle']) || heroImage) && (
        <div className="bg-navy text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className={`grid grid-cols-1 ${heroImage ? 'lg:grid-cols-2 gap-10 items-center' : ''} py-14 sm:py-20 lg:py-24`}>
              <div className={heroImage ? '' : 'max-w-3xl'}>
                {txt(hero.eyebrow) && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
                    {txt(hero.eyebrow)}
                  </span>
                )}
                {txt(hero.title1) && <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">{txt(hero.title1)}</h1>}
                {txt(hero.title2) && (
                  <p className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight mt-1 text-primary-light">{txt(hero.title2)}</p>
                )}
                {txt(hero.subtitle) && <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed font-light">{txt(hero.subtitle)}</p>}
              </div>
              {heroImage && (
                <img
                  src={getImageUrl(heroImage)}
                  alt={txt(hero.imageAlt) || 'ONPHARNO Team'}
                  className="w-full h-auto max-h-[280px] sm:max-h-[380px] lg:max-h-[440px] object-contain rounded-2xl shadow-xl"
                  onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* TEAM GRID */}
      {isVisible('team_grid') && (departments.length > 0 || allMembers.length > 0 || has(grid, ['ctaTitle', 'ctaText'])) && (
        <div className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {departments.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
                {departments.map((dept, idx) => (
                  <button
                    key={`${dept}-${idx}`}
                    type="button"
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      activeDept === dept
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-warm text-gray-600 hover:text-charcoal hover:bg-gray-100'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}

            {filteredMembers.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member, idx) => {
                  const photo = txt(member.photo);
                  return (
                    <div
                      key={`${txt(member.name)}-${idx}`}
                      className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      {photo && (
                        <div className="h-52 sm:h-60 w-full overflow-hidden bg-warm/50 relative">
                          <img
                            src={getImageUrl(photo)}
                            alt={txt(member.name) || 'Team member'}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                          />
                          {txt(member.department) && (
                            <span className="absolute top-3 right-3 bg-navy/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                              {txt(member.department)}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        {txt(member.name) && <h3 className="text-base font-bold text-charcoal">{txt(member.name)}</h3>}
                        {txt(member.role) && <p className="text-xs font-semibold text-primary mt-0.5">{txt(member.role)}</p>}
                        {txt(member.bio) && <p className="text-xs text-gray-600 mt-3 leading-relaxed">{txt(member.bio)}</p>}
                        {txt(member.label) && (
                          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
                            {txt(member.label)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOTTOM CTA */}
      {isVisible('team_grid') && (has(grid, ['ctaTitle', 'ctaDesc', 'ctaText']) || txt(grid.ctaImage1) || txt(grid.ctaImage2)) && (
        <div className="py-16 sm:py-24 bg-white border-t border-orange-100 relative overflow-hidden">
          <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-orange-100/60 pointer-events-none" />
          <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-orange-100/60 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {txt(grid.ctaImage1) && (
              <img
                src={getImageUrl(txt(grid.ctaImage1))}
                alt=""
                className="absolute left-2 sm:left-10 top-1/2 -translate-y-1/2 h-28 sm:h-52 w-auto max-w-[150px] sm:max-w-[320px] object-contain pointer-events-none hidden sm:block"
                onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
              />
            )}
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              {txt(grid.ctaTitle) && <h3 className="text-lg sm:text-2xl font-bold text-charcoal">{txt(grid.ctaTitle)}</h3>}
              {txt(grid.ctaDesc) && <p className="text-xs sm:text-sm text-gray-500 mt-2">{txt(grid.ctaDesc)}</p>}
              {txt(grid.ctaText) && txt(grid.ctaLink) && (
                <div className="mt-5 flex justify-center">
                  {/^(https?:\/\/|mailto:)/i.test(txt(grid.ctaLink)) ? (
                    <a
                      href={txt(grid.ctaLink)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-full shadow hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
                    >
                      {txt(grid.ctaText)}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  ) : (
                    <Link
                      to={txt(grid.ctaLink)}
                      className="group inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3 rounded-full shadow hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
                    >
                      {txt(grid.ctaText)}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  )}
                </div>
              )}
            </div>
            {txt(grid.ctaImage2) && (
              <img
                src={getImageUrl(txt(grid.ctaImage2))}
                alt=""
                className="absolute right-2 sm:right-10 top-1/2 -translate-y-1/2 h-28 sm:h-52 w-auto max-w-[150px] sm:max-w-[320px] object-contain pointer-events-none hidden sm:block"
                onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AboutTeam;
