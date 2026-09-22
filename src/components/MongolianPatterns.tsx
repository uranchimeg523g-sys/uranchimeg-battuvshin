/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Mongolian traditional endless knot (Өлзий хээ)
export const UlziiPattern: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#d4af37',
  size = 32,
}) => (
  <svg
    id="svg-ulzii-pattern"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Intertwined eternal knot paths */}
    <path
      d="M35 15 H65 V35 H85 V65 H65 V85 H35 V65 H15 V35 H35 V15 Z"
      stroke={color}
      strokeWidth="4"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M45 25 H55 V45 H75 V55 H55 V75 H45 V55 H25 V45 H45 V25 Z"
      stroke={color}
      strokeWidth="3.5"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="50" cy="50" r="4" fill={color} />
  </svg>
);

// Golden Jubilee "50" Emblem with laurel wreath
export const Golden50Emblem: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  years?: string;
}> = ({ className = '', size = 'md', years = '1976 – 2026' }) => {
  const dim = size === 'sm' ? 'w-16 h-16' : size === 'lg' ? 'w-28 h-28' : 'w-20 h-20';

  return (
    <div id="emblem-golden-50" className={`relative flex items-center justify-center shrink-0 ${dim} ${className}`}>
      {/* Outer decorative halo */}
      <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="42" stroke="url(#goldGrad)" strokeWidth="0.8" />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2a8" />
            <stop offset="40%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#996515" />
            <stop offset="100%" stopColor="#f7d070" />
          </linearGradient>
        </defs>
      </svg>

      {/* Laurel wreath left & right */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
        {/* Left leaves */}
        <path
          d="M 22 55 C 18 42, 22 28, 38 18 M 18 50 C 22 47, 24 43, 20 40 M 20 38 C 24 36, 25 32, 21 28 M 25 28 C 30 27, 30 22, 25 19"
          stroke="url(#goldGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Right leaves */}
        <path
          d="M 78 55 C 82 42, 78 28, 62 18 M 82 50 C 78 47, 76 43, 80 40 M 80 38 C 76 36, 75 32, 79 28 M 75 28 C 70 27, 70 22, 75 19"
          stroke="url(#goldGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Ribbon banner at bottom */}
        <path
          d="M 25 78 C 35 74, 65 74, 75 78 L 72 88 C 60 84, 40 84, 28 88 Z"
          fill="url(#goldGrad)"
          opacity="0.9"
        />
      </svg>

      {/* Core emblem content */}
      <div className="relative flex flex-col items-center justify-center text-center">
        <span className="font-serif-display font-extrabold text-2xl leading-none gold-text-shimmer drop-shadow-sm tracking-tighter">
          50
        </span>
        <span className="text-[7.5px] font-bold tracking-widest text-amber-300 uppercase leading-none mt-0.5">
          ЖИЛ
        </span>
        <span className="text-[6px] text-amber-200/80 font-medium tracking-tight mt-0.5">
          {years}
        </span>
      </div>
    </div>
  );
};

// Mongolian Alhan Khee (Алхан хээ) Border Corner
export const MongolianCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
  size?: number;
}> = ({ position, color = '#d4af37', size = 36 }) => {
  const rotation =
    position === 'top-left'
      ? 'rotate(0)'
      : position === 'top-right'
      ? 'rotate(90)'
      : position === 'bottom-right'
      ? 'rotate(180)'
      : 'rotate(270)';

  return (
    <svg
      id={`corner-${position}`}
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: rotation, transformOrigin: 'center' }}
    >
      <path
        d="M 2 48 V 4 H 48 M 6 48 V 8 H 48 M 12 48 V 14 H 42 V 42 H 18 V 20 H 36 V 36 H 24 V 26 H 30"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
};

// PVC Smart Card Chip Contact Simulator
export const PVCChip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    id="pvc-smart-chip"
    className={`w-11 h-8 rounded-md relative overflow-hidden shadow-inner border border-amber-500/50 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 ${className}`}
  >
    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[1.5px] p-[2px]">
      <div className="border-r border-b border-amber-800/40 rounded-tl-sm" />
      <div className="border-b border-amber-800/40" />
      <div className="border-l border-b border-amber-800/40 rounded-tr-sm" />
      <div className="border-r border-amber-800/40" />
      <div className="bg-amber-300/60 rounded-full my-auto mx-auto w-2 h-2 border border-amber-700/30" />
      <div className="border-l border-amber-800/40" />
      <div className="border-r border-t border-amber-800/40 rounded-bl-sm" />
      <div className="border-t border-amber-800/40" />
      <div className="border-l border-t border-amber-800/40 rounded-br-sm" />
    </div>
  </div>
);

// Hologram Security Seal
export const HologramSeal: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    id="pvc-hologram-seal"
    className={`w-9 h-9 rounded-full relative flex items-center justify-center overflow-hidden border border-amber-200/50 shadow-sm ${className}`}
    style={{
      background: 'conic-gradient(from 180deg at 50% 50%, #f6d365 0deg, #fda085 70deg, #fbc2eb 140deg, #a6c1ee 210deg, #84fab0 280deg, #f6d365 360deg)',
    }}
  >
    <div className="w-7 h-7 rounded-full border border-white/60 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[0.5px]">
      <span className="text-[6.5px] font-extrabold text-white tracking-tighter drop-shadow-sm leading-none">
        50 ОЙ
      </span>
      <span className="text-[5px] font-semibold text-amber-100 tracking-wider leading-none scale-90">
        УРИЛГА
      </span>
    </div>
  </div>
);

// Lanyard slot hole for PVC badge
export const LanyardSlotHole: React.FC = () => (
  <div
    id="lanyard-hole"
    className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-full bg-stone-900/80 border border-amber-400/40 shadow-inner flex items-center justify-center pointer-events-none z-30"
  >
    <div className="w-7 h-1.5 rounded-full bg-black/60 inset-shadow-sm" />
  </div>
);

// Traditional ornamental horizontal separator
export const OrnamentalDivider: React.FC<{ color?: string; className?: string }> = ({
  color = '#d4af37',
  className = '',
}) => (
  <div className={`flex items-center justify-center gap-2 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
      <path d="M 0 6 H 9 L 12 1 L 15 6 H 24" stroke={color} strokeWidth="1" />
      <circle cx="12" cy="6" r="2.5" fill={color} />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
  </div>
);
