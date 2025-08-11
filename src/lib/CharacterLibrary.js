/**
 * Character Library JavaScript API
 * 
 * A comprehensive API for creating, customizing, and animating 
 * 2D characters in web applications.
 * 
 * @version 1.0.0
 * @author Character Library Team
 */

import CSSVariableManager from './CSSVariableManager.js';

class CharacterLibrary {
  constructor() {
    this.characters = new Map();
    this.cssManager = new CSSVariableManager();
    this.loadedCharacters = new Set();
    this.defaultOptions = {
      size: 1,
      animationSpeed: 1,
      autoPlay: true,
      container: document.body,
      theme: 'light'
    };
    
    this.initializeEventListeners();
  }

  /**
   * Initialize event listeners for global character events
   */
  initializeEventListeners() {
    // Listen for theme changes
    this.cssManager.observeVariable('--cl-theme', (variable, value) => {
      this.emit('themeChanged', { theme: value });
    });

    // Listen for animation preference changes
    if (window.matchMedia) {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      motionQuery.addEventListener('change', (e) => {
        this.emit('motionPreferenceChanged', { reduced: e.matches });
        this.handleMotionPreferenceChange(e.matches);
      });
    }
  }

  /**
   * Handle reduced motion preference changes
   * @param {boolean} reduced - Whether reduced motion is preferred
   */
  handleMotionPreferenceChange(reduced) {
    this.characters.forEach((character, id) => {
      if (reduced) {
        this.pauseAnimation(id);
      } else if (character.options.autoPlay) {
        this.playAnimation(id);
      }
    });
  }

  /**
   * Create a new character instance
   * @param {string} characterId - The character identifier (e.g., 'casual-boy')
   * @param {Object} options - Configuration options
   * @returns {Promise<Object>} Character instance
   */
  async createCharacter(characterId, options = {}) {
    const characterOptions = { ...this.defaultOptions, ...options };
    const character = {
      id: this.generateCharacterId(),
      type: characterId,
      options: characterOptions,
      element: null,
      currentAnimation: null,
      isPlaying: false,
      customProperties: {},
      eventListeners: new Map()
    };

    try {
      // Load character metadata
      const metadata = await this.loadCharacterMetadata(characterId);
      character.metadata = metadata;

      // Create character element
      character.element = await this.createCharacterElement(characterId, metadata);
      
      // Apply initial configuration
      await this.configureCharacter(character, characterOptions);

      // Store character instance
      this.characters.set(character.id, character);
      
      // Emit creation event
      this.emit('characterCreated', { characterId: character.id, character });

      return character;
    } catch (error) {
      console.error(`Failed to create character ${characterId}:`, error);
      throw error;
    }
  }

  /**
   * Mount a character to the DOM
   * @param {string} characterInstanceId - The character instance ID
   * @param {string|HTMLElement} container - Container element or selector
   * @returns {Promise<void>}
   */
  async mountCharacter(characterInstanceId, container) {
    const character = this.characters.get(characterInstanceId);
    if (!character) {
      throw new Error(`Character instance ${characterInstanceId} not found`);
    }

    const containerElement = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;

    if (!containerElement) {
      throw new Error('Container element not found');
    }

    // Remove from previous container if exists
    if (character.element.parentNode) {
      character.element.parentNode.removeChild(character.element);
    }

    // Add to new container
    containerElement.appendChild(character.element);
    
    // Apply container-specific styles
    this.applyContainerStyles(character.element, containerElement);

    // Start auto-play if enabled
    if (character.options.autoPlay && character.metadata.animations.length > 0) {
      const defaultAnimation = character.metadata.animations.find(anim => anim.name === 'idle');
      if (defaultAnimation) {
        await this.playAnimation(characterInstanceId, defaultAnimation.name);
      }
    }

    this.emit('characterMounted', { characterId: characterInstanceId, container: containerElement });
  }

