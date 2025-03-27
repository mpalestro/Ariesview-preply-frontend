'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { propertiesData } from '../../data'
import Image from 'next/image'
import Link from 'next/link'

interface FinancialMetrics {
  grossIncome: number
  operatingExpenses: number
  netOperatingIncome: number
  occupancyRate: number
  effectiveGrossIncome: number
}

interface LeaseMetrics {
  period: string
  months: number
  baseRent: number
  expenses: number
  totalCost: number
  averageMonthlyCost: number
  perAnnum: number
  cumulative: number
}

interface FinancialDetail {
  period: string
  baseRent: number
  rentAbatement: number
  totalRent: number
  expenses: {
    baseYearStop: number
    totalExpenses: number
  }
}

interface ExpenseCredit {
  tiAllowance: number
  movingAllowance: number
  movingExpenses: number
  totalBuildoutCost: number
  totalExpensesAndCredits: number
}

export default function FinancialAnalysisHub() {
  const params = useParams()
  const propertyId = params.id as string
  const [property, setProperty] = useState<any>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('annual')
  const [activeTab, setActiveTab] = useState('overview')

  // Property details based on the image
  const propertyDetails = {
    name: 'Headquarters (Sample)',
    address: '505 Union Station',
    landlordProposal: 'LANDLORD PROPOSAL',
    city: 'Seattle',
    state: 'Washington',
    zip: '98104',
    country: 'US',
    rentableArea: '100,000 SF',
    usableArea: '90,091 SF',
    loadFactor: '11%',
    leaseTerm: '72 months',
    commencementDate: '04/29/2013',
    expirationDate: '04/28/2019',
    tiAllowance: '$35.00 per RSF',
    landlord: '705 Union Station, LLC',
    buildingClass: 'Class A',
    floorSuite: 'Floors 3, 4, 8, 10',
    parkingRatio: '5 per 1,000',
    leaseStructure: 'Full Service',
    renewalOptions: 'Two (2) Five (5) Year Options',
    expansionRights: '24,000 SF w/24 months notice',
    totalDealCost: '$14,768,415',
    npv: '$11,469,156'
  }

  // Lease metrics based on the image
  const leaseMetrics: LeaseMetrics[] = [
    { period: 'Average', months: 12, baseRent: 23.58, expenses: 0.78, totalCost: 24.36, averageMonthlyCost: 203034, perAnnum: 2436402, cumulative: 0 },
    { period: '04/2014', months: 12, baseRent: 11.50, expenses: 0, totalCost: 11.50, averageMonthlyCost: 95833, perAnnum: 1150000, cumulative: 1150000 },
    { period: '04/2015', months: 12, baseRent: 24.00, expenses: 0.30, totalCost: 24.30, averageMonthlyCost: 202500, perAnnum: 2430000, cumulative: 3580000 },
    { period: '04/2016', months: 12, baseRent: 25.00, expenses: 0.61, totalCost: 25.61, averageMonthlyCost: 213408, perAnnum: 2560901, cumulative: 6140901 },
    { period: '04/2017', months: 12, baseRent: 26.00, expenses: 0.93, totalCost: 26.93, averageMonthlyCost: 224394, perAnnum: 2692728, cumulative: 8833629 },
    { period: '04/2018', months: 12, baseRent: 27.00, expenses: 1.26, totalCost: 28.26, averageMonthlyCost: 235459, perAnnum: 2825510, cumulative: 11659139 },
    { period: '04/2019', months: 12, baseRent: 28.00, expenses: 1.59, totalCost: 29.59, averageMonthlyCost: 246606, perAnnum: 2959276, cumulative: 14618415 }
  ]

  // Annual financial details based on the image
  const financialDetails: FinancialDetail[] = [
    { period: 'Average', baseRent: 2550000, rentAbatement: -191667, totalRent: 2358333, expenses: { baseYearStop: 78068, totalExpenses: 78069 } },
    { period: '04/2014', baseRent: 2300000, rentAbatement: -1150000, totalRent: 1150000, expenses: { baseYearStop: 0, totalExpenses: 0 } },
    { period: '04/2015', baseRent: 2400000, rentAbatement: 0, totalRent: 2400000, expenses: { baseYearStop: 30000, totalExpenses: 30000 } },
    { period: '04/2016', baseRent: 2500000, rentAbatement: 0, totalRent: 2500000, expenses: { baseYearStop: 60900, totalExpenses: 60901 } },
    { period: '04/2017', baseRent: 2600000, rentAbatement: 0, totalRent: 2600000, expenses: { baseYearStop: 92727, totalExpenses: 92728 } },
    { period: '04/2018', baseRent: 2700000, rentAbatement: 0, totalRent: 2700000, expenses: { baseYearStop: 125509, totalExpenses: 125510 } },
    { period: '04/2019', baseRent: 2800000, rentAbatement: 0, totalRent: 2800000, expenses: { baseYearStop: 159274, totalExpenses: 159276 } }
  ]

  // Expenses and credits based on the image
  const expenseCredits: ExpenseCredit = {
    tiAllowance: 3500000,
    movingAllowance: 100000,
    movingExpenses: 250000,
    totalBuildoutCost: 3500000,
    totalExpensesAndCredits: 150000
  }

  useEffect(() => {
    // Find property data
    const propertyData = propertiesData.find(p => p.id === propertyId)
    if (propertyData) {
      setProperty(propertyData)
    }
  }, [propertyId])

  const calculateNOI = (): FinancialMetrics => {
    // This would typically fetch real data and perform actual calculations
    return {
      grossIncome: 500000,
      operatingExpenses: 150000,
      netOperatingIncome: 350000,
      occupancyRate: 95,
      effectiveGrossIncome: 475000
    }
  }

  if (!property) {
    return <div className="p-6">Loading property details...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Navigation Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center text-sm">
          <Link href="/operations-dashboard" className="text-blue-600 hover:text-blue-800">
            Dashboard
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/operations-dashboard/properties" className="text-blue-600 hover:text-blue-800">
            Properties
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href={`/operations-dashboard/properties/${propertyId}`} className="text-blue-600 hover:text-blue-800">
            {property.name}
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-600 font-medium">Financial Hub</span>
        </div>
        
        {/* Property Navigation Tabs */}
        <div className="flex mt-4 space-x-4 border-b">
          <Link 
            href={`/operations-dashboard/properties/${propertyId}`}
            className="px-4 py-2 text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
          >
            Overview
          </Link>
          <Link 
            href={`/operations-dashboard/properties/${propertyId}/document-hub`}
            className="px-4 py-2 text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
          >
            Document Hub
          </Link>
          <Link 
            href={`/operations-dashboard/properties/${propertyId}/financial-hub`}
            className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium"
          >
            Financial Hub
          </Link>
        </div>
      </div>

      {/* Property Identifier Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{propertyDetails.name}</h1>
            <p className="text-gray-500">{propertyDetails.address}</p>
            <p className="text-gray-500">{propertyDetails.city}, {propertyDetails.state} {propertyDetails.zip}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 font-medium">{propertyDetails.landlordProposal}</p>
            <p className="text-gray-600">Property ID: {propertyId}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('lease-metrics')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'lease-metrics'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Lease Metrics
          </button>
          <button
            onClick={() => setActiveTab('financial-details')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'financial-details'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Financial Details
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'expenses'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Expenses & Credits
          </button>
        </div>
      </div>

      {/* Main Content Based on Active Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Property Overview */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Property Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-sm text-gray-500">Rentable Area</p>
                <p className="text-lg font-semibold">{propertyDetails.rentableArea}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Usable Area</p>
                <p className="text-lg font-semibold">{propertyDetails.usableArea}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Load Factor</p>
                <p className="text-lg font-semibold">{propertyDetails.loadFactor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lease Term</p>
                <p className="text-lg font-semibold">{propertyDetails.leaseTerm}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Commencement Date</p>
                <p className="text-lg font-semibold">{propertyDetails.commencementDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiration Date</p>
                <p className="text-lg font-semibold">{propertyDetails.expirationDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">TI Allowance</p>
                <p className="text-lg font-semibold">{propertyDetails.tiAllowance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Landlord</p>
                <p className="text-lg font-semibold">{propertyDetails.landlord}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Building Class</p>
                <p className="text-lg font-semibold">{propertyDetails.buildingClass}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Floor/Suite</p>
                <p className="text-lg font-semibold">{propertyDetails.floorSuite}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Parking Ratio</p>
                <p className="text-lg font-semibold">{propertyDetails.parkingRatio}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lease Structure</p>
                <p className="text-lg font-semibold">{propertyDetails.leaseStructure}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Renewal Options</p>
                <p className="text-lg font-semibold">{propertyDetails.renewalOptions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expansion Rights</p>
                <p className="text-lg font-semibold">{propertyDetails.expansionRights}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Deal Cost</p>
                <p className="text-lg font-semibold">${Number(propertyDetails.totalDealCost.replace(/[^0-9.-]+/g, '')).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">NPV @ 8.0%</p>
                <p className="text-lg font-semibold">${Number(propertyDetails.npv.replace(/[^0-9.-]+/g, '')).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Map and Quick Stats */}
          <div className="space-y-6">
            {/* Map placeholder */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-2">Location</h2>
              <div className="h-48 bg-gray-200 rounded-lg relative overflow-hidden">
                <div className="text-center absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">Map of {propertyDetails.address}, {propertyDetails.city}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Financial Summary</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Average Annual Cost</p>
                  <p className="text-xl font-bold">${(2436402).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Cost per SF</p>
                  <p className="text-xl font-bold">${24.36}/SF</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Lease Value</p>
                  <p className="text-xl font-bold">${(14618415).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'lease-metrics' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Key Lease Metrics</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period Ending</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Months in Period</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Rent per RSF</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expenses per RSF</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost per RSF</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Monthly Cost</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Per Annum Total</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cumulative Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaseMetrics.map((metric, index) => (
                  <tr key={index} className={index === 0 ? "bg-gray-50 font-semibold" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.months}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.baseRent.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.expenses.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.totalCost.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.averageMonthlyCost.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.perAnnum.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index === 0 ? '--' : metric.cumulative.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'financial-details' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Annual Financial Detail</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period Ending</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Rent</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Abatement</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Rent</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Over Base Year Stop</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Expenses</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {financialDetails.map((detail, index) => (
                  <tr key={index} className={index === 0 ? "bg-gray-50 font-semibold" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.baseRent.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">({Math.abs(detail.rentAbatement).toLocaleString()})</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.totalRent.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.expenses.baseYearStop.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.expenses.totalExpenses.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Expenses and Credits</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Landlord Credits</td>
                  <td className="px-6 py-4 text-sm text-gray-900"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 pl-10 text-sm text-gray-900">TI Allowance</td>
                  <td className="px-6 py-4 text-sm text-gray-900">({expenseCredits.tiAllowance.toLocaleString()})</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 pl-10 text-sm text-gray-900">Moving Allowance</td>
                  <td className="px-6 py-4 text-sm text-gray-900">({expenseCredits.movingAllowance.toLocaleString()})</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Tenant Cash Outlay</td>
                  <td className="px-6 py-4 text-sm text-gray-900"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 pl-10 text-sm text-gray-900">Moving Expenses</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{expenseCredits.movingExpenses.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 pl-10 text-sm text-gray-900">Total Buildout Cost</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{expenseCredits.totalBuildoutCost.toLocaleString()}</td>
                </tr>
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-6 py-4 text-sm text-gray-900">Total Expenses & Credits</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{expenseCredits.totalExpensesAndCredits.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
} 