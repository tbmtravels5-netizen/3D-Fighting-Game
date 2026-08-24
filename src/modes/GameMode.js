/**
 * Game Mode Base Class
 */

export class GameMode {
  constructor(game) {
    this.game = game;
    this.name = 'Default';
    this.isRunning = false;
    this.roundTime = 180; // seconds
    this.elapsedTime = 0;
  }

  start() {
    this.isRunning = true;
    console.log(`Starting ${this.name} mode...`);
  }

  update(deltaTime) {
    this.elapsedTime += deltaTime;
  }

  end() {
    this.isRunning = false;
    console.log(`${this.name} mode ended.`);
  }

  onFighterDefeated(fighter) {
    console.log(`${fighter.name} was defeated!`);
  }
}
