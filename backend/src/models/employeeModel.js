import prisma from '../config/db.js';

export const findEmployeeByEmail = async (email) => {
  return prisma.employee.findUnique({
    where: { email },
    include: { role: true },
  });
};

// Récupérer tous les employés avec leur rôle, agence et équipe
export const getAllEmployees = async () => {
  return prisma.employee.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      status: true,
      role: { select: { name: true } },
      agency: { select: { name: true } },
      team: { select: { name: true } },
    },
  });
};
