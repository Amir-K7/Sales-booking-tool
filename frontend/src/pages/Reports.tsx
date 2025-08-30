import { motion } from 'framer-motion';
import { ChartBarIcon, DocumentArrowDownIcon, CalendarIcon } from '@heroicons/react/24/outline';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
          Reports & Analytics
        </h1>
        <p className="text-primary-600 dark:text-primary-400 mt-1">
          Analyze your sales performance and generate insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <ChartBarIcon className="w-8 h-8 text-accent-500 mb-4" />
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
            Sales Performance
          </h3>
          <p className="text-primary-600 dark:text-primary-400 text-sm mb-4">
            Track revenue, conversion rates, and team performance
          </p>
          <button className="btn-secondary text-sm">View Report</button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <DocumentArrowDownIcon className="w-8 h-8 text-success-500 mb-4" />
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
            Export Data
          </h3>
          <p className="text-primary-600 dark:text-primary-400 text-sm mb-4">
            Download leads, deals, and activity data
          </p>
          <button className="btn-secondary text-sm">Export Data</button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <CalendarIcon className="w-8 h-8 text-warning-500 mb-4" />
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
            Activity Reports
          </h3>
          <p className="text-primary-600 dark:text-primary-400 text-sm mb-4">
            Analyze team activities and productivity
          </p>
          <button className="btn-secondary text-sm">View Activities</button>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;