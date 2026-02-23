# Core Utilities

Shared utilities used by all themes: canvas abstraction, seeded random, and color system.

## Canvas

```typescript
import { createCanvas, canvasToBuffer, canvasToDataURL, setCreateCanvasHandle, isBrowser } from './canvas.js';
```

- **`createCanvas(size)`** — Creates a square canvas (browser or server-side)
- **`canvasToBuffer(canvas, mimeType?)`** — Convert canvas to Buffer (server-side)
- **`canvasToDataURL(canvas, mimeType?)`** — Convert canvas to data URL
- **`setCreateCanvasHandle(fn)`** — Register a server-side canvas factory (`canvas` or `@napi-rs/canvas`)
- **`isBrowser()`** — Returns `true` in browser environments

## SeededRandom

Deterministic random number generator using MurmurHash3 + LCG.

```typescript
import { SeededRandom } from './seededRandom.js';

const random = new SeededRandom('my-seed');
random.random();              // 0–1
random.randomInt(0, 10);      // 0–9
random.randomFloat(0, 1);     // float in range
random.randomChoice([1,2,3]); // pick one
random.randomBoolean(0.5);    // true/false
random.randomColor();         // HSL color string
random.reset();               // reset to initial seed
```

## Color System

### Types

```typescript
type ColorValue = string | [number, number, number];
type ColorPalette = ColorValue | ColorValue[] | ColorValue[][];

interface ColorOptions {
  background?: ColorPalette;
  foreground?: ColorPalette;
  interpolate?: boolean;          // default: true
  hueVariation?: number;          // 0–360
  saturationVariation?: number;   // 0–100
  lightnessVariation?: number;    // 0–100
}
```

### Functions

- **`pickBackgroundColor(options, random)`** — Pick background color (defaults to white)
- **`pickForegroundColor(options, random)`** — Pick foreground color (defaults to random vibrant)
- **`pickColors(options, random, count, source?)`** — Pick multiple colors from a palette
- **`colorToString(color)`** — Convert Color to CSS `rgb()` string
- **`parseColor(value)`** — Parse hex string or RGB array to Color
- **`varyColor(color, random, options)`** — Apply hue/saturation/lightness variations
- **`interpolateColors(color1, color2, t)`** — Lerp between two colors
- **`rgbToHsl(color)`** / **`hslToRgb(h, s, l)`** — Color space conversion

### Palette Behavior

`pickColors` behavior depends on the palette type:

- **Single color** — generates contrasting hue variations
- **Color array** — picks from array, with interpolation if enabled
- **Array of arrays** — picks one array, then samples colors from it

### Color Examples

```typescript
// Single color
{ foreground: '#ff0000' }

// Array (pick or interpolate)
{ foreground: ['#ff0000', '#00ff00', '#0000ff'], interpolate: false }

// Gradient interpolation
{ foreground: ['#ff0000', '#ffff00'], interpolate: true }

// Color sets
{ foreground: [['#ff0000', '#ff8888'], ['#0000ff', '#8888ff']] }

// Variations
{ foreground: '#ff0000', hueVariation: 15, saturationVariation: 10 }
```
