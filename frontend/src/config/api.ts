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

// Fonction pour modifier un employé
export const updateEmployee = async (token: string, id: string, employeeData: any) => {
  const response = await api.put(`/employees/${id}`, employeeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fonction pour supprimer un employé
export const deleteEmployee = async (token: string, id: string) => {
  const response = await api.delete(`/employees/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 🔹 GESTION DES RÔLES

// Récupérer la liste des rôles
export const getRoles = async (token: string) => {
  const response = await api.get('/roles', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Ajouter un rôle
export const createRole = async (token: string, name: string) => {
  const response = await api.post('/roles', { name }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Modifier un rôle
export const updateRole = async (token: string, id: string, name: string) => {
  const response = await api.put(`/roles/${id}`, { name }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Supprimer un rôle
export const deleteRole = async (token: string, id: string) => {
  const response = await api.delete(`/roles/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 🔹 GESTION DES AGENCES

// Récupérer la liste des agences
export const getAgencies = async (token: string) => {
  const response = await api.get('/agencies', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Ajouter une agence
export const createAgency = async (token: string, agencyData: any) => {
  const response = await api.post('/agencies', agencyData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Modifier une agence
export const updateAgency = async (token: string, id: string, agencyData: any) => {
  const response = await api.put(`/agencies/${id}`, agencyData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Supprimer une agence
export const deleteAgency = async (token: string, id: string) => {
  const response = await api.delete(`/agencies/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 🔹 GESTION DES ÉQUIPES

// Récupérer la liste des équipes
export const getTeams = async (token: string) => {
  const response = await api.get('/teams', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
