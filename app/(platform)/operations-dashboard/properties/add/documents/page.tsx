'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  size: number;
  uploadDate: Date;
}

interface PropertyData {
  propertyName: string;
  propertyType: string;
  propertyStatus: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  portfolio: string;
  tags: string[];
  [key: string]: any;
}

export default function UploadDocumentsPage() {
  const router = useRouter()
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentTag, setCurrentTag] = useState('')
  const [isEditingCategorization, setIsEditingCategorization] = useState(false)
  
  useEffect(() => {
    // Get property data from previous step
    const storedData = localStorage.getItem('propertyFormData')
    if (!storedData) {
      // No data found, redirect back to first step
      router.push('/operations-dashboard/properties/add')
      return
    }
    
    setPropertyData(JSON.parse(storedData))
  }, [router])
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (!selectedCategory) {
      alert('Please select a document category before uploading')
      return
    }
    
    const files = Array.from(e.dataTransfer.files)
    
    if (files.length > 0) {
      handleFiles(files)
    }
  }
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedCategory) {
      alert('Please select a document category before uploading')
      e.target.value = ''
      return
    }
    
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
      e.target.value = ''
    }
  }
  
  const handleFiles = (files: File[]) => {
    const newDocuments = files.map(file => ({
      id: generateId(),
      name: file.name,
      type: file.type,
      category: selectedCategory,
      size: file.size,
      uploadDate: new Date()
    }))
    
    setDocuments(prev => [...prev, ...newDocuments])
  }
  
  const generateId = () => {
    return Math.random().toString(36).substring(2, 11)
  }
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }
  
  const handleRemoveDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (propertyData) {
      setPropertyData({
        ...propertyData,
        [name]: value
      })
    }
  }
  
  const addTag = () => {
    if (currentTag.trim() && propertyData && !propertyData.tags.includes(currentTag.trim())) {
      setPropertyData({
        ...propertyData,
        tags: [...propertyData.tags, currentTag.trim()]
      })
      setCurrentTag('')
    }
  }
  
  const removeTag = (tagToRemove: string) => {
    if (propertyData) {
      setPropertyData({
        ...propertyData,
        tags: propertyData.tags.filter(tag => tag !== tagToRemove)
      })
    }
  }
  
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }
  
  const saveCategorizationChanges = () => {
    if (propertyData) {
      localStorage.setItem('propertyFormData', JSON.stringify(propertyData))
      setIsEditingCategorization(false)
    }
  }
  
  const handleSubmit = () => {
    if (documents.length === 0) {
      alert('Please upload at least one document to proceed')
      return
    }
    
    // Save updated property data to localStorage
    if (propertyData) {
      localStorage.setItem('propertyFormData', JSON.stringify(propertyData))
    }
    
    // Save documents to localStorage for next steps
    localStorage.setItem('propertyDocuments', JSON.stringify(documents))
    
    // Navigate to processing page
    router.push('/operations-dashboard/properties/add/processing')
  }
  
  if (!propertyData) {
    return <div className="min-h-screen bg-gray-50 flex justify-center items-center">Loading...</div>
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-[#0066cc]">Upload Documents</h1>
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
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-500">Property Details</div>
              </div>
              <div className="flex-grow h-0.5 bg-green-500 mx-4"></div>
              <div className="relative flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#0066cc] text-white flex items-center justify-center font-bold">2</div>
                <div className="mt-2 text-sm font-medium text-[#0066cc]">Upload Documents</div>
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
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Property Summary</h2>
              <button
                type="button"
                onClick={() => setIsEditingCategorization(!isEditingCategorization)}
                className="text-[#0066cc] hover:text-[#0055aa] text-sm font-medium"
              >
                {isEditingCategorization ? 'Cancel' : 'Edit Categorization'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-md">
              <div>
                <p className="text-sm text-gray-500">Property Name</p>
                <p className="font-medium">{propertyData.propertyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Property Type</p>
                <p className="font-medium">{propertyData.propertyType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{propertyData.address}, {propertyData.city}, {propertyData.state} {propertyData.zip}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">
                  {propertyData.propertyStatus === 'evaluation' 
                    ? 'New Property for Evaluation' 
                    : 'Existing Owned Property'}
                </p>
              </div>
            </div>
            
            {/* Categorization Section */}
            <div className={`mt-4 p-4 ${isEditingCategorization ? 'bg-blue-50 rounded-md border border-blue-100' : 'bg-gray-50 rounded-md'}`}>
              <h3 className="font-medium text-gray-800 mb-3">Categorization</h3>
              
              {isEditingCategorization ? (
                <div className="space-y-4">
                  {/* Portfolio Selection */}
                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
                      Portfolio/Folder
                    </label>
                    <select
                      id="portfolio"
                      name="portfolio"
                      value={propertyData.portfolio}
                      onChange={handlePropertyChange}
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
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
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
                    {propertyData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {propertyData.tags.map((tag, index) => (
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
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={saveCategorizationChanges}
                      className="px-4 py-2 bg-[#0066cc] text-white rounded-md hover:bg-[#0055aa]"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Portfolio/Folder</p>
                    <p className="font-medium">
                      {propertyData.portfolio ? propertyData.portfolio : 'Not assigned'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tags</p>
                    {propertyData.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {propertyData.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 rounded-full px-2 py-0.5 text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="font-medium">No tags</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Property Documents</h2>
            
            <div className="mb-4">
              <label htmlFor="documentCategory" className="block text-sm font-medium text-gray-700 mb-1">
                Document Category*
              </label>
              <select
                id="documentCategory"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0066cc] focus:border-[#0066cc]"
              >
                <option value="">Select category</option>
                <option value="Lease Agreement">Lease Agreement</option>
                <option value="Financial Statement">Financial Statement</option>
                <option value="Property Inspection">Property Inspection</option>
                <option value="Environmental Report">Environmental Report</option>
                <option value="Title Document">Title Document</option>
                <option value="Insurance">Insurance</option>
                <option value="Tax Document">Tax Document</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 ${
                isDragging ? 'border-[#0066cc] bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-lg font-medium text-gray-700 mb-1">Drag and drop files here</p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <label className="px-4 py-2 bg-[#0066cc] text-white rounded-md hover:bg-[#0055aa] cursor-pointer">
                  Browse Files
                  <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    onChange={handleFileSelect} 
                  />
                </label>
                <p className="mt-2 text-xs text-gray-500">
                  Supported file types: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                </p>
              </div>
            </div>
          </div>
          
          {documents.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Uploaded Documents</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map(doc => (
                      <tr key={doc.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {doc.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatFileSize(doc.size)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            onClick={() => handleRemoveDocument(doc.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-10">
            <Link
              href="/operations-dashboard/properties/add"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Back
            </Link>
            <div>
              <button
                onClick={() => {
                  // Save as draft
                  localStorage.setItem('propertyDocuments', JSON.stringify(documents))
                  router.push('/operations-dashboard')
                }}
                className="px-4 py-2 mr-3 border border-[#0066cc] text-[#0066cc] rounded-md hover:bg-blue-50"
              >
                Save as Draft
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#0066cc] text-white rounded-md hover:bg-[#0055aa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066cc]"
              >
                Next: Process Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 