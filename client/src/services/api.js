import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const careerService = {
  getAIRecommendations: (profile) => api.post('/ai/recommendations', { profile }),
  getMatchedCounselors: (userInterests) => api.post('/counselors/match', { userInterests }),
  getJobs: () => api.get('/jobs'),
  getHealth: () => api.get('/health'),
};
