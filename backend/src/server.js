import express from 'express';
import cors from 'cors';
import agencyRoutes from './routes/agencyRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import { checkBlacklist } from './middleware/blacklistMiddleware.js';

const app = express();
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));
app.use(express.json());

// ✅ Vérifie si le token est blacklisté AVANT les routes protégées
app.use(checkBlacklist);

// ✅ Routes API
app.use('/api/agencies', agencyRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/auth', authRoutes);

// ✅ Middleware global pour capturer toutes les erreurs
app.use(errorMiddleware);

// ✅ Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
