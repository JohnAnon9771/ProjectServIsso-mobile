import axios from 'axios';

const api = axios.create({
  // baseURL: `https://servisso-api.herokuapp.com/`
  baseURL: 'http://192.168.100.8:3333'
});

export default api;
