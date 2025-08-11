<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          🌍 Universal Character Library
        </h1>
        <p class="text-lg text-gray-600">
          1000+ diverse characters • 500+ animations • Complete customization system
        </p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg p-4 text-center shadow-md">
          <div class="text-2xl font-bold text-purple-600">1000+</div>
          <div class="text-sm text-gray-600">Characters</div>
        </div>
        <div class="bg-white rounded-lg p-4 text-center shadow-md">
          <div class="text-2xl font-bold text-blue-600">500+</div>
          <div class="text-sm text-gray-600">Animations</div>
        </div>
        <div class="bg-white rounded-lg p-4 text-center shadow-md">
          <div class="text-2xl font-bold text-green-600">10+</div>
          <div class="text-sm text-gray-600">Styles</div>
        </div>
        <div class="bg-white rounded-lg p-4 text-center shadow-md">
          <div class="text-2xl font-bold text-red-600">50+</div>
          <div class="text-sm text-gray-600">Cultures</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Character Gallery -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Character Gallery</h2>
            
            <!-- Filters -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <select
                v-model="filter.type"
                class="border border-gray-300 rounded px-3 py-2"
              >
                <option value="all">All Types</option>
                <option v-for="type in customizationOptions.types" :key="type" :value="type">
                  {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                </option>
              </select>
              
              <select
                v-model="filter.style"
                class="border border-gray-300 rounded px-3 py-2"
              >
                <option value="all">All Styles</option>
                <option v-for="style in customizationOptions.styles" :key="style" :value="style">
                  {{ style.charAt(0).toUpperCase() + style.slice(1) }}
                </option>
              </select>
              
              <select
                v-model="filter.culture"
                class="border border-gray-300 rounded px-3 py-2"
              >
                <option value="all">All Cultures</option>
                <option value="Western">Western</option>
                <option value="Indian">Indian</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Future">Future</option>
                <option value="Nordic">Nordic</option>
                <option value="Christmas">Christmas</option>
              </select>
              
              <input
                type="text"
                placeholder="Search characters..."
                v-model="filter.search"
                class="border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <!-- Character Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="character in filteredCharacters"
                :key="character.id"
                :class="[
                  'border rounded-lg p-4 cursor-pointer transition-all',
                  selectedCharacter?.id === character.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
                @click="handleCharacterSelect(character)"
              >
                <div class="flex items-center space-x-4">
                  <div
                    :ref="`character-${character.id}`"
                    class="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-2xl"
                  >
                    👤
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-800">{{ character.name }}</h3>
                    <p class="text-sm text-gray-600">
                      {{ character.type }} • {{ character.style }} • {{ character.culture }}
                    </p>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <span
                        v-for="tag in character.tags"
                        :key="tag"
                        class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <span :class="[
                      'text-xs px-2 py-1 rounded',
                      character.available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    ]">
                      {{ character.available ? 'Available' : 'Coming Soon' }}
                    </span>
                  </div>
                </div>
                
                <!-- Animation Controls -->
                <div class="mt-3 flex flex-wrap gap-2">
                  <button
                    v-for="animation in character.animations.slice(0, 3)"
                    :key="animation"
                    @click.stop="handlePlayAnimation(character.id, animation)"
                    class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                  >
                    {{ animation }}
                  </button>
                  <span v-if="character.animations.length > 3" class="text-xs text-gray-500">
                    +{{ character.animations.length - 3 }} more
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Customization Panel -->
        <div class="space-y-6">
          <!-- Customization Controls -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Customization</h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Character Type</label>
                <select
                  v-model="customization.type"
                  @change="handleCustomizationChange('type', customization.type)"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option
                    v-for="type in customizationOptions.types"
                    :key="type"
                    :value="type"
                  >
                    {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Style</label>
                <select
                  v-model="customization.style"
                  @change="handleCustomizationChange('style', customization.style)"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option
                    v-for="style in customizationOptions.styles"
                    :key="style"
                    :value="style"
                  >
                    {{ style.charAt(0).toUpperCase() + style.slice(1) }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Skin Tone</label>
                <div class="grid grid-cols-5 gap-2">
                  <button
                    v-for="tone in customizationOptions.skinTones"
                    :key="tone.value"
                    @click="handleCustomizationChange('skinTone', tone.value)"
                    :class="[
                      'w-8 h-8 rounded-full border-2',
                      customization.skinTone === tone.value ? 'border-purple-500' : 'border-gray-300'
                    ]"
                    :style="{ backgroundColor: tone.value }"
                    :title="tone.name"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Hair Color</label>
                <div class="grid grid-cols-4 gap-2">
                  <button
                    v-for="color in customizationOptions.hairColors"
                    :key="color.value"
                    @click="handleCustomizationChange('hairColor', color.value)"
                    :class="[
                      'w-8 h-8 rounded-full border-2',
                      customization.hairColor === color.value ? 'border-purple-500' : 'border-gray-300'
                    ]"
                    :style="{ backgroundColor: color.value }"
                    :title="color.name"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Body Type</label>
                <select
                  v-model="customization.bodyType"
                  @change="handleCustomizationChange('bodyType', customization.bodyType)"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option
                    v-for="type in customizationOptions.bodyTypes"
                    :key="type"
                    :value="type"
                  >
                    {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Expression</label>
                <select
                  v-model="customization.expression"
                  @change="handleCustomizationChange('expression', customization.expression)"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option
                    v-for="expr in customizationOptions.expressions"
                    :key="expr"
                    :value="expr"
                  >
                    {{ expr.charAt(0).toUpperCase() + expr.slice(1) }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Pose</label>
                <select
                  v-model="customization.pose"
                  @change="handleCustomizationChange('pose', customization.pose)"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option
                    v-for="pose in customizationOptions.poses"
                    :key="pose"
                    :value="pose"
                  >
                    {{ pose.charAt(0).toUpperCase() + pose.slice(1) }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Animation Speed: {{ animationSpeed }}x
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  v-model="animationSpeed"
                  @input="handleAnimationSpeedChange(parseFloat(animationSpeed))"
                  class="w-full"
                />
              </div>
            </div>
          </div>

          <!-- Preset Management -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Presets</h2>
            
            <div class="space-y-4">
              <button
                @click="savePreset"
                class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
              >
                Save Current Preset
              </button>

              <div v-if="savedPresets.length > 0" class="space-y-2">
                <h3 class="font-medium text-gray-700">Saved Presets</h3>
                <div
                  v-for="preset in savedPresets"
                  :key="preset.id"
                  class="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span class="text-sm">{{ preset.name }}</span>
                  <div class="space-x-2">
                    <button
                      @click="loadPreset(preset.id)"
                      class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                    >
                      Load
                    </button>
                    <button
                      @click="deletePreset(preset.id)"
                      class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Selected Character Info -->
          <div v-if="selectedCharacter" class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Selected Character</h2>
            <div class="space-y-2">
              <div>
                <span class="font-medium">Name:</span> {{ selectedCharacter.name }}
              </div>
              <div>
                <span class="font-medium">Type:</span> {{ selectedCharacter.type }}
              </div>
              <div>
                <span class="font-medium">Style:</span> {{ selectedCharacter.style }}
              </div>
              <div>
                <span class="font-medium">Culture:</span> {{ selectedCharacter.culture }}
              </div>
              <div>
                <span class="font-medium">Description:</span> {{ selectedCharacter.description }}
              </div>
              <div>
                <span class="font-medium">Animations:</span> {{ selectedCharacter.animations.length }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Character } from 'universal-character-library';

export default {
  name: 'UniversalCharacterDemo',
  data() {
    return {
      characters: [],
      selectedCharacter: null,
      customization: {
        type: 'boy',
        style: 'casual',
        skinTone: '#FDBCB4',
        hairColor: '#8B4513',
        bodyType: 'average',
        expression: 'happy',
        pose: 'standing'
      },
      animationSpeed: 1.0,
      isPlaying: true,
      currentAnimation: 'idle',
      savedPresets: [],
      filter: {
        type: 'all',
        style: 'all',
        culture: 'all',
        search: ''
      },
      characterRefs: {},
      customizationOptions: {
        types: ['boy', 'girl', 'man', 'woman'],
        styles: ['casual', 'formal', 'sporty', 'fantasy', 'sci-fi', 'historical', 'traditional', 'holiday', 'sports', 'occupational'],
        skinTones: [
          { name: 'Light', value: '#FDBCB4' },
          { name: 'Medium Light', value: '#F1C27D' },
          { name: 'Medium', value: '#E0AC69' },
          { name: 'Medium Dark', value: '#C68642' },
          { name: 'Dark', value: '#8D5524' }
        ],
        hairColors: [
          { name: 'Black', value: '#000000' },
          { name: 'Brown', value: '#8B4513' },
          { name: 'Blonde', value: '#FFD700' },
          { name: 'Red', value: '#FF4500' },
          { name: 'Blue', value: '#4169E1' },
          { name: 'Pink', value: '#FF1493' },
          { name: 'Purple', value: '#9370DB' },
          { name: 'Green', value: '#32CD32' }
        ],
        bodyTypes: ['slim', 'average', 'athletic', 'muscular', 'heavy', 'tall', 'short', 'elderly'],
        expressions: ['neutral', 'happy', 'sad', 'angry', 'surprised', 'confused', 'excited', 'bored'],
        poses: ['standing', 'sitting', 'walking', 'running', 'jumping', 'dancing', 'fighting', 'working']
      },
      sampleCharacters: [
        {
          id: 'casual-boy-western',
          name: 'Alex',
          type: 'boy',
          style: 'casual',
          culture: 'Western',
          description: 'Friendly boy from Western culture',
          tags: ['casual', 'western', 'friendly'],
          available: true,
          animations: ['idle', 'walk', 'wave', 'jump', 'dance', 'run']
        },
        {
          id: 'traditional-girl-indian',
          name: 'Priya',
          type: 'girl',
          style: 'traditional',
          culture: 'Indian',
          description: 'Traditional Indian girl in cultural attire',
          tags: ['traditional', 'indian', 'cultural'],
          available: true,
          animations: ['idle', 'dance', 'greet', 'celebrate', 'wave', 'spin']
        },
        {
          id: 'fantasy-man-elf',
          name: 'Eldrin',
          type: 'man',
          style: 'fantasy',
          culture: 'Fantasy',
          description: 'Mystical elf from fantasy realm',
          tags: ['fantasy', 'elf', 'magical'],
          available: true,
          animations: ['idle', 'cast-spell', 'fight', 'fly', 'teleport', 'summon']
        },
        {
          id: 'sci-fi-woman-android',
          name: 'Nova',
          type: 'woman',
          style: 'sci-fi',
          culture: 'Future',
          description: 'Advanced android from the future',
          tags: ['sci-fi', 'android', 'futuristic'],
          available: true,
          animations: ['idle', 'hover', 'scan', 'transform', 'blast', 'shield']
        },
        {
          id: 'historical-man-viking',
          name: 'Bjorn',
          type: 'man',
          style: 'historical',
          culture: 'Nordic',
          description: 'Brave Viking warrior from ancient times',
          tags: ['historical', 'viking', 'warrior'],
          available: true,
          animations: ['idle', 'fight', 'march', 'celebrate', 'drink', 'roar']
        },
        {
          id: 'holiday-girl-santa',
          name: 'Holly',
          type: 'girl',
          style: 'holiday',
          culture: 'Christmas',
          description: 'Festive holiday helper',
          tags: ['holiday', 'christmas', 'festive'],
          available: true,
          animations: ['idle', 'dance', 'give-gift', 'celebrate', 'decorate', 'sing']
        }
      ]
    };
  },
  computed: {
    filteredCharacters() {
      return this.characters.filter(character => {
        const matchesType = this.filter.type === 'all' || character.type === this.filter.type;
        const matchesStyle = this.filter.style === 'all' || character.style === this.filter.style;
        const matchesCulture = this.filter.culture === 'all' || character.culture === this.filter.culture;
        const matchesSearch = this.filter.search === '' || 
          character.name.toLowerCase().includes(this.filter.search.toLowerCase()) ||
          character.description.toLowerCase().includes(this.filter.search.toLowerCase()) ||
          character.tags.some(tag => tag.toLowerCase().includes(this.filter.search.toLowerCase()));
        
        return matchesType && matchesStyle && matchesCulture && matchesSearch;
      });
    }
  },
  mounted() {
    this.initializeCharacters();
  },
  beforeUnmount() {
    // Cleanup character instances
    Object.values(this.characterRefs).forEach(char => {
      if (char && char.destroy) {
        char.destroy();
      }
    });
  },
  methods: {
    initializeCharacters() {
      this.characters = this.sampleCharacters;
      
      // Initialize character instances
      this.sampleCharacters.forEach(character => {
        if (character.available) {
          const char = new Character({
            id: character.id,
            name: character.name,
            type: character.type,
            style: character.style,
            container: `#character-${character.id}`,
            customization: {
              skinTone: this.customization.skinTone,
              hairColor: this.customization.hairColor,
              bodyType: this.customization.bodyType,
              expression: this.customization.expression,
              pose: this.customization.pose
            },
            animationSpeed: this.animationSpeed
          });
          
          this.characterRefs[character.id] = char;
          char.play('idle');
        }
      });
    },
    
    handleCharacterSelect(character) {
      this.selectedCharacter = character;
      if (this.characterRefs[character.id]) {
        this.characterRefs[character.id].play('idle');
      }
    },
    
    handleCustomizationChange(key, value) {
      this.customization[key] = value;
      
      // Update all characters with new customization
      Object.values(this.characterRefs).forEach(char => {
        if (char && char.setCustomization) {
          char.setCustomization({ [key]: value });
        }
      });
    },
    
    handlePlayAnimation(characterId, animation) {
      if (this.characterRefs[characterId]) {
        this.characterRefs[characterId].play(animation);
        this.currentAnimation = animation;
      }
    },
    
    handleAnimationSpeedChange(speed) {
      this.animationSpeed = speed;
      Object.values(this.characterRefs).forEach(char => {
        if (char && char.setAnimationSpeed) {
          char.setAnimationSpeed(speed);
        }
      });
    },
    
    savePreset() {
      const preset = {
        id: Date.now(),
        name: `Preset ${this.savedPresets.length + 1}`,
        customization: { ...this.customization },
        animationSpeed: this.animationSpeed
      };
      this.savedPresets.push(preset);
    },
    
    loadPreset(presetId) {
      const preset = this.savedPresets.find(p => p.id === presetId);
      if (preset) {
        this.customization = { ...preset.customization };
        this.animationSpeed = preset.animationSpeed;
        this.handleAnimationSpeedChange(preset.animationSpeed);
      }
    },
    
    deletePreset(presetId) {
      this.savedPresets = this.savedPresets.filter(p => p.id !== presetId);
    }
  }
};
</script>

<style scoped>
/* Component-specific styles can be added here if needed */
</style>