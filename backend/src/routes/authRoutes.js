import express from 'express';
import { login, logout } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// ✅ Ajout de rate limiting pour limiter les tentatives de connexion
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limite à 5 tentatives par IP
  message: "Trop de tentatives de connexion, réessayez plus tard."
});

// ✅ Route de connexion
router.post('/login', loginLimiter, login);

// ✅ Route de déconnexion
router.post('/logout', logout);

export default router;
