import express from 'express';
import { fetchEmployees } from '../controllers/employeeController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route protégée pour récupérer la liste des employés
router.get('/', authenticate, fetchEmployees);

export default router;
