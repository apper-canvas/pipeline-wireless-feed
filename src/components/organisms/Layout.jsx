import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [taskSidebarOpen, setTaskSidebarOpen] = useState(false)
  const location = useLocation()
  
  const navigationItems = [
    { name: 'Pipeline', href: '/', icon: 'BarChart3' },
    { name: 'Leads', href: '/leads', icon: 'Users' },
    { name: 'Analytics', href: '/analytics', icon: 'TrendingUp' },
    { name: 'Reports', href: '/reports', icon: 'FileText' },
    { name: 'Settings', href: '/settings', icon: 'Settings' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <div className={`lg:hidden fixed inset-0 z-50 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div 
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
        <motion.div 
          initial={{ x: -280 }}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-50"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <ApperIcon name="BarChart3" className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text font-display">Pipeline Pro</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <ApperIcon name="X" className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            <nav className="space-y-2">
{navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <ApperIcon name={item.icon} className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 z-40">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="BarChart3" className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text font-display">Pipeline Pro</span>
          </div>
          
          <nav className="space-y-2">
{navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <ApperIcon name={item.icon} className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

{/* Task Sidebar */}
      {taskSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:z-30">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setTaskSidebarOpen(false)}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: taskSidebarOpen ? 0 : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50 lg:z-30"
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
                  <button
                    onClick={() => setTaskSidebarOpen(false)}
                    className="p-1 rounded-lg hover:bg-gray-100"
                  >
                    <ApperIcon name="X" className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {/* Task content will be injected here */}
                {React.cloneElement(children, { taskSidebarOpen, setTaskSidebarOpen })}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ApperIcon name="Menu" className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded flex items-center justify-center">
                <ApperIcon name="BarChart3" className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text font-display">Pipeline Pro</span>
            </div>
            <button
              onClick={() => setTaskSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 relative"
            >
              <ApperIcon name="CheckSquare" className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Desktop task toggle */}
        <div className="hidden lg:block fixed top-4 right-4 z-20">
          <button
            onClick={() => setTaskSidebarOpen(true)}
            className="p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
          >
            <ApperIcon name="CheckSquare" className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Page content */}
        <main className="min-h-screen">
          {React.cloneElement(children, { taskSidebarOpen, setTaskSidebarOpen })}
        </main>
      </div>
    </div>
  )
}

export default Layout