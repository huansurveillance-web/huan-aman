import React from 'react';
import { 
  ShieldCheck, 
  Download, 
  Building2, 
  Clock, 
  CheckCircle, 
  Globe, 
  Award, 
  Briefcase, 
  Users, 
  ArrowRight,
  Shield,
  Eye,
  Camera,
  Server,
  Layers,
  Wrench,
  CheckCircle2,
  FileText,
  Phone,
  Mail,
  QrCode
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadCompanyProfileFile } from '../services/pdfService';
import HuanLogo from '../components/HuanLogo';

export const CompanyProfile: React.FC = () => {
  const { companyStats, navigate, showToast } = useApp();

  const handleDownloadPDF = () => {
    downloadCompanyProfileFile(companyStats);
    showToast('Official Corporate Company Profile downloaded successfully.');
  };

  const sectors = [
    'Educational Institutions',
    'Industrial Facilities',
    'Manufacturing Plants',
    'Corporate Offices',
    'Commercial Buildings',
    'Retail Stores & Malls',
    'Warehouses & Logistics Centers',
    'Healthcare Facilities',
    'Residential Communities',
    'Government Organizations',
    'Semi-Government Environments',
    'Logistics & Distribution Hubs'
  ];

  const workSteps = [
    {
      num: 1,
      title: 'Requirement Assessment',
      desc: "Comprehensive structural analysis of the client's explicit security requirements, baseline operational hazards, and long-term strategic safety objectives."
    },
    {
      num: 2,
      title: 'Site Survey',
      desc: 'Conducting microscopic on-site layout inspections, signal testing, wireless line-of-sight analysis, and critical technical evaluations.'
    },
    {
      num: 3,
      title: 'Solution Design',
      desc: 'Developing comprehensive blueprint layouts, bandwidth allocation mappings, network schematics, and customized system architectures.'
    },
    {
      num: 4,
      title: 'Installation & Deployment',
      desc: 'Professional, clean physical deployment, structured low-voltage cabling, equipment anchoring, and system configuration by senior technicians.'
    },
    {
      num: 5,
      title: 'Testing & Commissioning',
      desc: 'Rigorous multi-point testing, failover analysis, camera angle tuning, dark-environment calibration, and comprehensive system optimization.'
    },
    {
      num: 6,
      title: 'Ongoing Support',
      desc: 'Providing structured routine maintenance, emergency on-site troubleshooting, software firmware upgrades, and immediate technical assistance.'
    }
  ];

  const coreValues = [
    {
      title: 'Integrity',
      desc: 'We conduct our business with honesty, transparency, and strict professionalism in every engagement.'
    },
    {
      title: 'Reliability',
      desc: 'We deliver dependable security solutions that our clients can trust to operate flawlessly when it matters most.'
    },
    {
      title: 'Quality',
      desc: 'We maintain high standards in every project, from the initial site consultation to professional installation and technical support.'
    },
    {
      title: 'Customer Commitment',
      desc: "Our clients' security needs remain at the absolute center of everything we do, ensuring customized, exact deployments."
    },
    {
      title: 'Innovation',
      desc: 'We continuously adopt modern, future-ready technologies to provide the most effective security systems available in the industry.'
    }
  ];

  const allServices = [
    {
      title: 'CCTV & Smart Surveillance',
      desc: 'HD CCTV, IP Camera Systems, NVR/DVR, high-resolution and modern smart cameras with AI-based human & vehicle detection, motion detection, intrusion detection, line-crossing and advanced video analytics, remote monitoring and centralized video management.'
    },
    {
      title: 'Long-Range & Fiber CCTV Solutions',
      desc: 'Fiber-based surveillance infrastructure for factories, warehouses, ports, farms, estates, campuses and long perimeters. Single-mode/multi-mode fiber, media converters, splicing, testing and redundant fiber paths for reliable long-distance camera connectivity.'
    },
    {
      title: 'Control Rooms & Command Centers',
      desc: 'Complete CCTV control room and command center solutions including VMS, monitoring workstations, large displays, multi-monitor setups, video walls, centralized monitoring, network redundancy and 24/7 surveillance infrastructure.'
    },
    {
      title: 'Access Control & Biometric Systems',
      desc: 'RFID/card access, fingerprint and facial-recognition systems, biometric attendance, smart door controllers, electromagnetic locks, exit buttons and centralized access management.'
    },
    {
      title: 'Door Phone & Intercom Systems',
      desc: 'Audio, Video & IP Intercom solutions, video door phones, indoor monitors, outdoor panels, master stations and multi-point communication systems for residential, commercial and industrial facilities.'
    },
    {
      title: 'Network & Structured Cabling',
      desc: 'Complete Cat6/Cat6A and structured cabling infrastructure for CCTV, computers, servers and communication systems, including patch panels, PoE/managed switches, cable management, testing and organized rack cabling.'
    },
    {
      title: 'Server Room & Rack Infrastructure',
      desc: 'Professional server room and network rack setup including server racks, wall-mount racks, patch panels, switches, PDU, UPS integration, fiber distribution, cable management and equipment organization.'
    },
    {
      title: 'Fiber Optic Networking',
      desc: 'Fiber backbone design, installation, termination, splicing, testing and distribution for high-bandwidth building, campus and multi-site networks.'
    },
    {
      title: 'PABX & IP-PBX Telephone Systems',
      desc: 'Business telephone infrastructure including PABX/IP-PBX, IP phones, extensions, internal calling, reception systems and centralized telephone management.'
    },
    {
      title: 'Network & Wireless Infrastructure',
      desc: 'Routers, managed/PoE switches, enterprise Wi-Fi, network infrastructure and connectivity solutions designed to support security and business operations.'
    },
    {
      title: 'Security System Integration & Maintenance',
      desc: 'Integration of CCTV, access control, biometric, intercom, networking, servers and communication systems, supported by preventive maintenance, troubleshooting, upgrades and technical support.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      
      {/* Executive Hero Banner matching PDF Cover */}
      <div className="bg-[#081926] border border-slate-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
          
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#0E3A5C] text-blue-200 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-blue-400/30">
              <ShieldCheck className="w-4 h-4 text-blue-300" />
              <span>Official Corporate Dossier & Company Profile</span>
            </div>

            <div className="pt-2">
              <HuanLogo size="xl" theme="dark" showTagline={true} />
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-2">
              Corporate Company Profile
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              HUAN Surveillance is a Pakistan-based security and surveillance solutions provider specializing in the design, supply, installation, and maintenance of advanced security systems across Pakistan.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2.5 bg-[#0E3A5C] hover:bg-[#144d78] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl border border-blue-400/30 shadow-xl transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Download className="w-4 h-4 text-blue-300" />
                <span>Download Official 10-Page Profile (PDF)</span>
              </button>

              <button
                onClick={() => navigate('contact')}
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-white text-xs font-semibold px-5 py-3.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                <span>Request Site Survey / RFP</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Quick Highlight Box */}
          <div className="w-full lg:w-84 bg-[#05111B] p-6 rounded-2xl border border-slate-700/80 space-y-4 shrink-0 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Corporate Credentials</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Industry Experience:</span>
                <span className="font-bold text-white font-mono">3+ Years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Completed Projects:</span>
                <span className="font-bold text-blue-400 font-mono">90+ Sites</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Service Coverage:</span>
                <span className="font-medium text-emerald-400">Nationwide Pakistan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Karachi SLA:</span>
                <span className="font-bold text-amber-400">24–36hr Resolution</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Notable Defense Client:</span>
                <span className="font-bold text-slate-200">CMES (Pakistan Navy)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
              Direct Desk: <a href="tel:+923443733996" className="text-blue-300 font-mono hover:underline">+92 344 3733996</a>
            </div>
          </div>

        </div>
      </div>

      {/* Key Metrics from Profile Page 8 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-6 bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Experience</span>
          <div className="text-3xl sm:text-4xl font-black text-[#0E3A5C] dark:text-white font-mono mt-1">
            3<span className="text-blue-500">+</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Years Industry Experience</span>
        </div>

        <div className="p-6 bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Completed Projects</span>
          <div className="text-3xl sm:text-4xl font-black text-[#0E3A5C] dark:text-white font-mono mt-1">
            90<span className="text-blue-500">+</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Successfully Delivered</span>
        </div>

        <div className="p-6 bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Sectors Served</span>
          <div className="text-3xl sm:text-4xl font-black text-[#0E3A5C] dark:text-white font-mono mt-1">
            12<span className="text-blue-500">+</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Industry Domains</span>
        </div>

        <div className="p-6 bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Coverage</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-2">
            100%
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">All Over Pakistan</span>
        </div>
      </div>

      {/* Vision & Mission (PDF Page 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-50 dark:bg-[#081926] p-8 rounded-2xl border-t-4 border-t-[#0E3A5C] border-x border-b border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#0E3A5C] dark:text-blue-300 font-bold text-lg">
            <Eye className="w-5 h-5" />
            <h3>Our Vision</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To become one of Pakistan's most trusted and innovative security solutions providers by delivering advanced surveillance technologies, exceptional service quality, and long-term value to our clients.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-[#081926] p-8 rounded-2xl border-t-4 border-t-[#0E3A5C] border-x border-b border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#0E3A5C] dark:text-blue-300 font-bold text-lg">
            <Shield className="w-5 h-5" />
            <h3>Our Mission</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Our mission is to provide reliable, efficient, and technologically advanced security solutions that help businesses, institutions, and communities safeguard their people, assets, and operations. We strive to build lasting relationships through professionalism and integrity.
          </p>
        </div>
      </div>

      {/* Notable Client Feature & Quality Commitment (PDF Page 9) */}
      <div className="bg-[#05111B] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
            Notable Experience & Proven Domain Trust
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Selected Client Feature: CMES (Pakistan Navy)
          </h2>
          <div className="mt-4 p-5 rounded-xl bg-[#081926] border border-blue-500/30">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              "Our successful delivery of professional security configurations within highly sensitive defense zones demonstrates our elite engineering capabilities, security compliance, and organizational trustworthiness."
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Health, Safety & Quality Commitment</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We prioritize zero-harm safety policies, technical quality compliance, and rigorous engineering standards throughout every phase of a project lifecycle.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our site deployments rigorously adhere to international structural and low-voltage standards. This disciplined layout methodology ensures that all data pipelines and power loops are safe, fully shielded, properly insulated, and optimized for long-term structural durability. We work diligently to avoid any disruption to your company's active working environment during deployment.
          </p>
        </div>
      </div>

      {/* Standardized 6-Step Engineering Work Process (PDF Page 7) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0E3A5C] dark:text-blue-400">
            Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Our Standardized 6-Step Engineering Process
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            To ensure complete quality alignment and structural reliability, we execute every deployment according to a standardized methodology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workSteps.map((step) => (
            <div 
              key={step.num}
              className="bg-white dark:bg-[#081827] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-[#0E3A5C] dark:hover:border-blue-500 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0E3A5C] text-white flex items-center justify-center font-bold text-sm mb-4 font-mono shadow-sm">
                {step.num}
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Services (PDF Pages 4 & 5) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0E3A5C] dark:text-blue-400">
            Comprehensive Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Our Services & Engineering Disciplines
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            We provide complete security, surveillance, networking, communication, and infrastructure solutions — from system design and equipment supply to professional installation, configuration, integration, testing, and maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((svc, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#081827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
            >
              <div className="flex items-center gap-2 text-[#0E3A5C] dark:text-blue-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-500" />
                <h4>{svc.title}</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Keep Track of Sectors (PDF Page 6) */}
      <div className="bg-slate-50 dark:bg-[#081827] p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0E3A5C] dark:text-blue-400">
            Versatile Client Landscape
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Keep Track of Sectors
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            HUAN Surveillance engineers reliable security configurations across a versatile client landscape throughout Pakistan. Our architectures adapt perfectly to sector-specific operational rules.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#05111B] border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong className="text-slate-900 dark:text-white block mb-1">Custom-Tailored Implementations</strong>
          We recognize that an industrial manufacturing plant requires an entirely different perimeter defense architecture compared to a commercial corporate office or an educational campus. Our systems are engineered specifically to map to your daily operational flows without causing systemic friction or security blindspots.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {sectors.map((sec, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-slate-200">
              <span className="w-2 h-2 rounded bg-[#0E3A5C] dark:bg-blue-400 shrink-0"></span>
              <span>{sec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values (PDF Page 3) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0E3A5C] dark:text-blue-400">
            Guiding Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreValues.map((v, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-[#081827] border-l-4 border-l-[#0E3A5C] border-t border-r border-b border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{v.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Get In Touch & Corporate Contact (PDF Page 10) */}
      <div className="bg-[#081926] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-lg">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
              Direct Contact & Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Get In Touch
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Contact our engineering and consultation desk today to schedule a comprehensive structural risk assessment or a detailed technical site survey.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Phone / WhatsApp: <strong className="font-mono text-white">+92 344 3733996</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Email: <strong className="font-mono text-white">info@huan-surveillance.com</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Website: <strong className="font-mono text-white">www.huan-surveillance.com</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Core Coverage: <strong className="text-white">Karachi & All Over Pakistan</strong></span>
              </div>
            </div>
          </div>

          <div className="bg-[#05111B] p-6 rounded-2xl border border-slate-700/80 text-center space-y-4 w-full md:w-72 shrink-0">
            <HuanLogo size="sm" theme="dark" showText={true} />
            <div className="p-2 bg-white rounded-xl mx-auto w-36 h-36 flex flex-col items-center justify-center shadow-inner">
              <img 
                src="/whatsapp-qr.png" 
                alt="HUAN Surveillance Official WhatsApp QR Code" 
                className="w-32 h-32 object-contain" 
              />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              WhatsApp Business Desk<br/>+92 344 3733996
            </p>
            <a 
              href="https://wa.me/923443733996" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors"
            >
              <span>Message on WhatsApp</span>
            </a>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-400 space-y-1">
          <p className="italic text-slate-300 font-serif text-sm">"Protecting What Matters Most"</p>
          <p>HUAN Surveillance — Corporate Head Office / Service Desks Pakistan</p>
          <p>© 2026 HUAN Surveillance. All Rights Reserved.</p>
        </div>
      </div>

    </div>
  );
};

export default CompanyProfile;
