import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = 'No data found',
  description = 'Get started by adding your first item',
  actionText = 'Add Item',
  onAction,
  icon = 'Inbox',
  showAction = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-4"
    >
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mb-4">
            <ApperIcon name={icon} className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 font-display mb-2">
            {title}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>

        {showAction && onAction && (
          <Button
            variant="primary"
            onClick={onAction}
            size="lg"
          >
            <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
            {actionText}
          </Button>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <ApperIcon name="Plus" className="h-4 w-4 text-blue-600" />
            </div>
            <span>Add leads</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <ApperIcon name="BarChart3" className="h-4 w-4 text-purple-600" />
            </div>
            <span>Track progress</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <ApperIcon name="Target" className="h-4 w-4 text-green-600" />
            </div>
            <span>Close deals</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Empty