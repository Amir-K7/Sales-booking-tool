import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '@/middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// Get dashboard overview
router.get('/overview', async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = req.user!.id;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    const [
      totalLeads,
      newLeadsThisMonth,
      totalDeals,
      activeDeals,
      wonDealsValue,
      upcomingBookings,
      pendingTasks,
      recentActivities
    ] = await Promise.all([
      // Total leads assigned to user
      prisma.lead.count({
        where: { assignedToId: userId }
      }),
      
      // New leads this month
      prisma.lead.count({
        where: {
          assignedToId: userId,
          createdAt: { gte: startOfMonth }
        }
      }),
      
      // Total deals
      prisma.deal.count({
        where: { assignedToId: userId }
      }),
      
      // Active deals
      prisma.deal.count({
        where: {
          assignedToId: userId,
          stage: { in: ['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION'] }
        }
      }),
      
      // Won deals value this month
      prisma.deal.aggregate({
        where: {
          assignedToId: userId,
          stage: 'CLOSED_WON',
          actualCloseDate: { gte: startOfMonth }
        },
        _sum: { value: true }
      }),
      
      // Upcoming bookings
      prisma.booking.findMany({
        where: {
          userId,
          startTime: { gte: new Date() },
          status: { in: ['SCHEDULED', 'CONFIRMED'] }
        },
        take: 5,
        orderBy: { startTime: 'asc' },
        include: {
          lead: {
            select: { firstName: true, lastName: true, company: true }
          }
        }
      }),
      
      // Pending tasks
      prisma.task.findMany({
        where: {
          assignedToId: userId,
          status: { in: ['PENDING', 'IN_PROGRESS'] }
        },
        take: 5,
        orderBy: { dueDate: 'asc' },
        include: {
          deal: {
            select: { title: true }
          }
        }
      }),
      
      // Recent activities
      prisma.activity.findMany({
        where: { userId },
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          lead: {
            select: { firstName: true, lastName: true, company: true }
          },
          deal: {
            select: { title: true }
          }
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalLeads,
          newLeadsThisMonth,
          totalDeals,
          activeDeals,
          monthlyRevenue: wonDealsValue._sum.value || 0
        },
        upcomingBookings,
        pendingTasks,
        recentActivities
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get revenue chart data
router.get('/revenue-chart', async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = req.user!.id;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const revenueData = await prisma.deal.groupBy({
      by: ['actualCloseDate'],
      where: {
        assignedToId: userId,
        stage: 'CLOSED_WON',
        actualCloseDate: { gte: sixMonthsAgo }
      },
      _sum: { value: true },
      orderBy: { actualCloseDate: 'asc' }
    });

    res.json({
      success: true,
      data: revenueData
    });
  } catch (error) {
    next(error);
  }
});

export default router;