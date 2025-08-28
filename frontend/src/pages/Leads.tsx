import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import LeadList from '@/components/leads/LeadList'
import LeadFilters from '@/components/leads/LeadFilters'
import LeadStats from '@/components/leads/LeadStats'
import CreateLeadModal from '@/components/leads/CreateLeadModal'
import AIInsights from '@/components/leads/AIInsights'
import BulkActions from '@/components/leads/BulkActions'
import type { LeadFilters as LeadFiltersType } from '@/types/leads'

const Leads = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<LeadFiltersType>({})
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'pipeline'>('list')
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (newFilters: Partial<LeadFiltersType>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleBulkAction = (action: string, leadIds: string[]) => {
    console.log(`Bulk action: ${action}`, leadIds)
    // Handle bulk actions here
    setSelectedLeads([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
            <UserGroupIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
              Lead Management
            </h1>
            <p className="text-primary-600 dark:text-primary-400">
              Manage and track your sales leads
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary ${showFilters ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400' : ''}`}
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <LeadStats />

      {/* AI Insights */}
      <AIInsights />

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
          <input
            type="text"
            placeholder="Search leads by name, company, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LeadFilters
              filters={filters}
              onFiltersChange={handleFilterChange}
              onClearFilters={() => setFilters({})}
            />
          </motion.div>
        )}

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-primary-600 dark:text-primary-400">View:</span>
            <div className="flex bg-primary-100 dark:bg-primary-800 rounded-lg p-1">
              {(['list', 'grid', 'pipeline'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-all capitalize ${
                    viewMode === mode
                      ? 'bg-white dark:bg-primary-700 text-accent-600 dark:text-accent-400 shadow-sm'
                      : 'text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {selectedLeads.length > 0 && (
            <BulkActions
              selectedCount={selectedLeads.length}
              onAction={(action) => handleBulkAction(action, selectedLeads)}
              onClear={() => setSelectedLeads([])}
            />
          )}
        </div>
      </div>

      {/* Lead List */}
      <LeadList
        searchQuery={searchQuery}
        filters={filters}
        viewMode={viewMode}
        selectedLeads={selectedLeads}
        onSelectionChange={setSelectedLeads}
      />

      {/* Create Lead Modal */}
      <CreateLeadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}

export default Leads