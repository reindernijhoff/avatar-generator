import { useEffect, useRef } from 'react';
import { generateAvatar } from '../themes/smile/index.js';
import type { SmileOptions } from '../themes/smile/types.js';

export interface AvatarSmileProps extends Partial<Omit<SmileOptions, 'id' | 'size'>> {
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
 * Smile Avatar React Component
 * 
 * @example
 * ```tsx
 * <AvatarSmile 
 *   id="user@example.com" 
 *   size={256}
 *   foreground="#ff5500"
 * />
 * ```
 */
export function AvatarSmile({
  id,
  size = 256,
  className,
  style,
  onGenerate,
  ...options
}: AvatarSmileProps) {
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
