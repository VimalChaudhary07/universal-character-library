/**
 * Character Metadata Manager
 * 
 * A comprehensive utility for managing character metadata,
 * validation, and configuration.
 * 
 * @version 1.0.0
 * @author Character Library Team
 */

class MetaDataManager {
  constructor() {
    this.schema = null;
    this.cache = new Map();
    this.validators = new Map();
    this.initialized = false;
  }

  /**
   * Initialize the metadata manager
   */
  async initialize() {
    if (this.initialized) return;

    try {
      // Load schema
      const schemaResponse = await fetch('/src/lib/meta-json-schema.json');
      if (schemaResponse.ok) {
        this.schema = await schemaResponse.json();
      } else {
        // Fallback to embedded schema
        this.schema = this.getDefaultSchema();
      }

      // Initialize validators
      this.initializeValidators();
      
      this.initialized = true;
      console.log('MetaDataManager initialized successfully');
    } catch (error) {
      console.error('Failed to initialize MetaDataManager:', error);
      throw error;
    }
  }

  /**
   * Get default schema (fallback)
   * @returns {Object} Default JSON schema
   */
  getDefaultSchema() {
    return {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Character Metadata Schema",
      "type": "object",
      "required": ["id", "name", "type", "style", "version", "description", "parts", "animations", "variants", "accessibility", "dimensions"],
      "properties": {
        "id": { "type": "string", "pattern": "^[a-z0-9-]+$" },
        "name": { "type": "string", "minLength": 1 },
        "type": { "type": "string", "enum": ["boy", "girl", "man", "woman"] },
        "style": { "type": "string", "enum": ["casual", "formal", "sporty", "fantasy"] },
        "version": { "type": "string", "pattern": "^[0-9]+\\.[0-9]+\\.[0-9]+$" },
        "description": { "type": "string", "minLength": 10 },
        "parts": { "type": "object", "required": ["skin", "hair", "shirt", "pants", "shoes"] },
        "animations": { "type": "array", "minItems": 1 },
        "variants": { "type": "array", "minItems": 1 },
        "accessibility": { "type": "object", "required": ["label", "role", "ariaDescription"] },
        "dimensions": { "type": "object", "required": ["width", "height", "viewBox"] }
      }
    };
  }

  /**
   * Initialize validators
   */
  initializeValidators() {
    // Character ID validator
    this.validators.set('characterId', (value) => {
      return /^[a-z0-9-]+$/.test(value) && value.length >= 1 && value.length <= 50;
    });

    // Color validator
    this.validators.set('color', (value) => {
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
    });

    // CSS selector validator
    this.validators.set('cssSelector', (value) => {
      return /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(value);
    });

    // Version validator
    this.validators.set('version', (value) => {
      return /^[0-9]+\\.[0-9]+\\.[0-9]+$/.test(value);
    });

    // Animation name validator
    this.validators.set('animationName', (value) => {
      return /^[a-z0-9-]+$/.test(value) && value.length >= 1 && value.length <= 30;
    });
  }

  /**
   * Validate character metadata
   * @param {Object} metadata - Character metadata to validate
   * @returns {Object} Validation result
   */
  validateMetadata(metadata) {
    if (!this.initialized) {
      throw new Error('MetaDataManager not initialized');
    }

    const result = {
      valid: true,
      errors: [],
      warnings: []
    };

    // Basic structure validation
    if (!metadata || typeof metadata !== 'object') {
      result.valid = false;
      result.errors.push('Metadata must be an object');
      return result;
    }

    // Required fields validation
    const requiredFields = ['id', 'name', 'type', 'style', 'version', 'description', 'parts', 'animations', 'variants', 'accessibility', 'dimensions'];
    for (const field of requiredFields) {
      if (!metadata[field]) {
        result.valid = false;
        result.errors.push(`Missing required field: ${field}`);
      }
    }

    // Field-specific validation
    if (metadata.id && !this.validators.get('characterId')(metadata.id)) {
      result.valid = false;
      result.errors.push('Invalid character ID format');
    }

    if (metadata.type && !['boy', 'girl', 'man', 'woman'].includes(metadata.type)) {
      result.valid = false;
      result.errors.push('Invalid character type');
    }

    if (metadata.style && !['casual', 'formal', 'sporty', 'fantasy'].includes(metadata.style)) {
      result.valid = false;
      result.errors.push('Invalid character style');
    }

    if (metadata.version && !this.validators.get('version')(metadata.version)) {
      result.valid = false;
      result.errors.push('Invalid version format');
    }

    // Parts validation
    if (metadata.parts) {
      const requiredParts = ['skin', 'hair', 'shirt', 'pants', 'shoes'];
      for (const part of requiredParts) {
        if (!metadata.parts[part]) {
          result.valid = false;
          result.errors.push(`Missing required part: ${part}`);
        } else {
          if (!this.validators.get('color')(metadata.parts[part].color)) {
            result.valid = false;
            result.errors.push(`Invalid color format for part: ${part}`);
          }
          if (!this.validators.get('cssSelector')(metadata.parts[part].selector)) {
            result.valid = false;
            result.errors.push(`Invalid CSS selector for part: ${part}`);
          }
        }
      }
    }

    // Animations validation
    if (metadata.animations && Array.isArray(metadata.animations)) {
      metadata.animations.forEach((animation, index) => {
        if (!this.validators.get('animationName')(animation.name)) {
          result.valid = false;
          result.errors.push(`Invalid animation name at index ${index}`);
        }
        if (animation.duration < 100 || animation.duration > 10000) {
          result.valid = false;
          result.errors.push(`Invalid animation duration for: ${animation.name}`);
        }
        if (!['css', 'web-animations', 'lottie'].includes(animation.type)) {
          result.valid = false;
          result.errors.push(`Invalid animation type for: ${animation.name}`);
        }
      });
    }

    // Accessibility validation
    if (metadata.accessibility) {
      const requiredAccessibility = ['label', 'role', 'ariaDescription'];
      for (const field of requiredAccessibility) {
        if (!metadata.accessibility[field]) {
          result.valid = false;
          result.errors.push(`Missing required accessibility field: ${field}`);
        }
      }
    }

    // Dimensions validation
    if (metadata.dimensions) {
      if (metadata.dimensions.width < 50 || metadata.dimensions.width > 1000) {
        result.valid = false;
        result.errors.push('Invalid width dimension');
      }
      if (metadata.dimensions.height < 50 || metadata.dimensions.height > 1000) {
        result.valid = false;
        result.errors.push('Invalid height dimension');
      }
      if (!/^0 0 [0-9]+ [0-9]+$/.test(metadata.dimensions.viewBox)) {
        result.valid = false;
        result.errors.push('Invalid viewBox format');
      }
    }

    return result;
  }

