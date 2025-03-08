import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import agencyRoutes from './routes/agencyRoutes.js';
import teamRoutes from './routes/teamRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Vérification que les fichiers sont bien trouvés
console.log("📂 Chargement des routes...");

app.use('/api/auth', authRoutes);
console.log("✅ Routes Auth chargées !");

app.use('/api/employees', employeeRoutes);
console.log("✅ Routes Employés chargées !");

app.use('/api/roles', roleRoutes);
console.log("✅ Routes Roles chargées !");

app.use('/api/agencies', agencyRoutes);
console.log("✅ Routes Agencies chargées !");

app.use('/api/teams', teamRoutes);
console.log("✅ Routes Teams chargées !");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
