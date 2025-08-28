import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { 
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import SearchModal from '../ui/SearchModal'
import QuickActionMenu from '../ui/QuickActionMenu'

interface HeaderProps {
  onMenuClick: () => void
  onNotificationsClick: () => void
}

const getPageTitle = (pathname: string): string => {
  const routes: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/leads': 'Lead Management',
    '/deals': 'Deal Pipeline',
    '/calendar': 'Calendar',
    '/tasks': 'Task Management',
    '/communications': 'Communications',
    '/reports': 'Reports & Analytics',
    '/team': 'Team Management',
    '/settings': 'Settings',
    '/profile': 'Profile',
  }
  
  return routes[pathname] || 'Sales Tool'
}

const Header = ({ onMenuClick, onNotificationsClick }: HeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [quickActionOpen, setQuickActionOpen] = useState(false)
  const location = useLocation()
  
  const pageTitle = getPageTitle(location.pathname)

  return (
    <>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-primary-200 dark:border-primary-800 bg-white/95 dark:bg-primary-900/95 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          className="-m-2.5 p-2.5 text-primary-700 dark:text-primary-300 lg:hidden"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-primary-200 dark:bg-primary-800 lg:hidden" />

        {/* Page title */}
        <div className="flex-1 flex items-center gap-x-4">
          <motion.h1
            key={pageTitle}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-semibold leading-6 text-primary-900 dark:text-primary-100"
          >
            {pageTitle}
          </motion.h1>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Search */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
            onClick={() => setSearchOpen(true)}
          >
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Quick actions */}
          <div className="relative">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
              onClick={() => setQuickActionOpen(!quickActionOpen)}
            >
              <span className="sr-only">Quick actions</span>
              <PlusIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            
            <QuickActionMenu 
              isOpen={quickActionOpen}
              onClose={() => setQuickActionOpen(false)}
            />
          </div>

          {/* Notifications */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors relative"
            onClick={onNotificationsClick}
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent-500 text-white text-xs font-medium flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-primary-200 dark:lg:bg-primary-800"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal 
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}

export default Header