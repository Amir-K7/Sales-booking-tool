import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { PrismaClient } from '@prisma/client';

// Import routes
import authRoutes from '@/routes/auth.js';
import leadRoutes from '@/routes/leads.js';
import dealRoutes from '@/routes/deals.js';
import userRoutes from '@/routes/users.js';
import activityRoutes from '@/routes/activities.js';
import taskRoutes from '@/routes/tasks.js';
import bookingRoutes from '@/routes/bookings.js';
import dashboardRoutes from '@/routes/dashboard.js';

// Import middleware
import { errorHandler } from '@/middleware/errorHandler.js';
import { notFound } from '@/middleware/notFound.js';
import { authMiddleware } from '@/middleware/auth.js';

// Import config
import { connectRedis } from '@/config/redis.js';
import { logger } from '@/config/logger.js';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
  }
});

// Initialize Prisma Client
const prisma = new PrismaClient();

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(limiter);
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', authMiddleware, leadRoutes);
app.use('/api/deals', authMiddleware, dealRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/activities', authMiddleware, activityRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/bookings', bookingRoutes); // Some booking routes need to be public
app.use('/api/dashboard', authMiddleware, dashboardRoutes);

// Socket.IO connection handling
io.use((socket, next) => {
  // Add authentication middleware for socket connections if needed
  next();
});

io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  
  socket.on('join_room', (room) => {
    socket.join(room);
    logger.info(`Client ${socket.id} joined room: ${room}`);
  });
  
  socket.on('leave_room', (room) => {
    socket.leave(room);
    logger.info(`Client ${socket.id} left room: ${room}`);
  });
  
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
const startServer = async () => {
  try {
    // Connect to Redis
    await connectRedis();
    
    // Connect to database
    await prisma.$connect();
    logger.info('Connected to database');
    
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export { io, prisma };