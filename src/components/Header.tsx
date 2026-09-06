import React, { useState } from 'react';
import { 
  Phone, 
  Clock, 
  ShieldCheck, 
  ShoppingCart, 
  Menu, 
  X, 
  Lock, 
  Search, 
  Sparkles,
  Calculator,
  ChevronRight,
  FileText,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import HuanLogo from './HuanLogo';
import { downloadCompanyProfileFile } from '../services/pdfService';

interface HeaderProps {
  onOpenCalculator?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCalculator }) => {
  const { 
    currentPage, 
    navigate, 
    cartCount, 
    companyStats, 
    searchQuery, 
    setSearchQuery,
    showToast
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Products & Packages', page: 'products' },
    { label: 'Services', page: 'services' },
    { label: 'Company Profile', page: 'company-profile' },
    { label: 'Reviews', page: 'reviews' },
    { label: 'Blog', page: 'blog' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    navigate(page);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('products');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#081926]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-all">
      {/* Top Corporate Service Trust Strip */}
      <div className="bg-[#05111B] border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Trust Notice */}
          <div className="flex items-center gap-4 flex-wrap text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              NATIONWIDE PAKISTAN SERVICE
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Karachi Guarantee: <strong>{companyStats.karachiResolutionHours || '24\u201336hr'}</strong> Resolution SLA</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>FBR Registered NTN: {companyStats.ntnNumber.split(' ')[0]}</span>
            </span>
          </div>

          {/* Quick Direct Contacts & Utilities */}
          <div className="flex items-center gap-3 ml-auto text-[11px] sm:text-xs">
            {/* Download Company Profile PDF */}
            <button
              onClick={() => {
                downloadCompanyProfileFile(companyStats);
                showToast('Official Corporate Company Profile downloaded successfully.');
              }}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
              title="Download Official HUAN Surveillance Company Profile (PDF)"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="whitespace-nowrap font-medium">Download Profile PDF</span>
            </button>

            {onOpenCalculator && (
              <button 
                onClick={onOpenCalculator}
                className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                title="CCTV Storage & Bandwidth Calculator"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span className="whitespace-nowrap">Storage Calculator</span>
              </button>
            )}

            <a 
              href={`tel:${companyStats.primaryPhone}`} 
              className="inline-flex items-center gap-1 text-slate-200 hover:text-white font-medium whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{companyStats.primaryPhone}</span>
            </a>

            <button
              onClick={() => handleNavClick('admin')}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors pl-2 border-l border-slate-700 cursor-pointer"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (One functional row, 3 distinct zones) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        
        {/* ZONE 1: Brand Logo & Wordmark */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer shrink-0 transition-transform active:scale-95"
        >
          <HuanLogo size="md" theme="dark" />
        </div>

        {/* ZONE 2: Navigation Links (Single Line) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive 
                    ? 'text-white bg-[#0E3A5C] shadow-inner font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ZONE 3: Primary Actions (Search, Cart & AI Quote CTA) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Search Toggle */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search cameras, NVRs, fiber..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-44 sm:w-60 bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-1 p-1.5 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
                title="Search Products & Solutions"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Cart / Inquiry Basket Button */}
          <button
            onClick={() => handleNavClick('cart')}
            className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
            title="View Quote Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E65100] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#081926]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary CTA: AI Get a Quote */}
          <button
            onClick={() => handleNavClick('quote')}
            className="hidden sm:inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] active:bg-[#B45309] text-white font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-md hover:shadow-orange-950/40 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Get a Quote</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1D2D] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#0E3A5C] text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => handleNavClick('quote')}
              className="w-full flex items-center justify-center gap-2 bg-[#E65100] text-white font-semibold text-sm py-3 rounded-lg shadow cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Launch AI Quote Assistant</span>
            </button>

            <button
              onClick={() => {
                downloadCompanyProfileFile(companyStats);
                showToast('Official Corporate Company Profile downloaded successfully.');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#0E3A5C] text-white text-sm py-2.5 rounded-lg hover:bg-[#124974] transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Company Profile (PDF)</span>
            </button>

            {onOpenCalculator && (
              <button
                onClick={() => {
                  onOpenCalculator();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 text-slate-200 text-sm py-2.5 rounded-lg hover:bg-slate-700 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>CCTV HDD Storage Calculator</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
