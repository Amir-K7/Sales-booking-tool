import { motion } from 'framer-motion'
import { 
  ClockIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  DocumentIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

// Mock activity data
const activities = [
  {
    id: '1',
    type: 'lead_created',
    title: 'New lead added',
    description: 'TechStart Inc added to pipeline',
    user: 'Sarah Johnson',
    timestamp: '2 minutes ago',
    icon: UserIcon,
    color: 'success',
    metadata: { leadName: 'TechStart Inc', value: '$45,000' }
  },
  {
    id: '2',
    type: 'meeting_completed',
    title: 'Demo completed',
    description: 'Product demo with Acme Corp finished',
    user: 'Mike Chen',
    timestamp: '15 minutes ago',
    icon: CalendarIcon,
    color: 'primary',
    metadata: { company: 'Acme Corp', duration: '45 min' }
  },
  {
    id: '3',
    type: 'email_sent',
    title: 'Follow-up email sent',
    description: 'Proposal sent to GlobalTech',
    user: 'Lisa Wang',
    timestamp: '1 hour ago',
    icon: EnvelopeIcon,
    color: 'accent',
    metadata: { recipient: 'GlobalTech', subject: 'Partnership Proposal' }
  },
  {
    id: '4',
    type: 'deal_won',
    title: 'Deal closed!',
    description: 'RetailPlus signed annual contract',
    user: 'David Brown',
    timestamp: '2 hours ago',
    icon: CheckCircleIcon,
    color: 'success',
    metadata: { company: 'RetailPlus', value: '$180,000' }
  },
  {
    id: '5',
    type: 'call_made',
    title: 'Discovery call',
    description: 'Initial call with FinanceFirst',
    user: 'Emma Davis',
    timestamp: '3 hours ago',
    icon: PhoneIcon,
    color: 'warning',
    metadata: { company: 'FinanceFirst', duration: '30 min' }
  },
  {
    id: '6',
    type: 'task_overdue',
    title: 'Overdue task',
    description: 'Follow-up with StartupFlow is overdue',
    user: 'System',
    timestamp: '4 hours ago',
    icon: ExclamationTriangleIcon,
    color: 'error',
    metadata: { company: 'StartupFlow', taskType: 'Follow-up call' }
  },
  {
    id: '7',
    type: 'document_shared',
    title: 'Proposal shared',
    description: 'Shared contract with MedTech Solutions',
    user: 'Sarah Johnson',
    timestamp: '5 hours ago',
    icon: DocumentIcon,
    color: 'accent',
    metadata: { company: 'MedTech Solutions', documentType: 'Contract' }
  },
  {
    id: '8',
    type: 'lead_scored',
    title: 'Lead score updated',
    description: 'AI updated CloudCorp lead score to 87',
    user: 'AI Assistant',
    timestamp: '6 hours ago',
    icon: UserIcon,
    color: 'primary',
    metadata: { company: 'CloudCorp', score: 87, previousScore: 74 }
  },
]

const getActivityColor = (color: string) => {
  const colors = {
    primary: 'text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-900/20',
    success: 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/20',
    warning: 'text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-900/20',
    error: 'text-error-600 dark:text-error-400 bg-error-50 dark:bg-error-900/20',
    accent: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  }
  return colors[color as keyof typeof colors] || colors.primary
}

const RecentActivities = () => {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ClockIcon className="w-5 h-5 text-accent-600 dark:text-accent-400" />
          <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
            Recent Activities
          </h2>
        </div>
        <button className="btn-ghost text-sm">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors cursor-pointer group"
          >
            <div className={`p-2 rounded-lg ${getActivityColor(activity.color)}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-primary-900 dark:text-primary-100 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                  {activity.title}
                </h3>
                <span className="text-xs text-primary-500 dark:text-primary-400 whitespace-nowrap">
                  {activity.timestamp}
                </span>
              </div>
              
              <p className="text-sm text-primary-600 dark:text-primary-400 mb-1">
                {activity.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary-500 dark:text-primary-400">
                  by {activity.user}
                </span>
                
                {activity.metadata && (
                  <div className="flex items-center space-x-2">
                    {activity.metadata.value && (
                      <span className="text-xs font-medium text-success-600 dark:text-success-400">
                        {activity.metadata.value}
                      </span>
                    )}
                    {activity.metadata.score && (
                      <span className="text-xs font-medium text-accent-600 dark:text-accent-400">
                        Score: {activity.metadata.score}
                        {activity.metadata.previousScore && (
                          <span className="text-primary-400 ml-1">
                            (+{activity.metadata.score - activity.metadata.previousScore})
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Summary */}
      <div className="mt-6 pt-4 border-t border-primary-200 dark:border-primary-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-primary-900 dark:text-primary-100">
              {activities.filter(a => a.timestamp.includes('hour')).length}
            </p>
            <p className="text-xs text-primary-600 dark:text-primary-400">
              Last Hour
            </p>
          </div>
          <div>
            <p className="text-lg font-bold text-primary-900 dark:text-primary-100">
              {activities.length}
            </p>
            <p className="text-xs text-primary-600 dark:text-primary-400">
              Today
            </p>
          </div>
          <div>
            <p className="text-lg font-bold text-success-600 dark:text-success-400">
              {activities.filter(a => a.color === 'success').length}
            </p>
            <p className="text-xs text-primary-600 dark:text-primary-400">
              Completed
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentActivities