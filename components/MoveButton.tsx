import React from 'react';
import { Move } from '../types';
import { MOVE_CONFIG } from '../constants';

interface MoveButtonProps {
  move: Move;
  onClick: (move: Move) => void;
  disabled?: boolean;
  selected?: boolean;
}

const MoveButton: React.FC<MoveButtonProps> = ({ move, onClick, disabled, selected }) => {
  const config = MOVE_CONFIG[move];
  const Icon = config.icon;

  return (
    <button
      onClick={() => onClick(move)}
      disabled={disabled}
      className={`
        group relative flex flex-col items-center justify-center
        w-24 h-24 sm:w-32 sm:h-32 rounded-2xl
        transition-all duration-300 ease-out
        ${disabled && !selected ? 'opacity-50 scale-90 grayscale cursor-not-allowed' : 'hover:-translate-y-2 hover:shadow-2xl cursor-pointer'}
        ${selected ? 'ring-4 ring-white ring-offset-4 ring-offset-slate-900 scale-105 z-10' : ''}
        bg-slate-800 border border-slate-700
      `}
    >
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300
        bg-gradient-to-br ${config.gradient}
      `} />
      
      <Icon className={`w-10 h-10 sm:w-12 sm:h-12 mb-2 transition-transform duration-300 group-hover:scale-110 ${config.color}`} />
      <span className="text-xs sm:text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
        {config.label}
      </span>
    </button>
  );
};

export default MoveButton;
