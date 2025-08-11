'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState('getting-started');

  const gettingStartedCode = `// Basic usage
import { CharacterLibrary } from '@character-library/core';

// Create a character instance
const library = new CharacterLibrary();

// Create and mount a character
const character = await library.createCharacter('casual-boy', {
  size: 1,
  theme: 'light',
  autoPlay: true
});

await library.mountCharacter(character.id, '#character-container');`;

  const quickStartCode = `<!-- HTML -->
<div id="my-character"></div>

<!-- JavaScript -->
<script src="https://cdn.character-library.com/latest/character-library.min.js"></script>
<script>
  // Quick start with global instance
  const characterId = await characterUtils.createAndMount(
    'casual-boy',
    '#my-character',
    {
      customizations: {
        skin: '#FDBCB4',
        hair: '#FFD700',
        shirt: '#87CEEB'
      }
    }
  );
</script>`;

  const reactExampleCode = `import React, { useEffect, useRef } from 'react';
import { CharacterLibrary } from '@character-library/react';

function CharacterComponent() {
  const containerRef = useRef(null);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const initCharacter = async () => {
      const library = new CharacterLibrary();
      const char = await library.createCharacter('sporty-girl', {
        size: 0.8,
        theme: 'vibrant'
      });
      
      await library.mountCharacter(char.id, containerRef.current);
      setCharacter(char);
    };

    initCharacter();
  }, []);

  const handleAnimation = (animationName) => {
    if (character) {
      library.playAnimation(character.id, animationName);
    }
  };

  return (
    <div>
      <div ref={containerRef} style={{ width: '200px', height: '300px' }} />
      <div>
        <button onClick={() => handleAnimation('wave')}>Wave</button>
        <button onClick={() => handleAnimation('jump')}>Jump</button>
        <button onClick={() => handleAnimation('dance')}>Dance</button>
      </div>
    </div>
  );
}`;

  const vueExampleCode = `<template>
  <div>
    <div ref="characterContainer" style="width: 200px; height: 300px;"></div>
    <div>
      <button @click="playAnimation('wave')">Wave</button>
      <button @click="playAnimation('jump')">Jump</button>
      <button @click="playAnimation('dance')">Dance</button>
    </div>
  </div>
</template>

<script>
import { CharacterLibrary } from '@character-library/vue';

export default {
  data() {
    return {
      character: null,
      library: null
    };
  },
  mounted() {
    this.initCharacter();
  },
  methods: {
    async initCharacter() {
      this.library = new CharacterLibrary();
      this.character = await this.library.createCharacter('formal-man', {
        size: 0.9,
        theme: 'dark'
      });
      
      await this.library.mountCharacter(
        this.character.id, 
        this.$refs.characterContainer
      );
    },
    playAnimation(animationName) {
      if (this.character) {
        this.library.playAnimation(this.character.id, animationName);
      }
    }
  }
};
</script>`;

  const customizationCode = `// Customize character appearance
library.customizeCharacter(character.id, {
  skin: '#FDBCB4',
  hair: '#8B4513',
  shirt: '#4169E1',
  pants: '#2F4F4F',
  shoes: '#000000'
});

// Change character size
library.setCharacterSize(character.id, 1.5);

// Apply theme
library.applyTheme(character.id, 'vibrant');

// Set animation speed
library.setAnimationSpeed(character.id, 1.5);`;

  const animationCode = `// Play different animations
await library.playAnimation(character.id, 'idle');      // Breathing and subtle movement
await library.playAnimation(character.id, 'walk');      // Walking animation
await library.playAnimation(character.id, 'wave');      // Friendly wave
await library.playAnimation(character.id, 'jump');      // Jumping motion
await library.playAnimation(character.id, 'dance');     // Dancing moves
await library.playAnimation(character.id, 'magic');     // Magic spell casting

// Animation control
library.pauseAnimation(character.id);     // Pause current animation
library.resumeAnimation(character.id);    // Resume paused animation
library.stopAnimation(character.id);      // Stop all animations

// Animation options
library.playAnimation(character.id, 'wave', {
  speed: 1.5,    // 1.5x speed
  loop: true     // Loop the animation
});`;

  const sceneCode = `// Create a scene with multiple characters
const scene = await characterUtils.createScene('my-scene', [
  {
    type: 'casual-boy',
    container: '#scene-container'
  },
  {
    type: 'sporty-girl',
    container: '#scene-container'
  },
  {
    type: 'formal-man',
    container: '#scene-container'
  }
], {
  layout: 'horizontal',  // or 'vertical', 'grid', 'circle'
  autoPlay: true,
  animations: ['idle', 'walk', 'wave']
});

// Scene control
scene.play();     // Play all characters
scene.pause();    // Pause all characters
scene.stop();     // Stop all characters

// Add character to scene
await scene.addCharacter({
  type: 'fantasy-woman',
  container: '#scene-container'
});`;

  const presetsCode = `// Use predefined character presets
const friendlyGuide = await characterUtils.createFromPreset(
  'friendly-guide',
  '#character-container'
);

const energeticCoach = await characterUtils.createFromPreset(
  'energetic-coach',
  '#character-container'
);

const professionalAssistant = await characterUtils.createFromPreset(
  'professional-assistant',
  '#character-container'
);

const magicalCompanion = await characterUtils.createFromPreset(
  'magical-companion',
  '#character-container'
);

// Available presets:
// - friendly-guide: Casual boy with light theme
// - energetic-coach: Sporty girl with vibrant colors
// - professional-assistant: Formal man with dark theme
// - magical-companion: Fantasy woman with mystical theme`;

  const eventsCode = `// Listen to character events
library.on('characterCreated', (data) => {
  console.log('Character created:', data);
});

library.on('animationStarted', (data) => {
  console.log('Animation started:', data.animation);
});

library.on('characterCustomized', (data) => {
  console.log('Character customized:', data.customizations);
});

library.on('themeApplied', (data) => {
  console.log('Theme applied:', data.theme);
});

// Interactive character
const interactiveChar = await characterUtils.createInteractiveCharacter(
  'casual-boy',
  '#interactive-container',
  {
    onClick: (character) => {
      character.play('wave');
    },
    onHover: (character, state) => {
      if (state === 'enter') {
        character.setSize(1.1);
      } else {
        character.setSize(1);
      }
    },
    animationOnInteract: 'jump'
  }
);`;

  const apiMethods = [
    {
      method: 'createCharacter(characterId, options)',
      description: 'Create a new character instance',
      parameters: 'characterId: string, options: Object',
      returns: 'Promise<Character>',
      example: 'library.createCharacter("casual-boy", { size: 1, theme: "light" })'
    },
    {
      method: 'mountCharacter(characterId, container)',
      description: 'Mount character to DOM container',
      parameters: 'characterId: string, container: string|HTMLElement',
      returns: 'Promise<void>',
      example: 'library.mountCharacter(char.id, "#container")'
    },
    {
      method: 'playAnimation(characterId, animationName, options)',
      description: 'Play animation on character',
      parameters: 'characterId: string, animationName: string, options: Object',
      returns: 'Promise<void>',
      example: 'library.playAnimation(char.id, "wave", { speed: 1.5 })'
    },
    {
      method: 'customizeCharacter(characterId, customizations)',
      description: 'Customize character appearance',
      parameters: 'characterId: string, customizations: Object',
      returns: 'void',
      example: 'library.customizeCharacter(char.id, { skin: "#FDBCB4" })'
    },
    {
      method: 'setCharacterSize(characterId, size)',
      description: 'Set character size multiplier',
      parameters: 'characterId: string, size: number',
      returns: 'void',
      example: 'library.setCharacterSize(char.id, 1.5)'
    },
    {
      method: 'destroyCharacter(characterId)',
      description: 'Destroy character instance',
      parameters: 'characterId: string',
      returns: 'void',
      example: 'library.destroyCharacter(char.id)'
    }
  ];

  const availableCharacters = [
    {
      id: 'casual-boy',
      name: 'Casual Boy',
      description: 'Friendly young boy in casual clothing',
      animations: ['idle', 'walk', 'wave', 'jump', 'blink', 'breathing'],
      parts: ['skin', 'hair', 'shirt', 'pants', 'shoes', 'collar', 'pocket']
    },
    {
      id: 'sporty-girl',
      name: 'Sporty Girl',
      description: 'Energetic girl in athletic attire',
      animations: ['idle', 'walk', 'jump', 'dance', 'blink', 'breathing'],
      parts: ['skin', 'hair', 'shirt', 'pants', 'shoes', 'headband', 'stripe', 'wristband', 'eyelash']
    },
    {
      id: 'formal-man',
      name: 'Formal Man',
      description: 'Professional man in business attire',
      animations: ['idle', 'walk', 'wave', 'blink', 'breathing'],
      parts: ['skin', 'hair', 'shirt', 'jacket', 'tie', 'pants', 'shoes', 'pocket-square', 'button']
    },
    {
      id: 'fantasy-woman',
      name: 'Fantasy Woman',
      description: 'Mystical woman in magical clothing',
      animations: ['idle', 'walk', 'dance', 'magic', 'blink', 'breathing'],
      parts: ['skin', 'hair', 'dress', 'shoes', 'tiara', 'gem', 'necklace', 'aura', 'seam', 'pattern', 'eyelash']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Character Library Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive guide to using the Character Library in your projects
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Install the Character Library in your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">NPM</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>npm install @character-library/core</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">CDN</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`<script src="https://cdn.character-library.com/latest/character-library.min.js"></script>`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Basic Usage</CardTitle>
              <CardDescription>Create and display your first character</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{gettingStartedCode}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Get started quickly with the utilities API</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{quickStartCode}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>React Integration</CardTitle>
              <CardDescription>Using Character Library with React</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{reactExampleCode}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vue Integration</CardTitle>
              <CardDescription>Using Character Library with Vue</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{vueExampleCode}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Character Customization</CardTitle>
              <CardDescription>Customize character appearance and behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{customizationCode}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Animation Control</CardTitle>
              <CardDescription>Control character animations</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{animationCode}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scene Management</CardTitle>
              <CardDescription>Create scenes with multiple characters</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{sceneCode}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Presets</CardTitle>
              <CardDescription>Use predefined character configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{presetsCode}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Events & Interactions</CardTitle>
              <CardDescription>Handle character events and user interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{eventsCode}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Core API Methods</CardTitle>
              <CardDescription>Complete reference for CharacterLibrary methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {apiMethods.map((method, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h4 className="font-mono font-semibold text-primary">{method.method}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                    <div className="text-xs space-y-1">
                      <div><strong>Parameters:</strong> {method.parameters}</div>
                      <div><strong>Returns:</strong> {method.returns}</div>
                    </div>
                    <pre className="bg-muted p-2 rounded mt-2 text-xs">
                      <code>{method.example}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Utilities API</CardTitle>
              <CardDescription>Simplified methods for common use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">CharacterLibraryUtils</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Utility class that provides simplified methods for common operations
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`// Quick creation and mounting
const characterId = await characterUtils.createAndMount(
  'casual-boy',
  '#container',
  options
);

// Create interactive character
const interactiveId = await characterUtils.createInteractiveCharacter(
  'sporty-girl',
  '#container',
  {
    onClick: (char) => char.play('wave'),
    onHover: (char, state) => char.setSize(state === 'enter' ? 1.1 : 1)
  }
);

// Use presets
const presetId = await characterUtils.createFromPreset(
  'friendly-guide',
  '#container'
);`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="characters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Characters</CardTitle>
              <CardDescription>Complete list of available character types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {availableCharacters.map((character) => (
                  <Card key={character.id} className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {character.name}
                        <Badge variant="secondary">{character.id}</Badge>
                      </CardTitle>
                      <CardDescription>{character.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Animations</h5>
                          <div className="flex flex-wrap gap-1">
                            {character.animations.map((animation) => (
                              <Badge key={animation} variant="outline" className="text-xs">
                                {animation}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Customizable Parts</h5>
                          <div className="flex flex-wrap gap-1">
                            {character.parts.map((part) => (
                              <Badge key={part} variant="outline" className="text-xs">
                                {part}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Character Properties</CardTitle>
              <CardDescription>Common properties for all characters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Appearance</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Skin tone customization</li>
                    <li>• Hair color and style</li>
                    <li>• Clothing colors and patterns</li>
                    <li>• Accessory customization</li>
                    <li>• Size scaling (0.1x - 3x)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Animation</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Speed control (0.1x - 5x)</li>
                    <li>• Play/pause/stop controls</li>
                    <li>• Loop control</li>
                    <li>• Multiple animation types</li>
                    <li>• Smooth transitions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Themes</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Light theme</li>
                    <li>• Dark theme</li>
                    <li>• Vibrant theme</li>
                    <li>• Seasonal themes</li>
                    <li>• Custom themes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Accessibility</h4>
                  <ul className="text-sm space-y-1">
                    <li>• ARIA labels</li>
                    <li>• Reduced motion support</li>
                    <li>• Keyboard navigation</li>
                    <li>• Screen reader support</li>
                    <li>• High contrast mode</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Customization</CardTitle>
              <CardDescription>Deep customization options and techniques</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Custom Themes</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`// Create custom theme
cssManager.createTheme('my-custom-theme', {
  '--cl-skin-color': '#FFE4B5',
  '--cl-hair-color': '#8B4513',
  '--cl-clothing-color-primary': '#9370DB',
  '--cl-clothing-color-secondary': '#4B0082',
  '--cl-shoes-color': '#2F4F4F'
});

// Apply custom theme
library.applyTheme(character.id, 'my-custom-theme');`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">CSS Variables</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`/* Character CSS Variables */
.character {
  --cl-skin-color: #FDBCB4;
  --cl-hair-color: #8B4513;
  --cl-shirt-color: #4169E1;
  --cl-pants-color: #2F4F4F;
  --cl-shoes-color: #000000;
  --cl-animation-speed: 1;
  --cl-character-size: 1;
}

/* Override specific character */
.my-character {
  --cl-skin-color: #DEB887;
  --cl-hair-color: #FFD700;
  --cl-shirt-color: #FF69B4;
}`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Performance Optimization</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`// Lazy load characters
const loadCharacter = async (characterId) => {
  // Load metadata first
  const metadata = await library.loadCharacterMetadata(characterId);
  
  // Create character only when needed
  const character = await library.createCharacter(characterId, {
    lazyLoad: true
  });
  
  return character;
};

// Batch operations
const characters = await Promise.all([
  library.createCharacter('casual-boy'),
  library.createCharacter('sporty-girl'),
  library.createCharacter('formal-man')
]);

// Memory management
const cleanup = () => {
  characters.forEach(char => {
    library.destroyCharacter(char.id);
  });
};`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Animation System</CardTitle>
              <CardDescription>Advanced animation control and custom animations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Animation Types</h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      <strong>CSS Animations:</strong> Hardware-accelerated, performant for simple animations
                    </li>
                    <li>
                      <strong>Web Animations API:</strong> Programmatic control, complex sequences
                    </li>
                    <li>
                      <strong>Lottie:</strong> Complex vector animations, professional quality
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Custom Animations</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`// Create custom animation
const customAnimation = {
  name: 'custom-dance',
  duration: 2000,
  type: 'web-animations',
  loop: true,
  keyframes: [
    { transform: 'translateY(0) rotate(0deg)' },
    { transform: 'translateY(-20px) rotate(10deg)' },
    { transform: 'translateY(0) rotate(-10deg)' },
    { transform: 'translateY(-10px) rotate(5deg)' }
  ]
};

// Apply custom animation
library.playAnimation(character.id, 'custom-dance', {
  customKeyframes: customAnimation.keyframes
});`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshooting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Issues</CardTitle>
              <CardDescription>Solutions to common problems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Character Not Displaying</h4>
                  <div className="text-sm space-y-1">
                    <p>• Check that the container element exists in the DOM</p>
                    <p>• Ensure the character ID is correct</p>
                    <p>• Verify that the character files are loaded</p>
                    <p>• Check browser console for errors</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Animations Not Working</h4>
                  <div className="text-sm space-y-1">
                    <p>• Check if animations are supported in the browser</p>
                    <p>• Verify animation names are correct</p>
                    <p>• Check if reduced motion is enabled</p>
                    <p>• Ensure CSS files are loaded</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Performance Issues</h4>
                  <div className="text-sm space-y-1">
                    <p>• Limit number of simultaneous animations</p>
                    <p>• Use appropriate character sizes</p>
                    <p>• Enable lazy loading for large scenes</p>
                    <p>• Clean up unused characters</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Customization Not Applied</h4>
                  <div className="text-sm space-y-1">
                    <p>• Check CSS variable names</p>
                    <p>• Ensure color values are valid</p>
                    <p>• Verify theme is applied correctly</p>
                    <p>• Check for CSS specificity issues</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Browser Support</CardTitle>
              <CardDescription>Supported browsers and features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Fully Supported</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Chrome 60+</li>
                    <li>• Firefox 55+</li>
                    <li>• Safari 12+</li>
                    <li>• Edge 79+</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Partial Support</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Safari 11 (no Web Animations API)</li>
                    <li>• IE 11 (basic functionality only)</li>
                    <li>• Mobile browsers (performance may vary)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Help</CardTitle>
              <CardDescription>Resources for support and community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Documentation</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete documentation and API reference
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">GitHub Issues</h4>
                  <p className="text-sm text-muted-foreground">
                    Report bugs and request features
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Community Forum</h4>
                  <p className="text-sm text-muted-foreground">
                    Get help from other developers
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Examples</h4>
                  <p className="text-sm text-muted-foreground">
                    Working examples and demos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}