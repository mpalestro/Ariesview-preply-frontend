'use client'

import { useState } from 'react'
import Link from 'next/link'
import { propertiesData } from '../data'

// Before the component export, add this type definition
interface VisibleSectionsState {
  [key: string]: boolean;
}

export default function PropertyOverview() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFund, setSelectedFund] = useState('all')
  const [visibleSections, setVisibleSections] = useState<VisibleSectionsState>({
    'Evolston Capital Fund I': false,
    'AriesView Fund I': false,
    'AriesView Fund II': false,
    'Under Evaluation': false
  })
  
  // Use propertiesData from data.ts
  const properties = propertiesData

  // Get unique funds
  const funds = ['all', ...Array.from(new Set(properties.map(p => p.fund)))]
  
  // Filter properties based on selected filter, fund, and search query
  const filteredProperties = properties.filter(property => {
    // Apply status filter
    if (selectedFilter !== 'all' && property.status !== selectedFilter) {
      return false
    }
    
    // Apply fund filter
    if (selectedFund !== 'all' && property.fund !== selectedFund) {
      return false
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        property.name.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.type.toLowerCase().includes(query) ||
        property.category.toLowerCase().includes(query) ||
        property.fund.toLowerCase().includes(query)
      )
    }
    
    return true
  })

  // Group properties by fund
  const propertiesByFund = {
    'Evolston Capital Fund I': properties.filter(p => p.fund === 'Evolston Capital Fund I'),
    'AriesView Fund I': properties.filter(p => p.fund === 'AriesView Fund I'),
    'AriesView Fund II': properties.filter(p => p.fund === 'AriesView Fund II'),
    'Under Evaluation': properties.filter(p => p.fund === 'Under Evaluation')
  }
  
  // Calculate portfolio metrics based on selected fund
  const relevantProperties = selectedFund === 'all' ? properties : properties.filter(p => p.fund === selectedFund)
  const totalValue = relevantProperties.reduce((sum, prop) => sum + prop.value, 0)
  const averageOccupancy = relevantProperties.reduce((sum, prop) => sum + prop.occupancy, 0) / relevantProperties.length
  const averageROI = relevantProperties.reduce((sum, prop) => sum + prop.roi, 0) / relevantProperties.length
  const totalUnits = relevantProperties.reduce((sum, prop) => sum + prop.units, 0)
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  // Toggle section visibility
  const toggleSection = (section: string) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof visibleSections]
    }))
  }

  const renderPropertySection = (fundName: string, propertyList: Array<any>) => {
    if (propertyList.length === 0) return null;

    return (
      <div className={`mb-8 transition-all duration-200 ${!visibleSections[fundName] ? 'opacity-60' : ''}`}>
        <div className="flex items-center justify-between mb-4 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">{fundName}</h2>
            <div className="text-sm text-gray-500">
              {propertyList.length} Properties
            </div>
          </div>
          <button
            onClick={() => toggleSection(fundName)}
            className="flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
            suppressHydrationWarning
          >
            {visibleSections[fundName] ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
                <span className="ml-2">Hide Properties</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-2">Show Properties</span>
              </>
            )}
          </button>
        </div>
        {visibleSections[fundName] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyList.map(property => (
              <Link
                href={`/operations-dashboard/properties/${property.id}`}
                key={property.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative h-48 rounded-t-lg overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${property.status === 'active' ? 'bg-green-100 text-green-800' :
                        property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {property.status}
                    </span>
                  </div>
                  {selectedFund === 'all' && searchQuery && (
                    <div className="absolute top-2 left-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        property.fund === 'Under Evaluation' 
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {property.fund}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{property.address}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-1 text-gray-900">{property.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Units:</span>
                      <span className="ml-1 text-gray-900">{property.units}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Occupancy:</span>
                      <span className="ml-1 text-gray-900">{property.occupancy}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">ROI:</span>
                      <span className="ml-1 text-gray-900">{property.roi}%</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Property Overview</h1>
          <p className="text-sm sm:text-base text-gray-600">
            {selectedFund === 'all' 
              ? 'Manage and monitor your entire real estate portfolio'
              : `Viewing properties in ${selectedFund}`}
          </p>
        </header>
        
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 md:p-5 border-l-4 border-blue-500 overflow-hidden">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
              {selectedFund === 'all' ? 'Total Portfolio Value' : `${selectedFund} Value`}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{formatCurrency(totalValue)}</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">{relevantProperties.length} Properties</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 md:p-5 border-l-4 border-green-500 overflow-hidden">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Average Occupancy</p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{averageOccupancy.toFixed(1)}%</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">{totalUnits} Total Units</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 md:p-5 border-l-4 border-purple-500 overflow-hidden">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Average ROI</p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{averageROI.toFixed(2)}%</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">Annual Return</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 md:p-5 border-l-4 border-yellow-500 overflow-hidden">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Property Categories</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {Array.from(new Set(relevantProperties.map(p => p.category))).map(category => (
                <span key={category} className={`px-2 py-1 ${
                  category === 'Office' ? 'bg-blue-100 text-blue-800' :
                  category === 'Residential' ? 'bg-green-100 text-green-800' :
                  category === 'Retail' ? 'bg-purple-100 text-purple-800' :
                  'bg-yellow-100 text-yellow-800'
                } text-xs rounded-full`}>
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="w-full sm:flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                suppressHydrationWarning
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
            {/* Fund Selector */}
            <select
              id="fund-selector"
              aria-label="Select Fund"
              value={selectedFund}
              onChange={(e) => setSelectedFund(e.target.value)}
              className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              suppressHydrationWarning
            >
              {funds.map(fund => (
                <option key={fund} value={fund}>
                  {fund === 'all' ? 'All Funds' : fund}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <div className="relative">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center px-3 sm:px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm"
                suppressHydrationWarning
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">Filter: {selectedFilter === 'all' ? 'All' : selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}</span>
              </button>
              {filterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => { setSelectedFilter('all'); setFilterOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm ${selectedFilter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      All Properties
                    </button>
                    <button
                      onClick={() => { setSelectedFilter('active'); setFilterOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm ${selectedFilter === 'active' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => { setSelectedFilter('pending'); setFilterOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm ${selectedFilter === 'pending' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => { setSelectedFilter('maintenance'); setFilterOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm ${selectedFilter === 'maintenance' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      Maintenance
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* View Mode Selector */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2 sm:px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                aria-label="Grid view"
                suppressHydrationWarning
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-2 sm:px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                aria-label="List view"
                suppressHydrationWarning
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Properties Display */}
        {viewMode === 'grid' ? (
          <>
            {renderPropertySection('Evolston Capital Fund I', propertiesByFund['Evolston Capital Fund I'])}
            {renderPropertySection('AriesView Fund I', propertiesByFund['AriesView Fund I'])}
            {renderPropertySection('AriesView Fund II', propertiesByFund['AriesView Fund II'])}
            {renderPropertySection('Under Evaluation', propertiesByFund['Under Evaluation'])}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-between">
                      <span>Fund</span>
                      <div className="flex gap-2">
                        {Object.keys(visibleSections).map(section => (
                          <button
                            key={section}
                            onClick={() => toggleSection(section)}
                            className={`inline-flex items-center p-1 rounded transition-colors
                              ${visibleSections[section]
                                ? 'text-blue-600 hover:text-blue-800'
                                : 'text-gray-400 hover:text-gray-600'
                              }`}
                            title={`${visibleSections[section] ? 'Hide' : 'Show'} ${section}`}
                          >
                            {visibleSections[section] ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProperties
                  .filter(property => visibleSections[property.fund])
                  .map(property => (
                    <tr
                      key={property.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => window.location.href = `/operations-dashboard/properties/${property.id}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full object-cover" src={property.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{property.name}</div>
                            <div className="text-sm text-gray-500">{property.address}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          property.fund === 'Under Evaluation'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {property.fund}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.units}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.occupancy}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.roi}%</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${property.status === 'active' ? 'bg-green-100 text-green-800' :
                            property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`}>
                          {property.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
} 