import express from "express";
import { getRoles, createRole, deleteRole } from "../controllers/rolesController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 📌 Récupérer tous les rôles (accessible aux admins)
router.get("/", verifyToken, isAdmin, getRoles);

// 📌 Créer un rôle (accessible aux admins)
router.post("/", verifyToken, isAdmin, createRole);

// 📌 Supprimer un rôle (accessible aux admins)
router.delete("/:id", verifyToken, isAdmin, deleteRole);

export default router;
