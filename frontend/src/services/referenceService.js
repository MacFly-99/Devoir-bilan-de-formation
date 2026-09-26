import api from './api';

export const referenceService = {
  getAllMarques: async () => {
    const response = await api.get('/marques');
    return response.data['hydra:member'] || response.data;
  },

  getAllCategories: async () => {
    const response = await api.get('/categories');
    return response.data['hydra:member'] || response.data;
  },

  getAllModeles: async () => {
    const response = await api.get('/modeles');
    return response.data['hydra:member'] || response.data;
  },
};

export default referenceService;