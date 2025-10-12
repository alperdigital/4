/**
 * Configuration constants for the Matrix App
 * Centralized configuration management
 */

export const CONFIG = {
  // Theme Configuration
  THEMES: {
    MATRIX: {
      name: 'matrix',
      codeRainColor: '#00FF41',
      codeRainGlow: 'rgba(0,255,65,0.55)',
      background: '#000000',
      text: '#00ff00'
    },
    LIGHT: {
      name: 'light',
      codeRainColor: '#00FFFF',
      codeRainGlow: 'rgba(0,255,255,0.60)',
      background: '#ffffff',
      text: '#000000'
    }
  },

  // Animation Configuration
  ANIMATION: {
    LOADER_DURATION: 3000,
    EXPLOSION_DURATION: 1500,
    FADE_DURATION: 500,
    GLITCH_PROBABILITY: 0.005,
    MORPH_PROBABILITY: 0.05
  },

  // Code Rain Configuration
  CODE_RAIN: {
    FONT_SIZE: 16,
    TRAIL_LENGTH: 15,
    TRAIL_SPACING: 18,
    MAX_DROPS: 100,
    SPEED_RANGE: { min: 1, max: 4 }
  },

  // Matrix Background Configuration
  MATRIX_BG: {
    FONT_SIZE: 16,
    MAX_DROPS: 50,
    TRAIL_LENGTH: 10,
    SPEED_RANGE: { min: 0.5, max: 2 }
  },

  // Audio Configuration
  AUDIO: {
    VOLUME: 0.3,
    FADE_DURATION: 1000
  },

  // Language Configuration
  LANGUAGES: {
    EN: 'en',
    TR: 'tr'
  },

  // Selectors
  SELECTORS: {
    MATRIX_LOADER: '#matrix-loader',
    LOADER_CANVAS: '#loader-canvas',
    CODE_RAIN: '.code-rain',
    MATRIX_BACKGROUND: '#matrix-background',
    HIGH_CONTRAST_BTN: '#high-contrast',
    SOUND_BTN: '#sound-toggle',
    LANGUAGE_BTN: '#language-toggle'
  }
};

export const CSS_VARS = {
  CODE_RAIN_COLOR: '--code-rain-color',
  CODE_RAIN_GLOW: '--code-rain-glow',
  MATRIX_GREEN: '--matrix-green',
  MATRIX_BLACK: '--matrix-black',
  MATRIX_TEXT: '--matrix-text'
};
