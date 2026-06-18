// lib/api.js - Central API configuration

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:5000/py/api'
  : (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://wheedletechnologies.ai/py/api');

export default API_BASE_URL;

export const SOCKET_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : (process.env.NEXT_PUBLIC_SOCKET_URL || 'https://wheedletechnologies.ai');

