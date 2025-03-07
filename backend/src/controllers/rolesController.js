import prisma from "../config/db.js";

// 📌 Récupérer tous les rôles
export async function getRoles(req, res) {
    try {
        const roles = await prisma.role.findMany();
        res.json(roles);
    } catch (error) {
        console.error("Erreur lors de la récupération des rôles:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

// 📌 Créer un rôle
export async function createRole(req, res) {
    try {
        const { name } = req.body;
        const existingRole = await prisma.role.findUnique({ where: { name } });

        if (existingRole) return res.status(400).json({ message: "Ce rôle existe déjà." });

        const newRole = await prisma.role.create({ data: { name } });
        res.status(201).json({ message: "Rôle créé avec succès", role: newRole });
    } catch (error) {
        console.error("Erreur lors de la création du rôle:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

// 📌 Supprimer un rôle
export async function deleteRole(req, res) {
    try {
        const { id } = req.params;
        await prisma.role.delete({ where: { id } });
        res.json({ message: "Rôle supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du rôle:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}