  /**
   * Play an animation on a character
   * @param {string} characterInstanceId - The character instance ID
   * @param {string} animationName - The name of the animation to play
   * @param {Object} options - Animation options
   * @returns {Promise<void>}
   */
  async playAnimation(characterInstanceId, animationName, options = {}) {
    const character = this.characters.get(characterInstanceId);
    if (!character) {
      throw new Error(`Character instance ${characterInstanceId} not found`);
    }

    const animation = character.metadata.animations.find(anim => anim.name === animationName);
    if (!animation) {
      throw new Error(`Animation ${animationName} not found for character`);
    }

    // Stop current animation
    if (character.currentAnimation) {
      this.stopAnimation(characterInstanceId);
    }

    // Apply animation based on type
    switch (animation.type) {
      case 'css':
        await this.playCSSAnimation(character, animation, options);
        break;
      case 'web-animations':
        await this.playWebAnimation(character, animation, options);
        break;
      case 'lottie':
        await this.playLottieAnimation(character, animation, options);
        break;
      default:
        throw new Error(`Unsupported animation type: ${animation.type}`);
    }

    character.currentAnimation = animationName;
    character.isPlaying = true;

    this.emit('animationStarted', { 
      characterId: characterInstanceId, 
      animation: animationName,
      type: animation.type
    });
  }

  /**
   * Play CSS-based animation
   * @param {Object} character - Character instance
   * @param {Object} animation - Animation metadata
   * @param {Object} options - Animation options
   */
  async playCSSAnimation(character, animation, options) {
    const element = character.element;
    
    // Remove existing animation classes
    element.classList.remove(...Array.from(element.classList).filter(cls => cls.startsWith('anim-')));
    
    // Add animation class
    element.classList.add(`anim-${animation.name}`);
    
    // Apply animation speed
    const speed = options.speed || character.options.animationSpeed;
    element.style.animationDuration = `${animation.duration / speed}ms`;
    
    // Handle looping
    if (!animation.loop && !options.loop) {
      setTimeout(() => {
        if (character.currentAnimation === animation.name) {
          this.stopAnimation(character.id);
        }
      }, animation.duration / speed);
    }
  }

  /**
   * Play Web Animations API animation
   * @param {Object} character - Character instance
   * @param {Object} animation - Animation metadata
   * @param {Object} options - Animation options
   */
  async playWebAnimation(character, animation, options) {
    const element = character.element;
    
    // Create keyframes (simplified example)
    const keyframes = this.generateWebAnimationKeyframes(animation.name);
    const animationOptions = {
      duration: animation.duration / (options.speed || character.options.animationSpeed),
      iterations: animation.loop || options.loop ? Infinity : 1,
      easing: 'ease-in-out'
    };

    const webAnimation = element.animate(keyframes, animationOptions);
    character.webAnimation = webAnimation;

    if (!animation.loop && !options.loop) {
      webAnimation.onfinish = () => {
        if (character.currentAnimation === animation.name) {
          this.stopAnimation(character.id);
        }
      };
    }
  }

  /**
   * Play Lottie animation
   * @param {Object} character - Character instance
   * @param {Object} animation - Animation metadata
   * @param {Object} options - Animation options
   */
  async playLottieAnimation(character, animation, options) {
    // This would integrate with Lottie library
    // For now, we'll simulate with CSS
    console.warn('Lottie animations require Lottie library integration');
    await this.playCSSAnimation(character, animation, options);
  }

  /**
   * Stop the current animation
   * @param {string} characterInstanceId - The character instance ID
   */
  stopAnimation(characterInstanceId) {
    const character = this.characters.get(characterInstanceId);
    if (!character) return;

    const element = character.element;
    
    // Stop CSS animations
    element.classList.remove(...Array.from(element.classList).filter(cls => cls.startsWith('anim-')));
    
    // Stop Web Animations
    if (character.webAnimation) {
      character.webAnimation.cancel();
      character.webAnimation = null;
    }

    character.currentAnimation = null;
    character.isPlaying = false;

    this.emit('animationStopped', { characterId: characterInstanceId });
  }

