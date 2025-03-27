'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

// Base interface for all document types
interface BaseDocument {
  id: string
  type: 'lease' | 'insurance' | 'tax' | 'permit' | 'contract' | 'financial' | 'maintenance'
  name: string
  uploadDate: string
  summary: {
    title: string
    description: string
    keyPoints: string[]
    riskLevel: 'Low' | 'Medium' | 'High'
    status: 'Active' | 'Pending' | 'Expired'
  }
  metadata: {
    documentType: string
    dateCreated: string
    lastModified: string
    pageCount: number
    fileSize: string
    author: string
    version: string
  }
  relatedDocuments: {
    id: string
    name: string
    relationship: string
    relevantSections?: string[]
  }[]
}

// Lease-specific interface
interface LeaseAbstract extends BaseDocument {
  type: 'lease'
  analysis: {
    overview: string
    keyTerms: { term: string; definition: string }[]
    criticalDates: { event: string; date: string }[]
    leaseDetails: {
      tenantName: string
      tenantTradeName: string
      leaseStartDate: string
      rentCommencement: string
      currentExpiration: string
      options: {
        type: string
        notice: string
        term: string
      }[]
      nnn: string
      useClause: string
      permittedUse: string
      exclusiveUse: string
      securityDeposit: number
      freeRentConcessions: {
        amount: number
        period: string
      }[]
      rentSchedule: {
        period: string
        annualRent: number
        monthlyRent: number
        rentPSF: number
        notes?: string
      }[]
      additionalRent: {
        type: string
        amount: number
        frequency: string
      }[]
      operatingExpenses: {
        baseYear: string
        baseAmount: number
        tenantShare: string
        caps?: {
          type: string
          amount: number
        }
      }
      utilities: {
        type: string
        responsibility: string
        meter: string
        notes?: string
      }[]
      maintenanceResponsibilities: {
        item: string
        responsibility: string
        notes?: string
      }[]
      insurance: {
        type: string
        requiredCoverage: number
        provider: string
        notes?: string
      }[]
      alterations: {
        type: string
        approval: string
        conditions: string[]
      }
      signage: {
        type: string
        location: string
        restrictions: string[]
      }
      parking: {
        reserved: number
        unreserved: number
        cost: number
        notes?: string
      }
      subletting: {
        permitted: boolean
        conditions: string[]
        consentRequirements: string
      }
      defaultProvisions: {
        type: string
        curePeriod: string
        remedies: string[]
      }[]
      holdover: {
        rate: string
        terms: string[]
      }
      surrenderRequirements: string[]
      brokers: {
        name: string
        representing: string
        commission: string
      }[]
    }
    financialData: {
      amounts: { description: string; amount: number }[]
      paymentTerms: string
      financialObligations: string[]
      escalations: {
        type: string
        amount: string
        frequency: string
      }[]
      operatingExpenses: {
        type: string
        baseYear: string
        amount: number
        escalation: string
      }[]
      utilities: {
        type: string
        estimated: number
        actual: number
        reconciliation: string
      }[]
      taxes: {
        type: string
        baseYear: string
        amount: number
        tenantShare: string
      }[]
      insurance: {
        type: string
        amount: number
        frequency: string
      }[]
      securityDeposit: {
        amount: number
        type: string
        returnConditions: string[]
      }
      improvements: {
        allowance: number
        scope: string
        deadline: string
        disbursement: string
      }
    }
    parties: {
      name: string
      role: string
      contactInfo?: string
      responsibilities?: string[]
      notices?: {
        address: string
        method: string
        timing: string
      }
    }[]
    legalClauses: {
      title: string
      description: string
      implications: string[]
    }[]
    propertyDetails: {
      address: string
      propertyType: string
      squareFootage: number
      features: string[]
      condition: string
      premises: {
        floor: string
        suite: string
        usableArea: number
        rentableArea: number
        commonAreaFactor: number
      }
    }
    compliance: {
      requirements: string[]
      status: 'Compliant' | 'Non-compliant' | 'Pending Review'
      nextReviewDate: string
      certificates: {
        type: string
        status: string
        expirationDate: string
      }[]
      permits: {
        type: string
        status: string
        renewalDate: string
      }[]
    }
    risks: {
      category: string
      description: string
      severity: 'Low' | 'Medium' | 'High'
      mitigationSteps: string[]
      impact: {
        financial: string
        operational: string
        legal: string
      }
    }[]
  }
  aiInsights: {
    recommendations: string[]
    potentialIssues: string[]
    opportunityAreas: string[]
    marketContext: string
    comparableLeases: {
      property: string
      rent: number
      terms: string
      date: string
    }[]
    valuationImpact: {
      factor: string
      impact: string
      notes: string
    }[]
  }
}

