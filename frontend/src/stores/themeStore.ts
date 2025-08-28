import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  actualTheme: 'light' | 'dark'
}

interface ThemeActions {
  setTheme: (theme: Theme) => void
  initializeTheme: () => void
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getActualTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === 'system') {
    return getSystemTheme()
  }
  return theme
}

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'system',
      actualTheme: 'light',

      // Actions
      setTheme: (theme) => {
        const actualTheme = getActualTheme(theme)
        set({ theme, actualTheme })
        
        // Update document class
        if (actualTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },

      initializeTheme: () => {
        const { theme } = get()
        const actualTheme = getActualTheme(theme)
        set({ actualTheme })
        
        // Apply theme to document
        if (actualTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }

        // Listen for system theme changes
        if (typeof window !== 'undefined') {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
          const handleChange = () => {
            const currentTheme = get().theme
            if (currentTheme === 'system') {
              const newActualTheme = getSystemTheme()
              set({ actualTheme: newActualTheme })
              
              if (newActualTheme === 'dark') {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            }
          }
          
          mediaQuery.addEventListener('change', handleChange)
          
          // Cleanup function would be needed in a useEffect
          return () => mediaQuery.removeEventListener('change', handleChange)
        }
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
)