  /**
   * Pause the current animation
   * @param {string} characterInstanceId - The character instance ID
   */
  pauseAnimation(characterInstanceId) {
    const character = this.characters.get(characterInstanceId);
    if (!character || !character.isPlaying) return;

    const element = character.element;
    element.classList.add('paused');

    if (character.webAnimation) {
      character.webAnimation.pause();
    }

    this.emit('animationPaused', { characterId: characterInstanceId });
  }

  /**
   * Resume the current animation
   * @param {string} characterInstanceId - The character instance ID
   */
  resumeAnimation(characterInstanceId) {
    const character = this.characters.get(characterInstanceId);
    if (!character || !character.currentAnimation) return;

    const element = character.element;
    element.classList.remove('paused');

    if (character.webAnimation) {
      character.webAnimation.play();
    }

    this.emit('animationResumed', { characterId: characterInstanceId });
  }

  /**
   * Customize character appearance
   * @param {string} characterInstanceId - The character instance ID
   * @param {Object} customizations - Customization options
   */
  customizeCharacter(characterInstanceId, customizations) {
    const character = this.characters.get(characterInstanceId);
    if (!character) {
      throw new Error(`Character instance ${characterInstanceId} not found`);
    }

    // Store custom properties
    Object.assign(character.customProperties, customizations);

    // Apply CSS variables
    const cssVariables = this.cssManager.generateCharacterVariables(customizations);
    this.cssManager.setVariables(cssVariables, character.element);

    this.emit('characterCustomized', { 
      characterId: characterInstanceId, 
      customizations 
    });
  }

  /**
   * Set character size
   * @param {string} characterInstanceId - The character instance ID
   * @param {number} size - Size multiplier
   */
  setCharacterSize(characterInstanceId, size) {
    const character = this.characters.get(characterInstanceId);
    if (!character) return;

    character.element.style.transform = `scale(${size})`;
    character.options.size = size;

    this.emit('characterSizeChanged', { 
      characterId: characterInstanceId, 
      size 
    });
  }

  /**
   * Set animation speed
   * @param {string} characterInstanceId - The character instance ID
   * @param {number} speed - Speed multiplier
   */
  setAnimationSpeed(characterInstanceId, speed) {
    const character = this.characters.get(characterInstanceId);
    if (!character) return;

    character.options.animationSpeed = speed;

    // Update current animation speed
    if (character.currentAnimation) {
      this.playAnimation(characterInstanceId, character.currentAnimation, { speed });
    }

    this.emit('animationSpeedChanged', { 
      characterId: characterInstanceId, 
      speed 
    });
  }

  /**
   * Apply theme to character
   * @param {string} characterInstanceId - The character instance ID
   * @param {string} themeName - Theme name
   */
  applyTheme(characterInstanceId, themeName) {
    const character = this.characters.get(characterInstanceId);
    if (!character) return;

    this.cssManager.applyTheme(themeName, character.element);
    character.options.theme = themeName;

    this.emit('themeApplied', { 
      characterId: characterInstanceId, 
      theme: themeName 
    });
  }

  /**
   * Get character information
   * @param {string} characterInstanceId - The character instance ID
   * @returns {Object} Character information
   */
  getCharacterInfo(characterInstanceId) {
    const character = this.characters.get(characterInstanceId);
    if (!character) return null;

    return {
      id: character.id,
      type: character.type,
      metadata: character.metadata,
      options: character.options,
      currentAnimation: character.currentAnimation,
      isPlaying: character.isPlaying,
      customProperties: character.customProperties
    };
  }

  /**
   * Get available characters
   * @returns {Array} Array of available character types
   */
  getAvailableCharacters() {
    return [
      'casual-boy',
      'sporty-girl', 
      'formal-man',
      'fantasy-woman'
    ];
  }

