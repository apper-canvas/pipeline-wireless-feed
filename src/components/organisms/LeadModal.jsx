import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'

const LeadModal = ({ 
  isOpen, 
  onClose, 
  lead = null, 
  onSave, 
  onDelete,
  activities = [],
  onAddActivity 
}) => {
  const [activeTab, setActiveTab] = useState('details')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    dealValue: '',
    stage: 'New Lead',
    source: '',
    notes: '',
    nextActionDate: ''
  })
  const [activityForm, setActivityForm] = useState({
    type: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    duration: ''
  })
  const [loading, setLoading] = useState(false)

  const stageOptions = [
    { value: 'New Lead', label: 'New Lead' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Closed Won', label: 'Closed Won' },
    { value: 'Closed Lost', label: 'Closed Lost' }
  ]

  const sourceOptions = [
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Cold Call', label: 'Cold Call' },
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Email Campaign', label: 'Email Campaign' },
    { value: 'Trade Show', label: 'Trade Show' }
  ]

  const activityTypeOptions = [
    { value: 'call', label: 'Phone Call' },
    { value: 'email', label: 'Email' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'note', label: 'Note' }
  ]

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name || '',
        company: lead.company || '',
        email: lead.email || '',
        phone: lead.phone || '',
        dealValue: lead.dealValue?.toString() || '',
        stage: lead.stage || 'New Lead',
        source: lead.source || '',
        notes: lead.notes || '',
        nextActionDate: lead.nextActionDate ? lead.nextActionDate.split('T')[0] : ''
      })
    } else {
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        dealValue: '',
        stage: 'New Lead',
        source: '',
        notes: '',
        nextActionDate: ''
      })
    }
    setActiveTab('details')
  }, [lead, isOpen])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleActivityChange = (field, value) => {
    setActivityForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required')
      return
    }

    setLoading(true)
    try {
      const leadData = {
        ...formData,
        dealValue: parseFloat(formData.dealValue) || 0,
        nextActionDate: formData.nextActionDate || null,
        lastContactDate: lead?.lastContactDate || new Date().toISOString(),
        createdAt: lead?.createdAt || new Date().toISOString()
      }

      if (lead) {
        leadData.Id = lead.Id
      }

      await onSave(leadData)
      onClose()
      toast.success(lead ? 'Lead updated successfully!' : 'Lead created successfully!')
    } catch (error) {
      toast.error('Failed to save lead')
    } finally {
      setLoading(false)
    }
  }

  const handleAddActivity = async () => {
    if (!activityForm.type || !activityForm.description) {
      toast.error('Activity type and description are required')
      return
    }

    try {
      const activity = {
        ...activityForm,
        leadId: lead.Id,
        date: new Date(activityForm.date).toISOString(),
        duration: parseInt(activityForm.duration) || 0
      }

      await onAddActivity(activity)
      setActivityForm({
        type: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        duration: ''
      })
      toast.success('Activity added successfully!')
    } catch (error) {
      toast.error('Failed to add activity')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await onDelete(lead.Id)
        onClose()
        toast.success('Lead deleted successfully!')
      } catch (error) {
        toast.error('Failed to delete lead')
      }
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getActivityIcon = (type) => {
    const icons = {
      call: 'Phone',
      email: 'Mail',
      meeting: 'Calendar',
      note: 'FileText'
    }
    return icons[type] || 'FileText'
  }

  const getActivityColor = (type) => {
    const colors = {
      call: 'primary',
      email: 'accent',
      meeting: 'warning',
      note: 'info'
    }
    return colors[type] || 'default'
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-gray-900 font-display">
                {lead ? 'Edit Lead' : 'Add New Lead'}
              </h2>
              {lead && (
                <Badge variant="primary" size="sm">
                  {lead.stage}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {lead && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDelete}
                >
                  <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <ApperIcon name="X" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'details'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Lead Details
            </button>
            {lead && (
              <button
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'activities'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('activities')}
              >
                Activities ({activities.length})
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter full name"
                    />
                    
                    <Input
                      label="Company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Enter company name"
                    />
                    
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                    
                    <Input
                      label="Phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Deal Value"
                      type="number"
                      value={formData.dealValue}
                      onChange={(e) => handleInputChange('dealValue', e.target.value)}
                      placeholder="0"
                    />
                    
                    <Select
                      label="Stage"
                      options={stageOptions}
                      value={formData.stage}
                      onChange={(e) => handleInputChange('stage', e.target.value)}
                    />
                    
                    <Select
                      label="Lead Source"
                      options={sourceOptions}
                      value={formData.source}
                      onChange={(e) => handleInputChange('source', e.target.value)}
                      placeholder="Select source"
                    />
                    
                    <Input
                      label="Next Action Date"
                      type="date"
                      value={formData.nextActionDate}
                      onChange={(e) => handleInputChange('nextActionDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Add any additional notes about this lead..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'activities' && lead && (
              <div className="space-y-6">
                {/* Add Activity Form */}
                <Card className="bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-4">Add New Activity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Activity Type"
                      options={activityTypeOptions}
                      value={activityForm.type}
                      onChange={(e) => handleActivityChange('type', e.target.value)}
                      placeholder="Select type"
                    />
                    
                    <Input
                      label="Date"
                      type="date"
                      value={activityForm.date}
                      onChange={(e) => handleActivityChange('date', e.target.value)}
                    />
                    
                    <div className="md:col-span-2">
                      <Input
                        label="Description"
                        value={activityForm.description}
                        onChange={(e) => handleActivityChange('description', e.target.value)}
                        placeholder="What happened during this activity?"
                      />
                    </div>
                    
                    <Input
                      label="Duration (minutes)"
                      type="number"
                      value={activityForm.duration}
                      onChange={(e) => handleActivityChange('duration', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={handleAddActivity}
                    >
                      <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                      Add Activity
                    </Button>
                  </div>
                </Card>

                {/* Activities List */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Activity History</h3>
                  {activities.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <ApperIcon name="Calendar" className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No activities recorded yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activities.map((activity) => (
                        <Card key={activity.Id} className="bg-white">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full bg-${getActivityColor(activity.type)}-100`}>
                              <ApperIcon 
                                name={getActivityIcon(activity.type)} 
                                className={`h-4 w-4 text-${getActivityColor(activity.type)}-600`} 
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <Badge variant={getActivityColor(activity.type)} size="sm">
                                  {activity.type}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                  {format(new Date(activity.date), 'MMM d, yyyy')}
                                </span>
                              </div>
                              <p className="text-gray-900 mt-1">{activity.description}</p>
                              {activity.duration > 0 && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Duration: {activity.duration} minutes
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {activeTab === 'details' && (
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-4">
                {lead && (
                  <div className="text-sm text-gray-600">
                    <span>Deal Value: </span>
                    <span className="font-semibold text-accent-600">
                      {formatCurrency(parseFloat(formData.dealValue) || 0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  loading={loading}
                >
                  {lead ? 'Update Lead' : 'Create Lead'}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default LeadModal