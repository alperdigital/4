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
import { SoundManager } from './SoundManager.js';
import { LanguageManager } from './language/LanguageManager.js';
import { MotionManager } from './accessibility/MotionManager.js';

// Import Matrix Loader
import { MatrixLoader } from './MatrixLoader.js';

export class MatrixApp {
  constructor() {
    this.isReducedMotion = isReducedMotion();
    this.managers = {};
    this.animations = {};
    
    // Set default sound state to OFF
    this.isSoundEnabled = false;
    
    // Load user preferences first
    this.loadUserPreferences();
    
    // Immediately hide all loading screens
    this.hideProgressBars();
    
    // Check if we should skip loading screen completely
    if (CONFIG.ANIMATION.SKIP_LOADING_SCREEN) {
      console.log('MatrixApp: Skipping loading screen - going directly to main content');
      this.init();
      this.onMatrixLoaderComplete();
    } else if (CONFIG.ANIMATION.ENABLE_ENTRANCE_ANIMATION) {
      console.log('MatrixApp: Starting entrance animation');
      this.init();
      this.startMatrixLoader();
    } else {
      console.log('MatrixApp: Entrance animation disabled - showing minimal loading');
      this.init();
      this.showMinimalLoading();
    }
  }

  /**
   * Initialize the application
   */
  init() {
    debugLog('Initializing MatrixApp...');
    
    if (this.isReducedMotion) {
      debugLog('Reduced motion detected, setting up reduced motion mode');
      this.setupReducedMotion();
      // Don't return, continue with normal initialization
    }

    this.initializeManagers();
    this.initializeAnimations();
    this.setupEventListeners();
    
    debugLog('MatrixApp initialization complete');
  }

  /**
   * Load user preferences from localStorage
   */
  loadUserPreferences() {
    // Animation is always enabled - no need to load preference
    // Other preferences can be loaded here if needed
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
      this.managers.sound = new SoundManager();
      debugLog('SoundManager initialized');
    } catch (error) {
      debugError('Failed to initialize SoundManager', error);
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
    
    // Add visual feedback - REMOVED hue-rotate to prevent color distortion
    // document.body.style.filter = 'hue-rotate(180deg)';
    // setTimeout(() => {
    //   document.body.style.filter = '';
    // }, 2000);
  }

