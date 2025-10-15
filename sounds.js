/* Matrix-Style Audio System for Alperdigital */

class MatrixAudio {
  constructor() {
    this.audioContext = null;
    this.isEnabled = false; // Start with sound disabled
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
    
    // Set initial volumes for Matrix atmosphere
    this.ambientGain.gain.value = 0.12;
    this.rainGain.gain.value = 0.06;
  }

  startAmbientSound() {
    if (!this.audioContext || !this.isEnabled || this.isPlaying) return;

    // Resume audio context if suspended
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume().then(() => {
        this.isPlaying = true;
        this.createAmbientTone();
        this.createCodeRainSound();
      }).catch(error => {
        console.log('Audio context resume failed:', error);
        throw error;
      });
    } else {
      this.isPlaying = true;
      this.createAmbientTone();
      this.createCodeRainSound();
    }
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

    // Create Matrix-style epic ambient (inspired by Neo vs Smith fight)
    this.createMatrixDrone();
    this.createMatrixPad();
    this.createMatrixStrings();
  }

  createMatrixDrone() {
    // Deep, ominous drone like the Matrix
    const drone = this.audioContext.createOscillator();
    const droneGain = this.audioContext.createGain();
    const droneFilter = this.audioContext.createBiquadFilter();
    
    drone.type = 'sawtooth';
    drone.frequency.setValueAtTime(55, this.audioContext.currentTime);
    
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 80;
    droneFilter.Q.value = 1.5;
    
    droneGain.gain.value = 0.08;
    
    drone.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.ambientGain);
    
    drone.start();
    this.ambientOscillator = drone; // Store reference
  }

  createMatrixPad() {
    // Ethereal pad sound like the Matrix soundtrack
    const pad = this.audioContext.createOscillator();
    const padGain = this.audioContext.createGain();
    const padFilter = this.audioContext.createBiquadFilter();
    const padReverb = this.audioContext.createConvolver();
    
    pad.type = 'sine';
    pad.frequency.setValueAtTime(110, this.audioContext.currentTime);
    
    padFilter.type = 'lowpass';
    padFilter.frequency.value = 200;
    padFilter.Q.value = 0.5;
    
    // Create cathedral-like reverb
    const impulseLength = this.audioContext.sampleRate * 3;
    const impulse = this.audioContext.createBuffer(2, impulseLength, this.audioContext.sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < impulseLength; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / impulseLength, 1.5);
      }
    }
    padReverb.buffer = impulse;
    
    padGain.gain.value = 0.05;
    
    pad.connect(padFilter);
    padFilter.connect(padReverb);
    padReverb.connect(padGain);
    padGain.connect(this.ambientGain);
    
    pad.start();
  }

  createMatrixStrings() {
    // String-like texture for epic feel
    const strings = this.audioContext.createOscillator();
    const stringsGain = this.audioContext.createGain();
    const stringsFilter = this.audioContext.createBiquadFilter();
    
    strings.type = 'triangle';
    strings.frequency.setValueAtTime(220, this.audioContext.currentTime);
    
    stringsFilter.type = 'bandpass';
    stringsFilter.frequency.value = 300;
    stringsFilter.Q.value = 2;
    
    stringsGain.gain.value = 0.03;
    
    // Add subtle tremolo for string-like effect
    const tremolo = this.audioContext.createOscillator();
    const tremoloGain = this.audioContext.createGain();
    
    tremolo.type = 'sine';
    tremolo.frequency.value = 4.5;
    tremoloGain.gain.value = 0.1;
    
    tremolo.connect(tremoloGain);
    tremoloGain.connect(stringsGain.gain);
    
    strings.connect(stringsFilter);
    stringsFilter.connect(stringsGain);
    stringsGain.connect(this.ambientGain);
    
    strings.start();
    tremolo.start();
  }

  createCodeRainSound() {
    if (!this.audioContext || !this.rainGain) return;

    // Create Matrix-style digital rain sounds
    for (let i = 0; i < 1; i++) {
      setTimeout(() => {
        this.createMatrixRainDrop(i);
      }, i * 800);
    }
  }

  createMatrixRainDrop(index) {
    if (!this.audioContext || !this.rainGain) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    // Configure oscillator for Matrix digital sound
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(1000 + Math.random() * 500, this.audioContext.currentTime);
    
    // Add Matrix-style frequency sweep
    oscillator.frequency.exponentialRampToValueAtTime(200 + Math.random() * 100, this.audioContext.currentTime + 0.6);
    
    // Configure filter for Matrix character
    filter.type = 'lowpass';
    filter.frequency.value = 800 + Math.random() * 400;
    filter.Q.value = 1;
    
    // Configure gain envelope for Matrix-style attack
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.06, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    
    // Connect nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.rainGain);
    
    // Start and stop
    oscillator.start(now);
    oscillator.stop(now + 0.6);
    
    // Store reference for cleanup
    this.rainOscillators.push(oscillator);
    
    // Remove from array when finished
    setTimeout(() => {
      const index = this.rainOscillators.indexOf(oscillator);
      if (index > -1) {
        this.rainOscillators.splice(index, 1);
      }
    }, 600);
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

  // Create Matrix-style click sound for interactions
  playClickSound() {
    if (!this.audioContext || !this.isEnabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    // Matrix-style click sound (like digital interface)
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.06);
    
    // Filter for Matrix digital character
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 2;
    
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.003);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(now);
    oscillator.stop(now + 0.06);
  }

  // Create Matrix-style hover sound for UI interactions
  playHoverSound() {
    if (!this.audioContext || !this.isEnabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    // Matrix-style hover sweep (like digital scanning)
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(800, this.audioContext.currentTime + 0.1);
    
    // Filter for smooth Matrix sweep
    filter.type = 'lowpass';
    filter.frequency.value = 1000;
    filter.Q.value = 0.3;
    
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.06, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }
}

// Export for use in main app
window.MatrixAudio = MatrixAudio;
