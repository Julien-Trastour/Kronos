import prisma from '../config/db.js';

// ✅ Récupérer toutes les équipes
export const getAllTeams = async () => {
  return prisma.team.findMany({
    include: {
      agency: { // ✅ Récupère l'agence associée
        select: { id: true, name: true },
      },
      parentTeam: { // ✅ Récupère l'équipe parente
        select: { id: true, name: true },
      },
    },
  });
};

// ✅ Trouver une équipe par son ID
export const findTeamById = async (id) => {
  return prisma.team.findUnique({ where: { id } });
};

// ✅ Créer une équipe
export const createTeamModel = async (name, agencyId) => {
  return prisma.team.create({ data: { name, agencyId, createdAt: new Date() } });
};

// ✅ Modifier une équipe
export const updateTeamModel = async (id, data) => {
  return prisma.team.update({ where: { id }, data });
};

// ✅ Supprimer une équipe
export const deleteTeamModel = async (id) => {
  return prisma.team.delete({ where: { id } });
};
