'use client'

import { useState } from 'react'

export default function OpExBenchmarkPage() {
  const [selectedProperty, setSelectedProperty] = useState('all')
  const [dateRange, setDateRange] = useState('12months')
  const [expenseType, setExpenseType] = useState('all')

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Operating Expense Benchmark Dashboard</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4">
            <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-1">
              Property
            </label>
            <select
              id="property"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
            >
              <option value="all">All Properties</option>
              <option value="prop-001">Tech Plaza</option>
              <option value="prop-002">Lakefront Mall</option>
              <option value="prop-003">Mountain View Industrial</option>
              <option value="prop-004">Downtown Lofts</option>
              <option value="prop-005">Tech Hub Complex</option>
            </select>
          </div>
          
          <div className="w-full md:w-1/4">
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select
              id="dateRange"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
              <option value="ytd">Year to Date</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div className="w-full md:w-1/4">
            <label htmlFor="expenseType" className="block text-sm font-medium text-gray-700 mb-1">
              Expense Type
            </label>
            <select
              id="expenseType"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
            >
              <option value="all">All Expenses</option>
              <option value="utilities">Utilities</option>
              <option value="maintenance">Maintenance</option>
              <option value="taxes">Taxes</option>
              <option value="insurance">Insurance</option>
              <option value="administrative">Administrative</option>
            </select>
          </div>
          
          <div className="w-full md:w-1/4 flex items-end">
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Total OpEx Comparison Chart */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Total OpEx Comparison ($/sq.ft)</h2>
          <div className="h-64 bg-gray-50 rounded p-4">
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-md">
                {/* Horizontal Bar Chart */}
                <div className="mb-6">
                  <div className="flex items-center mb-1">
                    <div className="w-1/4 text-xs text-right pr-2">Tech Plaza</div>
                    <div className="w-3/4 flex">
                      <div className="bg-blue-500 h-5 rounded-r" style={{ width: '70%' }}></div>
                      <div className="ml-2 text-xs font-medium">$16.25</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-1/4 text-xs text-right pr-2">Lakefront Mall</div>
                    <div className="w-3/4 flex">
                      <div className="bg-blue-500 h-5 rounded-r" style={{ width: '81%' }}></div>
                      <div className="ml-2 text-xs font-medium">$18.75</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-1/4 text-xs text-right pr-2">Mountain View</div>
                    <div className="w-3/4 flex">
                      <div className="bg-blue-500 h-5 rounded-r" style={{ width: '54%' }}></div>
                      <div className="ml-2 text-xs font-medium">$12.50</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-1/4 text-xs text-right pr-2">Downtown Lofts</div>
                    <div className="w-3/4 flex">
                      <div className="bg-blue-500 h-5 rounded-r" style={{ width: '63%' }}></div>
                      <div className="ml-2 text-xs font-medium">$14.75</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-1/4 text-xs text-right pr-2">Tech Hub</div>
                    <div className="w-3/4 flex">
                      <div className="bg-blue-500 h-5 rounded-r" style={{ width: '67%' }}></div>
                      <div className="ml-2 text-xs font-medium">$15.50</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/4 text-xs text-right pr-2 font-bold">Market Avg</div>
                    <div className="w-3/4 flex">
                      <div className="bg-red-400 h-5 rounded-r" style={{ width: '75%' }}></div>
                      <div className="ml-2 text-xs font-medium">$17.50</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <div>$0</div>
                    <div>$5</div>
                    <div>$10</div>
                    <div>$15</div>
                    <div>$20</div>
                    <div>$25</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Portfolio Average</p>
              <p className="text-xl font-semibold">$15.75/sq.ft</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Market Average</p>
              <p className="text-xl font-semibold">$17.50/sq.ft</p>
            </div>
          </div>
        </div>
        
        {/* OpEx Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">OpEx Breakdown by Category</h2>
          <div className="h-64 bg-gray-50 rounded p-4">
            <div className="grid grid-cols-12 h-full">
              {/* Left side - pie chart */}
              <div className="col-span-5 flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="45" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                    
                    {/* Utilities - 27% - 97.2° */}
                    <path 
                      d="M50,50 L95,50 A45,45 0 0,1 73.1,89.5 L50,50 Z" 
                      fill="#3B82F6"
                    />
                    
                    {/* Maintenance - 24% - 86.4° */}
                    <path 
                      d="M50,50 L73.1,89.5 A45,45 0 0,1 25.1,89 L50,50 Z" 
                      fill="#60A5FA"
                    />
                    
                    {/* Taxes - 30% - 108° */}
                    <path 
                      d="M50,50 L25.1,89 A45,45 0 0,1 5,50 L50,50 Z" 
                      fill="#34D399"
                    />
                    
                    {/* Insurance - 8% - 28.8° */}
                    <path 
                      d="M50,50 L5,50 A45,45 0 0,1 24.3,11.3 L50,50 Z" 
                      fill="#A78BFA"
                    />
                    
                    {/* Admin - 11% - 39.6° */}
                    <path 
                      d="M50,50 L24.3,11.3 A45,45 0 0,1 95,50 L50,50 Z" 
                      fill="#F87171"
                    />
                    
                    {/* Inner white circle */}
                    <circle cx="50" cy="50" r="25" fill="white" stroke="#E5E7EB" strokeWidth="1" />
                  </svg>
                  
                  {/* Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-xl font-bold text-gray-800">$15.75</div>
                    <div className="text-xs text-gray-500">per sq.ft</div>
                  </div>
                </div>
              </div>
              
              {/* Right side - legend */}
              <div className="col-span-7 flex flex-col justify-center pl-1">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 mr-2 rounded-sm"></div>
                      <span className="text-xs">Utilities</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs font-semibold mr-2">$4.25</span>
                      <span className="text-xs text-gray-500">27%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-400 mr-2 rounded-sm"></div>
                      <span className="text-xs">Maintenance</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs font-semibold mr-2">$3.80</span>
                      <span className="text-xs text-gray-500">24%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-400 mr-2 rounded-sm"></div>
                      <span className="text-xs">Taxes</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs font-semibold mr-2">$4.70</span>
                      <span className="text-xs text-gray-500">30%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-400 mr-2 rounded-sm"></div>
                      <span className="text-xs">Insurance</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs font-semibold mr-2">$1.25</span>
                      <span className="text-xs text-gray-500">8%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-400 mr-2 rounded-sm"></div>
                      <span className="text-xs">Admin</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs font-semibold mr-2">$1.75</span>
                      <span className="text-xs text-gray-500">11%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Portfolio Average</p>
              <p className="text-xl font-semibold">$15.75/sq.ft</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Market Average</p>
              <p className="text-xl font-semibold">$17.50/sq.ft</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Year-over-Year Trends */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">OpEx Year-over-Year Trends</h2>
          <div className="h-64 bg-gray-50 rounded p-4">
            <div className="flex justify-between mb-4">
              <div className="text-xs text-gray-500">$ per sq.ft</div>
              <div className="flex space-x-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  Portfolio
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-1"></div>
                  Market
                </div>
              </div>
            </div>
            
            <div className="relative h-48">
              {/* Horizontal lines */}
              {[0, 5, 10, 15, 20].map((val, i) => (
                <div key={i} className="absolute w-full h-[1px] bg-gray-200" style={{ bottom: `${i * 25}%` }}>
                  <span className="absolute -left-4 -bottom-2 text-xs text-gray-500">${val}</span>
                </div>
              ))}
              
              {/* Vertical lines for years */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                {['2019', '2020', '2021', '2022', '2023'].map((year, i) => (
                  <div key={i} className="relative">
                    <div className="absolute h-48 w-[1px] bg-gray-200 bottom-0"></div>
                    <div className="absolute -left-4 top-2 text-xs text-gray-500">{year}</div>
                  </div>
                ))}
              </div>
              
              {/* Line chart */}
              <svg className="absolute inset-0 h-full w-full">
                {/* Portfolio line */}
                <polyline 
                  points="0,150 80,140 160,115 240,100 320,90" 
                  fill="none" 
                  stroke="#3B82F6" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Market line */}
                <polyline 
                  points="0,140 80,130 160,95 240,80 320,65" 
                  fill="none" 
                  stroke="#F87171" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="5,5"
                />
                
                {/* Points for Portfolio */}
                <circle cx="0" cy="150" r="4" fill="#3B82F6" />
                <circle cx="80" cy="140" r="4" fill="#3B82F6" />
                <circle cx="160" cy="115" r="4" fill="#3B82F6" />
                <circle cx="240" cy="100" r="4" fill="#3B82F6" />
                <circle cx="320" cy="90" r="4" fill="#3B82F6" />
                
                {/* Points for Market */}
                <circle cx="0" cy="140" r="4" fill="#F87171" />
                <circle cx="80" cy="130" r="4" fill="#F87171" />
                <circle cx="160" cy="95" r="4" fill="#F87171" />
                <circle cx="240" cy="80" r="4" fill="#F87171" />
                <circle cx="320" cy="65" r="4" fill="#F87171" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">3-Year CAGR</p>
            <p className="text-xl font-semibold">2.8%</p>
            <p className="text-sm text-gray-500 mt-2">Market CAGR: 3.5%</p>
          </div>
        </div>
        
        {/* Efficiency Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Efficiency Metrics</h2>
          <div className="h-64 bg-gray-50 rounded p-4 overflow-x-auto">
            <div className="h-full flex flex-col justify-center space-y-12">
              {/* Energy Consumption */}
              <div className="flex flex-col">
                <div className="flex justify-between mb-2">
                  <div className="text-sm font-medium">Energy Consumption (kWh/sq.ft)</div>
                  <div className="text-xs text-green-600 font-medium">7% below market</div>
                </div>
                
                <div className="relative pt-1 pb-6">
                  {/* Scale line */}
                  <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                  
                  {/* Your value and Market value markers - vertical lines */}
                  <div className="absolute h-4 w-px bg-green-600" style={{ left: 'calc(64% - 1px)', top: '0px' }}></div>
                  <div className="absolute h-4 w-px bg-gray-400" style={{ left: 'calc(69% - 1px)', top: '0px' }}></div>
                  
                  {/* Combined label container - positioned so it doesn't overlap */}
                  <div className="absolute z-10" style={{ left: '60%', top: '-25px' }}>
                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                      <div className="bg-white px-2 py-1 text-xs border-r border-gray-300">Your Avg: 12.8</div>
                      <div className="bg-white px-2 py-1 text-xs">Market: 13.8</div>
                    </div>
                  </div>
                  
                  {/* Scale labels */}
                  <div className="absolute w-full flex justify-between text-xs text-gray-500 top-8">
                    <div>0</div>
                    <div>5</div>
                    <div>10</div>
                    <div>15</div>
                    <div>20</div>
                  </div>
                </div>
              </div>
              
              {/* Water Usage */}
              <div className="flex flex-col">
                <div className="flex justify-between mb-2">
                  <div className="text-sm font-medium">Water Usage (gal/sq.ft)</div>
                  <div className="text-xs text-green-600 font-medium">12% below market</div>
                </div>
                
                <div className="relative pt-1 pb-6">
                  {/* Scale line */}
                  <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                  
                  {/* Your value and Market value markers - vertical lines */}
                  <div className="absolute h-4 w-px bg-blue-600" style={{ left: 'calc(55% - 1px)', top: '0px' }}></div>
                  <div className="absolute h-4 w-px bg-gray-400" style={{ left: 'calc(63% - 1px)', top: '0px' }}></div>
                  
                  {/* Combined label container - positioned so it doesn't overlap */}
                  <div className="absolute z-10" style={{ left: '52%', top: '-25px' }}>
                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                      <div className="bg-white px-2 py-1 text-xs border-r border-gray-300">Your Avg: 55.2</div>
                      <div className="bg-white px-2 py-1 text-xs">Market: 62.7</div>
                    </div>
                  </div>
                  
                  {/* Scale labels */}
                  <div className="absolute w-full flex justify-between text-xs text-gray-500 top-8">
                    <div>0</div>
                    <div>25</div>
                    <div>50</div>
                    <div>75</div>
                    <div>100</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Energy Consumption</p>
              <p className="text-xl font-semibold">12.8 kWh/sq.ft</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Water Usage</p>
              <p className="text-xl font-semibold">55.2 gal/sq.ft</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Property Comparison Table */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Property OpEx Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total OpEx
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilities
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maintenance
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taxes
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vs. Market
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Tech Plaza</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$16.25/sq.ft</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$4.30/sq.ft</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$3.95/sq.ft</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$4.80/sq.ft</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    -7% Below Market
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Lakefront Mall</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$18.75/sq.ft</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$5.20/sq.ft</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$4.55/sq.ft</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$5.10/sq.ft</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    +7% Above Market
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mountain View Industrial</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$12.50/sq.ft</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$3.80/sq.ft</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$2.95/sq.ft</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$3.25/sq.ft</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    -28% Below Market
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 