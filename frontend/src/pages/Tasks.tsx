import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  dueDate: string;
  assignee: string;
  deal?: string;
}

const Tasks = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'HIGH' | 'URGENT'>('all');

  // Mock tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Follow up with TechCorp',
      description: 'Send pricing proposal and schedule demo',
      priority: 'HIGH',
      status: 'PENDING',
      dueDate: '2024-01-16',
      assignee: 'You',
      deal: 'TechCorp - Enterprise License'
    },
    {
      id: 2,
      title: 'Prepare presentation for ABC Inc',
      description: 'Create custom presentation showcasing ROI',
      priority: 'URGENT',
      status: 'IN_PROGRESS',
      dueDate: '2024-01-15',
      assignee: 'You'
    },
    {
      id: 3,
      title: 'Contract review with legal',
      description: 'Review terms and conditions for large deal',
      priority: 'MEDIUM',
      status: 'COMPLETED',
      dueDate: '2024-01-14',
      assignee: 'Sarah Johnson',
      deal: 'MegaCorp - Annual Subscription'
    },
    {
      id: 4,
      title: 'Send welcome package',
      description: 'Send onboarding materials to new client',
      priority: 'LOW',
      status: 'PENDING',
      dueDate: '2024-01-18',
      assignee: 'Mike Chen'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'text-error-600 bg-error-100 dark:bg-error-900/30';
      case 'HIGH': return 'text-warning-600 bg-warning-100 dark:bg-warning-900/30';
      case 'MEDIUM': return 'text-accent-600 bg-accent-100 dark:bg-accent-900/30';
      case 'LOW': return 'text-primary-600 bg-primary-100 dark:bg-primary-900/30';
      default: return 'text-primary-600 bg-primary-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircleIcon className="w-5 h-5 text-success-500" />;
      case 'IN_PROGRESS': return <ClockIcon className="w-5 h-5 text-warning-500" />;
      case 'PENDING': return <ExclamationTriangleIcon className="w-5 h-5 text-accent-500" />;
      default: return <ClockIcon className="w-5 h-5 text-primary-500" />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter !== 'all' && task.status.toLowerCase().replace('_', '-') !== filter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  const toggleTaskStatus = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' as any }
        : task
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
            Tasks
          </h1>
          <p className="text-primary-600 dark:text-primary-400 mt-1">
            Manage your tasks and track progress
          </p>
        </div>
        
        <button className="btn-primary">
          <PlusIcon className="w-4 h-4 mr-2" />
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Status:</span>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as any)}
              className="input-sm"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Priority:</span>
            <select 
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="input-sm"
            >
              <option value="all">All</option>
              <option value="URGENT">Urgent</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="grid gap-4">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card p-6 ${task.status === 'COMPLETED' ? 'opacity-60' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className="mt-1"
                >
                  {getStatusIcon(task.status)}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className={`text-lg font-semibold ${
                      task.status === 'COMPLETED' 
                        ? 'line-through text-primary-500' 
                        : 'text-primary-900 dark:text-primary-100'
                    }`}>
                      {task.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  
                  <p className="text-primary-600 dark:text-primary-400 mb-3">
                    {task.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-primary-500 dark:text-primary-500">
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Assigned to: {task.assignee}</span>
                    {task.deal && (
                      <>
                        <span>•</span>
                        <span className="text-accent-600 dark:text-accent-400">{task.deal}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="ml-4 flex items-center space-x-2">
                <button className="btn-ghost text-sm">Edit</button>
                <button className="btn-ghost text-sm text-error-600">Delete</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="card p-12 text-center">
          <ClockIcon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100 mb-2">
            No tasks found
          </h3>
          <p className="text-primary-600 dark:text-primary-400 mb-4">
            {filter === 'all' ? 'Get started by creating your first task.' : `No ${filter} tasks match your criteria.`}
          </p>
          <button className="btn-primary">
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Task
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;