import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Mettre l'URL du backend

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔹 GESTION GLOBALE DES ERREURS
const handleRequest = async (request: Promise<any>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error: any) {
    console.error("Erreur API :", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Une erreur s'est produite.");
  }
};

// 🔹 AUTHENTIFICATION

export const login = async (email: string, password: string) =>
  handleRequest(api.post('/auth/login', { email, password }));

// 🔹 GESTION DES EMPLOYÉS

export const getEmployees = async (token: string) =>
  handleRequest(api.get('/employees', { headers: { Authorization: `Bearer ${token}` } }));

export const addEmployee = async (token: string, employeeData: any) =>
  handleRequest(api.post('/employees', employeeData, { headers: { Authorization: `Bearer ${token}` } }));

export const updateEmployee = async (token: string, id: string, employeeData: any) =>
  handleRequest(api.put(`/employees/${id}`, employeeData, { headers: { Authorization: `Bearer ${token}` } }));

export const deleteEmployee = async (token: string, id: string) =>
  handleRequest(api.delete(`/employees/${id}`, { headers: { Authorization: `Bearer ${token}` } }));

// 🔹 GESTION DES RÔLES

export const getRoles = async (token: string) =>
  handleRequest(api.get('/roles', { headers: { Authorization: `Bearer ${token}` } }));

export const createRole = async (token: string, name: string) =>
  handleRequest(api.post('/roles', { name }, { headers: { Authorization: `Bearer ${token}` } }));

export const updateRole = async (token: string, id: string, name: string) =>
  handleRequest(api.put(`/roles/${id}`, { name }, { headers: { Authorization: `Bearer ${token}` } }));

export const deleteRole = async (token: string, id: string) =>
  handleRequest(api.delete(`/roles/${id}`, { headers: { Authorization: `Bearer ${token}` } }));

// 🔹 GESTION DES AGENCES

export const getAgencies = async (token: string) =>
  handleRequest(api.get('/agencies', { headers: { Authorization: `Bearer ${token}` } }));

export const createAgency = async (token: string, agencyData: { name: string; typeId: string; address: string; postalCode: string; city: string; status: string }) =>
  handleRequest(api.post('/agencies', agencyData, { headers: { Authorization: `Bearer ${token}` } }));

export const updateAgency = async (token: string, id: string, agencyData: { name: string; typeId: string; address: string; postalCode: string; city: string; status: string }) =>
  handleRequest(api.put(`/agencies/${id}`, agencyData, { headers: { Authorization: `Bearer ${token}` } }));

export const deleteAgency = async (token: string, id: string) =>
  handleRequest(api.delete(`/agencies/${id}`, { headers: { Authorization: `Bearer ${token}` } }));

// 🔹 GESTION DES TYPES D'AGENCES

export const getAgencyTypes = async (token: string) =>
  handleRequest(api.get('/agencies/agency-types', { headers: { Authorization: `Bearer ${token}` } }));

// 🔹 GESTION DES ÉQUIPES

export const getTeams = async (token: string) =>
  handleRequest(api.get('/teams', { headers: { Authorization: `Bearer ${token}` } }));
