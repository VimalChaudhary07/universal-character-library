# Character Library Documentation

Welcome to the Character Library documentation! This comprehensive guide will help you understand, use, and extend the Character Library in your projects.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Guides](#guides)
- [Examples](#examples)
- [Contributing](#contributing)

## Overview

The Character Library is a collection of customizable, animated 2D characters designed for easy integration into web projects. Built with SVG, CSS, and JavaScript, it provides a flexible and performant solution for adding interactive characters to your applications.

### Key Features

- **Customizable Characters**: Change colors, styles, and appearance
- **Rich Animations**: Pre-built animations including idle, walk, wave, jump, dance, blink, and breathing
- **Multiple Formats**: SVG-based with CSS, Web Animations API, and Lottie support
- **Framework Agnostic**: Works with plain HTML/JS, React, Vue, and other frameworks
- **Accessible**: Built with accessibility in mind
- **Performance Optimized**: Efficient rendering and animation system

### Architecture

The library follows a modular architecture:

```
Character Library/
├── src/characters/          # Source character files
├── src/lib/                # Core library code
├── dist/                   # Built distribution files
├── examples/               # Usage examples
├── docs/                   # Documentation
└── scripts/                # Build and automation scripts
```

## Quick Start

### Installation

```bash
npm install character-library
```

### Basic Usage

```html
<div id="character-container"></div>

<script>
import { Character } from 'character-library';

const character = new Character({
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

character.play('idle');
</script>
```

## API Reference

### Core Classes

- [Character API](./api/README.md) - Complete API reference for the Character class
- [Animation System](./guides/animation-system.md) - Understanding the animation system
- [Event System](./guides/event-system.md) - Working with events

### Static Methods

- `Character.getAvailableCharacters()` - Get list of available characters
- `Character.getCharacterInfo(id)` - Get character metadata
- `Character.getAvailableAnimations(id)` - Get character animations

## Guides

### Getting Started

- [Getting Started](./guides/getting-started.md) - Basic setup and usage
- [Installation](./guides/installation.md) - Installation instructions for different environments

### Customization

- [Color Customization](./guides/color-customization.md) - Customizing character colors
- [Style Variants](./guides/style-variants.md) - Working with different character styles
- [Advanced Customization](./guides/advanced-customization.md) - Advanced customization techniques

### Animation

- [Animation System](./guides/animation-system.md) - Understanding animations
- [Custom Animations](./guides/custom-animations.md) - Creating custom animations
- [Animation Controls](./guides/animation-controls.md) - Controlling animations

### Integration

- [React Integration](./guides/react-integration.md) - Using with React
- [Vue Integration](./guides/vue-integration.md) - Using with Vue
- [Framework Integration](./guides/framework-integration.md) - Integration with other frameworks

### Advanced Topics

- [Performance Optimization](./guides/performance.md) - Performance best practices
- [Accessibility](./guides/accessibility.md) - Accessibility guidelines
- [Creating Custom Characters](./guides/creating-custom-characters.md) - Building custom characters

## Examples

### Basic Examples

- [HTML/JavaScript Example](../examples/html/basic-usage.html) - Plain HTML/JS usage
- [React Example](../examples/react/CharacterDemo.jsx) - React component example
- [Vue Example](../examples/vue/CharacterDemo.vue) - Vue component example

### Advanced Examples

- [Character Customizer](../examples/html/customizer.html) - Interactive character customizer
- [Animation Showcase](../examples/html/animations.html) - Animation demonstrations
- [Multi-character Scene](../examples/html/scene.html) - Multiple characters in one scene

## File Structure

### Source Files

```
src/
├── characters/               # Character source files
│   ├── boy/                 # Male child characters
│   ├── girl/                # Female child characters
│   ├── man/                 # Male adult characters
│   ├── woman/               # Female adult characters
│   └── shared/              # Shared assets
├── lib/                     # Core library code
│   ├── Character.js         # Main Character class
│   ├── AnimationManager.js  # Animation system
│   ├── ColorManager.js      # Color management
│   └── utils/              # Utility functions
└── index.js                # Main entry point
```

### Distribution Files

```
dist/
├── css/                    # CSS files
│   ├── character-library.css        # Main CSS bundle
│   └── character-library.min.css  # Minified CSS
├── js/                     # JavaScript files
│   ├── index.js                    # CommonJS bundle
│   ├── index.esm.js               // ES modules bundle
│   ├── index.umd.js               // UMD bundle
│   └── index.min.js              // Minified UMD bundle
├── svg/                    # SVG assets
│   ├── characters/                 # Character SVG files
│   └── icons/                     // Icon files
└── types/                  # TypeScript definitions
    └── index.d.ts               // Type definitions
```

### Examples

```
examples/
├── html/                   # HTML/JavaScript examples
│   ├── basic-usage.html           # Basic usage example
│   ├── customizer.html            # Character customizer
│   ├── animations.html            # Animation showcase
│   └── scene.html                 // Multi-character scene
├── react/                  # React examples
│   ├── CharacterDemo.jsx          // React component demo
│   ├── CharacterCustomizer.jsx   // React customizer
│   └── CharacterScene.jsx         // React scene example
└── vue/                    # Vue examples
    ├── CharacterDemo.vue          // Vue component demo
    ├── CharacterCustomizer.vue   // Vue customizer
    └── CharacterScene.vue         // Vue scene example
```

### Documentation

```
docs/
├── api/                    # API reference
│   └── README.md                   # Complete API reference
├── guides/                 # User guides
│   ├── getting-started.md         # Getting started guide
│   ├── installation.md           # Installation guide
│   ├── color-customization.md    # Color customization
│   ├── style-variants.md         # Style variants
│   ├── animation-system.md       # Animation system
│   ├── custom-animations.md      # Custom animations
│   ├── animation-controls.md     # Animation controls
│   ├── react-integration.md      # React integration
│   ├── vue-integration.md        // Vue integration
│   ├── framework-integration.md  // Framework integration
│   ├── performance.md            // Performance optimization
│   ├── accessibility.md          // Accessibility guidelines
│   └── creating-custom-characters.md  // Creating custom characters
└── examples/               # Example documentation
    ├── overview.md               // Examples overview
    ├── html-examples.md          // HTML examples
    ├── react-examples.md         // React examples
    └── vue-examples.md           // Vue examples
```

## Contributing

We welcome contributions to the Character Library! Please see our [Contributing Guide](./contributing.md) for details on how to get started.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/character-library.git
cd character-library

# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Run tests
npm test
```

### Reporting Issues

If you find a bug or have a feature request, please [create an issue](https://github.com/your-username/character-library/issues) on GitHub.

### Pull Requests

When submitting pull requests, please:

1. Follow the existing code style
2. Add tests for new functionality
3. Update documentation as needed
4. Ensure all tests pass

## License

The Character Library is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

## Support

- [Documentation](./README.md) - Complete documentation
- [Issues](https://github.com/your-username/character-library/issues) - Bug reports and feature requests
- [Discussions](https://github.com/your-username/character-library/discussions) - Community discussions

## Changelog

See the [CHANGELOG.md](../CHANGELOG.md) file for details about changes in each version.
