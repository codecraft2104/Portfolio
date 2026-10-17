import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import projectRoutes from "./routes/projects.js";
import contactRoutes from "./routes/contact.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { testConnection } from "./config/db.js";
import { fileURLToPath } from "node:url";



dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 5000);
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS policy violation'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});

app.use('/api', apiRateLimiter);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', async (req, res) => {
  const dbConnected = await testConnection();

  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? 'ok' : 'degraded',
    message: dbConnected ? 'API and database are healthy.' : 'API running without database connection.',
    database: dbConnected ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    message: 'Something went wrong. Please try again later.',
  });
});

if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      name: 'Madhuri Portfolio API',
      status: 'running',
      routes: ['/api/health', '/api/projects', '/api/projects/:slug', '/api/contact'],
    });
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});
