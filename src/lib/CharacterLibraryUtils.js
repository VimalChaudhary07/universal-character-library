/**
 * Character Library Utilities
 * 
 * Utility functions and helpers for working with the Character Library.
 * Provides simplified APIs for common use cases.
 * 
 * @version 1.0.0
 * @author Character Library Team
 */

import CharacterLibrary from './CharacterLibrary.js';

class CharacterLibraryUtils {
  constructor() {
    this.library = new CharacterLibrary();
  }

  /**
   * Quick character creation and mounting
   * @param {string} characterType - Character type (e.g., 'casual-boy')
   * @param {string|HTMLElement} container - Container element or selector
   * @param {Object} options - Configuration options
   * @returns {Promise<string>} Character instance ID
   */
  async createAndMount(characterType, container, options = {}) {
    try {
      const character = await this.library.createCharacter(characterType, options);
      await this.library.mountCharacter(character.id, container);
      return character.id;
    } catch (error) {
      console.error('Failed to create and mount character:', error);
      throw error;
    }
  }

  /**
   * Create multiple characters at once
   * @param {Array} characterConfigs - Array of character configurations
   * @returns {Promise<Array>} Array of character instance IDs
   */
  async createMultipleCharacters(characterConfigs) {
    const promises = characterConfigs.map(async (config) => {
      const { type, container, options } = config;
      return this.createAndMount(type, container, options);
    });

    return Promise.all(promises);
  }

  /**
   * Get character by instance ID with simplified API
   * @param {string} characterInstanceId - Character instance ID
   * @returns {Object} Simplified character interface
   */
  getCharacter(characterInstanceId) {
    const info = this.library.getCharacterInfo(characterInstanceId);
    if (!info) return null;

    return {
      id: info.id,
      type: info.type,
      name: info.metadata.name,
      isPlaying: info.isPlaying,
      currentAnimation: info.currentAnimation,
      
      // Simplified methods
      play: (animationName, options) => this.library.playAnimation(characterInstanceId, animationName, options),
      stop: () => this.library.stopAnimation(characterInstanceId),
      pause: () => this.library.pauseAnimation(characterInstanceId),
      resume: () => this.library.resumeAnimation(characterInstanceId),
      customize: (customizations) => this.library.customizeCharacter(characterInstanceId, customizations),
      setSize: (size) => this.library.setCharacterSize(characterInstanceId, size),
      setSpeed: (speed) => this.library.setAnimationSpeed(characterInstanceId, speed),
      setTheme: (theme) => this.library.applyTheme(characterInstanceId, theme),
      destroy: () => this.library.destroyCharacter(characterInstanceId)
    };
  }

  /**
   * Create a character scene with multiple characters
   * @param {string} sceneId - Scene identifier
   * @param {Array} characterConfigs - Array of character configurations
   * @param {Object} sceneOptions - Scene configuration options
   * @returns {Promise<Object>} Scene interface
   */
  async createScene(sceneId, characterConfigs, sceneOptions = {}) {
    const scene = {
      id: sceneId,
      characters: [],
      options: sceneOptions,
      isPlaying: false
    };

    try {
      // Create all characters
      const characterPromises = characterConfigs.map(async (config, index) => {
        const characterId = await this.createAndMount(
          config.type,
          config.container || sceneOptions.container,
          { ...sceneOptions.characterOptions, ...config.options }
        );
        
        const character = this.getCharacter(characterId);
        character.sceneIndex = index;
        scene.characters.push(character);
        
        return characterId;
      });

      await Promise.all(characterPromises);

      // Apply scene layout
      this.applySceneLayout(scene, sceneOptions.layout);

      // Auto-start scene if requested
      if (sceneOptions.autoPlay !== false) {
        this.playScene(sceneId);
      }

      return {
        id: scene.id,
        characters: scene.characters,
        isPlaying: scene.isPlaying,
        
        // Scene methods
        play: () => this.playScene(sceneId),
        pause: () => this.pauseScene(sceneId),
        stop: () => this.stopScene(sceneId),
        addCharacter: (config) => this.addCharacterToScene(sceneId, config),
        removeCharacter: (index) => this.removeCharacterFromScene(sceneId, index),
        destroy: () => this.destroyScene(sceneId)
      };
    } catch (error) {
      console.error('Failed to create scene:', error);
      throw error;
    }
  }

  /**
   * Play all characters in a scene
   * @param {string} sceneId - Scene identifier
   */
  playScene(sceneId) {
    const scene = this.getScene(sceneId);
    if (!scene) return;

    scene.characters.forEach((character, index) => {
      const animation = scene.options.animations?.[index] || 'idle';
      character.play(animation);
    });

    scene.isPlaying = true;
  }

