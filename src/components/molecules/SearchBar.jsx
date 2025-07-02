import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ 
  placeholder = 'Search leads...', 
  onSearch, 
  className = '',
  value = '',
  onChange 
}) => {
  const [searchTerm, setSearchTerm] = useState(value)

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (onChange) {
      onChange(value)
    }
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleClear = () => {
    setSearchTerm('')
    if (onChange) {
      onChange('')
    }
    if (onSearch) {
      onSearch('')
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <ApperIcon name="X" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default SearchBar