import axios from 'axios';

const API_URL = 'http://localhost:5000/api/stories';

const createStory = async (storyData, token) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await axios.post(API_URL, storyData, config);
  return response.data;
};

const getStories = async (token) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const viewStory = async (storyId, token) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await axios.put(`${API_URL}/${storyId}/view`, {}, config);
  return response.data;
};

const storyService = {
  createStory,
  getStories,
  viewStory,
};

export default storyService;
