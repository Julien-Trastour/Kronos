import Joi from 'joi';

// ✅ Schéma de validation pour créer une agence
export const createAgencySchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  typeId: Joi.string().uuid().required(), // ✅ UUID string
  address: Joi.string().min(5).max(100).required(),
  postalCode: Joi.string().length(5).pattern(/^[0-9]+$/).required(),
  city: Joi.string().min(2).max(100).required(),
  status: Joi.string().valid('Actif', 'En sommeil', 'En construction').required(),
});

// ✅ Schéma de validation pour modifier une agence
export const updateAgencySchema = Joi.object({
  name: Joi.string().min(3).max(100),
  typeId: Joi.string().uuid(),
  address: Joi.string().min(5).max(100),
  postalCode: Joi.string().length(5).pattern(/^[0-9]+$/),
  city: Joi.string().min(2).max(100),
  status: Joi.string().valid('Actif', 'En sommeil', 'En construction'),
});
