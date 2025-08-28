import { motion } from 'framer-motion'
import { TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/24/solid'
import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  name: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: 'primary' | 'success' | 'warning' | 'error'
}

const colorClasses = {
  primary: {
    bg: 'bg-accent-50 dark:bg-accent-900/20',
    icon: 'text-accent-600 dark:text-accent-400',
    trend: {
      up: 'text-success-600 bg-success-100 dark:bg-success-900/30',
      down: 'text-error-600 bg-error-100 dark:bg-error-900/30'
    }
  },
  success: {
    bg: 'bg-success-50 dark:bg-success-900/20',
    icon: 'text-success-600 dark:text-success-400',
    trend: {
      up: 'text-success-600 bg-success-100 dark:bg-success-900/30',
      down: 'text-error-600 bg-error-100 dark:bg-error-900/30'
    }
  },
  warning: {
    bg: 'bg-warning-50 dark:bg-warning-900/20',
    icon: 'text-warning-600 dark:text-warning-400',
    trend: {
      up: 'text-success-600 bg-success-100 dark:bg-success-900/30',
      down: 'text-error-600 bg-error-100 dark:bg-error-900/30'
    }
  },
  error: {
    bg: 'bg-error-50 dark:bg-error-900/20',
    icon: 'text-error-600 dark:text-error-400',
    trend: {
      up: 'text-success-600 bg-success-100 dark:bg-success-900/30',
      down: 'text-error-600 bg-error-100 dark:bg-error-900/30'
    }
  }
}

const StatsCard = ({ name, value, change, trend, icon: Icon, color }: StatsCardProps) => {
  const classes = colorClasses[color]
  const TrendIcon = trend === 'up' ? TrendingUpIcon : TrendingDownIcon

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className="card p-6 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <div className={`rounded-lg p-3 ${classes.bg}`}>
              <Icon className={`w-6 h-6 ${classes.icon}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {name}
              </p>
              <p className="text-2xl font-bold text-primary-900 dark:text-primary-100 mt-1">
                {value}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${classes.trend[trend]}`}>
          <TrendIcon className="w-3 h-3 mr-1" />
          {change}
        </div>
        <span className="ml-2 text-xs text-primary-500 dark:text-primary-400">
          from last period
        </span>
      </div>
    </motion.div>
  )
}

export default StatsCard