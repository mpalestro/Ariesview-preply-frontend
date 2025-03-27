'use client';

import Link from 'next/link';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useState } from 'react';

const operationalPillars = [
  {
    title: 'Properties',
    description: 'Manage your property portfolio including overviews, details, document hub, and financial management',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
      </svg>
    ),
  },
  {
    title: 'AriesView AI',
    description: 'Access intelligent insights and AI-powered assistance for property management and analysis',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3 3 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: 'AriesView Dashboards',
    description: 'View comprehensive dashboards for executive insights, cash flow, budgets, operations, and delinquency analysis',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: 'Customized Dashboard',
    description: 'Create and customize dashboards with lease benchmarks and operational expense analysis',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
      </svg>
    ),
  },
  {
    title: 'Benchmark Center',
    description: 'Compare and analyze performance metrics including Babson LLC NOI benchmarks',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
    ),
  }
];

const assetManagementPillars = [
  {
    title: 'Properties',
    description: 'Manage your property portfolio including overviews, details, document hub, and financial management',
    link: '/operations-dashboard/properties/property-overview',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
      </svg>
    ),
  },
  {
    title: 'AriesView Dashboards',
    description: 'View comprehensive dashboards for executive insights, cash flow, budgets, operations, and delinquency analysis',
    link: '/operations-dashboard/dashboards',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: 'Customized Dashboards',
    description: 'Create and customize dashboards with lease benchmarks and operational expense analysis',
    link: '/operations-dashboard/customized-dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
      </svg>
    ),
  },
];

