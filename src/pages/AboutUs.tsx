import React from 'react';
import { 
  Shield, 
  Clock, 
  Globe, 
  Award, 
  CheckCircle2, 
  Users, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadCompanyProfileFile } from '../services/pdfService';
import HuanLogo from '../components/HuanLogo';

export const AboutUs: React.FC = () => {
  const { companyStats, navigate, showToast } = useApp();

  const handleDownloadPDF = () => {
    downloadCompanyProfileFile(companyStats);
    showToast('Official Corporate Company Profile downloaded successfully.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      
      {/* Header Banner */}
      <div className="bg-[#081926] border border-slate-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
            About HUAN Surveillance
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Protecting What Matters Most
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            HUAN Surveillance is a Pakistan-based security and surveillance solutions provider specializing in the design, supply, installation, and maintenance of advanced security systems.
          </p>
        </div>
        <div className="relative z-10 shrink-0">
          <HuanLogo size="xl" theme="dark" showTagline={true} />
        </div>
      </div>

      {/* Story & Core Capabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
            Our Background
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Engineering Security with Precision & Accountability
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            With over three years of industry experience and 90+ completed installations across Pakistan, we help businesses, institutions, industrial facilities, and residential clients enhance safety, monitor critical assets, and maintain operational security through reliable and modern surveillance technologies.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Our commitment is to deliver practical, scalable, and cost-effective security solutions tailored to the unique requirements of every client. From small businesses to large-scale industrial environments, we focus on quality workmanship, technical expertise, and long-term customer support.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 bg-[#0E3A5C] hover:bg-[#144d78] text-white text-xs font-semibold px-5 py-3 rounded-xl border border-blue-400/30 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-blue-300" />
              <span>Download Official Company Profile (PDF)</span>
            </button>
            <button
              onClick={() => navigate('quote')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0E3A5C] dark:text-blue-400 hover:underline cursor-pointer"
            >
              <span>Launch AI System Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#081827] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-6 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
            Key Highlights
          </h3>
          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white block">3+ Years Experience</strong>
                <span>Over 90+ successfully delivered projects across commercial, defense, and residential sectors.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white block">Nationwide Pakistan Coverage</strong>
                <span>Karachi corporate desks with turnkey engineering capabilities all across the country.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white block">Defense Zone Verified</strong>
                <span>Proven project delivery for CMES (Pakistan Navy) and high-security enterprise zones.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AboutUs;
