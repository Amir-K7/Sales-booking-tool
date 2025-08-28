import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '@/services/authService'
import type { User, LoginCredentials, RegisterCredentials } from '@/types/auth'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
  initializeAuth: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.login(credentials)
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          localStorage.setItem('auth_token', response.token)
        } catch (error: any) {
          set({
            error: error.message || 'Login failed',
            isLoading: false,
          })
          throw error
        }
      },

      register: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.register(credentials)
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          localStorage.setItem('auth_token', response.token)
        } catch (error: any) {
          set({
            error: error.message || 'Registration failed',
            isLoading: false,
          })
          throw error
        }
      },

      logout: () => {
        localStorage.removeItem('auth_token')
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        })
      },

      clearError: () => {
        set({ error: null })
      },

      initializeAuth: () => {
        const token = localStorage.getItem('auth_token')
        if (token) {
          set({ isLoading: true })
          authService
            .verifyToken(token)
            .then((user) => {
              set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
              })
            })
            .catch(() => {
              localStorage.removeItem('auth_token')
              set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
              })
            })
        }
      },

      updateUser: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)