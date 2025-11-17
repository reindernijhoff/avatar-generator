import {useEffect, useRef} from 'react';
import {generateAvatar} from '../themes/pixels/index.js';
import type {PixelsOptions} from '../themes/pixels/types.js';

export interface AvatarPixelsProps extends Partial<Omit<PixelsOptions, 'id' | 'size'>> {
    /** Unique identifier for deterministic generation */
    id: string;
    /** Canvas size in pixels (default: 256) */
    size?: number;
    /** Optional className for the canvas element */
    className?: string;
    /** Optional inline styles for the canvas element */
    style?: React.CSSProperties;
    /** Callback when avatar is generated */
    onGenerate?: (canvas: HTMLCanvasElement) => void;
}

/**
 * Pixels Avatar React Component
 *
 * @example
 * ```tsx
 * <AvatarPixels 
 *   id="user@example.com" 
 *   size={256}
 *   gridSize={16}
 * />
 * ```
 */
export function AvatarPixels({
                                 id,
                                 size = 256,
                                 className,
                                 style,
                                 onGenerate,
                                 ...options
                             }: AvatarPixelsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Generate avatar directly into the canvas ref
        const canvas = generateAvatar({
            id,
            size,
            canvas: canvasRef.current,
            ...options
        });

        // Trigger callback
        onGenerate?.(canvas);
    }, [id, size, JSON.stringify(options)]);

    return <canvas ref={canvasRef} className={className} style={style}/>;
}
