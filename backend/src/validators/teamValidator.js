import Joi from 'joi';

// ✅ Schéma de validation pour créer une équipe
export const createTeamSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  agencyId: Joi.string().uuid().required(),
  parentTeamId: Joi.string().uuid().allow(null).optional(), // ✅ Ajout de parentTeamId (optionnel)
});

// ✅ Schéma de validation pour modifier une équipe (identique à `createTeamSchema`)
export const updateTeamSchema = createTeamSchema;
