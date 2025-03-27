'use client'

import { useState } from 'react'
import Sidebar from '../../../../components/Sidebar'
import { useRouter } from 'next/navigation'

export default function DealPipelinePage() {
  const [activeTab, setActiveTab] = useState('active')
  const [showSidebar, setShowSidebar] = useState(true)
  const router = useRouter()
  
  // Handle navigation from sidebar
  const handleProfileClick = () => {
    router.push('/operations-dashboard?view=profile')
  }

  const handleSettingsClick = () => {
    router.push('/operations-dashboard?view=settings')
  }

  const handleDashboardClick = () => {
    router.push('/operations-dashboard')
  }

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      {showSidebar && (
        <Sidebar 
          currentPath="/operations-dashboard/acquisition-screening/deal-pipeline"
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onDashboardClick={handleDashboardClick}
          onToggleSidebar={handleToggleSidebar}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 bg-white shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  aria-label="Toggle sidebar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Deal Pipeline</h1>
              <p className="text-gray-600">Track and manage potential acquisition opportunities</p>
            </div>

            {/* Pipeline Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-sm font-medium text-gray-600">Total Pipeline Value</h2>
                <p className="text-2xl font-bold mt-2">$425M</p>
                <p className="text-sm text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-sm font-medium text-gray-600">Active Deals</h2>
                <p className="text-2xl font-bold mt-2">8</p>
                <p className="text-sm text-gray-600 mt-1">3 in due diligence</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-sm font-medium text-gray-600">Avg. Deal Size</h2>
                <p className="text-2xl font-bold mt-2">$53.1M</p>
                <p className="text-sm text-gray-600 mt-1">Range: $25M - $85M</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-sm font-medium text-gray-600">Conversion Rate</h2>
                <p className="text-2xl font-bold mt-2">18%</p>
                <p className="text-sm text-green-600 mt-1">+3% from last quarter</p>
              </div>
            </div>

            {/* Pipeline Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === 'active'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Active Deals (8)
                  </button>
                  <button
                    onClick={() => setActiveTab('closed')}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === 'closed'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Closed Deals (12)
                  </button>
                  <button
                    onClick={() => setActiveTab('rejected')}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === 'rejected'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Rejected (15)
                  </button>
                </nav>
              </div>

              {/* Deal List */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Sample Deal Items */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">Tech Plaza Office Complex</h3>
                        <span className="ml-3 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Due Diligence
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">San Francisco, CA | 125,000 SF | $85M</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">Riverside Apartments</h3>
                        <span className="ml-3 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          LOI Submitted
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Austin, TX | 250 Units | $65M</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 