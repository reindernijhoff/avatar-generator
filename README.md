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
});
```

Each avatar gets a random color. The grid fills the entire canvas with no spacing or margins.

## Recommended Sizes

Use square sizes that are powers of 2 for best results:

- `32` - Small (e.g. chat avatars)
- `64` - Medium (e.g. user lists)
- `128` - Large (e.g. profile pages)
- `256` - Extra large (e.g. hero images)
- `512` - Maximum (for high-DPI displays)

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
