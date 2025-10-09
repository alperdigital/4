/* Matrix-Style Audio System for Alperdigital */

class MatrixAudio {
  constructor() {
    this.audioContext = null;
    this.isEnabled = true;
    this.ambientGain = null;
    this.ambientOscillator = null;
    this.rainGain = null;
    this.rainOscillators = [];
    this.isPlaying = false;
    
    this.init();
  }

  init() {
    // Initialize Web Audio API
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.setupAudioNodes();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  setupAudioNodes() {
    if (!this.audioContext) return;

    // Create gain nodes for mixing
    this.ambientGain = this.audioContext.createGain();
    this.rainGain = this.audioContext.createGain();
    
    // Connect to master output
    this.ambientGain.connect(this.audioContext.destination);
    this.rainGain.connect(this.audioContext.destination);
    
    // Set initial volumes
    this.ambientGain.gain.value = 0.1;
    this.rainGain.gain.value = 0.05;
  }

  startAmbientSound() {
    if (!this.audioContext || !this.isEnabled || this.isPlaying) return;

    // Resume audio context if suspended
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this.isPlaying = true;
    this.createAmbientTone();
    this.createCodeRainSound();
  }

  stopAmbientSound() {
    if (!this.audioContext || !this.isPlaying) return;

    this.isPlaying = false;
    
    // Stop ambient tone
    if (this.ambientOscillator) {
      this.ambientOscillator.stop();
      this.ambientOscillator = null;
    }

    // Stop rain sounds
    this.rainOscillators.forEach(osc => {
      osc.stop();
    });
    this.rainOscillators = [];
  }

  createAmbientTone() {
    if (!this.audioContext || !this.ambientGain) return;

    // Create low-frequency ambient tone (Matrix-like hum)
    this.ambientOscillator = this.audioContext.createOscillator();
    const filter = this.audioContext.createBiquadFilter();
    
    // Configure oscillator
    this.ambientOscillator.type = 'sawtooth';
    this.ambientOscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);
    
    // Configure filter for Matrix-like sound
    filter.type = 'lowpass';
    filter.frequency.value = 200;
    filter.Q.value = 1;
    
    // Connect nodes
    this.ambientOscillator.connect(filter);
    filter.connect(this.ambientGain);
    
    // Add subtle frequency modulation
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    
    lfo.type = 'sine';
    lfo.frequency.value = 0.1;
    lfoGain.gain.value = 5;
    
    lfo.connect(lfoGain);
    lfoGain.connect(this.ambientOscillator.frequency);
    
    // Start oscillators
    this.ambientOscillator.start();
    lfo.start();
  }

  createCodeRainSound() {
    if (!this.audioContext || !this.rainGain) return;

    // Create multiple rain-like sounds
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.createRainDrop(i);
      }, i * 200);
    }
  }

  createRainDrop(index) {
    if (!this.audioContext || !this.rainGain) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    // Configure oscillator for digital rain sound
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(800 + Math.random() * 400, this.audioContext.currentTime);
    
    // Configure filter
    filter.type = 'bandpass';
    filter.frequency.value = 1000 + Math.random() * 500;
    filter.Q.value = 2;
    
    // Configure gain envelope
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    // Connect nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.rainGain);
    
    // Start and stop
    oscillator.start(now);
    oscillator.stop(now + 0.5);
    
    // Store reference for cleanup
    this.rainOscillators.push(oscillator);
    
    // Remove from array when finished
    setTimeout(() => {
      const index = this.rainOscillators.indexOf(oscillator);
      if (index > -1) {
        this.rainOscillators.splice(index, 1);
      }
    }, 500);
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;
    
    if (!enabled) {
      this.stopAmbientSound();
    } else if (this.audioContext) {
      this.startAmbientSound();
    }
  }

  setVolume(volume) {
    if (this.ambientGain) {
      this.ambientGain.gain.value = volume * 0.1;
    }
    if (this.rainGain) {
      this.rainGain.gain.value = volume * 0.05;
    }
  }

  // Create click sound for interactions
  playClickSound() {
    if (!this.audioContext || !this.isEnabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
    
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }

  // Create hover sound for UI interactions
  playHoverSound() {
    if (!this.audioContext || !this.isEnabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(1200, this.audioContext.currentTime + 0.1);
    
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.05, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }
}

// Export for use in main app
window.MatrixAudio = MatrixAudio;
