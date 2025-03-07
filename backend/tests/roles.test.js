import request from "supertest";
import app from "../src/server.js";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2"; // 🔹 Hachage des mots de passe

const prisma = new PrismaClient();
let adminToken;

beforeAll(async () => {
    // 🔹 Vérifier et créer le rôle "PDG"
    const adminRole = await prisma.role.upsert({
        where: { name: "PDG" },
        update: {},
        create: { name: "PDG" }
    });

    // 🔹 Supprimer l'admin s'il existe déjà
    await prisma.user.deleteMany({ where: { email: "admin@test.com" } });

    // 🔹 Hacher le mot de passe
    const hashedPassword = await argon2.hash("password123");

    // 🔹 Créer l'utilisateur admin
    await prisma.user.create({
        data: {
            firstName: "Admin",
            lastName: "Test",
            email: "admin@test.com",
            password: hashedPassword, // ✅ Mot de passe hashé
            roleId: adminRole.id,
            entryDate: new Date(),
            seniority: "0 ans"
        }
    });

    // 🔹 Récupérer le token après connexion
    const resAdmin = await request(app)
        .post("/auth/login")
        .send({ email: "admin@test.com", password: "password123" });

    adminToken = resAdmin.body.token;
    console.log("🔹 Admin Token dans le test /roles:", adminToken); // ✅ Vérification

    if (!adminToken) {
        throw new Error("❌ Le token admin n'a pas été récupéré !");
    }
});

afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: "admin@test.com" } });
    await prisma.$disconnect();
});

test("🔹 Un admin peut récupérer tous les rôles", async () => {
    const res = await request(app)
        .get("/roles")
        .set("Authorization", `Bearer ${adminToken}`);

    console.log("🔹 Réponse /roles:", res.body); // ✅ Vérification
    expect(res.statusCode).toBe(200);
});
