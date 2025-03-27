'use client'

import { useState, useEffect } from 'react'
import Sidebar from '../../../components/Sidebar'
import { useRouter } from 'next/navigation'

// Server-friendly skeleton component
function CodDashboardSkeleton() {
  return (
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="text-gray-600">
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-2">Loading dashboard...</span>
      </div>
    </div>
  )
}

// Bar Chart Component
function BarChart({ data, title }) {
  const maxValue = Math.max(...data.map(item => item.value))
  const barHeight = 260 // Chart height
  const barWidth = 45 // Width of each bar
  const barSpacing = 15 // Spacing between bars
  const chartWidth = data.length * (barWidth + barSpacing)
  
  return (
    <div className="h-80">
      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>
      <div className="relative h-full">
        <svg 
          width={chartWidth} 
          height={barHeight}
          className="mx-auto"
        >
          {data.map((item, index) => {
            const height = (item.value / maxValue) * barHeight * 0.9
            return (
              <g key={item.label} transform={`translate(${index * (barWidth + barSpacing)}, 0)`}>
                <rect
                  y={barHeight - height}
                  width={barWidth}
                  height={height}
                  rx={4}
                  fill={item.color}
                  className="transition-all duration-500 ease-in-out hover:opacity-75"
                />
                <text
                  x={barWidth / 2}
                  y={barHeight - height - 10}
                  textAnchor="middle"
                  fill="#4B5563"
                  className="text-xs font-medium"
                >
                  {item.value}
                </text>
                <text
                  x={barWidth / 2}
                  y={barHeight + 15}
                  textAnchor="middle"
                  fill="#4B5563"
                  className="text-xs"
                >
                  {item.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

// Donut Chart Component
function DonutChart({ data, title }) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0)
  const radius = 100
  const strokeWidth = 50
  
  let startAngle = 0
  
  // Calculate segments
  const segments = data.map((item) => {
    const percentage = (item.value / total)
    const angle = percentage * 360
    const endAngle = startAngle + angle
    
    const x1 = radius + radius * Math.sin((startAngle * Math.PI) / 180)
    const y1 = radius - radius * Math.cos((startAngle * Math.PI) / 180)
    const x2 = radius + radius * Math.sin((endAngle * Math.PI) / 180)
    const y2 = radius - radius * Math.cos((endAngle * Math.PI) / 180)
    
    // Determine if the angle is greater than 180 degrees
    const largeArcFlag = angle > 180 ? 1 : 0
    
    const pathData = [
      `M ${radius} ${radius}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ')
    
    const result = { ...item, pathData, percentage, startAngle, endAngle }
    startAngle = endAngle
    return result
  })
  
  return (
    <div className="h-80">
      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>
      <div className="flex flex-col items-center justify-center h-full">
        <svg 
          width={radius * 2} 
          height={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          className="mb-4"
        >
          {segments.map((segment, i) => (
            <path
              key={segment.label}
              d={segment.pathData}
              fill={segment.color}
              className="transition-all duration-300 ease-in-out hover:opacity-80"
              stroke="#fff"
              strokeWidth="1"
            />
          ))}
          <circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth}
            fill="white"
          />
        </svg>
        <div className="flex flex-wrap justify-center gap-4">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: segment.color }}
              ></div>
              <span className="text-sm text-gray-700">
                {segment.label} ({segment.percentage.toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 1})}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Horizontal Bar Chart Component
function HorizontalBarChart({ data, title }) {
  const maxValue = Math.max(...data.map(item => item.value))
  const barHeight = 30
  const barSpacing = 15
  const chartHeight = data.length * (barHeight + barSpacing)
  
  return (
    <div className="h-80">
      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>
      <div className="h-full flex items-center justify-center">
        <svg 
          width="100%" 
          height={chartHeight}
          viewBox={`0 0 400 ${chartHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {data.map((item, index) => {
            const width = (item.value / maxValue) * 300
            const y = index * (barHeight + barSpacing)
            return (
              <g key={item.label} transform={`translate(0, ${y})`}>
                <text
                  x="0"
                  y={barHeight / 2 + 5}
                  fill="#4B5563"
                  className="text-xs font-medium"
                >
                  {item.label}
                </text>
                <rect
                  x="100"
                  y="0"
                  width={width}
                  height={barHeight}
                  rx={4}
                  fill={item.color}
                  className="transition-all duration-500 ease-in-out hover:opacity-75"
                />
                <text
                  x={width + 110}
                  y={barHeight / 2 + 5}
                  fill="#4B5563"
                  className="text-xs font-medium"
                >
                  {item.value.toLocaleString()}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

// Line Chart Component
function LineChart({ data, title }) {
  const maxValue = Math.max(...data.map(point => point.value))
  const chartWidth = 400
  const chartHeight = 200
  const padding = 30
  
  // Create points for the path
  const points = data.map((point, i) => {
    const x = padding + (i / (data.length - 1)) * (chartWidth - padding * 2)
    const y = chartHeight - padding - (point.value / maxValue) * (chartHeight - padding * 2)
    return { x, y, ...point }
  })
  
  // Create the path string
  const pathData = points.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ')
  
  return (
    <div className="h-80">
      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>
      <div className="h-full flex items-center justify-center">
        <svg 
          width="100%" 
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* X and Y axis */}
          <line 
            x1={padding} 
            y1={chartHeight - padding} 
            x2={chartWidth - padding} 
            y2={chartHeight - padding} 
            stroke="#9CA3AF" 
            strokeWidth="1" 
          />
          <line 
            x1={padding} 
            y1={padding} 
            x2={padding} 
            y2={chartHeight - padding} 
            stroke="#9CA3AF" 
            strokeWidth="1" 
          />
          
          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            className="transition-all duration-500 ease-in-out"
          />
          
          {/* Data points */}
          {points.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#10B981"
                className="transition-all duration-300 ease-in-out hover:r-6"
              />
              <text
                x={point.x}
                y={chartHeight - padding + 15}
                textAnchor="middle"
                fill="#4B5563"
                className="text-xs"
              >
                {point.label}
              </text>
            </g>
          ))}
          
          {/* Y-axis labels */}
          <text
            x={padding - 10}
            y={padding}
            textAnchor="end"
            fill="#4B5563"
            className="text-xs"
          >
            {maxValue}
          </text>
          <text
            x={padding - 10}
            y={chartHeight - padding}
            textAnchor="end"
            fill="#4B5563"
            className="text-xs"
          >
            0
          </text>
        </svg>
      </div>
    </div>
  )
}

// Client-only component with all interactivity
function CODDashboardClient() {
  const router = useRouter()
  const [showSidebar, setShowSidebar] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [selectedGameMode, setSelectedGameMode] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  // Chart data
  const incidentTypeData = [
    { label: 'Verbal Abuse', value: 147, color: '#EF4444' },
    { label: 'Hate Speech', value: 98, color: '#F59E0B' },
    { label: 'Threats', value: 76, color: '#8B5CF6' },
    { label: 'Harassment', value: 124, color: '#EC4899' }
  ]

  const timeOfDayData = [
    { label: '12am', value: 18 },
    { label: '4am', value: 12 },
    { label: '8am', value: 24 },
    { label: '12pm', value: 48 },
    { label: '4pm', value: 74 },
    { label: '8pm', value: 92 },
    { label: '11pm', value: 62 }
  ]

  const gameModeSettingData = [
    { label: 'Strict', value: 14300, color: '#10B981' },
    { label: 'Normal', value: 28700, color: '#3B82F6' },
    { label: 'Unfiltered', value: 8950, color: '#F59E0B' }
  ]

  const gameModesData = [
    { label: 'Warzone', value: 42, color: '#3B82F6' },
    { label: 'Multiplayer', value: 31, color: '#F59E0B' },
    { label: 'Ranked', value: 17, color: '#8B5CF6' },
    { label: 'Campaign', value: 10, color: '#10B981' }
  ]
  
  // Reports data for the table
  const reportsData = [
    {
      id: '12345',
      type: 'Verbal Abuse',
      reportedPlayer: 'XxShadowKillerxX',
      reportedBy: 'User9274',
      date: 'May 14, 2023 (2h ago)',
      status: 'Under Review'
    },
    {
      id: '12342',
      type: 'Harassment',
      reportedPlayer: 'NoobMaster69',
      reportedBy: 'User3821',
      date: 'May 14, 2023 (5h ago)',
      status: 'Open'
    },
    {
      id: '12339',
      type: 'Threats',
      reportedPlayer: 'EliteSniper420',
      reportedBy: 'User6459',
      date: 'May 13, 2023 (Yesterday)',
      status: 'Resolved'
    },
    {
      id: '12336',
      type: 'Verbal Abuse',
      reportedPlayer: 'ProGamer2023',
      reportedBy: 'User1122',
      date: 'May 13, 2023 (Yesterday)',
      status: 'Under Review'
    },
    {
      id: '12332',
      type: 'Harassment',
      reportedPlayer: 'GameMaster777',
      reportedBy: 'User4456',
      date: 'May 12, 2023 (2 days ago)',
      status: 'Open'
    }
  ]

  const handleProfileClick = () => {
    router.push('/operations-dashboard?view=profile')
  }

  const handleSettingsClick = () => {
    router.push('/operations-dashboard?view=settings')
  }

  const handleDashboardClick = () => {
    router.push('/operations-dashboard')
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {showSidebar && (
        <Sidebar
          currentPath="/operations-dashboard/benchmark-center/cod"
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onDashboardClick={handleDashboardClick}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {/* Enhanced Header with breadcrumbs and actions */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    aria-label="Toggle sidebar"
                    suppressHydrationWarning
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
                  <div>
                    <div className="flex items-center text-xs text-gray-500 mb-0.5">
                      <a href="/operations-dashboard" className="hover:text-blue-600 transition-colors">Dashboard</a>
                      <svg className="h-3 w-3 mx-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <a href="/operations-dashboard/benchmark-center" className="hover:text-blue-600 transition-colors">Benchmark Center</a>
                      <svg className="h-3 w-3 mx-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Property Operations Overview</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Property Operations Overview</h1>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex bg-gray-100 p-0.5 rounded-lg">
                    <select
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                      className="bg-transparent px-2 py-1 border-0 focus:ring-0 text-xs font-medium"
                      aria-label="Select time frame"
                      suppressHydrationWarning
                    >
                      <option value="1h">Last Hour</option>
                      <option value="24h">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                    </select>
                    <div className="border-l border-gray-300 mx-0.5"></div>
                    <select
                      value={selectedGameMode}
                      onChange={(e) => setSelectedGameMode(e.target.value)}
                      className="bg-transparent px-2 py-1 border-0 focus:ring-0 text-xs font-medium"
                      aria-label="Select game mode"
                      suppressHydrationWarning
                    >
                      <option value="all">All Game Modes</option>
                      <option value="warzone">Warzone</option>
                      <option value="multiplayer">Multiplayer</option>
                      <option value="ranked">Ranked</option>
                    </select>
                  </div>
                  <button 
                    className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-xs font-medium text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    suppressHydrationWarning
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export
                  </button>
                </div>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="px-4 pb-0">
              <nav className="flex space-x-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-2 px-1 text-xs font-medium border-b-2 ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors`}
                  suppressHydrationWarning
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`py-2 px-1 text-xs font-medium border-b-2 ${
                    activeTab === 'reports'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors`}
                  suppressHydrationWarning
                >
                  Reports
                </button>
                <button
                  onClick={() => setActiveTab('trends')}
                  className={`py-2 px-1 text-xs font-medium border-b-2 ${
                    activeTab === 'trends'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors`}
                  suppressHydrationWarning
                >
                  Trends
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-2 px-1 text-xs font-medium border-b-2 ${
                    activeTab === 'settings'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors`}
                  suppressHydrationWarning
                >
                  Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Dashboard Content - tighter layout with less padding */}
          <div className="p-2 bg-gray-100">
            {/* Real-time alerts section - more compact */}
            <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow mb-2">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className="relative mr-2">
                    <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <svg className="h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h2 className="text-sm font-semibold text-gray-900">Real-time Alerts</h2>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Last updated: 2 minutes ago</span>
                  <button 
                    aria-label="Refresh alerts" 
                    title="Refresh alerts"
                    className="text-gray-400 hover:text-gray-600" 
                    suppressHydrationWarning
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-1.5">
                <div className="flex items-center p-1.5 bg-red-50 border border-red-100 rounded-lg">
                  <div className="flex-shrink-0 mr-2">
                    <svg className="h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-medium text-red-800">High Priority: Spike in verbal abuse reports (23 new incidents)</p>
                      <span className="text-xs text-red-600">5 min ago</span>
                    </div>
                    <p className="text-xs text-red-700 mt-0.5">Concentrated in Team Deathmatch mode across NA servers</p>
                  </div>
                </div>
                
                <div className="flex items-center p-1.5 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <div className="flex-shrink-0 mr-2">
                    <svg className="h-4 w-4 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-medium text-yellow-800">Medium Priority: Player "XxSniperKingxX" accumulating reports</p>
                      <span className="text-xs text-yellow-600">20 min ago</span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-0.5">7 reports in the last hour for harassment in voice chat</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-1.5 pt-1.5 border-t border-gray-100">
                <button 
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center" 
                  suppressHydrationWarning
                >
                  View all alerts
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <div className="flex items-center space-x-1">
                  <button 
                    className="px-1.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                    suppressHydrationWarning
                  >
                    All
                  </button>
                  <button 
                    className="px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    suppressHydrationWarning
                  >
                    High
                  </button>
                </div>
              </div>
            </div>
            
            {/* User Compliance Heat Map - more compact */}
            <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow mb-2">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Player Compliance Heat Map</h2>
                  <p className="text-xs text-gray-500">Visualizing compliance across users and policy categories</p>
                </div>
                <div className="flex items-center space-x-1">
                  <select 
                    className="text-xs rounded-md border border-gray-300 py-0.5 pl-1.5 pr-5 bg-white focus:ring-blue-500 focus:border-blue-500"
                    aria-label="Filter compliance by region"
                  >
                    <option>All Regions</option>
                    <option>North America</option>
                    <option>Europe</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="sticky left-0 bg-white z-10 px-1.5 py-1 text-left font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        Metric
                      </th>
                      <th className="px-1.5 py-1 text-center font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        User 1
                      </th>
                      <th className="px-1.5 py-1 text-center font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        User 2
                      </th>
                      <th className="px-1.5 py-1 text-center font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        User 3
                      </th>
                      <th className="px-1.5 py-1 text-center font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        User 4
                      </th>
                      <th className="px-1.5 py-1 text-center font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        User 5
                      </th>
                      <th className="px-1.5 py-1 text-center font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        User 6
                      </th>
                      <th className="px-1.5 py-1 text-center font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        User 7
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr>
                      <td className="sticky left-0 bg-white z-10 px-1.5 py-1.5 whitespace-nowrap font-medium text-gray-700 border-b border-gray-100">
                        Voice Chat
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-red-200 border border-red-300 flex items-center justify-center text-red-700 font-bold text-xs">
                          !
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-yellow-200 border border-yellow-300 flex items-center justify-center text-yellow-700 font-bold text-xs">
                          ~
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-green-200 border border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">
                          ✓
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-green-200 border border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">
                          ✓
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-red-200 border border-red-300 flex items-center justify-center text-red-700 font-bold text-xs">
                          !
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-green-200 border border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">
                          ✓
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-green-200 border border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">
                          ✓
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="sticky left-0 bg-white z-10 px-1.5 py-1.5 whitespace-nowrap font-medium text-gray-700 border-b border-gray-100">
                        Harassment
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-green-200 border border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">
                          ✓
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-red-200 border border-red-300 flex items-center justify-center text-red-700 font-bold text-xs">
                          !
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-yellow-200 border border-yellow-300 flex items-center justify-center text-yellow-700 font-bold text-xs">
                          ~
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-green-200 border border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">
                          ✓
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-red-200 border border-red-300 flex items-center justify-center text-red-700 font-bold text-xs">
                          !
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-yellow-200 border border-yellow-300 flex items-center justify-center text-yellow-700 font-bold text-xs">
                          ~
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-green-200 border border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">
                          ✓
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="sticky left-0 bg-white z-10 px-1.5 py-1.5 whitespace-nowrap font-medium text-gray-700 border-b border-gray-100">
                        Threats
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-green-200 border border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">
                          ✓
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-green-200 border border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">
                          ✓
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-red-200 border border-red-300 flex items-center justify-center text-red-700 font-bold text-xs">
                          !
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-green-200 border border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">
                          ✓
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-green-200 border border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">
                          ✓
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-green-200 border border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">
                          ✓
                        </div>
                      </td>
                      <td className="px-1.5 py-1.5 text-center border-b border-gray-100">
                        <div className="w-6 h-6 mx-auto rounded bg-red-200 border border-red-300 flex items-center justify-center text-red-700 font-bold text-xs">
                          !
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-1 pt-1 border-t border-gray-200 text-xs">
                <div className="flex items-center text-gray-500 gap-2">
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded bg-green-200 mr-1"></div>
                    <span>Compliant</span>
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded bg-yellow-200 mr-1"></div>
                    <span>Warning</span>
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded bg-red-200 mr-1"></div>
                    <span>Non-compliant</span>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Summary Cards - more compact layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
              <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-1">
                  <div className="p-1 bg-red-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-gray-500">Reported Incidents</p>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-lg font-bold text-gray-900">247</p>
                  <span className="text-xs font-semibold text-red-600">+12%</span>
                </div>
              </div>

              <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-1">
                  <div className="p-1 bg-yellow-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-gray-500">Active Reports</p>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-lg font-bold text-gray-900">89</p>
                  <span className="text-xs font-semibold text-yellow-600">+5%</span>
                </div>
              </div>

              <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-1">
                  <div className="p-1 bg-green-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-gray-500">Resolved Cases</p>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-lg font-bold text-gray-900">158</p>
                  <span className="text-xs font-semibold text-green-600">+8%</span>
                </div>
              </div>

              <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-1">
                  <div className="p-1 bg-blue-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-gray-500">Avg Response Time</p>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-lg font-bold text-gray-900">2.4h</p>
                  <span className="text-xs font-semibold text-blue-600">-15%</span>
                </div>
              </div>
            </div>

            {/* Main Charts - more compact */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2">
              {/* Incident Types Chart */}
              <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-xs font-semibold text-gray-900">Incident Types Distribution</h2>
                  <div className="flex items-center text-xs">
                    <span className="flex items-center text-green-600 mr-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-1"></span>
                      <span>Improved</span>
                    </span>
                  </div>
                </div>
                <div className="h-56"> {/* Further reduced chart height */}
                  <DonutChart data={incidentTypeData} />
                </div>
              </div>

              {/* Time of Day Analysis */}
              <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-xs font-semibold text-gray-900">Incidents by Time of Day</h2>
                  <div className="flex items-center text-xs">
                    <span className="flex items-center text-red-600 mr-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-600 mr-1"></span>
                      <span>Peak Hours</span>
                    </span>
                  </div>
                </div>
                <div className="h-56"> {/* Further reduced chart height */}
                  <LineChart data={timeOfDayData} />
                </div>
              </div>
            </div>

            {/* Reports Table Section - super compact */}
            <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                <h2 className="text-xs font-semibold text-gray-900 mb-1 sm:mb-0">Recent Reports</h2>
                <div className="flex items-center space-x-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-6 pr-2 py-1 text-xs rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-28 sm:w-32"
                    />
                    <svg
                      className="w-3 h-3 absolute left-2 top-1.5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <select 
                    className="text-xs rounded-md border border-gray-300 py-1 pl-2 pr-4 bg-white focus:ring-blue-500 focus:border-blue-500 w-24"
                    aria-label="Filter reports by type"
                  >
                    <option>All Types</option>
                    <option>Verbal</option>
                    <option>Harassment</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Player
                      </th>
                      <th scope="col" className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportsData.map((report, index) => (
                      <tr key={report.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-1 py-1 whitespace-nowrap text-xs font-medium text-gray-900">
                          #{report.id}
                        </td>
                        <td className="px-1 py-1 whitespace-nowrap">
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                            report.type === 'Verbal Abuse' ? 'bg-red-100 text-red-800' :
                            report.type === 'Harassment' ? 'bg-yellow-100 text-yellow-800' :
                            report.type === 'Threats' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-700">
                          {report.reportedPlayer}
                        </td>
                        <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-500">
                          {report.date}
                        </td>
                        <td className="px-1 py-1 whitespace-nowrap">
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === 'Open' ? 'bg-green-100 text-green-800' :
                            report.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                            report.status === 'Resolved' ? 'bg-gray-100 text-gray-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-1 py-1 whitespace-nowrap text-xs">
                          <div className="flex items-center space-x-1">
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              suppressHydrationWarning
                              title="View details"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button
                              className="text-green-600 hover:text-green-900"
                              suppressHydrationWarning
                              title="Mark as resolved"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between pt-1 border-t border-gray-200 mt-1">
                <div className="flex items-center text-xs text-gray-500">
                  <span>Showing 1-5 of 50</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    className="px-1.5 py-0.5 border border-blue-500 bg-blue-50 text-xs font-medium text-blue-700 hover:bg-blue-100 rounded-md"
                    suppressHydrationWarning
                  >
                    1
                  </button>
                  <button
                    className="px-1.5 py-0.5 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    suppressHydrationWarning
                  >
                    2
                  </button>
                  <button
                    className="px-1.5 py-0.5 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    suppressHydrationWarning
                  >
                    3
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Main page component with client/server split
export default function CODBullyingDashboard() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  return isClient ? <CODDashboardClient /> : <CodDashboardSkeleton />
} 