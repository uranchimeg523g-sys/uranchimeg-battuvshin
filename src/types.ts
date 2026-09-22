/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FrameStyle = 'arch' | 'rect' | 'split' | 'oval';
export type BackPhotoStyle = 'backdrop' | 'banner' | 'card' | 'oval';
export type ThemeId =
  | 'school62-amber'
  | 'royal-blue'
  | 'crimson-gold'
  | 'ivory-gold'
  | 'emerald-gold'
  | 'obsidian-gold'
  | 'purple-gold'
  | 'navy-silver'
  | 'burgundy-rose'
  | 'amber-bronze';

export type PVCVisualFinish = 'glossy' | 'matte' | 'foil';
export type Orientation = 'horizontal' | 'vertical'; // 'horizontal': 19x9 см | 'vertical': 9x19 см

export interface CustomThemeColors {
  enabled: boolean;
  bgStart: string;
  bgEnd: string;
  cardBgHex: string;
  accentGold: string;
  borderGold: string;
  textPrimary: string;
  textSecondary: string;
}

export interface PhotoSettings {
  url: string;
  zoom: number; // 0.5 to 2.5
  posX: number; // -50 to 50
  posY: number; // -50 to 50
  frameStyle: FrameStyle;
  showGoldBorder: boolean;
}

export interface BackPhotoSettings {
  url: string;
  zoom: number;
  posX: number;
  posY: number;
  frameStyle: BackPhotoStyle;
  opacity: number; // 0.1 to 1.0
  showGoldBorder: boolean;
}

export interface ProgramItem {
  id: string;
  time: string;
  title: string;
}

export interface CardData {
  schoolName: string;
  schoolNameEn: string;
  subTitle: string;
  years: string;
  motto: string;
  guestName: string;
  guestRole: string;
  handwrittenName?: boolean;
  poemTitle?: string;
  poemText?: string;
  secondPoemTitle?: string;
  secondPoemText?: string;
  showSecondPoem?: boolean;
  dedicationText?: string;
  invitationBody: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  contactPhone: string;
  cardNumber: string;
  qrCodeText: string;
  showQrCode?: boolean;
  qrCodeLabel?: string;
  programSchedule: ProgramItem[];
  showProgramSchedule?: boolean;
  
  frontPhoto: PhotoSettings;
  backPhoto: BackPhotoSettings;

  logoUrl?: string;
  bgTextureUrl?: string;
  useBgTexture?: boolean;

  themeId: ThemeId;
  finish: PVCVisualFinish;
  orientation: Orientation;
  customColors: CustomThemeColors;
  hasLanyardHole: boolean;
  showMongolianPatterns: boolean;
  showCutMarks: boolean;
  showChipOrBarcode: boolean;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  nameEn: string;
  bgGradient: string;
  cardBgHex: string;
  accentGold: string;
  textPrimary: string;
  textSecondary: string;
  goldShine: string;
  borderGold: string;
  ornamentColor: string;
}
