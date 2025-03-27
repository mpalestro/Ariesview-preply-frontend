'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

// Add custom scrollbar styles
const scrollbarStyles = `
  /* For Webkit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #1F2937;
  }
  ::-webkit-scrollbar-thumb {
    background: #4B5563;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #6B7280;
  }
`;

interface SidebarProps {
  currentPath?: string;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onDashboardClick?: () => void;
  onToggleSidebar?: () => void;
  isCollapsed?: boolean;
}

export default function Sidebar({ 
  currentPath,
  onProfileClick, 
  onSettingsClick,
  onDashboardClick,
  onToggleSidebar,
  isCollapsed
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [systemExpanded, setSystemExpanded] = useState(false);
  
  // Use provided currentPath or the actual pathname
  const activePath = currentPath || pathname;
  
  // Initialize expanded sections based on active path
  const getInitialExpandedSections = () => {
    const sections = {
      home: false,
      properties: false,
      ariesviewdashboards: false,
      customizeddashboard: false,
      benchmarkcenter: false,
      systemsupport: false
    };
    
    if (activePath?.includes('/dashboard')) {
      sections.ariesviewdashboards = true;
    } else if (activePath?.includes('/properties')) {
      sections.properties = true;
    } else if (activePath?.includes('/custom-dashboards')) {
      sections.customizeddashboard = true;
    } else if (activePath?.includes('/benchmark')) {
      sections.benchmarkcenter = true;
    }
    
    return sections;
  };
  
  // Track expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(getInitialExpandedSections);

  // Update expanded sections when path changes
  useEffect(() => {
    setExpandedSections(getInitialExpandedSections());
  }, [activePath]);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Check if a path is active
  const isActive = (path: string) => {
    return activePath === path || activePath?.startsWith(path + '/');
  };

  const handleSignOut = () => {
    router.push('/');
  };

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      router.push('/operations-dashboard/user-settings');
    }
  };

  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      router.push('/operations-dashboard/user-settings');
    }
  };

  const handleDashboardClick = () => {
    if (onDashboardClick) {
      onDashboardClick();
    } else {
      router.push('/operations-dashboard');
    }
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  // Navigation data structure
  const navigation = [
    {
      section: 'Home Page',
      color: '#64B5F6',
      path: '/operations-dashboard/home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      items: []
    },
    {
      section: 'AriesView AI',
      color: '#d2f4ea',
      path: '/operations-dashboard/ask-ai',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3 3 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ),
      items: []
    },
    {
      section: 'Asset Management',
      color: '#ffcccc',
      path: '/operations-dashboard/asset-management',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
      items: [
        { name: 'Properties', path: '/operations-dashboard/properties/property-overview' },
        { name: 'AriesView Dashboard', path: '/operations-dashboard/dashboards' },
        { name: 'Customized Dashboard', path: '/operations-dashboard/custom-dashboards' }
      ]
    },
    {
      section: 'Acquisition Screening',
      color: '#a5d6a7',
      path: '/operations-dashboard/acquisition-screening',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
        </svg>
      ),
      items: [
        { name: 'Market Analysis', path: '/operations-dashboard/acquisition-screening/market-analysis' },
        { name: 'Deal Pipeline', path: '/operations-dashboard/acquisition-screening/deal-pipeline' },
        { name: 'Investment Criteria', path: '/operations-dashboard/acquisition-screening/investment-criteria' }
      ]
    },
    {
      section: 'Investor Reporting',
      color: '#b794f4',
      path: '/operations-dashboard/investor-reporting',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
      items: [
        { name: 'Performance Reports', path: '/operations-dashboard/investor-reporting/performance-reports' },
        { name: 'Distribution Statements', path: '/operations-dashboard/investor-reporting/distribution-statements' },
        { name: 'Capital Account Updates', path: '/operations-dashboard/investor-reporting/capital-accounts' }
      ]
    },
    {
      section: 'Benchmark Center',
      color: '#ffcc80',
      path: '/operations-dashboard/benchmark-center',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
      items: [
        {
          title: 'Open Benchmarks',
          path: '/operations-dashboard/benchmark-center/open-benchmarks',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          ),
        },
        {
          title: 'Property Operations Overview',
          path: '/operations-dashboard/benchmark-center/property-operations-overview',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          ),
        }
      ]
    }
  ];

  // System & Support Links
  const systemLinks = [
    { 
      name: 'User Settings', 
      path: '/operations-dashboard/user-settings', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      name: 'Team Management', 
      path: '/operations-dashboard/team-management', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      )
    },
    { 
      name: 'Support Center', 
      path: '/operations-dashboard/support-center', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <>
      <style jsx global>{scrollbarStyles}</style>
      <div className="fixed top-16 left-0 bg-[#0f172a] text-white w-64 flex flex-col bottom-0 z-30">
        {/* Scrollable content area with custom scrollbar styling */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden sidebar-scroll" style={{ 
          scrollbarWidth: 'thin', 
          scrollbarColor: '#4B5563 #1F2937',
          paddingRight: '2px'
        }}>
          {/* Logo placeholder - maintaining spacing and border */}
          <div className="p-4 pt-5 pb-5 flex justify-center border-b border-gray-700">
            {/* Logo content removed but space preserved */}
          </div>

          {/* Main Navigation Label */}
          <div className="p-4">
            <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">
              MAIN NAVIGATION
            </p>
            
            <div className="space-y-2">
              {navigation.map((section) => (
                <div key={section.path || section.section || section.name} className="space-y-1">
                  <button
                    onClick={() => {
                      if ((!section.items || section.items.length === 0) && !section.children) {
                        // Navigate directly to the page if there are no sub-items
                        router.push(section.path);
                      } else {
                        // Otherwise expand/collapse the section
                        const sectionName = section?.section || section?.name;
                        if (sectionName) {
                          toggleSection(sectionName.toLowerCase().replace(/\s+/g, ''));
                        }
                      }
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    style={{
                      backgroundColor: section.path && isActive(section.path) ? (section.color ? section.color + '22' : '#4B5563' + '22') : 'transparent',
                      borderLeft: section.path && isActive(section.path) ? `4px solid ${section.color || '#4B5563'}` : '4px solid transparent'
                    }}
                    suppressHydrationWarning
                  >
                    <div className="flex items-center">
                      {section.icon}
                      <span className="font-medium whitespace-nowrap">{section.section || section.name}</span>
                    </div>
                    
                    {(section.items && section.items.length > 0) && (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 transition-transform duration-200 ${expandedSections[section.section.toLowerCase().replace(/\s+/g, '')] ? 'transform rotate-90' : ''}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  
                  {/* Sub-items for the section if expanded */}
                  {section.items && section.items.length > 0 && expandedSections[section.section.toLowerCase().replace(/\s+/g, '')] && (
                    <div className="pl-6 space-y-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.title || item.name || item.path}
                          href={item.path}
                          className={`flex pl-3 pr-2 py-2 text-sm rounded-md transition-colors duration-200 ${
                            isActive(item.path) 
                              ? 'bg-gray-700 text-white' 
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          {item.icon && (
                            <span className="mr-2">{item.icon}</span>
                          )}
                          <span>{item.title || item.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* System & Support Heading with Toggle */}
          <div className="p-4 pt-2">
            <button 
              onClick={() => setSystemExpanded(!systemExpanded)}
              className="flex items-center justify-between w-full mb-2"
              aria-label="Toggle System & Support section"
              suppressHydrationWarning
              {...(systemExpanded ? {'aria-expanded': 'true'} : {'aria-expanded': 'false'})}
            >
              <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                SYSTEM & SUPPORT
              </p>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${systemExpanded ? 'transform rotate-90' : ''}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* System & Support Links */}
            {systemExpanded && (
              <div className="space-y-1 mt-2">
                {systemLinks.map((link) => (
                  <Link
                    key={link.path || link.name}
                    href={link.path}
                    className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                      isActive(link.path) 
                        ? 'bg-gray-700 text-white' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sign Out Button */}
          <div className="p-4 pt-0">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-400 rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-200"
              suppressHydrationWarning
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 6a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 14.586V9z" clipRule="evenodd" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
        
        {/* Collapse button at bottom */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onToggleSidebar}
            className="flex items-center justify-center w-full px-3 py-1.5 text-sm text-gray-400 rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-200"
            aria-label="Toggle sidebar visibility"
            title="Toggle sidebar"
            suppressHydrationWarning
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isCollapsed ? 'transform rotate-90' : 'transform -rotate-90'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15.707 10.707a1 1 0 01-1.414 0L10 6.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}