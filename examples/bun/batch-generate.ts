/**
 * Example batch avatar generation to files using Bun
 *
 * Install dependencies:
 *   bun add @napi-rs/canvas
 *
 * Run:
 *   bun examples/bun/batch-generate.ts
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {generateAvatar} from '../../dist/themes/digidoodle/index.js';
import {canvasToBuffer, setCreateCanvasHandle} from '../../dist/core/canvas.js';
import {createCanvas} from "@napi-rs/canvas";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize @napi-rs/canvas
setCreateCanvasHandle(createCanvas);

// Output directory
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, {recursive: true});
}

// User list
const users: string[] = [
    'alice@example.com',
    'bob@example.com',
    'charlie@example.com',
    'diana@example.com',
    'eve@example.com',
    'frank@example.com',
    'grace@example.com',
    'henry@example.com',
];

console.log('🎨 Generating avatars with Bun...\n');

// Generate avatars
users.forEach((id, index) => {
    const canvas = generateAvatar({
        id,
        size: 256,
        gridSize: 8,
        density: 0.5,
        symmetry: true,
    });

    const buffer = canvasToBuffer(canvas, 'image/png');
    const filename = `avatar-${index + 1}-${id.replace(/[^a-z0-9]/gi, '-')}.png`;
    const filepath = path.join(outputDir, filename);

    fs.writeFileSync(filepath, buffer);
    console.log(`✅ ${filename}`);
});

console.log(`\n✨ ${users.length} avatars generated in ${outputDir}`);

