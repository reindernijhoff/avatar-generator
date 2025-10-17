/**
 * Canvas abstraction for browser and Node.js
 */

import type { AvatarCanvas, AvatarContext } from './types.js';

/**
 * Check if we are running in Node.js environment
 */
export function isNode(): boolean {
  return typeof window === 'undefined' && typeof process !== 'undefined' && !!process.versions?.node;
}

/**
 * Check if we are running in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Lazy-loaded node-canvas for server-side rendering
 */
let nodeCanvas: any = null;

/**
 * Load node-canvas (only in Node.js environment)
 */
async function loadNodeCanvas(): Promise<any> {
  if (nodeCanvas) return nodeCanvas;
  
  try {
    // Dynamic import for optional dependency
    // @ts-ignore - optional peer dependency
    nodeCanvas = await import('canvas');
    return nodeCanvas;
  } catch (error) {
    throw new Error(
      'canvas package not found. Install it with: npm install canvas\n' +
      'See: https://github.com/Automattic/node-canvas for installation instructions.'
    );
  }
}

/**
 * Get canvas and context - reuses existing canvas if provided, otherwise creates a new one
 */
export function getCanvas(size: number, existingCanvas?: AvatarCanvas): { canvas: AvatarCanvas; ctx: AvatarContext } {
  if (existingCanvas) {
    // Reuse existing canvas
    existingCanvas.width = size;
    existingCanvas.height = size;
    const ctx = existingCanvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Failed to get 2D context from existing canvas');
    }
    
    return { canvas: existingCanvas, ctx };
  }
  
  // Create new canvas
  return createCanvas(size);
}

/**
 * Create canvas for browser or Node.js
 */
export function createCanvas(size: number): { canvas: AvatarCanvas; ctx: AvatarContext } {
  if (isBrowser()) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas');
    }
    
    return { canvas, ctx };
  }
  
  // Node.js: try to load node-canvas
  if (isNode()) {
    if (!nodeCanvas) {
      throw new Error(
        'canvas package must be loaded first. ' +
        'Use createCanvasAsync() in async context or preload the module.'
      );
    }
    
    const canvas = nodeCanvas.createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
  }
  
  throw new Error('Unsupported environment: not browser or Node.js');
}

/**
 * Create canvas (async variant for Node.js)
 * Use this in async context to dynamically load node-canvas
 */
export async function createCanvasAsync(size: number): Promise<{ canvas: AvatarCanvas; ctx: AvatarContext }> {
  if (isBrowser()) {
    return createCanvas(size);
  }
  
  if (isNode()) {
    const nc = await loadNodeCanvas();
    const canvas = nc.createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
  }
  
  throw new Error('Unsupported environment: not browser or Node.js');
}

/**
 * Initialize node-canvas for sync usage
 * Call this in your app setup if you're doing server-side rendering
 */
export async function initNodeCanvas(): Promise<void> {
  if (isNode() && !nodeCanvas) {
    await loadNodeCanvas();
  }
}

/**
 * Convert canvas to buffer (Node.js only)
 */
export function canvasToBuffer(canvas: AvatarCanvas, mimeType: 'image/png' | 'image/jpeg' = 'image/png'): Buffer {
  if (!isNode()) {
    throw new Error('canvasToBuffer is only available in Node.js');
  }
  
  if (typeof canvas.toBuffer !== 'function') {
    throw new Error('Canvas does not have a toBuffer method. Use node-canvas package.');
  }
  
  return canvas.toBuffer(mimeType);
}

/**
 * Convert canvas to data URL (browser + Node.js)
 */
export function canvasToDataURL(canvas: AvatarCanvas, mimeType: 'image/png' | 'image/jpeg' = 'image/png'): string {
  return canvas.toDataURL(mimeType);
}
