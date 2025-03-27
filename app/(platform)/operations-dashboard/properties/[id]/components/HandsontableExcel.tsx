'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import { Button } from '@/components/ui/button';
import { Download, Save, Edit2, File } from 'lucide-react';

interface HandsontableExcelProps {
  sheetName: string;
  initialData?: any[][];
  onSave?: (data: any[][], sheetName: string) => void;
}

const HandsontableExcel: React.FC<HandsontableExcelProps> = ({ 
  sheetName, 
  initialData, 
  onSave 
}) => {
  const [data, setData] = useState<any[][]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const hotTableRef = useRef<HotTable>(null);

  // Initialize data
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setData(initialData);
    } else {
      setData(generateEmptyData(30, 15));
    }
  }, [initialData]);

  // Generate an empty data grid
  const generateEmptyData = (rows: number, cols: number): any[][] => {
    return Array.from({ length: rows }, () => Array(cols).fill(''));
  };

  // Handle saving data
  const handleSave = () => {
    const currentData = hotTableRef.current?.hotInstance?.getData() || data;
    if (onSave) {
      onSave(currentData, sheetName);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Export to Excel
  const exportToExcel = () => {
    const exportPlugin = hotTableRef.current?.hotInstance?.getPlugin('exportFile');
    
    if (exportPlugin) {
      exportPlugin.downloadFile('csv', {
        filename: `${sheetName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}`,
        columnHeaders: true,
        rowHeaders: true
      });
    } else {
      // Fallback if plugin is not available
      alert('Export feature is not available');
    }
  };

  // Handsontable settings
  const tableSettings: Handsontable.GridSettings = {
    data: data,
    rowHeaders: true,
    colHeaders: true,
    width: '100%',
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
    stretchH: 'all',
    contextMenu: isEditMode,
    manualColumnResize: true,
    manualRowResize: true,
    colWidths: 100,
    readOnly: !isEditMode, // Only allow editing in edit mode
    formulas: true,
    fillHandle: isEditMode,
    comments: true,
    columnSorting: true,
    filters: true,
    dropdownMenu: true,
    undo: true,
    autoColumnSize: false,
    viewportColumnRenderingOffset: 10,
    viewportRowRenderingOffset: 10,
    className: 'htMiddle',
    // Custom cell renderer for currency values
    cells: function(row, col) {
      const cellProperties: Handsontable.CellProperties = {};
      const cellData = data[row] && data[row][col];
      
      // Apply formatting based on cell content
      if (typeof cellData === 'string' && cellData.startsWith('$')) {
        cellProperties.className = 'htRight htMiddle currency-cell';
      }
      
      return cellProperties;
    },
    // Apply cell type based on content
    afterChange: (changes) => {
      if (changes && hotTableRef.current?.hotInstance) {
        const hot = hotTableRef.current.hotInstance;
        
        changes.forEach(([row, col, , newValue]) => {
          if (typeof newValue === 'string') {
            if (newValue.startsWith('$')) {
              hot.setCellMeta(row as number, col as number, 'type', 'text');
              hot.setCellMeta(row as number, col as number, 'className', 'htRight currency-cell');
            } else if (!isNaN(parseFloat(newValue)) && !newValue.includes('%')) {
              hot.setCellMeta(row as number, col as number, 'type', 'numeric');
              hot.setCellMeta(row as number, col as number, 'numericFormat', { pattern: '0,0.00' });
            } else if (newValue.includes('%')) {
              hot.setCellMeta(row as number, col as number, 'type', 'text');
              hot.setCellMeta(row as number, col as number, 'className', 'htRight percentage-cell');
            }
          }
        });
        
        hot.render();
      }
    }
  };

  return (
    <div className="excel-editor">
      {/* Header with action buttons */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{sheetName}</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleEditMode}
            className={isEditMode ? "bg-blue-50" : ""}
          >
            {isEditMode ? (
              <>
                <File className="mr-1 h-4 w-4" />
                View Mode
              </>
            ) : (
              <>
                <Edit2 className="mr-1 h-4 w-4" />
                Edit
              </>
            )}
          </Button>
          
          {isEditMode && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSave}
            >
              <Save className="mr-1 h-4 w-4" />
              Save
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportToExcel}
          >
            <Download className="mr-1 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Edit mode indicator */}
      {isEditMode && (
        <div className="mb-3 p-2 bg-blue-50 text-blue-800 text-sm rounded border border-blue-200">
          Edit mode is enabled. Click cells to edit, use formulas with = prefix, and press Enter to confirm changes.
        </div>
      )}
      
      {/* The Handsontable component */}
      <div className="excel-container border rounded overflow-auto">
        <HotTable
          ref={hotTableRef}
          settings={tableSettings}
          autoRowSize={true}
          id={`excel-sheet-${sheetName.replace(/\s+/g, '-').toLowerCase()}`}
        />
      </div>
      
      {/* Help text */}
      <div className="mt-2 text-xs text-gray-500">
        <p>Tip: Use arrow keys to navigate, Tab to move right, Shift+Tab to move left. {isEditMode && "Type = to start a formula."}
        </p>
      </div>
      
      <style jsx global>{`
        .handsontable {
          font-size: 13px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .currency-cell {
          color: #10b981;
          font-weight: 500;
        }
        .percentage-cell {
          color: #6366f1;
          font-weight: 500;
        }
        .handsontable .htDimmed {
          color: #6b7280;
        }
        .handsontable th {
          background-color: #f3f4f6;
          font-weight: 600;
          color: #374151;
        }
        .handsontable tbody tr:nth-child(even) td {
          background-color: #f9fafb;
        }
        .excel-container {
          max-height: 520px;
        }
      `}</style>
    </div>
  );
};

export default HandsontableExcel; 