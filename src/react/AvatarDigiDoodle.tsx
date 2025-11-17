import {useEffect, useRef} from 'react';
import {generateAvatar} from '../themes/digidoodle/index.js';
import type {DigiDoodleOptions} from '../themes/digidoodle/types.js';

export interface AvatarDigiDoodleProps extends Partial<Omit<DigiDoodleOptions, 'id' | 'size'>> {
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
 * DigiDoodle Avatar React Component
 *
 * @example
 * ```tsx
 * <AvatarDigiDoodle 
 *   id="user@example.com" 
 *   size={256}
 *   gridSize={8}
 *   density={0.5}
 * />
 * ```
 */
export function AvatarDigiDoodle({
                                     id,
                                     size = 256,
                                     className,
                                     style,
                                     onGenerate,
                                     ...options
                                 }: AvatarDigiDoodleProps) {
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
