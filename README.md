# Avatar Generator

Generative avatar library with multiple themes. Generates unique, deterministic avatars for any ID.

## Demo

[Avatar Generator](https://reindernijhoff.github.io/avatar-generator/)

## Features

- **Deterministic**: Same ID always produces the same avatar
- **Tree-shakeable**: Import only the themes you need
- **Universal**: Works in browser, Node.js, and Bun
- **Five themes**: DigiDoodle, Interference, Plasma, Smile, Pixels

## Installation

```bash
npm install eigen-avatar-generator
```

For server-side rendering, install the appropriate canvas package:

```bash
# Node.js
npm install eigen-avatar-generator canvas

# Bun
bun add eigen-avatar-generator @napi-rs/canvas
```

## Usage

See `/examples/` for complete working examples (vanilla, React, Node.js, Bun).

### Browser (Vanilla JS)

```typescript
import { generateAvatar } from 'eigen-avatar-generator/themes/digidoodle';

const canvas = generateAvatar({ id: 'user@example.com', size: 256 });
document.body.appendChild(canvas);
```

### React

```tsx
import { AvatarDigiDoodle } from 'eigen-avatar-generator/react';

function UserProfile({ userId }) {
  return (
    <AvatarDigiDoodle
      id={userId}
      size={256}
      gridSize={9}
      density={0.5}
      className="rounded-full"
    />
  );
}
```

All themes have React components:

- `AvatarDigiDoodle` — `eigen-avatar-generator/react/digidoodle`
- `AvatarInterference` — `eigen-avatar-generator/react/interference`
- `AvatarPlasma` — `eigen-avatar-generator/react/plasma`
- `AvatarSmile` — `eigen-avatar-generator/react/smile`
- `AvatarPixels` — `eigen-avatar-generator/react/pixels`

React is a peer dependency. Vanilla JS users won't include any React code.

### Node.js (Server-side)

```typescript
import { createCanvas } from 'canvas';
import { generateAvatar } from 'eigen-avatar-generator/themes/digidoodle';
import { canvasToBuffer, setCreateCanvasHandle } from 'eigen-avatar-generator/core';
import fs from 'fs';

setCreateCanvasHandle(createCanvas);

const canvas = generateAvatar({ id: 'user@example.com', size: 256 });
const buffer = canvasToBuffer(canvas, 'image/png');
fs.writeFileSync('avatar.png', buffer);
```

### Bun (Server-side)

```typescript
import { createCanvas } from '@napi-rs/canvas';
import { generateAvatar } from 'eigen-avatar-generator/themes/digidoodle';
import { canvasToBuffer, setCreateCanvasHandle } from 'eigen-avatar-generator/core';
import fs from 'fs';

setCreateCanvasHandle(createCanvas);

const canvas = generateAvatar({ id: 'user@example.com', size: 256 });
const buffer = canvasToBuffer(canvas, 'image/png');
fs.writeFileSync('avatar.png', buffer);
```

### Express API

```typescript
import express from 'express';
import { createCanvas } from 'canvas';
import { generateAvatar } from 'eigen-avatar-generator/themes/digidoodle';
import { canvasToBuffer, setCreateCanvasHandle } from 'eigen-avatar-generator/core';

setCreateCanvasHandle(createCanvas);

const app = express();

app.get('/avatar/:id', (req, res) => {
  const canvas = generateAvatar({ id: req.params.id, size: 256 });
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
import { generateAvatar } from 'eigen-avatar-generator/themes/digidoodle';

const canvas = generateAvatar({
  id: 'user@example.com',
  size: 256,
  gridSize: 9,     // Grid size (default: 9)
  density: 0.5,    // Fill probability 0–1 (default: 0.5)
  symmetry: true,  // Vertical mirror (default: true)
  layers: 1,       // Color layers (default: 1)
  borderMargin: 1, // Border margin (default: 1)
});
```

### Interference

Wave interference patterns with smooth gradients.

```typescript
import { generateAvatar } from 'eigen-avatar-generator/themes/interference';

const canvas = generateAvatar({
  id: 'user@example.com',
  size: 256,
  sources: -1,        // Wave sources, -1 = random 2–5 (default: -1)
  wavelength: 1,      // Wave length (default: 1)
  sourceArea: 10,     // Source bounds (default: 10)
  sourceDistance: 1,   // Distance scale (default: 1)
});
```

### Plasma

Classic plasma effect using combined sinusoids.

```typescript
import { generateAvatar } from 'eigen-avatar-generator/themes/plasma';

const canvas = generateAvatar({
  id: 'user@example.com',
  size: 256,
  timeOffset: -1,   // Time, -1 = random (default: -1)
  scale1: -1,       // Angled scale, -1 = random 2–4 (default: -1)
  scale2: -1,       // Diagonal scale, -1 = random 2–4 (default: -1)
  scale3: -1,       // Concentric scale, -1 = random 15–30 (default: -1)
  weight1: -1,      // Angled weight, -1 = random 0.5–1.5 (default: -1)
  weight2: -1,      // Diagonal weight, -1 = random 0.5–1.5 (default: -1)
  weight3: -1,      // Concentric weight, -1 = random 0.5–1.5 (default: -1)
  paletteSize: 256,  // Color palette size (default: 256)
});
```

### Smile

Cheerful smiley face avatars with random variations.

```typescript
import { generateAvatar } from 'eigen-avatar-generator/themes/smile';

const canvas = generateAvatar({
  id: 'user@example.com',
  size: 256,
});
```

### Pixels

Random colored pixel grid patterns.

```typescript
import { generateAvatar } from 'eigen-avatar-generator/themes/pixels';

const canvas = generateAvatar({
  id: 'user@example.com',
  size: 256,
  gridSize: 9, // Grid size (default: 9)
});
```

## Color Options

All themes support flexible color configuration:

```typescript
// Single color
{ background: '#ffffff', foreground: '#ff0000' }

// Color array (with interpolation)
{ foreground: ['#ff0000', '#00ff00', '#0000ff'], interpolate: true }

// Color sets (picks one set per avatar)
{ foreground: [['#ff0000', '#ff8888'], ['#0000ff', '#8888ff']] }

// Variations
{ foreground: '#ff0000', hueVariation: 15, saturationVariation: 10 }
```

## API Reference

### Core

```typescript
import {
  createCanvas,
  canvasToBuffer,
  canvasToDataURL,
  setCreateCanvasHandle,
  isBrowser,
  SeededRandom,
} from 'eigen-avatar-generator/core';

const random = new SeededRandom('my-seed');
random.random();              // 0–1
random.randomInt(0, 10);      // 0–9
random.randomFloat(0, 1);     // float in range
random.randomChoice([1,2,3]); // pick one
random.randomBoolean();       // true/false
random.randomColor();         // HSL color string
```

### React Components

All React components accept theme-specific options plus these common props:

```tsx
interface BaseAvatarProps {
  id: string;                          // Unique identifier (required)
  size?: number;                       // Canvas size in pixels (default: 256)
  className?: string;                  // CSS class for the canvas element
  style?: React.CSSProperties;         // Inline styles for the canvas element
  onGenerate?: (canvas: HTMLCanvasElement) => void;
}
```

## Tree-shaking

Import only what you need for the smallest bundle:

```typescript
// Single React component
import { AvatarDigiDoodle } from 'eigen-avatar-generator/react/digidoodle';

// Single vanilla theme
import { generateAvatar } from 'eigen-avatar-generator/themes/digidoodle';

// All exports (larger bundle)
import { DigiDoodle } from 'eigen-avatar-generator';
const canvas = DigiDoodle.generateAvatar({ id: 'foo', size: 256 });
```

## Development

```bash
npm install
npm run build
npm run clean
```

## License

MIT © Reinder Nijhoff
