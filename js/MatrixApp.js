/**
 * MatrixApp - Main Application Class
 * Clean, modular architecture for the Matrix-themed website
 */

import { CONFIG } from './config.js';
import { isReducedMotion, getElementById, getElementBySelector } from './utils.js';
import { debugLog, debugError, checkElementExists, checkManagerExists } from './debug.js';

// Import animation classes
import { CodeRain } from './animations/CodeRain.js';
import { MatrixBackground } from './animations/MatrixBackground.js';
import { LoaderCanvas } from './animations/LoaderCanvas.js';

// Import manager classes
import { ThemeManager } from './theme/ThemeManager.js';
import { AudioManager } from './audio/AudioManager.js';
import { LanguageManager } from './language/LanguageManager.js';
import { MotionManager } from './accessibility/MotionManager.js';

export class MatrixApp {
  constructor() {
    this.isReducedMotion = isReducedMotion();
    this.managers = {};
    this.animations = {};
    
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    debugLog('Initializing MatrixApp...');
    
    if (this.isReducedMotion) {
      debugLog('Reduced motion detected, setting up reduced motion mode');
      this.setupReducedMotion();
      return;
    }

    this.initializeManagers();
    this.initializeAnimations();
    this.setupEventListeners();
    this.startLoadingSequence();
    
    debugLog('MatrixApp initialization complete');
  }

  /**
   * Setup reduced motion mode
   */
  setupReducedMotion() {
    document.body.classList.add('reduced-motion');
    this.initializeManagers();
  }

  /**
   * Initialize all manager classes
   */
  initializeManagers() {
    debugLog('Initializing managers...');
    
    try {
      this.managers.motion = new MotionManager();
      debugLog('MotionManager initialized');
    } catch (error) {
      debugError('Failed to initialize MotionManager', error);
    }
    
    try {
      this.managers.theme = new ThemeManager();
      debugLog('ThemeManager initialized');
    } catch (error) {
      debugError('Failed to initialize ThemeManager', error);
    }
    
    try {
      this.managers.audio = new AudioManager();
      debugLog('AudioManager initialized');
    } catch (error) {
      debugError('Failed to initialize AudioManager', error);
    }
    
    try {
      this.managers.language = new LanguageManager();
      debugLog('LanguageManager initialized');
    } catch (error) {
      debugError('Failed to initialize LanguageManager', error);
    }
    
    debugLog('All managers initialized');
  }

  /**
   * Initialize all animation classes
   */
  initializeAnimations() {
    this.initializeLoaderCanvas();
    this.initializeMatrixBackground();
    this.initializeCodeRain();
  }

  /**
   * Initialize loader canvas animation
   */
  initializeLoaderCanvas() {
    const canvas = getElementById('loader-canvas', 'MatrixApp.initializeLoaderCanvas');
    if (canvas) {
      this.animations.loaderCanvas = new LoaderCanvas(canvas);
    }
  }

  /**
   * Initialize matrix background animation
   */
  initializeMatrixBackground() {
    const canvas = getElementById('matrix-background', 'MatrixApp.initializeMatrixBackground');
    if (canvas) {
      this.animations.matrixBackground = new MatrixBackground(canvas);
    }
  }

  /**
   * Initialize code rain animation
   */
  initializeCodeRain() {
    const canvas = getElementBySelector('.code-rain', 'MatrixApp.initializeCodeRain');
    if (canvas) {
      this.animations.codeRain = new CodeRain(canvas);
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    this.setupMatrixInteractions();
    this.setupScrollEffects();
    this.setupEasterEggs();
  }

  /**
   * Setup matrix interactions
   */
  setupMatrixInteractions() {
    const codeRainCanvas = getElementBySelector('.code-rain');
    if (!codeRainCanvas || !this.animations.codeRain) return;

    // Mouse hover effects
    codeRainCanvas.addEventListener('mousemove', () => {
      if (Math.random() < 0.1) {
        this.animations.codeRain.triggerGlitch();
      }
    });

    // Click effects
    codeRainCanvas.addEventListener('click', () => {
      this.animations.codeRain.createMatrixExplosion();
      this.animations.codeRain.triggerGlitch();
    });
  }

  /**
   * Setup scroll effects
   */
  setupScrollEffects() {
    window.addEventListener('scroll', () => {
      if (Math.random() < 0.05 && this.animations.codeRain) {
        this.animations.codeRain.increaseIntensity();
      }
    });
  }

  /**
   * Setup easter eggs
   */
  setupEasterEggs() {
    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
      konamiCode.push(e.code);
      
      if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
      }
      
      if (konamiCode.join(',') === konamiSequence.join(',')) {
        this.triggerKonamiEasterEgg();
        konamiCode = [];
      }
    });
  }

  /**
   * Trigger Konami code easter egg
   */
  triggerKonamiEasterEgg() {
    if (this.animations.codeRain) {
      this.animations.codeRain.increaseIntensity();
    }
    
    // Add visual feedback
    document.body.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => {
      document.body.style.filter = '';
    }, 2000);
  }

  /**
   * Start loading sequence
   */
  startLoadingSequence() {
    this.setupMatrixLoader();
  }

  /**
   * Setup matrix loader
   */
  setupMatrixLoader() {
    const loader = getElementById('matrix-loader', 'MatrixApp.setupMatrixLoader');
    if (!loader) return;

    const progressBar = getElementBySelector('.progress-bar-matrix');
    const percentage = getElementBySelector('.loader-percentage');
    const status = getElementBySelector('.loader-status');

    if (this.animations.loaderCanvas) {
      this.animations.loaderCanvas.start();
    }

    this.animateProgressBar(progressBar, percentage, status, loader);
  }

  /**
   * Animate progress bar
   * @param {HTMLElement} progressBar - Progress bar element
   * @param {HTMLElement} percentage - Percentage display element
   * @param {HTMLElement} status - Status display element
   * @param {HTMLElement} loader - Loader container element
   */
  animateProgressBar(progressBar, percentage, status, loader) {
    const statusMessages = [
      'INITIALIZING SYSTEMS...',
      'LOADING MATRIX PROTOCOLS...',
      'ESTABLISHING CONNECTIONS...',
      'PREPARING INTERFACE...',
      'SYSTEMS READY...'
    ];

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        this.completeLoading(loader);
      }

      if (progressBar) progressBar.style.width = `${progress}%`;
      if (percentage) percentage.textContent = `${Math.floor(progress)}%`;
      
      const messageIndex = Math.floor((progress / 100) * statusMessages.length);
      if (status && statusMessages[messageIndex]) {
        status.textContent = statusMessages[messageIndex];
      }
    }, 100);
  }

  /**
   * Complete loading sequence
   * @param {HTMLElement} loader - Loader container element
   */
  completeLoading(loader) {
    setTimeout(() => {
      this.triggerScreenExplosion(loader);
    }, CONFIG.ANIMATION.EXPLOSION_DURATION);
  }

  /**
   * Trigger screen explosion effect
   * @param {HTMLElement} loader - Loader container element
   */
  triggerScreenExplosion(loader) {
    this.createExplosionEffect(loader);
    this.addErrorMessages(loader);
    this.finalizeLoading(loader);
  }

  /**
   * Create explosion effect
   * @param {HTMLElement} loader - Loader container element
   */
  createExplosionEffect(loader) {
    if (this.animations.codeRain) {
      this.animations.codeRain.createMatrixExplosion();
    }
  }

  /**
   * Add error messages
   * @param {HTMLElement} loader - Loader container element
   */
  addErrorMessages(loader) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'explosion-error';
    errorMessage.innerHTML = `
      <div class="error-text">SYSTEM ERROR</div>
      <div class="error-code">MATRIX_ENTRY_FAILED</div>
      <div class="error-message">SCREEN CORRUPTION DETECTED</div>
    `;
    loader.appendChild(errorMessage);
  }

  /**
   * Finalize loading sequence
   * @param {HTMLElement} loader - Loader container element
   */
  finalizeLoading(loader) {
    setTimeout(() => {
      this.startScreenCorruption(loader);
    }, CONFIG.ANIMATION.FADE_DURATION);
  }

  /**
   * Start screen corruption effect
   * @param {HTMLElement} loader - Loader container element
   */
  startScreenCorruption(loader) {
    loader.style.animation = 'screenCorruption 0.5s ease-in-out';
    
    setTimeout(() => {
      this.finalExplosion(loader);
    }, CONFIG.ANIMATION.FADE_DURATION);
  }

  /**
   * Final explosion effect
   * @param {HTMLElement} loader - Loader container element
   */
  finalExplosion(loader) {
    loader.style.animation = 'finalExplosion 1s ease-out';
    
    setTimeout(() => {
      this.hideLoader(loader);
    }, CONFIG.ANIMATION.EXPLOSION_DURATION);
  }

  /**
   * Hide loader and show main content
   * @param {HTMLElement} loader - Loader container element
   */
  hideLoader(loader) {
    loader.style.opacity = '0';
    
    setTimeout(() => {
      loader.style.display = 'none';
      this.startMainAnimations();
    }, CONFIG.ANIMATION.FADE_DURATION);
  }

  /**
   * Start main animations
   */
  startMainAnimations() {
    if (this.animations.matrixBackground) {
      this.animations.matrixBackground.start();
    }
    
    if (this.animations.codeRain) {
      this.animations.codeRain.start();
    }
  }

  /**
   * Get manager instance
   * @param {string} name - Manager name
   * @returns {Object} Manager instance
   */
  getManager(name) {
    return this.managers[name];
  }

  /**
   * Get animation instance
   * @param {string} name - Animation name
   * @returns {Object} Animation instance
   */
  getAnimation(name) {
    return this.animations[name];
  }
}
