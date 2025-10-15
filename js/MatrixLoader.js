/**
 * Matrix Loader - Spoon Bending Animation
 * Vanilla JavaScript implementation with theme-aware colors
 */

export class MatrixLoader {
  constructor(options = {}) {
    this.options = {
      maxTimeout: 50,   // 0.05 seconds max
      lineDelay: 10,    // Delay between lines
      holdTime: 15,     // Time to hold final line
      exitDuration: 10, // Fade out duration
      onComplete: null, // Completion callback
      ...options
    };
    
    this.state = {
      phase: 'INIT', // INIT -> L1 -> L2 -> L3 -> L4 -> HOLD -> EXIT
      progress: 0,
      isVisible: false,
      isReducedMotion: false
    };
    
    this.elements = {};
    this.animations = {};
    this.colors = {
      accent: '#00FF41',
      glow: 'rgba(0,255,65,0.35)',
      background: '#000000',
      text: '#ffffff'
    };
    
    this.lines = [
      "Do not try and bend the spoon.",
      "That's impossible.",
      "Instead, only try to realize the truth:",
      "There is no spoon."
    ];
    
    this.loadingPhases = [
      { text: "Alperdigital'e hoşgeldiniz.", progress: 100 }
    ];
    
    this.welcomePhases = [
      { text: "Alperdigital'e hoşgeldiniz.", progress: 25 },
      { text: "Şu anda buradasınız.", progress: 50 },
      { text: "Defina haritası yükleniyor...", progress: 75 },
      { text: "X işaretini bulun!", progress: 100 }
    ];
    
    this.init();
  }
  
  init() {
    this.detectReducedMotion();
    this.getThemeColors();
    this.createOverlay();
    this.createElements();
    this.setupWelcomeAnimation();
    this.setupEventListeners();
  }
  
  detectReducedMotion() {
    this.state.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  getThemeColors() {
    try {
      const computedStyle = getComputedStyle(document.documentElement);
      
      // Get accent color
      const accentColor = computedStyle.getPropertyValue('--code-rain-color')?.trim();
      if (accentColor) {
        this.colors.accent = accentColor;
      }
      
      // Get glow color
      const glowColor = computedStyle.getPropertyValue('--code-rain-glow')?.trim();
      if (glowColor) {
        this.colors.glow = glowColor;
      }
      
      // Determine background and text colors based on theme
      const isLightTheme = document.body.classList.contains('high-contrast');
      this.colors.background = isLightTheme ? '#ffffff' : '#000000';
      this.colors.text = isLightTheme ? '#000000' : '#ffffff';
      
    } catch (error) {
      console.warn('Could not read theme colors:', error);
    }
  }
  
  createOverlay() {
    // Create main overlay
    this.elements.overlay = document.createElement('div');
    this.elements.overlay.id = 'matrix-loader-overlay';
    this.elements.overlay.setAttribute('role', 'dialog');
    this.elements.overlay.setAttribute('aria-modal', 'true');
    this.elements.overlay.setAttribute('aria-label', 'Loading');
    
    // Apply styles
    Object.assign(this.elements.overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: '9999',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: this.colors.background,
      color: this.colors.text,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      opacity: '0',
      transition: `opacity 5ms ease-out`
    });
    
    // Create content container
    this.elements.content = document.createElement('div');
    this.elements.content.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      max-width: 90vw;
      text-align: center;
    `;
    
    // Create animation container
    this.elements.animationContainer = document.createElement('div');
    this.elements.animationContainer.style.cssText = `
      width: 400px;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    `;
    
    // Create loading text container
    this.elements.loadingText = document.createElement('div');
    this.elements.loadingText.className = 'loading-text';
    this.elements.loadingText.textContent = '';
    this.elements.loadingText.style.cssText = `
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease-out;
      text-shadow: 0 0 10px ${this.colors.glow};
      color: ${this.colors.accent};
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    // Create progress bar container
    this.elements.progressContainer = document.createElement('div');
    this.elements.progressContainer.style.cssText = `
      width: 300px;
      margin: 1rem 0;
      text-align: center;
    `;
    
    // Create progress bar background
    this.elements.progressBarBg = document.createElement('div');
    this.elements.progressBarBg.style.cssText = `
      width: 100%;
      height: 4px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 10px;
    `;
    
    // Create progress bar fill
    this.elements.progressBar = document.createElement('div');
    this.elements.progressBar.style.cssText = `
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, ${this.colors.accent}, ${this.colors.glow});
      border-radius: 2px;
      transition: width 0.3s ease-out;
      box-shadow: 0 0 10px ${this.colors.glow};
    `;
    
    // Create percentage text
    this.elements.percentageText = document.createElement('div');
    this.elements.percentageText.className = 'percentage-text';
    this.elements.percentageText.style.cssText = `
      color: ${this.colors.accent};
      font-size: 14px;
      font-weight: bold;
      text-shadow: 0 0 5px ${this.colors.glow};
    `;
    this.elements.percentageText.textContent = '0%';
    
    this.elements.progressBarBg.appendChild(this.elements.progressBar);
    this.elements.progressContainer.appendChild(this.elements.progressBarBg);
    this.elements.progressContainer.appendChild(this.elements.percentageText);
    
    this.elements.content.appendChild(this.elements.animationContainer);
    this.elements.content.appendChild(this.elements.loadingText);
    this.elements.content.appendChild(this.elements.progressContainer);
    this.elements.overlay.appendChild(this.elements.content);
    
    document.body.appendChild(this.elements.overlay);
  }
  
