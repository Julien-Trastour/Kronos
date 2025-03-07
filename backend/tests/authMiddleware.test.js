import request from "supertest";
import app from "../src/server.js";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();
let adminToken, userToken;

beforeAll(async () => {
    // 🔹 Vérifier et créer les rôles "PDG" et "Technicien"
    const adminRole = await prisma.role.upsert({
        where: { name: "PDG" },
        update: {},
        create: { name: "PDG" }
    });

    const userRole = await prisma.role.upsert({
        where: { name: "Technicien" },
        update: {},
        create: { name: "Technicien" }
    });

    // 🔹 Supprimer et recréer les utilisateurs admin et utilisateur normal
    await prisma.user.deleteMany({ where: { email: { in: ["admin@test.com", "user@test.com"] } } });

    const hashedPassword = await argon2.hash("password123");

    await prisma.user.create({
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

    await prisma.user.create({
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

    console.log("✅ Admin et utilisateur recréés en base !");

    // 🔹 Connexion pour récupérer les tokens
    const resAdmin = await request(app)
        .post("/auth/login")
        .send({ email: "admin@test.com", password: "password123" });

    adminToken = resAdmin.body.token;

    const resUser = await request(app)
        .post("/auth/login")
        .send({ email: "user@test.com", password: "password123" });

    userToken = resUser.body.token;

    console.log("🔹 Token Admin utilisé:", adminToken);
    console.log("🔹 Token Utilisateur utilisé:", userToken);

    if (!adminToken || !userToken) {
        throw new Error("❌ Les tokens n'ont pas été récupérés !");
    }
});

test("🔹 Un utilisateur sans token ne peut pas accéder à une route protégée", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("message", "Accès interdit, token manquant.");
});

test("🔹 Un utilisateur non-admin ne peut pas accéder à une route admin", async () => {
    const res = await request(app)
        .get("/roles")
        .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("message", "Accès réservé aux administrateurs.");
});

test("🔹 Un admin peut accéder aux routes protégées", async () => {
    const res = await request(app)
        .get("/roles")
        .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
});
