/**
 * LoadingSplash - Vanilla JavaScript implementation
 * Theme-aware loading splash with falling letters animation
 */

class LoadingSplash {
  constructor() {
    this.WORD = "ALPERDIGITAL".split('');
    this.isReducedMotion = false;
    this.accentColor = '#00FF41';
    this.splashElement = null;
    this.letters = [];
    
    this.init();
  }

  init() {
    // Check if splash was already shown in this session
    const hasSeenSplash = sessionStorage.getItem('sawSplash');
    if (hasSeenSplash) {
      return;
    }

    // Check for reduced motion preference
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Get theme-aware accent color
    this.getAccentColor();
    
    // Create and show splash
    this.createSplash();
    this.showSplash();
  }

  getAccentColor() {
    try {
      const computedStyle = getComputedStyle(document.documentElement);
      const codeRainColor = computedStyle.getPropertyValue('--code-rain-color')?.trim();
      if (codeRainColor) {
        this.accentColor = codeRainColor;
        return;
      }
      
      // Fallback to matrix green
      const matrixGreen = computedStyle.getPropertyValue('--matrix-green')?.trim();
      this.accentColor = matrixGreen || '#00FF41';
    } catch (error) {
      console.warn('Could not read CSS variables:', error);
      this.accentColor = '#00FF41';
    }
  }

  createGlowShadow(hexColor) {
    try {
      const hex = hexColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      return `0 0 8px rgba(${r}, ${g}, ${b}, 0.35)`;
    } catch (error) {
      return '0 0 8px rgba(0, 255, 65, 0.35)';
    }
  }

  createSplash() {
    // Create splash container
    this.splashElement = document.createElement('div');
    this.splashElement.id = 'splash';
    this.splashElement.className = 'loading-splash';
    this.splashElement.setAttribute('role', 'dialog');
    this.splashElement.setAttribute('aria-modal', 'true');
    this.splashElement.setAttribute('aria-label', 'Loading Alperdigital');

    // Set background based on theme
    const isHighContrast = document.body.classList.contains('high-contrast');
    this.splashElement.style.background = isHighContrast 
      ? 'rgba(255, 255, 255, 0.95)' 
      : 'rgba(0, 0, 0, 0.95)';

    // Create letters container
    const lettersContainer = document.createElement('div');
    lettersContainer.className = 'letters-container';
    lettersContainer.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', monospace;
    `;

    // Create individual letters
    this.WORD.forEach((letter, index) => {
      const letterElement = document.createElement('span');
      letterElement.className = 'letter';
      letterElement.textContent = letter;
      letterElement.style.cssText = `
        font-size: 4rem;
        font-weight: 800;
        letter-spacing: 0.06em;
        color: ${this.accentColor};
        text-shadow: ${this.createGlowShadow(this.accentColor)};
        margin-left: ${index === 0 ? '0' : '0.1em'};
        opacity: 0;
        transform: translateY(-120vh) rotateX(30deg) scale(0.95);
        transition: all 0.02s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        display: inline-block;
      `;

      lettersContainer.appendChild(letterElement);
      this.letters.push(letterElement);
    });

    this.splashElement.appendChild(lettersContainer);
    document.body.appendChild(this.splashElement);

    // Lock scroll
    document.documentElement.style.overflow = 'hidden';
  }

  showSplash() {
    if (this.isReducedMotion) {
      // Reduced motion: show static word for 300ms
      this.letters.forEach(letter => {
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
      });

      setTimeout(() => {
        this.hideSplash();
      }, 25);
    } else {
      // Full animation: stagger letter drops
      this.letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.style.opacity = '1';
          letter.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
        }, 2 + (index * 1)); // Stagger timing
      });

      // Hide splash after animation completes
      setTimeout(() => {
        this.hideSplash();
      }, 20);
    }
  }

  hideSplash() {
    if (!this.splashElement) return;

    // Fade out animation
    this.splashElement.style.opacity = '0';
    this.splashElement.style.transition = 'opacity 0.01s ease-in';

    setTimeout(() => {
      if (this.splashElement && this.splashElement.parentNode) {
        this.splashElement.parentNode.removeChild(this.splashElement);
      }
      
      // Restore scroll
      document.documentElement.style.overflow = '';
      
      // Mark as seen
      sessionStorage.setItem('sawSplash', '1');
    }, 10);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LoadingSplash();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LoadingSplash;
}
