import {
  getAllEmployees,
  createEmployeeModel,
  updateEmployeeModel,
  deleteEmployeeModel,
  checkEmployeeEmailExists,
} from '../models/employeeModel.js';

import { createEmployeeSchema, updateEmployeeSchema } from '../validators/employeeValidator.js';

// ✅ Récupérer tous les employés
export const getEmployees = async (req, res, next) => {
  try {
    const employees = await getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

// ✅ Créer un employé
export const createEmployee = async (req, res, next) => {
  const { error } = createEmployeeSchema.validate(req.body);
  if (error) return next(error);

  try {
    const { email } = req.body;

    const existingEmployee = await checkEmployeeEmailExists(email);
    if (existingEmployee) return next({ status: 400, message: "Cet email est déjà utilisé." });

    const newEmployee = await createEmployeeModel(req.body);
    res.status(201).json({ message: "Employé créé avec succès.", newEmployee });
  } catch (error) {
    next(error);
  }
};

// ✅ Modifier un employé
export const updateEmployee = async (req, res, next) => {
  const { error } = updateEmployeeSchema.validate(req.body);
  if (error) return next(error);

  try {
    const { id } = req.params;
    const updatedEmployee = await updateEmployeeModel(id, req.body);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

// ✅ Supprimer un employé
export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteEmployeeModel(id);
    res.status(200).json({ message: "Employé supprimé avec succès." });
  } catch (error) {
    next(error);
  }
};
