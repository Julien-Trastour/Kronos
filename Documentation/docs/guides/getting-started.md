# 🚀 Guide de démarrage - API Kronos

Bienvenue dans le guide de démarrage de l'API **Kronos**. Ce guide vous accompagnera dans l'installation et l'utilisation de l'API pour gérer les employés, les rôles et les agences.

---

## 📌 Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** (version 18+ recommandée) [📥 Télécharger](https://nodejs.org/)
- **PostgreSQL** (utilisé avec Prisma)
- **Git** (pour cloner le dépôt)
- **Un gestionnaire de paquets** : `npm` (fourni avec Node.js) ou `yarn`

---

## 📂 Installation

### 1️⃣ Cloner le projet
```sh
git clone https://github.com/Julien-Trastour/Kronos.git
cd Kronos
```

### 2️⃣ Installer les dépendances
```sh
npm install
```
ou avec **Yarn** :
```sh
yarn install
```

### 3️⃣ Configurer l'environnement
Renommez le fichier `.env.example` en `.env` et renseignez vos variables d’environnement :
```sh
cp .env.example .env
```
Ouvrez `.env` et configurez votre base de données PostgreSQL :
```
DATABASE_URL="postgresql://user:password@localhost:5432/kronos"
JWT_SECRET="your-secret-key"
```

---

## 🛠 Initialisation de la base de données

Kronos utilise **Prisma** pour gérer la base de données. Exécutez les commandes suivantes pour initialiser votre base :

```sh
npx prisma migrate dev --name init
npx prisma generate
```

Ces commandes :
- Créent les tables en fonction du modèle Prisma (`schema.prisma`).
- Génèrent les types TypeScript pour interagir avec la base.

---

## 🚀 Lancer l'API

### 1️⃣ Démarrer le serveur en mode développement
```sh
npm run dev
```
L'API sera accessible sur `http://localhost:3000`.

### 2️⃣ Démarrer le serveur en mode production
```sh
npm run build
npm start
```

---

## 🔍 Tester l'API

Vous pouvez utiliser **Postman**, **cURL** ou **Swagger** pour tester les endpoints.

Exemple avec **cURL** pour tester l'authentification :
```sh
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{
  "email": "admin@example.com",
  "password": "admin"
}'
```

---

## 📞 Support & Prochaines étapes

Si vous rencontrez un problème :
- 📂 Consultez le dépôt GitHub : [🔗 Kronos Repository](https://github.com/Julien-Trastour/Kronos)
- 📧 Contactez-nous : support@kronos-api.com

### ➡️ **Que faire ensuite ?**
- 📖 Lire la documentation complète des **[endpoints API](../api/overview)**.
- 🔒 Mettre en place les **rôles et permissions** avec JWT.
- 🚀 Déployer l’API sur un serveur (Docker, VPS, etc.).

---

### 📌 Dernière mise à jour : _{docs.lastUpdated}_
