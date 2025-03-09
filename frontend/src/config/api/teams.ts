import { api, handleRequest } from './api';

// 🔹 GESTION DES ÉQUIPES

export const getTeams = async (token: string) =>
  handleRequest(api.get('/teams', { headers: { Authorization: `Bearer ${token}` } }));

export const createTeam = async (
  token: string,
  name: string,
  agencyId: string,
  parentTeamId?: string | null // ✅ Ajout de parentTeamId (optionnel)
) =>
  handleRequest(api.post('/teams', { name, agencyId, parentTeamId }, { headers: { Authorization: `Bearer ${token}` } }));

export const updateTeam = async (
  token: string,
  id: string,
  name: string,
  agencyId: string,
  parentTeamId?: string | null // ✅ Ajout de parentTeamId (optionnel)
) =>
  handleRequest(api.put(`/teams/${id}`, { name, agencyId, parentTeamId }, { headers: { Authorization: `Bearer ${token}` } }));

export const deleteTeam = async (token: string, id: string) =>
  handleRequest(api.delete(`/teams/${id}`, { headers: { Authorization: `Bearer ${token}` } }));
