import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    console.log("⛔ Requête refusée : Aucun token fourni");
    return res.status(401).json({ message: 'Accès refusé.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("⛔ Token invalide !");
    res.status(401).json({ message: 'Token invalide.' });
  }
};
