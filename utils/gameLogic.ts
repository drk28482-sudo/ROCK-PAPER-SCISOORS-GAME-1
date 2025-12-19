import { Move, GameResult, MOVES } from '../types';

export const getRandomMove = (): Move => {
  const randomIndex = Math.floor(Math.random() * MOVES.length);
  return MOVES[randomIndex];
};

export const determineWinner = (playerMove: Move, computerMove: Move): GameResult => {
  if (playerMove === computerMove) return 'Draw';

  if (
    (playerMove === Move.Rock && computerMove === Move.Scissors) ||
    (playerMove === Move.Paper && computerMove === Move.Rock) ||
    (playerMove === Move.Scissors && computerMove === Move.Paper)
  ) {
    return 'Win';
  }

  return 'Lose';
};
