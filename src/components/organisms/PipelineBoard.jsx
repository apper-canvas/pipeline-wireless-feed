import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import LeadCard from '@/components/molecules/LeadCard'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const PipelineBoard = ({ 
  leads = [], 
  onLeadUpdate, 
  onEditLead, 
  onDeleteLead, 
  onViewDetails,
  loading = false 
}) => {
  const [draggedLead, setDraggedLead] = useState(null)
  const [dragOverStage, setDragOverStage] = useState(null)

  const stages = [
    { name: 'New Lead', color: 'bg-blue-500', lightColor: 'bg-blue-50' },
    { name: 'Contacted', color: 'bg-yellow-500', lightColor: 'bg-yellow-50' },
    { name: 'Qualified', color: 'bg-purple-500', lightColor: 'bg-purple-50' },
    { name: 'Proposal', color: 'bg-orange-500', lightColor: 'bg-orange-50' },
    { name: 'Closed Won', color: 'bg-green-500', lightColor: 'bg-green-50' },
    { name: 'Closed Lost', color: 'bg-red-500', lightColor: 'bg-red-50' }
  ]

  const getLeadsByStage = (stageName) => {
    return leads.filter(lead => lead.stage === stageName)
  }

  const getTotalValueByStage = (stageName) => {
    const stageLeads = getLeadsByStage(stageName)
    return stageLeads.reduce((sum, lead) => sum + (lead.dealValue || 0), 0)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleDragStart = (e, lead) => {
    setDraggedLead(lead)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.outerHTML)
  }

  const handleDragOver = (e, stageName) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverStage(stageName)
  }

  const handleDragLeave = (e) => {
    // Only clear if we're actually leaving the drop zone
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverStage(null)
    }
  }

  const handleDrop = async (e, newStage) => {
    e.preventDefault()
    setDragOverStage(null)
    
    if (!draggedLead || draggedLead.stage === newStage) {
      setDraggedLead(null)
      return
    }

    try {
      const updatedLead = { ...draggedLead, stage: newStage }
      await onLeadUpdate(updatedLead)
      
      // Show success message
      toast.success(`Lead moved to ${newStage}!`, {
        position: "top-right",
        autoClose: 2000,
      })
      
    } catch (error) {
      toast.error('Failed to update lead stage')
    } finally {
      setDraggedLead(null)
    }
  }

  const handleDragEnd = () => {
    setDraggedLead(null)
    setDragOverStage(null)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stages.map((stage) => (
          <div key={stage.name} className="bg-gray-50 rounded-lg p-4">
            <div className="h-6 bg-gray-200 rounded mb-4 shimmer"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded shimmer"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stages.map((stage) => {
        const stageLeads = getLeadsByStage(stage.name)
        const totalValue = getTotalValueByStage(stage.name)
        const isDropZone = dragOverStage === stage.name

        return (
          <div
            key={stage.name}
            className={`rounded-lg border-2 transition-all duration-200 ${
              isDropZone 
                ? 'border-primary-400 bg-primary-50 shadow-lg' 
                : 'border-gray-200 bg-gray-50'
            }`}
            onDragOver={(e) => handleDragOver(e, stage.name)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage.name)}
          >
            {/* Stage Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {stage.name}
                </h3>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                  {stageLeads.length}
                </span>
              </div>
              <div className="text-lg font-bold text-accent-600">
                {formatCurrency(totalValue)}
              </div>
            </div>

            {/* Stage Content */}
            <div className="p-4 space-y-3 min-h-96 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {stageLeads.map((lead) => (
                  <div
                    key={lead.Id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead)}
                    onDragEnd={handleDragEnd}
                    className={`${
                      draggedLead?.Id === lead.Id ? 'opacity-50' : ''
                    }`}
                  >
                    <LeadCard
                      lead={lead}
                      onEdit={onEditLead}
                      onDelete={onDeleteLead}
                      onViewDetails={onViewDetails}
                      draggable
                    />
                  </div>
                ))}
              </AnimatePresence>
              
              {stageLeads.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <ApperIcon name="Inbox" className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No leads in this stage</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PipelineBoard