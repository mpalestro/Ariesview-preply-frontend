import { useState, useRef, Suspense, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Search, Edit, Plus, ChevronDown } from "lucide-react";
import dynamic from 'next/dynamic';

const HandsontableExcel = dynamic(() => import('./HandsontableExcel'), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Loading spreadsheet...</div>
});

// Main categories for the financial hub
const MAIN_CATEGORIES = [
  { id: 'property', name: 'Property Analysis', icon: 'P' },
  { id: 'financial', name: 'Financial Statements', icon: 'F' },
  { id: 'acquisition', name: 'Acquisition Analysis', icon: 'A' },
  { id: 'tax', name: 'Tax Planning', icon: 'T' }
];

// Sub-categories for each main category
const SUB_CATEGORIES = {
  property: [
    { id: 'overview', name: 'Overview' },
    { id: 'income', name: 'Income' },
    { id: 'expenses', name: 'Expenses' },
    { id: 'financing', name: 'Financing' },
    { id: 'market', name: 'Market' }
  ],
  financial: [
    { id: 'income-statement', name: 'Income Statement' },
    { id: 'balance-sheet', name: 'Balance Sheet' },
    { id: 'cash-flow', name: 'Cash Flow' },
    { id: 'budget', name: 'Budget' },
    { id: 'variance', name: 'Variance Analysis' }
  ],
  acquisition: [
    { id: 'summary', name: 'Summary' },
    { id: 'investment', name: 'Investment' },
    { id: 'returns', name: 'Returns' },
    { id: 'scenarios', name: 'Scenarios' },
    { id: 'comparables', name: 'Comparables' }
  ],
  tax: [
    { id: 'projections', name: 'Projections' },
    { id: 'depreciation', name: 'Depreciation' },
    { id: 'deductions', name: 'Deductions' },
    { id: 'planning', name: 'Planning' },
    { id: 'compliance', name: 'Compliance' }
  ]
};

