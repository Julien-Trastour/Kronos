import { api, handleRequest } from './api';

export const getEmployees = async (token: string) =>
  handleRequest(api.get('/employees', { headers: { Authorization: `Bearer ${token}` } }));

export const addEmployee = async (token: string, employeeData: any) =>
  handleRequest(api.post('/employees', employeeData, { headers: { Authorization: `Bearer ${token}` } }));

export const updateEmployee = async (token: string, id: string, employeeData: any) => {
  const { id: _, role, agency, team, ...formattedData } = {
    ...employeeData,
    roleId: employeeData.roleId ?? undefined,
  };

  return handleRequest(api.put(`/employees/${id}`, formattedData, { headers: { Authorization: `Bearer ${token}` } }));
};

export const deleteEmployee = async (token: string, id: string) =>
  handleRequest(api.delete(`/employees/${id}`, { headers: { Authorization: `Bearer ${token}` } }));
