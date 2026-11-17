import React from 'react';
import { Video, Plus } from 'lucide-react';

const VideosAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Video Library CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Manage video tours, machinery demos, and YouTube embeds.</p>
        </div>
        <button className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark">
          + Add Video
        </button>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <p className="text-sm text-gray-600">Video items are loaded and playable in public media gallery.</p>
      </div>
    </div>
  );
};

export default VideosAdmin;
