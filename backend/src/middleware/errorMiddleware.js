const errorMiddleware = (err, req, res, next) => {
    console.error("❌ Erreur capturée :", err);
  
    // Détection des erreurs de validation Joi
    if (err.isJoi) {
      return res.status(400).json({ message: err.details[0].message });
    }
  
    // Détection des erreurs Prisma (base de données)
    if (err.code === 'P2002') {
      return res.status(400).json({ message: "Violation d'unicité : cette valeur existe déjà." });
    }
  
    // Détection des erreurs personnalisées
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }
  
    // Erreur serveur générique
    res.status(500).json({ message: "Erreur interne du serveur." });
  };
  
  export default errorMiddleware;
  