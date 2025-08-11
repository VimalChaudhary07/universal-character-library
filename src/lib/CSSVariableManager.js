/**
 * CSS Variable Manager
 * 
 * A utility class for managing CSS custom properties (variables) 
 * for character customization and theming.
 * 
 * @version 1.0.0
 * @author Character Library Team
 */

class CSSVariableManager {
  constructor() {
    this.variables = new Map();
    this.themes = new Map();
    this.observers = new Map();
    this.root = document.documentElement;
    
    this.initializeDefaultVariables();
    this.initializeDefaultThemes();
  }

  /**
   * Initialize default CSS variables
   */
  initializeDefaultVariables() {
    const defaultVariables = {
      // Skin tones
      '--cl-skin-color': '#FDBCB4',
      '--cl-skin-color-light': '#FDBCB4',
      '--cl-skin-color-medium': '#F1C27D',
      '--cl-skin-color-dark': '#C68642',
      
      // Hair colors
      '--cl-hair-color': '#8B4513',
      '--cl-hair-color-blonde': '#FFD700',
      '--cl-hair-color-brown': '#8B4513',
      '--cl-hair-color-black': '#2F4F4F',
      '--cl-hair-color-red': '#DC143C',
      '--cl-hair-color-gray': '#808080',
      
      // Clothing colors
      '--cl-clothing-color-primary': '#4169E1',
      '--cl-clothing-color-secondary': '#2F4F4F',
      '--cl-clothing-color-accent': '#FF69B4',
      '--cl-clothing-color-neutral': '#FFFFFF',
      
      // Shoe colors
      '--cl-shoes-color': '#000000',
      '--cl-shoes-color-brown': '#8B4513',
      '--cl-shoes-color-black': '#000000',
      '--cl-shoes-color-white': '#FFFFFF',
      
      // Accessory colors
      '--cl-accessory-color': '#FFD700',
      '--cl-accessory-color-gold': '#FFD700',
      '--cl-accessory-color-silver': '#C0C0C0',
      '--cl-accessory-color-bronze': '#CD7F32',
      
      // Animation
      '--cl-animation-speed': '1',
      '--cl-animation-duration': '1000ms',
      
      // Sizing
      '--cl-character-size': '1',
      
      // Effects
      '--cl-filter': 'none',
      '--cl-shadow': 'none',
      
      // State
      '--cl-state-opacity': '1'
    };

    Object.entries(defaultVariables).forEach(([variable, value]) => {
      this.variables.set(variable, value);
      this.setVariable(variable, value);
    });
  }

  /**
   * Initialize default themes
   */
  initializeDefaultThemes() {
    const themes = {
      light: {
        '--cl-skin-color': '#FDBCB4',
        '--cl-hair-color': '#FFD700',
        '--cl-clothing-color-primary': '#87CEEB',
        '--cl-clothing-color-secondary': '#4682B4',
        '--cl-shoes-color': '#696969'
      },
      dark: {
        '--cl-skin-color': '#DEB887',
        '--cl-hair-color': '#2F4F4F',
        '--cl-clothing-color-primary': '#191970',
        '--cl-clothing-color-secondary': '#000080',
        '--cl-shoes-color': '#2F2F2F'
      },
      vibrant: {
        '--cl-skin-color': '#FDBCB4',
        '--cl-hair-color': '#DC143C',
        '--cl-clothing-color-primary': '#FF1493',
        '--cl-clothing-color-secondary': '#32CD32',
        '--cl-shoes-color': '#FFD700'
      },
      winter: {
        '--cl-skin-color': '#FDBCB4',
        '--cl-hair-color': '#8B4513',
        '--cl-clothing-color-primary': '#4682B4',
        '--cl-clothing-color-secondary': '#2F4F4F',
        '--cl-shoes-color': '#8B4513'
      },
      spring: {
        '--cl-skin-color': '#FFDBAC',
        '--cl-hair-color': '#228B22',
        '--cl-clothing-color-primary': '#98FB98',
        '--cl-clothing-color-secondary': '#3CB371',
        '--cl-shoes-color': '#8FBC8F'
      },
      summer: {
        '--cl-skin-color': '#FDBCB4',
        '--cl-hair-color': '#FFD700',
        '--cl-clothing-color-primary': '#FFD700',
        '--cl-clothing-color-secondary': '#FF6347',
        '--cl-shoes-color': '#FF4500'
      },
      autumn: {
        '--cl-skin-color': '#F1C27D',
        '--cl-hair-color': '#8B4513',
        '--cl-clothing-color-primary': '#FF8C00',
        '--cl-clothing-color-secondary': '#A0522D',
        '--cl-shoes-color': '#8B4513'
      }
    };

    Object.entries(themes).forEach(([name, variables]) => {
      this.themes.set(name, variables);
    });
  }

  /**
   * Set a CSS variable value
   * @param {string} variable - The CSS variable name
   * @param {string} value - The value to set
   * @param {string} scope - Optional scope (element or selector)
   */
  setVariable(variable, value, scope = this.root) {
    const element = typeof scope === 'string' ? document.querySelector(scope) : scope;
    if (element) {
      element.style.setProperty(variable, value);
      this.variables.set(variable, value);
      this.notifyObservers(variable, value);
    }
  }

  /**
   * Get a CSS variable value
   * @param {string} variable - The CSS variable name
   * @param {string} scope - Optional scope (element or selector)
   * @returns {string} The variable value
   */
  getVariable(variable, scope = this.root) {
    const element = typeof scope === 'string' ? document.querySelector(scope) : scope;
    if (element) {
      const value = element.style.getPropertyValue(variable);
      return value || this.variables.get(variable) || '';
    }
    return '';
  }

