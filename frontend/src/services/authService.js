import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data.token;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data.token;
};

const getMe = async (token) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };
  const response = await axios.get(`${API_URL}/me`, config);
  return response.data;
};

const authService = {
  register,
  login,
  getMe,
};

export default authService;