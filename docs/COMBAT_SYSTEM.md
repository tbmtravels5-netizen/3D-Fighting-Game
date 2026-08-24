# Combat System Documentation

## Overview
The combat system is the core of ARENA MASTERS. It handles attacks, damage, combos, and hit detection.

## Attack Types

### Basic Attacks
- **Light Punch**: 8 damage, 2m range, 5 stamina
- **Heavy Punch**: 15 damage, 2.5m range, 10 stamina
- **Light Kick**: 10 damage, 3m range, 7 stamina
- **Heavy Kick**: 18 damage, 3.5m range, 12 stamina

### Advanced Attacks
- **Grab/Throw**: 12 damage, 2m range, 8 stamina
- **Special Move**: 25 damage, 4m range, 30 stamina (unique per fighter)
- **Ultimate Finisher**: 40 damage, 5m range, 100 stamina (cinematic)

## Combo System

Combos are detected when attacks land in rapid succession:

```
Punch → Punch → Kick = "Triple Strike" (1.5x damage multiplier)
Punch → Punch → Punch = "Combo Master" (1.3x damage multiplier)
Kick → Kick → Kick = "Spinning Kicks" (1.4x damage multiplier)
```

## Defense Mechanics

### Block
- Reduces incoming damage by 50%
- Uses stamina slowly
- Cannot be held indefinitely

### Perfect Block
- Timing-based block (frames before hit)
- No damage taken
- Recovers stamina

### Dodge/Dash
- Invulnerability frames
- 8 stamina cost
- Can dash in any direction

## Damage Calculation

```
Final Damage = Base Damage × Attacker Damage Stat × (1 - Target Defense Stat) × Random(0.85-1.15)
```

## Stamina System

Stamina regenerates automatically:
- Base regeneration: 0.5 per frame
- Blocking slightly reduces regeneration
- Special moves and ultimates consume large amounts

## Hit Detection

- Distance-based collision
- Direction-based (attacker must face target)
- Animation-linked hit frames
- Knockback applied on successful hit
