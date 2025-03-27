'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Enhanced tenant data with more details
const tenantsData = {
  'Acme Tech Solutions': {
    name: 'Acme Tech Solutions',
    industry: 'Technology',
    contactPerson: 'John Smith',
    contactEmail: 'john.smith@acmetech.com',
    contactPhone: '(212) 555-1234',
    leaseStart: '2021-05-15',
    leaseEnd: '2026-05-15',
    leaseTermMonths: 60,
    units: 8,
    sqft: 12000,
    monthlyRent: 45000,
    securityDeposit: 90000,
    paymentHistory: [
      { date: '2023-10-01', amount: 45000, status: 'paid' },
      { date: '2023-09-01', amount: 45000, status: 'paid' },
      { date: '2023-08-01', amount: 45000, status: 'late' }
    ],
    leaseDocument: '/leases/acme-tech-lease-2021.pdf',
    notes: 'Premium tenant with excellent payment history. Planning to expand in 2024.'
  },
  'Global Financial Partners': {
    name: 'Global Financial Partners',
    industry: 'Financial Services',
    contactPerson: 'Emily Jones',
    contactEmail: 'emily.jones@gfpartners.com',
    contactPhone: '(212) 555-5678',
    leaseStart: '2020-11-30',
    leaseEnd: '2025-11-30',
    leaseTermMonths: 60,
    units: 10,
    sqft: 15000,
    monthlyRent: 60000,
    securityDeposit: 120000,
    paymentHistory: [
      { date: '2023-10-01', amount: 60000, status: 'paid' },
      { date: '2023-09-01', amount: 60000, status: 'paid' },
      { date: '2023-08-01', amount: 60000, status: 'paid' }
    ],
    leaseDocument: '/leases/global-financial-lease-2020.pdf',
    notes: 'Long-term tenant with stable financials.'
  },
  'Evergreen Marketing Group': {
    name: 'Evergreen Marketing Group',
    industry: 'Marketing',
    contactPerson: 'Michael Wilson',
    contactEmail: 'michael.wilson@evergreenmarketing.com',
    contactPhone: '(212) 555-9101',
    leaseStart: '2019-08-01',
    leaseEnd: '2024-08-01',
    leaseTermMonths: 60,
    units: 6,
    sqft: 9000,
    monthlyRent: 32000,
    securityDeposit: 64000,
    paymentHistory: [
      { date: '2023-10-01', amount: 32000, status: 'paid' },
      { date: '2023-09-01', amount: 32000, status: 'late' },
      { date: '2023-08-01', amount: 32000, status: 'paid' }
    ],
    leaseDocument: '/leases/evergreen-marketing-lease-2019.pdf',
    notes: 'Considering downsizing at next renewal.'
  }
}

// Define types for our data structures
interface Tenant {
  name: string;
  industry: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  leaseStart: string;
  leaseEnd: string;
  leaseTermMonths: number;
  units: number;
  sqft: number;
  monthlyRent: number;
  securityDeposit: number;
  paymentHistory: {
    date: string;
    amount: number;
    status: string;
  }[];
  leaseDocument: string;
  notes: string;
}

interface TenantsData {
  [key: string]: Tenant;
}

interface CategoryModifiers {
  [key: string]: number;
}

interface LeaseTypeByProperty {
  [key: string]: string;
}

interface PropertyNames {
  [key: string]: string;
}

interface Payment {
  date: string;
  amount: number;
  status: string;
}

// Create a wrapper component that uses useSearchParams
function TenantDetailsContent() {
  const searchParams = useSearchParams()
  const tenantId = searchParams.get('id') || 'Acme Tech Solutions'
  
  // State for lease analysis
  const [leaseAnalysisComplete, setLeaseAnalysisComplete] = useState(false)
  const [leaseScore, setLeaseScore] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null)
  const [propertyType, setPropertyType] = useState('')
  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  
  // State for document upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{
    id: string,
    name: string, 
    date: string, 
    year: number,
    type: string, 
    url: string,
    analyzed: boolean,
    analysisData?: {
      overall: number,
      compliance: number,
      favorability: number,
      leaseType: string,
      risk: number,
      clarity: number,
      insights: string[]
    }
  }>>([
    {
      id: 'doc-1',
      name: 'Original Lease Agreement.pdf',
      date: '2021-05-15',
      year: 2021,
      type: 'Primary Lease',
      url: '#',
      analyzed: true,
      analysisData: {
        overall: 84,
        compliance: 92,
        favorability: 65, // < 50 tenant friendly, > 50 landlord friendly
        leaseType: 'Triple Net (NNN)',
        risk: 78,
        clarity: 88,
        insights: [
          "Triple Net lease places most expenses on tenant",
          "Rent escalation clauses are well-structured for market conditions",
          "Tenant improvement allowances exceed market average",
          "Default remedies provide adequate landlord protection",
          "Early termination penalties are favorable for landlord"
        ]
      }
    },
    {
      id: 'doc-2',
      name: 'Lease Amendment 1.pdf',
      date: '2022-01-10',
      year: 2022,
      type: 'Amendment',
      url: '#',
      analyzed: true,
      analysisData: {
        overall: 79,
        compliance: 90,
        favorability: 55,
        leaseType: 'Triple Net (NNN)',
        risk: 74,
        clarity: 82,
        insights: [
          "Amendment maintains Triple Net structure",
          "Space expansion terms are favorable to tenant",
          "Increased security deposit provides additional landlord protection",
          "Renewal options include above-market rent increases",
          "Added build-out allowance improves tenant value"
        ]
      }
    }
  ])
  
  // File input reference
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Get tenant data
  const tenant = (tenantsData as TenantsData)[tenantId] || null
  
  // Set initial active document
  useEffect(() => {
    if (uploadedDocuments.length > 0 && !activeDocumentId) {
      setActiveDocumentId(uploadedDocuments[0].id);
    }
  }, [uploadedDocuments, activeDocumentId]);
  
  // Get active document 
  const activeDocument = uploadedDocuments.find(doc => doc.id === activeDocumentId);
  
  // Property type options with categories and subcategories
  const propertyTypes = [
    {
      id: 'residential',
      name: 'Residential Real Estate',
      subcategories: [
        { id: 'single-family', name: 'Single-family homes' },
        { id: 'condos', name: 'Condominiums (Condos)' },
        { id: 'townhouses', name: 'Townhouses' },
        { id: 'multi-family-small', name: 'Multi-family properties (duplexes, triplexes, fourplexes)' },
        { id: 'apartments', name: 'Apartments' },
        { id: 'vacation-homes', name: 'Vacation homes' }
      ]
    },
    {
      id: 'commercial',
      name: 'Commercial Real Estate (CRE)',
      subcategories: [
        { id: 'office-a', name: 'Office buildings - Class A' },
        { id: 'office-b', name: 'Office buildings - Class B' },
        { id: 'office-c', name: 'Office buildings - Class C' },
        { id: 'retail-spaces', name: 'Retail spaces' },
        { id: 'hotels', name: 'Hotels and resorts' },
        { id: 'restaurants', name: 'Restaurants' },
        { id: 'mixed-use', name: 'Mixed-use buildings' }
      ]
    },
    {
      id: 'industrial',
      name: 'Industrial Real Estate',
      subcategories: [
        { id: 'warehouses', name: 'Warehouses' },
        { id: 'manufacturing', name: 'Manufacturing plants' },
        { id: 'distribution', name: 'Distribution centers' },
        { id: 'data-centers', name: 'Data centers' },
        { id: 'research', name: 'Research and development (R&D) facilities' }
      ]
    },
    {
      id: 'multi-family',
      name: 'Multi-Family Real Estate',
      subcategories: [
        { id: 'apartment-buildings', name: 'Apartment buildings' },
        { id: 'high-rise', name: 'High-rise residential towers' },
        { id: 'student-housing', name: 'Student housing' },
        { id: 'senior-living', name: 'Senior living communities' }
      ]
    },
    {
      id: 'retail',
      name: 'Retail Real Estate',
      subcategories: [
        { id: 'shopping-centers', name: 'Shopping centers' },
        { id: 'standalone-retail', name: 'Standalone retail stores' },
        { id: 'big-box', name: 'Big-box stores' },
        { id: 'outlet-malls', name: 'Outlet malls' },
        { id: 'strip-malls', name: 'Strip malls' }
      ]
    },
    {
      id: 'mixed-use-properties',
      name: 'Mixed-Use Real Estate',
      subcategories: [
        { id: 'mixed-properties', name: 'Mixed residential, commercial, and industrial spaces' }
      ]
    },
    {
      id: 'land',
      name: 'Land',
      subcategories: [
        { id: 'agricultural', name: 'Agricultural land' },
        { id: 'undeveloped', name: 'Undeveloped land' },
        { id: 'infill', name: 'Infill land' },
        { id: 'brownfield', name: 'Brownfield land' }
      ]
    },
    {
      id: 'special-purpose',
      name: 'Special Purpose Real Estate',
      subcategories: [
        { id: 'medical', name: 'Hospitals and medical facilities' },
        { id: 'education', name: 'Schools and universities' },
        { id: 'government', name: 'Government buildings' },
        { id: 'religious', name: 'Religious properties' },
        { id: 'sports', name: 'Stadiums and sports arenas' }
      ]
    }
  ]
  
  // Find the selected property type display name
  const getSelectedPropertyTypeName = () => {
    if (!propertyType) return 'Select Property Type';
    
    for (const category of propertyTypes) {
      for (const subcategory of category.subcategories) {
        if (subcategory.id === propertyType) {
          return `${category.name} - ${subcategory.name}`;
        }
      }
    }
    
    return 'Select Property Type';
  }
  
  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  }
  
  // Select a property type
  const selectPropertyType = (subcategoryId: string) => {
    setPropertyType(subcategoryId);
    setShowPropertyTypeDropdown(false);
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }
  
  // Analyze lease and generate a score
  const analyzeLease = (documentId: string) => {
    if (!propertyType) {
      alert('Please select a property type before analyzing.');
      return;
    }
    
    setIsAnalyzing(true)
    // Simulate AI analysis with a timeout
    setLeaseAnalysisComplete(false)
    setTimeout(() => {
      // Generate a score between 0 and 100, varying slightly based on property type
      const baseScore = Math.floor(Math.random() * 30) + 70 // 70-100 range
      
      // Find the category for the selected property type
      let categoryId = '';
      let subcategoryName = '';
      
      for (const category of propertyTypes) {
        const subcategory = category.subcategories.find(sub => sub.id === propertyType);
        if (subcategory) {
          categoryId = category.id;
          subcategoryName = subcategory.name;
          break;
        }
      }
      
      // Adjust scores slightly based on property type category
      const categoryModifiers: CategoryModifiers = {
        'residential': +2,
        'commercial': +4,
        'industrial': +3,
        'multi-family': +1,
        'retail': 0,
        'mixed-use-properties': -1,
        'land': -2,
        'special-purpose': -3
      }
      
      const typeModifier = categoryModifiers[categoryId as keyof typeof categoryModifiers] || 0;
      
      // Determine lease type based on property type
      const leaseTypeByProperty: LeaseTypeByProperty = {
        'residential': 'Gross Lease',
        'commercial': 'Triple Net (NNN)',
        'industrial': 'Modified Gross',
        'multi-family': 'Gross Lease',
        'retail': 'Percentage Lease',
        'mixed-use-properties': 'Modified Gross',
        'land': 'Ground Lease',
        'special-purpose': 'Absolute Net'
      };
      
      const analysisData = {
        overall: Math.min(100, Math.max(0, baseScore + typeModifier)),
        compliance: Math.min(100, Math.max(0, Math.floor(Math.random() * 15) + 80)),
        favorability: Math.min(100, Math.max(0, Math.floor(Math.random() * 70) + 30)), // < 50 tenant friendly, > 50 landlord friendly
        leaseType: leaseTypeByProperty[categoryId as keyof typeof leaseTypeByProperty] || 'Gross Lease',
        risk: Math.min(100, Math.max(0, Math.floor(Math.random() * 30) + 65)),
        clarity: Math.min(100, Math.max(0, Math.floor(Math.random() * 25) + 70)),
        insights: [
          `${subcategoryName} property with ${leaseTypeByProperty[categoryId as keyof typeof leaseTypeByProperty]} structure`,
          "Rent escalation clauses are well-structured for market conditions",
          "Tenant improvement allowances exceed market average",
          "Default remedies provide adequate landlord protection",
          "Consider strengthening early termination penalties in future agreements"
        ]
      };
      
      // Update the document with analysis data
      setUploadedDocuments(prev => prev.map(doc => 
        doc.id === documentId ? { ...doc, analyzed: true, analysisData } : doc
      ));
      
      setLeaseAnalysisComplete(true)
      setIsAnalyzing(false)
    }, 2000)
  }
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }
  
  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }
  
  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }
  
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  
  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  
  // Upload document
  const uploadDocument = () => {
    if (!selectedFile) return
    
    setUploadStatus('uploading')
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus('success')
          
          // Generate unique ID
          const documentId = `doc-${Date.now()}`;
          
          // Add the uploaded document to the list
          const newDocument = {
            id: documentId,
            name: selectedFile.name,
            date: new Date().toISOString().split('T')[0],
            year: new Date().getFullYear(),
            type: 'Lease Document',
            url: '#',
            analyzed: false
          }
          
          setUploadedDocuments(prev => [newDocument, ...prev])
          setSelectedFile(null)
          
          // Set as active document
          setActiveDocumentId(documentId);
          
          return 100
        }
        return prev + 10
      })
    }, 300)
  }
  
  // Reset upload
  const resetUpload = () => {
    setSelectedFile(null)
    setUploadStatus('idle')
    setUploadProgress(0)
  }
  
  // Delete document
  const deleteDocument = (documentId: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== documentId))
    
    // If the active document is deleted, set the first available document as active
    if (documentId === activeDocumentId) {
      const remainingDocs = uploadedDocuments.filter(doc => doc.id !== documentId);
      if (remainingDocs.length > 0) {
        setActiveDocumentId(remainingDocs[0].id);
      } else {
        setActiveDocumentId(null);
      }
    }
  }
  
  const [selectedYear, setSelectedYear] = useState<string>("2023");
  const [selectedDocument, setSelectedDocument] = useState<string | null>("lease_2023_q2");
  const [activePropertyType, setActivePropertyType] = useState<string>("retail");
  const [showDetailedReport, setShowDetailedReport] = useState<boolean>(false);
  
  // Function to handle generating the detailed report
  const handleGenerateDetailedReport = () => {
    setShowDetailedReport(true);
    // Scroll to the report section after a small delay to ensure rendering
    setTimeout(() => {
      const reportSection = document.getElementById('detailed-report-section');
      if (reportSection) {
        reportSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  // Sample property data mapping for property names
  const propertyNames: PropertyNames = {
    'prop-001': 'Skyline Tower',
    'prop-002': 'Riverside Apartments',
    'prop-003': 'Lakefront Mall',
    'prop-004': 'Tech Park Plaza',
    'prop-005': 'Sunset Heights',
    'prop-006': 'Mountain View Industrial'
  };
  
  if (!tenant) {
    return (
      <div className="bg-gray-50 min-h-screen w-full p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <Link href={`/operations-dashboard/properties/property-details?id=${searchParams.get('property') || 'prop-001'}`} className="text-blue-600 hover:text-blue-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Property
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium text-red-600">Tenant not found</h2>
            <p className="mt-2 text-gray-600">The tenant you're looking for could not be found.</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href={`/operations-dashboard/properties/property-details?id=${searchParams.get('property') || 'prop-001'}`} className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Property
          </Link>
        </div>
        
        <header className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{tenant.name}</h1>
              <p className="text-gray-600 mt-1">{tenant.industry}</p>
              <div className="flex items-center mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {tenant.units} Units
                </span>
                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {tenant.sqft.toLocaleString()} sq ft
                </span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Tenant Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Person</h3>
                <p className="mt-1">{tenant.contactPerson}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1">{tenant.contactEmail}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1">{tenant.contactPhone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="mt-1 text-sm text-gray-600">{tenant.notes}</p>
              </div>
            </div>
          </div>
          
          {/* Lease Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Lease Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Lease Period</h3>
                <p className="mt-1">
                  {new Date(tenant.leaseStart).toLocaleDateString()} to {new Date(tenant.leaseEnd).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Term Length</h3>
                <p className="mt-1">{tenant.leaseTermMonths} months</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Monthly Rent</h3>
                <p className="mt-1">{formatCurrency(tenant.monthlyRent)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Security Deposit</h3>
                <p className="mt-1">{formatCurrency(tenant.securityDeposit)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Space Details</h3>
                <p className="mt-1">{tenant.units} units, {tenant.sqft.toLocaleString()} sq ft</p>
              </div>
            </div>
          </div>
          
          {/* Lease Documents */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-blue-600 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <a href={tenant.leaseDocument} className="text-sm">Lease Agreement</a>
              </li>
              <li className="flex items-center text-blue-600 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <a href="#" className="text-sm">Tenant Estoppel Certificate</a>
              </li>
              <li className="flex items-center text-blue-600 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <a href="#" className="text-sm">Insurance Certificate</a>
              </li>
              <li className="flex items-center text-blue-600 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <a href="#" className="text-sm">Payment History Reports</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tenant.paymentHistory.map((payment: Payment, idx: number) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                        payment.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800">View Receipt</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* New Lease Documents & Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Document List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Lease Documents</h2>
              <button 
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700" 
                onClick={triggerFileInput}
              >
                Upload New
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx"
                aria-label="Upload lease document"
              />
            </div>
            
            {/* Document List by Year */}
            <div>
              {/* Group documents by year */}
              {Array.from(new Set(uploadedDocuments.map(doc => doc.year)))
                .sort((a, b) => b - a) // Sort years in descending order
                .map(year => (
                  <div key={year} className="mb-5">
                    <h3 className="text-md font-medium text-gray-700 mb-2">{year}</h3>
                    <ul className="space-y-2">
                      {uploadedDocuments
                        .filter(doc => doc.year === year)
                        .map((doc) => (
                          <li key={doc.id} className={`border rounded-md p-3 cursor-pointer transition-all ${
                            activeDocumentId === doc.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`} onClick={() => setActiveDocumentId(doc.id)}>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                              </svg>
                              <div className="ml-3 min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                                <div className="flex text-xs text-gray-500">
                                  <span className="mr-1">{doc.type}</span>
                                  <span className="mx-1">•</span>
                                  <span>{new Date(doc.date).toLocaleDateString()}</span>
                                </div>
                              </div>
                              {doc.analyzed && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                  Analyzed
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
            
            {/* Empty State */}
            {uploadedDocuments.length === 0 && (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">No documents have been uploaded yet.</p>
              </div>
            )}
          </div>
          
          {/* Right Column - Document View & Analysis */}
          <div className="lg:col-span-2">
            {/* Document Upload Area - Show only when no documents exist */}
            {uploadedDocuments.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Upload Lease Document</h2>
                
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-4 text-sm text-gray-600">
                    Drag and drop your lease document here, or {' '}
                    <button 
                      type="button" 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                      onClick={triggerFileInput}
                    >
                      browse
                    </button>
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Supported file types: PDF, DOC, DOCX
                  </p>
                </div>
              </div>
            )}
            
            {/* File Selected for Upload */}
            {selectedFile && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="ml-4 text-left">
                      <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  
                  {uploadStatus === 'idle' ? (
                    <div className="flex justify-center space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                        onClick={uploadDocument}
                      >
                        Upload Document
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                        onClick={resetUpload}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : uploadStatus === 'uploading' ? (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">Uploading... {uploadProgress}%</p>
                    </div>
                  ) : uploadStatus === 'success' ? (
                    <div className="text-center">
                      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Upload complete!
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        Upload failed. Please try again.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Document View & Analysis */}
            {activeDocument && (
              <div className="space-y-6">
                {/* Document Preview */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{activeDocument.name}</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {activeDocument.type} • Uploaded on {new Date(activeDocument.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <a 
                        href={activeDocument.url} 
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                      <button 
                        className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-md hover:bg-red-200"
                        onClick={() => deleteDocument(activeDocument.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {/* Document Frame */}
                  <div className="bg-gray-100 rounded-md h-64 flex items-center justify-center border">
                    <p className="text-gray-500">Document preview not available</p>
                  </div>
                </div>
                
                {/* Document Analysis */}
                {activeDocument.analyzed ? (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Lease Analysis</h2>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                        {activeDocument.analysisData?.leaseType}
                      </span>
                    </div>
                    
                    {/* Analysis Scores */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
                      {/* Overall Score Circle */}
                      <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
                        <div className="relative h-20 w-20">
                          <svg className="h-20 w-20" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#E5E7EB"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#4ADE80"
                              strokeWidth="3"
                              strokeDasharray={`${activeDocument.analysisData?.overall}, 100`}
                            />
                          </svg>
                          <div className="absolute top-0 left-0 h-20 w-20 flex items-center justify-center">
                            <span className="text-xl font-bold">{activeDocument.analysisData?.overall}</span>
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 mt-2">Overall Score</p>
                      </div>
                      
                      {/* Other Scores */}
                      <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Compliance */}
                        <div className="bg-white shadow rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">Compliance</div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-green-600 h-2.5 rounded-full" 
                                style={{ width: `${activeDocument.analysisData?.compliance}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium ml-2">{activeDocument.analysisData?.compliance}</span>
                          </div>
                        </div>
                        
                        {/* Favorability */}
                        <div className="bg-white shadow rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">
                            Favorability {activeDocument.analysisData?.favorability && activeDocument.analysisData.favorability > 50 ? '(Landlord)' : '(Tenant)'}
                          </div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  activeDocument.analysisData?.favorability && activeDocument.analysisData.favorability > 50 
                                    ? 'bg-blue-600' 
                                    : 'bg-purple-600'
                                }`}
                                style={{ width: `${activeDocument.analysisData?.favorability}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium ml-2">{activeDocument.analysisData?.favorability}</span>
                          </div>
                        </div>
                        
                        {/* Risk */}
                        <div className="bg-white shadow rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">Risk Protection</div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-orange-600 h-2.5 rounded-full" 
                                style={{ width: `${activeDocument.analysisData?.risk}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium ml-2">{activeDocument.analysisData?.risk}</span>
                          </div>
                        </div>
                        
                        {/* Clarity */}
                        <div className="bg-white shadow rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">Term Clarity</div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-indigo-600 h-2.5 rounded-full" 
                                style={{ width: `${activeDocument.analysisData?.clarity}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium ml-2">{activeDocument.analysisData?.clarity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Analysis Insights */}
                    <div>
                      <h3 className="text-md font-medium mb-3">AI Insights</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <ul className="space-y-2">
                          {activeDocument.analysisData?.insights.map((insight, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-700">{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Generate Report Button */}
                    <div className="flex justify-center mt-6">
                      <button 
                        onClick={handleGenerateDetailedReport}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Generate Detailed Report
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Analyze Lease</h2>
                    </div>
                    
                    {isAnalyzing ? (
                      <div className="py-8">
                        <div className="flex flex-col items-center justify-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                          <p className="text-gray-600">Analyzing lease document with AI...</p>
                          <p className="text-gray-500 text-sm mt-2">This may take a few moments as we process the document and identify key terms.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 text-center">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
                          <div className="relative w-full sm:w-auto sm:min-w-[250px]">
                            <button
                              type="button"
                              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 flex items-center justify-between"
                              onClick={() => setShowPropertyTypeDropdown(!showPropertyTypeDropdown)}
                            >
                              <span className="truncate">{getSelectedPropertyTypeName()}</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                            
                            {showPropertyTypeDropdown && (
                              <div className="absolute z-10 mt-1 w-full max-h-[300px] overflow-y-auto bg-white shadow-lg rounded-md border border-gray-200 py-1">
                                {propertyTypes.map(category => (
                                  <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                                    <button
                                      type="button"
                                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-50"
                                      onClick={() => toggleCategory(category.id)}
                                    >
                                      <span>{category.name}</span>
                                      <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={`h-4 w-4 transform ${expandedCategories.includes(category.id) ? 'rotate-180' : ''}`} 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor"
                                      >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                      </svg>
                                    </button>
                                    
                                    {expandedCategories.includes(category.id) && (
                                      <div className="pl-4 pr-2 pb-2">
                                        {category.subcategories.map(subcategory => (
                                          <button
                                            key={subcategory.id}
                                            className={`block w-full text-left px-4 py-2 text-sm ${propertyType === subcategory.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                                            onClick={() => selectPropertyType(subcategory.id)}
                                          >
                                            {subcategory.name}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <button 
                            type="button"
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={() => analyzeLease(activeDocument.id)}
                          >
                            Analyze with AI
                          </button>
                        </div>
                        
                        <p className="text-gray-500">Select a property type and click "Analyze with AI" to generate a comprehensive analysis of the lease terms, including risk assessment and optimization recommendations.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Detailed Report Section */}
      {showDetailedReport && (
        <div id="detailed-report-section" className="mt-10 bg-white rounded-lg shadow-lg p-8 print:shadow-none">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">ARIESVIEW DETAILED LEASE REPORT</h1>
              <button
                onClick={() => window.print()}
                className="print:hidden px-3 py-1.5 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300"
              >
                Print / Export PDF
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {/* DOCUMENT SUMMARY */}
              <section className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">DOCUMENT SUMMARY</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Document Type</p>
                    <p className="font-medium">Commercial Lease Agreement</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Document ID</p>
                    <p className="font-medium">LEASE-2023-05782</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Analysis Date</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Document Status</p>
                    <p className="font-medium">Active</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Digitally Signed</p>
                    <p className="font-medium">Yes</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Document Length</p>
                    <p className="font-medium">47 pages</p>
                  </div>
                </div>
              </section>
              
              {/* EXECUTIVE SUMMARY */}
              <section className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">EXECUTIVE SUMMARY</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Overall Compliance Score</h3>
                      <span className="text-lg font-semibold text-green-600">87/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Lease Type</p>
                      <p className="font-medium">Triple Net (NNN)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Risk Level</p>
                      <p className="font-medium text-yellow-600">Moderate</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Favorability</p>
                      <p className="font-medium">Balanced (53% Landlord)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Key Concerns</p>
                      <p className="font-medium">3 items</p>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* PROPERTY INFORMATION */}
              <section className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">PROPERTY INFORMATION</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Property Address</p>
                    <p className="font-medium">123 Commerce Way, Milan, Italy 20121</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium">Class A Office Building</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Building Size</p>
                    <p className="font-medium">12,500 sq.m.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year Built/Renovated</p>
                    <p className="font-medium">2005/2018</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Property Amenities</p>
                    <p className="font-medium">Parking garage, cafeteria, gym, conference center</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Zoning Information</p>
                    <p className="font-medium">B-3 Commercial</p>
                  </div>
                </div>
              </section>
              
              {/* LEASE PARTIES */}
              <section className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">LEASE PARTIES</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Landlord/Owner</p>
                    <p className="font-medium">Vesuvio Properties S.p.A.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tenant</p>
                    <p className="font-medium">TechNova Solutions s.r.l.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guarantor</p>
                    <p className="font-medium">TechNova Global Holdings</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Property Manager</p>
                    <p className="font-medium">Milano Commercial Management</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Broker(s)</p>
                    <p className="font-medium">Romano & Associates (Landlord), Enterprise Commercial (Tenant)</p>
                  </div>
                </div>
              </section>
              
              {/* LEASE TERM DETAILS */}
              <section className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">LEASE TERM DETAILS</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Commencement Date</p>
                    <p className="font-medium">June 1, 2023</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expiration Date</p>
                    <p className="font-medium">May 31, 2028</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Initial Term</p>
                    <p className="font-medium">5 years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Renewal Options</p>
                    <p className="font-medium">Two (2) options of 5 years each</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Renewal Notice Period</p>
                    <p className="font-medium">180 days prior to expiration</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Early Termination Rights</p>
                    <p className="font-medium">Available after 36 months</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Holdover Provisions</p>
                    <p className="font-medium">150% of last monthly rent</p>
                  </div>
                </div>
              </section>
              
              {/* FINANCIAL SUMMARY */}
              <section className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">FINANCIAL SUMMARY</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Leased Area</p>
                    <p className="font-medium">2,500 sq.m.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Base Rent</p>
                    <p className="font-medium">€32.50 per sq.m. monthly</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Rent</p>
                    <p className="font-medium">€975,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Security Deposit</p>
                    <p className="font-medium">€243,750 (3 months)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rent Escalations</p>
                    <p className="font-medium">2.5% annually</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rent Commencement</p>
                    <p className="font-medium">July 1, 2023 (1-month abatement)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Due Date</p>
                    <p className="font-medium">1st of each month</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Late Fee</p>
                    <p className="font-medium">4% after 5-day grace period</p>
                  </div>
                </div>
              </section>
              
              {/* OPERATING EXPENSES */}
              <section className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">OPERATING EXPENSES</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Lease Structure</p>
                    <p className="font-medium">Triple Net (NNN)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CAM Charges</p>
                    <p className="font-medium">€4.75 per sq.m. monthly</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Real Estate Taxes</p>
                    <p className="font-medium">Tenant responsible (100%)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Insurance</p>
                    <p className="font-medium">Tenant responsible (100%)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Utilities</p>
                    <p className="font-medium">Tenant responsible (separately metered)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expense Stop</p>
                    <p className="font-medium">None</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expense Cap</p>
                    <p className="font-medium">5% annual increase limit on controllable expenses</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expense Audit Rights</p>
                    <p className="font-medium">Within 180 days after year-end statement</p>
                  </div>
                </div>
              </section>
              
              {/* KEY PROVISIONS */}
              <section className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">KEY PROVISIONS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Assignment/Subletting</p>
                    <p className="font-medium">Permitted with landlord approval</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Use Restrictions</p>
                    <p className="font-medium">General office use, technology services</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Exclusive Use Rights</p>
                    <p className="font-medium">None</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Building Hours</p>
                    <p className="font-medium">7:00 AM - 8:00 PM weekdays</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">After-Hours HVAC</p>
                    <p className="font-medium">€45 per hour</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Signage Rights</p>
                    <p className="font-medium">Building directory, suite entrance</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Parking</p>
                    <p className="font-medium">50 reserved spaces (€150/space/month)</p>
                  </div>
                </div>
              </section>
              
              {/* RISK ASSESSMENT */}
              <section className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">RISK ASSESSMENT</h2>
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-yellow-800 mb-2">High Risk Clauses</h3>
                  <ul className="list-disc pl-5 text-yellow-800">
                    <li>Relocation provision allows landlord to relocate tenant with 60 days notice</li>
                    <li>Unusual indemnification language in Section 14.3 may extend liability beyond standard</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Missing Provisions</h3>
                  <ul className="list-disc pl-5 text-blue-800">
                    <li>Casualty repair timeline not specified</li>
                    <li>Environmental remediation responsibilities unclear</li>
                  </ul>
                </div>
              </section>
              
              {/* FINANCIAL ANALYSIS */}
              <section className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">FINANCIAL ANALYSIS</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Lease Obligation</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€5,116,875 (including escalations)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Effective Rent</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€30.88 per sq.m.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Net Present Value</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€4,523,651 (at 5% discount rate)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Break-Even Point</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Month 47</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cost per Employee</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€4,875 annually (based on 200 employees)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              
              {/* RECOMMENDATIONS */}
              <section className="pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">RECOMMENDATIONS</h2>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">Critical Actions</h3>
                    <ul className="list-disc pl-5 text-green-800">
                      <li>Review unusual indemnification clause with legal counsel</li>
                      <li>Request clarification on casualty repair timeline</li>
                      <li>Verify insurance requirements match company policy limits</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Key Calendar Dates</h3>
                    <ul className="list-disc pl-5">
                      <li><span className="font-medium">Nov 30, 2027:</span> Option notice deadline</li>
                      <li><span className="font-medium">June 1, 2024:</span> First CPI adjustment</li>
                      <li><span className="font-medium">July 15, 2023:</span> Updated certificate of insurance required</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              {/* REPORT GENERATION DETAILS */}
              <div className="text-sm text-gray-500 mt-10 pt-6 border-t">
                <p>Report Generated By: Ariesview Lease Analysis System</p>
                <p>Generation Date: {new Date().toLocaleString()}</p>
                <p>Report ID: RPT-2023-05782-001</p>
                <p className="mt-2 italic">This report is generated automatically and should be reviewed by qualified legal and real estate professionals. All information is derived from the lease document and Ariesview's proprietary analysis system. This report does not constitute legal advice.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Main component with Suspense
export default function TenantDetails() {
  return (
    <Suspense fallback={<div className="p-4">Loading tenant details...</div>}>
      <TenantDetailsContent />
    </Suspense>
  )
} 