  /**
   * Get character animations
   * @param {string} characterType - Character type
   * @returns {Array} Array of available animations
   */
  getCharacterAnimations(characterType) {
    // This would typically load from metadata
    const animations = {
      'casual-boy': ['idle', 'walk', 'wave', 'jump', 'blink', 'breathing'],
      'sporty-girl': ['idle', 'walk', 'jump', 'dance', 'blink', 'breathing'],
      'formal-man': ['idle', 'walk', 'wave', 'blink', 'breathing'],
      'fantasy-woman': ['idle', 'walk', 'dance', 'magic', 'blink', 'breathing']
    };

    return animations[characterType] || [];
  }

  /**
   * Destroy a character instance
   * @param {string} characterInstanceId - The character instance ID
   */
  destroyCharacter(characterInstanceId) {
    const character = this.characters.get(characterInstanceId);
    if (!character) return;

    // Stop animations
    this.stopAnimation(characterInstanceId);

    // Remove from DOM
    if (character.element && character.element.parentNode) {
      character.element.parentNode.removeChild(character.element);
    }

    // Remove event listeners
    character.eventListeners.clear();

    // Remove from characters map
    this.characters.delete(characterInstanceId);

    this.emit('characterDestroyed', { characterId: characterInstanceId });
  }

  /**
   * Add event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event callback
   */
  on(event, callback) {
    if (!this.eventListeners) {
      this.eventListeners = new Map();
    }
    
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    
    this.eventListeners.get(event).add(callback);
  }

  /**
   * Remove event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event callback
   */
  off(event, callback) {
    if (!this.eventListeners || !this.eventListeners.has(event)) return;
    
    this.eventListeners.get(event).delete(callback);
  }

  /**
   * Emit event
   * @param {string} event - Event name
   * @param {Object} data - Event data
   */
  emit(event, data = {}) {
    if (!this.eventListeners || !this.eventListeners.has(event)) return;
    
    this.eventListeners.get(event).forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
  }

  /**
   * Load character metadata
   * @param {string} characterId - Character identifier
   * @returns {Promise<Object>} Character metadata
   */
  async loadCharacterMetadata(characterId) {
    // In a real implementation, this would fetch from the server
    // For now, we'll use mock data
    const mockMetadata = {
      'casual-boy': {
        id: 'casual-boy',
        name: 'Casual Boy',
        type: 'boy',
        style: 'casual',
        animations: [
          { name: 'idle', duration: 2000, type: 'css', loop: true },
          { name: 'walk', duration: 1000, type: 'css', loop: true },
          { name: 'wave', duration: 1500, type: 'web-animations', loop: false },
          { name: 'jump', duration: 800, type: 'web-animations', loop: false },
          { name: 'blink', duration: 3000, type: 'css', loop: true },
          { name: 'breathing', duration: 4000, type: 'css', loop: true }
        ]
      },
      'sporty-girl': {
        id: 'sporty-girl',
        name: 'Sporty Girl',
        type: 'girl',
        style: 'sporty',
        animations: [
          { name: 'idle', duration: 2000, type: 'css', loop: true },
          { name: 'walk', duration: 1000, type: 'css', loop: true },
          { name: 'jump', duration: 800, type: 'web-animations', loop: false },
          { name: 'dance', duration: 2000, type: 'lottie', loop: true },
          { name: 'blink', duration: 3000, type: 'css', loop: true },
          { name: 'breathing', duration: 4000, type: 'css', loop: true }
        ]
      },
      'formal-man': {
        id: 'formal-man',
        name: 'Formal Man',
        type: 'man',
        style: 'formal',
        animations: [
          { name: 'idle', duration: 2000, type: 'css', loop: true },
          { name: 'walk', duration: 1000, type: 'css', loop: true },
          { name: 'wave', duration: 1500, type: 'web-animations', loop: false },
          { name: 'blink', duration: 3000, type: 'css', loop: true },
          { name: 'breathing', duration: 4000, type: 'css', loop: true }
        ]
      },
      'fantasy-woman': {
        id: 'fantasy-woman',
        name: 'Fantasy Woman',
        type: 'woman',
        style: 'fantasy',
        animations: [
          { name: 'idle', duration: 2000, type: 'css', loop: true },
          { name: 'walk', duration: 1000, type: 'css', loop: true },
          { name: 'dance', duration: 2000, type: 'lottie', loop: true },
          { name: 'magic', duration: 1500, type: 'web-animations', loop: false },
          { name: 'blink', duration: 3000, type: 'css', loop: true },
          { name: 'breathing', duration: 4000, type: 'css', loop: true }
        ]
      }
    };

    return mockMetadata[characterId] || null;
  }

