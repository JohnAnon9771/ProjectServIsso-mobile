import axios from 'axios';
import Constants from 'expo-constants';

const { manifest } = Constants;

const api = axios.create({
  baseURL: `http://192.168.100.26:3333`
});

export default api;
