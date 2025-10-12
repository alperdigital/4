/**
 * LoaderCanvas Animation Class
 * Handles the loading screen canvas animation
 */

import { CONFIG } from '../config.js';
import { getCodeRainColors, getRandomMatrixChar, randomInRange } from '../utils.js';

export class LoaderCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.drops = [];
    this.isRunning = false;
    
    this.init();
  }

  /**
   * Initialize the loader canvas
   */
  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  /**
   * Resize canvas and reinitialize drops
   */
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initDrops();
  }

  /**
   * Initialize drop particles
   */
  initDrops() {
    this.drops = [];
    const fontSize = 12;
    const columns = Math.floor(this.canvas.width / fontSize);
    
    for (let i = 0; i < columns; i++) {
      this.drops[i] = {
        x: i * fontSize,
        y: Math.random() * this.canvas.height,
        speed: randomInRange(1, 3),
        char: Math.random() > 0.5 ? '0' : '1'
      };
    }
  }

  /**
   * Start the animation
   */
  start() {
    this.isRunning = true;
    this.animate();
  }

  /**
   * Stop the animation
   */
  stop() {
    this.isRunning = false;
  }

  /**
   * Main animation loop
   */
  animate() {
    if (!this.isRunning) return;
    
    this.clearCanvas();
    this.setupCanvas();
    this.drawDrops();
    this.updateDrops();
    
    requestAnimationFrame(() => this.animate());
  }

  /**
   * Clear canvas with fade effect
   */
  clearCanvas() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Setup canvas drawing properties
   */
  setupCanvas() {
    const colors = getCodeRainColors();
    this.ctx.fillStyle = colors.color;
    this.ctx.font = '12px monospace';
  }

  /**
   * Draw all drops
   */
  drawDrops() {
    this.drops.forEach(drop => {
      this.ctx.fillText(drop.char, drop.x, drop.y);
    });
  }

  /**
   * Update drop positions
   */
  updateDrops() {
    this.drops.forEach(drop => {
      drop.y += drop.speed;
      
      if (drop.y > this.canvas.height) {
        drop.y = -20;
        drop.char = Math.random() > 0.5 ? '0' : '1';
        drop.speed = randomInRange(1, 3);
      }
    });
  }
}
