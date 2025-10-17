# Avatar Generator React Example

Minimal React example using the avatar generator React components.

## Run

```bash
npm install
npm run dev
```

Open browser to the shown URL (usually http://localhost:5173).

## What does this do?

This is a Vite + React project that uses the parent package React components via relative imports:

```tsx
import { AvatarDigiDoodle } from '../../../src/react/AvatarDigiDoodle';
```

It demonstrates:
- Using React components for all three themes (DigiDoodle, Interference, Plasma)
- Dynamic theme switching
- Color preset controls
- Responsive grid layout

## Structure

- `index.html` - Entry HTML file
- `src/main.tsx` - React app entry point
- `src/App.tsx` - Main app component with avatar grid
- `src/index.css` - Styling
- `package.json` - React + Vite dependencies

This demonstrates how the React wrapper works without needing the package to be published to npm.

## Features

The example shows:
- All three avatar themes as React components
- Interactive controls for theme, color presets, and layers
- 63 avatars displayed in a responsive grid
- Each avatar is deterministically generated from its ID
