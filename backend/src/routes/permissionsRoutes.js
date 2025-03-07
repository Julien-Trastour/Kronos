import express from "express";
import { getPermissions, assignPermissionToRole, removePermissionFromRole } from "../controllers/permissionsController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 📌 Récupérer toutes les permissions (accessible aux admins)
router.get("/", verifyToken, isAdmin, getPermissions);

// 📌 Attribuer une permission à un rôle
router.post("/assign", verifyToken, isAdmin, assignPermissionToRole);

// 📌 Retirer une permission d'un rôle
router.post("/remove", verifyToken, isAdmin, removePermissionFromRole);

export default router;
