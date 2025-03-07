import argon2 from "argon2";

// 📌 Hacher un mot de passe
export async function hashPassword(password) {
    return await argon2.hash(password);
}

// 📌 Vérifier un mot de passe
export async function verifyPassword(hash, password) {
    return await argon2.verify(hash, password);
}
