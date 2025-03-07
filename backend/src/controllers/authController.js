import prisma from "../config/db.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// 📌 Inscription
export async function register(req, res) {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "Cet email est déjà utilisé." });

        const roleData = await prisma.role.findUnique({ where: { name: role } });
        if (!roleData) return res.status(400).json({ message: "Rôle invalide." });

        const hashedPassword = await argon2.hash(password);

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                roleId: roleData.id,
                entryDate: new Date(),
                seniority: "0 ans",
            },
        });

        res.status(201).json({ message: "Utilisateur créé avec succès.", user });
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

// 📌 Connexion
export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });

        if (!user) {
            console.log("❌ L'utilisateur n'existe pas :", email);
            return res.status(400).json({ message: "Email ou mot de passe incorrect." });
        }

        const validPassword = await argon2.verify(user.password, password);
        console.log("🔹 Mot de passe en base:", user.password);
        console.log("🔹 Mot de passe reçu:", password);
        if (!validPassword) {
            console.log("❌ Mot de passe invalide pour :", email);
            return res.status(400).json({ message: "Email ou mot de passe incorrect." });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        console.log("✅ Connexion réussie, Tokens générés :", { token, refreshToken });

        res.json({ message: "Connexion réussie", token, refreshToken });
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

// 📌 Rafraîchir le token JWT
export async function refreshToken(req, res) {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ message: "Token manquant" });
        }

        console.log("🔹 Refresh Token reçu:", token);

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.log("❌ Refresh Token invalide:", err.message);
                return res.status(403).json({ message: "Token invalide" });
            }

            const newToken = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.json({ token: newToken });
        });
    } catch (error) {
        console.error("Erreur lors du refresh token:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}
