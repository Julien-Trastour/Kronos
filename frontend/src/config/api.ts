import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Mettre l'url du backend

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction de connexion
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};
