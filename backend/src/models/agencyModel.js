import prisma from '../config/db.js';

// ✅ Récupérer toutes les agences avec leur type d'agence
export const getAllAgencies = async () => {
  return prisma.agency.findMany({
    select: {
      id: true,
      name: true,
      typeId: true,
      type: { select: { id: true, name: true } },
      address: true,
      postalCode: true,
      city: true,
      status: true,
    },
  });
};

// ✅ Trouver une agence par ID
export const findAgencyById = async (id) => {
  return prisma.agency.findUnique({ where: { id } });
};

// ✅ Créer une agence
export const createAgencyModel = async (data) => {
  return prisma.agency.create({ data });
};

// ✅ Modifier une agence
export const updateAgencyModel = async (id, data) => {
  return prisma.agency.update({ where: { id }, data });
};

// ✅ Supprimer une agence
export const deleteAgencyModel = async (id) => {
  return prisma.agency.delete({ where: { id } });
};

// ✅ Récupérer tous les types d'agences
export const getAllAgencyTypes = async () => {
  return prisma.agencyType.findMany();
};

// ✅ Trouver un type d'agence par ID
export const findAgencyTypeById = async (id) => {
  return prisma.agencyType.findUnique({ where: { id } });
};

// ✅ Créer un type d'agence
export const createAgencyTypeModel = async (name) => {
  return prisma.agencyType.create({ data: { name } });
};

// ✅ Modifier un type d'agence
export const updateAgencyTypeModel = async (id, name) => {
  return prisma.agencyType.update({ where: { id }, data: { name } });
};

// ✅ Supprimer un type d'agence
export const deleteAgencyTypeModel = async (id) => {
  return prisma.agencyType.delete({ where: { id } });
};
