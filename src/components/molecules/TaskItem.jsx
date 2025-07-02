import { motion } from 'framer-motion'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const TaskItem = ({ task, leadName, onComplete }) => {
  const getDueDateDisplay = (dueDate) => {
    const date = new Date(dueDate)
    
    if (isToday(date)) {
      return { text: 'Today', color: 'text-orange-600' }
    } else if (isTomorrow(date)) {
      return { text: 'Tomorrow', color: 'text-blue-600' }
    } else if (isPast(date) && !task.completed) {
      return { text: format(date, 'MMM d'), color: 'text-red-600' }
    } else {
      return { text: format(date, 'MMM d'), color: 'text-gray-600' }
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTaskTypeIcon = (taskType) => {
    switch (taskType) {
      case 'follow-up':
        return 'Phone'
      case 'meeting':
        return 'Calendar'
      case 'email':
        return 'Mail'
      case 'proposal':
        return 'FileText'
      case 'demo':
        return 'Monitor'
      case 'documentation':
        return 'File'
      case 'legal-review':
        return 'Scale'
      default:
        return 'CheckSquare'
    }
  }

  const dueDateInfo = getDueDateDisplay(task.dueDate)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-3 border rounded-lg transition-colors ${
        task.completed 
          ? 'bg-gray-50 border-gray-200' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start space-x-3">
        {/* Completion checkbox */}
        <button
          onClick={() => !task.completed && onComplete(task.Id)}
          className={`mt-1 flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          disabled={task.completed}
        >
          {task.completed && (
            <ApperIcon name="Check" className="h-3 w-3 text-white" />
          )}
        </button>

        {/* Task content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <ApperIcon 
              name={getTaskTypeIcon(task.taskType)} 
              className="h-3 w-3 text-gray-400"
            />
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          
          <p className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {task.description}
          </p>
          
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className="text-gray-500 truncate">
              {leadName}
            </span>
            <span className={`font-medium ${dueDateInfo.color}`}>
              {dueDateInfo.text}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskItem