/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CardData, ThemeConfig } from '../types';
import {
  Golden50Emblem,
  MongolianCorner,
  UlziiPattern,
  LanyardSlotHole,
  PVCChip,
  HologramSeal,
  OrnamentalDivider,
} from './MongolianPatterns';

interface PVCCardFrontProps {
  cardData: CardData;
  theme: ThemeConfig;
  isPrintMode?: boolean;
}

export const PVCCardFront: React.FC<PVCCardFrontProps> = ({
  cardData,
  theme,
  isPrintMode = false,
}) => {
  const { frontPhoto, hasLanyardHole, showMongolianPatterns, finish } = cardData;
  const isVertical = cardData.orientation === 'vertical';

  // Frame styling for the front photo
  const getPhotoFrameClasses = () => {
    switch (frontPhoto.frameStyle) {
      case 'arch':
        return 'rounded-t-[36px] rounded-b-xl';
      case 'oval':
        return 'rounded-full aspect-square';
      case 'split':
        return isVertical ? 'rounded-t-2xl rounded-b-none' : 'rounded-l-2xl rounded-r-none';
      case 'rect':
      default:
        return 'rounded-xl';
    }
  };

  const cardBackgroundStyle = cardData.customColors?.enabled
    ? {
        background: `linear-gradient(145deg, ${cardData.customColors.bgStart} 0%, ${cardData.customColors.bgEnd} 100%)`,
        backgroundColor: cardData.customColors.cardBgHex,
        boxShadow: isPrintMode
          ? 'none'
          : '0 20px 45px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(212, 175, 55, 0.35)',
      }
    : {
        backgroundColor: theme.cardBgHex,
        boxShadow: isPrintMode
          ? 'none'
          : '0 20px 45px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(212, 175, 55, 0.35)',
      };

  return (
    <div
      id="pvc-card-front"
      className={`relative w-full ${
        isVertical ? 'aspect-[9/19]' : 'aspect-[19/9]'
      } overflow-hidden select-none text-white ${
        isPrintMode ? 'print-page shadow-none' : 'shadow-2xl rounded-2xl'
      } ${!cardData.customColors?.enabled ? `bg-gradient-to-br ${theme.bgGradient}` : ''}`}
      style={cardBackgroundStyle}
    >
      {/* Background Texture if provided (matching 62nd school 50th anniversary solar warmth) */}
      {cardData.bgTextureUrl && cardData.useBgTexture !== false && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-40 mix-blend-screen"
          style={{ backgroundImage: `url(${cardData.bgTextureUrl})` }}
        />
      )}

      {/* Solar Amber or Royal Violet Glow (adapts to theme) */}
      <div
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[130%] aspect-square rounded-full pointer-events-none mix-blend-screen opacity-40"
        style={{
          background:
            theme.id === 'purple-gold'
              ? 'radial-gradient(circle, rgba(192, 132, 252, 0.45) 0%, rgba(147, 51, 234, 0.3) 30%, rgba(245, 158, 11, 0.15) 60%, transparent 100%)'
              : 'radial-gradient(circle, rgba(251, 191, 36, 0.45) 0%, rgba(249, 115, 22, 0.25) 35%, rgba(180, 83, 9, 0.08) 65%, transparent 100%)',
        }}
      />

      {/* Background Guilloche / Luxury subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${theme.accentGold} 1px, transparent 1px), radial-gradient(circle at 75% 75%, ${theme.accentGold} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Gold foil edge border */}
      <div className="absolute inset-[3px] rounded-[13px] border border-amber-400/40 pointer-events-none z-20">
        <div className="absolute inset-[3px] rounded-[10px] border border-amber-300/20" />
      </div>

      {/* Optional Lanyard Slot */}
      {hasLanyardHole && <LanyardSlotHole />}

      {/* Mongolian Corners (Алхан хээ) */}
      {showMongolianPatterns && (
        <>
          <div className="absolute top-2 left-2 z-20 pointer-events-none opacity-85">
            <MongolianCorner position="top-left" color={theme.accentGold} size={isVertical ? 24 : 28} />
          </div>
          <div className="absolute top-2 right-2 z-20 pointer-events-none opacity-85">
            <MongolianCorner position="top-right" color={theme.accentGold} size={isVertical ? 24 : 28} />
          </div>
          <div className="absolute bottom-2 left-2 z-20 pointer-events-none opacity-85">
            <MongolianCorner position="bottom-left" color={theme.accentGold} size={isVertical ? 24 : 28} />
          </div>
          <div className="absolute bottom-2 right-2 z-20 pointer-events-none opacity-85">
            <MongolianCorner position="bottom-right" color={theme.accentGold} size={isVertical ? 24 : 28} />
          </div>
        </>
      )}

      {/* ======================= VERTICAL LAYOUT (9x19 cm) ======================= */}
      {isVertical ? (
        <div className="relative z-10 w-full h-full flex flex-col justify-between items-center px-4 py-4 pt-6 text-center">
          
          {/* Top: School Info Header */}
          <div className="w-full flex flex-col items-center pt-1">
            {Boolean(cardData.schoolNameEn?.trim()) && (
              <div className="flex items-center gap-1.5 text-amber-300/90 text-[8px] font-bold tracking-widest uppercase mb-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>{cardData.schoolNameEn}</span>
              </div>
            )}
            <h1 className="font-serif-display font-bold text-xs sm:text-sm leading-snug tracking-wide text-white drop-shadow-sm px-2 mt-1">
              {cardData.schoolName}
            </h1>
            <div className="mt-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/25 via-amber-400/40 to-amber-500/25 border border-amber-300/70 shadow-md flex items-center gap-1.5">
              <UlziiPattern size={11} color={theme.accentGold} />
              <span className="text-[11px] sm:text-xs font-serif font-black tracking-widest text-amber-200 uppercase drop-shadow">
                {cardData.subTitle || 'ХҮНДЭТГЭЛИЙН УРИЛГА'}
              </span>
              <UlziiPattern size={11} color={theme.accentGold} />
            </div>
          </div>

          {/* School Photo Frame */}
          <div className="relative shrink-0 w-[84%] max-h-[27%] aspect-[16/11] my-auto flex flex-col justify-center items-center">
            <div
              className={`relative w-full h-full overflow-hidden shadow-lg border-2 ${
                frontPhoto.showGoldBorder ? 'border-amber-400/70 shadow-amber-900/20' : 'border-white/20'
              } ${getPhotoFrameClasses()} bg-black/40`}
            >
              <img
                src={frontPhoto.url}
                alt="School Front"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-200"
                style={{
                  transform: `scale(${frontPhoto.zoom}) translate(${frontPhoto.posX}%, ${frontPhoto.posY}%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute bottom-1 left-2 right-2 flex items-center justify-between pointer-events-none">
                <span className="text-[7px] font-semibold text-amber-200 uppercase tracking-widest bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-xs border border-amber-400/30">
                  СУРГУУЛЬ • 50 ЖИЛ
                </span>
                <UlziiPattern size={11} color="#f6d365" />
              </div>
            </div>
          </div>

          {/* 50th Anniversary Logo or Golden 50 Emblem */}
          <div className="my-1 shrink-0 flex items-center justify-center">
            {cardData.logoUrl ? (
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/50 via-yellow-400/70 to-orange-500/50 blur-xs animate-pulse" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-500 shadow-xl border-2 border-amber-300/80 overflow-hidden bg-black/40">
                  <img
                    src={cardData.logoUrl}
                    alt="62-р сургуулийн 50 жилийн ойн лого"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            ) : (
              <div className="scale-90 sm:scale-95">
                <Golden50Emblem size="sm" years={cardData.years} />
              </div>
            )}
          </div>

          {/* Guest Name & Role Honor Plate */}
          <div className="w-full my-auto px-1">
            <div className="relative p-2 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border border-amber-400/50 backdrop-blur-xs">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[7.5px] uppercase tracking-widest text-amber-300/80 font-bold">
                  ХҮНДЭТ ЗОЧИН
                </span>
                <span className="text-[7.5px] font-mono text-amber-200/90 tracking-wider">
                  {cardData.cardNumber}
                </span>
              </div>
              {cardData.guestName && !cardData.handwrittenName ? (
                <>
                  <div className="font-serif-display font-extrabold text-sm sm:text-base text-amber-100 leading-snug tracking-normal truncate">
                    {cardData.guestName}
                  </div>
                  {cardData.guestRole && (
                    <div className="text-[8.5px] text-amber-200/90 italic tracking-wide truncate mt-0.5">
                      {cardData.guestRole}
                    </div>
                  )}
                </>
              ) : (
                <div className="py-1">
                  <div className="flex items-end gap-1.5 border-b-2 border-dotted border-amber-300/80 pb-0.5">
                    <span className="text-[8px] sm:text-[8.5px] text-amber-300/90 font-serif whitespace-nowrap font-medium">
                      Таныг урьж байна:
                    </span>
                    <span className="flex-1 text-[8.5px] text-amber-100/40 font-mono tracking-widest text-center truncate">
                      ........................................
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[6.5px] text-amber-300/70 tracking-wider">
                    <span className="italic font-sans">✍ (Нэрийг гараар бичих)</span>
                    <span className="italic font-serif">Хүндэт зочин танаа</span>
                  </div>
                </div>
              )}
            </div>

            {/* School Motto */}
            <div className="mt-1.5 flex items-center gap-1.5 px-1">
              <OrnamentalDivider className="flex-1 opacity-70" color={theme.accentGold} />
              <p className="text-[7.5px] italic text-stone-200/90 text-center font-serif-display truncate max-w-[85%]">
                “{cardData.motto}”
              </p>
              <OrnamentalDivider className="flex-1 opacity-70" color={theme.accentGold} />
            </div>
          </div>

          {/* Bottom Bar: Smart Chip, Hologram, Date & VIP metadata */}
          <div className="w-full flex items-end justify-between pt-1.5 border-t border-amber-400/25 px-1">
            <div className="flex items-center gap-2">
              {cardData.showChipOrBarcode && <PVCChip className="scale-70 origin-left" />}
              <div className="flex flex-col text-left">
                <span className="text-[6.5px] text-stone-300 uppercase tracking-wider">
                  ОЙН ӨДӨР
                </span>
                <span className="text-[8px] font-bold text-amber-200">
                  {cardData.date}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <span className="text-[6.5px] text-stone-300 uppercase tracking-widest block">
                  ТӨЛӨВ
                </span>
                <span className="text-[8px] font-black tracking-widest text-amber-300">
                  ХҮНДЭТ ЗОЧИН
                </span>
              </div>
              <HologramSeal className="scale-85" />
            </div>
          </div>

        </div>
      ) : (
        /* ======================= HORIZONTAL LAYOUT (19x9 cm) ======================= */
        <div className="relative z-10 w-full h-full flex items-center p-5 md:p-6 gap-5">
          
          {/* LEFT COLUMN: School Photo Frame */}
          <div className="relative shrink-0 w-[35%] h-[84%] flex flex-col justify-center items-center">
            <div
              className={`relative w-full h-full overflow-hidden shadow-lg border-2 ${
                frontPhoto.showGoldBorder ? 'border-amber-400/70 shadow-amber-900/20' : 'border-white/20'
              } ${getPhotoFrameClasses()} bg-black/40`}
            >
              {/* Front School Photo */}
              <img
                src={frontPhoto.url}
                alt="School Front"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-200"
                style={{
                  transform: `scale(${frontPhoto.zoom}) translate(${frontPhoto.posX}%, ${frontPhoto.posY}%)`,
                }}
              />

              {/* Subtle inner shadow & lighting */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Photo caption badge at bottom */}
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between pointer-events-none">
                <span className="text-[7.5px] font-semibold text-amber-200 uppercase tracking-widest bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-xs border border-amber-400/30">
                  СУРГУУЛЬ • 50 ЖИЛ
                </span>
                <UlziiPattern size={12} color="#f6d365" />
              </div>
            </div>

            {/* Decorative small gold ring accent */}
            {frontPhoto.frameStyle === 'arch' && (
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-amber-300 bg-amber-500/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-200" />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Formal Invitation Details */}
          <div className="flex-1 h-full flex flex-col justify-between py-1 pr-2">
            
            {/* Top Section: School Header & 50 Jubilee Emblem */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                {Boolean(cardData.schoolNameEn?.trim()) && (
                  <div className="flex items-center gap-1.5 text-amber-300/90 text-[8px] md:text-[9px] font-bold tracking-widest uppercase mb-0.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>{cardData.schoolNameEn}</span>
                  </div>
                )}
                <h1 className="font-serif-display font-bold text-sm sm:text-base md:text-lg leading-tight tracking-wide text-white drop-shadow-sm line-clamp-2 mt-0.5">
                  {cardData.schoolName}
                </h1>
                <div className="mt-1.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/25 via-amber-400/40 to-amber-500/25 border border-amber-300/70 shadow-md">
                  <UlziiPattern size={12} color={theme.accentGold} />
                  <span className="text-xs sm:text-sm md:text-base font-serif font-black tracking-widest text-amber-200 uppercase drop-shadow">
                    {cardData.subTitle || 'ХҮНДЭТГЭЛИЙН УРИЛГА'}
                  </span>
                  <UlziiPattern size={12} color={theme.accentGold} />
                </div>
              </div>

              {/* 50th Anniversary Logo or Golden Jubilee Emblem */}
              {cardData.logoUrl ? (
                <div className="relative group shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/40 via-yellow-400/60 to-orange-500/40 blur-xs" />
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full p-0.5 bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-500 shadow-xl border-2 border-amber-300/80 overflow-hidden bg-black/40">
                    <img
                      src={cardData.logoUrl}
                      alt="62-р сургуулийн 50 жилийн ойн лого"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              ) : (
                <Golden50Emblem size="md" years={cardData.years} className="scale-95 md:scale-100" />
              )}
            </div>

            {/* Middle Section: Personalized Guest Plate */}
            <div className="my-auto py-1">
              <div className="relative p-2 sm:p-2.5 rounded-lg bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border border-amber-400/50 backdrop-blur-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[7.5px] uppercase tracking-widest text-amber-300/80 font-bold">
                    ХҮНДЭТ ЗОЧИН
                  </span>
                  <span className="text-[7.5px] font-mono text-amber-200/90 tracking-wider">
                    {cardData.cardNumber}
                  </span>
                </div>
                {cardData.guestName && !cardData.handwrittenName ? (
                  <>
                    <div className="font-serif-display font-extrabold text-sm sm:text-base md:text-lg text-amber-100 leading-snug tracking-normal mt-0.5 truncate">
                      {cardData.guestName}
                    </div>
                    {cardData.guestRole && (
                      <div className="text-[9px] text-amber-200/90 italic tracking-wide truncate">
                        {cardData.guestRole}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-1.5">
                    <div className="flex items-end gap-2 border-b-2 border-dotted border-amber-300/80 pb-0.5">
                      <span className="text-[9.5px] sm:text-[10.5px] text-amber-300/90 font-serif whitespace-nowrap font-medium">
                        Таныг урьж байна:
                      </span>
                      <span className="flex-1 text-[9px] sm:text-[10px] text-amber-100/40 font-mono tracking-widest text-center truncate">
                        ........................................................................
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[7.5px] text-amber-300/70 tracking-wider">
                      <span className="italic font-sans">✍ (Урилгын зочны нэрийг гараар бичих зай)</span>
                      <span className="italic font-serif">Хүндэт зочин танаа</span>
                    </div>
                  </div>
                )}
              </div>

              {/* School Motto */}
              <div className="mt-1.5 flex items-center gap-2">
                <OrnamentalDivider className="flex-1 opacity-70" color={theme.accentGold} />
                <p className="text-[8px] sm:text-[8.5px] italic text-stone-200/90 text-center font-serif-display px-1 truncate max-w-[80%]">
                  “{cardData.motto}”
                </p>
                <OrnamentalDivider className="flex-1 opacity-70" color={theme.accentGold} />
              </div>
            </div>

            {/* Bottom Section: Smart Chip, Hologram, Date & VIP metadata */}
            <div className="flex items-end justify-between pt-1 border-t border-amber-400/25">
              <div className="flex items-center gap-2.5">
                {cardData.showChipOrBarcode && <PVCChip className="scale-75 origin-left" />}
                <div className="flex flex-col">
                  <span className="text-[7px] text-stone-300 uppercase tracking-wider">
                    ОЙН ӨДӨР
                  </span>
                  <span className="text-[8.5px] font-bold text-amber-200">
                    {cardData.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className="text-[7px] text-stone-300 uppercase tracking-widest block">
                    ТӨЛӨВ
                  </span>
                  <span className="text-[8.5px] font-black tracking-widest text-amber-300">
                    ХҮНДЭТ ЗОЧИН
                  </span>
                </div>
                <HologramSeal className="scale-90" />
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Realistic PVC Finish Highlights */}
      {finish === 'glossy' && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40 z-30"
          style={{
            background:
              'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.7) 45%, transparent 55%)',
          }}
        />
      )}

      {finish === 'foil' && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-25 z-30 animate-pulse"
          style={{
            background:
              'radial-gradient(ellipse at 80% 20%, #ffd700 0%, #d4af37 40%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
};
