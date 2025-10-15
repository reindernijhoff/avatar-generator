# Avatar Generator

Generative avatar library with multiple themes. Generates unique, deterministic avatars for any ID.

## Demo

- [Avatar Generator](https://reindernijhoff.github.io/avatar-generator/).

This is a build from the repository's example/ directory.

## Features

- **Deterministic generation**: Same ID = same avatar (always)
- **Tree-shakeable**: Load only the themes you use
- **Universal**: Browser and Node.js (server-side rendering)
- **Themeable**: Easily extensible with new styles

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

Symmetric pixel-art patterns inspired by [DigiDoodles](https://turtletoy.net/turtle/2d25b9a16d).

```typescript
import { generateAvatar } from 'avatar-generator/themes/digidoodle';

const canvas = generateAvatar({
  id: 'user@example.com',
  size: 256,
  gridSize: 8,    // Grid size (default: 8)
  density: 0.5,   // Fill probability 0-1 (default: 0.5)
  symmetry: true, // Vertical mirror (default: true)
  layers: 1,      // Color layers (default: 1)
});
```

### Interference

Wave interference patterns with smooth gradients.

```typescript
import { generateAvatar } from 'avatar-generator/themes/interference';

const canvas = generateAvatar({
  id: 'user@example.com',
  size: 256,
  sources: -1,         // Wave sources: -1 = random 2-5 (default: -1)
  wavelength: 1,       // Wave length (default: 1)
  sourceArea: 10,      // Source bounds (default: 10)
  sourceDistance: 1,   // Distance scale (default: 1)
});
```

### Plasma

Classic plasma effect using combined sinusoids.

```typescript
import { generateAvatar } from 'avatar-generator/themes/plasma';

const canvas = generateAvatar({
  id: 'user@example.com',
  size: 256,
  timeOffset: -1,    // Time: -1 = random (default: -1)
  scale1: -1,        // Angled scale: -1 = random 2-4 (default: -1)
  scale2: -1,        // Diagonal scale: -1 = random 2-4 (default: -1)
  scale3: -1,        // Concentric scale: -1 = random 15-30 (default: -1)
  weight1: -1,       // Angled weight: -1 = random 0.5-1.5 (default: -1)
  weight2: -1,       // Diagonal weight: -1 = random 0.5-1.5 (default: -1)
  weight3: -1,       // Concentric weight: -1 = random 0.5-1.5 (default: -1)
  paletteSize: 256,  // Color palette size (default: 256)
});
```

## Recommended Sizes

Use square sizes that are powers of 2 for best results:

- `32` - Small (e.g. chat avatars)
- `64` - Medium (e.g. user lists)
- `128` - Large (e.g. profile pages)
- `256` - Extra large (e.g. hero images)
- `512` - Maximum (for high-DPI displays)

## Color Options

All themes support flexible colors:

```typescript
// Single colors
{ background: '#ffffff', foreground: '#ff0000' }

// Color arrays (with interpolation)
{ foreground: ['#ff0000', '#00ff00', '#0000ff'], interpolate: true }

// Color sets (picks one set)
{ foreground: [['#ff0000', '#ff8888'], ['#0000ff', '#8888ff']] }

// Variations
{ foreground: '#ff0000', hueVariation: 15, saturationVariation: 10 }
```

**Helper functions** for custom themes:

```typescript
import { pickBackgroundColor, pickColors } from 'avatar-generator/core';

const bgColor = pickBackgroundColor(options, random);
const [primary, accent] = pickColors(options, random, 2);
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
