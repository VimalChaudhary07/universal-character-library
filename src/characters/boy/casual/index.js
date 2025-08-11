/**
 * Casual Boy Character
 * 
 * A friendly young boy in casual clothing, perfect for children's apps and games.
 * 
 * @module CasualBoy
 * @version 1.0.0
 * @author Character Library Team
 * @license MIT
 */

import meta from './meta.json';
import './custom-properties.css';
import './animations.css';

/**
 * Casual Boy Character Class
 */
class CasualBoy {
  /**
   * Create a new Casual Boy character instance
   * @param {Object} options - Configuration options
   * @param {string} options.container - CSS selector or DOM element for the character container
   * @param {Object} options.colors - Color configuration
   * @param {string} options.colors.skin - Skin color
   * @param {string} options.colors.hair - Hair color
   * @param {string} options.colors.shirt - Shirt color
   * @param {string} options.colors.pants - Pants color
   * @param {string} options.colors.shoes - Shoes color
   * @param {string} options.size - Character size ('small', 'medium', 'large')
   * @param {string} options.theme - Character theme ('light', 'dark', 'neon')
   * @param {string} options.animationSpeed - Animation speed ('slow', 'normal', 'fast')
   * @param {boolean} options.autoplay - Whether to autoplay the idle animation
   */
  constructor(options = {}) {
    this.id = meta.id;
    this.name = meta.name;
    this.type = meta.type;
    this.style = meta.style;
    this.meta = meta;
    
    // Default options
    this.options = {
      container: options.container || 'body',
      colors: {
        skin: options.colors?.skin || '#FDBCB4',
        hair: options.colors?.hair || '#8B4513',
        shirt: options.colors?.shirt || '#4169E1',
        pants: options.colors?.pants || '#2F4F4F',
        shoes: options.colors?.shoes || '#000000'
      },
      size: options.size || 'medium',
      theme: options.theme || 'light',
      animationSpeed: options.animationSpeed || 'normal',
      autoplay: options.autoplay !== false
    };
    
    this.container = null;
    this.svgElement = null;
    this.currentAnimation = null;
    this.isPlaying = false;
    this.eventListeners = {};
    
    this.init();
  }
  
  /**
   * Initialize the character
   */
  init() {
    // Get or create container
    if (typeof this.options.container === 'string') {
      this.container = document.querySelector(this.options.container);
    } else if (this.options.container instanceof HTMLElement) {
      this.container = this.options.container;
    }
    
    if (!this.container) {
      throw new Error(`Container not found: ${this.options.container}`);
    }
    
    // Create character element
    this.createCharacterElement();
    
    // Apply initial styles
    this.applyColors();
    this.applySize();
    this.applyTheme();
    this.applyAnimationSpeed();
    
    // Start autoplay if enabled
    if (this.options.autoplay) {
      this.play('idle');
    }
    
    // Emit ready event
    this.emit('ready');
  }
  
  /**
   * Create the character SVG element
   */
  createCharacterElement() {
    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = `character-${this.type}-${this.style} ${this.options.size} theme-${this.options.theme} animation-${this.options.animationSpeed}`;
    wrapper.setAttribute('role', 'img');
    wrapper.setAttribute('aria-label', this.meta.accessibility.label);
    wrapper.setAttribute('aria-description', this.meta.accessibility.ariaDescription);
    
    // Create SVG element (simplified for demo - in real implementation, load from SVG file)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', this.meta.dimensions.viewBox);
    svg.setAttribute('width', this.meta.dimensions.width);
    svg.setAttribute('height', this.meta.dimensions.height);
    svg.className = 'character-svg';
    
    // Create character group
    const characterGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    characterGroup.className = 'character-group';
    
    // Add character structure (simplified - in real implementation, load from SVG file)
    this.createCharacterStructure(characterGroup);
    
    svg.appendChild(characterGroup);
    wrapper.appendChild(svg);
    
    this.container.appendChild(wrapper);
    this.svgElement = svg;
    this.characterGroup = characterGroup;
  }
  
