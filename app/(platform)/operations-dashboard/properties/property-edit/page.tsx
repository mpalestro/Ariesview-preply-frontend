'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

// Create a wrapper component that uses useSearchParams
function PropertyEditContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const propertyId = searchParams.get('id')
  const isNewProperty = !propertyId
  
  // Sample property data (normally this would be fetched from an API)
  const initialData = propertyId ? {
    id: propertyId,
    name: propertyId === 'prop-001' ? 'Skyline Tower' : 
          propertyId === 'prop-002' ? 'Riverside Apartments' : 
          propertyId === 'prop-003' ? 'Lakefront Mall' : 
          propertyId === 'prop-004' ? 'Tech Park Plaza' : 
          propertyId === 'prop-005' ? 'Sunset Heights' : 
          propertyId === 'prop-006' ? 'Mountain View Industrial' : 'New Property',
    address: propertyId === 'prop-001' ? '123 Main Street, New York, NY 10001' : 
             propertyId === 'prop-002' ? '456 River Dr, Chicago, IL 60601' : 
             propertyId === 'prop-003' ? '789 Lake View, Miami, FL 33101' : 
             propertyId === 'prop-004' ? '101 Innovation Dr, San Francisco, CA 94103' : 
             propertyId === 'prop-005' ? '555 Western Ave, Seattle, WA 98101' : 
             propertyId === 'prop-006' ? '888 Factory Ln, Denver, CO 80202' : '',
    type: propertyId === 'prop-001' ? 'Commercial' : 
          propertyId === 'prop-002' ? 'Residential' : 
          propertyId === 'prop-003' ? 'Commercial' : 
          propertyId === 'prop-004' ? 'Commercial' : 
          propertyId === 'prop-005' ? 'Residential' : 
          propertyId === 'prop-006' ? 'Industrial' : 'Commercial',
    category: propertyId === 'prop-001' ? 'Office' : 
             propertyId === 'prop-002' ? 'Multi-family' : 
             propertyId === 'prop-003' ? 'Retail' : 
             propertyId === 'prop-004' ? 'Office' : 
             propertyId === 'prop-005' ? 'Apartments' : 
             propertyId === 'prop-006' ? 'Warehouse' : 'Office',
    sqft: propertyId === 'prop-001' ? 45000 : 
          propertyId === 'prop-002' ? 68000 : 
          propertyId === 'prop-003' ? 125000 : 
          propertyId === 'prop-004' ? 85000 : 
          propertyId === 'prop-005' ? 52000 : 
          propertyId === 'prop-006' ? 210000 : 0,
    units: propertyId === 'prop-001' ? 32 : 
           propertyId === 'prop-002' ? 120 : 
           propertyId === 'prop-003' ? 65 : 
           propertyId === 'prop-004' ? 42 : 
           propertyId === 'prop-005' ? 78 : 
           propertyId === 'prop-006' ? 8 : 0,
    occupancy: propertyId === 'prop-001' ? 92 : 
               propertyId === 'prop-002' ? 88 : 
               propertyId === 'prop-003' ? 78 : 
               propertyId === 'prop-004' ? 95 : 
               propertyId === 'prop-005' ? 91 : 
               propertyId === 'prop-006' ? 100 : 0,
    value: propertyId === 'prop-001' ? 12500000 : 
           propertyId === 'prop-002' ? 22800000 : 
           propertyId === 'prop-003' ? 35000000 : 
           propertyId === 'prop-004' ? 48000000 : 
           propertyId === 'prop-005' ? 18700000 : 
           propertyId === 'prop-006' ? 28400000 : 0,
    roi: propertyId === 'prop-001' ? 8.2 : 
         propertyId === 'prop-002' ? 7.5 : 
         propertyId === 'prop-003' ? 6.8 : 
         propertyId === 'prop-004' ? 9.2 : 
         propertyId === 'prop-005' ? 8.0 : 
         propertyId === 'prop-006' ? 10.5 : 0,
    yearBuilt: propertyId === 'prop-001' ? 2008 : 
               propertyId === 'prop-002' ? 1998 : 
               propertyId === 'prop-003' ? 2002 : 
               propertyId === 'prop-004' ? 2015 : 
               propertyId === 'prop-005' ? 2012 : 
               propertyId === 'prop-006' ? 2010 : new Date().getFullYear(),
    status: propertyId === 'prop-001' ? 'active' : 
            propertyId === 'prop-002' ? 'active' : 
            propertyId === 'prop-003' ? 'pending' : 
            propertyId === 'prop-004' ? 'active' : 
            propertyId === 'prop-005' ? 'active' : 
            propertyId === 'prop-006' ? 'maintenance' : 'active',
    description: propertyId === 'prop-001' ? 'Class A office building in Manhattan.' : 
                 propertyId === 'prop-002' ? 'Luxury residential complex in Chicago.' : 
                 propertyId === 'prop-003' ? 'Premier shopping mall in Miami.' : 
                 propertyId === 'prop-004' ? 'Modern tech office campus in San Francisco.' : 
                 propertyId === 'prop-005' ? 'Apartment community in Seattle.' : 
                 propertyId === 'prop-006' ? 'Industrial warehouse in Denver.' : '',
  } : {
    id: '',
    name: '',
    address: '',
    type: 'Commercial',
    category: 'Office',
    sqft: 0,
    units: 0,
    occupancy: 0,
    value: 0,
    roi: 0,
    yearBuilt: new Date().getFullYear(),
    status: 'active',
    description: '',
  }
  
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // For numeric fields, convert to number
    if (['sqft', 'units', 'occupancy', 'value', 'roi', 'yearBuilt'].includes(name)) {
      setFormData({
        ...formData,
        [name]: name === 'roi' ? parseFloat(value) || 0 : parseInt(value) || 0
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Property name is required'
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Property address is required'
    }
    
    if (formData.sqft <= 0) {
      newErrors.sqft = 'Square footage must be greater than 0'
    }
    
    if (formData.units <= 0) {
      newErrors.units = 'Number of units must be greater than 0'
    }
    
    if (formData.occupancy < 0 || formData.occupancy > 100) {
      newErrors.occupancy = 'Occupancy must be between 0 and 100'
    }
    
    if (formData.value <= 0) {
      newErrors.value = 'Property value must be greater than 0'
    }
    
    return newErrors
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      // Normally we would submit the data to an API here
      console.log('Form submitted:', formData)
      
      // Redirect back to property overview
      router.push('/operations-dashboard/properties/property-overview')
    }
  }
  
  return (
    <div className="bg-gray-50 min-h-screen w-full p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/operations-dashboard/properties/property-overview" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Properties
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isNewProperty ? 'Add New Property' : `Edit ${formData.name}`}
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Commercial">Commercial</option>
                  <option value="Residential">Residential</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Mixed">Mixed Use</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Office">Office</option>
                  <option value="Retail">Retail</option>
                  <option value="Multi-family">Multi-family</option>
                  <option value="Apartments">Apartments</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="sqft" className="block text-sm font-medium text-gray-700 mb-1">
                  Square Footage*
                </label>
                <input
                  type="number"
                  id="sqft"
                  name="sqft"
                  value={formData.sqft}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.sqft ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.sqft && <p className="mt-1 text-sm text-red-600">{errors.sqft}</p>}
              </div>
              
              <div>
                <label htmlFor="units" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Units*
                </label>
                <input
                  type="number"
                  id="units"
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.units ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.units && <p className="mt-1 text-sm text-red-600">{errors.units}</p>}
              </div>
              
              <div>
                <label htmlFor="occupancy" className="block text-sm font-medium text-gray-700 mb-1">
                  Occupancy Rate (%)*
                </label>
                <input
                  type="number"
                  id="occupancy"
                  name="occupancy"
                  value={formData.occupancy}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className={`w-full rounded-md border ${errors.occupancy ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.occupancy && <p className="mt-1 text-sm text-red-600">{errors.occupancy}</p>}
              </div>
              
              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                  Property Value ($)*
                </label>
                <input
                  type="number"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.value ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.value && <p className="mt-1 text-sm text-red-600">{errors.value}</p>}
              </div>
              
              <div>
                <label htmlFor="roi" className="block text-sm font-medium text-gray-700 mb-1">
                  ROI (%)
                </label>
                <input
                  type="number"
                  id="roi"
                  name="roi"
                  value={formData.roi}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-1">
                  Year Built
                </label>
                <input
                  type="number"
                  id="yearBuilt"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Link
                href="/operations-dashboard/properties/property-overview"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isNewProperty ? 'Create Property' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Main component with Suspense
export default function PropertyEdit() {
  return (
    <Suspense fallback={<div className="p-4">Loading property editor...</div>}>
      <PropertyEditContent />
    </Suspense>
  )
} 