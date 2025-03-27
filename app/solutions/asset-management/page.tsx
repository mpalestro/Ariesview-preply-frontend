export const metadata = {
  title: "Asset Management - AriesView",
  description: "AI-powered asset management and optimization for real estate portfolios",
};

import Link from "next/link";

export default function AssetManagementPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <div className="relative bg-[#F8F9FF] pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/background-pattern.svg')] opacity-10"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-[1200px] mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-[#001233] leading-tight">
              Asset Management
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto">
              Optimize your real estate portfolio performance with AI-powered analytics and automation
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 rounded-lg bg-[#001233] text-white font-semibold hover:bg-[#001845] transition-colors"
              >
                Schedule Demo →
              </Link>
              <Link
                href="/signin"
                className="inline-flex items-center px-8 py-3 rounded-lg bg-[#1B365D] text-white font-semibold hover:bg-[#264573] transition-colors"
              >
                Try For Free →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#001233]">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#001A41] rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Expense Tracking</h3>
                <p className="text-white text-opacity-90">
                  Monitor and analyze property expenses to optimize operational costs and efficiency
                </p>
              </div>
            </div>

            <div className="bg-[#001A41] rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Lease Management</h3>
                <p className="text-white text-opacity-90">
                  Automated rent collection, lease compliance monitoring, and tenant relationship management
                </p>
              </div>
            </div>

            <div className="bg-[#001A41] rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Investor Relations</h3>
                <p className="text-white text-opacity-90">
                  Generate detailed waterfall calculations and investor reports with automated distribution tracking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Preview */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#001233]">
                  Optimize Your Portfolio Performance
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Our platform helps you maximize returns and minimize risks across your entire portfolio:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Real-time performance monitoring and benchmarking</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Automated lease and compliance management</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Comprehensive investor reporting and analytics</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Portfolio Value</p>
                    <p className="text-2xl font-bold text-[#001233]">$100M+</p>
                    <p className="text-sm text-green-600">Assets managed</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Cost Reduction</p>
                    <p className="text-2xl font-bold text-[#001233]">30%</p>
                    <p className="text-sm text-green-600">Average savings</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Compliance Rate</p>
                    <p className="text-2xl font-bold text-[#001233]">100%</p>
                    <p className="text-sm text-green-600">Automated tracking</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Time Saved</p>
                    <p className="text-2xl font-bold text-[#001233]">85%</p>
                    <p className="text-sm text-green-600">On reporting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#001233]">
            Ready to Transform Your Asset Management?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join leading institutions using AriesView to optimize their portfolio performance
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-[#001233] text-white font-semibold hover:bg-[#001845] transition-colors"
            >
              Schedule Demo
            </Link>
            <Link
              href="/signin"
              className="inline-flex items-center px-8 py-3 rounded-lg border-2 border-[#001233] text-[#001233] font-semibold hover:bg-gray-50 transition-colors"
            >
              Try For Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 