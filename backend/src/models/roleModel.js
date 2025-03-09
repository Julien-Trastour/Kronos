import prisma from '../config/db.js';

// ✅ Récupérer tous les rôles avec leur rôle parent
export const getAllRoles = async () => {
  return prisma.role.findMany({
    select: {
      id: true,
      name: true,
      parentRole: { select: { id: true, name: true } },
      createdAt: true,
    },
  });
};

// ✅ Trouver un rôle par son ID
export const findRoleById = async (id) => {
  return prisma.role.findUnique({ where: { id } });
};

// ✅ Créer un rôle
export const createRoleModel = async (name, parentRoleId) => {
  return prisma.role.create({ data: { name, parentRoleId } });
};

// ✅ Modifier un rôle
export const updateRoleModel = async (id, data) => {
  return prisma.role.update({ where: { id }, data });
};

// ✅ Supprimer un rôle
export const deleteRoleModel = async (id) => {
  return prisma.role.delete({ where: { id } });
};
