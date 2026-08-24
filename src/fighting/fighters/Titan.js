/**
 * Titan - Power Specialist Fighter
 * Heavy damage, slow, overwhelming force
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
    this.effectColor = 0x8b4513; // Brown for earth/titan
    this.isHeavy = true;
  }

  /**
   * Titan's special move: Earthquake Stomp
   */
  specialMove() {
    if (!this.useStamina(30)) return false;

    this.setAnimation('earthquakeStomp');
    this.specialDamage = 28;
    this.hasSpecialActive = true;
    this.knockdownEffect = true; // Knocks down opponent

    return true;
  }

  /**
   * Titan's ultimate: Titanic Crush
   */
  ultimateMove() {
    if (!this.useStamina(100)) return false;

    this.setAnimation('titanicCrush');
    this.ultimateDamage = 45; // Highest damage
    this.hasUltimateActive = true;

    return true;
  }
}
