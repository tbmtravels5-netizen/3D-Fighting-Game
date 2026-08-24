/**
 * Arena Base Class
 */

import * as THREE from 'three';

export class Arena {
  constructor(config) {
    this.name = config.name || 'Default Arena';
    this.type = config.type || 'neutral';
    this.width = config.width || 30;
    this.length = config.length || 50;
    this.group = new THREE.Group();

    this.ambientLight = null;
    this.directionalLight = null;
    this.ground = null;
    this.walls = [];
    this.hazards = [];

    this.groundMaterial = config.groundMaterial || new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8,
      metalness: 0.2,
    });
  }

  create() {
    this.createGround();
    this.createWalls();
    this.createLighting();
    this.createEnvironment();
    return this.group;
  }

  createGround() {
    const groundGeometry = new THREE.PlaneGeometry(this.width, this.length);
    this.ground = new THREE.Mesh(groundGeometry, this.groundMaterial);
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.receiveShadow = true;
    this.group.add(this.ground);
  }

  createWalls() {
    const wallHeight = 5;
    const wallThickness = 0.5;
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.9,
      metalness: 0,
    });

    const frontWall = new THREE.Mesh(
      new THREE.BoxGeometry(this.width, wallHeight, wallThickness),
      wallMaterial
    );
    frontWall.position.z = this.length / 2;
    frontWall.castShadow = true;
    this.walls.push(frontWall);
    this.group.add(frontWall);

    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(this.width, wallHeight, wallThickness),
      wallMaterial
    );
    backWall.position.z = -this.length / 2;
    backWall.castShadow = true;
    this.walls.push(backWall);
    this.group.add(backWall);
  }

  createLighting() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.group.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this.directionalLight.position.set(20, 30, 20);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.set(2048, 2048);
    this.directionalLight.shadow.camera.left = -40;
    this.directionalLight.shadow.camera.right = 40;
    this.directionalLight.shadow.camera.top = 40;
    this.directionalLight.shadow.camera.bottom = -40;
    this.group.add(this.directionalLight);
  }

  createEnvironment() {
    // Override in subclasses
  }

  update(deltaTime) {
    // Update arena effects
  }
}
