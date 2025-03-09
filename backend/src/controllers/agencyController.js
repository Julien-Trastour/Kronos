import prisma from '../config/db.js';

// 🔹 Récupérer toutes les agences avec leur type d'agence
export const getAgencies = async (req, res) => {
  try {
    const agencies = await prisma.agency.findMany({
      select: {
        id: true,
        name: true,
        typeId: true,
        type: { select: { id: true, name: true } }, // ✅ Inclut les infos du type
        address: true,
        postalCode: true,
        city: true,
        status: true,
      },
    });
    res.status(200).json(agencies);
  } catch (error) {
    console.error("Erreur lors de la récupération des agences :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// 🔹 Créer une agence
export const createAgency = async (req, res) => {
  try {
    const { name, typeId, address, postalCode, city, status } = req.body;

    if (!name || !typeId || !address || !postalCode || !city || !status) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    // Vérifier si le type d'agence existe
    const existingType = await prisma.agencyType.findUnique({ where: { id: typeId } });
    if (!existingType) {
      return res.status(400).json({ message: "Type d'agence invalide." });
    }

    const newAgency = await prisma.agency.create({
      data: { name, typeId, address, postalCode, city, status },
    });

    res.status(201).json(newAgency);
  } catch (error) {
    console.error("Erreur lors de la création de l'agence :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// 🔹 Modifier une agence
export const modifyAgency = async (req, res) => {
  try {
    const { name, typeId, address, postalCode, city, status } = req.body;
    const { id } = req.params;

    if (!name || !typeId || !address || !postalCode || !city || !status) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    // Vérifier si l'agence existe
    const existingAgency = await prisma.agency.findUnique({ where: { id } });
    if (!existingAgency) {
      return res.status(404).json({ message: "Agence non trouvée." });
    }

    // Vérifier si le type d'agence existe
    const existingType = await prisma.agencyType.findUnique({ where: { id: typeId } });
    if (!existingType) {
      return res.status(400).json({ message: "Type d'agence invalide." });
    }

    const updatedAgency = await prisma.agency.update({
      where: { id },
      data: { name, typeId, address, postalCode, city, status },
    });

    res.status(200).json(updatedAgency);
  } catch (error) {
    console.error("Erreur lors de la modification de l'agence :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// 🔹 Supprimer une agence
export const deleteAgency = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'agence existe
    const existingAgency = await prisma.agency.findUnique({ where: { id } });
    if (!existingAgency) {
      return res.status(404).json({ message: "Agence non trouvée." });
    }

    await prisma.agency.delete({ where: { id } });

    res.status(200).json({ message: "Agence supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'agence :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// 🔹 Récupérer la liste des types d'agences
export const getAgencyTypes = async (req, res) => {
  try {
    const agencyTypes = await prisma.agencyType.findMany();
    res.status(200).json(agencyTypes);
  } catch (error) {
    console.error("Erreur lors de la récupération des types d'agences :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// 🔹 Créer un type d'agence
export const createAgencyType = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Le nom du type d'agence est requis." });
    }

    const newType = await prisma.agencyType.create({
      data: { name },
    });

    res.status(201).json(newType);
  } catch (error) {
    console.error("Erreur lors de la création du type d'agence :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// 🔹 Modifier un type d'agence
export const modifyAgencyType = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).json({ message: "Le nom du type d'agence est requis." });
    }

    const existingType = await prisma.agencyType.findUnique({ where: { id } });
    if (!existingType) {
      return res.status(404).json({ message: "Type d'agence non trouvé." });
    }

    const updatedType = await prisma.agencyType.update({
      where: { id },
      data: { name },
    });

    res.status(200).json(updatedType);
  } catch (error) {
    console.error("Erreur lors de la modification du type d'agence :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// 🔹 Supprimer un type d'agence
export const deleteAgencyType = async (req, res) => {
  try {
    const { id } = req.params;

    const existingType = await prisma.agencyType.findUnique({ where: { id } });
    if (!existingType) {
      return res.status(404).json({ message: "Type d'agence non trouvé." });
    }

    await prisma.agencyType.delete({ where: { id } });

    res.status(200).json({ message: "Type d'agence supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du type d'agence :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
