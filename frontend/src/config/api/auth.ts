import { api, handleRequest } from './api';

export const login = async (email: string, password: string) =>
  handleRequest(api.post('/auth/login', { email, password }));
