import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileMenu from './MobileMenu'
import NotificationPanel from './NotificationPanel'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false)

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <MobileMenu 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </div>

      <div className="lg:pl-72">
        {/* Header */}
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          onNotificationsClick={() => setNotificationsPanelOpen(true)}
        />

        {/* Main content */}
        <main className="py-6">
          <div className="container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>

      {/* Notifications panel */}
      <NotificationPanel 
        isOpen={notificationsPanelOpen}
        onClose={() => setNotificationsPanelOpen(false)}
      />
    </div>
  )
}

export default Layout