import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 45000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error) => {
  refreshQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve()));
  refreshQueue = [];
};

// Cold Start Detection & Notification
let activeRequests = 0;
let coldStartTimer = null;
let isColdStarting = false;

const setColdStartState = (waking) => {
  if (isColdStarting !== waking && typeof window !== 'undefined') {
    isColdStarting = waking;
    window.dispatchEvent(new CustomEvent('onpharno:coldstart', { detail: { waking } }));
  }
};

apiClient.interceptors.request.use((config) => {
  activeRequests++;
  if (!coldStartTimer) {
    coldStartTimer = setTimeout(() => {
      if (activeRequests > 0) {
        setColdStartState(true);
      }
    }, 2500);
  }
  return config;
});

const onResponseEnd = () => {
  activeRequests = Math.max(0, activeRequests - 1);
  if (activeRequests === 0) {
    if (coldStartTimer) {
      clearTimeout(coldStartTimer);
      coldStartTimer = null;
    }
    setColdStartState(false);
  }
};

apiClient.interceptors.response.use(
  (response) => {
    onResponseEnd();
    return response.data;
  },
  async (error) => {
    const original = error.config || {};
    const status = error.response?.status;
    const url = original.url || '';
    const method = (original.method || 'get').toLowerCase();

    // 1. Cold Start Retry with Backoff for Idempotent GET Requests on 502/503/504 or Network Error
    const isColdStartError = !status || [502, 503, 504].includes(status) || error.code === 'ECONNABORTED';
    if (isColdStartError && method === 'get' && (original._retryCount || 0) < 3) {
      original._retryCount = (original._retryCount || 0) + 1;
      setColdStartState(true);
      const delayMs = original._retryCount === 1 ? 1500 : original._retryCount === 2 ? 3000 : 5000;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return apiClient(original);
    }

    onResponseEnd();

    // 2. Cookie Auth Refresh Interceptor
    if (status === 401 && !original._retry && !url.includes('/auth/login') && !url.includes('/auth/refresh')) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then(() => apiClient(original));
      }
      original._retry = true;
      isRefreshing = true;
      try {
        await apiClient.post('/auth/refresh');
        processQueue(null);
        return apiClient(original);
      } catch (refreshError) {
        processQueue(refreshError);
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
        return Promise.reject(refreshError.response?.data || { message: 'Session expired' });
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error.response?.data || { message: error.message });
  }
);

export default apiClient;
