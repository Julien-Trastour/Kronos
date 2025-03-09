import prisma from '../config/db.js';
import argon2 from 'argon2';

// ✅ Trouver un employé par email
export const findEmployeeByEmail = async (email) => {
  return prisma.employee.findUnique({
    where: { email },
    include: { role: true },
  });
};

// ✅ Récupérer tous les employés avec leur rôle, agence et équipe
export const getAllEmployees = async () => {
  return prisma.employee.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      status: true,
      role: { select: { id: true, name: true } },
      agency: { select: { name: true } },
      team: { select: { name: true } },
    },
  });
};

// ✅ Vérifier si un employé existe par email
export const checkEmployeeEmailExists = async (email) => {
  return prisma.employee.findUnique({ where: { email } });
};

// ✅ Créer un employé avec un mot de passe sécurisé
export const createEmployeeModel = async (data) => {
  const password = Math.random().toString(36).slice(-8);
  const hashedPassword = await argon2.hash(password);

  return prisma.employee.create({
    data: {
      ...data,
      password: hashedPassword,
      status: "Actif",
    },
  });
};

// ✅ Modifier un employé
export const updateEmployeeModel = async (id, data) => {
  return prisma.employee.update({
    where: { id },
    data,
  });
};

// ✅ Supprimer un employé
export const deleteEmployeeModel = async (id) => {
  return prisma.employee.delete({ where: { id } });
};
