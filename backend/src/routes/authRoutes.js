import express from 'express';
import multer from 'multer';
import path from 'path';
import { login, logout, uploadAvatar } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Ajout de rate limiting pour limiter les tentatives de connexion
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limite à 5 tentatives par IP
  message: "Trop de tentatives de connexion, réessayez plus tard.",
});

// ✅ Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../avatars'));
  },
  filename: (req, file, cb) => {
    const userId = req.user?.userId;
    if (!userId) return cb(new Error("Utilisateur non authentifié"), "");

    cb(null, `${userId}.png`);
  },
});

const upload = multer({ storage });

// ✅ Vérifie que le fichier est bien reçu
router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Aucun fichier fourni." });

  console.log(`🖼️ Avatar enregistré : ${req.file.filename}`);

  res.status(200).json({ message: "Avatar mis à jour avec succès !" });
});

// ✅ Route de connexion
router.post('/login', loginLimiter, login);

// ✅ Route de déconnexion
router.post('/logout', logout);

// ✅ Route pour uploader un avatar (⚡ Nécessite authentification)
router.post('/upload-avatar', authenticate, upload.single('avatar'), uploadAvatar);

export default router;