  /**
   * Show minimal loading (no animation)
   */
  showMinimalLoading() {
    console.log('MatrixApp: Showing minimal loading');
    
    // Create a simple loading indicator
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'minimal-loader';
    loadingOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 1;
      transition: opacity 0.3s ease-out;
    `;
    
    const loadingText = document.createElement('div');
    loadingText.textContent = 'Loading...';
    loadingText.style.cssText = `
      color: #00FF41;
      font-family: 'JetBrains Mono', monospace;
      font-size: 18px;
      text-shadow: 0 0 10px rgba(0,255,65,0.5);
    `;
    
    loadingOverlay.appendChild(loadingText);
    document.body.appendChild(loadingOverlay);
    
    // Hide after a short delay
    setTimeout(() => {
      loadingOverlay.style.opacity = '0';
      setTimeout(() => {
        if (loadingOverlay.parentNode) {
          loadingOverlay.parentNode.removeChild(loadingOverlay);
        }
        this.onMatrixLoaderComplete();
      }, 10);
    }, 5); // Very short loading time: 0.005 seconds
  }

  /**
   * Start Matrix Loader (Main Loading System)
   */
  startMatrixLoader() {
    console.log('MatrixApp: Starting Matrix Loader');
    
    // Show Matrix Loader with spoon bending animation and completion callback
    this.matrixLoader = showMatrixLoader({
      maxTimeout: 50,    // 0.05 seconds total
      lineDelay: 10,     // 10ms between phases
      holdTime: 15,      // 15ms hold time
      exitDuration: 10,  // 10ms fade out
      onComplete: () => {
        console.log('MatrixLoader: Animation complete');
        this.onMatrixLoaderComplete();
      }
    });
  }
  
  
  /**
   * Called when Matrix Loader completes
   */
  onMatrixLoaderComplete() {
    // Hide any progress bars
    this.hideProgressBars();
    
    // Start main application after Matrix Loader completes
    this.startMainApplication();
  }

  /**
   * Hide all progress bars and loading indicators
   */
  hideProgressBars() {
    // Hide main progress bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.style.display = 'none';
      progressBar.style.visibility = 'hidden';
      progressBar.style.opacity = '0';
    }
    
    // Hide any other loading indicators
    const loadingIndicators = document.querySelectorAll('.loading, .loader, [class*="loading"], [class*="loader"], .progress-bar, #progress-bar');
    loadingIndicators.forEach(indicator => {
      indicator.style.display = 'none';
      indicator.style.visibility = 'hidden';
      indicator.style.opacity = '0';
    });
    
    // Hide any matrix loader overlays
    const matrixLoaders = document.querySelectorAll('#matrix-loader-overlay, .matrix-loader, [id*="matrix"], [class*="matrix"]');
    matrixLoaders.forEach(loader => {
      if (loader.id !== 'matrix-background') { // Keep background
        loader.style.display = 'none';
        loader.style.visibility = 'hidden';
        loader.style.opacity = '0';
      }
    });
    
    console.log('MatrixApp: All progress bars and loading indicators hidden');
  }
  
  /**
   * Start main application
   */
  startMainApplication() {
    // Initialize main app components
    this.initializeMainComponents();
  }
  
  /**
   * Initialize main application components
   */
  initializeMainComponents() {
    // Start code rain background
    if (this.animations.matrixBackground) {
      this.animations.matrixBackground.start();
    }
    
    // Start code rain
    if (this.animations.codeRain) {
      this.animations.codeRain.start();
    }
    
    // Initialize other components
    this.setupMainUI();
  }
  
  /**
   * Setup main UI components
   */
  setupMainUI() {
    // Show main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.opacity = '1';
    }
    
    // Enable interactions
    this.enableInteractions();
  }
  
  /**
   * Enable user interactions
   */
  enableInteractions() {
    // Enable theme toggle
    if (this.managers.theme) {
      this.managers.theme.enable();
    }
    
    // Enable audio
    if (this.managers.audio) {
      this.managers.audio.enable();
    }
    
    // Enable language toggle
    if (this.managers.language) {
      this.managers.language.enable();
    }
  }

  /**
   * Start loading sequence (Legacy - now just starts Matrix Loader)
   */
  startLoadingSequence() {
    // This method is now handled by the constructor logic
    // Keep for compatibility but redirect based on configuration
    if (CONFIG.ANIMATION.SKIP_LOADING_SCREEN) {
      this.onMatrixLoaderComplete();
    } else if (CONFIG.ANIMATION.ENABLE_ENTRANCE_ANIMATION) {
      this.startMatrixLoader();
    } else {
      this.showMinimalLoading();
    }
  }

  /**
   * Setup matrix loader (Legacy - now handled by MatrixLoader)
   */
  setupMatrixLoader() {
    // This method is now handled by MatrixLoader
    // Keep for compatibility but do nothing
    debugLog('setupMatrixLoader called - now handled by MatrixLoader');
  }


  /**
   * Animate progress bar (Legacy - now handled by MatrixLoader)
   */
  animateProgressBar(progressBar, percentage, status, loader) {
    // This method is now handled by MatrixLoader
    // Keep for compatibility but do nothing
    debugLog('animateProgressBar called - now handled by MatrixLoader');
  }

  /**
   * Complete loading sequence (Legacy - now handled by MatrixLoader)
   */
  completeLoading(loader) {
    // This method is now handled by MatrixLoader
    // Keep for compatibility but do nothing
    debugLog('completeLoading called - now handled by MatrixLoader');
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

// Initialize MatrixApp when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('MatrixApp: DOM loaded, initializing...');
  
  // Immediately hide any loading screens
  const hideAllLoading = () => {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.style.display = 'none';
      progressBar.style.visibility = 'hidden';
      progressBar.style.opacity = '0';
    }
    
    const loadingElements = document.querySelectorAll('.loading, .loader, [class*="loading"], [class*="loader"], .progress-bar');
    loadingElements.forEach(el => {
      el.style.display = 'none';
      el.style.visibility = 'hidden';
      el.style.opacity = '0';
    });
  };
  
  hideAllLoading();
  
  new MatrixApp();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MatrixApp;
}
