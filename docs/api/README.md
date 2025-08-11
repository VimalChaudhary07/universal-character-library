# Character Library API Reference

## Core Classes

### Character

The main class for creating and managing character instances.

#### Constructor

```javascript
new Character(options)
```

**Parameters:**
- `options` (Object): Configuration object
  - `id` (String): Unique identifier for the character
  - `container` (String|HTMLElement): DOM element or selector for the character container
  - `colors` (Object): Color configuration for character parts
  - `style` (String): Character style variant
  - `autoplay` (Boolean): Whether to autoplay the default animation (default: true)

**Example:**
```javascript
const character = new Character({
  id: 'casual-boy',
  container: '#character-container',
  colors: {
    skin: '#FDBCB4',
    hair: '#8B4513',
    shirt: '#4169E1',
    pants: '#2F4F4F',
    shoes: '#000000'
  },
  style: 'casual',
  autoplay: true
});
```

#### Methods

##### `play(animationName, options)`

Plays a specific animation.

**Parameters:**
- `animationName` (String): Name of the animation to play
- `options` (Object): Animation options
  - `loop` (Boolean): Whether to loop the animation
  - `speed` (Number): Animation speed multiplier (default: 1)

**Example:**
```javascript
character.play('walk', { loop: true, speed: 1.5 });
```

##### `pause()`

Pauses the current animation.

**Example:**
```javascript
character.pause();
```

##### `stop()`

Stops the current animation and resets to initial state.

**Example:**
```javascript
character.stop();
```

##### `setColors(colors)`

Updates the character's colors.

**Parameters:**
- `colors` (Object): New color configuration

**Example:**
```javascript
character.setColors({
  skin: '#FFDBAC',
  hair: '#000000',
  shirt: '#FF0000',
  pants: '#0000FF',
  shoes: '#00FF00'
});
```

##### `setStyle(styleName)`

Changes the character's style variant.

**Parameters:**
- `styleName` (String): Name of the style to apply

**Example:**
```javascript
character.setStyle('formal');
```

##### `on(event, callback)`

Adds an event listener.

**Parameters:**
- `event` (String): Event name ('play', 'pause', 'stop', 'animationEnd')
- `callback` (Function): Event handler function

**Example:**
```javascript
character.on('animationEnd', () => {
  console.log('Animation finished');
});
```

##### `off(event, callback)`

Removes an event listener.

**Parameters:**
- `event` (String): Event name
- `callback` (Function): Event handler function to remove

**Example:**
```javascript
character.off('animationEnd', handler);
```

##### `destroy()`

Cleans up the character instance and removes DOM elements.

**Example:**
```javascript
character.destroy();
```

#### Properties

##### `isPlaying` (Boolean, readonly)

Indicates whether an animation is currently playing.

**Example:**
```javascript
if (character.isPlaying) {
  console.log('Animation is playing');
}
```

##### `currentAnimation` (String, readonly)

Name of the currently playing animation.

**Example:**
```javascript
console.log('Current animation:', character.currentAnimation);
```

##### `colors` (Object, readonly)

Current color configuration of the character.

**Example:**
```javascript
console.log('Current colors:', character.colors);
```

## Static Methods

### Character.getAvailableCharacters()

Returns an array of available character IDs.

**Returns:**
- (Array): Array of character ID strings

**Example:**
```javascript
const characters = Character.getAvailableCharacters();
console.log('Available characters:', characters);
```

### Character.getCharacterInfo(characterId)

Returns metadata for a specific character.

**Parameters:**
- `characterId` (String): ID of the character

**Returns:**
- (Object|null): Character metadata object or null if not found

**Example:**
```javascript
const info = Character.getCharacterInfo('casual-boy');
if (info) {
  console.log('Character info:', info);
}
```

### Character.getAvailableAnimations(characterId)

Returns available animations for a specific character.

**Parameters:**
- `characterId` (String): ID of the character

**Returns:**
- (Array): Array of animation objects

**Example:**
```javascript
const animations = Character.getAvailableAnimations('casual-boy');
console.log('Available animations:', animations);
```

## Events

### 'play'

Fired when an animation starts playing.

**Event data:**
- `animationName` (String): Name of the animation that started
- `timestamp` (Number): Event timestamp

**Example:**
```javascript
character.on('play', (data) => {
  console.log('Playing animation:', data.animationName);
});
```

### 'pause'

Fired when an animation is paused.

**Event data:**
- `animationName` (String): Name of the animation that was paused
- `timestamp` (Number): Event timestamp

### 'stop'

Fired when an animation is stopped.

**Event data:**
- `animationName` (String): Name of the animation that was stopped
- `timestamp` (Number): Event timestamp

### 'animationEnd'

Fired when an animation completes (only for non-looping animations).

**Event data:**
- `animationName` (String): Name of the animation that ended
- `timestamp` (Number): Event timestamp

### 'colorsChanged'

Fired when character colors are updated.

**Event data:**
- `colors` (Object): New color configuration
- `timestamp` (Number): Event timestamp

### 'styleChanged'

Fired when character style is changed.

**Event data:**
- `style` (String): New style name
- `timestamp` (Number): Event timestamp

## Error Handling

The Character Library throws specific error types for different scenarios:

### `CharacterNotFoundError`

Thrown when a requested character is not available.

**Example:**
```javascript
try {
  const character = new Character({ id: 'non-existent' });
} catch (error) {
  if (error instanceof CharacterNotFoundError) {
    console.error('Character not found:', error.message);
  }
}
```

### `AnimationNotFoundError`

Thrown when a requested animation is not available for the character.

### `InvalidContainerError`

Thrown when the provided container is invalid or not found.

### `InvalidColorError`

Thrown when an invalid color value is provided.

## Browser Support

The Character Library supports all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

For older browsers, you may need to include appropriate polyfills for:
- `requestAnimationFrame`
- `Promise`
- `Object.assign`
- `Array.prototype.includes`
