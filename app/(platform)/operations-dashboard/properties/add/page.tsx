'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PropertyFormData {
  propertyName: string;
  propertyType: string;
  propertyStatus: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  yearBuilt: string;
  squareFootage: string;
  units: string;
  purchaseDate: string;
  purchasePrice: string;
  currentValue: string;
  additionalNotes: string;
  portfolio: string;
  tags: string[];
}

export default function AddPropertyPage() {
  const [formData, setFormData] = useState<PropertyFormData>({
    propertyName: '',
    propertyType: '',
    propertyStatus: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    yearBuilt: '',
    squareFootage: '',
    units: '',
    purchaseDate: '',
    purchasePrice: '',
    currentValue: '',
    additionalNotes: '',
    portfolio: '',
    tags: []
  })
  
  const [errors, setErrors] = useState<Partial<PropertyFormData>>({})
  const [currentTag, setCurrentTag] = useState('')
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user types
    if (errors[name as keyof PropertyFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }
  
  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag('')
    }
  }
  
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }
  
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }
  
  const validateForm = () => {
    const newErrors: Partial<PropertyFormData> = {}
    
    // Required fields validation
    if (!formData.propertyName.trim()) newErrors.propertyName = 'Property name is required'
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required'
    if (!formData.propertyStatus) newErrors.propertyStatus = 'Property status is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Save form data to localStorage or state management for later steps
      localStorage.setItem('propertyFormData', JSON.stringify(formData))
      
      // Proceed to next step
      window.location.href = '/operations-dashboard/properties/add/documents'
    }
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-[#0066cc]">Add New Property</h1>
            <Link 
              href="/operations-dashboard" 
              className="text-gray-500 hover:text-gray-700"
            >
              Back to Dashboard
            </Link>
          </div>
          
          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className="relative flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#0066cc] text-white flex items-center justify-center font-bold">1</div>
                <div className="mt-2 text-sm font-medium text-[#0066cc]">Property Details</div>
              </div>
              <div className="flex-grow h-0.5 bg-gray-200 mx-4"></div>
              <div className="relative flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">2</div>
                <div className="mt-2 text-sm font-medium text-gray-500">Upload Documents</div>
              </div>
              <div className="flex-grow h-0.5 bg-gray-200 mx-4"></div>
              <div className="relative flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">3</div>
                <div className="mt-2 text-sm font-medium text-gray-500">Processing</div>
              </div>
              <div className="flex-grow h-0.5 bg-gray-200 mx-4"></div>
              <div className="relative flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">4</div>
                <div className="mt-2 text-sm font-medium text-gray-500">Review</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <form onSubmit={handleSubmit}>
            {/* Property Status Section */}
            <div className="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Status*</h2>
              <p className="text-sm text-gray-600 mb-4">Is this a new property under evaluation or an existing property you already own?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.propertyStatus === 'evaluation' 
                      ? 'border-[#0066cc] bg-blue-50 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleChange({ target: { name: 'propertyStatus', value: 'evaluation' } } as any)}
                >
                  <div className="flex items-start mb-2">
                    <input
                      type="radio"
                      id="statusEvaluation"
                      name="propertyStatus"
                      value="evaluation"
                      checked={formData.propertyStatus === 'evaluation'}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <div>
                      <label htmlFor="statusEvaluation" className="font-medium text-gray-800 block mb-1">
                        New Property for Evaluation
                      </label>
                      <p className="text-sm text-gray-600">
                        This property is being considered for potential investment
                      </p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.propertyStatus === 'owned' 
                      ? 'border-[#0066cc] bg-blue-50 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleChange({ target: { name: 'propertyStatus', value: 'owned' } } as any)}
                >
                  <div className="flex items-start mb-2">
                    <input
                      type="radio"
                      id="statusOwned"
                      name="propertyStatus"
                      value="owned"
                      checked={formData.propertyStatus === 'owned'}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <div>
                      <label htmlFor="statusOwned" className="font-medium text-gray-800 block mb-1">
                        Existing Owned Property
                      </label>
                      <p className="text-sm text-gray-600">
                        This property is already part of your portfolio
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {errors.propertyStatus && <p className="mt-2 text-sm text-red-600">{errors.propertyStatus}</p>}
            </div>
            
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Name*
                  </label>
                  <input
                    type="text"
                    id="propertyName"
                    name="propertyName"
                    value={formData.propertyName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.propertyName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]`}
                    placeholder="e.g. Oakwood Apartments"
                  />
                  {errors.propertyName && <p className="mt-1 text-sm text-red-600">{errors.propertyName}</p>}
                </div>
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type*
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.propertyType ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]`}
                  >
                    <option value="">Select property type</option>
                    <option value="Multifamily">Multifamily</option>
                    <option value="Office">Office</option>
                    <option value="Retail">Retail</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Mixed-Use">Mixed-Use</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.propertyType && <p className="mt-1 text-sm text-red-600">{errors.propertyType}</p>}
                </div>

                {/* Portfolio/Folder Selection */}
                <div className="md:col-span-2">
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
                    Add to Portfolio/Folder
                  </label>
                  <select
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]"
                  >
                    <option value="">Select portfolio or folder</option>
                    <option value="Primary Portfolio">Primary Portfolio</option>
                    <option value="Fund I">Fund I</option>
                    <option value="Fund II">Fund II</option>
                    <option value="Evaluation">Evaluation</option>
                    <option value="Development">Development</option>
                    <option value="Acquisition Targets">Acquisition Targets</option>
                    <option value="Core Holdings">Core Holdings</option>
                    <option value="create">+ Create New Portfolio</option>
                  </select>
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (For grouping and filtering)
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="tags"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={handleTagKeyPress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]"
                      placeholder="Add tags (e.g., high-value, renovated, core)"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
                    >
                      Add
                    </button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag, index) => (
                        <div key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]`}
                    placeholder="e.g. 123 Main Street"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]`}
                    placeholder="e.g. San Francisco"
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]`}
                    placeholder="e.g. CA"
                  />
                  {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code*
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.zip ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]`}
                    placeholder="e.g. 94105"
                  />
                  {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip}</p>}
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-1">
                    Year Built
                  </label>
                  <input
                    type="text"
                    id="yearBuilt"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]"
                    placeholder="e.g. 2005"
                  />
                </div>
                <div>
                  <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700 mb-1">
                    Square Footage
                  </label>
                  <input
                    type="text"
                    id="squareFootage"
                    name="squareFootage"
                    value={formData.squareFootage}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]"
                    placeholder="e.g. 25000"
                  />
                </div>
                <div>
                  <label htmlFor="units" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Units
                  </label>
                  <input
                    type="text"
                    id="units"
                    name="units"
                    value={formData.units}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]"
                    placeholder="e.g. 50"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Acquisition Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    id="purchaseDate"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]"
                  />
                </div>
                <div>
                  <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Purchase Price
                  </label>
                  <input
                    type="text"
                    id="purchasePrice"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]"
                    placeholder="e.g. 5000000"
                  />
                </div>
                <div>
                  <label htmlFor="currentValue" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Value
                  </label>
                  <input
                    type="text"
                    id="currentValue"
                    name="currentValue"
                    value={formData.currentValue}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]"
                    placeholder="e.g. 6500000"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Notes</h2>
              <div>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]"
                  placeholder="Enter any additional information about the property..."
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-10">
              <Link
                href="/operations-dashboard"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-[#0066cc] text-white rounded-md hover:bg-[#0055aa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066cc]"
              >
                Next: Upload Documents
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 