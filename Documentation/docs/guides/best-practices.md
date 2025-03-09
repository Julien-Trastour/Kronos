# ✅ Bonnes pratiques - API Kronos

Ce document décrit **les bonnes pratiques appliquées** dans l'API **Kronos** pour assurer **sécurité, performance et maintenabilité**.

---

## 🔒 Sécurisation des requêtes

### 1️⃣ **Utilisation de HTTPS**
Toutes les communications doivent passer par **HTTPS** pour protéger les données en transit.

### 2️⃣ **Authentification avec JWT**
Chaque requête vers une route protégée doit inclure un **token JWT** dans l’en-tête `Authorization`.

```bash
Authorization: Bearer <your_token>
```

### 3️⃣ **Limitation des tentatives de connexion (`express-rate-limit`)**
Nous avons mis en place une protection contre les attaques de **brute force** sur l'authentification.

```js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite de 100 requêtes par IP
  message: "Trop de tentatives, réessayez plus tard."
});

app.use('/api/auth/login', limiter);
```

### 4️⃣ **Gestion des erreurs globales**
Nous avons un **middleware d’erreur** centralisé pour capturer toutes les erreurs non gérées.

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Erreur interne du serveur" });
});
```

---

## 🛠 Validation des données (`Joi`)

Nous utilisons **Joi** pour sécuriser les entrées et éviter les données invalides.

Exemple de validation d’un utilisateur :
```js
import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

app.post('/api/auth/login', validateUser, (req, res) => { ... });
```

---

## 📜 Standardisation des réponses API

Nos réponses JSON sont standardisées.

Exemple de **réponse de succès** :
```json
{
  "success": true,
  "message": "Opération réussie",
  "data": {...}
}
```

Exemple de **gestion d’erreur** :
```json
{
  "success": false,
  "message": "Utilisateur non trouvé",
  "error": "USER_NOT_FOUND"
}
```

---

## 📊 Pagination des résultats

Nos endpoints qui renvoient des listes prennent en charge la **pagination**.

- Exemple de requête paginée :
  ```bash
  GET /api/employees?page=2&limit=20
  ```
- Exemple de réponse paginée :
  ```json
  {
    "success": true,
    "page": 2,
    "limit": 20,
    "total": 100,
    "data": [...]
  }
  ```

---

## 📂 Architecture MVC

L'API est structurée en **MVC (Model - View - Controller)** pour améliorer la maintenabilité.

```plaintext
├── src/
│   ├── controllers/  # Logique métier
│   ├── models/       # Schémas Prisma
│   ├── routes/       # Définition des endpoints
│   ├── middlewares/  # Auth, validation, logs, erreurs
│   ├── services/     # Interaction avec la BDD
```

Exemple d'un **controller** dans `controllers/userController.js` :
```js
export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ success: true, data: users });
};
```

Et la **route associée** dans `routes/userRoutes.js` :
```js
import express from 'express';
import { getUsers } from '../controllers/userController.js';

const router = express.Router();
router.get('/', getUsers);

export default router;
```

---

## 📌 Gestion des logs (`Winston`)

Nous avons intégré **Winston** pour gérer les logs de manière centralisée.

```js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

logger.info('Serveur démarré');
logger.error('Erreur critique détectée');
```

Nous avons différents niveaux de logs :
- **info** : Informations générales (ex: démarrage du serveur)
- **warn** : Avertissements (ex: tentative d'accès non autorisée)
- **error** : Erreurs critiques (ex: plantage d'une requête)

---

## 🎯 Conclusion

Avec ces améliorations, **Kronos est sécurisé, performant et structuré**. 🚀

---

📌 **Dernière mise à jour** : _{docs.lastUpdated}_
