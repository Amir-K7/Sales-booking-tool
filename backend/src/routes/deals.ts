import { Router } from 'express';
import { body, query, param, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '@/middleware/auth.js';
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

// Get all deals with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('stage').optional().isIn(['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']),
  query('assignedTo').optional().isUUID(),
  query('minValue').optional().isNumeric(),
  query('maxValue').optional().isNumeric(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    
    const where: any = {};
    
    // Add filters
    if (req.query.stage) where.stage = req.query.stage;
    if (req.query.assignedTo) where.assignedToId = req.query.assignedTo;
    
    if (req.query.minValue || req.query.maxValue) {
      where.value = {};
      if (req.query.minValue) where.value.gte = parseFloat(req.query.minValue as string);
      if (req.query.maxValue) where.value.lte = parseFloat(req.query.maxValue as string);
    }

    const [deals, total] = await Promise.all([
      prisma.deal.findMany({
        where,
        skip: offset,
        take: limit,
        include: {
          lead: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              company: true
            }
          },
          assignedTo: {
            select: { id: true, firstName: true, lastName: true }
          },
          activities: {
            take: 3,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              type: true,
              title: true,
              createdAt: true
            }
          },
          tasks: {
            where: { status: { not: 'COMPLETED' } },
            take: 3,
            orderBy: { dueDate: 'asc' }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.deal.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        deals,
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

// Get deal by ID
router.get('/:id', [
  param('id').isUUID(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const deal = await prisma.deal.findUnique({
      where: { id: req.params.id },
      include: {
        lead: true,
        assignedTo: {
          select: { id: true, firstName: true, lastName: true, email: true }
        },
        activities: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true }
            }
          }
        },
        tasks: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!deal) {
      throw createError('Deal not found', 404);
    }

    res.json({
      success: true,
      data: deal
    });
  } catch (error) {
    next(error);
  }
});

// Create new deal from lead
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('leadId').isUUID().withMessage('Valid lead ID is required'),
  body('value').isNumeric().withMessage('Value must be a number'),
  body('stage').optional().isIn(['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']),
  body('probability').optional().isInt({ min: 0, max: 100 }),
  body('expectedCloseDate').optional().isISO8601(),
  body('description').optional().isString(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    // Check if lead exists and doesn't already have a deal
    const lead = await prisma.lead.findUnique({
      where: { id: req.body.leadId },
      include: { deal: true }
    });

    if (!lead) {
      throw createError('Lead not found', 404);
    }

    if (lead.deal) {
      throw createError('Lead already has an associated deal', 400);
    }

    const dealData = {
      ...req.body,
      assignedToId: req.user!.id,
      expectedCloseDate: req.body.expectedCloseDate ? new Date(req.body.expectedCloseDate) : null
    };

    const deal = await prisma.deal.create({
      data: dealData,
      include: {
        lead: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            company: true
          }
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });

    // Update lead status to QUALIFIED if it's not already
    if (lead.status === 'NEW' || lead.status === 'CONTACTED') {
      await prisma.lead.update({
        where: { id: lead.id },
        data: { status: 'QUALIFIED' }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Deal created successfully',
      data: deal
    });
  } catch (error) {
    next(error);
  }
});

// Update deal
router.put('/:id', [
  param('id').isUUID(),
  body('title').optional().notEmpty(),
  body('value').optional().isNumeric(),
  body('stage').optional().isIn(['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']),
  body('probability').optional().isInt({ min: 0, max: 100 }),
  body('expectedCloseDate').optional().isISO8601(),
  body('actualCloseDate').optional().isISO8601(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const dealExists = await prisma.deal.findUnique({
      where: { id: req.params.id }
    });

    if (!dealExists) {
      throw createError('Deal not found', 404);
    }

    const updateData = { ...req.body };
    
    // Convert date strings to Date objects
    if (updateData.expectedCloseDate) {
      updateData.expectedCloseDate = new Date(updateData.expectedCloseDate);
    }
    if (updateData.actualCloseDate) {
      updateData.actualCloseDate = new Date(updateData.actualCloseDate);
    }

    // Auto-set actual close date when deal is closed
    if (req.body.stage === 'CLOSED_WON' || req.body.stage === 'CLOSED_LOST') {
      updateData.actualCloseDate = new Date();
    }

    const deal = await prisma.deal.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        lead: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            company: true
          }
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });

    // Update lead status based on deal stage
    if (req.body.stage) {
      let leadStatus;
      switch (req.body.stage) {
        case 'CLOSED_WON':
          leadStatus = 'CLOSED_WON';
          break;
        case 'CLOSED_LOST':
          leadStatus = 'CLOSED_LOST';
          break;
        case 'NEGOTIATION':
          leadStatus = 'NEGOTIATION';
          break;
        case 'PROPOSAL':
          leadStatus = 'PROPOSAL_SENT';
          break;
        default:
          leadStatus = 'QUALIFIED';
      }

      await prisma.lead.update({
        where: { id: deal.leadId },
        data: { status: leadStatus }
      });
    }

    res.json({
      success: true,
      message: 'Deal updated successfully',
      data: deal
    });
  } catch (error) {
    next(error);
  }
});

// Delete deal
router.delete('/:id', [
  param('id').isUUID(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const deal = await prisma.deal.findUnique({
      where: { id: req.params.id },
      include: { lead: true }
    });

    if (!deal) {
      throw createError('Deal not found', 404);
    }

    await prisma.deal.delete({
      where: { id: req.params.id }
    });

    // Reset lead status
    await prisma.lead.update({
      where: { id: deal.leadId },
      data: { status: 'QUALIFIED' }
    });

    res.json({
      success: true,
      message: 'Deal deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get deals pipeline data
router.get('/pipeline/overview', async (req: AuthenticatedRequest, res, next) => {
  try {
    const pipeline = await prisma.deal.groupBy({
      by: ['stage'],
      _count: { stage: true },
      _sum: { value: true },
      _avg: { probability: true }
    });

    const stages = ['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'];
    const pipelineData = stages.map(stage => {
      const stageData = pipeline.find(p => p.stage === stage);
      return {
        stage,
        count: stageData?._count.stage || 0,
        totalValue: stageData?._sum.value || 0,
        avgProbability: stageData?._avg.probability || 0
      };
    });

    res.json({
      success: true,
      data: pipelineData
    });
  } catch (error) {
    next(error);
  }
});

// Get deal statistics
router.get('/stats/overview', async (req: AuthenticatedRequest, res, next) => {
  try {
    const [
      totalDeals,
      activeDeals,
      wonDeals,
      lostDeals,
      totalValue,
      avgDealSize
    ] = await Promise.all([
      prisma.deal.count(),
      prisma.deal.count({
        where: {
          stage: {
            in: ['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION']
          }
        }
      }),
      prisma.deal.count({ where: { stage: 'CLOSED_WON' } }),
      prisma.deal.count({ where: { stage: 'CLOSED_LOST' } }),
      prisma.deal.aggregate({
        where: { stage: 'CLOSED_WON' },
        _sum: { value: true }
      }),
      prisma.deal.aggregate({
        _avg: { value: true }
      })
    ]);

    const winRate = (wonDeals + lostDeals) > 0 ? (wonDeals / (wonDeals + lostDeals)) * 100 : 0;

    res.json({
      success: true,
      data: {
        totalDeals,
        activeDeals,
        wonDeals,
        lostDeals,
        totalValue: totalValue._sum.value || 0,
        avgDealSize: avgDealSize._avg.value || 0,
        winRate: Math.round(winRate * 100) / 100
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;