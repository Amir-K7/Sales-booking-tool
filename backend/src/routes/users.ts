import { Router } from 'express';
import { body, query, param, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest, requireRole } from '@/middleware/auth.js';
import { createError } from '@/middleware/errorHandler.js';

const router = Router();
const prisma = new PrismaClient();

// Validation middleware
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

// Get all users (Admin/Manager only)
router.get('/', [
  requireRole(['ADMIN', 'MANAGER']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('role').optional().isIn(['ADMIN', 'MANAGER', 'SALES_REP', 'MARKETING']),
  query('isActive').optional().isBoolean(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    
    const where: any = {};
    if (req.query.role) where.role = req.query.role;
    if (req.query.isActive !== undefined) where.isActive = req.query.isActive === 'true';

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: offset,
        take: limit,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          lastLogin: true,
          createdAt: true,
          avatar: true
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        users,
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

// Get user by ID
router.get('/:id', [
  param('id').isUUID(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        avatar: true
      }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    // Users can only view their own profile unless they're admin/manager
    if (req.user!.id !== user.id && !['ADMIN', 'MANAGER'].includes(req.user!.role)) {
      throw createError('Access denied', 403);
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.put('/:id', [
  param('id').isUUID(),
  body('firstName').optional().notEmpty(),
  body('lastName').optional().notEmpty(),
  body('avatar').optional().isURL(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    // Users can only update their own profile unless they're admin/manager
    if (req.user!.id !== req.params.id && !['ADMIN', 'MANAGER'].includes(req.user!.role)) {
      throw createError('Access denied', 403);
    }

    const userExists = await prisma.user.findUnique({
      where: { id: req.params.id }
    });

    if (!userExists) {
      throw createError('User not found', 404);
    }

    const updateData: any = {};
    if (req.body.firstName) updateData.firstName = req.body.firstName;
    if (req.body.lastName) updateData.lastName = req.body.lastName;
    if (req.body.avatar) updateData.avatar = req.body.avatar;

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true
      }
    });

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// Update user role (Admin only)
router.patch('/:id/role', [
  requireRole(['ADMIN']),
  param('id').isUUID(),
  body('role').isIn(['ADMIN', 'MANAGER', 'SALES_REP', 'MARKETING']),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role: req.body.role },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true
      }
    });

    res.json({
      success: true,
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// Activate/Deactivate user (Admin/Manager only)
router.patch('/:id/status', [
  requireRole(['ADMIN', 'MANAGER']),
  param('id').isUUID(),
  body('isActive').isBoolean(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { isActive: req.body.isActive },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true
      }
    });

    res.json({
      success: true,
      message: `User ${req.body.isActive ? 'activated' : 'deactivated'} successfully`,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// Get user performance stats
router.get('/:id/stats', [
  param('id').isUUID(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    // Users can only view their own stats unless they're admin/manager
    if (req.user!.id !== req.params.id && !['ADMIN', 'MANAGER'].includes(req.user!.role)) {
      throw createError('Access denied', 403);
    }

    const [
      leadsCount,
      dealsCount,
      wonDealsCount,
      totalDealsValue,
      activitiesCount
    ] = await Promise.all([
      prisma.lead.count({ where: { assignedToId: req.params.id } }),
      prisma.deal.count({ where: { assignedToId: req.params.id } }),
      prisma.deal.count({ 
        where: { 
          assignedToId: req.params.id,
          stage: 'CLOSED_WON'
        } 
      }),
      prisma.deal.aggregate({
        where: { 
          assignedToId: req.params.id,
          stage: 'CLOSED_WON'
        },
        _sum: { value: true }
      }),
      prisma.activity.count({ where: { userId: req.params.id } })
    ]);

    res.json({
      success: true,
      data: {
        leadsCount,
        dealsCount,
        wonDealsCount,
        totalDealsValue: totalDealsValue._sum.value || 0,
        activitiesCount,
        winRate: dealsCount > 0 ? (wonDealsCount / dealsCount) * 100 : 0
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;