import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const WhatsAppFloat = () => {
  const { settings } = useSettings();
  const rawNumber = settings?.whatsappNumber || '+919876543210';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');

  const message = encodeURIComponent('Hello ONPHARNO Team, I would like to enquire about your pharmaceutical/nutraceutical contract manufacturing capabilities.');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-50 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ONPHARNO product team on WhatsApp"
        className="flex items-center gap-2 bg-[#25D366] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white shrink-0" />
        <span className="hidden sm:inline-block text-xs font-semibold tracking-wide uppercase">
          Chat With Us
        </span>
      </a>
      {/* Tooltip on hover for desktop */}
      <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-navy text-white text-xs py-1.5 px-3 rounded-md shadow-lg whitespace-nowrap">
        Quick Technical Enquiry on WhatsApp
      </div>
    </aside>
  );
};

export default WhatsAppFloat;
