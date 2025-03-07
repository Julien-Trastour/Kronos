import express from "express";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/usersController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 📌 Récupérer tous les utilisateurs (accessible uniquement aux admins)
router.get("/", verifyToken, isAdmin, getUsers);

// 📌 Récupérer un utilisateur par ID (accessible à l'utilisateur lui-même et aux admins)
router.get("/:id", verifyToken, getUserById);

// 📌 Mettre à jour un utilisateur (seulement pour l'utilisateur lui-même ou un admin)
router.put("/:id", verifyToken, updateUser);

// 📌 Supprimer un utilisateur (seulement un admin)
router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;