  /**
   * Create character structure (simplified version)
   * @param {SVGElement} parent - Parent SVG element
   */
  createCharacterStructure(parent) {
    // This is a simplified version - in real implementation, load from SVG file
    const structure = `
      <!-- Head -->
      <g class="head-group">
        <ellipse class="skin-color" cx="100" cy="80" rx="30" ry="35" fill="${this.options.colors.skin}"/>
        <circle class="hair-color" cx="100" cy="60" r="25" fill="${this.options.colors.hair}"/>
        <g class="eyes-group">
          <ellipse class="eye-left" cx="85" cy="75" rx="8" ry="6" fill="#FFFFFF"/>
          <circle class="pupil-left" cx="85" cy="75" r="4" fill="#000000"/>
          <ellipse class="eye-right" cx="115" cy="75" rx="8" ry="6" fill="#FFFFFF"/>
          <circle class="pupil-right" cx="115" cy="75" r="4" fill="#000000"/>
        </g>
      </g>
      <!-- Body -->
      <g class="torso-group">
        <rect class="shirt-color" x="75" y="115" width="50" height="60" rx="5" fill="${this.options.colors.shirt}"/>
        <g class="arms-group">
          <rect class="skin-color left-arm" x="60" y="120" width="15" height="40" rx="7" fill="${this.options.colors.skin}"/>
          <rect class="skin-color right-arm" x="125" y="120" width="15" height="40" rx="7" fill="${this.options.colors.skin}"/>
        </g>
      </g>
      <!-- Legs -->
      <g class="legs-group">
        <rect class="pants-color left-leg" x="80" y="175" width="20" height="50" rx="5" fill="${this.options.colors.pants}"/>
        <rect class="pants-color right-leg" x="100" y="175" width="20" height="50" rx="5" fill="${this.options.colors.pants}"/>
        <ellipse class="shoes-color left-shoe" cx="90" cy="250" rx="15" ry="8" fill="${this.options.colors.shoes}"/>
        <ellipse class="shoes-color right-shoe" cx="110" cy="250" rx="15" ry="8" fill="${this.options.colors.shoes}"/>
      </g>
    `;
    
    parent.innerHTML = structure;
  }
  
  /**
   * Apply colors to the character
   */
  applyColors() {
    if (!this.svgElement) return;
    
    const root = this.svgElement.parentElement;
    root.style.setProperty('--skin-color', this.options.colors.skin);
    root.style.setProperty('--hair-color', this.options.colors.hair);
    root.style.setProperty('--shirt-color', this.options.colors.shirt);
    root.style.setProperty('--pants-color', this.options.colors.pants);
    root.style.setProperty('--shoes-color', this.options.colors.shoes);
    
    this.emit('colorsChanged', { colors: this.options.colors });
  }
  
  /**
   * Apply size to the character
   */
  applySize() {
    if (!this.svgElement) return;
    
    const root = this.svgElement.parentElement;
    root.className = root.className.replace(/size-\w+/, `size-${this.options.size}`);
  }
  
  /**
   * Apply theme to the character
   */
  applyTheme() {
    if (!this.svgElement) return;
    
    const root = this.svgElement.parentElement;
    root.className = root.className.replace(/theme-\w+/, `theme-${this.options.theme}`);
  }
  
  /**
   * Apply animation speed to the character
   */
  applyAnimationSpeed() {
    if (!this.svgElement) return;
    
    const root = this.svgElement.parentElement;
    root.className = root.className.replace(/animation-\w+/, `animation-${this.options.animationSpeed}`);
  }
  
  /**
   * Play an animation
   * @param {string} animationName - Name of the animation to play
   * @param {Object} options - Animation options
   * @param {boolean} options.loop - Whether to loop the animation
   * @param {number} options.speed - Animation speed multiplier
   */
  play(animationName, options = {}) {
    if (!this.characterGroup) return;
    
    // Check if animation exists
    const animation = this.meta.animations.find(anim => anim.name === animationName);
    if (!animation) {
      throw new Error(`Animation not found: ${animationName}`);
    }
    
    // Remove previous animation classes
    this.characterGroup.className = this.characterGroup.className.replace(/\\b\\w+-animation\\b/g, '').trim();
    
    // Add new animation class
    this.characterGroup.classList.add(animationName);
    
    // Apply options
    if (options.loop !== undefined) {
      this.characterGroup.style.animationIterationCount = options.loop ? 'infinite' : '1';
    }
    
    if (options.speed !== undefined) {
      this.characterGroup.style.animationDuration = `${animation.duration / options.speed}ms`;
    }
    
    this.currentAnimation = animationName;
    this.isPlaying = true;
    
    this.emit('play', { animationName, timestamp: Date.now() });
    
    // Handle animation end for non-looping animations
    if (!options.loop && !animation.loop) {
      const handleAnimationEnd = () => {
        this.isPlaying = false;
        this.emit('animationEnd', { animationName, timestamp: Date.now() });
        this.characterGroup.removeEventListener('animationend', handleAnimationEnd);
      };
      this.characterGroup.addEventListener('animationend', handleAnimationEnd);
    }
  }
  
