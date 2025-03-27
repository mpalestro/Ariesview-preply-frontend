'use client'

import { useState } from 'react'

export default function InvestmentCriteriaPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Investment Criteria</h1>
        <p className="text-gray-600">Set and manage investment parameters and thresholds</p>
      </div>

      {/* Investment Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Financial Parameters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Deal Size</label>
              <div className="mt-1 flex items-center">
                <span className="text-lg font-semibold">$25M - $100M</span>
                <button className="ml-2 text-blue-600 hover:text-blue-700" title="Edit target deal size">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Target IRR</label>
              <div className="mt-1 flex items-center">
                <span className="text-lg font-semibold">15% - 18%</span>
                <button className="ml-2 text-blue-600 hover:text-blue-700" title="Edit target IRR">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Cap Rate</label>
              <div className="mt-1 flex items-center">
                <span className="text-lg font-semibold">5.0% - 6.5%</span>
                <button className="ml-2 text-blue-600 hover:text-blue-700" title="Edit target cap rate">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Property Parameters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Types</label>
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Office</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Retail</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Industrial</span>
                <button className="px-2 py-1 text-blue-600 hover:text-blue-700" title="Add property type">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Markets</label>
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">San Francisco</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Los Angeles</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Seattle</span>
                <button className="px-2 py-1 text-blue-600 hover:text-blue-700" title="Add target market">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Size Range</label>
              <div className="mt-1 flex items-center">
                <span className="text-lg font-semibold">50,000 - 250,000 SF</span>
                <button className="ml-2 text-blue-600 hover:text-blue-700" title="Edit size range">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Criteria */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Additional Investment Criteria</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Asset Quality</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" checked readOnly />
                  <span className="ml-2 text-sm text-gray-600">Class A</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" checked readOnly />
                  <span className="ml-2 text-sm text-gray-600">Class B+</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Investment Strategy</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" checked readOnly />
                  <span className="ml-2 text-sm text-gray-600">Core Plus</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" checked readOnly />
                  <span className="ml-2 text-sm text-gray-600">Value Add</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 