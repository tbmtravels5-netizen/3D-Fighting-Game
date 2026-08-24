/**
 * UI Manager - Handles all UI screens and displays
 */

export class UIManager {
  constructor(game) {
    this.game = game;
    this.currentScreen = 'mainMenu';
    this.screens = {};
    this.hud = null;
    this.container = document.getElementById('game-container');
    this.setupUI();
  }

  setupUI() {
    // Create main menu
    this.screens.mainMenu = this.createMainMenu();
    // Create HUD for in-game
    this.screens.hud = this.createHUD();
    // Show main menu by default
    this.showScreen('mainMenu');
  }

  createMainMenu() {
    const menu = document.createElement('div');
    menu.id = 'main-menu';
    menu.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 100;
      color: white;
      font-family: Arial, sans-serif;
    `;

    const title = document.createElement('h1');
    title.textContent = '🥊 ARENA MASTERS';
    title.style.cssText = `
      font-size: 64px;
      margin-bottom: 40px;
      background: linear-gradient(45deg, #ff6b00, #00d4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    `;

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 20px;
      min-width: 300px;
    `;

    const buttons = [
      { text: 'Start Game', action: () => this.game.startGameMode('arcade') },
      { text: 'Training', action: () => this.game.startGameMode('training') },
      { text: 'Settings', action: () => this.showScreen('settings') },
    ];

    buttons.forEach(btn => {
      const button = document.createElement('button');
      button.textContent = btn.text;
      button.style.cssText = `
        padding: 15px 30px;
        font-size: 18px;
        background: #ff6b00;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
      `;
      button.onmouseover = () => button.style.transform = 'scale(1.05)';
      button.onmouseout = () => button.style.transform = 'scale(1)';
      button.onclick = btn.action;
      buttonContainer.appendChild(button);
    });

    menu.appendChild(title);
    menu.appendChild(buttonContainer);
    this.container.appendChild(menu);
    return menu;
  }

  createHUD() {
    const hud = document.createElement('div');
    hud.id = 'game-hud';
    hud.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      font-family: Arial, sans-serif;
      color: white;
      z-index: 10;
    `;

    // Player 1 Health Bar
    const p1HealthBar = document.createElement('div');
    p1HealthBar.id = 'p1-health';
    p1HealthBar.style.cssText = `
      position: absolute;
      top: 20px; left: 20px;
      width: 300px;
      height: 40px;
      background: #333;
      border: 2px solid #ff6b00;
      border-radius: 5px;
      overflow: hidden;
    `;

    const p1HealthFill = document.createElement('div');
    p1HealthFill.id = 'p1-health-fill';
    p1HealthFill.style.cssText = `
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #ff3333, #ff6b00);
      transition: width 0.1s;
    `;
    p1HealthBar.appendChild(p1HealthFill);

    // Player 2 Health Bar
    const p2HealthBar = document.createElement('div');
    p2HealthBar.id = 'p2-health';
    p2HealthBar.style.cssText = `
      position: absolute;
      top: 20px; right: 20px;
      width: 300px;
      height: 40px;
      background: #333;
      border: 2px solid #00d4ff;
      border-radius: 5px;
      overflow: hidden;
    `;

    const p2HealthFill = document.createElement('div');
    p2HealthFill.id = 'p2-health-fill';
    p2HealthFill.style.cssText = `
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #00d4ff, #00ff88);
      transition: width 0.1s;
      margin-left: auto;
    `;
    p2HealthBar.appendChild(p2HealthFill);

    // Combo Counter
    const comboDisplay = document.createElement('div');
    comboDisplay.id = 'combo-display';
    comboDisplay.style.cssText = `
      position: absolute;
      bottom: 100px; left: 50%;
      transform: translateX(-50%);
      font-size: 36px;
      font-weight: bold;
      color: #ffaa00;
      text-shadow: 0 0 10px rgba(255, 170, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
    `;
    comboDisplay.textContent = 'COMBO x1';

    // FPS Display
    const fpsDisplay = document.createElement('div');
    fpsDisplay.id = 'fps-display';
    fpsDisplay.style.cssText = `
      position: absolute;
      bottom: 20px; right: 20px;
      font-size: 14px;
      color: #00ff88;
      font-family: monospace;
    `;
    fpsDisplay.textContent = 'FPS: 60';

    hud.appendChild(p1HealthBar);
    hud.appendChild(p2HealthBar);
    hud.appendChild(comboDisplay);
    hud.appendChild(fpsDisplay);
    this.container.appendChild(hud);
    return hud;
  }

  showScreen(screenName) {
    // Hide all screens
    Object.values(this.screens).forEach(screen => {
      if (screen) screen.style.display = 'none';
    });
    // Show selected screen
    if (this.screens[screenName]) {
      this.screens[screenName].style.display = 'flex';
      this.currentScreen = screenName;
    }
  }

  updateHealthBars(p1, p2) {
    const p1Fill = document.getElementById('p1-health-fill');
    const p2Fill = document.getElementById('p2-health-fill');

    if (p1Fill && p1) {
      const healthPercent = (p1.health / p1.maxHealth) * 100;
      p1Fill.style.width = healthPercent + '%';
    }

    if (p2Fill && p2) {
      const healthPercent = (p2.health / p2.maxHealth) * 100;
      p2Fill.style.width = healthPercent + '%';
    }
  }

  updateComboDisplay(comboCount) {
    const comboDisplay = document.getElementById('combo-display');
    if (comboDisplay) {
      if (comboCount > 1) {
        comboDisplay.textContent = `COMBO x${comboCount}`;
        comboDisplay.style.opacity = '1';
      } else {
        comboDisplay.style.opacity = '0';
      }
    }
  }

  updateFPS(fps) {
    const fpsDisplay = document.getElementById('fps-display');
    if (fpsDisplay) {
      fpsDisplay.textContent = `FPS: ${Math.round(fps)}`;
    }
  }

  hideHUD() {
    if (this.screens.hud) {
      this.screens.hud.style.display = 'none';
    }
  }

  showHUD() {
    if (this.screens.hud) {
      this.screens.hud.style.display = 'block';
    }
  }
}