  /**
   * Create character element
   * @param {string} characterId - Character identifier
   * @param {Object} metadata - Character metadata
   * @returns {Promise<HTMLElement>} Character element
   */
  async createCharacterElement(characterId, metadata) {
    // In a real implementation, this would load SVG and create DOM elements
    // For now, we'll create a placeholder div
    const element = document.createElement('div');
    element.className = `character-${characterId}`;
    element.style.width = '200px';
    element.style.height = '300px';
    element.style.position = 'relative';
    element.innerHTML = `
      <div class="character-placeholder" style="
        width: 100%; 
        height: 100%; 
        background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                    linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                    linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #666;
      ">
        ${metadata.name}
      </div>
    `;

    return element;
  }

  /**
   * Configure character with options
   * @param {Object} character - Character instance
   * @param {Object} options - Configuration options
   */
  async configureCharacter(character, options) {
    // Set size
    if (options.size) {
      this.setCharacterSize(character.id, options.size);
    }

    // Apply theme
    if (options.theme) {
      this.applyTheme(character.id, options.theme);
    }

    // Apply customizations
    if (options.customizations) {
      this.customizeCharacter(character.id, options.customizations);
    }
  }

  /**
   * Apply container-specific styles
   * @param {HTMLElement} characterElement - Character element
   * @param {HTMLElement} container - Container element
   */
  applyContainerStyles(characterElement, container) {
    // Make character responsive to container
    const containerRect = container.getBoundingClientRect();
    const scale = Math.min(containerRect.width / 200, containerRect.height / 300, 1);
    
    characterElement.style.transformOrigin = 'center';
    characterElement.style.transform = `scale(${scale})`;
  }

  /**
   * Generate Web Animation keyframes
   * @param {string} animationName - Animation name
   * @returns {Array} Keyframes array
   */
  generateWebAnimationKeyframes(animationName) {
    const keyframes = {
      wave: [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-45deg)' },
        { transform: 'rotate(-60deg)' },
        { transform: 'rotate(-30deg)' },
        { transform: 'rotate(0deg)' }
      ],
      jump: [
        { transform: 'translateY(0) scaleY(1)' },
        { transform: 'translateY(-30px) scaleY(1.1)' },
        { transform: 'translateY(-40px) scaleY(1.2)' },
        { transform: 'translateY(-30px) scaleY(1.1)' },
        { transform: 'translateY(0) scaleY(1)' }
      ],
      magic: [
        { transform: 'scale(1) rotate(0deg)', opacity: 0.8 },
        { transform: 'scale(1.2) rotate(90deg)', opacity: 1 },
        { transform: 'scale(1.5) rotate(180deg)', opacity: 0.6 },
        { transform: 'scale(1.2) rotate(270deg)', opacity: 1 },
        { transform: 'scale(1) rotate(360deg)', opacity: 0.8 }
      ]
    };

    return keyframes[animationName] || [];
  }

  /**
   * Generate unique character ID
   * @returns {string} Unique ID
   */
  generateCharacterId() {
    return `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export for use in modules
export default CharacterLibrary;

// Export for global use
if (typeof window !== 'undefined') {
  window.CharacterLibrary = CharacterLibrary;
  
  // Create global instance
  window.characterLibrary = new CharacterLibrary();
}