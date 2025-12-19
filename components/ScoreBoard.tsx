import React from 'react';

interface ScoreBoardProps {
  playerScore: number;
  computerScore: number;
  roundsPlayed: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ playerScore, computerScore, roundsPlayed }) => {
  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="flex justify-between items-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700 shadow-xl">
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">You</span>
          <span className="text-3xl font-black text-emerald-400">{playerScore}</span>
        </div>
        
        <div className="flex flex-col items-center px-6 border-x border-slate-700/50">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Round</span>
          <span className="text-xl font-bold text-white">{roundsPlayed}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">CPU</span>
          <span className="text-3xl font-black text-rose-400">{computerScore}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
