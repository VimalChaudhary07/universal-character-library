# Getting Started with Character Library

This guide will help you get up and running with the Character Library in your project.

## Installation

### NPM

```bash
npm install character-library
```

### Yarn

```bash
yarn add character-library
```

### CDN

You can also use the Character Library directly from a CDN:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/character-library/dist/css/character-library.css">

<!-- JavaScript -->
<script src="https://unpkg.com/character-library/dist/js/index.umd.js"></script>
```

## Basic Usage

### HTML/JavaScript

The simplest way to use the Character Library is with plain HTML and JavaScript.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Character Library Demo</title>
    <link rel="stylesheet" href="https://unpkg.com/character-library/dist/css/character-library.css">
</head>
<body>
    <div id="character-container"></div>

    <script src="https://unpkg.com/character-library/dist/js/index.umd.js"></script>
    <script>
        // Create a character instance
        const character = new CharacterLibrary.Character({
            id: 'casual-boy',
            container: '#character-container',
            colors: {
                skin: '#FDBCB4',
                hair: '#8B4513',
                shirt: '#4169E1',
                pants: '#2F4F4F',
                shoes: '#000000'
            }
        });

        // Play an animation
        character.play('idle');
    </script>
</body>
</html>
```

### React

For React applications, you can use the Character Library as a component:

```jsx
import React, { useEffect, useRef } from 'react';
import { Character } from 'character-library';

const CharacterComponent = () => {
    const containerRef = useRef(null);
    const characterRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            characterRef.current = new Character({
                id: 'casual-boy',
                container: containerRef.current,
                colors: {
                    skin: '#FDBCB4',
                    hair: '#8B4513',
                    shirt: '#4169E1',
                    pants: '#2F4F4F',
                    shoes: '#000000'
                }
            });

            characterRef.current.play('idle');
        }

        return () => {
            if (characterRef.current) {
                characterRef.current.destroy();
            }
        };
    }, []);

    return <div ref={containerRef} style={{ width: '300px', height: '300px' }} />;
};

export default CharacterComponent;
```

### Vue

For Vue applications:

```vue
<template>
  <div>
    <div ref="characterContainer" style="width: 300px; height: 300px;"></div>
    <button @click="playAnimation('walk')">Walk</button>
    <button @click="playAnimation('wave')">Wave</button>
  </div>
</template>

<script>
import { Character } from 'character-library';

export default {
  data() {
    return {
      character: null
    };
  },
  mounted() {
    this.character = new Character({
      id: 'casual-boy',
      container: this.$refs.characterContainer,
      colors: {
        skin: '#FDBCB4',
        hair: '#8B4513',
        shirt: '#4169E1',
        pants: '#2F4F4F',
        shoes: '#000000'
      }
    });

    this.character.play('idle');
  },
  beforeUnmount() {
    if (this.character) {
      this.character.destroy();
    }
  },
  methods: {
    playAnimation(animationName) {
      this.character.play(animationName);
    }
  }
};
</script>
```

## Available Characters

The Character Library comes with several built-in characters:

### Casual Boy
- **ID:** `casual-boy`
- **Type:** Boy
- **Style:** Casual
- **Animations:** idle, walk, wave, jump, blink, breathing

### Sporty Girl
- **ID:** `sporty-girl`
- **Type:** Girl
- **Style:** Sporty
- **Animations:** idle, walk, jump, dance, blink, breathing

### Formal Man
- **ID:** `formal-man`
- **Type:** Man
- **Style:** Formal
- **Animations:** idle, walk, wave, blink, breathing

### Fantasy Woman
- **ID:** `fantasy-woman`
- **Type:** Woman
- **Style:** Fantasy
- **Animations:** idle, walk, dance, magic, blink, breathing

## Customization

### Colors

You can customize character colors using the `colors` option:

```javascript
const character = new Character({
    id: 'casual-boy',
    container: '#character-container',
    colors: {
        skin: '#FFDBAC',     // Light skin tone
        hair: '#000000',     // Black hair
        shirt: '#FF0000',    // Red shirt
        pants: '#0000FF',    // Blue pants
        shoes: '#00FF00'     // Green shoes
    }
});
```

You can also change colors dynamically:

```javascript
character.setColors({
    shirt: '#FF69B4',  // Change shirt to pink
    shoes: '#8B4513'   // Change shoes to brown
});
```

### Animations

Each character supports various animations:

```javascript
// Play different animations
character.play('idle');      // Idle animation
character.play('walk');      // Walking animation
character.play('wave');      // Waving animation
character.play('jump');      // Jumping animation
character.play('dance');     // Dancing animation
character.play('blink');     // Blinking animation
character.play('breathing'); // Breathing animation

// Control animation playback
character.pause();           // Pause current animation
character.stop();            // Stop and reset animation

// Play with options
character.play('walk', {
    loop: true,      // Loop the animation
    speed: 1.5       // Play at 1.5x speed
});
```

### Styles

Some characters support multiple style variants:

```javascript
// Change character style
character.setStyle('formal');
character.setStyle('sporty');
character.setStyle('fantasy');
```

## Events

You can listen to various character events:

```javascript
character.on('play', (data) => {
    console.log('Animation started:', data.animationName);
});

character.on('pause', (data) => {
    console.log('Animation paused:', data.animationName);
});

character.on('stop', (data) => {
    console.log('Animation stopped:', data.animationName);
});

character.on('animationEnd', (data) => {
    console.log('Animation completed:', data.animationName);
});

character.on('colorsChanged', (data) => {
    console.log('Colors changed:', data.colors);
});
```

## Best Practices

### Performance

- **Reuse character instances**: Create character instances once and reuse them rather than creating new ones for each use.
- **Clean up properly**: Always call `destroy()` on character instances when they're no longer needed to prevent memory leaks.
- **Use appropriate animation speeds**: Avoid extremely high animation speeds as they may impact performance.

### Accessibility

- **Provide alternative text**: Always include descriptive text for screen readers.
- **Respect motion preferences**: Check for user's motion reduction preferences and disable animations if needed.
- **Provide controls**: Ensure users can pause, stop, or control animations.

```javascript
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    character.play('idle'); // Use subtle animation
} else {
    character.play('dance'); // Use more animated sequence
}
```

### Responsive Design

- **Use relative sizing**: Make character containers responsive using relative units or percentages.
- **Handle resize events**: Update character sizing when the container resizes.

```javascript
// Handle container resizing
const resizeObserver = new ResizeObserver(() => {
    if (characterRef.current) {
        // Update character sizing if needed
    }
});

resizeObserver.observe(containerRef.current);
```

## Troubleshooting

### Common Issues

**Character not displaying**
- Check that the container element exists
- Verify the character ID is correct
- Ensure CSS files are loaded

**Animations not working**
- Verify animation names are correct
- Check if the character supports the requested animation
- Ensure JavaScript files are loaded properly

**Colors not applying**
- Verify color format (hex, rgb, or color names)
- Check that part names are correct
- Ensure the character supports color customization

### Debug Mode

You can enable debug mode to get more information:

```javascript
const character = new Character({
    id: 'casual-boy',
    container: '#character-container',
    debug: true  // Enable debug mode
});
```

### Browser Compatibility

The Character Library supports all modern browsers. For older browsers, include the necessary polyfills:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6%2CPromise%2CObject.assign%2CArray.prototype.includes"></script>
```

## Next Steps

Now that you have the basics down, check out these guides:

- [Advanced Customization](./advanced-customization.md)
- [Animation System](./animation-system.md)
- [Creating Custom Characters](./creating-custom-characters.md)
- [Integration Guide](./integration-guide.md)
