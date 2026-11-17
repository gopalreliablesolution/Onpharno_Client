import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: add auth token if present in localStorage (fallback alongside cookies)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('onpharno_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor: handle 401 unauth
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('onpharno_token');
        localStorage.removeItem('onpharno_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error.response?.data || { message: error.message });
  }
);

export default apiClient;
