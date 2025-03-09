import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findEmployeeByEmail } from '../models/employeeModel.js';
import { addToBlacklist } from '../middleware/blacklistMiddleware.js';

dotenv.config();

// ✅ Vérification que JWT_SECRET est bien défini
if (!process.env.JWT_SECRET) {
  console.error("❌ ERREUR : JWT_SECRET est manquant dans le fichier .env");
  process.exit(1); // Arrête le serveur si le secret est manquant
}

// ✅ Connexion utilisateur
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findEmployeeByEmail(email);

    if (!user) return next({ status: 401, message: "Utilisateur non trouvé." });

    const passwordMatch = await argon2.verify(user.password, password);
    if (!passwordMatch) return next({ status: 401, message: "Mot de passe incorrect." });

    const token = jwt.sign(
      { userId: user.id, role: user.role.name },
      process.env.JWT_SECRET,
      { expiresIn: '2h', algorithm: 'HS256' }
    );

    res.status(200).json({ token, role: user.role.name });
  } catch (error) {
    next(error);
  }
};

// ✅ Déconnexion (Ajout en liste noire via middleware)
export const logout = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(400).json({ message: "Aucun token fourni." });

    addToBlacklist(token);

    res.status(200).json({ message: "Déconnexion réussie." });
  } catch (error) {
    next(error);
  }
};
