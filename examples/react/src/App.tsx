import { useState } from 'react';
import { AvatarDigiDoodle } from '../../../src/react/AvatarDigiDoodle';
import { AvatarInterference } from '../../../src/react/AvatarInterference';
import { AvatarPlasma } from '../../../src/react/AvatarPlasma';
import type { DigiDoodleOptions } from '../../../src/themes/digidoodle/types';

type Theme = 'digidoodle' | 'interference' | 'plasma';
type ColorPreset = 'random' | 'fixed' | 'palette' | 'gradient' | 'variations' | 'sets';

// Color presets
const colorPresets: Record<ColorPreset, Partial<DigiDoodleOptions>> = {
  random: {},
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

function App() {
  const [theme, setTheme] = useState<Theme>('digidoodle');
  const [colorPreset, setColorPreset] = useState<ColorPreset>('sets');
  const [layers, setLayers] = useState(1);

  const colorOptions = colorPresets[colorPreset];
  const avatarIds = Array.from({ length: 63 }, (_, i) => String(i + 1));

  return (
    <div className="container">
      <header>
        <h1>Avatar Generator</h1>
        <p className="subtitle">React Components Example</p>
      </header>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="theme">Theme:</label>
          <select 
            id="theme" 
            value={theme} 
            onChange={(e) => setTheme(e.target.value as Theme)}
          >
            <option value="digidoodle">DigiDoodle</option>
            <option value="interference">Interference</option>
            <option value="plasma">Plasma</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="colorPreset">Color Preset:</label>
          <select 
            id="colorPreset" 
            value={colorPreset} 
            onChange={(e) => setColorPreset(e.target.value as ColorPreset)}
          >
            <option value="random">Random colors</option>
            <option value="fixed">Fixed red</option>
            <option value="palette">Color palette (RGB)</option>
            <option value="gradient">Gradient interpolation</option>
            <option value="variations">With variations</option>
            <option value="sets">Color sets</option>
          </select>
        </div>

        {theme === 'digidoodle' && (
          <div className="control-group">
            <label htmlFor="layers">Layers:</label>
            <select 
              id="layers" 
              value={layers} 
              onChange={(e) => setLayers(Number(e.target.value))}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid">
        {avatarIds.map((id) => (
          <div key={id} className="avatar-item">
            {theme === 'digidoodle' && (
              <AvatarDigiDoodle
                id={id}
                size={128}
                layers={layers}
                {...colorOptions}
              />
            )}
            {theme === 'interference' && (
              <AvatarInterference
                id={id}
                size={128}
                sources={-1}
                wavelength={1}
                sourceArea={10}
                sourceDistance={1}
                {...colorOptions}
              />
            )}
            {theme === 'plasma' && (
              <AvatarPlasma
                id={id}
                size={128}
                timeOffset={-1}
                scale1={-1}
                scale2={-1}
                scale3={-1}
                paletteSize={256}
                {...colorOptions}
              />
            )}
            <div className="avatar-id">{id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
