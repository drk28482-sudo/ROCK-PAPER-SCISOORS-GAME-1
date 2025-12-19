import React, { useEffect, useState } from 'react';
import { Move, GameResult } from '../types';
import { MOVE_CONFIG } from '../constants';
import { HelpCircle } from 'lucide-react';

interface GameArenaProps {
  playerMove: Move | null;
  computerMove: Move | null;
  result: GameResult;
  status: 'idle' | 'playing' | 'revealing' | 'finished';
}

const GameArena: React.FC<GameArenaProps> = ({ playerMove, computerMove, result, status }) => {
  const [animatePing, setAnimatePing] = useState(false);

  useEffect(() => {
    if (status === 'revealing') {
      const interval = setInterval(() => {
        setAnimatePing(prev => !prev);
      }, 150);
      return () => clearInterval(interval);
    }
  }, [status]);

  const renderCard = (move: Move | null, isComputer = false) => {
    // Idle state
    if (!move && !isComputer) return null;

    // Computer waiting state
    if (isComputer && !move) {
      return (
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-slate-800/50 border-2 border-slate-700 border-dashed flex items-center justify-center animate-pulse">
           <HelpCircle className="w-12 h-12 text-slate-600" />
        </div>
      );
    }
    
    // Revealing state (computer thinking visuals)
    if (isComputer && status === 'revealing') {
        return (
             <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-700/50 animate-pulse" />
                <div className="z-10 text-4xl animate-bounce">
                    ✊
                </div>
            </div>
        )
    }

    if (!move) return null;

    const config = MOVE_CONFIG[move];
    const Icon = config.icon;
    const isWinner = (result === 'Win' && !isComputer) || (result === 'Lose' && isComputer);
    const isLoser = (result === 'Lose' && !isComputer) || (result === 'Win' && isComputer);

    return (
      <div className={`
        relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl flex flex-col items-center justify-center
        transition-all duration-500 transform
        ${isWinner ? 'scale-110 shadow-[0_0_30px_rgba(16,185,129,0.3)] border-2 border-emerald-500 bg-slate-800' : ''}
        ${isLoser ? 'opacity-60 scale-95 grayscale border border-slate-700 bg-slate-900' : ''}
        ${!isWinner && !isLoser ? 'border border-slate-600 bg-slate-800' : ''}
      `}>
         {isWinner && (
            <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg animate-bounce">
                WINNER
            </div>
         )}
        <div className={`p-4 rounded-full bg-slate-700/50 mb-2 ${isWinner ? 'bg-emerald-500/20' : ''}`}>
           <Icon className={`w-12 h-12 sm:w-16 sm:h-16 ${isWinner ? 'text-emerald-400' : config.color}`} />
        </div>
        <span className="text-sm font-bold tracking-wide uppercase">{config.label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 min-h-[250px]">
      
      {/* Result Text Overlay */}
      {status === 'finished' && result && (
        <div className="absolute z-20 flex flex-col items-center animate-in fade-in zoom-in duration-300">
           <h2 className={`
             text-5xl sm:text-7xl font-black uppercase tracking-tighter drop-shadow-2xl
             ${result === 'Win' ? 'text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-600' : ''}
             ${result === 'Lose' ? 'text-transparent bg-clip-text bg-gradient-to-b from-rose-300 to-rose-600' : ''}
             ${result === 'Draw' ? 'text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-400' : ''}
           `}>
             {result === 'Draw' ? 'Draw!' : `You ${result}!`}
           </h2>
        </div>
      )}

      {/* VS Badge */}
      <div className={`
        absolute z-10 bg-slate-900 rounded-full p-2 border-4 border-slate-800
        text-slate-500 font-black text-xl w-12 h-12 flex items-center justify-center
        transition-opacity duration-300
        ${status === 'finished' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
      `}>
        VS
      </div>

      <div className="flex w-full max-w-2xl justify-between items-center px-4 sm:px-12 gap-4">
        {/* Player Side */}
        <div className="flex flex-col items-center gap-4">
           {renderCard(playerMove)}
           <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">You</span>
        </div>

        {/* Computer Side */}
        <div className="flex flex-col items-center gap-4">
            {renderCard(computerMove, true)}
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">CPU</span>
        </div>
      </div>
    </div>
  );
};

export default GameArena;
