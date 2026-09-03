import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Camera, 
  Network, 
  LayoutGrid, 
  Cable, 
  ShieldCheck, 
  Wrench, 
  RefreshCw, 
  HelpCircle, 
  Send, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  HardDrive,
  CheckCircle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { ServiceCategory } from '../types';
import { generateAIQuoteRecommendation, GeneratedAIQuote } from '../services/geminiService';
import { generateQuotePDF } from '../services/pdfService';

export const QuoteWizard: React.FC = () => {
  const { submitQuoteLead, companyStats, navigate } = useApp();

  // Wizard Steps: 1 = Service Select, 2 = Dynamic Questions, 3 = AI System Generation, 4 = Review & Submit / Success
  const [step, setStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Step 1: Service Selection
  const [selectedService, setSelectedService] = useState<ServiceCategory>('cctv');
  const [customServiceText, setCustomServiceText] = useState<string>('');

  // Step 2: Dynamic Follow-up Answers
  const [propertyType, setPropertyType] = useState<string>('Commercial Office / Retail Store');
  const [city, setCity] = useState<string>('Karachi (24-36hr SLA)');
  const [estimatedAreaOrPoints, setEstimatedAreaOrPoints] = useState<string>('3,000 to 5,000 sq ft');
  const [cameraCountOrScale, setCameraCountOrScale] = useState<string>('8 to 16 Cameras');
  const [indoorOutdoorRequirement, setIndoorOutdoorRequirement] = useState<string>('Balanced (50% Indoor, 50% Outdoor)');
  const [budgetTier, setBudgetTier] = useState<'economy' | 'standard' | 'enterprise'>('standard');
  const [timeline, setTimeline] = useState<string>('Within 1 to 2 Weeks');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Step 3: Generated AI System Specification
  const [aiResult, setAiResult] = useState<GeneratedAIQuote | null>(null);

  // Step 4: Contact & Submission Info
  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [emailSelfCopy, setEmailSelfCopy] = useState<boolean>(true);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const servicesOptions: { id: ServiceCategory; title: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      id: 'cctv',
      title: 'CCTV Camera Installation',
      desc: '4K ColorVu night vision, smart AI human/vehicle detection, cash counter zoom.',
      icon: Camera
    },
    {
      id: 'fiber-optic',
      title: 'Fiber Optic Long-Range Backbone',
      desc: 'Single-mode optical fiber for sprawling factories, ports, campuses exceeding 100m limits.',
      icon: Network
    },
    {
      id: 'command-center',
      title: 'CCTV Command Center & Video Wall',
      desc: 'Centralized control room design, 55" ultra-narrow video walls, VMS matrix controllers.',
      icon: LayoutGrid
    },
    {
      id: 'network-cabling',
      title: 'Structured Network Cabling',
      desc: 'Cat6/Cat6A certified copper cabling, Fluke testing, server racks, and patch panels.',
      icon: Cable
    },
    {
      id: 'access-control',
      title: 'Biometric Access Control & Attendance',
      desc: 'Touchless facial recognition terminals, RFID smart cards, electromagnetic door locks.',
      icon: ShieldCheck
    },
    {
      id: 'amc-maintenance',
      title: 'Annual Maintenance Contract (AMC)',
      desc: 'Scheduled preventive health checks, lens cleaning, Karachi 24-36hr rapid breakdown repair.',
      icon: Wrench
    },
    {
      id: 'alarm-intrusion',
      title: 'Perimeter Intrusion Alarm Systems',
      desc: 'Beam detectors, vibration sensors, auto-dialer alarms for boundary protection.',
      icon: RefreshCw
    },
    {
      id: 'other',
      title: 'Other / Custom Security Requirement',
      desc: 'Custom security integration, multi-site WAN link, or complex industrial project.',
      icon: HelpCircle
    }
  ];

  const handleStep1Next = () => {
    setStep(2);
  };

  const handleStep2Next = async () => {
    setIsGenerating(true);
    setStep(3);

    const serviceTitle = servicesOptions.find(s => s.id === selectedService)?.title || 'Security Requirement';
    
    try {
      const result = await generateAIQuoteRecommendation({
        serviceCategory: selectedService,
        serviceCategoryLabel: selectedService === 'other' ? customServiceText : serviceTitle,
        propertyType,
        estimatedAreaOrPoints,
        cameraCountOrScale,
        indoorOutdoorRequirement,
        budgetTier,
        timeline,
        additionalNotes,
        city
      });
      setAiResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !email) {
      alert('Please fill in your name, contact phone, and email to receive the quotation.');
      return;
    }

    const leadId = submitQuoteLead({
      customerName,
      email,
      phone,
      city,
      address,
      serviceCategory: selectedService,
      propertyType,
      estimatedAreaOrPoints,
      cameraCountOrScale,
      budgetTier,
      indoorOutdoorRequirement,
      timeline,
      additionalNotes,
      aiRecommendation: aiResult ? {
        summary: aiResult.summary,
        suggestedHardware: aiResult.suggestedHardware,
        infrastructurePlan: aiResult.infrastructurePlan,
        recommendedTier: aiResult.recommendedTier,
        estimatedPriceRangePKR: aiResult.estimatedPriceRangePKR,
        specialNotes: aiResult.specialNotes
      } : undefined
    });

    setSubmittedLeadId(leadId);
    setStep(4);

    // Trigger celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleDownloadQuotationPDF = () => {
    if (!aiResult) return;
    const fakeLead = {
      id: submittedLeadId || 'HUAN-QT-ESTIMATE',
      createdAt: new Date().toISOString(),
      customerName: customerName || 'Valued Client',
      email: email || 'client@example.com',
      phone: phone || '+92 300 0000000',
      city,
      address,
      serviceCategory: selectedService,
      propertyType,
      estimatedAreaOrPoints,
      cameraCountOrScale,
      budgetTier,
      indoorOutdoorRequirement,
      timeline,
      additionalNotes,
      aiRecommendation: aiResult,
      status: 'new' as const
    };
    generateQuotePDF(fakeLead, companyStats);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Wizard Progress Bar */}
      <div className="bg-[#081827] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between text-xs font-mono mb-4 text-slate-400">
          <span className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Sparkles className="w-4 h-4" />
            AI-POWERED SYSTEM ARCHITECT
          </span>
          <span>STEP {step} OF 4</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {['Service Type', 'Site Details', 'AI Analysis', 'Submit & PDF'].map((label, idx) => {
            const stepNum = idx + 1;
            const isDone = step > stepNum;
            const isCurrent = step === stepNum;
            return (
              <div key={idx} className="space-y-1">
                <div className={`h-2 rounded-full transition-all ${
                  isDone ? 'bg-emerald-500' : isCurrent ? 'bg-[#E65100]' : 'bg-slate-800'
                }`} />
                <span className={`text-[10px] hidden sm:block font-medium truncate ${
                  isCurrent ? 'text-white font-bold' : 'text-slate-500'
                }`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= STEP 1: SERVICE SELECTION ================= */}
      {step === 1 && (
        <div className="bg-[#0A1D2D] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65100]">
              Step 1 — Project Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              What security or network system do you require?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Select the primary solution so our AI can configure the appropriate engineering questions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {servicesOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedService === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedService(opt.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0E3A5C] border-amber-400 text-white shadow-lg'
                      : 'bg-[#061523] border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{opt.title}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-end">
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-amber-400 bg-amber-400' : 'border-slate-600'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0E3A5C]" />}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedService === 'other' && (
            <div className="space-y-2 animate-in fade-in">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                Please describe what you are looking to secure or solve:
              </label>
              <textarea
                rows={3}
                placeholder="E.g., Solar power farm perimeter wireless link, ANPR automated barrier gate, etc."
                value={customServiceText}
                onChange={(e) => setCustomServiceText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          )}

          <div className="pt-4 flex items-center justify-between border-t border-slate-800">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Karachi guaranteed 24-36hr service resolution
            </span>
            <button
              onClick={handleStep1Next}
              className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow transition-colors cursor-pointer"
            >
              <span>Next: Site Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: DYNAMIC FOLLOW-UP QUESTIONS ================= */}
      {step === 2 && (
        <div className="bg-[#0A1D2D] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65100]">
              Step 2 — Technical Parameters
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Tell us about your premises and scale
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Our AI engine uses these inputs to calculate storage, camera coverage angles, and cabling requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            
            {/* Property Type */}
            <div>
              <label className="block font-bold text-slate-200 mb-2">
                Property / Facility Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
              >
                <option>Residential Villa / Home</option>
                <option>Retail Shop / Showroom / Pharmacy</option>
                <option>Commercial Corporate Office</option>
                <option>Industrial Factory / Spinning & Weaving Mill</option>
                <option>Warehouse / Logistics Godown</option>
                <option>Hospital / Medical Center</option>
                <option>Gated Housing Society / Farmhouse</option>
                <option>School / University Campus</option>
              </select>
            </div>

            {/* City / Service Area */}
            <div>
              <label className="block font-bold text-slate-200 mb-2">
                City / Location in Pakistan
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
              >
                <option>Karachi (Guaranteed 24–36hr SLA)</option>
                <option>Lahore (Nationwide Deployment)</option>
                <option>Islamabad / Rawalpindi</option>
                <option>Faisalabad</option>
                <option>Hub Industrial Area</option>
                <option>Multan</option>
                <option>Other Location in Pakistan</option>
              </select>
            </div>

            {/* Scale / Camera Count */}
            <div>
              <label className="block font-bold text-slate-200 mb-2">
                {selectedService === 'fiber-optic' 
                  ? 'Estimated Fiber Cable Run Distance' 
                  : selectedService === 'command-center' 
                  ? 'Number of Video Wall Displays Needed' 
                  : 'Approximate Camera / Point Count'}
              </label>
              <select
                value={cameraCountOrScale}
                onChange={(e) => setCameraCountOrScale(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
              >
                {selectedService === 'fiber-optic' ? (
                  <>
                    <option>500m to 1km (Single Factory Shed to Gate)</option>
                    <option>1km to 3km (Industrial Compound)</option>
                    <option>3km to 8km (Multi-Building Campus / Port)</option>
                    <option>Above 10km (Expansive Perimeter)</option>
                  </>
                ) : selectedService === 'command-center' ? (
                  <>
                    <option>Single Large 75" / 85" 4K Commercial Screen</option>
                    <option>2x2 Matrix (4x 55" Ultra-Narrow Bezel Displays)</option>
                    <option>3x2 Matrix (6x 55" Command Video Wall)</option>
                    <option>Custom Multi-Console Control Room</option>
                  </>
                ) : (
                  <>
                    <option>4 Cameras (Smart Home / Small Shop)</option>
                    <option>8 Cameras (Medium Retail Store / Office)</option>
                    <option>16 Cameras (Commercial Building / Warehouse)</option>
                    <option>32 Cameras (Large Industrial Facility)</option>
                    <option>64+ Cameras (Enterprise Multi-Building)</option>
                  </>
                )}
              </select>
            </div>

            {/* Estimated Area / Footprint */}
            <div>
              <label className="block font-bold text-slate-200 mb-2">
                Estimated Area Size / Perimeter Length
              </label>
              <select
                value={estimatedAreaOrPoints}
                onChange={(e) => setEstimatedAreaOrPoints(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
              >
                <option>Up to 2,000 sq ft (Compact)</option>
                <option>3,000 to 8,000 sq ft (Medium Floor)</option>
                <option>10,000 to 30,000 sq ft (Warehouse / Multi-Story)</option>
                <option>1 Acre to 5 Acres (Industrial Compound)</option>
                <option>10+ Acres (Sprawling Perimeter)</option>
              </select>
            </div>

            {/* Indoor / Outdoor Split */}
            <div>
              <label className="block font-bold text-slate-200 mb-2">
                Environment Coverage
              </label>
              <select
                value={indoorOutdoorRequirement}
                onChange={(e) => setIndoorOutdoorRequirement(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
              >
                <option>100% Indoor (Ceiling Domes)</option>
                <option>Balanced (50% Indoor Domes, 50% Outdoor Weatherproof Bullets)</option>
                <option>Mainly Outdoor Perimeter (Long-Range IR & PTZ)</option>
                <option>Hazardous / Harsh Dust & Heat Environment</option>
              </select>
            </div>

            {/* Budget & Quality Tier */}
            <div>
              <label className="block font-bold text-slate-200 mb-2">
                Preferred Specification Tier
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'economy', label: 'Economy', sub: 'Standard HD' },
                  { id: 'standard', label: 'Pro Grade', sub: '4K ColorVu' },
                  { id: 'enterprise', label: 'Enterprise', sub: 'Fiber & AI' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setBudgetTier(tier.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      budgetTier === tier.id
                        ? 'bg-[#0E3A5C] border-amber-400 text-white'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-xs block">{tier.label}</span>
                    <span className="text-[10px] opacity-75">{tier.sub}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Additional Specific Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2">
              Any special requirements or existing infrastructure? (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="E.g., Need cash register zoom on 2 tills, cash desk audio recording, existing Cat6 cabling in place, or standby loaner unit requirement."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-800">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleStep2Next}
              className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Generate AI System Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: AI SYSTEM RECOMMENDATION ================= */}
      {step === 3 && (
        <div className="bg-[#0A1D2D] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in">
          
          {isGenerating ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center animate-spin">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Synthesizing Surveillance Architecture...</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Computing optical fiber loss, camera focal distances, NVR H.265+ storage days, and bill of materials for {propertyType} in {city}.
              </p>
            </div>
          ) : aiResult ? (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    AI Architectural Specification Ready
                  </span>
                  <h2 className="text-2xl font-black text-white mt-1">
                    {aiResult.recommendedTier}
                  </h2>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-slate-400 block font-mono">Estimated Budget Range:</span>
                  <span className="text-xl font-black text-amber-400 font-mono">
                    {aiResult.estimatedPriceRangePKR}
                  </span>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="p-4 bg-[#081827] rounded-2xl border border-slate-700/80 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                  System Architecture Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {aiResult.summary}
                </p>
              </div>

              {/* Hardware Bill of Materials */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Recommended Bill of Materials & Equipment
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {aiResult.suggestedHardware.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded bg-[#0E3A5C] text-amber-300 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                        0{idx + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure Plan & SLA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
                    <Cable className="w-4 h-4 text-blue-400" />
                    Cabling & Routing Plan:
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {aiResult.infrastructurePlan}
                  </p>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Service Guarantee & Compliance:
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {aiResult.specialNotes}
                  </p>
                </div>
              </div>

              {/* Step 4 Form Input for Customer Submission */}
              <form onSubmit={handleSubmitQuote} className="pt-6 border-t border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Step 4 — Finalize Quotation & Lock Your Priority Survey
                </h4>
                <p className="text-xs text-slate-300">
                  Enter your details to receive an official PDF copy and have our engineering team reach out to schedule an on-site survey.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Tariq Mehmood"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com.pk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300 pt-2">
                  <input
                    type="checkbox"
                    id="emailSelf"
                    checked={emailSelfCopy}
                    onChange={(e) => setEmailSelfCopy(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <label htmlFor="emailSelf" className="cursor-pointer">
                    Email a copy of this full technical recommendation and bill of materials to my address.
                  </label>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    ← Edit Site Parameters
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleDownloadQuotationPDF}
                      className="inline-flex items-center gap-2 bg-[#0E3A5C] hover:bg-[#144b75] text-white text-xs font-semibold px-4 py-3 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                      <span>Download PDF Summary</span>
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit to HUAN Engineering Team</span>
                    </button>
                  </div>
                </div>
              </form>

            </div>
          ) : null}

        </div>
      )}

      {/* ================= STEP 4: SUCCESS CONFIRMATION ================= */}
      {step === 4 && (
        <div className="bg-[#0A1D2D] border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              Quotation Request Logged Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Thank You, {customerName}!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Your reference ID is <strong className="text-amber-400 font-mono">{submittedLeadId}</strong>. Our senior security engineer will review your site specifications and contact you at <strong>{phone}</strong> within 2 hours.
            </p>
          </div>

          {/* Action Box */}
          <div className="p-6 bg-[#081827] rounded-2xl border border-slate-800 max-w-md mx-auto space-y-4 text-left text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Reference:</span>
              <span className="font-mono font-bold text-amber-400">{submittedLeadId}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Service:</span>
              <span className="text-white font-medium capitalize">{selectedService.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Karachi Resolution SLA:</span>
              <span className="text-emerald-400 font-semibold">24–36 Hours Guaranteed</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Status:</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold font-mono">
                Assigned to Engineering Lead
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleDownloadQuotationPDF}
              className="inline-flex items-center gap-2 bg-[#0E3A5C] hover:bg-[#134972] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Official Quotation PDF</span>
            </button>

            <button
              onClick={() => navigate('home')}
              className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
            >
              <span>Return to Homepage</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default QuoteWizard;
