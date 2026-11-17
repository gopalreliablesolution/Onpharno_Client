import React, { useState } from 'react';
import { FolderOpen, Upload, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const MediaAdmin = () => {
  const [copied, setCopied] = useState(null);

  const localFiles = [
    { name: 'logo.png', path: '/logo.png', size: '348 KB' },
    { name: 'capsule-liquid.png', path: '/logo.png', size: '120 KB' },
  ];

  const handleCopy = (path) => {
    navigator.clipboard.writeText(path);
    setCopied(path);
    toast.success('Path copied to clipboard');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Local Media Library</h1>
          <p className="text-xs text-gray-500 mt-1">Files stored directly on ONPHARNO server (`/uploads`). No external cloud lock-in.</p>
        </div>
        <label className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark cursor-pointer">
          <Upload className="w-4 h-4" /> Upload File to Server
          <input type="file" className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {localFiles.map((f, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm p-4 text-center">
            <div className="h-28 flex items-center justify-center bg-warm rounded-xl mb-3">
              <img src={f.path} alt={f.name} className="max-h-20 max-w-full object-contain" />
            </div>
            <span className="text-xs font-semibold text-charcoal block truncate">{f.name}</span>
            <span className="text-[11px] text-gray-400 block">{f.size}</span>
            <button
              onClick={() => handleCopy(f.path)}
              className="mt-2 text-xs text-primary font-medium flex items-center justify-center gap-1 mx-auto hover:underline"
            >
              {copied === f.path ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied === f.path ? 'Copied' : 'Copy URL'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaAdmin;
