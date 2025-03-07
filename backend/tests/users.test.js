import request from "supertest";
import app from "../src/server.js";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2"; // 🔹 Importer Argon2 pour hacher les mots de passe

const prisma = new PrismaClient();
let adminToken, userToken;
let testUserId;

beforeAll(async () => {
    // 🔹 Vérifier si les rôles existent, sinon les créer
    const roles = [
        { name: "PDG" },
        { name: "Technicien" }
    ];

    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role.name }, // Vérifie par le `name` pour éviter les conflits
            update: {},
            create: { name: role.name }
        });
    }

    // 🔹 Supprimer les utilisateurs de test s'ils existent déjà
    await prisma.user.deleteMany({ where: { email: { in: ["admin@test.com", "user@test.com"] } } });

    // 🔹 Récupérer les rôles après leur création
    const adminRole = await prisma.role.findUnique({ where: { name: "PDG" } });
    const userRole = await prisma.role.findUnique({ where: { name: "Technicien" } });

    if (!adminRole || !userRole) {
        throw new Error("❌ Les rôles ne sont pas créés correctement !");
    }

    // 🔹 Hacher les mots de passe avec Argon2
    const hashedPassword = await argon2.hash("password123");

    // 🔹 Création des utilisateurs de test avec des mots de passe hashés
    const admin = await prisma.user.create({
        data: {
            firstName: "Admin",
            lastName: "Test",
            email: "admin@test.com",
            password: hashedPassword,
            roleId: adminRole.id,
            entryDate: new Date(),
            seniority: "0 ans"
        }
    });

    const user = await prisma.user.create({
        data: {
            firstName: "User",
            lastName: "Test",
            email: "user@test.com",
            password: hashedPassword,
            roleId: userRole.id,
            entryDate: new Date(),
            seniority: "0 ans"
        }
    });

    testUserId = user.id;

    // 🔹 Récupérer les tokens JWT après connexion
    const resAdmin = await request(app).post("/auth/login").send({ email: "admin@test.com", password: "password123" });
    adminToken = resAdmin.body.token;

    const resUser = await request(app).post("/auth/login").send({ email: "user@test.com", password: "password123" });
    userToken = resUser.body.token;

    console.log("🔹 Admin Token:", adminToken || "❌ Échec de la récupération du token !");
});

afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: { in: ["admin@test.com", "user@test.com"] } } });
    await prisma.$disconnect();
});

test("🔹 Un admin peut récupérer tous les utilisateurs", async () => {
    const res = await request(app).get("/users").set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
});
