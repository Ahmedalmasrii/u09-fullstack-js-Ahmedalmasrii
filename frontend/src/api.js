import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api' });

export const registerUser = (userData) => API.post('/users/register', userData);
export const loginUser = (userData) => API.post('/users/login', userData);