  /**
   * Get all CSS variables
   * @returns {Map} All variables and their values
   */
  getAllVariables() {
    return new Map(this.variables);
  }

  /**
   * Set multiple CSS variables at once
   * @param {Object} variables - Object containing variable-value pairs
   * @param {string} scope - Optional scope (element or selector)
   */
  setVariables(variables, scope = this.root) {
    Object.entries(variables).forEach(([variable, value]) => {
      this.setVariable(variable, value, scope);
    });
  }

  /**
   * Apply a theme
   * @param {string} themeName - The name of the theme to apply
   * @param {string} scope - Optional scope (element or selector)
   */
  applyTheme(themeName, scope = this.root) {
    const theme = this.themes.get(themeName);
    if (theme) {
      this.setVariables(theme, scope);
      
      // Add theme class to scope
      const element = typeof scope === 'string' ? document.querySelector(scope) : scope;
      if (element) {
        // Remove existing theme classes
        element.classList.remove(...Array.from(element.classList).filter(cls => cls.startsWith('theme-')));
        // Add new theme class
        element.classList.add(`theme-${themeName}`);
      }
    }
  }

  /**
   * Get available themes
   * @returns {Array} Array of theme names
   */
  getAvailableThemes() {
    return Array.from(this.themes.keys());
  }

  /**
   * Create a custom theme
   * @param {string} themeName - The name of the custom theme
   * @param {Object} variables - Object containing variable-value pairs
   */
  createTheme(themeName, variables) {
    this.themes.set(themeName, variables);
  }

  /**
   * Remove a theme
   * @param {string} themeName - The name of the theme to remove
   */
  removeTheme(themeName) {
    this.themes.delete(themeName);
  }

  /**
   * Get theme variables
   * @param {string} themeName - The name of the theme
   * @returns {Object|null} Theme variables or null if not found
   */
  getTheme(themeName) {
    return this.themes.get(themeName) || null;
  }

  /**
   * Add an observer for variable changes
   * @param {string} variable - The CSS variable name to observe
   * @param {Function} callback - Callback function to call when variable changes
   */
  observeVariable(variable, callback) {
    if (!this.observers.has(variable)) {
      this.observers.set(variable, new Set());
    }
    this.observers.get(variable).add(callback);
  }

  /**
   * Remove an observer
   * @param {string} variable - The CSS variable name
   * @param {Function} callback - Callback function to remove
   */
  unobserveVariable(variable, callback) {
    if (this.observers.has(variable)) {
      this.observers.get(variable).delete(callback);
    }
  }

  /**
   * Notify observers of variable changes
   * @param {string} variable - The CSS variable name
   * @param {string} value - The new value
   */
  notifyObservers(variable, value) {
    if (this.observers.has(variable)) {
      this.observers.get(variable).forEach(callback => {
        try {
          callback(variable, value);
        } catch (error) {
          console.error('Error in CSS variable observer:', error);
        }
      });
    }
  }

  /**
   * Generate CSS custom properties for a character
   * @param {Object} characterConfig - Character configuration
   * @returns {Object} CSS variables object
   */
  generateCharacterVariables(characterConfig) {
    const variables = {};
    
    // Map character parts to CSS variables
    const partMappings = {
      skin: '--cl-skin-color',
      hair: '--cl-hair-color',
      shirt: '--cl-clothing-color-primary',
      pants: '--cl-clothing-color-secondary',
      shoes: '--cl-shoes-color',
      accessory: '--cl-accessory-color'
    };

    Object.entries(partMappings).forEach(([part, variable]) => {
      if (characterConfig[part]) {
        variables[variable] = characterConfig[part];
      }
    });

    // Add animation variables
    if (characterConfig.animationSpeed) {
      variables['--cl-animation-speed'] = characterConfig.animationSpeed;
    }

    // Add size variables
    if (characterConfig.size) {
      variables['--cl-character-size'] = characterConfig.size;
    }

    return variables;
  }

  /**
   * Apply character configuration
   * @param {Object} characterConfig - Character configuration
   * @param {string} scope - Optional scope (element or selector)
   */
  applyCharacterConfig(characterConfig, scope = this.root) {
    const variables = this.generateCharacterVariables(characterConfig);
    this.setVariables(variables, scope);
  }

  /**
   * Export current configuration
   * @returns {Object} Current configuration object
   */
  exportConfiguration() {
    const config = {
      variables: Object.fromEntries(this.variables),
      themes: Object.fromEntries(this.themes)
    };
    return config;
  }

  /**
   * Import configuration
   * @param {Object} config - Configuration object to import
   */
  importConfiguration(config) {
    if (config.variables) {
      this.setVariables(config.variables);
    }
    
    if (config.themes) {
      Object.entries(config.themes).forEach(([name, variables]) => {
        this.themes.set(name, variables);
      });
    }
  }

  /**
   * Reset to default values
   * @param {string} scope - Optional scope (element or selector)
   */
  reset(scope = this.root) {
    this.initializeDefaultVariables();
    
    // Remove theme classes
    const element = typeof scope === 'string' ? document.querySelector(scope) : scope;
    if (element) {
      element.classList.remove(...Array.from(element.classList).filter(cls => cls.startsWith('theme-')));
    }
  }

  /**
   * Destroy the manager and clean up
   */
  destroy() {
    this.variables.clear();
    this.themes.clear();
    this.observers.clear();
  }
}

// Export for use in modules
export default CSSVariableManager;

// Export for global use
if (typeof window !== 'undefined') {
  window.CSSVariableManager = CSSVariableManager;
}
