# Installation & Setup Guide

## Prerequisites

### System Requirements
```
OS: Windows 10+, macOS 10.14+, Linux
CPU: Intel i5 or equivalent
RAM: 8GB minimum
GPU: Dedicated GPU recommended
Browser: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
```

### Software Requirements
```
Node.js: v16.0.0 or higher
npm: v7.0.0 or higher
Git: Latest version
Text Editor: VS Code recommended
```

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/tbmtravels5-netizen/3D-Fighting-Game.git
cd 3D-Fighting-Game
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- `three.js` - 3D rendering
- `cannon-es` - Physics engine
- `gsap` - Animation library
- `webpack` & `webpack-dev-server` - Build tools
- `babel` - JavaScript transpiler
- Development dependencies (ESLint, Jest, etc.)

### 3. Start Development Server
```bash
npm run dev
```

The game will be available at: `http://localhost:8080`

### 4. Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

### 5. Run Tests
```bash
npm test
```

## Project Structure

```
src/
├── index.js                  # Entry point
├── config/
│   ├── constants.js          # Game constants
│   └── settings.js           # Settings manager
├── core/
│   ├── Game.js               # Main game class
│   ├── Scene.js              # Scene setup
│   └── Camera.js             # Camera manager
├── fighting/
│   ├── Fighter.js            # Fighter base class
│   ├── Combat.js             # Combat system
│   ├── Combo.js              # Combo detection
│   ├── fighters/             # Fighter implementations
│   │   ├── Raiden.js
│   │   ├── Phoenix.js
│   │   ├── Frost.js
│   │   ├── Shadow.js
│   │   ├── Titan.js
│   │   └── Echo.js
│   └── AI.js                 # AI opponent
├── arena/
│   ├── Arena.js              # Arena base class
│   └── arenas/               # Arena implementations
├── ui/
│   ├── UIManager.js
│   └── screens/              # UI screens
├── input/
│   ├── InputManager.js
│   ├── KeyboardControls.js
│   ├── TouchControls.js
│   └── GamepadControls.js
├── progression/
│   ├── Player.js
│   ├── XPSystem.js
│   ├── Achievements.js
│   └── Stats.js
├── audio/
│   ├── AudioManager.js
│   └── SoundEffects.js
├── effects/
│   ├── ParticleSystem.js
│   ├── HitEffects.js
│   └── CameraEffects.js
├── save/
│   └── SaveManager.js
└── utils/
    ├── Logger.js
    └── Math.js

public/
├── index.html                # HTML entry point
└── assets/
    ├── models/               # 3D models
    ├── textures/             # Textures
    ├── animations/           # Animation files
    └── audio/                # Sound files
```

## Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/combat-system
```

### 2. Make Changes
```bash
# Edit files in src/
npm run lint          # Check code quality
npm run lint:fix      # Auto-fix issues
```

### 3. Test Your Changes
```bash
npm test              # Run unit tests
npm run dev           # Test in browser
```

### 4. Commit & Push
```bash
git add .
git commit -m "Add combat system"
git push origin feature/combat-system
```

### 5. Create Pull Request
Open PR on GitHub for code review.

## Debugging Tips

### Enable Debug Mode
```javascript
// In browser console
window.DEBUG = true;
window.game.getFPS();  // Check FPS
```

### Monitor Performance
```bash
npm run analyze  # Bundle size analysis
```

### Check Browser DevTools
- F12 to open DevTools
- Console tab for errors
- Performance tab for profiling
- Network tab for asset loading

## Deployment

### Deploy to GitHub Pages
```bash
npm run build
git add dist/
git commit -m "Build for deployment"
git push origin main
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

## Performance Tips

1. **Monitor FPS**: Should maintain 60 FPS on desktop, 30-60 on mobile
2. **Optimize Assets**: Compress images, limit particle count
3. **Use LOD**: Different model quality based on distance
4. **Cache**: Reuse materials, geometries, textures
5. **Mobile**: Test on actual devices, not just browser emulation

## Troubleshooting

### Issue: Port 8080 already in use
```bash
# Find process using port 8080
lsof -i :8080
# Kill process
kill -9 <PID>
```

### Issue: Assets not loading
- Check `public/assets/` folder exists
- Verify file paths in code
- Check browser console for 404 errors

### Issue: Game runs slowly
- Lower graphics quality setting
- Disable shadows/particles
- Check DevTools Performance tab
- Reduce particle count

## Resources

- [Three.js Docs](https://threejs.org/docs/)
- [Cannon-es Docs](https://github.com/react-three/cannon-es)
- [GSAP Docs](https://gsap.com/docs/)
- [Webpack Docs](https://webpack.js.org/)
- [Node.js Docs](https://nodejs.org/en/docs/)

## Getting Help

- Check existing GitHub issues
- Create new issue with detailed description
- Include error messages and browser info
- Attach screenshot/video if possible
