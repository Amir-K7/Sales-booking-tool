import { motion } from 'framer-motion';
import { 
  UserIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  CogIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';
import { useThemeStore } from '@/stores/themeStore';

const Settings = () => {
  const { theme, toggleTheme } = useThemeStore();

  const settingsSections = [
    {
      title: 'Account Settings',
      icon: UserIcon,
      items: [
        { label: 'Profile Information', description: 'Update your personal details' },
        { label: 'Change Password', description: 'Update your account password' },
        { label: 'Email Preferences', description: 'Manage email notifications' }
      ]
    },
    {
      title: 'Notifications',
      icon: BellIcon,
      items: [
        { label: 'Push Notifications', description: 'Receive real-time updates' },
        { label: 'Email Notifications', description: 'Get notified via email' },
        { label: 'SMS Notifications', description: 'Receive text message alerts' }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: ShieldCheckIcon,
      items: [
        { label: 'Two-Factor Authentication', description: 'Add an extra layer of security' },
        { label: 'Active Sessions', description: 'Manage your active sessions' },
        { label: 'Data Privacy', description: 'Control your data sharing preferences' }
      ]
    },
    {
      title: 'System Preferences',
      icon: CogIcon,
      items: [
        { label: 'Language', description: 'Choose your preferred language' },
        { label: 'Time Zone', description: 'Set your local time zone' },
        { label: 'Currency', description: 'Select your default currency' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
          Settings
        </h1>
        <p className="text-primary-600 dark:text-primary-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {theme === 'dark' ? (
              <MoonIcon className="w-6 h-6 text-accent-500" />
            ) : (
              <SunIcon className="w-6 h-6 text-accent-500" />
            )}
            <div>
              <h3 className="font-semibold text-primary-900 dark:text-primary-100">
                Theme
              </h3>
              <p className="text-sm text-primary-600 dark:text-primary-400">
                Switch between light and dark mode
              </p>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              theme === 'dark' ? 'bg-accent-600' : 'bg-primary-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="grid gap-6">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (sectionIndex + 1) * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <section.icon className="w-6 h-6 text-accent-500" />
              <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                {section.title}
              </h2>
            </div>
            
            <div className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-800 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="font-medium text-primary-900 dark:text-primary-100">
                      {item.label}
                    </p>
                    <p className="text-sm text-primary-600 dark:text-primary-400">
                      {item.description}
                    </p>
                  </div>
                  <button className="btn-ghost text-sm">Configure</button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6 border-l-4 border-l-error-500"
      >
        <h2 className="text-lg font-semibold text-error-600 mb-4">
          Danger Zone
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-primary-900 dark:text-primary-100">
                Delete Account
              </p>
              <p className="text-sm text-primary-600 dark:text-primary-400">
                Permanently delete your account and all data
              </p>
            </div>
            <button className="btn-ghost text-error-600 hover:bg-error-50 dark:hover:bg-error-900/30">
              Delete Account
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;