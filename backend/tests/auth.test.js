import request from "supertest";
import app from "../src/server.js"; // Import du serveur Express
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Tests d'authentification", () => {
    let testUser = {
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean.dupont@example.com",
        password: "password123",
        role: "Technicien"
    };

    beforeAll(async () => {
        // Vérifier que le rôle existe
        const role = await prisma.role.findUnique({ where: { name: testUser.role } });
        if (!role) {
            await prisma.role.create({ data: { name: testUser.role } });
        }

        // Supprimer l'utilisateur s'il existe déjà
        await prisma.user.deleteMany({ where: { email: testUser.email } });
    });

    afterAll(async () => {
        // Nettoyer après les tests
        await prisma.user.deleteMany({ where: { email: testUser.email } });
        await prisma.$disconnect();
    });

    test("🔹 Inscription d'un nouvel utilisateur", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send(testUser);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "Utilisateur créé avec succès.");
    });

    test("🔹 Connexion avec des identifiants valides", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    test("🔹 Connexion avec un mauvais mot de passe", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: testUser.email,
                password: "wrongpassword"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "Email ou mot de passe incorrect.");
    });
});
