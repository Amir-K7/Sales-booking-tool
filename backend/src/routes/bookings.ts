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

// Get bookings
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']),
  query('userId').optional().isUUID(),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    
    const where: any = {};
    if (req.query.status) where.status = req.query.status;
    if (req.query.userId) where.userId = req.query.userId;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip: offset,
        take: limit,
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true }
          },
          lead: {
            select: { id: true, firstName: true, lastName: true, email: true }
          }
        },
        orderBy: { startTime: 'asc' }
      }),
      prisma.booking.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        bookings,
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

// Create booking
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('startTime').isISO8601().withMessage('Valid start time is required'),
  body('endTime').isISO8601().withMessage('Valid end time is required'),
  body('attendeeEmail').isEmail().withMessage('Valid attendee email is required'),
  body('attendeeName').notEmpty().withMessage('Attendee name is required'),
  body('meetingType').optional().isIn(['IN_PERSON', 'VIDEO_CALL', 'PHONE_CALL']),
  validateRequest
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const bookingData = {
      ...req.body,
      userId: req.user!.id,
      startTime: new Date(req.body.startTime),
      endTime: new Date(req.body.endTime)
    };

    const booking = await prisma.booking.create({
      data: bookingData,
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true }
        },
        lead: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    next(error);
  }
});

export default router;