import {useState} from 'react';
import {AvatarDigiDoodle} from '../../../src/react/AvatarDigiDoodle';
import {AvatarInterference} from '../../../src/react/AvatarInterference';
import {AvatarPlasma} from '../../../src/react/AvatarPlasma';
import {AvatarSmile} from '../../../src/react/AvatarSmile';
import {AvatarPixels} from '../../../src/react/AvatarPixels';
import type {DigiDoodleOptions} from '../../../src/themes/digidoodle/types';
import {faker} from '@faker-js/faker';

type Theme = 'digidoodle' | 'interference' | 'plasma' | 'smile' | 'pixels';
type ColorPreset = 'random' | 'fixed' | 'palette' | 'gradient' | 'variations' | 'sets';
type Shape = 'circle' | 'square';

// Color presets
const colorPresets: Record<ColorPreset, Partial<DigiDoodleOptions>> = {
    random: {
        background: '#f0f0f0',
    },
    fixed: {
        background: '#f0f0f0',
        foreground: '#fe4365',
        interpolate: false,
    },
    palette: {
        background: '#f0f0f0',
        foreground: ["#fe4365", "#fc9d9a", "#f9cdad", "#c8c8a9", "#83af9b"],
        interpolate: false,
    },
    gradient: {
        background: '#f0f0f0',
        foreground: ["#69d2e7", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900"],
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
const themes: Array<{ id: Theme; name: string }> = [
    {id: 'digidoodle', name: 'DigiDoodle'},
    {id: 'interference', name: 'Interference'},
    {id: 'plasma', name: 'Plasma'},
    {id: 'smile', name: 'Smile'},
    {id: 'pixels', name: 'Pixels'},
];

// Generate deterministic name from ID
function getNameForId(id: string): string {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = ((hash << 5) - hash) + id.charCodeAt(i);
        hash = hash & hash;
    }
    faker.seed(Math.abs(hash));
    return faker.person.fullName();
}

function App() {
    const [theme, setTheme] = useState<Theme>('plasma');
    const [colorPreset, setColorPreset] = useState<ColorPreset>('gradient');
    const [shape, setShape] = useState<Shape>('circle');

    const colorOptions = colorPresets[colorPreset];
    const avatarIds = Array.from({length: 120}, (_, i) => String(i + 1));

    return (
        <div className="container">
            <header>
                <h1>Avatar Generator</h1>
                <p className="subtitle">Deterministic avatar generation for your projects</p>
            </header>

            <div className="controls-container">
                <div className="theme-selector">
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            className={`theme-button ${theme === t.id ? 'active' : ''}`}
                            onClick={() => setTheme(t.id)}
                        >
                            <div className="theme-icon">
                                {t.id === 'digidoodle' && (
                                    <AvatarDigiDoodle
                                        id={`${t.id}-icon`}
                                        size={64}
                                        layers={1}
                                        borderMargin={0}
                                        gridSize={9}
                                        {...colorOptions}
                                    />
                                )}
                                {t.id === 'interference' && (
                                    <AvatarInterference
                                        id={`${t.id}-icon`}
                                        size={64}
                                        sources={-1}
                                        wavelength={1}
                                        sourceArea={10}
                                        sourceDistance={1}
                                        {...colorOptions}
                                    />
                                )}
                                {t.id === 'plasma' && (
                                    <AvatarPlasma
                                        id={`${t.id}-icon`}
                                        size={64}
                                        timeOffset={-1}
                                        scale1={-1}
                                        scale2={-1}
                                        scale3={-1}
                                        paletteSize={256}
                                        {...colorOptions}
                                    />
                                )}
                                {t.id === 'smile' && (
                                    <AvatarSmile
                                        id={`${t.id}-icon`}
                                        size={64}
                                        {...colorOptions}
                                    />
                                )}
                                {t.id === 'pixels' && (
                                    <AvatarPixels
                                        id={`${t.id}-icon`}
                                        size={64}
                                        gridSize={16}
                                        {...colorOptions}
                                    />
                                )}
                            </div>
                            <div className="theme-label">{t.name}</div>
                        </button>
                    ))}
                </div>

                <div className="controls">
                    <div className="control-group">
                        <label htmlFor="colorPreset">Color Preset</label>
                        <select
                            id="colorPreset"
                            value={colorPreset}
                            onChange={(e) => setColorPreset(e.target.value as ColorPreset)}
                        >
                            <option value="random">Random colors</option>
                            <option value="fixed">Fixed red</option>
                            <option value="palette">Color palette</option>
                            <option value="gradient">Gradient interpolation</option>
                            <option value="variations">With variations</option>
                            <option value="sets">Color sets</option>
                        </select>
                    </div>
                </div>

                <div className="controls">
                    <div className="control-group">
                        <label>Shape</label>
                        <div className="shape-selector">
                            <button
                                className={`shape-button ${shape === 'circle' ? 'active' : ''}`}
                                onClick={() => setShape('circle')}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <circle cx="10" cy="10" r="8" fill="currentColor"/>
                                </svg>
                            </button>
                            <button
                                className={`shape-button ${shape === 'square' ? 'active' : ''}`}
                                onClick={() => setShape('square')}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <rect x="2" y="2" width="16" height="16" rx="2" fill="currentColor"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid">
                {avatarIds.map((id) => (
                    <div key={id} className="avatar-item">
                        <div className={`shape-${shape}`}>
                            {theme === 'digidoodle' && (
                                <AvatarDigiDoodle
                                    id={id}
                                    size={120}
                                    layers={1}
                                    borderMargin={0}
                                    gridSize={9}
                                    {...colorOptions}
                                />
                            )}
                            {theme === 'interference' && (
                                <AvatarInterference
                                    id={id}
                                    size={120}
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
                                    size={120}
                                    timeOffset={-1}
                                    scale1={-1}
                                    scale2={-1}
                                    scale3={-1}
                                    paletteSize={256}
                                    {...colorOptions}
                                />
                            )}
                            {theme === 'smile' && (
                                <AvatarSmile
                                    id={id}
                                    size={120}
                                    {...colorOptions}
                                />
                            )}
                            {theme === 'pixels' && (
                                <AvatarPixels
                                    id={id}
                                    size={120}
                                    gridSize={9}
                                    {...colorOptions}
                                />
                            )}
                        </div>
                        <div className="avatar-id">{getNameForId(id)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
