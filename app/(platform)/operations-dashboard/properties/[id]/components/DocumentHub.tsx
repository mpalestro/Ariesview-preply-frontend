import React, { useState } from 'react';
import DocumentEditor from './DocumentEditor';
import AIDocumentExtractor from './AIDocumentExtractor';

interface DocumentHubProps {
  propertyId: string;
  propertyName: string;
}

interface Document {
  id: string;
  title: string;
  dateCreated: string;
  documentType: string;
  size: string;
  createdBy: string;
  fundId?: string;
  propertyId?: string;
}

interface Fund {
  id: string;
  name: string;
  properties: Property[];
}

interface Property {
  id: string;
  name: string;
  address: string;
}

interface ExtractedData {
  title: string;
  type: string;
  date: string;
  keyPoints: string[];
  entities: {
    name: string;
    type: string;
    value: string;
  }[];
}

// Mock data for funds and properties
const fundsData: Fund[] = [
  {
    id: 'fund1',
    name: 'Evolston Capital Fund I',
    properties: [
      { id: 'prop1', name: 'River Street Plaza', address: '522 River St, Boston, MA 02126' },
      { id: 'prop2', name: 'Hooksett Retail Center', address: '555 Hooksett Road, Manchester, NH 03106' }
    ]
  },
  {
    id: 'fund2',
    name: 'Evolston Capital Fund II',
    properties: [
      { id: 'prop3', name: 'Main Street Complex', address: '123 Main St, Hartford, CT 06103' },
      { id: 'prop4', name: 'Oakwood Plaza', address: '789 Oak Ave, Providence, RI 02903' }
    ]
  }
];

