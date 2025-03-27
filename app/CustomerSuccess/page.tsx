export const metadata = {
  title: "Customer Success - AriesView",
  description: "How we help our customers succeed with real estate analytics",
};

import Link from "next/link";

export default function CustomerSuccessPage() {
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
              Customer Success
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto">
              How we partner with you to ensure your success with AriesView's real estate analytics platform
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#001233] mb-6">Our Approach to Customer Success</h2>
              <p className="text-xl text-gray-600 mb-12">
                At AriesView, we believe that your success is our success. Our customer success team works closely with you from day one to ensure you get the most value from our platform. We're committed to being your partner in real estate analytics, not just another software vendor.
              </p>
              
              <h3 className="text-2xl font-bold text-[#001233] mb-8">How We Support You</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[#001A41] p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-white mb-3">Personalized Onboarding</h4>
                  <p className="text-white text-opacity-90">
                    Every new customer receives a personalized onboarding experience tailored to your specific needs and use cases. Our team works with you to configure the platform, import your data, and train your team.
                  </p>
                </div>
                
                <div className="bg-[#001A41] p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-white mb-3">Ongoing Training</h4>
                  <p className="text-white text-opacity-90">
                    As your team grows and our platform evolves, we provide ongoing training to ensure everyone stays up to date. From webinars to custom training sessions, we ensure your success.
                  </p>
                </div>
                
                <div className="bg-[#001A41] p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-white mb-3">Technical Support</h4>
                  <p className="text-white text-opacity-90">
                    Our technical support team is available to help with any issues you encounter. With multiple support tiers available, we ensure you get the level of support your business needs.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-[#001233] mb-6">Customer Success Metrics</h3>
              <p className="text-gray-600 mb-8">
                We measure our success by your success. Here are some of the key metrics we track to ensure we're delivering value:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-[#001233] mb-2">24h</div>
                  <div className="text-gray-600">Average support response time</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-[#001233] mb-2">98%</div>
                  <div className="text-gray-600">Customer satisfaction rate</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-[#001233] mb-2">1 day</div>
                  <div className="text-gray-600">Average time to first value</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
