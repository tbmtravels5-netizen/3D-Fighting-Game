/**
 * Combat System
 * Handles hit detection, damage calculation, and combat mechanics
 */

import * as THREE from 'three';

export class CombatSystem {
  constructor(game) {
    this.game = game;
    this.activeCollisions = [];
  }

  /**
   * Check if attack hit target
   */
  checkHit(attacker, target, attackType) {
    // Check distance
    const distance = attacker.position.distanceTo(target.position);
    const hitRange = this.getHitRange(attackType);

    if (distance > hitRange) return false;

    // Check facing direction
    const attackDirection = new THREE.Vector3()
      .subVectors(target.position, attacker.position)
      .normalize();
    
    const attackerFacing = new THREE.Vector3(1, 0, 0);
    const dotProduct = attackerFacing.dot(attackDirection);

    if (dotProduct < 0.3) return false; // Not facing target

    return true;
  }

  /**
   * Get hit range for attack type
   */
  getHitRange(attackType) {
    const ranges = {
      lightPunch: 2,
      heavyPunch: 2.5,
      lightKick: 3,
      heavyKick: 3.5,
      grab: 2,
      special: 4,
      ultimate: 5,
    };
    return ranges[attackType] || 2;
  }

  /**
   * Calculate damage based on stats
   */
  calculateDamage(attacker, target, attackType) {
    let baseDamage = 0;

    switch (attackType) {
      case 'lightPunch':
        baseDamage = 8;
        break;
      case 'heavyPunch':
        baseDamage = 15;
        break;
      case 'lightKick':
        baseDamage = 10;
        break;
      case 'heavyKick':
        baseDamage = 18;
        break;
      case 'grab':
        baseDamage = 12;
        break;
      case 'special':
        baseDamage = 25;
        break;
      case 'ultimate':
        baseDamage = 40;
        break;
    }

    // Apply attacker damage stat
    baseDamage *= (1 + (attacker.damage - 5) * 0.1);

    // Apply target defense stat
    baseDamage *= Math.max(0.3, 1 - (target.defense - 5) * 0.1);

    // Add randomness
    baseDamage *= (0.85 + Math.random() * 0.3);

    return Math.round(baseDamage);
  }
}