  /**
   * Pause all characters in a scene
   * @param {string} sceneId - Scene identifier
   */
  pauseScene(sceneId) {
    const scene = this.getScene(sceneId);
    if (!scene) return;

    scene.characters.forEach(character => {
      character.pause();
    });

    scene.isPlaying = false;
  }

  /**
   * Stop all characters in a scene
   * @param {string} sceneId - Scene identifier
   */
  stopScene(sceneId) {
    const scene = this.getScene(sceneId);
    if (!scene) return;

    scene.characters.forEach(character => {
      character.stop();
    });

    scene.isPlaying = false;
  }

  /**
   * Add character to existing scene
   * @param {string} sceneId - Scene identifier
   * @param {Object} config - Character configuration
   */
  async addCharacterToScene(sceneId, config) {
    const scene = this.getScene(sceneId);
    if (!scene) return;

    const characterId = await this.createAndMount(
      config.type,
      config.container || scene.options.container,
      { ...scene.options.characterOptions, ...config.options }
    );

    const character = this.getCharacter(characterId);
    character.sceneIndex = scene.characters.length;
    scene.characters.push(character);

    // Auto-play if scene is playing
    if (scene.isPlaying) {
      const animation = scene.options.animations?.[character.sceneIndex] || 'idle';
      character.play(animation);
    }

    return character;
  }

  /**
   * Remove character from scene
   * @param {string} sceneId - Scene identifier
   * @param {number} index - Character index
   */
  removeCharacterFromScene(sceneId, index) {
    const scene = this.getScene(sceneId);
    if (!scene || index < 0 || index >= scene.characters.length) return;

    const character = scene.characters[index];
    character.destroy();
    scene.characters.splice(index, 1);

    // Update scene indices
    scene.characters.forEach((char, i) => {
      char.sceneIndex = i;
    });
  }

  /**
   * Destroy scene and all characters
   * @param {string} sceneId - Scene identifier
   */
  destroyScene(sceneId) {
    const scene = this.getScene(sceneId);
    if (!scene) return;

    scene.characters.forEach(character => {
      character.destroy();
    });

    // Remove from scenes storage
    if (this.scenes) {
      this.scenes.delete(sceneId);
    }
  }

  /**
   * Apply layout to scene characters
   * @param {Object} scene - Scene object
   * @param {string} layoutType - Layout type ('grid', 'horizontal', 'vertical', 'circle')
   */
  applySceneLayout(scene, layoutType = 'horizontal') {
    const container = scene.options.container;
    if (!container) return;

    const containerElement = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;

    if (!containerElement) return;

    const containerRect = containerElement.getBoundingClientRect();
    const characterCount = scene.characters.length;

    switch (layoutType) {
      case 'grid':
        this.applyGridLayout(scene.characters, containerRect, characterCount);
        break;
      case 'horizontal':
        this.applyHorizontalLayout(scene.characters, containerRect, characterCount);
        break;
      case 'vertical':
        this.applyVerticalLayout(scene.characters, containerRect, characterCount);
        break;
      case 'circle':
        this.applyCircleLayout(scene.characters, containerRect, characterCount);
        break;
      default:
        this.applyHorizontalLayout(scene.characters, containerRect, characterCount);
    }
  }

  /**
   * Apply grid layout
   */
  applyGridLayout(characters, containerRect, count) {
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const cellWidth = containerRect.width / cols;
    const cellHeight = containerRect.height / rows;

    characters.forEach((character, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = col * cellWidth + cellWidth / 2;
      const y = row * cellHeight + cellHeight / 2;

      character.element.style.position = 'absolute';
      character.element.style.left = `${x}px`;
      character.element.style.top = `${y}px`;
      character.element.style.transform = 'translate(-50%, -50%)';
    });
  }

  /**
   * Apply horizontal layout
   */
  applyHorizontalLayout(characters, containerRect, count) {
    const spacing = containerRect.width / (count + 1);

    characters.forEach((character, index) => {
      const x = (index + 1) * spacing;
      const y = containerRect.height / 2;

      character.element.style.position = 'absolute';
      character.element.style.left = `${x}px`;
      character.element.style.top = `${y}px`;
      character.element.style.transform = 'translate(-50%, -50%)';
    });
  }

  /**
   * Apply vertical layout
   */
  applyVerticalLayout(characters, containerRect, count) {
    const spacing = containerRect.height / (count + 1);

    characters.forEach((character, index) => {
      const x = containerRect.width / 2;
      const y = (index + 1) * spacing;

      character.element.style.position = 'absolute';
      character.element.style.left = `${x}px`;
      character.element.style.top = `${y}px`;
      character.element.style.transform = 'translate(-50%, -50%)';
    });
  }

