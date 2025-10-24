/**
 * GAME MODE TYPES
 * Shared TypeScript interfaces for both co-op and multiplayer modes
 */

// Game modes available in the application
export type GameMode = 'coop' | 'multiplayer';

// Player representation (1 = X, 2 = O)
export type Player = 1 | 2;

// Game status states
export type GameStatus = 'playing' | 'won' | 'draw' | 'waiting' | 'disconnected';

// 3x3 game board representation
export type TileMap = number[][];

// Score tracking for both players
export interface Score {
  player1: number;
  player2: number;
}

// Local co-op game state (what you currently have)
export interface LocalGameState {
  tileMap: TileMap;
  currentPlayer: Player;
  gameStatus: GameStatus;
  lastPlayer: Player | 0;
  score: Score;
}

// Multiplayer game state (for online games)
export interface MultiplayerGameState {
  gameId: string;
  tileMap: TileMap;
  currentPlayer: Player;
  gameStatus: GameStatus;
  winner: Player | null;
  players: {
    player1: { id: string; symbol: 'X' };
    player2: { id: string; symbol: 'O' } | null;
  };
  myPlayerNumber: Player | null; // Which player am I in this game?
  isMyTurn: boolean;
  score: Score;
}

// Socket events for multiplayer communication
export interface SocketEvents {
  // Outgoing events (client to server)
  joinGame: () => void;
  makeMove: (data: { row: number; col: number; gameId: string }) => void;
  leaveGame: (data: { gameId: string }) => void;
  
  // Incoming events (server to client)
  gameJoined: (data: { gameId: string; gameState: MultiplayerGameState }) => void;
  gameUpdate: (data: { gameState: MultiplayerGameState }) => void;
  gameEnded: (data: { winner: Player | null; finalState: MultiplayerGameState }) => void;
  playerDisconnected: (data: { gameId: string }) => void;
  error: (data: { message: string }) => void;
}

// Props for game components
export interface GameComponentProps {
  onModeChange: (mode: GameMode) => void;
  currentMode: GameMode;
}

export interface LocalGameProps extends GameComponentProps {
  // Local co-op specific props can go here
}

export interface MultiplayerGameProps extends GameComponentProps {
  // Multiplayer specific props can go here
}