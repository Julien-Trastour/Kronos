import { api, handleRequest } from './api';

export const getTeams = async (token: string) =>
  handleRequest(api.get('/teams', { headers: { Authorization: `Bearer ${token}` } }));
