import { motion } from 'framer-motion'
import { 
  SparklesIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  TrendingUpIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

// Mock AI insights data
const aiInsights = [
  {
    type: 'opportunity',
    title: 'High-Value Lead Identified',
    description: 'TechCorp Solutions shows 89% conversion probability based on engagement patterns',
    action: 'Schedule demo call',
    priority: 'high',
    icon: TrendingUpIcon,
    color: 'success'
  },
  {
    type: 'warning',
    title: 'Lead Going Cold',
    description: '5 leads haven\'t been contacted in 7+ days. Risk of losing interest.',
    action: 'Send follow-up emails',
    priority: 'medium',
    icon: ExclamationTriangleIcon,
    color: 'warning'
  },
  {
    type: 'insight',
    title: 'Best Contact Time',
    description: 'Your leads are most responsive on Tuesdays at 2-4 PM',
    action: 'Schedule calls accordingly',
    priority: 'low',
    icon: ClockIcon,
    color: 'primary'
  },
  {
    type: 'recommendation',
    title: 'Content Suggestion',
    description: 'Healthcare leads respond 40% better to case study content',
    action: 'Create healthcare case studies',
    priority: 'medium',
    icon: LightBulbIcon,
    color: 'accent'
  }
]

const getInsightColor = (color: string) => {
  const colors = {
    success: {
      bg: 'bg-success-50 dark:bg-success-900/20',
      border: 'border-success-200 dark:border-success-800',
      icon: 'text-success-600 dark:text-success-400',
      text: 'text-success-700 dark:text-success-300'
    },
    warning: {
      bg: 'bg-warning-50 dark:bg-warning-900/20',
      border: 'border-warning-200 dark:border-warning-800',
      icon: 'text-warning-600 dark:text-warning-400',
      text: 'text-warning-700 dark:text-warning-300'
    },
    primary: {
      bg: 'bg-accent-50 dark:bg-accent-900/20',
      border: 'border-accent-200 dark:border-accent-800',
      icon: 'text-accent-600 dark:text-accent-400',
      text: 'text-accent-700 dark:text-accent-300'
    },
    accent: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      icon: 'text-purple-600 dark:text-purple-400',
      text: 'text-purple-700 dark:text-purple-300'
    }
  }
  return colors[color as keyof typeof colors] || colors.primary
}

const getPriorityColor = (priority: string) => {
  const colors = {
    high: 'bg-error-500',
    medium: 'bg-warning-500',
    low: 'bg-primary-500'
  }
  return colors[priority as keyof typeof colors] || colors.low
}

const AIInsights = () => {
  return (
    <div className="card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-accent-600 rounded-lg">
          <SparklesIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
            AI Insights
          </h2>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            Smart recommendations to boost your lead conversion
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {aiInsights.map((insight, index) => {
          const colors = getInsightColor(insight.color)
          const Icon = insight.icon

          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative p-4 border rounded-lg ${colors.bg} ${colors.border} hover:shadow-md transition-all duration-200 cursor-pointer group`}
            >
              {/* Priority Indicator */}
              <div className="absolute top-3 right-3 flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(insight.priority)}`} />
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400 capitalize">
                  {insight.priority}
                </span>
              </div>

              <div className="flex items-start space-x-3 pr-16">
                <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                </div>

                <div className="flex-1">
                  <h3 className={`text-sm font-medium mb-2 ${colors.text} group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors`}>
                    {insight.title}
                  </h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 mb-3">
                    {insight.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <button className={`text-xs font-medium ${colors.text} hover:underline`}>
                      {insight.action} →
                    </button>
                    <span className="text-xs text-primary-500 dark:text-primary-400">
                      AI Recommendation
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* AI Performance Stats */}
      <div className="mt-6 pt-4 border-t border-primary-200 dark:border-primary-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-primary-900 dark:text-primary-100">
              94.2%
            </p>
            <p className="text-xs text-primary-600 dark:text-primary-400">
              Prediction Accuracy
            </p>
          </div>
          <div>
            <p className="text-lg font-bold text-success-600 dark:text-success-400">
              +23%
            </p>
            <p className="text-xs text-primary-600 dark:text-primary-400">
              Conversion Improvement
            </p>
          </div>
          <div>
            <p className="text-lg font-bold text-accent-600 dark:text-accent-400">
              47
            </p>
            <p className="text-xs text-primary-600 dark:text-primary-400">
              Insights Generated
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIInsights