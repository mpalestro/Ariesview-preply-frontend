import React, { useState } from 'react';
import ExcelEditor from './ExcelEditor';
import HandsontableExcel from './HandsontableExcel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FilePlus2, Upload } from "lucide-react";
import Image from "next/image";

interface FinancialHubProps {
  propertyName: string;
}

// New component for editable financial metric cards
interface FinancialMetricCardProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  info?: string;
  editable?: boolean;
}

// Excel Sheet Tab Component
interface ExcelSheetTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const ExcelSheetTab: React.FC<ExcelSheetTabProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium border-b ${
        isActive
          ? 'bg-blue-50 border-blue-500 text-blue-700'
          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
      }`}
    >
      <span>{label}</span>
      {isActive && (
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
};

// Excel Sheet Content
interface ExcelSheetContentProps {
  label: string;
}

const ExcelSheetContent: React.FC<ExcelSheetContentProps> = ({ label }) => {
  // Excel data based on the tab type
  const getExcelData = () => {
    switch (label.toLowerCase()) {
      case 'property':
        return {
          headers: ['Property Name', 'Address', 'City', 'State', 'Zip', 'Property Type', 'Year Built', 'Square Footage'],
          rows: [
            ['West Broadway 502', '502 West Broadway', 'San Diego', 'CA', '92101', 'Office', '1985', '45,000'],
            ['Property Details', '', '', '', '', '', '', ''],
            ['Purchase Date', 'May 2022', '', '', '', '', '', ''],
            ['Ownership Type', 'Fee Simple', '', '', '', '', '', ''],
            ['Land Area (acres)', '0.75', '', '', '', '', '', ''],
            ['Parking Spaces', '112', '', '', '', '', '', ''],
            ['Occupancy Rate', '92%', '', '', '', '', '', ''],
            ['Property Manager', 'Evolston PM', '', '', '', '', '', ''],
            ['Notes', 'Class A office building with recent renovations', '', '', '', '', '', '', '']
          ]
        };
      case 'unit mix':
        return {
          headers: ['Unit Type', 'Count', 'SF/Unit', 'Total SF', 'Rent/SF', 'Monthly Rent', 'Annual Rent', 'Occupancy'],
          rows: [
            ['Suite 100', '1', '5,500', '5,500', '$3.25', '$17,875', '$214,500', '100%'],
            ['Suite 200', '1', '8,250', '8,250', '$3.40', '$28,050', '$336,600', '100%'],
            ['Suite 300', '1', '8,250', '8,250', '$3.35', '$27,638', '$331,650', '100%'],
            ['Suite 400', '1', '8,250', '8,250', '$3.50', '$28,875', '$346,500', '75%'],
            ['Suite 500', '1', '8,250', '8,250', '$3.45', '$28,463', '$341,550', '100%'],
            ['Suite 600', '1', '6,500', '6,500', '$3.30', '$21,450', '$257,400', '80%'],
            ['Totals', '6', '-', '45,000', '$3.38', '$152,350', '$1,828,200', '92%']
          ]
        };
      case 'income':
        return {
          headers: ['Income Item', 'Monthly', 'Annual', 'PSF', '% of Total', 'Year 1', 'Year 2', 'Year 3'],
          rows: [
            ['Base Rent', '$152,350', '$1,828,200', '$40.63', '87.5%', '$1,828,200', '$1,883,046', '$1,939,537'],
            ['Expense Reimbursements', '$18,750', '$225,000', '$5.00', '10.8%', '$225,000', '$231,750', '$238,703'],
            ['Parking Income', '$2,800', '$33,600', '$0.75', '1.6%', '$33,600', '$34,608', '$35,646'],
            ['Other Income', '$250', '$3,000', '$0.07', '0.1%', '$3,000', '$3,090', '$3,183'],
            ['Vacancy', '($10,640)', '($127,680)', '($2.84)', '-6.1%', '($127,680)', '($131,510)', '($135,456)'],
            ['Total Income', '$163,510', '$1,962,120', '$43.60', '100.0%', '$1,962,120', '$2,020,984', '$2,081,613']
          ]
        };
      case 'expense':
        return {
          headers: ['Expense Item', 'Monthly', 'Annual', 'PSF', '% of Total', 'Year 1', 'Year 2', 'Year 3'],
          rows: [
            ['Property Tax', '$16,875', '$202,500', '$4.50', '27.0%', '$202,500', '$208,575', '$214,832'],
            ['Insurance', '$5,625', '$67,500', '$1.50', '9.0%', '$67,500', '$69,525', '$71,611'],
            ['Utilities', '$11,250', '$135,000', '$3.00', '18.0%', '$135,000', '$139,050', '$143,222'],
            ['Repairs & Maintenance', '$7,500', '$90,000', '$2.00', '12.0%', '$90,000', '$92,700', '$95,481'],
            ['Janitorial', '$6,750', '$81,000', '$1.80', '10.8%', '$81,000', '$83,430', '$85,933'],
            ['Management Fee', '$5,906', '$70,867', '$1.57', '9.5%', '$70,867', '$73,000', '$75,190'],
            ['General & Administrative', '$3,750', '$45,000', '$1.00', '6.0%', '$45,000', '$46,350', '$47,741'],
            ['Other Expenses', '$4,875', '$58,500', '$1.30', '7.8%', '$58,500', '$60,255', '$62,063'],
            ['Total Expenses', '$62,531', '$750,367', '$16.67', '100.0%', '$750,367', '$772,885', '$796,071']
          ]
        };
      case 'closing cost':
        return {
          headers: ['Item', 'Amount', '% of Purchase Price', 'Notes'],
          rows: [
            ['Purchase Price', '$30,000,000', '100.00%', 'Base acquisition cost'],
            ['Title Insurance', '$62,500', '0.21%', 'Standard rate'],
            ['Legal Fees', '$75,000', '0.25%', 'Acquisition legal team'],
            ['Due Diligence', '$45,000', '0.15%', 'Property inspections, environmental'],
            ['Transfer Tax', '$150,000', '0.50%', 'State and local fees'],
            ['Loan Fees', '$225,000', '0.75%', 'Origination and processing'],
            ['Escrow Fees', '$18,500', '0.06%', 'Standard closing costs'],
            ['Recording Fees', '$5,000', '0.02%', 'County recording'],
            ['Other Closing Costs', '$35,000', '0.12%', 'Miscellaneous fees'],
            ['Total Closing Costs', '$616,000', '2.05%', 'Total acquisition costs']
          ]
        };
      case 'capex':
        return {
          headers: ['Project', 'Budget', 'Timeline', 'Status', 'Priority', 'ROI', 'Completion %'],
          rows: [
            ['Lobby Renovation', '$450,000', 'Q2-Q3 2024', 'In Progress', 'High', '15%', '35%'],
            ['HVAC Replacement', '$650,000', 'Q1-Q2 2024', 'In Progress', 'Critical', '12%', '65%'],
            ['Elevator Modernization', '$380,000', 'Q3-Q4 2024', 'Planning', 'Medium', '8%', '5%'],
            ['Restroom Upgrades', '$275,000', 'Q2 2024', 'Not Started', 'Medium', '9%', '0%'],
            ['Parking Garage Repairs', '$180,000', 'Q1 2024', 'Completed', 'High', '11%', '100%'],
            ['Roof Replacement', '$320,000', 'Q4 2024', 'Not Started', 'Medium', '7%', '0%'],
            ['Energy Efficiency Upgrades', '$225,000', 'Q2-Q3 2024', 'Planning', 'Medium', '18%', '10%'],
            ['Façade Improvements', '$190,000', 'Q3 2024', 'Not Started', 'Low', '6%', '0%'],
            ['Total CapEx Budget', '$2,670,000', '2024', '-', '-', '-', '29%']
          ]
        };
      case 'finance and uses':
        return {
          headers: ['Sources', 'Amount', '% of Total'],
          rows: [
            ['Senior Debt', '$21,000,000', '70.0%'],
            ['LP Equity', '$7,500,000', '25.0%'],
            ['GP Equity', '$1,500,000', '5.0%'],
            ['Total Sources', '$30,000,000', '100.0%'],
            ['', '', ''],
            ['Uses', 'Amount', '% of Total'],
            ['Purchase Price', '$30,000,000', '97.9%'],
            ['Closing Costs', '$616,000', '2.1%'],
            ['Total Uses', '$30,616,000', '100.0%']
          ]
        };
      case 'sale':
        return {
          headers: ['Exit Assumptions', 'Value', 'Notes'],
          rows: [
            ['Exit Year', '5', 'Target hold period'],
            ['Exit Cap Rate', '6.50%', 'Conservative projection'],
            ['NOI at Sale', '$2,571,942', 'Year 5 projected NOI'],
            ['Sale Price', '$39,568,338', 'NOI / Exit Cap Rate'],
            ['Sale Price PSF', '$879', 'Based on 45,000 SF'],
            ['Sale Costs', '$989,208', '2.5% of Sale Price'],
            ['Net Sale Proceeds', '$38,579,130', 'Sale Price less costs'],
            ['Return of Capital', '$30,000,000', 'Original investment'],
            ['Net Profit', '$8,579,130', 'Before debt payoff'],
            ['IRR', '14.14%', 'Project IRR'],
            ['Cash on Cash Return', '7.20%', 'Average over hold period'],
            ['Equity Multiple', '1.82x', 'Total return / initial investment']
          ]
        };
      case 'rent comps':
        return {
          headers: ['Property', 'Address', 'Class', 'Size (SF)', 'Rent/SF', 'Year Built', 'Occupancy', 'Distance'],
          rows: [
            ['One America Plaza', '600 W Broadway', 'A+', '623,000', '$3.75', '1991', '93%', '0.2 mi'],
            ['Symphony Towers', '750 B Street', 'A', '435,000', '$3.60', '1989', '90%', '0.4 mi'],
            ['DiamondView Tower', '350 10th Ave', 'A', '305,000', '$3.65', '2007', '95%', '0.7 mi'],
            ['Wells Fargo Plaza', '401 B Street', 'A', '560,000', '$3.50', '1984', '88%', '0.5 mi'],
            ['Columbia Center', '401 W A Street', 'A', '361,000', '$3.45', '1990', '92%', '0.3 mi'],
            ['550 Corporate Center', '550 W C Street', 'B+', '174,000', '$3.25', '1987', '85%', '0.6 mi'],
            ['707 Broadway', '707 Broadway', 'B+', '172,000', '$3.30', '1986', '82%', '0.5 mi'],
            ['Average', '', 'A-', '375,714', '$3.50', '1990', '89%', '0.5 mi'],
            ['Subject Property', '502 W Broadway', 'A', '45,000', '$3.38', '1985', '92%', '-']
          ]
        };
      default:
        return {
          headers: ['Column 1', 'Column 2', 'Column 3', 'Column 4'],
          rows: [
            ['Data 1', 'Data 2', 'Data 3', 'Data 4'],
            ['Data 5', 'Data 6', 'Data 7', 'Data 8']
          ]
        };
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(getExcelData());
  const [editCell, setEditCell] = useState<{row: number, col: number, value: string} | null>(null);

  // Function to handle editing a cell
  const handleCellEdit = (rowIndex: number, colIndex: number, value: string) => {
    const newData = {...data};
    const newRows = [...newData.rows];
    
    // Update the specific cell
    newRows[rowIndex] = [...newRows[rowIndex]];
    newRows[rowIndex][colIndex] = value;
    
    // Update state
    setData({...newData, rows: newRows});
    setEditCell(null);
  };

  // Function to handle clicks on cells
  const handleCellClick = (rowIndex: number, colIndex: number, value: string) => {
    if (isEditing) {
      setEditCell({row: rowIndex, col: colIndex, value});
    }
  };

  // Function to handle toggling edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setEditCell(null);
  };

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-r-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">{label} Data</h3>
        <div>
          <button className="text-sm text-blue-600 hover:text-blue-800 mr-4">
            <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export
          </button>
          <button 
            className={`text-sm ${isEditing ? 'text-green-600 hover:text-green-800' : 'text-blue-600 hover:text-blue-800'}`}
            onClick={toggleEditMode}
          >
            {isEditing ? (
              <>
                <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Done Editing
              </>
            ) : (
              <>
                <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit
              </>
            )}
          </button>
        </div>
      </div>
      
      {isEditing && (
        <div className="bg-blue-50 p-3 mb-4 rounded-md border border-blue-200">
          <p className="text-sm text-blue-700 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Click on any cell to edit its value. Click "Done Editing" when finished.
          </p>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <div className="excel-sheet border border-gray-200">
          {/* Excel Header Row (Column Labels) */}
          <div className="excel-header grid" style={{ gridTemplateColumns: `repeat(${data.headers.length}, minmax(100px, 1fr))` }}>
            {data.headers.map((header, index) => (
              <div key={`header-${index}`} className="excel-cell font-semibold bg-gray-100 p-2 border-b border-r border-gray-300">
                {header}
              </div>
            ))}
          </div>
          
          {/* Excel Data Rows */}
          {data.rows.map((row, rowIndex) => (
            <div 
              key={`row-${rowIndex}`} 
              className="excel-row grid" 
              style={{ gridTemplateColumns: `repeat(${data.headers.length}, minmax(100px, 1fr))` }}
            >
              {row.map((cell, cellIndex) => (
                editCell && editCell.row === rowIndex && editCell.col === cellIndex ? (
                  <div 
                    key={`cell-${rowIndex}-${cellIndex}`}
                    className="excel-cell p-2 border-b border-r border-gray-300 bg-blue-50"
                  >
                    <input
                      type="text"
                      className="w-full p-1 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editCell.value}
                      onChange={(e) => setEditCell({...editCell, value: e.target.value})}
                      onBlur={() => handleCellEdit(rowIndex, cellIndex, editCell.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCellEdit(rowIndex, cellIndex, editCell.value);
                        }
                      }}
                      autoFocus
                      aria-label={`Edit ${data.headers[cellIndex]}, row ${rowIndex + 1}`}
                      title={`Edit ${data.headers[cellIndex]}, row ${rowIndex + 1}`}
                      placeholder={`Enter value for ${data.headers[cellIndex]}`}
                    />
                  </div>
                ) : (
                  <div 
                    key={`cell-${rowIndex}-${cellIndex}`}
                    className={`excel-cell p-2 border-b border-r border-gray-300 ${
                      cellIndex === 0 || rowIndex === 0 ? 'font-medium' : ''
                    } ${
                      rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } ${
                      isEditing ? 'cursor-pointer hover:bg-blue-50' : ''
                    }`}
                    onClick={() => handleCellClick(rowIndex, cellIndex, cell)}
                  >
                    {cell}
                  </div>
                )
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-gray-500 text-sm mt-4 flex justify-between items-center">
        <div>
          <span className="font-medium">Sheet:</span> {label} • 
          <span className="font-medium ml-2">Rows:</span> {data.rows.length} • 
          <span className="font-medium ml-2">Columns:</span> {data.headers.length}
        </div>
        {isEditing && (
          <div className="text-blue-600 text-xs">
            Click on cells to edit
          </div>
        )}
      </div>
    </div>
  );
};

const FinancialMetricCard: React.FC<FinancialMetricCardProps> = ({ 
  label, 
  value, 
  onChange, 
  info,
  editable = true
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleClick = () => {
    if (editable) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onChange(inputValue);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-600">
          {label} {info && <span className="ml-1 text-gray-400 cursor-help" title={info}>?</span>}
        </div>
        {editable && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 text-xs"
            aria-label={`Edit ${label}`}
            title={`Edit ${label}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        )}
      </div>
      <div className="mt-1" onClick={handleClick}>
        {isEditing ? (
          <input
            type="text"
            className="w-full text-xl font-semibold text-gray-900 border-b border-blue-500 focus:outline-none"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label={`${label} value`}
            title={`${label} value`}
            placeholder={`Enter ${label}`}
          />
        ) : (
          <div className="text-xl font-semibold text-gray-900 cursor-pointer">
            {value}
          </div>
        )}
      </div>
    </div>
  );
};

const FinancialHub: React.FC<FinancialHubProps> = ({ propertyName }) => {
  // Financial metrics from the image
  const [financialData, setFinancialData] = useState({
    purchasePrice: "$30MM",
    whisperPrice: "$30MM",
    cashOnCash: "7.20%",
    irr: "14.14%",
    totalInvestorReturn: "81.89%",
    holdingPeriod: "5",
    entryCap: "6.90%",
    marketCap: "6%",
    exitCap: "6.50%",
    exitValue: "$39.57MM",
    loanInterestRate: "5.5%",
    dscr: "2.01"
  });

  const updateFinancialData = (key: string, value: string) => {
    setFinancialData({
      ...financialData,
      [key]: value
    });
  };

  // Function to get initial data for each sheet type
  const getInitialDataForSheet = (sheetId: string) => {
    switch (sheetId) {
      case 'property':
        return [
          ['Property Name', 'Address', 'City', 'State', 'Zip', 'Property Type', 'Year Built', 'Square Footage'],
          ['West Broadway 502', '502 West Broadway', 'San Diego', 'CA', '92101', 'Office', '1985', '45,000'],
          ['Property Details', '', '', '', '', '', '', ''],
          ['Purchase Date', 'May 2022', '', '', '', '', '', ''],
          ['Ownership Type', 'Fee Simple', '', '', '', '', '', ''],
          ['Land Area (acres)', '0.75', '', '', '', '', '', ''],
          ['Parking Spaces', '112', '', '', '', '', '', ''],
          ['Occupancy Rate', '92%', '', '', '', '', '', ''],
          ['Property Manager', 'Evolston PM', '', '', '', '', '', ''],
          ['Notes', 'Class A office building with recent renovations', '', '', '', '', '', '']
        ];
      case 'unitMix':
        return [
          ['Unit Type', 'Count', 'SF/Unit', 'Total SF', 'Rent/SF', 'Monthly Rent', 'Annual Rent', 'Occupancy'],
          ['Suite 100', '1', '5,500', '5,500', '$3.25', '$17,875', '$214,500', '100%'],
          ['Suite 200', '1', '8,250', '8,250', '$3.40', '$28,050', '$336,600', '100%'],
          ['Suite 300', '1', '8,250', '8,250', '$3.35', '$27,638', '$331,650', '100%'],
          ['Suite 400', '1', '8,250', '8,250', '$3.50', '$28,875', '$346,500', '75%'],
          ['Suite 500', '1', '8,250', '8,250', '$3.45', '$28,463', '$341,550', '100%'],
          ['Suite 600', '1', '6,500', '6,500', '$3.30', '$21,450', '$257,400', '80%'],
          ['Totals', '6', '-', '45,000', '$3.38', '$152,350', '$1,828,200', '92%']
        ];
      case 'income':
        return [
          ['Income Item', 'Monthly', 'Annual', 'PSF', '% of Total', 'Year 1', 'Year 2', 'Year 3'],
          ['Base Rent', '$152,350', '$1,828,200', '$40.63', '87.5%', '$1,828,200', '$1,883,046', '$1,939,537'],
          ['Expense Reimbursements', '$18,750', '$225,000', '$5.00', '10.8%', '$225,000', '$231,750', '$238,703'],
          ['Parking Income', '$2,800', '$33,600', '$0.75', '1.6%', '$33,600', '$34,608', '$35,646'],
          ['Other Income', '$250', '$3,000', '$0.07', '0.1%', '$3,000', '$3,090', '$3,183'],
          ['Vacancy', '($10,640)', '($127,680)', '($2.84)', '-6.1%', '($127,680)', '($131,510)', '($135,456)'],
          ['Total Income', '$163,510', '$1,962,120', '$43.60', '100.0%', '$1,962,120', '$2,020,984', '$2,081,613']
        ];
      case 'expense':
        return [
          ['Expense Item', 'Monthly', 'Annual', 'PSF', '% of Total', 'Year 1', 'Year 2', 'Year 3'],
          ['Property Tax', '$16,875', '$202,500', '$4.50', '27.0%', '$202,500', '$208,575', '$214,832'],
          ['Insurance', '$5,625', '$67,500', '$1.50', '9.0%', '$67,500', '$69,525', '$71,611'],
          ['Utilities', '$11,250', '$135,000', '$3.00', '18.0%', '$135,000', '$139,050', '$143,222'],
          ['Repairs & Maintenance', '$7,500', '$90,000', '$2.00', '12.0%', '$90,000', '$92,700', '$95,481'],
          ['Janitorial', '$6,750', '$81,000', '$1.80', '10.8%', '$81,000', '$83,430', '$85,933'],
          ['Management Fee', '$5,906', '$70,867', '$1.57', '9.5%', '$70,867', '$73,000', '$75,190'],
          ['General & Administrative', '$3,750', '$45,000', '$1.00', '6.0%', '$45,000', '$46,350', '$47,741'],
          ['Other Expenses', '$4,875', '$58,500', '$1.30', '7.8%', '$58,500', '$60,255', '$62,063'],
          ['Total Expenses', '$62,531', '$750,367', '$16.67', '100.0%', '$750,367', '$772,885', '$796,071']
        ];
      case 'closingCost':
        return [
          ['Item', 'Amount', '% of Purchase Price', 'Notes'],
          ['Purchase Price', '$30,000,000', '100.00%', 'Base acquisition cost'],
          ['Title Insurance', '$62,500', '0.21%', 'Standard rate'],
          ['Legal Fees', '$75,000', '0.25%', 'Acquisition legal team'],
          ['Due Diligence', '$45,000', '0.15%', 'Property inspections, environmental'],
          ['Transfer Tax', '$150,000', '0.50%', 'State and local fees'],
          ['Loan Fees', '$225,000', '0.75%', 'Origination and processing'],
          ['Escrow Fees', '$18,500', '0.06%', 'Standard closing costs'],
          ['Recording Fees', '$5,000', '0.02%', 'County recording'],
          ['Other Closing Costs', '$35,000', '0.12%', 'Miscellaneous fees'],
          ['Total Closing Costs', '$616,000', '2.05%', 'Total acquisition costs']
        ];
      case 'capex':
        return [
          ['Project', 'Budget', 'Timeline', 'Status', 'Priority', 'ROI', 'Completion %'],
          ['Lobby Renovation', '$450,000', 'Q2-Q3 2024', 'In Progress', 'High', '15%', '35%'],
          ['HVAC Replacement', '$650,000', 'Q1-Q2 2024', 'In Progress', 'Critical', '12%', '65%'],
          ['Elevator Modernization', '$380,000', 'Q3-Q4 2024', 'Planning', 'Medium', '8%', '5%'],
          ['Restroom Upgrades', '$275,000', 'Q2 2024', 'Not Started', 'Medium', '9%', '0%'],
          ['Parking Garage Repairs', '$180,000', 'Q1 2024', 'Completed', 'High', '11%', '100%'],
          ['Roof Replacement', '$320,000', 'Q4 2024', 'Not Started', 'Medium', '7%', '0%'],
          ['Energy Efficiency Upgrades', '$225,000', 'Q2-Q3 2024', 'Planning', 'Medium', '18%', '10%'],
          ['Façade Improvements', '$190,000', 'Q3 2024', 'Not Started', 'Low', '6%', '0%'],
          ['Total CapEx Budget', '$2,670,000', '2024', '-', '-', '-', '29%']
        ];
      case 'finance':
        return [
          ['Sources', 'Amount', '% of Total'],
          ['Senior Debt', '$21,000,000', '70.0%'],
          ['LP Equity', '$7,500,000', '25.0%'],
          ['GP Equity', '$1,500,000', '5.0%'],
          ['Total Sources', '$30,000,000', '100.0%'],
          ['', '', ''],
          ['Uses', 'Amount', '% of Total'],
          ['Purchase Price', '$30,000,000', '97.9%'],
          ['Closing Costs', '$616,000', '2.1%'],
          ['Total Uses', '$30,616,000', '100.0%']
        ];
      case 'sale':
        return [
          ['Exit Assumptions', 'Value', 'Notes'],
          ['Exit Year', '5', 'Target hold period'],
          ['Exit Cap Rate', '6.50%', 'Conservative projection'],
          ['NOI at Sale', '$2,571,942', 'Year 5 projected NOI'],
          ['Sale Price', '$39,568,338', 'NOI / Exit Cap Rate'],
          ['Sale Price PSF', '$879', 'Based on 45,000 SF'],
          ['Sale Costs', '$989,208', '2.5% of Sale Price'],
          ['Net Sale Proceeds', '$38,579,130', 'Sale Price less costs'],
          ['Return of Capital', '$30,000,000', 'Original investment'],
          ['Net Profit', '$8,579,130', 'Before debt payoff'],
          ['IRR', '14.14%', 'Project IRR'],
          ['Cash on Cash Return', '7.20%', 'Average over hold period'],
          ['Equity Multiple', '1.82x', 'Total return / initial investment']
        ];
      case 'rentComps':
        return [
          ['Property', 'Address', 'Class', 'Size (SF)', 'Rent/SF', 'Year Built', 'Occupancy', 'Distance'],
          ['One America Plaza', '600 W Broadway', 'A+', '623,000', '$3.75', '1991', '93%', '0.2 mi'],
          ['Symphony Towers', '750 B Street', 'A', '435,000', '$3.60', '1989', '90%', '0.4 mi'],
          ['DiamondView Tower', '350 10th Ave', 'A', '305,000', '$3.65', '2007', '95%', '0.7 mi'],
          ['Wells Fargo Plaza', '401 B Street', 'A', '560,000', '$3.50', '1984', '88%', '0.5 mi'],
          ['Columbia Center', '401 W A Street', 'A', '361,000', '$3.45', '1990', '92%', '0.3 mi'],
          ['550 Corporate Center', '550 W C Street', 'B+', '174,000', '$3.25', '1987', '85%', '0.6 mi'],
          ['707 Broadway', '707 Broadway', 'B+', '172,000', '$3.30', '1986', '82%', '0.5 mi'],
          ['Average', '', 'A-', '375,714', '$3.50', '1990', '89%', '0.5 mi'],
          ['Subject Property', '502 W Broadway', 'A', '45,000', '$3.38', '1985', '92%', '-']
        ];
      default:
        return [['No data available']];
    }
  };

  // Handle saving Excel sheets
  const handleSaveExcelSheet = (data: any[][], sheetName: string, sheetId: string) => {
    console.log(`Saving ${sheetName} Excel data:`, data);
    // In a real application, this would save to your backend
    alert(`${sheetName} data has been saved!`);
  };

  // Function to get initial data for financial analysis tabs
  const getFinancialAnalysisData = (tabId: string) => {
    switch (tabId) {
      case 'summary':
        return [
          ['West Broadway 502 - Summary', '', '', '', ''],
          ['As of January 2024', '', '', '', ''],
          ['', '', '', '', ''],
          ['Metric', 'Current', 'Prior Year', 'Change', 'Notes'],
          ['Property Value', '$33,500,000', '$30,000,000', '+11.7%', 'Based on recent appraisal'],
          ['NOI', '$2,070,000', '$1,920,000', '+7.8%', 'Increased due to new leases'],
          ['Cap Rate', '6.18%', '6.40%', '-0.22%', 'Market compression'],
          ['Occupancy', '92%', '88%', '+4%', 'New tenants in Q4 2023'],
          ['Avg Lease Term', '7.2 years', '6.5 years', '+0.7 years', 'New long-term tenant'],
          ['WALT', '4.3 years', '3.8 years', '+0.5 years', 'Weighted average lease term'],
          ['Debt Balance', '$21,000,000', '$21,000,000', '0%', 'No principal paydown yet'],
          ['LTV', '62.7%', '70.0%', '-7.3%', 'Improved due to value increase'],
          ['DSCR', '2.01', '1.86', '+0.15', 'Improved debt service coverage'],
          ['', '', '', '', ''],
          ['Performance Summary', '', '', '', ''],
          ['Property is outperforming projections with strong leasing momentum and positive mark-to-market on new leases.', '', '', '', '']
        ];
      case 'assumptions':
        return [
          ['West Broadway 502 - Assumptions', '', '', '', ''],
          ['', '', '', '', ''],
          ['General Assumptions', '', '', '', ''],
          ['Acquisition Date', 'May 2022', '', '', ''],
          ['Hold Period', '5 years', '', '', ''],
          ['Exit Date', 'May 2027', '', '', ''],
          ['', '', '', '', ''],
          ['Growth Rates', 'Year 1', 'Year 2', 'Year 3', 'Year 4+'],
          ['Revenue Growth', '3.0%', '3.0%', '2.5%', '2.5%'],
          ['Expense Growth', '2.5%', '2.5%', '2.0%', '2.0%'],
          ['', '', '', '', ''],
          ['Leasing Assumptions', '', '', '', ''],
          ['Renewal Probability', '70%', '', '', ''],
          ['Downtime', '6 months', '', '', ''],
          ['TI - New Leases', '$65/SF', '', '', ''],
          ['TI - Renewals', '$15/SF', '', '', ''],
          ['Leasing Commissions - New', '6%', '', '', ''],
          ['Leasing Commissions - Renewal', '3%', '', '', ''],
          ['', '', '', '', ''],
          ['Exit Assumptions', '', '', '', ''],
          ['Exit Cap Rate', '6.50%', '', '', ''],
          ['Selling Costs', '2.50%', '', '', '']
        ];
      case 'yieldMatrix':
        return [
          ['West Broadway 502 - Yield Matrix', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['Exit Cap Rate', 'Exit Year 4', 'Exit Year 5', 'Exit Year 6', 'Exit Year 7', 'Exit Year 8', 'Exit Year 9', 'Exit Year 10'],
          ['5.50%', '18.4%', '17.2%', '16.3%', '15.4%', '14.7%', '14.1%', '13.5%'],
          ['5.75%', '17.1%', '16.2%', '15.5%', '14.8%', '14.1%', '13.5%', '13.0%'],
          ['6.00%', '15.9%', '15.3%', '14.7%', '14.1%', '13.5%', '13.0%', '12.6%'],
          ['6.25%', '14.8%', '14.4%', '13.9%', '13.4%', '12.9%', '12.5%', '12.1%'],
          ['6.50%', '13.7%', '13.5%', '13.1%', '12.7%', '12.3%', '12.0%', '11.7%'],
          ['6.75%', '12.7%', '12.6%', '12.3%', '12.0%', '11.7%', '11.5%', '11.2%'],
          ['7.00%', '11.8%', '11.8%', '11.6%', '11.4%', '11.2%', '11.0%', '10.8%'],
          ['', '', '', '', '', '', '', ''],
          ['Note: Values represent IRR projections', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['Current Assumption', '', '', '', '', '', '', ''],
          ['Exit Cap: 6.50%', '', '', '', '', '', '', ''],
          ['Hold Period: 5 years', '', '', '', '', '', '', ''],
          ['Projected IRR: 13.5%', '', '', '', '', '', '', '']
        ];
      case 'pandl':
        return [
          ['West Broadway 502 - Profit & Loss', '', '', '', '', '', ''],
          ['', '', '', '', '', '', ''],
          ['', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Total'],
          ['INCOME', '', '', '', '', '', ''],
          ['Base Rental Income', '$1,828,200', '$1,883,046', '$1,939,537', '$1,987,526', '$2,037,214', '$9,675,523'],
          ['Expense Reimbursements', '$225,000', '$231,750', '$238,703', '$243,477', '$248,346', '$1,187,276'],
          ['Parking Income', '$33,600', '$34,608', '$35,646', '$36,359', '$37,086', '$177,299'],
          ['Other Income', '$3,000', '$3,090', '$3,183', '$3,246', '$3,311', '$15,830'],
          ['  Gross Potential Income', '$2,089,800', '$2,152,494', '$2,217,069', '$2,270,608', '$2,325,957', '$11,055,928'],
          ['Less: Vacancy', '($127,680)', '($131,510)', '($135,456)', '($132,423)', '($135,734)', '($662,803)'],
          ['  Effective Gross Income', '$1,962,120', '$2,020,984', '$2,081,613', '$2,138,185', '$2,190,223', '$10,393,125'],
          ['', '', '', '', '', '', ''],
          ['EXPENSES', '', '', '', '', '', ''],
          ['Property Tax', '$202,500', '$208,575', '$214,832', '$219,129', '$223,511', '$1,068,547'],
          ['Insurance', '$67,500', '$69,525', '$71,611', '$73,043', '$74,504', '$356,183'],
          ['Utilities', '$135,000', '$139,050', '$143,222', '$146,086', '$149,008', '$712,366'],
          ['Repairs & Maintenance', '$90,000', '$92,700', '$95,481', '$97,391', '$99,338', '$474,910'],
          ['Janitorial', '$81,000', '$83,430', '$85,933', '$87,651', '$89,404', '$427,418'],
          ['Management Fee', '$70,867', '$73,000', '$75,190', '$77,070', '$78,997', '$375,124'],
          ['General & Administrative', '$45,000', '$46,350', '$47,741', '$48,695', '$49,669', '$237,455'],
          ['Other Expenses', '$58,500', '$60,255', '$62,063', '$63,304', '$64,570', '$308,692'],
          ['  Total Operating Expenses', '$750,367', '$772,885', '$796,073', '$812,369', '$828,991', '$3,960,695'],
          ['', '', '', '', '', '', ''],
          ['NET OPERATING INCOME', '$1,211,753', '$1,248,099', '$1,285,540', '$1,325,816', '$1,361,232', '$6,432,430']
        ];
      case 'lev':
        return [
          ['West Broadway 502 - Leasing & Expiration Values', '', '', '', '', '', ''],
          ['', '', '', '', '', '', ''],
          ['Suite', 'Tenant', 'SF', 'Lease Start', 'Lease End', 'Current Rent/SF', 'Market Rent/SF'],
          ['100', 'First National Bank', '5,500', '01/01/2021', '12/31/2030', '$3.25', '$3.60'],
          ['200', 'Smith & Partners Law', '8,250', '06/01/2022', '05/31/2027', '$3.40', '$3.50'],
          ['300', 'Johnson Consulting', '8,250', '03/01/2020', '02/28/2025', '$3.35', '$3.55'],
          ['400', 'Tech Innovators Inc.', '8,250', '09/01/2023', '08/31/2028', '$3.50', '$3.50'],
          ['500', 'Allied Insurance Group', '8,250', '04/01/2022', '03/31/2032', '$3.45', '$3.40'],
          ['600', 'Vacant', '6,500', 'N/A', 'N/A', 'N/A', '$3.30'],
          ['', '', '', '', '', '', ''],
          ['ROLLOVER SUMMARY', '', '', '', '', '', ''],
          ['Year', 'SF Expiring', '% of Building', 'Expiring Rent', 'Market Rent', 'Mark-to-Market', 'Est. TI/LC Costs'],
          ['2024', '0', '0.0%', '$0', '$0', '0.0%', '$0'],
          ['2025', '8,250', '18.3%', '$3.35', '$3.55', '6.0%', '$412,500'],
          ['2026', '0', '0.0%', '$0', '$0', '0.0%', '$0'],
          ['2027', '8,250', '18.3%', '$3.40', '$3.50', '2.9%', '$412,500'],
          ['2028', '8,250', '18.3%', '$3.50', '$3.50', '0.0%', '$412,500'],
          ['2029', '0', '0.0%', '$0', '$0', '0.0%', '$0'],
          ['2030+', '13,750', '30.6%', '$3.35', '$3.50', '4.5%', '$687,500']
        ];
      case 'roofReserve':
        return [
          ['West Broadway 502 - Roof Reserve Analysis', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['Roof Section', 'Area (SF)', 'Age (Years)', 'Expected Life', 'Remaining Life', 'Replacement Cost'],
          ['Main Building (East)', '12,500', '18', '25', '7', '$187,500'],
          ['Main Building (West)', '12,500', '18', '25', '7', '$187,500'],
          ['North Wing', '8,000', '10', '25', '15', '$120,000'],
          ['South Wing', '8,000', '10', '25', '15', '$120,000'],
          ['Entry Canopy', '500', '5', '20', '15', '$15,000'],
          ['', '', '', '', '', ''],
          ['RESERVE FUNDING SCHEDULE', '', '', '', '', ''],
          ['Year', 'Annual Funding', 'Expenditures', 'Running Balance', '', ''],
          ['Current', '$0', '$0', '$150,000', '', ''],
          ['2024', '$50,000', '$0', '$200,000', '', ''],
          ['2025', '$50,000', '$0', '$250,000', '', ''],
          ['2026', '$50,000', '$0', '$300,000', '', ''],
          ['2027', '$50,000', '$0', '$350,000', '', ''],
          ['2028', '$50,000', '$0', '$400,000', '', ''],
          ['2029', '$50,000', '$0', '$450,000', '', ''],
          ['2030', '$50,000', '$375,000', '$125,000', '', ''],
          ['2031', '$50,000', '$0', '$175,000', '', ''],
          ['', '', '', '', '', ''],
          ['NOTES', '', '', '', '', ''],
          ['Roof inspection conducted Q4 2023. Main building sections showing signs of wear but no immediate issues.', '', '', '', '', ''],
          ['Recommended increased reserve funding to prepare for replacement at end of expected life.', '', '', '', '', '']
        ];
      // Add more cases for other tabs
      case 'immPhysNeeds':
        return [
          ['West Broadway 502 - Immediate Physical Needs', '', '', '', ''],
          ['', '', '', '', ''],
          ['Item', 'Priority', 'Cost Estimate', 'Timeline', 'Status'],
          ['HVAC System Replacement (Phase 1)', 'Critical', '$375,000', 'Q1-Q2 2024', 'In Progress'],
          ['Parking Garage Repairs', 'High', '$180,000', 'Q1 2024', 'Completed'],
          ['Elevator Modernization', 'Medium', '$380,000', 'Q3-Q4 2024', 'Planning'],
          ['Fire Alarm System Upgrade', 'High', '$125,000', 'Q2 2024', 'Scheduled'],
          ['ADA Compliance Improvements', 'Medium', '$95,000', 'Q2-Q3 2024', 'Not Started'],
          ['Main Lobby Renovation', 'Low', '$450,000', 'Q3-Q4 2024', 'Design Phase'],
          ['Exterior Waterproofing', 'Medium', '$110,000', 'Q3 2024', 'Not Started'],
          ['', '', '', '', ''],
          ['SUMMARY', '', '', '', ''],
          ['Total Critical Needs', '$375,000', '', '', ''],
          ['Total High Priority', '$305,000', '', '', ''],
          ['Total Medium Priority', '$585,000', '', '', ''],
          ['Total Low Priority', '$450,000', '', '', ''],
          ['Total Physical Needs', '$1,715,000', '', '', ''],
          ['', '', '', '', ''],
          ['FUNDING STATUS', '', '', '', ''],
          ['Available CapEx Budget', '$2,000,000', '', '', ''],
          ['Committed Funds', '$555,000', '', '', ''],
          ['Remaining Available', '$1,445,000', '', '', '']
        ];
      case 'comps':
        return [
          ['West Broadway 502 - Comparable Properties', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', ''],
          ['Property', 'Address', 'Class', 'Year Built', 'Size (SF)', 'Occupancy', 'Rent/SF', 'Sale Price', 'Sale Date'],
          ['One America Plaza', '600 W Broadway', 'A+', '1991', '623,000', '93%', '$3.75', '$330M ($530/SF)', 'Jun 2022'],
          ['Symphony Towers', '750 B Street', 'A', '1989', '435,000', '90%', '$3.60', '$250M ($575/SF)', 'Oct 2021'],
          ['DiamondView Tower', '350 10th Ave', 'A', '2007', '305,000', '95%', '$3.65', 'N/A', 'N/A'],
          ['Wells Fargo Plaza', '401 B Street', 'A', '1984', '560,000', '88%', '$3.50', '$280M ($500/SF)', 'Feb 2023'],
          ['Columbia Center', '401 W A Street', 'A', '1990', '361,000', '92%', '$3.45', '$175M ($485/SF)', 'Nov 2022'],
          ['550 Corporate Center', '550 W C Street', 'B+', '1987', '174,000', '85%', '$3.25', '$82M ($471/SF)', 'May 2023'],
          ['707 Broadway', '707 Broadway', 'B+', '1986', '172,000', '82%', '$3.30', 'N/A', 'N/A'],
          ['COMP AVERAGES', '', 'A-', '1990', '375,714', '89%', '$3.50', '$516/SF', ''],
          ['Subject Property', '502 W Broadway', 'A', '1985', '45,000', '92%', '$3.38', '$30M ($667/SF)', 'May 2022'],
          ['', '', '', '', '', '', '', '', ''],
          ['MARKET TRENDS', '', '', '', '', '', '', '', ''],
          ['Leasing activity has increased 12% year-over-year in the downtown submarket.', '', '', '', '', '', '', '', ''],
          ['Class A office cap rates have compressed by approximately 25 basis points over the past 12 months.', '', '', '', '', '', '', '', ''],
          ['Average tenant improvement allowances have increased to $65/SF for new leases.', '', '', '', '', '', '', '', '']
        ];
      case 'commercialArgus':
        return [
          ['West Broadway 502 - ARGUS Projection Summary', '', '', '', ''],
          ['', '', '', '', ''],
          ['10-YEAR CASH FLOW PROJECTION', '', '', '', ''],
          ['', 'Year 1-5 Average', 'Year 6-10 Average', 'Total 10-Year', ''],
          ['Potential Gross Revenue', '$2,211,186', '$2,450,650', '$23,309,178', ''],
          ['Effective Gross Revenue', '$2,078,625', '$2,303,611', '$21,911,178', ''],
          ['Operating Expenses', '$792,122', '$877,703', '$8,349,129', ''],
          ['Net Operating Income', '$1,286,503', '$1,425,908', '$13,562,049', ''],
          ['Capital Expenditures', '$268,750', '$225,000', '$2,468,750', ''],
          ['Leasing & Capital Costs', '$150,000', '$175,000', '$1,625,000', ''],
          ['Cash Flow Before Debt Service', '$867,753', '$1,025,908', '$9,468,299', ''],
          ['Debt Service', '$1,152,000', '$1,152,000', '$11,520,000', ''],
          ['Cash Flow After Debt Service', '$715,753', '$873,908', '$7,948,299', ''],
          ['', '', '', '', ''],
          ['VALUATION SUMMARY', '', '', '', ''],
          ['Capitalization Rate', '6.18%', '', '', ''],
          ['Terminal Capitalization Rate', '6.50%', '', '', ''],
          ['Discount Rate', '8.00%', '', '', ''],
          ['Net Present Value', '$36,750,000', '', '', ''],
          ['Value per Square Foot', '$817', '', '', ''],
          ['Implied Going-in Cap Rate', '6.18%', '', '', ''],
          ['Internal Rate of Return (IRR)', '13.5%', '', '', ''],
          ['Equity Multiple', '1.82x', '', '', '']
        ];
      // More cases for other tabs
      case 'operatingStatement':
        return [
          ['West Broadway 502 - Operating Statement', '', '', '', ''],
          ['For the Year Ending December 31, 2023', '', '', '', ''],
          ['', '', '', '', ''],
          ['INCOME', 'Actual', 'Budget', 'Variance $', 'Variance %'],
          ['Base Rental Income', '$1,828,200', '$1,800,000', '$28,200', '1.6%'],
          ['Expense Reimbursements', '$225,000', '$215,000', '$10,000', '4.7%'],
          ['Parking Income', '$33,600', '$30,000', '$3,600', '12.0%'],
          ['Other Income', '$3,000', '$5,000', '($2,000)', '-40.0%'],
          ['  Gross Potential Income', '$2,089,800', '$2,050,000', '$39,800', '1.9%'],
          ['Less: Vacancy', '($127,680)', '($150,000)', '$22,320', '-14.9%'],
          ['  Effective Gross Income', '$1,962,120', '$1,900,000', '$62,120', '3.3%'],
          ['', '', '', '', ''],
          ['EXPENSES', '', '', '', ''],
          ['Property Tax', '$202,500', '$200,000', '$2,500', '1.3%'],
          ['Insurance', '$67,500', '$65,000', '$2,500', '3.8%'],
          ['Utilities', '$135,000', '$130,000', '$5,000', '3.8%'],
          ['Repairs & Maintenance', '$90,000', '$85,000', '$5,000', '5.9%'],
          ['Janitorial', '$81,000', '$80,000', '$1,000', '1.3%'],
          ['Management Fee', '$70,867', '$72,000', '($1,133)', '-1.6%'],
          ['General & Administrative', '$45,000', '$40,000', '$5,000', '12.5%'],
          ['Other Expenses', '$58,500', '$60,000', '($1,500)', '-2.5%'],
          ['  Total Operating Expenses', '$750,367', '$732,000', '$18,367', '2.5%'],
          ['', '', '', '', ''],
          ['NET OPERATING INCOME', '$1,211,753', '$1,168,000', '$43,753', '3.7%']
        ];
      // Add default and more cases as needed
      default:
        return [
          ['No data available for this sheet yet', '', '', '', ''],
          ['Please check back later for updates', '', '', '', '']
        ];
    }
  };

  // Define the Excel sheets
  const excelSheets = [
    { id: 'property', name: 'Property Info' },
    { id: 'unitMix', name: 'Unit Mix' },
    { id: 'income', name: 'Income' },
    { id: 'expense', name: 'Expenses' },
    { id: 'closingCost', name: 'Closing Costs' },
    { id: 'capex', name: 'CapEx' },
    { id: 'finance', name: 'Finance' },
    { id: 'sale', name: 'Sale' },
    { id: 'rentComps', name: 'Rent Comps' },
  ];

  return (
    <div className="financial-hub grid gap-6">
      {/* Financial Metrics Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle className="text-xl font-bold">Financial Hub</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <FilePlus2 className="mr-2 h-4 w-4" />
              New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-4 gap-4">
            <div className="col-span-4 flex items-center justify-between rounded-lg border p-3 shadow-sm md:col-span-2">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium tracking-tight">Property Value</h3>
                <div className="text-2xl font-bold tracking-tight">
                  <span className="text-muted-foreground text-base font-normal">Purchase: </span>
                  {financialData.purchasePrice}
                </div>
                <div className="text-base font-normal tracking-tight">
                  <span className="text-muted-foreground">Exit: </span>
                  {financialData.exitValue}
                </div>
              </div>
              <div className="rounded-full border bg-background p-1.5">
                <div
                  className="w-[120px] h-[120px] rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xs"
                >
                  Property Value Chart
                </div>
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4 md:col-span-1">
              <div className="space-y-0.5 rounded-lg border p-3 shadow-sm">
                <h3 className="text-sm font-medium tracking-tight">Cash on Cash</h3>
                <div className="text-2xl font-bold tracking-tight">{financialData.cashOnCash}</div>
              </div>
              <div className="space-y-0.5 rounded-lg border p-3 shadow-sm">
                <h3 className="text-sm font-medium tracking-tight">IRR</h3>
                <div className="text-2xl font-bold tracking-tight">{financialData.irr}</div>
              </div>
              <div className="space-y-0.5 rounded-lg border p-3 shadow-sm">
                <h3 className="text-sm font-medium tracking-tight">Total Return</h3>
                <div className="text-2xl font-bold tracking-tight">{financialData.totalInvestorReturn}</div>
              </div>
              <div className="space-y-0.5 rounded-lg border p-3 shadow-sm">
                <h3 className="text-sm font-medium tracking-tight">Hold Period</h3>
                <div className="text-2xl font-bold tracking-tight">{financialData.holdingPeriod} yrs</div>
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4 md:col-span-1">
              <div className="space-y-0.5 rounded-lg border p-3 shadow-sm">
                <h3 className="text-sm font-medium tracking-tight">Entry Cap</h3>
                <div className="text-2xl font-bold tracking-tight">{financialData.entryCap}</div>
              </div>
              <div className="space-y-0.5 rounded-lg border p-3 shadow-sm">
                <h3 className="text-sm font-medium tracking-tight">Exit Cap</h3>
                <div className="text-2xl font-bold tracking-tight">{financialData.exitCap}</div>
              </div>
              <div className="space-y-0.5 rounded-lg border p-3 shadow-sm">
                <h3 className="text-sm font-medium tracking-tight">Interest Rate</h3>
                <div className="text-2xl font-bold tracking-tight">{financialData.loanInterestRate}</div>
              </div>
              <div className="space-y-0.5 rounded-lg border p-3 shadow-sm">
                <h3 className="text-sm font-medium tracking-tight">DSCR</h3>
                <div className="text-2xl font-bold tracking-tight">{financialData.dscr}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Excel Sheets Section */}
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-xl font-bold">Excel Sheets</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={excelSheets[0].id} className="w-full">
            <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start rounded-md bg-muted p-1">
              {excelSheets.map((sheet) => (
                <TabsTrigger 
                  key={sheet.id}
                  value={sheet.id}
                  className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium"
                >
                  {sheet.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {excelSheets.map((sheet) => (
              <TabsContent key={sheet.id} value={sheet.id} className="mt-0 border-0 p-0">
                <HandsontableExcel
                  sheetName={sheet.name}
                  initialData={getInitialDataForSheet(sheet.id)}
                  onSave={(data) => handleSaveExcelSheet(data, sheet.name, sheet.id)}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Financial Analysis Section */}
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-xl font-bold">Financial Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start rounded-md bg-muted p-1">
              <TabsTrigger value="summary" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                Summary
              </TabsTrigger>
              <TabsTrigger value="assumptions" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                Assumptions
              </TabsTrigger>
              <TabsTrigger value="yieldMatrix" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                Yield Matrix
              </TabsTrigger>
              <TabsTrigger value="pandl" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                P&L
              </TabsTrigger>
              <TabsTrigger value="lev" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                LEV
              </TabsTrigger>
              <TabsTrigger value="roofReserve" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                Roof Reserve
              </TabsTrigger>
              <TabsTrigger value="immPhysNeeds" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                Imm Phys Needs
              </TabsTrigger>
              <TabsTrigger value="comps" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                COMPS
              </TabsTrigger>
              <TabsTrigger value="commercialArgus" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                Commercial ARGUS
              </TabsTrigger>
              <TabsTrigger value="operatingStatement" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                Operating Statement
              </TabsTrigger>
              <TabsTrigger value="renewalVsNew" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                Renewal vs New PreLease
              </TabsTrigger>
              <TabsTrigger value="pandlsSummary" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                P&Ls Summary
              </TabsTrigger>
              <TabsTrigger value="t12" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                T12
              </TabsTrigger>
              <TabsTrigger value="income2023" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                2023 Income Statement
              </TabsTrigger>
              <TabsTrigger value="income2022" className="data-[state=active]:bg-background rounded-sm px-3 py-2 text-sm font-medium">
                2022 Income Statement
              </TabsTrigger>
            </TabsList>
            
            {/* Tab Content */}
            <TabsContent value="summary" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="Summary"
                initialData={getFinancialAnalysisData('summary')}
                onSave={(data) => handleSaveExcelSheet(data, 'Summary', 'summary')}
              />
            </TabsContent>
            <TabsContent value="assumptions" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="Assumptions"
                initialData={getFinancialAnalysisData('assumptions')}
                onSave={(data) => handleSaveExcelSheet(data, 'Assumptions', 'assumptions')}
              />
            </TabsContent>
            <TabsContent value="yieldMatrix" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="Yield Matrix"
                initialData={getFinancialAnalysisData('yieldMatrix')}
                onSave={(data) => handleSaveExcelSheet(data, 'Yield Matrix', 'yieldMatrix')}
              />
            </TabsContent>
            <TabsContent value="pandl" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="P&L"
                initialData={getFinancialAnalysisData('pandl')}
                onSave={(data) => handleSaveExcelSheet(data, 'P&L', 'pandl')}
              />
            </TabsContent>
            <TabsContent value="lev" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="LEV"
                initialData={getFinancialAnalysisData('lev')}
                onSave={(data) => handleSaveExcelSheet(data, 'LEV', 'lev')}
              />
            </TabsContent>
            <TabsContent value="roofReserve" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="Roof Reserve"
                initialData={getFinancialAnalysisData('roofReserve')}
                onSave={(data) => handleSaveExcelSheet(data, 'Roof Reserve', 'roofReserve')}
              />
            </TabsContent>
            <TabsContent value="immPhysNeeds" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="Imm Phys Needs"
                initialData={getFinancialAnalysisData('immPhysNeeds')}
                onSave={(data) => handleSaveExcelSheet(data, 'Imm Phys Needs', 'immPhysNeeds')}
              />
            </TabsContent>
            <TabsContent value="comps" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="COMPS"
                initialData={getFinancialAnalysisData('comps')}
                onSave={(data) => handleSaveExcelSheet(data, 'COMPS', 'comps')}
              />
            </TabsContent>
            <TabsContent value="commercialArgus" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="Commercial ARGUS"
                initialData={getFinancialAnalysisData('commercialArgus')}
                onSave={(data) => handleSaveExcelSheet(data, 'Commercial ARGUS', 'commercialArgus')}
              />
            </TabsContent>
            <TabsContent value="operatingStatement" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="Operating Statement"
                initialData={getFinancialAnalysisData('operatingStatement')}
                onSave={(data) => handleSaveExcelSheet(data, 'Operating Statement', 'operatingStatement')}
              />
            </TabsContent>
            <TabsContent value="renewalVsNew" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="Renewal vs New PreLease"
                initialData={getFinancialAnalysisData('renewalVsNew')}
                onSave={(data) => handleSaveExcelSheet(data, 'Renewal vs New PreLease', 'renewalVsNew')}
              />
            </TabsContent>
            <TabsContent value="pandlsSummary" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="P&Ls Summary"
                initialData={getFinancialAnalysisData('pandlsSummary')}
                onSave={(data) => handleSaveExcelSheet(data, 'P&Ls Summary', 'pandlsSummary')}
              />
            </TabsContent>
            <TabsContent value="t12" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="T12"
                initialData={getFinancialAnalysisData('t12')}
                onSave={(data) => handleSaveExcelSheet(data, 'T12', 't12')}
              />
            </TabsContent>
            <TabsContent value="income2023" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="2023 Income Statement"
                initialData={getFinancialAnalysisData('income2023')}
                onSave={(data) => handleSaveExcelSheet(data, '2023 Income Statement', 'income2023')}
              />
            </TabsContent>
            <TabsContent value="income2022" className="mt-0 border-0 p-0">
              <HandsontableExcel
                sheetName="2022 Income Statement"
                initialData={getFinancialAnalysisData('income2022')}
                onSave={(data) => handleSaveExcelSheet(data, '2022 Income Statement', 'income2022')}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialHub; 