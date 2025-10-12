/**
 * ThemeManager Class
 * Handles theme switching and management
 */

import { CONFIG } from '../config.js';
import { isHighContrast } from '../utils.js';

export class ThemeManager {
  constructor() {
    this.currentTheme = CONFIG.THEMES.MATRIX;
    this.isHighContrast = false;
    
    this.init();
  }

  /**
   * Initialize theme manager
   */
  init() {
    this.setupThemeToggle();
    this.updateTheme();
  }

  /**
   * Setup theme toggle button
   */
  setupThemeToggle() {
    const toggleBtn = document.getElementById('high-contrast');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  /**
   * Toggle between themes
   */
  toggleTheme() {
    this.isHighContrast = !this.isHighContrast;
    this.currentTheme = this.isHighContrast ? CONFIG.THEMES.LIGHT : CONFIG.THEMES.MATRIX;
    
    this.updateTheme();
    this.updateToggleButton();
  }

  /**
   * Update theme classes and styles
   */
  updateTheme() {
    const body = document.body;
    
    if (this.isHighContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
    
    this.updateCSSVariables();
  }

  /**
   * Update CSS custom properties
   */
  updateCSSVariables() {
    const root = document.documentElement;
    
    root.style.setProperty('--code-rain-color', this.currentTheme.codeRainColor);
    root.style.setProperty('--code-rain-glow', this.currentTheme.codeRainGlow);
    root.style.setProperty('--matrix-green', this.currentTheme.text);
    root.style.setProperty('--matrix-black', this.currentTheme.background);
    root.style.setProperty('--matrix-text', this.currentTheme.text);
  }

  /**
   * Update toggle button appearance
   */
  updateToggleButton() {
    const toggleBtn = document.getElementById('high-contrast');
    if (!toggleBtn) return;

    toggleBtn.classList.toggle('active', this.isHighContrast);
    toggleBtn.textContent = this.isHighContrast ? '🌙' : '🔆';
    toggleBtn.setAttribute('aria-label', 
      this.isHighContrast 
        ? 'Switch to Night Mode (Matrix)' 
        : 'Switch to Day Mode (High Contrast)'
    );
  }

  /**
   * Get current theme
   * @returns {Object} Current theme configuration
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Check if high contrast mode is active
   * @returns {boolean} True if high contrast mode is active
   */
  isHighContrastMode() {
    return this.isHighContrast;
  }

  /**
   * Set theme programmatically
   * @param {string} themeName - Theme name ('matrix' or 'light')
   */
  setTheme(themeName) {
    const theme = CONFIG.THEMES[themeName.toUpperCase()];
    if (!theme) {
      console.warn(`Theme "${themeName}" not found`);
      return;
    }

    this.currentTheme = theme;
    this.isHighContrast = themeName === 'light';
    this.updateTheme();
    this.updateToggleButton();
  }
}
