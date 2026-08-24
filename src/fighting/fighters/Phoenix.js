/**
 * Phoenix - Fire Specialist Fighter
 * Balanced, area damage, sustained pressure
 */

import { Fighter } from '../Fighter.js';

export class Phoenix extends Fighter {
  constructor(config = {}) {
    super({
      name: 'Phoenix',
      type: 'Fire Specialist',
      health: 100,
      speed: 7,
      damage: 8,
      defense: 8,
      ...config,
    });

    this.element = 'fire';
    this.effectColor = 0xff4500; // Orange-red for fire
  }

  /**
   * Phoenix's special move: Inferno Blast
   */
  specialMove() {
    if (!this.useStamina(30)) return false;

    this.setAnimation('infernoBlast');
    this.specialDamage = 25;
    this.hasSpecialActive = true;
    this.burnEffect = true; // Damage over time

    return true;
  }

  /**
   * Phoenix's ultimate: Phoenix Rising
   */
  ultimateMove() {
    if (!this.useStamina(100)) return false;

    this.setAnimation('phoenixRising');
    this.ultimateDamage = 40;
    this.hasUltimateActive = true;

    return true;
  }
}
