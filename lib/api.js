// lib/api.js - Central API configuration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/py/api';

export default API_BASE_URL;

export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://wheedletechnologies.ai';
