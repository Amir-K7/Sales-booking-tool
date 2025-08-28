export interface Deal {
  id: string
  title: string
  description?: string
  value: number
  currency: string
  probability: number
  stage: DealStage
  leadId?: string
  contactId: string
  companyId?: string
  assignedTo: string
  expectedCloseDate?: string
  actualCloseDate?: string
  lostReason?: string
  tags: string[]
  customFields: Record<string, any>
  notes: Note[]
  activities: Activity[]
  createdAt: string
  updatedAt: string
  
  // Related entities
  contact?: Contact
  company?: Company
  assignedUser?: User
}

export type DealStage = 
  | 'prospecting'
  | 'qualification'
  | 'needs_analysis'
  | 'proposal'
  | 'negotiation'
  | 'closed_won'
  | 'closed_lost'

export interface DealStageConfig {
  id: DealStage
  name: string
  color: string
  probability: number
  order: number
  isActive: boolean
}

export interface Pipeline {
  id: string
  name: string
  description?: string
  stages: DealStageConfig[]
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  position?: string
  companyId?: string
}

export interface Company {
  id: string
  name: string
  industry?: string
  size?: string
  website?: string
  address?: string
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
  | 'stage_changed'
  | 'value_changed'
  | 'task_created'
  | 'task_completed'
  | 'document_shared'
  | 'proposal_sent'

export interface CreateDealRequest {
  title: string
  description?: string
  value: number
  currency?: string
  probability?: number
  stage?: DealStage
  leadId?: string
  contactId: string
  companyId?: string
  assignedTo?: string
  expectedCloseDate?: string
  tags?: string[]
  customFields?: Record<string, any>
  notes?: string
}

export interface UpdateDealRequest {
  title?: string
  description?: string
  value?: number
  currency?: string
  probability?: number
  stage?: DealStage
  contactId?: string
  companyId?: string
  assignedTo?: string
  expectedCloseDate?: string
  actualCloseDate?: string
  lostReason?: string
  tags?: string[]
  customFields?: Record<string, any>
}

export interface DealFilters {
  search?: string
  stage?: DealStage[]
  assignedTo?: string[]
  contactId?: string[]
  companyId?: string[]
  tags?: string[]
  valueMin?: number
  valueMax?: number
  probabilityMin?: number
  probabilityMax?: number
  expectedCloseDateAfter?: string
  expectedCloseDateBefore?: string
  createdAfter?: string
  createdBefore?: string
}

export interface DealMetrics {
  totalValue: number
  totalCount: number
  averageValue: number
  averageProbability: number
  conversionRate: number
  averageSalesCycle: number
  stageDistribution: Record<DealStage, number>
  monthlyTrends: {
    month: string
    value: number
    count: number
  }[]
}