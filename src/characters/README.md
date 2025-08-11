# Character Library Source Files

This directory contains the source files for all characters in the Character Library.

## Folder Structure

```
src/characters/
├── boy/           # Male child characters
├── girl/          # Female child characters
├── man/           # Male adult characters
├── woman/         # Female adult characters
└── shared/        # Shared assets and utilities
```

## Character File Structure

Each character directory follows this structure:

```
[character-name]/
├── svg/                    # SVG source files
│   ├── base.svg           # Base character SVG
│   ├── parts/             # Individual body parts
│   └── animations/        # Animation-specific SVGs
├── meta.json              # Character metadata
├── animations.css         # CSS animations
├── custom-properties.css  # CSS custom properties
└── index.js              # Character export file
```

## Meta JSON Format

Each character includes a `meta.json` file with the following structure:

```json
{
  "id": "character-id",
  "name": "Character Name",
  "type": "boy|girl|man|woman",
  "style": "casual|formal|sporty|fantasy",
  "version": "1.0.0",
  "description": "Character description",
  "tags": ["tag1", "tag2"],
  "parts": {
    "skin": {"color": "#FDBCB4", "selector": ".skin"},
    "hair": {"color": "#8B4513", "selector": ".hair"},
    "shirt": {"color": "#4169E1", "selector": ".shirt"},
    "pants": {"color": "#2F4F4F", "selector": ".pants"},
    "shoes": {"color": "#000000", "selector": ".shoes"}
  },
  "animations": [
    {
      "name": "idle",
      "duration": 2000,
      "type": "css",
      "loop": true,
      "file": "animations/idle.css"
    },
    {
      "name": "walk",
      "duration": 1000,
      "type": "css",
      "loop": true,
      "file": "animations/walk.css"
    }
  ],
  "variants": [
    {
      "name": "casual",
      "file": "svg/casual.svg"
    },
    {
      "name": "formal",
      "file": "svg/formal.svg"
    }
  ],
  "accessibility": {
    "label": "Animated character",
    "role": "img",
    "ariaDescription": "A customizable animated character"
  }
}
```

## Adding New Characters

1. Create a new directory in the appropriate character type folder
2. Add SVG files in the `svg/` subdirectory
3. Create a `meta.json` file with character metadata
4. Add CSS animations in `animations.css`
5. Define custom properties in `custom-properties.css`
6. Export the character in `index.js`

## Best Practices

- Use semantic naming for files and directories
- Keep SVG files optimized and well-structured
- Use CSS custom properties for easy customization
- Provide meaningful metadata for search and filtering
- Include accessibility information
- Follow consistent animation patterns
- Test across different browsers and devices
