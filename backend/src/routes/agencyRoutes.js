import express from 'express';
import { getAgencies, createAgency, modifyAgency, deleteAgency, getAgencyTypes } from '../controllers/agencyController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Récupérer toutes les agences
router.get('/', authenticate, getAgencies);

// ✅ Récupérer la liste des types d'agences
router.get('/agency-types', authenticate, getAgencyTypes);

// ✅ Créer une agence
router.post('/', authenticate, createAgency);

// ✅ Modifier une agence
router.put('/:id', authenticate, modifyAgency);

// ✅ Supprimer une agence
router.delete('/:id', authenticate, deleteAgency);

export default router;
