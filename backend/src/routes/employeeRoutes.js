import express from 'express';
import { fetchEmployees, createEmployee } from '../controllers/employeeController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route protégée pour récupérer la liste des employés
router.get('/', authenticate, fetchEmployees);

// Route protégée pour ajouter un employé
router.post('/', authenticate, createEmployee);

export default router;