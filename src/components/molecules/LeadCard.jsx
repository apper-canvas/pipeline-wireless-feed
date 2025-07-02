import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const LeadCard = ({ 
  lead, 
  onEdit, 
  onDelete, 
  onViewDetails,
  draggable = false,
  className = '' 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getSourceColor = (source) => {
    const colors = {
      'Website': 'primary',
      'Referral': 'accent',
      'Cold Call': 'info',
      'Social Media': 'warning',
      'Email Campaign': 'success',
      'Trade Show': 'secondary'
    }
    return colors[source] || 'default'
  }

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(lead)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={className}
    >
      <Card 
        hoverable 
        className="cursor-pointer group relative"
        onClick={handleCardClick}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                {lead.name}
              </h3>
              <p className="text-xs text-gray-600 mt-1">{lead.company}</p>
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  if (onEdit) onEdit(lead)
                }}
                className="p-1 h-auto"
              >
                <ApperIcon name="Edit2" className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  if (onDelete) onDelete(lead.Id)
                }}
                className="p-1 h-auto text-red-600 hover:text-red-700"
              >
                <ApperIcon name="Trash2" className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Deal Value */}
          <div className="text-lg font-bold text-accent-600">
            {formatCurrency(lead.dealValue)}
          </div>

          {/* Source Badge */}
          <Badge variant={getSourceColor(lead.source)} size="sm">
            {lead.source}
          </Badge>

          {/* Contact Info */}
          <div className="space-y-1">
            <div className="flex items-center text-xs text-gray-600">
              <ApperIcon name="Mail" className="h-3 w-3 mr-1" />
              <span className="truncate">{lead.email}</span>
            </div>
            {lead.phone && (
              <div className="flex items-center text-xs text-gray-600">
                <ApperIcon name="Phone" className="h-3 w-3 mr-1" />
                <span>{lead.phone}</span>
              </div>
            )}
          </div>

          {/* Last Contact */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Last Contact:</span>
              <span>
                {lead.lastContactDate 
                  ? format(new Date(lead.lastContactDate), 'MMM d')
                  : 'Never'
                }
              </span>
            </div>
            {lead.nextActionDate && (
              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <span>Next Action:</span>
                <span className="text-warning font-medium">
                  {format(new Date(lead.nextActionDate), 'MMM d')}
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default LeadCard