import {
  getAllRoles,
  findRoleById,
  createRoleModel,
  updateRoleModel,
  deleteRoleModel,
} from '../models/roleModel.js';

import { createRoleSchema, updateRoleSchema } from '../validators/roleValidator.js';

// ✅ Récupérer tous les rôles
export const getRoles = async (req, res, next) => {
  try {
    const roles = await getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

// ✅ Créer un rôle
export const createRole = async (req, res, next) => {
  const { error } = createRoleSchema.validate(req.body);
  if (error) return next(error);

  try {
    const { name, parentRoleId } = req.body;
    const newRole = await createRoleModel(name, parentRoleId);
    res.status(201).json(newRole);
  } catch (error) {
    next(error);
  }
};

// ✅ Modifier un rôle
export const updateRole = async (req, res, next) => {
  const { error } = updateRoleSchema.validate(req.body);
  if (error) return next(error);

  try {
    const { id } = req.params;
    const existingRole = await findRoleById(id);
    if (!existingRole) return next({ status: 404, message: "Rôle non trouvé." });

    const updatedRole = await updateRoleModel(id, req.body);
    res.status(200).json(updatedRole);
  } catch (error) {
    next(error);
  }
};

// ✅ Supprimer un rôle
export const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingRole = await findRoleById(id);
    if (!existingRole) return next({ status: 404, message: "Rôle non trouvé." });

    await deleteRoleModel(id);
    res.status(200).json({ message: "Rôle supprimé avec succès." });
  } catch (error) {
    next(error);
  }
};
