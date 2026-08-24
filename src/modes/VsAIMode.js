/**
 * VS AI Mode - 1v1 against AI opponent
 */

import { GameMode } from './GameMode.js';
import { AISystem } from '../fighting/AI.js';

export class VsAIMode extends GameMode {
  constructor(game, playerFighter, aiDifficulty = 'Normal') {
    super(game);
    this.name = 'Vs AI';
    this.playerFighter = playerFighter;
    this.aiDifficulty = aiDifficulty;
    this.ai = null;
  }

  start() {
    super.start();
    if (this.game.players[1]) {
      this.ai = new AISystem(this.game.players[1], this.aiDifficulty);
      console.log(`Starting Vs ${this.aiDifficulty} AI...`);
    }
  }

  update(deltaTime) {
    super.update(deltaTime);

    // Update AI
    if (this.ai && this.game.players[1]) {
      this.ai.update(deltaTime, this.playerFighter);
    }

    // Check round end
    if (this.elapsedTime > this.roundTime) {
      this.endRound();
    }
  }

  onFighterDefeated(fighter) {
    super.onFighterDefeated(fighter);
    if (fighter.name === this.playerFighter.name) {
      alert('You Lost! Game Over.');
    } else {
      alert('Victory! You defeated the AI!');
    }
    this.game.returnToMenu();
  }

  endRound() {
    const p1Health = this.playerFighter.health;
    const p2Health = this.game.players[1]?.health || 0;

    if (p1Health > p2Health) {
      alert('You Win!');
    } else {
      alert('AI Wins!');
    }
    this.game.returnToMenu();
  }
}
