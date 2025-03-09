import Joi from 'joi';

// ✅ Schéma de validation pour créer un rôle
export const createRoleSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  parentRoleId: Joi.string().uuid().optional(),
});

// ✅ Schéma de validation pour modifier un rôle
export const updateRoleSchema = createRoleSchema.keys({
  name: Joi.string().min(3).max(100),
});
