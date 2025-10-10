/* Matrix-Style JavaScript for Alperdigital */

class MatrixApp {
  constructor() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isHighContrast = false;
    this.isSoundEnabled = true;
    this.codeRain = null;
    this.puddle = null;
    this.audio = null;
    this.init();
  }

  init() {
    this.setupMatrixLoader();
    this.setupAccessibilityControls();
    this.setupProgressBar();
    this.setupNavigation();
    this.setupAudio();
    this.setupMatrixBackground();
    this.setupCodeRain();
    this.setupPuddle();
    this.setupScrollAnimations();
    this.setupDigitMorphing();
    this.setupParallax();
    this.setupEasterEggs();
  }

  setupMatrixLoader() {
    const loader = document.getElementById('matrix-loader');
    const progressBar = document.querySelector('.progress-bar-matrix');
    const percentage = document.querySelector('.loader-percentage');
    const status = document.querySelector('.loader-status');
    
    if (!loader) return;
    
    // Setup loader canvas
    this.setupLoaderCanvas();
    
    const statusMessages = [
      'INITIALIZING SYSTEMS...',
      'LOADING MATRIX PROTOCOLS...',
      'ESTABLISHING CONNECTION...',
      'PREPARING DIGITAL ENVIRONMENT...',
      'FINALIZING MATRIX ENTRY...'
    ];
    
    let progress = 0;
    let statusIndex = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 3;
      
      // Update status message
      if (progress > (statusIndex + 1) * 20) {
        statusIndex = Math.min(statusIndex + 1, statusMessages.length - 1);
        status.textContent = statusMessages[statusIndex];
      }
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Final status
        status.textContent = 'MATRIX ENTRY COMPLETE';
        
        setTimeout(() => {
          this.triggerScreenExplosion();
        }, 500);
      }
      
      progressBar.style.width = progress + '%';
      percentage.textContent = Math.floor(progress) + '%';
    }, 50);
  }

  setupLoaderCanvas() {
    const canvas = document.getElementById('loader-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const drops = [];
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = {
        x: i * fontSize,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        char: Math.random() > 0.5 ? '0' : '1'
      };
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = '12px monospace';
      
      drops.forEach((drop, index) => {
        ctx.fillText(drop.char, drop.x, drop.y);
        
        drop.y += drop.speed;
        
        if (drop.y > canvas.height) {
          drop.y = 0;
          drop.char = Math.random() > 0.5 ? '0' : '1';
        }
        
        if (Math.random() < 0.01) {
          drop.char = Math.random() > 0.5 ? '0' : '1';
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }

  triggerScreenExplosion() {
    const loader = document.getElementById('matrix-loader');
    const canvas = document.getElementById('loader-canvas');
    
    if (!loader) return;
    
    // Create explosion effect
    this.createExplosionEffect(loader);
    
    // Add error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'explosion-error';
    errorMessage.innerHTML = `
      <div class="error-text">SYSTEM ERROR</div>
      <div class="error-code">MATRIX_ENTRY_FAILED</div>
      <div class="error-message">SCREEN CORRUPTION DETECTED</div>
    `;
    loader.appendChild(errorMessage);
    
    // Start screen corruption
    setTimeout(() => {
      this.startScreenCorruption(loader);
    }, 200);
    
    // Final explosion and transition
    setTimeout(() => {
      this.finalExplosion(loader);
    }, 1500);
  }

  createExplosionEffect(container) {
    // Create explosion particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'explosion-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.setProperty('--random-x', (Math.random() - 0.5) * 2);
      particle.style.setProperty('--random-y', (Math.random() - 0.5) * 2);
      container.appendChild(particle);
    }
  }

  startScreenCorruption(container) {
    // Add glitch effect
    container.classList.add('screen-corruption');
    
    // Create digital noise overlay
    const noiseOverlay = document.createElement('div');
    noiseOverlay.className = 'digital-noise';
    container.appendChild(noiseOverlay);
    
    // Add random glitch lines
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const glitchLine = document.createElement('div');
        glitchLine.className = 'glitch-line';
        glitchLine.style.top = Math.random() * 100 + '%';
        glitchLine.style.animationDelay = Math.random() * 1 + 's';
        container.appendChild(glitchLine);
      }, i * 100);
    }
  }

  finalExplosion(loader) {
    // Add final explosion class
    loader.classList.add('final-explosion');
    
    // Create massive explosion particles
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.className = 'final-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 0.5 + 's';
      particle.style.setProperty('--random-x', (Math.random() - 0.5) * 4);
      particle.style.setProperty('--random-y', (Math.random() - 0.5) * 4);
      loader.appendChild(particle);
    }
    
    // Hide loader after explosion
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.classList.add('loaded');
        
        // Try to start audio after loading is complete
        if (this.audio && this.isSoundEnabled && !this.audio.isPlaying) {
          setTimeout(() => {
            this.attemptAutoStart();
          }, 1000);
        }
      }, 500);
    }, 1000);
  }

  setupAccessibilityControls() {
    const controls = document.querySelector('.accessibility-controls');
    if (!controls) return;

    const motionToggle = document.getElementById('reduce-motion');
    const contrastToggle = document.getElementById('high-contrast');
    const soundToggle = document.getElementById('sound-toggle');

    // Motion toggle (⚡)
    if (motionToggle) {
      motionToggle.addEventListener('click', () => {
        this.isReducedMotion = !this.isReducedMotion;
        motionToggle.classList.toggle('active', this.isReducedMotion);
        document.body.classList.toggle('reduced-motion', this.isReducedMotion);
        
        // Update button text
        motionToggle.textContent = this.isReducedMotion ? '⚡' : '⚡';
        motionToggle.setAttribute('aria-label', this.isReducedMotion ? 'Enable Motion' : 'Reduce Motion');
        
        if (this.isReducedMotion) {
          this.stopAnimations();
        } else {
          this.startAnimations();
        }
      });
    }

    // Contrast toggle (🔆)
    if (contrastToggle) {
      contrastToggle.addEventListener('click', () => {
        this.isHighContrast = !this.isHighContrast;
        contrastToggle.classList.toggle('active', this.isHighContrast);
        document.body.classList.toggle('high-contrast', this.isHighContrast);
        
        // Update button text
        contrastToggle.textContent = this.isHighContrast ? '🌙' : '🔆';
        contrastToggle.setAttribute('aria-label', this.isHighContrast ? 'Normal Contrast' : 'High Contrast');
      });
    }

    // Sound toggle (🔊)
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        this.isSoundEnabled = !this.isSoundEnabled;
        soundToggle.classList.toggle('active', !this.isSoundEnabled);
        
        // Update button text
        soundToggle.textContent = this.isSoundEnabled ? '🔊' : '🔇';
        soundToggle.setAttribute('aria-label', this.isSoundEnabled ? 'Disable Sound' : 'Enable Sound');
        
        // Control audio system
        if (this.audio) {
          this.audio.setEnabled(this.isSoundEnabled);
        }
        
        // Store preference
        localStorage.setItem('soundEnabled', this.isSoundEnabled);
      });
    }

    // Load saved preferences
    this.loadAccessibilityPreferences();
  }

  loadAccessibilityPreferences() {
    // Load sound preference
    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound !== null) {
      this.isSoundEnabled = savedSound === 'true';
      const soundToggle = document.getElementById('sound-toggle');
      if (soundToggle) {
        soundToggle.classList.toggle('active', !this.isSoundEnabled);
        soundToggle.textContent = this.isSoundEnabled ? '🔊' : '🔇';
        soundToggle.setAttribute('aria-label', this.isSoundEnabled ? 'Disable Sound' : 'Enable Sound');
      }
      
      // Apply to audio system
      if (this.audio) {
        this.audio.setEnabled(this.isSoundEnabled);
      }
    }
  }

  setupProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressFill.style.width = scrollPercent + '%';
    });
  }

  setupNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Nav scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  setupAudio() {
    // Initialize Matrix Audio System
    if (window.MatrixAudio) {
      this.audio = new MatrixAudio();
      
      // Try to start audio automatically
      this.attemptAutoStart();
    }

    // Add click sounds to interactive elements
    this.addClickSounds();
    this.addHoverSounds();
  }

  attemptAutoStart() {
    // Try to start audio immediately
    if (this.isSoundEnabled && this.audio) {
      try {
        this.audio.startAmbientSound();
        console.log('Audio started automatically');
      } catch (error) {
        console.log('Auto-start failed, waiting for user interaction');
        this.setupUserInteractionStart();
      }
    }
  }

  setupUserInteractionStart() {
    // Create invisible overlay to capture first user interaction
    const audioOverlay = document.createElement('div');
    audioOverlay.id = 'audio-overlay';
    audioOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba(0, 0, 0, 0.95), rgba(0, 20, 0, 0.9));
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--matrix-green);
      font-family: var(--font-mono);
      font-size: 18px;
      text-align: center;
      cursor: pointer;
      backdrop-filter: blur(5px);
    `;
    
    audioOverlay.innerHTML = `
      <div style="text-align: center; border: 2px solid var(--matrix-green); padding: 40px; border-radius: 8px; background: rgba(0, 0, 0, 0.7); box-shadow: 0 0 30px var(--matrix-green);">
        <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 2s infinite;">🔊</div>
        <div style="font-size: 20px; margin-bottom: 10px; text-shadow: 0 0 10px var(--matrix-green);">MATRIX AUDIO</div>
        <div style="font-size: 16px; margin-bottom: 20px; opacity: 0.8;">Epik ses deneyimi için tıklayın</div>
        <div style="font-size: 12px; opacity: 0.6; border-top: 1px solid var(--matrix-green); padding-top: 10px;">Click to start Matrix audio experience</div>
        <div style="font-size: 10px; margin-top: 15px; opacity: 0.4;">Otomatik kapanır: 5 saniye</div>
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
      </style>
    `;

    // Add click handler to start audio
    const startAudio = () => {
      if (this.audio && this.isSoundEnabled) {
        this.audio.startAmbientSound();
      }
      document.body.removeChild(audioOverlay);
    };

    audioOverlay.addEventListener('click', startAudio);
    audioOverlay.addEventListener('touchstart', startAudio);
    
    // Add to page
    document.body.appendChild(audioOverlay);

    // Auto-remove after 5 seconds if no interaction
    setTimeout(() => {
      if (document.body.contains(audioOverlay)) {
        document.body.removeChild(audioOverlay);
      }
    }, 5000);
  }

  addClickSounds() {
    const clickableElements = document.querySelectorAll('button, .nav-link, .control-btn');
    
    clickableElements.forEach(element => {
      element.addEventListener('click', () => {
        if (this.audio && this.isSoundEnabled) {
          this.audio.playClickSound();
        }
      });
    });
  }

  addHoverSounds() {
    const hoverElements = document.querySelectorAll('.control-btn, .nav-link, .work-item');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        if (this.audio && this.isSoundEnabled) {
          this.audio.playHoverSound();
        }
      });
    });
  }

  setupMatrixBackground() {
    if (this.isReducedMotion) return;

    const canvas = document.getElementById('matrix-background');
    if (!canvas) {
      console.error('Matrix background canvas not found!');
      return;
    }

    console.log('Setting up Matrix background...');
    this.matrixBackground = new MatrixBackground(canvas);
    this.matrixBackground.start();
  }

  setupCodeRain() {
    if (this.isReducedMotion) return;

    const canvas = document.querySelector('.code-rain');
    if (!canvas) return;

    this.codeRain = new CodeRain(canvas);
    this.codeRain.start();
    
    // Add Matrix interaction effects
    this.setupMatrixInteractions(canvas);
  }

  setupMatrixInteractions(canvas) {
    // Mouse hover effects
    canvas.addEventListener('mousemove', (e) => {
      if (Math.random() < 0.1) {
        this.codeRain.triggerGlitch();
      }
    });

    // Click effects
    canvas.addEventListener('click', (e) => {
      this.codeRain.createMatrixExplosion();
      this.codeRain.triggerGlitch();
    });

    // Scroll effects
    window.addEventListener('scroll', () => {
      if (Math.random() < 0.05) {
        this.codeRain.increaseIntensity();
      }
    });
  }

  setupPuddle() {
    if (this.isReducedMotion) return;

    const puddle = document.querySelector('.puddle');
    if (!puddle) return;

    this.puddle = new PuddleEffect(puddle);
    this.puddle.init();
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .work-item, .timeline-step');
    animateElements.forEach(el => observer.observe(el));
  }


  setupDigitMorphing() {
    const morphElements = document.querySelectorAll('[data-morph]');
    
    morphElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.morphToText(element);
      });
      
      element.addEventListener('mouseleave', () => {
        this.morphToDigits(element);
      });
    });

    // Add glitch effect to titles
    this.setupGlitchEffects();
  }

  setupGlitchEffects() {
    const glitchElements = document.querySelectorAll('.hero-title, .title-text');
    
    glitchElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.triggerGlitch(element);
      });
    });
  }

  triggerGlitch(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
      if (glitchCount >= 10) {
        element.textContent = originalText;
        clearInterval(glitchInterval);
        return;
      }
      
      let glitchedText = '';
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() < 0.3) {
          glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitchedText += originalText[i];
        }
      }
      
      element.textContent = glitchedText;
      glitchCount++;
    }, 50);
  }

  morphToText(element) {
    const targetText = element.dataset.morph;
    const currentText = element.textContent;
    
    if (currentText === targetText) return;
    
    // Create digit sequence
    const digits = '01';
    let morphText = '';
    
    for (let i = 0; i < targetText.length; i++) {
      morphText += digits[Math.floor(Math.random() * digits.length)];
    }
    
    element.textContent = morphText;
    
    // Animate to target text
    let index = 0;
    const interval = setInterval(() => {
      if (index < targetText.length) {
        const newText = targetText.substring(0, index + 1) + 
                       morphText.substring(index + 1);
        element.textContent = newText;
        index++;
      } else {
        clearInterval(interval);
        element.textContent = targetText;
      }
    }, 50);
  }

  morphToDigits(element) {
    const originalText = element.textContent;
    const digits = '01';
    let morphText = '';
    
    for (let i = 0; i < originalText.length; i++) {
      morphText += digits[Math.floor(Math.random() * digits.length)];
    }
    
    element.textContent = morphText;
  }

  setupParallax() {
    if (this.isReducedMotion) return;

    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  setupEasterEggs() {
    // Konami code
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
        this.activateKonamiCode();
        konamiCode = [];
      }
    });
  }

  activateKonamiCode() {
    // Slow down code rain
    if (this.codeRain) {
      this.codeRain.slowDown();
    }
    
    // Trigger Matrix glitch effect
    if (this.codeRain) {
      this.codeRain.triggerGlitch();
    }
    
    // Show style guide
    this.showStyleGuide();
  }

  showStyleGuide() {
    const styleGuide = document.createElement('div');
    styleGuide.className = 'style-guide';
    styleGuide.innerHTML = `
      <div class="style-guide-content">
        <h2>Alperdigital Style Guide</h2>
        <div class="color-palette">
          <div class="color-swatch" style="background: #00ff88;"></div>
          <div class="color-swatch" style="background: #00d870;"></div>
          <div class="color-swatch" style="background: #000000;"></div>
        </div>
        <p>Matrix-inspired design system</p>
        <button onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;
    
    document.body.appendChild(styleGuide);
    
    setTimeout(() => {
      styleGuide.remove();
    }, 10000);
  }

  stopAnimations() {
    if (this.codeRain) {
      this.codeRain.stop();
    }
    if (this.puddle) {
      this.puddle.stop();
    }
  }

  startAnimations() {
    if (this.codeRain) {
      this.codeRain.start();
    }
    if (this.puddle) {
      this.puddle.start();
    }
  }
}

