"use client";
import Link from "next/link";
import Logo from "./logo";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  // State for tracking open dropdowns
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on a dashboard page
  const isDashboardPage = pathname?.includes('dashboard');

  // Function to toggle dropdowns
  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Toggle mobile menu
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };
  
  // Handle sign out
  const handleSignOut = () => {
    // In a real app, this would clear auth tokens/session
    router.push('/');
  };

  // Add event listener for Escape key to close dropdown and mobile nav
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (openDropdown !== null) {
          setOpenDropdown(null);
        }
        if (mobileNavOpen) {
          setMobileNavOpen(false);
        }
      }
    };

    // Add event listener when component mounts
    document.addEventListener('keydown', handleEscKey);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [openDropdown, mobileNavOpen]);

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && openDropdown !== null) {
        setOpenDropdown(null);
      }
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node) && mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown, mobileNavOpen]);

  // If on dashboard page, render a simplified header
  if (isDashboardPage) {
    return (
      <header className="sticky top-0 z-30 w-full bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Mobile menu button - only for sign out */}
            <button 
              className="md:hidden flex items-center" 
              onClick={toggleMobileNav}
              aria-expanded="false"
              aria-controls="mobile-dashboard-navigation"
            >
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {mobileNavOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop Sign Out Button */}
            <div className="hidden md:block">
              <button 
                onClick={handleSignOut}
                className="py-2 px-4 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Out
              </button>
            </div>

            {/* Mobile Navigation - Only Sign Out */}
            {mobileNavOpen && (
              <div 
                className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg z-20 p-4 md:hidden border-t border-gray-100"
                ref={mobileNavRef}
                id="mobile-dashboard-navigation"
              >
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setMobileNavOpen(false);
                      }}
                      className="w-full flex items-center justify-center py-2 px-3 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      <span>Sign Out</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Regular header for non-dashboard pages
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-10">
        <div className="relative flex h-14 items-center justify-between rounded-2xl bg-white/90 px-4 shadow-lg shadow-black/[0.03] backdrop-blur-xs" ref={dropdownRef}>

          {/* Site branding (Logo) */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center" 
            onClick={toggleMobileNav}
            aria-expanded="false"
            aria-controls="mobile-navigation"
          >
            <span className="sr-only">Menu</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileNavOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex gap-10 text-lg font-semibold text-gray-900">
              {/* Products Dropdown */}
              <li className="relative">
                <button
                  onClick={() => toggleDropdown("products")}
                  className="hover:text-gray-600 transition-colors"
                  suppressHydrationWarning
                >
                  Products ▾
                </button>
                {openDropdown === "products" && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                    <Link href="/products/ariesview-ai" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">AriesView AI</p>
                      <p className="text-base text-gray-600">Private AI assistant for CRE analysis and insights.</p>
                    </Link>
                    <Link href="/products/document-management" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">Document Management Hub</p>
                      <p className="text-base text-gray-600">AI-powered document analysis and intelligence.</p>
                    </Link>
                    <Link href="/products/financial-analysis" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">Financial Analysis Hub</p>
                      <p className="text-base text-gray-600">Comprehensive financial insights and reporting.</p>
                    </Link>
                  </div>
                )}
              </li>

              {/* Solutions Dropdown */}
              <li className="relative">
                <button
                  onClick={() => toggleDropdown("solutions")}
                  className="hover:text-gray-600 transition-colors"
                  suppressHydrationWarning
                >
                  Solutions ▾
                </button>
                {openDropdown === "solutions" && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                    <Link href="/solutions/acquisition-screening" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">Acquisition Screening</p>
                      <p className="text-base text-gray-600">AI-powered deal analysis and screening.</p>
                    </Link>
                    <Link href="/solutions/due-diligence" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">Due Diligence</p>
                      <p className="text-base text-gray-600">Streamlined due diligence and risk analysis.</p>
                    </Link>
                    <Link href="/solutions/asset-management" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">Asset Management</p>
                      <p className="text-base text-gray-600">Optimize portfolio performance and reporting.</p>
                    </Link>
                  </div>
                )}
              </li>

              {/* Clients Dropdown */}
              <li className="relative">
                <button
                  onClick={() => toggleDropdown("clients")}
                  className="hover:text-gray-600 transition-colors"
                  suppressHydrationWarning
                >
                  Clients ▾
                </button>
                {openDropdown === "clients" && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                    <Link href="/private-equity" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">Real Estate Private Equity</p>
                      <p className="text-base text-gray-600">Institutional-grade tools for fund management.</p>
                    </Link>
                    <Link href="/asset-managers" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">Real Estate Asset Managers</p>
                      <p className="text-base text-gray-600">Optimize property performance efficiently.</p>
                    </Link>
                    <Link href="/individual-investors" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">Real Estate Individual Investors</p>
                      <p className="text-base text-gray-600">Professional tools scaled for individual portfolios.</p>
                    </Link>
                  </div>
                )}
              </li>

              {/* Company Dropdown */}
              <li className="relative">
                <button
                  onClick={() => toggleDropdown("company")}
                  className="hover:text-gray-600 transition-colors"
                  suppressHydrationWarning
                >
                  Company ▾
                </button>
                {openDropdown === "company" && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                    <Link href="/about" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">About</p>
                      <p className="text-base text-gray-600">Learn more about our mission and values.</p>
                    </Link>
                    <Link href="/CustomerSuccess" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">Customer Success</p>
                      <p className="text-base text-gray-600">How we help our customers succeed.</p>
                    </Link>
                    <Link href="/careers" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">Careers</p>
                      <p className="text-base text-gray-600">Join our team and grow with us.</p>
                    </Link>
                    <Link href="/contact" className="block px-4 py-3 hover:bg-gray-100 rounded-lg">
                      <p className="text-lg font-semibold">Contact Us</p>
                      <p className="text-base text-gray-600">Get in touch with our team.</p>
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Desktop Sign-In Links */}
          <ul className="hidden md:flex items-center gap-4">
            <li>
              <Link href="/signin" className="btn-sm bg-white text-gray-800 shadow-sm hover:bg-gray-50">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="btn-sm bg-gray-800 text-gray-200 shadow-sm hover:bg-gray-900">
                Sign up
              </Link>
            </li>
          </ul>

          {/* Mobile Navigation */}
          {mobileNavOpen && (
            <div 
              className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg z-20 p-4 md:hidden border-t border-gray-100"
              ref={mobileNavRef}
              id="mobile-navigation"
            >
              {/* Mobile Products Section */}
              <div>
                <button
                  onClick={() => toggleDropdown("mobile-products")}
                  className="flex w-full justify-between items-center py-2 font-semibold"
                >
                  <span>Products</span>
                  <span>{openDropdown === "mobile-products" ? "▲" : "▼"}</span>
                </button>
                {openDropdown === "mobile-products" && (
                  <div className="mt-2 pl-4 space-y-2">
                    <Link href="/products/ariesview-ai" className="block py-2">
                      AriesView AI
                    </Link>
                    <Link href="/products/document-management" className="block py-2">
                      Document Management Hub
                    </Link>
                    <Link href="/products/financial-analysis" className="block py-2">
                      Financial Analysis Hub
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Solutions Section */}
              <div>
                <button
                  onClick={() => toggleDropdown("mobile-solutions")}
                  className="flex w-full justify-between items-center py-2 font-semibold"
                >
                  <span>Solutions</span>
                  <span>{openDropdown === "mobile-solutions" ? "▲" : "▼"}</span>
                </button>
                {openDropdown === "mobile-solutions" && (
                  <div className="mt-2 pl-4 space-y-2">
                    <Link href="/solutions/acquisition-screening" className="block py-2">
                      Acquisition Screening
                    </Link>
                    <Link href="/solutions/due-diligence" className="block py-2">
                      Due Diligence
                    </Link>
                    <Link href="/solutions/asset-management" className="block py-2">
                      Asset Management
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Clients Section */}
              <div>
                <button
                  onClick={() => toggleDropdown("mobile-clients")}
                  className="flex w-full justify-between items-center py-2 font-semibold"
                >
                  <span>Clients</span>
                  <span>{openDropdown === "mobile-clients" ? "▲" : "▼"}</span>
                </button>
                {openDropdown === "mobile-clients" && (
                  <div className="mt-2 pl-4 space-y-2">
                    <Link href="/private-equity" className="block py-2">
                      Real Estate Private Equity
                    </Link>
                    <Link href="/asset-managers" className="block py-2">
                      Real Estate Asset Managers
                    </Link>
                    <Link href="/individual-investors" className="block py-2">
                      Real Estate Individual Investors
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Company Section */}
              <div>
                <button
                  onClick={() => toggleDropdown("mobile-company")}
                  className="flex w-full justify-between items-center py-2 font-semibold"
                >
                  <span>Company</span>
                  <span>{openDropdown === "mobile-company" ? "▲" : "▼"}</span>
                </button>
                {openDropdown === "mobile-company" && (
                  <div className="mt-2 pl-4 space-y-2">
                    <Link href="/about" className="block py-2">
                      About
                    </Link>
                    <Link href="/CustomerSuccess" className="block py-2">
                      Customer Success
                    </Link>
                    <Link href="/careers" className="block py-2">
                      Careers
                    </Link>
                    <Link href="/contact" className="block py-2">
                      Contact
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Sign-In Links */}
              <div className="border-t border-gray-200 pt-4 mt-4 flex flex-col space-y-2">
                <Link href="/signin" className="w-full py-2 px-4 text-center bg-white border border-gray-300 rounded shadow-sm text-gray-800 hover:bg-gray-50">
                  Login
                </Link>
                <Link href="/signup" className="w-full py-2 px-4 text-center bg-gray-800 rounded shadow-sm text-gray-200 hover:bg-gray-900">
                  Sign up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

