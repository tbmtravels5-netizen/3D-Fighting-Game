/**
 * Raiden - Lightning Specialist Fighter
 * Fast, ranged, combo-heavy playstyle
 */

import { Fighter } from '../Fighter.js';

export class Raiden extends Fighter {
  constructor(config = {}) {
    super({
      name: 'Raiden',
      type: 'Lightning Specialist',
      health: 95,
      speed: 9,
      damage: 8,
      defense: 7,
      ...config,
    });

    this.element = 'lightning';
    this.effectColor = 0xffaa00; // Orange-yellow for lightning
  }

  /**
   * Raiden's special move: Lightning Chain
   */
  specialMove() {
    if (!this.useStamina(30)) return false;

    this.setAnimation('lightningChain');
    // Multiple quick hits effect
    this.specialDamage = 25;
    this.hasSpecialActive = true;

    return true;
  }

  /**
   * Raiden's ultimate: Thunderbolt Finale
   */
  ultimateMove() {
    if (!this.useStamina(100)) return false;

    this.setAnimation('thunderbolt');
    this.ultimateDamage = 40;
    this.hasUltimateActive = true;

    return true;
  }
}
