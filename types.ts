export enum Move {
  Rock = 'Rock',
  Paper = 'Paper',
  Scissors = 'Scissors'
}

export type GameResult = 'Win' | 'Lose' | 'Draw' | null;

export interface GameState {
  playerScore: number;
  computerScore: number;
  roundsPlayed: number;
  status: 'idle' | 'playing' | 'revealing' | 'finished';
  playerMove: Move | null;
  computerMove: Move | null;
  result: GameResult;
}

export const MOVES = [Move.Rock, Move.Paper, Move.Scissors] as const;