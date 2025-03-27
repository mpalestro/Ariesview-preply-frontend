'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Import the property data and lease details from the shared data files
import { propertiesData } from '../data'
import { leaseDetailsData, LeaseDetails, getDefaultLeaseDetails } from '../data/leaseDetails'

interface HistoricalData {
  year: number;
  value: any;
}

// Define an interface for the property data
interface PropertyData {
  id?: string;
  name: string;
  address: string;
  address_line2?: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  description: string;
  status: string;
  construction_year?: number;
  acquisition_date?: string;
  acquisition_price?: number;
  property_type: string;
  property_subtype: string;
  total_building_area_sqft: number;
  floors_count: number;
  units_count?: number;
  building_square_feet?: number;
  living_square_feet?: number;
  stories?: number;
  foundation_type?: string;
  electricity_provider?: string;
  water_provider?: string;
  gas_provider?: string;
  sewer_provider?: string;
  flood_zone?: string;
  flood_zone_map_number?: string;
  flood_insurance_required?: boolean;
  known_issues?: string;
  current_insurance_provider?: string;
  insurance_policy_number?: string;
  insurance_premium_annual?: number;
  insurance_coverage_amount?: number;
  insurance_expiration_date?: string;
  current_market_value?: number;
  cap_rate?: number;
  annual_property_tax?: number;
  notes?: string;
  construction_type?: string;
  roof_type?: string;
  roof_material?: string;
  roof_age?: number;
  external_wall_material?: string;
  property_images: Array<{ url: string; description: string }>;
  floor_plans: Array<{ level: number; url: string; description: string }>;
  sale_history?: any[];
  mortgage_history?: any[];
  demographics?: any;
  capital_improvements?: any[];
  compliance?: any[];
  historical_data?: any;
  cre_investment_details?: any;
  property_details?: any;
  environmental_assessments?: Array<{ assessment_type: string; [key: string]: any }>;
}

