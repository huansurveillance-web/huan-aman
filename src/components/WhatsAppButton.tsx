import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Clock, QrCode } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WhatsAppButton: React.FC = () => {
  const { companyStats, navigate } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'qr'>('chat');
  const [userMessage, setUserMessage] = useState('');

  const cleanPhone = companyStats.whatsappNumber.replace(/[^0-9]/g, '');

  const quickQuestions = [
    "I need a quote for CCTV installation",
    "Inquiring about Fiber Optic cabling",
    "Karachi 24-36hr service repair request",
    "Command center & video wall design inquiry"
  ];

  const handleSend = (textToSend?: string) => {
    const message = textToSend || userMessage || "Hello HUAN Surveillance, I would like to inquire about your security systems.";
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setUserMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Interactive WhatsApp Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#0B1E2E] text-slate-100 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#11466A] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow font-bold">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">HUAN Support Desk</h4>
                <p className="text-[11px] text-emerald-300 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online | Karachi 24–36hr SLA
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white p-1 rounded"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex border-b border-slate-800 bg-[#081724]">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'chat' 
                  ? 'text-emerald-400 border-b-2 border-emerald-500 bg-[#0B1E2E]' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex-1 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'qr' 
                  ? 'text-emerald-400 border-b-2 border-emerald-500 bg-[#0B1E2E]' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan QR Code</span>
            </button>
          </div>

          {/* Chat Body */}
          {activeTab === 'chat' ? (
            <div className="p-4 bg-[#081724] space-y-3 text-xs">
              <div className="p-3 bg-[#11466A]/40 border border-slate-700 rounded-xl rounded-tl-none text-slate-200 space-y-1.5">
                <p className="font-semibold text-amber-400">Assalam-o-Alaikum! Welcome to HUAN Surveillance.</p>
                <p className="text-slate-300">
                  How can our engineering team assist you today? Choose a quick question or type your requirements:
                </p>
              </div>

              {/* Quick Prompts */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Quick Inquiries:</p>
                <div className="flex flex-col gap-1.5">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-left text-xs bg-slate-800/80 hover:bg-[#11466A] text-slate-200 hover:text-white px-3 py-2 rounded-lg border border-slate-700/60 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span>{q}</span>
                      <Send className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Input message box */}
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={() => handleSend()}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg transition-colors cursor-pointer"
                    title="Send via WhatsApp"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Trust footer */}
              <div className="pt-1 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-400" />
                  FBR Verified
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Clock className="w-3 h-3" />
                  Karachi: 24-36hr Response
                </span>
              </div>
            </div>
          ) : (
            <div className="p-5 bg-[#081724] space-y-4 text-center">
              <div className="space-y-1">
                <h5 className="font-bold text-sm text-white">Scan WhatsApp Business QR</h5>
                <p className="text-[11px] text-slate-400">
                  Open WhatsApp camera on your phone to scan & start chatting instantly
                </p>
              </div>

              <div className="p-3 bg-white rounded-2xl mx-auto w-44 h-44 flex items-center justify-center shadow-lg">
                <img 
                  src="/whatsapp-qr.png" 
                  alt="HUAN Official WhatsApp QR Code" 
                  className="w-40 h-40 object-contain" 
                />
              </div>

              <div className="text-xs space-y-1 font-mono text-slate-300">
                <p className="font-bold text-white">+92 344 3733996</p>
                <p className="text-[11px] text-slate-400">infa@huan-surveillance.com</p>
              </div>

              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors"
              >
                <span>Or Open WhatsApp App</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-emerald-900/50 transition-all duration-300 active:scale-95 cursor-pointer border-2 border-white/20"
        aria-label="Contact HUAN on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
        </span>
        
        <MessageCircle className="w-6 h-6 text-white shrink-0" />
        <span className="hidden sm:inline font-bold text-xs tracking-wider uppercase">
          {isOpen ? 'Close Chat' : 'WhatsApp Us'}
        </span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