export default function FinancialHub() {
  const [activeMainCategory, setActiveMainCategory] = useState('property');
  const [activeSubCategory, setActiveSubCategory] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Summary metrics state
  const [summaryMetrics] = useState({
    purchasePrice: '$5,200,000',
    noi: '$312,000',
    capRate: '6.0%',
    cashOnCash: '7.2%'
  });

  // Property details state
  const [propertyDetails] = useState({
    name: 'River Street Plaza',
    address: '522 River St',
    cityStateZip: 'Boston, MA 02126',
    purchaseDate: 'Mar 15, 2023',
    propertyType: 'Multi-Family',
    yearBuilt: '1992',
    units: '28',
    fund: 'Evolston Capital Fund I'
  });

  // Use a different ref for each category to prevent conflicts
  const incomeExcelRef = useRef<any>(null);
  const expensesExcelRef = useRef<any>(null);
  const financingExcelRef = useRef<any>(null);
  const marketExcelRef = useRef<any>(null);
  const financialExcelRef = useRef<any>(null);
  const acquisitionExcelRef = useRef<any>(null);
  const taxExcelRef = useRef<any>(null);
  
  // Get the current active ref based on category
  const getCurrentRef = () => {
    switch (activeMainCategory) {
      case 'property':
        switch (activeSubCategory) {
          case 'income': return incomeExcelRef;
          case 'expenses': return expensesExcelRef;
          case 'financing': return financingExcelRef;
          case 'market': return marketExcelRef;
          default: return incomeExcelRef;
        }
      case 'financial': return financialExcelRef;
      case 'acquisition': return acquisitionExcelRef;
      case 'tax': return taxExcelRef;
      default: return incomeExcelRef;
    }
  };

  // Function to get initial data for sheets
  const getInitialDataForSheet = (sheetId: string) => {
    console.log("Getting data for sheet ID:", sheetId);
    const initialData = {
      'income': [
        ['Income Statement', '2023', '2022', 'Change', '2024 (Proj.)'],
        ['Revenue', '', '', '', ''],
        ['Rental Income - Residential', '$1,560,000', '$1,450,000', '7.6%', '$1,680,000'],
        ['Rental Income - Parking', '$48,000', '$45,000', '6.7%', '$50,000'],
        ['Other Income', '$35,000', '$32,000', '9.4%', '$38,000'],
        ['Gross Potential Income', '$1,643,000', '$1,527,000', '7.6%', '$1,768,000'],
        ['', '', '', '', ''],
        ['Less:', '', '', '', ''],
        ['Vacancy Loss', '($82,150)', '($91,620)', '-10.3%', '($70,720)'],
        ['Concessions', '($16,430)', '($15,270)', '7.6%', '($17,680)'],
        ['Bad Debt', '($8,215)', '($7,635)', '7.6%', '($8,840)'],
        ['Effective Gross Income', '$1,536,205', '$1,412,475', '8.8%', '$1,670,760'],
        ['', '', '', '', ''],
        ['Operating Expenses', '', '', '', ''],
        ['Property Management', '($76,810)', '($70,624)', '8.8%', '($83,538)'],
        ['Maintenance & Repairs', '($153,621)', '($141,248)', '8.8%', '($167,076)'],
        ['Utilities', '($92,172)', '($84,749)', '8.8%', '($100,246)'],
        ['Property Tax', '($184,345)', '($169,497)', '8.8%', '($200,491)'],
        ['Insurance', '($46,086)', '($42,374)', '8.8%', '($50,123)'],
        ['Marketing', '($15,362)', '($14,125)', '8.8%', '($16,708)'],
        ['Administrative', '($30,724)', '($28,250)', '8.8%', '($33,415)'],
        ['Total Operating Expenses', '($599,120)', '($550,867)', '8.8%', '($651,597)'],
        ['', '', '', '', ''],
        ['Net Operating Income (NOI)', '$937,085', '$861,608', '8.8%', '$1,019,163'],
        ['NOI Margin', '61.0%', '61.0%', '0.0%', '61.0%']
      ],
      'expenses': [
        ['Expense Analysis', '2023', '2022', 'Change', '2024 (Proj.)'],
        ['Operating Expenses', '', '', '', ''],
        ['Property Management', '$76,810', '$70,624', '8.8%', '$83,538'],
        ['Maintenance & Repairs', '$153,621', '$141,248', '8.8%', '$167,076'],
        ['Utilities Breakdown:', '', '', '', ''],
        ['- Electricity', '$36,869', '$33,899', '8.8%', '$40,098'],
        ['- Water/Sewer', '$27,652', '$25,425', '8.8%', '$30,074'],
        ['- Gas', '$27,652', '$25,425', '8.8%', '$30,074'],
        ['Total Utilities', '$92,172', '$84,749', '8.8%', '$100,246'],
        ['', '', '', '', ''],
        ['Fixed Expenses', '', '', '', ''],
        ['Property Tax', '$184,345', '$169,497', '8.8%', '$200,491'],
        ['Insurance Breakdown:', '', '', '', ''],
        ['- Property Insurance', '$36,869', '$33,899', '8.8%', '$40,098'],
        ['- Liability Insurance', '$9,217', '$8,475', '8.8%', '$10,025'],
        ['Total Insurance', '$46,086', '$42,374', '8.8%', '$50,123'],
        ['', '', '', '', ''],
        ['Administrative', '', '', '', ''],
        ['Marketing', '$15,362', '$14,125', '8.8%', '$16,708'],
        ['Office Expenses', '$15,362', '$14,125', '8.8%', '$16,708'],
        ['Professional Fees', '$15,362', '$14,125', '8.8%', '$16,708'],
        ['Total Administrative', '$46,086', '$42,374', '8.8%', '$50,123'],
        ['', '', '', '', ''],
        ['Total Operating Expenses', '$599,120', '$550,867', '8.8%', '$651,597'],
        ['Per Unit Per Year', '$21,397', '$19,674', '8.8%', '$23,271'],
        ['Per SF Per Year', '$12.48', '$11.48', '8.8%', '$13.57']
      ],
      'financing': [
        ['Financing Analysis', 'Current', 'At Purchase', 'Change', 'Notes'],
        ['Loan Details', '', '', '', ''],
        ['Principal Balance', '$3,900,000', '$4,000,000', '-2.5%', 'Amortizing'],
        ['Interest Rate', '4.50%', '4.50%', '0.0%', 'Fixed Rate'],
        ['Annual Debt Service', '$285,000', '$285,000', '0.0%', 'Monthly: $23,750'],
        ['Loan Term', '30 years', '30 years', '-', 'Original Term'],
        ['Term Remaining', '27.3 years', '28 years', '-2.5%', '327 months left'],
        ['', '', '', '', ''],
        ['Annual Costs', '', '', '', ''],
        ['Principal Payment', '$109,500', '$107,000', '2.3%', 'Increasing yearly'],
        ['Interest Payment', '$175,500', '$178,000', '-1.4%', 'Decreasing yearly'],
        ['Total Debt Service', '$285,000', '$285,000', '0.0%', 'Fixed payment'],
        ['', '', '', '', ''],
        ['Key Metrics', '', '', '', ''],
        ['Property Value', '$5,200,000', '$5,200,000', '0.0%', 'Recent Appraisal'],
        ['LTV Ratio', '75.0%', '76.9%', '-2.5%', 'Max: 80%'],
        ['DSCR', '1.46', '1.38', '5.8%', 'Min Required: 1.25'],
        ['Debt Yield', '10.6%', '9.8%', '8.2%', 'Strong performance']
      ],
      'market': [
        ['Market Analysis', 'Subject', 'Market Avg', 'Variance', 'Submarket'],
        ['Rental Rates ($/SF/Year)', '', '', '', ''],
        ['Studio', '$32.50', '$31.00', '4.8%', '$31.50'],
        ['1 Bedroom', '$30.00', '$28.50', '5.3%', '$29.00'],
        ['2 Bedroom', '$27.50', '$26.00', '5.8%', '$26.50'],
        ['3 Bedroom', '$25.00', '$23.50', '6.4%', '$24.00'],
        ['Average Rate', '$28.75', '$27.25', '5.5%', '$27.75'],
        ['', '', '', '', ''],
        ['Occupancy Rates', '', '', '', ''],
        ['Studio', '95%', '92%', '3.3%', '93%'],
        ['1 Bedroom', '96%', '93%', '3.2%', '94%'],
        ['2 Bedroom', '94%', '91%', '3.3%', '92%'],
        ['3 Bedroom', '92%', '89%', '3.4%', '90%'],
        ['Overall Occupancy', '94.3%', '91.3%', '3.3%', '92.3%'],
        ['', '', '', '', ''],
        ['Market Metrics', '', '', '', ''],
        ['Cap Rate', '6.0%', '5.8%', '3.4%', '5.9%'],
        ['Price per Unit', '$185,714', '$175,000', '6.1%', '$180,000'],
        ['Price per SF', '$325', '$315', '3.2%', '$320'],
        ['', '', '', '', ''],
        ['Demographics (1 Mile)', '', '', '', ''],
        ['Population', '25,000', '-', '-', 'Growing'],
        ['Median Income', '$75,000', '$72,000', '4.2%', '$73,500'],
        ['Employment Rate', '96%', '94%', '2.1%', '95%'],
        ['Population Growth', '2.3%', '1.8%', '27.8%', '2.0%']
      ],
      'investment': [
        ['Investment Analysis', 'Amount', 'Per Unit', 'Per SF', 'Notes'],
        ['Acquisition', '', '', '', ''],
        ['Purchase Price', '$5,200,000', '$185,714', '$325.00', '28 units'],
        ['Closing Costs', '$156,000', '$5,571', '$9.75', '3% of price'],
        ['Initial CapEx', '$450,000', '$16,071', '$28.13', 'Renovations'],
        ['Total Investment', '$5,806,000', '$207,357', '$362.88', ''],
        ['', '', '', '', ''],
        ['Financing', '', '', '', ''],
        ['Loan Amount', '$3,900,000', '$139,286', '$243.75', '75% LTV'],
        ['Equity Required', '$1,906,000', '$68,071', '$119.13', '25% down + costs'],
        ['', '', '', '', ''],
        ['Returns (Year 1)', '', '', '', ''],
        ['NOI', '$937,085', '$33,467', '$58.57', ''],
        ['Cash Flow', '$652,085', '$23,289', '$40.76', 'Before debt service'],
        ['Cap Rate', '6.0%', '-', '-', 'Based on purchase'],
        ['Cash on Cash', '7.2%', '-', '-', 'Unleveraged'],
        ['IRR (5-year proj)', '15.8%', '-', '-', 'With disposition']
      ],
      'returns': [
        ['5-Year Projections', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        ['Operations', '', '', '', '', ''],
        ['Gross Income', '$1,643,000', '$1,692,290', '$1,743,059', '$1,795,351', '$1,849,211'],
        ['Vacancy Loss', '($82,150)', '($84,615)', '($87,153)', '($89,768)', '($92,461)'],
        ['Effective Income', '$1,560,850', '$1,607,676', '$1,655,906', '$1,705,583', '$1,756,751'],
        ['Operating Expenses', '($599,120)', '($617,094)', '($635,606)', '($654,675)', '($674,315)'],
        ['NOI', '$937,085', '$965,198', '$994,153', '$1,023,978', '$1,054,697'],
        ['', '', '', '', '', ''],
        ['Debt Service', '($285,000)', '($285,000)', '($285,000)', '($285,000)', '($285,000)'],
        ['Capital Expenditures', '($50,000)', '($51,500)', '($53,045)', '($54,636)', '($56,275)'],
        ['Net Cash Flow', '$602,085', '$628,698', '$656,108', '$684,342', '$713,422'],
        ['', '', '', '', '', ''],
        ['Returns', '', '', '', '', ''],
        ['Cash on Cash', '7.2%', '7.5%', '7.8%', '8.2%', '8.5%'],
        ['Cumulative Cash Flow', '$602,085', '$1,230,783', '$1,886,891', '$2,571,233', '$3,284,655'],
        ['Property Value', '$5,200,000', '$5,356,000', '$5,516,680', '$5,682,180', '$5,852,646'],
        ['Equity Multiple', '1.07x', '1.15x', '1.23x', '1.32x', '1.41x']
      ],
      'balance-sheet': [
        ['Balance Sheet', 'As of Dec 31, 2023', 'As of Dec 31, 2022', 'Change', 'Notes'],
        ['Assets', '', '', '', ''],
        ['Current Assets:', '', '', '', ''],
        ['Cash and Cash Equivalents', '$250,000', '$225,000', '11.1%', 'Operating accounts'],
        ['Accounts Receivable', '$45,000', '$42,000', '7.1%', 'Net of allowances'],
        ['Prepaid Expenses', '$35,000', '$32,000', '9.4%', 'Insurance & property tax'],
        ['Total Current Assets', '$330,000', '$299,000', '10.4%', ''],
        ['', '', '', '', ''],
        ['Fixed Assets:', '', '', '', ''],
        ['Land', '$1,040,000', '$1,040,000', '0.0%', '20% of purchase price'],
        ['Building', '$4,160,000', '$4,160,000', '0.0%', '80% of purchase price'],
        ['Improvements', '$450,000', '$350,000', '28.6%', 'Renovations'],
        ['Less: Accumulated Depreciation', '($189,091)', '($94,545)', '100.0%', 'Straight-line'],
        ['Net Fixed Assets', '$5,460,909', '$5,455,455', '0.1%', ''],
        ['', '', '', '', ''],
        ['Other Assets:', '', '', '', ''],
        ['Security Deposits Held', '$84,000', '$84,000', '0.0%', 'Tenant deposits'],
        ['Loan Costs (Net)', '$45,000', '$48,000', '-6.3%', 'Being amortized'],
        ['Total Other Assets', '$129,000', '$132,000', '-2.3%', ''],
        ['', '', '', '', ''],
        ['Total Assets', '$5,919,909', '$5,886,455', '0.6%', ''],
        ['', '', '', '', ''],
        ['Liabilities & Equity', '', '', '', ''],
        ['Current Liabilities:', '', '', '', ''],
        ['Accounts Payable', '$35,000', '$32,000', '9.4%', 'Trade payables'],
        ['Accrued Expenses', '$25,000', '$23,000', '8.7%', 'Various accruals'],
        ['Security Deposits', '$84,000', '$84,000', '0.0%', 'Tenant deposits'],
        ['Total Current Liabilities', '$144,000', '$139,000', '3.6%', ''],
        ['', '', '', '', ''],
        ['Long-term Liabilities:', '', '', '', ''],
        ['Mortgage Payable', '$3,900,000', '$4,000,000', '-2.5%', '30-year term'],
        ['Total Long-term Liabilities', '$3,900,000', '$4,000,000', '-2.5%', ''],
        ['', '', '', '', ''],
        ['Total Liabilities', '$4,044,000', '$4,139,000', '-2.3%', ''],
        ['', '', '', '', ''],
        ['Equity:', '', '', '', ''],
        ['Partner Capital', '$1,906,000', '$1,906,000', '0.0%', 'Initial investment'],
        ['Retained Earnings', '($30,091)', '($158,545)', '-81.0%', 'Cumulative earnings'],
        ['Total Equity', '$1,875,909', '$1,747,455', '7.4%', ''],
        ['', '', '', '', ''],
        ['Total Liabilities & Equity', '$5,919,909', '$5,886,455', '0.6%', '']
      ],
      'income-statement': [
        ['Income Statement', '2023', '2022', 'Change', '2024 (Proj.)'],
        ['Revenue', '', '', '', ''],
        ['Rental Income - Residential', '$1,560,000', '$1,450,000', '7.6%', '$1,680,000'],
        ['Rental Income - Parking', '$48,000', '$45,000', '6.7%', '$50,000'],
        ['Other Income', '$35,000', '$32,000', '9.4%', '$38,000'],
        ['Gross Potential Income', '$1,643,000', '$1,527,000', '7.6%', '$1,768,000'],
        ['', '', '', '', ''],
        ['Less:', '', '', '', ''],
        ['Vacancy Loss', '($82,150)', '($91,620)', '-10.3%', '($70,720)'],
        ['Concessions', '($16,430)', '($15,270)', '7.6%', '($17,680)'],
        ['Bad Debt', '($8,215)', '($7,635)', '7.6%', '($8,840)'],
        ['Effective Gross Income', '$1,536,205', '$1,412,475', '8.8%', '$1,670,760'],
        ['', '', '', '', ''],
        ['Operating Expenses', '', '', '', ''],
        ['Property Management', '($76,810)', '($70,624)', '8.8%', '($83,538)'],
        ['Maintenance & Repairs', '($153,621)', '($141,248)', '8.8%', '($167,076)'],
        ['Utilities', '($92,172)', '($84,749)', '8.8%', '($100,246)'],
        ['Property Tax', '($184,345)', '($169,497)', '8.8%', '($200,491)'],
        ['Insurance', '($46,086)', '($42,374)', '8.8%', '($50,123)'],
        ['Marketing', '($15,362)', '($14,125)', '8.8%', '($16,708)'],
        ['Administrative', '($30,724)', '($28,250)', '8.8%', '($33,415)'],
        ['Total Operating Expenses', '($599,120)', '($550,867)', '8.8%', '($651,597)'],
        ['', '', '', '', ''],
        ['Net Operating Income (NOI)', '$937,085', '$861,608', '8.8%', '$1,019,163'],
        ['NOI Margin', '61.0%', '61.0%', '0.0%', '61.0%']
      ],
      'cash-flow': [
        ['Cash Flow Statement', '2023', '2022', 'Change', '2024 (Proj.)'],
        ['Operating Activities', '', '', '', ''],
        ['Net Operating Income', '$937,085', '$861,608', '8.8%', '$1,019,163'],
        ['Non-Cash Adjustments:', '', '', '', ''],
        ['Depreciation & Amortization', '$94,546', '$94,545', '0.0%', '$94,546'],
        ['Changes in Working Capital:', '', '', '', ''],
        ['(Increase)/Decrease in Accounts Receivable', '($3,000)', '($5,000)', '-40.0%', '($2,000)'],
        ['(Increase)/Decrease in Prepaid Expenses', '($3,000)', '$2,000', '-250.0%', '($1,500)'],
        ['Increase/(Decrease) in Accounts Payable', '$3,000', '($2,000)', '-250.0%', '$1,500'],
        ['Increase/(Decrease) in Accrued Expenses', '$2,000', '$1,000', '100.0%', '$1,000'],
        ['Net Cash from Operating Activities', '$1,030,631', '$952,153', '8.2%', '$1,112,709'],
        ['', '', '', '', ''],
        ['Investing Activities', '', '', '', ''],
        ['Capital Expenditures', '($100,000)', '($95,000)', '5.3%', '($110,000)'],
        ['Building Improvements', '($50,000)', '($35,000)', '42.9%', '($45,000)'],
        ['Net Cash from Investing Activities', '($150,000)', '($130,000)', '15.4%', '($155,000)'],
        ['', '', '', '', ''],
        ['Financing Activities', '', '', '', ''],
        ['Principal Payments on Mortgage', '($100,000)', '($95,000)', '5.3%', '($105,000)'],
        ['Interest Payments', '($175,500)', '($178,000)', '-1.4%', '($172,000)'],
        ['Distributions to Owners', '($600,000)', '($500,000)', '20.0%', '($700,000)'],
        ['Net Cash from Financing Activities', '($875,500)', '($773,000)', '13.3%', '($977,000)'],
        ['', '', '', '', ''],
        ['Net Change in Cash', '$5,131', '$49,153', '-89.6%', '($19,291)'],
        ['Beginning Cash Balance', '$245,000', '$195,847', '25.1%', '$250,131'],
        ['Ending Cash Balance', '$250,131', '$245,000', '2.1%', '$230,840']
      ],
      'budget': [
        ['Annual Budget', '2024 Budget', '2023 Actual', 'Variance', 'Notes'],
        ['Revenue', '', '', '', ''],
        ['Rental Income - Residential', '$1,680,000', '$1,560,000', '7.7%', 'Assumes 3% rent increase'],
        ['Rental Income - Parking', '$50,000', '$48,000', '4.2%', 'Assumes full occupancy'],
        ['Other Income', '$38,000', '$35,000', '8.6%', 'Includes laundry & fees'],
        ['Gross Potential Income', '$1,768,000', '$1,643,000', '7.6%', ''],
        ['', '', '', '', ''],
        ['Less:', '', '', '', ''],
        ['Vacancy Loss', '($70,720)', '($82,150)', '-13.9%', 'Assumes 4% vacancy rate'],
        ['Concessions', '($17,680)', '($16,430)', '7.6%', 'New resident specials'],
        ['Bad Debt', '($8,840)', '($8,215)', '7.6%', 'Based on historical rate'],
        ['Effective Gross Income', '$1,670,760', '$1,536,205', '8.8%', ''],
        ['', '', '', '', ''],
        ['Operating Expenses', '', '', '', ''],
        ['Property Management', '($83,538)', '($76,810)', '8.8%', '5% of EGI'],
        ['Maintenance & Repairs', '($150,000)', '($153,621)', '-2.4%', 'Reduced due to recent updates'],
        ['Utilities', '($100,246)', '($92,172)', '8.8%', 'Utility increases expected'],
        ['Property Tax', '($200,491)', '($184,345)', '8.8%', 'Assessed value increase'],
        ['Insurance', '($50,123)', '($46,086)', '8.8%', 'Policy renewal with increase'],
        ['Marketing', '($16,708)', '($15,362)', '8.8%', 'Digital campaigns increase'],
        ['Administrative', '($33,415)', '($30,724)', '8.8%', 'Includes software costs'],
        ['Total Operating Expenses', '($634,521)', '($599,120)', '5.9%', ''],
        ['', '', '', '', ''],
        ['Net Operating Income (NOI)', '$1,036,239', '$937,085', '10.6%', ''],
        ['', '', '', '', ''],
        ['Capital Expenditures', '', '', '', ''],
        ['Unit Renovations', '($75,000)', '($50,000)', '50.0%', '5 units planned'],
        ['Common Area Improvements', '($40,000)', '($25,000)', '60.0%', 'Lobby renovation'],
        ['Building Systems', '($35,000)', '($25,000)', '40.0%', 'HVAC upgrades'],
        ['Total CapEx', '($150,000)', '($100,000)', '50.0%', '']
      ],
      'variance': [
        ['Variance Analysis', 'YTD Actual', 'YTD Budget', 'Variance ($)', 'Variance (%)', 'Notes'],
        ['Revenue', '', '', '', '', ''],
        ['Rental Income - Residential', '$780,000', '$800,000', '($20,000)', '-2.5%', 'Slightly below target'],
        ['Rental Income - Parking', '$24,000', '$23,000', '$1,000', '4.3%', 'Better than expected'],
        ['Other Income', '$17,500', '$18,000', '($500)', '-2.8%', 'Lower fee collection'],
        ['Gross Potential Income', '$821,500', '$841,000', '($19,500)', '-2.3%', ''],
        ['', '', '', '', '', ''],
        ['Less:', '', '', '', '', ''],
        ['Vacancy Loss', '($41,075)', '($33,640)', '($7,435)', '22.1%', 'Higher vacancies Q2'],
        ['Concessions', '($8,215)', '($8,410)', '$195', '-2.3%', 'Fewer move-in specials needed'],
        ['Bad Debt', '($4,108)', '($4,205)', '$97', '-2.3%', 'Improved tenant screening'],
        ['Effective Gross Income', '$768,102', '$794,745', '($26,643)', '-3.4%', ''],
        ['', '', '', '', '', ''],
        ['Operating Expenses', '', '', '', '', ''],
        ['Property Management', '($38,405)', '($39,737)', '$1,332', '-3.4%', 'Tied to EGI'],
        ['Maintenance & Repairs', '($78,000)', '($75,000)', '($3,000)', '4.0%', 'HVAC repairs in Q2'],
        ['Utilities', '($51,000)', '($48,000)', '($3,000)', '6.3%', 'Increased water costs'],
        ['Property Tax', '($92,173)', '($92,173)', '$0', '0.0%', 'On budget'],
        ['Insurance', '($23,043)', '($23,043)', '$0', '0.0%', 'On budget'],
        ['Marketing', '($8,500)', '($7,500)', '($1,000)', '13.3%', 'New digital campaign'],
        ['Administrative', '($15,362)', '($16,000)', '$638', '-4.0%', 'Cost savings'],
        ['Total Operating Expenses', '($306,483)', '($301,453)', '($5,030)', '1.7%', ''],
        ['', '', '', '', '', ''],
        ['Net Operating Income (NOI)', '$461,619', '$493,292', '($31,673)', '-6.4%', 'Action plan in progress'],
        ['', '', '', '', '', ''],
        ['Key Metrics', '', '', '', '', ''],
        ['NOI Margin', '60.1%', '62.1%', '-2.0%', '-3.2%', ''],
        ['Expense Ratio', '39.9%', '37.9%', '2.0%', '5.3%', '']
      ],
      'summary': [
        ['Acquisition Summary', 'Value', 'Per Unit', 'Per SF', 'Notes'],
        ['Property Details', '', '', '', ''],
        ['Purchase Price', '$5,200,000', '$185,714', '$325.00', '28 units, 16,000 SF'],
        ['Purchase Date', 'Mar 15, 2023', '', '', ''],
        ['Property Type', 'Multi-Family', '', '', 'Class B'],
        ['Location', 'Boston, MA', '', '', 'Growing submarket'],
        ['Building Age', '31 years', '', '', 'Built 1992, renovated 2015'],
        ['', '', '', '', ''],
        ['Financial Metrics', '', '', '', ''],
        ['Year 1 NOI', '$937,085', '$33,467', '$58.57', 'Stabilized'],
        ['Cap Rate', '6.0%', '', '', 'Market average: 5.8%'],
        ['Going-in Cap Rate', '5.85%', '', '', 'Before improvements'],
        ['Cash-on-Cash Return', '7.2%', '', '', 'Year 1'],
        ['IRR (5-Year)', '15.8%', '', '', 'With disposition'],
        ['Equity Multiple', '1.85x', '', '', '5-year hold'],
        ['', '', '', '', ''],
        ['Investment Structure', '', '', '', ''],
        ['Total Capitalization', '$5,806,000', '$207,357', '$362.88', 'Including closing costs'],
        ['Debt', '$3,900,000', '$139,286', '$243.75', '75% LTV, 4.5% interest'],
        ['Equity', '$1,906,000', '$68,071', '$119.13', 'Single investor'],
        ['', '', '', '', ''],
        ['Business Plan', '', '', '', ''],
        ['Strategy', 'Value-Add', '', '', 'Moderate renovation'],
        ['Hold Period', '5 years', '', '', 'Target disposition: 2028'],
        ['Exit Cap Rate', '5.75%', '', '', 'Conservative projection'],
        ['Projected Exit Value', '$5,997,000', '$214,179', '$374.81', 'Based on NOI growth']
      ],
      'scenarios': [
        ['Investment Scenarios', 'Base Case', 'Optimistic', 'Conservative', 'Notes'],
        ['Assumptions', '', '', '', ''],
        ['Rental Growth (Annual)', '3.0%', '4.5%', '2.0%', 'Market average: 3.2%'],
        ['Expense Growth (Annual)', '2.5%', '2.0%', '3.0%', 'Inflation expectations'],
        ['Vacancy Rate', '4.0%', '3.0%', '5.0%', 'Current: 4.2%'],
        ['Exit Cap Rate', '5.75%', '5.5%', '6.0%', 'Current: 6.0%'],
        ['Renovation Cost', '$450,000', '$400,000', '$500,000', '$16K/unit average'],
        ['', '', '', '', ''],
        ['5-Year Projections', '', '', '', ''],
        ['Year 5 NOI', '$1,058,000', '$1,146,000', '$978,000', ''],
        ['Exit Value', '$18,397,000', '$20,836,000', '$16,300,000', 'Based on exit cap'],
        ['Total Cash Flow', '$2,684,000', '$3,157,000', '$2,247,000', '5-year cumulative'],
        ['', '', '', '', ''],
        ['Returns', '', '', '', ''],
        ['IRR', '15.8%', '19.4%', '12.6%', 'Target: 15%+'],
        ['Equity Multiple', '1.85x', '2.14x', '1.62x', 'Target: 1.8x+'],
        ['Average Cash Yield', '7.8%', '9.1%', '6.5%', 'Years 1-5'],
        ['', '', '', '', ''],
        ['Risk Factors', '', '', '', ''],
        ['Market Risk', 'Medium', 'Low', 'High', 'Boston market stability'],
        ['Execution Risk', 'Medium', 'Low', 'Medium', 'Renovation complexity'],
        ['Interest Rate Risk', 'Low', 'Low', 'High', 'Fixed rate debt in place']
      ],
      'comparables': [
        ['Comparable Properties', 'Subject', 'Comp 1', 'Comp 2', 'Comp 3', 'Comp 4'],
        ['Property Details', '', '', '', '', ''],
        ['Address', '522 River St', '450 Main St', '78 Commonwealth', '221 Beacon St', '118 Newbury St'],
        ['Property Type', 'Multi-Family', 'Multi-Family', 'Multi-Family', 'Multi-Family', 'Multi-Family'],
        ['Year Built', '1992', '1995', '1988', '2001', '1986'],
        ['Units', '28', '32', '24', '36', '22'],
        ['Total SF', '16,000', '18,400', '13,900', '21,600', '12,100'],
        ['Avg Unit Size (SF)', '571', '575', '579', '600', '550'],
        ['', '', '', '', '', ''],
        ['Transaction Details', '', '', '', '', ''],
        ['Sale Date', 'Mar 2023', 'Jan 2023', 'Nov 2022', 'Aug 2022', 'May 2022'],
        ['Sale Price', '$5,200,000', '$5,650,000', '$4,450,000', '$7,200,000', '$3,850,000'],
        ['Price per Unit', '$185,714', '$176,563', '$185,417', '$200,000', '$175,000'],
        ['Price per SF', '$325', '$307', '$320', '$333', '$318'],
        ['Cap Rate', '6.0%', '5.8%', '5.9%', '5.6%', '6.1%'],
        ['', '', '', '', '', ''],
        ['Income/Expenses (per Unit)', '', '', '', '', ''],
        ['Annual Income', '$55,393', '$52,969', '$53,750', '$58,333', '$51,364'],
        ['Expenses', '$21,925', '$20,594', '$20,417', '$22,222', '$19,773'],
        ['NOI', '$33,467', '$32,375', '$33,333', '$36,111', '$31,591'],
        ['', '', '', '', '', ''],
        ['Notes', 'Value-add opportunity', 'Recent renovation', 'Older finishes', 'Premium location', 'Smaller units']
      ],
      'projections': [
        ['Tax Projections', '2023', '2024', '2025', '2026', '2027'],
        ['Income', '', '', '', '', ''],
        ['Rental Income', '$1,560,000', '$1,606,800', '$1,655,004', '$1,704,654', '$1,755,794'],
        ['Other Income', '$83,000', '$85,490', '$88,055', '$90,696', '$93,417'],
        ['Total Income', '$1,643,000', '$1,692,290', '$1,743,059', '$1,795,350', '$1,849,211'],
        ['', '', '', '', '', ''],
        ['Deductible Expenses', '', '', '', '', ''],
        ['Operating Expenses', '$599,120', '$617,094', '$635,606', '$654,675', '$674,315'],
        ['Mortgage Interest', '$175,500', '$172,000', '$168,500', '$165,000', '$161,500'],
        ['Property Tax', '$184,345', '$189,875', '$195,572', '$201,439', '$207,482'],
        ['Insurance', '$46,086', '$47,469', '$48,893', '$50,360', '$51,870'],
        ['', '', '', '', '', ''],
        ['Depreciation', '', '', '', '', ''],
        ['Building (27.5 years)', '$151,273', '$151,273', '$151,273', '$151,273', '$151,273'],
        ['Land Improvements (15 years)', '$34,667', '$34,667', '$34,667', '$34,667', '$34,667'],
        ['Personal Property (5 years)', '$10,400', '$16,640', '$10,000', '$6,000', '$3,600'],
        ['Total Depreciation', '$196,340', '$202,580', '$195,940', '$191,940', '$189,540'],
        ['', '', '', '', '', ''],
        ['Taxable Income', '', '', '', '', ''],
        ['Net Operating Income', '$937,085', '$965,198', '$994,153', '$1,023,978', '$1,054,697'],
        ['Less: Interest', '($175,500)', '($172,000)', '($168,500)', '($165,000)', '($161,500)'],
        ['Less: Depreciation', '($196,340)', '($202,580)', '($195,940)', '($191,940)', '($189,540)'],
        ['Taxable Income', '$565,245', '$590,618', '$629,713', '$667,038', '$703,657'],
        ['', '', '', '', '', ''],
        ['Estimated Tax (21%)', '$118,701', '$124,030', '$132,240', '$140,078', '$147,768']
      ],
      'depreciation': [
        ['Depreciation Schedule', 'Cost Basis', 'Recovery Period', 'Method', '2023', '2024', '2025', '2026', '2027'],
        ['Building Components', '', '', '', '', '', '', '', ''],
        ['Building Shell', '$4,160,000', '27.5 years', 'Straight Line', '$151,273', '$151,273', '$151,273', '$151,273', '$151,273'],
        ['', '', '', '', '', '', '', '', ''],
        ['Land Improvements', '', '', '', '', '', '', '', ''],
        ['Parking Lot', '$150,000', '15 years', 'Straight Line', '$10,000', '$10,000', '$10,000', '$10,000', '$10,000'],
        ['Landscaping', '$75,000', '15 years', 'Straight Line', '$5,000', '$5,000', '$5,000', '$5,000', '$5,000'],
        ['Fencing', '$45,000', '15 years', 'Straight Line', '$3,000', '$3,000', '$3,000', '$3,000', '$3,000'],
        ['Swimming Pool', '$125,000', '15 years', 'Straight Line', '$8,333', '$8,333', '$8,333', '$8,333', '$8,333'],
        ['Site Lighting', '$125,000', '15 years', 'Straight Line', '$8,333', '$8,333', '$8,333', '$8,333', '$8,333'],
        ['Total Land Improvements', '$520,000', '', '', '$34,667', '$34,667', '$34,667', '$34,667', '$34,667'],
        ['', '', '', '', '', '', '', '', ''],
        ['Personal Property', '', '', '', '', '', '', '', ''],
        ['Appliances', '$28,000', '5 years', 'MACRS', '$5,600', '$8,960', '$5,376', '$3,226', '$1,936'],
        ['Flooring', '$15,000', '5 years', 'MACRS', '$3,000', '$4,800', '$2,880', '$1,728', '$1,037'],
        ['Window Treatments', '$9,000', '5 years', 'MACRS', '$1,800', '$2,880', '$1,728', '$1,037', '$622'],
        ['Total Personal Property', '$52,000', '', '', '$10,400', '$16,640', '$9,984', '$5,991', '$3,595'],
        ['', '', '', '', '', '', '', '', ''],
        ['Total Depreciation', '$4,732,000', '', '', '$196,340', '$202,580', '$195,924', '$191,931', '$189,535']
      ],
      'deductions': [
        ['Deductions Analysis', '2023', 'Allowable', 'Disallowed', 'Notes'],
        ['Operating Expenses', '', '', '', ''],
        ['Property Management', '$76,810', '$76,810', '$0', 'Fully deductible'],
        ['Repairs & Maintenance', '$153,621', '$153,621', '$0', 'Ordinary & necessary'],
        ['Utilities', '$92,172', '$92,172', '$0', 'Fully deductible'],
        ['Insurance', '$46,086', '$46,086', '$0', 'Fully deductible'],
        ['Marketing', '$15,362', '$15,362', '$0', 'Fully deductible'],
        ['Administrative', '$30,724', '$30,724', '$0', 'Fully deductible'],
        ['Total Operating Expenses', '$414,775', '$414,775', '$0', ''],
        ['', '', '', '', ''],
        ['Taxes', '', '', '', ''],
        ['Property Tax', '$184,345', '$184,345', '$0', 'Fully deductible'],
        ['', '', '', '', ''],
        ['Interest', '', '', '', ''],
        ['Mortgage Interest', '$175,500', '$175,500', '$0', 'Business interest'],
        ['', '', '', '', ''],
        ['Depreciation & Amortization', '', '', '', ''],
        ['Building Depreciation', '$151,273', '$151,273', '$0', '27.5-year SL'],
        ['Land Improvements', '$34,667', '$34,667', '$0', '15-year SL'],
        ['Personal Property', '$10,400', '$10,400', '$0', '5-year MACRS'],
        ['Loan Costs Amortization', '$3,000', '$3,000', '$0', 'Amortized over loan term'],
        ['Total Depreciation & Amortization', '$199,340', '$199,340', '$0', ''],
        ['', '', '', '', ''],
        ['Capital Expenditures', '', '', '', ''],
        ['Renovation Costs', '$100,000', '$0', '$100,000', 'Must be capitalized'],
        ['Equipment Purchases', '$25,000', '$0', '$25,000', 'Must be capitalized'],
        ['Total Capital Expenditures', '$125,000', '$0', '$125,000', ''],
        ['', '', '', '', ''],
        ['Total Deductions', '$1,098,960', '$973,960', '$125,000', '']
      ],
      'planning': [
        ['Tax Planning Strategies', 'Strategy', 'Potential Benefit', 'Implementation', 'Notes'],
        ['Cost Segregation', 'Accelerate depreciation by identifying components with shorter recovery periods', '$75,000 - $125,000 NPV', 'Engage cost segregation specialist', 'Most effective for new purchases'],
        ['', '', '', '', ''],
        ['1031 Exchange', 'Defer capital gains tax by exchanging for like-kind property', '$300,000 - $500,000 tax deferral', 'Identify replacement property within 45 days', 'Consider for exit strategy'],
        ['', '', '', '', ''],
        ['Bonus Depreciation', 'Take 100% depreciation on eligible property in year placed in service', '$50,000 - $75,000 first-year benefit', 'Apply to qualifying property', 'Phase-down begins after 2022'],
        ['', '', '', '', ''],
        ['Expense vs. Capitalize', 'Properly classify repairs as expenses rather than improvements', '$15,000 - $25,000 annually', 'Document repair nature of work', 'Must meet IRS requirements'],
        ['', '', '', '', ''],
        ['Operating Structure', 'Optimize entity structure for tax efficiency', 'Varies based on circumstances', 'Consider LLC vs. Partnership', 'Review annually'],
        ['', '', '', '', ''],
        ['Qualified Business Income Deduction', 'Take advantage of 20% pass-through deduction', '$25,000 - $40,000 annually', 'Structure to maximize QBI', 'Subject to income limitations'],
        ['', '', '', '', ''],
        ['Opportunity Zone Investment', 'Defer and potentially reduce capital gains', 'Up to 15% reduction in deferred gain', 'Reinvest gains within 180 days', 'Long-term investment required'],
        ['', '', '', '', ''],
        ['Annual Gift Tax Exclusion', 'Transfer property interests to family members', '$16,000 per recipient annually', 'Structured gifting program', 'Estate planning benefit'],
        ['', '', '', '', ''],
        ['Timing of Income/Expenses', 'Accelerate expenses, defer income at year-end', '$10,000 - $20,000 timing benefit', 'December planning', 'Cash method taxpayers']
      ],
      'compliance': [
        ['Tax Compliance Calendar', 'Deadline', 'Filing Requirement', 'Notes', 'Status'],
        ['January 31', 'Issue Form 1099-MISC to vendors', 'Required for payments of $600+', 'Complete'],
        ['', '', '', '', ''],
        ['February 28', 'File Form 1099-MISC with IRS (paper)', 'Summary of all 1099s issued', 'Complete'],
        ['', '', '', '', ''],
        ['March 15', 'Partnership Tax Return (Form 1065)', 'Can request 6-month extension', 'Complete'],
        ['', '', '', '', ''],
        ['March 31', 'File Form 1099-MISC with IRS (electronic)', 'Required if filing 250+ forms', 'Complete'],
        ['', '', '', '', ''],
        ['April 15', 'Estimated Tax Payment (Q1)', 'For partners/members', 'Complete'],
        ['', '', '', '', ''],
        ['June 15', 'Estimated Tax Payment (Q2)', 'For partners/members', 'Complete'],
        ['', '', '', '', ''],
        ['September 15', 'Extended Partnership Return Due', 'Final deadline with extension', 'N/A'],
        ['September 15', 'Estimated Tax Payment (Q3)', 'For partners/members', 'Upcoming'],
        ['', '', '', '', ''],
        ['October 15', 'Extended Individual Returns Due', 'For partners/members', 'Upcoming'],
        ['', '', '', '', ''],
        ['December 31', 'Year-end tax planning', 'Income/expense timing decisions', 'Upcoming'],
        ['January 15', 'Estimated Tax Payment (Q4)', 'For partners/members', 'Upcoming'],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['Document Retention', 'Policy', '', '', ''],
        ['Tax Returns', 'Permanent', '', '', ''],
        ['Supporting Documents', '7 years', '', '', ''],
        ['Property Records', 'Until disposal + 7 years', '', '', '']
      ]
    };

    const result = initialData[sheetId] || [['No data available for ' + sheetId]];
    console.log("Returning data for sheet:", result);
    return result;
  };

  // Handle saving Excel sheets
  const handleSaveExcelSheet = (data: any[][], sheetName: string, sheetId: string) => {
    console.log(`Saving ${sheetName} data:`, data);
  };

  // Get current sub-categories based on active main category
  const currentSubCategories = SUB_CATEGORIES[activeMainCategory as keyof typeof SUB_CATEGORIES] || [];

  // Reset sub-category when main category changes
  const handleMainCategoryChange = (value: string) => {
    setActiveMainCategory(value);
    const defaultSubCategory = SUB_CATEGORIES[value as keyof typeof SUB_CATEGORIES]?.[0]?.id || '';
    setActiveSubCategory(defaultSubCategory);
  };

  // Function to handle edit button click
  const handleEditClick = () => {
    const currentRef = getCurrentRef();
    if (currentRef.current) {
      currentRef.current.toggleEditMode();
    }
  };

  // Function to handle export button click
  const handleExportClick = () => {
    const currentRef = getCurrentRef();
    if (currentRef.current) {
      currentRef.current.exportToExcel();
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header with Search */}
        <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Financial Hub</h1>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search financial data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        </div>

      {/* Main Category Tabs */}
      <Tabs value={activeMainCategory} onValueChange={handleMainCategoryChange} className="w-full">
        <TabsList className="w-full grid grid-cols-4 gap-2 bg-white p-1 h-auto">
          {MAIN_CATEGORIES.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center gap-3 py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeMainCategory === category.id ? 'bg-blue-600' : 'bg-gray-400'
              }`}>
                <span className="text-white font-bold">{category.icon}</span>
              </div>
              <span className="font-medium">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Summary Metrics - Show for all categories */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500">Purchase Price</div>
              <div className="text-2xl font-bold mt-1">{summaryMetrics.purchasePrice}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500">NOI</div>
              <div className="text-2xl font-bold mt-1">{summaryMetrics.noi}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500">Cap Rate</div>
              <div className="text-2xl font-bold mt-1">{summaryMetrics.capRate}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500">Cash on Cash</div>
              <div className="text-2xl font-bold mt-1">{summaryMetrics.cashOnCash}</div>
            </CardContent>
          </Card>
        </div>

        {/* Sub-category Filter Pills */}
        <div className="flex gap-2 mt-6">
          {currentSubCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeSubCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveSubCategory(category.id)}
              className={`rounded-full ${
                activeSubCategory === category.id 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'bg-gray-50'
              }`}
            >
              {category.name}
            </Button>
          ))}
          <Button variant="outline" className="rounded-full bg-gray-50">
            More
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Content for each main category */}
        <TabsContent value="property">
          {/* Existing Property Analysis Content */}
          {activeSubCategory === 'overview' && (
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
                <CardTitle>Property Overview</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Property Details</h3>
                    <div className="grid grid-cols-2 gap-y-4">
                      <div className="text-gray-500">Property Name:</div>
                      <div>{propertyDetails.name}</div>
                      <div className="text-gray-500">Address:</div>
                      <div>{propertyDetails.address}</div>
                      <div className="text-gray-500">City, State, ZIP:</div>
                      <div>{propertyDetails.cityStateZip}</div>
                      <div className="text-gray-500">Purchase Date:</div>
                      <div>{propertyDetails.purchaseDate}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Additional Information</h3>
                    <div className="grid grid-cols-2 gap-y-4">
                      <div className="text-gray-500">Property Type:</div>
                      <div>{propertyDetails.propertyType}</div>
                      <div className="text-gray-500">Year Built:</div>
                      <div>{propertyDetails.yearBuilt}</div>
                      <div className="text-gray-500">Units:</div>
                      <div>{propertyDetails.units}</div>
                      <div className="text-gray-500">Fund:</div>
                      <div>{propertyDetails.fund}</div>
                  </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {activeSubCategory === 'income' && (
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
                <CardTitle>Income Analysis</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleEditClick}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" onClick={handleExportClick}>
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Suspense fallback={<div className="p-4 text-center">Loading spreadsheet...</div>}>
                  <HandsontableExcel
                    key={`income-${Date.now()}`}
                    ref={incomeExcelRef}
                    data={getInitialDataForSheet('income')}
                    sheetName="Income Analysis"
                    onSave={(data) => handleSaveExcelSheet(data, 'Income Analysis', 'income')}
                  />
                </Suspense>
              </CardContent>
            </Card>
          )}
          {activeSubCategory === 'expenses' && (
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
                <CardTitle>Expenses Analysis</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleEditClick}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" onClick={handleExportClick}>
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                            </div>
              </CardHeader>
              <CardContent className="p-6">
                <Suspense fallback={<div className="p-4 text-center">Loading spreadsheet...</div>}>
                  <HandsontableExcel
                    key={`expenses-${Date.now()}`}
                    ref={expensesExcelRef}
                    data={getInitialDataForSheet('expenses')}
                    sheetName="Expenses Analysis"
                    onSave={(data) => handleSaveExcelSheet(data, 'Expenses Analysis', 'expenses')}
                  />
                </Suspense>
              </CardContent>
            </Card>
          )}
          {activeSubCategory === 'financing' && (
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
                <CardTitle>Financing Analysis</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleEditClick}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" onClick={handleExportClick}>
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Suspense fallback={<div className="p-4 text-center">Loading spreadsheet...</div>}>
                  <HandsontableExcel
                    key={`financing-${Date.now()}`}
                    ref={financingExcelRef}
                    data={getInitialDataForSheet('financing')}
                    sheetName="Financing Analysis"
                    onSave={(data) => handleSaveExcelSheet(data, 'Financing Analysis', 'financing')}
                  />
                </Suspense>
              </CardContent>
            </Card>
          )}
          {activeSubCategory === 'market' && (
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
                <CardTitle>Market Analysis</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleEditClick}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" onClick={handleExportClick}>
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Suspense fallback={<div className="p-4 text-center">Loading spreadsheet...</div>}>
                  <HandsontableExcel
                    key={`market-${Date.now()}`}
                    ref={marketExcelRef}
                    data={getInitialDataForSheet('market')}
                    sheetName="Market Analysis"
                    onSave={(data) => handleSaveExcelSheet(data, 'Market Analysis', 'market')}
                  />
                </Suspense>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="financial">
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
              <CardTitle>{currentSubCategories.find(c => c.id === activeSubCategory)?.name || 'Financial Statements'}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleEditClick}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" onClick={handleExportClick}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Suspense fallback={<div className="p-4 text-center">Loading spreadsheet...</div>}>
                <HandsontableExcel
                  key={`${activeSubCategory}-${Date.now()}`}
                  ref={financialExcelRef}
                  data={getInitialDataForSheet(activeSubCategory)}
                  sheetName={currentSubCategories.find(c => c.id === activeSubCategory)?.name || ''}
                  onSave={(data) => handleSaveExcelSheet(data, activeSubCategory, activeSubCategory)}
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="acquisition">
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
              <CardTitle>{currentSubCategories.find(c => c.id === activeSubCategory)?.name || 'Acquisition Analysis'}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleEditClick}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" onClick={handleExportClick}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
            </div>
            </CardHeader>
            <CardContent className="p-6">
              <Suspense fallback={<div className="p-4 text-center">Loading spreadsheet...</div>}>
                <HandsontableExcel
                  key={`${activeSubCategory}-${Date.now()}`}
                  ref={acquisitionExcelRef}
                  data={getInitialDataForSheet(activeSubCategory)}
                  sheetName={currentSubCategories.find(c => c.id === activeSubCategory)?.name || ''}
                  onSave={(data) => handleSaveExcelSheet(data, activeSubCategory, activeSubCategory)}
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax">
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
              <CardTitle>{currentSubCategories.find(c => c.id === activeSubCategory)?.name || 'Tax Planning'}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleEditClick}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" onClick={handleExportClick}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
        </div>
            </CardHeader>
            <CardContent className="p-6">
              <Suspense fallback={<div className="p-4 text-center">Loading spreadsheet...</div>}>
                <HandsontableExcel
                  key={`${activeSubCategory}-${Date.now()}`}
                  ref={taxExcelRef}
                  data={getInitialDataForSheet(activeSubCategory)}
                  sheetName={currentSubCategories.find(c => c.id === activeSubCategory)?.name || ''}
                  onSave={(data) => handleSaveExcelSheet(data, activeSubCategory, activeSubCategory)}
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 