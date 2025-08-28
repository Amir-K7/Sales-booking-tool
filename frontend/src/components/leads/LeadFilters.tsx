import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  XMarkIcon,
  ChevronDownIcon,
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  StarIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import type { LeadFilters } from '@/types/leads'

interface LeadFiltersProps {
  filters: LeadFilters
  onFiltersChange: (filters: Partial<LeadFilters>) => void
  onClearFilters: () => void
}

const filterOptions = {
  status: [
    { value: 'new', label: 'New', color: 'bg-primary-100 text-primary-800' },
    { value: 'contacted', label: 'Contacted', color: 'bg-accent-100 text-accent-800' },
    { value: 'qualified', label: 'Qualified', color: 'bg-warning-100 text-warning-800' },
    { value: 'proposal', label: 'Proposal Sent', color: 'bg-purple-100 text-purple-800' },
    { value: 'negotiation', label: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
    { value: 'closed_won', label: 'Closed Won', color: 'bg-success-100 text-success-800' },
    { value: 'closed_lost', label: 'Closed Lost', color: 'bg-error-100 text-error-800' }
  ],
  priority: [
    { value: 'low', label: 'Low', color: 'bg-primary-100 text-primary-800' },
    { value: 'medium', label: 'Medium', color: 'bg-warning-100 text-warning-800' },
    { value: 'high', label: 'High', color: 'bg-error-100 text-error-800' }
  ],
  source: [
    { value: 'website', label: 'Website' },
    { value: 'referral', label: 'Referral' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'email_campaign', label: 'Email Campaign' },
    { value: 'cold_call', label: 'Cold Call' },
    { value: 'trade_show', label: 'Trade Show' },
    { value: 'partner', label: 'Partner' },
    { value: 'other', label: 'Other' }
  ],
  industry: [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'other', label: 'Other' }
  ],
  companySize: [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ]
}

