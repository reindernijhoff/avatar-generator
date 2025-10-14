# Avatar Generator

Generative avatar library with multiple themes. Generates unique, deterministic avatars for any ID.

## Features

- 🎨 **Deterministic generation**: Same ID = same avatar (always)
- 🌳 **Tree-shakeable**: Load only the themes you use
- 🖥️ **Universal**: Browser and Node.js (server-side rendering)
- ⚡ **Fast**: Synchronous generation, no workers overhead
- 🎭 **Themeable**: Easily extensible with new styles

## Installation

```bash
npm install avatar-generator
```

For server-side rendering (Node.js):
```bash
npm install avatar-generator canvas
```

## Quick Start

See the `/example` project for a working browser example:

```bash
cd example
npm install
npm run dev
```

## Usage

### Browser

```typescript
import { generateAvatar } from 'avatar-generator/themes/digidoodle';

const canvas = generateAvatar({ 
  id: 'user@example.com', 
  size: 256 
});

document.body.appendChild(canvas);
```

### Node.js (Server-side)

```typescript
import { generateAvatar } from 'avatar-generator/themes/digidoodle';
import { canvasToBuffer, initNodeCanvas } from 'avatar-generator/core';
import fs from 'fs';

// Initialize node-canvas (only needed once at app startup)
await initNodeCanvas();

const canvas = generateAvatar({ 
  id: 'user@example.com', 
  size: 256 
});

const buffer = canvasToBuffer(canvas, 'image/png');
fs.writeFileSync('avatar.png', buffer);
```

### Express API Example

```typescript
import express from 'express';
import { generateAvatar } from 'avatar-generator/themes/digidoodle';
import { canvasToBuffer, initNodeCanvas } from 'avatar-generator/core';

const app = express();

// Initialize node-canvas before starting server
await initNodeCanvas();

app.get('/avatar/:id', (req, res) => {
  const canvas = generateAvatar({ 
    id: req.params.id, 
    size: 256 
  });
  
  const buffer = canvasToBuffer(canvas, 'image/png');
  res.contentType('image/png');
  res.send(buffer);
});

app.listen(3000);
```

## Themes

### DigiDoodle

Simple symmetric pixel-art avatars inspired by [DigiDoodles](https://turtletoy.net/turtle/2d25b9a16d).

```typescript
import { generateAvatar } from 'avatar-generator/themes/digidoodle';

const canvas = generateAvatar({
  id: 'user@example.com',
  size: 256,
  gridSize: 8,        // Number of pixels per side (default: 8)
  density: 0.5,       // Pixel fill probability 0-1 (default: 0.5)
  symmetry: true,     // Vertical mirror symmetry (default: true)
  layers: 2,          // Number of color layers (default: 1)
  
  // Color options (optional)
  background: '#ffffff',                                // Single color
  foreground: '#ff0000',                                // Single color
  // Or use color arrays:
  foreground: ['#ff0000', '#00ff00', '#0000ff'],        // Picks random
  // Or arrays of color sets:
  foreground: [['#ff0000', '#ff8888'], ['#0000ff', '#8888ff']],  // Picks one set
  interpolate: true,                                    // Interpolate between colors (default: true)
  
  // Random color variations
  hueVariation: 15,                // Degrees (0-360)
  saturationVariation: 10,         // Percent (0-100)
  lightnessVariation: 10,          // Percent (0-100)
});
```

The grid fills the entire canvas with no spacing or margins. When using multiple layers, each layer gets a different color from the foreground palette and is drawn on top of the previous layers.

## Recommended Sizes

Use square sizes that are powers of 2 for best results:

- `32` - Small (e.g. chat avatars)
- `64` - Medium (e.g. user lists)
- `128` - Large (e.g. profile pages)
- `256` - Extra large (e.g. hero images)
- `512` - Maximum (for high-DPI displays)

## Color System

All themes support a flexible color system. Colors can be specified in multiple ways:

### Simple Colors

```typescript
{
  background: '#ffffff',
  foreground: '#ff0000',
}
```

### Color Arrays

```typescript
{
  // Pick random color from list
  foreground: ['#ff0000', '#00ff00', '#0000ff'],
  interpolate: false,  // Pick exact colors
}

// Or interpolate between colors
{
  foreground: ['#ff0000', '#ff8800', '#ffff00'],
  interpolate: true,   // Blend between adjacent colors (default)
}
```

### Color Sets (for multi-color themes)

```typescript
{
  // Array of color sets - picks one set randomly
  foreground: [
    ['#ff0000', '#ff8888'],  // Red set (primary + accent)
    ['#0000ff', '#8888ff'],  // Blue set
    ['#00ff00', '#88ff88'],  // Green set
  ],
}
```

Using `pickColors()` with color sets will pick colors from the selected set, with interpolation support.

### Random Variations

Add natural variation to colors:

```typescript
{
  foreground: '#ff0000',
  hueVariation: 15,           // ±15 degrees
  saturationVariation: 10,    // ±10%
  lightnessVariation: 10,     // ±10%
}
```

### Helper Functions

Create custom themes easily:

```typescript
import { pickBackgroundColor, pickForegroundColor, pickColors } from 'avatar-generator/core';

// In your theme renderer
const bgColor = pickBackgroundColor(options, random);
const fgColor = pickForegroundColor(options, random);

// Pick multiple colors (e.g., for multi-color themes)
const colors = pickColors(options, random, 3);  // Pick 3 from foreground
const [primary, accent, tertiary] = colors;

// Or pick from background
const bgColors = pickColors(options, random, 2, 'background');
```

## API Reference

### Core

```typescript
// Canvas utilities
import { 
  createCanvas,
  canvasToBuffer,
  canvasToDataURL,
  isNode,
  isBrowser 
} from 'avatar-generator/core';

// Random utilities
import { SeededRandom } from 'avatar-generator/core';

const random = new SeededRandom('my-seed');
random.random();              // 0-1
random.randomInt(0, 10);      // 0-9
random.randomFloat(0, 1);     // float 0-1
random.randomChoice([1,2,3]); // pick one
random.randomBoolean();       // true/false
random.randomColor();         // HSL color string
```

## Tree-shaking

Import only what you need for smallest bundle:

```typescript
// ✅ Good: Tree-shakeable
import { generateAvatar } from 'avatar-generator/themes/digidoodle';

// ⚠️ Also OK, but loads all exports
import { DigiDoodle } from 'avatar-generator';
const canvas = DigiDoodle.generateAvatar({ id: 'foo', size: 256 });
```

## Development

```bash
# Install dependencies (root)
npm install

# Build package
npm run build

# Clean build artifacts
npm run clean

# Run example project
cd example
npm install
npm run dev
```

The example project in `/example` is a separate Vite project that uses the package via relative imports. This demonstrates how the library works in practice.

## Future Themes

Possible future extensions:

- **Animals**: Cute animal avatars
- **Robots**: Geometric robot faces
- **Geometric**: Abstract geometric patterns
- **Monsters**: Colorful monster avatars

## License

MIT © Reinder Nijhoff
