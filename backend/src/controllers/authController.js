import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findEmployeeByEmail } from '../models/employeeModel.js';

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("❌ ERREUR : JWT_SECRET est manquant dans le fichier .env");
  process.exit(1); // Arrête le serveur si le secret est manquant
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findEmployeeByEmail(email);
    if (!user) return res.status(401).json({ message: "Utilisateur non trouvé." });

    const passwordMatch = await argon2.verify(user.password, password);
    if (!passwordMatch) return res.status(401).json({ message: "Mot de passe incorrect." });

    const token = jwt.sign(
      { userId: user.id, role: user.role.name },
      process.env.JWT_SECRET,
      { expiresIn: '2h', algorithm: 'HS256' } // Ajout de l'algorithme sécurisé
    );

    res.status(200).json({ token, role: user.role.name });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
