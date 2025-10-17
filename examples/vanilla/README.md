# Avatar Generator Example

Minimal example project using the avatar generator.

## Run

```bash
npm install
npm run dev
```

Open browser to the shown URL (usually http://localhost:5173).

## What does this do?

This is a separate Vite project that uses the parent package via relative imports:

```typescript
import { generateAvatar } from '../../src/themes/digidoodle/index.js';
```

It generates a grid of 63 avatars with IDs '1' through '63', where each ID deterministically produces the same avatar.

## Structure

- `index.html` - Minimal HTML with grid layout
- `main.ts` - Generates avatars and fills the grid
- `package.json` - Vite dev dependencies (no avatar-generator dependency)

This demonstrates how the library works without needing to be published to npm.
