'use client';

import React, { useRef, useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// Register all Handsontable modules
registerAllModules();

interface FinancialTemplateEditorProps {
  onSave?: (data: string[][], title: string, propertyId: string) => void;
}

export const FinancialTemplateEditor: React.FC<FinancialTemplateEditorProps> = ({ onSave }) => {
  const hotTableRef = useRef(null);
  const [title, setTitle] = useState('Financial Template');
  const [selectedProperty, setSelectedProperty] = useState('');
  
  // Create an empty 40x40 array for our blank spreadsheet
  const generateEmptyData = () => {
    const rows = 40;
    const cols = 40;
    const data = [];
    
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push('');
      }
      data.push(row);
    }
    
    return data;
  };
  
  const [data, setData] = useState(generateEmptyData());
  
  // Property options
  const propertyOptions = [
    { id: 'property1', name: 'Hooksett Retail Center' },
    { id: 'property2', name: 'River Street Plaza' },
    { id: 'property3', name: 'Tech Plaza' }
  ];
  
  // Generate sample data
  const generateSampleData = () => {
    const newData = [...generateEmptyData()];
    
    // Add headers
    newData[0][0] = 'Item';
    newData[0][1] = 'Category';
    newData[0][2] = 'Cost';
    newData[0][3] = 'Date';
    newData[0][4] = 'Status';
    
    // Add sample data
    for (let i = 1; i < 10; i++) {
      newData[i][0] = `Item ${i}`;
      newData[i][1] = ['Expense', 'Income', 'Investment'][i % 3];
      newData[i][2] = `$${(Math.random() * 1000).toFixed(2)}`;
      newData[i][3] = `2023-${String(i).padStart(2, '0')}-01`;
      newData[i][4] = ['Pending', 'Completed', 'In Review'][i % 3];
    }
    
    setData(newData);
    if (hotTableRef.current) {
      // @ts-ignore - We know this exists but TypeScript doesn't
      hotTableRef.current.hotInstance.loadData(newData);
    }
  };
  
  // Handle save
  const handleSave = () => {
    if (!selectedProperty) {
      alert('Please select a property first');
      return;
    }
    
    if (onSave) {
      onSave(data, title, selectedProperty);
    }
  };
  
  // Handsontable settings with robust functionality
  const hotSettings = {
    data: data,
    rowHeaders: true,
    colHeaders: true,
    height: 600,
    width: '100%',
    licenseKey: 'non-commercial-and-evaluation', // Replace with your license key for production
    contextMenu: true,
    formulas: true,
    manualColumnResize: true,
    manualRowResize: true,
    stretchH: 'all',
    autoColumnSize: true,
    minSpareRows: 0,
    minSpareCols: 0,
    fillHandle: true,
    fixedColumnsLeft: 0,
    comments: true,
    filters: true,
    dropdownMenu: true,
    multiColumnSorting: true,
    manualColumnMove: true,
    manualRowMove: true,
    mergeCells: true,
    columnSummary: true,
    outsideClickDeselects: false,
    persistentState: true,
    search: true,
    selectionMode: 'multiple',
    afterChange: (changes: any) => {
      if (changes) {
        console.log('Data changed:', changes);
        // Create a deep copy of the data to update state
        const newData = [...data];
        changes.forEach(([row, prop, oldValue, newValue]: [number, number, any, any]) => {
          newData[row][prop] = newValue;
        });
        setData(newData);
      }
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Header with title and controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-xl font-semibold"
            placeholder="Template Title"
            aria-label="Template Title"
          />
          
          <select 
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
            aria-label="Select Property"
            title="Select Property"
          >
            <option value="">Select Property</option>
            {propertyOptions.map(property => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={generateSampleData}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Generate Sample Data
          </button>
          
          <button
            onClick={handleSave}
            disabled={!selectedProperty}
            className={`px-3 py-1 rounded-md ${
              !selectedProperty 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Save Template
          </button>
        </div>
      </div>
      
      {/* Spreadsheet container */}
      <div className="border border-gray-300 rounded overflow-hidden">
        <HotTable ref={hotTableRef} settings={hotSettings} />
      </div>
      
      {/* Status bar */}
      <div className="text-xs text-gray-500 mt-2">
        <span className="text-blue-600">
          Tip: Use arrow keys to navigate, Shift+Arrow for selection, Ctrl+C/Ctrl+V for copy/paste
        </span>
      </div>
    </div>
  );
};

export default FinancialTemplateEditor; 