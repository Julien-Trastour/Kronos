import Joi from 'joi';

// ✅ Schéma de validation pour créer un employé
export const createEmployeeSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  roleId: Joi.string().uuid().required(),
  agencyId: Joi.string().uuid().optional(),
  teamId: Joi.string().uuid().optional(),
  status: Joi.string().valid("Actif", "Inactif").default("Actif"),
});

// ✅ Schéma de validation pour modifier un employé
export const updateEmployeeSchema = createEmployeeSchema.keys({
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  roleId: Joi.string().uuid().optional(),
  agencyId: Joi.string().uuid().optional(),
  teamId: Joi.string().uuid().optional(),
  status: Joi.string().valid("Actif", "Inactif").optional(),
});
