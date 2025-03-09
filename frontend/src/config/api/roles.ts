import { api, handleRequest } from './api';

export const getRoles = async (token: string) =>
  handleRequest(api.get('/roles', { headers: { Authorization: `Bearer ${token}` } }));

export const createRole = async (token: string, name: string, parentRoleId?: string) =>
  handleRequest(api.post('/roles', { name, parentRoleId }, { headers: { Authorization: `Bearer ${token}` } }));

export const updateRole = async (token: string, id: string, name: string, parentRoleId?: string) =>
  handleRequest(api.put(`/roles/${id}`, { name, parentRoleId }, { headers: { Authorization: `Bearer ${token}` } }));

export const deleteRole = async (token: string, id: string) =>
  handleRequest(api.delete(`/roles/${id}`, { headers: { Authorization: `Bearer ${token}` } }));
