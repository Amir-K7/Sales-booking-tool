export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  role: 'admin' | 'manager' | 'sales_rep'
  department?: string
  phone?: string
  timezone: string
  preferences: {
    notifications: {
      email: boolean
      push: boolean
      desktop: boolean
    }
    theme: 'light' | 'dark' | 'system'
    language: string
  }
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterCredentials {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: 'manager' | 'sales_rep'
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  password: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}