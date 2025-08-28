import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  HomeIcon, 
  UserGroupIcon, 
  CalendarDaysIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  PresentationChartLineIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import ThemeToggle from '../ui/ThemeToggle'
import { useAuthStore } from '@/stores/authStore'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Leads', href: '/leads', icon: UserGroupIcon },
  { name: 'Deals', href: '/deals', icon: PresentationChartLineIcon },
  { name: 'Calendar', href: '/calendar', icon: CalendarDaysIcon },
  { name: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Communications', href: '/communications', icon: ChatBubbleLeftRightIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Team', href: '/team', icon: UsersIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

const Sidebar = () => {
  const { user } = useAuthStore()

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-primary-900 border-r border-primary-200 dark:border-primary-800 px-6 pb-4">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-3"
        >
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <ChartBarIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gradient-primary">
            SalesTool
          </h1>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-accent-50 dark:bg-accent-900/50 text-accent-600 dark:text-accent-400'
                          : 'text-primary-700 dark:text-primary-300 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-primary-50 dark:hover:bg-primary-800'
                      }`
                    }
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </li>

          {/* User section */}
          <li className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <ThemeToggle />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="group -mx-2 flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-medium text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800 transition-colors cursor-pointer"
            >
              <NavLink 
                to="/profile"
                className="flex items-center gap-x-3 flex-1"
              >
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium text-primary-900 dark:text-primary-100">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-primary-500 dark:text-primary-400 capitalize">
                    {user?.role?.replace('_', ' ')}
                  </p>
                </div>
              </NavLink>
            </motion.div>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar