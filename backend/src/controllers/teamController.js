import prisma from '../config/db.js';

// ✅ Récupérer toutes les équipes
export const getTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany();
    res.status(200).json(teams);
  } catch (error) {
    console.error("Erreur lors de la récupération des équipes :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Créer une équipe
export const createTeam = async (req, res) => {
  try {
    const { name, agencyId } = req.body;

    if (!name || !agencyId) {
      return res.status(400).json({ message: "Le nom de l'équipe et l'agence sont obligatoires." });
    }

    const newTeam = await prisma.team.create({
      data: { name, agencyId, createdAt: new Date() },
    });

    res.status(201).json(newTeam);
  } catch (error) {
    console.error("Erreur lors de la création de l'équipe :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Modifier une équipe
export const modifyTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, agencyId } = req.body;

    const updatedTeam = await prisma.team.update({
      where: { id },
      data: { name, agencyId },
    });

    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("Erreur lors de la modification de l'équipe :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Supprimer une équipe
export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.team.delete({ where: { id } });

    res.status(200).json({ message: "Équipe supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'équipe :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
