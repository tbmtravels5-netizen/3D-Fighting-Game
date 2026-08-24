/**
 * Fighter Base Class
 * Foundation for all fighter characters
 */

import * as THREE from 'three';

export class Fighter {
  constructor(config) {
    this.name = config.name;
    this.type = config.type;
    this.position = config.position || new THREE.Vector3(0, 0, 0);
    this.scale = config.scale || 1;

    // Stats
    this.maxHealth = config.health || 100;
    this.health = this.maxHealth;
    this.maxStamina = 100;
    this.stamina = this.maxStamina;
    this.speed = config.speed || 7;
    this.damage = config.damage || 8;
    this.defense = config.defense || 8;

    // State
    this.isAlive = true;
    this.isBlocking = false;
    this.isFalling = false;
    this.currentCombo = 0;
    this.comboTimer = 0;
    this.comboWindow = 2000; // ms

    // Movement
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.rotation = 0;

    // Animation
    this.animationState = 'idle';
    this.animations = {};

    // 3D Model
    this.mesh = null;
    this.armature = null;
  }

  /**
   * Apply damage to fighter
   */
  takeDamage(amount, attacker = null) {
    if (!this.isAlive) return;

    let finalDamage = amount;
    if (this.isBlocking) {
      finalDamage = amount * 0.5; // Block reduces damage by 50%
    }

    this.health = Math.max(0, this.health - finalDamage);

    if (this.health <= 0) {
      this.die();
    }

    return finalDamage;
  }

  /**
   * Recover stamina over time
   */
  recoverStamina(deltaTime = 1) {
    if (this.stamina < this.maxStamina) {
      this.stamina = Math.min(this.maxStamina, this.stamina + 0.5 * deltaTime);
    }
  }

  /**
   * Use stamina for action
   */
  useStamina(amount) {
    if (this.stamina >= amount) {
      this.stamina -= amount;
      return true;
    }
    return false;
  }

  /**
   * Execute punch attack
   */
  punch(heavy = false) {
    const cost = heavy ? 10 : 5;
    if (!this.useStamina(cost)) return false;

    this.setAnimation(heavy ? 'heavyPunch' : 'lightPunch');
    return true;
  }

  /**
   * Execute kick attack
   */
  kick(heavy = false) {
    const cost = heavy ? 12 : 7;
    if (!this.useStamina(cost)) return false;

    this.setAnimation(heavy ? 'heavyKick' : 'lightKick');
    return true;
  }

  /**
   * Block incoming damage
   */
  block(active = true) {
    this.isBlocking = active;
    if (active) {
      this.setAnimation('block');
    } else {
      this.setAnimation('idle');
    }
  }

  /**
   * Dodge/Dash movement
   */
  dodge(direction) {
    if (!this.useStamina(8)) return false;

    this.velocity.copy(direction).multiplyScalar(this.speed * 2);
    this.setAnimation('dodge');
    return true;
  }

  /**
   * Jump
   */
  jump() {
    if (!this.isFalling) {
      this.velocity.y = 15;
      this.setAnimation('jump');
      return true;
    }
    return false;
  }

  /**
   * Set animation state
   */
  setAnimation(state) {
    if (this.animationState !== state) {
      this.animationState = state;
      // Animation transition logic here
    }
  }

  /**
   * Handle death
   */
  die() {
    this.isAlive = false;
    this.setAnimation('knockout');
  }

  /**
   * Reset fighter for new round
   */
  reset() {
    this.health = this.maxHealth;
    this.stamina = this.maxStamina;
    this.isAlive = true;
    this.isBlocking = false;
    this.isFalling = false;
    this.velocity.set(0, 0, 0);
    this.currentCombo = 0;
    this.setAnimation('idle');
  }

  /**
   * Update fighter physics and state
   */
  update(deltaTime) {
    if (!this.isAlive) return;

    // Recover stamina
    this.recoverStamina(deltaTime);

    // Apply gravity
    this.velocity.y -= 9.82 * deltaTime;

    // Update position
    this.position.add(this.velocity.clone().multiplyScalar(deltaTime));

    // Ground collision
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y = 0;
      this.isFalling = false;
    } else {
      this.isFalling = true;
    }

    // Update mesh position
    if (this.mesh) {
      this.mesh.position.copy(this.position);
    }
  }
}