// Insurance-specific interface
interface InsuranceAbstract extends BaseDocument {
  type: 'insurance'
  analysis: {
    overview: string
    keyTerms: { term: string; definition: string }[]
    criticalDates: { event: string; date: string }[]
    coverageDetails: {
      policyType: string
      policyNumber: string
      carrier: string
      effectiveDate: string
      expirationDate: string
      coverageLimits: {
        type: string
        amount: number
        aggregate?: number
        deductible?: number
      }[]
      namedInsureds: string[]
      additionalInsureds: string[]
      exclusions: string[]
      endorsements: {
        type: string
        description: string
        effect: string
      }[]
    }
    claims: {
      history: {
        date: string
        type: string
        amount: number
        status: string
        description: string
      }[]
      openClaims: number
      totalPaidClaims: number
    }
    compliance: {
      requirements: string[]
      status: 'Compliant' | 'Non-compliant' | 'Pending Review'
      nextReviewDate: string
      certificates: {
        type: string
        status: string
        expirationDate: string
      }[]
    }
    risks: {
      category: string
      description: string
      severity: 'Low' | 'Medium' | 'High'
      mitigationSteps: string[]
    }[]
  }
  aiInsights: {
    recommendations: string[]
    potentialIssues: string[]
    marketAnalysis: string
    benchmarking: {
      metric: string
      value: string
      comparison: string
    }[]
  }
}

// Tax document interface
interface TaxAbstract extends BaseDocument {
  type: 'tax'
  analysis: {
    overview: string
    keyTerms: { term: string; definition: string }[]
    criticalDates: { event: string; date: string }[]
    taxDetails: {
      taxYear: string
      taxType: string
      jurisdiction: string
      assessedValue: number
      taxRate: number
      totalTax: number
      paymentSchedule: {
        dueDate: string
        amount: number
        status: 'Paid' | 'Due' | 'Overdue'
      }[]
      exemptions: {
        type: string
        amount: number
        status: string
      }[]
      appeals: {
        date: string
        basis: string
        status: string
        outcome?: string
      }[]
    }
    historicalData: {
      year: string
      assessedValue: number
      taxRate: number
      totalTax: number
    }[]
    compliance: {
      requirements: string[]
      status: 'Compliant' | 'Non-compliant' | 'Pending Review'
      nextReviewDate: string
      filings: {
        type: string
        dueDate: string
        status: string
      }[]
    }
  }
  aiInsights: {
    recommendations: string[]
    potentialIssues: string[]
    taxOptimization: string[]
    marketComparison: {
      metric: string
      propertyValue: number
      marketAverage: number
      variance: string
    }[]
  }
}

// Permit interface
interface PermitAbstract extends BaseDocument {
  type: 'permit'
  analysis: {
    overview: string
    keyTerms: { term: string; definition: string }[]
    criticalDates: { event: string; date: string }[]
    permitDetails: {
      permitType: string
      permitNumber: string
      issuingAuthority: string
      issueDate: string
      expirationDate: string
      scope: string[]
      conditions: string[]
      inspections: {
        type: string
        required: boolean
        status: string
        lastInspection?: string
        nextDue?: string
      }[]
    }
    compliance: {
      requirements: string[]
      status: 'Compliant' | 'Non-compliant' | 'Pending Review'
      violations: {
        date: string
        description: string
        severity: string
        status: string
        resolutionDate?: string
      }[]
      nextReviewDate: string
    }
  }
  aiInsights: {
    recommendations: string[]
    potentialIssues: string[]
    renewalStrategy: string
    riskAssessment: {
      factor: string
      risk: string
      mitigation: string
    }[]
  }
}

