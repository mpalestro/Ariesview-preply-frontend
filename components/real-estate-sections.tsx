'use client'

import React from 'react';
import Image from 'next/image';
import FaqAccordion from './FaqAccordion';

export default function RealEstateSections() {
  // FAQ data for the Individual Investors section
  const investorFaqs = [
    {
      question: "What is AriesView?",
      answer: "AriesView is a private AI solution that helps real estate companies make sense of their internal documents and financial data. Our platform automates analysis of your portfolio information, extracts key insights, and creates an executive view to support strategic decision-making."
    },
    {
      question: "How does AriesView handle our document analysis needs?",
      answer: "Our AI analyzes your lease agreements, financial statements, and property documents to extract critical information, identify patterns, and build a comprehensive view of your portfolio. Unlike solutions that rely on public APIs, we process your proprietary documents to provide insights unique to your operations."
    },
    {
      question: "What financial insights can we gain through AriesView?",
      answer: "AriesView helps you understand key metrics like rent distributions across your portfolio, tenant concentrations, lease expiration timelines, and scenarios for how interest rate changes would impact your NOI. We transform your internal financial data into actionable intelligence."
    },
    {
      question: "How does AriesView support operational decision-making?",
      answer: "The platform adapts to your specific CRE portfolio needs, analyzing your data to support various business rules you define. For example, you might need to enforce tenant mix policies, evaluate potential conflicts with existing non-compete clauses, analyze rent optimization against market rates, assess sustainability metrics, or track lease expiration clustering. You can interact with the AI to explore 'what-if' scenarios and understand the financial implications of different choices."
    },
    {
      question: "Can AriesView integrate with our existing systems without exposing our data?",
      answer: "Yes, AriesView is designed as a private solution that connects securely with your internal systems. We don't rely on or share your data with external APIs. Your proprietary information remains within your control while gaining the benefits of AI-powered analytics."
    }
  ];

  return (
    <section className="bg-gray-100 pt-10 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Product Cards Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#001A41] mb-6 text-center">Our Solutions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Acquisition Screening Card */}
            <div className="bg-[#05113D] text-white rounded overflow-hidden shadow-xl hover-scale">
              <div className="bg-[#1A365D] py-4">
                <h3 className="text-xl font-bold text-center text-white uppercase">ACQUISITION SCREENING</h3>
              </div>
              <div className="p-6">
                <p className="text-white text-center py-2">
                  Automated ROI Analysis & Market Benchmarking
                </p>
                
                <p className="text-white text-center py-2">
                  Initial Risk & Compliance Assessment
                </p>
              </div>
            </div>
            
            {/* Due Diligence Card */}
            <div className="bg-[#05113D] text-white rounded overflow-hidden shadow-xl hover-scale">
              <div className="bg-[#1A365D] py-4">
                <h3 className="text-xl font-bold text-center text-white uppercase">DUE DILIGENCE</h3>
              </div>
              <div className="p-6">
                <p className="text-white text-center py-2">
                  AI-Powered Lease Data Extraction
                </p>
                
                <p className="text-white text-center py-2">
                  Anomaly Detection & Audit Trail Reporting
                </p>
                
                <p className="text-white text-center py-2">
                  Risk Analysis & Scenario Modelling
                </p>
              </div>
            </div>
            
            {/* Asset Management Card */}
            <div className="bg-[#05113D] text-white rounded overflow-hidden shadow-xl hover-scale">
              <div className="bg-[#1A365D] py-4">
                <h3 className="text-xl font-bold text-center text-white uppercase">ASSET MANAGEMENT</h3>
              </div>
              <div className="p-6">
                <p className="text-white text-center py-2">
                  Expense Tracking & Benchmarking
                </p>
                
                <p className="text-white text-center py-2">
                  Automated Rent & Lease Compliance Monitoring
                </p>
                
                <p className="text-white text-center py-2">
                  Investor Relations & Waterfall Calculations
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Real Estate Private Equity & Syndicators */}
        <div className="mb-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Estate Private Equity & Syndicators</h2>
              <p className="text-gray-600 mb-6">
                Scale your real estate investment operations with institutional-grade tools for fund management and LP relations. Our platform streamlines property due diligence, automates waterfall calculations, and provides comprehensive risk analysis for large-scale real estate acquisitions and portfolio management.
              </p>
              <div className="mb-4">
                <a href="#" className="text-blue-600 font-medium inline-flex items-center">
                  Learn more
                  <svg className="w-3 h-3 ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                  </svg>
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>Fund Management</span>
                <span>•</span>
                <span>LP Relations</span>
                <span>•</span>
                <span>Waterfall Calculations</span>
                <span>•</span>
                <span>Risk Analysis</span>
              </div>
            </div>
            <div className="relative h-[400px] w-full">
              <Image
                src="/images/pe-dashboard.jpg"
                fill
                style={{ objectFit: 'cover' }}
                alt="Private Equity Dashboard"
                className="rounded-lg shadow-lg hover-bright"
              />
            </div>
          </div>
        </div>
        
        {/* Real Estate Asset Managers */}
        <div className="mb-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
            <div className="order-2 md:order-1 relative h-[400px] w-full">
              <Image
                src="/images/asset-management.jpg"
                fill
                style={{ objectFit: 'cover' }}
                alt="Asset Management Dashboard"
                className="rounded-lg shadow-lg hover-bright"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Estate Asset Managers</h2>
              <p className="text-gray-600 mb-6">
                Optimize your real estate portfolio's operational performance with real-time monitoring and analytics. Track property expenses, ensure lease compliance, and leverage market benchmarking to make data-driven decisions that maximize asset value and minimize risk.
              </p>
              <div className="mb-4">
                <a href="#" className="text-blue-600 font-medium inline-flex items-center">
                  Learn more
                  <svg className="w-3 h-3 ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                  </svg>
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>Expense Tracking</span>
                <span>•</span>
                <span>Lease Compliance</span>
                <span>•</span>
                <span>Performance Analytics</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Real Estate Individual Investors */}
        <div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Estate Individual Investors</h2>
              <p className="text-gray-600 mb-6">
                Make confident real estate investment decisions with professional-grade tools scaled for individual portfolios. Efficiently screen property acquisitions, analyze ROI potential, and manage properties with automated systems that save time and reduce complexity.
              </p>
              <div className="mb-4">
                <a href="#" className="text-blue-600 font-medium inline-flex items-center">
                  Learn more
                  <svg className="w-3 h-3 ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                  </svg>
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>Deal Screening</span>
                <span>•</span>
                <span>ROI Analysis</span>
                <span>•</span>
                <span>Property Management</span>
              </div>
            </div>
            <div className="relative h-[400px] w-full">
              <Image
                src="/images/investor-dashboard.jpg"
                fill
                style={{ objectFit: 'cover' }}
                alt="Investor Dashboard"
                className="rounded-lg shadow-lg hover-bright"
              />
            </div>
          </div>
          
          {/* Why choose AriesView section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why choose AriesView</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Comprehensive Property Dashboard</h3>
                <p className="text-gray-600">
                  Monitor your entire portfolio with at-a-glance metrics. Track occupancy rates, financial performance, and property status from a centralized operations dashboard.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Intelligent Document Management</h3>
                <p className="text-gray-600">
                  Manage all property documents with AI-powered insights. Extract key information from leases, financial statements, and contracts with automated document analysis.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Powered Financial Analysis</h3>
                <p className="text-gray-600">
                  Leverage AriesView's AI to automatically analyze property financials, track NOI, calculate ROI, and generate financial projections with our comprehensive financial hub.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Interactive Data Visualization</h3>
                <p className="text-gray-600">
                  Transform complex property data into clear, actionable insights with customizable dashboards and interactive charts for performance metrics, market trends, and benchmarking.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Spreadsheet & Excel Integration</h3>
                <p className="text-gray-600">
                  Create and manage financial models with our built-in spreadsheet functionality. Import/export Excel data, use formulas, and collaborate on financial templates in real-time.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">AriesView AI Assistant</h3>
                <p className="text-gray-600">
                  Ask questions about your portfolio in plain English. Our AI assistant analyzes portfolio metrics, lease performance, operating expenses, and identifies opportunities.
                </p>
              </div>
            </div>
          </div>
          
          {/* FAQs section */}
          <div className="px-8">
            <h2 className="text-4xl font-bold text-[#001A41] mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              <FaqAccordion faqs={investorFaqs} />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
} 