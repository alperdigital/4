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
    
    // Set initial volumes for cyberpunk atmosphere
    this.ambientGain.gain.value = 0.15;
    this.rainGain.gain.value = 0.08;
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

    // Create cyberpunk ambient drone
    this.ambientOscillator = this.audioContext.createOscillator();
    const filter = this.audioContext.createBiquadFilter();
    const reverb = this.audioContext.createConvolver();
    
    // Configure oscillator for cyberpunk drone
    this.ambientOscillator.type = 'sawtooth';
    this.ambientOscillator.frequency.setValueAtTime(45, this.audioContext.currentTime);
    
    // Configure filter for dark, industrial sound
    filter.type = 'lowpass';
    filter.frequency.value = 120;
    filter.Q.value = 2;
    
    // Create simple reverb impulse
    const impulseLength = this.audioContext.sampleRate * 2;
    const impulse = this.audioContext.createBuffer(2, impulseLength, this.audioContext.sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < impulseLength; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / impulseLength, 2);
      }
    }
    reverb.buffer = impulse;
    
    // Connect nodes
    this.ambientOscillator.connect(filter);
    filter.connect(reverb);
    reverb.connect(this.ambientGain);
    
    // Add cyberpunk-style modulation
    const lfo1 = this.audioContext.createOscillator();
    const lfo2 = this.audioContext.createOscillator();
    const lfoGain1 = this.audioContext.createGain();
    const lfoGain2 = this.audioContext.createGain();
    
    // Slow frequency modulation
    lfo1.type = 'sine';
    lfo1.frequency.value = 0.05;
    lfoGain1.gain.value = 8;
    
    // Fast filter modulation
    lfo2.type = 'triangle';
    lfo2.frequency.value = 0.3;
    lfoGain2.gain.value = 15;
    
    lfo1.connect(lfoGain1);
    lfo2.connect(lfoGain2);
    lfoGain1.connect(this.ambientOscillator.frequency);
    lfoGain2.connect(filter.frequency);
    
    // Start oscillators
    this.ambientOscillator.start();
    lfo1.start();
    lfo2.start();
  }

  createCodeRainSound() {
    if (!this.audioContext || !this.rainGain) return;

    // Create cyberpunk digital rain sounds
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.createCyberRainDrop(i);
      }, i * 300);
    }
  }

  createCyberRainDrop(index) {
    if (!this.audioContext || !this.rainGain) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    const distortion = this.audioContext.createWaveShaper();
    
    // Configure oscillator for cyberpunk digital sound
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200 + Math.random() * 100, this.audioContext.currentTime);
    
    // Add subtle frequency sweep
    oscillator.frequency.linearRampToValueAtTime(150 + Math.random() * 50, this.audioContext.currentTime + 0.3);
    
    // Configure distortion for cyberpunk grit
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = ((3 + 20) * x * 20 * deg) / (Math.PI + 20 * Math.abs(x));
    }
    distortion.curve = curve;
    distortion.oversample = '4x';
    
    // Configure filter for industrial sound
    filter.type = 'bandpass';
    filter.frequency.value = 300 + Math.random() * 200;
    filter.Q.value = 1.5;
    
    // Configure gain envelope for cyberpunk attack
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    // Connect nodes
    oscillator.connect(distortion);
    distortion.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.rainGain);
    
    // Start and stop
    oscillator.start(now);
    oscillator.stop(now + 0.4);
    
    // Store reference for cleanup
    this.rainOscillators.push(oscillator);
    
    // Remove from array when finished
    setTimeout(() => {
      const index = this.rainOscillators.indexOf(oscillator);
      if (index > -1) {
        this.rainOscillators.splice(index, 1);
      }
    }, 400);
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

  // Create cyberpunk click sound for interactions
  playClickSound() {
    if (!this.audioContext || !this.isEnabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    const distortion = this.audioContext.createWaveShaper();
    
    // Cyberpunk click sound
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.05);
    
    // Add distortion for grit
    const samples = 44100;
    const curve = new Float32Array(samples);
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = Math.sign(x) * Math.min(Math.abs(x) * 2, 1);
    }
    distortion.curve = curve;
    distortion.oversample = '4x';
    
    // Filter for cyberpunk character
    filter.type = 'highpass';
    filter.frequency.value = 200;
    filter.Q.value = 1;
    
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    oscillator.connect(distortion);
    distortion.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(now);
    oscillator.stop(now + 0.08);
  }

  // Create cyberpunk hover sound for UI interactions
  playHoverSound() {
    if (!this.audioContext || !this.isEnabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    // Cyberpunk hover sweep
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(600, this.audioContext.currentTime + 0.12);
    
    // Filter for smooth sweep
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.5;
    
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(now);
    oscillator.stop(now + 0.12);
  }
}

// Export for use in main app
window.MatrixAudio = MatrixAudio;
