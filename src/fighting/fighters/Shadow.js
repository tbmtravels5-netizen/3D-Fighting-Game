/**
 * Shadow - Speed Specialist Fighter
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
    this.effectColor = 0x1a1a2e;
    this.shadowClones = 0;
  }

  specialMove() {
    if (!this.useStamina(30)) return false;
    this.setAnimation('shadowClone');
    this.specialDamage = 22;
    this.hasSpecialActive = true;
    this.shadowClones = 2;
    return true;
  }

  ultimateMove() {
    if (!this.useStamina(100)) return false;
    this.setAnimation('shadowAssassin');
    this.ultimateDamage = 38;
    this.hasUltimateActive = true;
    return true;
  }
}
