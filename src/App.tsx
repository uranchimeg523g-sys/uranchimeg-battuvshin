/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { CardData } from './types';
import { INITIAL_CARD_DATA, THEMES, resolveTheme } from './data/constants';
import { InteractiveCardViewer } from './components/InteractiveCardViewer';
import { CardEditorPanel } from './components/CardEditorPanel';
import { PrintSheet } from './components/PrintSheet';
import { Golden50Emblem, UlziiPattern } from './components/MongolianPatterns';
import { Printer, Download, Sparkles, HelpCircle } from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

export default function App() {
  const [cardData, setCardData] = useState<CardData>(INITIAL_CARD_DATA);
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSpecsModal, setShowSpecsModal] = useState(false);

  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);

  const currentTheme = resolveTheme(cardData);

  // Handle high-resolution PNG downloads
  const handleDownloadPNG = async (side: 'front' | 'back' | 'both') => {
    setIsDownloading(true);

    try {
      if (side === 'front' || side === 'both') {
        if (frontRef.current) {
          const dataUrl = await toPng(frontRef.current, {
            pixelRatio: 2.5,
            cacheBust: true,
          });
          const link = document.createElement('a');
          link.download = `PVC-19x9-School-50th-FRONT-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
        }
      }

      if (side === 'back' || side === 'both') {
        if (backRef.current) {
          const dataUrl = await toPng(backRef.current, {
            pixelRatio: 2.5,
            cacheBust: true,
          });
          const link = document.createElement('a');
          link.download = `PVC-19x9-School-50th-BACK-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
        }
      }

      confetti({
        particleCount: 40,
        spread: 60,
      });
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Browser Print trigger
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* HEADER / NAVIGATION (Hidden when printing) */}
      <header className="no-print sticky top-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800 px-4 lg:px-8 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & School 50 Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-amber-400/60 bg-gradient-to-br from-amber-400/20 to-amber-700/30 flex items-center justify-center p-1 shadow-md shadow-amber-500/10 shrink-0">
              <span className="font-serif-display font-extrabold text-sm gold-text-shimmer">
                50
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-display font-bold text-sm sm:text-base md:text-lg text-white tracking-wide">
                  Сургуулийн 50 жилийн ойн PVC урилга
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-400/30">
                  19 x 9 см
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                Урд ба хойд талын зурагтай, хэвлэлтийн 190×90 мм стандарт загвар
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowSpecsModal(!showSpecsModal)}
              title="PVC 19x9 хэмжээсийн тодорхойлолт"
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs flex items-center gap-1.5 transition-all"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Хэмжээсийн заавар</span>
            </button>

            <button
              onClick={() => handleDownloadPNG(activeSide)}
              disabled={isDownloading}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">{activeSide === 'front' ? 'Урд тал' : 'Хойд тал'}</span> PNG татах
            </button>

            <button
              id="header-btn-print"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Хэвлэх (19×9)</span>
            </button>
          </div>

        </div>
      </header>

      {/* PVC 19x9 INFO POPUP MODAL */}
      {showSpecsModal && (
        <div className="no-print fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif-display font-bold text-lg text-amber-300 flex items-center gap-2">
                <UlziiPattern size={20} color="#f6d365" />
                <span>PVC 19x9 см Урилгын стандарт</span>
              </h3>
              <button
                onClick={() => setShowSpecsModal(false)}
                className="text-stone-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="text-xs text-stone-300 space-y-2.5 leading-relaxed">
              <p>
                <strong>19 x 9 см (190мм × 90мм)</strong> хэмжээтэй урилга нь Монголын сургууль, байгууллагуудын түүхт ойн баярын хүндэтгэлийн карт, туузан оосортой PVC карт, болон хүндэтгэлийн хавтсан урилгад өргөн хэрэглэгддэг албан ёсны формат юм.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-stone-300">
                <li><strong className="text-amber-200">Урд тал:</strong> Сургуулийн барилга, албан нэр, 50 жилийн алтан бэлгэдэл, хүндэт зочны нэр.</li>
                <li><strong className="text-amber-200">Хойд тал:</strong> Багш нарын дурсамж зураг, ойн мэндчилгээ, баярын хөтөлбөр, он сар, хаяг, QR код.</li>
                <li><strong className="text-amber-200">Хэвлэх:</strong> Хэвлэх үед автоматаар 190×90 мм хуудсаар тохируулагдана. Хэвлэлийн үйлдвэрт PNG-ээр өгч болно.</li>
              </ul>
            </div>

            <button
              onClick={() => setShowSpecsModal(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
            >
              Ойлголоо
            </button>
          </div>
        </div>
      )}

      {/* MAIN WORKSPACE LAYOUT (Hidden when printing) */}
      <main className="no-print flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (7 Cols): 3D PVC Interactive Card View & Dual View */}
        <section className="lg:col-span-7 flex flex-col space-y-4">
          <InteractiveCardViewer
            cardData={cardData}
            theme={currentTheme}
            activeSide={activeSide}
            setActiveSide={setActiveSide}
            onPrint={handlePrint}
            frontRef={frontRef}
            backRef={backRef}
          />
        </section>

        {/* RIGHT COLUMN (5 Cols): Complete Customization & Photo Editor Panel */}
        <section className="lg:col-span-5 h-full">
          <CardEditorPanel
            cardData={cardData}
            onChange={setCardData}
            onPrint={handlePrint}
            onDownloadPNG={handleDownloadPNG}
            isDownloading={isDownloading}
            activeSide={activeSide}
            setActiveSide={setActiveSide}
          />
        </section>

      </main>

      {/* PRINT-ONLY COMPONENT (Outputs exact 190x90mm pages on print) */}
      <PrintSheet cardData={cardData} theme={currentTheme} />

      {/* FOOTER (Hidden when printing) */}
      <footer className="no-print border-t border-stone-800/80 bg-stone-950/60 py-3 px-4 text-center text-xs text-stone-400 shrink-0">
        <p>
          Сургуулийн 50 жилийн ойн хүндэтгэлийн PVC урилга (190 × 90 мм) • Урд болон хойд талын зурагтай
        </p>
      </footer>

    </div>
  );
}