// Union type for all document types
type DocumentAbstract = LeaseAbstract | InsuranceAbstract | TaxAbstract | PermitAbstract

// Sample document data - In production, this would come from your API
const sampleDocument: DocumentAbstract = {
  id: 'doc-001',
  type: 'lease',
  name: 'Commercial Lease Agreement - Tech Plaza Suite 2000',
  uploadDate: '2024-03-18',
  summary: {
    title: 'Commercial Lease Agreement',
    description: 'Master lease agreement for Suite 2000 in Tech Plaza between AriesView Properties and Quantum Technologies Inc.',
    keyPoints: [
      'Initial term of 7 years with two 5-year renewal options',
      'Base rent of $52 per square foot with 3.5% annual increases',
      'Modified Gross lease structure',
      'Tenant improvement allowance of $85 per square foot',
      'Expansion right on adjacent suite'
    ],
    riskLevel: 'Low',
    status: 'Active'
  },
  metadata: {
    documentType: 'Commercial Lease',
    dateCreated: '2024-02-28',
    lastModified: '2024-03-18',
    pageCount: 68,
    fileSize: '3.2 MB',
    author: 'Legal Department',
    version: '1.0'
  },
  analysis: {
    overview: 'Premium office lease in Class A building with strong tenant covenant and market-standard terms.',
    keyTerms: [
      { term: 'Base Rent', definition: 'Initial rate of $52.00 per square foot per year, modified gross' },
      { term: 'Operating Expenses', definition: 'Base year 2024, tenant pays increases over base year' },
      { term: 'Security Deposit', definition: 'Letter of credit equal to 6 months base rent' }
    ],
    criticalDates: [
      { event: 'Lease Execution', date: '2024-02-28' },
      { event: 'Rent Commencement', date: '2024-06-01' },
      { event: 'Initial Term Expiration', date: '2031-05-31' },
      { event: 'Option Notice Deadline', date: '2030-05-31' }
    ],
    leaseDetails: {
      tenantName: 'Quantum Technologies Inc.',
      tenantTradeName: 'QuantumTech',
      leaseStartDate: '2024-03-01',
      rentCommencement: '2024-06-01',
      currentExpiration: '2031-05-31',
      options: [
        {
          type: 'Renewal',
          notice: '12 months',
          term: '5 years'
        },
        {
          type: 'Expansion',
          notice: '6 months',
          term: 'Continuous'
        }
      ],
      nnn: 'Modified Gross',
      useClause: 'General Office Use',
      permittedUse: 'Software development, research and development, general office',
      exclusiveUse: 'None',
      securityDeposit: 780000,
      freeRentConcessions: [
        {
          amount: 3,
          period: 'months'
        }
      ],
      rentSchedule: [
        {
          period: '6/1/2024-5/31/2025',
          annualRent: 1560000,
          monthlyRent: 130000,
          rentPSF: 52.00
        },
        {
          period: '6/1/2025-5/31/2026',
          annualRent: 1614600,
          monthlyRent: 134550,
          rentPSF: 53.82
        }
      ],
      additionalRent: [
        {
          type: 'Operating Expense Escalation',
          amount: 0,
          frequency: 'Annual reconciliation'
        }
      ],
      operatingExpenses: {
        baseYear: '2024',
        baseAmount: 12.50,
        tenantShare: '15%',
        caps: {
          type: 'Annual',
          amount: 5
        }
      },
      utilities: [
        {
          type: 'Electric',
          responsibility: 'Tenant',
          meter: 'Direct',
          notes: 'After-hours HVAC at $75/hour'
        }
      ],
      maintenanceResponsibilities: [
        {
          item: 'HVAC',
          responsibility: 'Landlord maintains, tenant reimburses',
          notes: 'Tenant responsible for supplemental units'
        }
      ],
      insurance: [
        {
          type: 'Commercial General Liability',
          requiredCoverage: 2000000,
          provider: 'A-rated carrier',
          notes: 'Additional insured requirement'
        }
      ],
      alterations: {
        type: 'Non-structural',
        approval: 'Required for alterations exceeding $25,000',
        conditions: [
          'Licensed contractors only',
          'Building standard materials',
          'Working hours restrictions'
        ]
      },
      signage: {
        type: 'Suite entry and directory',
        location: 'Building standard locations',
        restrictions: [
          'Building standard design',
          'Landlord approval required'
        ]
      },
      parking: {
        reserved: 5,
        unreserved: 20,
        cost: 250,
        notes: 'Monthly rate subject to market adjustments'
      },
      subletting: {
        permitted: true,
        conditions: [
          'Landlord consent required',
          'No release of primary tenant',
          'Profit sharing 50/50'
        ],
        consentRequirements: 'Not to be unreasonably withheld'
      },
      defaultProvisions: [
        {
          type: 'Monetary',
          curePeriod: '5 days',
          remedies: [
            'Late fees',
            'Interest',
            'Lease termination'
          ]
        }
      ],
      holdover: {
        rate: '150% of last months rent',
        terms: [
          'Month-to-month tenancy',
          'Subject to immediate termination'
        ]
      },
      surrenderRequirements: [
        'Remove all personal property',
        'Professional cleaning',
        'Repair any damage'
      ],
      brokers: [
        {
          name: 'Commercial Realty Group',
          representing: 'Landlord',
          commission: '4% of lease value'
        }
      ]
    },
    financialData: {
      amounts: [
        { description: 'Annual Base Rent (Initial)', amount: 1560000 },
        { description: 'Security Deposit', amount: 780000 },
        { description: 'TI Allowance', amount: 2550000 }
      ],
      paymentTerms: 'Due in advance on the 1st of each month',
      financialObligations: [
        'Base Rent with 3.5% annual increases',
        'Operating Expense escalations over 2024 base year',
        'Utilities directly metered to tenant',
        'After-hours HVAC charges'
      ],
      escalations: [
        {
          type: 'Base Rent',
          amount: '3.5%',
          frequency: 'Annual'
        }
      ],
      operatingExpenses: [
        {
          type: 'Base Year',
          baseYear: '2024',
          amount: 375000,
          escalation: 'Actual increases with 5% annual cap'
        }
      ],
      utilities: [
        {
          type: 'Electric',
          estimated: 85000,
          actual: 0,
          reconciliation: 'Direct meter'
        }
      ],
      taxes: [
        {
          type: 'Real Estate',
          baseYear: '2024',
          amount: 225000,
          tenantShare: '15%'
        }
      ],
      insurance: [
        {
          type: 'Property',
          amount: 45000,
          frequency: 'Annual'
        }
      ],
      securityDeposit: {
        amount: 780000,
        type: 'Letter of Credit',
        returnConditions: [
          'No defaults',
          'Premises surrendered in required condition',
          'All keys returned'
        ]
      },
      improvements: {
        allowance: 2550000,
        scope: 'Turnkey buildout per approved plans',
        deadline: '2024-05-15',
        disbursement: 'Progress payments with 10% retention'
      }
    },
    parties: [
      {
        name: 'AriesView Properties II, LLC',
        role: 'Landlord',
        contactInfo: 'legal@ariesview.com',
        responsibilities: [
          'Building systems maintenance',
          'Common area maintenance',
          'Structural repairs'
        ],
        notices: {
          address: '100 Tech Plaza, Suite 100, Boston, MA 02110',
          method: 'Certified mail or overnight courier',
          timing: 'Deemed received 3 business days after sending'
        }
      },
      {
        name: 'Quantum Technologies Inc.',
        role: 'Tenant',
        contactInfo: 'facilities@quantumtech.com',
        responsibilities: [
          'Timely rent payment',
          'Interior maintenance',
          'Compliance with use restrictions'
        ],
        notices: {
          address: '200 Innovation Drive, Cambridge, MA 02142',
          method: 'Certified mail or overnight courier',
          timing: 'Deemed received 3 business days after sending'
        }
      }
    ],
    legalClauses: [
      {
        title: 'Assignment and Subletting',
        description: 'Permitted with landlord consent, not to be unreasonably withheld',
        implications: [
          'Flexibility for tenant growth or downsizing',
          'Landlord maintains control over occupancy',
          'Profit sharing on excess rents'
        ]
      }
    ],
    propertyDetails: {
      address: '100 Tech Plaza, Boston, MA 02110',
      propertyType: 'Class A Office',
      squareFootage: 30000,
      features: [
        '24/7 access and security',
        'Raised flooring throughout',
        'Dedicated telecom riser',
        'Emergency generator connection',
        'Bike storage and shower facilities'
      ],
      condition: 'Excellent - renovated 2023',
      premises: {
        floor: '20',
        suite: '2000',
        usableArea: 27000,
        rentableArea: 30000,
        commonAreaFactor: 1.11
      }
    },
    compliance: {
      requirements: [
        'Annual fire safety inspection',
        'Environmental compliance',
        'Building code compliance',
        'ADA accessibility'
      ],
      status: 'Compliant',
      nextReviewDate: '2025-03-18',
      certificates: [
        {
          type: 'Certificate of Occupancy',
          status: 'Current',
          expirationDate: 'N/A'
        }
      ],
      permits: [
        {
          type: 'Building Permit',
          status: 'Active',
          renewalDate: '2024-06-01'
        }
      ]
    },
    risks: [
      {
        category: 'Financial',
        description: 'Large TI allowance exposure',
        severity: 'Medium',
        mitigationSteps: [
          'Strong tenant financials',
          'Letter of credit security',
          'Parent guarantee'
        ],
        impact: {
          financial: 'Moderate upfront capital requirement',
          operational: 'Construction coordination needed',
          legal: 'Well-documented work letter protections'
        }
      }
    ]
  },
  aiInsights: {
    recommendations: [
      'Consider requesting parent company guarantee',
      'Implement critical date tracking system',
      'Review insurance certificates quarterly',
      'Document all tenant improvement specifications'
    ],
    potentialIssues: [
      'Complex TI coordination required',
      'Higher than market TI allowance',
      'Operating expense cap may limit recovery'
    ],
    opportunityAreas: [
      'Potential for tenant expansion',
      'Early renewal discussion opportunity',
      'Additional service revenue potential'
    ],
    marketContext: 'Lease terms generally align with market for Class A tech tenants, with above-market TI allowance offset by strong tenant credit and long-term commitment.',
    comparableLeases: [
      {
        property: 'Innovation Tower',
        rent: 54.00,
        terms: '10 years, 3% increases',
        date: '2024-01-15'
      }
    ],
    valuationImpact: [
      {
        factor: 'Credit Tenant',
        impact: 'Positive',
        notes: 'Enhances building value for refinancing/sale'
      }
    ]
  },
  relatedDocuments: [
    {
      id: 'doc-002',
      name: 'Work Letter',
      relationship: 'Exhibit',
      relevantSections: ['TI Specifications', 'Construction Schedule']
    },
    {
      id: 'doc-003',
      name: 'Building Rules and Regulations',
      relationship: 'Exhibit',
      relevantSections: ['Loading Dock', 'Moving Procedures']
    },
    {
      id: 'doc-004',
      name: 'SNDA',
      relationship: 'Related',
      relevantSections: ['Lender Rights', 'Tenant Protections']
    }
  ]
} as LeaseAbstract // Type assertion since we know it's a lease

