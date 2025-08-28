export interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  position?: string
  source: LeadSource
  status: LeadStatus
  score: number
  temperature: 'cold' | 'warm' | 'hot'
  assignedTo?: string
  tags: string[]
  customFields: Record<string, any>
  notes: Note[]
  activities: Activity[]
  createdAt: string
  updatedAt: string
  lastContactedAt?: string
  nextFollowUpAt?: string
}

export type LeadSource = 
  | 'website'
  | 'social_media'
  | 'referral'
  | 'cold_outreach'
  | 'webinar'
  | 'trade_show'
  | 'content_marketing'
  | 'paid_advertising'
  | 'partner'
  | 'other'

export type LeadStatus = 
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'unqualified'
  | 'nurturing'
  | 'converted'
  | 'lost'

export interface LeadScoring {
  demographic: number // Company size, position, industry
  behavioral: number   // Website visits, email opens, content downloads
  engagement: number   // Response rate, meeting attendance
  fit: number         // Budget, timeline, authority, need
  total: number
}

export interface Note {
  id: string
  content: string
  authorId: string
  authorName: string
  createdAt: string
  isPrivate: boolean
}

export interface Activity {
  id: string
  type: ActivityType
  title: string
  description?: string
  authorId: string
  authorName: string
  createdAt: string
  metadata?: Record<string, any>
}

export type ActivityType = 
  | 'email_sent'
  | 'email_received'
  | 'call_made'
  | 'call_received'
  | 'meeting_scheduled'
  | 'meeting_completed'
  | 'note_added'
  | 'status_changed'
  | 'score_updated'
  | 'task_created'
  | 'task_completed'

export interface CreateLeadRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  position?: string
  source: LeadSource
  assignedTo?: string
  tags?: string[]
  customFields?: Record<string, any>
  notes?: string
}

export interface UpdateLeadRequest {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  company?: string
  position?: string
  source?: LeadSource
  status?: LeadStatus
  assignedTo?: string
  tags?: string[]
  customFields?: Record<string, any>
  nextFollowUpAt?: string
}

export interface LeadFilters {
  search?: string
  status?: LeadStatus[]
  source?: LeadSource[]
  assignedTo?: string[]
  temperature?: ('cold' | 'warm' | 'hot')[]
  tags?: string[]
  scoreMin?: number
  scoreMax?: number
  createdAfter?: string
  createdBefore?: string
  lastContactedAfter?: string
  lastContactedBefore?: string
}