  setupWelcomeAnimation() {
    // Create welcome animation SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 300');
    svg.setAttribute('width', '400');
    svg.setAttribute('height', '300');
    svg.style.cssText = `
      filter: drop-shadow(0 0 8px ${this.colors.glow});
      transition: all 0.3s ease-out;
    `;
    
    // Create stick figure (çöp adam)
    const stickFigure = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    stickFigure.setAttribute('id', 'stick-figure');
    
    // Head
    const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    head.setAttribute('cx', '100');
    head.setAttribute('cy', '80');
    head.setAttribute('r', '15');
    head.setAttribute('stroke', this.colors.accent);
    head.setAttribute('stroke-width', '2');
    head.setAttribute('fill', 'none');
    
    // Body
    const body = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    body.setAttribute('x1', '100');
    body.setAttribute('y1', '95');
    body.setAttribute('x2', '100');
    body.setAttribute('y2', '150');
    body.setAttribute('stroke', this.colors.accent);
    body.setAttribute('stroke-width', '2');
    
    // Arms
    const leftArm = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    leftArm.setAttribute('x1', '100');
    leftArm.setAttribute('y1', '110');
    leftArm.setAttribute('x2', '80');
    leftArm.setAttribute('y2', '130');
    leftArm.setAttribute('stroke', this.colors.accent);
    leftArm.setAttribute('stroke-width', '2');
    
    const rightArm = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rightArm.setAttribute('x1', '100');
    rightArm.setAttribute('y1', '110');
    rightArm.setAttribute('x2', '120');
    rightArm.setAttribute('y2', '130');
    rightArm.setAttribute('stroke', this.colors.accent);
    rightArm.setAttribute('stroke-width', '2');
    
    // Legs
    const leftLeg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    leftLeg.setAttribute('x1', '100');
    leftLeg.setAttribute('y1', '150');
    leftLeg.setAttribute('x2', '85');
    leftLeg.setAttribute('y2', '180');
    leftLeg.setAttribute('stroke', this.colors.accent);
    leftLeg.setAttribute('stroke-width', '2');
    
    const rightLeg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rightLeg.setAttribute('x1', '100');
    rightLeg.setAttribute('y1', '150');
    rightLeg.setAttribute('x2', '115');
    rightLeg.setAttribute('y2', '180');
    rightLeg.setAttribute('stroke', this.colors.accent);
    rightLeg.setAttribute('stroke-width', '2');
    
    // Pointing finger (extended right arm)
    const pointingFinger = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    pointingFinger.setAttribute('x1', '120');
    pointingFinger.setAttribute('y1', '130');
    pointingFinger.setAttribute('x2', '200');
    pointingFinger.setAttribute('y2', '120');
    pointingFinger.setAttribute('stroke', this.colors.accent);
    pointingFinger.setAttribute('stroke-width', '3');
    pointingFinger.setAttribute('stroke-linecap', 'round');
    pointingFinger.setAttribute('opacity', '0');
    pointingFinger.setAttribute('id', 'pointing-finger');
    
    stickFigure.appendChild(head);
    stickFigure.appendChild(body);
    stickFigure.appendChild(leftArm);
    stickFigure.appendChild(rightArm);
    stickFigure.appendChild(leftLeg);
    stickFigure.appendChild(rightLeg);
    stickFigure.appendChild(pointingFinger);
    
    // Create website/browser mockup
    const website = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    website.setAttribute('id', 'website');
    
    // Browser window
    const browserWindow = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    browserWindow.setAttribute('x', '180');
    browserWindow.setAttribute('y', '50');
    browserWindow.setAttribute('width', '180');
    browserWindow.setAttribute('height', '120');
    browserWindow.setAttribute('stroke', this.colors.accent);
    browserWindow.setAttribute('stroke-width', '2');
    browserWindow.setAttribute('fill', 'rgba(0,0,0,0.1)');
    
    // Browser title bar
    const titleBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    titleBar.setAttribute('x', '180');
    titleBar.setAttribute('y', '50');
    titleBar.setAttribute('width', '180');
    titleBar.setAttribute('height', '20');
    titleBar.setAttribute('fill', this.colors.accent);
    titleBar.setAttribute('opacity', '0.3');
    
    // Close button (X)
    const closeButton = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    closeButton.setAttribute('x', '350');
    closeButton.setAttribute('y', '65');
    closeButton.setAttribute('font-family', 'monospace');
    closeButton.setAttribute('font-size', '12');
    closeButton.setAttribute('fill', this.colors.accent);
    closeButton.textContent = '×';
    closeButton.setAttribute('id', 'close-button');
    
    // Treasure map inside website
    const treasureMap = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    treasureMap.setAttribute('id', 'treasure-map');
    
    // Map background
    const mapBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    mapBg.setAttribute('x', '190');
    mapBg.setAttribute('y', '80');
    mapBg.setAttribute('width', '160');
    mapBg.setAttribute('height', '80');
    mapBg.setAttribute('fill', 'rgba(139, 69, 19, 0.3)');
    mapBg.setAttribute('stroke', this.colors.accent);
    mapBg.setAttribute('stroke-width', '2');
    
    // Treasure map paths (dotted lines)
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path1.setAttribute('x1', '200');
    path1.setAttribute('y1', '100');
    path1.setAttribute('x2', '250');
    path1.setAttribute('y2', '120');
    path1.setAttribute('stroke', this.colors.accent);
    path1.setAttribute('stroke-width', '2');
    path1.setAttribute('stroke-dasharray', '5,5');
    
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path2.setAttribute('x1', '250');
    path2.setAttribute('y1', '120');
    path2.setAttribute('x2', '300');
    path2.setAttribute('y2', '140');
    path2.setAttribute('stroke', this.colors.accent);
    path2.setAttribute('stroke-width', '2');
    path2.setAttribute('stroke-dasharray', '5,5');
    
    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path3.setAttribute('x1', '300');
    path3.setAttribute('y1', '140');
    path3.setAttribute('x2', '320');
    path3.setAttribute('y2', '130');
    path3.setAttribute('stroke', this.colors.accent);
    path3.setAttribute('stroke-width', '2');
    path3.setAttribute('stroke-dasharray', '5,5');
    
    // Big X mark
    const xMark1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xMark1.setAttribute('x1', '310');
    xMark1.setAttribute('y1', '120');
    xMark1.setAttribute('x2', '330');
    xMark1.setAttribute('y2', '140');
    xMark1.setAttribute('stroke', this.colors.accent);
    xMark1.setAttribute('stroke-width', '4');
    xMark1.setAttribute('stroke-linecap', 'round');
    
    const xMark2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xMark2.setAttribute('x1', '330');
    xMark2.setAttribute('y1', '120');
    xMark2.setAttribute('x2', '310');
    xMark2.setAttribute('y2', '140');
    xMark2.setAttribute('stroke', this.colors.accent);
    xMark2.setAttribute('stroke-width', '4');
    xMark2.setAttribute('stroke-linecap', 'round');
    
    // Add elements to treasure map
    treasureMap.appendChild(mapBg);
    treasureMap.appendChild(path1);
    treasureMap.appendChild(path2);
    treasureMap.appendChild(path3);
    treasureMap.appendChild(xMark1);
    treasureMap.appendChild(xMark2);
    
    website.appendChild(browserWindow);
    website.appendChild(titleBar);
    website.appendChild(closeButton);
    website.appendChild(treasureMap);
    
    svg.appendChild(stickFigure);
    svg.appendChild(website);
    this.elements.animationContainer.appendChild(svg);
    
    // Store elements for animation
    this.elements.welcomeSVG = svg;
    this.elements.pointingFinger = pointingFinger;
    this.elements.bigX = bigX;
    this.elements.closeButton = closeButton;
  }
  
