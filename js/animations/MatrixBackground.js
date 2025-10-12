/**
 * MatrixBackground Animation Class
 * Handles the full-screen matrix background effect
 */

import { CONFIG } from '../config.js';
import { getCodeRainColors, getRandomMatrixChar, randomInRange, parseRGBAWithOpacity, resizeCanvas } from '../utils.js';

export class MatrixBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.drops = [];
    this.animationId = null;
    this.isRunning = false;
    this.fontSize = CONFIG.MATRIX_BG.FONT_SIZE;
    
    this.init();
  }

  /**
   * Initialize the matrix background
   */
  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  /**
   * Resize canvas and reinitialize drops
   */
  resize() {
    resizeCanvas(this.canvas);
    this.initDrops();
  }

  /**
   * Initialize drop particles
   */
  initDrops() {
    this.drops = [];
    const { SPEED_RANGE, MAX_DROPS } = CONFIG.MATRIX_BG;
    const columns = Math.floor(this.canvas.width / this.fontSize);
    const maxDrops = Math.min(columns, MAX_DROPS);
    
    for (let i = 0; i < maxDrops; i++) {
      this.drops[i] = this.createDrop(i * this.fontSize, SPEED_RANGE);
    }
  }

  /**
   * Create a single drop particle
   * @param {number} x - X position
   * @param {Object} speedRange - Speed range configuration
   * @returns {Object} Drop object
   */
  createDrop(x, speedRange) {
    return {
      x,
      y: Math.random() * this.canvas.height,
      speed: randomInRange(speedRange.min, speedRange.max),
      char: getRandomMatrixChar(),
      trail: [],
      opacity: Math.random() * 0.5 + 0.3,
      glitchTimer: 0
    };
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
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  /**
   * Main animation loop
   */
  animate() {
    if (!this.isRunning) return;
    
    this.clearCanvas();
    this.setupCanvas();
    this.drawDrops();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  /**
   * Clear canvas with fade effect
   */
  clearCanvas() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Setup canvas drawing properties
   */
  setupCanvas() {
    this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
    this.ctx.textAlign = 'center';
  }

  /**
   * Draw all drops
   */
  drawDrops() {
    const colors = getCodeRainColors();
    
    this.drops.forEach(drop => {
      this.drawDropTrail(drop, colors);
      this.drawDropMain(drop, colors);
      this.updateDrop(drop);
    });
  }

  /**
   * Draw drop trail effect
   * @param {Object} drop - Drop object
   * @param {Object} colors - Color configuration
   */
  drawDropTrail(drop, colors) {
    const { TRAIL_LENGTH } = CONFIG.MATRIX_BG;
    
    drop.trail.forEach((trailPoint, index) => {
      const trailOpacity = (trailPoint.opacity * (1 - index / drop.trail.length)) * 0.3;
      const trailColor = parseRGBAWithOpacity(colors.glow, trailOpacity * 1.2);
      this.ctx.fillStyle = trailColor;
      this.ctx.fillText(trailPoint.char, trailPoint.x, trailPoint.y);
    });
  }

  /**
   * Draw main drop character
   * @param {Object} drop - Drop object
   * @param {Object} colors - Color configuration
   */
  drawDropMain(drop, colors) {
    const mainColor = parseRGBAWithOpacity(colors.glow, drop.opacity * 1.1);
    this.ctx.fillStyle = mainColor;
    this.ctx.shadowColor = colors.glow;
    this.ctx.shadowBlur = 8;
    this.ctx.fillText(drop.char, drop.x, drop.y);
    this.ctx.shadowBlur = 0;
  }

  /**
   * Update drop position and properties
   * @param {Object} drop - Drop object
   */
  updateDrop(drop) {
    // Add current position to trail
    drop.trail.push({
      x: drop.x,
      y: drop.y,
      char: drop.char,
      opacity: drop.opacity
    });

    // Limit trail length
    if (drop.trail.length > CONFIG.MATRIX_BG.TRAIL_LENGTH) {
      drop.trail.shift();
    }

    // Update position
    drop.y += drop.speed;

    // Reset drop when it reaches bottom
    if (drop.y > this.canvas.height) {
      drop.y = -20;
      drop.char = getRandomMatrixChar();
      drop.speed = randomInRange(CONFIG.MATRIX_BG.SPEED_RANGE.min, CONFIG.MATRIX_BG.SPEED_RANGE.max);
      drop.opacity = Math.random() * 0.5 + 0.3;
      drop.trail = [];
    }

    // Character morphing
    if (Math.random() < CONFIG.ANIMATION.MORPH_PROBABILITY) {
      drop.char = getRandomMatrixChar();
    }
  }
}

