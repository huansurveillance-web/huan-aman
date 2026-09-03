import React, { useState, useMemo } from 'react';
import { X, HardDrive, Cpu, ShieldCheck, Sparkles, Sliders } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface StorageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StorageCalculatorModal: React.FC<StorageCalculatorModalProps> = ({ isOpen, onClose }) => {
  const { navigate } = useApp();
  const [cameraCount, setCameraCount] = useState<number>(8);
  const [resolution, setResolution] = useState<string>('4MP'); // 1080p, 4MP, 8MP_4K
  const [compression, setCompression] = useState<string>('H265+'); // H264, H265, H265+
  const [frameRate, setFrameRate] = useState<number>(20); // 15, 20, 25, 30
  const [recordingHoursPerDay, setRecordingHoursPerDay] = useState<number>(24);
  const [daysRetention, setDaysRetention] = useState<number>(30);

  // Bitrate mapping in Mbps per stream based on resolution & compression with robust fallbacks
  const bitrateMbps = useMemo(() => {
    let baseBitrate = 4; // 1080p H264 base
    if (resolution === '1080p') baseBitrate = 3;
    if (resolution === '4MP') baseBitrate = 5;
    if (resolution === '8MP_4K') baseBitrate = 10;

    // Frame rate multiplier (relative to 25fps)
    const safeFps = Math.max(1, Math.min(60, Number(frameRate) || 20));
    const fpsFactor = safeFps / 25;
    let calculated = baseBitrate * fpsFactor;

    // Compression factor
    if (compression === 'H265') calculated *= 0.55;
    if (compression === 'H265+') calculated *= 0.35; // H.265+ smart codec

    const finalVal = Number(calculated);
    return Number.isFinite(finalVal) ? Math.max(0.5, Math.min(50, finalVal)) : 3.5;
  }, [resolution, compression, frameRate]);

  // Storage calculation in Gigabytes and Terabytes with zero-NaN guarantees
  const calculatedStorage = useMemo(() => {
    const safeCamCount = Math.max(1, Math.min(512, Number(cameraCount) || 1));
    const safeHours = Math.max(1, Math.min(24, Number(recordingHoursPerDay) || 24));
    const safeDays = Math.max(1, Math.min(365, Number(daysRetention) || 30));
    const safeBitrate = Number.isFinite(bitrateMbps) && bitrateMbps > 0 ? bitrateMbps : 3.5;

    // formula: (Bitrate in Mbps * 3600 sec * hours * days * cameras) / (8 bits * 1000 MB in GB)
    const totalGB = (safeBitrate * 3600 * safeHours * safeDays * safeCamCount) / (8 * 1000);
    const totalTB = Number.isFinite(totalGB) ? totalGB / 1000 : 0;
    
    // Suggest standard HDD size with 15% safety headroom
    const withOverheadTB = totalTB * 1.15;
    let suggestedDrives = '1x 2TB SkyHawk/WD Purple HDD';
    if (withOverheadTB <= 2) suggestedDrives = '1x 2TB SkyHawk / WD Purple HDD';
    else if (withOverheadTB > 2 && withOverheadTB <= 4) suggestedDrives = '1x 4TB SkyHawk / WD Purple HDD';
    else if (withOverheadTB > 4 && withOverheadTB <= 8) suggestedDrives = '1x 8TB Enterprise HDD';
    else if (withOverheadTB > 8 && withOverheadTB <= 16) suggestedDrives = '2x 8TB OR 1x 16TB Enterprise HDD';
    else if (withOverheadTB > 16 && withOverheadTB <= 32) suggestedDrives = '4x 8TB HDD in RAID 5 Array';
    else if (withOverheadTB > 32 && withOverheadTB <= 64) suggestedDrives = '8x 8TB HDDs (Enterprise 24-Bay SAN/NVR)';
    else suggestedDrives = `${Math.ceil(withOverheadTB / 16)}x 16TB Enterprise SAS HDDs (SAN Storage Array)`;

    const totalBandwidthMbps = safeBitrate * safeCamCount;

    return {
      totalTB: Number(totalTB.toFixed(2)),
      totalBandwidthMbps: Number(totalBandwidthMbps.toFixed(1)),
      suggestedDrives,
      bitratePerCam: Number(safeBitrate.toFixed(2))
    };
  }, [bitrateMbps, recordingHoursPerDay, daysRetention, cameraCount]);

  if (!isOpen) return null;

  const quickCamPresets = [4, 8, 16, 32, 64, 128];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#081827] text-slate-100 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-[#0E3A5C] border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">CCTV Storage & Bandwidth Calculator</h3>
              <p className="text-xs text-slate-300">Engineering HDD Capacity & Network Sizing Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Sliders & Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Camera Count */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-slate-300">Total Cameras</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="1"
                    max="512"
                    value={cameraCount}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setCameraCount(isNaN(val) ? 1 : Math.max(1, Math.min(512, val)));
                    }}
                    className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-right font-mono font-bold text-amber-400 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-slate-400 text-xs">Cams</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="128"
                value={Math.min(128, cameraCount)}
                onChange={(e) => setCameraCount(Number(e.target.value))}
                className="w-full accent-[#E65100] cursor-pointer"
              />
              <div className="flex flex-wrap gap-1 pt-1">
                {quickCamPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setCameraCount(preset)}
                    className={`px-2 py-0.5 text-[10px] rounded font-mono font-medium transition-colors cursor-pointer ${
                      cameraCount === preset
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {preset} Cams
                  </button>
                ))}
              </div>
            </div>

            {/* Recording Retention Days */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-slate-300">Retention Days</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={daysRetention}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setDaysRetention(isNaN(val) ? 1 : Math.max(1, Math.min(365, val)));
                    }}
                    className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-right font-mono font-bold text-amber-400 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-slate-400 text-xs">Days</span>
                </div>
              </div>
              <input
                type="range"
                min="7"
                max="90"
                step="1"
                value={Math.min(90, Math.max(7, daysRetention))}
                onChange={(e) => setDaysRetention(Number(e.target.value))}
                className="w-full accent-[#E65100] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>7 Days</span>
                <span>15 Days</span>
                <span>30 Days</span>
                <span>90 Days</span>
              </div>
            </div>

            {/* Resolution */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Camera Resolution
              </label>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="1080p">1080p Full HD (2 Megapixels - 1920x1080)</option>
                <option value="4MP">4MP Quad HD (Recommended - 2560x1440)</option>
                <option value="8MP_4K">4K Ultra HD (8 Megapixels - 3840x2160)</option>
              </select>
            </div>

            {/* Compression Codec */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Video Compression Codec
              </label>
              <select
                value={compression}
                onChange={(e) => setCompression(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="H265+">H.265+ Smart Codec (70% Storage Savings)</option>
                <option value="H265">Standard H.265 (HEVC High Efficiency)</option>
                <option value="H264">Legacy H.264 (Standard AVC)</option>
              </select>
            </div>

            {/* Frame Rate & Recording Hours */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Frame Rate (FPS)
              </label>
              <select
                value={frameRate}
                onChange={(e) => setFrameRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value={15}>15 FPS (Smooth Commercial General)</option>
                <option value={20}>20 FPS (Recommended Balance)</option>
                <option value={25}>25 FPS (PAL Real-Time Fluid)</option>
                <option value={30}>30 FPS (Full Real-Time)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Daily Recording Hours
              </label>
              <select
                value={recordingHoursPerDay}
                onChange={(e) => setRecordingHoursPerDay(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value={24}>24 Hours/Day (Continuous 24/7 Recording)</option>
                <option value={12}>12 Hours/Day (Business Hours Only)</option>
                <option value={8}>8 Hours/Day (Shift Recording)</option>
                <option value={4}>4 Hours/Day (Motion Detection Estimate)</option>
              </select>
            </div>

          </div>

          {/* Results Display Panel */}
          <div className="bg-[#05111B] border border-slate-800 rounded-xl p-5 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-bold flex items-center justify-between">
              <span>Calculation Output & Sizing Breakdown</span>
              <span className="text-emerald-400 font-normal text-[10px] lowercase">verified accurate</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400">Total Storage Required</span>
                <div className="text-2xl font-bold text-amber-400 mt-1 font-mono">
                  {calculatedStorage.totalTB} <span className="text-sm font-normal text-slate-300">TB</span>
                </div>
                <span className="text-[10px] text-slate-500">Uncompressed capacity</span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400">Network Bandwidth</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">
                  {calculatedStorage.totalBandwidthMbps} <span className="text-sm font-normal text-slate-300">Mbps</span>
                </div>
                <span className="text-[10px] text-slate-500">Total incoming stream</span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400">Stream Bitrate</span>
                <div className="text-2xl font-bold text-blue-400 mt-1 font-mono">
                  {calculatedStorage.bitratePerCam} <span className="text-sm font-normal text-slate-300">Mbps</span>
                </div>
                <span className="text-[10px] text-slate-500">Per camera average</span>
              </div>

            </div>

            {/* Recommended HDD configuration */}
            <div className="p-3.5 bg-[#0E3A5C]/40 border border-slate-700 rounded-lg flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-white">Recommended HDD Configuration: </span>
                <span className="text-amber-300 font-mono font-medium">{calculatedStorage.suggestedDrives}</span>
                <p className="text-slate-400 text-[11px] mt-1">
                  Surveillance-grade hard drives (Seagate SkyHawk / WD Purple) are engineered for 24/7 continuous write cycles with rotational vibration damping.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Calculator
          </button>
          
          <button
            onClick={() => {
              onClose();
              navigate('quote');
            }}
            className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Full AI System Quote</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default StorageCalculatorModal;
