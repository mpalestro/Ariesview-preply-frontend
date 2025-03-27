export const metadata = {
  title: "Real Estate Private Equity - AriesView",
  description: "Institutional-grade tools for fund management",
};

import Link from "next/link";

export default function PrivateEquity() {
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
              Private Equity Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto">
              Institutional-grade portfolio management tools powered by AI for real estate private equity firms
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/signin"
                className="inline-flex items-center px-8 py-3 rounded-lg bg-[#001233] text-white font-semibold hover:bg-[#001845] transition-colors"
              >
                Start a Free Trial →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 rounded-lg bg-[#1B365D] text-white font-semibold hover:bg-[#264573] transition-colors"
              >
                Contact Sales →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#001233]">
            Comprehensive Portfolio Management
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#001A41] rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Portfolio Analytics</h3>
                <p className="text-white text-opacity-90">
                  Real-time performance tracking, occupancy rates, and financial metrics across your entire portfolio
                </p>
              </div>
            </div>

            <div className="bg-[#001A41] rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Financial Analysis</h3>
                <p className="text-white text-opacity-90">
                  Advanced financial modeling, ROI calculations, and automated valuation analysis
                </p>
              </div>
            </div>

            <div className="bg-[#001A41] rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Custom Benchmarking</h3>
                <p className="text-white text-opacity-90">
                  Create and track custom benchmarks for NOI, OpEx, and other key performance indicators
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#001233]">
                  Powerful Portfolio Insights
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-[#001233]">Real-time Performance Tracking</h3>
                      <p className="text-gray-600">Monitor portfolio value, occupancy rates, and ROI metrics in real-time with our intuitive dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-[#001233]">Market Analysis</h3>
                      <p className="text-gray-600">Compare your portfolio performance against market benchmarks and identify optimization opportunities</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Portfolio Value</p>
                    <p className="text-2xl font-bold text-[#001233]">$128.5M</p>
                    <p className="text-sm text-green-600">↑ 4.5% vs last quarter</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Occupancy Rate</p>
                    <p className="text-2xl font-bold text-[#001233]">92.8%</p>
                    <p className="text-sm text-green-600">↑ 1.2% vs last quarter</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Average ROI</p>
                    <p className="text-2xl font-bold text-[#001233]">6.9%</p>
                    <p className="text-sm text-orange-600">↓ 0.3% vs last quarter</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Active Properties</p>
                    <p className="text-2xl font-bold text-[#001233]">28</p>
                    <p className="text-sm text-green-600">+3 this quarter</p>
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
            Ready to Optimize Your Portfolio?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join leading private equity firms using AriesView to make data-driven investment decisions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-[#001233] text-white font-semibold hover:bg-[#001845] transition-colors"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/signin"
              className="inline-flex items-center px-8 py-3 rounded-lg border-2 border-[#001233] text-[#001233] font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 