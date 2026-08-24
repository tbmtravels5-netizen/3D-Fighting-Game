/**
 * Training Mode - Practice against dummy
 */

import { GameMode } from './GameMode.js';

export class TrainingMode extends GameMode {
  constructor(game, playerFighter) {
    super(game);
    this.name = 'Training';
    this.playerFighter = playerFighter;
    this.showStats = true;
    this.damageLog = [];
  }

  start() {
    super.start();
    console.log(`Training Mode started with ${this.playerFighter.name}`);
  }

  update(deltaTime) {
    super.update(deltaTime);

    // Log damage dealt
    if (this.playerFighter.lastDamageDealt) {
      this.damageLog.push({
        time: this.elapsedTime,
        damage: this.playerFighter.lastDamageDealt,
      });
      this.playerFighter.lastDamageDealt = 0;
    }
  }

  getStats() {
    const totalDamage = this.damageLog.reduce((sum, log) => sum + log.damage, 0);
    const hitCount = this.damageLog.length;
    const avgDamage = hitCount > 0 ? totalDamage / hitCount : 0;

    return {
      totalDamage,
      hitCount,
      avgDamage,
      time: this.elapsedTime,
    };
  }

  exit() {
    const stats = this.getStats();
    console.log(`Training Stats:`, stats);
    this.game.returnToMenu();
  }
}