  /**
   * Apply circle layout
   */
  applyCircleLayout(characters, containerRect, count) {
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    const radius = Math.min(containerRect.width, containerRect.height) / 3;

    characters.forEach((character, index) => {
      const angle = (index / count) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      character.element.style.position = 'absolute';
      character.element.style.left = `${x}px`;
      character.element.style.top = `${y}px`;
      character.element.style.transform = 'translate(-50%, -50%)';
    });
  }

  /**
   * Get scene by ID
   * @param {string} sceneId - Scene identifier
   * @returns {Object|null} Scene object
   */
  getScene(sceneId) {
    if (!this.scenes) {
      this.scenes = new Map();
    }
    return this.scenes.get(sceneId) || null;
  }

  /**
   * Create character with preset configurations
   * @param {string} preset - Preset name
   * @param {string|HTMLElement} container - Container element or selector
   * @returns {Promise<string>} Character instance ID
   */
  async createFromPreset(preset, container) {
    const presets = {
      'friendly-guide': {
        type: 'casual-boy',
        options: {
          customizations: {
            skin: '#FDBCB4',
            hair: '#FFD700',
            shirt: '#87CEEB',
            pants: '#4682B4'
          },
          theme: 'light',
          size: 0.8
        }
      },
      'energetic-coach': {
        type: 'sporty-girl',
        options: {
          customizations: {
            skin: '#FDBCB4',
            hair: '#DC143C',
            shirt: '#FF69B4',
            pants: '#000080'
          },
          theme: 'vibrant',
          size: 0.9
        }
      },
      'professional-assistant': {
        type: 'formal-man',
        options: {
          customizations: {
            skin: '#FDBCB4',
            hair: '#2F4F4F',
            shirt: '#FFFFFF',
            jacket: '#1a1a1a',
            tie: '#8B0000'
          },
          theme: 'dark',
          size: 0.85
        }
      },
      'magical-companion': {
        type: 'fantasy-woman',
        options: {
          customizations: {
            skin: '#FDBCB4',
            hair: '#9370DB',
            dress: '#9370DB',
            shoes: '#FFB6C1'
          },
          theme: 'vibrant',
          size: 0.95
        }
      }
    };

    const presetConfig = presets[preset];
    if (!presetConfig) {
      throw new Error(`Preset "${preset}" not found`);
    }

    return this.createAndMount(
      presetConfig.type,
      container,
      presetConfig.options
    );
  }

  /**
   * Get available presets
   * @returns {Array} Array of preset names
   */
  getAvailablePresets() {
    return [
      'friendly-guide',
      'energetic-coach',
      'professional-assistant',
      'magical-companion'
    ];
  }

  /**
   * Create interactive character with click handlers
   * @param {string} characterType - Character type
   * @param {string|HTMLElement} container - Container element
   * @param {Object} interactions - Interaction configuration
   * @returns {Promise<string>} Character instance ID
   */
  async createInteractiveCharacter(characterType, container, interactions = {}) {
    const characterId = await this.createAndMount(characterType, container);
    const character = this.getCharacter(characterId);

    // Add click interaction
    if (interactions.onClick) {
      character.element.style.cursor = 'pointer';
      character.element.addEventListener('click', () => {
        interactions.onClick(character);
      });
    }

    // Add hover interaction
    if (interactions.onHover) {
      character.element.addEventListener('mouseenter', () => {
        interactions.onHover(character, 'enter');
      });
      character.element.addEventListener('mouseleave', () => {
        interactions.onHover(character, 'leave');
      });
    }

    // Add animation on interaction
    if (interactions.animationOnInteract) {
      const originalAnimation = character.currentAnimation;
      character.element.addEventListener('click', () => {
        character.play(interactions.animationOnInteract);
        setTimeout(() => {
          if (character.currentAnimation === interactions.animationOnInteract) {
            character.play(originalAnimation || 'idle');
          }
        }, 2000);
      });
    }

    return characterId;
  }

  /**
   * Export character configuration
   * @param {string} characterInstanceId - Character instance ID
   * @returns {Object} Configuration object
   */
  exportCharacterConfig(characterInstanceId) {
    const info = this.library.getCharacterInfo(characterInstanceId);
    if (!info) return null;

    return {
      type: info.type,
      options: info.options,
      customizations: info.customProperties,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Import character configuration
   * @param {Object} config - Configuration object
   * @param {string|HTMLElement} container - Container element
   * @returns {Promise<string>} Character instance ID
   */
  async importCharacterConfig(config, container) {
    return this.createAndMount(
      config.type,
      container,
      {
        ...config.options,
        customizations: config.customizations
      }
    );
  }
}

// Export for use in modules
export default CharacterLibraryUtils;

// Export for global use
if (typeof window !== 'undefined') {
  window.CharacterLibraryUtils = CharacterLibraryUtils;
  
  // Create global instance
  window.characterUtils = new CharacterLibraryUtils();
}