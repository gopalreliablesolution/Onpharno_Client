import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { PlayCircle, X } from 'lucide-react';

const DEFAULTS = {
  eyebrow: 'Media & Tours',
  title: 'Video Library',
  subtitle: 'Take a virtual tour of our high-speed manufacturing lines and R&D cleanrooms.',
};
const FALLBACK_VIDEOS = [
  { title: 'Liquid-Filled Hard Capsule Encapsulation & Banding', description: 'A high-speed look at hermetic banding and automated inspection.', thumbnail: '/images/facility-highlights.jpg', mediaType: 'video', videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
  { title: 'State-of-the-Art Formulation R&D Lab Walkthrough', description: 'Inside our analytical testing, stability chambers, and pilot facility.', thumbnail: '/images/formulation-scientists.png', mediaType: 'video', videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
];

const youtubeId = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v') || '';
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
  } catch { /* not a URL */ }
  return '';
};

const Videos = () => {
  const [playing, setPlaying] = useState(null);
  const { data: sectionsData } = useQuery({
    queryKey: ['resources-page-sections'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/pages/resources/sections?includeHidden=true');
        return res.data || [];
      } catch { return []; }
    },
  });
  const { data: videosData } = useQuery({
    queryKey: ['public-videos'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/videos');
        return res.data || [];
      } catch { return []; }
    },
  });

  const sections = sectionsData || [];
  const record = sections.find((s) => s && s.key === 'resources_videos' && s.visible !== false);
  const saved = record?.content || {};
  const txt = (v, d) => (record ? (v ?? '').toString().trim() : d);
  const cms = {
    eyebrow: txt(saved.eyebrow, DEFAULTS.eyebrow),
    title: txt(record?.title, DEFAULTS.title),
    subtitle: txt(record?.subtitle, DEFAULTS.subtitle),
  };
  const videos = Array.isArray(videosData) && videosData.length > 0 ? videosData : FALLBACK_VIDEOS;

  return (
    <>
      <SEO title="Video Library & Facility Tours - ONPHARNO" description="Watch facility tours, automated encapsulation machinery in action, and formulation science explanations." />
      <div className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cms.eyebrow && <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">{cms.eyebrow}</span>}
          {cms.title && <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">{cms.title}</h1>}
          {cms.subtitle && <p className="text-gray-300 mt-3 max-w-2xl font-light">{cms.subtitle}</p>}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((v, idx) => {
            const isImage = (v.mediaType || 'video') === 'image';
            const image = (v.thumbnail || v.image || '').toString().trim();
            const videoUrl = (v.videoUrl || '').toString().trim();
            const videoFile = (v.videoFile || '').toString().trim();
            const vid = youtubeId(videoUrl);
            const thumb = image || (vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : '');
            return (
              <div key={v._id || idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="h-64 w-full bg-charcoal relative overflow-hidden flex items-center justify-center">
                  {thumb ? (
                    <img src={getImageUrl(thumb)} alt={v.title || 'Media'} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                  ) : null}
                  {!isImage && (
                    <button
                      type="button"
                      onClick={() => setPlaying(v)}
                      className="absolute inset-0 flex items-center justify-center group"
                      aria-label={`Play ${v.title || 'video'}`}
                    >
                      <PlayCircle className="w-16 h-16 text-primary group-hover:scale-110 transition-transform drop-shadow-lg" />
                    </button>
                  )}
                </div>
                <div className="p-6">
                  {v.title && <h3 className="font-serif font-bold text-lg text-charcoal">{v.title}</h3>}
                  {v.description && <p className="text-sm text-gray-600 mt-2">{v.description}</p>}
                  {isImage && (
                    <span className="mt-3 inline-block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Image</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {playing && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPlaying(null)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-white font-semibold text-sm truncate">{playing.title}</p>
              <button type="button" onClick={() => setPlaying(null)} className="text-white hover:text-primary-light"><X className="w-6 h-6" /></button>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              {youtubeId(playing.videoUrl) ? (
                <iframe
                  title={playing.title}
                  src={`https://www.youtube.com/embed/${youtubeId(playing.videoUrl)}?autoplay=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : playing.videoFile ? (
                <video src={getImageUrl(playing.videoFile)} controls autoPlay className="w-full h-full" />
              ) : playing.videoUrl ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <p className="text-white/80 text-sm text-center px-4">This video opens on its original platform.</p>
                  <a
                    href={playing.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-primary-dark"
                  >
                    <PlayCircle className="w-5 h-5" /> Open video ↗
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Videos;
