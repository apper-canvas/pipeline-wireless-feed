import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ 
  message = 'Something went wrong', 
  onRetry, 
  showRetry = true,
  icon = 'AlertCircle',
  title = 'Oops! Something went wrong'
}) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4">
            <ApperIcon name={icon} className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">
            {title}
          </h2>
          <p className="text-gray-600">
            {message}
          </p>
        </div>

        {showRetry && onRetry && (
          <div className="space-y-3">
            <Button
              variant="primary"
              onClick={onRetry}
              className="w-full"
            >
              <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
              Refresh Page
            </Button>
          </div>
        )}

        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-start space-x-3">
            <ApperIcon name="Info" className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-800">
              <p className="font-medium mb-1">Need help?</p>
              <p>If this problem persists, try refreshing the page or check your internet connection.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Error