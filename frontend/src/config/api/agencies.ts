import { api, handleRequest } from './api';

// 🔹 GESTION DES AGENCES

export const getAgencies = async (token: string) =>
  handleRequest(api.get('/agencies', { headers: { Authorization: `Bearer ${token}` } }));

export const createAgency = async (
  token: string,
  agencyData: { name: string; typeId: string; address: string; postalCode: string; city: string; status: string }
) =>
  handleRequest(api.post('/agencies', agencyData, { headers: { Authorization: `Bearer ${token}` } }));

export const updateAgency = async (
  token: string,
  id: string,
  agencyData: { name?: string; typeId?: string; address?: string; postalCode?: string; city?: string; status?: string }
) =>
  handleRequest(api.put(`/agencies/${id}`, agencyData, { headers: { Authorization: `Bearer ${token}` } }));

export const deleteAgency = async (token: string, id: string) =>
  handleRequest(api.delete(`/agencies/${id}`, { headers: { Authorization: `Bearer ${token}` } }));

// 🔹 GESTION DES TYPES D'AGENCES

export const getAgencyTypes = async (token: string) =>
  handleRequest(api.get('/agencies/types', { headers: { Authorization: `Bearer ${token}` } }));

export const createAgencyType = async (token: string, name: string) =>
  handleRequest(api.post('/agencies/types', { name }, { headers: { Authorization: `Bearer ${token}` } }));

export const updateAgencyType = async (token: string, id: string, name: string) =>
  handleRequest(api.put(`/agencies/types/${id}`, { name }, { headers: { Authorization: `Bearer ${token}` } }));

export const deleteAgencyType = async (token: string, id: string) =>
  handleRequest(api.delete(`/agencies/types/${id}`, { headers: { Authorization: `Bearer ${token}` } }));
