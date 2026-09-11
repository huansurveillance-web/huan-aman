import React from 'react';
import { 
  Shield, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Globe, 
  Network, 
  LayoutGrid, 
  Camera, 
  Cable, 
  Star, 
  FileText, 
  Wrench, 
  Building2, 
  Cpu, 
  TrendingUp, 
  CheckCircle,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadCompanyProfileFile } from '../services/pdfService';
import HuanLogo from '../components/HuanLogo';

export const Home: React.FC<{ onOpenCalculator?: () => void }> = ({ onOpenCalculator }) => {
  const { 
    navigate, 
    companyStats, 
    products, 
    approvedReviews, 
    averageRating, 
    totalReviewsCount,
    formatPrice,
    addToCart,
    showToast
  } = useApp();

  const packages = (products || []).filter(p => p.isPackage).slice(0, 3);
  const featuredReviews = (approvedReviews || []).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* ================= HERO SECTION WITH SECURITY VIEWFINDER MOTIF ================= */}
      <section className="relative overflow-hidden bg-[#061523] border-b border-slate-800 text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
        
        {/* Subtle Background Viewfinder Grid & Radar Circles */}
        <div className="absolute inset-0 bg-[radial-gradient(#0E3A5C_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#0E3A5C]/20 to-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-2 bg-[#0E3A5C] text-slate-100 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-blue-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Nationwide Surveillance Engineering
            </span>

            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-amber-500/30">
              <Clock className="w-3.5 h-3.5" />
              Karachi 24–36hr Service Resolution SLA
            </span>

            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-700">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              NTN: {companyStats.ntnNumber.split(' ')[0]}
            </span>
          </div>

          {/* Main Hero Headline & Copy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
                Next-Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-400">CCTV & Security</span> Infrastructure for Pakistan.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                Turnkey commercial & industrial IP surveillance, long-range single-mode optical fiber backbones, multi-screen command centers, and rapid maintenance with guaranteed resolution.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('quote')}
                  className="inline-flex items-center gap-2.5 bg-[#E65100] hover:bg-[#D97706] text-white font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg hover:shadow-orange-950/50 transition-all cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Launch AI Quote Assistant</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('products')}
                  className="inline-flex items-center gap-2 bg-[#0E3A5C] hover:bg-[#134b76] text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>View Products & Packages</span>
                </button>

                <button
                  onClick={() => {
                    downloadCompanyProfileFile(companyStats);
                    showToast('Official Corporate Company Profile downloaded successfully.');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white underline py-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>Download Company Profile (PDF)</span>
                </button>
              </div>

              {/* Key Trust Checkmarks */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24/7 ColorVu Night Vision</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Single-Mode Fiber Splicing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{companyStats.standardWarranty || '2-Year Hardware Warranty'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Security Telemetry / Live HUD Graphic Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-[#0A1F30] border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-6">
                
                {/* Viewfinder Corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400"></div>

                {/* Live System Telemetry Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest">
                      SYSTEM STATUS: ONLINE
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    SLA: {companyStats.uptimeSLA}
                  </span>
                </div>

                {/* Interactive Dynamic Stats Display */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="bg-[#061523] p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Operating History</span>
                    <div className="text-2xl font-black text-white font-mono mt-0.5">
                      {companyStats.yearsInBusiness} <span className="text-sm font-semibold text-amber-400">Years</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Established Track Record</span>
                  </div>

                  <div className="bg-[#061523] p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400">Sites Completed</span>
                    <div className="text-2xl font-black text-white font-mono mt-0.5">
                      {companyStats.sitesCompleted}<span className="text-amber-400">+</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Turnkey Deployments</span>
                  </div>

                  <div className="bg-[#061523] p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400">Sectors Covered</span>
                    <div className="text-2xl font-black text-white font-mono mt-0.5">
                      {companyStats.sectorsServed}<span className="text-emerald-400">+</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Industrial & Commercial</span>
                  </div>

                  <div className="bg-[#061523] p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400">Karachi Response</span>
                    <div className="text-xl font-black text-amber-400 font-mono mt-0.5">
                      {companyStats.karachiResolutionHours} <span className="text-xs text-slate-300">hrs</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Service Guarantee SLA</span>
                  </div>
                </div>

                {/* Quick Utility Teaser */}
                <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-300 font-medium block">Planning a fresh setup?</span>
                    <span className="text-[11px] text-slate-500">Calculate storage or get instant AI bill of materials</span>
                  </div>
                  {onOpenCalculator && (
                    <button
                      onClick={onOpenCalculator}
                      className="px-3 py-1.5 bg-[#0E3A5C] hover:bg-[#144d79] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Calculator
                    </button>
                  )}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= NATIONWIDE & KARACHI 24–36HR SERVICE PROMISE SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#0E3A5C] to-[#0A263D] text-white rounded-3xl p-8 sm:p-12 border border-slate-700 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-400/30">
                <Clock className="w-3.5 h-3.5" />
                <span>Karachi Service Level Agreement</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Zero Extended Downtime: 24–36 Hour Service Resolution in Karachi
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                When a security camera or recording feed goes offline, your business becomes vulnerable. Unlike traditional contractors who take weeks to respond, HUAN Surveillance contractually guarantees on-site technical resolution and standby replacement equipment within <strong>24 to 36 hours</strong> for all installations across Karachi.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Karachi Technical Mobile Van Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Temporary Standby Camera / NVR Loan Units</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Nationwide Project Teams for Lahore & Islamabad</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full FBR Tax Invoicing & NTN Compliance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-slate-700/60 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <span className="text-3xl font-black text-white font-mono">24-36h</span>
                <span className="text-xs uppercase tracking-widest block text-slate-300 font-semibold mt-1">
                  Guaranteed SLA
                </span>
              </div>
              <button
                onClick={() => navigate('contact')}
                className="w-full bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer"
              >
                Log a Service Request
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CORE SERVICES SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
            Professional Security Engineering
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Specialized Surveillance & Network Solutions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            From single-mode optical fiber backbones spanning kilometers to 24/7 video wall command centers, we engineer mission-critical security systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Service 1: Fiber Optic Long Range */}
          <div className="bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Fiber Optic Cabling for Long-Range CCTV
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Single-mode & multi-mode fiber backbones for sprawling factories, warehouses, ports, and multi-building campuses exceeding 100m copper limits. Includes precision fusion splicing & OTDR loss testing.
              </p>
              <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Up to 20km lossless 4K video feeds</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Immunity to lightning & heavy industrial EMI</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => navigate('services')}
                className="text-xs font-bold text-[#0E3A5C] dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Learn Technical Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Service 2: Command Center & Video Wall */}
          <div className="bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                CCTV Control Room & Command Centers
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                End-to-end design and build-out of centralized monitoring rooms with ultra-narrow bezel 4K video walls, VMS matrix controllers, ergonomic workstations, and redundant power.
              </p>
              <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>0.88mm seam commercial 24/7 video walls</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Multi-site VMS matrix unification</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => navigate('services')}
                className="text-xs font-bold text-[#0E3A5C] dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Explore Control Room Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Service 3: Commercial CCTV Installation */}
          <div className="bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Commercial & Industrial CCTV Deployments
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                4MP and 4K IP security cameras with ColorVu full-color night vision, deep-learning vehicle/human target alerts, cash counter zoom, and cloud smartphone streaming.
              </p>
              <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Zero monthly cloud subscription fees</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>{companyStats.standardWarranty || '2-Year full replacement warranty'}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => navigate('services')}
                className="text-xs font-bold text-[#0E3A5C] dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View CCTV Capabilities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FEATURED READY PACKAGES & BUNDLES ================= */}
      <section className="bg-slate-50 dark:bg-[#071725] py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65100]">
                Pre-Engineered Systems
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
                Featured Turnkey Security Packages
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Complete all-in-one surveillance kits with hardware, storage, cabling, and certified installation.
              </p>
            </div>

            <button
              onClick={() => navigate('products')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0E3A5C] dark:text-amber-400 hover:underline cursor-pointer"
            >
              <span>View All Catalog & Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div 
                key={pkg.id}
                className="bg-white dark:bg-[#0B1E2E] rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden flex flex-col justify-between hover:border-amber-500/60 transition-all"
              >
                <div>
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    <img 
                      src={pkg.imageUrl} 
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {pkg.badge && (
                      <span className="absolute top-3 left-3 bg-[#E65100] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md tracking-wider">
                        {pkg.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-black/75 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                      Model: {pkg.modelNumber}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {pkg.shortDescription}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                      {pkg.packageIncludes?.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-baseline justify-between mb-4 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    <span className="text-xs text-slate-500">Package Starting at:</span>
                    <span className="text-lg font-black text-[#0E3A5C] dark:text-amber-400 font-mono">
                      {formatPrice(pkg.price, pkg.isPriceOnQuote)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigate('product-detail', pkg.id)}
                      className="w-full text-center text-xs font-semibold py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => addToCart(pkg, 1, true)}
                      className="w-full text-center text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg bg-[#E65100] hover:bg-[#D97706] text-white transition-colors cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= AI QUOTE PROMOTION HERO BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-[#081B2C] border border-slate-700/80 p-8 sm:p-12 text-white overflow-hidden shadow-2xl">
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Engineering Wizard</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Get an Instant Engineering System Proposal in 4 Easy Steps
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Answer a few simple questions about your premises (area size, camera points, fiber runs, or control room needs). Our surveillance AI architecture engine designs a custom equipment plan, storage retention calculation, and budgetary estimate.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('quote')}
                className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Start AI System Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('company-profile')}
                className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white px-4 py-3 rounded-xl border border-slate-700 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Corporate Vendor Qualification</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:block absolute right-8 bottom-0 top-0 w-1/3 opacity-30 pointer-events-none">
            <div className="h-full flex items-center justify-center">
              <HuanLogo size="xl" theme="dark" iconOnly={true} />
            </div>
          </div>

        </div>
      </section>

      {/* ================= VERIFIED REVIEWS & SOCIAL PROOF ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {averageRating} / 5.0 Rating
              </span>
              <span className="text-xs text-slate-500">
                (Based on {totalReviewsCount} verified clients)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Trusted by Pakistan's Leading Sectors
            </h2>
          </div>

          <button
            onClick={() => navigate('reviews')}
            className="text-xs font-bold uppercase tracking-wider text-[#0E3A5C] dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Read All Verified Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{rev.date}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{rev.authorName}</h4>
                  <p className="text-[11px] text-slate-500">{rev.companyOrRole}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{rev.city}</p>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 px-2 py-0.5 rounded font-medium">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
