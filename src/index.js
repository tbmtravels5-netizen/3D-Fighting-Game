/**
 * ARENA MASTERS - Main Game Entry Point
 * Version 1.0.0
 * 
 * Core initialization and game loop setup
 */

import Game from './core/Game.js';
import { GAME_CONFIG } from './config/constants.js';

// Initialize game
const game = new Game(GAME_CONFIG);

// Start the game
game.init().then(() => {
  console.log('🥊 ARENA MASTERS initialized successfully');
  game.start();
}).catch((error) => {
  console.error('Failed to initialize game:', error);
});

// Handle window events
window.addEventListener('resize', () => {
  game.onWindowResize();
});

window.addEventListener('beforeunload', () => {
  game.saveProgress();
});

// Export for development
if (process.env.NODE_ENV === 'development') {
  window.game = game;
  window.GAME_CONFIG = GAME_CONFIG;
}
