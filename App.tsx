import React, { useState, useEffect } from 'react';
import { GameState, Move, MOVES, GameResult } from './types';
import { getRandomMove, determineWinner } from './utils/gameLogic';
import ScoreBoard from './components/ScoreBoard';
import MoveButton from './components/MoveButton';
import GameArena from './components/GameArena';
import { RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    playerScore: 0,
    computerScore: 0,
    roundsPlayed: 0,
    status: 'idle',
    playerMove: null,
    computerMove: null,
    result: null,
  });

  const handlePlayerMove = (move: Move) => {
    if (gameState.status !== 'idle' && gameState.status !== 'finished') return;

    // Start round
    setGameState(prev => ({
      ...prev,
      status: 'revealing',
      playerMove: move,
      computerMove: null, // Hide computer move initially
      result: null,
    }));

    // Simulate "thinking" delay
    setTimeout(() => {
      const computerMove = getRandomMove();
      const result = determineWinner(move, computerMove);

      setGameState(prev => ({
        ...prev,
        computerMove,
        result,
        status: 'finished',
        roundsPlayed: prev.roundsPlayed + 1,
        playerScore: result === 'Win' ? prev.playerScore + 1 : prev.playerScore,
        computerScore: result === 'Lose' ? prev.computerScore + 1 : prev.computerScore,
      }));
    }, 1000); // 1 second delay for suspense
  };

  const resetGame = () => {
    setGameState({
      playerScore: 0,
      computerScore: 0,
      roundsPlayed: 0,
      status: 'idle',
      playerMove: null,
      computerMove: null,
      result: null,
    });
  };

  const playAgain = () => {
    setGameState(prev => ({
      ...prev,
      status: 'idle',
      playerMove: null,
      computerMove: null,
      result: null,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col items-center py-8 px-4 selection:bg-indigo-500/30">
      
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          ROCHAMBEAU
        </h1>
        <p className="text-slate-400 text-sm font-medium">Beat the AI &bull; First to 5 wins?</p>
      </header>

      {/* Main Game Area */}
      <main className="w-full max-w-3xl flex flex-col flex-1">
        
        <ScoreBoard 
          playerScore={gameState.playerScore} 
          computerScore={gameState.computerScore} 
          roundsPlayed={gameState.roundsPlayed}
        />

        {/* The Arena: Shows cards and results */}
        <div className="relative">
            <GameArena 
            playerMove={gameState.playerMove}
            computerMove={gameState.computerMove}
            result={gameState.result}
            status={gameState.status}
            />
        </div>

        {/* Controls */}
        <div className="mt-auto pt-8">
            
            {/* Play Again Button (Shown only when finished) */}
            {gameState.status === 'finished' && (
                <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <button 
                        onClick={playAgain}
                        className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                    >
                        Play Next Round
                    </button>
                </div>
            )}

            {/* Move Selection Grid */}
            <div className={`
                flex justify-center gap-4 sm:gap-6 
                transition-all duration-500
                ${gameState.status === 'finished' || gameState.status === 'revealing' ? 'opacity-50 pointer-events-none filter blur-[2px] scale-95' : 'opacity-100 scale-100'}
            `}>
                {MOVES.map((move) => (
                <MoveButton
                    key={move}
                    move={move}
                    onClick={handlePlayerMove}
                    disabled={gameState.status !== 'idle' && gameState.status !== 'finished'}
                    selected={gameState.playerMove === move}
                />
                ))}
            </div>

            {/* Hint Text */}
            <div className={`text-center mt-6 text-slate-500 text-sm transition-opacity duration-300 ${gameState.status === 'idle' ? 'opacity-100' : 'opacity-0'}`}>
                Choose your weapon to start
            </div>

        </div>
      </main>

      {/* Footer / Reset */}
      <footer className="mt-12 flex items-center justify-center">
        <button 
          onClick={resetGame}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          <RefreshCcw className="w-4 h-4" />
          Reset Score
        </button>
      </footer>

    </div>
  );
};

export default App;
