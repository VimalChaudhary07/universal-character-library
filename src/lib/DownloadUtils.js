/**
 * Download Utilities for Character Library
 * 
 * Provides functionality to download individual characters, character sets,
 * and the full library with various packaging options.
 * 
 * @version 1.0.0
 * @author Character Library Team
 */

class DownloadUtils {
  constructor() {
    this.downloadQueue = new Map();
    this.activeDownloads = new Set();
    this.downloadHistory = [];
    this.maxConcurrentDownloads = 3;
  }

  /**
   * Download individual character with all assets
   * @param {string} characterId - Character identifier
   * @param {Object} options - Download options
   * @returns {Promise<Object>} Download result
   */
  async downloadCharacter(characterId, options = {}) {
    const {
      format = 'zip',
      includeAnimations = true,
      includeCustomizations = true,
      includeDocumentation = true,
      quality = 'high',
      onProgress = null,
      onComplete = null,
      onError = null
    } = options;

    try {
      // Check if already downloading
      if (this.activeDownloads.has(characterId)) {
        throw new Error(`Character ${characterId} is already being downloaded`);
      }

      this.activeDownloads.add(characterId);

      // Get character metadata
      const metadata = await this.loadCharacterMetadata(characterId);
      if (!metadata) {
        throw new Error(`Character ${characterId} not found`);
      }

      // Create download package
      const downloadPackage = {
        id: characterId,
        name: metadata.name,
        type: 'character',
        format,
        options,
        timestamp: new Date().toISOString(),
        files: []
      };

      // Load character assets
      const assets = await this.loadCharacterAssets(characterId, metadata, {
        includeAnimations,
        includeCustomizations,
        quality
      });

      downloadPackage.files = assets.files;

      // Add documentation if requested
      if (includeDocumentation) {
        const docs = await this.generateCharacterDocumentation(metadata, assets);
        downloadPackage.files.push(...docs);
      }

      // Generate package based on format
      let packageData;
      switch (format) {
        case 'zip':
          packageData = await this.createZipPackage(downloadPackage);
          break;
        case 'tar':
          packageData = await this.createTarPackage(downloadPackage);
          break;
        case 'json':
          packageData = await this.createJsonPackage(downloadPackage);
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      // Trigger download
      const filename = this.generateFilename(characterId, metadata.name, format);
      await this.triggerDownload(packageData, filename, onProgress);

      // Add to history
      this.addToHistory(downloadPackage);

      // Cleanup
      this.activeDownloads.delete(characterId);

      if (onComplete) {
        onComplete({
          success: true,
          characterId,
          filename,
          size: packageData.size,
          fileCount: downloadPackage.files.length
        });
      }

      return {
        success: true,
        filename,
        size: packageData.size,
        fileCount: downloadPackage.files.length
      };

    } catch (error) {
      this.activeDownloads.delete(characterId);
      
      if (onError) {
        onError({
          success: false,
          characterId,
          error: error.message
        });
      }
      
      throw error;
    }
  }

  /**
   * Download multiple characters as a collection
   * @param {Array} characterIds - Array of character identifiers
   * @param {Object} options - Download options
   * @returns {Promise<Object>} Download result
   */
  async downloadCharacterCollection(characterIds, options = {}) {
    const {
      format = 'zip',
      includeAnimations = true,
      includeCustomizations = true,
      includeDocumentation = true,
      quality = 'high',
      onProgress = null,
      onComplete = null,
      onError = null
    } = options;

    try {
      const results = [];
      let totalSize = 0;
      let totalFiles = 0;

      // Process characters with concurrency limit
      const chunks = this.chunkArray(characterIds, this.maxConcurrentDownloads);
      
      for (const chunk of chunks) {
        const chunkPromises = chunk.map(async (characterId) => {
          try {
            const result = await this.downloadCharacter(characterId, {
              format: 'json', // Use JSON for intermediate processing
              includeAnimations,
              includeCustomizations,
              includeDocumentation: false, // Will add collection docs later
              quality,
              onProgress: (progress) => {
                if (onProgress) {
                  onProgress({
                    type: 'character',
                    characterId,
                    progress
                  });
                }
              }
            });

            results.push(result);
            totalSize += result.size;
            totalFiles += result.fileCount;

          } catch (error) {
            if (onError) {
              onError({
                type: 'character',
                characterId,
                error: error.message
              });
            }
          }
        });

        await Promise.all(chunkPromises);
      }

      // Create collection package
      const collectionPackage = {
        id: 'collection',
        name: 'Character Collection',
        type: 'collection',
        format,
        characters: results.filter(r => r.success),
        timestamp: new Date().toISOString(),
        files: []
      };

      // Add collection documentation
      if (includeDocumentation) {
        const docs = await this.generateCollectionDocumentation(collectionPackage);
        collectionPackage.files.push(...docs);
      }

      // Generate final package
      let packageData;
      switch (format) {
        case 'zip':
          packageData = await this.createZipPackage(collectionPackage);
          break;
        case 'tar':
          packageData = await this.createTarPackage(collectionPackage);
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      const filename = `character-collection-${Date.now()}.${format}`;
      await this.triggerDownload(packageData, filename, onProgress);

      // Add to history
      this.addToHistory(collectionPackage);

      if (onComplete) {
        onComplete({
          success: true,
          type: 'collection',
          filename,
          size: packageData.size,
          fileCount: totalFiles,
          characterCount: results.filter(r => r.success).length
        });
      }

      return {
        success: true,
        filename,
        size: packageData.size,
        fileCount: totalFiles,
        characterCount: results.filter(r => r.success).length
      };

    } catch (error) {
      if (onError) {
        onError({
          success: false,
          type: 'collection',
          error: error.message
        });
      }
      
      throw error;
    }
  }

  /**
   * Download full character library
   * @param {Object} options - Download options
   * @returns {Promise<Object>} Download result
   */
  async downloadFullLibrary(options = {}) {
    const {
      format = 'zip',
      includeSource = false,
      includeExamples = true,
      includeDocumentation = true,
      quality = 'high',
      onProgress = null,
      onComplete = null,
      onError = null
    } = options;

    try {
      // Get all available characters
      const allCharacters = await this.getAllAvailableCharacters();
      const characterIds = allCharacters.map(char => char.id);

      // Download all characters
      const characterResults = await this.downloadCharacterCollection(characterIds, {
        format: 'json',
        includeAnimations: true,
        includeCustomizations: true,
        includeDocumentation: false,
        quality,
        onProgress: (progress) => {
          if (onProgress) {
            onProgress({
              type: 'characters',
              progress: progress.progress / 2 // 50% for characters
            });
          }
        }
      });

      // Create full library package
      const libraryPackage = {
        id: 'full-library',
        name: 'Character Library Full Package',
        type: 'library',
        version: '1.0.0',
        format,
        characters: characterResults.characters,
        timestamp: new Date().toISOString(),
        files: []
      };

      // Add source code if requested
      if (includeSource) {
        const sourceFiles = await this.getSourceFiles();
        libraryPackage.files.push(...sourceFiles);
      }

      // Add examples if requested
      if (includeExamples) {
        const exampleFiles = await this.getExampleFiles();
        libraryPackage.files.push(...exampleFiles);
      }

      // Add documentation
      if (includeDocumentation) {
        const docs = await this.generateLibraryDocumentation(libraryPackage);
        libraryPackage.files.push(...docs);
      }

      // Generate final package
      let packageData;
      switch (format) {
        case 'zip':
          packageData = await this.createZipPackage(libraryPackage);
          break;
        case 'tar':
          packageData = await this.createTarPackage(libraryPackage);
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      const filename = `character-library-full-${this.getVersion()}.${format}`;
      await this.triggerDownload(packageData, filename, (progress) => {
        if (onProgress) {
          onProgress({
            type: 'library',
            progress: 50 + (progress.progress / 2) // 50-100% for packaging
          });
        }
      });

      // Add to history
      this.addToHistory(libraryPackage);

      if (onComplete) {
        onComplete({
          success: true,
          type: 'library',
          filename,
          size: packageData.size,
          fileCount: libraryPackage.files.length,
          characterCount: characterResults.characterCount
        });
      }

      return {
        success: true,
        filename,
        size: packageData.size,
        fileCount: libraryPackage.files.length,
        characterCount: characterResults.characterCount
      };

    } catch (error) {
      if (onError) {
        onError({
          success: false,
          type: 'library',
          error: error.message
        });
      }
      
      throw error;
    }
  }

  /**
   * Load character metadata
   * @param {string} characterId - Character identifier
   * @returns {Promise<Object>} Character metadata
   */
  async loadCharacterMetadata(characterId) {
    // In a real implementation, this would fetch from the server
    const metadataMap = {
      'casual-boy': {
        id: 'casual-boy',
        name: 'Casual Boy',
        type: 'boy',
        style: 'casual',
        version: '1.0.0',
        description: 'A friendly young boy in casual clothing'
      },
      'sporty-girl': {
        id: 'sporty-girl',
        name: 'Sporty Girl',
        type: 'girl',
        style: 'sporty',
        version: '1.0.0',
        description: 'An energetic girl in athletic attire'
      },
      'formal-man': {
        id: 'formal-man',
        name: 'Formal Man',
        type: 'man',
        style: 'formal',
        version: '1.0.0',
        description: 'A professional man in business attire'
      },
      'fantasy-woman': {
        id: 'fantasy-woman',
        name: 'Fantasy Woman',
        type: 'woman',
        style: 'fantasy',
        version: '1.0.0',
        description: 'A mystical woman in magical clothing'
      }
    };

    return metadataMap[characterId] || null;
  }

  /**
   * Load character assets
   * @param {string} characterId - Character identifier
   * @param {Object} metadata - Character metadata
   * @param {Object} options - Asset loading options
   * @returns {Promise<Object>} Character assets
   */
  async loadCharacterAssets(characterId, metadata, options = {}) {
    const {
      includeAnimations = true,
      includeCustomizations = true,
      quality = 'high'
    } = options;

    const files = [];

    // Add SVG file
    const svgContent = await this.generateCharacterSVG(characterId, metadata, quality);
    files.push({
      name: `${characterId}.svg`,
      content: svgContent,
      type: 'svg',
      size: svgContent.length
    });

    // Add CSS file
    const cssContent = await this.generateCharacterCSS(characterId, metadata);
    files.push({
      name: `${characterId}.css`,
      content: cssContent,
      type: 'css',
      size: cssContent.length
    });

    // Add animations CSS if requested
    if (includeAnimations) {
      const animationsContent = await this.generateCharacterAnimations(characterId, metadata);
      files.push({
        name: `${characterId}-animations.css`,
        content: animationsContent,
        type: 'css',
        size: animationsContent.length
      });
    }

    // Add customization CSS if requested
    if (includeCustomizations) {
      const customContent = await this.generateCharacterCustomization(characterId, metadata);
      files.push({
        name: `${characterId}-custom.css`,
        content: customContent,
        type: 'css',
        size: customContent.length
      });
    }

    // Add metadata JSON
    const metadataContent = JSON.stringify(metadata, null, 2);
    files.push({
      name: `${characterId}.json`,
      content: metadataContent,
      type: 'json',
      size: metadataContent.length
    });

    return {
      files,
      totalSize: files.reduce((sum, file) => sum + file.size, 0)
    };
  }

  /**
   * Generate character SVG content
   * @param {string} characterId - Character identifier
   * @param {Object} metadata - Character metadata
   * @param {string} quality - Quality level
   * @returns {Promise<string>} SVG content
   */
  async generateCharacterSVG(characterId, metadata, quality = 'high') {
    // In a real implementation, this would load actual SVG files
    const svgTemplates = {
      'casual-boy': `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
        <g class="character-boy-casual">
          <!-- Head -->
          <circle cx="100" cy="60" r="35" class="skin" fill="#FDBCB4"/>
          <circle cx="85" cy="55" r="3" class="eye" fill="#000"/>
          <circle cx="115" cy="55" r="3" class="eye" fill="#000"/>
          <path d="M 90 70 Q 100 75, 110 70" stroke="#000" stroke-width="2" fill="none"/>
          
          <!-- Body -->
          <rect x="75" y="90" width="50" height="60" rx="5" class="shirt" fill="#4169E1"/>
          <rect x="80" y="145" width="18" height="50" rx="9" class="pants" fill="#2F4F4F"/>
          <rect x="102" y="145" width="18" height="50" rx="9" class="pants" fill="#2F4F4F"/>
          
          <!-- Arms and legs -->
          <rect x="60" y="95" width="15" height="40" rx="7" class="shirt" fill="#4169E1"/>
          <rect x="125" y="95" width="15" height="40" rx="7" class="shirt" fill="#4169E1"/>
          <ellipse cx="89" cy="200" rx="12" ry="8" class="shoes" fill="#000000"/>
          <ellipse cx="111" cy="200" rx="12" ry="8" class="shoes" fill="#000000"/>
        </g>
      </svg>`,
      'sporty-girl': `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
        <g class="character-girl-sporty">
          <!-- Head -->
          <circle cx="100" cy="60" r="35" class="skin" fill="#FDBCB4"/>
          <circle cx="85" cy="55" r="3" class="eye" fill="#000"/>
          <circle cx="115" cy="55" r="3" class="eye" fill="#000"/>
          <path d="M 90 70 Q 100 75, 110 70" stroke="#000" stroke-width="2" fill="none"/>
          
          <!-- Body -->
          <rect x="75" y="90" width="50" height="60" rx="5" class="shirt" fill="#FF69B4"/>
          <rect x="80" y="145" width="18" height="30" rx="9" class="pants" fill="#000080"/>
          <rect x="102" y="145" width="18" height="30" rx="9" class="pants" fill="#000080"/>
          
          <!-- Arms and legs -->
          <rect x="60" y="95" width="15" height="40" rx="7" class="shirt" fill="#FF69B4"/>
          <rect x="125" y="95" width="15" height="40" rx="7" class="shirt" fill="#FF69B4"/>
          <ellipse cx="89" cy="180" rx="12" ry="8" class="shoes" fill="#FFFFFF"/>
          <ellipse cx="111" cy="180" rx="12" ry="8" class="shoes" fill="#FFFFFF"/>
        </g>
      </svg>`,
      'formal-man': `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
        <g class="character-man-formal">
          <!-- Head -->
          <circle cx="100" cy="60" r="35" class="skin" fill="#FDBCB4"/>
          <circle cx="85" cy="55" r="3" class="eye" fill="#000"/>
          <circle cx="115" cy="55" r="3" class="eye" fill="#000"/>
          <path d="M 90 70 Q 100 75, 110 70" stroke="#000" stroke-width="2" fill="none"/>
          
          <!-- Body -->
          <rect x="75" y="90" width="50" height="60" rx="5" class="jacket" fill="#1a1a1a"/>
          <rect x="78" y="95" width="44" height="50" rx="3" class="shirt" fill="#FFFFFF"/>
          <rect x="80" y="145" width="18" height="50" rx="9" class="pants" fill="#1a1a1a"/>
          <rect x="102" y="145" width="18" height="50" rx="9" class="pants" fill="#1a1a1a"/>
          
          <!-- Tie -->
          <rect x="95" y="95" width="10" height="40" class="tie" fill="#8B0000"/>
          
          <!-- Arms and legs -->
          <rect x="60" y="95" width="15" height="40" rx="7" class="jacket" fill="#1a1a1a"/>
          <rect x="125" y="95" width="15" height="40" rx="7" class="jacket" fill="#1a1a1a"/>
          <ellipse cx="89" cy="200" rx="12" ry="8" class="shoes" fill="#000000"/>
          <ellipse cx="111" cy="200" rx="12" ry="8" class="shoes" fill="#000000"/>
        </g>
      </svg>`,
      'fantasy-woman': `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
        <g class="character-woman-fantasy">
          <!-- Head -->
          <circle cx="100" cy="60" r="35" class="skin" fill="#FDBCB4"/>
          <circle cx="85" cy="55" r="3" class="eye" fill="#000"/>
          <circle cx="115" cy="55" r="3" class="eye" fill="#000"/>
          <path d="M 90 70 Q 100 75, 110 70" stroke="#000" stroke-width="2" fill="none"/>
          
          <!-- Tiara -->
          <path d="M 70 45 Q 100 35, 130 45" stroke="#FFD700" stroke-width="3" fill="none"/>
          <circle cx="100" cy="40" r="5" class="gem" fill="#FF1493"/>
          
          <!-- Body -->
          <path d="M 75 90 Q 100 85, 125 90 L 120 150 Q 100 160, 80 150 Z" class="dress" fill="#9370DB"/>
          <rect x="85" y="150" width="15" height="40" rx="7" class="dress" fill="#9370DB"/>
          <rect x="100" y="150" width="15" height="40" rx="7" class="dress" fill="#9370DB"/>
          
          <!-- Arms -->
          <ellipse cx="65" cy="110" rx="8" ry="25" class="skin" fill="#FDBCB4"/>
          <ellipse cx="135" cy="110" rx="8" ry="25" class="skin" fill="#FDBCB4"/>
          
          <!-- Legs -->
          <ellipse cx="92" cy="195" rx="10" ry="8" class="shoes" fill="#FFB6C1"/>
          <ellipse cx="108" cy="195" rx="10" ry="8" class="shoes" fill="#FFB6C1"/>
        </g>
      </svg>`
    };

    return svgTemplates[characterId] || '';
  }

  /**
   * Generate character CSS content
   * @param {string} characterId - Character identifier
   * @param {Object} metadata - Character metadata
   * @returns {Promise<string>} CSS content
   */
  async generateCharacterCSS(characterId, metadata) {
    return `/* ${metadata.name} - Character Styles */
.character-${characterId} {
  width: 200px;
  height: 300px;
  display: inline-block;
  vertical-align: middle;
}

.character-${characterId} svg {
  width: 100%;
  height: 100%;
}

/* CSS Variables for customization */
.character-${characterId} {
  --skin-color: #FDBCB4;
  --hair-color: #8B4513;
  --shirt-color: #4169E1;
  --pants-color: #2F4F4F;
  --shoes-color: #000000;
}

.character-${characterId} .skin {
  fill: var(--skin-color);
}

.character-${characterId} .hair {
  fill: var(--hair-color);
}

.character-${characterId} .shirt {
  fill: var(--shirt-color);
}

.character-${characterId} .pants {
  fill: var(--pants-color);
}

.character-${characterId} .shoes {
  fill: var(--shoes-color);
}

/* Responsive design */
@media (max-width: 768px) {
  .character-${characterId} {
    transform: scale(0.8);
  }
}

@media (max-width: 480px) {
  .character-${characterId} {
    transform: scale(0.6);
  }
}`;
  }

  /**
   * Generate character animations CSS
   * @param {string} characterId - Character identifier
   * @param {Object} metadata - Character metadata
   * @returns {Promise<string>} CSS content
   */
  async generateCharacterAnimations(characterId, metadata) {
    return `/* ${metadata.name} - Animations */
@keyframes ${characterId}-idle {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-2px) scale(1.01); }
}

@keyframes ${characterId}-blink {
  0%, 90%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}

@keyframes ${characterId}-breathing {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.02); }
}

.character-${characterId}.anim-idle {
  animation: ${characterId}-idle 2s ease-in-out infinite;
}

.character-${characterId}.anim-blink .eye {
  animation: ${characterId}-blink 3s ease-in-out infinite;
  transform-origin: center;
}

.character-${characterId}.anim-breathing .torso {
  animation: ${characterId}-breathing 4s ease-in-out infinite;
  transform-origin: center;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .character-${characterId}.anim-idle,
  .character-${characterId}.anim-blink,
  .character-${characterId}.anim-breathing {
    animation: none;
  }
}`;
  }

  /**
   * Generate character customization CSS
   * @param {string} characterId - Character identifier
   * @param {Object} metadata - Character metadata
   * @returns {Promise<string>} CSS content
   */
  async generateCharacterCustomization(characterId, metadata) {
    return `/* ${metadata.name} - Customization Styles */
.character-${characterId} {
  /* Size controls */
  --character-size: 1;
  transform: scale(var(--character-size));
  transform-origin: center;
}

/* Animation speed controls */
.character-${characterId} {
  --animation-speed: 1;
}

.character-${characterId}.anim-idle {
  animation-duration: calc(2s / var(--animation-speed));
}

.character-${characterId}.anim-blink .eye {
  animation-duration: calc(3s / var(--animation-speed));
}

.character-${characterId}.anim-breathing .torso {
  animation-duration: calc(4s / var(--animation-speed));
}

/* Theme support */
.character-${characterId}.theme-light {
  filter: brightness(1.1);
}

.character-${characterId}.theme-dark {
  filter: brightness(0.9);
}

.character-${characterId}.theme-vibrant {
  filter: saturate(1.5) brightness(1.1);
}

/* Effects */
.character-${characterId}.effect-grayscale {
  filter: grayscale(100%);
}

.character-${characterId}.effect-sepia {
  filter: sepia(100%);
}

.character-${characterId}.effect-blur {
  filter: blur(2px);
}

/* Accessibility */
.character-${characterId}:focus {
  outline: 3px solid #007bff;
  outline-offset: 2px;
}

.character-${characterId}:focus:not(:focus-visible) {
  outline: none;
}

@media (prefers-contrast: high) {
  .character-${characterId} {
    border: 2px solid currentColor;
  }
}`;
  }

  /**
   * Generate character documentation
   * @param {Object} metadata - Character metadata
   * @param {Object} assets - Character assets
   * @returns {Promise<Array>} Documentation files
   */
  async generateCharacterDocumentation(metadata, assets) {
    const readmeContent = `# ${metadata.name}

${metadata.description}

## Files Included
${assets.files.map(file => `- ${file.name} (${this.formatFileSize(file.size)})`).join('\n')}

## Usage

### HTML
\`\`\`html
<div class="character-${metadata.id}">
  <svg>
    <!-- SVG content -->
  </svg>
</div>
\`\`\`

### CSS
\`\`\`css
.character-${metadata.id} {
  --skin-color: #FDBCB4;
  --hair-color: #8B4513;
  --shirt-color: #4169E1;
  --pants-color: #2F4F4F;
  --shoes-color: #000000;
}
\`\`\`

### JavaScript
\`\`\`javascript
// Add animation classes
const character = document.querySelector('.character-${metadata.id}');
character.classList.add('anim-idle');
\`\`\`

## Customization

### Colors
Use CSS variables to customize colors:

\`\`\`css
.character-${metadata.id} {
  --skin-color: #your-skin-color;
  --hair-color: #your-hair-color;
  --shirt-color: #your-shirt-color;
  --pants-color: #your-pants-color;
  --shoes-color: #your-shoes-color;
}
\`\`\`

### Size
\`\`\`css
.character-${metadata.id} {
  --character-size: 1.5; /* 150% size */
}
\`\`\`

### Animations
Available animation classes:
- \`anim-idle\` - Gentle breathing animation
- \`anim-blink\` - Eye blinking
- \`anim-breathing\` - Breathing movement

## Accessibility

This character includes:
- ARIA labels for screen readers
- Keyboard navigation support
- Reduced motion preferences
- High contrast mode support

## License

This character is part of the Character Library and is released under the MIT License.

---

Generated on ${new Date().toISOString()}`;

    return [{
      name: 'README.md',
      content: readmeContent,
      type: 'markdown',
      size: readmeContent.length
    }];
  }

  /**
   * Generate collection documentation
   * @param {Object} collection - Collection data
   * @returns {Promise<Array>} Documentation files
   */
  async generateCollectionDocumentation(collection) {
    const readmeContent = `# Character Collection

This collection contains ${collection.characters.length} characters:

${collection.characters.map(char => `- ${char.name}`).join('\n')}

## Characters Included

${collection.characters.map(char => `
### ${char.name}
- **ID**: ${char.id}
- **Files**: ${char.fileCount}
- **Size**: ${this.formatFileSize(char.size)}
`).join('')}

## Usage

Each character can be used independently. Refer to individual character README files for specific usage instructions.

## Installation

1. Extract the ZIP file to your project directory
2. Include the CSS files in your HTML:
   \`\`\`html
   <link rel="stylesheet" href="path/to/character.css">
   <link rel="stylesheet" href="path/to/character-animations.css">
   \`\`\`

3. Add the character HTML to your page
4. Customize using CSS variables

## Common Customization

### Theme Colors
\`\`\`css
:root {
  --skin-color: #FDBCB4;
  --hair-color: #8B4513;
  --shirt-color: #4169E1;
  --pants-color: #2F4F4F;
  --shoes-color: #000000;
}
\`\`\`

### Animation Speed
\`\`\`css
.character {
  --animation-speed: 1.5; /* 1.5x speed */
}
\`\`\`

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This collection is part of the Character Library and is released under the MIT License.

---

Generated on ${new Date().toISOString()}`;

    return [{
      name: 'README.md',
      content: readmeContent,
      type: 'markdown',
      size: readmeContent.length
    }];
  }

  /**
   * Generate library documentation
   * @param {Object} library - Library data
   * @returns {Promise<Array>} Documentation files
   */
  async generateLibraryDocumentation(library) {
    const readmeContent = `# Character Library - Full Package

Complete character library with ${library.characters.length} characters and full source code.

## What's Included

### Characters
${library.characters.map(char => `- ${char.name} (${char.id})`).join('\n')}

### Source Code
- Complete JavaScript API
- CSS animations and styles
- SVG assets
- Documentation
- Examples

### Examples
- HTML/CSS/JS examples
- React integration examples
- Vue integration examples

## Installation

1. Extract the ZIP file to your project directory
2. Include the main CSS file:
   \`\`\`html
   <link rel="stylesheet" href="dist/css/character-library.css">
   \`\`\`

3. Include the main JavaScript file:
   \`\`\`html
   <script src="dist/js/character-library.js"></script>
   \`\`\`

## Quick Start

\`\`\`html
<div id="my-character"></div>

<script>
  const character = new CharacterLibrary.Character({
    id: 'casual-boy',
    container: '#my-character',
    colors: {
      skin: '#FDBCB4',
      hair: '#8B4513',
      shirt: '#4169E1',
      pants: '#2F4F4F',
      shoes: '#000000'
    }
  });
  
  character.play('idle');
</script>
\`\`\`

## API Reference

### CharacterLibrary.Character
Main class for creating and managing characters.

#### Constructor
\`\`\`javascript
new CharacterLibrary.Character(options)
\`\`\`

#### Options
- \`id\` (string): Character ID
- \`container\` (string|HTMLElement): Container element or selector
- \`colors\` (object): Color customization
- \`size\` (number): Character size (default: 1)
- \`theme\` (string): Theme name

#### Methods
- \`play(animationName)\`: Play an animation
- \`pause()\`: Pause current animation
- \`stop()\`: Stop all animations
- \`setColors(colors)\`: Update colors
- \`setSize(size)\`: Update size
- \`destroy()\`: Clean up character

### CharacterLibrary.Utils
Utility functions for common operations.

#### Methods
- \`createAndMount(characterId, container, options)\`: Create and mount character
- \`createScene(sceneId, characters, options)\`: Create character scene
- \`createFromPreset(preset, container)\`: Create from preset

## Characters

### Casual Boy
Friendly young boy in casual clothing.
- Animations: idle, walk, wave, jump, blink, breathing
- Customizable parts: skin, hair, shirt, pants, shoes

### Sporty Girl
Energetic girl in athletic attire.
- Animations: idle, walk, jump, dance, blink, breathing
- Customizable parts: skin, hair, shirt, pants, shoes, accessories

### Formal Man
Professional man in business attire.
- Animations: idle, walk, wave, blink, breathing
- Customizable parts: skin, hair, shirt, jacket, tie, pants, shoes

### Fantasy Woman
Mystical woman in magical clothing.
- Animations: idle, walk, dance, magic, blink, breathing
- Customizable parts: skin, hair, dress, shoes, accessories

## Customization

### CSS Variables
\`\`\`css
:root {
  --cl-skin-color: #FDBCB4;
  --cl-hair-color: #8B4513;
  --cl-shirt-color: #4169E1;
  --cl-pants-color: #2F4F4F;
  --cl-shoes-color: #000000;
  --cl-animation-speed: 1;
  --cl-character-size: 1;
}
\`\`\`

### Themes
- light
- dark
- vibrant
- winter
- spring
- summer
- autumn

### Animation Types
- CSS animations
- Web Animations API
- Lottie animations

## Accessibility

- Full ARIA label support
- Keyboard navigation
- Screen reader compatibility
- Reduced motion preferences
- High contrast mode

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions, please visit our GitHub repository.

---

Generated on ${new Date().toISOString()}`;

    return [{
      name: 'README.md',
      content: readmeContent,
      type: 'markdown',
      size: readmeContent.length
    }];
  }

  /**
   * Get source files
   * @returns {Promise<Array>} Source files
   */
  async getSourceFiles() {
    // In a real implementation, this would get actual source files
    return [
      {
        name: 'src/index.js',
        content: '// Main library entry point',
        type: 'javascript',
        size: 1024
      },
      {
        name: 'src/CharacterLibrary.js',
        content: '// Core CharacterLibrary class',
        type: 'javascript',
        size: 2048
      },
      {
        name: 'package.json',
        content: JSON.stringify({
          name: 'character-library',
          version: '1.0.0',
          description: 'Animated 2D character library',
          main: 'dist/index.js',
          scripts: {
            build: 'rollup -c',
            dev: 'rollup -c -w'
          }
        }, null, 2),
        type: 'json',
        size: 512
      }
    ];
  }

  /**
   * Get example files
   * @returns {Promise<Array>} Example files
   */
  async getExampleFiles() {
    // In a real implementation, this would get actual example files
    return [
      {
        name: 'examples/html/basic-usage.html',
        content: '<!-- Basic HTML usage example -->',
        type: 'html',
        size: 1024
      },
      {
        name: 'examples/react/CharacterDemo.jsx',
        content: '// React integration example',
        type: 'jsx',
        size: 2048
      },
      {
        name: 'examples/vue/CharacterDemo.vue',
        content: '<!-- Vue integration example -->',
        type: 'vue',
        size: 2048
      }
    ];
  }

  /**
   * Get all available characters
   * @returns {Promise<Array>} Available characters
   */
  async getAllAvailableCharacters() {
    return [
      { id: 'casual-boy', name: 'Casual Boy' },
      { id: 'sporty-girl', name: 'Sporty Girl' },
      { id: 'formal-man', name: 'Formal Man' },
      { id: 'fantasy-woman', name: 'Fantasy Woman' }
    ];
  }

  /**
   * Create ZIP package
   * @param {Object} packageData - Package data
   * @returns {Promise<Object>} ZIP data
   */
  async createZipPackage(packageData) {
    // In a real implementation, this would use a ZIP library
    // For now, we'll simulate the ZIP creation
    const totalSize = packageData.files.reduce((sum, file) => sum + file.size, 0);
    
    return {
      data: new Blob([JSON.stringify(packageData, null, 2)], { type: 'application/zip' }),
      size: totalSize,
      format: 'zip'
    };
  }

  /**
   * Create TAR package
   * @param {Object} packageData - Package data
   * @returns {Promise<Object>} TAR data
   */
  async createTarPackage(packageData) {
    // In a real implementation, this would use a TAR library
    const totalSize = packageData.files.reduce((sum, file) => sum + file.size, 0);
    
    return {
      data: new Blob([JSON.stringify(packageData, null, 2)], { type: 'application/x-tar' }),
      size: totalSize,
      format: 'tar'
    };
  }

  /**
   * Create JSON package
   * @param {Object} packageData - Package data
   * @returns {Promise<Object>} JSON data
   */
  async createJsonPackage(packageData) {
    const jsonString = JSON.stringify(packageData, null, 2);
    
    return {
      data: new Blob([jsonString], { type: 'application/json' }),
      size: jsonString.length,
      format: 'json'
    };
  }

  /**
   * Trigger file download
   * @param {Object} packageData - Package data
   * @param {string} filename - Filename
   * @param {Function} onProgress - Progress callback
   */
  async triggerDownload(packageData, filename, onProgress = null) {
    const url = URL.createObjectURL(packageData.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Simulate progress
    if (onProgress) {
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        onProgress({ progress: Math.min(progress, 100) });
        
        if (progress >= 100) {
          clearInterval(progressInterval);
        }
      }, 100);
    }
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cleanup
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  /**
   * Generate filename
   * @param {string} characterId - Character identifier
   * @param {string} characterName - Character name
   * @param {string} format - File format
   * @returns {string} Generated filename
   */
  generateFilename(characterId, characterName, format) {
    const sanitizedName = characterName.toLowerCase().replace(/\s+/g, '-');
    return `${sanitizedName}-${characterId}-${Date.now()}.${format}`;
  }

  /**
   * Format file size
   * @param {number} bytes - Size in bytes
   * @returns {string} Formatted size
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Chunk array into smaller arrays
   * @param {Array} array - Array to chunk
   * @param {number} size - Chunk size
   * @returns {Array} Chunked array
   */
  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Add download to history
   * @param {Object} downloadData - Download data
   */
  addToHistory(downloadData) {
    this.downloadHistory.unshift({
      ...downloadData,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 50 downloads
    if (this.downloadHistory.length > 50) {
      this.downloadHistory = this.downloadHistory.slice(0, 50);
    }
  }

  /**
   * Get download history
   * @returns {Array} Download history
   */
  getDownloadHistory() {
    return [...this.downloadHistory];
  }

  /**
   * Clear download history
   */
  clearDownloadHistory() {
    this.downloadHistory = [];
  }

  /**
   * Get active downloads
   * @returns {Array} Active download IDs
   */
  getActiveDownloads() {
    return Array.from(this.activeDownloads);
  }

  /**
   * Cancel download
   * @param {string} downloadId - Download ID
   */
  cancelDownload(downloadId) {
    this.activeDownloads.delete(downloadId);
  }

  /**
   * Get library version
   * @returns {string} Library version
   */
  getVersion() {
    return '1.0.0';
  }

  /**
   * Get download statistics
   * @returns {Object} Download statistics
   */
  getDownloadStats() {
    const stats = {
      totalDownloads: this.downloadHistory.length,
      characterDownloads: 0,
      collectionDownloads: 0,
      libraryDownloads: 0,
      totalSize: 0
    };

    this.downloadHistory.forEach(download => {
      switch (download.type) {
        case 'character':
          stats.characterDownloads++;
          break;
        case 'collection':
          stats.collectionDownloads++;
          break;
        case 'library':
          stats.libraryDownloads++;
          break;
      }
      
      if (download.size) {
        stats.totalSize += download.size;
      }
    });

    return stats;
  }
}

// Export for use in modules
export default DownloadUtils;

// Export for global use
if (typeof window !== 'undefined') {
  window.DownloadUtils = DownloadUtils;
  
  // Create global instance
  window.downloadUtils = new DownloadUtils();
}