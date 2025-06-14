import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const signupUser = async (userData) => {
  try {
    const response = await api.post('/users/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Signup failed' };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || 'Login failed. Please try again.'
    };
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/users/logout');
  } catch (error) {
    throw error.response?.data || { message: 'Logout failed' };
  }
};

export const checkAuth = async () => {
  try {
    const response = await api.get('/users/check-auth');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Auth check failed' };
  }
};
