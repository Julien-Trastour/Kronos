import {
  getAllTeams,
  findTeamById,
  createTeamModel,
  updateTeamModel,
  deleteTeamModel,
} from '../models/teamModel.js';

import { createTeamSchema, updateTeamSchema } from '../validators/teamValidator.js';

// ✅ Récupérer toutes les équipes
export const getTeams = async (req, res, next) => {
  try {
    const teams = await getAllTeams();
    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};

// ✅ Créer une équipe
export const createTeam = async (req, res, next) => {
  const { error } = createTeamSchema.validate(req.body);
  if (error) return next(error);

  try {
    const { name, agencyId } = req.body;
    const newTeam = await createTeamModel(name, agencyId);
    res.status(201).json(newTeam);
  } catch (error) {
    next(error);
  }
};

// ✅ Modifier une équipe
export const updateTeam = async (req, res, next) => {
  const { error } = updateTeamSchema.validate(req.body);
  if (error) return next(error);

  try {
    const { id } = req.params;
    const existingTeam = await findTeamById(id);
    if (!existingTeam) return next({ status: 404, message: "Équipe non trouvée." });

    const updatedTeam = await updateTeamModel(id, req.body);
    res.status(200).json(updatedTeam);
  } catch (error) {
    next(error);
  }
};

// ✅ Supprimer une équipe
export const deleteTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingTeam = await findTeamById(id);
    if (!existingTeam) return next({ status: 404, message: "Équipe non trouvée." });

    await deleteTeamModel(id);
    res.status(200).json({ message: "Équipe supprimée avec succès." });
  } catch (error) {
    next(error);
  }
};
