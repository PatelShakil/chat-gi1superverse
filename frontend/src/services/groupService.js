import axios from 'axios';

const API_URL = 'http://localhost:5000/api/groups';

const createGroup = async (groupData, token) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await axios.post(API_URL, groupData, config);
  return response.data;
};

const getGroups = async (token) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const groupService = {
  createGroup,
  getGroups,
};

export default groupService;
