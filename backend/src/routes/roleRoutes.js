import express from 'express';
import { getRoles, createRole, updateRole, deleteRole } from '../controllers/roleController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Récupérer la liste des rôles
router.get('/', authenticate, getRoles);

// ✅ Créer un rôle
router.post('/', authenticate, createRole);

// ✅ Modifier un rôle
router.put('/:id', authenticate, updateRole);

// ✅ Supprimer un rôle
router.delete('/:id', authenticate, deleteRole);

export default router;