// Create a wrapper component that uses useSearchParams
function EditPropertyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const propertyId = searchParams.get('id')

  // Find the property to edit
  const propertyToEdit = propertiesData.find(p => p.id === propertyId)
  const leaseToEdit = propertyId ? leaseDetailsData[propertyId] : null

  // State for form data
  const [propertyData, setPropertyData] = useState<PropertyData>({
    name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'United States',
    description: '',
    status: 'active',
    total_building_area_sqft: 0,
    floors_count: 1,
    units_count: 0,
    building_square_feet: 0,
    living_square_feet: 0,
    stories: 0,
    foundation_type: '',
    electricity_provider: '',
    water_provider: '',
    gas_provider: '',
    sewer_provider: '',
    flood_zone: '',
    flood_zone_map_number: '',
    flood_insurance_required: false,
    known_issues: '',
    current_insurance_provider: '',
    insurance_policy_number: '',
    insurance_premium_annual: 0,
    insurance_coverage_amount: 0,
    insurance_expiration_date: '',
    current_market_value: 0,
    cap_rate: 0,
    annual_property_tax: 0,
    notes: '',
    construction_type: '',
    roof_type: '',
    roof_material: '',
    roof_age: 0,
    external_wall_material: '',
    property_images: [],
    floor_plans: [],
    property_type: '',
    property_subtype: ''
  })

  const [leaseData, setLeaseData] = useState<LeaseDetails>(getDefaultLeaseDetails())
  const [expandedSections, setExpandedSections] = useState({
    basicInfo: true,
    propertyDetails: true,
    location: true,
    buildingFeatures: true,
    utilities: true,
    environmental: true,
    insurance: true,
    financial: true,
    historical: true,
    notes: true,
    creInvestment: true,
    saleHistory: true,
    mortgageHistory: true,
    demographics: true,
    ownerInfo: true,
    capitalImprovements: true,
    compliance: true,
    environmentalAssessments: true
  });

  // Load property data when component mounts
  useEffect(() => {
    if (propertyToEdit) {
      setPropertyData({
        ...propertyData,
        ...propertyToEdit
      })
    }
    if (leaseToEdit) {
      setLeaseData(leaseToEdit)
    }
  }, [propertyToEdit, leaseToEdit])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to update the property
    console.log('Updating property:', propertyData)
    console.log('Updating lease details:', leaseData)
    // Navigate back to property details
    router.push(`/operations-dashboard/properties/property-details?id=${propertyId}`)
  }

  // Handle property data changes
  const handlePropertyChange = (field: keyof PropertyData, value: any) => {
    setPropertyData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle lease data changes
  const handleLeaseChange = (section: keyof typeof leaseData, field: string, value: any) => {
    setLeaseData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!propertyToEdit) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-red-600 text-xl">Property not found</h1>
          <Link href="/operations-dashboard/properties/property-overview" className="text-blue-600 hover:text-blue-800">
            Return to Properties
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => setExpandedSections(prev => Object.keys(prev).reduce((acc, key) => ({ 
                ...acc, 
                [key]: true 
              }), {} as typeof expandedSections))}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              Expand All
            </button>
            <button
              onClick={() => setExpandedSections(prev => Object.keys(prev).reduce((acc, key) => ({ 
                ...acc, 
                [key]: false 
              }), {} as typeof expandedSections))}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              Collapse All
            </button>
            <Link
              href={`/operations-dashboard/properties/property-details?id=${propertyId}`}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('basicInfo')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Basic Information</span>
              <span className="text-gray-400">{expandedSections.basicInfo ? '▼' : '▶'}</span>
            </button>
            {expandedSections.basicInfo && (
              <div className="p-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="property_name" className="block text-sm font-medium text-gray-700">Property Name</label>
                    <input
                      type="text"
                      id="property_name"
                      name="property_name"
                      value={propertyData.name}
                      onChange={(e) => handlePropertyChange('name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="address_line1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
                    <input
                      type="text"
                      id="address_line1"
                      name="address_line1"
                      value={propertyData.address}
                      onChange={(e) => handlePropertyChange('address', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="address_line2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
                    <input
                      type="text"
                      id="address_line2"
                      name="address_line2"
                      value={propertyData.address_line2 || ''}
                      onChange={(e) => handlePropertyChange('address_line2' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={propertyData.city}
                      onChange={(e) => handlePropertyChange('city', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state_province" className="block text-sm font-medium text-gray-700">State/Province</label>
                    <input
                      type="text"
                      id="state_province"
                      name="state_province"
                      value={propertyData.state}
                      onChange={(e) => handlePropertyChange('state', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      value={propertyData.zip_code}
                      onChange={(e) => handlePropertyChange('zip_code', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Property Details Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('propertyDetails')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Property Details</span>
              <span className="text-gray-400">{expandedSections.propertyDetails ? '▼' : '▶'}</span>
            </button>
            {expandedSections.propertyDetails && (
              <div className="p-6 border-t">
                <div className="space-y-6">
                  {/* Property Classification */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Property Classification</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="property_type" className="block text-sm font-medium text-gray-700">Property Type</label>
                        <select
                          id="property_type"
                          name="property_type"
                          value={propertyData.property_type}
                          onChange={(e) => handlePropertyChange('property_type', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select type</option>
                          <option value="OTHER">Other</option>
                          <option value="SINGLE_FAMILY">Single Family</option>
                          <option value="MULTI_FAMILY">Multi Family</option>
                          <option value="COMMERCIAL">Commercial</option>
                          <option value="INDUSTRIAL">Industrial</option>
                          <option value="LAND">Land</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="property_use" className="block text-sm font-medium text-gray-700">Property Use</label>
                        <input
                          type="text"
                          id="property_use"
                          name="property_use"
                          value={propertyData.property_subtype}
                          onChange={(e) => handlePropertyChange('property_subtype', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="units_count" className="block text-sm font-medium text-gray-700">Number of Units</label>
                        <input
                          type="number"
                          id="units_count"
                          name="units_count"
                          value={propertyData.units_count || ''}
                          onChange={(e) => handlePropertyChange('units_count' as keyof PropertyData, parseInt(e.target.value))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Building Details */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Building Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="building_square_feet" className="block text-sm font-medium text-gray-700">Building Square Feet</label>
                        <input
                          type="number"
                          id="building_square_feet"
                          name="building_square_feet"
                          value={propertyData.building_square_feet || ''}
                          onChange={(e) => handlePropertyChange('building_square_feet' as keyof PropertyData, parseInt(e.target.value))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="living_square_feet" className="block text-sm font-medium text-gray-700">Living Square Feet</label>
                        <input
                          type="number"
                          id="living_square_feet"
                          name="living_square_feet"
                          value={propertyData.living_square_feet || ''}
                          onChange={(e) => handlePropertyChange('living_square_feet' as keyof PropertyData, parseInt(e.target.value))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="construction_year" className="block text-sm font-medium text-gray-700">Construction Year</label>
                        <input
                          type="number"
                          id="construction_year"
                          name="construction_year"
                          value={propertyData.construction_year || ''}
                          onChange={(e) => handlePropertyChange('construction_year' as keyof PropertyData, parseInt(e.target.value))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="stories" className="block text-sm font-medium text-gray-700">Number of Stories</label>
                        <input
                          type="number"
                          id="stories"
                          name="stories"
                          value={propertyData.stories || ''}
                          onChange={(e) => handlePropertyChange('stories' as keyof PropertyData, parseInt(e.target.value))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="basement_type" className="block text-sm font-medium text-gray-700">Basement Type</label>
                        <input
                          type="text"
                          id="basement_type"
                          name="basement_type"
                          value={propertyData.property_details?.basement_type || ''}
                          onChange={(e) => handlePropertyChange('property_details', {
                            ...propertyData.property_details,
                            basement_type: e.target.value
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="basement_square_feet" className="block text-sm font-medium text-gray-700">Basement Square Feet</label>
                        <input
                          type="number"
                          id="basement_square_feet"
                          name="basement_square_feet"
                          value={propertyData.property_details?.basement_square_feet || ''}
                          onChange={(e) => handlePropertyChange('property_details', {
                            ...propertyData.property_details,
                            basement_square_feet: parseInt(e.target.value)
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Number of Bathrooms</label>
                        <input
                          type="number"
                          id="bathrooms"
                          name="bathrooms"
                          value={propertyData.property_details?.bathrooms || ''}
                          onChange={(e) => handlePropertyChange('property_details', {
                            ...propertyData.property_details,
                            bathrooms: parseInt(e.target.value)
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Number of Bedrooms</label>
                        <input
                          type="number"
                          id="bedrooms"
                          name="bedrooms"
                          value={propertyData.property_details?.bedrooms || ''}
                          onChange={(e) => handlePropertyChange('property_details', {
                            ...propertyData.property_details,
                            bedrooms: parseInt(e.target.value)
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Building Features Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('buildingFeatures')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Building Features</span>
              <span className="text-gray-400">{expandedSections.buildingFeatures ? '▼' : '▶'}</span>
            </button>
            {expandedSections.buildingFeatures && (
              <div className="p-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="construction_type" className="block text-sm font-medium text-gray-700">Construction Type</label>
                    <input
                      type="text"
                      id="construction_type"
                      name="construction_type"
                      value={propertyData.construction_type || ''}
                      onChange={(e) => handlePropertyChange('construction_type' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="foundation_type" className="block text-sm font-medium text-gray-700">Foundation Type</label>
                    <input
                      type="text"
                      id="foundation_type"
                      name="foundation_type"
                      value={propertyData.foundation_type || ''}
                      onChange={(e) => handlePropertyChange('foundation_type' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="roof_type" className="block text-sm font-medium text-gray-700">Roof Type</label>
                    <input
                      type="text"
                      id="roof_type"
                      name="roof_type"
                      value={propertyData.roof_type || ''}
                      onChange={(e) => handlePropertyChange('roof_type' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="roof_material" className="block text-sm font-medium text-gray-700">Roof Material</label>
                    <input
                      type="text"
                      id="roof_material"
                      name="roof_material"
                      value={propertyData.roof_material || ''}
                      onChange={(e) => handlePropertyChange('roof_material' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="roof_age" className="block text-sm font-medium text-gray-700">Roof Age (years)</label>
                    <input
                      type="number"
                      id="roof_age"
                      name="roof_age"
                      value={propertyData.roof_age || ''}
                      onChange={(e) => handlePropertyChange('roof_age' as keyof PropertyData, parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="external_wall_material" className="block text-sm font-medium text-gray-700">External Wall Material</label>
                    <input
                      type="text"
                      id="external_wall_material"
                      name="external_wall_material"
                      value={propertyData.external_wall_material || ''}
                      onChange={(e) => handlePropertyChange('external_wall_material' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Utilities Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('utilities')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Utilities</span>
              <span className="text-gray-400">{expandedSections.utilities ? '▼' : '▶'}</span>
            </button>
            {expandedSections.utilities && (
              <div className="p-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="electricity_provider" className="block text-sm font-medium text-gray-700">Electricity Provider</label>
                    <input
                      type="text"
                      id="electricity_provider"
                      name="electricity_provider"
                      value={propertyData.electricity_provider || ''}
                      onChange={(e) => handlePropertyChange('electricity_provider' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="water_provider" className="block text-sm font-medium text-gray-700">Water Provider</label>
                    <input
                      type="text"
                      id="water_provider"
                      name="water_provider"
                      value={propertyData.water_provider || ''}
                      onChange={(e) => handlePropertyChange('water_provider' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="gas_provider" className="block text-sm font-medium text-gray-700">Gas Provider</label>
                    <input
                      type="text"
                      id="gas_provider"
                      name="gas_provider"
                      value={propertyData.gas_provider || ''}
                      onChange={(e) => handlePropertyChange('gas_provider' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="sewer_provider" className="block text-sm font-medium text-gray-700">Sewer Provider</label>
                    <input
                      type="text"
                      id="sewer_provider"
                      name="sewer_provider"
                      value={propertyData.sewer_provider || ''}
                      onChange={(e) => handlePropertyChange('sewer_provider' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Environmental Information Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('environmental')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Environmental Information</span>
              <span className="text-gray-400">{expandedSections.environmental ? '▼' : '▶'}</span>
            </button>
            {expandedSections.environmental && (
              <div className="p-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="flood_zone" className="block text-sm font-medium text-gray-700">Flood Zone</label>
                    <input
                      type="text"
                      id="flood_zone"
                      name="flood_zone"
                      value={propertyData.flood_zone || ''}
                      onChange={(e) => handlePropertyChange('flood_zone' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="flood_zone_map_number" className="block text-sm font-medium text-gray-700">Flood Zone Map Number</label>
                    <input
                      type="text"
                      id="flood_zone_map_number"
                      name="flood_zone_map_number"
                      value={propertyData.flood_zone_map_number || ''}
                      onChange={(e) => handlePropertyChange('flood_zone_map_number' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="flood_insurance_required" className="block text-sm font-medium text-gray-700">Flood Insurance Required</label>
                    <input
                      type="checkbox"
                      id="flood_insurance_required"
                      name="flood_insurance_required"
                      checked={propertyData.flood_insurance_required || false}
                      onChange={(e) => handlePropertyChange('flood_insurance_required' as keyof PropertyData, e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="known_issues" className="block text-sm font-medium text-gray-700">Known Issues</label>
                    <textarea
                      id="known_issues"
                      name="known_issues"
                      value={propertyData.known_issues || ''}
                      onChange={(e) => handlePropertyChange('known_issues' as keyof PropertyData, e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Insurance Information Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('insurance')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Insurance Information</span>
              <span className="text-gray-400">{expandedSections.insurance ? '▼' : '▶'}</span>
            </button>
            {expandedSections.insurance && (
              <div className="p-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="current_insurance_provider" className="block text-sm font-medium text-gray-700">Insurance Provider</label>
                    <input
                      type="text"
                      id="current_insurance_provider"
                      name="current_insurance_provider"
                      value={propertyData.current_insurance_provider || ''}
                      onChange={(e) => handlePropertyChange('current_insurance_provider' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="insurance_policy_number" className="block text-sm font-medium text-gray-700">Policy Number</label>
                    <input
                      type="text"
                      id="insurance_policy_number"
                      name="insurance_policy_number"
                      value={propertyData.insurance_policy_number || ''}
                      onChange={(e) => handlePropertyChange('insurance_policy_number' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="insurance_premium_annual" className="block text-sm font-medium text-gray-700">Annual Premium</label>
                    <input
                      type="number"
                      id="insurance_premium_annual"
                      name="insurance_premium_annual"
                      value={propertyData.insurance_premium_annual || ''}
                      onChange={(e) => handlePropertyChange('insurance_premium_annual' as keyof PropertyData, parseFloat(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="insurance_coverage_amount" className="block text-sm font-medium text-gray-700">Coverage Amount</label>
                    <input
                      type="number"
                      id="insurance_coverage_amount"
                      name="insurance_coverage_amount"
                      value={propertyData.insurance_coverage_amount || ''}
                      onChange={(e) => handlePropertyChange('insurance_coverage_amount' as keyof PropertyData, parseFloat(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="insurance_expiration_date" className="block text-sm font-medium text-gray-700">Expiration Date</label>
                    <input
                      type="date"
                      id="insurance_expiration_date"
                      name="insurance_expiration_date"
                      value={propertyData.insurance_expiration_date || ''}
                      onChange={(e) => handlePropertyChange('insurance_expiration_date' as keyof PropertyData, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Financial Information Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('financial')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Financial Information</span>
              <span className="text-gray-400">{expandedSections.financial ? '▼' : '▶'}</span>
            </button>
            {expandedSections.financial && (
              <div className="p-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="current_market_value" className="block text-sm font-medium text-gray-700">Current Market Value</label>
                    <input
                      type="number"
                      id="current_market_value"
                      name="current_market_value"
                      value={propertyData.current_market_value || ''}
                      onChange={(e) => handlePropertyChange('current_market_value' as keyof PropertyData, parseFloat(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="cap_rate" className="block text-sm font-medium text-gray-700">Cap Rate (%)</label>
                    <input
                      type="number"
                      id="cap_rate"
                      name="cap_rate"
                      value={propertyData.cap_rate || ''}
                      onChange={(e) => handlePropertyChange('cap_rate' as keyof PropertyData, parseFloat(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="annual_property_tax" className="block text-sm font-medium text-gray-700">Annual Property Tax</label>
                    <input
                      type="number"
                      id="annual_property_tax"
                      name="annual_property_tax"
                      value={propertyData.annual_property_tax || ''}
                      onChange={(e) => handlePropertyChange('annual_property_tax' as keyof PropertyData, parseFloat(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Historical Data Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('historical')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Historical Data (Last 5 Years)</span>
              <span className="text-gray-400">{expandedSections.historical ? '▼' : '▶'}</span>
            </button>
            {expandedSections.historical && (
              <div className="p-6 border-t">
                <div className="space-y-6">
                  {/* Market Value History */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Market Value History</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {[1, 2, 3, 4, 5].map((year) => (
                        <div key={year}>
                          <label className="block text-sm font-medium text-gray-700">{year} Year(s) Ago</label>
                          <input
                            type="number"
                            title={`Market value ${year} years ago`}
                            placeholder={`Enter market value for ${year} years ago`}
                            value={propertyData.historical_data?.market_value?.find((h: HistoricalData) => h.year === new Date().getFullYear() - year)?.value || ''}
                            onChange={(e) => {
                              const newValue = parseFloat(e.target.value);
                              const updatedHistory = [...(propertyData.historical_data?.market_value || [])];
                              const index = updatedHistory.findIndex((h: HistoricalData) => h.year === new Date().getFullYear() - year);
                              if (index >= 0) {
                                updatedHistory[index].value = newValue;
                              } else {
                                updatedHistory.push({ year: new Date().getFullYear() - year, value: newValue });
                              }
                              handlePropertyChange('historical_data', {
                                ...propertyData.historical_data,
                                market_value: updatedHistory
                              });
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Property Tax History */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Property Tax History</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {[1, 2, 3, 4, 5].map((year) => (
                        <div key={year}>
                          <label className="block text-sm font-medium text-gray-700">{year} Year(s) Ago</label>
                          <input
                            type="number"
                            title={`Property tax ${year} years ago`}
                            placeholder={`Enter property tax for ${year} years ago`}
                            value={propertyData.historical_data?.property_tax?.find((h: HistoricalData) => h.year === new Date().getFullYear() - year)?.value || ''}
                            onChange={(e) => {
                              const newValue = parseFloat(e.target.value);
                              const updatedHistory = [...(propertyData.historical_data?.property_tax || [])];
                              const index = updatedHistory.findIndex((h: HistoricalData) => h.year === new Date().getFullYear() - year);
                              if (index >= 0) {
                                updatedHistory[index].value = newValue;
                              } else {
                                updatedHistory.push({ year: new Date().getFullYear() - year, value: newValue });
                              }
                              handlePropertyChange('historical_data', {
                                ...propertyData.historical_data,
                                property_tax: updatedHistory
                              });
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insurance Premium History */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Insurance Premium History</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {[1, 2, 3, 4, 5].map((year) => (
                        <div key={year}>
                          <label className="block text-sm font-medium text-gray-700">{year} Year(s) Ago</label>
                          <input
                            type="number"
                            title={`Insurance premium ${year} years ago`}
                            placeholder={`Enter insurance premium for ${year} years ago`}
                            value={propertyData.historical_data?.insurance_premium?.find((h: HistoricalData) => h.year === new Date().getFullYear() - year)?.value || ''}
                            onChange={(e) => {
                              const newValue = parseFloat(e.target.value);
                              const updatedHistory = [...(propertyData.historical_data?.insurance_premium || [])];
                              const index = updatedHistory.findIndex((h: HistoricalData) => h.year === new Date().getFullYear() - year);
                              if (index >= 0) {
                                updatedHistory[index].value = newValue;
                              } else {
                                updatedHistory.push({ year: new Date().getFullYear() - year, value: newValue });
                              }
                              handlePropertyChange('historical_data', {
                                ...propertyData.historical_data,
                                insurance_premium: updatedHistory
                              });
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Notes Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('notes')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Additional Notes</span>
              <span className="text-gray-400">{expandedSections.notes ? '▼' : '▶'}</span>
            </button>
            {expandedSections.notes && (
              <div className="p-6 border-t">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={propertyData.notes || ''}
                      onChange={(e) => handlePropertyChange('notes' as keyof PropertyData, e.target.value)}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CRE Investment Details Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('creInvestment')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>CRE Investment Details</span>
              <span className="text-gray-400">{expandedSections.creInvestment ? '▼' : '▶'}</span>
            </button>
            {expandedSections.creInvestment && (
              <div className="p-6 border-t">
                <div className="space-y-6">
                  {/* Property Type and Classification */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Property Classification</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="property_type" className="block text-sm font-medium text-gray-700">Property Type</label>
                        <select
                          id="property_type"
                          name="property_type"
                          value={propertyData.cre_investment_details?.property_type || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            property_type: e.target.value
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select type</option>
                          <option value="Office">Office</option>
                          <option value="Retail">Retail</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Multifamily">Multifamily</option>
                          <option value="Mixed Use">Mixed Use</option>
                          <option value="Land">Land</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="sub_type" className="block text-sm font-medium text-gray-700">Sub Type</label>
                        <input
                          type="text"
                          id="sub_type"
                          name="sub_type"
                          value={propertyData.cre_investment_details?.sub_type || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            sub_type: e.target.value
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tenant Information */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Tenant Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="occupancy_rate" className="block text-sm font-medium text-gray-700">Occupancy Rate (%)</label>
                        <input
                          type="number"
                          id="occupancy_rate"
                          name="occupancy_rate"
                          value={propertyData.cre_investment_details?.occupancy_rate || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            occupancy_rate: parseFloat(e.target.value)
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="weighted_average_lease_term" className="block text-sm font-medium text-gray-700">Weighted Average Lease Term (years)</label>
                        <input
                          type="number"
                          id="weighted_average_lease_term"
                          name="weighted_average_lease_term"
                          value={propertyData.cre_investment_details?.weighted_average_lease_term || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            weighted_average_lease_term: parseFloat(e.target.value)
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Financial Metrics */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Financial Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="net_operating_income" className="block text-sm font-medium text-gray-700">Net Operating Income (NOI)</label>
                        <input
                          type="number"
                          id="net_operating_income"
                          name="net_operating_income"
                          value={propertyData.cre_investment_details?.net_operating_income || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            net_operating_income: parseFloat(e.target.value)
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="debt_service_coverage_ratio" className="block text-sm font-medium text-gray-700">Debt Service Coverage Ratio</label>
                        <input
                          type="number"
                          id="debt_service_coverage_ratio"
                          name="debt_service_coverage_ratio"
                          value={propertyData.cre_investment_details?.debt_service_coverage_ratio || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            debt_service_coverage_ratio: parseFloat(e.target.value)
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="loan_to_value_ratio" className="block text-sm font-medium text-gray-700">Loan to Value Ratio (%)</label>
                        <input
                          type="number"
                          id="loan_to_value_ratio"
                          name="loan_to_value_ratio"
                          value={propertyData.cre_investment_details?.loan_to_value_ratio || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            loan_to_value_ratio: parseFloat(e.target.value)
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Current Debt Information */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Current Debt Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="current_debt_lender" className="block text-sm font-medium text-gray-700">Lender</label>
                        <input
                          type="text"
                          id="current_debt_lender"
                          name="current_debt_lender"
                          value={propertyData.cre_investment_details?.current_debt?.lender || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            current_debt: {
                              ...propertyData.cre_investment_details?.current_debt,
                              lender: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="current_debt_amount" className="block text-sm font-medium text-gray-700">Debt Amount</label>
                        <input
                          type="number"
                          id="current_debt_amount"
                          name="current_debt_amount"
                          value={propertyData.cre_investment_details?.current_debt?.amount || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            current_debt: {
                              ...propertyData.cre_investment_details?.current_debt,
                              amount: parseFloat(e.target.value)
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="current_debt_interest_rate" className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                        <input
                          type="number"
                          id="current_debt_interest_rate"
                          name="current_debt_interest_rate"
                          value={propertyData.cre_investment_details?.current_debt?.interest_rate || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            current_debt: {
                              ...propertyData.cre_investment_details?.current_debt,
                              interest_rate: parseFloat(e.target.value)
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="current_debt_maturity_date" className="block text-sm font-medium text-gray-700">Maturity Date</label>
                        <input
                          type="date"
                          id="current_debt_maturity_date"
                          name="current_debt_maturity_date"
                          value={propertyData.cre_investment_details?.current_debt?.maturity_date || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            current_debt: {
                              ...propertyData.cre_investment_details?.current_debt,
                              maturity_date: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Market Analysis */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Market Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="market_class" className="block text-sm font-medium text-gray-700">Market Class</label>
                        <select
                          id="market_class"
                          name="market_class"
                          value={propertyData.cre_investment_details?.market_analysis?.market_class || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            market_analysis: {
                              ...propertyData.cre_investment_details?.market_analysis,
                              market_class: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select class</option>
                          <option value="Primary">Primary</option>
                          <option value="Secondary">Secondary</option>
                          <option value="Tertiary">Tertiary</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="market_cycle_stage" className="block text-sm font-medium text-gray-700">Market Cycle Stage</label>
                        <select
                          id="market_cycle_stage"
                          name="market_cycle_stage"
                          value={propertyData.cre_investment_details?.market_analysis?.market_cycle_stage || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            market_analysis: {
                              ...propertyData.cre_investment_details?.market_analysis,
                              market_cycle_stage: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select stage</option>
                          <option value="Recovery">Recovery</option>
                          <option value="Expansion">Expansion</option>
                          <option value="Hyper Supply">Hyper Supply</option>
                          <option value="Recession">Recession</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="absorption_rate" className="block text-sm font-medium text-gray-700">Absorption Rate (%)</label>
                        <input
                          type="number"
                          id="absorption_rate"
                          name="absorption_rate"
                          value={propertyData.cre_investment_details?.market_analysis?.absorption_rate || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            market_analysis: {
                              ...propertyData.cre_investment_details?.market_analysis,
                              absorption_rate: parseFloat(e.target.value)
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="vacancy_rate" className="block text-sm font-medium text-gray-700">Vacancy Rate (%)</label>
                        <input
                          type="number"
                          id="vacancy_rate"
                          name="vacancy_rate"
                          value={propertyData.cre_investment_details?.market_analysis?.vacancy_rate || ''}
                          onChange={(e) => handlePropertyChange('cre_investment_details', {
                            ...propertyData.cre_investment_details,
                            market_analysis: {
                              ...propertyData.cre_investment_details?.market_analysis,
                              vacancy_rate: parseFloat(e.target.value)
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sale History Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('saleHistory')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Sale History</span>
              <span className="text-gray-400">{expandedSections.saleHistory ? '▼' : '▶'}</span>
            </button>
            {expandedSections.saleHistory && (
              <div className="p-6 border-t">
                <div className="space-y-4">
                  {propertyData.sale_history?.map((sale, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Sale #{index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={`sale_date_${index}`} className="block text-sm font-medium text-gray-700">Sale Date</label>
                          <input
                            type="date"
                            id={`sale_date_${index}`}
                            name={`sale_date_${index}`}
                            value={sale.sale_date || ''}
                            onChange={(e) => {
                              const newHistory = [...(propertyData.sale_history || [])];
                              newHistory[index] = { ...sale, sale_date: e.target.value };
                              handlePropertyChange('sale_history', newHistory);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`sale_amount_${index}`} className="block text-sm font-medium text-gray-700">Sale Amount</label>
                          <input
                            type="number"
                            id={`sale_amount_${index}`}
                            name={`sale_amount_${index}`}
                            value={sale.sale_amount || ''}
                            onChange={(e) => {
                              const newHistory = [...(propertyData.sale_history || [])];
                              newHistory[index] = { ...sale, sale_amount: parseFloat(e.target.value) };
                              handlePropertyChange('sale_history', newHistory);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`buyer_names_${index}`} className="block text-sm font-medium text-gray-700">Buyer Names</label>
                          <input
                            type="text"
                            id={`buyer_names_${index}`}
                            name={`buyer_names_${index}`}
                            value={sale.buyer_names || ''}
                            onChange={(e) => {
                              const newHistory = [...(propertyData.sale_history || [])];
                              newHistory[index] = { ...sale, buyer_names: e.target.value };
                              handlePropertyChange('sale_history', newHistory);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`seller_names_${index}`} className="block text-sm font-medium text-gray-700">Seller Names</label>
                          <input
                            type="text"
                            id={`seller_names_${index}`}
                            name={`seller_names_${index}`}
                            value={sale.seller_names || ''}
                            onChange={(e) => {
                              const newHistory = [...(propertyData.sale_history || [])];
                              newHistory[index] = { ...sale, seller_names: e.target.value };
                              handlePropertyChange('sale_history', newHistory);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mortgage History Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('mortgageHistory')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Mortgage History</span>
              <span className="text-gray-400">{expandedSections.mortgageHistory ? '▼' : '▶'}</span>
            </button>
            {expandedSections.mortgageHistory && (
              <div className="p-6 border-t">
                <div className="space-y-4">
                  {propertyData.mortgage_history?.map((mortgage, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Mortgage #{index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={`mortgage_amount_${index}`} className="block text-sm font-medium text-gray-700">Amount</label>
                          <input
                            type="number"
                            id={`mortgage_amount_${index}`}
                            name={`mortgage_amount_${index}`}
                            value={mortgage.amount || ''}
                            onChange={(e) => {
                              const newHistory = [...(propertyData.mortgage_history || [])];
                              newHistory[index] = { ...mortgage, amount: parseFloat(e.target.value) };
                              handlePropertyChange('mortgage_history', newHistory);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`mortgage_lender_${index}`} className="block text-sm font-medium text-gray-700">Lender Name</label>
                          <input
                            type="text"
                            id={`mortgage_lender_${index}`}
                            name={`mortgage_lender_${index}`}
                            value={mortgage.lender_name || ''}
                            onChange={(e) => {
                              const newHistory = [...(propertyData.mortgage_history || [])];
                              newHistory[index] = { ...mortgage, lender_name: e.target.value };
                              handlePropertyChange('mortgage_history', newHistory);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`mortgage_interest_rate_${index}`} className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                          <input
                            type="number"
                            id={`mortgage_interest_rate_${index}`}
                            name={`mortgage_interest_rate_${index}`}
                            value={mortgage.interest_rate || ''}
                            onChange={(e) => {
                              const newHistory = [...(propertyData.mortgage_history || [])];
                              newHistory[index] = { ...mortgage, interest_rate: parseFloat(e.target.value) };
                              handlePropertyChange('mortgage_history', newHistory);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`mortgage_maturity_date_${index}`} className="block text-sm font-medium text-gray-700">Maturity Date</label>
                          <input
                            type="date"
                            id={`mortgage_maturity_date_${index}`}
                            name={`mortgage_maturity_date_${index}`}
                            value={mortgage.maturity_date || ''}
                            onChange={(e) => {
                              const newHistory = [...(propertyData.mortgage_history || [])];
                              newHistory[index] = { ...mortgage, maturity_date: e.target.value };
                              handlePropertyChange('mortgage_history', newHistory);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Demographics Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('demographics')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Demographics</span>
              <span className="text-gray-400">{expandedSections.demographics ? '▼' : '▶'}</span>
            </button>
            {expandedSections.demographics && (
              <div className="p-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hud_area_name" className="block text-sm font-medium text-gray-700">HUD Area Name</label>
                    <input
                      type="text"
                      id="hud_area_name"
                      name="hud_area_name"
                      value={propertyData.demographics?.hud_area_name || ''}
                      onChange={(e) => handlePropertyChange('demographics', {
                        ...propertyData.demographics,
                        hud_area_name: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="median_income" className="block text-sm font-medium text-gray-700">Median Income</label>
                    <input
                      type="text"
                      id="median_income"
                      name="median_income"
                      value={propertyData.demographics?.median_income || ''}
                      onChange={(e) => handlePropertyChange('demographics', {
                        ...propertyData.demographics,
                        median_income: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="fmr_year" className="block text-sm font-medium text-gray-700">FMR Year</label>
                    <input
                      type="text"
                      id="fmr_year"
                      name="fmr_year"
                      value={propertyData.demographics?.fmr_year || ''}
                      onChange={(e) => handlePropertyChange('demographics', {
                        ...propertyData.demographics,
                        fmr_year: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="suggested_rent" className="block text-sm font-medium text-gray-700">Suggested Rent</label>
                    <input
                      type="text"
                      id="suggested_rent"
                      name="suggested_rent"
                      value={propertyData.demographics?.suggested_rent || ''}
                      onChange={(e) => handlePropertyChange('demographics', {
                        ...propertyData.demographics,
                        suggested_rent: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Capital Improvements Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('capitalImprovements')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Capital Improvements</span>
              <span className="text-gray-400">{expandedSections.capitalImprovements ? '▼' : '▶'}</span>
            </button>
            {expandedSections.capitalImprovements && (
              <div className="p-6 border-t">
                <div className="space-y-6">
                  {propertyData.capital_improvements?.map((improvement, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-md font-medium text-gray-900">Improvement #{index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newImprovements = [...(propertyData.capital_improvements || [])];
                            newImprovements.splice(index, 1);
                            handlePropertyChange('capital_improvements', newImprovements);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={`improvement_type_${index}`} className="block text-sm font-medium text-gray-700">Improvement Type</label>
                          <input
                            type="text"
                            id={`improvement_type_${index}`}
                            name={`improvement_type_${index}`}
                            value={improvement.improvement_type}
                            title="Type of improvement"
                            placeholder="Enter improvement type"
                            onChange={(e) => {
                              const newImprovements = [...(propertyData.capital_improvements || [])];
                              newImprovements[index] = {
                                ...improvement,
                                improvement_type: e.target.value
                              };
                              handlePropertyChange('capital_improvements', newImprovements);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`description_${index}`} className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            id={`description_${index}`}
                            name={`description_${index}`}
                            value={improvement.description}
                            title="Description of improvement"
                            placeholder="Enter improvement description"
                            onChange={(e) => {
                              const newImprovements = [...(propertyData.capital_improvements || [])];
                              newImprovements[index] = {
                                ...improvement,
                                description: e.target.value
                              };
                              handlePropertyChange('capital_improvements', newImprovements);
                            }}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`start_date_${index}`} className="block text-sm font-medium text-gray-700">Start Date</label>
                          <input
                            type="date"
                            id={`start_date_${index}`}
                            name={`start_date_${index}`}
                            value={improvement.start_date || ''}
                            onChange={(e) => {
                              const newImprovements = [...(propertyData.capital_improvements || [])];
                              newImprovements[index] = {
                                ...improvement,
                                start_date: e.target.value
                              };
                              handlePropertyChange('capital_improvements', newImprovements);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`completion_date_${index}`} className="block text-sm font-medium text-gray-700">Completion Date</label>
                          <input
                            type="date"
                            id={`completion_date_${index}`}
                            name={`completion_date_${index}`}
                            value={improvement.completion_date || ''}
                            onChange={(e) => {
                              const newImprovements = [...(propertyData.capital_improvements || [])];
                              newImprovements[index] = {
                                ...improvement,
                                completion_date: e.target.value
                              };
                              handlePropertyChange('capital_improvements', newImprovements);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`status_${index}`} className="block text-sm font-medium text-gray-700">Status</label>
                          <input
                            type="text"
                            id={`status_${index}`}
                            name={`status_${index}`}
                            value={improvement.status}
                            title="Status of improvement"
                            placeholder="Enter improvement status"
                            onChange={(e) => {
                              const newImprovements = [...(propertyData.capital_improvements || [])];
                              newImprovements[index] = {
                                ...improvement,
                                status: e.target.value
                              };
                              handlePropertyChange('capital_improvements', newImprovements);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`budget_amount_${index}`} className="block text-sm font-medium text-gray-700">Budget Amount</label>
                          <input
                            type="number"
                            id={`budget_amount_${index}`}
                            name={`budget_amount_${index}`}
                            value={improvement.budget_amount || ''}
                            onChange={(e) => {
                              const newImprovements = [...(propertyData.capital_improvements || [])];
                              newImprovements[index] = {
                                ...improvement,
                                budget_amount: parseFloat(e.target.value)
                              };
                              handlePropertyChange('capital_improvements', newImprovements);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newImprovement = {
                        improvement_type: '',
                        description: '',
                        start_date: '',
                        completion_date: '',
                        status: '',
                        budget_amount: 0,
                        actual_cost: 0,
                        contractor_name: '',
                        contractor_contact: '',
                        scope_of_work: '',
                        affected_areas: [],
                        permits_required: false,
                        permit_numbers: [],
                        documents: [],
                        photos: [],
                        expected_useful_life_years: 0,
                        depreciation_method: '',
                        depreciation_start_date: '',
                        tax_implications: '',
                        value_added: 0,
                        roi_percentage: 0,
                        funding_source: '',
                        capitalized: false,
                        warranty_information: '',
                        warranty_expiration_date: '',
                        maintenance_requirements: '',
                        notes: ''
                      };
                      handlePropertyChange('capital_improvements', [
                        ...(propertyData.capital_improvements || []),
                        newImprovement
                      ]);
                    }}
                    className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Add Improvement
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Compliance Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('compliance')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Compliance</span>
              <span className="text-gray-400">{expandedSections.compliance ? '▼' : '▶'}</span>
            </button>
            {expandedSections.compliance && (
              <div className="p-6 border-t">
                <div className="space-y-6">
                  {propertyData.compliance?.map((record, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-md font-medium text-gray-900">Compliance Record #{index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newRecords = [...(propertyData.compliance || [])];
                            newRecords.splice(index, 1);
                            handlePropertyChange('compliance', newRecords);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={`compliance_type_${index}`} className="block text-sm font-medium text-gray-700">Compliance Type</label>
                          <input
                            type="text"
                            id={`compliance_type_${index}`}
                            name={`compliance_type_${index}`}
                            value={record.compliance_type}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                compliance_type: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`regulation_name_${index}`} className="block text-sm font-medium text-gray-700">Regulation Name</label>
                          <input
                            type="text"
                            id={`regulation_name_${index}`}
                            name={`regulation_name_${index}`}
                            value={record.regulation_name}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                regulation_name: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`governing_body_${index}`} className="block text-sm font-medium text-gray-700">Governing Body</label>
                          <input
                            type="text"
                            id={`governing_body_${index}`}
                            name={`governing_body_${index}`}
                            value={record.governing_body}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                governing_body: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`compliance_status_${index}`} className="block text-sm font-medium text-gray-700">Compliance Status</label>
                          <input
                            type="text"
                            id={`compliance_status_${index}`}
                            name={`compliance_status_${index}`}
                            value={record.compliance_status}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                compliance_status: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`compliance_details_${index}`} className="block text-sm font-medium text-gray-700">Compliance Details</label>
                          <textarea
                            id={`compliance_details_${index}`}
                            name={`compliance_details_${index}`}
                            value={record.compliance_details}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                compliance_details: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`due_date_${index}`} className="block text-sm font-medium text-gray-700">Due Date</label>
                          <input
                            type="date"
                            id={`due_date_${index}`}
                            name={`due_date_${index}`}
                            value={record.due_date || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                due_date: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`last_inspection_date_${index}`} className="block text-sm font-medium text-gray-700">Last Inspection Date</label>
                          <input
                            type="date"
                            id={`last_inspection_date_${index}`}
                            name={`last_inspection_date_${index}`}
                            value={record.last_inspection_date || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                last_inspection_date: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`next_inspection_date_${index}`} className="block text-sm font-medium text-gray-700">Next Inspection Due</label>
                          <input
                            type="date"
                            id={`next_inspection_date_${index}`}
                            name={`next_inspection_date_${index}`}
                            value={record.next_inspection_due || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                next_inspection_due: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`inspection_frequency_${index}`} className="block text-sm font-medium text-gray-700">Inspection Frequency</label>
                          <input
                            type="text"
                            id={`inspection_frequency_${index}`}
                            name={`inspection_frequency_${index}`}
                            value={record.inspection_frequency || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                inspection_frequency: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`requirements_${index}`} className="block text-sm font-medium text-gray-700">Requirements</label>
                          <textarea
                            id={`requirements_${index}`}
                            name={`requirements_${index}`}
                            value={record.requirements || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                requirements: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`exemption_details_${index}`} className="block text-sm font-medium text-gray-700">Exemption Details</label>
                          <textarea
                            id={`exemption_details_${index}`}
                            name={`exemption_details_${index}`}
                            value={record.exemption_details || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                exemption_details: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`violations_${index}`} className="block text-sm font-medium text-gray-700">Violations</label>
                          <textarea
                            id={`violations_${index}`}
                            name={`violations_${index}`}
                            value={record.violations || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                violations: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`violation_severity_${index}`} className="block text-sm font-medium text-gray-700">Violation Severity</label>
                          <input
                            type="text"
                            id={`violation_severity_${index}`}
                            name={`violation_severity_${index}`}
                            value={record.violation_severity || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                violation_severity: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`violation_date_${index}`} className="block text-sm font-medium text-gray-700">Violation Date</label>
                          <input
                            type="date"
                            id={`violation_date_${index}`}
                            name={`violation_date_${index}`}
                            value={record.violation_date || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                violation_date: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`citation_number_${index}`} className="block text-sm font-medium text-gray-700">Citation Number</label>
                          <input
                            type="text"
                            id={`citation_number_${index}`}
                            name={`citation_number_${index}`}
                            value={record.citation_number || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                citation_number: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`fine_amount_${index}`} className="block text-sm font-medium text-gray-700">Fine Amount</label>
                          <input
                            type="number"
                            id={`fine_amount_${index}`}
                            name={`fine_amount_${index}`}
                            value={record.fine_amount || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                fine_amount: parseFloat(e.target.value)
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`fine_paid_date_${index}`} className="block text-sm font-medium text-gray-700">Fine Paid Date</label>
                          <input
                            type="date"
                            id={`fine_paid_date_${index}`}
                            name={`fine_paid_date_${index}`}
                            value={record.fine_paid_date || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                fine_paid_date: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`remediation_plan_${index}`} className="block text-sm font-medium text-gray-700">Remediation Plan</label>
                          <textarea
                            id={`remediation_plan_${index}`}
                            name={`remediation_plan_${index}`}
                            value={record.remediation_plan || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                remediation_plan: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`remediation_deadline_${index}`} className="block text-sm font-medium text-gray-700">Remediation Deadline</label>
                          <input
                            type="date"
                            id={`remediation_deadline_${index}`}
                            name={`remediation_deadline_${index}`}
                            value={record.remediation_deadline || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                remediation_deadline: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`remediation_cost_${index}`} className="block text-sm font-medium text-gray-700">Remediation Cost</label>
                          <input
                            type="number"
                            id={`remediation_cost_${index}`}
                            name={`remediation_cost_${index}`}
                            value={record.remediation_cost || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                remediation_cost: parseFloat(e.target.value)
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`remediation_status_${index}`} className="block text-sm font-medium text-gray-700">Remediation Status</label>
                          <input
                            type="text"
                            id={`remediation_status_${index}`}
                            name={`remediation_status_${index}`}
                            value={record.remediation_status || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                remediation_status: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`remediation_completion_date_${index}`} className="block text-sm font-medium text-gray-700">Remediation Completion Date</label>
                          <input
                            type="date"
                            id={`remediation_completion_date_${index}`}
                            name={`remediation_completion_date_${index}`}
                            value={record.remediation_completion_date || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                remediation_completion_date: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`compliance_documents_${index}`} className="block text-sm font-medium text-gray-700">Compliance Documents</label>
                          <textarea
                            id={`compliance_documents_${index}`}
                            name={`compliance_documents_${index}`}
                            value={record.compliance_documents?.join('\n') || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                compliance_documents: e.target.value.split('\n')
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`inspector_name_${index}`} className="block text-sm font-medium text-gray-700">Inspector Name</label>
                          <input
                            type="text"
                            id={`inspector_name_${index}`}
                            name={`inspector_name_${index}`}
                            value={record.inspector_name || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                inspector_name: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`inspector_contact_${index}`} className="block text-sm font-medium text-gray-700">Inspector Contact</label>
                          <input
                            type="text"
                            id={`inspector_contact_${index}`}
                            name={`inspector_contact_${index}`}
                            value={record.inspector_contact || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                inspector_contact: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`legal_counsel_${index}`} className="block text-sm font-medium text-gray-700">Legal Counsel</label>
                          <input
                            type="text"
                            id={`legal_counsel_${index}`}
                            name={`legal_counsel_${index}`}
                            value={record.legal_counsel || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                legal_counsel: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`legal_status_${index}`} className="block text-sm font-medium text-gray-700">Legal Status</label>
                          <input
                            type="text"
                            id={`legal_status_${index}`}
                            name={`legal_status_${index}`}
                            value={record.legal_status || ''}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                legal_status: e.target.value
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`recurring_compliance_${index}`} className="block text-sm font-medium text-gray-700">Recurring Compliance</label>
                          <input
                            type="checkbox"
                            id={`recurring_compliance_${index}`}
                            name={`recurring_compliance_${index}`}
                            checked={record.recurring_compliance}
                            onChange={(e) => {
                              const newRecords = [...(propertyData.compliance || [])];
                              newRecords[index] = {
                                ...record,
                                recurring_compliance: e.target.checked
                              };
                              handlePropertyChange('compliance', newRecords);
                            }}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Environmental Assessments Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection('environmentalAssessments')}
              className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>Environmental Assessments</span>
              <span className="text-gray-400">{expandedSections.environmentalAssessments ? '▼' : '▶'}</span>
            </button>
            {expandedSections.environmentalAssessments && (
              <div className="p-6 border-t">
                <div className="space-y-6">
                  {propertyData.environmental_assessments?.map((assessment, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-md font-medium text-gray-900">Assessment #{index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newAssessments = [...(propertyData.environmental_assessments || [])];
                            newAssessments.splice(index, 1);
                            handlePropertyChange('environmental_assessments', newAssessments);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={`assessment_type_${index}`} className="block text-sm font-medium text-gray-700">Assessment Type</label>
                          <select
                            id={`assessment_type_${index}`}
                            name={`assessment_type_${index}`}
                            value={assessment.assessment_type}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                assessment_type: e.target.value
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="">Select type</option>
                            <option value="Phase I ESA">Phase I ESA</option>
                            <option value="Phase II ESA">Phase II ESA</option>
                            <option value="Phase III ESA">Phase III ESA</option>
                            <option value="Soil Testing">Soil Testing</option>
                            <option value="Water Quality">Water Quality</option>
                            <option value="Air Quality">Air Quality</option>
                            <option value="Asbestos">Asbestos</option>
                            <option value="Lead">Lead</option>
                            <option value="Mold">Mold</option>
                            <option value="Radon">Radon</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor={`assessment_date_${index}`} className="block text-sm font-medium text-gray-700">Assessment Date</label>
                          <input
                            type="date"
                            id={`assessment_date_${index}`}
                            name={`assessment_date_${index}`}
                            value={assessment.assessment_date}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                assessment_date: e.target.value
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`assessment_company_${index}`} className="block text-sm font-medium text-gray-700">Assessment Company</label>
                          <input
                            type="text"
                            id={`assessment_company_${index}`}
                            name={`assessment_company_${index}`}
                            value={assessment.assessment_company}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                assessment_company: e.target.value
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`lead_assessor_${index}`} className="block text-sm font-medium text-gray-700">Lead Assessor</label>
                          <input
                            type="text"
                            id={`lead_assessor_${index}`}
                            name={`lead_assessor_${index}`}
                            value={assessment.lead_assessor}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                lead_assessor: e.target.value
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`assessor_credentials_${index}`} className="block text-sm font-medium text-gray-700">Assessor Credentials</label>
                          <input
                            type="text"
                            id={`assessor_credentials_${index}`}
                            name={`assessor_credentials_${index}`}
                            value={assessment.assessor_credentials}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                assessor_credentials: e.target.value
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor={`assessment_scope_${index}`} className="block text-sm font-medium text-gray-700">Assessment Scope</label>
                          <textarea
                            id={`assessment_scope_${index}`}
                            name={`assessment_scope_${index}`}
                            value={assessment.assessment_scope}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                assessment_scope: e.target.value
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor={`findings_${index}`} className="block text-sm font-medium text-gray-700">Findings</label>
                          <textarea
                            id={`findings_${index}`}
                            name={`findings_${index}`}
                            value={assessment.findings}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                findings: e.target.value
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor={`recommendations_${index}`} className="block text-sm font-medium text-gray-700">Recommendations</label>
                          <textarea
                            id={`recommendations_${index}`}
                            name={`recommendations_${index}`}
                            value={assessment.recommendations}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                recommendations: e.target.value
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`risk_level_${index}`} className="block text-sm font-medium text-gray-700">Risk Level</label>
                          <select
                            id={`risk_level_${index}`}
                            name={`risk_level_${index}`}
                            value={assessment.risk_level}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                risk_level: e.target.value
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="">Select risk level</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor={`estimated_remediation_cost_${index}`} className="block text-sm font-medium text-gray-700">Estimated Remediation Cost</label>
                          <input
                            type="number"
                            id={`estimated_remediation_cost_${index}`}
                            name={`estimated_remediation_cost_${index}`}
                            value={assessment.estimated_remediation_cost}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                estimated_remediation_cost: parseFloat(e.target.value)
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`next_assessment_due_${index}`} className="block text-sm font-medium text-gray-700">Next Assessment Due</label>
                          <input
                            type="date"
                            id={`next_assessment_due_${index}`}
                            name={`next_assessment_due_${index}`}
                            value={assessment.next_assessment_due}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                next_assessment_due: e.target.value
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`report_file_${index}`} className="block text-sm font-medium text-gray-700">Report File</label>
                          <input
                            type="text"
                            id={`report_file_${index}`}
                            name={`report_file_${index}`}
                            value={assessment.report_file}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                report_file: e.target.value
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor={`notes_${index}`} className="block text-sm font-medium text-gray-700">Notes</label>
                          <textarea
                            id={`notes_${index}`}
                            name={`notes_${index}`}
                            value={assessment.notes}
                            onChange={(e) => {
                              const newAssessments = [...(propertyData.environmental_assessments || [])];
                              newAssessments[index] = {
                                ...assessment,
                                notes: e.target.value
                              };
                              handlePropertyChange('environmental_assessments', newAssessments);
                            }}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newAssessment = {
                        assessment_type: '',
                        assessment_date: '',
                        assessment_company: '',
                        lead_assessor: '',
                        assessor_credentials: '',
                        assessment_scope: '',
                        findings: '',
                        recommendations: '',
                        risk_level: '',
                        estimated_remediation_cost: 0,
                        next_assessment_due: '',
                        report_file: '',
                        notes: ''
                      };
                      handlePropertyChange('environmental_assessments', [
                        ...(propertyData.environmental_assessments || []),
                        newAssessment
                      ]);
                    }}
                    className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Add Environmental Assessment
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 mt-6">
            <Link
              href={`/operations-dashboard/properties/property-details?id=${propertyId}`}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main component with Suspense
export default function EditProperty() {
  return (
    <Suspense fallback={<div className="p-4">Loading property editor...</div>}>
      <EditPropertyContent />
    </Suspense>
  )
}