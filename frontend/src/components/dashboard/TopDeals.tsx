import { motion } from 'framer-motion'
import { 
  CurrencyDollarIcon, 
  ArrowTrendingUpIcon,
  ClockIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

// Mock data for top deals
const topDeals = [
  {
    id: '1',
    title: 'Enterprise Software License',
    company: 'TechCorp Solutions',
    value: 125000,
    probability: 85,
    stage: 'Negotiation',
    closingDate: '2024-01-15',
    assignedTo: 'Sarah Johnson',
    isHot: true,
  },
  {
    id: '2',
    title: 'Cloud Migration Project',
    company: 'GlobalTech Inc',
    value: 89000,
    probability: 70,
    stage: 'Proposal',
    closingDate: '2024-01-22',
    assignedTo: 'Mike Chen',
    isHot: false,
  },
  {
    id: '3',
    title: 'Annual Support Contract',
    company: 'StartupFlow',
    value: 45000,
    probability: 90,
    stage: 'Closed Won',
    closingDate: '2024-01-08',
    assignedTo: 'Lisa Wang',
    isHot: false,
  },
  {
    id: '4',
    title: 'Digital Transformation',
    company: 'RetailPlus',
    value: 180000,
    probability: 60,
    stage: 'Qualification',
    closingDate: '2024-02-05',
    assignedTo: 'David Brown',
    isHot: true,
  },
  {
    id: '5',
    title: 'Security Audit Services',
    company: 'FinanceFirst',
    value: 32000,
    probability: 75,
    stage: 'Proposal',
    closingDate: '2024-01-28',
    assignedTo: 'Emma Davis',
    isHot: false,
  },
]

const getStageColor = (stage: string) => {
  const colors = {
    'Prospecting': 'bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-200',
    'Qualification': 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-200',
    'Proposal': 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-200',
    'Negotiation': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
    'Closed Won': 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-200',
    'Closed Lost': 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-200',
  }
  return colors[stage as keyof typeof colors] || colors['Prospecting']
}

const getProbabilityColor = (probability: number) => {
  if (probability >= 80) return 'text-success-600 dark:text-success-400'
  if (probability >= 60) return 'text-warning-600 dark:text-warning-400'
  if (probability >= 40) return 'text-accent-600 dark:text-accent-400'
  return 'text-error-600 dark:text-error-400'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'Overdue'
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays <= 7) return `${diffDays} days`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const TopDeals = () => {
  const totalValue = topDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0)

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <CurrencyDollarIcon className="w-5 h-5 text-accent-600 dark:text-accent-400" />
          <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
            Top Deals
          </h2>
        </div>
        <button className="btn-ghost text-sm">
          <EyeIcon className="w-4 h-4 mr-1" />
          View All
        </button>
      </div>

      {/* Summary */}
      <div className="mb-6 p-4 bg-gradient-to-r from-accent-50 to-success-50 dark:from-accent-900/20 dark:to-success-900/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-primary-600 dark:text-primary-400">
              Weighted Pipeline Value
            </p>
            <p className="text-2xl font-bold text-primary-900 dark:text-primary-100">
              ${totalValue.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center space-x-1 text-success-600 dark:text-success-400">
            <ArrowTrendingUpIcon className="w-4 h-4" />
            <span className="text-sm font-medium">+15.3%</span>
          </div>
        </div>
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        {topDeals.map((deal, index) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative p-4 bg-primary-50 dark:bg-primary-900/50 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800/50 transition-colors cursor-pointer group"
          >
            {deal.isHot && (
              <div className="absolute -top-1 -right-1 flex items-center space-x-1">
                <div className="w-2 h-2 bg-error-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-error-600 dark:text-error-400 bg-error-100 dark:bg-error-900/30 px-2 py-0.5 rounded">
                  HOT
                </span>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-primary-900 dark:text-primary-100 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                    {deal.company}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary-900 dark:text-primary-100">
                    ${deal.value.toLocaleString()}
                  </p>
                  <p className={`text-xs font-medium ${getProbabilityColor(deal.probability)}`}>
                    {deal.probability}% likely
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`badge text-xs ${getStageColor(deal.stage)}`}>
                    {deal.stage}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-primary-500 dark:text-primary-400">
                    <ClockIcon className="w-3 h-3" />
                    <span>{formatDate(deal.closingDate)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {deal.assignedTo.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-primary-200 dark:bg-primary-700 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-accent-500 to-success-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${deal.probability}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="mt-6 pt-4 border-t border-primary-200 dark:border-primary-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-primary-900 dark:text-primary-100">
              {topDeals.filter(d => d.probability >= 70).length}
            </p>
            <p className="text-xs text-primary-600 dark:text-primary-400">
              High Probability
            </p>
          </div>
          <div>
            <p className="text-lg font-bold text-primary-900 dark:text-primary-100">
              {topDeals.filter(d => new Date(d.closingDate) <= new Date(Date.now() + 7*24*60*60*1000)).length}
            </p>
            <p className="text-xs text-primary-600 dark:text-primary-400">
              Closing This Week
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopDeals