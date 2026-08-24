/**
 * Frost - Ice Specialist Fighter
 * Defensive, crowd control, slow-down effects
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
    this.effectColor = 0x00bfff; // Deep sky blue for ice
    this.freezeEffect = false;
  }

  /**
   * Frost's special move: Frozen Shards
   */
  specialMove() {
    if (!this.useStamina(30)) return false;

    this.setAnimation('frozenShards');
    this.specialDamage = 20;
    this.hasSpecialActive = true;
    this.slowEffect = true; // Slows opponent

    return true;
  }

  /**
   * Frost's ultimate: Absolute Zero
   */
  ultimateMove() {
    if (!this.useStamina(100)) return false;

    this.setAnimation('absoluteZero');
    this.ultimateDamage = 35;
    this.hasUltimateActive = true;
    this.freezeEffect = true; // Freeze opponent

    return true;
  }
}
