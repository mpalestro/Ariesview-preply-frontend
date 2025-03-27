'use client'

import { useState } from 'react'

export default function MarketAnalysisPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Market Analysis</h1>
        <p className="text-gray-600">Research and analyze market conditions and trends</p>
      </div>

      {/* Market Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Market Overview</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Market Cap Rate</p>
              <p className="text-2xl font-semibold">5.2%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Price per SF</p>
              <p className="text-2xl font-semibold">$285</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Vacancy Rate</p>
              <p className="text-2xl font-semibold">4.8%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Market Activity</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Total Sales Volume (YTD)</p>
              <p className="text-2xl font-semibold">$1.2B</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Number of Transactions</p>
              <p className="text-2xl font-semibold">47</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Days on Market</p>
              <p className="text-2xl font-semibold">85</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Market Trends</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">YoY Price Growth</p>
              <p className="text-2xl font-semibold text-green-600">+8.5%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Absorption Rate</p>
              <p className="text-2xl font-semibold">92%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">New Construction</p>
              <p className="text-2xl font-semibold">1.2M SF</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Reports Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Recent Market Reports</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Q1 2024 Market Analysis Report</h3>
              <p className="text-sm text-gray-600">Comprehensive market overview and trends</p>
            </div>
            <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
              View Report
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Property Type Analysis</h3>
              <p className="text-sm text-gray-600">Performance by property category</p>
            </div>
            <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
              View Report
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Submarket Analysis</h3>
              <p className="text-sm text-gray-600">Detailed submarket performance metrics</p>
            </div>
            <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
              View Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 