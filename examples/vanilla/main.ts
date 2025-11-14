// Import from parent package via relative path
import { generateAvatar as generateDigiDoodle } from '../../src/themes/digidoodle/index.js';
import { generateAvatar as generateInterference } from '../../src/themes/interference/index.js';
import { generateAvatar as generatePlasma } from '../../src/themes/plasma/index.js';
import type { DigiDoodleOptions } from '../../src/themes/digidoodle/types.js';
import type { InterferenceOptions } from '../../src/themes/interference/types.js';
import type { PlasmaOptions } from '../../src/themes/plasma/types.js';
import { faker } from '@faker-js/faker';

// Color presets based on the examples
const colorPresets: Record<string, Partial<DigiDoodleOptions>> = {
  random: {
    // No color options - generates random colors
    background: '#f0f0f0',
  },
  fixed: {
    background: '#f0f0f0',
    foreground: '#fe4365',
    interpolate: false,
  },
  palette: {
    background: '#f0f0f0',
    foreground: ["#fe4365","#fc9d9a","#f9cdad","#c8c8a9","#83af9b"],
    interpolate: false,
  },
  gradient: {
    background: '#1a1a1a',
    foreground: ["#69d2e7","#a7dbd8","#e0e4cc","#f38630","#fa6900"],
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
    background: '#f0f0f0',
    foreground: [
      ['#ff0000', '#ffff00'],
      ['#0000ff', '#ff00ff'],
      ['#00ff00', '#00ffff'],
    ],
    interpolate: true,
  },
};

// Theme definitions
const themes = [
  { id: 'digidoodle', name: 'DigiDoodle' },
  { id: 'interference', name: 'Interference' },
  { id: 'plasma', name: 'Plasma' },
];

// Generate deterministic name from ID
function getNameForId(id: string): string {
  // Create a simple hash from the ID string
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use the hash as seed for faker
  faker.seed(Math.abs(hash));
  
  // Generate a full name
  return faker.person.fullName();
}

// State
let currentTheme = 'plasma';
let currentShape = 'circle';

// Get elements
const app = document.getElementById('app');
const themeSelector = document.getElementById('themeSelector');
const shapeSelector = document.getElementById('shapeSelector');
const colorPresetSelect = document.getElementById('colorPreset') as HTMLSelectElement;

// Generate a single avatar based on current settings
function generateSingleAvatar(id: string, size: number): HTMLCanvasElement {
  const preset = colorPresetSelect.value;
  const layers = 1;
  const colorOptions = colorPresets[preset] || {};

  let canvas: HTMLCanvasElement;
  
  if (currentTheme === 'interference') {
    canvas = generateInterference({
      id,
      size,
      sources: -1,
      wavelength: 1,
      sourceArea: 10,
      sourceDistance: 1,
      ...colorOptions,
    } as InterferenceOptions);
  } else if (currentTheme === 'plasma') {
    canvas = generatePlasma({
      id,
      size,
      timeOffset: -1,
      scale1: -1,
      scale2: -1,
      scale3: -1,
      paletteSize: 256,
      ...colorOptions,
    } as PlasmaOptions);
  } else {
    canvas = generateDigiDoodle({
      id,
      size,
      layers,
      borderMargin: 0,
      gridSize: 9,
      ...colorOptions,
    } as DigiDoodleOptions);
  }

  return canvas;
}

// Update UI based on theme
function updateThemeUI() {
  // Update theme buttons active state
  const buttons = themeSelector?.querySelectorAll('.theme-button');
  buttons?.forEach((button) => {
    const btn = button as HTMLElement;
    if (btn.dataset.theme === currentTheme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Create theme selector buttons
function createThemeSelector() {
  if (!themeSelector) return;

  themes.forEach((theme) => {
    const button = document.createElement('button');
    button.className = 'theme-button';
    button.dataset.theme = theme.id;
    
    // Create icon container
    const icon = document.createElement('div');
    icon.className = 'theme-icon';
    button.appendChild(icon);
    
    // Create label
    const label = document.createElement('div');
    label.className = 'theme-label';
    label.textContent = theme.name;
    button.appendChild(label);
    
    // Add click handler
    button.addEventListener('click', () => {
      currentTheme = theme.id;
      updateThemeUI();
      generateAvatars();
    });
    
    themeSelector.appendChild(button);
  });
  
  // Generate initial previews
  updateThemeIcons();
}

// Update theme preview icons
function updateThemeIcons() {
  if (!themeSelector) return;

  themes.forEach((theme) => {
    const button = themeSelector.querySelector(`[data-theme="${theme.id}"]`) as HTMLElement;
    if (!button) return;
    
    const icon = button.querySelector('.theme-icon');
    if (!icon) return;
    
    // Clear existing icon
    icon.innerHTML = '';
    
    // Generate preview with current color preset
    const tempTheme = currentTheme;
    currentTheme = theme.id;
    const canvas = generateSingleAvatar(`${theme.id}-icon`, 64);
    currentTheme = tempTheme;
    
    icon.appendChild(canvas);
  });
}

// Generate avatars
function generateAvatars() {
  if (!app) return;

  // Clear existing avatars
  app.innerHTML = '';

  // Generate avatars for IDs 1-120
  for (let i = 1; i <= 120; i++) {
    const id = String(i);
    const canvas = generateSingleAvatar(id, 128);
    
    // Add shape class to canvas
    canvas.className = `shape-${currentShape}`;
    
    // Create container
    const item = document.createElement('div');
    item.className = 'avatar-item';
    
    // Add canvas
    item.appendChild(canvas);
    
    // Add name label
    const label = document.createElement('div');
    label.className = 'avatar-id';
    label.textContent = getNameForId(id);
    item.appendChild(label);
    
    // Add to grid
    app.appendChild(item);
  }
}

// Setup shape selector
function setupShapeSelector() {
  if (!shapeSelector) return;

  const buttons = shapeSelector.querySelectorAll('.shape-button');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const btn = button as HTMLElement;
      const shape = btn.dataset.shape;
      
      if (shape) {
        currentShape = shape;
        
        // Update active state
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Regenerate avatars with new shape
        generateAvatars();
      }
    });
  });
}

// Event listeners
if (colorPresetSelect) {
  colorPresetSelect.addEventListener('change', () => {
    updateThemeIcons();
    generateAvatars();
  });
}

// Initial setup
createThemeSelector();
setupShapeSelector();
updateThemeUI();
generateAvatars();
