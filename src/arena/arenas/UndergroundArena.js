/**
 * Underground Arena
 */

import { Arena } from '../Arena.js';
import * as THREE from 'three';

export class UndergroundArena extends Arena {
  constructor(config = {}) {
    super({
      name: 'Underground Arena',
      type: 'neutral',
      groundMaterial: new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.9,
        metalness: 0,
      }),
      ...config,
    });
  }

  createEnvironment() {
    const columnGeometry = new THREE.CylinderGeometry(1, 1.2, 15, 8);
    const columnMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.95,
    });

    for (let i = 0; i < 4; i++) {
      const column = new THREE.Mesh(columnGeometry, columnMaterial);
      column.position.x = (i - 1.5) * 8;
      column.position.z = -15;
      column.castShadow = true;
      this.group.add(column);
    }

    const ceilingGeometry = new THREE.PlaneGeometry(this.width, this.length);
    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.8,
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 20;
    this.group.add(ceiling);
  }
}
