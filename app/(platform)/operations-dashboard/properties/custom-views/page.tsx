'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CustomPropertyViews() {
  const [activeView, setActiveView] = useState('financial')
  
  // Sample saved views
  const savedViews = [
    { id: 'financial', name: 'Financial Performance', description: 'View focused on financial metrics and ROI' },
    { id: 'occupancy', name: 'Occupancy Analysis', description: 'Track occupancy rates and tenant information' },
    { id: 'maintenance', name: 'Maintenance Tracker', description: 'Monitor maintenance schedules and issues' },
    { id: 'market', name: 'Market Comparison', description: 'Compare properties against market benchmarks' },
  ]
  
  // Sample properties data
  const properties = [
    {
      id: 'prop-001',
      name: 'Skyline Tower',
      type: 'Office',
      value: 12500000,
      roi: 8.2,
      occupancy: 92,
      maintenanceCost: 105000,
      energyEfficiency: 'A',
      marketRentDiff: 5.2,
    },
    {
      id: 'prop-002',
      name: 'Riverside Apartments',
      type: 'Multi-family',
      value: 22800000,
      roi: 7.5,
      occupancy: 88,
      maintenanceCost: 215000,
      energyEfficiency: 'B',
      marketRentDiff: -1.3,
    },
    {
      id: 'prop-003',
      name: 'Lakefront Mall',
      type: 'Retail',
      value: 35000000,
      roi: 6.8,
      occupancy: 78,
      maintenanceCost: 320000,
      energyEfficiency: 'C',
      marketRentDiff: -3.8,
    },
    {
      id: 'prop-004',
      name: 'Tech Park Plaza',
      type: 'Office',
      value: 48000000,
      roi: 9.2,
      occupancy: 95,
      maintenanceCost: 220000,
      energyEfficiency: 'A+',
      marketRentDiff: 8.7,
    },
    {
      id: 'prop-005',
      name: 'Sunset Heights',
      type: 'Apartments',
      value: 18700000,
      roi: 8.0,
      occupancy: 91,
      maintenanceCost: 178000,
      energyEfficiency: 'B+',
      marketRentDiff: 2.1,
    },
    {
      id: 'prop-006',
      name: 'Mountain View Industrial',
      type: 'Warehouse',
      value: 28400000,
      roi: 10.5,
      occupancy: 100,
      maintenanceCost: 130000,
      energyEfficiency: 'B',
      marketRentDiff: 7.4,
    }
  ]
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }
  
  return (
    <div className="bg-gray-50 min-h-screen w-full p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Custom Property Views</h1>
          <p className="text-gray-600">Create and manage customized views for your property portfolio</p>
        </header>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Saved Views</h2>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New View
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {savedViews.map((view) => (
              <div 
                key={view.id}
                className={`border rounded-lg p-4 cursor-pointer transition duration-150 ${
                  activeView === view.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => setActiveView(view.id)}
              >
                <h3 className="font-medium text-gray-900">{view.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{view.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {activeView === 'financial' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 bg-blue-50 border-b border-blue-100">
              <h2 className="text-lg font-semibold text-blue-800">Financial Performance View</h2>
              <p className="text-sm text-blue-600">Focused on property values, ROI, and financial metrics</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.sort((a, b) => b.roi - a.roi).map((property) => (
                    <tr key={property.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{property.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {property.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {formatCurrency(property.value)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          property.roi >= 9 ? 'bg-green-100 text-green-800' :
                          property.roi >= 7 ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.roi}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link href={`/operations-dashboard/properties/property-details?id=${property.id}`} className="text-blue-600 hover:text-blue-900 mr-4">View</Link>
                        <Link href={`/operations-dashboard/properties/add?id=${property.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeView === 'occupancy' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 bg-green-50 border-b border-green-100">
              <h2 className="text-lg font-semibold text-green-800">Occupancy Analysis View</h2>
              <p className="text-sm text-green-600">Track occupancy rates across your portfolio</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.sort((a, b) => b.occupancy - a.occupancy).map((property) => (
                    <tr key={property.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{property.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {property.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              property.occupancy >= 90 ? 'bg-green-600' :
                              property.occupancy >= 80 ? 'bg-green-400' :
                              property.occupancy >= 70 ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`}
                            style={{ width: `${property.occupancy}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 mt-1 block">{property.occupancy}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          property.occupancy >= 90 ? 'bg-green-100 text-green-800' :
                          property.occupancy >= 80 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {property.occupancy >= 90 ? 'Excellent' :
                          property.occupancy >= 80 ? 'Good' :
                          property.occupancy >= 70 ? 'Average' :
                          'Needs Attention'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link href={`/operations-dashboard/properties/property-details?id=${property.id}`} className="text-blue-600 hover:text-blue-900 mr-4">View</Link>
                        <Link href={`/operations-dashboard/properties/add?id=${property.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeView === 'maintenance' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 bg-purple-50 border-b border-purple-100">
              <h2 className="text-lg font-semibold text-purple-800">Maintenance Tracker</h2>
              <p className="text-sm text-purple-600">Track maintenance costs and energy efficiency</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Maintenance</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Energy Rating</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.sort((a, b) => a.maintenanceCost - b.maintenanceCost).map((property) => (
                    <tr key={property.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{property.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {property.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {formatCurrency(property.maintenanceCost)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          property.energyEfficiency === 'A+' ? 'bg-green-100 text-green-800' :
                          property.energyEfficiency === 'A' ? 'bg-green-100 text-green-800' :
                          property.energyEfficiency === 'B+' ? 'bg-blue-100 text-blue-800' :
                          property.energyEfficiency === 'B' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.energyEfficiency}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link href={`/operations-dashboard/properties/property-details?id=${property.id}`} className="text-blue-600 hover:text-blue-900 mr-4">View</Link>
                        <Link href={`/operations-dashboard/properties/add?id=${property.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeView === 'market' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 bg-amber-50 border-b border-amber-100">
              <h2 className="text-lg font-semibold text-amber-800">Market Comparison</h2>
              <p className="text-sm text-amber-600">Compare your properties against market benchmarks</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Performance</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Differential</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.sort((a, b) => b.marketRentDiff - a.marketRentDiff).map((property) => (
                    <tr key={property.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{property.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {property.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          property.marketRentDiff > 5 ? 'bg-green-100 text-green-800' :
                          property.marketRentDiff > 0 ? 'bg-blue-100 text-blue-800' :
                          property.marketRentDiff > -3 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {property.marketRentDiff > 5 ? 'Outperforming' :
                           property.marketRentDiff > 0 ? 'Above Market' :
                           property.marketRentDiff > -3 ? 'At Market' :
                           'Below Market'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {property.marketRentDiff > 0 ? (
                            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1v-5a1 1 0 112 0v2.586l4.293-4.293a1 1 0 011.414 0L16 9.586V7a1 1 0 112 0v5a1 1 0 01-1 1h-5z" clipRule="evenodd" />
                            </svg>
                          )}
                          <span className={property.marketRentDiff > 0 ? 'text-green-600' : 'text-red-600'}>
                            {property.marketRentDiff > 0 ? '+' : ''}{property.marketRentDiff}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link href={`/operations-dashboard/properties/property-details?id=${property.id}`} className="text-blue-600 hover:text-blue-900 mr-4">View</Link>
                        <Link href={`/operations-dashboard/properties/add?id=${property.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 