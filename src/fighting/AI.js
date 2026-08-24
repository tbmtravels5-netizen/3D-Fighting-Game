/**
 * AI System
 */

import * as THREE from 'three';

export class AISystem {
  constructor(fighter, difficulty = 'Normal') {
    this.fighter = fighter;
    this.difficulty = difficulty;
    this.target = null;
    this.settings = this.getDifficultySettings(difficulty);
    this.decisionTimer = 0;
    this.lastAction = null;
    this.actionCooldown = 0;
  }

  getDifficultySettings(difficulty) {
    const settings = {
      Easy: {
        reactionTime: 1000,
        decisionInterval: 2000,
        attackChance: 0.3,
        blockChance: 0.1,
        specialChance: 0.1,
        accuracy: 0.6,
      },
      Normal: {
        reactionTime: 600,
        decisionInterval: 1500,
        attackChance: 0.5,
        blockChance: 0.3,
        specialChance: 0.2,
        accuracy: 0.8,
      },
      Hard: {
        reactionTime: 300,
        decisionInterval: 1000,
        attackChance: 0.7,
        blockChance: 0.5,
        specialChance: 0.3,
        accuracy: 0.9,
      },
      Expert: {
        reactionTime: 100,
        decisionInterval: 500,
        attackChance: 0.8,
        blockChance: 0.6,
        specialChance: 0.4,
        accuracy: 0.95,
      },
    };
    return settings[difficulty] || settings.Normal;
  }

  update(deltaTime, targetFighter) {
    this.target = targetFighter;
    this.decisionTimer += deltaTime * 1000;
    this.actionCooldown -= deltaTime * 1000;

    if (this.decisionTimer >= this.settings.decisionInterval) {
      this.makeDecision();
      this.decisionTimer = 0;
    }
  }

  makeDecision() {
    if (!this.target || this.actionCooldown > 0) return;

    const distance = this.fighter.position.distanceTo(this.target.position);
    const healthPercent = this.fighter.health / this.fighter.maxHealth;
    const rand = Math.random();

    if (healthPercent < 0.3) {
      if (rand < this.settings.blockChance) {
        this.fighter.block(true);
        this.actionCooldown = 500;
        return;
      }
    }

    if (rand < this.settings.specialChance && distance < 4) {
      if (this.fighter.specialMove) {
        this.fighter.specialMove();
        this.actionCooldown = 1000;
        return;
      }
    }

    if (rand < this.settings.attackChance && distance < 3) {
      const isHeavy = Math.random() > 0.5;
      const isKick = Math.random() > 0.5;
      if (isKick) {
        this.fighter.kick(isHeavy);
      } else {
        this.fighter.punch(isHeavy);
      }
      this.actionCooldown = 600;
      return;
    }

    if (distance > 5) {
      const direction = new THREE.Vector3()
        .subVectors(this.target.position, this.fighter.position)
        .normalize();
      this.fighter.direction.copy(direction);
    } else if (distance < 2) {
      const direction = new THREE.Vector3()
        .subVectors(this.fighter.position, this.target.position)
        .normalize();
      this.fighter.direction.copy(direction);
    }
  }
}
