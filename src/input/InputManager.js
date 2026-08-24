/**
 * Input Manager - Handles all player input
 */

import * as THREE from 'three';

export class InputManager {
  constructor(game) {
    this.game = game;
    this.keys = {};
    this.mouse = { x: 0, y: 0, clicked: false };
    this.touches = [];

    this.setupKeyboardListeners();
    this.setupMouseListeners();
    this.setupTouchListeners();
    this.setupGamepadListeners();
  }

  /**
   * Setup keyboard event listeners
   */
  setupKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      this.handleKeyDown(e);
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  }

  /**
   * Handle keyboard down events
   */
  handleKeyDown(e) {
    const key = e.key.toLowerCase();

    if (!this.game.players[0]) return;

    const player = this.game.players[0];

    switch (key) {
      case '1':
      case 'x':
        player.punch(false); // Light punch
        break;
      case '2':
      case 'c':
        player.kick(false); // Light kick
        break;
      case '3':
        player.punch(true); // Heavy punch
        break;
      case '4':
        player.kick(true); // Heavy kick
        break;
      case '5':
      case 'z':
        player.specialMove(); // Special move
        break;
      case '6':
      case 'v':
        player.ultimateMove(); // Ultimate
        break;
      case '7':
      case 'shift':
        player.block(true); // Block
        break;
      case '8':
      case 'q':
        player.grab(); // Grab
        break;
      case ' ':
        player.jump(); // Jump
        break;
      case 'p':
      case 'escape':
        this.game.pause();
        break;
    }
  }

  /**
   * Setup mouse listeners
   */
  setupMouseListeners() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('mousedown', () => {
      this.mouse.clicked = true;
    });

    window.addEventListener('mouseup', () => {
      this.mouse.clicked = false;
    });
  }

  /**
   * Setup touch listeners for mobile
   */
  setupTouchListeners() {
    window.addEventListener('touchstart', (e) => {
      this.touches = e.touches;
    });

    window.addEventListener('touchmove', (e) => {
      this.touches = e.touches;
    });

    window.addEventListener('touchend', (e) => {
      this.touches = e.touches;
    });
  }

  /**
   * Setup gamepad listeners
   */
  setupGamepadListeners() {
    window.addEventListener('gamepadconnected', (e) => {
      console.log('Gamepad connected:', e.gamepad.id);
    });
  }

  /**
   * Get movement direction from keyboard
   */
  getMovementDirection() {
    const direction = new THREE.Vector3();

    if (this.keys['w'] || this.keys['arrowup']) direction.z -= 1;
    if (this.keys['s'] || this.keys['arrowdown']) direction.z += 1;
    if (this.keys['a'] || this.keys['arrowleft']) direction.x -= 1;
    if (this.keys['d'] || this.keys['arrowright']) direction.x += 1;

    if (direction.length() > 0) {
      direction.normalize();
    }

    return direction;
  }

  /**
   * Check if specific key is pressed
   */
  isKeyPressed(key) {
    return this.keys[key.toLowerCase()] || false;
  }
}
