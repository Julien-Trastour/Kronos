import prisma from '../config/db.js';

// ✅ Récupérer toutes les agences
export const getAgencies = async (req, res) => {
  try {
    const agencies = await prisma.agency.findMany();
    res.status(200).json(agencies);
  } catch (error) {
    console.error("Erreur lors de la récupération des agences :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Créer une agence
export const createAgency = async (req, res) => {
  try {
    const { name, type, address, postalCode, city, status } = req.body;

    if (!name || !type || !address || !postalCode || !city || !status) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    const newAgency = await prisma.agency.create({
      data: { name, type, address, postalCode, city, status, createdAt: new Date() },
    });

    res.status(201).json(newAgency);
  } catch (error) {
    console.error("Erreur lors de la création de l'agence :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Modifier une agence
export const modifyAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, address, postalCode, city, status } = req.body;

    const updatedAgency = await prisma.agency.update({
      where: { id },
      data: { name, type, address, postalCode, city, status },
    });

    res.status(200).json(updatedAgency);
  } catch (error) {
    console.error("Erreur lors de la modification de l'agence :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Supprimer une agence
export const deleteAgency = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.agency.delete({ where: { id } });

    res.status(200).json({ message: "Agence supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'agence :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
