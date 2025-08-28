import { motion } from 'framer-motion'
import { 
  TrophyIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon
} from '@heroicons/react/24/outline'

// Mock leaderboard data
const leaderboardData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    position: 1,
    previousPosition: 1,
    revenue: 847420,
    deals: 23,
    conversionRate: 34.5,
    badge: 'gold',
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'MC',
    position: 2,
    previousPosition: 3,
    revenue: 692380,
    deals: 19,
    conversionRate: 31.2,
    badge: 'silver',
  },
  {
    id: '3',
    name: 'Lisa Wang',
    avatar: 'LW',
    position: 3,
    previousPosition: 2,
    revenue: 634250,
    deals: 17,
    conversionRate: 28.9,
    badge: 'bronze',
  },
  {
    id: '4',
    name: 'David Brown',
    avatar: 'DB',
    position: 4,
    previousPosition: 5,
    revenue: 548900,
    deals: 15,
    conversionRate: 26.8,
    badge: 'none',
  },
  {
    id: '5',
    name: 'Emma Davis',
    avatar: 'ED',
    position: 5,
    previousPosition: 4,
    revenue: 467520,
    deals: 12,
    conversionRate: 24.3,
    badge: 'none',
  },
]

const getBadgeColor = (badge: string) => {
  const colors = {
    gold: 'from-yellow-400 to-yellow-600',
    silver: 'from-gray-300 to-gray-500',
    bronze: 'from-amber-600 to-amber-800',
    none: 'from-primary-400 to-primary-600',
  }
  return colors[badge as keyof typeof colors] || colors.none
}

const getPositionChange = (current: number, previous: number) => {
  if (current < previous) {
    return { icon: ArrowUpIcon, color: 'text-success-600 dark:text-success-400', change: previous - current }
  }
  if (current > previous) {
    return { icon: ArrowDownIcon, color: 'text-error-600 dark:text-error-400', change: current - previous }
  }
  return { icon: MinusIcon, color: 'text-primary-400 dark:text-primary-500', change: 0 }
}

const LeaderboardCard = () => {
  return (
    <div className="card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrophyIcon className="w-5 h-5 text-warning-600 dark:text-warning-400" />
        <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
          Sales Leaderboard
        </h2>
      </div>

      {/* Top Performer Highlight */}
      <div className="mb-6 p-4 bg-gradient-to-r from-warning-50 to-success-50 dark:from-warning-900/20 dark:to-success-900/20 rounded-lg border border-warning-200 dark:border-warning-800">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className={`w-12 h-12 bg-gradient-to-br ${getBadgeColor('gold')} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
              {leaderboardData[0].avatar}
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning-500 rounded-full flex items-center justify-center">
              <TrophyIcon className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-primary-900 dark:text-primary-100">
              {leaderboardData[0].name}
            </h3>
            <p className="text-sm text-primary-600 dark:text-primary-400">
              Top Performer • ${leaderboardData[0].revenue.toLocaleString()} revenue
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-warning-600 dark:text-warning-400">
              #{leaderboardData[0].position}
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {leaderboardData.slice(1).map((person, index) => {
          const positionChange = getPositionChange(person.position, person.previousPosition)
          const PositionIcon = positionChange.icon

          return (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400 w-6">
                  #{person.position}
                </span>
                <div className="flex items-center">
                  <PositionIcon className={`w-3 h-3 ${positionChange.color}`} />
                  {positionChange.change > 0 && (
                    <span className={`text-xs font-medium ${positionChange.color} ml-1`}>
                      {positionChange.change}
                    </span>
                  )}
                </div>
              </div>

              <div className={`w-10 h-10 bg-gradient-to-br ${getBadgeColor(person.badge)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                {person.avatar}
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium text-primary-900 dark:text-primary-100">
                  {person.name}
                </h3>
                <div className="flex items-center space-x-3 text-xs text-primary-600 dark:text-primary-400">
                  <span>${(person.revenue / 1000).toFixed(0)}k</span>
                  <span>•</span>
                  <span>{person.deals} deals</span>
                  <span>•</span>
                  <span>{person.conversionRate}%</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 pt-4 border-t border-primary-200 dark:border-primary-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm font-medium text-primary-900 dark:text-primary-100">
              Team Average
            </p>
            <p className="text-lg font-bold text-accent-600 dark:text-accent-400">
              ${Math.round(leaderboardData.reduce((sum, p) => sum + p.revenue, 0) / leaderboardData.length / 1000)}k
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-primary-900 dark:text-primary-100">
              Avg Conversion
            </p>
            <p className="text-lg font-bold text-success-600 dark:text-success-400">
              {(leaderboardData.reduce((sum, p) => sum + p.conversionRate, 0) / leaderboardData.length).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardCard