import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import LeadModal from "@/components/organisms/LeadModal";
import PipelineBoard from "@/components/organisms/PipelineBoard";
import StatsOverview from "@/components/organisms/StatsOverview";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import * as leadService from "@/services/api/leadService";
import * as activityService from "@/services/api/activityService";

const Pipeline = () => {
const [leads, setLeads] = useState([])
  const [filteredLeads, setFilteredLeads] = useState([])
  const [activities, setActivities] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)

  // Load data on component mount
  useEffect(() => {
    loadData()
  }, [])

  // Filter leads when search term or filters change
  useEffect(() => {
    filterLeads()
  }, [leads, searchTerm, filters])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
const [leadsData, activitiesData, tasksData] = await Promise.all([
        leadService.getAll(),
        activityService.getAll(),
        activityService.getAllTasks()
      ])
      
      setLeads(leadsData)
      setActivities(activitiesData)
      setTasks(tasksData)
    } catch (err) {
      setError('Failed to load pipeline data. Please try again.')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterLeads = () => {
    let filtered = [...leads]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(term) ||
        lead.company.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term)
      )
    }

    // Apply stage filter
    if (filters.stage) {
      filtered = filtered.filter(lead => lead.stage === filters.stage)
    }

    // Apply source filter
    if (filters.source) {
      filtered = filtered.filter(lead => lead.source === filters.source)
    }

    // Apply deal value filter
    if (filters.dealValue) {
      const [min, max] = filters.dealValue.split('-').map(v => 
        v === '10000+' ? Infinity : parseInt(v)
      )
      filtered = filtered.filter(lead => {
        const value = lead.dealValue || 0
        return value >= min && (max === Infinity || value <= max)
      })
    }

    setFilteredLeads(filtered)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleFilter = (newFilters) => {
    setFilters(newFilters)
  }

  const handleAddLead = () => {
    setSelectedLead(null)
    setModalOpen(true)
  }

  const handleEditLead = (lead) => {
    setSelectedLead(lead)
    setModalOpen(true)
  }

  const handleViewDetails = (lead) => {
    setSelectedLead(lead)
    setModalOpen(true)
  }

  const handleSaveLead = async (leadData) => {
    try {
      let savedLead
      if (leadData.Id) {
        // Update existing lead
        savedLead = await leadService.update(leadData.Id, leadData)
        setLeads(prev => prev.map(lead => 
          lead.Id === leadData.Id ? savedLead : lead
        ))
      } else {
        // Create new lead
        savedLead = await leadService.create(leadData)
        setLeads(prev => [...prev, savedLead])
      }
      return savedLead
    } catch (error) {
      throw new Error('Failed to save lead')
    }
  }

  const handleDeleteLead = async (leadId) => {
    try {
      await leadService.delete(leadId)
      setLeads(prev => prev.filter(lead => lead.Id !== leadId))
      
      // Also delete associated activities
      const leadActivities = activities.filter(activity => activity.leadId === leadId)
      for (const activity of leadActivities) {
        await activityService.delete(activity.Id)
      }
      setActivities(prev => prev.filter(activity => activity.leadId !== leadId))
      
    } catch (error) {
      throw new Error('Failed to delete lead')
    }
  }

  const handleLeadUpdate = async (leadData) => {
    try {
      const updatedLead = await leadService.update(leadData.Id, {
        ...leadData,
        lastContactDate: new Date().toISOString()
      })
      setLeads(prev => prev.map(lead => 
        lead.Id === leadData.Id ? updatedLead : lead
      ))
      return updatedLead
    } catch (error) {
      throw new Error('Failed to update lead')
    }
  }

  const handleAddActivity = async (activityData) => {
    try {
      const newActivity = await activityService.create(activityData)
      setActivities(prev => [...prev, newActivity])
      
      // Update lead's last contact date
      const updatedLead = await leadService.update(activityData.leadId, {
        lastContactDate: activityData.date
      })
      setLeads(prev => prev.map(lead => 
        lead.Id === activityData.leadId ? { ...lead, lastContactDate: updatedLead.lastContactDate } : lead
      ))
      
      return newActivity
    } catch (error) {
      throw new Error('Failed to add activity')
    }
  }

const getLeadActivities = (leadId) => {
  return activities
    .filter(activity => activity.leadId === leadId)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await activityService.createTask(taskData)
      setTasks(prev => [...prev, newTask])
      toast.success('Task created successfully')
      return newTask
    } catch (error) {
      toast.error('Failed to create task')
      throw error
    }
  }

  const handleCompleteTask = async (taskId) => {
    try {
      const updatedTask = await activityService.completeTask(taskId)
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ))
      toast.success('Task marked as complete')
    } catch (error) {
      toast.error('Failed to complete task')
    }
  }

  const getLeadTasks = (leadId) => {
    return tasks
      .filter(task => task.leadId === leadId)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  }

  const getAllUpcomingTasks = () => {
    return tasks
      .filter(task => !task.completed)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  }

const handleRetry = () => {
  loadData()
}

if (loading) {
  return <Loading />
}
  if (error) {
    return <Error message={error} onRetry={handleRetry} />
  }

  if (leads.length === 0 && !searchTerm && Object.keys(filters).length === 0) {
    return (
      <div className="min-h-screen">
        <Header
          searchTerm={searchTerm}
          filters={filters}
          onSearch={handleSearch}
          onFilter={handleFilter}
          onAddLead={handleAddLead}
        />
        <div className="p-6">
          <Empty
            title="No leads in your pipeline yet"
            description="Start building your sales pipeline by adding your first lead. Track prospects through every stage from initial contact to closed deals."
            actionText="Add Your First Lead"
            onAction={handleAddLead}
            icon="Users"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        searchTerm={searchTerm}
        filters={filters}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onAddLead={handleAddLead}
      />
      
      <div className="p-6 space-y-6">
        <StatsOverview leads={filteredLeads} />
        
        {filteredLeads.length === 0 ? (
          <Empty
            title="No leads match your current filters"
            description="Try adjusting your search terms or filters to see more results, or add a new lead to get started."
            actionText="Clear Filters"
            onAction={() => {
              setSearchTerm('')
              setFilters({})
            }}
            icon="Search"
          />
        ) : (
<PipelineBoard
            leads={filteredLeads}
            onLeadUpdate={handleLeadUpdate}
            onEditLead={handleEditLead}
            onDeleteLead={handleDeleteLead}
            onViewDetails={handleViewDetails}
            tasks={tasks}
            onCreateTask={handleCreateTask}
            onCompleteTask={handleCompleteTask}
          />
        )}
      </div>

      <LeadModal
        isOpen={modalOpen}
onClose={() => setModalOpen(false)}
        lead={selectedLead}
        onSave={handleSaveLead}
        onDelete={handleDeleteLead}
        activities={selectedLead ? getLeadActivities(selectedLead.Id) : []}
        onAddActivity={handleAddActivity}
        tasks={selectedLead ? getLeadTasks(selectedLead.Id) : []}
        onCreateTask={handleCreateTask}
        onCompleteTask={handleCompleteTask}
        allTasks={getAllUpcomingTasks()}
      />
    </div>
  )
}

export default Pipeline