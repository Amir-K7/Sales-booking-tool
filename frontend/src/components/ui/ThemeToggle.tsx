import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useThemeStore } from '@/stores/themeStore'
import { motion } from 'framer-motion'

const themes = [
  { value: 'light', name: 'Light', icon: SunIcon },
  { value: 'dark', name: 'Dark', icon: MoonIcon },
  { value: 'system', name: 'System', icon: ComputerDesktopIcon },
] as const

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore()
  
  const currentTheme = themes.find(t => t.value === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 p-2 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800 rounded-lg transition-colors">
        <CurrentIcon className="w-4 h-4" />
        <span className="text-xs">{currentTheme.name}</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute bottom-full left-0 mb-2 w-36 origin-bottom-left bg-white dark:bg-primary-800 rounded-lg shadow-lg border border-primary-200 dark:border-primary-700 focus:outline-none">
          <div className="py-1">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              return (
                <Menu.Item key={themeOption.value}>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme(themeOption.value)}
                      className={`${
                        active || theme === themeOption.value
                          ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'
                          : 'text-primary-700 dark:text-primary-300'
                      } group flex w-full items-center px-3 py-2 text-sm transition-colors`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {themeOption.name}
                      {theme === themeOption.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-2 h-2 bg-accent-500 rounded-full"
                        />
                      )}
                    </button>
                  )}
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ThemeToggle