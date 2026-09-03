import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  FileText, 
  ArrowUpRight, 
  CheckCircle,
  Headphones,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import HuanLogo from './HuanLogo';
import { downloadCompanyProfileFile } from '../services/pdfService';

interface FooterProps {
  onOpenCalculator?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCalculator }) => {
  const { navigate, companyStats, showToast } = useApp();

  const handleDownloadPDF = () => {
    downloadCompanyProfileFile(companyStats);
    showToast('Official Corporate Company Profile downloaded successfully.');
  };

  return (
    <footer className="bg-[#05111B] text-slate-300 border-t border-slate-800 text-sm">
      {/* Upper High-Impact Corporate Assurance Grid */}
      <div className="border-b border-slate-800/80 bg-[#081827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Guarantee 1: Karachi 24-36hr SLA */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Karachi 24–36hr Resolution</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Guaranteed emergency on-site technician response & fault rectification anywhere in Karachi within 24 to 36 hours.
                </p>
              </div>
            </div>

            {/* Guarantee 2: Nationwide Footprint */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Nationwide Deployment</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Turnkey CCTV installations, optical fiber splicing, and command centers in Karachi, Lahore, Islamabad, Hub & beyond.
                </p>
              </div>
            </div>

            {/* Guarantee 3: Tax Registered & Verified */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">FBR Registered Business</h4>
                <p className="text-xs text-slate-400 mt-1">
                  NTN: <strong className="text-slate-200">{companyStats.ntnNumber.split(' ')[0]}</strong>. Fully compliant tax invoicing for corporate procurement & audits.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand & Profile Download (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer" onClick={() => navigate('home')}>
              <HuanLogo size="md" theme="dark" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              HUAN Surveillance delivers commercial & industrial CCTV security systems, long-range single-mode fiber optic cabling, multi-screen command center design, and rapid maintenance across Pakistan.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2 bg-[#0E3A5C] hover:bg-[#124974] text-white text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Download Company Profile (PDF)</span>
              </button>

              <button
                onClick={() => navigate('company-profile')}
                className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white underline cursor-pointer"
              >
                <span>View Online Profile</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            {/* Tax & FBR Trust Badge */}
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] text-slate-300 max-w-sm space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Verified Taxpayer & Registered Vendor</span>
              </div>
              <p className="text-slate-400 font-mono">
                NTN: {companyStats.ntnNumber} | STRN: {companyStats.salesTaxNumber}
              </p>
            </div>
          </div>

          {/* Column 2: Key Services */}
          <div>
            <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Our Services
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('services')} className="hover:text-amber-400 transition-colors text-left">
                  CCTV & Smart Surveillance
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-amber-400 transition-colors text-left">
                  Long-Range & Fiber CCTV
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-amber-400 transition-colors text-left">
                  Control Rooms & Video Walls
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-amber-400 transition-colors text-left">
                  Access Control & Biometrics
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-amber-400 transition-colors text-left">
                  Network & Structured Cabling
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-amber-400 transition-colors text-left">
                  PABX & IP-PBX Telephony
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('products')} className="hover:text-amber-400 transition-colors text-left">
                  Products & Ready Packages
                </button>
              </li>
              <li>
                <button onClick={() => navigate('quote')} className="hover:text-amber-400 transition-colors text-left flex items-center gap-1 text-amber-400 font-medium">
                  <span>AI Quote Assistant</span>
                </button>
              </li>
              {onOpenCalculator && (
                <li>
                  <button onClick={onOpenCalculator} className="hover:text-amber-400 transition-colors text-left text-slate-300">
                    CCTV Storage Calculator
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => navigate('reviews')} className="hover:text-amber-400 transition-colors text-left">
                  Verified Client Reviews
                </button>
              </li>
              <li>
                <button onClick={() => navigate('company-profile')} className="hover:text-amber-400 transition-colors text-left">
                  Corporate Profile & Compliance
                </button>
              </li>
              <li>
                <button onClick={() => navigate('blog')} className="hover:text-amber-400 transition-colors text-left">
                  Technical Security Blog
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-amber-400 transition-colors text-left">
                  About HUAN Surveillance
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-amber-400 transition-colors text-left">
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Contact & Hotline
            </h5>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{companyStats.companyAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${companyStats.primaryPhone}`} className="hover:text-white font-medium">
                  {companyStats.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${companyStats.secondaryPhone}`} className="hover:text-white">
                  {companyStats.secondaryPhone} (Karachi Desk)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${companyStats.email}`} className="hover:text-white">
                  {companyStats.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`https://${companyStats.website}`} target="_blank" rel="noreferrer" className="hover:text-white font-mono">
                  {companyStats.website}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & SLA Strip */}
      <div className="bg-[#030B12] border-t border-slate-800/80 py-4 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} HUAN Surveillance. All rights reserved. Registered Security Systems Integrator.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Karachi 24–36hr SLA Contract Guaranteed</span>
            <span>•</span>
            <button onClick={() => navigate('company-profile')} className="hover:text-slate-200 underline">
              FBR NTN Verified
            </button>
            <span>•</span>
            <button onClick={() => navigate('admin')} className="hover:text-slate-200">
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
