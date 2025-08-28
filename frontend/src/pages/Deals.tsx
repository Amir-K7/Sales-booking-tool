import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlusIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ChartBarIcon,
  FunnelIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import DealKanban from '@/components/deals/DealKanban'
import DealList from '@/components/deals/DealList'
import DealStats from '@/components/deals/DealStats'
import DealFilters from '@/components/deals/DealFilters'
import CreateDealModal from '@/components/deals/CreateDealModal'
import DealInsights from '@/components/deals/DealInsights'
import type { DealFilters as DealFiltersType } from '@/types/deals'

const Deals = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<DealFiltersType>({})
  const [selectedDeals, setSelectedDeals] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (newFilters: Partial<DealFiltersType>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-success-100 dark:bg-success-900/30 rounded-lg">
            <CurrencyDollarIcon className="w-6 h-6 text-success-600 dark:text-success-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
              Deal Pipeline
            </h1>
            <p className="text-primary-600 dark:text-primary-400">
              Track and manage your sales opportunities
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary ${showFilters ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400' : ''}`}
          >
            <FunnelIcon className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            New Deal
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <DealStats />

      {/* Deal Insights */}
      <DealInsights />

      {/* Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search deals by title, company, or contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-4 w-full"
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
            <DealFilters
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
              <button
                onClick={() => setViewMode('kanban')}
                className={`flex items-center px-3 py-1 text-sm font-medium rounded-md transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-white dark:bg-primary-700 text-accent-600 dark:text-accent-400 shadow-sm'
                    : 'text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200'
                }`}
              >
                <Squares2X2Icon className="w-4 h-4 mr-1" />
                Kanban
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center px-3 py-1 text-sm font-medium rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-primary-700 text-accent-600 dark:text-accent-400 shadow-sm'
                    : 'text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200'
                }`}
              >
                <ListBulletIcon className="w-4 h-4 mr-1" />
                List
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400">
            <ChartBarIcon className="w-4 h-4" />
            <span>Pipeline Value: $2.4M</span>
          </div>
        </div>
      </div>

      {/* Deal Views */}
      {viewMode === 'kanban' ? (
        <DealKanban
          searchQuery={searchQuery}
          filters={filters}
        />
      ) : (
        <DealList
          searchQuery={searchQuery}
          filters={filters}
          selectedDeals={selectedDeals}
          onSelectionChange={setSelectedDeals}
        />
      )}

      {/* Create Deal Modal */}
      <CreateDealModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}

export default Deals