import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';

const Communications = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
            Communications
          </h1>
          <p className="text-primary-600 dark:text-primary-400 mt-1">
            Manage your email campaigns, calls, and messages
          </p>
        </div>
        
        <button className="btn-primary">
          <PlusIcon className="w-4 h-4 mr-2" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 text-center"
        >
          <EnvelopeIcon className="w-12 h-12 text-accent-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
            Email Campaigns
          </h3>
          <p className="text-primary-600 dark:text-primary-400 mb-4">
            Create and manage email marketing campaigns
          </p>
          <button className="btn-secondary w-full">View Campaigns</button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 text-center"
        >
          <PhoneIcon className="w-12 h-12 text-success-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
            Call Logs
          </h3>
          <p className="text-primary-600 dark:text-primary-400 mb-4">
            Track and analyze your sales calls
          </p>
          <button className="btn-secondary w-full">View Call Logs</button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 text-center"
        >
          <ChatBubbleLeftRightIcon className="w-12 h-12 text-warning-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
            Messages
          </h3>
          <p className="text-primary-600 dark:text-primary-400 mb-4">
            Manage team communications and notes
          </p>
          <button className="btn-secondary w-full">View Messages</button>
        </motion.div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100 mb-4">
          Recent Communications
        </h2>
        <div className="text-center py-12">
          <p className="text-primary-600 dark:text-primary-400">
            No communications yet. Start engaging with your leads!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Communications;