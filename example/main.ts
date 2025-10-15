// Import from parent package via relative path
import { generateAvatar as generateDigiDoodle } from '../src/themes/digidoodle/index.js';
import { generateAvatar as generateInterference } from '../src/themes/interference/index.js';
import type { DigiDoodleOptions } from '../src/themes/digidoodle/types.js';
import type { InterferenceOptions } from '../src/themes/interference/types.js';

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
const themeSelect = document.getElementById('theme') as HTMLSelectElement;
const colorPresetSelect = document.getElementById('colorPreset') as HTMLSelectElement;
const layersSelect = document.getElementById('layers') as HTMLSelectElement;
const layersControl = document.getElementById('layersControl') as HTMLElement;

// Update UI based on theme
function updateThemeUI() {
  const theme = themeSelect.value;
  
  // Show/hide layers control (only for DigiDoodle)
  if (layersControl) {
    layersControl.style.display = theme === 'digidoodle' ? 'flex' : 'none';
  }
}

// Generate avatars
function generateAvatars() {
  if (!app) return;

  // Clear existing avatars
  app.innerHTML = '';

  // Get current settings
  const theme = themeSelect.value;
  const preset = colorPresetSelect.value;
  const layers = parseInt(layersSelect.value);

  // Get color options for this preset
  const colorOptions = colorPresets[preset] || {};

  // Generate avatars for IDs 1-63
  for (let i = 1; i <= 63; i++) {
    const id = String(i);
    
    // Generate avatar based on theme
    let canvas: HTMLCanvasElement;
    
    if (theme === 'interference') {
      canvas = generateInterference({
        id,
        size: 128,
        sources: -1,  // Random 2-5
        wavelength: 1,
        sourceArea: 10,
        sourceDistance: 1,
        ...colorOptions,
      } as InterferenceOptions);
    } else {
      canvas = generateDigiDoodle({
        id,
        size: 128,
        gridSize: 8,
        density: 0.5,
        symmetry: true,
        layers,
        ...colorOptions,
      } as DigiDoodleOptions);
    }
    
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
if (themeSelect && colorPresetSelect && layersSelect) {
  themeSelect.addEventListener('change', () => {
    updateThemeUI();
    generateAvatars();
  });
  colorPresetSelect.addEventListener('change', generateAvatars);
  layersSelect.addEventListener('change', generateAvatars);
}

// Initial setup
updateThemeUI();
generateAvatars();
