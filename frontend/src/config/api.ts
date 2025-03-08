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

// Récupérer la liste des employés
export const getEmployees = async (token: string) => {
  const response = await api.get('/employees', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fonction pour ajouter un employé
export const addEmployee = async (token: string, employeeData: any) => {
  const response = await api.post('/employees', employeeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Récupérer la liste des rôles
export const getRoles = async (token: string) => {
  const response = await api.get('/roles', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Récupérer la liste des agences
export const getAgencies = async (token: string) => {
  const response = await api.get('/agencies', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Récupérer la liste des équipes
export const getTeams = async (token: string) => {
  const response = await api.get('/teams', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
