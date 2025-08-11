import React, { useState, useRef, useEffect } from 'react';
import { Character } from 'character-library';

const CharacterDemo = () => {
  const [selectedCharacter, setSelectedCharacter] = useState('casual-boy');
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [colors, setColors] = useState({
    skin: '#FDBCB4',
    hair: '#8B4513',
    shirt: '#4169E1',
    pants: '#2F4F4F',
    shoes: '#000000'
  });
  
  const characterRef = useRef(null);
  const characterInstance = useRef(null);

  useEffect(() => {
    if (characterRef.current) {
      // Initialize character
      characterInstance.current = new Character({
        id: selectedCharacter,
        container: characterRef.current,
        colors: colors
      });
      
      // Play initial animation
      characterInstance.current.play(currentAnimation);
    }

    return () => {
      if (characterInstance.current) {
        characterInstance.current.destroy();
      }
    };
  }, [selectedCharacter]);

  useEffect(() => {
    if (characterInstance.current) {
      characterInstance.current.setColors(colors);
    }
  }, [colors]);

  useEffect(() => {
    if (characterInstance.current) {
      characterInstance.current.play(currentAnimation);
    }
  }, [currentAnimation]);

  const handleColorChange = (part, color) => {
    setColors(prev => ({ ...prev, [part]: color }));
  };

  const characters = [
    { id: 'casual-boy', name: 'Casual Boy', type: 'boy' },
    { id: 'sporty-girl', name: 'Sporty Girl', type: 'girl' },
    { id: 'formal-man', name: 'Formal Man', type: 'man' },
    { id: 'fantasy-woman', name: 'Fantasy Woman', type: 'woman' }
  ];

  const animations = ['idle', 'walk', 'wave', 'jump', 'dance', 'blink', 'breathing'];

  return (
    <div className="character-demo">
      <h1>Character Library - React Demo</h1>
      
      <div className="controls-panel">
        <div className="character-selector">
          <h3>Select Character</h3>
          <div className="character-buttons">
            {characters.map(char => (
              <button
                key={char.id}
                onClick={() => setSelectedCharacter(char.id)}
                className={selectedCharacter === char.id ? 'active' : ''}
              >
                {char.name}
              </button>
            ))}
          </div>
        </div>

        <div className="animation-controls">
          <h3>Animations</h3>
          <div className="animation-buttons">
            {animations.map(anim => (
              <button
                key={anim}
                onClick={() => setCurrentAnimation(anim)}
                className={currentAnimation === anim ? 'active' : ''}
              >
                {anim}
              </button>
            ))}
          </div>
        </div>

        <div className="color-controls">
          <h3>Colors</h3>
          {Object.entries(colors).map(([part, color]) => (
            <div key={part} className="color-input">
              <label>{part}</label>
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(part, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="character-preview">
        <div ref={characterRef} className="character-container"></div>
      </div>
    </div>
  );
};

export default CharacterDemo;
