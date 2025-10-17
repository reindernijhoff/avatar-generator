import { useEffect, useRef } from 'react';
import { generateAvatar } from '../themes/plasma/index.js';
import type { PlasmaOptions } from '../themes/plasma/types.js';

export interface AvatarPlasmaProps extends Partial<Omit<PlasmaOptions, 'id' | 'size'>> {
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
 * Plasma Avatar React Component
 * 
 * @example
 * ```tsx
 * <AvatarPlasma 
 *   id="user@example.com" 
 *   size={256}
 *   timeOffset={0.5}
 * />
 * ```
 */
export function AvatarPlasma({
  id,
  size = 256,
  className,
  style,
  onGenerate,
  ...options
}: AvatarPlasmaProps) {
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

  return <canvas ref={canvasRef} className={className} style={style} />;
}
