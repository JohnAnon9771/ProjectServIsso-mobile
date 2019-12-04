import axios from 'axios';
import Constants from 'expo-constants';

const { manifest } = Constants;

const api = axios.create({
  baseURL: `http://192.168.0.3:3333`
});

export default api;
