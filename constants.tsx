import React from 'react';
import { Move } from './types';

// Custom SVG components for clear, stylized hand gestures
export const RockIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    <circle cx="12" cy="12" r="6"></circle>
  </svg>
);

export const PaperIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="9" y1="22" x2="9" y2="2"></line>
    <path d="M5 12h14"></path>
    <path d="M5 7h14"></path>
    <path d="M5 17h14"></path>
  </svg>
);

export const ScissorsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="6" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle>
    <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
    <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
    <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
  </svg>
);

export const MOVE_CONFIG: Record<Move, { icon: React.FC<{className?: string}>; color: string; label: string; gradient: string }> = {
  [Move.Rock]: {
    icon: RockIcon,
    color: 'text-amber-500',
    label: 'Rock',
    gradient: 'from-amber-500 to-orange-600',
  },
  [Move.Paper]: {
    icon: PaperIcon,
    color: 'text-blue-500',
    label: 'Paper',
    gradient: 'from-blue-500 to-cyan-600',
  },
  [Move.Scissors]: {
    icon: ScissorsIcon,
    color: 'text-rose-500',
    label: 'Scissors',
    gradient: 'from-rose-500 to-pink-600',
  },
};
