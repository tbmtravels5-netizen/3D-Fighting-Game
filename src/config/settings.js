/**
 * Game Settings Manager
 * Handles all user preferences and settings
 */

export class SettingsManager {
  constructor() {
    this.settings = this.loadSettings();
  }

  loadSettings() {
    const saved = localStorage.getItem('gameSettings');
    return saved ? JSON.parse(saved) : this.getDefaultSettings();
  }

  getDefaultSettings() {
    return {
      audio: {
        masterVolume: 0.8,
        musicVolume: 0.6,
        sfxVolume: 0.8,
        muted: false,
      },
      graphics: {
        quality: 'Medium',
        vsync: true,
        fpsLimit: 60,
        resolution: 'auto',
        shadows: true,
        particles: true,
      },
      gameplay: {
        difficulty: 'Normal',
        controlScheme: 'Keyboard',
        autoSave: true,
        vibration: true,
      },
      accessibility: {
        colorblindMode: 'none',
        textSize: 'normal',
        subtitles: true,
      },
    };
  }

  getSetting(path) {
    return this.getNestedValue(this.settings, path.split('.'));
  }

  setSetting(path, value) {
    this.setNestedValue(this.settings, path.split('.'), value);
    this.saveSettings();
  }

  getNestedValue(obj, keys) {
    return keys.reduce((acc, key) => acc?.[key], obj);
  }

  setNestedValue(obj, keys, value) {
    const lastKey = keys.pop();
    const target = keys.reduce((acc, key) => acc[key] = acc[key] || {}, obj);
    target[lastKey] = value;
  }

  saveSettings() {
    localStorage.setItem('gameSettings', JSON.stringify(this.settings));
  }

  resetToDefaults() {
    this.settings = this.getDefaultSettings();
    this.saveSettings();
  }
}