const DocumentHub: React.FC<DocumentHubProps> = ({ propertyId, propertyName }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [showExtractor, setShowExtractor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [selectedFund, setSelectedFund] = useState<string>('');
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  
  // Sample documents - in a real app, these would come from an API
  const [documents, setDocuments] = useState<Document[]>([
    { 
      id: 'doc1', 
      title: 'Lease Agreement - Main Tenant', 
      dateCreated: '2023-11-15', 
      documentType: 'Lease', 
      size: '1.2 MB',
      createdBy: 'System Admin'
    },
    { 
      id: 'doc2', 
      title: 'Property Insurance Policy', 
      dateCreated: '2023-10-22', 
      documentType: 'Insurance', 
      size: '3.4 MB',
      createdBy: 'John Smith'
    },
    { 
      id: 'doc3', 
      title: 'Annual Financial Report 2023', 
      dateCreated: '2024-01-10', 
      documentType: 'Financial', 
      size: '5.7 MB',
      createdBy: 'Finance Team'
    },
    { 
      id: 'doc4', 
      title: 'Property Tax Assessment', 
      dateCreated: '2023-09-05', 
      documentType: 'Tax', 
      size: '0.8 MB',
      createdBy: 'Tax Department'
    }
  ]);

  // Get properties for selected fund
  const selectedFundProperties = fundsData.find(fund => fund.id === selectedFund)?.properties || [];

  // Reset property selection when fund changes
  const handleFundChange = (fundId: string) => {
    setSelectedFund(fundId);
    setSelectedProperty('');
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.documentType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || doc.documentType.toLowerCase() === filterType.toLowerCase();
    const matchesFund = !selectedFund || doc.fundId === selectedFund;
    const matchesProperty = !selectedProperty || doc.propertyId === selectedProperty;
    return matchesSearch && matchesFilter && matchesFund && matchesProperty;
  });

  const handleSaveDocument = (content: string, title: string, propertyId: string) => {
    // In a real app, this would save to your backend
    const newDocument = {
      id: `doc${documents.length + 1}`,
      title,
      dateCreated: new Date().toISOString().split('T')[0],
      documentType: 'General',
      size: '0.3 MB',
      createdBy: 'Current User',
      fundId: selectedFund || undefined,
      propertyId: selectedProperty || undefined
    };
    
    setDocuments([...documents, newDocument]);
    setShowEditor(false);
    
    // Success notification with fund and property information
    let saveLocation = propertyName;
    if (selectedFund) {
      const fund = fundsData.find(f => f.id === selectedFund);
      if (selectedProperty) {
        const property = fund?.properties.find(p => p.id === selectedProperty);
        saveLocation = `${fund?.name} > ${property?.name}`;
      } else {
        saveLocation = fund?.name || '';
      }
    }
    
    alert(`Document "${title}" has been saved to ${saveLocation}`);
  };

  const handleDeleteDocument = (id: string) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleExtractComplete = (data: ExtractedData) => {
    setExtractedData(data);
    setShowExtractor(false);

    // Create a new document from the extracted data
    const newDocument = {
      id: `doc${documents.length + 1}`,
      title: data.title,
      dateCreated: data.date,
      documentType: data.type,
      size: '0.5 MB', // This would be actual file size in a real app
      createdBy: 'AI Extractor',
      fundId: selectedFund || undefined,
      propertyId: selectedProperty || undefined
    };

    setDocuments([...documents, newDocument]);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Document Hub</h2>
        <div className="space-x-3">
          <button
            onClick={() => {
              setShowEditor(!showEditor);
              setShowExtractor(false);
            }}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            suppressHydrationWarning
          >
            {showEditor ? 'Close Editor' : 'Create Document'}
          </button>
          <button
            onClick={() => {
              setShowExtractor(!showExtractor);
              setShowEditor(false);
            }}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            suppressHydrationWarning
          >
            {showExtractor ? 'Close Extractor' : 'AI Extract'}
          </button>
        </div>
      </div>

      {showEditor ? (
        <div className="p-6">
          <DocumentEditor 
            onSave={handleSaveDocument} 
            initialFundId={selectedFund}
            initialPropertyId={selectedProperty}
          />
        </div>
      ) : showExtractor ? (
        <div className="p-6">
          <AIDocumentExtractor 
            onExtractComplete={handleExtractComplete} 
            initialFundId={selectedFund}
            initialPropertyId={selectedProperty}
          />
        </div>
      ) : (
        <>
          {/* Search and Filter */}
          <div className="px-6 py-4 space-y-4">
            {/* Fund and Property Selection */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="fund-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Fund
                </label>
                <select
                  id="fund-select"
                  value={selectedFund}
                  onChange={(e) => handleFundChange(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  suppressHydrationWarning
                >
                  <option value="">All Funds</option>
                  {fundsData.map(fund => (
                    <option key={fund.id} value={fund.id}>{fund.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="property-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Property
                </label>
                <select
                  id="property-select"
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={!selectedFund}
                  suppressHydrationWarning
                >
                  <option value="">All Properties</option>
                  {selectedFundProperties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name} - {property.address}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search and Document Type Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search documents..."
                  suppressHydrationWarning
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="max-w-xs block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                suppressHydrationWarning
                aria-label="Filter document type"
              >
                <option value="all">All Types</option>
                <option value="lease">Lease</option>
                <option value="insurance">Insurance</option>
                <option value="financial">Financial</option>
                <option value="tax">Tax</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          {/* Document List */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <tr key={doc.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-md">
                            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {doc.documentType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.dateCreated}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.createdBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4" suppressHydrationWarning>View</button>
                        <button className="text-blue-600 hover:text-blue-900 mr-4" suppressHydrationWarning>Download</button>
                        <button 
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="text-red-600 hover:text-red-900"
                          suppressHydrationWarning
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No documents found. Try adjusting your search or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Upload Document */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Upload Document</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <label htmlFor="fileUpload" className="cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input id="fileUpload" name="fileUpload" type="file" className="sr-only" suppressHydrationWarning />
                    </label>
                    <p className="pl-1 inline">or drag and drop</p>
                  </div>
                  <p className="mt-1 text-xs text-blue-500">PDF, DOCX, XLSX or TXT up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Extracted Data Modal */}
          {extractedData && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Extracted Information</h3>
                  <button
                    onClick={() => setExtractedData(null)}
                    className="text-gray-400 hover:text-gray-500"
                    suppressHydrationWarning
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Key Points</h4>
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                      {extractedData.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Entities</h4>
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      {extractedData.entities.map((entity, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md"
                        >
                          <div className="text-sm text-gray-900">{entity.name}</div>
                          <div className="text-sm text-gray-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {entity.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setExtractedData(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    suppressHydrationWarning
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DocumentHub; 