// Function to determine which tabs to show based on document type
const getTabsForDocumentType = (type: DocumentAbstract['type']) => {
  const commonTabs = ['summary', 'details']
  
  switch (type) {
    case 'lease':
      return [...commonTabs, 'financial', 'compliance', 'risks', 'ai-insights']
    case 'insurance':
      return [...commonTabs, 'coverage', 'claims', 'compliance', 'ai-insights']
    case 'tax':
      return [...commonTabs, 'tax-details', 'historical', 'compliance', 'ai-insights']
    case 'permit':
      return [...commonTabs, 'permit-details', 'inspections', 'compliance', 'ai-insights']
    default:
      return commonTabs
  }
}

// Function to render content based on document type and active tab
const renderTabContent = (document: DocumentAbstract, activeTab: string) => {
  switch (document.type) {
    case 'lease':
      return renderLeaseContent(document, activeTab)
    case 'insurance':
      return renderInsuranceContent(document, activeTab)
    case 'tax':
      return renderTaxContent(document, activeTab)
    case 'permit':
      return renderPermitContent(document, activeTab)
    default:
      return null
  }
}

function renderLeaseContent(document: LeaseAbstract, activeTab: string) {
  switch (activeTab) {
    case 'summary':
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Document Summary</h2>
          <p className="text-gray-600 mb-4">{document.summary.description}</p>
          <h3 className="text-lg font-medium mb-2">Key Points</h3>
          <ul className="list-disc pl-5 space-y-1">
            {document.summary.keyPoints.map((point, index) => (
              <li key={index} className="text-gray-600">{point}</li>
            ))}
          </ul>
        </div>
      )
    case 'details':
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Document Overview</h2>
            <p className="text-gray-600 mb-4">{document.analysis.overview}</p>
            <h3 className="text-lg font-medium mb-2">Key Terms</h3>
            <dl className="space-y-2">
              {document.analysis.keyTerms.map((term, index) => (
                <div key={index} className="flex flex-col sm:flex-row">
                  <dt className="font-medium text-gray-900 sm:w-1/3">{term.term}:</dt>
                  <dd className="text-gray-600 sm:w-2/3">{term.definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )
    // Add more cases for other tabs like 'financial', 'compliance', etc.
    default:
      return null
  }
}

function renderInsuranceContent(document: InsuranceAbstract, activeTab: string) {
  // Implement similar structure for insurance documents
  return null
}

function renderTaxContent(document: TaxAbstract, activeTab: string) {
  // Implement similar structure for tax documents
  return null
}

function renderPermitContent(document: PermitAbstract, activeTab: string) {
  // Implement similar structure for permit documents
  return null
}

export default function DocumentAbstractPage() {
  const params = useParams()
  const [document, setDocument] = useState<DocumentAbstract | null>(null)
  const [activeTab, setActiveTab] = useState('summary')

  useEffect(() => {
    // In production, this would be an API call to fetch the document data
    if (params.documentId) {
      // Here you would typically fetch the document data from your API
      setDocument({
        ...sampleDocument,
        id: params.documentId as string
      })
    }
  }, [params.documentId])

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  const tabs = getTabsForDocumentType(document.type)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Link
              href={`/operations-dashboard/properties/${params.id}/document-hub`}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Document Hub
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{document.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {document.type.toUpperCase()}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              document.summary.status === 'Active' ? 'bg-green-100 text-green-800' :
              document.summary.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {document.summary.status}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              document.summary.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
              document.summary.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {document.summary.riskLevel} Risk
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {renderTabContent(document, activeTab)}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Metadata */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Document Information</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500">Document Type</dt>
                  <dd className="text-gray-900">{document.metadata.documentType}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Created</dt>
                  <dd className="text-gray-900">{document.metadata.dateCreated}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Last Modified</dt>
                  <dd className="text-gray-900">{document.metadata.lastModified}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Pages</dt>
                  <dd className="text-gray-900">{document.metadata.pageCount}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Size</dt>
                  <dd className="text-gray-900">{document.metadata.fileSize}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Version</dt>
                  <dd className="text-gray-900">{document.metadata.version}</dd>
                </div>
              </dl>
            </div>

            {/* Critical Dates */}
            {'analysis' in document && 'criticalDates' in document.analysis && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Critical Dates</h2>
                <div className="space-y-3">
                  {document.analysis.criticalDates.map((date, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm text-gray-500">{date.event}</span>
                      <span className="text-sm font-medium text-gray-900">{date.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Documents */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Related Documents</h2>
              <ul className="space-y-3">
                {document.relatedDocuments.map((doc) => (
                  <li key={doc.id}>
                    <Link
                      href={`/operations-dashboard/properties/${params.id}/document-hub/${doc.id}/abstract`}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      {doc.name}
                      <span className="ml-1 text-xs text-gray-500">({doc.relationship})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 