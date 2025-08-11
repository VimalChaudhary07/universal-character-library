<template>
  <div class="character-demo">
    <h1>Character Library - Vue Demo</h1>
    
    <div class="controls-panel">
      <div class="character-selector">
        <h3>Select Character</h3>
        <div class="character-buttons">
          <button
            v-for="char in characters"
            :key="char.id"
            @click="selectedCharacter = char.id"
            :class="{ active: selectedCharacter === char.id }"
          >
            {{ char.name }}
          </button>
        </div>
      </div>

      <div class="animation-controls">
        <h3>Animations</h3>
        <div class="animation-buttons">
          <button
            v-for="anim in animations"
            :key="anim"
            @click="playAnimation(anim)"
            :class="{ active: currentAnimation === anim }"
          >
            {{ anim }}
          </button>
        </div>
      </div>

      <div class="color-controls">
        <h3>Colors</h3>
        <div v-for="(color, part) in colors" :key="part" class="color-input">
          <label>{{ part }}</label>
          <input
            type="color"
            :value="color"
            @input="handleColorChange(part, $event.target.value)"
          />
        </div>
      </div>
    </div>

    <div class="character-preview">
      <div ref="characterContainer" class="character-container"></div>
    </div>
  </div>
</template>

<script>
import { Character } from 'character-library';

export default {
  name: 'CharacterDemo',
  data() {
    return {
      selectedCharacter: 'casual-boy',
      currentAnimation: 'idle',
      colors: {
        skin: '#FDBCB4',
        hair: '#8B4513',
        shirt: '#4169E1',
        pants: '#2F4F4F',
        shoes: '#000000'
      },
      characterInstance: null,
      characters: [
        { id: 'casual-boy', name: 'Casual Boy', type: 'boy' },
        { id: 'sporty-girl', name: 'Sporty Girl', type: 'girl' },
        { id: 'formal-man', name: 'Formal Man', type: 'man' },
        { id: 'fantasy-woman', name: 'Fantasy Woman', type: 'woman' }
      ],
      animations: ['idle', 'walk', 'wave', 'jump', 'dance', 'blink', 'breathing']
    };
  },
  mounted() {
    this.initializeCharacter();
  },
  beforeUnmount() {
    if (this.characterInstance) {
      this.characterInstance.destroy();
    }
  },
  watch: {
    selectedCharacter() {
      this.initializeCharacter();
    },
    colors: {
      deep: true,
      handler() {
        if (this.characterInstance) {
          this.characterInstance.setColors(this.colors);
        }
      }
    }
  },
  methods: {
    initializeCharacter() {
      if (this.characterInstance) {
        this.characterInstance.destroy();
      }

      this.characterInstance = new Character({
        id: this.selectedCharacter,
        container: this.$refs.characterContainer,
        colors: this.colors
      });

      this.characterInstance.play(this.currentAnimation);
    },
    playAnimation(animationName) {
      this.currentAnimation = animationName;
      if (this.characterInstance) {
        this.characterInstance.play(animationName);
      }
    },
    handleColorChange(part, color) {
      this.colors = { ...this.colors, [part]: color };
    }
  }
};
</script>

<style scoped>
.character-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.controls-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.character-buttons,
.animation-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background: #f0f0f0;
}

button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.color-input {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.color-input label {
  min-width: 60px;
}

.color-input input[type="color"] {
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.character-preview {
  text-align: center;
}

.character-container {
  display: inline-block;
  width: 300px;
  height: 300px;
}
</style>
