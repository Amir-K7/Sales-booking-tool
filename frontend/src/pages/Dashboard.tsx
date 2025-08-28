import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChartBarIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import StatsCard from '@/components/dashboard/StatsCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import LeaderboardCard from '@/components/dashboard/LeaderboardCard'
import RecentActivities from '@/components/dashboard/RecentActivities'
import TodaysSchedule from '@/components/dashboard/TodaysSchedule'
import PipelineOverview from '@/components/dashboard/PipelineOverview'
import TopDeals from '@/components/dashboard/TopDeals'
import QuickActions from '@/components/dashboard/QuickActions'

// Mock data
const stats = [
  {
    name: 'Total Revenue',
    value: '$847,420',
    change: '+12.5%',
    trend: 'up' as const,
    icon: CurrencyDollarIcon,
    color: 'success' as const,
  },
  {
    name: 'Active Leads',
    value: '2,847',
    change: '+18.2%',
    trend: 'up' as const,
    icon: UserGroupIcon,
    color: 'primary' as const,
  },
  {
    name: 'Deals Closed',
    value: '156',
    change: '+8.1%',
    trend: 'up' as const,
    icon: ChartBarIcon,
    color: 'warning' as const,
  },
  {
    name: 'Conversion Rate',
    value: '24.3%',
    change: '-2.4%',
    trend: 'down' as const,
    icon: TrendingUpIcon,
    color: 'error' as const,
  },
]

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
            Welcome back! 👋
          </h1>
          <p className="text-primary-600 dark:text-primary-400 mt-1">
            Here's what's happening with your sales today
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input w-auto"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts and Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Chart */}
          <motion.div variants={itemVariants}>
            <RevenueChart timeRange={timeRange} />
          </motion.div>

          {/* Pipeline Overview */}
          <motion.div variants={itemVariants}>
            <PipelineOverview />
          </motion.div>

          {/* Recent Activities */}
          <motion.div variants={itemVariants}>
            <RecentActivities />
          </motion.div>
        </div>

        {/* Right Column - Side Panels */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <QuickActions />
          </motion.div>

          {/* Today's Schedule */}
          <motion.div variants={itemVariants}>
            <TodaysSchedule />
          </motion.div>

          {/* Top Deals */}
          <motion.div variants={itemVariants}>
            <TopDeals />
          </motion.div>

          {/* Leaderboard */}
          <motion.div variants={itemVariants}>
            <LeaderboardCard />
          </motion.div>
        </div>
      </div>

      {/* Performance Insights */}
      <motion.div
        variants={itemVariants}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
            Performance Insights
          </h2>
          <button className="btn-ghost text-sm">
            View All <ArrowRightIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-success-50 dark:bg-success-900/20 rounded-lg p-4">
            <div className="flex items-center">
              <TrendingUpIcon className="w-5 h-5 text-success-600 dark:text-success-400 mr-2" />
              <span className="text-sm font-medium text-success-800 dark:text-success-200">
                Hot Leads Increased
              </span>
            </div>
            <p className="text-xs text-success-600 dark:text-success-400 mt-1">
              +15% more qualified leads this week
            </p>
          </div>
          
          <div className="bg-warning-50 dark:bg-warning-900/20 rounded-lg p-4">
            <div className="flex items-center">
              <CalendarDaysIcon className="w-5 h-5 text-warning-600 dark:text-warning-400 mr-2" />
              <span className="text-sm font-medium text-warning-800 dark:text-warning-200">
                Follow-ups Due
              </span>
            </div>
            <p className="text-xs text-warning-600 dark:text-warning-400 mt-1">
              12 leads need follow-up today
            </p>
          </div>
          
          <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-5 h-5 text-accent-600 dark:text-accent-400 mr-2" />
              <span className="text-sm font-medium text-accent-800 dark:text-accent-200">
                Revenue Goal
              </span>
            </div>
            <p className="text-xs text-accent-600 dark:text-accent-400 mt-1">
              87% of monthly target reached
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard