'use client';

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import { Button } from '@/components/ui/button';
import { 
  Download, Edit, Save, Copy, Clipboard, Plus, Trash2, ChevronDown,
  AlignLeft, AlignCenter, AlignRight, Grid, Table
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HandsontableExcelProps {
  sheetName: string;
  data: any[][];
  onSave?: (data: any[][], sheetName: string) => void;
}

const HandsontableExcel = forwardRef<any, HandsontableExcelProps>(({ 
  sheetName, 
  data: initialData, 
  onSave 
}, ref) => {
  // Ensure data is an array of arrays and has at least 40 rows and 40 columns
  const ensureDataFormat = (inputData: any[][] | null | undefined): any[][] => {
    if (!inputData || !Array.isArray(inputData) || inputData.length === 0) {
      // Create a 40x40 empty grid
      return Array(40).fill(null).map(() => Array(40).fill(''));
    }
    
    // Make sure each row is an array
    const processedData = inputData.map(row => Array.isArray(row) ? row : [row]);
    
    // Ensure each row has at least 40 columns
    const paddedData = processedData.map(row => {
      if (row.length < 40) {
        return [...row, ...Array(40 - row.length).fill('')];
      }
      return row;
    });
    
    // Ensure there are at least 40 rows
    if (paddedData.length < 40) {
      const emptyRows = Array(40 - paddedData.length).fill(null).map(() => Array(40).fill(''));
      return [...paddedData, ...emptyRows];
    }
    
    return paddedData;
  };
  
  const [data, setData] = useState<any[][]>(ensureDataFormat(initialData));
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const hotTableRef = useRef<HotTable>(null);
  const hotSettings = useRef<Handsontable.GridSettings>({
    // We'll set our Handsontable settings here to make them accessible throughout the component
    licenseKey: 'non-commercial-and-evaluation',
    rowHeaders: true,
    colHeaders: true,
    contextMenu: true,
    copyPaste: true,
    comments: true,
    mergeCells: true,
    manualColumnResize: true,
    manualRowResize: true,
    formulas: true,
    undo: true,
    fillHandle: true,
    enterBeginsEditing: true,
    enterMoves: { row: 1, col: 0 },
    tabMoves: { row: 0, col: 1 },
    beforeKeyDown: (e) => {
      const hot = hotTableRef.current?.hotInstance;
      if (!hot) return;
      
      // Allow clipboard keyboard shortcuts to work
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.stopImmediatePropagation();
        const plugin = hot.getPlugin('copyPaste');
        if (plugin) plugin.copy();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'v' && isEditMode) {
        e.stopImmediatePropagation();
        const plugin = hot.getPlugin('copyPaste');
        if (plugin) plugin.paste();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'x' && isEditMode) {
        e.stopImmediatePropagation();
        const plugin = hot.getPlugin('copyPaste');
        if (plugin && plugin.cut) plugin.cut();
      }
      
      // Merge/unmerge cells with Ctrl+M
      if ((e.ctrlKey || e.metaKey) && e.key === 'm' && isEditMode) {
        e.stopImmediatePropagation();
        const plugin = hot.getPlugin('mergeCells');
        if (plugin) {
          const selected = hot.getSelected();
          if (selected) {
            const [startRow, startCol, endRow, endCol] = selected[0];
            plugin.toggleMerge(startRow, startCol, endRow, endCol);
            hot.render();
          }
        }
      }
    },
  });

  // Update data when props change
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setData(ensureDataFormat(initialData));
    }
  }, [initialData]);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    toggleEditMode: () => {
      setIsEditMode(!isEditMode);
    },
    exportToExcel: () => {
      const hot = hotTableRef.current?.hotInstance;
      if (!hot) return;
      
      const exportPlugin = hot.getPlugin('exportFile');
      if (exportPlugin) {
        exportPlugin.downloadFile('csv', {
          filename: `${sheetName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}`,
          columnHeaders: true,
          rowHeaders: true
        });
      } else {
        alert('Export feature is not available');
      }
    },
    handleSave: () => {
      const hot = hotTableRef.current?.hotInstance;
      if (!hot) return;
      
      const currentData = hot.getData() || data;
      if (onSave) {
        onSave(currentData, sheetName);
      }
    }
  }));

  // Excel toolbar functions
  const handleCopy = () => {
    const hot = hotTableRef.current?.hotInstance;
    if (!hot) return;
    
    const plugin = hot.getPlugin('copyPaste');
    if (plugin) {
      plugin.copy();
    }
  };

  const handlePaste = () => {
    const hot = hotTableRef.current?.hotInstance;
    if (!hot) return;
    
    const plugin = hot.getPlugin('copyPaste');
    if (plugin) {
      plugin.paste();
    }
  };

  const handleAddRow = () => {
    const hot = hotTableRef.current?.hotInstance;
    if (!hot) return;
    
    const selection = hot.getSelected();
    if (selection) {
      const row = selection[0][0];
      hot.alter('insert_row', row + 1);
    } else {
      hot.alter('insert_row', hot.countRows());
    }
  };

  const handleAddColumn = () => {
    const hot = hotTableRef.current?.hotInstance;
    if (!hot) return;
    
    const selection = hot.getSelected();
    if (selection) {
      const col = selection[0][1];
      hot.alter('insert_col', col + 1);
    } else {
      hot.alter('insert_col', hot.countCols());
    }
  };

  const handleRemoveRow = () => {
    const hot = hotTableRef.current?.hotInstance;
    if (!hot || !selectedCell) return;
    
    hot.alter('remove_row', selectedCell[0]);
  };

  const handleRemoveColumn = () => {
    const hot = hotTableRef.current?.hotInstance;
    if (!hot || !selectedCell) return;
    
    hot.alter('remove_col', selectedCell[1]);
  };

  const handleAlignment = (alignment: 'htLeft' | 'htCenter' | 'htRight') => {
    const hot = hotTableRef.current?.hotInstance;
    if (!hot || !selectedCell) return;
    
    const meta = hot.getCellMeta(selectedCell[0], selectedCell[1]);
    // Remove any existing alignment classes
    let className = (meta.className || '').replace(/htLeft|htCenter|htRight/g, '').trim();
    // Add the new alignment class
    className = `${className} ${alignment}`.trim();
    hot.setCellMeta(selectedCell[0], selectedCell[1], 'className', className);
    hot.render();
  };

  // Handle cell selection
  const handleAfterSelectionEnd = (row: number, column: number) => {
    setSelectedCell([row, column]);
  };

  // Add clipboard event listeners for enhanced copy/paste support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const hot = hotTableRef.current?.hotInstance;
      if (!hot) return;
      
      // Check if the keyboard event target is within the component or if the component has focus
      const isHotSelected = document.activeElement === document.querySelector('.excel-container') ||
                           document.activeElement?.closest('.excel-container') !== null;
      
      if (!isHotSelected) return;
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const plugin = hot.getPlugin('copyPaste');
        if (plugin) plugin.copy();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'v' && isEditMode) {
        const plugin = hot.getPlugin('copyPaste');
        if (plugin) plugin.paste();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditMode]);

  return (
    <div className="excel-editor">
      {/* Excel-like toolbar */}
      <div className="excel-toolbar bg-gray-100 p-2 rounded-t flex items-center space-x-2 border border-gray-200">
        <div className="toolbar-section flex space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditMode(!isEditMode)}
            className={isEditMode ? "bg-blue-50 text-blue-700" : ""}
            title={isEditMode ? "View Mode" : "Edit Mode"}
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          {isEditMode && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => ref.current?.handleSave()}
              title="Save"
            >
              <Save className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="toolbar-divider h-6 w-px bg-gray-300 mx-1"></div>
        
        <div className="toolbar-section flex space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy}
            title="Copy"
            disabled={!isEditMode}
          >
            <Copy className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handlePaste}
            title="Paste"
            disabled={!isEditMode}
          >
            <Clipboard className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="toolbar-divider h-6 w-px bg-gray-300 mx-1"></div>
        
        <div className="toolbar-section flex space-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={!isEditMode}>
              <Button variant="ghost" size="sm" title="Insert">
                <Plus className="h-4 w-4" />
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Insert</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleAddRow}>
                <Grid className="h-4 w-4 mr-2" />
                Row
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAddColumn}>
                <Table className="h-4 w-4 mr-2" />
                Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={!isEditMode || !selectedCell}>
              <Button variant="ghost" size="sm" title="Delete">
                <Trash2 className="h-4 w-4" />
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Delete</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleRemoveRow}>
                <Grid className="h-4 w-4 mr-2" />
                Row
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRemoveColumn}>
                <Table className="h-4 w-4 mr-2" />
                Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="toolbar-divider h-6 w-px bg-gray-300 mx-1"></div>
        
        <div className="toolbar-section flex space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAlignment('htLeft')}
            title="Align Left"
            disabled={!isEditMode || !selectedCell}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAlignment('htCenter')}
            title="Align Center"
            disabled={!isEditMode || !selectedCell}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAlignment('htRight')}
            title="Align Right"
            disabled={!isEditMode || !selectedCell}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="toolbar-divider h-6 w-px bg-gray-300 mx-1"></div>
        
        <div className="toolbar-section ml-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => ref.current?.exportToExcel()}
            title="Export"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Edit mode indicator */}
      {isEditMode && (
        <div className="bg-blue-50 text-blue-800 text-xs p-1 border-l border-r border-gray-200">
          Edit mode is enabled. Click cells to edit and press Enter to confirm changes.
        </div>
      )}
      
      {/* The Handsontable component */}
      <div className="excel-container border-l border-r border-b rounded-b overflow-auto" style={{ height: '500px' }}>
        <HotTable
          ref={hotTableRef}
          settings={hotSettings.current}
          data={data}
          width="100%"
          height="100%"
          readOnly={!isEditMode}
          stretchH="all"
          allowInsertRow={isEditMode}
          allowInsertColumn={isEditMode}
          allowRemoveRow={isEditMode}
          allowRemoveColumn={isEditMode}
          afterSelectionEnd={(row, column) => handleAfterSelectionEnd(row, column)}
          afterChange={(changes) => {
            if (changes && onSave && isEditMode) {
              ref.current?.handleSave();
            }
          }}
          minRows={40}
          minCols={40}
          minSpareRows={0}
          minSpareCols={0}
        />
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        <p>
          Use arrow keys to navigate, Tab to move right, Shift+Tab to move left.
          {isEditMode && " Press F2, Enter, or click a cell to edit."}
        </p>
        <p className="mt-1">
          Available shortcuts: Ctrl+C/Cmd+C (Copy), Ctrl+V/Cmd+V (Paste), Ctrl+Z/Cmd+Z (Undo), 
          Ctrl+Y/Cmd+Y (Redo), Ctrl+A/Cmd+A (Select All), Ctrl+Space (Select Column), 
          Shift+Space (Select Row), Ctrl+M (Merge/Unmerge)
        </p>
      </div>

      <style jsx global>{`
        .handsontable {
          font-size: 13px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
        .handsontable .htLeft {
          text-align: left;
        }
        .handsontable .htCenter {
          text-align: center;
        }
        .handsontable .htRight {
          text-align: right;
        }
      `}</style>
    </div>
  );
});

HandsontableExcel.displayName = 'HandsontableExcel';

export default HandsontableExcel; 