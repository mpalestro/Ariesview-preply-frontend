'use client'

import { useState } from 'react'

export default function LeaseBenchmarkPage() {
  const [selectedProperty, setSelectedProperty] = useState('all')
  const [dateRange, setDateRange] = useState('12months')

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lease Benchmark Dashboard</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
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
          
          <div className="w-full md:w-1/3">
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
          
          <div className="w-full md:w-1/3 flex items-end">
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
        {/* Rent Comparison Chart */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Rent Comparison ($/sq.ft)</h2>
          <div className="h-64 bg-gray-50 rounded p-4 overflow-x-auto">
            <div className="flex flex-col h-full justify-end space-y-2">
              <div className="flex items-end space-x-4">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 w-16 rounded-t" style={{ height: '120px' }}></div>
                  <span className="text-xs mt-1">Tech Plaza</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 w-16 rounded-t" style={{ height: '140px' }}></div>
                  <span className="text-xs mt-1">Lakefront Mall</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 w-16 rounded-t" style={{ height: '100px' }}></div>
                  <span className="text-xs mt-1">Mountain View</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 w-16 rounded-t" style={{ height: '130px' }}></div>
                  <span className="text-xs mt-1">Downtown Lofts</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 w-16 rounded-t" style={{ height: '150px' }}></div>
                  <span className="text-xs mt-1">Tech Hub</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-red-400 w-16 rounded-t" style={{ height: '110px' }}></div>
                  <span className="text-xs mt-1">Market Avg</span>
                </div>
              </div>
              <div className="h-[1px] w-full bg-gray-300"></div>
              <div className="grid grid-cols-6 gap-4 text-xs text-gray-500">
                <div>$52.00</div>
                <div>$58.50</div>
                <div>$45.25</div>
                <div>$54.75</div>
                <div>$62.50</div>
                <div>$48.50</div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Portfolio Average</p>
              <p className="text-xl font-semibold">$52.75/sq.ft</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Market Average</p>
              <p className="text-xl font-semibold">$48.50/sq.ft</p>
            </div>
          </div>
        </div>
        
        {/* Lease Term Comparison */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Lease Term Comparison</h2>
          <div className="h-64 bg-gray-50 rounded p-4 overflow-x-auto">
            <div className="flex justify-between mb-4">
              <div className="text-xs text-gray-500">Years</div>
              <div className="flex space-x-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  Portfolio
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                  Market
                </div>
              </div>
            </div>
            <div className="relative h-48">
              {/* Horizontal lines for y-axis */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val, i) => (
                <div key={i} className="absolute w-full h-[1px] bg-gray-200" style={{ bottom: `${i * 10}%` }}>
                  <span className="absolute -left-6 text-xs text-gray-500" style={{ bottom: '-6px' }}>{val}</span>
                </div>
              ))}
              {/* Line for portfolio */}
              <svg className="absolute inset-0 h-full w-full">
                <polyline 
                  points="30,80 100,100 170,60 240,90 310,30 380,70" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Points for portfolio */}
                <circle cx="30" cy="80" r="4" fill="#10B981" />
                <circle cx="100" cy="100" r="4" fill="#10B981" />
                <circle cx="170" cy="60" r="4" fill="#10B981" />
                <circle cx="240" cy="90" r="4" fill="#10B981" />
                <circle cx="310" cy="30" r="4" fill="#10B981" />
                <circle cx="380" cy="70" r="4" fill="#10B981" />
                
                {/* Line for market */}
                <polyline 
                  points="30,100 100,120 170,90 240,110 310,70 380,100" 
                  fill="none" 
                  stroke="#9CA3AF" 
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Points for market */}
                <circle cx="30" cy="100" r="4" fill="#9CA3AF" />
                <circle cx="100" cy="120" r="4" fill="#9CA3AF" />
                <circle cx="170" cy="90" r="4" fill="#9CA3AF" />
                <circle cx="240" cy="110" r="4" fill="#9CA3AF" />
                <circle cx="310" cy="70" r="4" fill="#9CA3AF" />
                <circle cx="380" cy="100" r="4" fill="#9CA3AF" />
              </svg>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Portfolio Average</p>
              <p className="text-xl font-semibold">7.2 years</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Market Average</p>
              <p className="text-xl font-semibold">5.8 years</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Escalation Rate Comparison */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Escalation Rate Comparison</h2>
          <div className="h-64 bg-gray-50 rounded p-4 overflow-x-auto">
            <div className="flex flex-col h-full">
              <div className="text-xs text-gray-500 mb-2">Annual Escalation %</div>
              <div className="flex-1 flex items-center">
                <div className="w-full">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          Tech Plaza
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          3.5%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div style={{ width: "70%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          Lakefront Mall
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          3.2%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div style={{ width: "64%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          Mountain View
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          2.8%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div style={{ width: "56%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                          Market Average
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-red-600">
                          2.9%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                      <div style={{ width: "58%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Portfolio Average</p>
              <p className="text-xl font-semibold">3.2%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Market Average</p>
              <p className="text-xl font-semibold">2.9%</p>
            </div>
          </div>
        </div>
        
        {/* TI Allowance Comparison */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">TI Allowance Comparison ($/sq.ft)</h2>
          <div className="h-64 bg-gray-50 rounded p-4 overflow-x-auto">
            <div className="h-full flex flex-col">
              {/* Clear bar chart instead of donut */}
              <div className="flex justify-between mb-3">
                <div className="text-sm font-medium">Portfolio vs. Market Average</div>
                <div className="flex space-x-4 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                    <span>Portfolio</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
                    <span>Market</span>
                  </div>
                </div>
              </div>
              
              {/* Bar chart */}
              <div className="flex-1 flex items-end">
                <div className="w-full">
                  {/* Y axis labels */}
                  <div className="relative h-6 mb-1">
                    <div className="absolute bottom-0 left-0 text-xs text-gray-500">$0</div>
                    <div className="absolute bottom-0 left-1/4 text-xs text-gray-500">$25</div>
                    <div className="absolute bottom-0 left-2/4 text-xs text-gray-500">$50</div>
                    <div className="absolute bottom-0 left-3/4 text-xs text-gray-500">$75</div>
                    <div className="absolute bottom-0 right-0 text-xs text-gray-500">$100</div>
                  </div>
                  
                  {/* Grid lines */}
                  <div className="relative h-44 border-t border-l border-gray-300">
                    <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gray-200"></div>
                    <div className="absolute left-2/4 top-0 bottom-0 w-px bg-gray-200"></div>
                    <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gray-200"></div>
                    
                    {/* Portfolio bar */}
                    <div className="absolute bottom-0 left-8 w-20">
                      <div 
                        className="bg-blue-500 rounded-t-md w-full" 
                        style={{ height: '132px' }} // Height calculated based on $65.20 out of $100 scale
                      ></div>
                      <div className="text-center mt-2 text-xs">Portfolio</div>
                      <div className="text-center font-semibold text-sm">$65.20</div>
                    </div>
                    
                    {/* Market bar */}
                    <div className="absolute bottom-0 right-8 w-20">
                      <div 
                        className="bg-red-400 rounded-t-md w-full" 
                        style={{ height: '112px' }} // Height calculated based on $55.75 out of $100 scale
                      ></div>
                      <div className="text-center mt-2 text-xs">Market</div>
                      <div className="text-center font-semibold text-sm">$55.75</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Portfolio Average</p>
              <p className="text-xl font-semibold">$65.20/sq.ft</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Market Average</p>
              <p className="text-xl font-semibold">$55.75/sq.ft</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* New Efficiency Metrics Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Efficiency Metrics</h2>
        <div className="space-y-10">
          {/* Energy Consumption */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-md font-medium">Energy Consumption (kWh/sq.ft)</h3>
              <div className="text-sm font-medium text-green-600">7% below market</div>
            </div>
            <div className="relative h-14 mb-1">
              {/* Scale line */}
              <div className="absolute left-0 right-0 top-8 h-2 bg-gray-200"></div>
              
              {/* Your value marker - vertical line */}
              <div className="absolute bg-green-500 w-0.5 h-5" style={{ left: '64%', top: '20px' }}></div>
              
              {/* Market value marker - vertical line */}
              <div className="absolute bg-gray-400 w-0.5 h-5" style={{ left: '69%', top: '20px' }}></div>
              
              {/* Labels container - positioned above the markers with better spacing */}
              <div className="absolute z-10" style={{ left: '60%', top: '0px' }}>
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <div className="bg-white px-2 py-1 text-xs border-r border-gray-300">Your Avg: 12.8</div>
                  <div className="bg-white px-2 py-1 text-xs">Market: 13.8</div>
                </div>
              </div>
              
              {/* Scale labels */}
              <div className="absolute bottom-0 left-0 text-xs text-gray-500">0</div>
              <div className="absolute bottom-0 left-1/4 text-xs text-gray-500">5</div>
              <div className="absolute bottom-0 left-2/4 text-xs text-gray-500">10</div>
              <div className="absolute bottom-0 left-3/4 text-xs text-gray-500">15</div>
              <div className="absolute bottom-0 right-0 text-xs text-gray-500">20</div>
            </div>
            
            <div className="flex justify-between mt-6">
              <div>
                <p className="text-sm text-gray-500">Energy Consumption</p>
                <p className="text-xl font-semibold">12.8 kWh/sq.ft</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Water Usage</p>
                <p className="text-xl font-semibold">55.2 gal/sq.ft</p>
              </div>
            </div>
          </div>
          
          {/* Water Usage */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-md font-medium">Water Usage (gal/sq.ft)</h3>
              <div className="text-sm font-medium text-green-600">12% below market</div>
            </div>
            <div className="relative h-14 mb-1">
              {/* Scale line */}
              <div className="absolute left-0 right-0 top-8 h-2 bg-gray-200"></div>
              
              {/* Your value marker - vertical line */}
              <div className="absolute bg-green-500 w-0.5 h-5" style={{ left: '55.2%', top: '20px' }}></div>
              
              {/* Market value marker - vertical line */}
              <div className="absolute bg-gray-400 w-0.5 h-5" style={{ left: '62.7%', top: '20px' }}></div>
              
              {/* Labels container - positioned above the markers with better spacing */}
              <div className="absolute z-10" style={{ left: '52%', top: '0px' }}>
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <div className="bg-white px-2 py-1 text-xs border-r border-gray-300">Your Avg: 55.2</div>
                  <div className="bg-white px-2 py-1 text-xs">Market: 62.7</div>
                </div>
              </div>
              
              {/* Scale labels */}
              <div className="absolute bottom-0 left-0 text-xs text-gray-500">0</div>
              <div className="absolute bottom-0 left-1/4 text-xs text-gray-500">25</div>
              <div className="absolute bottom-0 left-2/4 text-xs text-gray-500">50</div>
              <div className="absolute bottom-0 left-3/4 text-xs text-gray-500">75</div>
              <div className="absolute bottom-0 right-0 text-xs text-gray-500">100</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Leases Table */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Top Performing Leases</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lease Term
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rent ($/sq.ft)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Escalation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Tech Plaza</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Quantum Technologies</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">7 years</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$52.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3.5%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    +8% Above Market
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Tech Hub Complex</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Innovate Systems</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10 years</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$58.50</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3.8%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    +12% Above Market
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Downtown Lofts</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Creative Studios</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5 years</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$47.75</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    +5% Above Market
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