import api from './api';

const getRecommendations = async () => {
    const response = await api.post('/ai/recommend');
    return response.data;
};

export default {
    getRecommendations,
};
