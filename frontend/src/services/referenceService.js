import api from './api';

// Fonction utilitaire pour extraire un tableau, peu importe le format de l'API
const extractArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && data['hydra:member'] && Array.isArray(data['hydra:member'])) return data['hydra:member'];
  if (data && data.member && Array.isArray(data.member)) return data.member;
  return []; // En dernier recours, on renvoie un tableau vide pour éviter les crashs
};

export const referenceService = {
  getAllMarques: async () => {
    try {
      const response = await api.get('/marques');
      return extractArray(response.data);
    } catch (err) {
      console.error("Erreur getAllMarques:", err);
      return [];
    }
  },

  getAllCategories: async () => {
    try {
      const response = await api.get('/categories');
      return extractArray(response.data);
    } catch (err) {
      console.error("Erreur getAllCategories:", err);
      return [];
    }
  },

  getAllModeles: async () => {
    try {
      const response = await api.get('/modeles');
      return extractArray(response.data);
    } catch (err) {
      console.error("Erreur getAllModeles:", err);
      return [];
    }
  },
};

export default referenceService;