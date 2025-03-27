'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Import data from shared data file
import { propertiesData as importedPropertiesData, tenantsData as importedTenantsData } from '../data'
import { leaseDetailsData } from '../data/leaseDetails'

// Enhanced tenant data with more details
const tenantsData = {
  'Skyline Tower': [
    {
      name: 'Acme Tech Solutions',
      industry: 'Technology',
      contact: 'John Smith',
      leaseEnd: '2026-05-15',
      paymentStatus: 'current'
    },
    {
      name: 'Global Financial Partners',
      industry: 'Financial Services',
      contact: 'Emily Jones',
      leaseEnd: '2025-11-30',
      paymentStatus: 'current'
    }
  ],
  'Riverside Apartments': [
    {
      name: 'Blue Ocean Consulting',
      industry: 'Consulting',
      contact: 'Sarah Chen',
      leaseEnd: '2025-08-30',
      paymentStatus: 'current'
    },
    {
      name: 'Digital Dynamics',
      industry: 'Technology',
      contact: 'Mark Wilson',
      leaseEnd: '2024-12-15',
      paymentStatus: 'pending'
    }
  ],
  'Lakefront Mall': [
    {
      name: 'Evergreen Marketing Group',
      industry: 'Marketing',
      contact: 'Michael Wilson',
      leaseEnd: '2024-08-01',
      paymentStatus: 'late'
    },
    {
      name: 'Urban Fitness Co',
      industry: 'Health & Fitness',
      contact: 'Lisa Brown',
      leaseEnd: '2025-03-15',
      paymentStatus: 'current'
    }
  ],
  'Tech Park Plaza': [
    {
      name: 'Future Systems Inc',
      industry: 'Technology',
      contact: 'David Park',
      leaseEnd: '2026-02-28',
      paymentStatus: 'current'
    },
    {
      name: 'Cloud Solutions Ltd',
      industry: 'Technology',
      contact: 'Rachel Green',
      leaseEnd: '2025-09-30',
      paymentStatus: 'current'
    }
  ],
  'Sunset Heights': [
    {
      name: 'Creative Studios',
      industry: 'Media',
      contact: 'James Lee',
      leaseEnd: '2024-11-30',
      paymentStatus: 'current'
    },
    {
      name: 'Mountain View Medical',
      industry: 'Healthcare',
      contact: 'Dr. Emma White',
      leaseEnd: '2025-06-15',
      paymentStatus: 'current'
    }
  ],
  'Mountain View Industrial': [
    {
      name: 'Global Logistics Co',
      industry: 'Logistics',
      contact: 'Robert Black',
      leaseEnd: '2024-10-31',
      paymentStatus: 'pending'
    },
    {
      name: 'Advanced Manufacturing Ltd',
      industry: 'Manufacturing',
      contact: 'Thomas Gray',
      leaseEnd: '2025-04-30',
      paymentStatus: 'current'
    }
  ]
}

// Sample property data with more comprehensive information
const localPropertiesData = [
  {
    id: 'prop-001',
    name: 'Skyline Tower',
    address: '123 Main Street, New York, NY 10001',
    type: 'Commercial',
    category: 'Office',
    sqft: 45000,
    units: 5,
    occupancy: 100,
    value: 12500000,
    roi: 8.2,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    status: 'active',
    fund: 'AriesView Fund II',
    description: 'A modern office tower in the heart of Manhattan.',
    tenants: tenantsData['Skyline Tower'] || []
  },
  {
    id: 'prop-002',
    name: 'Riverside Apartments',
    address: '456 River Dr, Chicago, IL 60601',
    type: 'Residential',
    category: 'Multi-family',
    sqft: 68000,
    units: 5,
    occupancy: 80,
    value: 22800000,
    roi: 7.5,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    status: 'active',
    fund: 'AriesView Fund I',
    description: 'Luxury apartments with river views.',
    tenants: tenantsData['Riverside Apartments'] || []
  },
  {
    id: 'prop-003',
    name: 'Lakefront Mall',
    address: '789 Lake View, Miami, FL 33101',
    type: 'Commercial',
    category: 'Retail',
    sqft: 125000,
    units: 5,
    occupancy: 60,
    value: 35000000,
    roi: 6.8,
    image: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    status: 'pending',
    fund: 'AriesView Fund II',
    description: 'Premium shopping center with lakefront access.',
    tenants: tenantsData['Lakefront Mall'] || []
  },
  {
    id: 'prop-004',
    name: 'Tech Park Plaza',
    address: '101 Innovation Dr, San Francisco, CA 94103',
    type: 'Commercial',
    category: 'Office',
    sqft: 85000,
    units: 5,
    occupancy: 100,
    value: 48000000,
    roi: 9.2,
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    status: 'active',
    fund: 'AriesView Fund II',
    description: 'Modern office space in the tech district.',
    tenants: tenantsData['Tech Park Plaza'] || []
  },
  {
    id: 'prop-005',
    name: 'Sunset Heights',
    address: '555 Western Ave, Seattle, WA 98101',
    type: 'Residential',
    category: 'Apartments',
    sqft: 52000,
    units: 5,
    occupancy: 80,
    value: 18700000,
    roi: 8.0,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    status: 'active',
    fund: 'AriesView Fund I',
    description: 'Upscale apartment complex with mountain views.',
    tenants: tenantsData['Sunset Heights'] || []
  },
  {
    id: 'prop-006',
    name: 'Mountain View Industrial',
    address: '888 Factory Ln, Denver, CO 80202',
    type: 'Industrial',
    category: 'Warehouse',
    sqft: 210000,
    units: 5,
    occupancy: 60,
    value: 28400000,
    roi: 10.5,
    image: 'https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    status: 'maintenance',
    fund: 'AriesView Fund II',
    description: 'Large industrial warehouse with modern amenities.',
    tenants: tenantsData['Mountain View Industrial'] || []
  },
  {
    id: 'prop-007',
    name: 'Downtown Lofts',
    address: '333 Urban Ave, Boston, MA 02108',
    type: 'Residential',
    category: 'Apartments',
    sqft: 75000,
    units: 5,
    occupancy: 0,
    value: 32000000,
    roi: 0,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    status: 'pending',
    fund: 'Under Evaluation',
    description: 'Historic building converted to modern lofts.',
    tenants: []
  },
  {
    id: 'prop-008',
    name: 'Tech Hub Complex',
    address: '777 Innovation Blvd, Austin, TX 78701',
    type: 'Commercial',
    category: 'Office',
    sqft: 95000,
    units: 5,
    occupancy: 0,
    value: 42000000,
    roi: 0,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    status: 'pending',
    fund: 'Under Evaluation',
    description: 'State-of-the-art office complex in tech hub.',
    tenants: []
  }
]

