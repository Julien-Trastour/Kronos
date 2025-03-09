const blacklistedTokens = new Set(); // ⚠️ Stockage en mémoire (disparaît si le serveur redémarre)

// ✅ Middleware pour vérifier si un token est blacklisté
export const checkBlacklist = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token && blacklistedTokens.has(token)) {
    return res.status(401).json({ message: "Token invalide. Veuillez vous reconnecter." });
  }
  next();
};

// ✅ Fonction pour ajouter un token à la blacklist
export const addToBlacklist = (token) => {
  blacklistedTokens.add(token);
};
