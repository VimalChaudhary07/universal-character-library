/**
 * Accessibility Utilities for Character Library
 * 
 * Provides comprehensive accessibility features including ARIA label management,
 * keyboard navigation, screen reader support, and motion preference handling.
 * 
 * @version 1.0.0
 * @author Character Library Team
 */

class AccessibilityUtils {
  constructor() {
    this.reducedMotion = false;
    this.highContrast = false;
    this.screenReader = false;
    this.keyboardNavigation = false;
    this.announcements = new Map();
    this.focusTrapElements = new Set();
    
    this.initializeAccessibilityFeatures();
    this.setupEventListeners();
  }

  /**
   * Initialize accessibility features by detecting user preferences
   */
  initializeAccessibilityFeatures() {
    // Detect reduced motion preference
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Detect high contrast mode
    this.highContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    // Detect screen reader usage (heuristic-based)
    this.screenReader = this.detectScreenReader();
    
    // Listen for preference changes
    this.setupPreferenceListeners();
  }

  /**
   * Setup event listeners for accessibility features
   */
  setupEventListeners() {
    // Keyboard navigation detection
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' || e.key === 'Shift' || e.key === 'Alt' || e.key === 'Control') {
        this.keyboardNavigation = true;
      }
    });

    document.addEventListener('mousedown', () => {
      this.keyboardNavigation = false;
    });

    // Handle focus management for character interactions
    document.addEventListener('focusin', (e) => {
      if (e.target.closest('[data-character]')) {
        this.handleCharacterFocus(e.target);
      }
    });

    document.addEventListener('focusout', (e) => {
      if (e.target.closest('[data-character]')) {
        this.handleCharacterBlur(e.target);
      }
    });
  }

  /**
   * Setup listeners for preference changes
   */
  setupPreferenceListeners() {
    // Reduced motion preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
      this.handleMotionPreferenceChange(e.matches);
    });

    // High contrast preference changes
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    contrastQuery.addEventListener('change', (e) => {
      this.highContrast = e.matches;
      this.handleContrastPreferenceChange(e.matches);
    });
  }

  /**
   * Detect screen reader usage (heuristic-based)
   * @returns {boolean} Whether screen reader is likely being used
   */
  detectScreenReader() {
    // Check for screen reader specific attributes
    const testElement = document.createElement('div');
    testElement.setAttribute('aria-hidden', 'true');
    testElement.style.position = 'absolute';
    testElement.style.left = '-10000px';
    testElement.style.width = '1px';
    testElement.style.height = '1px';
    testElement.style.overflow = 'hidden';
    document.body.appendChild(testElement);

    const isHidden = testElement.offsetWidth === 0 && testElement.offsetHeight === 0;
    document.body.removeChild(testElement);

    return isHidden;
  }

  /**
   * Handle motion preference changes
   * @param {boolean} reduced - Whether reduced motion is preferred
   */
  handleMotionPreferenceChange(reduced) {
    // Pause all animations if reduced motion is preferred
    if (reduced) {
      this.pauseAllAnimations();
      this.announceToScreenReader('Animations paused due to reduced motion preference');
    } else {
      this.announceToScreenReader('Animations resumed');
    }
  }

  /**
   * Handle contrast preference changes
   * @param {boolean} highContrast - Whether high contrast is preferred
   */
  handleContrastPreferenceChange(highContrast) {
    if (highContrast) {
      document.body.classList.add('high-contrast-mode');
      this.announceToScreenReader('High contrast mode enabled');
    } else {
      document.body.classList.remove('high-contrast-mode');
      this.announceToScreenReader('High contrast mode disabled');
    }
  }

  /**
   * Pause all character animations
   */
  pauseAllAnimations() {
    const animatedElements = document.querySelectorAll('[data-character], .anim-idle, .anim-walk, .anim-wave, .anim-jump, .anim-blink, .anim-breathing');
    
    animatedElements.forEach(element => {
      element.style.animationPlayState = 'paused';
      element.classList.add('motion-reduced');
    });
  }

  /**
   * Resume all character animations
   */
  resumeAllAnimations() {
    const animatedElements = document.querySelectorAll('[data-character].motion-reduced');
    
    animatedElements.forEach(element => {
      element.style.animationPlayState = 'running';
      element.classList.remove('motion-reduced');
    });
  }

  /**
   * Handle character focus events
   * @param {HTMLElement} element - The focused element
   */
  handleCharacterFocus(element) {
    const characterElement = element.closest('[data-character]');
    if (characterElement) {
      characterElement.classList.add('character-focused');
      
      // Announce character information to screen readers
      const characterName = characterElement.getAttribute('data-character-name') || 'Character';
      const currentAnimation = characterElement.getAttribute('data-animation') || 'idle';
      
      this.announceToScreenReader(`${characterName} focused. Currently showing ${currentAnimation} animation.`);
    }
  }

  /**
   * Handle character blur events
   * @param {HTMLElement} element - The blurred element
   */
  handleCharacterBlur(element) {
    const characterElement = element.closest('[data-character]');
    if (characterElement) {
      characterElement.classList.remove('character-focused');
    }
  }

  /**
   * Create ARIA labels for character elements
   * @param {HTMLElement} element - The character element
   * @param {Object} characterData - Character data
   * @returns {string} Generated ARIA label
   */
  createCharacterAriaLabel(element, characterData) {
    const {
      name,
      type,
      currentAnimation = 'idle',
      isPlaying = false,
      customization = {}
    } = characterData;

    let label = `${name}, ${type} character`;
    
    if (currentAnimation) {
      label += `, currently ${isPlaying ? 'playing' : 'paused'} ${currentAnimation} animation`;
    }

    // Add customization information if significant
    const customParts = Object.entries(customization).filter(([key, value]) => {
      return value && this.isSignificantCustomization(key, value);
    });

    if (customParts.length > 0) {
      const partsDescription = customParts.map(([key, value]) => {
        return `${key} colored ${this.getColorName(value)}`;
      }).join(', ');
      label += `, with ${partsDescription}`;
    }

    // Add interaction hint for keyboard users
    if (this.keyboardNavigation) {
      label += ', press Space or Enter to interact';
    }

    return label;
  }

  /**
   * Check if customization is significant enough to announce
   * @param {string} part - The part name
   * @param {string} color - The color value
   * @returns {boolean} Whether it's significant
   */
  isSignificantCustomization(part, color) {
    // Skip announcing default or common colors
    const commonColors = ['#FDBCB4', '#8B4513', '#000000', '#FFFFFF'];
    return !commonColors.includes(color.toUpperCase());
  }

  /**
   * Get color name from hex value
   * @param {string} hex - Hex color value
   * @returns {string} Color name
   */
  getColorName(hex) {
    const colorNames = {
      '#FF0000': 'red',
      '#00FF00': 'green',
      '#0000FF': 'blue',
      '#FFFF00': 'yellow',
      '#FF00FF': 'magenta',
      '#00FFFF': 'cyan',
      '#000000': 'black',
      '#FFFFFF': 'white',
      '#808080': 'gray',
      '#FFA500': 'orange',
      '#800080': 'purple',
      '#FFC0CB': 'pink',
      '#A52A2A': 'brown',
      '#FFD700': 'gold',
      '#C0C0C0': 'silver'
    };

    return colorNames[hex.toUpperCase()] || hex;
  }

  /**
   * Announce message to screen readers
   * @param {string} message - Message to announce
   * @param {Object} options - Announcement options
   */
  announceToScreenReader(message, options = {}) {
    const {
      priority = 'polite',
      timeout = 5000,
      id = null
    } = options;

    // Remove existing announcement with same ID
    if (id && this.announcements.has(id)) {
      const existingElement = this.announcements.get(id);
      if (existingElement.parentNode) {
        existingElement.parentNode.removeChild(existingElement);
      }
      this.announcements.delete(id);
    }

    // Create announcement element
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    // Add to DOM
    document.body.appendChild(announcement);

    // Store reference
    if (id) {
      this.announcements.set(id, announcement);
    }

    // Remove after timeout
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
      if (id) {
        this.announcements.delete(id);
      }
    }, timeout);
  }

  /**
   * Setup keyboard navigation for character interactions
   * @param {HTMLElement} element - The character element
   * @param {Object} handlers - Event handlers
   */
  setupKeyboardNavigation(element, handlers) {
    const {
      onPlay = () => {},
      onPause = () => {},
      onStop = () => {},
      onCustomize = () => {},
      onNext = () => {},
      onPrevious = () => {}
    } = handlers;

    element.setAttribute('tabindex', '0');
    element.setAttribute('role', 'application');
    element.setAttribute('aria-label', 'Interactive character');

    const keyHandler = (e) => {
      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          onPlay();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          onPause();
          break;
        case 's':
        case 'S':
          e.preventDefault();
          onStop();
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          onCustomize();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrevious();
          break;
        case 'Escape':
          e.preventDefault();
          element.blur();
          break;
      }
    };

    element.addEventListener('keydown', keyHandler);

    // Store handler for cleanup
    element._characterKeyHandler = keyHandler;
  }

  /**
   * Remove keyboard navigation from character element
   * @param {HTMLElement} element - The character element
   */
  removeKeyboardNavigation(element) {
    if (element._characterKeyHandler) {
      element.removeEventListener('keydown', element._characterKeyHandler);
      delete element._characterKeyHandler;
    }
    
    element.removeAttribute('tabindex');
    element.removeAttribute('role');
    element.removeAttribute('aria-label');
  }

  /**
   * Create focus trap for modal dialogs
   * @param {HTMLElement} container - The container element
   */
  createFocusTrap(container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const trapHandler = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', trapHandler);
    this.focusTrapElements.add(container);

    // Store handler for cleanup
    container._focusTrapHandler = trapHandler;

    // Focus first element
    firstElement.focus();
  }

  /**
   * Remove focus trap from container
   * @param {HTMLElement} container - The container element
   */
  removeFocusTrap(container) {
    if (container._focusTrapHandler) {
      container.removeEventListener('keydown', container._focusTrapHandler);
      delete container._focusTrapHandler;
    }
    
    this.focusTrapElements.delete(container);
  }

  /**
   * Generate accessible character description
   * @param {Object} characterData - Character data
   * @returns {string} Accessible description
   */
  generateCharacterDescription(characterData) {
    const {
      name,
      type,
      style,
      animations = [],
      customizableParts = [],
      currentAnimation = 'idle'
    } = characterData;

    let description = `${name} is a ${type} character in ${style} style. `;
    
    description += `This character has ${animations.length} animations available: `;
    description += animations.map(anim => anim.name).join(', ');
    description += '. ';
    
    if (customizableParts.length > 0) {
      description += `Customizable parts include: `;
      description += customizableParts.join(', ');
      description += '. ';
    }
    
    description += `Currently showing ${currentAnimation} animation. `;
    
    if (this.reducedMotion) {
      description += 'Animations are reduced due to user preferences. ';
    }
    
    if (this.keyboardNavigation) {
      description += 'Use keyboard shortcuts to interact: Space to play/pause, P to pause, S to stop, C to customize.';
    }

    return description;
  }

  /**
   * Update character accessibility attributes
   * @param {HTMLElement} element - The character element
   * @param {Object} characterData - Character data
   */
  updateCharacterAccessibility(element, characterData) {
    // Update ARIA labels
    const ariaLabel = this.createCharacterAriaLabel(element, characterData);
    element.setAttribute('aria-label', ariaLabel);
    
    // Update data attributes
    element.setAttribute('data-character', 'true');
    element.setAttribute('data-character-name', characterData.name);
    element.setAttribute('data-character-type', characterData.type);
    element.setAttribute('data-animation', characterData.currentAnimation || 'idle');
    element.setAttribute('data-playing', (characterData.isPlaying || false).toString());
    
    // Update accessibility classes
    if (this.reducedMotion) {
      element.classList.add('reduced-motion');
    }
    
    if (this.highContrast) {
      element.classList.add('high-contrast');
    }
    
    if (this.screenReader) {
      element.classList.add('screen-reader-mode');
    }
  }

  /**
   * Get current accessibility preferences
   * @returns {Object} Current preferences
   */
  getAccessibilityPreferences() {
    return {
      reducedMotion: this.reducedMotion,
      highContrast: this.highContrast,
      screenReader: this.screenReader,
      keyboardNavigation: this.keyboardNavigation
    };
  }

  /**
   * Add accessibility CSS classes to document
   */
  applyAccessibilityClasses() {
    const root = document.documentElement;
    
    if (this.reducedMotion) {
      root.classList.add('prefers-reduced-motion');
    }
    
    if (this.highContrast) {
      root.classList.add('prefers-high-contrast');
    }
    
    if (this.screenReader) {
      root.classList.add('screen-reader-active');
    }
  }

  /**
   * Clean up accessibility utilities
   */
  destroy() {
    // Remove all focus traps
    this.focusTrapElements.forEach(container => {
      this.removeFocusTrap(container);
    });
    
    // Remove all announcements
    this.announcements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    
    this.announcements.clear();
    this.focusTrapElements.clear();
  }
}

// Export for use in modules
export default AccessibilityUtils;

// Export for global use
if (typeof window !== 'undefined') {
  window.AccessibilityUtils = AccessibilityUtils;
  
  // Create global instance
  window.accessibilityUtils = new AccessibilityUtils();
}