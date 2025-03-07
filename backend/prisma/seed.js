import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
    console.log("🔄 Insertion des données de base...");

    // 📌 1. Insertion des agences
    const agencies = ["Paris", "Lyon", "Marseille"];
    await prisma.agency.createMany({
        data: agencies.map((name) => ({ name })),
        skipDuplicates: true,
    });

    // 📌 2. Insertion des rôles avec hiérarchie
    const roles = [
        { name: "PDG", superiorId: null },
        { name: "Responsable Agence", superiorId: "PDG" },
        { name: "Responsable Technique", superiorId: "PDG" },
        { name: "Vendeur", superiorId: "Responsable Agence" },
        { name: "Technicien", superiorId: "Responsable Technique" },
    ];
    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: {
                name: role.name,
                superior: role.superiorId ? { connect: { name: role.superiorId } } : undefined,
            },
        });
    }

    // 📌 3. Insertion des permissions par catégorie
    const permissionsByCategory = {
        "Ouranos CRM": ["Créer une facture", "Modifier une facture", "Consulter une facture"],
        "Ouranos Desk": ["Ouvrir un ticket", "Modifier un ticket", "Consulter un ticket"],
    };

    for (const [category, perms] of Object.entries(permissionsByCategory)) {
        for (const perm of perms) {
            await prisma.permission.upsert({
                where: { name: perm },
                update: {},
                create: {
                    name: perm,
                    category,
                },
            });
        }
    }

    // 📌 4. Attribution de permissions aux rôles
    const rolePermissions = [
        { role: "PDG", permissions: ["Créer une facture", "Modifier une facture", "Consulter une facture"] },
        { role: "Responsable Agence", permissions: ["Consulter une facture"] },
        { role: "Technicien", permissions: ["Ouvrir un ticket", "Modifier un ticket", "Consulter un ticket"] },
    ];

    for (const { role, permissions } of rolePermissions) {
        for (const permission of permissions) {
            const roleData = await prisma.role.findUnique({ where: { name: role } });
            const permData = await prisma.permission.findUnique({ where: { name: permission } });

            if (roleData && permData) {
                await prisma.rolePermission.upsert({
                    where: {
                        roleId_permissionId: { roleId: roleData.id, permissionId: permData.id },
                    },
                    update: {},
                    create: {
                        role: { connect: { id: roleData.id } },
                        permission: { connect: { id: permData.id } },
                    },
                });
            }
        }
    }

    // 📌 5. Création d'un utilisateur admin initial
    const hashedPassword = await argon2.hash("admin123");
    await prisma.user.upsert({
        where: { email: "admin@kronos.com" },
        update: {},
        create: {
            firstName: "Super",
            lastName: "Admin",
            email: "admin@kronos.com",
            password: hashedPassword,
            role: { connect: { name: "PDG" } },
            entryDate: new Date(),  // 📌 Ajout de la date d'entrée
            seniority: "0 ans",     // 📌 Par défaut, le super admin est "nouveau"
        },
    });

    console.log("✅ Données insérées avec succès !");
}

// Exécuter le script et gérer les erreurs
main()
    .catch((e) => {
        console.error("❌ Erreur lors du seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
