import React from 'react';

interface HuanLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  showTagline?: boolean;
  theme?: 'dark' | 'light' | 'mono';
  iconOnly?: boolean;
}

export const HuanLogoIcon: React.FC<{ className?: string; size?: number | string }> = ({ 
  className = "w-10 h-10", 
  size = 40 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-label="HUAN Surveillance Shield Logo"
    >
      {/* Navy Blue Shield */}
      <path
        d="M 200 40 C 218 45 315 88 350 110 C 362 118 370 132 368 148 C 360 220 365 305 305 390 C 268 442 225 470 200 480 C 175 470 132 442 95 390 C 35 305 40 220 32 148 C 30 132 38 118 50 110 C 85 88 182 45 200 40 Z"
        fill="#11466A"
      />

      {/* Upper Helmet Visor / Crest */}
      <path
        d="M 92 215 C 115 155 168 115 238 115 C 300 115 342 145 352 188 C 358 215 348 238 322 242 C 308 244 298 236 295 222 C 292 205 280 185 258 172 C 232 158 195 156 160 170 C 125 184 105 202 92 215 Z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Main Camera Visor Body */}
      <path
        d="M 85 218 C 125 224 175 185 238 185 C 285 185 318 218 318 258 C 318 298 285 330 238 330 C 192 330 152 295 125 260 C 112 244 98 228 85 218 Z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Circular Camera Lens Eye */}
      <circle
        cx="240"
        cy="258"
        r="35"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="18"
      />

      {/* Outer Conduit Cable to Left Shield Edge */}
      <path
        d="M 75 355 C 105 355 142 350 145 315 L 145 285"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Conduit Cable */}
      <path
        d="M 168 305 C 172 338 178 370 195 390 C 205 402 202 415 188 422 C 170 428 145 405 130 380"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom Dynamic Slash Stripe */}
      <path
        d="M 125 435 L 165 465"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="18"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const HuanLogo: React.FC<HuanLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  showTagline = false,
  theme = 'light',
  iconOnly = false
}) => {
  const sizeMap = {
    xs: { icon: 24, text: 'text-base', sub: 'text-[8px]', tag: 'text-[9px]' },
    sm: { icon: 30, text: 'text-lg', sub: 'text-[9px]', tag: 'text-[10px]' },
    md: { icon: 40, text: 'text-xl', sub: 'text-[10px]', tag: 'text-[11px]' },
    lg: { icon: 52, text: 'text-2xl', sub: 'text-xs', tag: 'text-xs' },
    xl: { icon: 64, text: 'text-3xl', sub: 'text-sm', tag: 'text-xs' },
    '2xl': { icon: 84, text: 'text-4xl', sub: 'text-base', tag: 'text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#11466A]';
  const subTextColor = theme === 'dark' ? 'text-slate-300' : 'text-[#11466A]/80';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <HuanLogoIcon size={currentSize.icon} />
      
      {showText && !iconOnly && (
        <div className="flex flex-col leading-none">
          <div className={`font-black tracking-wider uppercase font-sans ${currentSize.text} ${textColor}`}>
            HUAN
          </div>
          <span className={`font-bold tracking-[0.25em] uppercase font-sans mt-0.5 ${currentSize.sub} ${subTextColor}`}>
            SURVEILLANCE
          </span>
          {showTagline && (
            <span className={`italic text-slate-400 font-serif mt-1 ${currentSize.tag}`}>
              "Protecting What Matters Most"
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default HuanLogo;
