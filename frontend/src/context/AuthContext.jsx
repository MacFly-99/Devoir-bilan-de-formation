import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// On crée le contexte
const AuthContext = createContext(null);

// Le "Provider" qui va englober toute l'application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au démarrage, on vérifie si un token est déjà stocké
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Si les données sont corrompues, on nettoie
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    const response = await api.post('/login_check', { email, password });
    const { token } = response.data;
    
    // On stocke le token JWT
    localStorage.setItem('token', token);
    
    // On décode le JWT pour récupérer l'email (qui est dans le champ "username")
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userData = {
      email: payload.username,
      roles: payload.roles || [],
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
    return response.data;
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // On expose les données et fonctions à toute l'application
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser facilement le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};