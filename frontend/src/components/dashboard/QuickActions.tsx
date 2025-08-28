import { motion } from 'framer-motion'
import { 
  PlusIcon,
  UserPlusIcon,
  CalendarDaysIcon,
  DocumentPlusIcon,
  PhoneIcon,
  EnvelopeIcon,
  PresentationChartLineIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const quickActions = [
  {
    name: 'Add Lead',
    description: 'Create a new lead',
    icon: UserPlusIcon,
    color: 'bg-accent-500 hover:bg-accent-600',
    action: '/leads?action=create',
  },
  {
    name: 'New Deal',
    description: 'Start a new deal',
    icon: PresentationChartLineIcon,
    color: 'bg-success-500 hover:bg-success-600',
    action: '/deals?action=create',
  },
  {
    name: 'Schedule Meeting',
    description: 'Book a meeting',
    icon: CalendarDaysIcon,
    color: 'bg-warning-500 hover:bg-warning-600',
    action: '/calendar?action=create',
  },
  {
    name: 'Create Task',
    description: 'Add a new task',
    icon: ClipboardDocumentListIcon,
    color: 'bg-purple-500 hover:bg-purple-600',
    action: '/tasks?action=create',
  },
  {
    name: 'Send Email',
    description: 'Compose email',
    icon: EnvelopeIcon,
    color: 'bg-blue-500 hover:bg-blue-600',
    action: '/communications?action=email',
  },
  {
    name: 'Make Call',
    description: 'Start a phone call',
    icon: PhoneIcon,
    color: 'bg-emerald-500 hover:bg-emerald-600',
    action: '/communications?action=call',
  },
]

const QuickActions = () => {
  const navigate = useNavigate()

  const handleAction = (actionPath: string) => {
    navigate(actionPath)
  }

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <PlusIcon className="w-5 h-5 text-accent-600 dark:text-accent-400" />
        <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
          Quick Actions
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAction(action.action)}
            className="p-4 bg-primary-50 dark:bg-primary-900/50 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800/50 transition-all duration-200 text-left group"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center transition-colors group-hover:scale-110`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-primary-900 dark:text-primary-100 truncate">
                  {action.name}
                </h3>
                <p className="text-xs text-primary-600 dark:text-primary-400 truncate">
                  {action.description}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Recent Actions */}
      <div className="mt-6 pt-4 border-t border-primary-200 dark:border-primary-700">
        <h3 className="text-sm font-medium text-primary-900 dark:text-primary-100 mb-3">
          Recent Actions
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs text-primary-600 dark:text-primary-400">
            <div className="w-2 h-2 bg-success-500 rounded-full" />
            <span>Created lead: TechStart Inc</span>
            <span className="text-primary-400">• 2m ago</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-primary-600 dark:text-primary-400">
            <div className="w-2 h-2 bg-accent-500 rounded-full" />
            <span>Scheduled meeting with Acme Corp</span>
            <span className="text-primary-400">• 15m ago</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-primary-600 dark:text-primary-400">
            <div className="w-2 h-2 bg-warning-500 rounded-full" />
            <span>Updated deal: GlobalTech Partnership</span>
            <span className="text-primary-400">• 1h ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickActions