/**
 * Titan - Power Specialist Fighter
 */

import { Fighter } from '../Fighter.js';

export class Titan extends Fighter {
  constructor(config = {}) {
    super({
      name: 'Titan',
      type: 'Power Specialist',
      health: 110,
      speed: 5,
      damage: 10,
      defense: 9,
      ...config,
    });
    this.element = 'earth';
    this.effectColor = 0x8b4513;
    this.isHeavy = true;
  }

  specialMove() {
    if (!this.useStamina(30)) return false;
    this.setAnimation('earthquakeStomp');
    this.specialDamage = 28;
    this.hasSpecialActive = true;
    this.knockdownEffect = true;
    return true;
  }

  ultimateMove() {
    if (!this.useStamina(100)) return false;
    this.setAnimation('titanicCrush');
    this.ultimateDamage = 45;
    this.hasUltimateActive = true;
    return true;
  }
}
