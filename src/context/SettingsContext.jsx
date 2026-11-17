import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/client';

const SettingsContext = createContext({
  settings: {},
  loading: true,
  refreshSettings: () => {},
});

const defaultSettings = {
  companyName: 'ONPHARNO',
  tagline: 'Advanced Dosage-Form Technology & Healthcare Manufacturing',
  logo: '/logo.png',
  logoWhite: '/logo.png',
  phone: '+91 89809 40940',
  email: 'sales@onpharno.com',
  address: 'Pharmaceutical Technology Park, Innovation Drive, Ahmedabad, Gujarat, India',
  whatsappNumber: '+918980940940',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/onpharno',
    instagram: 'https://instagram.com/onpharno',
    email: 'mailto:sales@onpharno.com',
  },
  workingHours: 'Mon - Sat: 9:00 AM - 6:30 PM (IST)',
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await apiClient.get('/settings');
      if (res.success && res.data) {
        setSettings({ ...defaultSettings, ...res.data });
      }
    } catch {
      // keep defaultSettings if backend not yet running or offline
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
