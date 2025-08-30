import { Router } from 'express';
import { body, query, param, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '@/middleware/auth.js';
import { createError } from '@/middleware/errorHandler.js';

const router = Router();
const prisma = new PrismaClient();

const validateRequest = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }
  next();
};

// Get tasks
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  query('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  query('assignedTo').optional().isUUID(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    
    const where: any = {};
    if (req.query.status) where.status = req.query.status;
    if (req.query.priority) where.priority = req.query.priority;
    if (req.query.assignedTo) where.assignedToId = req.query.assignedTo;

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip: offset,
        take: limit,
        include: {
          assignedTo: {
            select: { id: true, firstName: true, lastName: true }
          },
          deal: {
            select: { id: true, title: true }
          }
        },
        orderBy: { dueDate: 'asc' }
      }),
      prisma.task.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        tasks,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Create task
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  body('dueDate').optional().isISO8601(),
  body('dealId').optional().isUUID(),
  body('assignedToId').optional().isUUID(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const taskData = {
      ...req.body,
      assignedToId: req.body.assignedToId || req.user!.id,
      dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null
    };

    const task = await prisma.task.create({
      data: taskData,
      include: {
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        },
        deal: {
          select: { id: true, title: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// Update task
router.put('/:id', [
  param('id').isUUID(),
  body('status').optional().isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        completedAt: req.body.status === 'COMPLETED' ? new Date() : null
      },
      include: {
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
});

export default router;