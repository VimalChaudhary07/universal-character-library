<template>
  <div class="advanced-character-demo">
    <div class="demo-header">
      <h1>🚀 Advanced Character Library Demo</h1>
      <p>Explore advanced features including scenes, interactions, and customizations</p>
    </div>
    
    <div class="demo-grid">
      <!-- Character Creation Panel -->
      <div class="panel character-creation">
        <h2>🎭 Character Creation</h2>
        
        <div class="character-types">
          <h3>Character Types</h3>
          <div class="type-buttons">
            <button
              v-for="type in characterTypes"
              :key="type.id"
              @click="createCharacter(type.id)"
              class="type-btn"
            >
              {{ type.name }}
            </button>
          </div>
        </div>
        
        <div class="preset-characters">
          <h3>Quick Presets</h3>
          <div class="preset-buttons">
            <button @click="createFromPreset('friendly-guide')" class="preset-btn">
              👦 Friendly Guide
            </button>
            <button @click="createFromPreset('energetic-coach')" class="preset-btn">
              👧 Energetic Coach
            </button>
            <button @click="createFromPreset('professional-assistant')" class="preset-btn">
              👨 Professional Assistant
            </button>
            <button @click="createFromPreset('magical-companion')" class="preset-btn">
              👩 Magical Companion
            </button>
          </div>
        </div>
      </div>
      
      <!-- Character List -->
      <div class="panel character-list">
        <h2>👥 Active Characters ({{ characters.length }})</h2>
        
        <div class="characters-grid">
          <div
            v-for="character in characters"
            :key="character.id"
            :class="['character-card', { selected: selectedCharacter?.id === character.id }]"
            @click="selectCharacter(character)"
          >
            <div class="character-info">
              <div class="character-name">
                {{ getCharacterName(character.type) }}
              </div>
              <div class="character-status">
                <span :class="['status-dot', character.isPlaying ? 'playing' : 'paused']"></span>
                {{ character.currentAnimation }}
              </div>
            </div>
            <div class="character-actions">
              <button
                @click.stop="removeCharacter(character.id)"
                class="remove-btn"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
        
        <div v-if="characters.length === 0" class="no-characters">
          <p>No characters created yet. Create one to get started!</p>
        </div>
      </div>
      
      <!-- Animation Control -->
      <div class="panel animation-control">
        <h2>🎬 Animation Control</h2>
        
        <div v-if="selectedCharacter" class="animation-controls">
          <div class="current-character">
            <h3>Selected: {{ getCharacterName(selectedCharacter.type) }}</h3>
            <div class="status">
              <span :class="['status-dot', selectedCharacter.isPlaying ? 'playing' : 'paused']"></span>
              {{ selectedCharacter.currentAnimation }}
            </div>
          </div>
          
          <div class="animation-buttons">
            <h4>Animations</h4>
            <div class="buttons-grid">
              <button
                v-for="anim in animations"
                :key="anim"
                @click="playAnimation(anim)"
                :class="['anim-btn', { active: selectedCharacter.currentAnimation === anim }]"
              >
                {{ anim }}
              </button>
            </div>
          </div>
          
          <div class="playback-controls">
            <h4>Playback</h4>
            <div class="playback-buttons">
              <button
                @click="selectedCharacter.isPlaying ? pauseAnimation() : resumeAnimation()"
                class="playback-btn"
              >
                {{ selectedCharacter.isPlaying ? '⏸️ Pause' : '▶️ Play' }}
              </button>
              <button @click="playAnimation('idle')" class="playback-btn">
                🔄 Reset
              </button>
            </div>
          </div>
        </div>
        
        <div v-else class="no-selection">
          <p>Select a character to control its animations</p>
        </div>
      </div>
      
      <!-- Customization Panel -->
      <div class="panel customization">
        <h2>🎨 Customization</h2>
        
        <div class="customization-controls">
          <div class="color-controls">
            <h4>Colors</h4>
            <div v-for="(color, part) in customization" :key="part" class="color-input">
              <label>{{ part }}</label>
              <input
                type="color"
                :value="color"
                @input="updateCustomization(part, $event.target.value)"
              />
            </div>
          </div>
          
          <div class="slider-controls">
            <div class="slider-control">
              <label>Size: {{ characterSize.toFixed(1) }}</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                :value="characterSize"
                @input="updateCharacterSize(parseFloat($event.target.value))"
              />
            </div>
            
            <div class="slider-control">
              <label>Speed: {{ animationSpeed.toFixed(1) }}</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                :value="animationSpeed"
                @input="updateAnimationSpeed(parseFloat($event.target.value))"
              />
            </div>
          </div>
          
          <div class="theme-controls">
            <h4>Themes</h4>
            <div class="theme-buttons">
              <button
                v-for="theme in themes"
                :key="theme"
                @click="applyTheme(theme)"
                :class="['theme-btn', { active: currentTheme === theme }]"
              >
                {{ theme }}
              </button>
            </div>
          </div>
          
          <div class="action-buttons">
            <button @click="randomizeColors" class="action-btn randomize">
              🎲 Random Colors
            </button>
            <button @click="resetCustomization" class="action-btn reset">
              🔄 Reset All
            </button>
          </div>
        </div>
      </div>
      
      <!-- Scene Management -->
      <div class="panel scene-management">
        <h2>🎬 Scene Management</h2>
        
        <div class="scene-controls">
          <div class="scene-creation">
            <h4>Create Scene</h4>
            <div class="layout-buttons">
              <button @click="createScene('horizontal')" class="layout-btn">
                ↔️ Horizontal
              </button>
              <button @click="createScene('vertical')" class="layout-btn">
                ↕️ Vertical
              </button>
              <button @click="createScene('grid')" class="layout-btn">
                ⊞ Grid
              </button>
              <button @click="createScene('circle')" class="layout-btn">
                ⭕ Circle
              </button>
            </div>
          </div>
          
          <div v-if="scene" class="scene-actions">
            <h4>Scene Actions</h4>
            <div class="scene-buttons">
              <button @click="scene.play()" class="scene-btn">
                ▶️ Play All
              </button>
              <button @click="scene.pause()" class="scene-btn">
                ⏸️ Pause All
              </button>
              <button @click="scene.stop()" class="scene-btn">
                ⏹️ Stop All
              </button>
              <button @click="destroyScene()" class="scene-btn destroy">
                🗑️ Destroy
              </button>
            </div>
          </div>
        </div>
        
        <div class="scene-preview">
          <h4>Scene Preview</h4>
          <div 
            ref="sceneContainer" 
            class="scene-container"
          >
            {{ scene ? 'Scene loaded' : 'No scene created' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CharacterLibrary, CharacterLibraryUtils } from 'character-library';

export default {
  name: 'AdvancedCharacterDemo',
  data() {
    return {
      // Library instances
      library: null,
      utils: null,
      
      // Character management
      characters: [],
      selectedCharacter: null,
      scene: null,
      
      // Customization state
      customization: {
        skin: '#FDBCB4',
        hair: '#8B4513',
        shirt: '#4169E1',
        pants: '#2F4F4F',
        shoes: '#000000'
      },
      
      // Animation control
      animationSpeed: 1,
      characterSize: 1,
      currentTheme: 'light',
      
      // Available options
      characterTypes: [
        { id: 'casual-boy', name: 'Casual Boy', type: 'boy' },
        { id: 'sporty-girl', name: 'Sporty Girl', type: 'girl' },
        { id: 'formal-man', name: 'Formal Man', type: 'man' },
        { id: 'fantasy-woman', name: 'Fantasy Woman', type: 'woman' }
      ],
      
      animations: ['idle', 'walk', 'wave', 'jump', 'dance', 'blink', 'breathing', 'magic'],
      themes: ['light', 'dark', 'vibrant', 'winter', 'spring', 'summer', 'autumn']
    };
  },
  
  mounted() {
    this.initializeLibrary();
  },
  
  beforeUnmount() {
    this.cleanup();
  },
  
  methods: {
    // Initialize library
    initializeLibrary() {
      this.library = new CharacterLibrary();
      this.utils = new CharacterLibraryUtils();
    },
    
    // Cleanup resources
    cleanup() {
      // Destroy all characters
      this.characters.forEach(character => {
        if (character.instance) {
          this.library.destroyCharacter(character.instance.id);
        }
      });
      
      // Destroy scene
      if (this.scene) {
        this.scene.destroy();
      }
    },
    
    // Get character name by type
    getCharacterName(type) {
      const characterType = this.characterTypes.find(t => t.id === type);
      return characterType ? characterType.name : type;
    },
    
    // Create a new character
    async createCharacter(characterType) {
      try {
        const containerId = `char-${Date.now()}`;
        const character = {
          id: containerId,
          type: characterType,
          instance: null,
          currentAnimation: 'idle',
          isPlaying: true
        };
        
        // Create character instance
        const instance = await this.library.createCharacter(characterType, {
          size: this.characterSize,
          theme: this.currentTheme,
          customizations: this.customization
        });
        
        character.instance = instance;
        
        // Start with idle animation
        await this.library.playAnimation(instance.id, 'idle');
        
        this.characters.push(character);
        this.selectedCharacter = character;
        
      } catch (error) {
        console.error('Failed to create character:', error);
      }
    },
    
    // Remove a character
    removeCharacter(characterId) {
      const character = this.characters.find(c => c.id === characterId);
      if (character && character.instance) {
        this.library.destroyCharacter(character.instance.id);
      }
      
      this.characters = this.characters.filter(c => c.id !== characterId);
      if (this.selectedCharacter?.id === characterId) {
        this.selectedCharacter = null;
      }
    },
    
    // Select character
    selectCharacter(character) {
      this.selectedCharacter = character;
    },
    
    // Play animation on selected character
    async playAnimation(animationName) {
      if (!this.selectedCharacter || !this.selectedCharacter.instance) return;
      
      try {
        await this.library.playAnimation(
          this.selectedCharacter.instance.id,
          animationName,
          { speed: this.animationSpeed }
        );
        
        // Update character state
        const characterIndex = this.characters.findIndex(c => c.id === this.selectedCharacter.id);
        if (characterIndex !== -1) {
          this.characters[characterIndex] = {
            ...this.characters[characterIndex],
            currentAnimation: animationName,
            isPlaying: true
          };
        }
        
        this.selectedCharacter = {
          ...this.selectedCharacter,
          currentAnimation: animationName,
          isPlaying: true
        };
        
      } catch (error) {
        console.error('Failed to play animation:', error);
      }
    },
    
    // Pause animation on selected character
    pauseAnimation() {
      if (!this.selectedCharacter || !this.selectedCharacter.instance) return;
      
      this.library.pauseAnimation(this.selectedCharacter.instance.id);
      
      // Update character state
      const characterIndex = this.characters.findIndex(c => c.id === this.selectedCharacter.id);
      if (characterIndex !== -1) {
        this.characters[characterIndex] = {
          ...this.characters[characterIndex],
          isPlaying: false
        };
      }
      
      this.selectedCharacter = {
        ...this.selectedCharacter,
        isPlaying: false
      };
    },
    
    // Resume animation on selected character
    resumeAnimation() {
      if (!this.selectedCharacter || !this.selectedCharacter.instance) return;
      
      this.library.resumeAnimation(this.selectedCharacter.instance.id);
      
      // Update character state
      const characterIndex = this.characters.findIndex(c => c.id === this.selectedCharacter.id);
      if (characterIndex !== -1) {
        this.characters[characterIndex] = {
          ...this.characters[characterIndex],
          isPlaying: true
        };
      }
      
      this.selectedCharacter = {
        ...this.selectedCharacter,
        isPlaying: true
      };
    },
    
    // Update customization
    updateCustomization(part, color) {
      this.customization = { ...this.customization, [part]: color };
      
      if (this.selectedCharacter && this.selectedCharacter.instance) {
        this.library.customizeCharacter(this.selectedCharacter.instance.id, this.customization);
      }
    },
    
    // Update character size
    updateCharacterSize(size) {
      this.characterSize = size;
      
      if (this.selectedCharacter && this.selectedCharacter.instance) {
        this.library.setCharacterSize(this.selectedCharacter.instance.id, size);
      }
    },
    
    // Update animation speed
    updateAnimationSpeed(speed) {
      this.animationSpeed = speed;
      
      if (this.selectedCharacter && this.selectedCharacter.instance) {
        this.library.setAnimationSpeed(this.selectedCharacter.instance.id, speed);
      }
    },
    
    // Apply theme
    applyTheme(theme) {
      this.currentTheme = theme;
      
      if (this.selectedCharacter && this.selectedCharacter.instance) {
        this.library.applyTheme(this.selectedCharacter.instance.id, theme);
      }
    },
    
    // Create a scene
    async createScene(layout = 'horizontal') {
      if (this.scene) {
        this.scene.destroy();
      }
      
      try {
        this.scene = await this.utils.createScene('advanced-demo', [
          { type: 'casual-boy', container: this.$refs.sceneContainer },
          { type: 'sporty-girl', container: this.$refs.sceneContainer },
          { type: 'formal-man', container: this.$refs.sceneContainer },
          { type: 'fantasy-woman', container: this.$refs.sceneContainer }
        ], {
          layout: layout,
          autoPlay: true,
          animations: ['idle', 'walk', 'wave', 'dance']
        });
        
      } catch (error) {
        console.error('Failed to create scene:', error);
      }
    },
    
    // Destroy scene
    destroyScene() {
      if (this.scene) {
        this.scene.destroy();
        this.scene = null;
      }
    },
    
    // Create character from preset
    async createFromPreset(preset) {
      try {
        const containerId = `preset-${Date.now()}`;
        const characterId = await this.utils.createFromPreset(preset, `#${containerId}`);
        
        const character = {
          id: containerId,
          type: preset,
          instance: { id: characterId },
          currentAnimation: 'idle',
          isPlaying: true,
          isPreset: true
        };
        
        this.characters.push(character);
        this.selectedCharacter = character;
        
      } catch (error) {
        console.error('Failed to create preset character:', error);
      }
    },
    
    // Randomize colors
    randomizeColors() {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
      const newCustomization = {};
      
      Object.keys(this.customization).forEach(key => {
        newCustomization[key] = colors[Math.floor(Math.random() * colors.length)];
      });
      
      this.customization = newCustomization;
      
      if (this.selectedCharacter && this.selectedCharacter.instance) {
        this.library.customizeCharacter(this.selectedCharacter.instance.id, newCustomization);
      }
    },
    
    // Reset customization
    resetCustomization() {
      this.customization = {
        skin: '#FDBCB4',
        hair: '#8B4513',
        shirt: '#4169E1',
        pants: '#2F4F4F',
        shoes: '#000000'
      };
      this.characterSize = 1;
      this.animationSpeed = 1;
      this.currentTheme = 'light';
      
      if (this.selectedCharacter && this.selectedCharacter.instance) {
        this.library.customizeCharacter(this.selectedCharacter.instance.id, this.customization);
        this.library.setCharacterSize(this.selectedCharacter.instance.id, this.characterSize);
        this.library.setAnimationSpeed(this.selectedCharacter.instance.id, this.animationSpeed);
        this.library.applyTheme(this.selectedCharacter.instance.id, this.currentTheme);
      }
    }
  }
};
</script>

<style scoped>
.advanced-character-demo {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
}

.demo-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 2.5em;
}

