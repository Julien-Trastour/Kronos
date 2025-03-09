import Joi from 'joi';

// ✅ Schéma de validation pour créer une équipe
export const createTeamSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  agencyId: Joi.string().uuid().required(),
});

// ✅ Schéma de validation pour modifier une équipe
export const updateTeamSchema = createTeamSchema.keys({
  name: Joi.string().min(3).max(100),
});
