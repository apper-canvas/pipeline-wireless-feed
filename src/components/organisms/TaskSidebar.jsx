import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import TaskItem from '@/components/molecules/TaskItem'

const TaskSidebar = ({ 
  tasks = [], 
  leads = [], 
  onCompleteTask, 
  onCreateTask,
  isOpen = false,
  onClose 
}) => {
  const [filter, setFilter] = useState('all') // all, pending, completed, overdue
  const [filteredTasks, setFilteredTasks] = useState([])

  useEffect(() => {
    filterTasks()
  }, [tasks, filter])

  const filterTasks = () => {
    let filtered = [...tasks]
    
    switch (filter) {
      case 'pending':
        filtered = filtered.filter(task => !task.completed)
        break
      case 'completed':
        filtered = filtered.filter(task => task.completed)
        break
      case 'overdue':
        filtered = filtered.filter(task => 
          !task.completed && isPast(new Date(task.dueDate))
        )
        break
      default:
        // all tasks
        break
    }
    
    setFilteredTasks(filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)))
  }

  const getLeadName = (leadId) => {
    const lead = leads.find(l => l.Id === leadId)
    return lead ? lead.name : 'Unknown Lead'
  }

  const getTaskCount = (filterType) => {
    switch (filterType) {
      case 'pending':
        return tasks.filter(task => !task.completed).length
      case 'completed':
        return tasks.filter(task => task.completed).length
      case 'overdue':
        return tasks.filter(task => 
          !task.completed && isPast(new Date(task.dueDate))
        ).length
      default:
        return tasks.length
    }
  }

  const groupTasksByDate = (tasks) => {
    const groups = {
      overdue: [],
      today: [],
      tomorrow: [],
      upcoming: []
    }

    tasks.forEach(task => {
      const dueDate = new Date(task.dueDate)
      if (!task.completed && isPast(dueDate)) {
        groups.overdue.push(task)
      } else if (isToday(dueDate)) {
        groups.today.push(task)
      } else if (isTomorrow(dueDate)) {
        groups.tomorrow.push(task)
      } else {
        groups.upcoming.push(task)
      }
    })

    return groups
  }

  const taskGroups = groupTasksByDate(filteredTasks)

  const renderTaskGroup = (title, tasks, icon, colorClass = '') => {
    if (tasks.length === 0) return null

    return (
      <div className="mb-6">
        <div className={`flex items-center space-x-2 mb-3 ${colorClass}`}>
          <ApperIcon name={icon} className="h-4 w-4" />
          <h3 className="text-sm font-semibold">{title}</h3>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <div className="space-y-2">
          <AnimatePresence>
            {tasks.map(task => (
              <TaskItem
                key={task.Id}
                task={task}
                leadName={getLeadName(task.leadId)}
                onComplete={onCompleteTask}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Task Management</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="X" className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex space-x-1">
          {[
            { key: 'all', label: 'All', icon: 'List' },
            { key: 'pending', label: 'Pending', icon: 'Clock' },
            { key: 'overdue', label: 'Overdue', icon: 'AlertCircle' },
            { key: 'completed', label: 'Done', icon: 'CheckCircle' }
          ].map(filterOption => (
            <Button
              key={filterOption.key}
              variant={filter === filterOption.key ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(filterOption.key)}
              className="text-xs"
            >
              <ApperIcon name={filterOption.icon} className="h-3 w-3 mr-1" />
              {filterOption.label}
              <span className="ml-1 text-xs">
                ({getTaskCount(filterOption.key)})
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <ApperIcon name="CheckSquare" className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              {filter === 'all' ? 'No tasks found' : `No ${filter} tasks`}
            </p>
          </div>
        ) : (
          <div>
            {filter === 'all' ? (
              <>
                {renderTaskGroup('Overdue', taskGroups.overdue, 'AlertCircle', 'text-red-600')}
                {renderTaskGroup('Today', taskGroups.today, 'Calendar', 'text-orange-600')}
                {renderTaskGroup('Tomorrow', taskGroups.tomorrow, 'Clock', 'text-blue-600')}
                {renderTaskGroup('Upcoming', taskGroups.upcoming, 'CalendarDays', 'text-gray-600')}
              </>
            ) : (
              <div className="space-y-2">
                <AnimatePresence>
                  {filteredTasks.map(task => (
                    <TaskItem
                      key={task.Id}
                      task={task}
                      leadName={getLeadName(task.leadId)}
                      onComplete={onCompleteTask}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer with quick stats */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {getTaskCount('pending')}
            </div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-red-600">
              {getTaskCount('overdue')}
            </div>
            <div className="text-xs text-gray-500">Overdue</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">
              {getTaskCount('completed')}
            </div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskSidebar