import React, { useState, useEffect, useRef } from 'react';
import { Character } from 'universal-character-library';

const UniversalCharacterDemo = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [customization, setCustomization] = useState({
    type: 'boy',
    style: 'casual',
    skinTone: '#FDBCB4',
    hairColor: '#8B4513',
    bodyType: 'average',
    expression: 'happy',
    pose: 'standing'
  });
  const [animationSpeed, setAnimationSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [savedPresets, setSavedPresets] = useState([]);
  const [filter, setFilter] = useState({
    type: 'all',
    style: 'all',
    culture: 'all',
    search: ''
  });
  
  const characterRefs = useRef({});
  const containerRef = useRef(null);

  // Sample character data
  const sampleCharacters = [
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
  ];

  // Animation library
  const animations = [
    'idle', 'walk', 'run', 'jump', 'dance', 'wave', 'fight', 'fly', 'cast-spell', 
    'teleport', 'summon', 'hover', 'scan', 'transform', 'blast', 'shield', 'march', 
    'celebrate', 'drink', 'roar', 'give-gift', 'decorate', 'sing', 'spin', 'greet'
  ];

  // Customization options
  const customizationOptions = {
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
  };

  // Initialize characters
  useEffect(() => {
    setCharacters(sampleCharacters);
    
    // Initialize character instances
    sampleCharacters.forEach(character => {
      if (character.available) {
        const char = new Character({
          id: character.id,
          name: character.name,
          type: character.type,
          style: character.style,
          container: `#character-${character.id}`,
          customization: {
            skinTone: customization.skinTone,
            hairColor: customization.hairColor,
            bodyType: customization.bodyType,
            expression: customization.expression,
            pose: customization.pose
          },
          animationSpeed: animationSpeed
        });
        
        characterRefs.current[character.id] = char;
        char.play('idle');
      }
    });

    return () => {
      // Cleanup character instances
      Object.values(characterRefs.current).forEach(char => {
        if (char && char.destroy) {
          char.destroy();
        }
      });
    };
  }, []);

  // Filter characters based on current filter
  const filteredCharacters = characters.filter(character => {
    const matchesType = filter.type === 'all' || character.type === filter.type;
    const matchesStyle = filter.style === 'all' || character.style === filter.style;
    const matchesCulture = filter.culture === 'all' || character.culture === filter.culture;
    const matchesSearch = filter.search === '' || 
      character.name.toLowerCase().includes(filter.search.toLowerCase()) ||
      character.description.toLowerCase().includes(filter.search.toLowerCase()) ||
      character.tags.some(tag => tag.toLowerCase().includes(filter.search.toLowerCase()));
    
    return matchesType && matchesStyle && matchesCulture && matchesSearch;
  });

  // Handle character selection
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    if (characterRefs.current[character.id]) {
      characterRefs.current[character.id].play('idle');
    }
  };

  // Handle customization change
  const handleCustomizationChange = (key, value) => {
    setCustomization(prev => ({ ...prev, [key]: value }));
    
    // Update all characters with new customization
    Object.values(characterRefs.current).forEach(char => {
      if (char && char.setCustomization) {
        char.setCustomization({ [key]: value });
      }
    });
  };

  // Handle animation play
  const handlePlayAnimation = (characterId, animation) => {
    if (characterRefs.current[characterId]) {
      characterRefs.current[characterId].play(animation);
      setCurrentAnimation(animation);
    }
  };

  // Handle animation speed change
  const handleAnimationSpeedChange = (speed) => {
    setAnimationSpeed(speed);
    Object.values(characterRefs.current).forEach(char => {
      if (char && char.setAnimationSpeed) {
        char.setAnimationSpeed(speed);
      }
    });
  };

  // Save preset
  const savePreset = () => {
    const preset = {
      id: Date.now(),
      name: `Preset ${savedPresets.length + 1}`,
      customization: { ...customization },
      animationSpeed: animationSpeed
    };
    setSavedPresets(prev => [...prev, preset]);
  };

  // Load preset
  const loadPreset = (presetId) => {
    const preset = savedPresets.find(p => p.id === presetId);
    if (preset) {
      setCustomization(preset.customization);
      setAnimationSpeed(preset.animationSpeed);
      handleAnimationSpeedChange(preset.animationSpeed);
    }
  };

  // Delete preset
  const deletePreset = (presetId) => {
    setSavedPresets(prev => prev.filter(p => p.id !== presetId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🌍 Universal Character Library
          </h1>
          <p className="text-lg text-gray-600">
            1000+ diverse characters • 500+ animations • Complete customization system
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-purple-600">1000+</div>
            <div className="text-sm text-gray-600">Characters</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">Animations</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-green-600">10+</div>
            <div className="text-sm text-gray-600">Styles</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-red-600">50+</div>
            <div className="text-sm text-gray-600">Cultures</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Character Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Character Gallery</h2>
              
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <select
                  value={filter.type}
                  onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  <option value="all">All Types</option>
                  {customizationOptions.types.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
                
                <select
                  value={filter.style}
                  onChange={(e) => setFilter(prev => ({ ...prev, style: e.target.value }))}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  <option value="all">All Styles</option>
                  {customizationOptions.styles.map(style => (
                    <option key={style} value={style}>{style.charAt(0).toUpperCase() + style.slice(1)}</option>
                  ))}
                </select>
                
                <select
                  value={filter.culture}
                  onChange={(e) => setFilter(prev => ({ ...prev, culture: e.target.value }))}
                  className="border border-gray-300 rounded px-3 py-2"
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
                  value={filter.search}
                  onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* Character Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCharacters.map(character => (
                  <div
                    key={character.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedCharacter?.id === character.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleCharacterSelect(character)}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        id={`character-${character.id}`}
                        className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-2xl"
                      >
                        👤
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{character.name}</h3>
                        <p className="text-sm text-gray-600">
                          {character.type} • {character.style} • {character.culture}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {character.tags.map(tag => (
                            <span key={tag} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded ${
                          character.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {character.available ? 'Available' : 'Coming Soon'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Animation Controls */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {character.animations.slice(0, 3).map(animation => (
                        <button
                          key={animation}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAnimation(character.id, animation);
                          }}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                        >
                          {animation}
                        </button>
                      ))}
                      {character.animations.length > 3 && (
                        <span className="text-xs text-gray-500">+{character.animations.length - 3} more</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6">
            {/* Customization Controls */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Customization</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Character Type</label>
                  <select
                    value={customization.type}
                    onChange={(e) => handleCustomizationChange('type', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {customizationOptions.types.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
                  <select
                    value={customization.style}
                    onChange={(e) => handleCustomizationChange('style', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {customizationOptions.styles.map(style => (
                      <option key={style} value={style}>{style.charAt(0).toUpperCase() + style.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skin Tone</label>
                  <div className="grid grid-cols-5 gap-2">
                    {customizationOptions.skinTones.map(tone => (
                      <button
                        key={tone.value}
                        onClick={() => handleCustomizationChange('skinTone', tone.value)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          customization.skinTone === tone.value ? 'border-purple-500' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: tone.value }}
                        title={tone.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hair Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {customizationOptions.hairColors.map(color => (
                      <button
                        key={color.value}
                        onClick={() => handleCustomizationChange('hairColor', color.value)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          customization.hairColor === color.value ? 'border-purple-500' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body Type</label>
                  <select
                    value={customization.bodyType}
                    onChange={(e) => handleCustomizationChange('bodyType', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {customizationOptions.bodyTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expression</label>
                  <select
                    value={customization.expression}
                    onChange={(e) => handleCustomizationChange('expression', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {customizationOptions.expressions.map(expr => (
                      <option key={expr} value={expr}>{expr.charAt(0).toUpperCase() + expr.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pose</label>
                  <select
                    value={customization.pose}
                    onChange={(e) => handleCustomizationChange('pose', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {customizationOptions.poses.map(pose => (
                      <option key={pose} value={pose}>{pose.charAt(0).toUpperCase() + pose.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Animation Speed: {animationSpeed}x
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={animationSpeed}
                    onChange={(e) => handleAnimationSpeedChange(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Preset Management */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Presets</h2>
              
              <div className="space-y-4">
                <button
                  onClick={savePreset}
                  className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                >
                  Save Current Preset
                </button>

                {savedPresets.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Saved Presets</h3>
                    {savedPresets.map(preset => (
                      <div key={preset.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{preset.name}</span>
                        <div className="space-x-2">
                          <button
                            onClick={() => loadPreset(preset.id)}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => deletePreset(preset.id)}
                            className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Selected Character Info */}
            {selectedCharacter && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Selected Character</h2>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span> {selectedCharacter.name}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {selectedCharacter.type}
                  </div>
                  <div>
                    <span className="font-medium">Style:</span> {selectedCharacter.style}
                  </div>
                  <div>
                    <span className="font-medium">Culture:</span> {selectedCharacter.culture}
                  </div>
                  <div>
                    <span className="font-medium">Description:</span> {selectedCharacter.description}
                  </div>
                  <div>
                    <span className="font-medium">Animations:</span> {selectedCharacter.animations.length}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalCharacterDemo;