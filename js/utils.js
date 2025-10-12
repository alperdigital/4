/**
 * Utility functions for the Matrix App
 * Reusable helper functions
 */

import { CONFIG, CSS_VARS } from './config.js';

/**
 * Get CSS custom property value with fallback
 * @param {string} property - CSS custom property name
 * @param {string} fallback - Fallback value if property not found
 * @returns {string} CSS property value
 */
export function getCSSProperty(property, fallback = '') {
  const rs = getComputedStyle(document.documentElement);
  return rs.getPropertyValue(property).trim() || fallback;
}

/**
 * Get theme-based code rain colors
 * @returns {Object} Color configuration object
 */
export function getCodeRainColors() {
  return {
    color: getCSSProperty(CSS_VARS.CODE_RAIN_COLOR, CONFIG.THEMES.MATRIX.codeRainColor),
    glow: getCSSProperty(CSS_VARS.CODE_RAIN_GLOW, CONFIG.THEMES.MATRIX.codeRainGlow)
  };
}

/**
 * Check if reduced motion is preferred
 * @returns {boolean} True if reduced motion is preferred
 */
export function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if high contrast mode is active
 * @returns {boolean} True if high contrast mode is active
 */
export function isHighContrast() {
  return document.body.classList.contains('high-contrast');
}

/**
 * Generate random character for Matrix effect
 * @returns {string} Random character
 */
export function getRandomMatrixChar() {
  const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
  return chars[Math.floor(Math.random() * chars.length)];
}

/**
 * Generate random number within range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Parse RGBA color string and apply opacity
 * @param {string} colorString - RGBA color string
 * @param {number} opacity - New opacity value
 * @returns {string} New RGBA color string
 */
export function parseRGBAWithOpacity(colorString, opacity) {
  const match = colorString.match(/rgba?\(([^)]+)\)/);
  if (match) {
    const values = match[1].split(',').map(v => v.trim());
    return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${opacity})`;
  }
  return colorString;
}

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;
  
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, delay) {
  let timeoutId;
  
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Create canvas element with proper sizing
 * @param {string} id - Canvas ID
 * @param {string} className - Canvas class name
 * @returns {HTMLCanvasElement} Canvas element
 */
export function createCanvas(id, className) {
  const canvas = document.createElement('canvas');
  canvas.id = id;
  canvas.className = className;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas;
}

/**
 * Resize canvas to window dimensions
 * @param {HTMLCanvasElement} canvas - Canvas element
 */
export function resizeCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

/**
 * Get element by ID with error handling
 * @param {string} id - Element ID
 * @param {string} context - Context for error message
 * @returns {HTMLElement|null} Element or null if not found
 */
export function getElementById(id, context = '') {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID "${id}" not found${context ? ` in ${context}` : ''}`);
  }
  return element;
}

/**
 * Get element by selector with error handling
 * @param {string} selector - CSS selector
 * @param {string} context - Context for error message
 * @returns {HTMLElement|null} Element or null if not found
 */
export function getElementBySelector(selector, context = '') {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element with selector "${selector}" not found${context ? ` in ${context}` : ''}`);
  }
  return element;
}

