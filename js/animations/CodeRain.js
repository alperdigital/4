/**
 * CodeRain Animation Class
 * Handles the falling code rain effect
 */

import { CONFIG } from '../config.js';
import { getCodeRainColors, getRandomMatrixChar, randomInRange, parseRGBAWithOpacity, resizeCanvas } from '../utils.js';

export class CodeRain {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.drops = [];
    this.animationId = null;
    this.isRunning = false;
    
    this.init();
  }

  /**
   * Initialize the code rain
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
    const { FONT_SIZE, SPEED_RANGE } = CONFIG.CODE_RAIN;
    const columns = Math.floor(this.canvas.width / FONT_SIZE);
    
    for (let i = 0; i < columns; i++) {
      this.drops[i] = this.createDrop(i * FONT_SIZE, SPEED_RANGE);
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
    this.ctx.font = `${CONFIG.CODE_RAIN.FONT_SIZE}px "Courier New", monospace`;
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
      this.handleDropGlitch(drop, colors);
    });
  }

  /**
   * Draw drop trail effect
   * @param {Object} drop - Drop object
   * @param {Object} colors - Color configuration
   */
  drawDropTrail(drop, colors) {
    const { TRAIL_LENGTH, TRAIL_SPACING } = CONFIG.CODE_RAIN;
    
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const trailY = drop.y - (i * TRAIL_SPACING);
      if (trailY > 0) {
        const opacity = Math.max(0, (1 - (i * 0.08)) * 0.4);
        this.ctx.fillStyle = parseRGBAWithOpacity(colors.glow, opacity);
        this.ctx.fillText(drop.char, drop.x, trailY);
      }
    }
  }

  /**
   * Draw main drop character
   * @param {Object} drop - Drop object
   * @param {Object} colors - Color configuration
   */
  drawDropMain(drop, colors) {
    this.ctx.fillStyle = colors.color;
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
    drop.y += drop.speed;
    
    if (drop.y > this.canvas.height) {
      drop.y = -20;
      drop.char = getRandomMatrixChar();
      drop.speed = randomInRange(CONFIG.CODE_RAIN.SPEED_RANGE.min, CONFIG.CODE_RAIN.SPEED_RANGE.max);
    }
    
    // Character morphing
    if (Math.random() < CONFIG.ANIMATION.MORPH_PROBABILITY) {
      drop.char = getRandomMatrixChar();
    }
  }

  /**
   * Handle drop glitch effects
   * @param {Object} drop - Drop object
   * @param {Object} colors - Color configuration
   */
  handleDropGlitch(drop, colors) {
    if (drop.glitchTimer > 0) {
      this.drawGlitchEffect(drop, colors, 5);
      drop.glitchTimer -= 16;
    } else if (Math.random() < CONFIG.ANIMATION.GLITCH_PROBABILITY) {
      this.drawGlitchEffect(drop, colors, 0);
    }
  }

  /**
   * Draw glitch effect
   * @param {Object} drop - Drop object
   * @param {Object} colors - Color configuration
   * @param {number} shadowBlur - Shadow blur amount
   */
  drawGlitchEffect(drop, colors, shadowBlur) {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    drop.char = glitchChars[Math.floor(Math.random() * glitchChars.length)];
    
    this.ctx.fillStyle = colors.color;
    this.ctx.shadowColor = colors.glow;
    this.ctx.shadowBlur = shadowBlur;
    this.ctx.fillText(drop.char, drop.x, drop.y);
    this.ctx.shadowBlur = 0;
  }

  /**
   * Trigger glitch effect
   */
  triggerGlitch() {
    this.drops.forEach(drop => {
      if (Math.random() < 0.3) {
        drop.glitchTimer = 100;
      }
    });
  }

  /**
   * Increase animation intensity
   */
  increaseIntensity() {
    this.drops.forEach(drop => {
      drop.speed *= 1.5;
    });
  }

  /**
   * Create matrix explosion effect
   */
  createMatrixExplosion() {
    const colors = getCodeRainColors();
    const originalFillStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = colors.glow;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = originalFillStyle;
  }
}
