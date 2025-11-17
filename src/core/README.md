# Core Utilities

## Color System

The color system provides a flexible way to specify and pick colors for avatar generation.

### API

#### Types

```typescript
type ColorValue = string | [number, number, number];
type ColorPalette = ColorValue | ColorValue[] | ColorValue[][];

interface ColorOptions {
  background?: ColorPalette;      // Single color, array, or array of arrays
  foreground?: ColorPalette;      // Single color, array, or array of arrays
  interpolate?: boolean;          // Enable color interpolation (default: true)
  hueVariation?: number;          // Random hue variation 0-360
  saturationVariation?: number;   // Random saturation variation 0-100
  lightnessVariation?: number;    // Random lightness variation 0-100
}

interface Color {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}
```

#### Functions

**`pickBackgroundColor(options: ColorOptions, random: SeededRandom): Color`**

Pick a background color from the options. Defaults to white if not specified.

**`pickForegroundColor(options: ColorOptions, random: SeededRandom): Color`**

Pick a foreground color from the options. Generates a random vibrant color if not specified.

*
*`pickColors(options: ColorOptions, random: SeededRandom, count: number, source?: 'foreground' | 'background'): Color[]`
**

Pick multiple colors from palette. The `source` parameter determines which palette to use (default: 'foreground').

Behavior depends on the palette type:

- Single color: generates contrasting variations
- Array of colors: picks from array (with interpolation if enabled)
- Array of arrays: picks one array, then picks colors from it
- Missing colors are generated based on existing colors

**`colorToString(color: Color): string`**

Convert a Color object to CSS rgb() string.

**`parseColor(value: ColorValue): Color`**

Parse hex string or RGB array to Color object.

**`varyColor(color: Color, random: SeededRandom, options: ColorOptions): Color`**

Apply random variations to a color based on hue/saturation/lightness variation options.

**`interpolateColors(color1: Color, color2: Color, t: number): Color`**

Interpolate between two colors. `t` is between 0 and 1.

**`rgbToHsl(color: Color): { h: number, s: number, l: number }`**

Convert RGB to HSL color space.

**`hslToRgb(h: number, s: number, l: number): Color`**

Convert HSL to RGB color space.

### Usage in Themes

```typescript
import { 
  pickBackgroundColor, 
  pickForegroundColor, 
  pickColors,
  colorToString 
} from '../../core/colors.js';

class MyThemeRenderer {
  render(ctx: AvatarContext): void {
    // Single background color
    const bg = pickBackgroundColor(this.options, this.random);
    ctx.fillStyle = colorToString(bg);
    ctx.fillRect(0, 0, size, size);
    
    // Single foreground color
    const fg = pickForegroundColor(this.options, this.random);
    ctx.fillStyle = colorToString(fg);
    // ... draw foreground
    
    // Multiple colors for complex themes
    const [primary, accent, tertiary] = pickColors(this.options, this.random, 3);
    // Use primary, accent, tertiary...
    
    // Pick from background instead
    const bgColors = pickColors(this.options, this.random, 3, 'background');
  }
}
```

### Examples

**Single color:**

```typescript
{ foreground: '#ff0000' }
```

**Color array (picks random):**

```typescript
{ 
  foreground: ['#ff0000', '#00ff00', '#0000ff'],
  interpolate: false  // Pick exact colors
}
```

**Gradient interpolation:**

```typescript
{ 
  foreground: ['#ff0000', '#ffff00'],
  interpolate: true  // Blend between colors (default)
}
```

**Color sets (array of arrays):**

```typescript
{
  foreground: [
    ['#ff0000', '#ff8888'],  // Red set
    ['#0000ff', '#8888ff'],  // Blue set
  ]
}
```

**With variations:**

```typescript
{
  foreground: '#ff0000',
  hueVariation: 15,
  saturationVariation: 10,
  lightnessVariation: 10,
}
```
