/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CardData, ThemeConfig } from '../types';
import { PVCCardFront } from './PVCCardFront';
import { PVCCardBack } from './PVCCardBack';
import {
  RotateCcw,
  Columns,
  Layers,
  Sparkles,
  Maximize2,
  Printer,
  Eye,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveCardViewerProps {
  cardData: CardData;
  theme: ThemeConfig;
  activeSide: 'front' | 'back';
  setActiveSide: (side: 'front' | 'back') => void;
  onPrint: () => void;
  frontRef: React.RefObject<HTMLDivElement | null>;
  backRef: React.RefObject<HTMLDivElement | null>;
}

export const InteractiveCardViewer: React.FC<InteractiveCardViewerProps> = ({
  cardData,
  theme,
  activeSide,
  setActiveSide,
  onPrint,
  frontRef,
  backRef,
}) => {
  const [viewMode, setViewMode] = useState<'3d-flip' | 'side-by-side'>('3d-flip');
  const [isRotating, setIsRotating] = useState(false);

  const handleFlip = () => {
    setIsRotating(true);
    setActiveSide(activeSide === 'front' ? 'back' : 'front');
    setTimeout(() => setIsRotating(false), 600);
  };

  const handleCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div id="interactive-card-viewer" className="flex flex-col h-full space-y-4">
      
      {/* Top View Mode & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-lg">
        
        {/* Left: Dimension Indicator */}
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300 font-mono font-bold text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>
              {cardData.orientation === 'vertical'
                ? 'PVC 90 x 190 мм (9x19 см) • Босоо'
                : 'PVC 190 x 90 мм (19x9 см) • Хэвтээ'}
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-stone-400">
            Харьцаа: {cardData.orientation === 'vertical' ? '9:19' : '19:9'} • Сургуулийн 50 жилийн ой
          </span>
        </div>

        {/* Right: View Toggle Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-stone-950 p-1 border border-stone-800">
            <button
              id="btn-mode-flip"
              onClick={() => setViewMode('3d-flip')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === '3d-flip'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Карт (Эргүүлэх)</span>
            </button>

            <button
              id="btn-mode-side"
              onClick={() => setViewMode('side-by-side')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'side-by-side'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Хоёр талыг зэрэг харах</span>
            </button>
          </div>

          <button
            onClick={handleCelebration}
            title="Баяр хүргэх эффект"
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 transition-all"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Card Stage Area */}
      <div className="flex-1 min-h-[460px] flex flex-col items-center justify-center p-4 md:p-8 rounded-3xl bg-gradient-to-b from-stone-950/80 via-stone-900/60 to-stone-950/90 border border-stone-800/80 shadow-2xl relative overflow-hidden">
        
        {/* Subtle background ambient stage glow */}
        <div
          className="absolute w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-20 -z-0"
          style={{ backgroundColor: theme.accentGold }}
        />

        {/* 19x9 Physical Scale Label */}
        <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[11px] text-stone-400 z-10 pointer-events-none">
          <Info className="w-3.5 h-3.5 text-amber-400/80" />
          <span>
            {cardData.orientation === 'vertical'
              ? 'Бодит PVC хэмжээ: 9см өргөн × 19см өндөр (Босоо карт)'
              : 'Бодит PVC хэмжээ: 19см өргөн × 9см өндөр (Хэвтээ карт)'}
          </span>
        </div>

        {/* ================= MODE 1: 3D INTERACTIVE FLIP ================= */}
        {viewMode === '3d-flip' && (
          <div className={`w-full ${cardData.orientation === 'vertical' ? 'max-w-[330px] sm:max-w-[350px]' : 'max-w-[800px]'} flex flex-col items-center`}>
            
            {/* 3D Perspective Container */}
            <div className="w-full perspective-1200 py-4 cursor-pointer" onClick={handleFlip}>
              
              <div
                className={`w-full transform-style-3d transition-transform duration-700 ease-out relative ${
                  activeSide === 'back' ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT FACE */}
                <div
                  ref={frontRef}
                  className="w-full backface-hidden"
                >
                  <PVCCardFront cardData={cardData} theme={theme} />
                </div>

                {/* BACK FACE */}
                <div
                  ref={backRef}
                  className="w-full absolute inset-0 backface-hidden rotate-y-180"
                >
                  <PVCCardBack cardData={cardData} theme={theme} />
                </div>
              </div>

            </div>

            {/* Bottom Flip Button & Helper */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <button
                id="btn-flip-card"
                onClick={handleFlip}
                className="px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-amber-200 border border-amber-500/40 font-bold text-xs shadow-lg flex items-center gap-2 transition-all transform active:scale-95"
              >
                <RotateCcw className={`w-4 h-4 transition-transform duration-500 ${isRotating ? 'rotate-180' : ''}`} />
                <span>{activeSide === 'front' ? 'Хойд тал руу эргүүлэх' : 'Урд тал руу эргүүлэх'}</span>
              </button>
              <p className="text-[11px] text-stone-400">
                Карт дээр дарах эсвэл дээрх товчоор нөгөө талыг үзнэ үү
              </p>
            </div>

          </div>
        )}

        {/* ================= MODE 2: DUAL SIDE-BY-SIDE VIEW ================= */}
        {viewMode === 'side-by-side' && (
          cardData.orientation === 'vertical' ? (
            <div className="w-full max-w-[840px] flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 overflow-y-auto max-h-[740px] pr-2 custom-scrollbar py-2">
              {/* Front Side View (Vertical) */}
              <div className="w-full max-w-[320px] sm:w-[330px] shrink-0 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span className="font-bold flex items-center gap-1.5 text-amber-300">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Урд тал (Сургууль)
                  </span>
                  <span className="font-mono text-stone-400 text-[11px]">90 x 190 мм</span>
                </div>
                <div ref={frontRef} className="w-full">
                  <PVCCardFront cardData={cardData} theme={theme} />
                </div>
              </div>

              {/* Back Side View (Vertical) */}
              <div className="w-full max-w-[320px] sm:w-[330px] shrink-0 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span className="font-bold flex items-center gap-1.5 text-amber-300">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Хойд тал (Дурсамж & Хөтөлбөр)
                  </span>
                  <span className="font-mono text-stone-400 text-[11px]">90 x 190 мм</span>
                </div>
                <div ref={backRef} className="w-full">
                  <PVCCardBack cardData={cardData} theme={theme} />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-[960px] space-y-6 overflow-y-auto max-h-[700px] pr-2 custom-scrollbar">
              {/* Front Side View (Horizontal) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span className="font-bold flex items-center gap-1.5 text-amber-300">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Урд тал (Сургуулийн төв байр & Хүндэт зочны нэр)
                  </span>
                  <span className="font-mono text-stone-400 text-[11px]">190 x 90 мм</span>
                </div>
                <div ref={frontRef} className="w-full">
                  <PVCCardFront cardData={cardData} theme={theme} />
                </div>
              </div>

              {/* Back Side View (Horizontal) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span className="font-bold flex items-center gap-1.5 text-amber-300">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Хойд тал (Дурсамж гэрэл зураг & Баярын хөтөлбөр)
                  </span>
                  <span className="font-mono text-stone-400 text-[11px]">190 x 90 мм</span>
                </div>
                <div ref={backRef} className="w-full">
                  <PVCCardBack cardData={cardData} theme={theme} />
                </div>
              </div>
            </div>
          )
        )}

      </div>

    </div>
  );
};
