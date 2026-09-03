import React from 'react';
import { 
  Network, 
  LayoutGrid, 
  Camera, 
  Cable, 
  ShieldCheck, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  FileText,
  Shield,
  Zap,
  Phone,
  Cpu,
  Headphones,
  Radio,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadCompanyProfileFile } from '../services/pdfService';

export const Services: React.FC = () => {
  const { services, navigate, companyStats, showToast } = useApp();

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Camera,
    Network,
    LayoutGrid,
    ShieldCheck,
    Phone,
    Cable,
    Cpu,
    Zap,
    Headphones,
    Radio,
    Wrench,
    Users
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      
      {/* Page Header Banner */}
      <div className="bg-[#081827] border border-slate-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65100]">
            Engineering & Deployment Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Specialized Surveillance & Security Infrastructure
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            From single-mode optical fiber trunk lines spanning multiple kilometers to centralized 24/7 video wall command centers, HUAN Surveillance delivers end-to-end engineering, Fluke-certified testing, and guaranteed Karachi 24–36hr response SLA.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('quote')}
              className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow cursor-pointer transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Get a Customized Project Quote</span>
            </button>

            <button
              onClick={() => {
                downloadCompanyProfileFile(companyStats);
                showToast('Official Corporate Company Profile downloaded successfully.');
              }}
              className="inline-flex items-center gap-2 bg-[#0E3A5C] hover:bg-[#144c77] text-white text-xs font-semibold px-4 py-3 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Download Technical Profile (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Services List with Detailed Deep Dives */}
      <div className="space-y-12">
        {services.map((service, idx) => {
          const IconComponent = iconMap[service.icon] || Camera;
          const isEven = idx % 2 === 0;

          return (
            <div
              key={service.id}
              id={service.id}
              className="bg-white dark:bg-[#081827] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm hover:border-amber-500/50 transition-all space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                
                {/* Left: Icon & Service Title */}
                <div className="space-y-4 max-w-3xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#0E3A5C] text-amber-400 flex items-center justify-center shadow">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#E65100] font-bold">
                        Specialized Service 0{idx + 1}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                    {service.fullDesc}
                  </p>

                  {/* Key Highlights Checklist */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-amber-400 font-mono">
                      Key Technical Deliverables:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                      {service.keyPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ideal For & SLA Note */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 font-medium block">Ideal For:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{service.idealFor}</span>
                    </div>

                    <div className="p-3 bg-amber-500/5 dark:bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-600 dark:text-amber-300">
                      <span className="font-medium block flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Service Resolution SLA:
                      </span>
                      <span className="font-semibold">{service.slaNote}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Quick Action Card */}
                <div className="w-full lg:w-72 bg-slate-50 dark:bg-[#0A1F30] p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-4 shrink-0 self-center lg:self-start">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-mono text-slate-500">Need this service?</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Request Technical Survey
                    </h4>
                  </div>

                  <button
                    onClick={() => navigate('quote')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl shadow transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Get AI Quote</span>
                  </button>

                  <button
                    onClick={() => navigate('contact')}
                    className="w-full text-center text-xs font-semibold py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Speak to Engineer
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Services;