const Dropdown = ({ 
  label, 
  icon: Icon, 
  options, 
  value, 
  onChange, 
  multiple = false 
}: {
  label: string
  icon: React.ComponentType<any>
  options: Array<{ value: string; label: string; color?: string }>
  value: string | string[] | undefined
  onChange: (value: string | string[]) => void
  multiple?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : []
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue]
      onChange(newValues)
    } else {
      onChange(optionValue)
      setIsOpen(false)
    }
  }

  const getDisplayValue = () => {
    if (multiple) {
      const selectedCount = Array.isArray(value) ? value.length : 0
      return selectedCount > 0 ? `${selectedCount} selected` : `Select ${label.toLowerCase()}`
    }
    const selected = options.find(opt => opt.value === value)
    return selected ? selected.label : `Select ${label.toLowerCase()}`
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm border border-primary-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-800 text-primary-700 dark:text-primary-300 hover:border-accent-300 dark:hover:border-accent-600 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-primary-500 dark:text-primary-400" />
          <span>{getDisplayValue()}</span>
        </div>
        <ChevronDownIcon className={`w-4 h-4 text-primary-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          <div className="p-1">
            {options.map((option) => {
              const isSelected = multiple 
                ? Array.isArray(value) && value.includes(option.value)
                : value === option.value

              return (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                    isSelected 
                      ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300' 
                      : 'hover:bg-primary-100 dark:hover:bg-primary-700 text-primary-700 dark:text-primary-300'
                  }`}
                >
                  <span>{option.label}</span>
                  {multiple && isSelected && (
                    <div className="w-2 h-2 bg-accent-500 rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}

const LeadFilters = ({ filters, onFiltersChange, onClearFilters }: LeadFiltersProps) => {
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && 
    !(Array.isArray(value) && value.length === 0)
  )

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
          Filter Leads
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-error-600 dark:text-error-400 hover:text-error-700 dark:hover:text-error-300 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Status Filter */}
        <Dropdown
          label="Status"
          icon={ClockIcon}
          options={filterOptions.status}
          value={filters.status}
          onChange={(value) => onFiltersChange({ status: value as string[] })}
          multiple
        />

        {/* Priority Filter */}
        <Dropdown
          label="Priority"
          icon={StarIcon}
          options={filterOptions.priority}
          value={filters.priority}
          onChange={(value) => onFiltersChange({ priority: value as string[] })}
          multiple
        />

        {/* Source Filter */}
        <Dropdown
          label="Source"
          icon={UserGroupIcon}
          options={filterOptions.source}
          value={filters.source}
          onChange={(value) => onFiltersChange({ source: value as string[] })}
          multiple
        />

        {/* Industry Filter */}
        <Dropdown
          label="Industry"
          icon={BriefcaseIcon}
          options={filterOptions.industry}
          value={filters.industry}
          onChange={(value) => onFiltersChange({ industry: value as string[] })}
          multiple
        />

        {/* Company Size Filter */}
        <Dropdown
          label="Company Size"
          icon={UserGroupIcon}
          options={filterOptions.companySize}
          value={filters.companySize}
          onChange={(value) => onFiltersChange({ companySize: value as string[] })}
          multiple
        />
      </div>

      {/* Score Range Filter */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary-700 dark:text-primary-300 flex items-center space-x-2">
            <StarIcon className="w-4 h-4" />
            <span>Min Score</span>
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={filters.scoreMin || ''}
            onChange={(e) => onFiltersChange({ scoreMin: e.target.value ? parseInt(e.target.value) : undefined })}
            className="input"
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary-700 dark:text-primary-300 flex items-center space-x-2">
            <StarIcon className="w-4 h-4" />
            <span>Max Score</span>
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={filters.scoreMax || ''}
            onChange={(e) => onFiltersChange({ scoreMax: e.target.value ? parseInt(e.target.value) : undefined })}
            className="input"
            placeholder="100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary-700 dark:text-primary-300 flex items-center space-x-2">
            <CurrencyDollarIcon className="w-4 h-4" />
            <span>Min Deal Value</span>
          </label>
          <input
            type="number"
            min="0"
            value={filters.dealValueMin || ''}
            onChange={(e) => onFiltersChange({ dealValueMin: e.target.value ? parseInt(e.target.value) : undefined })}
            className="input"
            placeholder="0"
          />
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary-700 dark:text-primary-300 flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4" />
            <span>Created After</span>
          </label>
          <input
            type="date"
            value={filters.createdAfter || ''}
            onChange={(e) => onFiltersChange({ createdAfter: e.target.value || undefined })}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary-700 dark:text-primary-300 flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4" />
            <span>Created Before</span>
          </label>
          <input
            type="date"
            value={filters.createdBefore || ''}
            onChange={(e) => onFiltersChange({ createdBefore: e.target.value || undefined })}
            className="input"
          />
        </div>
      </div>

      {/* Location Filter */}
      <div className="mt-4">
        <label className="text-sm font-medium text-primary-700 dark:text-primary-300 flex items-center space-x-2 mb-2">
          <MapPinIcon className="w-4 h-4" />
          <span>Location</span>
        </label>
        <input
          type="text"
          value={filters.location || ''}
          onChange={(e) => onFiltersChange({ location: e.target.value || undefined })}
          className="input"
          placeholder="Enter city, state, or country"
        />
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-primary-200 dark:border-primary-700">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value || (Array.isArray(value) && value.length === 0)) return null

              const displayValue = Array.isArray(value) 
                ? `${value.length} selected`
                : typeof value === 'string' ? value : value.toString()

              return (
                <div
                  key={key}
                  className="flex items-center space-x-1 px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-sm"
                >
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                  <span className="font-medium">{displayValue}</span>
                  <button
                    onClick={() => onFiltersChange({ [key]: undefined })}
                    className="ml-1 hover:text-accent-600 dark:hover:text-accent-400"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LeadFilters