/**
 * MotionManager Class
 * Handles reduced motion preferences and accessibility
 */

import { CONFIG } from '../config.js';
import { isReducedMotion } from '../utils.js';

export class MotionManager {
  constructor() {
    this.isReducedMotion = isReducedMotion();
    this.isMotionReduced = false;
    
    this.init();
  }

  /**
   * Initialize motion manager
   */
  init() {
    this.setupMotionToggle();
    this.updateMotionState();
  }

  /**
   * Setup motion toggle button
   */
  setupMotionToggle() {
    const toggleBtn = document.getElementById('reduce-motion');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      this.toggleMotion();
    });
  }

  /**
   * Toggle motion reduction
   */
  toggleMotion() {
    this.isMotionReduced = !this.isMotionReduced;
    this.updateMotionState();
    this.updateToggleButton();
  }

  /**
   * Update motion state throughout the page
   */
  updateMotionState() {
    const body = document.body;
    
    if (this.isMotionReduced) {
      body.classList.add('reduced-motion');
    } else {
      body.classList.remove('reduced-motion');
    }
    
    // Disable animations if motion is reduced
    this.toggleAnimations(!this.isMotionReduced);
  }

  /**
   * Toggle animations on/off
   * @param {boolean} enable - Whether to enable animations
   */
  toggleAnimations(enable) {
    const style = document.createElement('style');
    style.id = 'motion-control';
    
    if (!enable) {
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        .loader-canvas,
        .matrix-background,
        .code-rain {
          display: none !important;
        }
      `;
    }
    
    // Remove existing motion control style
    const existingStyle = document.getElementById('motion-control');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Add new style if motion is reduced
    if (!enable) {
      document.head.appendChild(style);
    }
  }

  /**
   * Update toggle button appearance
   */
  updateToggleButton() {
    const toggleBtn = document.getElementById('reduce-motion');
    if (!toggleBtn) return;

    toggleBtn.classList.toggle('active', this.isMotionReduced);
    toggleBtn.textContent = this.isMotionReduced ? '⚡' : '⚡';
    toggleBtn.setAttribute('aria-label', 
      this.isMotionReduced ? 'Enable Animations' : 'Reduce Motion'
    );
  }

  /**
   * Check if motion is reduced
   * @returns {boolean} True if motion is reduced
   */
  isMotionReducedMode() {
    return this.isMotionReduced;
  }

  /**
   * Set motion reduction programmatically
   * @param {boolean} reduced - Whether to reduce motion
   */
  setMotionReduced(reduced) {
    this.isMotionReduced = reduced;
    this.updateMotionState();
    this.updateToggleButton();
  }
}

