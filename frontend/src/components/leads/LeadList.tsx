import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  StarIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CalendarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ViewColumnsIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import type { Lead, LeadFilters } from '@/types/leads'

interface LeadListProps {
  searchQuery: string
  filters: LeadFilters
  viewMode: 'list' | 'grid' | 'pipeline'
  selectedLeads: string[]
  onSelectionChange: (leadIds: string[]) => void
}

// Mock lead data
const mockLeads: Lead[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    position: 'CTO',
    industry: 'technology',
    companySize: '51-200',
    location: 'San Francisco, CA',
    source: 'website',
    status: 'qualified',
    priority: 'high',
    score: 87,
    dealValue: 125000,
    notes: 'Interested in enterprise solution, scheduled demo for next week',
    lastContactDate: '2024-01-20',
    nextFollowUpDate: '2024-01-25',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    tags: ['enterprise', 'hot-lead', 'demo-scheduled'],
    customFields: {}
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@healthplus.com',
    phone: '+1 (555) 234-5678',
    company: 'HealthPlus Medical',
    position: 'Operations Director',
    industry: 'healthcare',
    companySize: '201-1000',
    location: 'Boston, MA',
    source: 'referral',
    status: 'contacted',
    priority: 'medium',
    score: 72,
    dealValue: 85000,
    notes: 'Looking for healthcare compliance solution',
    lastContactDate: '2024-01-18',
    nextFollowUpDate: '2024-01-23',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
    tags: ['healthcare', 'compliance'],
    customFields: {}
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Davis',
    email: 'mike.davis@financegroup.com',
    phone: '+1 (555) 345-6789',
    company: 'Finance Group Inc',
    position: 'VP Finance',
    industry: 'finance',
    companySize: '1000+',
    location: 'New York, NY',
    source: 'cold_call',
    status: 'new',
    priority: 'high',
    score: 91,
    dealValue: 200000,
    notes: 'Initial contact made, very interested',
    lastContactDate: '2024-01-22',
    nextFollowUpDate: '2024-01-24',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22',
    tags: ['finance', 'enterprise', 'high-value'],
    customFields: {}
  }
]

const getStatusColor = (status: string) => {
  const colors = {
    new: 'bg-primary-100 text-primary-800 border-primary-200',
    contacted: 'bg-accent-100 text-accent-800 border-accent-200',
    qualified: 'bg-warning-100 text-warning-800 border-warning-200',
    proposal: 'bg-purple-100 text-purple-800 border-purple-200',
    negotiation: 'bg-orange-100 text-orange-800 border-orange-200',
    closed_won: 'bg-success-100 text-success-800 border-success-200',
    closed_lost: 'bg-error-100 text-error-800 border-error-200'
  }
  return colors[status as keyof typeof colors] || colors.new
}

const getPriorityColor = (priority: string) => {
  const colors = {
    low: 'text-primary-500',
    medium: 'text-warning-500',
    high: 'text-error-500'
  }
  return colors[priority as keyof typeof colors] || colors.low
}

const ScoreBar = ({ score }: { score: number }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-success-500'
    if (score >= 60) return 'bg-warning-500'
    return 'bg-error-500'
  }

  return (
    <div className="w-full bg-primary-200 dark:bg-primary-700 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${getScoreColor(score)} transition-all duration-300`}
        style={{ width: `${score}%` }}
      />
    </div>
  )
}

