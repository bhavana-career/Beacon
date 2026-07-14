import axios from 'axios';

const api = axios.create({
  baseURL: 'https://beacon-backend-w0gb.onrender.com',
});

export default api;
