import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Send, 
  ShieldCheck, 
  Headphones,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Contact: React.FC = () => {
  const { companyStats, submitQuoteLead, showToast } = useApp();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>('General Inquiry');
  const [message, setMessage] = useState<string>('');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const cleanPhone = companyStats.whatsappNumber.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert('Please fill in your name, phone number, and message.');
      return;
    }

    // Also push to leads database
    submitQuoteLead({
      customerName: name,
      email: email || 'not-provided@client.pk',
      phone,
      city: 'Karachi / Direct Inquiry',
      serviceCategory: isEmergency ? 'amc-maintenance' : 'cctv',
      propertyType: 'Direct Contact Form',
      estimatedAreaOrPoints: 'Direct Inquiry',
      cameraCountOrScale: subject,
      budgetTier: 'standard',
      indoorOutdoorRequirement: 'Standard',
      timeline: isEmergency ? 'URGENT 24-36hr SLA' : 'Standard',
      additionalNotes: `Subject: ${subject}\nEmergency Request: ${isEmergency ? 'YES (Karachi SLA)' : 'NO'}\nMessage: ${message}`
    });

    setSubmitted(true);
    showToast('Your message has been received by HUAN Support Desk.');
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(`Hi HUAN Surveillance, I would like to contact your team regarding: ${subject || 'security inquiry'}.`);
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-[#081827] border border-slate-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65100]">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Contact HUAN Surveillance Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Need an on-site survey in Karachi or nationwide? Have an emergency repair request? Speak directly with our surveillance systems engineering team.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Contact Info & Emergency SLA (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Karachi Emergency SLA Card */}
          <div className="p-6 bg-gradient-to-br from-[#0E3A5C] to-[#092236] rounded-3xl border border-slate-700 text-white space-y-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Karachi 24–36hr SLA Desk</h3>
                <p className="text-[11px] text-amber-300">Rapid Maintenance & Repair Hotline</p>
              </div>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              If your existing cameras, NVR, or fiber connection have failed within Karachi, tick the "Emergency 24–36hr SLA" box on the form for expedited dispatch.
            </p>
            <div className="text-xs font-mono font-bold text-amber-400">
              Direct Emergency Line: {companyStats.primaryPhone}
            </div>
          </div>

          {/* Office & Direct Contact Details */}
          <div className="p-6 bg-white dark:bg-[#081827] rounded-3xl border border-slate-200 dark:border-slate-800 space-y-5 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Official Head Office
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-medium">Physical Address:</strong>
                  <span>{companyStats.companyAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-medium">Primary Helpline:</strong>
                  <a href={`tel:${companyStats.primaryPhone}`} className="hover:text-amber-500 font-semibold font-mono">
                    {companyStats.primaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Headphones className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-medium">Karachi Office Desk:</strong>
                  <a href={`tel:${companyStats.secondaryPhone}`} className="hover:text-amber-500 font-mono">
                    {companyStats.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-medium">Corporate Email:</strong>
                  <a href={`mailto:${companyStats.email}`} className="hover:text-amber-500">
                    {companyStats.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-medium">Official Portal:</strong>
                  <a href={`https://${companyStats.website}`} target="_blank" rel="noreferrer" className="hover:text-amber-500 font-mono">
                    {companyStats.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action & QR Code */}
            <div className="pt-2 space-y-3">
              <button
                onClick={handleWhatsAppClick}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </button>

              <div className="p-4 bg-slate-50 dark:bg-[#061422] rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Scan to Chat Directly
                </p>
                <div className="p-2 bg-white rounded-xl mx-auto w-32 h-32 flex items-center justify-center shadow-inner">
                  <img 
                    src="/whatsapp-qr.png" 
                    alt="WhatsApp Business QR Code" 
                    className="w-28 h-28 object-contain" 
                  />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  +92 344 3733996
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Direct Inquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#081827] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6">
          
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Dispatched</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Thank you for contacting HUAN Surveillance. Our engineering coordinator has received your message and will call you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-[#0E3A5C] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65100]">
                  Direct Inquiry Form
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Send a Direct Message
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Kamran Shah"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject / Service Interest
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  >
                    <option>General CCTV Inquiry</option>
                    <option>Fiber Optic Backbone Project</option>
                    <option>CCTV Command Center / Video Wall</option>
                    <option>Annual Maintenance Contract (AMC)</option>
                    <option>Urgent Service / Repair Request</option>
                    <option>Corporate Tender / Vendor Registration</option>
                  </select>
                </div>
              </div>

              {/* Emergency SLA Checkbox */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3">
                <input
                  type="checkbox"
                  id="emergencySLA"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="accent-[#E65100] w-4 h-4 rounded mt-0.5 cursor-pointer"
                />
                <label htmlFor="emergencySLA" className="cursor-pointer text-xs text-slate-800 dark:text-slate-200">
                  <strong className="text-amber-500 block">This is an urgent Karachi breakdown (24–36hr SLA required)</strong>
                  <span>Prioritizes this ticket for immediate on-site technical van dispatch.</span>
                </label>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message / Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your site location, camera count, fiber distance, or issue..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry to HUAN</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};

export default Contact;
