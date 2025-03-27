'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { propertiesData, tenantsData } from '../data'
import DocumentHub from './components/DocumentHub'
import FinancialHub from './components/FinancialHub'

interface Tenant {
  name: string;
  industry: string;
  contact: string;
  leaseEnd: string;
  paymentStatus: string;
}

interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  category: string;
  sqft: number;
  units: number;
  occupancy: number;
  value: number;
  roi: number;
  image: string;
  status: string;
  fund: string;
  description: string;
  tenants: Tenant[];
}

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      const foundProperty = propertiesData.find(p => p.id === propertyId);
      
      if (!foundProperty) {
        setError('Property not found');
        return;
      }

      // Get tenants data for the property
      const propertyTenants = tenantsData[foundProperty.name] || [];
      setProperty({ ...foundProperty, tenants: propertyTenants });
    } catch (err) {
      setError('Failed to load property data');
      console.error('Error loading property:', err);
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Property Details</h2>
          <p className="text-gray-500">Please wait while we fetch the property information...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-600 p-4 rounded-full inline-block mb-4">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">{error || 'Property Not Found'}</h2>
          <p className="text-gray-500 mb-4">We couldn't find the property you're looking for.</p>
          <Link
            href="/operations-dashboard/properties/property-overview"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/operations-dashboard" className="text-blue-600 hover:text-blue-800">
                Dashboard
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link href="/operations-dashboard/properties/property-overview" className="text-blue-600 hover:text-blue-800">
                Properties
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-600 font-medium">{property.name}</li>
          </ol>
        </nav>

        {/* Property Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
              <p className="text-gray-600 mt-1">{property.address}</p>
              <div className="flex items-center mt-2 space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                  ${property.status === 'active' ? 'bg-green-100 text-green-800' :
                    property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                  {property.status}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {property.fund}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/operations-dashboard/properties/${propertyId}/edit`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Property
              </Link>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Details
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex mt-6 space-x-4 border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              suppressHydrationWarning
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tenants')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'tenants'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              suppressHydrationWarning
            >
              Tenants
            </button>
            <button
              onClick={() => setActiveTab('financials')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'financials'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              suppressHydrationWarning
            >
              Financials
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'documents'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              suppressHydrationWarning
            >
              Document Hub
            </button>
            <button
              onClick={() => setActiveTab('financial-hub')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'financial-hub'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              suppressHydrationWarning
            >
              Financial Hub
            </button>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Property Image and Description */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="object-cover w-full h-64"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Description</h2>
                  <p className="text-gray-600">{property.description}</p>
                </div>
              </div>
            </div>

            {/* Property Details Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Property Type</dt>
                    <dd className="font-medium text-gray-900">{property.type}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Category</dt>
                    <dd className="font-medium text-gray-900">{property.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Square Footage</dt>
                    <dd className="font-medium text-gray-900">{property.sqft.toLocaleString()} sq ft</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Number of Units</dt>
                    <dd className="font-medium text-gray-900">{property.units}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Occupancy Rate</dt>
                    <dd className="font-medium text-gray-900">{property.occupancy}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Property Value</dt>
                    <dd className="font-medium text-gray-900">{formatCurrency(property.value)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">ROI</dt>
                    <dd className="font-medium text-gray-900">{property.roi}%</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tenants' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Current Tenants</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lease End</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {property.tenants.map((tenant, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tenant.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.industry}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.contact}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.leaseEnd}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${tenant.paymentStatus === 'current' ? 'bg-green-100 text-green-800' :
                            tenant.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`}>
                          {tenant.paymentStatus.charAt(0).toUpperCase() + tenant.paymentStatus.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500">Current Value</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(property.value)}</dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500">Annual ROI</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{property.roi}%</dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500">Occupancy Rate</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{property.occupancy}%</dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500">Revenue per Sq Ft</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {formatCurrency(property.value / property.sqft)}
                </dd>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <DocumentHub propertyId={property.id} propertyName={property.name} />
        )}

        {activeTab === 'financial-hub' && (
          <FinancialHub 
            propertyId={property.id}
            propertyName={property.name}
            propertyValue={property.value}
            occupancy={property.occupancy}
            roi={property.roi}
          />
        )}
      </div>
    </div>
  );
} 