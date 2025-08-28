import { motion } from 'framer-motion'
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  VideoCameraIcon,
  PhoneIcon,
  MapPinIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

// Mock data for today's schedule
const todaysEvents = [
  {
    id: '1',
    title: 'Sales Team Standup',
    time: '09:00 AM',
    duration: '30 min',
    type: 'meeting' as const,
    location: 'Conference Room A',
    attendees: ['John Doe', 'Sarah Smith'],
    status: 'upcoming' as const,
  },
  {
    id: '2',
    title: 'Demo with Acme Corp',
    time: '10:30 AM',
    duration: '45 min',
    type: 'demo' as const,
    location: 'Zoom Call',
    attendees: ['Michael Johnson'],
    status: 'upcoming' as const,
    isImportant: true,
  },
  {
    id: '3',
    title: 'Follow-up Call - TechStart Inc',
    time: '02:00 PM',
    duration: '30 min',
    type: 'call' as const,
    location: 'Phone Call',
    attendees: ['Lisa Chen'],
    status: 'upcoming' as const,
  },
  {
    id: '4',
    title: 'Proposal Review',
    time: '03:30 PM',
    duration: '60 min',
    type: 'meeting' as const,
    location: 'Conference Room B',
    attendees: ['Team Leads'],
    status: 'upcoming' as const,
  },
  {
    id: '5',
    title: 'Client Onboarding - GlobalTech',
    time: '05:00 PM',
    duration: '45 min',
    type: 'meeting' as const,
    location: 'Virtual Meeting',
    attendees: ['Robert Williams'],
    status: 'upcoming' as const,
  },
]

const getEventIcon = (type: string) => {
  switch (type) {
    case 'demo':
      return VideoCameraIcon
    case 'call':
      return PhoneIcon
    case 'meeting':
    default:
      return CalendarDaysIcon
  }
}

const getEventColor = (type: string, isImportant?: boolean) => {
  if (isImportant) {
    return {
      bg: 'bg-error-50 dark:bg-error-900/20',
      border: 'border-error-200 dark:border-error-800',
      icon: 'text-error-600 dark:text-error-400',
      time: 'text-error-700 dark:text-error-300',
    }
  }

  switch (type) {
    case 'demo':
      return {
        bg: 'bg-accent-50 dark:bg-accent-900/20',
        border: 'border-accent-200 dark:border-accent-800',
        icon: 'text-accent-600 dark:text-accent-400',
        time: 'text-accent-700 dark:text-accent-300',
      }
    case 'call':
      return {
        bg: 'bg-warning-50 dark:bg-warning-900/20',
        border: 'border-warning-200 dark:border-warning-800',
        icon: 'text-warning-600 dark:text-warning-400',
        time: 'text-warning-700 dark:text-warning-300',
      }
    case 'meeting':
    default:
      return {
        bg: 'bg-primary-50 dark:bg-primary-900/20',
        border: 'border-primary-200 dark:border-primary-700',
        icon: 'text-primary-600 dark:text-primary-400',
        time: 'text-primary-700 dark:text-primary-300',
      }
  }
}

const TodaysSchedule = () => {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <CalendarDaysIcon className="w-5 h-5 text-accent-600 dark:text-accent-400" />
          <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
            Today's Schedule
          </h2>
        </div>
        <button className="btn-ghost text-sm">
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Event
        </button>
      </div>

      <div className="space-y-3">
        {todaysEvents.map((event, index) => {
          const Icon = getEventIcon(event.type)
          const colors = getEventColor(event.type, event.isImportant)
          const eventHour = parseInt(event.time.split(':')[0])
          const isPast = eventHour < currentHour

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative p-3 rounded-lg border ${colors.bg} ${colors.border} ${
                isPast ? 'opacity-60' : ''
              } hover:shadow-md transition-all duration-200 cursor-pointer`}
            >
              {event.isImportant && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full animate-pulse" />
              )}
              
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${colors.bg} ${colors.border} border`}>
                  <Icon className={`w-4 h-4 ${colors.icon}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-sm font-medium ${colors.time} truncate`}>
                      {event.title}
                    </h3>
                    {isPast && (
                      <span className="text-xs text-success-600 dark:text-success-400 font-medium">
                        Completed
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-primary-600 dark:text-primary-400">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-3 h-3" />
                      <span>{event.time} • {event.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="w-3 h-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                  
                  {event.attendees.length > 0 && (
                    <div className="mt-2 flex items-center space-x-1">
                      <div className="flex -space-x-1">
                        {event.attendees.slice(0, 3).map((attendee, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-primary-800"
                            title={attendee}
                          >
                            {attendee.split(' ').map(n => n[0]).join('')}
                          </div>
                        ))}
                      </div>
                      {event.attendees.length > 3 && (
                        <span className="text-xs text-primary-500 dark:text-primary-400 ml-2">
                          +{event.attendees.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-primary-200 dark:border-primary-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary-600 dark:text-primary-400">
            {todaysEvents.length} events today
          </span>
          <span className="text-primary-600 dark:text-primary-400">
            Next: {todaysEvents.find(e => parseInt(e.time.split(':')[0]) > currentHour)?.time || 'No more events'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TodaysSchedule