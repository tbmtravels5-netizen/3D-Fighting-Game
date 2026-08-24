/**
 * Frost - Ice Specialist Fighter
 */

import { Fighter } from '../Fighter.js';

export class Frost extends Fighter {
  constructor(config = {}) {
    super({
      name: 'Frost',
      type: 'Ice Specialist',
      health: 98,
      speed: 6,
      damage: 7,
      defense: 9,
      ...config,
    });
    this.element = 'ice';
    this.effectColor = 0x00bfff;
    this.freezeEffect = false;
  }

  specialMove() {
    if (!this.useStamina(30)) return false;
    this.setAnimation('frozenShards');
    this.specialDamage = 20;
    this.hasSpecialActive = true;
    this.slowEffect = true;
    return true;
  }

  ultimateMove() {
    if (!this.useStamina(100)) return false;
    this.setAnimation('absoluteZero');
    this.ultimateDamage = 35;
    this.hasUltimateActive = true;
    this.freezeEffect = true;
    return true;
  }
}
