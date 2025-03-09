import { api, handleRequest } from './api';

export const login = async (email: string, password: string) =>
  handleRequest(api.post('/auth/login', { email, password }));

export const logout = async (token: string) =>
  handleRequest(api.post('/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } }));
