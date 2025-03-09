import prisma from '../config/db.js';

// ✅ Récupérer tous les rôles avec leur rôle parent
export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
        parentRole: {  // ✅ Accès au rôle parent via relation
          select: { id: true, name: true }
        },
        createdAt: true,
      },
    });
    res.status(200).json(roles);
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Créer un rôle avec option parentRoleId
export const createRole = async (req, res) => {
  try {
    const { name, parentRoleId } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Le nom du rôle est requis." });
    }

    // Vérifier si le rôle parent existe (si fourni)
    if (parentRoleId) {
      const parentRole = await prisma.role.findUnique({ where: { id: parentRoleId } });
      if (!parentRole) {
        return res.status(400).json({ message: "Le rôle parent fourni est invalide." });
      }
    }

    const newRole = await prisma.role.create({
      data: { name, parentRoleId },
    });

    res.status(201).json(newRole);
  } catch (error) {
    console.error("Erreur lors de la création d'un rôle :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Modifier un rôle (nom et parentRoleId)
export const modifyRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parentRoleId } = req.body;

    // Vérifier si le rôle existe
    const existingRole = await prisma.role.findUnique({ where: { id } });
    if (!existingRole) {
      return res.status(404).json({ message: "Rôle non trouvé." });
    }

    // Vérifier si le rôle parent existe (si fourni)
    if (parentRoleId) {
      const parentRole = await prisma.role.findUnique({ where: { id: parentRoleId } });
      if (!parentRole) {
        return res.status(400).json({ message: "Le rôle parent fourni est invalide." });
      }
    }

    const updatedRole = await prisma.role.update({
      where: { id },
      data: { name, parentRoleId },
    });

    res.status(200).json(updatedRole);
  } catch (error) {
    console.error("Erreur lors de la modification du rôle :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Supprimer un rôle (vérifie si des rôles enfants existent)
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si le rôle a des rôles enfants avant suppression
    const childRoles = await prisma.role.findMany({ where: { parentRoleId: id } });
    if (childRoles.length > 0) {
      return res.status(400).json({ message: "Impossible de supprimer un rôle avec des sous-rôles." });
    }

    await prisma.role.delete({ where: { id } });

    res.status(200).json({ message: "Rôle supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du rôle :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
