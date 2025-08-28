import axios from 'axios'
import type { 
  User, 
  LoginCredentials, 
  RegisterCredentials, 
  AuthResponse,
  PasswordResetRequest,
  PasswordResetConfirm,
  ChangePasswordRequest
} from '@/types/auth'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', credentials)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  },

  async verifyToken(token: string): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error: any) {
      throw new Error('Invalid token')
    }
  },

  async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = localStorage.getItem('refresh_token')
      const response = await api.post<AuthResponse>('/auth/refresh', {
        refreshToken
      })
      return response.data
    } catch (error: any) {
      throw new Error('Token refresh failed')
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
    }
  },

  async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    try {
      await api.post('/auth/forgot-password', data)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset request failed')
    }
  },

  async confirmPasswordReset(data: PasswordResetConfirm): Promise<void> {
    try {
      await api.post('/auth/reset-password', data)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed')
    }
  },

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    try {
      await api.post('/auth/change-password', data)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password change failed')
    }
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    try {
      const response = await api.put<User>('/auth/profile', updates)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed')
    }
  },

  async uploadAvatar(file: File): Promise<string> {
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      
      const response = await api.post<{ url: string }>('/auth/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      return response.data.url
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Avatar upload failed')
    }
  },
}

export default api