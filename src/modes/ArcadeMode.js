/**
 * Arcade Mode - Series of escalating fights
 */

import { GameMode } from './GameMode.js';

export class ArcadeMode extends GameMode {
  constructor(game, playerFighter) {
    super(game);
    this.name = 'Arcade';
    this.playerFighter = playerFighter;
    this.currentRound = 0;
    this.totalRounds = 5;
    this.fighters = ['Phoenix', 'Frost', 'Shadow', 'Titan', 'Raiden'];
  }

  start() {
    super.start();
    this.playNextRound();
  }

  playNextRound() {
    if (this.currentRound >= this.totalRounds) {
      this.victoryScreen();
      return;
    }

    console.log(`Arcade Round ${this.currentRound + 1} / ${this.totalRounds}`);
    this.currentRound++;
  }

  update(deltaTime) {
    super.update(deltaTime);

    // Check if round is over (time or KO)
    if (this.elapsedTime > this.roundTime) {
      this.playNextRound();
      this.elapsedTime = 0;
    }
  }

  onFighterDefeated(fighter) {
    super.onFighterDefeated(fighter);
    if (fighter.name === this.playerFighter.name) {
      this.gameOver();
    } else {
      this.playNextRound();
    }
  }

  victoryScreen() {
    alert(`🎉 You won the Arcade! Final Round: ${this.currentRound}`);
    this.game.returnToMenu();
  }

  gameOver() {
    alert(`Game Over! You reached Round ${this.currentRound}`);
    this.game.returnToMenu();
  }
}