const acquisitionScreeningPillars = [
  {
    title: 'Market Analysis',
    description: 'Evaluate market trends, demographics, and competitive landscape for potential acquisitions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: 'Financial Modeling',
    description: 'Create and analyze financial models, cash flow projections, and ROI for potential acquisitions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: 'Due Diligence',
    description: 'Manage comprehensive property inspection, documentation review, and risk assessment processes',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const investorReportingPillars = [
  {
    title: 'Performance Reports',
    description: 'Generate comprehensive reports on property and portfolio performance for investors',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: 'Financial Distributions',
    description: 'Track and manage investor distributions, returns, and capital accounts',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: 'Investor Portal',
    description: 'Provide secure access to personalized investment data, documents, and communications',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
      </svg>
    ),
  },
];

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

interface SectionState {
  platform: boolean;
  assetManagement: boolean;
  acquisitionScreening: boolean;
  investorReporting: boolean;
  benchmarkCenters: boolean;
}

function HomePage() {
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<SectionState>({
    platform: true,
    assetManagement: true,
    acquisitionScreening: true,
    investorReporting: true,
    benchmarkCenters: true
  });

  // Toggle function for each section
  const toggleSection = (section: keyof SectionState) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="min-h-screen bg-gray-50">
          {/* Welcome Banner */}
          <div className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-4">
                <h1 className="text-3xl font-bold">Welcome to AriesView</h1>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* The AriesView Platform */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">The AriesView Platform</h2>
              <button 
                onClick={() => toggleSection('platform')}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                {expandedSections.platform ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {expandedSections.platform && (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                {/* AriesView AI as the only pillar */}
                <Link
                  key="AriesView AI"
                  href="/operations-dashboard/ask-ai"
                  className="block h-full"
                >
                  <div
                    className="bg-[#0f172a] rounded-lg p-6 text-white hover:bg-[#1e293b] transition-colors duration-200 cursor-pointer h-full flex flex-col"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-[#0f172a]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3 3 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-3">AriesView AI</h3>
                    <p className="text-gray-300 text-sm flex-grow">Access intelligent insights and AI-powered assistance for property management and analysis</p>
                    <div className="mt-4 flex items-center text-sm text-white pt-2">
                      <span>Open</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </section>

          {/* Asset Management */}
            <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Asset Management</h2>
              <button 
                onClick={() => toggleSection('assetManagement')}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                {expandedSections.assetManagement ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {expandedSections.assetManagement && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assetManagementPillars.map((pillar) => (
                  <Link
                    key={pillar.title}
                    href={pillar.link}
                    className="block h-full"
                  >
                    <div
                      className="bg-[#0f172a] rounded-lg p-6 text-white hover:bg-[#1e293b] transition-colors duration-200 cursor-pointer h-full flex flex-col"
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-white p-3 rounded-lg">
                          <span className="text-[#0f172a]">
                          {pillar.icon}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium mb-3">{pillar.title}</h3>
                      <p className="text-gray-300 text-sm flex-grow">{pillar.description}</p>
                      <div className="mt-4 flex items-center text-sm text-white pt-2">
                        <span>Open</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Acquisition Screening */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Acquisition Screening</h2>
              <button 
                onClick={() => toggleSection('acquisitionScreening')}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                {expandedSections.acquisitionScreening ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {expandedSections.acquisitionScreening && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Market Analysis */}
                <Link
                  href="/operations-dashboard/benchmark-center"
                  className="block h-full"
                >
                  <div
                    className="bg-[#0f172a] rounded-lg p-6 text-white hover:bg-[#1e293b] transition-colors duration-200 cursor-pointer h-full flex flex-col"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-[#0f172a]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-3">Market Analysis</h3>
                    <p className="text-gray-300 text-sm flex-grow">Evaluate market trends, demographics, and competitive landscape for potential acquisitions</p>
                    <div className="mt-4 flex items-center text-sm text-white pt-2">
                      <span>Open</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>

                {/* Financial Modeling */}
                <Link
                  href="/operations-dashboard/dashboards/financial"
                  className="block h-full"
                >
                  <div
                    className="bg-[#0f172a] rounded-lg p-6 text-white hover:bg-[#1e293b] transition-colors duration-200 cursor-pointer h-full flex flex-col"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-[#0f172a]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-3">Financial Modeling</h3>
                    <p className="text-gray-300 text-sm flex-grow">Create and analyze financial models, cash flow projections, and ROI for potential acquisitions</p>
                    <div className="mt-4 flex items-center text-sm text-white pt-2">
                      <span>Open</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>

                {/* Due Diligence */}
                <Link
                  href="/operations-dashboard/properties/document-hub"
                  className="block h-full"
                >
                  <div
                    className="bg-[#0f172a] rounded-lg p-6 text-white hover:bg-[#1e293b] transition-colors duration-200 cursor-pointer h-full flex flex-col"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-[#0f172a]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-3">Due Diligence</h3>
                    <p className="text-gray-300 text-sm flex-grow">Manage comprehensive property inspection, documentation review, and risk assessment processes</p>
                    <div className="mt-4 flex items-center text-sm text-white pt-2">
                      <span>Open</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </section>

          {/* Investor Reporting */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Investor Reporting</h2>
              <button 
                onClick={() => toggleSection('investorReporting')}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                {expandedSections.investorReporting ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {expandedSections.investorReporting && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Performance Reports */}
                <Link
                  href="/operations-dashboard/dashboards/investor"
                  className="block h-full"
                >
                  <div
                    className="bg-[#0f172a] rounded-lg p-6 text-white hover:bg-[#1e293b] transition-colors duration-200 cursor-pointer h-full flex flex-col"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-[#0f172a]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-3">Performance Reports</h3>
                    <p className="text-gray-300 text-sm flex-grow">Generate comprehensive reports on property and portfolio performance for investors</p>
                    <div className="mt-4 flex items-center text-sm text-white pt-2">
                      <span>Open</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>

                {/* Financial Distributions */}
                <Link
                  href="/operations-dashboard/dashboards/financial"
                  className="block h-full"
                >
                  <div
                    className="bg-[#0f172a] rounded-lg p-6 text-white hover:bg-[#1e293b] transition-colors duration-200 cursor-pointer h-full flex flex-col"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-[#0f172a]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-3">Financial Distributions</h3>
                    <p className="text-gray-300 text-sm flex-grow">Track and manage investor distributions, returns, and capital accounts</p>
                    <div className="mt-4 flex items-center text-sm text-white pt-2">
                      <span>Open</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>

                {/* Investor Portal */}
                <Link
                  href="/operations-dashboard/properties/document-hub"
                  className="block h-full"
                >
                  <div
                    className="bg-[#0f172a] rounded-lg p-6 text-white hover:bg-[#1e293b] transition-colors duration-200 cursor-pointer h-full flex flex-col"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-[#0f172a]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-3">Investor Portal</h3>
                    <p className="text-gray-300 text-sm flex-grow">Provide secure access to personalized investment data, documents, and communications</p>
                    <div className="mt-4 flex items-center text-sm text-white pt-2">
                      <span>Open</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </section>

          {/* Benchmark Centers */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Benchmark Centers</h2>
              <button 
                onClick={() => toggleSection('benchmarkCenters')}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                {expandedSections.benchmarkCenters ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {expandedSections.benchmarkCenters && (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Benchmark Analysis */}
                <Link
                  href="/operations-dashboard/benchmark-center"
                  className="block h-full"
                >
                  <div
                    className="bg-[#0f172a] rounded-lg p-6 text-white hover:bg-[#1e293b] transition-colors duration-200 cursor-pointer h-full flex flex-col"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-[#0f172a]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-3">Benchmark Analysis</h3>
                    <p className="text-gray-300 text-sm flex-grow">Compare and analyze property performance metrics against industry standards and competitors</p>
                    <div className="mt-4 flex items-center text-sm text-white pt-2">
                      <span>Open</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            </section>
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex space-x-6">
                <Link href="/CustomerSuccess" className="text-gray-300 hover:text-white transition-colors">
                  Customer Success
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact Support
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </div>
              <div className="text-gray-400 text-sm">
                © 2024 AriesView. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
        </div>
    </ErrorBoundary>
  );
}

export default HomePage; 