/**
 * Avatar Generator
 * Generative avatar library with multiple themes
 */

// Core exports
export * from './core/index.js';

// Theme exports (for convenience, but use theme-specific imports for tree-shaking)
export * as DigiDoodle from './themes/digidoodle/index.js';
export * as Interference from './themes/interference/index.js';
export * as Plasma from './themes/plasma/index.js';
