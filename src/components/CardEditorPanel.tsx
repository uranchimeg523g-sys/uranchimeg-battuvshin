/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CardData, FrameStyle, BackPhotoStyle, ThemeId, PVCVisualFinish, Orientation, CustomThemeColors } from '../types';
import { THEMES, school62LogoDefault, school62BgDefault, PRESET_POEMS } from '../data/constants';
import {
  Image as ImageIcon,
  FileText,
  Palette,
  Users,
  Printer,
  Upload,
  ZoomIn,
  Move,
  RotateCcw,
  Sparkles,
  Plus,
  Trash2,
  Download,
  Eye,
  CheckCircle2,
  ArrowUpDown,
  ArrowRightLeft,
  Sliders,
  Paintbrush,
  QrCode,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CardEditorPanelProps {
  cardData: CardData;
  onChange: (updater: (prev: CardData) => CardData) => void;
  onPrint: () => void;
  onDownloadPNG: (side: 'front' | 'back' | 'both') => void;
  isDownloading: boolean;
  activeSide: 'front' | 'back';
  setActiveSide: (side: 'front' | 'back') => void;
}

export const CardEditorPanel: React.FC<CardEditorPanelProps> = ({
  cardData,
  onChange,
  onPrint,
  onDownloadPNG,
  isDownloading,
  activeSide,
  setActiveSide,
}) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'text' | 'theme' | 'batch' | 'print'>('photos');
  const [batchNamesText, setBatchNamesText] = useState('');

  // Handle local image file upload
  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    side: 'front' | 'back'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      if (side === 'front') {
        onChange((prev) => ({
          ...prev,
          frontPhoto: { ...prev.frontPhoto, url: objectUrl },
        }));
        setActiveSide('front');
      } else {
        onChange((prev) => ({
          ...prev,
          backPhoto: { ...prev.backPhoto, url: objectUrl },
        }));
        setActiveSide('back');
      }

      // Small celebratory confetti
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
      });
    }
  };

  // Handle logo file upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      onChange((prev) => ({
        ...prev,
        logoUrl: objectUrl,
      }));
      setActiveSide('front');
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.8 },
      });
    }
  };

  // Apply 62nd School 50th Anniversary profile and matching solar amber background
  const applySchool62Theme = () => {
    onChange((prev) => ({
      ...prev,
      schoolName: 'НИЙСЛЭЛИЙН ЕРӨНХИЙ БОЛОВСРОЛЫН 62 ДУГААР СУРГУУЛЬ',
      schoolNameEn: '',
      subTitle: 'ТҮҮХТ 50 ЖИЛИЙН ОЙН ХҮНДЭТ УРИЛГА',
      years: '1976 – 2026',
      motto: '50 жилийн эрдмийн гэгээ, хийморийн түүчээ',
      themeId: 'school62-amber',
      orientation: 'vertical',
      logoUrl: school62LogoDefault,
      bgTextureUrl: school62BgDefault,
      useBgTexture: true,
      customColors: {
        enabled: false,
        bgStart: '#340d03',
        bgEnd: '#1a0501',
        cardBgHex: '#3d1206',
        accentGold: '#fbbf24',
        borderGold: '#f59e0b',
        textPrimary: '#ffffff',
        textSecondary: '#fed7aa',
      },
    }));
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  // Add program schedule item
  const handleAddProgramItem = () => {
    onChange((prev) => ({
      ...prev,
      programSchedule: [
        ...prev.programSchedule,
        { id: Date.now().toString(), time: '12:00', title: 'Шинэ арга хэмжээ' },
      ],
    }));
  };

  // Delete program schedule item
  const handleDeleteProgramItem = (id: string) => {
    onChange((prev) => ({
      ...prev,
      programSchedule: prev.programSchedule.filter((item) => item.id !== id),
    }));
  };

  // Apply batch guest names
  const handleApplyBatchNames = () => {
    const lines = batchNamesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (lines.length > 0) {
      onChange((prev) => ({
        ...prev,
        guestName: lines[0].startsWith('Эрхэм') ? lines[0] : `Эрхэм хүндэт ${lines[0]} танаа`,
      }));
      confetti({ particleCount: 40, spread: 60 });
    }
  };

  return (
    <div id="editor-control-panel" className="bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-2xl shadow-xl flex flex-col h-full max-h-[880px] overflow-hidden">
      
      {/* Top Tabs Bar */}
      <div className="flex border-b border-stone-800 bg-stone-950/60 p-1.5 gap-1 shrink-0 overflow-x-auto text-xs">
        <button
          id="tab-photos"
          onClick={() => setActiveTab('photos')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
            activeTab === 'photos'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Зураг оруулах</span>
        </button>

        <button
          id="tab-text"
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
            activeTab === 'text'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Бичвэр & Мэдээлэл</span>
        </button>

        <button
          id="tab-theme"
          onClick={() => setActiveTab('theme')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
            activeTab === 'theme'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Загвар & Материал</span>
        </button>

        <button
          id="tab-batch"
          onClick={() => setActiveTab('batch')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
            activeTab === 'batch'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Олон зочид</span>
        </button>

        <button
          id="tab-print"
          onClick={() => setActiveTab('print')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
            activeTab === 'print'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>Хэвлэх & Татах</span>
        </button>
      </div>

      {/* Persistent Quick Action Bar: Orientation & Card Side */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-stone-950/90 border-b border-stone-800 text-xs shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-stone-400 font-medium">Чиглэл:</span>
          <div className="flex rounded-lg bg-stone-900 p-0.5 border border-stone-700/80">
            <button
              type="button"
              onClick={() => onChange((prev) => ({ ...prev, orientation: 'horizontal' }))}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                cardData.orientation !== 'vertical'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <ArrowRightLeft className="w-3 h-3" />
              <span>Хэвтээ (19×9 см)</span>
            </button>
            <button
              type="button"
              onClick={() => onChange((prev) => ({ ...prev, orientation: 'vertical' }))}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                cardData.orientation === 'vertical'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <ArrowUpDown className="w-3 h-3" />
              <span>Босоо (9×19 см)</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-stone-400 font-medium">Тал:</span>
          <div className="flex rounded-lg bg-stone-900 p-0.5 border border-stone-700/80">
            <button
              type="button"
              onClick={() => setActiveSide('front')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                activeSide === 'front'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Урд тал
            </button>
            <button
              type="button"
              onClick={() => setActiveSide('back')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                activeSide === 'back'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Хойд тал
            </button>
          </div>
        </div>
      </div>

      {/* Tab Contents Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar text-stone-200 text-xs">
        
        {/* ===================== TAB 1: PHOTOS ===================== */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            
            {/* Quick Side Preview Switcher */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
              <span className="text-stone-400 font-medium">Засах тал:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setActiveSide('front')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    activeSide === 'front'
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  Урд тал (Сургууль)
                </button>
                <button
                  onClick={() => setActiveSide('back')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    activeSide === 'back'
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  Хойд тал (Дурсамж)
                </button>
              </div>
            </div>

            {/* FRONT SIDE PHOTO CONTROLS */}
            <div className={`p-4 rounded-xl border transition-all ${
              activeSide === 'front' ? 'border-amber-500/50 bg-amber-500/5' : 'border-stone-800 bg-stone-950/40'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <h3 className="font-bold text-amber-200 text-sm">Урд талын зураг (Сургуулийн төв байр)</h3>
                </div>
                <button
                  onClick={() => setActiveSide('front')}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Харах
                </button>
              </div>

              {/* Photo preview & Upload */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-20 h-16 rounded-lg overflow-hidden border border-amber-400/40 bg-stone-950 shrink-0">
                  <img
                    src={cardData.frontPhoto.url}
                    alt="Front thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 font-semibold cursor-pointer transition-all">
                    <Upload className="w-4 h-4" />
                    <span>Сургуулийн шинэ зураг хуулах</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, 'front')}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-stone-400">
                    PNG, JPG, WEBP формат дэмжинэ. Тод нягтаршилтай зураг тохиромжтой.
                  </p>
                </div>
              </div>

              {/* Zoom & Positioning */}
              <div className="space-y-3 pt-2 border-t border-stone-800/80">
                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span className="flex items-center gap-1"><ZoomIn className="w-3.5 h-3.5 text-amber-400" /> Томруулалт (Zoom)</span>
                    <span className="font-mono text-amber-300">{Math.round(cardData.frontPhoto.zoom * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="2.2"
                    step="0.05"
                    value={cardData.frontPhoto.zoom}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        frontPhoto: { ...prev.frontPhoto, zoom: parseFloat(e.target.value) },
                      }))
                    }
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-stone-300 mb-1">
                      <span className="flex items-center gap-1"><Move className="w-3.5 h-3.5 text-amber-400" /> Хэвтээ байрлал</span>
                      <span className="font-mono text-amber-300">{cardData.frontPhoto.posX}%</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="40"
                      value={cardData.frontPhoto.posX}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          frontPhoto: { ...prev.frontPhoto, posX: parseInt(e.target.value) },
                        }))
                      }
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-300 mb-1">
                      <span className="flex items-center gap-1"><Move className="w-3.5 h-3.5 text-amber-400" /> Босоо байрлал</span>
                      <span className="font-mono text-amber-300">{cardData.frontPhoto.posY}%</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="40"
                      value={cardData.frontPhoto.posY}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          frontPhoto: { ...prev.frontPhoto, posY: parseInt(e.target.value) },
                        }))
                      }
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Frame Style Select */}
                <div>
                  <span className="text-stone-300 block mb-1.5 font-medium">Жаазны хэлбэр (Frame style):</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'arch', name: 'Нуман хаалга' },
                      { id: 'rect', name: 'Тэгш өнцөгт' },
                      { id: 'oval', name: 'Зууван' },
                    ].map((frame) => (
                      <button
                        key={frame.id}
                        onClick={() =>
                          onChange((prev) => ({
                            ...prev,
                            frontPhoto: { ...prev.frontPhoto, frameStyle: frame.id as FrameStyle },
                          }))
                        }
                        className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                          cardData.frontPhoto.frameStyle === frame.id
                            ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                            : 'border-stone-800 bg-stone-900 text-stone-400 hover:bg-stone-800'
                        }`}
                      >
                        {frame.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BACK SIDE PHOTO CONTROLS */}
            <div className={`p-4 rounded-xl border transition-all ${
              activeSide === 'back' ? 'border-amber-500/50 bg-amber-500/5' : 'border-stone-800 bg-stone-950/40'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <h3 className="font-bold text-amber-200 text-sm">Хойд талын зураг (Багш, хамт олон, дурсамж)</h3>
                </div>
                <button
                  onClick={() => setActiveSide('back')}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Харах
                </button>
              </div>

              {/* Photo preview & Upload */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-20 h-16 rounded-lg overflow-hidden border border-amber-400/40 bg-stone-950 shrink-0">
                  <img
                    src={cardData.backPhoto.url}
                    alt="Back thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 font-semibold cursor-pointer transition-all">
                    <Upload className="w-4 h-4" />
                    <span>Дурсамж / Багш нарын зураг оруулах</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, 'back')}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-stone-400">
                    Үе үеийн багш нар, төгсөгчдийн түүхэн дурсамж зураг.
                  </p>
                </div>
              </div>

              {/* Zoom, Position & Opacity */}
              <div className="space-y-3 pt-2 border-t border-stone-800/80">
                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span className="flex items-center gap-1"><ZoomIn className="w-3.5 h-3.5 text-amber-400" /> Томруулалт</span>
                    <span className="font-mono text-amber-300">{Math.round(cardData.backPhoto.zoom * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="2.2"
                    step="0.05"
                    value={cardData.backPhoto.zoom}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        backPhoto: { ...prev.backPhoto, zoom: parseFloat(e.target.value) },
                      }))
                    }
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-stone-300 mb-1">
                      <span className="flex items-center gap-1"><Move className="w-3.5 h-3.5 text-amber-400" /> Хэвтээ байрлал</span>
                      <span className="font-mono text-amber-300">{cardData.backPhoto.posX}%</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="40"
                      value={cardData.backPhoto.posX}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          backPhoto: { ...prev.backPhoto, posX: parseInt(e.target.value) },
                        }))
                      }
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-300 mb-1">
                      <span className="flex items-center gap-1"><Move className="w-3.5 h-3.5 text-amber-400" /> Босоо байрлал</span>
                      <span className="font-mono text-amber-300">{cardData.backPhoto.posY}%</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="40"
                      value={cardData.backPhoto.posY}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          backPhoto: { ...prev.backPhoto, posY: parseInt(e.target.value) },
                        }))
                      }
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Display Style: Framed vs Backdrop */}
                <div>
                  <span className="text-stone-300 block mb-1.5 font-medium">Харуулах хэлбэр (Display style):</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'card', name: 'Зүүн талын жаазанд' },
                      { id: 'backdrop', name: 'Бүхэлд нь дэвсгэр болгох' },
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() =>
                          onChange((prev) => ({
                            ...prev,
                            backPhoto: { ...prev.backPhoto, frameStyle: style.id as BackPhotoStyle },
                          }))
                        }
                        className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                          cardData.backPhoto.frameStyle === style.id
                            ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                            : 'border-stone-800 bg-stone-900 text-stone-400 hover:bg-stone-800'
                        }`}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 50TH ANNIVERSARY OFFICIAL LOGO & SOLAR BACKGROUND (62-Р СУРГУУЛЬ) */}
            <div className="p-4 rounded-xl border border-amber-500/50 bg-gradient-to-br from-amber-500/10 via-amber-950/20 to-stone-950/60 shadow-lg shadow-amber-950/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-amber-200 text-sm">50 жилийн ойн лого & Нарны туяат дэвсгэр</h3>
                </div>
                <span className="text-[10px] text-amber-300 font-semibold bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                  62-р сургууль
                </span>
              </div>

              {/* Logo preview & Upload */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400/80 bg-stone-950 shrink-0 shadow-lg shadow-amber-950/50">
                  {cardData.logoUrl ? (
                    <img
                      src={cardData.logoUrl}
                      alt="50 Years Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-amber-300">
                      Логогүй
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 font-bold text-xs shadow-md transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Өөрийн лого оруулах</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          logoUrl: school62LogoDefault,
                        }))
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-stone-900 border border-amber-400/40 text-amber-300 hover:bg-stone-800 text-xs font-medium"
                    >
                      62-р лого сэргээх
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-400">
                    50 жилийн ойн алтан морь, сүлд, 1976-2026 тууз бүхий албан ёсны лого
                  </p>
                </div>
              </div>

              {/* Solar Background Texture Toggle */}
              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">
                    Ойн логод тохирох нарны гялбаат дэвсгэр
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Алтан шаргал & галт улбар дэвсгэрийн гялбааг идэвхжүүлэх
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cardData.useBgTexture !== false}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        useBgTexture: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {/* One-click apply 62nd school full profile */}
              <div className="mt-3 pt-2 border-t border-stone-800/80">
                <button
                  type="button"
                  onClick={applySchool62Theme}
                  className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-900/30 hover:brightness-110 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>62-р сургуулийн ойн босоо урилгын өнгө & дэвсгэрийг идэвхжүүлэх</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 2: TEXT & CONTENT ===================== */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            
            {/* School Name & Years */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <h4 className="font-bold text-amber-300">Сургуулийн нэр & Ойн мэдээлэл</h4>
              <div>
                <label className="block text-stone-400 mb-1">Сургуулийн монгол нэр:</label>
                <input
                  type="text"
                  value={cardData.schoolName}
                  onChange={(e) => onChange((prev) => ({ ...prev, schoolName: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 text-xs">Англи нэр (Хоосон байвал карт дээр гарахгүй):</label>
                <input
                  type="text"
                  value={cardData.schoolNameEn || ''}
                  onChange={(e) => onChange((prev) => ({ ...prev, schoolNameEn: e.target.value }))}
                  placeholder="Хоосон үлдээвэл карт дээр англи бичиг харагдахгүй"
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-300 text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1">Ойн он жилүүд:</label>
                  <input
                    type="text"
                    value={cardData.years}
                    onChange={(e) => onChange((prev) => ({ ...prev, years: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Гарчиг:</label>
                  <input
                    type="text"
                    value={cardData.subTitle}
                    onChange={(e) => onChange((prev) => ({ ...prev, subTitle: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Сургуулийн уриа үг:</label>
                <input
                  type="text"
                  value={cardData.motto}
                  onChange={(e) => onChange((prev) => ({ ...prev, motto: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Guest Name & Role */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-amber-300">Хүндэт зочин</h4>
                <label className="flex items-center gap-1.5 cursor-pointer text-xs text-amber-200 select-none">
                  <input
                    type="checkbox"
                    checked={cardData.handwrittenName !== false}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        handwrittenName: e.target.checked,
                        ...(e.target.checked ? { guestName: '' } : {}),
                      }))
                    }
                    className="accent-amber-500 rounded"
                  />
                  <span>✍ Гараар бичих (Нэр хоосон үлдээх)</span>
                </label>
              </div>

              {cardData.handwrittenName !== false ? (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-400/40 text-xs text-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <span>✍ Гараар бичих горим идэвхтэй байна</span>
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          handwrittenName: false,
                          guestName: 'Эрхэм хүндэт зочин танаа',
                        }))
                      }
                      className="text-[11px] text-amber-400 underline hover:text-amber-300"
                    >
                      Компьютероос нэр бичих
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    Урилгын нүүрэн талд <span className="text-amber-300 font-serif">“Таныг урьж байна: .............................”</span> гэсэн тусгай цэгтэй алтлаг хүрээтэй шугам гарч байгаа тул хэвлэсний дараа зочдынхоо нэрийг гараар бичнэ.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-stone-400 text-xs">Зочны нэр:</label>
                    <button
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          handwrittenName: true,
                          guestName: '',
                        }))
                      }
                      className="text-[10px] text-amber-400 underline"
                    >
                      Гараар бичихээр хоосон үлдээх
                    </button>
                  </div>
                  <input
                    type="text"
                    value={cardData.guestName}
                    onChange={(e) => onChange((prev) => ({ ...prev, guestName: e.target.value }))}
                    placeholder="Жишээ: Эрхэм хүндэт Д. Бат-Эрдэнэ танаа"
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none text-xs"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 text-xs">Зочны цол / үүрэг:</label>
                  <input
                    type="text"
                    value={cardData.guestRole}
                    onChange={(e) => onChange((prev) => ({ ...prev, guestRole: e.target.value }))}
                    placeholder="Жишээ: Ахмад багш, 1986 оны төгсөгч"
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 text-xs">PVC Карт дугаар:</label>
                  <input
                    type="text"
                    value={cardData.cardNumber}
                    onChange={(e) => onChange((prev) => ({ ...prev, cardNumber: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Poem & Dedication section ("Эрдмийн Өргөө" & 2-р шүлэг) */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h4 className="font-bold text-amber-300">Урилгын шүлэг & Зориулалт</h4>
                </div>
                <span className="text-[10px] text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  Урилгын гол бичвэр
                </span>
              </div>

              {/* Preset Poems quick selector */}
              <div className="space-y-1.5 pb-2 border-b border-stone-800">
                <label className="text-[11px] text-amber-200/90 font-semibold block">
                  📜 Бэлэн шүлгүүдээс сонгох:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_POEMS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          poemTitle: p.title,
                          poemText: p.text,
                          dedicationText: p.dedication,
                        }))
                      }
                      className="p-2 rounded-lg bg-stone-900 hover:bg-amber-500/20 border border-stone-700/80 hover:border-amber-400 text-left transition-all group"
                    >
                      <span className="text-[11px] font-bold text-amber-300 block group-hover:text-amber-200">
                        ✦ {p.title}
                      </span>
                      <span className="text-[9px] text-stone-400 block truncate mt-0.5">
                        {p.dedication}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Poem fields */}
              <div className="space-y-2.5">
                <div>
                  <label className="block text-stone-400 mb-1 text-xs">Үндсэн шүлгийн гарчиг:</label>
                  <input
                    type="text"
                    value={cardData.poemTitle || 'Эрдмийн Өргөө'}
                    onChange={(e) => onChange((prev) => ({ ...prev, poemTitle: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 text-xs">Үндсэн шүлгийн мөрүүд:</label>
                  <textarea
                    rows={5}
                    value={cardData.poemText || ''}
                    onChange={(e) => onChange((prev) => ({ ...prev, poemText: e.target.value }))}
                    placeholder="Мэдлэгийн их далайд хөлөг онгоц шиг аялж,&#10;Мөрөөдлийн цэнхэр алсад далавч дэлгэн нисэхэд..."
                    className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-white text-xs leading-relaxed focus:border-amber-400 focus:outline-none font-serif italic"
                  />
                </div>
              </div>

              {/* Second Poem Section (User Request: "өөр нэмээд шүлэг оруулаад өгнө үү?") */}
              <div className="p-3 rounded-lg bg-stone-900/90 border border-amber-500/30 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold text-amber-200 text-xs">Нэмэлт 2 дахь шүлэг</span>
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs text-amber-300 select-none">
                    <input
                      type="checkbox"
                      checked={cardData.showSecondPoem !== false}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          showSecondPoem: e.target.checked,
                        }))
                      }
                      className="accent-amber-500 rounded"
                    />
                    <span>Карт дээр харуулах</span>
                  </label>
                </div>

                {cardData.showSecondPoem !== false && (
                  <div className="space-y-2 pt-2 border-t border-stone-800">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-stone-400">Шүлэг сонгох:</span>
                      {PRESET_POEMS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() =>
                            onChange((prev) => ({
                              ...prev,
                              secondPoemTitle: p.title,
                              secondPoemText: p.text,
                            }))
                          }
                          className="px-2 py-0.5 rounded bg-stone-800 hover:bg-amber-500/20 text-[10px] text-amber-300 border border-stone-700 hover:border-amber-400/60"
                        >
                          {p.title}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-0.5 text-[11px]">2-р шүлгийн гарчиг:</label>
                      <input
                        type="text"
                        value={cardData.secondPoemTitle || ''}
                        onChange={(e) => onChange((prev) => ({ ...prev, secondPoemTitle: e.target.value }))}
                        placeholder="Жишээ: Эрдмийн алтан босго"
                        className="w-full px-2.5 py-1 rounded bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-0.5 text-[11px]">2-р шүлгийн мөрүүд:</label>
                      <textarea
                        rows={4}
                        value={cardData.secondPoemText || ''}
                        onChange={(e) => onChange((prev) => ({ ...prev, secondPoemText: e.target.value }))}
                        placeholder="Гучин таван үсгийн нууцыг тайлж өгсөн,&#10;Хорвоогийн уудамд жигүүр ургуулан нисгэсэн..."
                        className="w-full px-2.5 py-1.5 rounded bg-stone-950 border border-stone-700 text-white text-xs leading-relaxed focus:border-amber-400 focus:outline-none font-serif italic"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-stone-400 mb-1 text-xs">Зориулалтын үг (Тууз дээрх бичиг):</label>
                <input
                  type="text"
                  value={cardData.dedicationText || '62-р сургуулийн хамт олон ба төгсөгчдөдөө зориулав'}
                  onChange={(e) => onChange((prev) => ({ ...prev, dedicationText: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-amber-200 font-medium focus:border-amber-400 focus:outline-none text-xs"
                />
              </div>
            </div>

            {/* Invitation Letter Body */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <h4 className="font-bold text-amber-300">Урилгын хүндэтгэлийн бичвэр (Хойд тал)</h4>
              <textarea
                rows={3}
                value={cardData.invitationBody}
                onChange={(e) => onChange((prev) => ({ ...prev, invitationBody: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-white text-xs leading-relaxed focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Date, Time, Venue */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <h4 className="font-bold text-amber-300">Хэзээ, Хаана болох</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1">Огноо:</label>
                  <input
                    type="text"
                    value={cardData.date}
                    onChange={(e) => onChange((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Цаг:</label>
                  <input
                    type="text"
                    value={cardData.time}
                    onChange={(e) => onChange((prev) => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-stone-400">Болох газар (Хаяг):</label>
                  <button
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        venue: 'The Corporate Hotel and Convention Centre',
                        date: '2026 оны 10 дугаар сарын 07',
                      }))
                    }
                    className="text-[10px] text-amber-400 hover:text-amber-300 underline"
                  >
                    The Corporate (10 сарын 7) тохируулах
                  </button>
                </div>
                <input
                  type="text"
                  value={cardData.venue}
                  onChange={(e) => onChange((prev) => ({ ...prev, venue: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1">Зохион байгуулагч:</label>
                  <input
                    type="text"
                    value={cardData.organizer}
                    onChange={(e) => onChange((prev) => ({ ...prev, organizer: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Холбоо барих:</label>
                  <input
                    type="text"
                    value={cardData.contactPhone}
                    onChange={(e) => onChange((prev) => ({ ...prev, contactPhone: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* QR Code and Venue Map Section (User Question: "qr код нь юу байгаа вэ?") */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-amber-400" />
                  <h4 className="font-bold text-amber-300">QR код & Байршлын холбоос</h4>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer text-xs text-amber-300 select-none">
                  <input
                    type="checkbox"
                    checked={cardData.showQrCode !== false}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        showQrCode: e.target.checked,
                      }))
                    }
                    className="accent-amber-500 rounded"
                  />
                  <span>QR код харуулах</span>
                </label>
              </div>

              {/* Explanatory note explicitly answering the user's question */}
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-400/30 text-xs text-stone-300 space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <span>💡 QR кодонд юу байгаа вэ?</span>
                </span>
                <p className="text-[11px] leading-relaxed">
                  Энэхүү QR код нь зочид гар утсаараа уншуулахад <strong className="text-amber-200">The Corporate Hotel and Convention Centre</strong>-ийн Google Maps байршил болон ойн арга хэмжээний дэлгэрэнгүй мэдээллийг шууд нээж зааж өгөх зориулалттай холбоос юм.
                </p>
              </div>

              {cardData.showQrCode !== false && (
                <div className="space-y-2.5 pt-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-400 mb-1 text-xs">QR кодын доорх бичиг:</label>
                      <input
                        type="text"
                        value={cardData.qrCodeLabel || 'БАЙРШИЛ'}
                        onChange={(e) => onChange((prev) => ({ ...prev, qrCodeLabel: e.target.value }))}
                        placeholder="БАЙРШИЛ"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-medium focus:border-amber-400 focus:outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1 text-xs">Карт дугаар:</label>
                      <input
                        type="text"
                        value={cardData.cardNumber}
                        onChange={(e) => onChange((prev) => ({ ...prev, cardNumber: e.target.value }))}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1 text-xs">QR кодоор нээгдэх холбоос (URL):</label>
                    <input
                      type="text"
                      value={cardData.qrCodeText}
                      onChange={(e) => onChange((prev) => ({ ...prev, qrCodeText: e.target.value }))}
                      placeholder="https://maps.app.goo.gl/..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-amber-200 font-mono text-[11px] focus:border-amber-400 focus:outline-none"
                    />
                    <div className="flex gap-2 mt-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          onChange((prev) => ({
                            ...prev,
                            qrCodeText: 'https://maps.app.goo.gl/TheCorporateHotelConventionCentre',
                            qrCodeLabel: 'БАЙРШИЛ',
                          }))
                        }
                        className="text-[10px] text-amber-400 underline hover:text-amber-300"
                      >
                        📍 The Corporate Hotel Maps холбоос оруулах
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Program Timeline */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-300">Баярын хөтөлбөр (Цагийн хуваарь)</h4>
                  <p className="text-[10px] text-amber-400/90 mt-0.5">
                    ✓ Таны хүсэлтийн дагуу урилга дээрээс арилгаж, "Эрдмийн Өргөө" шүлгийг бүтнээр байршуулсан.
                  </p>
                </div>
                <button
                  onClick={handleAddProgramItem}
                  className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center gap-1 font-semibold text-[11px]"
                >
                  <Plus className="w-3.5 h-3.5" /> Нэмэх
                </button>
              </div>

              <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                {cardData.programSchedule.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => {
                        const newSchedule = [...cardData.programSchedule];
                        newSchedule[index].time = e.target.value;
                        onChange((prev) => ({ ...prev, programSchedule: newSchedule }));
                      }}
                      className="w-24 px-2 py-1 rounded bg-stone-900 border border-stone-700 text-amber-300 font-mono text-center focus:outline-none"
                    />
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const newSchedule = [...cardData.programSchedule];
                        newSchedule[index].title = e.target.value;
                        onChange((prev) => ({ ...prev, programSchedule: newSchedule }));
                      }}
                      className="flex-1 px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-white focus:outline-none"
                    />
                    <button
                      onClick={() => handleDeleteProgramItem(item.id)}
                      className="p-1 rounded text-stone-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 3: THEME & PVC FINISH ===================== */}
        {activeTab === 'theme' && (
          <div className="space-y-5">
            
            {/* 1. Orientation Selection */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-amber-400" />
                  <h4 className="font-bold text-amber-300">Картын чиглэл / Хэмжээ (19x9 см)</h4>
                </div>
                <span className="text-[10px] text-amber-200/80 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {cardData.orientation === 'vertical' ? 'Босоо (90×190 мм)' : 'Хэвтээ (190×90 мм)'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onChange((prev) => ({ ...prev, orientation: 'horizontal' }))}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    cardData.orientation !== 'vertical'
                      ? 'border-amber-400 bg-amber-500/15 shadow-md shadow-amber-500/10'
                      : 'border-stone-800 bg-stone-900 hover:bg-stone-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
                      Хэвтээ карт
                    </span>
                    <span className="w-6 h-3.5 rounded border border-amber-400/60 bg-amber-400/20 inline-block" />
                  </div>
                  <div className="text-[10px] text-stone-400">190 x 90 мм • Сонгодог урилга</div>
                </button>

                <button
                  type="button"
                  onClick={() => onChange((prev) => ({ ...prev, orientation: 'vertical' }))}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    cardData.orientation === 'vertical'
                      ? 'border-amber-400 bg-amber-500/15 shadow-md shadow-amber-500/10'
                      : 'border-stone-800 bg-stone-900 hover:bg-stone-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                      Босоо карт
                    </span>
                    <span className="w-3.5 h-6 rounded border border-amber-400/60 bg-amber-400/20 inline-block" />
                  </div>
                  <div className="text-[10px] text-stone-400">90 x 190 мм • Хүзүүний хүндэт бэйж</div>
                </button>
              </div>
            </div>

            {/* 2. Color Palette Choices (Preset Themes) */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-amber-300">50 жилийн ойн бэлэн өнгөний хослолууд</h4>
                <span className="text-[10px] text-stone-400">8 төрлийн тансаг загвар</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {Object.values(THEMES).map((theme) => {
                  const isSelected = !cardData.customColors?.enabled && cardData.themeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          themeId: theme.id,
                          customColors: {
                            ...prev.customColors,
                            enabled: false,
                          },
                        }))
                      }
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/15 shadow-md shadow-amber-500/10'
                          : 'border-stone-800 bg-stone-900 hover:bg-stone-800/80'
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-lg border border-amber-300/40 shrink-0 shadow-sm"
                        style={{ backgroundColor: theme.cardBgHex }}
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-white text-xs truncate">{theme.name}</div>
                        <div className="text-[10px] text-stone-400 truncate">{theme.nameEn}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Custom Color Controls (Өнгө өөрчлөх) */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Paintbrush className="w-4 h-4 text-amber-400" />
                  <h4 className="font-bold text-amber-300">Өөрийн өнгө тохируулах (Custom Colors)</h4>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!cardData.customColors?.enabled}
                    onChange={(e) => {
                      const enabled = e.target.checked;
                      onChange((prev) => ({
                        ...prev,
                        customColors: {
                          enabled,
                          bgStart: prev.customColors?.bgStart || '#0a0d14',
                          bgEnd: prev.customColors?.bgEnd || '#121824',
                          accentGold: prev.customColors?.accentGold || '#d4af37',
                          borderGold: prev.customColors?.borderGold || '#fef08a',
                          cardBgHex: prev.customColors?.cardBgHex || '#0a0d14',
                          textPrimary: prev.customColors?.textPrimary || '#ffffff',
                          textSecondary: prev.customColors?.textSecondary || '#e2e8f0',
                        },
                      }));
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {cardData.customColors?.enabled ? (
                <div className="space-y-4 pt-1 border-t border-stone-800/80">
                  {/* Quick Color Presets */}
                  <div>
                    <span className="text-[11px] text-stone-400 font-medium block mb-2">
                      Түргэн өнгөний хослолууд (1-товчоор сонгох):
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        {
                          name: 'Хааны Нил Яагаан & Алт',
                          bgStart: '#19042b',
                          bgEnd: '#120320',
                          accentGold: '#fcd34d',
                          borderGold: '#f59e0b',
                          textPrimary: '#ffffff',
                          textSecondary: '#e9d5ff',
                        },
                        {
                          name: '62-р сургууль: Галт Улбар',
                          bgStart: '#340d03',
                          bgEnd: '#1a0501',
                          accentGold: '#fbbf24',
                          borderGold: '#f59e0b',
                          textPrimary: '#ffffff',
                          textSecondary: '#fed7aa',
                        },
                        {
                          name: 'Хаш Хар & Алт',
                          bgStart: '#08080a',
                          bgEnd: '#14141c',
                          accentGold: '#d4af37',
                          borderGold: '#fef08a',
                          textPrimary: '#ffffff',
                          textSecondary: '#e2e8f0',
                        },
                        {
                          name: 'Номин Цэнхэр & Мөнгө',
                          bgStart: '#061727',
                          bgEnd: '#020b14',
                          accentGold: '#cbd5e1',
                          borderGold: '#f8fafc',
                          textPrimary: '#ffffff',
                          textSecondary: '#94a3b8',
                        },
                        {
                          name: 'Бадмаараг & Алт',
                          bgStart: '#300812',
                          bgEnd: '#130206',
                          accentGold: '#e5ad6d',
                          borderGold: '#fef08a',
                          textPrimary: '#ffffff',
                          textSecondary: '#fbcfe8',
                        },
                        {
                          name: 'Маргад & Алт',
                          bgStart: '#042318',
                          bgEnd: '#02110c',
                          accentGold: '#eab308',
                          borderGold: '#fef9c3',
                          textPrimary: '#ffffff',
                          textSecondary: '#dcfce7',
                        },
                        {
                          name: 'Гүн Нил & Алт',
                          bgStart: '#200830',
                          bgEnd: '#0d0214',
                          accentGold: '#f59e0b',
                          borderGold: '#fef3c7',
                          textPrimary: '#ffffff',
                          textSecondary: '#e9d5ff',
                        },
                        {
                          name: 'Сувдан & Алт',
                          bgStart: '#272421',
                          bgEnd: '#121110',
                          accentGold: '#d4af37',
                          borderGold: '#fde047',
                          textPrimary: '#ffffff',
                          textSecondary: '#e7e5e4',
                        },
                      ].map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                enabled: true,
                                bgStart: preset.bgStart,
                                bgEnd: preset.bgEnd,
                                accentGold: preset.accentGold,
                                borderGold: preset.borderGold,
                                cardBgHex: preset.bgStart,
                                textPrimary: preset.textPrimary,
                                textSecondary: preset.textSecondary,
                              },
                            }));
                          }}
                          className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-[10px] text-stone-300 flex items-center gap-1.5 transition-all text-left"
                        >
                          <div
                            className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20"
                            style={{
                              background: `linear-gradient(135deg, ${preset.bgStart} 50%, ${preset.accentGold} 50%)`,
                            }}
                          />
                          <span className="truncate">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Color Pickers */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {/* Background Gradient Start */}
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <label className="text-[10px] text-stone-400 block mb-1.5">
                        Дэвсгэрийн эхлэл өнгө:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cardData.customColors?.bgStart || '#0a0d14'}
                          onChange={(e) =>
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                ...(prev.customColors as CustomThemeColors),
                                bgStart: e.target.value,
                                cardBgHex: e.target.value,
                              },
                            }))
                          }
                          className="w-8 h-8 rounded border border-stone-700 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={cardData.customColors?.bgStart || '#0a0d14'}
                          onChange={(e) =>
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                ...(prev.customColors as CustomThemeColors),
                                bgStart: e.target.value,
                                cardBgHex: e.target.value,
                              },
                            }))
                          }
                          className="flex-1 px-2 py-1 rounded bg-stone-950 border border-stone-700 text-stone-200 font-mono text-[11px] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Background Gradient End */}
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <label className="text-[10px] text-stone-400 block mb-1.5">
                        Дэвсгэрийн төгсгөл өнгө:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cardData.customColors?.bgEnd || '#121824'}
                          onChange={(e) =>
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                ...(prev.customColors as CustomThemeColors),
                                bgEnd: e.target.value,
                              },
                            }))
                          }
                          className="w-8 h-8 rounded border border-stone-700 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={cardData.customColors?.bgEnd || '#121824'}
                          onChange={(e) =>
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                ...(prev.customColors as CustomThemeColors),
                                bgEnd: e.target.value,
                              },
                            }))
                          }
                          className="flex-1 px-2 py-1 rounded bg-stone-950 border border-stone-700 text-stone-200 font-mono text-[11px] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Accent Gold / Border */}
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <label className="text-[10px] text-stone-400 block mb-1.5">
                        Алтан эмблем & Хээний өнгө:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cardData.customColors?.accentGold || '#d4af37'}
                          onChange={(e) =>
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                ...(prev.customColors as CustomThemeColors),
                                accentGold: e.target.value,
                              },
                            }))
                          }
                          className="w-8 h-8 rounded border border-stone-700 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={cardData.customColors?.accentGold || '#d4af37'}
                          onChange={(e) =>
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                ...(prev.customColors as CustomThemeColors),
                                accentGold: e.target.value,
                              },
                            }))
                          }
                          className="flex-1 px-2 py-1 rounded bg-stone-950 border border-stone-700 text-stone-200 font-mono text-[11px] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Border Gold */}
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <label className="text-[10px] text-stone-400 block mb-1.5">
                        Хүрээний алт / гялбааны өнгө:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cardData.customColors?.borderGold || '#fef08a'}
                          onChange={(e) =>
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                ...(prev.customColors as CustomThemeColors),
                                borderGold: e.target.value,
                              },
                            }))
                          }
                          className="w-8 h-8 rounded border border-stone-700 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={cardData.customColors?.borderGold || '#fef08a'}
                          onChange={(e) =>
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                ...(prev.customColors as CustomThemeColors),
                                borderGold: e.target.value,
                              },
                            }))
                          }
                          className="flex-1 px-2 py-1 rounded bg-stone-950 border border-stone-700 text-stone-200 font-mono text-[11px] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Text Primary Color */}
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <label className="text-[10px] text-stone-400 block mb-1.5">
                        Үндсэн текстийн өнгө:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cardData.customColors?.textPrimary || '#ffffff'}
                          onChange={(e) =>
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                ...(prev.customColors as CustomThemeColors),
                                textPrimary: e.target.value,
                              },
                            }))
                          }
                          className="w-8 h-8 rounded border border-stone-700 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={cardData.customColors?.textPrimary || '#ffffff'}
                          onChange={(e) =>
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                ...(prev.customColors as CustomThemeColors),
                                textPrimary: e.target.value,
                              },
                            }))
                          }
                          className="flex-1 px-2 py-1 rounded bg-stone-950 border border-stone-700 text-stone-200 font-mono text-[11px] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Text Secondary Color */}
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <label className="text-[10px] text-stone-400 block mb-1.5">
                        Дэд текстийн өнгө:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cardData.customColors?.textSecondary || '#e2e8f0'}
                          onChange={(e) =>
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                ...(prev.customColors as CustomThemeColors),
                                textSecondary: e.target.value,
                              },
                            }))
                          }
                          className="w-8 h-8 rounded border border-stone-700 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={cardData.customColors?.textSecondary || '#e2e8f0'}
                          onChange={(e) =>
                            onChange((prev) => ({
                              ...prev,
                              customColors: {
                                ...(prev.customColors as CustomThemeColors),
                                textSecondary: e.target.value,
                              },
                            }))
                          }
                          className="flex-1 px-2 py-1 rounded bg-stone-950 border border-stone-700 text-stone-200 font-mono text-[11px] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-stone-400 italic">
                  Дээрх товчийг идэвхжүүлж дурын дэвсгэр өнгө, алтан хүрээ, текстийн өнгөө нарийвчлан тохируулна уу.
                </p>
              )}
            </div>

            {/* 4. PVC Material Finish */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <h4 className="font-bold text-amber-300">PVC Картын бүрээс (Finish effect)</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'glossy', name: 'Гялгар лак (Glossy)', desc: 'Гэрэл ойх туяатай' },
                  { id: 'matte', name: 'Торгомсог (Matte)', desc: 'Тайван энгийн гадарга' },
                  { id: 'foil', name: 'Алтан фольга (Foil)', desc: 'Алтан гялбаатай' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onChange((prev) => ({ ...prev, finish: f.id as PVCVisualFinish }))}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      cardData.finish === f.id
                        ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                        : 'border-stone-800 bg-stone-900 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    <div className="font-bold text-xs">{f.name}</div>
                    <div className="text-[9px] text-stone-400 mt-0.5">{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Elements Toggles */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2.5">
              <h4 className="font-bold text-amber-300">Картны нэмэлт тоноглол</h4>

              <label className="flex items-center justify-between p-2 rounded-lg bg-stone-900 cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-200 block">Хүзүүний оосорны нүх (Lanyard slot)</span>
                  <span className="text-[10px] text-stone-400">Картны дээд хэсэгт туузан оосрын нүх үзүүлэх</span>
                </div>
                <input
                  type="checkbox"
                  checked={cardData.hasLanyardHole}
                  onChange={(e) => onChange((prev) => ({ ...prev, hasLanyardHole: e.target.checked }))}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-stone-900 cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-200 block">Монгол уламжлалт хээ (Алхан хээ, өлзий)</span>
                  <span className="text-[10px] text-stone-400">Булангуудад үндэсний хээгээр хүрээлэх</span>
                </div>
                <input
                  type="checkbox"
                  checked={cardData.showMongolianPatterns}
                  onChange={(e) => onChange((prev) => ({ ...prev, showMongolianPatterns: e.target.checked }))}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-stone-900 cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-200 block">PVC Смарт чип & Голограмм тамга</span>
                  <span className="text-[10px] text-stone-400">Урд талд чип, голограмм бэлгэдэл харуулах</span>
                </div>
                <input
                  type="checkbox"
                  checked={cardData.showChipOrBarcode}
                  onChange={(e) => onChange((prev) => ({ ...prev, showChipOrBarcode: e.target.checked }))}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
              </label>
            </div>

          </div>
        )}

        {/* ===================== TAB 4: BATCH GUEST NAMES ===================== */}
        {activeTab === 'batch' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-amber-300">Олон зочдод нэрээр нь урилга бэлтгэх</h4>
              </div>
              <p className="text-stone-300 text-xs leading-relaxed">
                Доорх талбарт урих зочдын нэрсийг мөр бүрт нэгээр бичиж эсвэл Excel/Word-оос хуулж оруулаад сонгоно уу.
              </p>

              <textarea
                rows={5}
                placeholder="Эрхэм хүндэт Д. Бат-Эрдэнэ танаа&#10;Эрхэм хүндэт Ц. Болормаа танаа&#10;Эрхэм хүндэт М. Энхболд танаа"
                value={batchNamesText}
                onChange={(e) => setBatchNamesText(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-stone-900 border border-stone-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
              />

              <button
                onClick={handleApplyBatchNames}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Эхний нэрсийг карт дээр оруулах</span>
              </button>
            </div>

            {/* Quick Sample Selector */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2.5">
              <span className="font-bold text-stone-300 block">Бэлэн загвар нэрсээс сонгох:</span>
              <div className="space-y-1.5">
                {[
                  { name: 'Эрхэм хүндэт Д. Бат-Эрдэнэ танаа', role: 'Ахмад багш, 1986 оны төгсөгч', no: '№ 50-2026-001' },
                  { name: 'Эрхэм хүндэт Ц. Болормаа танаа', role: 'Гавьяат багш, Захирал асан', no: '№ 50-2026-002' },
                  { name: 'Эрхэм хүндэт М. Энхболд танаа', role: '1996 оны Алтан төгсөгч', no: '№ 50-2026-003' },
                  { name: 'Эрхэм хүндэт С. Оюунбилэг танаа', role: 'Эцэг эхийн зөвлөлийн дарга', no: '№ 50-2026-004' },
                ].map((sample, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        guestName: sample.name,
                        guestRole: sample.role,
                        cardNumber: sample.no,
                      }))
                    }
                    className="w-full p-2 rounded-lg bg-stone-900 hover:bg-amber-500/15 border border-stone-800 hover:border-amber-400/50 text-left flex items-center justify-between transition-all"
                  >
                    <div>
                      <span className="font-bold text-white text-xs block">{sample.name}</span>
                      <span className="text-[10px] text-stone-400">{sample.role}</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300">{sample.no}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 5: PRINT & EXPORT ===================== */}
        {activeTab === 'print' && (
          <div className="space-y-4">
            
            <div className="p-4 rounded-xl bg-stone-950/70 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-amber-300 text-sm">PVC 19x9 см Стандарт хэвлэлт</h4>
              </div>
              <p className="text-stone-300 text-xs leading-relaxed">
                Энэхүү урилга нь <strong className="text-amber-200">190мм x 90мм (19x9 см)</strong> стандарт PVC болон хүндэтгэлийн зузаан цаасан урилгын хэмжээгээр тооцоологдсон. Урд болон хойд талыг тусад нь эсвэл хоёр талт (Duplex) байдлаар шууд хэвлэх боломжтой.
              </p>

              <button
                id="btn-print-direct"
                onClick={onPrint}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                <span>Шууд хэвлэх (Ctrl + P / Print PDF)</span>
              </button>
            </div>

            {/* High-Res Image Downloads */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <h4 className="font-bold text-amber-300">Өндөр чанартай зураг (PNG 19x9) татах</h4>
              <p className="text-[11px] text-stone-400">
                Хэвлэх үйлдвэр (хэвлэлийн газар) эсвэл сошиал сувгаар урилга илгээхэд зориулсан 300 DPI нягтаршилтай экспорт.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  id="btn-download-front"
                  disabled={isDownloading}
                  onClick={() => onDownloadPNG('front')}
                  className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold transition-all flex items-center justify-center gap-1.5 border border-stone-700 disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Урд талыг татах (PNG)</span>
                </button>

                <button
                  id="btn-download-back"
                  disabled={isDownloading}
                  onClick={() => onDownloadPNG('back')}
                  className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold transition-all flex items-center justify-center gap-1.5 border border-stone-700 disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Хойд талыг татах (PNG)</span>
                </button>
              </div>
            </div>

            {/* PVC Card Specifications details */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2 text-[11px] text-stone-400">
              <div className="flex justify-between border-b border-stone-800 pb-1">
                <span>Хэмжээс (Dimensions):</span>
                <span className="font-mono text-stone-200">190 mm x 90 mm</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-1">
                <span>Харьцаа (Aspect Ratio):</span>
                <span className="font-mono text-stone-200">19 : 9 (~2.11 : 1)</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-1">
                <span>Материал (Material):</span>
                <span className="font-mono text-stone-200">PVC 0.76mm / 300-350g бүрсэн цаас</span>
              </div>
              <div className="flex justify-between">
                <span>Булангийн радиус (Corner Radius):</span>
                <span className="font-mono text-stone-200">R3 - R5 mm дугуйрсан</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
