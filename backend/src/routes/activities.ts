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

// Get activities
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('type').optional().isIn(['CALL', 'EMAIL', 'MEETING', 'TASK', 'NOTE', 'PROPOSAL_SENT', 'FOLLOW_UP']),
  query('leadId').optional().isUUID(),
  query('dealId').optional().isUUID(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    
    const where: any = {};
    if (req.query.type) where.type = req.query.type;
    if (req.query.leadId) where.leadId = req.query.leadId;
    if (req.query.dealId) where.dealId = req.query.dealId;

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        skip: offset,
        take: limit,
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true }
          },
          lead: {
            select: { id: true, firstName: true, lastName: true, company: true }
          },
          deal: {
            select: { id: true, title: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.activity.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        activities,
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

// Create activity
router.post('/', [
  body('type').isIn(['CALL', 'EMAIL', 'MEETING', 'TASK', 'NOTE', 'PROPOSAL_SENT', 'FOLLOW_UP']),
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('leadId').optional().isUUID(),
  body('dealId').optional().isUUID(),
  body('scheduledAt').optional().isISO8601(),
  body('duration').optional().isInt({ min: 1 }),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const activityData = {
      ...req.body,
      userId: req.user!.id,
      scheduledAt: req.body.scheduledAt ? new Date(req.body.scheduledAt) : null
    };

    const activity = await prisma.activity.create({
      data: activityData,
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true }
        },
        lead: {
          select: { id: true, firstName: true, lastName: true, company: true }
        },
        deal: {
          select: { id: true, title: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      data: activity
    });
  } catch (error) {
    next(error);
  }
});

export default router;