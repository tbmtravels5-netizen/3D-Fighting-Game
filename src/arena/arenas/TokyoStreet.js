/**
 * Tokyo Street Arena
 */

import { Arena } from '../Arena.js';
import * as THREE from 'three';

export class TokyoStreet extends Arena {
  constructor(config = {}) {
    super({
      name: 'Tokyo Street',
      type: 'urban',
      groundMaterial: new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.6,
        metalness: 0.3,
      }),
      ...config,
    });
  }

  createEnvironment() {
    // Neon signs
    const neonGeometry = new THREE.BoxGeometry(5, 3, 0.5);
    const neonMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      emissive: 0xff00ff,
    });
    const neonSign = new THREE.Mesh(neonGeometry, neonMaterial);
    neonSign.position.set(12, 5, -20);
    this.group.add(neonSign);

    // Skyscrapers
    const buildingGeometry = new THREE.BoxGeometry(8, 40, 6);
    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.8,
    });
    const building1 = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building1.position.set(-20, 20, -30);
    building1.castShadow = true;
    this.group.add(building1);

    const building2 = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building2.position.set(20, 22, -30);
    building2.castShadow = true;
    this.group.add(building2);
  }
}