const LeadCard = ({ lead, isSelected, onSelect }: { 
  lead: Lead
  isSelected: boolean
  onSelect: (leadId: string) => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`card p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 ${
        isSelected ? 'border-accent-300 dark:border-accent-600 bg-accent-50 dark:bg-accent-900/20' : 'border-transparent'
      }`}
      onClick={() => onSelect(lead.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation()
              onSelect(lead.id)
            }}
            className="w-4 h-4 text-accent-600 rounded border-primary-300 focus:ring-accent-500"
          />
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {lead.firstName[0]}{lead.lastName[0]}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <StarSolidIcon
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(lead.score / 20) 
                    ? 'text-warning-400' 
                    : 'text-primary-300 dark:text-primary-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {lead.score}
          </span>
        </div>
      </div>

      <div className="mb-3">
        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
          {lead.firstName} {lead.lastName}
        </h3>
        <p className="text-sm text-primary-600 dark:text-primary-400">
          {lead.position} at {lead.company}
        </p>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400">
          <EnvelopeIcon className="w-4 h-4" />
          <span>{lead.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400">
          <PhoneIcon className="w-4 h-4" />
          <span>{lead.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400">
          <MapPinIcon className="w-4 h-4" />
          <span>{lead.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(lead.status)}`}>
          {lead.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
        <span className={`text-xs font-medium ${getPriorityColor(lead.priority)}`}>
          {lead.priority.toUpperCase()} PRIORITY
        </span>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-primary-600 dark:text-primary-400 mb-1">
          <span>Lead Score</span>
          <span>{lead.score}/100</span>
        </div>
        <ScoreBar score={lead.score} />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-primary-900 dark:text-primary-100 font-semibold">
          ${lead.dealValue?.toLocaleString()}
        </span>
        <div className="flex space-x-1">
          <button className="p-1 text-primary-500 hover:text-accent-600 transition-colors">
            <EyeIcon className="w-4 h-4" />
          </button>
          <button className="p-1 text-primary-500 hover:text-accent-600 transition-colors">
            <PencilIcon className="w-4 h-4" />
          </button>
          <button className="p-1 text-primary-500 hover:text-error-600 transition-colors">
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const LeadRow = ({ lead, isSelected, onSelect }: { 
  lead: Lead
  isSelected: boolean
  onSelect: (leadId: string) => void
}) => {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`hover:bg-primary-50 dark:hover:bg-primary-900/30 ${
        isSelected ? 'bg-accent-50 dark:bg-accent-900/20' : ''
      }`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(lead.id)}
          className="w-4 h-4 text-accent-600 rounded border-primary-300 focus:ring-accent-500"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">
            {lead.firstName[0]}{lead.lastName[0]}
          </div>
          <div>
            <div className="text-sm font-medium text-primary-900 dark:text-primary-100">
              {lead.firstName} {lead.lastName}
            </div>
            <div className="text-sm text-primary-500 dark:text-primary-400">
              {lead.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-primary-900 dark:text-primary-100">{lead.company}</div>
        <div className="text-sm text-primary-500 dark:text-primary-400">{lead.position}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(lead.status)}`}>
          {lead.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <StarSolidIcon
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(lead.score / 20) 
                  ? 'text-warning-400' 
                  : 'text-primary-300 dark:text-primary-600'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-primary-600 dark:text-primary-400">
            {lead.score}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900 dark:text-primary-100 font-semibold">
        ${lead.dealValue?.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500 dark:text-primary-400">
        {new Date(lead.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex space-x-1">
          <button className="p-1 text-primary-500 hover:text-accent-600 transition-colors">
            <EyeIcon className="w-4 h-4" />
          </button>
          <button className="p-1 text-primary-500 hover:text-accent-600 transition-colors">
            <PencilIcon className="w-4 h-4" />
          </button>
          <button className="p-1 text-primary-500 hover:text-error-600 transition-colors">
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  )
}

const LeadList = ({ searchQuery, filters, viewMode, selectedLeads, onSelectionChange }: LeadListProps) => {
  const [sortBy, setSortBy] = useState<'name' | 'company' | 'score' | 'dealValue' | 'createdAt'>('score')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Filter and search leads
  const filteredLeads = mockLeads.filter(lead => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const searchableText = `${lead.firstName} ${lead.lastName} ${lead.email} ${lead.company}`.toLowerCase()
      if (!searchableText.includes(query)) return false
    }

    // Apply filters
    if (filters.status?.length && !filters.status.includes(lead.status)) return false
    if (filters.priority?.length && !filters.priority.includes(lead.priority)) return false
    if (filters.source?.length && !filters.source.includes(lead.source)) return false
    if (filters.industry?.length && !filters.industry.includes(lead.industry)) return false
    if (filters.companySize?.length && !filters.companySize.includes(lead.companySize)) return false
    if (filters.scoreMin && lead.score < filters.scoreMin) return false
    if (filters.scoreMax && lead.score > filters.scoreMax) return false
    if (filters.dealValueMin && (!lead.dealValue || lead.dealValue < filters.dealValueMin)) return false
    if (filters.location && !lead.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    if (filters.createdAfter && new Date(lead.createdAt) < new Date(filters.createdAfter)) return false
    if (filters.createdBefore && new Date(lead.createdAt) > new Date(filters.createdBefore)) return false

    return true
  })

  // Sort leads
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    let aValue: any, bValue: any

    switch (sortBy) {
      case 'name':
        aValue = `${a.firstName} ${a.lastName}`
        bValue = `${b.firstName} ${b.lastName}`
        break
      case 'company':
        aValue = a.company
        bValue = b.company
        break
      case 'score':
        aValue = a.score
        bValue = b.score
        break
      case 'dealValue':
        aValue = a.dealValue || 0
        bValue = b.dealValue || 0
        break
      case 'createdAt':
        aValue = new Date(a.createdAt)
        bValue = new Date(b.createdAt)
        break
      default:
        return 0
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const handleSelectAll = () => {
    if (selectedLeads.length === sortedLeads.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(sortedLeads.map(lead => lead.id))
    }
  }

  const handleSelectLead = (leadId: string) => {
    if (selectedLeads.includes(leadId)) {
      onSelectionChange(selectedLeads.filter(id => id !== leadId))
    } else {
      onSelectionChange([...selectedLeads, leadId])
    }
  }

  const SortButton = ({ column, children }: { column: typeof sortBy, children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center space-x-1 text-xs font-medium text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
    >
      <span>{children}</span>
      {sortBy === column && (
        sortOrder === 'asc' ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />
      )}
    </button>
  )

  if (viewMode === 'grid') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-primary-600 dark:text-primary-400">
            {sortedLeads.length} leads found
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-primary-600 dark:text-primary-400">Sort by:</span>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [column, order] = e.target.value.split('-')
                setSortBy(column as typeof sortBy)
                setSortOrder(order as 'asc' | 'desc')
              }}
              className="text-sm border-primary-300 dark:border-primary-600 rounded-md bg-white dark:bg-primary-800"
            >
              <option value="score-desc">Score (High to Low)</option>
              <option value="score-asc">Score (Low to High)</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="company-asc">Company (A-Z)</option>
              <option value="dealValue-desc">Deal Value (High to Low)</option>
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              isSelected={selectedLeads.includes(lead.id)}
              onSelect={handleSelectLead}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 bg-primary-50 dark:bg-primary-900/30 border-b border-primary-200 dark:border-primary-700">
        <div className="flex items-center justify-between">
          <p className="text-sm text-primary-600 dark:text-primary-400">
            {sortedLeads.length} leads found
          </p>
          <button
            onClick={handleSelectAll}
            className="text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300"
          >
            {selectedLeads.length === sortedLeads.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-primary-200 dark:divide-primary-700">
          <thead className="bg-primary-50 dark:bg-primary-900/30">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedLeads.length === sortedLeads.length && sortedLeads.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-accent-600 rounded border-primary-300 focus:ring-accent-500"
                />
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton column="name">Lead</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton column="company">Company</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-primary-500 dark:text-primary-400">Status</span>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton column="score">Score</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton column="dealValue">Deal Value</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton column="createdAt">Created</SortButton>
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-primary-800 divide-y divide-primary-200 dark:divide-primary-700">
            {sortedLeads.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                isSelected={selectedLeads.includes(lead.id)}
                onSelect={handleSelectLead}
              />
            ))}
          </tbody>
        </table>
      </div>

      {sortedLeads.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 mx-auto bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center mb-4">
            <ListBulletIcon className="w-6 h-6 text-primary-400" />
          </div>
          <h3 className="text-sm font-medium text-primary-900 dark:text-primary-100 mb-1">No leads found</h3>
          <p className="text-sm text-primary-500 dark:text-primary-400">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  )
}

export default LeadList