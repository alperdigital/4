/**
 * AudioManager Class
 * Handles audio system and sound effects
 */

import { CONFIG } from '../config.js';

export class AudioManager {
  constructor() {
    this.audioContext = null;
    this.isEnabled = true;
    this.volume = CONFIG.AUDIO.VOLUME;
    
    this.init();
  }

  /**
   * Initialize audio manager
   */
  init() {
    this.setupAudioToggle();
    this.setupAudioContext();
  }

  /**
   * Setup audio toggle button
   */
  setupAudioToggle() {
    const toggleBtn = document.getElementById('sound-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      this.toggleAudio();
    });
  }

  /**
   * Setup audio context
   */
  setupAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  /**
   * Toggle audio on/off
   */
  toggleAudio() {
    this.isEnabled = !this.isEnabled;
    this.updateToggleButton();
    
    if (this.isEnabled) {
      this.startAudio();
    } else {
      this.stopAudio();
    }
  }

  /**
   * Start audio system
   */
  startAudio() {
    if (!this.audioContext) return;
    
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    this.createAmbientSound();
  }

  /**
   * Stop audio system
   */
  stopAudio() {
    // Use the existing MatrixAudioSystem if available
    if (window.matrixAudioSystem) {
      window.matrixAudioSystem.stop();
      return;
    }

    if (this.audioContext) {
      this.audioContext.suspend();
    }
  }

  /**
   * Create ambient sound effect
   */
  createAmbientSound() {
    if (!this.audioContext || !this.isEnabled) return;

    // Use the existing MatrixAudioSystem if available
    if (window.matrixAudioSystem) {
      window.matrixAudioSystem.start();
      return;
    }

    // Fallback to basic oscillator
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    // Configure oscillator
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);

    // Configure filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, this.audioContext.currentTime);
    filter.Q.setValueAtTime(1, this.audioContext.currentTime);

    // Configure gain
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 1);

    // Connect nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Start oscillator
    oscillator.start();
  }

  /**
   * Update toggle button appearance
   */
  updateToggleButton() {
    const toggleBtn = document.getElementById('sound-toggle');
    if (!toggleBtn) return;

    toggleBtn.classList.toggle('active', this.isEnabled);
    toggleBtn.textContent = this.isEnabled ? '🔊' : '🔇';
    toggleBtn.setAttribute('aria-label', 
      this.isEnabled ? 'Disable Sound' : 'Enable Sound'
    );
  }

  /**
   * Check if audio is enabled
   * @returns {boolean} True if audio is enabled
   */
  isAudioEnabled() {
    return this.isEnabled;
  }

  /**
   * Set volume
   * @param {number} volume - Volume level (0-1)
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Get current volume
   * @returns {number} Current volume level
   */
  getVolume() {
    return this.volume;
  }
}
