import express from 'express';
import {
  getAgencies,
  createAgency,
  modifyAgency,
  deleteAgency,
  getAgencyTypes,
  createAgencyType,
  modifyAgencyType,
  deleteAgencyType
} from '../controllers/agencyController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Récupérer toutes les agences
router.get('/', authenticate, getAgencies);

// ✅ Créer une agence
router.post('/', authenticate, createAgency);

// ✅ Modifier une agence
router.put('/:id', authenticate, modifyAgency);

// ✅ Supprimer une agence
router.delete('/:id', authenticate, deleteAgency);

// ✅ Récupérer la liste des types d'agences
router.get('/types', authenticate, getAgencyTypes);

// ✅ Créer un type d'agence
router.post('/types', authenticate, createAgencyType);

// ✅ Modifier un type d'agence
router.put('/types/:id', authenticate, modifyAgencyType);

// ✅ Supprimer un type d'agence
router.delete('/types/:id', authenticate, deleteAgencyType);

export default router;
