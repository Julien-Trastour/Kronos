import request from "supertest";
import app from "../src/server.js";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();
let adminToken, refreshToken;

beforeAll(async () => {
    // 🔹 Vérifier et créer le rôle "PDG"
    const adminRole = await prisma.role.upsert({
        where: { name: "PDG" },
        update: {},
        create: { name: "PDG" }
    });

    // 🔹 Supprimer et recréer l'utilisateur admin
    await prisma.user.deleteMany({ where: { email: "admin@test.com" } });

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

    console.log("✅ Admin recréé en base !");

    // 🔹 Connexion pour récupérer les tokens
    const resAdmin = await request(app)
        .post("/auth/login")
        .send({ email: "admin@test.com", password: "password123" });

    adminToken = resAdmin.body.token;
    refreshToken = resAdmin.body.refreshToken;

    console.log("🔹 Token Admin:", adminToken);
    console.log("🔹 Refresh Token récupéré:", refreshToken);

    if (!refreshToken) {
        throw new Error("❌ Le refreshToken n'a pas été récupéré !");
    }
});

test("🔹 Un utilisateur peut rafraîchir son token JWT", async () => {
    const res = await request(app)
        .post("/auth/refresh")
        .send({ token: refreshToken });

    console.log("🔹 Réponse /auth/refresh:", res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
});
