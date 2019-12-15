import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { TOKEN_KEY } from './auth';

const api = axios.create({
  baseURL: `https://servisso-api.herokuapp.com`
  // baseURL: 'http://192.168.100.8:3333'
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
