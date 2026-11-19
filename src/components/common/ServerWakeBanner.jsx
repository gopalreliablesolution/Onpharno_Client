import React, { useState, useEffect } from 'react';
import { Loader2, Server } from 'lucide-react';

export const ServerWakeBanner = () => {
  const [waking, setWaking] = useState(false);

  useEffect(() => {
    const handleColdStart = (e) => {
      setWaking(Boolean(e.detail?.waking));
    };

    window.addEventListener('onpharno:coldstart', handleColdStart);
    return () => {
      window.removeEventListener('onpharno:coldstart', handleColdStart);
    };
  }, []);

  if (!waking) return null;

  return (
    <div className="bg-primary/95 text-white text-xs px-4 py-2 fixed top-0 inset-x-0 z-[9999] shadow-lg flex items-center justify-center gap-2.5 animate-fadeIn">
      <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0 text-white" />
      <span className="font-medium">
        Connecting to ONPHARNO secure API... Please allow a few seconds while the cloud service wakes up.
      </span>
      <Server className="w-3.5 h-3.5 shrink-0 opacity-70 hidden sm:inline" />
    </div>
  );
};

export default ServerWakeBanner;
