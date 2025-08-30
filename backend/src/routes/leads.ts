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

// Get all leads with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST', 'ON_HOLD']),
  query('source').optional().isIn(['WEBSITE', 'REFERRAL', 'SOCIAL_MEDIA', 'EMAIL_CAMPAIGN', 'COLD_CALL', 'TRADE_SHOW', 'PARTNER', 'MANUAL', 'IMPORT']),
  query('assignedTo').optional().isUUID(),
  query('search').optional().isString(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    
    const where: any = {};
    
    // Add filters
    if (req.query.status) where.status = req.query.status;
    if (req.query.source) where.source = req.query.source;
    if (req.query.assignedTo) where.assignedToId = req.query.assignedTo;
    
    // Search functionality
    if (req.query.search) {
      const search = req.query.search as string;
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip: offset,
        take: limit,
        include: {
          createdBy: {
            select: { id: true, firstName: true, lastName: true }
          },
          assignedTo: {
            select: { id: true, firstName: true, lastName: true }
          },
          deal: true,
          activities: {
            take: 5,
            orderBy: { createdAt: 'desc' }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.lead.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        leads,
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

// Get lead by ID
router.get('/:id', [
  param('id').isUUID(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: req.params.id },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true }
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        },
        deal: true,
        activities: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true }
            }
          }
        },
        customFields: true
      }
    });

    if (!lead) {
      throw createError('Lead not found', 404);
    }

    res.json({
      success: true,
      data: lead
    });
  } catch (error) {
    next(error);
  }
});

// Create new lead
router.post('/', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone('any'),
  body('company').optional().isString(),
  body('jobTitle').optional().isString(),
  body('source').optional().isIn(['WEBSITE', 'REFERRAL', 'SOCIAL_MEDIA', 'EMAIL_CAMPAIGN', 'COLD_CALL', 'TRADE_SHOW', 'PARTNER', 'MANUAL', 'IMPORT']),
  body('assignedToId').optional().isUUID(),
  body('notes').optional().isString(),
  body('estimatedValue').optional().isNumeric(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const leadData = {
      ...req.body,
      createdById: req.user!.id,
      assignedToId: req.body.assignedToId || req.user!.id
    };

    const lead = await prisma.lead.create({
      data: leadData,
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true }
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead
    });
  } catch (error) {
    next(error);
  }
});

// Update lead
router.put('/:id', [
  param('id').isUUID(),
  body('firstName').optional().notEmpty(),
  body('lastName').optional().notEmpty(),
  body('email').optional().isEmail(),
  body('phone').optional().isMobilePhone('any'),
  body('status').optional().isIn(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST', 'ON_HOLD']),
  body('assignedToId').optional().isUUID(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const leadExists = await prisma.lead.findUnique({
      where: { id: req.params.id }
    });

    if (!leadExists) {
      throw createError('Lead not found', 404);
    }

    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true }
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: lead
    });
  } catch (error) {
    next(error);
  }
});

// Delete lead
router.delete('/:id', [
  param('id').isUUID(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const leadExists = await prisma.lead.findUnique({
      where: { id: req.params.id }
    });

    if (!leadExists) {
      throw createError('Lead not found', 404);
    }

    await prisma.lead.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update lead score
router.patch('/:id/score', [
  param('id').isUUID(),
  body('score').isInt({ min: 0, max: 100 }),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: { score: req.body.score }
    });

    res.json({
      success: true,
      message: 'Lead score updated successfully',
      data: { score: lead.score }
    });
  } catch (error) {
    next(error);
  }
});

// Get lead statistics
router.get('/stats/overview', async (req: AuthenticatedRequest, res, next) => {
  try {
    const [
      totalLeads,
      newLeads,
      qualifiedLeads,
      closedWonLeads,
      closedLostLeads
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'NEW' } }),
      prisma.lead.count({ where: { status: 'QUALIFIED' } }),
      prisma.lead.count({ where: { status: 'CLOSED_WON' } }),
      prisma.lead.count({ where: { status: 'CLOSED_LOST' } })
    ]);

    const conversionRate = totalLeads > 0 ? (closedWonLeads / totalLeads) * 100 : 0;

    res.json({
      success: true,
      data: {
        totalLeads,
        newLeads,
        qualifiedLeads,
        closedWonLeads,
        closedLostLeads,
        conversionRate: Math.round(conversionRate * 100) / 100
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;