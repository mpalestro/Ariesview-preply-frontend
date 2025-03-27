'use client';

import { useState } from 'react';
import ChartComponent from '../../../components/ChartComponent';

export default function ExecutiveDashboard() {
  // Portfolio Performance Chart Data
  const portfolioPerformanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Portfolio Value (in $M)',
        data: [195.2, 198.7, 201.5, 204.3, 206.9, 209.7, 211.2, 214.5, 216.3, 218.5, 221.0, 223.8],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true
      },
      {
        label: 'Target Growth',
        data: [197.0, 199.0, 201.0, 203.0, 205.0, 207.0, 209.0, 211.0, 213.0, 215.0, 217.0, 219.0],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false
      }
    ]
  };

  // Leasing Activity Chart Data
  const leasingActivityData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'New Leases',
        data: [42, 35, 45, 39],
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      },
      {
        label: 'Renewals',
        data: [86, 92, 78, 95],
        backgroundColor: 'rgba(75, 192, 192, 0.7)'
      },
      {
        label: 'Vacancies',
        data: [24, 18, 22, 15],
        backgroundColor: 'rgba(255, 99, 132, 0.7)'
      }
    ]
  };

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Executive Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* KPI Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Total Portfolio Value</h3>
          <p className="text-3xl font-bold text-indigo-600">$218.5M</p>
          <div className="flex items-center mt-2 text-sm">
            <span className="text-green-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              +3.2%
            </span>
            <span className="text-gray-500 ml-2">from last quarter</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Occupancy Rate</h3>
          <p className="text-3xl font-bold text-indigo-600">94.7%</p>
          <div className="flex items-center mt-2 text-sm">
            <span className="text-green-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              +1.5%
            </span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Net Operating Income</h3>
          <p className="text-3xl font-bold text-indigo-600">$4.2M</p>
          <div className="flex items-center mt-2 text-sm">
            <span className="text-red-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
              </svg>
              -0.8%
            </span>
            <span className="text-gray-500 ml-2">from last quarter</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Charts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Portfolio Performance</h3>
          <ChartComponent 
            type="line" 
            data={portfolioPerformanceData} 
            height={260} 
          />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Leasing Activity</h3>
          <ChartComponent 
            type="bar" 
            data={leasingActivityData} 
            height={260} 
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-700">Property Performance</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Filter</button>
            <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">Export</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expenses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NOI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'Riverview Apartments', occupancy: '96%', revenue: '$1.2M', expenses: '$450K', noi: '$750K', status: 'Performing' },
                { name: 'Highland Towers', occupancy: '92%', revenue: '$950K', expenses: '$320K', noi: '$630K', status: 'Performing' },
                { name: 'Sunset Gardens', occupancy: '89%', revenue: '$820K', expenses: '$380K', noi: '$440K', status: 'Watch' },
                { name: 'Metropolitan Plaza', occupancy: '97%', revenue: '$1.5M', expenses: '$580K', noi: '$920K', status: 'Performing' },
                { name: 'Lakeside Villas', occupancy: '85%', revenue: '$720K', expenses: '$390K', noi: '$330K', status: 'Underperforming' },
              ].map((property, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{property.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.occupancy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.revenue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.expenses}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.noi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      property.status === 'Performing' ? 'bg-green-100 text-green-800' :
                      property.status === 'Watch' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {property.status}
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