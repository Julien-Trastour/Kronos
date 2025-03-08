import express from 'express';
import { getTeams, createTeam, modifyTeam, deleteTeam } from '../controllers/teamController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Récupérer toutes les équipes
router.get('/', authenticate, getTeams);

// ✅ Créer une équipe
router.post('/', authenticate, createTeam);

// ✅ Modifier une équipe
router.put('/:id', authenticate, modifyTeam);

// ✅ Supprimer une équipe
router.delete('/:id', authenticate, deleteTeam);

export default router;
