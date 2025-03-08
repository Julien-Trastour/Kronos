import express from 'express';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route protégée pour récupérer la liste des employés
router.get('/', authenticate, fetchEmployees);

// Route protégée pour ajouter un employé
router.post('/', authenticate, createEmployee);

// Route protégée pour modifier un employé
router.put('/:id', authenticate, updateEmployee);

// Route protégée pour supprimer un employé
router.delete('/:id', authenticate, deleteEmployee);


export default router;