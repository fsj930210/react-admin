import { API_SUCCESS_CODE } from './constants';
import request from './request';
import storage from './storage';
import { emitter } from './utils';

export const adminApi = request.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

adminApi.interceptors.request.use(
  (config) => {
    // 从cookie里面取access_token
    const token = storage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

adminApi.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      if (response.data) {
        if (response.data.code === API_SUCCESS_CODE) {
          response.data.success = true;
        } else {
          response.data.success = false;
        }
        return response.data;
      }
    } else if (response.status === 401) {
      emitter.emit('api_401');
      return response.data;
    } else {
      return response.data;
    }
  },
  (error) => {
    if (error?.response?.data) {
      emitter.emit('api_error', error.response.data);
      throw error.response.data;
    }
    emitter.emit('api_error', error?.response || error);
    throw error?.response || error;
  },
);
