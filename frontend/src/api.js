import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const registerUser = (userData) => API.post('/api/users/register', userData);
export const loginUser = (userData) => API.post('/api/users/login', userData);