  setupEventListeners() {
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      this.getThemeColors();
      this.updateColors();
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  
  updateColors() {
    if (this.elements.overlay) {
      this.elements.overlay.style.backgroundColor = this.colors.background;
      this.elements.overlay.style.color = this.colors.text;
    }
    
    if (this.elements.spoonSVG) {
      this.elements.spoonSVG.style.filter = `drop-shadow(0 0 8px ${this.colors.glow})`;
    }
    
    // Update spoon handle color
    if (this.elements.spoonHandle) {
      this.elements.spoonHandle.setAttribute('stroke', this.colors.accent);
    }
    
    // Update final line color and glow
    if (this.elements.lines[3]) {
      this.elements.lines[3].style.color = this.colors.accent;
      this.elements.lines[3].style.textShadow = `0 0 10px ${this.colors.glow}`;
    }
  }
  
  show() {
    if (this.state.isVisible) return;
    
    console.log('MatrixLoader: Starting Matrix Loader animation');
    
    // Ensure elements are created
    if (!this.elements.overlay) {
      this.createOverlay();
      this.createElements();
    }
    
    this.state.isVisible = true;
    this.state.phase = 'INIT';
    this.state.progress = 0;
    
    // Lock scroll
    document.documentElement.style.overflow = 'hidden';
    
    // Show overlay
    this.elements.overlay.style.opacity = '1';
    
    // Start animation sequence
    this.startSequence();
  }
  
  hide() {
    if (!this.state.isVisible) return;
    
    this.state.phase = 'EXIT';
    
    // Fade out
    this.elements.overlay.style.opacity = '0';
    
    setTimeout(() => {
      this.cleanup();
    }, 5);
  }
  
  startSequence() {
    if (this.state.isReducedMotion) {
      this.showReducedMotionSequence();
    } else {
      this.showLoadingSequence();
    }
  }
  
  showReducedMotionSequence() {
    // Show loading text instantly
    this.elements.loadingText.textContent = "Loading...";
    this.elements.loadingText.style.opacity = '1';
    this.elements.loadingText.style.transform = 'translateY(0)';
    
    // Show static spoon
    this.updateSpoon(0.5);
    
    // Hide after hold time
    setTimeout(() => {
      this.hide();
    }, 10);
  }
  
  showLoadingSequence() {
    let currentPhase = 0;
    
    const showNextPhase = () => {
      if (currentPhase >= this.loadingPhases.length) {
        // All phases complete, start treasure map animation
        this.startTreasureMapAnimation();
        return;
      }
      
      const phase = this.loadingPhases[currentPhase];
      
      // Update loading text
      this.elements.loadingText.textContent = phase.text;
      this.elements.loadingText.style.opacity = '1';
      this.elements.loadingText.style.transform = 'translateY(0)';
      
      // Update progress bar and percentage
      this.elements.progressBar.style.width = `${phase.progress}%`;
      if (this.elements.percentageText) {
        this.elements.percentageText.textContent = `${phase.progress}%`;
      }
      
      currentPhase++;
      
      // No delay needed since we only have one phase
      showNextPhase();
    };
    
    // Start the sequence
    showNextPhase();
  }
  
  startTreasureMapAnimation() {
    // Start treasure map pointing animation
    this.elements.loadingText.textContent = "Alperdigital'e hoşgeldiniz. Şu anda buradasınız.";
    this.elements.loadingText.style.opacity = '1';
    this.elements.loadingText.style.transform = 'translateY(0)';
    this.elements.loadingText.style.color = this.colors.accent;
    this.elements.loadingText.style.textShadow = `0 0 20px ${this.colors.glow}`;
    this.elements.loadingText.style.fontSize = '1.8rem';
    this.elements.loadingText.style.fontWeight = '600';
    
    // Update progress bar to 100%
    this.elements.progressBar.style.width = '100%';
    if (this.elements.percentageText) {
      this.elements.percentageText.textContent = '100%';
    }
    
    // Animate pointing finger and screen shake
    this.animatePointingAndShake();
    
    // Hide after 0.01 seconds
    setTimeout(() => {
      this.hide();
    }, 10);
  }
  
  showTreasureMapSequence() {
    // Show treasure map pointing animation
    this.elements.loadingText.textContent = "X işaretini bulun!";
    this.elements.loadingText.style.opacity = '1';
    this.elements.loadingText.style.transform = 'translateY(0)';
    this.elements.loadingText.style.color = this.colors.accent;
    this.elements.loadingText.style.textShadow = `0 0 20px ${this.colors.glow}`;
    
    // Animate pointing finger
    this.animatePointing();
    
    // Hide after 2 seconds
    setTimeout(() => {
      this.hide();
    }, 2000);
  }
  
  startPointingAnimation() {
    // Final phase: "X işaretini bulun!" with pointing animation
    this.elements.loadingText.textContent = "X işaretini bulun!";
    this.elements.loadingText.style.color = this.colors.accent;
    this.elements.loadingText.style.textShadow = `0 0 20px ${this.colors.glow}`;
    
    // Animate pointing finger
    this.animatePointing();
  }
  
  animatePointing() {
    // Show pointing finger
    this.elements.pointingFinger.style.opacity = '1';
    this.elements.pointingFinger.style.transition = 'opacity 0.3s ease-out';
    
    // Make X mark glow
    this.elements.bigX.style.filter = `drop-shadow(0 0 10px ${this.colors.glow})`;
    this.elements.bigX.style.transition = 'filter 0.3s ease-out';
    
    // Make close button glow
    this.elements.closeButton.style.filter = `drop-shadow(0 0 5px ${this.colors.glow})`;
    this.elements.closeButton.style.transition = 'filter 0.3s ease-out';
    
    // Hold pointing position
    setTimeout(() => {
      // Hide after pointing
      setTimeout(() => {
        this.hide();
      }, 500);
    }, 1000);
  }
  
  
  
  addGlitchEffect(element) {
    if (this.state.isReducedMotion) return;
    
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let glitchCount = 0;
    const maxGlitches = 3;
    
    const glitch = () => {
      if (glitchCount >= maxGlitches) {
        element.textContent = originalText;
        return;
      }
      
      // Random glitch
      const glitchText = originalText.split('').map(char => 
        Math.random() < 0.3 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
      ).join('');
      
      element.textContent = glitchText;
      glitchCount++;
      
      setTimeout(glitch, 25);
    };
    
    setTimeout(glitch, 50);
  }
  
  startProgressSimulation() {
    const startTime = Date.now();
    const duration = this.options.maxTimeout - 50; // Leave time for exit (50ms)
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      this.state.progress = Math.min(elapsed / duration, 1);
      
      this.updateSpoon(this.state.progress);
      
      if (this.state.progress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Progress complete, hide after short delay
        setTimeout(() => {
          this.hide();
        }, 25);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }
  
  updateSpoon(progress) {
    if (!this.elements.spoonHandle) return;
    
    // Calculate bend amount (0 = straight, 1 = fully bent)
    const bendAmount = Math.min(progress * 1.2, 1);
    
    // Define spoon handle paths
    const straightPath = "M 110 160 L 110 40";
    const bentPath = "M 110 160 C 110 120, 130 80, 150 40";
    
    // Interpolate between straight and bent
    const path = this.interpolatePath(straightPath, bentPath, bendAmount);
    this.elements.spoonHandle.setAttribute('d', path);
    
    // Add slight rotation and scale wobble
    if (!this.state.isReducedMotion) {
      const rotation = Math.sin(Date.now() * 0.003) * 2 * bendAmount;
      const scaleX = 1 + Math.sin(Date.now() * 0.005) * 0.02 * bendAmount;
      
      this.elements.spoonSVG.style.transform = `rotate(${rotation}deg) scaleX(${scaleX})`;
    }
  }
  
  animatePointingAndShake() {
    // Animate pointing finger
    const finger = this.elements.pointingFinger;
    if (!finger) return;
    
    // Show pointing finger
    finger.style.opacity = '1';
    finger.style.transition = 'opacity 0.01s ease';
    
    // Simple tap effect without complex animation
    setTimeout(() => {
      // Final tap effect
      this.elements.loadingText.style.textShadow = `0 0 30px ${this.colors.glow}`;
    }, 5);
  }
  
  interpolatePath(path1, path2, t) {
    // Simple path interpolation for spoon bending
    if (t <= 0) return path1;
    if (t >= 1) return path2;
    
    // Define control points for smooth interpolation
    const startX = 110;
    const startY = 160;
    const endX = 110;
    const endY = 40;
    
    // Calculate intermediate control points based on bend amount
    const controlX1 = startX + (t * 20); // Bend to the right
    const controlY1 = startY - (t * 40);
    const controlX2 = endX + (t * 20);
    const controlY2 = endY + (t * 40);
    
    // Create smooth curve
    return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
  }
  
  setProgress(progress) {
    this.state.progress = Math.max(0, Math.min(1, progress));
    this.updateSpoon(this.state.progress);
    
    // Auto-hide when progress reaches 100%
    if (this.state.progress >= 1 && this.state.phase === 'HOLD') {
      setTimeout(() => {
        this.hide();
      }, 50);
    }
  }
  
  cleanup() {
    if (this.elements.overlay && this.elements.overlay.parentNode) {
      this.elements.overlay.parentNode.removeChild(this.elements.overlay);
    }
    
    // Restore scroll
    document.documentElement.style.overflow = '';
    
    this.state.isVisible = false;
    this.state.phase = 'INIT';
    
    // Call completion callback
    if (this.options.onComplete && typeof this.options.onComplete === 'function') {
      this.options.onComplete();
    }
  }
  
  // Public API
  destroy() {
    this.cleanup();
  }
  
  isVisible() {
    return this.state.isVisible;
  }
}

// Global instance
let matrixLoaderInstance = null;

export function showMatrixLoader(options = {}) {
  if (matrixLoaderInstance) {
    matrixLoaderInstance.destroy();
  }
  
  matrixLoaderInstance = new MatrixLoader(options);
  matrixLoaderInstance.show();
  
  return matrixLoaderInstance;
}

export function hideMatrixLoader() {
  if (matrixLoaderInstance) {
    matrixLoaderInstance.hide();
  }
}

export function setMatrixLoaderProgress(progress) {
  if (matrixLoaderInstance) {
    matrixLoaderInstance.setProgress(progress);
  }
}
