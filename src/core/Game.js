/**
 * Main Game Manager
 * Orchestrates all game systems
 */

import * as THREE from 'three';
import { GAME_CONFIG } from '../config/constants.js';
import { SettingsManager } from '../config/settings.js';

export class Game {
  constructor(config = GAME_CONFIG) {
    this.config = config;
    this.settingsManager = new SettingsManager();

    // Core systems
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();

    // Game state
    this.isRunning = false;
    this.isPaused = false;
    this.currentMode = null;
    this.players = [];
    this.currentRound = 0;

    // Performance
    this.fps = 0;
    this.frameCount = 0;
    this.fpsUpdateTime = 0;
  }

  /**
   * Initialize the game
   */
  async init() {
    console.log('Initializing ARENA MASTERS...');

    // Setup Three.js scene
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupLighting();

    // Load assets
    await this.loadAssets();

    // Setup input
    this.setupInput();

    // Setup UI
    this.setupUI();

    console.log('✅ Game initialized successfully');
  }

  /**
   * Setup Three.js scene
   */
  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a2e);
    this.scene.fog = new THREE.Fog(0x1a1a2e, 100, 500);
  }

  /**
   * Setup camera
   */
  setupCamera() {
    const width = this.config.display.width;
    const height = this.config.display.height;
    const aspect = width / height;

    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.set(0, 10, 30);
    this.camera.lookAt(0, 5, 0);
  }

  /**
   * Setup WebGL renderer
   */
  setupRenderer() {
    const container = document.getElementById('game-container') || document.body;

    this.renderer = new THREE.WebGLRenderer({
      antialias: this.config.display.antialias,
      alpha: false,
    });

    this.renderer.setSize(
      this.config.display.width,
      this.config.display.height
    );
    this.renderer.setPixelRatio(this.config.display.pixelRatio);
    this.renderer.shadowMap.enabled = this.config.display.shadowMap;
    this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;

    container.appendChild(this.renderer.domElement);
  }

  /**
   * Setup scene lighting
   */
  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(50, 50, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(2048, 2048);
    sunLight.shadow.camera.far = 200;
    this.scene.add(sunLight);
  }

  /**
   * Load game assets (async)
   */
  async loadAssets() {
    // TODO: Load 3D models, textures, animations, audio
    return Promise.resolve();
  }

  /**
   * Setup input handlers
   */
  setupInput() {
    // TODO: Setup keyboard, mouse, gamepad, touch controls
  }

  /**
   * Setup UI system
   */
  setupUI() {
    // TODO: Create UI manager and screens
  }

  /**
   * Start the game loop
   */
  start() {
    this.isRunning = true;
    this.gameLoop();
  }

  /**
   * Main game loop
   */
  gameLoop() {
    requestAnimationFrame(() => this.gameLoop());

    if (this.isPaused) return;

    const deltaTime = Math.min(this.clock.getDelta(), 0.016); // Cap at 60 FPS

    // Update game logic
    this.update(deltaTime);

    // Render
    this.renderer.render(this.scene, this.camera);

    // Update FPS counter
    this.updateFPS(deltaTime);
  }

  /**
   * Update game logic
   */
  update(deltaTime) {
    // Update players
    for (const player of this.players) {
      player.update(deltaTime);
    }
  }

  /**
   * Update FPS counter
   */
  updateFPS(deltaTime) {
    this.frameCount++;
    this.fpsUpdateTime += deltaTime;

    if (this.fpsUpdateTime >= 1) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.fpsUpdateTime = 0;
    }
  }

  /**
   * Pause the game
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * Resume the game
   */
  resume() {
    this.isPaused = false;
  }

  /**
   * Handle window resize
   */
  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * Save player progress
   */
  saveProgress() {
    // TODO: Implement save system
  }

  /**
   * Get current FPS
   */
  getFPS() {
    return this.fps;
  }
}
