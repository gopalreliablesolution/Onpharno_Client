import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../utils/imageUrl';

const defaultStages = [
  {
    title: '01. Pure HPMC / Gelatin Shell',
    desc: '100% vegetarian plant cellulose (HPMC) or pharmaceutical-grade gelatin with moisture barrier.',
    color: '#D85430',
  },
  {
    title: '02. Liquid / Lipid Fill',
    desc: 'Hydrophobic active ingredients, cold-pressed botanical oils, and bio-enhanced suspensions.',
    color: '#F59E0B',
  },
  {
    title: '03. Hermetic Band Sealing',
    desc: 'Precision polymer banding line fused around the joint creating tamper-evident hermetic containment.',
    color: '#A83030',
  },
  {
    title: '04. Finished Dosage Form',
    desc: 'Crystal-clear luxury aesthetics, zero leakage, no oxidation, and superior cellular bioavailability.',
    color: '#10B981',
  },
];

const CapsuleAnimation = ({
  stages,
  badge = 'Interactive Anatomy',
  tag = 'Dosage Engineering',
  title = 'How Liquid-Filled Hard Capsules Are Built',
  desc = 'Click each phase to inspect the containment and formulation process.',
  customImage = '',
}) => {
  const [activeStage, setActiveStage] = useState(0);
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' | 'image'

  const stagesList = Array.isArray(stages) && stages.length > 0 ? stages : defaultStages;

  return (
    <div className="bg-navy-950 rounded-3xl p-6 sm:p-10 border border-navy-800 text-white shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Visual Display */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-navy-900/60 rounded-2xl border border-navy-800 relative overflow-hidden min-h-[360px]">
          {/* Subtle animated background radial glow */}
          <div className="absolute inset-0 bg-radial from-primary/20 via-transparent to-transparent opacity-60 blur-2xl" />

          {/* Toggle pill if custom image is available */}
          {customImage && (
            <div className="absolute top-3 right-3 z-20 flex items-center bg-navy-900/90 border border-navy-700 rounded-full p-0.5 text-[10px]">
              <button
                type="button"
                onClick={() => setViewMode('interactive')}
                className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                  viewMode === 'interactive'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Interactive
              </button>
              <button
                type="button"
                onClick={() => setViewMode('image')}
                className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                  viewMode === 'image'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Schematic
              </button>
            </div>
          )}

          {viewMode === 'image' && customImage ? (
            <div className="relative w-full h-72 sm:h-80 flex items-center justify-center p-2 z-10">
              <img
                src={getImageUrl(customImage)}
                alt="Capsule Schematic Visual"
                className="max-h-full max-w-full object-contain rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  setViewMode('interactive');
                }}
              />
            </div>
          ) : (
            /* SVG Animated Capsule */
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              <svg viewBox="0 0 200 340" className="w-48 h-auto drop-shadow-[0_15px_35px_rgba(216,84,48,0.35)]">
                <defs>
                  <linearGradient id="capsuleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FAF6F2" stopOpacity="0.4" />
                    <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#D85430" stopOpacity="0.3" />
                  </linearGradient>

                  <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="60%" stopColor="#D85430" />
                    <stop offset="100%" stopColor="#A83030" />
                  </linearGradient>

                  <linearGradient id="bandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#843C30" />
                    <stop offset="50%" stopColor="#D85430" />
                    <stop offset="100%" stopColor="#843C30" />
                  </linearGradient>
                </defs>

                {/* Capsule Outer Shell Outline */}
                <rect
                  x="35"
                  y="30"
                  width="130"
                  height="280"
                  rx="65"
                  fill="url(#capsuleGrad)"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="2.5"
                />

                {/* Liquid Fill Matrix (animated height / wave) */}
                <motion.g
                  initial={{ opacity: 0.8 }}
                  animate={{
                    y: activeStage >= 1 ? [0, -3, 0] : 10,
                    opacity: activeStage >= 1 ? 1 : 0.2,
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path
                    d="M 40 160 Q 100 150 160 160 L 160 245 A 60 60 0 0 1 40 245 Z"
                    fill="url(#liquidGrad)"
                    opacity={activeStage >= 1 ? '0.95' : '0.2'}
                  />
                  {/* Floating micro bio-actives */}
                  {activeStage >= 1 && (
                    <>
                      <circle cx="80" cy="200" r="4" fill="#FFE5D9" opacity="0.8" />
                      <circle cx="120" cy="225" r="5" fill="#FFE5D9" opacity="0.9" />
                      <circle cx="100" cy="180" r="3" fill="#FFE5D9" opacity="0.7" />
                      <circle cx="65" cy="235" r="3.5" fill="#FFE5D9" opacity="0.85" />
                    </>
                  )}
                </motion.g>

                {/* Sealing Band at Center Joint */}
                <motion.rect
                  x="33"
                  y="142"
                  width="134"
                  height="26"
                  rx="4"
                  fill="url(#bandGrad)"
                  stroke="#FFFFFF"
                  strokeWidth={activeStage >= 2 ? '1.5' : '0.5'}
                  animate={{
                    boxShadow: activeStage >= 2 ? '0 0 15px #D85430' : 'none',
                    opacity: activeStage >= 2 ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Outer Shell Gloss & Highlights */}
                <path
                  d="M 52 55 Q 65 70 65 140"
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 52 180 Q 65 210 65 270"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          )}

          {/* Stage Pill indicator */}
          <div className="absolute bottom-2 px-3 py-1 rounded-full bg-navy-800 text-[11px] font-semibold text-primary-light border border-navy-700">
            {badge || 'Interactive Anatomy'}
          </div>
        </div>

        {/* Right: Stage Navigation & Scientific Explanation */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-1">
            {tag && <span className="text-primary text-xs font-bold uppercase tracking-wider">{tag}</span>}
            {title && <h3 className="text-2xl font-bold text-white">{title}</h3>}
            {desc && <p className="text-xs text-gray-400">{desc}</p>}
          </div>

          <div className="space-y-2.5">
            {stagesList.map((stg, idx) => (
              <button
                key={stg.title || idx}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                  activeStage === idx
                    ? 'bg-primary/15 border-primary text-white shadow-md'
                    : 'bg-navy-900/50 border-navy-800 text-gray-400 hover:border-gray-700 hover:text-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    activeStage === idx ? 'bg-primary text-white' : 'bg-navy-800 text-gray-400'
                  }`}
                >
                  {idx + 1}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${activeStage === idx ? 'text-white' : 'text-gray-300'}`}>
                    {stg.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{stg.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleAnimation;
