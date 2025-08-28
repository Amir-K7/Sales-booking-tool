import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { motion } from 'framer-motion'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface RevenueChartProps {
  timeRange: string
}

// Mock data based on time range
const generateMockData = (timeRange: string) => {
  const baseData = {
    '1d': {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      revenue: [12000, 15000, 18000, 22000, 25000, 28000, 32000],
      deals: [5, 8, 12, 15, 18, 22, 25],
    },
    '7d': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revenue: [45000, 52000, 48000, 61000, 55000, 38000, 42000],
      deals: [12, 18, 15, 22, 20, 8, 10],
    },
    '30d': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      revenue: [180000, 220000, 195000, 240000],
      deals: [45, 58, 52, 67],
    },
    '90d': {
      labels: ['Jan', 'Feb', 'Mar'],
      revenue: [580000, 720000, 650000],
      deals: [145, 182, 168],
    },
  }

  return baseData[timeRange as keyof typeof baseData] || baseData['7d']
}

const RevenueChart = ({ timeRange }: RevenueChartProps) => {
  const [activeTab, setActiveTab] = useState<'revenue' | 'deals'>('revenue')
  const data = generateMockData(timeRange)

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: activeTab === 'revenue' ? 'Revenue' : 'Deals Closed',
        data: activeTab === 'revenue' ? data.revenue : data.deals,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
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
            const value = context.parsed.y
            return activeTab === 'revenue' 
              ? `Revenue: $${value.toLocaleString()}`
              : `Deals: ${value}`
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
            return activeTab === 'revenue' 
              ? `$${(value / 1000)}k`
              : value
          }
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: '#3B82F6',
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
            Sales Performance
          </h2>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            Track your revenue and deals over time
          </p>
        </div>
        
        <div className="flex space-x-1 bg-primary-100 dark:bg-primary-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
              activeTab === 'revenue'
                ? 'bg-white dark:bg-primary-700 text-accent-600 dark:text-accent-400 shadow-sm'
                : 'text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveTab('deals')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
              activeTab === 'deals'
                ? 'bg-white dark:bg-primary-700 text-accent-600 dark:text-accent-400 shadow-sm'
                : 'text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200'
            }`}
          >
            Deals
          </button>
        </div>
      </div>

      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>

      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary-900 dark:text-primary-100">
            {activeTab === 'revenue' 
              ? `$${Math.max(...data.revenue).toLocaleString()}`
              : Math.max(...data.deals)
            }
          </p>
          <p className="text-xs text-primary-600 dark:text-primary-400">
            Peak {activeTab === 'revenue' ? 'Revenue' : 'Deals'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary-900 dark:text-primary-100">
            {activeTab === 'revenue' 
              ? `$${Math.round(data.revenue.reduce((a, b) => a + b, 0) / data.revenue.length).toLocaleString()}`
              : Math.round(data.deals.reduce((a, b) => a + b, 0) / data.deals.length)
            }
          </p>
          <p className="text-xs text-primary-600 dark:text-primary-400">
            Average
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success-600 dark:text-success-400">
            +12.3%
          </p>
          <p className="text-xs text-primary-600 dark:text-primary-400">
            Growth
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default RevenueChart