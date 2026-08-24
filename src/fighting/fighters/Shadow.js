/**
 * Shadow - Speed Specialist Fighter
 * Quick combos, evasive, high risk/high reward
 */

import { Fighter } from '../Fighter.js';

export class Shadow extends Fighter {
  constructor(config = {}) {
    super({
      name: 'Shadow',
      type: 'Speed Specialist',
      health: 85,
      speed: 10,
      damage: 7,
      defense: 6,
      ...config,
    });

    this.element = 'shadow';
    this.effectColor = 0x1a1a2e; // Dark color for shadow
    this.shadowClones = 0;
  }

  /**
   * Shadow's special move: Shadow Clone
   */
  specialMove() {
    if (!this.useStamina(30)) return false;

    this.setAnimation('shadowClone');
    this.specialDamage = 22;
    this.hasSpecialActive = true;
    this.shadowClones = 2; // Creates 2 shadow clones

    return true;
  }

  /**
   * Shadow's ultimate: Shadow Assassin
   */
  ultimateMove() {
    if (!this.useStamina(100)) return false;

    this.setAnimation('shadowAssassin');
    this.ultimateDamage = 38;
    this.hasUltimateActive = true;

    return true;
  }
}
