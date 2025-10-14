// Import from parent package via relative path
import { generateAvatar } from '../src/themes/digidoodle/index.js';

// Generate avatars for IDs 1-24
const app = document.getElementById('app');

if (app) {
  for (let i = 1; i <= 128; i++) {
    const id = String(i);
    
    // Generate avatar
    const canvas = generateAvatar({
      id,
      size: 128,
      gridSize: 8,
      density: 0.5,
	  symmetryVertical: true,
	  symmetryHorizontal: false,
	  symmetryDiagonalLeft: false,
	  symmetryDiagonalRight: false,
	  symmetryRotational: false,
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
