/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CardData, ThemeConfig } from '../types';
import {
  MongolianCorner,
  UlziiPattern,
  LanyardSlotHole,
} from './MongolianPatterns';
import { Calendar, Clock, MapPin, Phone, Award, Sparkles } from 'lucide-react';

interface PVCCardBackProps {
  cardData: CardData;
  theme: ThemeConfig;
  isPrintMode?: boolean;
}

export const PVCCardBack: React.FC<PVCCardBackProps> = ({
  cardData,
  theme,
  isPrintMode = false,
}) => {
  const { backPhoto, hasLanyardHole, showMongolianPatterns, finish } = cardData;
  const isVertical = cardData.orientation === 'vertical';

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
      id="pvc-card-back"
      className={`relative w-full ${
        isVertical ? 'aspect-[9/19]' : 'aspect-[19/9]'
      } overflow-hidden select-none text-white ${
        isPrintMode ? 'print-page shadow-none' : 'shadow-2xl rounded-2xl'
      } ${!cardData.customColors?.enabled ? `bg-gradient-to-br ${theme.bgGradient}` : ''}`}
      style={cardBackgroundStyle}
    >
      {/* Background Photo Mode (if set to backdrop) */}
      {backPhoto.frameStyle === 'backdrop' && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={backPhoto.url}
            alt="Back Memorial Backdrop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter blur-[1px]"
            style={{
              opacity: backPhoto.opacity * 0.4,
              transform: `scale(${backPhoto.zoom}) translate(${backPhoto.posX}%, ${backPhoto.posY}%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/80 to-stone-950/90" />
        </div>
      )}

      {/* Background Texture if provided (matching 62nd school solar amber warmth) */}
      {cardData.bgTextureUrl && cardData.useBgTexture !== false && backPhoto.frameStyle !== 'backdrop' && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-30 mix-blend-screen"
          style={{ backgroundImage: `url(${cardData.bgTextureUrl})` }}
        />
      )}

      {/* Solar Amber or Royal Violet Glow (adapts to theme) */}
      <div
        className="absolute -bottom-[15%] right-0 w-[110%] aspect-square rounded-full pointer-events-none mix-blend-screen opacity-30"
        style={{
          background:
            theme.id === 'purple-gold'
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(217, 119, 6, 0.2) 40%, transparent 80%)'
              : 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(249, 115, 22, 0.2) 40%, transparent 80%)',
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
          <div className="absolute top-2 left-2 z-20 pointer-events-none opacity-80">
            <MongolianCorner position="top-left" color={theme.accentGold} size={isVertical ? 20 : 24} />
          </div>
          <div className="absolute top-2 right-2 z-20 pointer-events-none opacity-80">
            <MongolianCorner position="top-right" color={theme.accentGold} size={isVertical ? 20 : 24} />
          </div>
          <div className="absolute bottom-2 left-2 z-20 pointer-events-none opacity-80">
            <MongolianCorner position="bottom-left" color={theme.accentGold} size={isVertical ? 20 : 24} />
          </div>
          <div className="absolute bottom-2 right-2 z-20 pointer-events-none opacity-80">
            <MongolianCorner position="bottom-right" color={theme.accentGold} size={isVertical ? 20 : 24} />
          </div>
        </>
      )}

      {/* ======================= VERTICAL LAYOUT (9x19 cm) ======================= */}
      {isVertical ? (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3.5 pt-6 text-stone-100">
          
          {/* Top Header */}
          <div className="flex flex-col items-center border-b border-amber-400/30 pb-1 px-1 text-center shrink-0">
            <div className="flex items-center gap-2 text-amber-200 font-serif font-black text-[10.5px] sm:text-xs uppercase tracking-widest drop-shadow-sm">
              <UlziiPattern size={12} color={theme.accentGold} />
              <span>ХҮНДЭТГЭЛИЙН УРИЛГА</span>
              <UlziiPattern size={12} color={theme.accentGold} />
            </div>
            <h2 className="text-[9px] sm:text-[9.5px] font-serif font-bold text-white tracking-wide mt-0.5">
              {cardData.schoolName}
            </h2>
            <span className="text-[6.5px] font-mono text-amber-300/80 tracking-widest mt-0.5">
              {cardData.years} • ТҮҮХТ 50 ЖИЛИЙН ОЙ
            </span>
          </div>

          {/* Memorial Photo Frame (if not backdrop) */}
          {backPhoto.frameStyle !== 'backdrop' && (
            <div className="relative w-full aspect-[16/7] max-h-[14%] my-1 rounded-lg overflow-hidden border border-amber-400/50 bg-black/50 shadow-md shrink-0">
              <img
                src={backPhoto.url}
                alt="Memorial / Teachers Gathering"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                style={{
                  opacity: backPhoto.opacity,
                  transform: `scale(${backPhoto.zoom}) translate(${backPhoto.posX}%, ${backPhoto.posY}%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0.5 left-2 right-2 text-center">
                <span className="text-[6.5px] text-amber-200 font-medium tracking-tight block truncate drop-shadow-sm">
                  Үе үеийн багш, ажилтан, төгсөгчдийн дурсгал
                </span>
              </div>
            </div>
          )}

          {/* Poem Card: "Эрдмийн Өргөө" & Additional Poem */}
          <div className="my-auto p-2 sm:p-2.5 rounded-xl bg-black/50 border border-amber-400/35 relative overflow-hidden shadow-md text-center">
            {/* Primary Poem */}
            <div className="flex items-center justify-center gap-1.5 mb-1 text-amber-300 font-serif font-bold text-[8.5px] tracking-wider uppercase">
              <Sparkles className="w-2.5 h-2.5 text-amber-400 shrink-0" />
              <span>{cardData.poemTitle || 'Эрдмийн Өргөө'}</span>
              <Sparkles className="w-2.5 h-2.5 text-amber-400 shrink-0" />
            </div>

            <div className="font-serif italic text-[7.5px] sm:text-[8px] text-amber-100/95 leading-relaxed text-center px-1 whitespace-pre-line">
              {cardData.poemText || `Мэдлэгийн их далайд хөлөг онгоц шиг аялж,\nМөрөөдлийн цэнхэр алсад далавч дэлгэн нисэхэд\nЭрдмийн түлхүүр атгуулсан ачтай сайхан сургууль минь,\nЭх дэлхийд намайг хүн болгосон өргөө минь...\n\nЭнэхүү түүхт мөчийг Эрхэм тантай хамт хуваалцахаар хүндэтгэн урьж байна.`}
            </div>

            {/* Second Poem (if enabled) */}
            {cardData.showSecondPoem && cardData.secondPoemText && (
              <div className="mt-1.5 pt-1.5 border-t border-amber-400/25">
                {cardData.secondPoemTitle && (
                  <div className="text-amber-300/95 font-serif font-bold text-[7.5px] uppercase tracking-wider mb-0.5">
                    ✦ {cardData.secondPoemTitle} ✦
                  </div>
                )}
                <div className="font-serif italic text-[7px] sm:text-[7.5px] text-amber-200/90 leading-snug whitespace-pre-line px-1">
                  {cardData.secondPoemText}
                </div>
              </div>
            )}

            {/* Dedication ribbon */}
            <div className="mt-1.5 pt-1 border-t border-amber-400/20 text-center">
              <span className="text-[6.5px] sm:text-[7px] font-medium text-amber-300 bg-amber-500/20 border border-amber-400/30 px-2 py-0.5 rounded-full inline-block tracking-tight">
                ✨ {cardData.dedicationText || '62-р сургуулийн хамт олон ба төгсөгчдөдөө зориулав'} ✨
              </span>
            </div>
          </div>

          {/* Formal Warm Invitation Text */}
          <div className="my-auto px-1 py-1">
            <p className="text-[7.5px] sm:text-[8px] text-stone-200 leading-relaxed font-serif-display text-justify whitespace-pre-line">
              {cardData.invitationBody}
            </p>
          </div>

          {/* Location & Time Info box */}
          <div className="rounded bg-black/45 border border-amber-400/25 p-1.5 space-y-1 text-[7.5px] my-1 shrink-0">
            <div className="flex items-center gap-1.5 text-stone-200">
              <Calendar className="w-2.5 h-2.5 text-amber-400 shrink-0" />
              <span className="truncate font-semibold">{cardData.date} • {cardData.time}</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-200">
              <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0" />
              <span className="truncate font-medium text-amber-200" title={cardData.venue}>{cardData.venue}</span>
            </div>
          </div>

          {/* Bottom Bar: QR Code, Barcode & Organizer */}
          <div className="flex items-center justify-between pt-1 border-t border-amber-400/25 px-1 shrink-0">
            <div className="flex flex-col text-left">
              <span className="text-[7px] text-amber-200 font-bold truncate max-w-[140px]">
                {cardData.organizer}
              </span>
              <span className="text-[6.5px] text-stone-300 flex items-center gap-1 mt-0.5">
                <Phone className="w-2 h-2 text-amber-400" />
                {cardData.contactPhone}
              </span>
            </div>

            {/* QR Code and Barcode */}
            <div className="flex items-center gap-2">
              {cardData.showQrCode !== false ? (
                <div className="p-0.5 rounded bg-white shadow-sm flex flex-col items-center">
                  <svg width="28" height="28" viewBox="0 0 29 29" fill="black" shapeRendering="crispEdges">
                    <path d="M0 0h7v7H0zM22 0h7v7h-7zM0 22h7v7H0zM2 2h3v3H2zM24 2h3v3h-3zM2 24h3v3H2zM9 1h1v3H9zM12 0h2v2h-2zM16 0h1v4h-1zM19 1h1v2h-1zM9 5h3v2H9zM14 4h3v3h-3zM18 5h2v2h-2zM0 9h2v2H0zM4 9h2v1H4zM7 9h2v3H7zM11 9h1v1h-1zM14 9h3v1h-3zM18 8h1v3h-1zM21 9h2v2h-2zM25 8h2v2h-2zM28 9h1v2h-1zM2 13h1v3H2zM5 12h2v2H5zM8 13h4v1H8zM14 12h2v3h-2zM18 13h1v2h-1zM20 12h3v2h-3zM25 12h1v1h-1zM28 13h1v3h-1zM9 16h2v3H9zM12 15h2v1h-2zM16 16h3v1h-3zM21 16h1v3h-1zM24 15h3v2h-3zM0 18h1v2H0zM3 18h3v1H3zM7 19h1v2H7zM13 18h2v3h-2zM17 18h2v1h-2zM27 18h2v2h-2zM9 21h1v1H9zM11 21h3v2h-3zM16 22h1v1h-1zM19 21h2v3h-2zM23 21h4v1h-4zM28 22h1v2h-1zM9 24h3v1H9zM14 25h1v3h-1zM17 24h2v2h-2zM20 25h3v1h-3zM25 24h2v3h-2zM9 27h3v2H9zM18 27h4v2h-4zM24 28h5v1h-5z" />
                  </svg>
                  <span className="text-[5px] font-mono text-stone-800 font-bold tracking-tighter leading-none mt-0.5">
                    {cardData.qrCodeLabel || 'БАЙРШИЛ'}
                  </span>
                </div>
              ) : (
                <div className="w-7 h-7 rounded border border-amber-400/40 bg-amber-500/10 flex items-center justify-center shadow-inner">
                  <UlziiPattern size={16} color={theme.accentGold} />
                </div>
              )}
              <div className="flex flex-col items-end">
                <div className="flex gap-[1px] h-2.5 items-end">
                  <div className="w-[1px] h-full bg-amber-300" />
                  <div className="w-[2px] h-full bg-amber-300" />
                  <div className="w-[1px] h-1.5 bg-amber-400/80" />
                  <div className="w-[2px] h-full bg-amber-300" />
                  <div className="w-[1px] h-full bg-amber-300" />
                </div>
                <span className="text-[5.5px] font-mono text-stone-300 mt-0.5">
                  {cardData.cardNumber}
                </span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* ======================= HORIZONTAL LAYOUT (19x9 cm) ======================= */
        <div className="relative z-10 w-full h-full flex items-stretch p-3.5 md:p-4 gap-3">
          
          {/* COLUMN 1: Memorial Photo & Commemorative Frame */}
          <div className="w-[28%] shrink-0 flex flex-col justify-between py-0.5">
            <div className="flex items-center justify-between text-amber-300 font-bold text-[8px] uppercase tracking-wider border-b border-amber-400/25 pb-0.5">
              <div className="flex items-center gap-1">
                <Award className="w-2.5 h-2.5 text-amber-400" />
                <span>ДУРСАМЖ</span>
              </div>
              <span className="text-[7px] font-mono text-amber-200/80">{cardData.years}</span>
            </div>

            {/* Photo Frame Container */}
            <div className="relative flex-1 my-1 rounded-lg overflow-hidden border border-amber-400/50 bg-black/50 shadow-md">
              <img
                src={backPhoto.url}
                alt="Memorial / Teachers Gathering"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                style={{
                  opacity: backPhoto.opacity,
                  transform: `scale(${backPhoto.zoom}) translate(${backPhoto.posX}%, ${backPhoto.posY}%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1 left-1.5 right-1.5 text-center">
                <span className="text-[6.5px] text-amber-200 font-medium tracking-tight block truncate drop-shadow-sm">
                  Үе үеийн багш, хамт олон
                </span>
              </div>
            </div>

            {/* Location & Time Info box */}
            <div className="rounded bg-black/45 border border-amber-400/25 p-1.5 space-y-0.5 text-[7px]">
              <div className="flex items-center gap-1.5 text-stone-200">
                <Calendar className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                <span className="truncate font-semibold">{cardData.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-200">
                <Clock className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                <span className="truncate">{cardData.time}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-200">
                <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                <span className="truncate font-medium text-amber-200" title={cardData.venue}>{cardData.venue}</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Poem "Эрдмийн Өргөө" & Warm Invitation */}
          <div className="flex-1 flex flex-col justify-between py-0.5 border-l border-r border-amber-400/20 px-3">
            
            {/* School Title */}
            <div className="flex items-center justify-between border-b border-amber-400/25 pb-0.5">
              <span className="text-[8px] uppercase tracking-wider text-amber-300 font-bold font-serif">
                {cardData.schoolName}
              </span>
              <UlziiPattern size={12} color={theme.accentGold} />
            </div>

            {/* Poem Container */}
            <div className="my-auto p-1.5 rounded-lg bg-black/45 border border-amber-400/35 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-0.5 text-amber-300 font-serif font-bold text-[7.5px] tracking-wide uppercase">
                <Sparkles className="w-2 h-2 text-amber-400 shrink-0" />
                <span>{cardData.poemTitle || 'Эрдмийн Өргөө'}</span>
                <Sparkles className="w-2 h-2 text-amber-400 shrink-0" />
              </div>
              <div className="font-serif italic text-[7px] text-amber-100/90 leading-tight whitespace-pre-line px-1">
                {cardData.poemText || `Мэдлэгийн их далайд хөлөг онгоц шиг аялж,\nМөрөөдлийн цэнхэр алсад далавч дэлгэн нисэхэд\nЭрдмийн түлхүүр атгуулсан ачтай сайхан сургууль минь,\nЭх дэлхийд намайг хүн болгосон өргөө минь...`}
              </div>

              {cardData.showSecondPoem && cardData.secondPoemText && (
                <div className="mt-1 pt-1 border-t border-amber-400/25">
                  {cardData.secondPoemTitle && (
                    <div className="text-amber-300/95 font-serif font-bold text-[6.5px] uppercase tracking-wider mb-0.5">
                      ✦ {cardData.secondPoemTitle} ✦
                    </div>
                  )}
                  <div className="font-serif italic text-[6.5px] text-amber-200/90 leading-tight whitespace-pre-line px-1">
                    {cardData.secondPoemText}
                  </div>
                </div>
              )}

              <div className="mt-1 pt-0.5 border-t border-amber-400/20">
                <span className="text-[6px] font-medium text-amber-300 bg-amber-500/15 px-2 py-0.2 rounded-full inline-block">
                  ✨ {cardData.dedicationText || '62-р сургуулийн хамт олон ба төгсөгчдөдөө зориулав'} ✨
                </span>
              </div>
            </div>

            {/* Warm Invitation Text */}
            <div className="my-0.5">
              <p className="text-[7.5px] text-stone-200 leading-snug font-serif-display text-justify whitespace-pre-line">
                {cardData.invitationBody}
              </p>
            </div>

            {/* Committee & Contact */}
            <div className="flex items-center justify-between pt-1 border-t border-amber-400/20 text-[7px]">
              <div>
                <span className="text-amber-200 font-bold block">
                  {cardData.organizer}
                </span>
                <span className="text-stone-300 flex items-center gap-1 mt-0.5 text-[6.5px]">
                  <Phone className="w-2 h-2 text-amber-400" />
                  {cardData.contactPhone}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[6px] text-amber-300/80 uppercase tracking-wider block">
                  ХҮНДЭТГЭЛИЙН УРИЛГА
                </span>
                <span className="text-[7px] font-mono text-stone-300">
                  {cardData.cardNumber}
                </span>
              </div>
            </div>

          </div>

          {/* COLUMN 3: QR Code, Barcode & Stamp */}
          <div className="w-[18%] shrink-0 flex flex-col justify-between items-center py-0.5 text-center">
            
            {/* Small 50 crest */}
            <div className="w-8 h-8 rounded-full border border-amber-400/50 bg-amber-500/10 flex flex-col items-center justify-center p-0.5 shadow-inner">
              <span className="font-serif-display font-extrabold text-[10px] leading-none text-amber-300">
                50
              </span>
              <span className="text-[4.5px] font-bold text-amber-200 uppercase tracking-tighter">
                СУРГУУЛЬ
              </span>
            </div>

            {/* QR Code Container */}
            {cardData.showQrCode !== false ? (
              <div className="p-1 rounded bg-white shadow-sm flex flex-col items-center">
                <svg width="42" height="42" viewBox="0 0 29 29" fill="black" shapeRendering="crispEdges">
                  <path d="M0 0h7v7H0zM22 0h7v7h-7zM0 22h7v7H0zM2 2h3v3H2zM24 2h3v3h-3zM2 24h3v3H2zM9 1h1v3H9zM12 0h2v2h-2zM16 0h1v4h-1zM19 1h1v2h-1zM9 5h3v2H9zM14 4h3v3h-3zM18 5h2v2h-2zM0 9h2v2H0zM4 9h2v1H4zM7 9h2v3H7zM11 9h1v1h-1zM14 9h3v1h-3zM18 8h1v3h-1zM21 9h2v2h-2zM25 8h2v2h-2zM28 9h1v2h-1zM2 13h1v3H2zM5 12h2v2H5zM8 13h4v1H8zM14 12h2v3h-2zM18 13h1v2h-1zM20 12h3v2h-3zM25 12h1v1h-1zM28 13h1v3h-1zM9 16h2v3H9zM12 15h2v1h-2zM16 16h3v1h-3zM21 16h1v3h-1zM24 15h3v2h-3zM0 18h1v2H0zM3 18h3v1H3zM7 19h1v2H7zM13 18h2v3h-2zM17 18h2v1h-2zM27 18h2v2h-2zM9 21h1v1H9zM11 21h3v2h-3zM16 22h1v1h-1zM19 21h2v3h-2zM23 21h4v1h-4zM28 22h1v2h-1zM9 24h3v1H9zM14 25h1v3h-1zM17 24h2v2h-2zM20 25h3v1h-3zM25 24h2v3h-2zM9 27h3v2H9zM18 27h4v2h-4zM24 28h5v1h-5z" />
                </svg>
                <span className="text-[5.5px] font-mono text-stone-800 font-bold mt-0.5 tracking-tighter">
                  {cardData.qrCodeLabel || 'БАЙРШИЛ'}
                </span>
              </div>
            ) : (
              <div className="w-11 h-11 rounded-lg border border-amber-400/40 bg-amber-500/10 flex flex-col items-center justify-center p-1 shadow-inner">
                <UlziiPattern size={22} color={theme.accentGold} />
                <span className="text-[5px] text-amber-300 font-serif font-bold mt-0.5">СОЁМБО</span>
              </div>
            )}

            {/* Barcode line representation */}
            <div className="w-full flex flex-col items-center">
              <div className="flex gap-[1.5px] h-3 items-end">
                <div className="w-[1px] h-full bg-amber-300" />
                <div className="w-[2px] h-full bg-amber-300" />
                <div className="w-[1px] h-2 bg-amber-400/80" />
                <div className="w-[2px] h-full bg-amber-300" />
                <div className="w-[1px] h-2 bg-amber-400/80" />
                <div className="w-[1px] h-full bg-amber-300" />
                <div className="w-[3px] h-full bg-amber-300" />
                <div className="w-[1px] h-2 bg-amber-400/80" />
                <div className="w-[2px] h-full bg-amber-300" />
                <div className="w-[1px] h-full bg-amber-300" />
              </div>
              <span className="text-[5.5px] font-mono text-amber-200/80 tracking-widest mt-0.5">
                1976-2026-PVC
              </span>
            </div>

          </div>

        </div>
      )}

      {/* Realistic PVC Finish Highlights */}
      {finish === 'glossy' && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-35 z-30"
          style={{
            background:
              'linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.6) 50%, transparent 60%)',
          }}
        />
      )}
    </div>
  );
};
