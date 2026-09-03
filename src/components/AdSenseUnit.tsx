import React from 'react';

interface AdSenseUnitProps {
  slotId?: string;
  format?: 'banner' | 'sidebar' | 'in-article';
  className?: string;
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  slotId = 'huan-adsense-slot-1',
  format = 'banner',
  className = ''
}) => {
  return (
    <div className={`my-8 overflow-hidden rounded-xl border border-slate-700/60 bg-[#081724]/90 p-4 text-center ${className}`}>
      {/* Policy Label */}
      <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-2 border-b border-slate-800 pb-1">
        <span>Advertisement</span>
        <span>Google AdSense Slot • {slotId}</span>
      </div>

      {/* Responsive Ad Unit Container */}
      <div className={`flex flex-col items-center justify-center bg-slate-900/60 rounded-lg border border-dashed border-slate-700/70 p-6 ${
        format === 'sidebar' ? 'min-h-[250px]' : 'min-h-[110px]'
      }`}>
        <div className="text-slate-400 text-xs font-mono max-w-md space-y-1">
          <p className="font-semibold text-slate-300">Google AdSense Display Unit Space</p>
          <p className="text-[11px] text-slate-500">
            Ad slot reserved per Google AdSense placement policy (non-intrusive content position).
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdSenseUnit;
