import { motion } from 'framer-motion'
import { 
  UserGroupIcon,
  FireIcon,
  ClockIcon,
  TrendingUpIcon,
  ChartBarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import StatsCard from '@/components/dashboard/StatsCard'

// Mock lead statistics
const leadStats = [
  {
    name: 'Total Leads',
    value: '2,847',
    change: '+18.2%',
    trend: 'up' as const,
    icon: UserGroupIcon,
    color: 'primary' as const,
    description: 'All leads in pipeline'
  },
  {
    name: 'Hot Leads',
    value: '342',
    change: '+24.1%',
    trend: 'up' as const,
    icon: FireIcon,
    color: 'error' as const,
    description: 'High-priority prospects'
  },
  {
    name: 'Conversion Rate',
    value: '24.3%',
    change: '+2.1%',
    trend: 'up' as const,
    icon: TrendingUpIcon,
    color: 'success' as const,
    description: 'Lead to customer rate'
  },
  {
    name: 'Avg. Score',
    value: '67.8',
    change: '+5.2%',
    trend: 'up' as const,
    icon: SparklesIcon,
    color: 'warning' as const,
    description: 'AI-powered lead score'
  },
  {
    name: 'Follow-ups Due',
    value: '126',
    change: '-8.3%',
    trend: 'down' as const,
    icon: ClockIcon,
    color: 'warning' as const,
    description: 'Pending follow-ups'
  },
  {
    name: 'This Month',
    value: '456',
    change: '+15.7%',
    trend: 'up' as const,
    icon: ChartBarIcon,
    color: 'primary' as const,
    description: 'New leads added'
  }
]

const LeadStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {leadStats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="card p-4 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${
              stat.color === 'primary' ? 'bg-accent-50 dark:bg-accent-900/20' :
              stat.color === 'success' ? 'bg-success-50 dark:bg-success-900/20' :
              stat.color === 'warning' ? 'bg-warning-50 dark:bg-warning-900/20' :
              stat.color === 'error' ? 'bg-error-50 dark:bg-error-900/20' :
              'bg-primary-50 dark:bg-primary-900/20'
            }`}>
              <stat.icon className={`w-5 h-5 ${
                stat.color === 'primary' ? 'text-accent-600 dark:text-accent-400' :
                stat.color === 'success' ? 'text-success-600 dark:text-success-400' :
                stat.color === 'warning' ? 'text-warning-600 dark:text-warning-400' :
                stat.color === 'error' ? 'text-error-600 dark:text-error-400' :
                'text-primary-600 dark:text-primary-400'
              }`} />
            </div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              stat.trend === 'up' 
                ? 'text-success-600 bg-success-100 dark:bg-success-900/30' 
                : 'text-error-600 bg-error-100 dark:bg-error-900/30'
            }`}>
              <TrendingUpIcon className="w-3 h-3 mr-1" />
              {stat.change}
            </div>
          </div>

          <div>
            <p className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-1">
              {stat.value}
            </p>
            <p className="text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
              {stat.name}
            </p>
            <p className="text-xs text-primary-500 dark:text-primary-400">
              {stat.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default LeadStats