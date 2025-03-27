'use client';

export default function BabsonNOIBenchmark() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Babson LLC NOI Benchmark</h1>
      
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Benchmark Overview</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Benchmark Type</h3>
              <p className="text-xl font-bold text-blue-900">NOI Comparison</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Data Range</h3>
              <p className="text-xl font-bold text-blue-900">Q1 2023 - Q4 2023</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Property Count</h3>
              <p className="text-xl font-bold text-blue-900">32 Properties</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">NOI Benchmark Summary</h2>
          </div>
          <div className="p-6">
            <div className="h-80 flex items-center justify-center bg-gray-100 rounded">
              <p className="text-gray-500">NOI Comparison Chart</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Key Metrics</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-600">Your Portfolio Average NOI</span>
                <span className="font-semibold text-gray-900">$685,000</span>
              </li>
              <li className="flex justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-600">Babson LLC Average NOI</span>
                <span className="font-semibold text-gray-900">$723,500</span>
              </li>
              <li className="flex justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-600">Variance</span>
                <span className="font-semibold text-red-600">-5.3%</span>
              </li>
              <li className="flex justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-600">NOI per Sq Ft (Your Portfolio)</span>
                <span className="font-semibold text-gray-900">$12.45</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">NOI per Sq Ft (Babson LLC)</span>
                <span className="font-semibold text-gray-900">$13.18</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Detailed Comparison</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Filter</button>
            <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">Export</button>
          </div>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your NOI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Babson NOI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { type: 'Class A Office', yourNOI: '$852,000', babsonNOI: '$890,000', variance: '-4.3%', performance: 'Underperforming' },
                { type: 'Class B Office', yourNOI: '$615,000', babsonNOI: '$598,000', variance: '+2.8%', performance: 'Outperforming' },
                { type: 'Retail', yourNOI: '$720,000', babsonNOI: '$785,000', variance: '-8.3%', performance: 'Underperforming' },
                { type: 'Industrial', yourNOI: '$925,000', babsonNOI: '$908,000', variance: '+1.9%', performance: 'Outperforming' },
                { type: 'Multi-family', yourNOI: '$555,000', babsonNOI: '$592,000', variance: '-6.3%', performance: 'Underperforming' },
              ].map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.yourNOI}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.babsonNOI}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.variance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.performance === 'Outperforming' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.performance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 