import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import FilterBar from '@/components/molecules/FilterBar'

const Header = ({ onSearch, onFilter, onAddLead, searchTerm = '', filters = {} }) => {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Side - Title and Search */}
        <div className="flex-1 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display gradient-text">
              Pipeline Pro
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Track and convert your sales leads
            </p>
          </div>
          
          <div className="flex-1 max-w-md">
            <SearchBar
              placeholder="Search leads, companies..."
              value={searchTerm}
              onChange={onSearch}
            />
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <Button
            variant="primary"
            size="md"
            onClick={onAddLead}
          >
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      <div className={`mt-4 ${showFilters || 'hidden lg:block'}`}>
        <FilterBar
          filters={filters}
          onFilterChange={onFilter}
        />
      </div>
    </div>
  )
}

export default Header