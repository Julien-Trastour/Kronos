import { getAllEmployees } from '../models/employeeModel.js';

// Contrôleur pour récupérer tous les employés
export const fetchEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Erreur lors de la récupération des employés :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
