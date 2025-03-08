import { getAllEmployees } from '../models/employeeModel.js';
import prisma from '../config/db.js';
import argon2 from 'argon2';

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

// Ajouter un employé
export const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, roleId, agencyId, teamId } = req.body;

    // Vérification des données
    if (!firstName || !lastName || !email || !roleId) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    // Vérifier si l'email existe déjà
    const existingEmployee = await prisma.employee.findUnique({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Générer un mot de passe sécurisé
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await argon2.hash(password);

    // Créer l'employé en base
    const newEmployee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roleId,
        agencyId,
        teamId,
        status: "Actif"
      }
    });

    console.log(`✅ Employé créé : ${newEmployee.email}, Mot de passe : ${password}`);

    res.status(201).json({ message: "Employé créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création d'un employé :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};