/**
 * Example Bun server for avatar generation
 *
 * Install dependencies:
 *   bun add @napi-rs/canvas
 *
 * Run:
 *   bun examples/bun/bun-server.ts
 */

import {generateAvatar} from '../../dist/themes/digidoodle/index.js';
import {canvasToBuffer, initBunCanvas} from '../../dist/core/canvas.js';

const PORT = 3000;

// Initialize @napi-rs/canvas before starting server
await initBunCanvas();

Bun.serve({
    port: PORT,
    fetch(req: Request): Response {
        const url = new URL(req.url);
        const pathname = url.pathname;

        // Health check
        if (pathname === '/health') {
            return Response.json({status: 'ok'});
        }

        // Avatar endpoint: /avatar/:id
        if (pathname.startsWith('/avatar/')) {
            try {
                const id = decodeURIComponent(pathname.slice(8)); // Remove '/avatar/'

                if (!id) {
                    return Response.json({error: 'ID is required'}, {status: 400});
                }

                // Parse query parameters
                const sizeParam = url.searchParams.get('size');
                const gridSizeParam = url.searchParams.get('gridSize');
                const densityParam = url.searchParams.get('density');
                const symmetryParam = url.searchParams.get('symmetry');

                const size = sizeParam ? parseInt(sizeParam, 10) : 256;

                // Validation
                if (size < 32 || size > 512) {
                    return Response.json({error: 'Size must be between 32 and 512'}, {status: 400});
                }

                // Generate avatar
                const canvas = generateAvatar({
                    id,
                    size,
                    gridSize: gridSizeParam ? parseInt(gridSizeParam, 10) : 8,
                    density: densityParam ? parseFloat(densityParam) : 0.5,
                    symmetry: symmetryParam !== 'false', // default true
                });

                // Convert to buffer
                const buffer = canvasToBuffer(canvas, 'image/png');

                // Return PNG with cache headers (avatars are deterministic)
                return new Response(buffer, {
                    headers: {
                        'Content-Type': 'image/png',
                        'Cache-Control': 'public, max-age=31536000', // 1 year
                    },
                });

            } catch (error) {
                console.error('Avatar generation error:', error);
                return Response.json({error: 'Avatar generation failed'}, {status: 500});
            }
        }

        // 404 for all other routes
        return Response.json({error: 'Not found'}, {status: 404});
    },
});

console.log(`🎨 Avatar Generator Server (Bun) running at http://localhost:${PORT}`);
console.log(`\nExamples:`);
console.log(`  http://localhost:${PORT}/avatar/user@example.com`);
console.log(`  http://localhost:${PORT}/avatar/alice?size=128`);
console.log(`  http://localhost:${PORT}/avatar/bob?size=256&gridSize=12&density=0.6`);

