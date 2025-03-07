import prisma from "../config/db.js";

// 📌 Récupérer toutes les permissions
export async function getPermissions(req, res) {
    try {
        const permissions = await prisma.permission.findMany();
        res.json(permissions);
    } catch (error) {
        console.error("Erreur lors de la récupération des permissions:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

// 📌 Attribuer une permission à un rôle
export async function assignPermissionToRole(req, res) {
    try {
        const { roleId, permissionId } = req.body;

        await prisma.rolePermission.create({
            data: { roleId, permissionId }
        });

        res.json({ message: "Permission attribuée au rôle avec succès." });
    } catch (error) {
        console.error("Erreur lors de l'attribution de la permission:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

// 📌 Retirer une permission d'un rôle
export async function removePermissionFromRole(req, res) {
    try {
        const { roleId, permissionId } = req.body;

        await prisma.rolePermission.deleteMany({
            where: { roleId, permissionId }
        });

        res.json({ message: "Permission retirée du rôle avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression de la permission:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}
