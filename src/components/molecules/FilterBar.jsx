import { useState } from 'react'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const FilterBar = ({ onFilterChange, filters = {}, className = '' }) => {
  const [activeFilters, setActiveFilters] = useState(filters)

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

  const dealValueOptions = [
    { value: '0-1000', label: '$0 - $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000+', label: '$10,000+' }
  ]

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value }
    setActiveFilters(newFilters)
    if (onFilterChange) {
      onFilterChange(newFilters)
    }
  }

  const clearFilters = () => {
    const clearedFilters = {}
    setActiveFilters(clearedFilters)
    if (onFilterChange) {
      onFilterChange(clearedFilters)
    }
  }

  const hasActiveFilters = Object.values(activeFilters).some(value => value && value !== '')

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <Select
        placeholder="All Stages"
        options={stageOptions}
        value={activeFilters.stage || ''}
        onChange={(e) => handleFilterChange('stage', e.target.value)}
        className="min-w-32"
      />
      
      <Select
        placeholder="All Sources"
        options={sourceOptions}
        value={activeFilters.source || ''}
        onChange={(e) => handleFilterChange('source', e.target.value)}
        className="min-w-32"
      />
      
      <Select
        placeholder="Deal Value"
        options={dealValueOptions}
        value={activeFilters.dealValue || ''}
        onChange={(e) => handleFilterChange('dealValue', e.target.value)}
        className="min-w-32"
      />

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-secondary-600 hover:text-secondary-700"
        >
          <ApperIcon name="X" className="h-4 w-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  )
}

export default FilterBar