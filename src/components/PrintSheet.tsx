/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CardData, ThemeConfig } from '../types';
import { PVCCardFront } from './PVCCardFront';
import { PVCCardBack } from './PVCCardBack';

interface PrintSheetProps {
  cardData: CardData;
  theme: ThemeConfig;
}

export const PrintSheet: React.FC<PrintSheetProps> = ({ cardData, theme }) => {
  const isVertical = cardData.orientation === 'vertical';

  return (
    <div id="pvc-print-container" className="hidden print:block print:w-full print:m-0 print:p-0">
      <style>{`
        @media print {
          @page {
            size: ${isVertical ? '90mm 190mm portrait' : '190mm 90mm landscape'};
            margin: 0;
          }
        }
      `}</style>
      
      {/* PAGE 1: Front Side */}
      <div
        className={`print-page ${isVertical ? 'vertical' : 'horizontal'} relative overflow-hidden`}
        style={{ width: isVertical ? '90mm' : '190mm', height: isVertical ? '190mm' : '90mm' }}
      >
        <PVCCardFront cardData={cardData} theme={theme} isPrintMode={true} />
      </div>

      {/* PAGE 2: Back Side */}
      <div
        className={`print-page ${isVertical ? 'vertical' : 'horizontal'} relative overflow-hidden`}
        style={{ width: isVertical ? '90mm' : '190mm', height: isVertical ? '190mm' : '90mm' }}
      >
        <PVCCardBack cardData={cardData} theme={theme} isPrintMode={true} />
      </div>

    </div>
  );
};
