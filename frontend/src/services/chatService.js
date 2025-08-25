import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getUsers = async (token) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await axios.get(`${API_URL}/users`, config);
  return response.data;
};

const getMessages = async (token, userId) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await axios.get(`${API_URL}/messages/${userId}`, config);
  return response.data;
};

const getGroupMessages = async (token, groupId) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await axios.get(`${API_URL}/messages/group/${groupId}`, config);
  return response.data;
};

const chatService = {
  getUsers,
  getMessages,
  getGroupMessages,
};

export default chatService;