import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// 📌 Vérification du token JWT
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(403).json({ message: "Accès interdit, token manquant." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide ou expiré." });
    }
};

// 📌 Vérification si l'utilisateur est admin (PDG)
export const isAdmin = (req, res, next) => {
    if (req.user.role !== "PDG") return res.status(403).json({ message: "Accès réservé aux administrateurs." });
    next();
};
