/**
 * Echo - Balanced Fighter
 */

import { Fighter } from '../Fighter.js';

export class Echo extends Fighter {
  constructor(config = {}) {
    super({
      name: 'Echo',
      type: 'Balanced',
      health: 100,
      speed: 7,
      damage: 8,
      defense: 8,
      ...config,
    });
    this.element = 'sound';
    this.effectColor = 0x00ff88;
  }

  specialMove() {
    if (!this.useStamina(30)) return false;
    this.setAnimation('echoStrike');
    this.specialDamage = 24;
    this.hasSpecialActive = true;
    this.echoHits = 2;
    return true;
  }

  ultimateMove() {
    if (!this.useStamina(100)) return false;
    this.setAnimation('infiniteEcho');
    this.ultimateDamage = 40;
    this.hasUltimateActive = true;
    return true;
  }
}
