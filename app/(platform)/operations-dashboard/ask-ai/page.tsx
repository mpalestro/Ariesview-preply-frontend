'use client'

import { useState } from 'react'
import DocumentEditor from './components/DocumentEditor'
import { FinancialTemplateEditor } from './components/FinancialTemplateEditor'

export default function AskAIPage() {
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'system',
      content: 'Welcome to AriesView AI Assistant. How can I help you with your portfolio and document analysis today?'
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message to chat history
    const newChatHistory = [
      ...chatHistory,
      { role: 'user', content: message }
    ]
    
    setChatHistory(newChatHistory)
    setMessage('')
    setIsLoading(true)
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      let response
      
      // Demo responses based on user queries
      if (message.toLowerCase().includes('lease')) {
        response = 'I found 28 active leases in your portfolio. The average lease term is 7.2 years with an average rent of $52.75/sq.ft. 5 leases are expiring in the next 6 months. Would you like me to analyze any specific lease?'
      } else if (message.toLowerCase().includes('expenses') || message.toLowerCase().includes('opex')) {
        response = 'Your portfolio\'s operating expenses average $15.75/sq.ft, which is 10% below market average. Utilities represent the highest expense category at 27% of total OpEx. Mountain View Industrial has the most efficient OpEx structure at $12.50/sq.ft.'
      } else if (message.toLowerCase().includes('document') || message.toLowerCase().includes('abstract')) {
        response = 'You have 35 documents in your document hub. 28 have been analyzed by our AI system. Would you like me to summarize a specific document or provide analytics on a document category?'
      } else if (message.toLowerCase().includes('risk')) {
        response = 'Based on my analysis of your portfolio, I\'ve identified 3 high-risk areas: 1) Lease expirations concentrated in Q4 2024, 2) Above-market TI allowances at Tech Plaza, and 3) Increasing maintenance costs at Lakefront Mall. Would you like detailed recommendations for any of these?'
      } else {
        response = 'I can help you analyze your real estate portfolio, review documents, track performance metrics, and identify optimization opportunities. Please ask specific questions about your properties, leases, expenses, or documents.'
      }
      
      setChatHistory([...newChatHistory, { role: 'assistant', content: response }])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleSaveDocument = (content: string, title: string, propertyId: string) => {
    // In a real application, this would save to your backend
    console.log('Saving document:', { title, content, propertyId });
    alert(`Document "${title}" saved successfully and associated with property!`);
  };

  const handleSaveExcel = (data: Array<Array<string>>, title: string, propertyId: string) => {
    // In a real application, this would save to your backend
    console.log('Saving Excel template:', { title, data, propertyId });
    alert(`Financial template "${title}" saved successfully to the Financial Hub of ${propertyId === 'property1' ? 'Hooksett Retail Center' : propertyId === 'property2' ? 'River Street Plaza' : 'Tech Plaza'}!`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AriesView AI</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        {/* Chat Header */}
        <div className="bg-[#1a365d] text-white p-4 flex items-center">
          <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1a365d]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 1016 0 8 8 0 00-16 0zm8 1a1 1 0 100-2 1 1 0 000 2zm0-3a1 1 0 11-2 0 1 1 0 012 0zm1 3a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold">AriesView AI Assistant</h2>
            <p className="text-xs text-blue-200">Powered by advanced machine learning</p>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="h-[500px] overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'smooth' }}>
          {chatHistory.map((chat, index) => (
            <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  chat.role === 'user' 
                    ? 'bg-[#1a365d] text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {chat.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
              placeholder="Ask about your portfolio, documents, or performance metrics..."
              disabled={isLoading}
              suppressHydrationWarning
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim()}
              className={`rounded-full p-2 ${
                isLoading || !message.trim() 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#1a365d] text-white hover:bg-[#2a4a7d]'
              }`}
              aria-label="Send message"
              suppressHydrationWarning
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Suggested Queries */}
      <div className="mt-6 mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Try asking about:</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "What are my portfolio's key metrics?",
            "Analyze lease performance",
            "Summarize my operating expenses",
            "Which leases are expiring soon?",
            "Identify cost-saving opportunities"
          ].map((query, index) => (
            <button
              key={index}
              onClick={() => {
                setMessage(query)
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-full"
              suppressHydrationWarning
            >
              {query}
            </button>
          ))}
        </div>
      </div>
      
      {/* Capabilities Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-[#1a365d] mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-medium mb-1">Document Analysis</h3>
          <p className="text-sm text-gray-600">Extract key information from leases, contracts, and legal documents</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-[#1a365d] mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-medium mb-1">Performance Metrics</h3>
          <p className="text-sm text-gray-600">Get insights on portfolio performance and benchmarking</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-[#1a365d] mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-medium mb-1">Actionable Recommendations</h3>
          <p className="text-sm text-gray-600">Receive AI-generated suggestions to optimize your portfolio</p>
        </div>
      </div>
      
      {/* Document Editor Section */}
      <div className="border-t border-gray-200 pt-8 mb-8">
        <h2 className="text-xl font-bold mb-6">Document Editor</h2>
        <DocumentEditor onSave={handleSaveDocument} />
      </div>

      {/* Excel Editor Section */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-6">Financial Template Editor</h2>
        <FinancialTemplateEditor onSave={handleSaveExcel} />
      </div>
    </div>
  )
} 