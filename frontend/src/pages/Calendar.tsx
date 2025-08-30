import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon, 
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Sales Call with John Doe',
      time: '10:00 AM',
      date: '2024-01-15',
      type: 'call',
      color: 'bg-accent-500'
    },
    {
      id: 2,
      title: 'Product Demo - TechCorp',
      time: '2:00 PM',
      date: '2024-01-15',
      type: 'demo',
      color: 'bg-success-500'
    },
    {
      id: 3,
      title: 'Follow-up Meeting',
      time: '4:30 PM',
      date: '2024-01-16',
      type: 'meeting',
      color: 'bg-warning-500'
    }
  ];

  const today = new Date();
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
            Calendar
          </h1>
          <p className="text-primary-600 dark:text-primary-400 mt-1">
            Manage your meetings and appointments
          </p>
        </div>
        
        <button className="btn-primary">
          <PlusIcon className="w-4 h-4 mr-2" />
          New Event
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button className="btn-ghost p-2">
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
              {currentDate.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h2>
            <button className="btn-ghost p-2">
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setView('month')}
              className={`px-3 py-1 rounded-md text-sm ${
                view === 'month' 
                  ? 'bg-accent-500 text-white' 
                  : 'text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-800'
              }`}
            >
              Month
            </button>
            <button 
              onClick={() => setView('week')}
              className={`px-3 py-1 rounded-md text-sm ${
                view === 'week' 
                  ? 'bg-accent-500 text-white' 
                  : 'text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-800'
              }`}
            >
              Week
            </button>
            <button 
              onClick={() => setView('day')}
              className={`px-3 py-1 rounded-md text-sm ${
                view === 'day' 
                  ? 'bg-accent-500 text-white' 
                  : 'text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-800'
              }`}
            >
              Day
            </button>
          </div>
        </div>

        {/* Simple Calendar View */}
        <div className="grid grid-cols-7 gap-4 mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-primary-600 dark:text-primary-400 py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 6);
            return (
              <div 
                key={i} 
                className={`p-2 text-center text-sm cursor-pointer rounded-lg transition-colors ${
                  isToday(date) 
                    ? 'bg-accent-500 text-white font-semibold' 
                    : date.getMonth() === currentDate.getMonth()
                    ? 'text-primary-900 dark:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-800'
                    : 'text-primary-400 dark:text-primary-600'
                }`}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">
            Today's Schedule
          </h3>
          <div className="space-y-3">
            {events.map(event => (
              <div key={event.id} className="flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-800 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-900 dark:text-primary-100">
                    {event.title}
                  </p>
                  <p className="text-xs text-primary-600 dark:text-primary-400">
                    {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-secondary text-sm py-3">
              <CalendarDaysIcon className="w-4 h-4 mr-2" />
              Book Meeting
            </button>
            <button className="btn-secondary text-sm py-3">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Event
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Calendar;