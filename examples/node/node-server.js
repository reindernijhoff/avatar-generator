/**
 * Example Node.js Express server for avatar generation
 * 
 * Install dependencies:
 *   npm install express canvas
 * 
 * Run:
 *   node examples/node-server.js
 */

import express from 'express';
import { generateAvatar } from '../../dist/themes/digidoodle/index.js';
import { canvasToBuffer, initNodeCanvas } from '../../dist/core/canvas.js';

const app = express();
const PORT = 3000;

// Initialize node-canvas before starting server
await initNodeCanvas();

// Avatar endpoint
app.get('/avatar/:id', (req, res) => {
  try {
    const { id } = req.params;
    const size = parseInt(req.query.size) || 256;
    
    // Validation
    if (size < 32 || size > 512) {
      return res.status(400).json({ error: 'Size must be between 32 and 512' });
    }
    
    // Generate avatar
    const canvas = generateAvatar({ 
      id, 
      size,
      // Optional query parameters
      gridSize: parseInt(req.query.gridSize) || 8,
      density: parseFloat(req.query.density) || 0.5,
      symmetry: req.query.symmetry !== 'false', // default true
    });
    
    // Convert to buffer
    const buffer = canvasToBuffer(canvas, 'image/png');
    
    // Cache headers (avatars are deterministic)
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
    res.send(buffer);
    
  } catch (error) {
    console.error('Avatar generation error:', error);
    res.status(500).json({ error: 'Avatar generation failed' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎨 Avatar Generator Server running at http://localhost:${PORT}`);
  console.log(`\nExamples:`);
  console.log(`  http://localhost:${PORT}/avatar/user@example.com`);
  console.log(`  http://localhost:${PORT}/avatar/alice?size=128`);
  console.log(`  http://localhost:${PORT}/avatar/bob?size=256&gridSize=12&density=0.6`);
});