// Create a wrapper component that uses useSearchParams
function PropertyDetailsContent() {
  const searchParams = useSearchParams()
  const propertyId = searchParams.get('id') || 'prop-001'
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  
  // Get unique values for filters
  const propertyTypes = Array.from(new Set(localPropertiesData.map(p => p.type)))
  const propertyCategories = Array.from(new Set(localPropertiesData.map(p => p.category)))
  const propertyStatuses = Array.from(new Set(localPropertiesData.map(p => p.status)))
  
  // Filter properties based on search term and filters
  const filteredProperties = localPropertiesData.filter(property => {
    const matchesSearch = searchTerm === '' || 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.tenants.some(tenant => tenant.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = selectedType === '' || property.type === selectedType
    const matchesCategory = selectedCategory === '' || property.category === selectedCategory
    const matchesStatus = selectedStatus === '' || property.status === selectedStatus
    
    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })
  
  // Find the property based on the ID
  const property = localPropertiesData.find(p => p.id === propertyId) || localPropertiesData[0]
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }
  
  return (
    <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/operations-dashboard/properties/property-overview" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Properties
          </Link>
        </div>
        
        <header className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{property.name}</h1>
              <p className="text-gray-600 mt-1">{property.address}</p>
              <div className="flex items-center mt-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  property.status === 'active' ? 'bg-green-100 text-green-800' :
                  property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </span>
                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {property.type}
                </span>
                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {property.category}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link
                href={`/operations-dashboard/properties/edit-property?id=${propertyId}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Edit Property
              </Link>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Generate Report
              </button>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Property details column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Property Overview</h2>
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="object-cover rounded-lg w-full"
                  style={{ height: '300px' }}
                />
              </div>
              <p className="text-gray-700 mb-6">{property.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Square Footage</p>
                  <p className="text-lg font-semibold">{property.sqft.toLocaleString()} sq ft</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Units</p>
                  <p className="text-lg font-semibold">{property.units}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Occupancy Rate</p>
                  <p className="text-lg font-semibold">{property.occupancy}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">ROI</p>
                  <p className="text-lg font-semibold">{property.roi}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Tenants</h2>
              {property.tenants && property.tenants.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {property.tenants.map((tenant, idx) => (
                        <tr 
                          key={idx} 
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{tenant.industry}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{tenant.contact}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${tenant.paymentStatus === 'current' ? 'bg-green-100 text-green-800' :
                                tenant.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'}`}>
                              {tenant.paymentStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No Tenants</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {property.status === 'pending' 
                      ? 'This property is pending evaluation.'
                      : 'This property currently has no tenants.'}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Financial details sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Property Value</p>
                  <p className="text-2xl font-bold">{formatCurrency(property.value)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <p className="text-sm text-gray-500">ROI</p>
                    <p className="text-xl font-semibold">{property.roi}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price per Sq Ft</p>
                    <p className="text-xl font-semibold">{formatCurrency(property.value / property.sqft)}/sq ft</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <p className="text-sm text-gray-500">Occupancy</p>
                    <p className="text-xl font-semibold">{property.occupancy}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Occupied Units</p>
                    <p className="text-xl font-semibold">{Math.round(property.units * property.occupancy / 100)} of {property.units}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Documents</h2>
                <Link
                  href={`/operations-dashboard/properties/${propertyId}/document-hub`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View All Documents →
                </Link>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Access all property documents including leases, financial reports, and legal documents in the Document Management Hub.
              </p>
              <Link
                href={`/operations-dashboard/properties/${propertyId}/document-hub`}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Go to Document Hub
              </Link>
            </div>
          </div>
        </div>

        {/* Add Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Link
            href={`/operations-dashboard/properties/${propertyId}/document-hub`}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Document Management Hub</h2>
                <p className="text-gray-500 mt-1">Access and analyze all property documents including leases, contracts, and reports</p>
              </div>
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>

          <Link
            href={`/operations-dashboard/properties/${propertyId}/financial-hub`}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Financial Analysis Hub</h2>
                <p className="text-gray-500 mt-1">Comprehensive financial insights and calculations</p>
              </div>
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Main component with Suspense
export default function PropertyDetails() {
  return (
    <Suspense fallback={<div className="p-4">Loading property details...</div>}>
      <PropertyDetailsContent />
    </Suspense>
  )
} 