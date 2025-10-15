/**
 * Avatar Generator
 * Generative avatar library with multiple themes
 * 
 * @example
 * ```typescript
 * // Browser
 * import { generateAvatar } from 'avatar-generator/themes/digidoodle';
 * const canvas = generateAvatar({ id: 'user@example.com', size: 256 });
 * document.body.appendChild(canvas);
 * 
 * // Node.js (server-side)
 * import { generateAvatar } from 'avatar-generator/themes/digidoodle';
 * import { canvasToBuffer } from 'avatar-generator/core';
 * import fs from 'fs';
 * 
 * const canvas = generateAvatar({ id: 'user@example.com', size: 256 });
 * const buffer = canvasToBuffer(canvas);
 * fs.writeFileSync('avatar.png', buffer);
 * ```
 */

// Core exports
export * from './core/index.js';

// Theme exports (for convenience, but use theme-specific imports for tree-shaking)
export * as DigiDoodle from './themes/digidoodle/index.js';
export * as Interference from './themes/interference/index.js';
