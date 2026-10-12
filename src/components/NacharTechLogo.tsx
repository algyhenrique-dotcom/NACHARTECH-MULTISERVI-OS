import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const NacharTechLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubtitle = true 
}) => {
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 52 : 40;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl';
  const subSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Authentic Circular Split Emblem matching user image */}
      <div 
        className="relative shrink-0 flex items-center justify-center rounded-full transition-transform group-hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full drop-shadow-md"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Black circle background */}
          <circle cx="50" cy="50" r="48" fill="#0A0F1D" stroke="#1E293B" strokeWidth="2" />
          
          {/* Left half: Blue arc */}
          <path 
            d="M50 8 A42 42 0 0 0 50 92 Z" 
            fill="#1E40AF"
          />
          {/* Right half: Orange arc */}
          <path 
            d="M50 8 A42 42 0 0 1 50 92 Z" 
            fill="#F97316"
          />

          {/* Dividing vertical channel */}
          <rect x="48.5" y="8" width="3" height="84" fill="#0A0F1D" />

          {/* Left Circuit traces & icons */}
          {/* Lightning badge top left */}
          <circle cx="34" cy="28" r="9" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" />
          <path d="M34 22 L30 28 H35 L33 34 L38 27 H33 Z" fill="#60A5FA" />

          {/* Gear icon bottom left */}
          <circle cx="32" cy="70" r="8" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5" />
          <circle cx="32" cy="70" r="3.5" fill="#06B6D4" />

          {/* Blue circuit lines */}
          <path d="M14 42 H28 M14 54 H28 M22 42 V54" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
          <circle cx="14" cy="42" r="2.5" fill="#93C5FD" />
          <circle cx="14" cy="54" r="2.5" fill="#93C5FD" />

          {/* Right Circuit traces & icons */}
          {/* Circuit nodes top right */}
          <path d="M56 34 L66 26 M56 42 L74 34 M56 50 L82 44" stroke="#FED7AA" strokeWidth="2" strokeLinecap="round" />
          <circle cx="66" cy="26" r="2.5" fill="#FFEDD5" />
          <circle cx="74" cy="34" r="2.5" fill="#FFEDD5" />
          <circle cx="82" cy="44" r="2.5" fill="#FFEDD5" />

          {/* Wi-Fi Waves bottom right */}
          <path d="M60 66 A14 14 0 0 1 78 66" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M65 71 A8 8 0 0 1 73 71" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="69" cy="76" r="2.5" fill="#FFFFFF" />

          {/* Center Microchip (Cyan / Navy) */}
          <rect x="41" y="41" width="18" height="18" rx="3.5" fill="#0F172A" stroke="#06B6D4" strokeWidth="2" />
          <rect x="45" y="45" width="10" height="10" rx="1.5" fill="#0284C7" />
          {/* Pins */}
          <rect x="37" y="44" width="4" height="2" fill="#06B6D4" />
          <rect x="37" y="49" width="4" height="2" fill="#06B6D4" />
          <rect x="37" y="54" width="4" height="2" fill="#06B6D4" />
          <rect x="59" y="44" width="4" height="2" fill="#F97316" />
          <rect x="59" y="49" width="4" height="2" fill="#F97316" />
          <rect x="59" y="54" width="4" height="2" fill="#F97316" />
          <rect x="44" y="37" width="2" height="4" fill="#60A5FA" />
          <rect x="49" y="37" width="2" height="4" fill="#60A5FA" />
          <rect x="54" y="37" width="2" height="4" fill="#60A5FA" />
          <rect x="44" y="59" width="2" height="4" fill="#FB923C" />
          <rect x="49" y="59" width="2" height="4" fill="#FB923C" />
          <rect x="54" y="59" width="2" height="4" fill="#FB923C" />
        </svg>
      </div>

      {/* Typography: Nachar (Blue) + Tech (Orange) & Multiserviços (White) */}
      <div className="flex flex-col leading-none">
        <div className={`font-black tracking-tight ${textSize} font-display flex items-baseline`}>
          <span className="text-blue-500">Nachar</span>
          <span className="text-orange-500">Tech</span>
        </div>
        {showSubtitle && (
          <span className={`${subSize} tracking-[0.25em] uppercase font-bold text-slate-300 font-display mt-0.5`}>
            Multiserviços
          </span>
        )}
      </div>
    </div>
  );
};