class CodeRain {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.drops = [];
    this.animationId = null;
    this.isRunning = false;
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initDrops();
  }

  initDrops() {
    this.drops = [];
    const fontSize = 16;
    const columns = Math.floor(this.canvas.width / fontSize);
    
    for (let i = 0; i < columns; i++) {
      this.drops[i] = {
        x: i * fontSize,
        y: Math.random() * this.canvas.height,
        speed: Math.random() * 4 + 1,
        char: this.getRandomChar(),
        trail: [],
        glitchTimer: 0
      };
    }
  }

  getRandomChar() {
    const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    return matrixChars[Math.floor(Math.random() * matrixChars.length)];
  }

  animate() {
    if (!this.isRunning) return;
    
    // Create trailing effect with Matrix-style fade
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.font = '16px "Courier New", monospace';
    this.ctx.textAlign = 'center';
    
    this.drops.forEach((drop, index) => {
      // Matrix-style trail effect
      for (let i = 0; i < 15; i++) {
        const trailY = drop.y - (i * 18);
        if (trailY > 0) {
          const opacity = Math.max(0, (1 - (i * 0.08)) * 0.4);
          this.ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
          this.ctx.fillText(drop.char, drop.x, trailY);
        }
      }
      
      // Bright leading character with glow
      this.ctx.fillStyle = '#00ff41';
      this.ctx.shadowColor = '#00ff41';
      this.ctx.shadowBlur = 8;
      this.ctx.fillText(drop.char, drop.x, drop.y);
      this.ctx.shadowBlur = 0;
      
      drop.y += drop.speed;
      
      if (drop.y > this.canvas.height) {
        drop.y = -20;
        drop.char = this.getRandomChar();
        drop.speed = Math.random() * 3 + 1;
      }
      
      // Matrix-style character morphing
      if (Math.random() < 0.05) {
        drop.char = this.getRandomChar();
      }
      
      // Glitch effect with timer
      if (drop.glitchTimer > 0) {
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        drop.char = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        this.ctx.fillStyle = '#ff0040';
        this.ctx.shadowColor = '#ff0040';
        this.ctx.shadowBlur = 5;
        this.ctx.fillText(drop.char, drop.x, drop.y);
        this.ctx.shadowBlur = 0;
        drop.glitchTimer -= 16;
      } else if (Math.random() < 0.005) {
        // Random glitch
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        drop.char = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        this.ctx.fillStyle = '#ff0040';
        this.ctx.fillText(drop.char, drop.x, drop.y);
      }
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  start() {
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  slowDown() {
    this.drops.forEach(drop => {
      drop.speed *= 0.1;
    });
  }

  // Matrix-style effects
  triggerGlitch() {
    this.drops.forEach(drop => {
      drop.glitchTimer = 100;
    });
  }

  increaseIntensity() {
    this.drops.forEach(drop => {
      drop.speed *= 1.5;
    });
  }

  createMatrixExplosion() {
    // Create temporary red glitch effect
    const originalFillStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = originalFillStyle;
  }
}

class PuddleEffect {
  constructor(puddle) {
    this.puddle = puddle;
    this.ripples = [];
    this.isRunning = false;
  }

  init() {
    this.puddle.addEventListener('mouseenter', () => {
      this.createRipple(event.clientX, event.clientY);
    });
    
    this.puddle.addEventListener('mousemove', (e) => {
      if (Math.random() < 0.1) {
        this.createRipple(e.clientX, e.clientY);
      }
    });
    
    window.addEventListener('scroll', () => {
      if (Math.random() < 0.05) {
        this.createRipple(
          this.puddle.offsetLeft + this.puddle.offsetWidth / 2,
          this.puddle.offsetTop + this.puddle.offsetHeight / 2
        );
      }
    });
  }

  createRipple(x, y) {
    const ripple = {
      x: x - this.puddle.offsetLeft,
      y: y - this.puddle.offsetTop,
      radius: 0,
      maxRadius: 50,
      opacity: 1,
      speed: 2
    };
    
    this.ripples.push(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      const index = this.ripples.indexOf(ripple);
      if (index > -1) {
        this.ripples.splice(index, 1);
      }
    }, 1000);
  }

  start() {
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
  }

  animate() {
    if (!this.isRunning) return;
    
    this.ripples.forEach(ripple => {
      ripple.radius += ripple.speed;
      ripple.opacity = 1 - (ripple.radius / ripple.maxRadius);
      
      if (ripple.opacity <= 0) {
        ripple.opacity = 0;
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Simple and Guaranteed Matrix Digital Rain
class MatrixBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.animationId = null;
    this.isRunning = false;
    this.fontSize = 16;
    this.drops = [];
    
    // Simple character set
    this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    console.log('MatrixBackground initialized', this.canvas.width, this.canvas.height);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    console.log('MatrixBackground resized', this.canvas.width, this.canvas.height);
  }

  getRandomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  createDrop() {
    return {
      x: Math.random() * this.canvas.width,
      y: -20,
      char: this.getRandomChar(),
      speed: Math.random() * 3 + 1,
      opacity: 1,
      trail: []
    };
  }

  updateDrops() {
    // Create new drops
    if (Math.random() < 0.1) {
      this.drops.push(this.createDrop());
    }
    
    // Update existing drops
    this.drops.forEach((drop, index) => {
      // Update trail
      drop.trail.unshift({ x: drop.x, y: drop.y, char: drop.char, opacity: drop.opacity });
      if (drop.trail.length > 10) {
        drop.trail.pop();
      }
      
      // Move drop
      drop.y += drop.speed;
      
      // Change character occasionally
      if (Math.random() < 0.05) {
        drop.char = this.getRandomChar();
      }
      
      // Fade out
      if (drop.y > this.canvas.height * 0.5) {
        drop.opacity = Math.max(0, drop.opacity - 0.02);
      }
      
      // Remove old drops
      if (drop.y > this.canvas.height + 50 || drop.opacity <= 0) {
        this.drops.splice(index, 1);
      }
    });
  }

  draw() {
    // Check if high contrast mode is active
    const isHighContrast = document.body.classList.contains('high-contrast');
    
    // Clear with fade effect
    this.ctx.fillStyle = isHighContrast ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Set font
    this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
    this.ctx.textAlign = 'center';
    
    this.drops.forEach(drop => {
      // Draw trail
      drop.trail.forEach((trailPoint, index) => {
        const trailOpacity = (trailPoint.opacity * (1 - index / drop.trail.length)) * 0.3;
        const trailColor = isHighContrast ? `rgba(0, 0, 0, ${trailOpacity})` : `rgba(0, 255, 0, ${trailOpacity})`;
        this.ctx.fillStyle = trailColor;
        this.ctx.fillText(trailPoint.char, trailPoint.x, trailPoint.y);
      });
      
      // Draw main character
      const mainColor = isHighContrast ? `rgba(0, 0, 0, ${drop.opacity})` : `rgba(0, 255, 0, ${drop.opacity})`;
      this.ctx.fillStyle = mainColor;
      
      // Add glow
      this.ctx.shadowColor = isHighContrast ? '#000000' : '#00ff00';
      this.ctx.shadowBlur = isHighContrast ? 4 : 8;
      
      this.ctx.fillText(drop.char, drop.x, drop.y);
      this.ctx.shadowBlur = 0;
    });
  }

  animate() {
    if (!this.isRunning) return;
    
    this.updateDrops();
    this.draw();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  start() {
    console.log('MatrixBackground starting...');
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MatrixApp();
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
