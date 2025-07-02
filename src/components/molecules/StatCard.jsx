import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color = 'primary',
  className = '' 
}) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-100',
    accent: 'text-accent-600 bg-accent-100',
    success: 'text-green-600 bg-green-100',
    warning: 'text-yellow-600 bg-yellow-100',
    error: 'text-red-600 bg-red-100',
    info: 'text-blue-600 bg-blue-100'
  }

  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
  const trendIcon = trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'

  return (
    <Card hoverable className={`${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-gray-900 gradient-text">{value}</p>
            {trend && trendValue && (
              <div className={`flex items-center text-sm ${trendColor}`}>
                <ApperIcon name={trendIcon} className="h-3 w-3 mr-1" />
                <span>{trendValue}</span>
              </div>
            )}
          </div>
        </div>
        {icon && (
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <ApperIcon name={icon} className="h-6 w-6" />
          </div>
        )}
      </div>
    </Card>
  )
}

export default StatCard