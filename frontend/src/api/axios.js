import axios from 'axios';

// 1. Deteksi apakah aplikasi sedang berjalan di hosting (production) berdasarkan URL
const isLive = window.location.hostname.includes('visitgumiwang.web.id');

// 2. Tentukan baseURL
const baseURL = import.meta.env.VITE_API_URL || (isLive ? 'https://visitgumiwang.web.id/backend/public/api' : '/api');

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Hapus sesi jika token kadaluarsa atau tidak valid
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      // Menggunakan replace agar user tidak bisa 'back' ke halaman error
      window.location.replace('/admin/login');
    }
    return Promise.reject(error);
  }
);

export default api;