import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // default to product service
  headers: { 'Content-Type': 'application/json' },
});

export const productApi = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

export const orderApi = axios.create({
  baseURL: 'http://localhost:3002',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
