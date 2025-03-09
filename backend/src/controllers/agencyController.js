import {
  getAllAgencies,
  findAgencyById,
  createAgencyModel,
  updateAgencyModel,
  deleteAgencyModel,
  getAllAgencyTypes,
  findAgencyTypeById,
  createAgencyTypeModel,
  updateAgencyTypeModel,
  deleteAgencyTypeModel,
} from '../models/agencyModel.js';

import { createAgencySchema, updateAgencySchema } from '../validators/agencyValidator.js';

// ✅ Récupérer toutes les agences
export const getAgencies = async (req, res, next) => {
  try {
    const agencies = await getAllAgencies();
    res.status(200).json(agencies);
  } catch (error) {
    next(error);
  }
};

// ✅ Créer une agence (avec validation Joi)
export const createAgency = async (req, res, next) => {
  const { error } = createAgencySchema.validate(req.body);
  if (error) return next(error);

  try {
    const { name, typeId } = req.body;

    const existingType = await findAgencyTypeById(typeId);
    if (!existingType) return next({ status: 400, message: "Type d'agence invalide." });

    const newAgency = await createAgencyModel(req.body);
    res.status(201).json(newAgency);
  } catch (error) {
    next(error);
  }
};

// ✅ Modifier une agence (avec validation Joi)
export const updateAgency = async (req, res, next) => {
  const { error } = updateAgencySchema.validate(req.body);
  if (error) return next(error);

  try {
    const { id } = req.params;
    const existingAgency = await findAgencyById(id);
    if (!existingAgency) return next({ status: 404, message: "Agence non trouvée." });

    const updatedAgency = await updateAgencyModel(id, req.body);
    res.status(200).json(updatedAgency);
  } catch (error) {
    next(error);
  }
};

// ✅ Supprimer une agence
export const deleteAgency = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingAgency = await findAgencyById(id);
    if (!existingAgency) return next({ status: 404, message: "Agence non trouvée." });

    await deleteAgencyModel(id);
    res.status(200).json({ message: "Agence supprimée avec succès." });
  } catch (error) {
    next(error);
  }
};

// ✅ Récupérer la liste des types d'agences
export const getAgencyTypes = async (req, res, next) => {
  try {
    const agencyTypes = await getAllAgencyTypes();
    res.status(200).json(agencyTypes);
  } catch (error) {
    next(error);
  }
};

// ✅ Créer un type d'agence
export const createAgencyType = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return next({ status: 400, message: "Le nom du type d'agence est requis." });

    const newType = await createAgencyTypeModel(name);
    res.status(201).json(newType);
  } catch (error) {
    next(error);
  }
};

// ✅ Modifier un type d'agence
export const updateAgencyType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return next({ status: 400, message: "Le nom du type d'agence est requis." });

    const existingType = await findAgencyTypeById(id);
    if (!existingType) return next({ status: 404, message: "Type d'agence non trouvé." });

    const updatedType = await updateAgencyTypeModel(id, name);
    res.status(200).json(updatedType);
  } catch (error) {
    next(error);
  }
};

// ✅ Supprimer un type d'agence
export const deleteAgencyType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingType = await findAgencyTypeById(id);
    if (!existingType) return next({ status: 404, message: "Type d'agence non trouvé." });

    await deleteAgencyTypeModel(id);
    res.status(200).json({ message: "Type d'agence supprimé avec succès." });
  } catch (error) {
    next(error);
  }
};
