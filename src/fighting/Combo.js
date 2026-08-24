/**
 * Combo System
 * Detects and manages attack combos
 */

export class ComboSystem {
  constructor() {
    this.comboWindow = 2000; // ms
    this.minComboLength = 2;
    this.combos = [];
  }

  /**
   * Register attack for combo detection
   */
  registerAttack(fighter, attackType) {
    if (!fighter.currentAttackSequence) {
      fighter.currentAttackSequence = [];
      fighter.lastAttackTime = Date.now();
    }

    const now = Date.now();
    const timeSinceLastAttack = now - fighter.lastAttackTime;

    // Check if combo window expired
    if (timeSinceLastAttack > this.comboWindow) {
      fighter.currentAttackSequence = [];
    }

    fighter.currentAttackSequence.push(attackType);
    fighter.lastAttackTime = now;
    fighter.currentCombo = fighter.currentAttackSequence.length;

    return this.detectCombo(fighter.currentAttackSequence);
  }

  /**
   * Detect if attack sequence matches known combo
   */
  detectCombo(sequence) {
    const comboPatterns = {
      'PunchPunchKick': { name: 'Triple Strike', damage: 1.5 },
      'PunchPunchPunch': { name: 'Combo Master', damage: 1.3 },
      'KickKickKick': { name: 'Spinning Kicks', damage: 1.4 },
      'PunchKickPunch': { name: 'Balanced Assault', damage: 1.2 },
    };

    const sequenceStr = sequence.join('');

    for (const [pattern, combo] of Object.entries(comboPatterns)) {
      if (sequenceStr.includes(pattern)) {
        return combo;
      }
    }

    return null;
  }

  /**
   * Reset combo for fighter
   */
  resetCombo(fighter) {
    fighter.currentAttackSequence = [];
    fighter.currentCombo = 0;
  }
}
