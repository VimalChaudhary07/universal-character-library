import React, { useState, useRef, useEffect } from 'react';
import { CharacterLibrary, CharacterLibraryUtils } from 'character-library';

const AdvancedCharacterDemo = () => {
  // State for character management
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [scene, setScene] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('light');
  
  // State for customization
  const [customization, setCustomization] = useState({
    skin: '#FDBCB4',
    hair: '#8B4513',
    shirt: '#4169E1',
    pants: '#2F4F4F',
    shoes: '#000000'
  });
  
  // State for animation control
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [characterSize, setCharacterSize] = useState(1);
  
  // Refs
  const libraryRef = useRef(null);
  const utilsRef = useRef(null);
  const sceneContainerRef = useRef(null);
  const characterRefs = useRef({});
  
  // Available character types
  const characterTypes = [
    { id: 'casual-boy', name: 'Casual Boy', type: 'boy' },
    { id: 'sporty-girl', name: 'Sporty Girl', type: 'girl' },
    { id: 'formal-man', name: 'Formal Man', type: 'man' },
    { id: 'fantasy-woman', name: 'Fantasy Woman', type: 'woman' }
  ];
  
  // Available animations
  const animations = ['idle', 'walk', 'wave', 'jump', 'dance', 'blink', 'breathing', 'magic'];
  
  // Available themes
  const themes = ['light', 'dark', 'vibrant', 'winter', 'spring', 'summer', 'autumn'];
  
  // Initialize library
  useEffect(() => {
    libraryRef.current = new CharacterLibrary();
    utilsRef.current = new CharacterLibraryUtils();
    
    return () => {
      // Cleanup all characters
      characters.forEach(char => {
        if (char.instance) {
          libraryRef.current.destroyCharacter(char.instance.id);
        }
      });
      
      if (scene) {
        scene.destroy();
      }
    };
  }, []);
  
  // Create a new character
  const createCharacter = async (characterType) => {
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
      const instance = await libraryRef.current.createCharacter(characterType, {
        size: characterSize,
        theme: currentTheme,
        customizations: customization
      });
      
      character.instance = instance;
      
      // Mount character (in a real app, you'd have actual DOM elements)
      await libraryRef.current.mountCharacter(instance.id, `#${containerId}`);
      
      // Start with idle animation
      await libraryRef.current.playAnimation(instance.id, 'idle');
      
      setCharacters(prev => [...prev, character]);
      setSelectedCharacter(character);
      
    } catch (error) {
      console.error('Failed to create character:', error);
    }
  };
  
  // Remove a character
  const removeCharacter = (characterId) => {
    const character = characters.find(c => c.id === characterId);
    if (character && character.instance) {
      libraryRef.current.destroyCharacter(character.instance.id);
    }
    
    setCharacters(prev => prev.filter(c => c.id !== characterId));
    if (selectedCharacter?.id === characterId) {
      setSelectedCharacter(null);
    }
  };
  
  // Play animation on selected character
  const playAnimation = async (animationName) => {
    if (selectedCharacter && selectedCharacter.instance) {
      try {
        await libraryRef.current.playAnimation(
          selectedCharacter.instance.id, 
          animationName,
          { speed: animationSpeed }
        );
        
        setCharacters(prev => prev.map(char => 
          char.id === selectedCharacter.id 
            ? { ...char, currentAnimation: animationName, isPlaying: true }
            : char
        ));
        
        setSelectedCharacter(prev => ({ ...prev, currentAnimation: animationName, isPlaying: true }));
        
      } catch (error) {
        console.error('Failed to play animation:', error);
      }
    }
  };
  
  // Pause animation on selected character
  const pauseAnimation = () => {
    if (selectedCharacter && selectedCharacter.instance) {
      libraryRef.current.pauseAnimation(selectedCharacter.instance.id);
      
      setCharacters(prev => prev.map(char => 
        char.id === selectedCharacter.id 
          ? { ...char, isPlaying: false }
          : char
      ));
      
      setSelectedCharacter(prev => ({ ...prev, isPlaying: false }));
    }
  };
  
  // Resume animation on selected character
  const resumeAnimation = () => {
    if (selectedCharacter && selectedCharacter.instance) {
      libraryRef.current.resumeAnimation(selectedCharacter.instance.id);
      
      setCharacters(prev => prev.map(char => 
        char.id === selectedCharacter.id 
          ? { ...char, isPlaying: true }
          : char
      ));
      
      setSelectedCharacter(prev => ({ ...prev, isPlaying: true }));
    }
  };
  
  // Update customization
  const updateCustomization = (part, color) => {
    const newCustomization = { ...customization, [part]: color };
    setCustomization(newCustomization);
    
    if (selectedCharacter && selectedCharacter.instance) {
      libraryRef.current.customizeCharacter(selectedCharacter.instance.id, newCustomization);
    }
  };
  
  // Update character size
  const updateCharacterSize = (size) => {
    setCharacterSize(size);
    
    if (selectedCharacter && selectedCharacter.instance) {
      libraryRef.current.setCharacterSize(selectedCharacter.instance.id, size);
    }
  };
  
  // Update animation speed
  const updateAnimationSpeed = (speed) => {
    setAnimationSpeed(speed);
    
    if (selectedCharacter && selectedCharacter.instance) {
      libraryRef.current.setAnimationSpeed(selectedCharacter.instance.id, speed);
    }
  };
  
  // Apply theme
  const applyTheme = (theme) => {
    setCurrentTheme(theme);
    
    if (selectedCharacter && selectedCharacter.instance) {
      libraryRef.current.applyTheme(selectedCharacter.instance.id, theme);
    }
  };
  
  // Create a scene
  const createScene = async (layout = 'horizontal') => {
    if (scene) {
      scene.destroy();
    }
    
    try {
      const newScene = await utilsRef.current.createScene('advanced-demo', [
        { type: 'casual-boy', container: sceneContainerRef.current },
        { type: 'sporty-girl', container: sceneContainerRef.current },
        { type: 'formal-man', container: sceneContainerRef.current },
        { type: 'fantasy-woman', container: sceneContainerRef.current }
      ], {
        layout: layout,
        autoPlay: true,
        animations: ['idle', 'walk', 'wave', 'dance']
      });
      
      setScene(newScene);
      
    } catch (error) {
      console.error('Failed to create scene:', error);
    }
  };
  
  // Create character from preset
  const createFromPreset = async (preset) => {
    try {
      const containerId = `preset-${Date.now()}`;
      const characterId = await utilsRef.current.createFromPreset(preset, `#${containerId}`);
      
      const character = {
        id: containerId,
        type: preset,
        instance: { id: characterId },
        currentAnimation: 'idle',
        isPlaying: true,
        isPreset: true
      };
      
      setCharacters(prev => [...prev, character]);
      setSelectedCharacter(character);
      
    } catch (error) {
      console.error('Failed to create preset character:', error);
    }
  };
  
  // Randomize colors
  const randomizeColors = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const newCustomization = {};
    
    Object.keys(customization).forEach(key => {
      newCustomization[key] = colors[Math.floor(Math.random() * colors.length)];
    });
    
    setCustomization(newCustomization);
    
    if (selectedCharacter && selectedCharacter.instance) {
      libraryRef.current.customizeCharacter(selectedCharacter.instance.id, newCustomization);
    }
  };
  
  return (
    <div className="advanced-character-demo">
      <div className="demo-header">
        <h1>🚀 Advanced Character Library Demo</h1>
        <p>Explore advanced features including scenes, interactions, and customizations</p>
      </div>
      
      <div className="demo-grid">
        {/* Character Creation Panel */}
        <div className="panel character-creation">
          <h2>🎭 Character Creation</h2>
          
          <div className="character-types">
            <h3>Character Types</h3>
            <div className="type-buttons">
              {characterTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => createCharacter(type.id)}
                  className="type-btn"
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="preset-characters">
            <h3>Quick Presets</h3>
            <div className="preset-buttons">
              <button onClick={() => createFromPreset('friendly-guide')} className="preset-btn">
                👦 Friendly Guide
              </button>
              <button onClick={() => createFromPreset('energetic-coach')} className="preset-btn">
                👧 Energetic Coach
              </button>
              <button onClick={() => createFromPreset('professional-assistant')} className="preset-btn">
                👨 Professional Assistant
              </button>
              <button onClick={() => createFromPreset('magical-companion')} className="preset-btn">
                👩 Magical Companion
              </button>
            </div>
          </div>
        </div>
        
        {/* Character List */}
        <div className="panel character-list">
          <h2>👥 Active Characters ({characters.length})</h2>
          
          <div className="characters-grid">
            {characters.map(character => (
              <div
                key={character.id}
                className={`character-card ${selectedCharacter?.id === character.id ? 'selected' : ''}`}
                onClick={() => setSelectedCharacter(character)}
              >
                <div className="character-info">
                  <div className="character-name">
                    {characterTypes.find(t => t.id === character.type)?.name || character.type}
                  </div>
                  <div className="character-status">
                    <span className={`status-dot ${character.isPlaying ? 'playing' : 'paused'}`}></span>
                    {character.currentAnimation}
                  </div>
                </div>
                <div className="character-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCharacter(character.id);
                    }}
                    className="remove-btn"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {characters.length === 0 && (
            <div className="no-characters">
              <p>No characters created yet. Create one to get started!</p>
            </div>
          )}
        </div>
        
        {/* Animation Control */}
        <div className="panel animation-control">
          <h2>🎬 Animation Control</h2>
          
          {selectedCharacter ? (
            <div className="animation-controls">
              <div className="current-character">
                <h3>Selected: {characterTypes.find(t => t.id === selectedCharacter.type)?.name}</h3>
                <div className="status">
                  <span className={`status-dot ${selectedCharacter.isPlaying ? 'playing' : 'paused'}`}></span>
                  {selectedCharacter.currentAnimation}
                </div>
              </div>
              
              <div className="animation-buttons">
                <h4>Animations</h4>
                <div className="buttons-grid">
                  {animations.map(anim => (
                    <button
                      key={anim}
                      onClick={() => playAnimation(anim)}
                      className={`anim-btn ${selectedCharacter.currentAnimation === anim ? 'active' : ''}`}
                    >
                      {anim}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="playback-controls">
                <h4>Playback</h4>
                <div className="playback-buttons">
                  <button
                    onClick={selectedCharacter.isPlaying ? pauseAnimation : resumeAnimation}
                    className="playback-btn"
                  >
                    {selectedCharacter.isPlaying ? '⏸️ Pause' : '▶️ Play'}
                  </button>
                  <button onClick={() => playAnimation('idle')} className="playback-btn">
                    🔄 Reset
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a character to control its animations</p>
            </div>
          )}
        </div>
        
        {/* Customization Panel */}
        <div className="panel customization">
          <h2>🎨 Customization</h2>
          
          <div className="customization-controls">
            <div className="color-controls">
              <h4>Colors</h4>
              {Object.entries(customization).map(([part, color]) => (
                <div key={part} className="color-input">
                  <label>{part}</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateCustomization(part, e.target.value)}
                  />
                </div>
              ))}
            </div>
            
            <div className="slider-controls">
              <div className="slider-control">
                <label>Size: {characterSize.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={characterSize}
                  onChange={(e) => updateCharacterSize(parseFloat(e.target.value))}
                />
              </div>
              
              <div className="slider-control">
                <label>Speed: {animationSpeed.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={animationSpeed}
                  onChange={(e) => updateAnimationSpeed(parseFloat(e.target.value))}
                />
              </div>
            </div>
            
            <div className="theme-controls">
              <h4>Themes</h4>
              <div className="theme-buttons">
                {themes.map(theme => (
                  <button
                    key={theme}
                    onClick={() => applyTheme(theme)}
                    className={`theme-btn ${currentTheme === theme ? 'active' : ''}`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="action-buttons">
              <button onClick={randomizeColors} className="action-btn randomize">
                🎲 Random Colors
              </button>
              <button 
                onClick={() => {
                  setCustomization({
                    skin: '#FDBCB4',
                    hair: '#8B4513',
                    shirt: '#4169E1',
                    pants: '#2F4F4F',
                    shoes: '#000000'
                  });
                  setCharacterSize(1);
                  setAnimationSpeed(1);
                  setCurrentTheme('light');
                }} 
                className="action-btn reset"
              >
                🔄 Reset All
              </button>
            </div>
          </div>
        </div>
        
        {/* Scene Management */}
        <div className="panel scene-management">
          <h2>🎬 Scene Management</h2>
          
          <div className="scene-controls">
            <div className="scene-creation">
              <h4>Create Scene</h4>
              <div className="layout-buttons">
                <button onClick={() => createScene('horizontal')} className="layout-btn">
                  ↔️ Horizontal
                </button>
                <button onClick={() => createScene('vertical')} className="layout-btn">
                  ↕️ Vertical
                </button>
                <button onClick={() => createScene('grid')} className="layout-btn">
                  ⊞ Grid
                </button>
                <button onClick={() => createScene('circle')} className="layout-btn">
                  ⭕ Circle
                </button>
              </div>
            </div>
            
            {scene && (
              <div className="scene-actions">
                <h4>Scene Actions</h4>
                <div className="scene-buttons">
                  <button onClick={() => scene.play()} className="scene-btn">
                    ▶️ Play All
                  </button>
                  <button onClick={() => scene.pause()} className="scene-btn">
                    ⏸️ Pause All
                  </button>
                  <button onClick={() => scene.stop()} className="scene-btn">
                    ⏹️ Stop All
                  </button>
                  <button onClick={() => scene.destroy()} className="scene-btn destroy">
                    🗑️ Destroy
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="scene-preview">
            <h4>Scene Preview</h4>
            <div 
              ref={sceneContainerRef} 
              className="scene-container"
            >
              {scene ? 'Scene loaded' : 'No scene created'}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default AdvancedCharacterDemo;