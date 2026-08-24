/**
 * Game Constants and Configuration
 * Centralized configuration for all game systems
 */

export const GAME_CONFIG = {
  // Display Settings
  display: {
    width: 1280,
    height: 720,
    pixelRatio: window.devicePixelRatio || 1,
    antialias: true,
    shadowMap: true,
  },

  // Physics Settings
  physics: {
    gravity: -9.82,
    timeStep: 1 / 60,
    defaultMass: 1,
  },

  // Combat Settings
  combat: {
    roundTime: 180000, // 3 minutes in ms
    maxHealth: 100,
    maxStamina: 100,
    staminaRegen: 0.5,
    staminaDepletion: {
      punch: 5,
      kick: 7,
      special: 30,
      ultimate: 100,
    },
  },

  // AI Settings
  ai: {
    difficultyLevels: ['Easy', 'Normal', 'Hard', 'Expert'],
    reactionTime: 500, // ms
    decisionInterval: 1000, // ms
  },

  // Game Modes
  gameModes: ['Story', 'Arcade', 'Training', 'VsAI', 'Survival', 'TimeAttack'],

  // Fighters
  fighters: {
    Raiden: {
      name: 'Raiden',
      type: 'Lightning Specialist',
      health: 95,
      speed: 9,
      damage: 8,
      defense: 7,
    },
    Phoenix: {
      name: 'Phoenix',
      type: 'Fire Specialist',
      health: 100,
      speed: 7,
      damage: 8,
      defense: 8,
    },
    Frost: {
      name: 'Frost',
      type: 'Ice Specialist',
      health: 98,
      speed: 6,
      damage: 7,
      defense: 9,
    },
    Shadow: {
      name: 'Shadow',
      type: 'Speed Specialist',
      health: 85,
      speed: 10,
      damage: 7,
      defense: 6,
    },
    Titan: {
      name: 'Titan',
      type: 'Power Specialist',
      health: 110,
      speed: 5,
      damage: 10,
      defense: 9,
    },
    Echo: {
      name: 'Echo',
      type: 'Balanced',
      health: 100,
      speed: 7,
      damage: 8,
      defense: 8,
    },
  },

  // Arenas
  arenas: [
    'TokyoStreet',
    'Rooftop',
    'UndergroundArena',
    'DesertTemple',
    'CyberpunkCity',
  ],

  // Audio
  audio: {
    masterVolume: 0.8,
    musicVolume: 0.6,
    sfxVolume: 0.8,
    voiceVolume: 0.9,
  },

  // Graphics Quality Levels
  qualityLevels: {
    Low: {
      shadowMapSize: 512,
      particleLimit: 1000,
      maxLights: 2,
      fpsTarget: 30,
    },
    Medium: {
      shadowMapSize: 1024,
      particleLimit: 5000,
      maxLights: 4,
      fpsTarget: 60,
    },
    High: {
      shadowMapSize: 2048,
      particleLimit: 10000,
      maxLights: 8,
      fpsTarget: 60,
    },
  },

  // Progression
  progression: {
    maxLevel: 100,
    xpPerWin: 100,
    xpPerLoss: 25,
    xpPerAchievement: 50,
  },

  // Server (Future Multiplayer)
  server: {
    url: process.env.SERVER_URL || 'http://localhost:3000',
    port: 3000,
    socketTimeout: 5000,
  },
};

export const KEYBINDS = {
  movement: {
    up: ['w', 'ArrowUp'],
    down: ['s', 'ArrowDown'],
    left: ['a', 'ArrowLeft'],
    right: ['d', 'ArrowRight'],
  },
  actions: {
    punch: ['1', 'x'],
    kick: ['2', 'c'],
    special: ['5', 'z'],
    ultimate: ['6', 'v'],
    block: ['7', 'shift'],
    grab: ['8', 'q'],
    dash: [' ', 'spacebar'],
    pause: ['p', 'escape'],
  },
};

export const COLORS = {
  primary: 0xff6b00,
  secondary: 0x00d4ff,
  health: 0xff3333,
  stamina: 0x33ff33,
  special: 0xffaa00,
  ultimate: 0xaa00ff,
  text: 0xffffff,
};
