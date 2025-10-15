// Import from parent package via relative path
import { generateAvatar } from '../src/themes/digidoodle/index.js';
import type { DigiDoodleOptions } from '../src/themes/digidoodle/types.js';

// Color presets based on the examples
const colorPresets: Record<string, Partial<DigiDoodleOptions>> = {
  random: {
    // No color options - generates random colors
  },
  fixed: {
    background: '#f0f0f0',
    foreground: '#ff0000',
    interpolate: false,
  },
  palette: {
    background: '#ffffff',
    foreground: ['#ff0000', '#00ff00', '#0000ff'],
    interpolate: false,
  },
  gradient: {
    background: '#1a1a1a',
    foreground: ['#ff0000', '#ff8800', '#ffff00'],
    interpolate: true,
  },
  variations: {
    foreground: '#3366ff',
    hueVariation: 20,
    saturationVariation: 15,
    lightnessVariation: 10,
    interpolate: false,
  },
  sets: {
    background: '#ffffff',
    foreground: [
      ['#ff0000', '#ffff00'],
      ['#0000ff', '#ff00ff'],
      ['#00ff00', '#00ffff'],
    ],
    interpolate: true,
  },
};

// Get elements
const app = document.getElementById('app');
const colorPresetSelect = document.getElementById('colorPreset') as HTMLSelectElement;
const layersSelect = document.getElementById('layers') as HTMLSelectElement;

// Generate avatars
function generateAvatars() {
  if (!app) return;

  // Clear existing avatars
  app.innerHTML = '';

  // Get current settings
  const preset = colorPresetSelect.value;
  const layers = parseInt(layersSelect.value);

  // Get color options for this preset
  const colorOptions = colorPresets[preset] || {};

  // Generate avatars for IDs 1-63
  for (let i = 1; i <= 63; i++) {
    const id = String(i);
    
    // Generate avatar
    const canvas = generateAvatar({
      id,
      size: 128,
      gridSize: 8,
      density: 0.5,
      symmetry: true,
      layers,
      ...colorOptions,
    });
    
    // Create container
    const item = document.createElement('div');
    item.className = 'avatar-item';
    
    // Add canvas
    item.appendChild(canvas);
    
    // Add ID label
    const label = document.createElement('div');
    label.className = 'avatar-id';
    label.textContent = id;
    item.appendChild(label);
    
    // Add to grid
    app.appendChild(item);
  }
}

// Event listeners
if (colorPresetSelect && layersSelect) {
  colorPresetSelect.addEventListener('change', generateAvatars);
  layersSelect.addEventListener('change', generateAvatars);
}

// Initial generation
generateAvatars();
