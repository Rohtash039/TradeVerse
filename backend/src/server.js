import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dns from 'dns';
import env from './config/env.js';

if (env.MONGODB_URI && env.MONGODB_URI.startsWith('mongodb+srv://')) {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
}

import connectDB from './config/database.js';
import { generalLimiter } from './middlewares/rateLimiter.js';
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import apiRoutes from './routes/index.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log requests
app.use(logger);

// Rate limiting for API requests
app.use('/api', generalLimiter);

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// 404 Route not found handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Cannot ${req.method} ${req.originalUrl}`,
    },
  });
});

// Global Error Handler
app.use(errorHandler);

const PORT = env.PORT;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`🔴 Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
