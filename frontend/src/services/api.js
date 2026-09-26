import axios from 'axios';

// On récupère l'URL de l'API depuis le fichier .env
const API_URL = import.meta.env.VITE_API_URL;

// On crée une instance Axios pré-configurée
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// On ajoute un "intercepteur" pour injecter automatiquement le token JWT
// s'il est présent dans le localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;