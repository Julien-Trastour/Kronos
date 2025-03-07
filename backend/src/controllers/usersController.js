import prisma from "../config/db.js";

// 📌 Récupérer tous les utilisateurs (admin uniquement)
export async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: { select: { name: true } },
                entryDate: true,
                seniority: true,
            },
        });
        res.json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

// 📌 Récupérer un utilisateur par ID
export async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: { select: { name: true } },
                entryDate: true,
                seniority: true,
            },
        });

        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        // Vérification si l'utilisateur a le droit de voir ce profil
        if (req.user.role !== "PDG" && req.user.id !== id) {
            return res.status(403).json({ message: "Accès refusé" });
        }

        res.json(user);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

// 📌 Mettre à jour un utilisateur
export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { firstName, lastName } = req.body;

        if (req.user.id !== id && req.user.role !== "PDG") {
            return res.status(403).json({ message: "Accès refusé" });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { firstName, lastName, updatedAt: new Date() },
        });

        res.json({ message: "Utilisateur mis à jour", user: updatedUser });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

// 📌 Supprimer un utilisateur (admin uniquement)
export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        await prisma.user.delete({ where: { id } });
        res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}
