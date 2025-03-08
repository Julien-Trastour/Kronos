import prisma from '../config/db.js';

// ✅ Récupérer tous les rôles
export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.status(200).json(roles);
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Créer un rôle
export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Le nom du rôle est requis." });
    }

    const newRole = await prisma.role.create({
      data: { name },
    });

    res.status(201).json(newRole);
  } catch (error) {
    console.error("Erreur lors de la création d'un rôle :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Modifier un rôle
export const modifyRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedRole = await prisma.role.update({
      where: { id },
      data: { name },
    });

    res.status(200).json(updatedRole);
  } catch (error) {
    console.error("Erreur lors de la modification du rôle :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Supprimer un rôle
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.role.delete({ where: { id } });

    res.status(200).json({ message: "Rôle supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du rôle :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
