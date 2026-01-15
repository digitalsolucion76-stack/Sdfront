import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:82/api/v1',
  withCredentials: true, // This is important for sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
