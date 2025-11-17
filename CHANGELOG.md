# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-14

### Added

- 🎨 **Core avatar generator framework**
    - Seeded random number generator for deterministic generation
    - Canvas abstraction for browser + Node.js compatibility
    - Generic generator interface for themeable architecture

- 🎭 **DigiDoodle theme**
    - Symmetric pixel-art avatar generator
    - Configurable grid size, spacing, margin
    - Multiple symmetry options (vertical, horizontal, diagonal, rotational)
    - Customizable color palette generation
    - Density control for pixel fill probability

- 🌳 **Tree-shakeable architecture**
    - Separate exports per theme for optimal bundle size
    - Core utilities as separate export
    - Theme-specific imports

- 🖥️ **Universal rendering**
    - Browser support via native Canvas API
    - Node.js support via node-canvas (optional peer dependency)
    - Synchronous API for fast generation
    - Buffer export for server-side usage

- 📦 **Build & Development**
    - TypeScript source with complete type definitions
    - Vite-based build system
    - UMD and ES module formats
    - Comprehensive README with examples

- 📝 **Examples**
    - Interactive browser demo (index.html)
    - Express server example for API endpoint
    - Batch generation script for file export
    - Complete documentation

### Technical Details

- **Dependencies**: Zero runtime dependencies (browser), optional `canvas` for Node.js
- **Bundle size**: ~5-10KB per theme (minified)
- **Performance**: 5-20ms generation time for typical avatars
- **Browser support**: Modern browsers (ES2020+)
- **Node.js**: >=20.0.0

[1.0.0]: https://github.com/reindernijhoff/avatar-generator/releases/tag/v1.0.0
