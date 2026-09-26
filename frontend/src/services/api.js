import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/ld+json',
  },
});

// 🔐 Intercepteur qui ajoute le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Intercepteur de réponse : si on reçoit un 401, on déconnecte l'utilisateur
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Le token est invalide ou expiré : on nettoie et on redirige
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Rechargement forcé pour rediriger vers l'accueil
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;