  /**
   * Load character metadata from file
   * @param {string} filePath - Path to metadata file
   * @returns {Promise<Object>} Character metadata
   */
  async loadMetadata(filePath) {
    if (!this.initialized) {
      await this.initialize();
    }

    // Check cache first
    if (this.cache.has(filePath)) {
      return this.cache.get(filePath);
    }

    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load metadata: ${response.statusText}`);
      }

      const metadata = await response.json();
      
      // Validate metadata
      const validation = this.validateMetadata(metadata);
      if (!validation.valid) {
        throw new Error(`Invalid metadata: ${validation.errors.join(', ')}`);
      }

      // Cache the result
      this.cache.set(filePath, metadata);
      
      return metadata;
    } catch (error) {
      console.error('Failed to load metadata:', error);
      throw error;
    }
  }

  /**
   * Save character metadata to file
   * @param {string} filePath - Path to save metadata
   * @param {Object} metadata - Character metadata to save
   * @returns {Promise<void>}
   */
  async saveMetadata(filePath, metadata) {
    if (!this.initialized) {
      await this.initialize();
    }

    // Validate metadata before saving
    const validation = this.validateMetadata(metadata);
    if (!validation.valid) {
      throw new Error(`Cannot save invalid metadata: ${validation.errors.join(', ')}`);
    }

    try {
      // Add timestamps
      const enrichedMetadata = {
        ...metadata,
        updated: new Date().toISOString(),
        created: metadata.created || new Date().toISOString()
      };

      // In a real implementation, this would save to a file
      // For now, we'll just update the cache
      this.cache.set(filePath, enrichedMetadata);
      
      console.log(`Metadata saved to: ${filePath}`);
    } catch (error) {
      console.error('Failed to save metadata:', error);
      throw error;
    }
  }

  /**
   * Get all available characters
   * @returns {Promise<Array>} Array of character metadata
   */
  async getAllCharacters() {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // In a real implementation, this would scan the characters directory
      // For now, we'll return cached characters
      const characters = [];
      
      // Scan character directories
      const characterTypes = ['boy', 'girl', 'man', 'woman'];
      
      for (const type of characterTypes) {
        try {
          const response = await fetch(`/src/characters/${type}`);
          if (response.ok) {
            // This is a simplified approach - in real implementation, 
            // you'd scan the directory structure
            characters.push({
              type,
              path: `/src/characters/${type}`,
              loaded: false
            });
          }
        } catch (error) {
          console.warn(`Failed to load character type ${type}:`, error);
        }
      }

      return characters;
    } catch (error) {
      console.error('Failed to get all characters:', error);
      throw error;
    }
  }

  /**
   * Search characters by criteria
   * @param {Object} criteria - Search criteria
   * @returns {Promise<Array>} Array of matching characters
   */
  async searchCharacters(criteria = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const allCharacters = await this.getAllCharacters();
      const results = [];

      for (const character of allCharacters) {
        if (character.loaded && character.metadata) {
          const metadata = character.metadata;
          let matches = true;

          // Search by type
          if (criteria.type && metadata.type !== criteria.type) {
            matches = false;
          }

          // Search by style
          if (criteria.style && metadata.style !== criteria.style) {
            matches = false;
          }

          // Search by tags
          if (criteria.tags && criteria.tags.length > 0) {
            const hasMatchingTag = criteria.tags.some(tag => 
              metadata.tags && metadata.tags.includes(tag)
            );
            if (!hasMatchingTag) {
              matches = false;
            }
          }

          // Search by name
          if (criteria.name && !metadata.name.toLowerCase().includes(criteria.name.toLowerCase())) {
            matches = false;
          }

          // Search by description
          if (criteria.description && !metadata.description.toLowerCase().includes(criteria.description.toLowerCase())) {
            matches = false;
          }

          if (matches) {
            results.push({
              ...character,
              score: this.calculateSearchScore(metadata, criteria)
            });
          }
        }
      }

      // Sort by score (descending)
      return results.sort((a, b) => b.score - a.score);
    } catch (error) {
      console.error('Failed to search characters:', error);
      throw error;
    }
  }

  /**
   * Calculate search score for relevance
   * @param {Object} metadata - Character metadata
   * @param {Object} criteria - Search criteria
   * @returns {number} Relevance score
   */
  calculateSearchScore(metadata, criteria) {
    let score = 0;

    // Exact type match
    if (criteria.type && metadata.type === criteria.type) {
      score += 10;
    }

    // Exact style match
    if (criteria.style && metadata.style === criteria.style) {
      score += 10;
    }

    // Tag matches
    if (criteria.tags && criteria.tags.length > 0) {
      const tagMatches = criteria.tags.filter(tag => 
        metadata.tags && metadata.tags.includes(tag)
      ).length;
      score += tagMatches * 5;
    }

    // Name match
    if (criteria.name && metadata.name.toLowerCase().includes(criteria.name.toLowerCase())) {
      score += 3;
    }

    // Description match
    if (criteria.description && metadata.description.toLowerCase().includes(criteria.description.toLowerCase())) {
      score += 2;
    }

    return score;
  }

  /**
   * Get character statistics
   * @returns {Promise<Object>} Statistics about characters
   */
  async getStatistics() {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const allCharacters = await this.getAllCharacters();
      const stats = {
        total: 0,
        byType: {},
        byStyle: {},
        byStatus: {
          available: 0,
          comingSoon: 0
        },
        averageAnimations: 0,
        totalAnimations: 0
      };

      for (const character of allCharacters) {
        if (character.loaded && character.metadata) {
          const metadata = character.metadata;
          stats.total++;

          // Count by type
          stats.byType[metadata.type] = (stats.byType[metadata.type] || 0) + 1;

          // Count by style
          stats.byStyle[metadata.style] = (stats.byStyle[metadata.style] || 0) + 1;

          // Count by status (assuming isAvailable field exists)
          if (metadata.isAvailable !== false) {
            stats.byStatus.available++;
          } else {
            stats.byStatus.comingSoon++;
          }

          // Animation statistics
          if (metadata.animations && metadata.animations.length > 0) {
            stats.totalAnimations += metadata.animations.length;
          }
        }
      }

      // Calculate average animations
      stats.averageAnimations = stats.total > 0 ? stats.totalAnimations / stats.total : 0;

      return stats;
    } catch (error) {
      console.error('Failed to get statistics:', error);
      throw error;
    }
  }

  /**
   * Generate character metadata template
   * @param {Object} options - Template options
   * @returns {Object} Metadata template
   */
  generateTemplate(options = {}) {
    const template = {
      id: options.id || 'character-name',
      name: options.name || 'Character Name',
      type: options.type || 'boy',
      style: options.style || 'casual',
      version: options.version || '1.0.0',
      description: options.description || 'A brief description of the character.',
      tags: options.tags || ['tag1', 'tag2'],
      parts: {
        skin: {
          color: options.skinColor || '#FDBCB4',
          selector: '.skin-color',
          description: 'Skin tone color'
        },
        hair: {
          color: options.hairColor || '#8B4513',
          selector: '.hair-color',
          description: 'Hair color'
        },
        shirt: {
          color: options.shirtColor || '#4169E1',
          selector: '.shirt-color',
          description: 'Shirt color'
        },
        pants: {
          color: options.pantsColor || '#2F4F4F',
          selector: '.pants-color',
          description: 'Pants color'
        },
        shoes: {
          color: options.shoesColor || '#000000',
          selector: '.shoes-color',
          description: 'Shoes color'
        }
      },
      animations: [
        {
          name: 'idle',
          duration: 2000,
          type: 'css',
          loop: true,
          file: 'animations.css',
          description: 'Idle animation'
        }
      ],
      variants: [
        {
          name: 'default',
          file: 'svg/base.svg',
          description: 'Default variant'
        }
      ],
      accessibility: {
        label: options.label || 'Character label',
        role: 'img',
        ariaDescription: options.ariaDescription || 'A detailed description of the character'
      },
      dimensions: {
        width: options.width || 200,
        height: options.height || 300,
        viewBox: options.viewBox || '0 0 200 300'
      },
      author: options.author || 'Character Library Team',
      license: options.license || 'MIT',
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };

    return template;
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    console.log('Metadata cache cleared');
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Export the class
export default MetaDataManager;

// Export singleton instance
export const metaDataManager = new MetaDataManager();