.demo-header p {
  margin: 0;
  color: #666;
  font-size: 1.1em;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.panel {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 4px solid #007bff;
}

.panel h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.3em;
}

.panel h3 {
  margin: 0 0 15px 0;
  color: #555;
  font-size: 1.1em;
}

.panel h4 {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 1em;
}

/* Character Creation */
.type-buttons, .preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.type-btn, .preset-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.type-btn:hover, .preset-btn:hover {
  background: #f0f0f0;
  border-color: #007bff;
}

/* Character List */
.characters-grid {
  display: grid;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.character-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.character-card:hover {
  background: #f8f9fa;
}

.character-card.selected {
  border-color: #007bff;
  background: #e3f2fd;
}

.character-info {
  flex: 1;
}

.character-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.character-status {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
}

.status-dot.playing {
  background: #28a745;
}

.status-dot.paused {
  background: #ffc107;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
}

.no-characters, .no-selection {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
}

/* Animation Control */
.animation-buttons .buttons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
}

.anim-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
}

.anim-btn:hover {
  background: #f0f0f0;
}

.anim-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.playback-buttons {
  display: flex;
  gap: 10px;
}

.playback-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.playback-btn:hover {
  background: #f0f0f0;
}

/* Customization */
.color-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.color-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.color-input label {
  font-size: 12px;
  font-weight: 500;
}

.color-input input[type="color"] {
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.slider-controls {
  margin-bottom: 20px;
}

.slider-control {
  margin-bottom: 15px;
}

.slider-control label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.slider-control input[type="range"] {
  width: 100%;
}

.theme-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
  margin-bottom: 20px;
}

.theme-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
}

.theme-btn:hover {
  background: #f0f0f0;
}

.theme-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.action-btn.randomize {
  background: #28a745;
  color: white;
}

.action-btn.reset {
  background: #6c757d;
  color: white;
}

.action-btn:hover {
  opacity: 0.9;
}

/* Scene Management */
.layout-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.layout-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.layout-btn:hover {
  background: #f0f0f0;
}

.scene-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.scene-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
}

.scene-btn:hover {
  background: #f0f0f0;
}

.scene-btn.destroy {
  background: #dc3545;
  color: white;
  border-color: #dc3545;
}

.scene-container {
  min-height: 200px;
  border: 2px dashed #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .type-buttons, .preset-buttons {
    flex-direction: column;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
</template>