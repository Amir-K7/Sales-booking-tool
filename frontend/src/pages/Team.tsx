import { motion } from 'framer-motion';
import { UserPlusIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Sales Manager',
      email: 'john@company.com',
      avatar: null,
      status: 'active',
      deals: 24,
      revenue: 125000
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Sales Rep',
      email: 'sarah@company.com',
      avatar: null,
      status: 'active',
      deals: 18,
      revenue: 89000
    },
    {
      id: 3,
      name: 'Mike Chen',
      role: 'Sales Rep',
      email: 'mike@company.com',
      avatar: null,
      status: 'active',
      deals: 16,
      revenue: 76000
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
            Team Management
          </h1>
          <p className="text-primary-600 dark:text-primary-400 mt-1">
            Manage your sales team and track performance
          </p>
        </div>
        
        <button className="btn-primary">
          <UserPlusIcon className="w-4 h-4 mr-2" />
          Add Team Member
        </button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <UserGroupIcon className="w-8 h-8 text-accent-500 mb-2" />
          <h3 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
            {teamMembers.length}
          </h3>
          <p className="text-primary-600 dark:text-primary-400">Total Members</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="w-8 h-8 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center mb-2">
            <span className="text-success-600 font-bold">$</span>
          </div>
          <h3 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
            $290K
          </h3>
          <p className="text-primary-600 dark:text-primary-400">Total Revenue</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="w-8 h-8 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center mb-2">
            <span className="text-warning-600 font-bold">#</span>
          </div>
          <h3 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
            58
          </h3>
          <p className="text-primary-600 dark:text-primary-400">Active Deals</p>
        </motion.div>
      </div>

      {/* Team Members */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">
          Team Members
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary-200 dark:border-primary-700">
                <th className="text-left py-3 px-4 font-medium text-primary-600 dark:text-primary-400">
                  Member
                </th>
                <th className="text-left py-3 px-4 font-medium text-primary-600 dark:text-primary-400">
                  Role
                </th>
                <th className="text-left py-3 px-4 font-medium text-primary-600 dark:text-primary-400">
                  Active Deals
                </th>
                <th className="text-left py-3 px-4 font-medium text-primary-600 dark:text-primary-400">
                  Revenue
                </th>
                <th className="text-left py-3 px-4 font-medium text-primary-600 dark:text-primary-400">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-primary-600 dark:text-primary-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-primary-100 dark:border-primary-800"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-primary-900 dark:text-primary-100">
                          {member.name}
                        </p>
                        <p className="text-sm text-primary-600 dark:text-primary-400">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-primary-900 dark:text-primary-100">
                    {member.role}
                  </td>
                  <td className="py-4 px-4 text-primary-900 dark:text-primary-100">
                    {member.deals}
                  </td>
                  <td className="py-4 px-4 text-primary-900 dark:text-primary-100">
                    ${member.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-200">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="btn-ghost text-sm">Edit</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Team;