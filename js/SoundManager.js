/**
 * SoundManager - Centralized Sound Control
 * Manages all audio functionality from a single file
 */

export class SoundManager {
  constructor() {
    this.isEnabled = false; // Start with sound disabled
    this.audioContext = null;
    this.volume = 0.3;
    this.sounds = {};
    
    this.init();
  }

  /**
   * Initialize sound manager
   */
  init() {
    this.setupAudioContext();
    this.setupSoundToggle();
    this.createSounds();
    this.updateButtonState();
    this.setupGlobalSoundControl();
    this.loadPreference();
  }

  /**
   * Setup Web Audio API context
   */
  setupAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  /**
   * Setup sound toggle button
   */
  setupSoundToggle() {
    const soundToggle = document.getElementById('sound-toggle');
    if (!soundToggle) return;

    soundToggle.addEventListener('click', () => {
      this.toggleSound();
    });

    // Hover seslerini sadece ses tuşuna ekle, diğer butonlara ekleme
    soundToggle.addEventListener('mouseenter', () => {
      if (this.isEnabled) {
        this.playSound('hover');
      }
    });

    // Tüm control butonlarına click sesleri ekle
    this.setupControlButtonSounds();
  }

  /**
   * Setup click sounds for all control buttons
   */
  setupControlButtonSounds() {
    const controlButtons = document.querySelectorAll('.control-btn');
    
    controlButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (this.isEnabled) {
          this.playSound('click');
        }
      });
    });
  }

  /**
   * Toggle sound on/off
   */
  toggleSound() {
    this.isEnabled = !this.isEnabled;
    this.updateButtonState();
    this.showFeedback();
    this.savePreference();
    
    // Apply global sound control
    if (this.isEnabled) {
      this.unmuteAllSounds();
    } else {
      this.muteAllSounds();
    }
  }

  /**
   * Update button visual state
   */
  updateButtonState() {
    const soundToggle = document.getElementById('sound-toggle');
    if (!soundToggle) return;

    soundToggle.classList.toggle('active', this.isEnabled);
    soundToggle.textContent = this.isEnabled ? '🔊' : '🔇';
    soundToggle.setAttribute('aria-label', 
      this.isEnabled ? 'Disable Sound' : 'Enable Sound - Click to turn on audio'
    );
    
    // Update body class for global sound control (only affects audio elements)
    document.body.classList.toggle('sound-disabled', !this.isEnabled);
  }

  /**
   * Show feedback when sound state changes
   */
  showFeedback() {
    const message = this.isEnabled ? '🔊 Sound Enabled!' : '🔇 Sound Disabled';
    
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--matrix-green);
      color: var(--matrix-black);
      padding: 10px 20px;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 14px;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
      box-shadow: 0 0 20px var(--matrix-green);
    `;
    
    document.body.appendChild(feedback);
    
    // Fade in
    setTimeout(() => {
      feedback.style.opacity = '1';
    }, 10);
    
    // Fade out and remove
    setTimeout(() => {
      feedback.style.opacity = '0';
      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.parentNode.removeChild(feedback);
        }
      }, 300);
    }, 2000);
  }

  /**
   * Create sound effects
   */
  createSounds() {
    if (!this.audioContext) return;

    // Create ambient sound
    this.sounds.ambient = this.createAmbientSound();
    
    // Create click sound
    this.sounds.click = this.createClickSound();
    
    // Create hover sound
    this.sounds.hover = this.createHoverSound();
  }

  /**
   * Create ambient background sound
   */
  createAmbientSound() {
    if (!this.audioContext) return null;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.1, this.audioContext.currentTime + 1);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    return { oscillator, gainNode };
  }

  /**
   * Create click sound effect
   */
  createClickSound() {
    if (!this.audioContext) return null;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    return { oscillator, gainNode };
  }

  /**
   * Create hover sound effect
   */
  createHoverSound() {
    if (!this.audioContext) return null;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(800, this.audioContext.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.2, this.audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.05);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    return { oscillator, gainNode };
  }

  /**
   * Play a sound effect
   */
  playSound(soundName) {
    if (!this.isEnabled || !this.audioContext) return;

    const sound = this.sounds[soundName];
    if (!sound) return;

    try {
      // Resume audio context if suspended
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      // Create new instance of the sound
      const newSound = this.createSoundInstance(soundName);
      if (newSound) {
        newSound.oscillator.start();
        newSound.oscillator.stop(this.audioContext.currentTime + 0.1);
      }
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  /**
   * Create a new instance of a sound
   */
  createSoundInstance(soundName) {
    if (!this.audioContext) return null;

    switch (soundName) {
      case 'click':
        return this.createClickSound();
      case 'hover':
        return this.createHoverSound();
      default:
        return null;
    }
  }

  /**
   * Start ambient sound
   */
  startAmbient() {
    if (!this.isEnabled || !this.sounds.ambient) return;

    try {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      this.sounds.ambient.oscillator.start();
    } catch (error) {
      console.warn('Error starting ambient sound:', error);
    }
  }

  /**
   * Stop ambient sound
   */
  stopAmbient() {
    if (!this.sounds.ambient) return;

    try {
      this.sounds.ambient.oscillator.stop();
    } catch (error) {
      console.warn('Error stopping ambient sound:', error);
    }
  }

  /**
   * Save sound preference to localStorage
   */
  savePreference() {
    localStorage.setItem('soundEnabled', this.isEnabled);
  }

  /**
   * Load sound preference from localStorage
   */
  loadPreference() {
    const saved = localStorage.getItem('soundEnabled');
    if (saved !== null) {
      this.isEnabled = saved === 'true';
    }
    
    this.updateButtonState();
    
    // Apply global sound control based on preference
    if (this.isEnabled) {
      this.unmuteAllSounds();
    } else {
      this.muteAllSounds();
    }
  }

  /**
   * Check if sound is enabled
   */
  isSoundEnabled() {
    return this.isEnabled;
  }

  /**
   * Set sound enabled state
   */
  setEnabled(enabled) {
    this.isEnabled = enabled;
    this.updateButtonState();
    this.savePreference();
  }

  /**
   * Setup global sound control to disable ALL sounds when disabled
   */
  setupGlobalSoundControl() {
    // Override all audio elements
    this.overrideAudioElements();
    
    // Override Web Audio API
    this.overrideWebAudioAPI();
    
    // Override HTML5 Audio
    this.overrideHTML5Audio();
    
    // Disable all existing audio contexts
    this.disableAllAudioContexts();
  }

  /**
   * Override all audio elements on the page
   */
  overrideAudioElements() {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      const originalPlay = audio.play.bind(audio);
      audio.play = () => {
        if (this.isEnabled) {
          return originalPlay();
        }
        return Promise.resolve();
      };
    });
  }

  /**
   * Override Web Audio API globally
   */
  overrideWebAudioAPI() {
    if (!window.AudioContext && !window.webkitAudioContext) return;

    const OriginalAudioContext = window.AudioContext || window.webkitAudioContext;
    const self = this;

    // Override AudioContext constructor
    window.AudioContext = function() {
      const context = new OriginalAudioContext();
      const originalCreateGain = context.createGain.bind(context);
      const originalCreateOscillator = context.createOscillator.bind(context);
      
      // Override createGain to control volume
      context.createGain = function() {
        const gainNode = originalCreateGain();
        const originalConnect = gainNode.connect.bind(gainNode);
        
        gainNode.connect = function(destination) {
          if (self.isEnabled) {
            return originalConnect(destination);
          }
          return gainNode;
        };
        
        return gainNode;
      };
      
      // Override createOscillator to control sound generation
      context.createOscillator = function() {
        const oscillator = originalCreateOscillator();
        const originalStart = oscillator.start.bind(oscillator);
        
        oscillator.start = function(when) {
          if (self.isEnabled) {
            return originalStart(when);
          }
        };
        
        return oscillator;
      };
      
      return context;
    };
    
    window.webkitAudioContext = window.AudioContext;
  }

  /**
   * Override HTML5 Audio globally
   */
  overrideHTML5Audio() {
    const OriginalAudio = window.Audio;
    const self = this;

    window.Audio = function(src) {
      const audio = new OriginalAudio(src);
      const originalPlay = audio.play.bind(audio);
      
      audio.play = function() {
        if (self.isEnabled) {
          return originalPlay();
        }
        return Promise.resolve();
      };
      
      return audio;
    };
  }

  /**
   * Disable all existing audio contexts
   */
  disableAllAudioContexts() {
    // Find and disable all existing audio contexts
    const contexts = [];
    
    // Try to find contexts in global scope
    for (let prop in window) {
      if (window[prop] && typeof window[prop] === 'object') {
        if (window[prop].state && typeof window[prop].suspend === 'function') {
          contexts.push(window[prop]);
        }
      }
    }
    
    // Suspend all found contexts
    contexts.forEach(context => {
      if (context.state === 'running') {
        context.suspend();
      }
    });
  }

  /**
   * Completely mute all sounds
   */
  muteAllSounds() {
    // Mute all audio elements
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.muted = true;
      audio.volume = 0;
    });
    
    // Suspend all audio contexts
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
    
    // Stop all oscillators
    Object.values(this.sounds).forEach(sound => {
      if (sound && sound.oscillator) {
        try {
          sound.oscillator.stop();
        } catch (e) {
          // Oscillator might already be stopped
        }
      }
    });
  }

  /**
   * Unmute all sounds
   */
  unmuteAllSounds() {
    // Unmute all audio elements
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.muted = false;
      audio.volume = 1;
    });
    
    // Resume audio context
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}
