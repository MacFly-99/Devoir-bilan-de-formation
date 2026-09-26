import api from './api';

export const authService = {
  register: async (userData) => {
    // On appelle notre nouveau contrôleur personnalisé
    const response = await api.post('/register', userData);
    return response.data;
  },
};

export default authService;