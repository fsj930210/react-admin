import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_PREFIX,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      response.data.suceess = true;
      return response.data;
    } else {
      return response.data;
    }
  },
  (error) => {
    if (error.response) {
      if (error.response.data) {
        error.response.data.suceess = false;
      }
      return error.response?.data || error;
    }
  },
);

export default instance;
