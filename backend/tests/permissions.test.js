import request from "supertest";
import app from "../src/server.js";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2"; // 🔹 Hachage des mots de passe

const prisma = new PrismaClient();
let adminToken, permissionId, roleId;

beforeAll(async () => {
    // 🔹 Vérifier et créer le rôle "PDG"
    const adminRole = await prisma.role.upsert({
        where: { name: "PDG" },
        update: {},
        create: { name: "PDG" }
    });

    // 🔹 Vérifier et créer une permission
    const permission = await prisma.permission.upsert({
        where: { name: "Gérer les utilisateurs" },
        update: {},
        create: { name: "Gérer les utilisateurs", category: "Admin" }
    });

    permissionId = permission.id;
    roleId = adminRole.id;

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
            password: hashedPassword,
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
});

afterAll(async () => {
    await prisma.rolePermission.deleteMany();
    await prisma.permission.deleteMany();
    await prisma.user.deleteMany({ where: { email: "admin@test.com" } });
    await prisma.$disconnect();
});

test("🔹 Un admin peut attribuer une permission à un rôle", async () => {
    const res = await request(app)
        .post("/permissions/assign")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ roleId, permissionId });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Permission attribuée au rôle avec succès.");
});

test("🔹 Un admin peut retirer une permission d'un rôle", async () => {
    const res = await request(app)
        .post("/permissions/remove")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ roleId, permissionId });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Permission retirée du rôle avec succès.");
});
