import { motion } from 'framer-motion'
import { ArrowRightIcon, EyeIcon } from '@heroicons/react/24/outline'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Mock pipeline data
const pipelineData = [
  { stage: 'Prospecting', deals: 45, value: 450000, color: '#6B7280' },
  { stage: 'Qualification', deals: 32, value: 680000, color: '#3B82F6' },
  { stage: 'Proposal', deals: 18, value: 540000, color: '#8B5CF6' },
  { stage: 'Negotiation', deals: 12, value: 720000, color: '#F59E0B' },
  { stage: 'Closed Won', deals: 8, value: 480000, color: '#10B981' },
]

const PipelineOverview = () => {
  const totalValue = pipelineData.reduce((sum, stage) => sum + stage.value, 0)
  const totalDeals = pipelineData.reduce((sum, stage) => sum + stage.deals, 0)

  const chartData = {
    labels: pipelineData.map(stage => stage.stage),
    datasets: [
      {
        label: 'Deal Value ($)',
        data: pipelineData.map(stage => stage.value),
        backgroundColor: pipelineData.map(stage => `${stage.color}20`),
        borderColor: pipelineData.map(stage => stage.color),
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      }
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3B82F6',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const stageIndex = context.dataIndex
            const stage = pipelineData[stageIndex]
            return [
              `Value: $${context.parsed.y.toLocaleString()}`,
              `Deals: ${stage.deals}`
            ]
          }
        }
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return `$${(value / 1000)}k`
          }
        },
      },
    },
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
            Sales Pipeline
          </h2>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            Deal distribution across stages
          </p>
        </div>
        <button className="btn-ghost text-sm">
          <EyeIcon className="w-4 h-4 mr-1" />
          View Pipeline
        </button>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-accent-600 dark:text-accent-400">
            ${(totalValue / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            Total Pipeline Value
          </p>
        </div>
        <div className="bg-success-50 dark:bg-success-900/20 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-success-600 dark:text-success-400">
            {totalDeals}
          </p>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            Active Deals
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 mb-6">
        <Bar data={chartData} options={options} />
      </div>

      {/* Pipeline Stages */}
      <div className="space-y-3">
        {pipelineData.map((stage, index) => (
          <motion.div
            key={stage.stage}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-900/50 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stage.color }}
              />
              <div>
                <h3 className="text-sm font-medium text-primary-900 dark:text-primary-100">
                  {stage.stage}
                </h3>
                <p className="text-xs text-primary-600 dark:text-primary-400">
                  {stage.deals} deals
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-semibold text-primary-900 dark:text-primary-100">
                ${(stage.value / 1000).toLocaleString()}k
              </p>
              <p className="text-xs text-primary-600 dark:text-primary-400">
                {((stage.value / totalValue) * 100).toFixed(1)}%
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Conversion Rate */}
      <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-primary-600 dark:text-primary-400">
                Conversion Rate:
              </span>
              <span className="text-sm font-semibold text-success-600 dark:text-success-400">
                18.2%
              </span>
            </div>
            <ArrowRightIcon className="w-3 h-3 text-primary-400" />
            <span className="text-xs text-success-600 dark:text-success-400">
              +2.1% from last month
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PipelineOverview