/**
 * Character Library - Main Entry Point
 * A collection of customizable, animated 2D characters for web projects
 */

import Character from './Character';

// Main library export
const CharacterLibrary = {
  Character,
  
  // Version
  version: '1.0.0',
  
  // Utility functions
  getAvailableCharacters: Character.getAvailableCharacters,
  getCharacterInfo: Character.getCharacterInfo,
  getAvailableAnimations: Character.getAvailableAnimations,
  
  // Factory function for creating characters
  createCharacter(options) {
    return new Character(options);
  },
  
  // Mount character to container
  mountCharacter(container, options) {
    const character = new Character({ ...options, container });
    return character;
  }
};

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  // CommonJS
  module.exports = CharacterLibrary;
} else if (typeof define === 'function' && define.amd) {
  // AMD
  define([], () => CharacterLibrary);
} else {
  // Browser global
  window.CharacterLibrary = CharacterLibrary;
}

// ES Module export
export default CharacterLibrary;
export { Character };