  /**
   * Pause the current animation
   */
  pause() {
    if (!this.characterGroup || !this.isPlaying) return;
    
    this.characterGroup.classList.add('paused');
    this.isPlaying = false;
    
    this.emit('pause', { animationName: this.currentAnimation, timestamp: Date.now() });
  }
  
  /**
   * Stop the current animation
   */
  stop() {
    if (!this.characterGroup) return;
    
    this.characterGroup.className = this.characterGroup.className.replace(/\\b\\w+-animation\\b/g, '').trim();
    this.characterGroup.classList.remove('paused');
    this.isPlaying = false;
    this.currentAnimation = null;
    
    this.emit('stop', { animationName: this.currentAnimation, timestamp: Date.now() });
  }
  
  /**
   * Set character colors
   * @param {Object} colors - New color configuration
   */
  setColors(colors) {
    this.options.colors = { ...this.options.colors, ...colors };
    this.applyColors();
  }
  
  /**
   * Set character size
   * @param {string} size - New size ('small', 'medium', 'large')
   */
  setSize(size) {
    this.options.size = size;
    this.applySize();
    this.emit('styleChanged', { style: size, timestamp: Date.now() });
  }
  
  /**
   * Set character theme
   * @param {string} theme - New theme ('light', 'dark', 'neon')
   */
  setTheme(theme) {
    this.options.theme = theme;
    this.applyTheme();
    this.emit('styleChanged', { style: theme, timestamp: Date.now() });
  }
  
  /**
   * Set animation speed
   * @param {string} speed - New speed ('slow', 'normal', 'fast')
   */
  setAnimationSpeed(speed) {
    this.options.animationSpeed = speed;
    this.applyAnimationSpeed();
  }
  
  /**
   * Add event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event handler
   */
  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }
  
  /**
   * Remove event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event handler to remove
   */
  off(event, callback) {
    if (!this.eventListeners[event]) return;
    
    const index = this.eventListeners[event].indexOf(callback);
    if (index > -1) {
      this.eventListeners[event].splice(index, 1);
    }
  }
  
  /**
   * Emit event
   * @param {string} event - Event name
   * @param {Object} data - Event data
   */
  emit(event, data = {}) {
    if (!this.eventListeners[event]) return;
    
    this.eventListeners[event].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }
  
  /**
   * Destroy the character instance
   */
  destroy() {
    if (this.svgElement && this.svgElement.parentElement) {
      this.svgElement.parentElement.remove();
    }
    
    this.eventListeners = {};
    this.emit('destroyed');
  }
  
  /**
   * Get character metadata
   * @returns {Object} Character metadata
   */
  getMeta() {
    return { ...this.meta };
  }
  
  /**
   * Get available animations
   * @returns {Array} Array of animation names
   */
  getAvailableAnimations() {
    return this.meta.animations.map(anim => anim.name);
  }
  
  /**
   * Get current animation
   * @returns {string|null} Current animation name
   */
  getCurrentAnimation() {
    return this.currentAnimation;
  }
  
  /**
   * Check if animation is playing
   * @returns {boolean} Whether animation is playing
   */
  isAnimationPlaying() {
    return this.isPlaying;
  }
}

// Export the character class
export default CasualBoy;
export { CasualBoy };

// Static methods
CasualBoy.getMeta = () => meta;
CasualBoy.getAvailableAnimations = () => meta.animations.map(anim => anim.name);
CasualBoy.getDefaultColors = () => ({
  skin: '#FDBCB4',
  hair: '#8B4513',
  shirt: '#4169E1',
  pants: '#2F4F4F',
  shoes: '#000000'
});
