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
  purchasePrice?: number;
  currentValue?: number;
  occupancyRate?: number;
  annualIncome?: number;
  annualExpenses?: number;
  [key: string]: any;
}

export default function ReviewPage() {
  const router = useRouter()
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [extractedData, setExtractedData] = useState<any>({
    financialData: null,
    leaseData: null,
    riskFactors: null,
    recommendedActions: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionComplete, setSubmissionComplete] = useState(false)
  
  useEffect(() => {
    // Get property data from previous steps
    const storedPropertyData = localStorage.getItem('propertyFormData')
    const storedDocuments = localStorage.getItem('propertyDocuments')
    
    if (!storedPropertyData || !storedDocuments) {
      // No data found, redirect back to first step
      router.push('/operations-dashboard/properties/add')
      return
    }
    
    setPropertyData(JSON.parse(storedPropertyData))
    setDocuments(JSON.parse(storedDocuments))
    
    // Simulate extracted data based on documents
    generateExtractedData(JSON.parse(storedDocuments))
  }, [router])
  
  const generateExtractedData = (docs: Document[]) => {
    // Simulate different extracted data based on document categories
    const hasFinancials = docs.some(doc => doc.category === 'Financial Statement')
    const hasLeases = docs.some(doc => doc.category === 'Lease Agreement')
    const hasInspection = docs.some(doc => doc.category === 'Property Inspection')
    
    // Financial data extraction simulation
    const financialData = hasFinancials ? {
      netOperatingIncome: '$275,000',
      capRate: '5.8%',
      cashOnCashReturn: '7.2%',
      debtCoverageRatio: '1.65',
      vacancyRate: '3.2%'
    } : null
    
    // Lease data extraction simulation
    const leaseData = hasLeases ? {
      majorTenants: ['Acme Corp (35% of GLA)', 'TechSolutions Inc (25% of GLA)'],
      weightedAvgLeaseLength: '6.2 years',
      rentEscalation: '3% annually',
      occupancy: '96.8%'
    } : null
    
    // Risk factors simulation
    const riskFactors = {
      high: hasInspection ? ['Roof requires replacement within 2-3 years'] : ['Insufficient property condition information'],
      medium: ['Market vacancy trending upward', 'Largest tenant lease expires in 36 months'],
      low: ['Property tax reassessment expected next year']
    }
    
    // Recommended actions
    const recommendedActions = [
      'Schedule detailed property inspection',
      'Review lease renewal options with largest tenant',
      'Consider setting aside reserves for roof replacement',
      'Evaluate nearby property sales to confirm current valuation'
    ]
    
    setExtractedData({
      financialData,
      leaseData,
      riskFactors,
      recommendedActions
    })
  }
  
  const handleSubmit = () => {
    setIsSubmitting(true)
    
    // Simulate API submission
    setTimeout(() => {
      // Create a new property object with combined data
      const newProperty = {
        id: Math.random().toString(36).substring(2, 11),
        ...propertyData,
        documents: documents,
        extractedData: extractedData,
        dateAdded: new Date().toISOString()
      }
      
      // Get existing properties from localStorage
      const storedProperties = localStorage.getItem('properties')
      const existingProperties = storedProperties ? JSON.parse(storedProperties) : []
      
      // Add new property to the array
      existingProperties.push(newProperty)
      
      // Save updated properties back to localStorage
      localStorage.setItem('properties', JSON.stringify(existingProperties))
      
      // Clear temporary form data
      localStorage.removeItem('propertyFormData')
      localStorage.removeItem('propertyDocuments')
      
      setSubmissionComplete(true)
      
      // After submission, redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/operations-dashboard')
      }, 2000)
    }, 3000)
  }
  
  const formatCurrency = (value?: number) => {
    if (value === undefined) return 'N/A'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }
  
  if (!propertyData) {
    return <div className="min-h-screen bg-gray-50 flex justify-center items-center">Loading...</div>
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-[#0066cc]">Review Property Information</h1>
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
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-500">Upload Documents</div>
              </div>
              <div className="flex-grow h-0.5 bg-green-500 mx-4"></div>
              <div className="relative flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-500">Processing</div>
              </div>
              <div className="flex-grow h-0.5 bg-green-500 mx-4"></div>
              <div className="relative flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#0066cc] text-white flex items-center justify-center font-bold">4</div>
                <div className="mt-2 text-sm font-medium text-[#0066cc]">Review</div>
              </div>
            </div>
          </div>
        </div>
        
        {submissionComplete ? (
          <div className="bg-white shadow-md rounded-lg p-8 mb-6 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-800">Property Added Successfully!</h2>
            <p className="mt-2 text-gray-600">
              Your property has been added to your portfolio. Redirecting to dashboard...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Property Basic Info */}
              <div className="md:col-span-1 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Property Information</h2>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Property Name</p>
                    <p className="font-medium">{propertyData.propertyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium">{propertyData.propertyType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">
                      {propertyData.propertyStatus === 'evaluation' 
                        ? 'New Property for Evaluation' 
                        : 'Existing Owned Property'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{propertyData.address}, {propertyData.city}, {propertyData.state} {propertyData.zip}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Portfolio/Folder</p>
                    <p className="font-medium">
                      {propertyData.portfolio ? propertyData.portfolio : 'Not assigned'}
                    </p>
                  </div>
                  {propertyData.tags.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500">Tags</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {propertyData.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 rounded-full px-2 py-0.5 text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <hr className="my-4" />
                
                <h3 className="text-md font-semibold text-gray-800 mb-3">Financial Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Purchase Price</p>
                    <p className="font-medium">{formatCurrency(propertyData.purchasePrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Value</p>
                    <p className="font-medium">{formatCurrency(propertyData.currentValue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Occupancy Rate</p>
                    <p className="font-medium">{propertyData.occupancyRate ? `${propertyData.occupancyRate}%` : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Income</p>
                    <p className="font-medium">{formatCurrency(propertyData.annualIncome)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Expenses</p>
                    <p className="font-medium">{formatCurrency(propertyData.annualExpenses)}</p>
                  </div>
                </div>
              </div>
              
              {/* Extracted Information */}
              <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Document Analysis Results</h2>
                
                {/* Financial Data */}
                {extractedData.financialData ? (
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-800 mb-3">Financial Performance</h3>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                      <div>
                        <p className="text-sm text-gray-500">Net Operating Income</p>
                        <p className="font-medium">{extractedData.financialData.netOperatingIncome}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cap Rate</p>
                        <p className="font-medium">{extractedData.financialData.capRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cash on Cash Return</p>
                        <p className="font-medium">{extractedData.financialData.cashOnCashReturn}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Debt Coverage Ratio</p>
                        <p className="font-medium">{extractedData.financialData.debtCoverageRatio}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-800 mb-3">Financial Performance</h3>
                    <p className="text-gray-600 italic">No financial data extracted. Upload financial statements for detailed analysis.</p>
                  </div>
                )}
                
                {/* Lease Data */}
                {extractedData.leaseData ? (
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-800 mb-3">Lease Information</h3>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Major Tenants</p>
                        <ul className="list-disc pl-5">
                          {extractedData.leaseData.majorTenants.map((tenant: string, index: number) => (
                            <li key={index} className="font-medium">{tenant}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Weighted Avg Lease Length</p>
                        <p className="font-medium">{extractedData.leaseData.weightedAvgLeaseLength}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rent Escalation</p>
                        <p className="font-medium">{extractedData.leaseData.rentEscalation}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-800 mb-3">Lease Information</h3>
                    <p className="text-gray-600 italic">No lease data extracted. Upload lease documents for detailed analysis.</p>
                  </div>
                )}
                
                {/* Risk Factors */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Risk Factors</h3>
                  <div className="space-y-3">
                    {extractedData.riskFactors.high.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-red-600">High Risk</p>
                        <ul className="list-disc pl-5">
                          {extractedData.riskFactors.high.map((risk: string, index: number) => (
                            <li key={index} className="text-gray-700 text-sm">{risk}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {extractedData.riskFactors.medium.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-orange-600">Medium Risk</p>
                        <ul className="list-disc pl-5">
                          {extractedData.riskFactors.medium.map((risk: string, index: number) => (
                            <li key={index} className="text-gray-700 text-sm">{risk}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {extractedData.riskFactors.low.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-yellow-600">Low Risk</p>
                        <ul className="list-disc pl-5">
                          {extractedData.riskFactors.low.map((risk: string, index: number) => (
                            <li key={index} className="text-gray-700 text-sm">{risk}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Recommended Actions */}
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Recommended Actions</h3>
                  <ul className="list-disc pl-5">
                    {extractedData.recommendedActions.map((action: string, index: number) => (
                      <li key={index} className="text-gray-700 text-sm mb-1">{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Documents ({documents.length})</h2>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Upload Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map(doc => (
                      <tr key={doc.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                          {doc.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(doc.size / 1024).toFixed(0)} KB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Link 
                href="/operations-dashboard/properties/add/processing" 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back to Processing
              </Link>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-md text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0066cc] hover:bg-[#0055aa]'}`}
              >
                {isSubmitting ? 'Adding Property...' : 'Add Property to Portfolio'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 